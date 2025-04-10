/// <reference types="astro/client" />

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db/database.types.ts";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
    }
  }

  interface ImportMetaEnv {
    readonly PUBLIC_SUPABASE_URL: unknown;
    readonly PUBLIC_SUPABASE_ANON_KEY: unknown;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
