import List from "./List";
import Form from "./Form";
import styled from "styled-components";

const Main = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    margin-top: 8vw;
  }
`;
const Todo = () => {
  return (
    <Main>
      <List />
      <Form />
    </Main>
  )
};
export default Todo;
