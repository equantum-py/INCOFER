import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStripe } from "@/lib/stripe";
import { buildLineItems } from "@/lib/stripe/line-items";
import { stripeLogger } from "@/lib/stripe/logger";
import { getOrCreateStripeCustomer } from "@/services/stripe.service";
import { auth } from "@/utils/auth";
import { cartRepository } from "@/lib/db/drizzle/repositories/cart.repository";

const SESSION_EXPIRY_MINUTES = 30;
const checkoutRequestSchema = z.object({
  cartItemIds: z.array(z.number()).min(1, "El carrito está vacío"),
});

export async function GET() {
  return NextResponse.json({ enabled: Boolean(process.env.STRIPE_SECRET_KEY) });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = requireStripe();
    const authSession = await auth.api.getSession({ headers: request.headers });

    if (!authSession?.user?.id) {
      return NextResponse.json(
        { statusCode: 401, message: "Iniciá sesión para continuar" },
        { status: 401 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { statusCode: 400, message: "Solicitud inválida" },
        { status: 400 },
      );
    }

    const parsedBody = checkoutRequestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { statusCode: 400, message: "No hay productos válidos para pagar" },
        { status: 400 },
      );
    }

    const { cartItemIds } = parsedBody.data;
    const userId = authSession.user.id;
    const userEmail = authSession.user.email;
    const userCartItems = await cartRepository.findByUserIdWithDetails(userId);
    const cartItemsList = userCartItems.filter((item) => cartItemIds.includes(item.id));

    if (cartItemsList.length === 0) {
      return NextResponse.json(
        { statusCode: 400, message: "No encontramos productos válidos en tu carrito" },
        { status: 400 },
      );
    }

    if (cartItemsList.length !== cartItemIds.length) {
      stripeLogger.warn("Some cart items not found or unauthorized", {
        details: { requestedIds: cartItemIds, foundIds: cartItemsList.map((item) => item.id) },
      });
    }

    const lineItemsList = buildLineItems(cartItemsList);
    const customerId = userEmail
      ? await getOrCreateStripeCustomer(userId, userEmail)
      : undefined;
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_EXPIRY_MINUTES * 60;
    const origin = request.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      ...(customerId && { customer: customerId }),
      ...(!customerId && userEmail && { customer_email: userEmail }),
      line_items: lineItemsList,
      mode: "payment",
      expires_at: expiresAt,
      invoice_creation: { enabled: true },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      automatic_tax: { enabled: false },
      metadata: { userId, cartItemIds: cartItemIds.join(",") },
    });

    if (!session.url) throw new Error("El enlace de pago no está disponible");

    stripeLogger.info("Checkout session created", {
      sessionId: session.id,
      details: { userId, itemCount: cartItemsList.length },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    stripeLogger.error("Failed to create checkout session", error);
    const missingStripe = error instanceof Error && error.message.includes("STRIPE_SECRET_KEY");
    return NextResponse.json(
      {
        statusCode: missingStripe ? 503 : 500,
        message: missingStripe
          ? "El pago online todavía no está configurado"
          : "No pudimos iniciar el pago. Intentá nuevamente.",
      },
      { status: missingStripe ? 503 : 500 },
    );
  }
}
