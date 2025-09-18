import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

// Fallback featured products
const fallbackProducts = [
  {
    id: '1',
    name: 'Modern Sectional Sofa',
    slug: 'modern-sectional-sofa',
    price: 899,
    original_price: 1199,
    discount_percentage: 25,
    rating: 4.2,
    review_count: 124,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Gray', 'Navy', 'Charcoal'],
    is_bestseller: true,
    is_new: false,
    category_id: 'sofas',
    stock_quantity: 15,
  },
  {
    id: '2',
    name: 'Minimalist Loveseat',
    slug: 'minimalist-loveseat',
    price: 649,
    original_price: null,
    discount_percentage: null,
    rating: 4.5,
    review_count: 67,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Beige', 'White', 'Light Gray'],
    is_bestseller: false,
    is_new: true,
    category_id: 'sofas',
    stock_quantity: 8,
  },
  {
    id: '3',
    name: 'Glass Top Coffee Table',
    slug: 'glass-top-coffee-table',
    price: 399,
    original_price: 499,
    discount_percentage: 20,
    rating: 4.1,
    review_count: 89,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Clear Glass', 'Smoked Glass'],
    is_bestseller: true,
    is_new: false,
    category_id: 'tables',
    stock_quantity: 12,
  },
  {
    id: '4',
    name: 'Platform Bed Frame',
    slug: 'platform-bed-frame',
    price: 549,
    original_price: null,
    discount_percentage: null,
    rating: 4.4,
    review_count: 156,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Walnut', 'Oak', 'White'],
    is_bestseller: true,
    is_new: false,
    category_id: 'beds',
    stock_quantity: 6,
  },
];

const FeaturedProducts = () => {
  const { data: products = fallbackProducts, isLoading, error } = useProducts({ featured: true, limit: 4 });
  const { addItem } = useCart();
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set());
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  const displayProducts = error ? fallbackProducts : products;

  const toggleFavorite = (productId: string) => {
    setFavoriteItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleImageHover = (productId: string, direction: 'enter' | 'leave') => {
    const product = displayProducts.find(p => p.id === productId);
    if (!product?.images || product.images.length <= 1) return;

    setImageIndexes(prev => ({
      ...prev,
      [productId]: direction === 'enter' ? 1 : 0
    }));
  };

  const handleAddToCart = (product: any) => {
    addItem(product, 1, product.colors?.[0]);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Handpicked favorites from our collection - the best in style, comfort, and quality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="bg-muted rounded h-4 w-32 mb-2"></div>
                <div className="bg-muted rounded h-4 w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Handpicked favorites from our collection - the best in style, comfort, and quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-luxury hover:border-primary/20"
            >
              {/* Product Image */}
              <div 
                className="relative aspect-square overflow-hidden bg-muted"
                onMouseEnter={() => handleImageHover(product.id, 'enter')}
                onMouseLeave={() => handleImageHover(product.id, 'leave')}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                  {product.is_bestseller && (
                    <Badge className="bg-warning text-warning-foreground font-semibold">
                      Best Seller
                    </Badge>
                  )}
                  {product.is_new && (
                    <Badge className="bg-success text-success-foreground font-semibold">
                      New
                    </Badge>
                  )}
                  {product.discount_percentage && (
                    <Badge variant="destructive" className="font-semibold">
                      -{product.discount_percentage}%
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`w-4 h-4 transition-all duration-300 ${
                      favoriteItems.has(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>

                {/* Product Image with Hover Effect */}
                <motion.div 
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.images?.[imageIndexes[product.id] || 0] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                </motion.div>

                {/* Add to Cart Button - Shows on Hover */}
                <motion.div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-hero shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category_id}
                </div>
                
                <Link 
                  to={`/product/${product.slug}`}
                  className="block group-hover:text-primary transition-colors duration-300"
                >
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.review_count})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.original_price}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-xs text-muted-foreground">
                  {product.stock_quantity > 0 
                    ? `${product.stock_quantity} in stock` 
                    : 'Out of stock'
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <Button variant="outline" size="lg" className="btn-hero-outline">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;