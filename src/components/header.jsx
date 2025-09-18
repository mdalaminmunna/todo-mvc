import { useState } from "react";

export function Header({ setData }) {
  const [todoText, setTodoText] = useState("");

  const prev = {
    todos: [],
    filter: "all",
    asdasdasd: "",
  };
  return (
    <header className="header">
      <h1>Todo App</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && todoText.trim() !== "") {
            setData((prev) => {
              return {
                ...prev,
                todos: [
                  ...prev.todos,
                  {
                    completed: false,
                    id: prev.todos.length + 1,
                    text: todoText,
                  },
                ],
              };
            });
            setTodoText("");
          }
        }}
        autoFocus
      />
    </header>
  );
}
