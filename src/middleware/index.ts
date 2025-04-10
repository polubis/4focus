import { defineMiddleware } from "astro:middleware";

import { supabase } from "../db/supabase";

export const onRequest = defineMiddleware((context, next) => {
  context.locals.supabase = supabase;
  return next();
});
