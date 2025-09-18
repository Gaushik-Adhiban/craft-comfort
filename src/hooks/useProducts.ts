import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/database';
import toast from 'react-hot-toast';

type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type ProductUpdate = Partial<ProductInsert>;

export const useProducts = (filters?: {
  categoryId?: string;
  subcategoryId?: string;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('is_active', true);

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters?.subcategoryId) {
        query = query.eq('subcategory_id', filters.subcategoryId);
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters?.bestseller) {
        query = query.eq('is_bestseller', true);
      }

      if (filters?.isNew) {
        query = query.eq('is_new', true);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching product:', error);
        throw error;
      }

      return data || null;
    },
    enabled: !!slug,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductInsert): Promise<Product> => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProductUpdate }): Promise<Product> => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.slug] });
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    },
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async (): Promise<Product[]> => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .limit(20);

      if (error) {
        console.error('Error searching products:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!query.trim(),
  });
};