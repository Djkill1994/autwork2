import { Database } from "~/generated/types/database";

export type IUserTableRowTypes =
  Database["public"]["Tables"]["users_work_hours"]["Row"];

export type IAdminTableRowTypes = Database["public"]["Tables"]["users"]["Row"];
