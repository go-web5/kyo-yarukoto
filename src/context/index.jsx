import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import todoApi from "../api/todo";

export const TodoContext = createContext();

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoApi.getAll().then(res => {
      setTodos(res)
    })
  }, [])

  const deleteTodo = (id) => {
    const delTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(delTodos);
  }

  const createTodo = (todo) => {
    setTodos([ ...todos, todo]); 
  }

  const updateTodo = (todo) => {
    const newTodos = todos.map(_todo => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo };
    })
    setTodos(newTodos);
  }

  return (
    <TodoContext.Provider value={{todos, setTodos, deleteTodo, createTodo, updateTodo}}>
      {children}
    </TodoContext.Provider>
  )
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};