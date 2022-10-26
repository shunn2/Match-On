import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
// import { differenceInCalendarDays, format, parseISO } from "date-fns";

// import TeamMember from "/public/components/TeamMember.svg";
// import Favorite from "/public/components/Favorite.svg";
// import Comment from "/public/components/comment.svg";
// import Comment2 from "/public/components/Chat_Circle.svg";
// import Seen from "/public/components/seen.svg";
// import Seen2 from "/public/components/Show.svg";
// import { API_URL } from "src/api/API";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import ImageContainer from "@elements/File/ImageContainer";
// import useIntersectionObserver from "src/hooks/useIntersectionObserver";

export const Container = styled.div`
  width: 16.8rem;
  height: 16.5rem;
  margin: 1.8rem 1.5rem;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 0px 0.625em rgba(0, 0, 0, 0.25);
  border-radius: 1.25rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

export const Identity = styled.div`
  height: 48%;
  width: 100%;
  border-bottom: 0.031rem solid #dcdcdc;
`;

export const TodoList = styled.div`
  width: 100%;
  height: 48%;
  background-color: #f2f6f6;
  border-radius: 0.625rem;
`;

export const ProjectContainer = styled.div`
  width: 15.875rem;
  height: 18.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5%;
  background-color: white;
  border-radius: 1.25em;
  margin: 0 1.5rem 1.5rem 0;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .top {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #dcdcdc;
    .icon {
      cursor: pointer;
    }
  }
  .bottom {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .progress {
      width: 100%;
      height: 5px;
      background: #c4c4c4;
      border-radius: 1rem;
      .highlight {
        background: #47d2d2;
        height: 5px;
        border-radius: 1rem;
      }
    }
  }
`;

export const ContentsBox = styled.div<{ selected: boolean }>`
  height: 18.75em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2% 3% 2% 3%;
  background-color: white;
  border-radius: 1.25em;
  padding: 5%;
  box-shadow: ${(props) =>
    props.selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : ""};

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    border-bottom: 0.5px solid #dcdcdc;
  }
  .study_top {
    height: 12%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      cursor: pointer;
    }
  }
  .study_content {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 0.875rem;
    .info_row {
      display: flex;
      .row_title {
        color: #a6a6a6;
        margin-right: 0.5rem;
      }
    }
  }
  .study_info {
    width: 100%;
    height: 23%;
    display: flex;
    align-items: center;
    > span {
      font-size: 0.75rem;
      margin-left: 0.4rem;
      margin-right: 0.9rem;
    }
  }
`;
export const ContestContentsBox = styled.div<{ selected: boolean }>`
  width: 90%;
  height: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 1.25em;
  margin: 0 0.5rem 1rem 0.5rem;
  padding: 0.5rem;
  box-shadow: ${(props) =>
    props.selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : ""};
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .contest_title {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .contest_info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #a6a6a6;
  }
  .svg_wrapper {
    width: 40px;
    height: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
export const HeartIcon = styled.div<{ isMe: boolean }>`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.isMe ? "#47d2d2" : "#aaaaaa")};
  border-radius: 50%;
  position: absolute;
  font-size: 0.6rem;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const Subject = styled.div`
  font-size: 0.875em;
  font-weight: 400;
  color: #a0a0a0;
`;

export const Describe = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 4%;
  color: #a6a6a6;
  font-size: 0.875rem;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 0.625em;
  .class_content {
    width: 100%;
    display: flex;
    .descriptionTitle {
      width: 5rem;
    }
    .descriptionDetail {
      color: #000000;
    }
  }
`;

export const Board = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.875rem;
  .circle {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: #47d2d2;
    margin-right: 5px;
  }
  .boardLink {
    display: flex;
    align-items: center;
    &:hover {
      font-weight: 600;
    }
  }
`;
export const TagWrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;
export const Tag = styled.div<{ background: string }>`
  min-width: 3rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  padding: 0 0.2rem;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 300;
  border-radius: 1rem;
  background: ${(props) => props.background};
`;

export const EmptyBox = (props: any) => {
  return (
    <ProjectContainer
      style={{
        width: "95%",
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </ProjectContainer>
  );
};
