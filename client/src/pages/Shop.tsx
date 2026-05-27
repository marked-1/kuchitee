import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PRODUCTS, NICHES } from '@shared/products';

export default function Shop() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>('anime');

  const filteredProducts = selectedNiche
    ? PRODUCTS.filter((p) => p.niche === selectedNiche)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-background">
      {/* Shop Content */}
      <main className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Streetwear
          </h1>
          <p className="text-foreground/70 text-lg">
            {PRODUCTS.length} unique designs across {NICHES.length} niches. More coming soon!
          </p>
        </div>

        {/* Niche Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 pb-4">
            <Button
              variant={selectedNiche === null ? 'default' : 'outline'}
              onClick={() => setSelectedNiche(null)}
              className="rounded-full text-sm"
            >
              All ({PRODUCTS.length})
            </Button>
            {NICHES.map((niche) => {
              const nicheCount = PRODUCTS.filter((p) => p.niche === niche.id).length;
              return (
                <Button
                  key={niche.id}
                  variant={selectedNiche === niche.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNiche(niche.id)}
                  className="rounded-full text-sm"
                >
                  {niche.icon} {niche.name} ({nicheCount})
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
                <Link href={`/product/${product.id}`}>
                  <div className="relative overflow-hidden bg-black h-64 cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </Link>

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
                    <Link href={`/product/${product.id}`}>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        View
                      </Button>
                    </Link>
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
