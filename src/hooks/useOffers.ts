import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Offer } from '@/types/database';
import toast from 'react-hot-toast';

type OfferInsert = Omit<Offer, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type OfferUpdate = Partial<OfferInsert>;

export const useOffers = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: async (): Promise<Offer[]> => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching offers:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offer: OfferInsert): Promise<Offer> => {
      const { data, error } = await supabase
        .from('offers')
        .insert(offer)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      toast.success('Offer created successfully!');
    },
    onError: (error) => {
      console.error('Error creating offer:', error);
      toast.error('Failed to create offer');
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: OfferUpdate }): Promise<Offer> => {
      const { data, error } = await supabase
        .from('offers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      toast.success('Offer updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating offer:', error);
      toast.error('Failed to update offer');
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      toast.success('Offer deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    },
  });
};