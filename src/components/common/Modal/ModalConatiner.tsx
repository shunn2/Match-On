import Modal from "react-modal";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const customStyles = {
  overlay: {
    width: "60%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "20%",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
  },
  content: {
    height: "100%",
    display: "flex",
    FlexDirection: "column",
    justifyContent: "spacebetween",
  },
};

const StyledModal = styled(Modal)`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  .bottom {
    display: flex;
    margin-left: calc(100% - 11.5rem);
  }
  padding: 5%;
`;

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const ModalContainer = ({ isOpen, ...children }: ModalProps) => {
  return (
    <StyledModal isOpen={isOpen} style={customStyles}>
      {children}
    </StyledModal>
  );
};

export default ModalContainer;
