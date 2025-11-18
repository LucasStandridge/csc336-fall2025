import { useState } from 'react';
import TodoItem from "./TodoItem.jsx";
import TodoJSON from "./data.json";

function App(){
  const [task,setTask] = useState("");
  const [todos, setTodos] = useState(TodoJSON);

  function addTodo(){
    let newTodo = {
      task:task,
      complete:false,
      id: Date.now()
    }
    setTodos([...todos,newTodo]);
    setTask("")
  }

  return(
    <div>

      <input
      type = "text"
      value = {task}
      onChange = {(e) => setTask(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo = {todo} key={todo.id}/>
        ))}
      </ul>


    </div>
  )

}

export default App