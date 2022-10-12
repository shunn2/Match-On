import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import axios from "axios";
import { API_URL } from "../../../src/api/API";
import { useSession } from "next-auth/react";
import Link from "next/link";
import VotePost from "../../../src/components/pages/myprojects/tabmenu/TabContents/VotePost";
import MeetPost from "../../../src/components/pages/myprojects/tabmenu/TabContents/MeetPost";
import NoticePost from "../../../src/components/pages/myprojects/tabmenu/TabContents/NoticePost";
import DrivePost from "../../../src/components/pages/myprojects/tabmenu/TabContents/DrivePost";

interface MemberInformation {
  memberIdx: number;
  name: string;
  role: string;
  status: string;
}
interface teamInformation {
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  members: MemberInformation[];
  name: string;
  teamIdx: number;
}

const MyprojectPage = styled.div`
  position: absolute;
  width: calc(100% - 8%);
  height: 92%;
  margin-left: 4%;
  /* height: 100%; */
`;

const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  margin-bottom: 3%;
`;

const Title = styled.div`
  padding: 0 0.625em 0 0.625em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25em solid #50d5d5;
  text-align: center;
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #aaaaaa;
`;

const MainContent = styled.div`
  width: 100%;
  height: 90%;
  font-size: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -1%;
  padding-top: 1%;
`;

const Tab = styled.div`
  width: 100%;
  height: 6%;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  }
  /* @media screen and (max-width: 450px) {
    font-size: 0.2rem;
  } */
`;

const TabMenu = styled.a<{ clicked: boolean }>`
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  background-color: ${(props) => (props.clicked ? "#ffffff" : "#F1F7F7")};
  color: ${(props) => (props.clicked ? "#000000" : "#aaaaaa")};
  border-bottom: ${(props) =>
    props.clicked ? "#ffffff" : "0.15em solid #47d2d2"};
  border-top: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-left: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-right: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-radius: ${(props) => (props.clicked ? "0.625em 0.625em 0 0" : "")};
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: white;
    border: 0.15em solid #47d2d2;
    border-radius: 0.625em 0.625em 0 0;
    border-bottom: none;
  }
`;

const tabContArr = [
  { tabNumber: 0, tabTitle: "회의록", url: "notes" },
  { tabNumber: 1, tabTitle: "화상 회의", url: "video" },
  { tabNumber: 2, tabTitle: "드라이브", url: "drives" },
  { tabNumber: 3, tabTitle: "투표", url: "votes" },
  { tabNumber: 4, tabTitle: "공지사항", url: "notices" },
  { tabNumber: 5, tabTitle: "달력", url: "calendar" },
  { tabNumber: 6, tabTitle: "팀원", url: "member" },
];
export default function ProjectPost() {
  const [teamInfo, setTeamInfo] = useState<teamInformation>({
    createdAt: "",
    deadline: "",
    description: "",
    id: "",
    members: [],
    name: "",
    teamIdx: null,
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  const { projectIdx, projectPostIdx, tabNum } = router.query;

  const [tab, setTab] = useState(1);
  const handleTabMenu = (index) => {
    setTab(index + 1);
  };
  useEffect(() => {
    setTab(Number(tabNum));
  }, [tabNum]);
  useEffect(() => {
    if (session?.user) {
      axios
        .get(API_URL + `teams/${projectIdx}`, {
          params: { type: "profile" },
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => {
          setTeamInfo(res.data.result);
        })
        .catch((err) => alert("팀 데이터 로딩 실패"));
    }
  }, [session]);

  return (
    <MyprojectPage>
      <Header>
        <Title onClick={() => router.push(`/myproject/${projectIdx}?tabNum=0`)}>
          {teamInfo.name}
        </Title>
        <SubTitle>{teamInfo.description}</SubTitle>
      </Header>
      <MainContent>
        <Tab>
          {tabContArr.map((v, index) => (
            <Link
              href={`/myproject/${projectIdx}?tabNum=${index + 1}`}
              key={`tab=${index}`}
            >
              <TabMenu clicked={index === tab - 1}>{v.tabTitle}</TabMenu>
            </Link>
          ))}
        </Tab>
        <Container>
          {tab === 1 && <MeetPost />}
          {/* {tab === 2 && <VedioConference />} */}
          {tab === 3 && <DrivePost />}
          {tab === 4 && <VotePost />}
          {tab === 5 && <NoticePost />}
          {/* {tab === 6 && <CalendarTab />}
          {tab === 7 && <TeamMember />} */}
        </Container>
      </MainContent>
    </MyprojectPage>
  );
}

// export async function getStaticProps({ params }) {
//   const postData = getPostData(params.id)
//   return {
//     props: {
//       postData,
//     },
//   }
// }
