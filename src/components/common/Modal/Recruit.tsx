import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "src/api/API";
import EditorForm from "@common/Editor/Editor";

import Close from "/public/components/CloseButton.svg";
import { ModalInterface } from "src/interfaces/modal";
import ModalContainer from "./ModalConatiner";
import {
  CloseButton,
  ContentInput,
  Contents,
  Header,
  Title,
  UploadButton,
} from "./elements/ModalElements";

const UploadModal = ({ isOpen, handleOpen }: ModalInterface) => {
  const { data: session } = useSession();
  const { contestIdx } = useRouter().query;
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const postBoard = () => {
    axios
      .post(
        API_URL + `activities/${contestIdx}/posts`,
        { title: title, body: body },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then(handleOpen)
      .catch((err) => console.log(err));
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <Header>
        <Title>팀원모집글 작성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorForm setBody={setBody} data={""} clickable={true} />
      </Contents>
      <div className="bottom">
        <UploadButton
          onClick={
            title.length !== 0 && body.length !== 8 ? postBoard : undefined
          }
          possible={title.length !== 0 && body.length > 7}
        >
          등록
        </UploadButton>
      </div>
    </ModalContainer>
  );
};

export default UploadModal;
