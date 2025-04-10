import { createClient } from "@supabase/supabase-js";
import { assert } from "../libs/assert";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

assert(
  typeof supabaseUrl === "string" && supabaseUrl.length > 0,
  "Supabase URL is missing",
);
assert(
  typeof supabaseAnonKey === "string" && supabaseAnonKey.length > 0,
  "Supabase Anon Key is missing",
);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
