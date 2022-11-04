import { API_URL } from "@api/API";
import axios from "axios";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import ImageContainer from "../File/ImageContainer";
import { ContestContentsBox, HeartIcon } from "./elements/BoxContainer";
import { ContestBoxProps } from "./interface/BoxInterface";

import Comment from "public/components/Comment.svg";
import Seen from "public/components/Seen.svg";

export const ContestBox = (props: ContestBoxProps) => {
  const { data: session } = useSession();
  const [favorite, setFavorite] = useState(Boolean(props.favorite));
  const ref = useRef<HTMLDivElement | null>(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  const appendFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    await e.preventDefault();
    try {
      const res = await axios.post(
        API_URL + "activities/favorites",
        { activityIdx: props.activityIdx },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(res);
      setFavorite(true);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const diffDays = () => {
    return differenceInCalendarDays(
      new Date(parseISO(props.endTime)),
      new Date()
    );
  };

  useEffect(() => {
    props.isLastItem && isIntersecting && props.getSearchResult(); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [props.isLastItem, isIntersecting]);

  return (
    <ContestContentsBox selected={false}>
      <ImageContainer
        fileName="contest"
        url={props.imageUrl}
        size={[250, 320]}
      />
      <HeartIcon isMe={favorite} onClick={(e) => appendFavorite(e)}>
        {parseInt(props.favoriteCount) > 99 ? "+99" : props.favoriteCount}
      </HeartIcon>
      <div className="contest_title">{props.title}</div>
      <div className="contest_info">
        <div
          style={{ color: "#47d2d2", fontSize: "0.85rem", fontWeight: "600" }}
        >
          {`D-` + diffDays()}
        </div>
        <div style={{ display: "flex" }}>
          <div className="svg_wrapper">
            <Comment />
            {props.hitCount}
          </div>
          <div className="svg_wrapper">
            <Seen />
            {props.commentCount}
          </div>
        </div>
      </div>
    </ContestContentsBox>
  );
};
