import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: number;
  niche: string;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
  tags: string[];
}

interface Niche {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

// 10 FOOTBALL DESIGNS - Ready for Launch
const PRODUCTS: Product[] = [
  {
    id: 1,
    niche: 'football',
    name: 'CR7 FOREVER',
    title: 'CR7 Forever - Cristiano Ronaldo Tribute',
    description: 'Premium football streetwear celebrating the GOAT. Features iconic CR7 imagery with Arabic football culture text.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_001_CR7_LEGEND-G9WTgaEk8vEFCgcT75ysnQ.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'cr7', 'ronaldo', 'soccer']
  },
  {
    id: 2,
    niche: 'football',
    name: 'MESSI MAGIC',
    title: 'Messi Magic - Lionel Messi Tribute',
    description: 'Celebrate football excellence with Messi\'s dribbling artistry. Premium graphics with Arabic and English text.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_002_MESSI_MAGIC-n7uUhYPpQiGEuwtywW2MpD.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'messi', 'soccer']
  },
  {
    id: 3,
    niche: 'football',
    name: 'SAUDI PRO LEAGUE',
    title: 'Saudi Pro League - Local Pride',
    description: 'Show your pride for Saudi Pro League football. Features team colors and local football passion with bilingual design.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_003_SAUDI_PRO_LEAGUE-j9VZkT3PwCRxKQ9Nc9A3NV.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'saudi', 'pro league']
  },
  {
    id: 4,
    niche: 'football',
    name: 'GOAT CULTURE',
    title: 'GOAT Culture - Greatest of All Time',
    description: 'Celebrate football excellence with this GOAT culture design. Premium graphics celebrating the greatest players.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_004_GOAT_CULTURE-gzAf2s2VbQNGCVmxRqF8Gr.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'goat', 'soccer']
  },
  {
    id: 5,
    niche: 'football',
    name: 'PASSION GAME',
    title: 'Passion Game - Football Love',
    description: 'For those who live and breathe football. This design captures the passion and emotion of the beautiful game.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_005_PASSION_GAME-az2NnpaVWWp2p2TVF4TgcK.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'passion', 'soccer']
  },
  {
    id: 6,
    niche: 'football',
    name: 'NEYMAR MAGIC',
    title: 'Neymar Magic - Flair & Skill',
    description: 'Neymar-inspired design with dribbling artistry and flair. Features bilingual Arabic-English text.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_006_NEYMAR_MAGIC-JDHqANJwgzcyAWdSwyo8Vr.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'neymar', 'soccer']
  },
  {
    id: 7,
    niche: 'football',
    name: 'HAALAND STRIKER',
    title: 'Haaland Striker - Goal Machine',
    description: 'Erling Haaland goal celebration design with power and dominance. Celebrating the modern striker.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_007_HAALAND_STRIKER-KdRUVmd6KMABU4txv6ktde.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'haaland', 'striker']
  },
  {
    id: 8,
    niche: 'football',
    name: 'BENZEMA LEGEND',
    title: 'Benzema Legend - Football Artistry',
    description: 'Karim Benzema elegance and football artistry. Celebrating one of football\'s greatest strikers.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_008_BENZEMA_LEGEND-85kqBCjAWLsWAnLYcZgova.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'benzema', 'legend']
  },
  {
    id: 9,
    niche: 'football',
    name: 'FOOTBALL UNITED',
    title: 'Football United - Diversity & Teamwork',
    description: 'Diverse players united in football passion. Celebrates unity, teamwork, and the beautiful game.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_009_FOOTBALL_UNITED-PoFAYu49xXTVfkCrLNMxPQ.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'unity', 'teamwork']
  },
  {
    id: 10,
    niche: 'football',
    name: 'CHAMPIONS MINDSET',
    title: 'Champions Mindset - Trophy Culture',
    description: 'Trophy and winner imagery celebrating championship culture. Perfect for those with a champion\'s mindset.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_010_CHAMPIONS_MINDSET-5G2W2wLWitWjL9q247suHt.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'champions', 'mindset']
  }
];

const NICHES: Niche[] = [
  {
    id: 'football',
    name: 'Football ⚽',
    description: 'Premium football streetwear celebrating the beautiful game',
    count: 10,
    color: '#ef4444'
  },
  {
    id: 'gaming',
    name: 'Gaming 🎮',
    description: 'Gaming culture and esports passion',
    count: 0,
    color: '#06b6d4'
  },
  {
    id: 'anime',
    name: 'Anime 🎌',
    description: 'Anime and manga inspired designs',
    count: 0,
    color: '#a855f7'
  },
  {
    id: 'kpop',
    name: 'K-Pop 🎤',
    description: 'K-pop and K-drama fandom culture',
    count: 0,
    color: '#ec4899'
  },
  {
    id: 'fitness',
    name: 'Fitness 💪',
    description: 'Gym culture and fitness motivation',
    count: 0,
    color: '#fbbf24'
  },
  {
    id: 'women',
    name: 'Women 👩',
    description: 'Empowerment, fashion, and lifestyle',
    count: 0,
    color: '#f97316'
  },
  {
    id: 'kids',
    name: 'Kids 👶',
    description: 'Fun, colorful designs for ages 2-5',
    count: 0,
    color: '#10b981'
  },
  {
    id: 'indian-youth',
    name: 'Indian Youth 🇮🇳',
    description: 'Bollywood, festivals, desi culture',
    count: 0,
    color: '#f59e0b'
  },
  {
    id: 'mythical',
    name: 'Mythical 🔮',
    description: 'Mystical creatures, occult symbols, spiritual themes',
    count: 0,
    color: '#8b5cf6'
  }
];

export default function Shop() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>('football');

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
            Premium Streetwear
          </h1>
          <p className="text-foreground/70 text-lg">
            Curated designs across 9 unique niches. More designs coming soon.
          </p>
        </div>

        {/* Niche Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 pb-4">
            {NICHES.map((niche) => {
              const nicheCount = PRODUCTS.filter(p => p.niche === niche.id).length;
              return (
                <Button
                  key={niche.id}
                  variant={selectedNiche === niche.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNiche(niche.id)}
                  className="rounded-full text-sm"
                  disabled={nicheCount === 0}
                >
                  {niche.name} {nicheCount > 0 && `(${nicheCount})`}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-red-500/50"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-black h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-foreground/60">{product.title}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-foreground/70 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">
              More designs coming soon for this niche!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
