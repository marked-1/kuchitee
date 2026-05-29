import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { runQuery } from '../db.js';
import { createCheckoutSession } from '../stripe.js';
import { randomUUID } from 'crypto';

const router = Router();

const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    image: z.string().optional(),
    size: z.string(),
    color: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })),
  customer: z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
  }),
  shippingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
});

router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const body = createOrderSchema.parse(req.body);
    const { items, customer, shippingAddress } = body;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    const orderId = `order_${randomUUID()}`;
    const customerId = `cust_${randomUUID()}`;
    const addressId = `addr_${randomUUID()}`;
    const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3001';

    const session = await createCheckoutSession({
      orderId,
      customerEmail: customer.email,
      items: items.map((item) => ({
        name: item.name,
        description: `${item.size} / ${item.color}`,
        image: item.image || '',
        price: item.price,
        quantity: item.quantity,
      })),
      shippingRates: [
        { name: 'Standard Shipping', price: 5.99, currency: 'usd' },
        { name: 'Express Shipping', price: 12.99, currency: 'usd' },
      ],
      successUrl: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/cart?cancelled=true`,
    });

    await runQuery(
      `INSERT INTO customers (id, email, name, phone) VALUES (?, ?, ?, ?)`,
      [customerId, customer.email, customer.name, customer.phone || null]
    );

    await runQuery(
      `INSERT INTO addresses (id, customer_id, line1, line2, city, state, postal_code, country, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [addressId, customerId, shippingAddress.line1, shippingAddress.line2 || null, shippingAddress.city, shippingAddress.state, shippingAddress.postalCode, shippingAddress.country]
    );

    await runQuery(
      `INSERT INTO orders (id, customer_id, address_id, stripe_session_id, status, subtotal, shipping, tax, total) VALUES (?, ?, ?, ?, 'pending', ?, 0, 0, ?)`,
      [orderId, customerId, addressId, session.id, subtotal, total]
    );

    for (const item of items) {
      await runQuery(
        `INSERT INTO order_items (id, order_id, product_id, product_name, product_image, size, color, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [`item_${randomUUID()}`, orderId, item.productId, item.name, item.image || null, item.size, item.color, item.quantity, item.price, item.price * item.quantity]
      );
    }

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request data', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  }
});

router.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const result = await runQuery(`SELECT * FROM orders WHERE id = ?`, [req.params.id]);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to get order' });
  }
});

router.get('/orders/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const result = await runQuery(`SELECT * FROM orders WHERE stripe_session_id = ?`, [req.params.sessionId]);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to get order' });
  }
});

export default router;