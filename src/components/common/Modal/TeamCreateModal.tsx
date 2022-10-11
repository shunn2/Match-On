import styled from "@emotion/styled";
import axios from "axios";
import { API_URL } from "../../../api/API";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import ModalContainer from "./ModalConatiner";

import Close from "../../public/componentSVG/CloseButton.svg";
import {
  CloseButton,
  ContentInput,
  Contents,
  Header,
  Title,
  UploadButton,
} from "./elements/ModalElements";

const ContentsRow = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .row_title {
    font-size: 0.75rem;
    color: #aaaaaa;
  }
  .input_wrapper {
    display: flex;
    justify-content: space-between;
  }
`;
const MemberWrapper = styled.div`
  width: 100%;
  height: 65%;
  border: 1px solid black;
`;

const TeamCreateModal = ({ isOpen, handleOpen, member, type, index }) => {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState<string>("");
  const router = useRouter();

  const createTeam = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams`,
        {
          name: teamName,
          type: type,
          members: member,
          index: index,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (res.data.code === 1000) {
        router.push("/myproject");
      } else {
        alert("팀 생성에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <Header>
        <Title>팀 생성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentsRow>
          <ContentInput
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="팀 이름을 입력하세요. (추후 변경 가능)"
          />
        </ContentsRow>
        <ContentsRow>
          <span className="row_title">사용자 초대하기</span>
          <div className="input_wrapper">
            <ContentInput
              style={{ width: "calc(100% - 6rem)" }}
              placeholder="사용자 이메일 입력"
            ></ContentInput>
            <UploadButton
              style={{ width: "5rem", height: "2.3rem" }}
              possible={true}
            >
              등록
            </UploadButton>
          </div>
        </ContentsRow>
        <MemberWrapper>
          {member.map((userIdx, idx) => (
            <div key={idx}>{userIdx}</div>
          ))}
        </MemberWrapper>
      </Contents>
      <div className="bottom">
        <UploadButton onClick={createTeam} possible={teamName.length > 0}>
          등록
        </UploadButton>
      </div>
    </ModalContainer>
  );
};

export default TeamCreateModal;
