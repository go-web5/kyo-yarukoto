import { useTodoContext } from "../context/TodoContext";
import styled from "styled-components";

const TodoText = styled.span`
  margin-left: 6px;
  @media screen and (max-width: 500px) {
    margin-top: 6px;
  }
`;

const List = () => {
  const { todos, deleteTodo } = useTodoContext();

  const complete = (id) => {
    deleteTodo(id);
  };

  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => complete(todo.id)}>完了</button><TodoText>{todo.content}</TodoText>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default List;