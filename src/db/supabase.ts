import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { z } from "zod";

const configSchema = z
  .object({
    supabaseUrl: z
      .string()
      .url("Supabase URL is invalid")
      .min(1, "Supabase URL is required"),
    supabaseAnonKey: z.string().min(1, "Supabase Anon Key is required"),
  })
  .strict();

const { supabaseUrl, supabaseAnonKey } = configSchema.parse({
  supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
});

export const createSupabaseClient = (token?: string) => {
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    token
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : undefined,
  );
};

export const supabase = createSupabaseClient();
