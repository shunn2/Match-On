import { API_URL } from "@api/API";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Board,
  ContentsBox,
  Describe,
  Subject,
  Title,
} from "./elements/BoxContainer";

import Favorite from "public/components/Favorite.svg";

const ClassBox = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [favorite, setFavorite] = useState<boolean>(true);

  const deleteFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete(API_URL + `lectures/favorites/${props.lectureIdx}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => console.log(res));
  };

  const boardRouting = (tab: number) => {
    router.push(`/classboard/${props.lectureIdx}?tabnum=${tab}`);
  };
  return (
    <ContentsBox selected={props.select}>
      <div className="study_top">
        <div>
          <Title>{props.name}</Title>
          <Subject>{props.type}</Subject>
        </div>
        <Favorite
          className="icon"
          onClick={(e) => {
            deleteFavorite(e);
            setFavorite(!favorite);
          }}
          fill={favorite ? "#47d2d2" : "none"}
          stroke={favorite ? "#47d2d2" : "white"}
        />
      </div>
      <Describe>
        <div className="class_content">
          <span className="descriptionTitle">교수님</span>
          <span className="descriptionDetail">{props.instructor}</span>
        </div>
        <div className="class_content">
          <span className="descriptionTitle">학점</span>
          <span className="descriptionDetail">{props.credit}</span>
        </div>
        <div className="class_content">
          <span className="descriptionTitle">시간</span>
          <span className="descriptionDetail">{props.time}</span>
        </div>
      </Describe>
      <Board>
        <div style={{ fontSize: "0.625rem", color: "#aaaaaa" }}>게시판</div>
        <div className="boardLink" onClick={() => boardRouting(0)}>
          <div className="circle" />
          자유게시판
        </div>
        <div className="boardLink" onClick={() => boardRouting(1)}>
          <div className="circle" />
          정보공유게시판
        </div>
        <div className="boardLink" onClick={() => boardRouting(2)}>
          <div className="circle" />
          팀원모집게시판
        </div>
      </Board>
    </ContentsBox>
  );
};

export default ClassBox;
