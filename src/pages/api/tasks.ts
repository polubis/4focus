import type { APIRoute } from "astro";
import {
  postTaskPayloadSchema,
  type PostTask,
  type GetTasks,
} from "@/contracts";
import { createSupabaseClient } from "@/db/supabase";
import type { Database } from "@/db/database.types";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      const error: GetTasks["error"] = {
        type: "unauthorized",
        message: "Missing authorization header.",
        code: 401,
      };

      return new Response(JSON.stringify(error), { status: error.code });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      const error: GetTasks["error"] = {
        type: "unauthorized",
        message: "Broken authorization token.",
        code: 401,
      };

      return new Response(JSON.stringify(error), { status: error.code });
    }

    const supabase = createSupabaseClient(token);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      const error: GetTasks["error"] = {
        type: "unauthorized",
        message: "Invalid or expired token.",
        code: 401,
      };

      return new Response(JSON.stringify(error), {
        status: 401,
      });
    }

    const { data: tasks, error: tasksError } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("priority", { ascending: true })
      .order("c_date", { ascending: true });

    if (tasksError) {
      const error: GetTasks["error"] = {
        type: "internal_server_error",
        message: "Failed to retrieve tasks.",
        code: 500,
      };

      return new Response(JSON.stringify(error), {
        status: error.code,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dto: GetTasks["dto"] = tasks.map((task) => ({
      id: task.id,
      name: task.name,
      status: task.status,
      c_date: task.c_date,
      m_date: task.m_date,
      description: task.description,
      status_history: task.status_history,
      user_id: task.user_id,
      priority: task.priority,
    }));

    return new Response(JSON.stringify(dto), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (exception) {
    const error: GetTasks["error"] = {
      type: "internal_server_error",
      message: "Internal server error.",
      code: 500,
    };

    return new Response(JSON.stringify(error), {
      status: error.code,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      const error: PostTask["error"] = {
        type: "unauthorized",
        message: "Missing authorization header.",
        code: 401,
      };

      return new Response(JSON.stringify(error), { status: error.code });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      const error: PostTask["error"] = {
        type: "unauthorized",
        message: "Broken authorization token.",
        code: 401,
      };

      return new Response(JSON.stringify(error), { status: error.code });
    }

    const supabase = createSupabaseClient(token);

    const payload = await postTaskPayloadSchema.safeParseAsync(
      await request.json(),
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      const error: PostTask["error"] = {
        type: "unauthorized",
        message: "Invalid or expired token.",
        code: 401,
      };

      return new Response(JSON.stringify(error), {
        status: 401,
      });
    }

    if (!payload.success) {
      const error: PostTask["error"] = {
        ...payload.error.flatten(),
        type: "bad_request",
        message: "Invalid payload",
        code: 400,
      };

      return new Response(JSON.stringify(error), {
        status: error.code,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newTask: Database["public"]["Tables"]["tasks"]["Insert"] = {
      name: payload.data.name,
      user_id: user.id,
      priority: payload.data.priority,
      description: payload.data.description,
    };

    const { data: insertedTask, error: insertError } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()
      .single();

    if (insertError || !insertedTask) {
      const error: PostTask["error"] = {
        type: "unprocessable_entity",
        message: "Failed to create task.",
        code: 422,
      };

      return new Response(JSON.stringify(error), {
        status: error.code,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dto: PostTask["dto"] = {
      id: insertedTask.id,
      name: insertedTask.name,
      status: insertedTask.status,
      c_date: insertedTask.c_date,
      m_date: insertedTask.m_date,
      description: insertedTask.description,
      status_history: insertedTask.status_history,
      user_id: insertedTask.user_id,
      priority: insertedTask.priority,
    };

    return new Response(JSON.stringify(dto), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (exception) {
    const error: PostTask["error"] = {
      type: "internal_server_error",
      message: "Internal server error.",
      code: 500,
    };

    return new Response(JSON.stringify(error), {
      status: error.code,
      headers: { "Content-Type": "application/json" },
    });
  }
};
