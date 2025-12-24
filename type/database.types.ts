export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      books: {
        Row: {
          author: string;
          available_books: number;
          created_at: string;
          genre: string[];
          id: number;
          image: string | null;
          summary: string;
          title: string;
          total_books: number;
          updated_at: string;
        };
        Insert: {
          author?: string;
          available_books: number;
          created_at?: string;
          genre?: string[];
          id?: number;
          image?: string | null;
          summary?: string;
          title?: string;
          total_books?: number;
          updated_at?: string;
        };
        Update: {
          author?: string;
          available_books?: number;
          created_at?: string;
          genre?: string[];
          id?: number;
          image?: string | null;
          summary?: string;
          title?: string;
          total_books?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      borrow_requests: {
        Row: {
          book_id: number | null;
          borrow_status: Database["public"]["Enums"]["borrow_status_enum"];
          borrowed_at: string;
          due_date: string;
          id: number;
          returned_at: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          book_id?: number | null;
          borrow_status?: Database["public"]["Enums"]["borrow_status_enum"];
          borrowed_at?: string;
          due_date?: string;
          id?: number;
          returned_at?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          book_id?: number | null;
          borrow_status?: Database["public"]["Enums"]["borrow_status_enum"];
          borrowed_at?: string;
          due_date?: string;
          id?: number;
          returned_at?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "borrow_book_requests_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "borrow_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          Borrowed_books: number;
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
          last_activity_date: string | null;
          role: Database["public"]["Enums"]["role"];
          status: Database["public"]["Enums"]["status"];
          university_id: number | null;
        };
        Insert: {
          Borrowed_books?: number;
          created_at?: string | null;
          email: string;
          full_name: string;
          id: string;
          last_activity_date?: string | null;
          role?: Database["public"]["Enums"]["role"];
          status?: Database["public"]["Enums"]["status"];
          university_id?: number | null;
        };
        Update: {
          Borrowed_books?: number;
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
          last_activity_date?: string | null;
          role?: Database["public"]["Enums"]["role"];
          status?: Database["public"]["Enums"]["status"];
          university_id?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_book_safe: { Args: { book_id: number }; Returns: undefined };
      get_dashboard_insights: {
        Args: never;
        Returns: {
          stats: {
            label: string;
            value: number;
          }[];
          recent: {
            borrow_requests: BookRequestRow[];
            account_requests: IUser[];
            recently_added_books: BookRow[];
          };
        };
      };
      get_current_user: {
        Args: never;
        Returns: {
          data?: Database["public"]["Tables"]["users"]["Row"];
          error?: string;
          status?: string;
        };
      };
      search_borrow_requests: {
        Args: {
          limit_count: number;
          offset_count: number;
          search_text: string;
        };
        Returns: {
          book_id: number;
          book_image: string;
          book_title: string;
          borrow_status: Database["public"]["Enums"]["borrow_status_enum"];
          borrowed_at: string;
          due_date: string;
          id: number;
          returned_at: string;
          user_email: string;
          user_full_name: string;
          user_id: string;
          total_count: number;
          author: string;
          book_genre: string[];
        }[];
      };
    };
    Enums: {
      borrow_status_enum: "borrowed" | "returned" | "late_return";
      role: "USER" | "ADMIN";
      status: "PENDING" | "APPROVED" | "REJECTED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      borrow_status_enum: ["borrowed", "returned", "late_return"],
      role: ["USER", "ADMIN"],
      status: ["PENDING", "APPROVED", "REJECTED"],
    },
  },
} as const;
