alter table "public"."todos" add column "status" todo_status not null default 'todo'::todo_status;

alter table "public"."todos" add column "status_history" jsonb not null default '[]'::jsonb;

alter table "public"."todos" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."todos" add column "user_id" uuid not null default auth.uid();

alter table "public"."todos" add constraint "todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE CASCADE not valid;

alter table "public"."todos" validate constraint "todos_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.todos_update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;$function$
;

CREATE TRIGGER on_todos_update_set_updated_at BEFORE UPDATE ON public.todos FOR EACH ROW EXECUTE FUNCTION todos_update_updated_at();


