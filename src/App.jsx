import "./styles.css"
import {useState} from "react"

export default function App() {
  const [newItem, setNewitem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    setTodos(function (currentTodos) {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })
    setNewitem("")
  }

  function toggleTodo(id, completed) {
    setTodos(function(currentTodos) {
      return currentTodos.map(function(todo) {
        if(todo.id == id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }
  function deleteTodo(id) {
    // setTodos(currentTodos => {
    //   return currentTodos.filter(todo => todo.id !== id)
    //   })
    // }
    
    setTodos(function(currentTodos) {
      return currentTodos.filter(function(todo){
        if(todo.id !== id) {
          return todo
        }
      })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form" action="">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            onChange={e => setNewitem(e.target.value)} type="text" id="item" />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(function (todo) {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={(e)=> toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button className="btn btn-danger" onClick={function(){deleteTodo(todo.id)}}>Delete</button>
            </li>
          )}
        )}
      </ul>
    </>
  )
}