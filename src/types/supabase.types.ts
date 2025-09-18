export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      study_card: {
        Row: {
          created_at: string | null
          definition: string
          definition_lang: string | null
          id: string
          set_id: string
          sort_order: number
          tags: string[] | null
          updated_at: string | null
          word: string
          word_lang: string | null
        }
        Insert: {
          created_at?: string | null
          definition: string
          definition_lang?: string | null
          id?: string
          set_id: string
          sort_order?: number
          tags?: string[] | null
          updated_at?: string | null
          word: string
          word_lang?: string | null
        }
        Update: {
          created_at?: string | null
          definition?: string
          definition_lang?: string | null
          id?: string
          set_id?: string
          sort_order?: number
          tags?: string[] | null
          updated_at?: string | null
          word?: string
          word_lang?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_card_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "study_set"
            referencedColumns: ["id"]
          },
        ]
      }
      study_card_attachment: {
        Row: {
          alt_text: string | null
          card_id: string
          created_at: string | null
          duration_ms: number | null
          file_extension: string
          file_logical_name: string
          file_path: string
          file_physical_name: string
          file_size: number
          file_type: string
          height: number | null
          id: number
          sort_order: number | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          card_id: string
          created_at?: string | null
          duration_ms?: number | null
          file_extension: string
          file_logical_name: string
          file_path: string
          file_physical_name: string
          file_size: number
          file_type: string
          height?: number | null
          id?: number
          sort_order?: number | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          card_id?: string
          created_at?: string | null
          duration_ms?: number | null
          file_extension?: string
          file_logical_name?: string
          file_path?: string
          file_physical_name?: string
          file_size?: number
          file_type?: string
          height?: number | null
          id?: number
          sort_order?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_card_attachment_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "study_card"
            referencedColumns: ["id"]
          },
        ]
      }
      study_folder: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folder_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_folder_set: {
        Row: {
          folder_id: string
          set_id: string
        }
        Insert: {
          folder_id: string
          set_id: string
        }
        Update: {
          folder_id?: string
          set_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_folder_set_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "study_folder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_folder_set_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "study_set"
            referencedColumns: ["id"]
          },
        ]
      }
      study_match_game_session: {
        Row: {
          attempts: number | null
          correct_matches: number | null
          end_time: string | null
          id: string
          set_id: string | null
          start_time: string | null
          total_time: number | null
          user_id: string
          wrong_matches: number | null
        }
        Insert: {
          attempts?: number | null
          correct_matches?: number | null
          end_time?: string | null
          id?: string
          set_id?: string | null
          start_time?: string | null
          total_time?: number | null
          user_id: string
          wrong_matches?: number | null
        }
        Update: {
          attempts?: number | null
          correct_matches?: number | null
          end_time?: string | null
          id?: string
          set_id?: string | null
          start_time?: string | null
          total_time?: number | null
          user_id?: string
          wrong_matches?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_match_game_session_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "study_set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_match_game_session_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_progress: {
        Row: {
          accuracy: number | null
          completed_count: number | null
          id: string
          last_learned_at: string | null
          set_id: string | null
          streak_days: number | null
          total_count: number | null
          total_study_ms: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          completed_count?: number | null
          id?: string
          last_learned_at?: string | null
          set_id?: string | null
          streak_days?: number | null
          total_count?: number | null
          total_study_ms?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          completed_count?: number | null
          id?: string
          last_learned_at?: string | null
          set_id?: string | null
          streak_days?: number | null
          total_count?: number | null
          total_study_ms?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_progress_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "study_set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_set: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_set_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          interests: string[] | null
          languages: string[] | null
          updated_at: string
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          interests?: string[] | null
          languages?: string[] | null
          updated_at?: string
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          interests?: string[] | null
          languages?: string[] | null
          updated_at?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      app_save_set_and_cards: {
        Args: { p_cards: Json; p_set: Json }
        Returns: Json
      }
      get_filtered_study_sets: {
        Args: {
          folder_id_param?: string
          folder_set_relation_yn?: boolean
          is_public_param?: boolean
          user_id_param?: string
        }
        Returns: {
          added_to_folder: boolean
          card_count: number
          id: string
          title: string
          user_name: string
        }[]
      }
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

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
