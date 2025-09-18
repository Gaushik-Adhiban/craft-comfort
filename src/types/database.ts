export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Define core types directly to avoid Supabase dependency issues
export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Subcategory = {
  id: string
  category_id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  category_id: string
  subcategory_id: string
  price: number
  original_price?: number
  discount_percentage?: number
  sku: string
  stock_quantity: number
  colors: string[]
  materials: string[]
  dimensions?: Json
  weight?: number
  rating: number
  review_count: number
  tags: string[]
  is_new: boolean
  is_bestseller: boolean
  is_featured: boolean
  is_active: boolean
  images: string[]
  created_at: string
  updated_at: string
  category?: Category
  subcategory?: Subcategory
}

export type Banner = {
  id: string
  title: string
  subtitle?: string
  description?: string
  image_url: string
  link_url?: string
  cta_text?: string
  sort_order: number
  is_active: boolean
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export type Offer = {
  id: string
  title: string
  description?: string
  image_url?: string
  discount_percentage?: number
  discount_amount?: number
  code?: string
  is_active: boolean
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  user_id?: string
  status: string
  total_amount: number
  subtotal_amount: number
  tax_amount?: number
  shipping_amount?: number
  discount_amount?: number
  items: Json
  shipping_address?: Json
  billing_address?: Json
  payment_method?: string
  payment_status: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  user_id: string
  first_name?: string
  last_name?: string
  phone?: string
  role: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string | null
          category_id: string
          subcategory_id: string
          price: number
          original_price: number | null
          discount_percentage: number | null
          sku: string
          stock_quantity: number
          colors: string[]
          materials: string[]
          dimensions: Json | null
          weight: number | null
          rating: number
          review_count: number
          tags: string[]
          is_new: boolean
          is_bestseller: boolean
          is_featured: boolean
          is_active: boolean
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          short_description?: string | null
          category_id: string
          subcategory_id: string
          price: number
          original_price?: number | null
          discount_percentage?: number | null
          sku: string
          stock_quantity?: number
          colors?: string[]
          materials?: string[]
          dimensions?: Json | null
          weight?: number | null
          rating?: number
          review_count?: number
          tags?: string[]
          is_new?: boolean
          is_bestseller?: boolean
          is_featured?: boolean
          is_active?: boolean
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string | null
          category_id?: string
          subcategory_id?: string
          price?: number
          original_price?: number | null
          discount_percentage?: number | null
          sku?: string
          stock_quantity?: number
          colors?: string[]
          materials?: string[]
          dimensions?: Json | null
          weight?: number | null
          rating?: number
          review_count?: number
          tags?: string[]
          is_new?: boolean
          is_bestseller?: boolean
          is_featured?: boolean
          is_active?: boolean
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      banners: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          description: string | null
          image_url: string
          link_url: string | null
          cta_text: string | null
          sort_order: number
          is_active: boolean
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          description?: string | null
          image_url: string
          link_url?: string | null
          cta_text?: string | null
          sort_order?: number
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          image_url?: string
          link_url?: string | null
          cta_text?: string | null
          sort_order?: number
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          discount_percentage: number | null
          discount_amount: number | null
          code: string | null
          is_active: boolean
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          discount_percentage?: number | null
          discount_amount?: number | null
          code?: string | null
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          discount_percentage?: number | null
          discount_amount?: number | null
          code?: string | null
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: string
          total_amount: number
          subtotal_amount: number
          tax_amount: number | null
          shipping_amount: number | null
          discount_amount: number | null
          items: Json
          shipping_address: Json | null
          billing_address: Json | null
          payment_method: string | null
          payment_status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount: number
          subtotal_amount: number
          tax_amount?: number | null
          shipping_amount?: number | null
          discount_amount?: number | null
          items: Json
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount?: number
          subtotal_amount?: number
          tax_amount?: number | null
          shipping_amount?: number | null
          discount_amount?: number | null
          items?: Json
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}