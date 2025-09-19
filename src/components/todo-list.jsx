import { useState } from "react";

export function TodoList({ data, setData }) {
  const [editing, setEditing] = useState({ id: null, text: "" });

  const toggleTodo = (id) => {
    setData((prev) => ({
      // return {
      ...prev,
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
      // };
    }));
  };

  const deleteTodo = (id) => {
    setData((prev) => {
      return {
        ...prev,
        todos: prev.todos.filter((todo) => todo.id !== id),
      };
    });
  };

  const toggleAll = () => {
    const allCompleted = data.todos.every((todo) => todo.completed);
    setData((prev) => ({
      ...prev,
      todos: prev.todos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      })),
    }));
  };

  const startEditing = (id, text) => {
    setEditing({ id, text });
  };

  const saveEdit = () => {
    if (editing.text.trim()) {
      setData((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === editing.id ? { ...todo, text: editing.text.trim() } : todo
        ),
      }));
    } else {
      // Delete if edited to empty
      deleteTodo(editing.id);
    }
    setEditing({ id: null, text: "" });
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditing({ id: null, text: "" });
  };

  return (
    <>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={data.todos.every((todo) => todo.completed)}
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {data.todos
            .filter((todo) => {
              if (data.filter === "completed") {
                return todo.completed === true;
              } else if (data.filter === "active") {
                return todo.completed === false;
              } else {
                return true;
              }
            })
            .map((todo) => (
              <li
                key={todo.id}
                className={`${todo.completed ? "completed" : ""} ${
                  editing.id === todo.id ? "editing" : ""
                }`}
                onDoubleClick={() => startEditing(todo.id, todo.text)}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label>{todo.text}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
                {editing.id === todo.id && (
                  <input
                    className="edit"
                    value={editing.text}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, text: e.target.value }))
                    }
                    onBlur={saveEdit}
                    onKeyDown={handleEditKeyDown}
                  />
                )}
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
