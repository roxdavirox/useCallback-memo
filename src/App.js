import React, { useState, memo, useCallback } from "react";
import "./styles.css";

const Input = ({ onChange, ...props }) => {
  console.log("input render");
  return (
    <input type="text" onChange={e => onChange(e.target.value)} {...props} />
  );
};

const MemoInput = memo(Input);

const TodoList = ({ todos, onDelete }) => {
  console.log("render list");
  return (
    <ul>
      {todos &&
        todos.map((t, i) => (
          <li key={i} onClick={() => onDelete(i)}>
            {t}
          </li>
        ))}
    </ul>
  );
};

const MemoTodoList = memo(TodoList);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = useCallback(() => {
    setTodos(prev => [...prev, todo]);
    setTodo("");
  }, [todo]);

  const handleChangeTodo = useCallback(todo => {
    setTodo(todo);
  }, []);

  const handleDelete = useCallback(
    k => {
      if (!todos) return;
      setTodos(todos.filter((_, i) => i !== k));
    },
    [todos]
  );

  return (
    <div className="App">
      <h1>Todo list</h1>
      <MemoTodoList todos={todos} onDelete={handleDelete} />
      <MemoInput onChange={handleChangeTodo} value={todo} />
      <button onClick={addTodo}>Add todo</button>
    </div>
  );
};

export default App;
