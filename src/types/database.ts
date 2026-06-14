export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bottle_shapes: {
        Row: {
          category: string
          id: string
          name: string
        }
        Insert: {
          category: string
          id: string
          name: string
        }
        Update: {
          category?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      closure_finishes: {
        Row: {
          category: string
          id: string
          name: string
        }
        Insert: {
          category: string
          id: string
          name: string
        }
        Update: {
          category?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      glass_colors: {
        Row: {
          hex_preview: string | null
          id: string
          name: string
        }
        Insert: {
          hex_preview?: string | null
          id: string
          name: string
        }
        Update: {
          hex_preview?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      liquid_shades: {
        Row: {
          hex_preview: string | null
          id: string
          name: string
        }
        Insert: {
          hex_preview?: string | null
          id: string
          name: string
        }
        Update: {
          hex_preview?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount_cents: number
          bottle_shape_id: string
          closure_finish_id: string
          created_at: string | null
          email: string
          glass_color_id: string
          id: string
          label_file_url: string | null
          label_position_x: number | null
          label_position_y: number | null
          label_scale: number | null
          liquid_shade_id: string
          payment_intent_id: string | null
          rendered_image_url: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount_cents?: number
          bottle_shape_id: string
          closure_finish_id: string
          created_at?: string | null
          email: string
          glass_color_id: string
          id?: string
          label_file_url?: string | null
          label_position_x?: number | null
          label_position_y?: number | null
          label_scale?: number | null
          liquid_shade_id: string
          payment_intent_id?: string | null
          rendered_image_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          bottle_shape_id?: string
          closure_finish_id?: string
          created_at?: string | null
          email?: string
          glass_color_id?: string
          id?: string
          label_file_url?: string | null
          label_position_x?: number | null
          label_position_y?: number | null
          label_scale?: number | null
          liquid_shade_id?: string
          payment_intent_id?: string | null
          rendered_image_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type BottleShape = DefaultSchema["Tables"]["bottle_shapes"]["Row"]
export type GlassColor = DefaultSchema["Tables"]["glass_colors"]["Row"]
export type LiquidShade = DefaultSchema["Tables"]["liquid_shades"]["Row"]
export type ClosureFinish = DefaultSchema["Tables"]["closure_finishes"]["Row"]
export type Order = DefaultSchema["Tables"]["orders"]["Row"]
