import type { APIRoute } from "astro";
import { postTaskPayloadSchema, type PostTask } from "@/contracts";
import { createSupabaseClient } from "@/db/supabase";
import type { Database } from "@/db/database.types";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      const error: PostTask["error"] = {
        type: "unauthorized",
        message: "Missing authorization header",
        code: 401,
      };

      return new Response(JSON.stringify(error), { status: error.code });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      const error: PostTask["error"] = {
        type: "unauthorized",
        message: "Broken authorization token",
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
        message: "Invalid or expired token",
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
        message: "Failed to create task",
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
      message: "Internal server error",
      code: 500,
    };

    return new Response(JSON.stringify(error), {
      status: error.code,
      headers: { "Content-Type": "application/json" },
    });
  }
};
