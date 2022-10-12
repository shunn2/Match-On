import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7%;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const Contents = styled.div`
  width: 100%;
  height: 90%;
`;

export const UploadButton = styled.div<{ possible: boolean }>`
  width: 7rem;
  height: 2rem;
  background: ${(props) => (props.possible ? "#47d2d2" : "#aaaaaa")};
  border-radius: 0.5rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.possible ? "pointer" : "arrow")};
`;

export const ContentInput = styled.input`
  width: 100%;
  height: 2rem;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
  padding-left: 10px;
  margin-bottom: 2%;
  border: 1px solid #f1f1f1;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;

export const Anonymous = styled.span`
  font-size: 0.75rem;
  width: 3.5rem;
  display: flex;
  justify-content: space-evenly;
  color: #989898;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;