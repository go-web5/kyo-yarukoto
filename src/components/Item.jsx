import { useTodoContext } from "../context/TodoContext";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from 'prop-types';
import todoApi from "../api/todo";

const TodoText = styled.span`
  margin-left: 6px;
  @media screen and (max-width: 500px) {
    margin-top: 6px;
  }
`;

const EditTodoText = styled.input`
  margin-left: 6px;
  @media screen and (max-width: 500px) {
    margin-top: 6px;
  }
`;

const Item = ( {todo} ) => {
  const { deleteTodo, updateTodo } = useTodoContext();
  const [ editingContent, setEditingContent ] = useState(todo.content ? todo.content : "");

  const complete = (todo) => {
    todoApi.delete(todo).then(() => {
      deleteTodo(todo.id);
    })
  }
  
  const changeContent = (e) =>  setEditingContent(e.target.value);

  const toggleEditMode = () => {
    const newTodo = { ...todo, editing: !todo.editing};
    todoApi.patch(newTodo).then(newTodo => {
      updateTodo(newTodo);
    });
  }

  const confirmContent = (e) => {
    e.preventDefault();
    const newTodo = { ...todo, editing: !todo.editing, content: editingContent };
    todoApi.patch(newTodo).then(newTodo => {
      updateTodo(newTodo);
    });
  }

  return (
    <li key={todo.id}>
      <button onClick={() => complete(todo)}>完了</button>
      <form onSubmit={confirmContent} style={{ display: "inline" }}>
        {
          todo.editing ? (
            <EditTodoText
              type="text"
              value={editingContent}
              onChange={changeContent}
            />
          ) : (
            <TodoText onDoubleClick={toggleEditMode}>{todo.content}</TodoText>
          )
        }
      </form>
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    content: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired
  }).isRequired,
};

export default Item;