import { useEffect, useState } from "react";

const api = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, SetNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(api + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((e) => console.error(e));
  };

  type Todo = {
    text: string;
    _id: string;
    complete: boolean;
  };

  const completeTodo = async (id: string) => {
    const response = await fetch(api + "/todo/complete/" + id, {
      method: "PUT",
    });
    const data = await response.json();

    setTodos((todos: any) =>
      todos.map((todo: Todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(api + "/todo/delete/" + id, {
      method: "DELETE",
    });
    const data = await response.json();

    setTodos((todos) => todos.filter((todo: Todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(api + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    SetNewTodo("");
  };

  return (
    <div className="App">
      <h1>Welcome, Shanu2409</h1>
      <h4>Your task</h4>

      <div className="todos">
        {todos.map((todo: Todo) => (
          <div
            className={"todo " + (todo.complete && "is-complete")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>

            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              X
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive && (
        <div className="popup">
          <div className="closedPopup" onClick={() => setPopupActive(false)}>
            X
          </div>

          <div className="content">
            <h3>Add task</h3>

            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => SetNewTodo(e.target.value)}
              value={newTodo}
            />

            <button className="button" onClick={addTodo}>
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
