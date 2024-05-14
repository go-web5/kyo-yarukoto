import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../components/constants';

export const TodoContext = createContext();

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState(TodoList);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }

  const createTodo = (todo) => {
    setTodos([ ...todos, todo]); 
  }

  return (
    <TodoContext.Provider value={{todos, deleteTodo, createTodo}}>
      {children}
    </TodoContext.Provider>
  )
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};