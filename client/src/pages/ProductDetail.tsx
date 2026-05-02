import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

const PRODUCTS: Record<string, any> = {
  'biking-001': {
    title: 'VELOCITY - Ride or Die',
    niche: 'Biking',
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/BIKING_001_20260502-DeH7jqc88G8QwDqoqvft4P.webp',
    description: 'Bold biker graphic with speed lines and motorcycle silhouette. Premium oversized tee.',
    longDescription: 'Experience the thrill of the open road with our VELOCITY tee. Featuring a bold motorcycle graphic with dynamic speed lines, this design captures the essence of freedom and adrenaline. Made from premium oversized fabric with a dropped shoulder fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'sarcasm-001': {
    title: 'I Speak Fluent Dry Humor',
    niche: 'Sarcasm',
    price: '$16',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SARCASM_001_20260502-Fvc74fpgVMqCp26CdXvRKD.webp',
    description: 'Minimal text-based design with condensed typography. Deadpan comedy vibes.',
    longDescription: 'For those who speak in sarcasm and deadpan humor. This minimalist design features bold, condensed typography that makes a statement without saying much. Perfect for introverts and comedy lovers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'womens-sarcasm-001': {
    title: 'Sweet as Sugar, Cold as Ice',
    niche: "Women's Sarcasm",
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/WOMENS_SARCASM_001_20260502-UekqvNpNrz3azRve9pJ9f3.webp',
    description: 'Edgy feminine design with floral elements and girl-power attitude. Black crop top.',
    longDescription: 'Embrace your fierce feminine energy. This design combines edgy typography with delicate floral elements, creating a powerful contrast. The crop top fit is perfect for layering or standing out on its own.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    inStock: true,
  },
  'motivational-001': {
    title: 'Pain Builds Strength',
    niche: 'Motivational',
    price: '$17',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOTIVATIONAL_001_20260502-eAqeoHdADr9t7Zst4S9wU4.webp',
    description: 'Inspirational grind culture quote with strong display typography.',
    longDescription: 'For the grinders and hustlers. This design features an inspirational message about resilience and growth. Every challenge is an opportunity to build strength.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'scifi-001': {
    title: 'Singularity - The End of Us',
    niche: 'Sci-Fi',
    price: '$19',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SCIFI_001_20260502-FGKcNUFJ8KJLsURyyh3E3a.webp',
    description: 'Cyberpunk AI aesthetic with glitchy textures and neon colors.',
    longDescription: 'Enter the future with our Singularity design. Featuring a cyberpunk aesthetic with glitchy AI imagery and neon accents, this tee is perfect for sci-fi enthusiasts and tech lovers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'superheroes-001': {
    title: 'The Vindicator',
    niche: 'Superheroes',
    price: '$20',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SUPERHEROES_001_20260502-5ywb4KeoJAgbtozDGPtJZB.webp',
    description: 'Original anti-hero character in comic-book line art style.',
    longDescription: 'Meet The Vindicator, an original anti-hero character created exclusively for KuchiTee. This comic-book style design features bold line art and dynamic action poses.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'solo-001': {
    title: 'Solitude is My Sanctuary',
    niche: 'Solo/Solitude',
    price: '$17',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/SOLO_SOLITUDE_001_20260502-WuFztEPoSLbzBQy2ryMU35.webp',
    description: 'Moody, atmospheric lone wolf design with minimal aesthetic.',
    longDescription: 'For the introverts and lone wolves. This moody, atmospheric design celebrates the beauty of solitude and self-reliance. Minimal aesthetic with maximum impact.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
  'mountains-001': {
    title: 'The Mountains Are Calling',
    niche: 'Mountains',
    price: '$18',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/MOUNTAINS_001_20260502-Ui2yzMDhMuDPUnmnCCyipR.webp',
    description: 'Vintage outdoor poster aesthetic with hiking adventure vibes.',
    longDescription: 'Answer the call of the mountains. This vintage-inspired design captures the spirit of adventure and exploration. Perfect for hikers, climbers, and nature lovers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
  },
};

export default function ProductDetail() {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id || '';
  const product = PRODUCTS[productId];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/shop">
            <a className="text-red-500 hover:text-red-400">Back to Shop</a>
          </Link>
        </div>
      </div>
    );
  }

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
              <a className="text-foreground hover:text-red-500 transition-colors">About</a>
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-4">
        <Link href="/shop">
          <a className="inline-flex items-center gap-2 text-foreground/70 hover:text-red-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </a>
        </Link>
      </div>

      {/* Product Detail */}
      <main className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-red-500 font-bold text-sm mb-2">{product.niche}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-white mb-6">{product.price}</p>
            </div>

            <p className="text-foreground/80 text-lg mb-8">
              {product.longDescription}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-border rounded-lg text-white hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    className="px-4 py-2 border border-border rounded-lg text-white hover:border-red-500 transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>

            {/* Stock Status */}
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 font-semibold">
                ✓ In Stock - Ships within 2-3 business days
              </p>
            </div>

            {/* Description */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-white font-bold text-lg mb-4">About This Design</h3>
              <p className="text-foreground/70">
                Each KuchiTee design is carefully crafted to represent a unique subculture and aesthetic. 
                We use premium oversized cuts with dropped shoulders and heavy ribbed crewnecks for that 
                authentic streetwear feel. All designs are printed using DTF (Direct to Film) technology 
                for vibrant, long-lasting colors.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
