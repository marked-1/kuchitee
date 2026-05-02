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
  { id: 'biking', name: 'Biking', color: 'text-red-500' },
  { id: 'sarcasm', name: 'Sarcasm', color: 'text-white' },
  { id: 'womens-sarcasm', name: "Women's Sarcasm", color: 'text-pink-500' },
  { id: 'motivational', name: 'Motivational', color: 'text-yellow-500' },
  { id: 'scifi', name: 'Sci-Fi', color: 'text-cyan-500' },
  { id: 'superheroes', name: 'Superheroes', color: 'text-red-600' },
  { id: 'solo', name: 'Solo/Solitude', color: 'text-gray-400' },
  { id: 'mountains', name: 'Mountains', color: 'text-orange-600' },
];

const PRODUCTS: Product[] = [
  {
    id: 'biking-001',
    niche: 'biking',
    title: 'VELOCITY - Ride or Die',
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/BIKING_001_20260502-DeH7jqc88G8QwDqoqvft4P.webp',
    description: 'Bold biker graphic with speed lines and motorcycle silhouette. Premium oversized tee.',
  },
  {
    id: 'sarcasm-001',
    niche: 'sarcasm',
    title: 'I Speak Fluent Dry Humor',
    price: '$16',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SARCASM_001_20260502-Fvc74fpgVMqCp26CdXvRKD.webp',
    description: 'Minimal text-based design with condensed typography. Deadpan comedy vibes.',
  },
  {
    id: 'womens-sarcasm-001',
    niche: 'womens-sarcasm',
    title: 'Sweet as Sugar, Cold as Ice',
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/WOMENS_SARCASM_001_20260502-UekqvNpNrz3azRve9pJ9f3.webp',
    description: 'Edgy feminine design with floral elements and girl-power attitude. Black crop top.',
  },
  {
    id: 'motivational-001',
    niche: 'motivational',
    title: 'Pain Builds Strength',
    price: '$17',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOTIVATIONAL_001_20260502-eAqeoHdADr9t7Zst4S9wU4.webp',
    description: 'Inspirational grind culture quote with strong display typography.',
  },
  {
    id: 'scifi-001',
    niche: 'scifi',
    title: 'Singularity - The End of Us',
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SCIFI_001_20260502-FGKcNUFJ8KJLsURyyh3E3a.webp',
    description: 'Cyberpunk AI aesthetic with glitchy textures and neon colors.',
  },
  {
    id: 'superheroes-001',
    niche: 'superheroes',
    title: 'The Vindicator',
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SUPERHEROES_001_20260502-5ywb4KeoJAgbtozDGPtJZB.webp',
    description: 'Original anti-hero character in comic-book line art style.',
  },
  {
    id: 'solo-001',
    niche: 'solo',
    title: 'Solitude is My Sanctuary',
    price: '$17',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SOLO_SOLITUDE_001_20260502-WuFztEPoSLbzBQy2ryMU35.webp',
    description: 'Moody, atmospheric lone wolf design with minimal aesthetic.',
  },
  {
    id: 'mountains-001',
    niche: 'mountains',
    title: 'The Mountains Are Calling',
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOUNTAINS_001_20260502-Ui2yzMDhMuDPUnmnCCyipR.webp',
    description: 'Vintage outdoor poster aesthetic with hiking adventure vibes.',
  },
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
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedNiche === null ? 'default' : 'outline'}
              onClick={() => setSelectedNiche(null)}
              className="rounded-full"
            >
              All Designs
            </Button>
            {NICHES.map((niche) => (
              <Button
                key={niche.id}
                variant={selectedNiche === niche.id ? 'default' : 'outline'}
                onClick={() => setSelectedNiche(niche.id)}
                className={`rounded-full ${
                  selectedNiche === niche.id ? 'bg-red-600 hover:bg-red-700' : ''
                }`}
              >
                {niche.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
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
