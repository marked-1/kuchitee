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

// 20 UNIQUE PRODUCTS across 5 trending Middle East niches
const PRODUCTS: Product[] = [
  // FOOTBALL (4 products)
  {
    id: 1,
    niche: 'football',
    name: 'CR7 FOREVER',
    title: 'CR7 Forever - Cristiano Ronaldo Tribute',
    description: 'Premium football streetwear celebrating the GOAT. Features iconic CR7 imagery with Arabic football culture text. Perfect for football fans across the Middle East.',
    price: 24.99,
    image: '/manus-storage/FOOTBALL_001_CR7_LEGEND_467830ac.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'cr7', 'ronaldo', 'soccer', 'streetwear']
  },
  {
    id: 2,
    niche: 'football',
    name: 'GOAT CULTURE',
    title: 'GOAT Culture - Greatest of All Time',
    description: 'Celebrate football excellence with this GOAT culture design. Features premium graphics with Arabic and English text celebrating the greatest players.',
    price: 24.99,
    image: '/manus-storage/FOOTBALL_002_GOAT_CULTURE_0c5b2817.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'goat', 'soccer', 'culture']
  },
  {
    id: 3,
    niche: 'football',
    name: 'SAUDI PRO LEAGUE',
    title: 'Saudi Pro League - Local Pride',
    description: 'Show your pride for Saudi Pro League football. Features team colors and local football passion with bilingual design.',
    price: 24.99,
    image: '/manus-storage/FOOTBALL_003_SAUDI_PRO_LEAGUE_a5602f93.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'saudi', 'pro league', 'soccer']
  },
  {
    id: 4,
    niche: 'football',
    name: 'PASSION GAME',
    title: 'Passion Game - Football Love',
    description: 'For those who live and breathe football. This design captures the passion and emotion of the beautiful game.',
    price: 24.99,
    image: '/manus-storage/FOOTBALL_004_PASSION_GAME_d51b0d95.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'passion', 'soccer', 'love']
  },

  // GAMING (4 products)
  {
    id: 5,
    niche: 'gaming',
    name: 'PRO GAMER',
    title: 'Pro Gamer - Esports Culture',
    description: 'Premium gaming streetwear for competitive gamers. Features neon accents and gaming terminology in Arabic and English.',
    price: 22.99,
    image: '/manus-storage/GAMING_001_PRO_GAMER_60bf8366.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['gaming', 'esports', 'gamer', 'pro']
  },
  {
    id: 6,
    niche: 'gaming',
    name: 'LEVEL UP',
    title: 'Level Up - Gaming Progression',
    description: 'Retro gaming meets modern streetwear. Pixelated graphics with Arabic gaming culture. Perfect for gamers who appreciate classic gaming aesthetics.',
    price: 22.99,
    image: '/manus-storage/GAMING_002_LEVEL_UP_6e2401ab.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['gaming', 'level up', 'retro', 'arcade']
  },
  {
    id: 7,
    niche: 'gaming',
    name: 'GAMER MINDSET',
    title: 'Gamer Mindset - Focus & Dominate',
    description: 'Esports motivation design. Features headset graphics and competitive gaming philosophy with Arabic text.',
    price: 22.99,
    image: '/manus-storage/GAMING_003_GAMER_MINDSET_9cb8e1bf.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['gaming', 'mindset', 'esports', 'focus']
  },
  {
    id: 8,
    niche: 'gaming',
    name: 'RESPAWN',
    title: 'Respawn - Gaming Passion',
    description: 'Gaming culture design celebrating the respawn mentality. Never give up, always come back stronger.',
    price: 22.99,
    image: '/manus-storage/GAMING_004_RESPAWN_bfd585a5.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['gaming', 'respawn', 'passion', 'persistence']
  },

  // ANIME (4 products)
  {
    id: 9,
    niche: 'anime',
    name: 'DRAGON BALL',
    title: 'Dragon Ball - Anime Warrior',
    description: 'Goku-inspired anime design with Arabic calligraphy fusion. Premium quality for anime enthusiasts.',
    price: 21.99,
    image: '/manus-storage/ANIME_001_DRAGON_BALL_6808e392.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['anime', 'dragon ball', 'goku', 'warrior']
  },
  {
    id: 10,
    niche: 'anime',
    name: 'DEMON SLAYER',
    title: 'Demon Slayer - Anime Action',
    description: 'Demon Slayer inspired design with sword and flame graphics. Features Arabic anime culture text.',
    price: 21.99,
    image: '/manus-storage/ANIME_002_DEMON_SLAYER_9839d100.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['anime', 'demon slayer', 'action', 'sword']
  },
  {
    id: 11,
    niche: 'anime',
    name: 'NARUTO',
    title: 'Naruto - Anime Warrior',
    description: 'Naruto-inspired design with ninja elements and Arabic text. Celebrate anime passion with this premium tee.',
    price: 21.99,
    image: '/manus-storage/ANIME_003_NARUTO_cac5d7fd.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['anime', 'naruto', 'ninja', 'warrior']
  },
  {
    id: 12,
    niche: 'anime',
    name: 'JUJUTSU KAISEN',
    title: 'Jujutsu Kaisen - Cursed Energy',
    description: 'Jujutsu Kaisen inspired design with cursed energy graphics. Premium anime streetwear with Arabic fusion.',
    price: 21.99,
    image: '/manus-storage/ANIME_004_JUJUTSU_KAISEN_02db550b.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['anime', 'jujutsu kaisen', 'cursed energy', 'modern']
  },

  // K-POP (4 products)
  {
    id: 13,
    niche: 'kpop',
    name: 'ARMY FOREVER',
    title: 'ARMY Forever - BTS Fandom',
    description: 'BTS inspired design celebrating the ARMY fandom. Features iconic BTS imagery with Arabic and English text.',
    price: 22.99,
    image: '/manus-storage/KPOP_001_ARMY_FOREVER_fb204375.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['kpop', 'bts', 'army', 'fandom', 'music']
  },
  {
    id: 14,
    niche: 'kpop',
    name: 'BLACKPINK',
    title: 'Blackpink - Girl Power',
    description: 'Blackpink inspired design celebrating girl power and K-pop culture. Premium quality with bilingual text.',
    price: 22.99,
    image: '/manus-storage/KPOP_002_BLACKPINK_9aa1f75a.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['kpop', 'blackpink', 'girl power', 'music']
  },
  {
    id: 15,
    niche: 'kpop',
    name: 'K-DRAMA VIBES',
    title: 'K-Drama Vibes - Romance & Drama',
    description: 'K-drama inspired design with romantic and dramatic elements. Perfect for K-drama enthusiasts.',
    price: 22.99,
    image: '/manus-storage/KPOP_003_KDRAMA_VIBES_dcfbd98b.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['kdrama', 'romance', 'drama', 'korean']
  },
  {
    id: 16,
    niche: 'kpop',
    name: 'K-POP STAN',
    title: 'K-POP STAN - Global Fandom',
    description: 'Celebrate K-pop fandom culture with this premium design. Features music and performance graphics with Arabic fan terminology.',
    price: 22.99,
    image: '/manus-storage/KPOP_004_KPOP_STAN_78af78d0.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['kpop', 'stan', 'fandom', 'music', 'global']
  },

  // FITNESS (4 products)
  {
    id: 17,
    niche: 'fitness',
    name: 'GYM RAT',
    title: 'Gym Rat - Bodybuilding Lifestyle',
    description: 'Premium fitness streetwear celebrating gym culture. Features muscular silhouettes with Arabic gym terminology.',
    price: 23.99,
    image: '/manus-storage/FITNESS_001_GYM_RAT_cb3f6c1f.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['fitness', 'gym', 'bodybuilding', 'workout']
  },
  {
    id: 18,
    niche: 'fitness',
    name: 'NO PAIN NO GAIN',
    title: 'No Pain No Gain - Fitness Motivation',
    description: 'Classic gym motivation design with bilingual text. Perfect for fitness enthusiasts and bodybuilders.',
    price: 23.99,
    image: '/manus-storage/FITNESS_002_NO_PAIN_0b4b0036.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['fitness', 'motivation', 'gym', 'bodybuilding']
  },
  {
    id: 19,
    niche: 'fitness',
    name: 'GRIND CULTURE',
    title: 'Grind Culture - Discipline & Dedication',
    description: 'Celebrate the grind with this premium fitness design. Features bodybuilding imagery with Arabic gym slang.',
    price: 23.99,
    image: '/manus-storage/FITNESS_003_GRIND_CULTURE_f6e32b5c.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['fitness', 'grind', 'discipline', 'bodybuilding']
  },
  {
    id: 20,
    niche: 'fitness',
    name: 'BEAST MODE',
    title: 'Beast Mode - Aggressive Fitness',
    description: 'Aggressive fitness design celebrating beast mode mentality. Premium quality with Arabic fitness terminology.',
    price: 23.99,
    image: '/manus-storage/FITNESS_004_BEAST_MODE_df2b2181.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['fitness', 'beast', 'mode', 'bodybuilding']
  }
];

