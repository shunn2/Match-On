import EditorForm from "@common/Editor/Editor";
import axios from "axios";
import { API_URL } from "src/api/API";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import ModalContainer from "./ModalConatiner";
import {
  CloseButton,
  ContentInput,
  Contents,
  Header,
  Title,
  UploadButton,
} from "./elements/ModalElements";

import Close from "/public/components/CloseButton.svg";
import { ModalInterface } from "src/interfaces/modal";

const PatchModal = ({ isOpen, handleOpen }: ModalInterface) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [ogBody, setOgBody] = useState<string>("");

  const { postIdx } = router.query;
  const getOgData = async () => {
    try {
      const res = await axios.get(API_URL + `lectures/posts/${postIdx}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (res.data.code === 1000) {
        setTitle(res.data.result.title);
        setOgBody(res.data.result.body);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const patchPost = async () => {
    try {
      const res = await axios.patch(
        API_URL + `lectures/posts/${postIdx}`,
        {
          title: title,
          body: body,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (res.data.code === 1000) {
        location.reload();
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOgData();
  }, []);

  return (
    <ModalContainer isOpen={isOpen}>
      <Header>
        <Title>게시글 수정</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorForm setBody={setBody} data={ogBody} clickable={true} />
      </Contents>
      <div className="bottom">
        <UploadButton
          onClick={
            title.length !== 0 && body.length !== 8 ? patchPost : undefined
          }
          possible={title.length !== 0 && body.length > 7}
        >
          등록
        </UploadButton>
      </div>
    </ModalContainer>
  );
};

export default PatchModal;
