import { useContext } from 'react';
import { TodoContext } from '.';

export const useTodoContext = () => {
  return useContext(TodoContext);
};