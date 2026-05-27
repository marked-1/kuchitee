import { Link } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-white hover:text-red-500 transition-colors">
            KuchiTee
          </a>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/">
            <a className="text-foreground hover:text-red-500 transition-colors">Home</a>
          </Link>
          <Link href="/shop">
            <a className="text-foreground hover:text-red-500 transition-colors">Shop</a>
          </Link>
          <Link href="/about">
            <a className="text-foreground hover:text-red-500 transition-colors">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-foreground hover:text-red-500 transition-colors">Contact</a>
          </Link>
          <Link href="/cart">
            <a className="relative text-foreground hover:text-red-500 transition-colors flex items-center gap-1">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
