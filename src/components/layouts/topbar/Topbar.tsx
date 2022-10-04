import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
//signOut === 로그아웃 함수 useSession === nextauth에서 user가 로그인되어 있는 지를 알려주는 훅
import DirectMsg from "../../sub/DirectMsg";
import Notification from "../../sub/Notification";

import styled from "@emotion/styled";
import UserInfo from "../../sub/UserInfo";

import { useAppSelector } from "../../../hooks/hooks";

import MessageIcon from "/public/topbarSVG/directmsg.svg";
import NotificationIcon from "/public/topbarSVG/notification.svg";
import { RootState } from "../../../redux/store";
import ProfileImage from "../../sub/ProfileImage";
// import { getProfileImgUrl } from "../../components/sub/getProfileImg";

const Top = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 94%;
  min-width: 200px;
  height: 2.5rem;
  right: 0;
`;

const Container = styled.div`
  width: 10.625rem;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    font-weight: bold;
  }
`;

const Topbar: React.FC = () => {
  const { data: session, status } = useSession();
  const user = useAppSelector((state: RootState) => state.user.value);

  const userInfo = useAppSelector((state) => state.user.value);

  const [alarmClick, setAlaramClick] = useState<boolean>(false);
  const alarmRef = useRef(null);

  const [msgClick, setMsgClick] = useState<boolean>(false);
  const msgRef = useRef(null);

  const [profileClick, setProfileClick] = useState<boolean>(false);
  const profileRef = useRef(null);

  function handleClickOutside(e: MouseEvent): void {
    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setProfileClick(false);
      return;
    }
    if (msgRef.current && !msgRef.current.contains(e.target as Node)) {
      setMsgClick(false);
      return;
    }
    if (alarmRef.current && !alarmRef.current.contains(e.target as Node)) {
      setAlaramClick(false);
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Top>
        <Container style={{ width: "8rem" }}>
          <NotificationIcon onClick={() => setAlaramClick(!alarmClick)} />
          <MessageIcon onClick={() => setMsgClick(!msgClick)} />
        </Container>
        <Container
          onClick={() => setProfileClick(!profileClick)}
          style={{
            justifyContent: "center",
            borderLeft: "0.8px solid #c4c4c4",
            cursor: "pointer",
          }}
        >
          {userInfo.nickname}&nbsp;
          <ProfileImage size={[30, 30]} mode="top" imageUrl={user.profileUrl} />
        </Container>
      </Top>
      {profileClick && (
        <div ref={profileRef}>
          <UserInfo {...userInfo} />
        </div>
      )}
      {msgClick && (
        <div ref={msgRef}>
          <DirectMsg />
        </div>
      )}
      {alarmClick && (
        <div ref={alarmRef}>
          <Notification />
        </div>
      )}
    </>
  );
};

export default Topbar;
