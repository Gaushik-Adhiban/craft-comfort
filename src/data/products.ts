import { Product } from '@/types';

// Sample products data - In a real app, this would come from an API
export const sampleProducts: Product[] = [
  // Living Room - Sofas
  {
    id: 'sofa-1',
    name: 'Modern Sectional Sofa',
    description: 'Comfortable and stylish sectional sofa perfect for modern living rooms. Features premium fabric upholstery and sturdy construction.',
    category: 'Living Room',
    subcategory: 'Sofas',
    price: 1299,
    originalPrice: 1599,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Gray', 'Navy', 'Beige'],
    materials: ['Fabric', 'Wood Frame'],
    inStock: true,
    stockCount: 15,
    rating: 4.5,
    reviewCount: 124,
    tags: ['modern', 'sectional', 'comfortable'],
    dimensions: { width: 90, height: 35, depth: 60 },
    weight: 85,
    isNew: false,
    isBestseller: true,
    discount: 19
  },
  {
    id: 'sofa-2',
    name: 'Minimalist Loveseat',
    description: 'Clean lines and contemporary design make this loveseat perfect for smaller spaces without compromising on comfort.',
    category: 'Living Room',
    subcategory: 'Sofas',
    price: 799,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['White', 'Light Gray', 'Charcoal'],
    materials: ['Linen', 'Hardwood'],
    inStock: true,
    stockCount: 8,
    rating: 4.3,
    reviewCount: 67,
    tags: ['minimalist', 'loveseat', 'compact'],
    dimensions: { width: 58, height: 34, depth: 32 },
    weight: 45,
    isNew: true,
    isBestseller: false
  },
  
  // Living Room - Coffee Tables
  {
    id: 'coffee-table-1',
    name: 'Glass Top Coffee Table',
    description: 'Elegant glass top coffee table with oak wood base. Perfect centerpiece for any modern living room.',
    category: 'Living Room',
    subcategory: 'Coffee Tables',
    price: 449,
    originalPrice: 549,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Oak', 'Walnut'],
    materials: ['Glass', 'Oak Wood'],
    inStock: true,
    stockCount: 12,
    rating: 4.6,
    reviewCount: 89,
    tags: ['glass', 'oak', 'modern'],
    dimensions: { width: 48, height: 16, depth: 24 },
    weight: 35,
    isNew: false,
    isBestseller: true,
    discount: 18
  },

  // Bedroom - Beds
  {
    id: 'bed-1',
    name: 'Platform Bed Frame',
    description: 'Sleek platform bed frame with built-in nightstands. Minimalist design that maximizes bedroom space.',
    category: 'Bedroom',
    subcategory: 'Beds',
    price: 899,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Natural Wood', 'White', 'Black'],
    materials: ['Pine Wood', 'MDF'],
    inStock: true,
    stockCount: 6,
    rating: 4.4,
    reviewCount: 156,
    tags: ['platform', 'minimalist', 'storage'],
    dimensions: { width: 64, height: 14, depth: 84 },
    weight: 75,
    isNew: false,
    isBestseller: true
  },

  // Kitchen - Dining Tables
  {
    id: 'dining-table-1',
    name: 'Expandable Dining Table',
    description: 'Beautiful expandable dining table that seats 4-8 people. Perfect for both intimate meals and larger gatherings.',
    category: 'Kitchen',
    subcategory: 'Dining Tables',
    price: 1199,
    originalPrice: 1399,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Walnut', 'Oak', 'Cherry'],
    materials: ['Solid Wood', 'Metal Hardware'],
    inStock: true,
    stockCount: 4,
    rating: 4.7,
    reviewCount: 203,
    tags: ['expandable', 'family', 'elegant'],
    dimensions: { width: 72, height: 30, depth: 36 },
    weight: 95,
    isNew: false,
    isBestseller: true,
    discount: 14
  },

  // Office - Desks
  {
    id: 'desk-1',
    name: 'Standing Desk Converter',
    description: 'Adjustable standing desk converter that transforms any table into an ergonomic workspace. Height adjustable with smooth operation.',
    category: 'Office',
    subcategory: 'Standing Desks',
    price: 349,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Black', 'White'],
    materials: ['Steel', 'Composite Wood'],
    inStock: true,
    stockCount: 20,
    rating: 4.2,
    reviewCount: 78,
    tags: ['adjustable', 'ergonomic', 'health'],
    dimensions: { width: 32, height: 22, depth: 24 },
    weight: 28,
    isNew: true,
    isBestseller: false
  },

  // Storage - Shelving Units
  {
    id: 'shelf-1',
    name: 'Industrial Bookshelf',
    description: 'Five-tier industrial style bookshelf with metal frame and wood shelves. Perfect for books, decor, and storage.',
    category: 'Storage',
    subcategory: 'Shelving Units',
    price: 299,
    originalPrice: 399,
    images: ['/placeholder.svg', '/placeholder.svg'],
    colors: ['Rustic Brown', 'Natural', 'Black'],
    materials: ['Metal Frame', 'Wood Shelves'],
    inStock: true,
    stockCount: 18,
    rating: 4.5,
    reviewCount: 134,
    tags: ['industrial', 'sturdy', 'versatile'],
    dimensions: { width: 30, height: 70, depth: 12 },
    weight: 42,
    isNew: false,
    isBestseller: true,
    discount: 25
  }
];

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get products by subcategory
export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase() &&
    product.subcategory.toLowerCase() === subcategory.toLowerCase()
  );
};

// Function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};

// Function to get featured/bestseller products
export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.filter(product => product.isBestseller || product.isNew);
};

// Function to search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory.toLowerCase().includes(searchTerm)
  );
};