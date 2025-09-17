import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroMain from '@/assets/hero-main.jpg';

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
    subtitle: "Modern Furniture Collection",
    description: "Discover our curated selection of contemporary furniture designed to elevate your living space with style and comfort.",
    image: heroMain,
    ctaText: "Shop Now",
    ctaLink: "/category/living-room",
    ctaSecondary: "Browse All",
    ctaSecondaryLink: "/category/living-room"
  },
  {
    id: 2,
    title: "Bedroom Essentials",
    subtitle: "Sleep in Style",
    description: "Create your perfect bedroom sanctuary with our premium beds, mattresses, and bedroom furniture collection.",
    image: heroMain, // Will be replaced with bedroom image
    ctaText: "Shop Bedroom",
    ctaLink: "/category/bedroom",
    ctaSecondary: "View Collection",
    ctaSecondaryLink: "/category/bedroom"
  },
  {
    id: 3,
    title: "Kitchen & Dining",
    subtitle: "Gather in Style",
    description: "Bring your family together with our beautiful dining sets and kitchen furniture designed for memorable moments.",
    image: heroMain, // Will be replaced with kitchen image
    ctaText: "Shop Kitchen",
    ctaLink: "/category/kitchen",
    ctaSecondary: "Explore More",
    ctaSecondaryLink: "/category/kitchen"
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
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-muted to-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroSlides[currentSlide].image})`
            }}
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
                  <div className="space-y-2">
                    <motion.p 
                      className="text-secondary font-semibold text-lg tracking-wide"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {heroSlides[currentSlide].subtitle}
                    </motion.p>
                    <motion.h1 
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h1>
                  </div>

                  <motion.p 
                    className="text-xl text-gray-200 leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <Button asChild className="btn-hero">
                      <Link to={heroSlides[currentSlide].ctaLink}>
                        {heroSlides[currentSlide].ctaText}
                      </Link>
                    </Button>
                    {heroSlides[currentSlide].ctaSecondary && (
                      <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-foreground">
                        <Link to={heroSlides[currentSlide].ctaSecondaryLink!}>
                          {heroSlides[currentSlide].ctaSecondary}
                        </Link>
                      </Button>
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