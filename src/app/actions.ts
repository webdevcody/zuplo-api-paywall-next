"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export type Subscription = Awaited<ReturnType<typeof getSubscriptionAction>>;

export async function getSubscriptionAction(email: string) {
  try {
    const customer = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (customer.data.length === 0) {
      return null;
    }

    const subscription = await stripe.subscriptions.list({
      limit: 1,
      customer: customer.data[0].id,
    });

    if (subscription.data.length === 0) {
      return null;
    }

    return {
      subscription: subscription.data[0],
    };
  } catch (err) {
    return null;
  }
}
