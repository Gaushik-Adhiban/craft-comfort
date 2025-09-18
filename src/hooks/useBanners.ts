import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Banner } from '@/types/database';
import toast from 'react-hot-toast';

type BannerInsert = Omit<Banner, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type BannerUpdate = Partial<BannerInsert>;

export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async (): Promise<Banner[]> => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching banners:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (banner: BannerInsert): Promise<Banner> => {
      const { data, error } = await supabase
        .from('banners')
        .insert(banner)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner created successfully!');
    },
    onError: (error) => {
      console.error('Error creating banner:', error);
      toast.error('Failed to create banner');
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: BannerUpdate }): Promise<Banner> => {
      const { data, error } = await supabase
        .from('banners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating banner:', error);
      toast.error('Failed to update banner');
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    },
  });
};