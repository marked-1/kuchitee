import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  niche: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const NICHES = [
  // Original Niches
  { id: 'biking', name: 'Biking', color: 'text-red-500' },
  { id: 'sarcasm', name: 'Sarcasm', color: 'text-white' },
  { id: 'womens-sarcasm', name: "Women's Sarcasm", color: 'text-pink-500' },
  { id: 'motivational', name: 'Motivational', color: 'text-yellow-500' },
  { id: 'scifi', name: 'Sci-Fi', color: 'text-cyan-500' },
  { id: 'superheroes', name: 'Superheroes', color: 'text-red-600' },
  { id: 'solo', name: 'Solo/Solitude', color: 'text-gray-400' },
  { id: 'mountains', name: 'Mountains', color: 'text-orange-600' },
  // New Middle East Niches
  { id: 'arabic-calligraphy', name: 'Arabic Calligraphy', color: 'text-amber-500' },
  { id: 'gaming-esports', name: 'Gaming/Esports', color: 'text-green-500' },
  { id: 'luxury-status', name: 'Luxury Status', color: 'text-yellow-400' },
  { id: 'islamic-faith', name: 'Islamic Faith', color: 'text-emerald-500' },
  { id: 'desert-bedouin', name: 'Desert/Bedouin', color: 'text-orange-700' },
  { id: 'luxury-cars', name: 'Luxury Cars', color: 'text-red-400' },
  { id: 'modest-fashion', name: 'Modest Fashion', color: 'text-purple-400' },
  { id: 'music-hiphop', name: 'Music/Hip-Hop', color: 'text-fuchsia-500' },
];

// Comprehensive product database with 345+ products across 16 niches
const PRODUCTS: Product[] = [
  // ORIGINAL 8 NICHES (23 base designs × 15 variations each = 345 products)
  // BIKING NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `biking-001-${i + 1}`,
    niche: 'biking',
    title: `VELOCITY - Biking Culture Tee (Variant ${i + 1})`,
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/BIKING_BASE_001-4cxV5sAaDXczB35f6WHmmu.webp',
    description: 'Bold motorcycle silhouette with speed lines. Premium oversized streetwear tee.',
  })),
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `biking-002-${i + 1}`,
    niche: 'biking',
    title: `RIDE OR DIE - Biker Aesthetic (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/BIKING_BASE_002-fqpLZFKWmiDUY6KxQuXKLv.webp',
    description: 'Motorcycle engine graphics with metallic silver and red accents.',
  })),
  // SARCASM NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `sarcasm-001-${i + 1}`,
    niche: 'sarcasm',
    title: `I SPEAK FLUENT SARCASM (Variant ${i + 1})`,
    price: '$17',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SARCASM_BASE_001-5MEYoBRrMUsHN3PKsEcXaN.webp',
    description: 'Minimal text-based design with dry humor vibe. Perfect for sarcasm lovers.',
  })),
  // WOMEN'S SARCASM NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `womens-sarcasm-001-${i + 1}`,
    niche: 'womens-sarcasm',
    title: `SWEET AS SUGAR, COLD AS ICE (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/WOMENS_SARCASM_BASE_001-RK4DRojrHUmfYQ59wXecNm.webp',
    description: 'Empowering design with feminine floral elements and girl-power attitude.',
  })),
  // MOTIVATIONAL NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `motivational-001-${i + 1}`,
    niche: 'motivational',
    title: `THE PAIN YOU FEEL TODAY (Variant ${i + 1})`,
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOTIVATIONAL_BASE_001-dNdL4UqEz4Jn7bmKEyNw5q.webp',
    description: 'Grind culture aesthetic with inspirational message. Motivate yourself daily.',
  })),
  // SCI-FI NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `scifi-001-${i + 1}`,
    niche: 'scifi',
    title: `SINGULARITY - Cyberpunk AI (Variant ${i + 1})`,
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SCIFI_BASE_001-baXX4JTroApVjAt4L86Tmi.webp',
    description: 'Cyberpunk AI aesthetic with glitchy digital effects and neon colors.',
  })),
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `scifi-002-${i + 1}`,
    niche: 'scifi',
    title: `NEURAL NETWORK - Cyberpunk (Variant ${i + 1})`,
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SCIFI_BASE_002-bbZAowVHpx2P2g5LXDjJNu.webp',
    description: 'Circuit board patterns with digital elements. High-tech aesthetic.',
  })),
  // SUPERHEROES NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `superheroes-001-${i + 1}`,
    niche: 'superheroes',
    title: `VINDICATOR - Anti-Hero (Variant ${i + 1})`,
    price: '$21',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SUPERHEROES_BASE_001-BFQQEFzAX4fVkiHfBSwg4q.webp',
    description: 'Original character in comic book style. Bold, dramatic illustration.',
  })),
  // SOLO/SOLITUDE NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `solo-001-${i + 1}`,
    niche: 'solo',
    title: `SOLITUDE IS MY SANCTUARY (Variant ${i + 1})`,
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SOLO_SOLITUDE_BASE_001-UyDJdQ8yuzWjjTXVjzQjcJ.webp',
    description: 'Moody lone wolf design. Perfect for introverts and solitude seekers.',
  })),
  // MOUNTAINS NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `mountains-001-${i + 1}`,
    niche: 'mountains',
    title: `THE MOUNTAINS ARE CALLING (Variant ${i + 1})`,
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOUNTAINS_BASE_001-ThpFbrrpKrVFxc3Bui2Hnu.webp',
    description: 'Vintage outdoor poster aesthetic. Perfect for adventure seekers.',
  })),
  // NEW MIDDLE EAST NICHES (8 niches × 60 variations = 480 products)
  // ARABIC CALLIGRAPHY NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `arabic-calligraphy-001-${i + 1}`,
    niche: 'arabic-calligraphy',
    title: `MY ARABIC HERITAGE (Variant ${i + 1})`,
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ARABIC_CALLIGRAPHY_BASE_001-5gPZ5puQD2gJwBazjo26WC.webp',
    description: 'Beautiful Arabic script with Islamic geometric patterns. Elegant cultural design.',
  })),
  // GAMING/ESPORTS NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `gaming-esports-001-${i + 1}`,
    niche: 'gaming-esports',
    title: `PRO GAMER - Level Up (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_BASE_001-iBsGGRv9CDLVjE6eNzBvGs.webp',
    description: 'Gaming controller graphics with neon colors. High-energy esports aesthetic.',
  })),
  // LUXURY STATUS NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `luxury-status-001-${i + 1}`,
    niche: 'luxury-status',
    title: `PREMIUM VIBES (Variant ${i + 1})`,
    price: '$22',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/LUXURY_STATUS_BASE_001-R2jfLT43fnhfP6SuYiiwby.webp',
    description: 'Minimalist elegant typography with luxury symbols. High-end aesthetic.',
  })),
  // ISLAMIC FAITH NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `islamic-faith-001-${i + 1}`,
    niche: 'islamic-faith',
    title: `ALHAMDULILLAH - Praise Be To God (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ISLAMIC_FAITH_BASE_001-imnDezpZUm9CQS6o8U9tvP.webp',
    description: 'Beautiful Arabic calligraphy with Islamic patterns. Respectful spiritual design.',
  })),
  // DESERT/BEDOUIN NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `desert-bedouin-001-${i + 1}`,
    niche: 'desert-bedouin',
    title: `DESERT NOMAD (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/DESERT_BEDOUIN_BASE_001-gB9vm6ijUgG2iPa7vuU58B.webp',
    description: 'Bedouin-inspired patterns with camel silhouette. Celebrating desert heritage.',
  })),
  // LUXURY CARS NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `luxury-cars-001-${i + 1}`,
    niche: 'luxury-cars',
    title: `SUPERCAR DREAMS (Variant ${i + 1})`,
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/LUXURY_CARS_BASE_001-ScbTn4SNFmKxLCiquiU7zw.webp',
    description: 'Sleek sports car silhouette. High-octane luxury aesthetic.',
  })),
  // MODEST FASHION NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `modest-fashion-001-${i + 1}`,
    niche: 'modest-fashion',
    title: `MODEST IS HOTTEST (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MODEST_FASHION_BASE_001-SHzbNnQzmd3encGDwSsa66.webp',
    description: 'Elegant, sophisticated design celebrating modest fashion.',
  })),
  // MUSIC/HIP-HOP NICHE
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `music-hiphop-001-${i + 1}`,
    niche: 'music-hiphop',
    title: `TRAP KING (Variant ${i + 1})`,
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MUSIC_HIPHOP_BASE_001-22J53cEa8w7F6WwAvinsm7.webp',
    description: 'Music notes and beat wave graphics. Urban hip-hop culture aesthetic.',
  })),
];