const NICHES: Niche[] = [
  {
    id: 'football',
    name: 'Football ⚽',
    description: 'Premium football streetwear celebrating the beautiful game',
    count: 4,
    color: '#ef4444'
  },
  {
    id: 'gaming',
    name: 'Gaming 🎮',
    description: 'Gaming culture and esports passion',
    count: 4,
    color: '#06b6d4'
  },
  {
    id: 'anime',
    name: 'Anime 🎌',
    description: 'Anime and manga inspired designs',
    count: 4,
    color: '#a855f7'
  },
  {
    id: 'kpop',
    name: 'K-Pop 🎤',
    description: 'K-pop and K-drama fandom culture',
    count: 4,
    color: '#ec4899'
  },
  {
    id: 'fitness',
    name: 'Fitness 💪',
    description: 'Gym culture and fitness motivation',
    count: 4,
    color: '#fbbf24'
  }
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
            20 Unique Designs
          </h1>
          <p className="text-foreground/70 text-lg">
            Premium streetwear across 5 trending Middle East niches. Bold. Unique. Culturally Relevant.
          </p>
        </div>

        {/* Niche Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 pb-4">
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
                  className="rounded-full"
                >
                  {niche.name} ({nicheCount})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">No products found in this niche.</p>
          </div>
        )}
      </main>
    </div>
  );
}
