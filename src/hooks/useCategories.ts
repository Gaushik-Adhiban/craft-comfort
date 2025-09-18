import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Category, Subcategory } from '@/types/database';
import toast from 'react-hot-toast';

type CategoryInsert = Omit<Category, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type CategoryUpdate = Partial<CategoryInsert>;

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async (): Promise<Category | null> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching category:', error);
        throw error;
      }

      return data || null;
    },
    enabled: !!slug,
  });
};

export const useSubcategories = (categoryId?: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async (): Promise<Subcategory[]> => {
      let query = supabase
        .from('subcategories')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useSubcategory = (slug: string) => {
  return useQuery({
    queryKey: ['subcategory', slug],
    queryFn: async (): Promise<Subcategory | null> => {
      const { data, error } = await supabase
        .from('subcategories')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subcategory:', error);
        throw error;
      }

      return data || null;
    },
    enabled: !!slug,
  });
};

export const useCategoriesWithSubcategories = () => {
  return useQuery({
    queryKey: ['categories-with-subcategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          subcategories:subcategories(*)
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories with subcategories:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryInsert): Promise<Category> => {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CategoryUpdate }): Promise<Category> => {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', data.slug] });
      toast.success('Category updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    },
  });
};