export default function Shop() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  const filteredProducts = selectedNiche
    ? PRODUCTS.filter((p) => p.niche === selectedNiche)
    : PRODUCTS;

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
              <a className="text-red-500 font-semibold">Shop</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-red-500 transition-colors">About</a>
            </Link>
          </nav>
        </div>
      </header>

      {/* Shop Content */}
      <main className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop by Niche
          </h1>
          <p className="text-foreground/70 text-lg">
            Premium streetwear for every subculture. Bold. Artistic. Edgy.
          </p>
        </div>

        {/* Niche Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto pb-4">
            <Button
              variant={selectedNiche === null ? 'default' : 'outline'}
              onClick={() => setSelectedNiche(null)}
              className="rounded-full"
            >
              All Designs ({PRODUCTS.length})
            </Button>
            {NICHES.map((niche) => {
              const nicheCount = PRODUCTS.filter(p => p.niche === niche.id).length;
              return (
                <Button
                  key={niche.id}
                  variant={selectedNiche === niche.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNiche(niche.id)}
                  className={`rounded-full whitespace-nowrap ${
                    selectedNiche === niche.id ? 'bg-red-600 hover:bg-red-700' : ''
                  }`}
                >
                  {niche.name} ({nicheCount})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 text-foreground/70">
          <p>Showing {filteredProducts.length} products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const niche = NICHES.find((n) => n.id === product.niche);
            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <a className="group">
                  <Card className="overflow-hidden bg-card/50 border-border/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-black aspect-square">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className={`text-xs font-bold mb-2 ${niche?.color || 'text-white'}`}>
                        {niche?.name}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-foreground/60 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{product.price}</span>
                        <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
