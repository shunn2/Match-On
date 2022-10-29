import React from "react";
import { Container, Identity, TodoList } from "./elements/BoxContainer";

const MemberBox = (props) => {
  return (
    <Container>
      <Identity>
        <div>{props.name}</div>
        <div>{props.school}</div>
      </Identity>
      <TodoList>
        {props.list.map((v, i) => (
          <div key={`list-${i}`}>-{v}</div>
        ))}
      </TodoList>
    </Container>
  );
};

export default MemberBox;
