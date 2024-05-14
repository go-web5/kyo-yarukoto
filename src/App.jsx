import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Todo from "./components/Todo";
import { TodoProvider } from "./context";

const Title = styled.h1`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 1.6rem;
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
const Wrapper = styled.div`
  padding: 40px 0;
`;
const Inner = styled.div`
  width: 100%;
  max-width: 500px;
  margin-inline: auto;
  padding: 0 48px;
  @media screen and (max-width: 500px) {
    max-width: 100%;
    padding: 0 4vw;
  }
`;

function App() {
  return (
    <TodoProvider>
      <Wrapper>
        <Inner>
          <GlobalStyles />
          <Title>今日やることリスト</Title>
          <Todo />
        </Inner>
      </Wrapper>
    </TodoProvider>
  );
}

export default App;