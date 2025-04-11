drop trigger if exists "on_todos_update_set_updated_at" on "public"."todos";

revoke delete on table "public"."todos" from "anon";

revoke insert on table "public"."todos" from "anon";

revoke references on table "public"."todos" from "anon";

revoke select on table "public"."todos" from "anon";

revoke trigger on table "public"."todos" from "anon";

revoke truncate on table "public"."todos" from "anon";

revoke update on table "public"."todos" from "anon";

revoke delete on table "public"."todos" from "authenticated";

revoke insert on table "public"."todos" from "authenticated";

revoke references on table "public"."todos" from "authenticated";

revoke select on table "public"."todos" from "authenticated";

revoke trigger on table "public"."todos" from "authenticated";

revoke truncate on table "public"."todos" from "authenticated";

revoke update on table "public"."todos" from "authenticated";

revoke delete on table "public"."todos" from "service_role";

revoke insert on table "public"."todos" from "service_role";

revoke references on table "public"."todos" from "service_role";

revoke select on table "public"."todos" from "service_role";

revoke trigger on table "public"."todos" from "service_role";

revoke truncate on table "public"."todos" from "service_role";

revoke update on table "public"."todos" from "service_role";

alter table "public"."todos" drop constraint "todos_user_id_fkey";

alter table "public"."todos" drop constraint "todos_pkey";

drop index if exists "public"."todos_pkey";

drop table "public"."todos";

create table "public"."tasks" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "status" todo_status not null default 'todo'::todo_status,
    "status_history" jsonb not null default '[]'::jsonb,
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid()
);


alter table "public"."tasks" enable row level security;

CREATE UNIQUE INDEX todos_pkey ON public.tasks USING btree (id);

alter table "public"."tasks" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

alter table "public"."tasks" add constraint "todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "todos_user_id_fkey";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

CREATE TRIGGER on_todos_update_set_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION todos_update_updated_at();


