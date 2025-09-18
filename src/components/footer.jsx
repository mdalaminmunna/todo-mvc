export function Footer({ data, setData }) {
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{data.todos.filter((todo) => !todo.completed).length}</strong>{" "}
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
  );
}
