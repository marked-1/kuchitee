import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-white hover:text-red-500 transition-colors">
              KuchiTee
            </a>
          </Link>
          <nav className="flex gap-6">
            <Link href="/">
              <a className="text-foreground hover:text-red-500 transition-colors">Home</a>
            </Link>
            <Link href="/shop">
              <a className="text-foreground hover:text-red-500 transition-colors">Shop</a>
            </Link>
            <Link href="/about">
              <a className="text-red-500 font-semibold">About</a>
            </Link>
          </nav>
        </div>
      </header>

      {/* About Content */}
      <main className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-8">About KuchiTee</h1>

          <div className="space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                KuchiTee is a premium streetwear brand dedicated to celebrating niche subcultures and 
                unique aesthetics. We believe that fashion should be bold, artistic, and unapologetically 
                authentic. Every design tells a story and represents a community.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What We Stand For</h2>
              <p className="text-lg leading-relaxed mb-4">
                We create premium graphic tees for 18-35 year-olds who refuse to blend in. Our designs 
                span eight unique niches, each with its own aesthetic and philosophy:
              </p>
              <ul className="space-y-2 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Biking:</strong> Speed, freedom, and adrenaline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Sarcasm:</strong> Witty humor and deadpan comedy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Women's Sarcasm:</strong> Feminist humor and girl-power attitude</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Motivational:</strong> Grind culture and resilience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Sci-Fi:</strong> Cyberpunk, AI, and futurism</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Superheroes:</strong> Original anti-hero characters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Solo/Solitude:</strong> Introvert culture and self-reliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Mountains:</strong> Adventure, hiking, and nature</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Quality & Craftsmanship</h2>
              <p className="text-lg leading-relaxed">
                Every KuchiTee is crafted with premium materials and attention to detail. We use oversized 
                cuts with dropped shoulders and heavy ribbed crewnecks for authentic streetwear aesthetics. 
                Our designs are printed using DTF (Direct to Film) technology, ensuring vibrant, long-lasting 
                colors that won't fade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Global Reach</h2>
              <p className="text-lg leading-relaxed">
                While we're based in India, KuchiTee ships worldwide. We believe that niche communities 
                exist everywhere, and everyone deserves access to premium streetwear that represents their 
                identity and values.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Pricing</h2>
              <p className="text-lg leading-relaxed">
                Our tees are priced between $12-$22 USD globally, and ₹599-₹999 in India. We believe 
                premium quality shouldn't break the bank. We're committed to offering the best value 
                without compromising on quality or design.
              </p>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Express Yourself?</h2>
              <p className="text-foreground/70 text-lg mb-8">
                Explore our collection and find the design that speaks to you.
              </p>
              <Link href="/shop">
                <a>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Shop Now
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-24">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">KuchiTee</h3>
              <p className="text-foreground/60 text-sm">
                Premium streetwear for niche subcultures worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><Link href="/shop"><a className="hover:text-red-500 transition-colors">All Designs</a></Link></li>
                <li><Link href="/shop"><a className="hover:text-red-500 transition-colors">New Drops</a></Link></li>
                <li><Link href="/shop"><a className="hover:text-red-500 transition-colors">Bestsellers</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><Link href="/about"><a className="hover:text-red-500 transition-colors">About</a></Link></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
            <p>&copy; 2026 KuchiTee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
