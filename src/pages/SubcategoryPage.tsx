import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { getProductsBySubcategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const SubcategoryPage = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = category && subcategory 
    ? getProductsBySubcategory(category.replace('-', ' '), subcategory.replace('-', ' '))
    : [];

  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';
  const subcategoryName = subcategory?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Subcategory';

  // Get unique colors and materials from products
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allMaterials = Array.from(new Set(products.flatMap(p => p.materials)));

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (inStockOnly && !product.inStock) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) return false;
      if (selectedMaterials.length > 0 && !product.materials.some(material => selectedMaterials.includes(material))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
    });

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb & Header */}
      <div className="bg-gradient-to-br from-muted/50 to-background py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="text-sm text-muted-foreground mb-4">
              <span>Home</span> / <span>{categoryName}</span> / <span className="text-foreground">{subcategoryName}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {subcategoryName}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000}
                  min={0}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Colors */}
              {allColors.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Colors</Label>
                  {allColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                      />
                      <Label htmlFor={`color-${color}`} className="text-sm">{color}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Materials */}
              {allMaterials.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Materials</Label>
                  {allMaterials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                      />
                      <Label htmlFor={`material-${material}`} className="text-sm">{material}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* In Stock Only */}
              <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                      />
                <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
              </div>
            </div>
          </motion.div>

          {/* Products Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-6 bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredProducts.length > 0 ? (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-4">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or check back later for new arrivals.
                  </p>
                  <Button onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedColors([]);
                    setSelectedMaterials([]);
                    setInStockOnly(false);
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;