import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";
import type { Database } from "../../db/database.types";
import type { GetTasks } from "../../contracts";

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
      name,
    } = body as {
      status?: Database["public"]["Enums"]["todo_status"];
      title?: string;
      description?: string;
      date?: string;
      quadrant?: string;
      name: string;
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
      .from("tasks")
      .insert({
        user_id,
        status,
        created_at: now,
        updated_at: now,
        status_history: statusHistory,
        name,
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

export const GET: APIRoute = async ({ request }) => {
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

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dto: GetTasks["dto"] = data.map((todo) => ({
      id: todo.id,
      status: todo.status,
      created_at: todo.created_at,
      updated_at: todo.updated_at,
      status_history: todo.status_history,
      user_id: todo.user_id,
      name: todo.name,
      description: todo.description,
    }));

    return new Response(JSON.stringify(dto), {
      status: 200,
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
