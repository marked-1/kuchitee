import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail } from 'lucide-react';
import api from '@/lib/api';

export default function CheckoutSuccess() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const sessionId = params.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      api.getOrderBySession(sessionId)
        .then(setOrderDetails)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-foreground/70 mb-8">
          Thank you for your purchase! Your order is being processed and will ship within 2-3 business days.
        </p>

        {loading ? (
          <div className="text-foreground/50">Loading order details...</div>
        ) : orderDetails ? (
          <div className="bg-card rounded-lg p-6 border border-border mb-8 text-left">
            <h2 className="text-white font-bold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Order ID</span>
                <span className="text-white">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Status</span>
                <span className="text-green-500 capitalize">{orderDetails.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Total</span>
                <span className="text-white font-bold">${orderDetails.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-foreground/70">
            <Mail className="w-5 h-5" />
            <span>Confirmation email sent to your inbox</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-foreground/70">
            <Package className="w-5 h-5" />
            <span>You'll receive tracking info once shipped</span>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="border-red-500/50 text-white hover:bg-red-500/10">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}