import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(function () {
    const LOCALVALUE = localStorage.getItem("ITEMS");
    if (LOCALVALUE == null) {
      return [];
    }
    return JSON.parse(LOCALVALUE);
  });

  useEffect(
    function () {
      localStorage.setItem("ITEMS", JSON.stringify(todos));
    },
    [todos]
  );

  function addTodo(title) {
    setTodos(function (currentTodos) {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos(function (currentTodos) {
      return currentTodos.map(function (todo) {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id) {
    setTodos(function (currentTodos) {
      return currentTodos.filter(function (todo) {
        if (todo.id !== id) {
          return todo;
        }
      });
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
