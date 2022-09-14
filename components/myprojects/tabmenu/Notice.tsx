import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../sub/Table/Table";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const Notice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return <Container></Container>;
};

export default Notice;
