import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

const fallbackCategories = [
  { id: '1', name: 'Living Room', slug: 'living-room', icon: 'L', sort_order: 1 },
  { id: '2', name: 'Bedroom', slug: 'bedroom', icon: 'B', sort_order: 2 },
  { id: '3', name: 'Kitchen', slug: 'kitchen', icon: 'K', sort_order: 3 },
  { id: '4', name: 'Storage', slug: 'storage', icon: 'S', sort_order: 4 },
  { id: '5', name: 'Office', slug: 'office', icon: 'O', sort_order: 5 },
  { id: '6', name: 'Bathroom', slug: 'bathroom', icon: 'B', sort_order: 6 },
  { id: '7', name: 'Kids', slug: 'kids', icon: 'K', sort_order: 7 },
  { id: '8', name: 'Outdoor', slug: 'outdoor', icon: 'O', sort_order: 8 },
];

const CategoryGrid = () => {
  const { data: categories = fallbackCategories, isLoading, error } = useCategories();

  const displayCategories = error ? fallbackCategories : categories;

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover our wide range of furniture collections designed to transform every room in your home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-32 mb-4"></div>
                <div className="bg-muted rounded h-4 w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our wide range of furniture collections designed to transform every room in your home.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <Link 
                to={`/category/${category.slug}`}
                className="group block"
              >
                <motion.div 
                  className="relative bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-luxury hover:border-primary/20"
                  whileHover={{
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {/* Icon Circle */}
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow"
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  {/* Category Name */}
                  <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-primary">
                    {category.name}
                  </h3>

                  {/* Hover Effect Overlay */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;