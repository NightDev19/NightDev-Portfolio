// Supabase Database Types
// This file provides type definitions for the Supabase client.
// In production, you would generate this with: npx supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          tech_stack: string[]
          github_url: string | null
          demo_url: string | null
          image_url: string | null
          featured: boolean
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          tech_stack: string[]
          github_url?: string | null
          demo_url?: string | null
          image_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          tech_stack?: string[]
          github_url?: string | null
          demo_url?: string | null
          image_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          tags: string[] | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          tags?: string[] | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          tags?: string[] | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: string | null
          icon: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          level?: string | null
          icon?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          level?: string | null
          icon?: string | null
          order_index?: number
          created_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          organization: string | null
          description: string
          tech_stack: string[] | null
          start_date: string | null
          end_date: string | null
          current: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organization?: string | null
          description: string
          tech_stack?: string[] | null
          start_date?: string | null
          end_date?: string | null
          current?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization?: string | null
          description?: string
          tech_stack?: string[] | null
          start_date?: string | null
          end_date?: string | null
          current?: boolean
          order_index?: number
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
