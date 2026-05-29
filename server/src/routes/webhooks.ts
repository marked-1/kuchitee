import { Router, Request, Response } from 'express';
import { constructWebhookEvent } from '../stripe.js';
import { runQuery } from '../db.js';

const router = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  const rawBody = (req as any).rawBody;

  try {
    const payload = rawBody ? rawBody.toString() : JSON.stringify(req.body);
    event = await constructWebhookEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send('Webhook signature verification failed');
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Checkout completed:', session.id);

      await runQuery(
        `UPDATE orders SET status = 'paid', stripe_payment_intent_id = ?, updated_at = datetime('now') WHERE stripe_session_id = ?`,
        [session.payment_intent as string, session.id]
      );

      console.log('Order updated to paid');
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      console.log('Checkout expired:', session.id);

      await runQuery(
        `UPDATE orders SET status = 'expired', updated_at = datetime('now') WHERE stripe_session_id = ?`,
        [session.id]
      );

      console.log('Order marked as expired');
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

router.post('/printful', async (req: Request, res: Response) => {
  console.log('Printful webhook received:', req.body);

  const { type, data } = req.body;

  switch (type) {
    case 'order_shipped':
      console.log('Printful order shipped:', data.order.id);
      // Update order with tracking info
      break;
    default:
      console.log(`Unhandled Printful event type: ${type}`);
  }

  res.json({ received: true });
});

export default router;