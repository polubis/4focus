import { useState, type FormEvent, type ChangeEvent } from "react";
import { supabase } from "../db/supabase";

interface FormErrors {
  title: string;
  date: string;
}

export const TodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [quadrant, setQuadrant] = useState<string>("urgent-important");
  const [errors, setErrors] = useState<FormErrors>({ title: "", date: "" });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = { title: "", date: "" };
    let hasError = false;

    if (!title) {
      newErrors.title = "Title is required";
      hasError = true;
    }

    if (!date) {
      newErrors.date = "Date is required";
      hasError = true;
    }

    if (!hasError) {
      // Get the session from Supabase
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        alert("You must be logged in to create a task");
        return;
      }

      // Submit to the API
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify({
          name: title,
          priority: "1",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error creating task: ${JSON.stringify(errorData)}`);
      } else {
        alert("Task created successfully!");
      }
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleQuadrantChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuadrant(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">4focus</h1>
      <p className="text-gray-600 mb-6">
        Manage your tasks with the Eisenhower Matrix method to improve focus and
        productivity
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Add more details about this task"
            rows={3}
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Date
          </label>
          <div className="relative">
            <input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              onClick={() => setShowDatePicker(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              <span className="text-sm">
                {showDatePicker ? "Hide" : "Show"}
              </span>
            </button>
          </div>
          {errors.date && (
            <p className="text-sm text-red-600 mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-1">
            Eisenhower Quadrant
          </p>

          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-300 rounded-md">
              <input
                type="radio"
                name="quadrant"
                value="urgent-important"
                checked={quadrant === "urgent-important"}
                onChange={handleQuadrantChange}
                className="mr-2"
              />
              <span>Urgent & Important</span>
            </label>

            <label className="flex items-center p-3 border border-gray-300 rounded-md">
              <input
                type="radio"
                name="quadrant"
                value="important-not-urgent"
                checked={quadrant === "important-not-urgent"}
                onChange={handleQuadrantChange}
                className="mr-2"
              />
              <span>Important, Not Urgent</span>
            </label>

            <label className="flex items-center p-3 border border-gray-300 rounded-md">
              <input
                type="radio"
                name="quadrant"
                value="urgent-not-important"
                checked={quadrant === "urgent-not-important"}
                onChange={handleQuadrantChange}
                className="mr-2"
              />
              <span>Urgent, Not Important</span>
            </label>

            <label className="flex items-center p-3 border border-gray-300 rounded-md">
              <input
                type="radio"
                name="quadrant"
                value="not-urgent-not-important"
                checked={quadrant === "not-urgent-not-important"}
                onChange={handleQuadrantChange}
                className="mr-2"
              />
              <span>Not Urgent, Not Important</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white hover:bg-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Add Task
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        <a href="/" className="text-gray-800 hover:underline">
          Back to dashboard
        </a>
      </p>
    </div>
  );
};
