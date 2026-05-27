import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, NICHES } from '@shared/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black to-red-950/20">
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Premium Streetwear for Every Subculture
                </h2>
                <p className="text-xl text-foreground/70">
                  Bold. Sarcastic. Edgy. Artistic. KuchiTee celebrates the communities that refuse to blend in.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <a>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2">
                      Shop Now
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </Link>
                <Link href="/about">
                  <a>
                    <Button size="lg" variant="outline" className="border-red-500/50 text-white hover:bg-red-500/10">
                      Learn More
                    </Button>
                  </a>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <p className="text-3xl font-bold text-red-500">{NICHES.length}+</p>
                  <p className="text-foreground/60">Unique Niches</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-500">{PRODUCTS.length}+</p>
                  <p className="text-foreground/60">Designs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-500">🌍</p>
                  <p className="text-foreground/60">Global Shipping</p>
                </div>
              </div>

              {/* Pricing Info */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-foreground/80">
                  <span className="font-bold text-red-500">India:</span> ₹599 | <span className="font-bold text-red-500">Global:</span> $24.99
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl blur-3xl" />
                <div className="relative bg-black rounded-2xl overflow-hidden border border-red-500/20">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/BIKING_001_20260502-DeH7jqc88G8QwDqoqvft4P.webp"
                    alt="KuchiTee Featured Design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niches Section */}
      <section className="py-24 bg-background/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Unique Niches
            </h2>
            <p className="text-xl text-foreground/70">
              Find your community. Express your identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NICHES.map((niche) => (
              <Link key={niche.id} href="/shop">
                <a className="group">
                  <div className={`bg-gradient-to-br ${niche.color} to-black rounded-lg p-8 h-40 flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-white/10 hover:border-red-500/50`}>
                    <div className="text-4xl mb-3">{niche.icon}</div>
                    <h3 className="text-white font-bold text-lg group-hover:text-red-300 transition-colors">
                      {niche.name}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Designs
            </h2>
            <p className="text-xl text-foreground/70">
              Check out our latest drops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <a className="group">
                  <div className="bg-black rounded-lg overflow-hidden border border-border hover:border-red-500/50 transition-all duration-300">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-red-500 text-xs font-bold mb-2 uppercase">{product.niche}</p>
                      <h3 className="text-white font-bold mb-2 group-hover:text-red-500 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-white font-bold text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <a>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  View All Designs
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-950/50 to-black border-t border-red-500/20">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            KuchiTee is more than just clothing. It's a statement. It's a community. It's your identity.
          </p>
          <Link href="/shop">
            <a>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 mx-auto">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

    </div>
  );
}
