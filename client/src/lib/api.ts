const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface CartItem {
  productId: string;
  name: string;
  image?: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  email: string;
  name: string;
  phone?: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface Order {
  id: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  stripeSessionId?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API error: ${response.statusText}`);
    }

    return data;
  }

  // Products
  async getProducts() {
    return this.request<any[]>('/api/products');
  }

  async getProduct(id: string) {
    return this.request<any>(`/api/products/${id}`);
  }

  async syncProducts() {
    return this.request<{ message: string; count: number }>('/api/products/sync', {
      method: 'POST',
    });
  }

  // Orders
  async createCheckout(items: CartItem[], customer: CustomerInfo, shippingAddress: ShippingAddress): Promise<CheckoutResponse> {
    return this.request<CheckoutResponse>('/api/orders/checkout', {
      method: 'POST',
      body: JSON.stringify({ items, customer, shippingAddress }),
    });
  }

  async getOrder(id: string): Promise<Order> {
    return this.request<Order>(`/api/orders/${id}`);
  }

  async getOrderBySession(sessionId: string): Promise<Order> {
    return this.request<Order>(`/api/orders/session/${sessionId}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const api = new ApiService();
export default api;