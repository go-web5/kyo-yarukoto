import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";
import styled from "styled-components";
import todoApi from "../api/todo";

const FormWrapper = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    margin-top: 8vw;
  }
`;

const Input = styled.input`
  width: calc(100% - 106px);
  margin-right: 6px;
  padding: 6px;
  font-size: inherit;
  @media screen and (max-width: 500px) {
    width: calc(100% - 22vw);
    margin-right: 2vw;
    padding: 1.5vw;
  }
`;

const Form = () => {
  const { createTodo } = useTodoContext();
  const [ enteredTodo, setEnteredTodo ] = useState("");
  
  const addTodo = (e) => {
    e.preventDefault();
    
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
      editing: false
    }
    
    todoApi.post(newTodo).then(newTodo => {
      createTodo(newTodo);
      setEnteredTodo("");
    })
  }

  return (
    <FormWrapper>
      <form onSubmit={addTodo}>
        <Input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button className="c-button">追加</button>
      </form>
    </FormWrapper>
  );
}
export default Form;