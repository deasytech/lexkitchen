import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});