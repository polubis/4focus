alter table "public"."tasks" add column "description" text default 'NULL'::text;

alter table "public"."tasks" add column "name" text not null;


