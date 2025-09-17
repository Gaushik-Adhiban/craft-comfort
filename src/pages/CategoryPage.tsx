import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { navigationMenuItems } from '@/data/navigationMenuItems';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const products = category ? getProductsByCategory(category.replace('-', ' ')) : [];
  
  const categoryInfo = navigationMenuItems.find(
    item => item.href === `/category/${category}`
  );

  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {categoryName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of {categoryName.toLowerCase()} furniture designed to transform your space.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Subcategories */}
        {categoryInfo?.subcategories && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryInfo.subcategories.map((subcategory) => (
                <motion.a
                  key={subcategory.name}
                  href={subcategory.href}
                  whileHover={{ scale: 1.05 }}
                  className="group p-6 bg-card border border-border rounded-lg text-center hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {subcategory.name}
                  </h3>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground">
                We're working on adding more products to this category. Check back soon!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;