import { createClient } from "@supabase/supabase-js";
import { Database } from "~/generated/types/database";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_BACKEND_URL,
  import.meta.env.VITE_BACKEND_API_KEY,
);
