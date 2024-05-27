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
    useSensor(PointerSensor),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over.id);
      const updatedTodos = arrayMove(todos, oldIndex, newIndex);
        
      console.log(updatedTodos);
      // 並べ変えた後の配列が出力される

      todoApi.sort(updatedTodos).then(res => {
        console.log(res);
        // エラー : Failed to load resource: the server responded with a status of 404 (Not Found)
        setTodos(res);
      })
      
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
