import { useTodoContext } from "../context/TodoContext";
import Item from "./Item";

const List = () => {
  const { todos } = useTodoContext();

  return (
    <ul>
      {todos.map(todo => <Item todo={todo} key={todo.id} />)}
    </ul>
  );
}

export default List;