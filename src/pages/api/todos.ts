import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";
import type { Database } from "../../db/database.types";

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization token" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const token = authHeader.split(" ")[1];

    const { data: userData, error: authError } =
      await supabase.auth.getUser(token);

    if (authError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const user_id = userData.user.id;

    const body = await request.json();

    const {
      status = "todo",
      title,
      description,
      date,
      quadrant,
    } = body as {
      status?: Database["public"]["Enums"]["todo_status"];
      title?: string;
      description?: string;
      date?: string;
      quadrant?: string;
    };

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const now = new Date().toISOString();

    const statusHistory = [{ status, timestamp: now }];

    const { data, error } = await supabase
      .from("todos")
      .insert({
        user_id,
        status,
        created_at: now,
        updated_at: now,
        status_history: statusHistory,
        title,
        description,
        due_date: date,
        quadrant,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating todo:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ todo: data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
