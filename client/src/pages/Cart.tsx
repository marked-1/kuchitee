import { useState } from 'react';
import { Link, useNavigate } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import api from '@/lib/api';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Checkout form state
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.name || !shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cartItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const response = await api.createCheckout(cartItems, customerInfo, shippingAddress);
      
      // Redirect to Stripe checkout
      window.location.href = response.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to create checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-16 h-16 text-foreground/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-foreground/70 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Your Cart</h1>
          <Button
            variant="ghost"
            onClick={clearCart}
            className="text-foreground/60 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-6 bg-card rounded-lg p-4 border border-border"
              >
                <Link href={`/product/${item.product.id}`}>
                  <div className="w-32 h-32 bg-black rounded-lg overflow-hidden flex-shrink-0 cursor-pointer">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-red-500 text-xs font-bold uppercase mb-1">
                        {item.product.niche}
                      </p>
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="text-white font-bold text-lg hover:text-red-500 transition-colors cursor-pointer">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-foreground/60 text-sm mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    <p className="text-white font-bold text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="p-2 border border-border rounded-lg hover:border-red-500 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <span className="text-white font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="p-2 border border-border rounded-lg hover:border-red-500 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="text-foreground/60 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Checkout</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {/* Order Summary */}
                <div className="border-b border-border pb-4 mb-4">
                  <h3 className="text-white font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-foreground/50">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold">Contact Information</h3>
                  <div>
                    <Label htmlFor="email" className="text-foreground/70 text-xs">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="bg-background border-border text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name" className="text-foreground/70 text-xs">Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="bg-background border-border text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground/70 text-xs">Phone</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="bg-background border-border text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-white font-semibold">Shipping Address</h3>
                  <div>
                    <Label htmlFor="line1" className="text-foreground/70 text-xs">Address *</Label>
                    <Input
                      id="line1"
                      value={shippingAddress.line1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })}
                      className="bg-background border-border text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-foreground/70 text-xs">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="bg-background border-border text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-foreground/70 text-xs">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="bg-background border-border text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="postalCode" className="text-foreground/70 text-xs">ZIP Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        className="bg-background border-border text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-foreground/70 text-xs">Country</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="bg-background border-border text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-3 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Secure checkout via Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Print-on-demand, ships in 2-3 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}