import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  postTaskPayloadSchema,
  TASKS_PRIORITY_VALUES,
  type PostTask,
} from "@/contracts";
import { AuthProvider, useAuthContext } from "@/context/auth";
import { endpoint } from "@/lib/endpoint";
import { navigate } from "astro:transitions/client";

const TasksViewContent = () => {
  const { session } = useAuthContext();

  const form = useForm<PostTask["payload"]>({
    resolver: zodResolver(postTaskPayloadSchema),
    defaultValues: {
      name: "",
      priority: "1",
    },
  });

  const onSubmit = async (values: PostTask["payload"]) => {
    const [ok, data] = await endpoint(
      "create_task",
      values,
      session?.access_token,
    );

    if (ok) {
      alert(JSON.stringify(data));
    } else {
      alert(JSON.stringify(data));
    }
  };

  return (
    <main className="p-4 min-h-screen flex items-center justify-center flex-col gap-8 max-w-lg mx-auto">
      <h1 className="text-center capitalize text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create a new task
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="E.g. Fix login bug" />
                </FormControl>
                <FormDescription>Short, concise task name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value.trim() === ""
                          ? undefined
                          : e.target.value,
                      );
                    }}
                    value={field.value ?? ""}
                    placeholder="Describe task details, steps to complete, etc. (min. 10 characters, if provided)"
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Provide more details about the task
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TASKS_PRIORITY_VALUES.map((priorityValue) => (
                      <SelectItem key={priorityValue} value={priorityValue}>
                        Priority {priorityValue}
                        {priorityValue === "1" && " (Highest)"}
                        {priorityValue === "4" && " (Lowest)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the importance level of the task (1 = highest, 4 =
                  lowest). To learn more about the{" "}
                  <strong>Eisenhower Matrix</strong>, read{" "}
                  <a
                    className="underline"
                    target="_blank"
                    href="https://4markdown.com/how-to-be-productive-as-a-software-engineer/"
                    rel="noreferrer"
                  >
                        How to be productive as a software engineer
                  </a>{" "}
                  article
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <footer className="justify-end flex gap-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button type="submit">Create Task</Button>
          </footer>
        </form>
      </Form>
    </main>
  );
};

const TasksView = () => {
  return (
    <AuthProvider>
      <TasksViewContent />
    </AuthProvider>
  );
};

export { TasksView };
