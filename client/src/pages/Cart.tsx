import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-16 h-16 text-foreground/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-foreground/70 mb-8">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
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
                {/* Product Image */}
                <Link href={`/product/${item.product.id}`}>
                  <div className="w-32 h-32 bg-black rounded-lg overflow-hidden flex-shrink-0 cursor-pointer">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Product Details */}
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

                  {/* Quantity Controls */}
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  <span className="text-green-500">Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-3 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Secure checkout</span>
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

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/shop">
                  <Button variant="outline" className="w-full border-red-500/50 text-white hover:bg-red-500/10">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
