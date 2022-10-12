import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { API_URL } from "src/api/API";
import EditorForm from "@common/Editor/Editor";
import { ModalInterface } from "src/interfaces/modal";
import ModalContainer from "./ModalConatiner";
import {
  CloseButton,
  Contents,
  Header,
  Title,
  UploadButton,
} from "./elements/ModalElements";

import Close from "/public/components/CloseButton.svg";

const Description = styled.div`
  font-size: 0.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #aaaaaa;
  .description_row {
    margin: 0.3rem 0;
  }
`;

interface ResumeModalInterface extends ModalInterface {
  postIdx: number;
  type?: string;
}

const ResumeModal = ({
  isOpen,
  handleOpen,
  postIdx,
  type,
}: ResumeModalInterface) => {
  const { data: session } = useSession();
  const [body, setBody] = useState<string>("");

  const postResume = async () => {
    if (type === "lecture") {
      try {
        const res = await axios.post(
          API_URL + `lectures/posts/${postIdx}/resumes`,
          {
            body: body,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "study") {
      try {
        const res = await axios.post(
          API_URL + `studies/${postIdx}/resumes`,
          {
            body: body,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    handleOpen();
  };
  return (
    <ModalContainer isOpen={isOpen}>
      <Header>
        <Title>지원서 작성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <EditorForm setBody={setBody} data={""} clickable={false} />
      </Contents>
      <Description>
        <div className="description_row">
          이미 작성 완료한 지원서는 수정/취소 할 수 없습니다.
        </div>
        <div className="description_row">
          작성자가 팀으로 초대하면 알림이 갑니다.
        </div>
        <div className="description_row">
          팀원으로 참여를 확인하시면 팀 페이지로 자동 초대 됩니다.
        </div>
      </Description>
      <div className="bottom">
        <UploadButton
          onClick={body.length !== 8 ? postResume : undefined}
          possible={body.length > 7}
        >
          등록
        </UploadButton>
      </div>
    </ModalContainer>
  );
};

export default ResumeModal;
