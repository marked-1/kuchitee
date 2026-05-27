import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, Check } from 'lucide-react';
import { getProductById } from '@shared/products';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id || '';
  const product = getProductById(productId);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
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
              className="w-full h-full object-cover max-h-[600px]"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-red-500 font-bold text-sm mb-2 uppercase">{product.niche}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-white mb-6">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-foreground/80 text-lg mb-8">
              {product.longDescription}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size || (!selectedSize && size === product.sizes[0])
                        ? 'border-red-500 bg-red-500/20 text-red-500'
                        : 'border-border text-white hover:border-red-500'
                    }`}
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
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedColor === color || (!selectedColor && color === product.colors[0])
                        ? 'border-red-500 bg-red-500/20 text-red-500'
                        : 'border-border text-white hover:border-red-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Stock Status */}
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 font-semibold">
                {product.inStock ? (
                  <>✓ In Stock - Ships within 2-3 business days</>
                ) : (
                  <>✗ Out of Stock - Join waitlist</>
                )}
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
