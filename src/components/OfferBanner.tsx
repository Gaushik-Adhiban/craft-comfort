import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOffers } from '@/hooks/useOffers';
import { Link } from 'react-router-dom';

// Fallback offer data
const fallbackOffer = {
  id: '1',
  title: 'Limited Time: Spring Collection Sale',
  description: 'Transform your space with our premium furniture collection. Up to 40% off selected items.',
  discount_percentage: 40,
  code: 'SPRING40',
  image_url: '/placeholder.svg',
};

const OfferBanner = () => {
  const { data: offers = [], isLoading, error } = useOffers();
  
  // Use the first active offer or fallback
  const currentOffer = error || !offers.length ? fallbackOffer : offers[0];

  if (isLoading) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="animate-pulse bg-muted rounded-2xl h-48"></div>
        </div>
      </section>
    );
  }

  if (!currentOffer) return null;

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-primary rounded-2xl overflow-hidden shadow-luxury"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80" />
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-white/5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)', backgroundSize: '60px 60px' }} />
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-4 right-8 text-white/20"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-8 text-white/20"
            animate={{
              y: [10, -10, 10],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <div className="relative z-10 py-12 px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Discount Badge */}
              {currentOffer.discount_percentage && (
                <motion.div
                  className="inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                    UP TO {currentOffer.discount_percentage}% OFF
                  </div>
                </motion.div>
              )}

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {currentOffer.title}
              </h2>
              
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                {currentOffer.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Promo Code */}
                {currentOffer.code && (
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20"
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      scale: 1.02 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs text-white/80 uppercase tracking-wider mb-1">
                      Promo Code
                    </div>
                    <div className="font-mono font-bold text-lg">
                      {currentOffer.code}
                    </div>
                  </motion.div>
                )}

                {/* CTA Button */}
                <Link to="/products">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                    >
                      Shop Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent) border-box',
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OfferBanner;