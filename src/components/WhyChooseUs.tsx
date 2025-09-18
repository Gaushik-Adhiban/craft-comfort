import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on all orders over $99. Fast and reliable shipping nationwide.',
    color: 'text-primary',
    bgColor: 'bg-primary',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '2-year warranty on all furniture. Premium materials and craftsmanship guaranteed.',
    color: 'text-warning',
    bgColor: 'bg-warning',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy. Not satisfied? Return it hassle-free for a full refund.',
    color: 'text-success',
    bgColor: 'bg-success',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FurnWorld?</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We're committed to providing exceptional furniture and an outstanding shopping experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="text-center group"
            >
              {/* Icon Container */}
              <motion.div
                className={`w-16 h-16 mx-auto mb-6 rounded-full ${feature.bgColor} text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>

              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className={`text-xl font-bold mb-4 ${feature.color} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                className={`w-12 h-1 ${feature.bgColor} mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300`}
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: 48, opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;