import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">KuchiTee</h3>
            <p className="text-foreground/60 text-sm">
              Premium streetwear for niche subcultures worldwide. Automated POD system targeting 2000 orders/month.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><Link href="/shop"><a className="hover:text-red-500 transition-colors">All Designs</a></Link></li>
              <li><Link href="/shop?filter=new"><a className="hover:text-red-500 transition-colors">New Drops</a></Link></li>
              <li><Link href="/shop?filter=bestsellers"><a className="hover:text-red-500 transition-colors">Bestsellers</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><Link href="/about"><a className="hover:text-red-500 transition-colors">About</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-red-500 transition-colors">Contact</a></Link></li>
              <li><Link href="/faq"><a className="hover:text-red-500 transition-colors">FAQ</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="https://instagram.com/kuchitee" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Instagram</a></li>
              <li><a href="https://tiktok.com/@kuchitee" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">TikTok</a></li>
              <li><a href="https://youtube.com/@kuchitee" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; 2026 KuchiTee. All rights reserved. | Powered by Automated Agent System</p>
        </div>
      </div>
    </footer>
  );
}
