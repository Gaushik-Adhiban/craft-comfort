import React from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { navigationMenuItems } from '@/data/navigationMenuItems';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, RotateCcw, Sparkles, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Luxury Brand Statement */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-primary px-6 py-3 rounded-full text-white">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Premium Quality Since 2020</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              Crafting Luxury,<br />Defining Comfort
            </h2>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              Experience the perfect blend of Scandinavian design and modern luxury. 
              Every piece tells a story of craftsmanship, sustainability, and timeless elegance.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-semibold">Award Winning Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-secondary" />
                <span className="font-semibold">Premium Materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="font-semibold">Timeless Style</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Collections</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">
              From intimate living spaces to grand entertaining areas, discover furniture that transforms houses into homes and reflects your unique style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8"
          >
            {navigationMenuItems.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group perspective-1000"
              >
                <Link
                  to={category.href}
                  className="block p-8 bg-gradient-card border border-border rounded-xl text-center hover:shadow-2xl transition-all duration-500 hover:border-primary/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                      whileHover={{ rotateY: 180, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-primary-foreground font-bold text-2xl">
                        {category.name.charAt(0)}
                      </span>
                    </motion.div>
                    <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.subcategories?.length || 0}+ items
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Luxury Pieces</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">
              Handpicked masterpieces from our collection — where exceptional design meets uncompromising quality and comfort.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="btn-hero text-lg px-12 py-4">
                <Link to="/category/living-room">
                  Discover All Collections
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The FurnWorld Promise</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">
              We're committed to delivering an exceptional experience that goes beyond furniture — 
              creating lasting relationships built on trust, quality, and unparalleled service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div 
              className="text-center space-y-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Truck className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-primary/20 rounded-3xl mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Premium Delivery</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  White-glove delivery service with expert assembly included. Free shipping on orders over $99 with our luxury delivery experience.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="text-center space-y-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 bg-gradient-secondary rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="w-12 h-12 text-secondary-foreground" />
                </motion.div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-secondary/20 rounded-3xl mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Lifetime Quality</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Comprehensive warranty with premium materials and masterful craftsmanship. Our furniture is built to last generations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="text-center space-y-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <RotateCcw className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-primary/20 rounded-3xl mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Hassle-Free Returns</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  60-day satisfaction guarantee with free returns. Love it or return it — no questions asked, no hidden fees.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Join the FurnWorld<br />
                <span className="text-secondary">Luxury Experience</span>
              </h2>
              <p className="text-white/90 text-2xl max-w-3xl mx-auto font-light">
                Be the first to discover our exclusive collections, insider design tips, 
                and special member-only offers delivered directly to your inbox.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 backdrop-blur-md text-lg"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl">
                  Subscribe Now
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-6 text-white/80"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="font-medium">Exclusive Previews</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="font-medium">Design Inspiration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="font-medium">Member Discounts</span>
              </div>
            </motion.div>
            
            <p className="text-white/60 text-sm">
              Join over 50,000+ design enthusiasts. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
