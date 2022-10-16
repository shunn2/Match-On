import React from "react";
import styled from "@emotion/styled";

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
