import { useTodoContext } from "../context/TodoContext";
import Item from "./Item";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

const List = () => { 
  const { todos } = useTodoContext();

  return (
    <ul>
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        {todos.map(todo => {
          return (
            <Item todo={todo} key={todo.id} id={todo.id}/>
          )
        })}
      </SortableContext>
    </ul>
  );
}

export default List;