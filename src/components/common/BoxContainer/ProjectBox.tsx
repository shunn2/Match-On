import { API_URL } from "@api/API";
import axios from "axios";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Describe,
  ProjectContainer,
  Subject,
  Title,
} from "./elements/BoxContainer";
import Favorite from "public/components/Favorite.svg";
import TeamMember from "@components/pageElements/myprojects/TeamMember";

const memberColor = ["#ffe8ea", "#f2c7f9", "#c7c7c7", "#9be5e5"];

export const ProjectBox = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const { data: session } = useSession();

  const diffDays = () => {
    const entire = differenceInCalendarDays(
      new Date(parseISO(props.deadline)),
      new Date(parseISO(props.createdAt))
    );
    const today = differenceInCalendarDays(
      new Date(),
      new Date(parseISO(props.createdAt))
    );
    return today / entire;
  };
  const appendFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFavorite(1);
    axios
      .post(
        API_URL + "teams/favorites",
        { teamIdx: props.teamIdx },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then((res) => console.log("append", res));
  };
  const deleteFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFavorite(0);
    axios
      .delete(API_URL + `teams/favorites/${props.teamIdx}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => console.log(res));
  };
  return (
    <ProjectContainer>
      <div className="top">
        <div>
          <Title>{props.name}</Title>
          <Subject>{props.type}</Subject>
        </div>
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
      <Describe>{props.description}</Describe>
      <div className="bottom">
        <div>
          {new Array(props.memberCount).fill(1).map((mem, index) => (
            <TeamMember
              fill={memberColor[index % 4]}
              key={`${props.teamIdx}${index}`}
              style={{ position: "relative", left: `${-13 * index}px` }}
            />
          ))}
        </div>
        <div className="progress">
          <div
            className="highlight"
            style={{ width: `${diffDays() * 100}%` }}
          ></div>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#a6a6a6" }}>
          팀 생성일: {format(parseISO(props.createdAt), "yyyy.MM.dd")}
        </div>
      </div>
    </ProjectContainer>
  );
};

export const MainProjectBox = (props) => {
  return (
    <ProjectContainer style={{ width: "95%", height: "95%" }}>
      <div className="top">
        <div>
          <Title>{props.name}</Title>
          <Subject>{props.type}</Subject>
        </div>
        <Subject>
          Date: {format(parseISO(props.deadline), "yyyy.MM.dd")}
        </Subject>
      </div>
      <Describe>{props.description}</Describe>
      <div className="bottom">
        <div>
          {new Array(props.memberCount).fill(1).map((mem, index) => (
            <TeamMember
              fill={memberColor[index % 4]}
              key={`${props.teamIdx}${index}`}
              style={{ position: "relative", left: `${-13 * index}px` }}
            />
          ))}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#a6a6a6" }}>
          팀 생성일: {format(parseISO(props.createdAt), "yyyy.MM.dd")}
        </div>
      </div>
    </ProjectContainer>
  );
};
