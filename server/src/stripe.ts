import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export interface CreateCheckoutSessionParams {
  orderId: string;
  customerEmail: string;
  items: {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingRates: {
    name: string;
    price: number;
    currency: string;
  }[];
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession({
  orderId,
  customerEmail,
  items,
  shippingRates,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionParams) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.description,
        images: item.image ? [item.image] : undefined,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Add shipping options
  const shippingOptions = shippingRates.map((rate) => ({
    shipping_rate_data: {
      type: 'fixed_amount' as const,
      fixed_amount: {
        amount: Math.round(rate.price * 100),
        currency: rate.currency,
      },
      display_name: rate.name,
      delivery_estimate: {
        minimum: {
          unit: 'business_day' as const,
          value: 5,
        },
        maximum: {
          unit: 'business_day' as const,
          value: 10,
        },
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN', 'AE', 'SA', 'SG', 'MY', 'TH', 'VN', 'PH', 'ID'],
    },
    shipping_options: shippingOptions,
    metadata: {
      orderId,
    },
    // Enable automatic tax calculation (requires Stripe Tax)
    // automatic_tax: { enabled: true },
  });

  return session;
}

export async function retrieveCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer', 'shipping_address'],
  });
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}