import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState(searchProducts(searchParams.get('q') || ''));

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    setSearchResults(searchProducts(query));
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const currentQuery = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-6">
            {currentQuery ? `Search Results for "${currentQuery}"` : 'Search Products'}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <Input
              type="text"
              placeholder="Search for furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="px-8">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>
        </motion.div>

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentQuery && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                {currentQuery && ` for "${currentQuery}"`}
              </p>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : currentQuery ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any products matching "{currentQuery}". Try a different search term.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Suggestions:</p>
                <ul className="space-y-1">
                  <li>• Check your spelling</li>
                  <li>• Use more general terms</li>
                  <li>• Try searching for a category like "sofa" or "table"</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Start Your Search</h3>
              <p className="text-muted-foreground">
                Enter a search term above to find the perfect furniture for your space.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;