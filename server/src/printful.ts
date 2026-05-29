const PRINTFUL_API_BASE = 'https://api.printful.com';

export interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  price: string;
  image: string;
}

export interface PrintfulSyncVariant {
  id: number;
  variant_id: number;
  sync_product_id: number;
  external_id: string;
  sku: string;
  retail_price: string;
  currency: string;
  product: {
    id: number;
    external_id: string;
    name: string;
    description: string;
    image: string;
    variants_count: number;
  };
  variant: PrintfulVariant;
}

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  description: string;
  image: string;
  variants: PrintfulSyncVariant[];
  status: string;
}

class PrintfulClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Printful API error: ${data.error?.message || response.statusText}`);
    }

    return data;
  }

  async getStore() {
    return this.request<{ result: any }>('/store');
  }

  async getSyncProducts() {
    return this.request<{ result: PrintfulSyncProduct[] }>('/store/products');
  }

  async getSyncProduct(syncProductId: number) {
    return this.request<{ result: PrintfulSyncProduct }>(`/store/products/${syncProductId}`);
  }

  async createOrUpdateSyncProduct(product: {
    name: string;
    description?: string;
    external_id: string;
    variants: {
      sku: string;
      name: string;
      retail_price: string;
      currency: string;
    }[];
  }) {
    return this.request<{ result: PrintfulSyncProduct }>('/store/products', {
      method: 'POST',
      body: JSON.stringify({ product }),
    });
  }

  async deleteSyncProduct(syncProductId: number) {
    return this.request<{ result: { id: number } }>(`/store/products/${syncProductId}`, {
      method: 'DELETE',
    });
  }

  async createOrder(order: {
    external_id: string;
    recipient: {
      name: string;
      email: string;
      address1: string;
      address2?: string;
      city: string;
      state_code: string;
      country_code: string;
      zip: string;
      phone?: string;
    };
    items: {
      sync_variant_id: number;
      quantity: number;
      price: string;
    }[];
  }) {
    return this.request<{ result: any }>('/orders', {
      method: 'POST',
      body: JSON.stringify({ order }),
    });
  }

  async getOrder(orderId: number) {
    return this.request<{ result: any }>(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: number) {
    return this.request<{ result: any }>(`/orders/${orderId}`, {
      method: 'DELETE',
    });
  }

  async calculateShippingRates(params: {
    address: {
      address1: string;
      city: string;
      state_code: string;
      country_code: string;
      zip: string;
    };
    items: {
      sync_variant_id: number;
      quantity: number;
    }[];
  }) {
    return this.request<{ result: any[] }>('/shipping-rates', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Webhook verification
  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    // In production, implement HMAC verification
    // For now, return true for development
    return true;
  }
}

export function createPrintfulClient(apiKey: string) {
  return new PrintfulClient(apiKey);
}

export type { PrintfulClient as Printful };