import { useState, useEffect, useRef } from "react";
import { Header } from "./header";
import { FooterCredit } from "./footer-credit";

function App() {
  const [data, setData] = useState({
    todos: [],
    filter: "all",
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const toggleTodo = (id) => {
    setData((prev) => {
      return {
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    });
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
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
    } else {
      // Delete if edited to empty
      deleteTodo(editingId);
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <>
      <section className="todoapp">
        <Header setData={setData} />

        {data.todos.length > 0 && (
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
                        editingId === todo.id ? "editing" : ""
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
                      {editingId === todo.id && (
                        <input
                          ref={editInputRef}
                          className="edit"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={handleEditKeyDown}
                        />
                      )}
                    </li>
                  ))}
              </ul>
            </section>

            <footer className="footer">
              <span className="todo-count">
                <strong>
                  {data.todos.filter((todo) => !todo.completed).length}
                </strong>{" "}
                {data.todos.filter((todo) => !todo.completed).length === 1
                  ? "item"
                  : "items"}{" "}
                left
              </span>

              <ul className="filters">
                <li>
                  <a
                    className={data.filter === "all" ? "selected" : ""}
                    onClick={() =>
                      setData((prev) => {
                        return {
                          ...prev,
                          filter: "all",
                        };
                      })
                    }
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className={data.filter === "active" ? "selected" : ""}
                    onClick={() =>
                      setData((prev) => {
                        return {
                          ...prev,
                          filter: "active",
                        };
                      })
                    }
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    className={data.filter === "completed" ? "selected" : ""}
                    onClick={() =>
                      setData((prev) => {
                        return {
                          ...prev,
                          filter: "completed",
                        };
                      })
                    }
                  >
                    Completed
                  </a>
                </li>
              </ul>

              {data.todos.filter((todo) => todo.completed).length > 0 && (
                <button className="clear-completed" onClick={clearCompleted}>
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>

      <FooterCredit />
    </>
  );
}

export default App;
