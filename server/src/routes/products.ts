import { Router, Request, Response } from 'express';
import { runQuery } from '../db.js';
import { createPrintfulClient } from '../printful.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await runQuery(`SELECT * FROM products WHERE active = 1`);
    res.json(result.rows || []);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await runQuery(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

router.post('/sync', async (_req: Request, res: Response) => {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    if (!apiKey) {
      res.status(400).json({ error: 'Printful API key not configured' });
      return;
    }

    const printful = createPrintfulClient(apiKey);
    const { result } = await printful.getSyncProducts();

    const syncedProducts: string[] = [];

    for (const syncProduct of result) {
      for (const variant of syncProduct.variants || []) {
        const productId = `prod_${syncProduct.id}_var_${variant.id}`;
        
        const existing = await runQuery(`SELECT id FROM products WHERE id = ?`, [productId]);
        
        if (existing.rows && existing.rows.length > 0) {
          await runQuery(
            `UPDATE products SET name = ?, description = ?, price = ?, image = ?, updated_at = datetime('now') WHERE id = ?`,
            [syncProduct.name, syncProduct.description || '', parseFloat(variant.retail_price || '24.99'), variant.variant.image || syncProduct.image || '', productId]
          );
        } else {
          await runQuery(
            `INSERT INTO products (id, printful_id, name, description, price, image, printful_sync_id, printful_variant_id, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [productId, String(syncProduct.id), syncProduct.name, syncProduct.description || '', parseFloat(variant.retail_price || '24.99'), variant.variant.image || syncProduct.image || '', String(syncProduct.id), String(variant.id)]
          );
        }

        syncedProducts.push(productId);
      }
    }

    res.json({
      message: 'Products synced successfully',
      count: syncedProducts.length,
      products: syncedProducts,
    });
  } catch (error) {
    console.error('Sync products error:', error);
    res.status(500).json({ error: 'Failed to sync products' });
  }
});

export default router;