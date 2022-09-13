import type { Task } from "@rulasfia/server/dto";
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:4000/api";

type TaskItemProps = {
  children: string;
  task: Task;
  loadTask: () => void;
};

function TaskItem({ children, task, loadTask }: TaskItemProps) {
  const { doneAt, id } = task;

  /** function for handle delete task */
  async function deleteHandler(id: string) {
    await fetch(API_URL + "/tasks/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadTask())
      .catch((e) => console.error(e));
  }

  /** function for mark task as done */
  async function markAsDoneHandler(id: string) {
    await fetch(API_URL + "/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doneAt: new Date().toISOString() }),
    })
      .then((res) => res.json())
      .then(() => loadTask())
      .catch((e) => console.error(e));
  }

  /** function for mark task as incomplete */
  async function undoMarkAsDoneHandler(id: string) {
    await fetch(API_URL + "/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doneAt: null }),
    })
      .then((res) => res.json())
      .then(() => loadTask())
      .catch((e) => console.error(e));
  }

  return (
    <li style={{ marginBottom: "8px" }}>
      <button
        onClick={() =>
          doneAt ? undoMarkAsDoneHandler(id) : markAsDoneHandler(id)
        }
      >
        {doneAt ? "undo" : "mark as done"}
      </button>{" "}
      <button className="danger" onClick={() => deleteHandler(id)}>
        remove
      </button>{" "}
      <span
        style={{
          textDecorationLine: doneAt ? "line-through" : "none",
        }}
      >
        {children}
      </span>
    </li>
  );
}

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  /** function for load data from the server */
  const loadTask = useCallback(async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();

    setTasks(data);
  }, []);

  useEffect(() => {
    /** load task data on component mount */
    /** this is just an example, not a recommended way in production app */
    setIsLoading(true);
    loadTask().then(() => setIsLoading(false));
  }, []);

  /** function for handle create task */
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };

    /** read data from the <form> */
    const name = target.name.value;
    const description = target.description.value;

    setIsSubmitting(true);
    await fetch(API_URL + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then(() => loadTask())
      .then(() => {
        setIsSubmitting(false);
        target.name.value = "";
        target.description.value = "";
      })
      .catch((e) => console.error(e));
  }

  return (
    <div>
      <h1>Tasks</h1>
      <br />
      <form onSubmit={submitHandler}>
        <input type="text" name="name" placeholder="Task name" />
        <br />
        <input type="text" name="description" placeholder="Description" />
        <br />
        <button type="submit">
          {isSubmitting ? "Submitting" : "Add task"}
        </button>
      </form>
      <br />
      <main style={{ width: "480px" }}>
        {isLoading && "Loading..."}
        {!isLoading && (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} loadTask={loadTask}>
                {task.name}
              </TaskItem>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
