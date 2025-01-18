import { useTodoContext } from "../context/TodoContext";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from 'prop-types';
import todoApi from "../api/todo";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Todo = styled.li`
  display: grid;
  place-items: center;
  grid-template-columns: 100px 1fr;
  column-gap: 6px;
  @media screen and (max-width: 500px) {
    grid-template-columns: 20vw 1fr;
    column-gap: 1.5vw;
  }
  & + & {
    margin-top: 6px;;
    @media screen and (max-width: 500px) {
    margin-top: 1.5vw;;
  }
  }
`;

const TodoText = styled.span`
  margin-left: 6px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    margin-top: 6px;
  }
`;

const EditTodoText = styled.input`
  display: inline-block;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  display: inline-block;
`;

const Item = ( {todo} ) => {
  const { deleteTodo, updateTodo } = useTodoContext();
  const [ editingContent, setEditingContent ] = useState(todo.content ? todo.content : "");

  const {
    attributes,
    listeners,
    setNodeRef, 
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });
  
  const style = {
    transition: transition || "transform 0.2s ease",
    transform: transform ? CSS.Transform.toString(transform) : "none",
    opacity: isDragging ? 0.5 : 1,
    padding: "10px",
    border: "1px solid #dbdbdb",
    backgroundColor: "white",
    cursor: "grab",
    borderRadius: "100vmax"
  }

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
    <Todo key={todo.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <button className="c-button" onClick={() => complete(todo)}>完了</button>
      <Form onSubmit={confirmContent}>
        {
          todo.editing ? (
            <EditTodoText
              type="text"
              value={editingContent}
              onChange={changeContent}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <TodoText onDoubleClick={toggleEditMode}>{todo.content}</TodoText>
          )
        }
      </Form>
    </Todo>
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