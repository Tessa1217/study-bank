import type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/supabase.types";
export type TableName = keyof Database["public"]["Tables"];
export type Table<T extends TableName> = Database["public"]["Tables"][T];
export type Row<T extends TableName> = Tables<T>;
export type Update<T extends TableName> = TablesUpdate<T>;
export type Insert<T extends TableName> = TablesInsert<T>;
