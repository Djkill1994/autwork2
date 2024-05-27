export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          email: string;
          general_info: string | null;
          id: string;
          notes: string | null;
          project: string | null;
          role: string | null;
          total_hours: string | null;
          user_name: string | null;
        };
        Insert: {
          email: string;
          general_info?: string | null;
          id: string;
          notes?: string | null;
          project?: string | null;
          role?: string | null;
          total_hours?: string | null;
          user_name?: string | null;
        };
        Update: {
          email?: string;
          general_info?: string | null;
          id?: string;
          notes?: string | null;
          project?: string | null;
          role?: string | null;
          total_hours?: string | null;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users_work_hours: {
        Row: {
          break_time: string | null;
          day: string | null;
          hours_from: string | null;
          hours_to: string | null;
          id: number;
          project: string | null;
          total_hours: number | null;
          user_id: string;
        };
        Insert: {
          break_time?: string | null;
          day?: string | null;
          hours_from?: string | null;
          hours_to?: string | null;
          id?: number;
          project?: string | null;
          total_hours?: number | null;
          user_id: string;
        };
        Update: {
          break_time?: string | null;
          day?: string | null;
          hours_from?: string | null;
          hours_to?: string | null;
          id?: number;
          project?: string | null;
          total_hours?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_work_hours_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_work_hours_for_user: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

// Schema: public
// Tables
export type Users = Database["public"]["Tables"]["users"]["Row"];
export type InsertUsers = Database["public"]["Tables"]["users"]["Insert"];
export type UpdateUsers = Database["public"]["Tables"]["users"]["Update"];

export type UsersWorkHours =
  Database["public"]["Tables"]["users_work_hours"]["Row"];
export type InsertUsersWorkHours =
  Database["public"]["Tables"]["users_work_hours"]["Insert"];
export type UpdateUsersWorkHours =
  Database["public"]["Tables"]["users_work_hours"]["Update"];

// Functions
export type ArgsCreateWorkHoursForUser =
  Database["public"]["Functions"]["create_work_hours_for_user"]["Args"];
export type ReturnTypeCreateWorkHoursForUser =
  Database["public"]["Functions"]["create_work_hours_for_user"]["Returns"];
