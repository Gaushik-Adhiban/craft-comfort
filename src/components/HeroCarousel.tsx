import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroMain from '@/assets/hero-main.jpg';
import heroLivingRoom from '@/assets/hero-living-room.jpg';
import heroBedroom from '@/assets/hero-bedroom.jpg';
import heroDining from '@/assets/hero-dining.jpg';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Transform Your Space",
    subtitle: "Luxury Living Collection",
    description: "Discover our curated selection of premium furniture designed to elevate your living space with unparalleled style and comfort.",
    image: heroLivingRoom,
    ctaText: "Explore Collection",
    ctaLink: "/category/living-room",
    ctaSecondary: "Shop Sofas",
    ctaSecondaryLink: "/category/living-room/sofas"
  },
  {
    id: 2,
    title: "Sleep in Luxury",
    subtitle: "Premium Bedroom Essentials",
    description: "Create your perfect bedroom sanctuary with our exquisite collection of beds, mattresses, and elegant bedroom furniture.",
    image: heroBedroom,
    ctaText: "Shop Bedroom",
    ctaLink: "/category/bedroom",
    ctaSecondary: "View Beds",
    ctaSecondaryLink: "/category/bedroom/beds"
  },
  {
    id: 3,
    title: "Gather in Elegance",
    subtitle: "Sophisticated Dining",
    description: "Bring your family together around beautifully crafted dining sets that create memorable moments and lasting impressions.",
    image: heroDining,
    ctaText: "Shop Dining",
    ctaLink: "/category/kitchen",
    ctaSecondary: "View Tables",
    ctaSecondaryLink: "/category/kitchen/dining-tables"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-muted to-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax Effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${heroSlides[currentSlide].image})`
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <motion.p 
                      className="text-secondary font-semibold text-xl tracking-wide uppercase"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    >
                      {heroSlides[currentSlide].subtitle}
                    </motion.p>
                    <motion.h1 
                      className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                      initial={{ opacity: 0, y: 30, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h1>
                  </div>

                  <motion.p 
                    className="text-2xl text-gray-100 leading-relaxed max-w-2xl font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-6 pt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button asChild className="btn-hero text-lg px-10 py-4">
                        <Link to={heroSlides[currentSlide].ctaLink}>
                          {heroSlides[currentSlide].ctaText}
                        </Link>
                      </Button>
                    </motion.div>
                    {heroSlides[currentSlide].ctaSecondary && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button asChild variant="outline" className="text-lg px-10 py-4 text-white border-2 border-white/80 hover:bg-white hover:text-foreground backdrop-blur-sm">
                          <Link to={heroSlides[currentSlide].ctaSecondaryLink!}>
                            {heroSlides[currentSlide].ctaSecondary}
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-secondary scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;