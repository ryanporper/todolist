import React, { useState} from "react";
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState("");

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0) return;

    const todoItem = {
      text: newTodo,
      complete: false
    }

    setTodos([...todos, todoItem]);
    setNewTodo("");
  }

  const handleDeleteTodo = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  }

  const handleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if(idx === i) {
        todo.complete = !todo.complete;

        // avoid mutating todo
        // const updatedTodo = { ...todo, complete: !todo.complete};
        // return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div style={{textAlign: "center"}}>
      <form onSubmit={(event) => {
        handleNewTodoSubmit(event);
      }}>
        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }} 
        type="text" 
        value={newTodo}
        />
        <div>
          <button>Add</button>
        </div>
      </form>
      <hr/>
      {todos.map((todo, i) => {
          const todoClasses = [];

          if(todo.complete) {
            todoClasses.push("crossout");
          }
          return (
            <div key={i}>
              <span className={todoClasses.join(" ")}>{todo.text}</span>
              <input onChange={(event) => {
                handleComplete(i);
              }} checked={todo.complete} type="checkbox"/>
              <button onClick={(event) => {
                handleDeleteTodo(i);
              }}
              style={{marginLeft: "15px"}}
              >Delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
