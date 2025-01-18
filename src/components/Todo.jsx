import List from "./List";
import Form from "./Form";
import styled from "styled-components";
import { useTodoContext } from "../context/TodoContext";
import todoApi from "../api/todo";

import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';

import {
  arrayMove,
} from '@dnd-kit/sortable';

const Main = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    margin-top: 8vw;
  }
`;

const Todo = () => {
  const { todos, setTodos } = useTodoContext();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over.id);
      const updatedTodos = arrayMove(todos, oldIndex, newIndex);
      setTodos(updatedTodos);
      await todoApi.sort(updatedTodos);
    }
  }

  return (
    <Main>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <List />
      </DndContext>
      <Form />
    </Main>
  )
};
export default Todo;
