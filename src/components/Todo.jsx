import List from "./List";
import Form from "./Form";
import styled from "styled-components";
import { useTodoContext } from "../context/TodoContext";

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
  const { setTodos } = useTodoContext();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const handleDragEnd = (event) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setTodos((todos) => {
        const oldIndex = todos.findIndex(todo => todo.id === active.id);
        const newIndex = todos.findIndex(todo => todo.id === over.id);
        return arrayMove(todos, oldIndex, newIndex);
      });
    }
  };

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
