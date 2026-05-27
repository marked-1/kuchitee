import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, CreditCard, RefreshCw, BadgeCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About KuchiTee</h1>
          <p className="text-foreground/70 text-xl max-w-3xl mx-auto">
            Premium streetwear for the subcultures that refuse to blend in. Bold designs, automated production, global reach.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-foreground/70 text-lg mb-4">
              KuchiTee was born from a simple idea: everyone deserves to wear their identity. We're not just selling t-shirts — we're celebrating the communities, passions, and subcultures that make each person unique.
            </p>
            <p className="text-foreground/70 text-lg">
              From anime fans to football enthusiasts, gamers to K-pop stans, we create premium streetwear that lets you express who you really are. No compromises, no fast fashion, just bold designs that speak volumes.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-950/50 to-black rounded-2xl p-12 border border-red-500/20">
            <div className="text-center">
              <p className="text-6xl font-bold text-red-500 mb-2">11+</p>
              <p className="text-white font-semibold mb-6">Unique Niches</p>
              <p className="text-6xl font-bold text-red-500 mb-2">36+</p>
              <p className="text-white font-semibold mb-6">Premium Designs</p>
              <p className="text-6xl font-bold text-red-500 mb-2">100+</p>
              <p className="text-white font-semibold">Countries Reached</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-500">1</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Choose Your Style</h3>
              <p className="text-foreground/70">
                Browse our collection of premium streetwear designs across multiple niches. Find the one that speaks to your identity.
              </p>
            </div>
            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-500">2</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">We Print On-Demand</h3>
              <p className="text-foreground/70">
                Your design is printed specifically for you using premium DTF technology. No mass production, no waste — just your unique piece.
              </p>
            </div>
            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-500">3</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Worldwide Delivery</h3>
              <p className="text-foreground/70">
                We ship to 100+ countries worldwide. Your premium streetwear arrives at your doorstep in 5-15 days depending on location.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 bg-card rounded-lg border border-border flex items-start gap-4">
            <Truck className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Global Shipping</h3>
              <p className="text-foreground/60 text-sm">Delivering to 100+ countries worldwide</p>
            </div>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border flex items-start gap-4">
            <CreditCard className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Secure Payment</h3>
              <p className="text-foreground/60 text-sm">All major cards & PayPal accepted</p>
            </div>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border flex items-start gap-4">
            <RefreshCw className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Free Returns</h3>
              <p className="text-foreground/60 text-sm">30-day hassle-free returns</p>
            </div>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border flex items-start gap-4">
            <BadgeCheck className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Premium Quality</h3>
              <p className="text-foreground/60 text-sm">DTF printing, durable & vibrant</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-red-950/50 to-black rounded-2xl p-12 border border-red-500/20">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Express Yourself?</h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of people who wear their identity with KuchiTee. Premium streetwear for the bold, the different, the unapologetic.
          </p>
          <a href="/shop">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}
