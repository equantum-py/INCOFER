import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

/**
 * Keep Stripe optional during build/preview environments.
 * Runtime code that actually needs Stripe should fail only when invoked,
 * instead of crashing Next.js while it collects route metadata/page data.
 */
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-09-30.clover",
      telemetry: true,
    })
  : null;

export const requireStripe = () => {
  if (!stripe) {
    throw new Error(
      "STRIPE_SECRET_KEY is not defined. Configure it before using Stripe-dependent features.",
    );
  }

  return stripe;
};

export { Stripe };
