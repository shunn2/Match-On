import { API_URL } from "@api/API";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ContentsBox, Tag, TagWrapper } from "./elements/BoxContainer";

export const StudyBox = (props) => {
  const [favorite, setFavorite] = useState<boolean>(true);
  const { data: session } = useSession();

  const appendFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await e.preventDefault();
    try {
      const res = await axios.post(
        API_URL + "studies/favorites",
        { studyIdx: props.studyIdx },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setFavorite(true);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        API_URL + `studies/favorites/${props.studyIdx}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setFavorite(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ContentsBox selected={props.selected}>
      <div className="study_top">
        <TagWrapper>
          <Tag background="#47d2d2">모집중</Tag>
          <Tag background="#c4c4c4">{props.category}</Tag>
        </TagWrapper>
        <div
          className="icon"
          onClick={favorite ? deleteFavorite : appendFavorite}
        >
          <Favorite
            fill={favorite ? "#47d2d2" : "white"}
            stroke={favorite ? "#47d2d2" : "#aaaaaa"}
          />
        </div>
      </div>
      <div className="title">{props.title}</div>
      <div className="study_content">
        <div className="info_row">
          <span className="row_title">분야</span>
          <span>{props.category}</span>
        </div>
        <div className="info_row">
          <span className="row_title">지역</span>
          <span>{props.region}</span>
        </div>
        <div className="info_row">
          <span className="row_title">인원</span>
          <span>{props.count}명</span>
        </div>
      </div>
      <div className="study_info">
        <Seen />
        <span>{props.hitCount}</span>
        <Comment />
        <span>{props.commentCount}</span>
      </div>
    </ContentsBox>
  );
};
