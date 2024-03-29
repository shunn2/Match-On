import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { API_URL } from "src/api/API";
import EditorForm from "@common/Editor/Editor";
import { ModalInterface } from "src/interfaces/modal";
import ModalContainer from "./ModalConatiner";
import {
  Anonymous,
  CloseButton,
  ContentInput,
  Contents,
  Header,
  Title,
  UploadButton,
} from "./elements/ModalElements";

import Close from "/public/components/CloseButton.svg";
import CustomCheck from "/public/components/CustomCheck.svg";

interface UploadModalInterface extends ModalInterface {
  lectureIdx: number;
  type?: string;
}

const UploadModal = ({
  isOpen,
  handleOpen,
  lectureIdx,
  type,
}: UploadModalInterface) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const postBoard = () => {
    axios
      .post(
        API_URL + `lectures/${lectureIdx}/posts`,
        { type: type, title: title, body: body, isAnonymous: anonymous },
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
        <Title>
          {type === "free" && "자유게시판"}
          {type === "info" && "정보게시판"}
          {type === "team" && "팀원모집게시판"}
        </Title>
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
        {type !== "team" && (
          <Anonymous onClick={() => setAnonymous((prev) => !prev)}>
            익명
            <CustomCheck fill={anonymous ? "#47d2d2" : "#aaaaaa"} />
          </Anonymous>
        )}

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
