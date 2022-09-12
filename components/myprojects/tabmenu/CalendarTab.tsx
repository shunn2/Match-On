import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { format } from "date-fns";
import Calendar from "react-calendar";
import CalendarModal from "./tabComponents/Modal/CalendarModal";
import { API_URL } from "../../api/API";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Glass from "/public/MagnifyingGlass.svg";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const CalendarContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .react-calendar {
    width: 100%;
    height: calc(100% - 5rem);
    background-color: #f8fbfb;
    padding: 5px 10px 5px 10px;
  }
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-evenly;
    height: 3rem;
    .react-calendar__navigation__label {
      font-size: 1.2rem;
      font-weight: 600;
      &:hover {
        color: #47d2d2;
        border: none;
      }
    }
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__next-button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
    }
    .react-calendar__navigation__prev-button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
    .react-calendar__navigation__arrow {
      font-size: 3rem;
      flex-grow: 1;
      color: #c4c4c4;
      &:hover {
        font-weight: bold;
        color: #47d2d2;
        border: none;
      }
    }
  }

  .react-calendar__viewContainer {
    width: 100%;
    height: 85%;
    border: 0.2px solid #c4c4c4;
    border-radius: 10px;
    padding: 15px 5px 0 5px;
  }
  .react-calendar__month-view {
    width: 100%;
    height: 100%;
    > div {
      height: 10%;
    }
    div > div {
      height: 100%;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    border: none;
    height: 50px;
    div > abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays {
    border: none;
  }
  button {
    background-color: #f8fbfb;
    border: 0;
    color: black;
    height: 100%;
    > abbr {
      font-size: 0.875rem;
      @media screen and (max-width: 760px) {
        font-size: 1rem;
      }
    }
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid #47d2d2;
    }

    &:active {
      border-bottom: 0.25rem solid #47d2d2;
    }
  }
  .react-calendar__month-view__days {
    height: 90%;
    .react-calendar__tile {
      font-size: 1rem;
      max-width: initial !important;
      height: 150%;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.2;
  }
  .react-calendar__month-view__days__day--weekend {
    color: red;
  }
  .react-calendar__tile--range {
    color: #47d2d2;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.2rem;
  background: #f8fbfb;
  border-radius: 10px;
  .calendar_search_input {
    width: 80%;
    height: 80%;
    border: none;
    background-color: #f8fbfb;
    &:focus {
      outline: none;
    }
  }
`;

const ScheduleContainer = styled.div`
  width: 33%;
  height: 92%;
  padding: 10px;
  background-color: #f8fbfb;
  border-radius: 0.625rem;
  @media screen and (max-width: 760px) {
    display: none;
  }
  .add_section {
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const ScheduleDate = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: 550;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScheduleListGroup = styled.div`
  width: 100%;
  height: calc(100% - 5.5rem);
  border: 1px solid black;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ScheduleList = styled.div`
  width: 100%;
  height: 2.8rem;
  border: 1px solid black;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const AddButton = styled.div`
  width: 85px;
  height: 30px;
  color: #ffffff;
  font-size: 0.8rem;
  text-align: center;
  line-height: 30px;
  background-color: #47d2d2;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const todolist = [
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
];

const CalendarTab = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { projectIdx } = router.query;

  const [value, setValue] = useState(new Date());
  const [clickedDay, setClickedDay] = useState(format(new Date(), "MMMM dd"));
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const clickDay = (value) => {
    setClickedDay(format(value, "MMMM dd"));
  };
  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  // const getSchedule = async () => {
  //   try {
  //     const params = { year: filter, month: keyword };

  //     const res = await axios.get(API_URL + `teams/${projectIdx}/schedules`, {
  //       params: params,
  //       headers: {
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    console.log(clickedDay);
  }, [clickedDay]);

  return (
    <Container>
      <CalendarContainer>
        <SearchContainer>
          <input className="calendar_search_input" placeholder="검색" onChange={(e) => setKeyword(e.target.value)} />
          <Glass style={{ cursor: "pointer" }} />
        </SearchContainer>
        <Calendar
          onChange={setValue}
          calendarType="US"
          value={value}
          locale="en-EN"
          maxDetail="month"
          minDetail="month"
          formatDay={(locale, date) => format(date, "dd")}
          navigationLabel={null}
          onClickDay={clickDay}
          showNeighboringMonth={true}
        />
      </CalendarContainer>
      <ScheduleContainer>
        <ScheduleDate>{clickedDay}</ScheduleDate>
        <ScheduleListGroup>
          {todolist.map((v, i) => (
            <ScheduleList key={`list-${i}`}>
              {v.title}
              {v.author}
            </ScheduleList>
          ))}
        </ScheduleListGroup>
        <div className="add_section">
          <AddButton onClick={handleModalOpen}>일정 추가</AddButton>
        </div>
      </ScheduleContainer>
      {isOpen && <CalendarModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

//https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
//https://dev.to/fitzgeraldkd/react-calendar-with-custom-styles-30c9
export default CalendarTab;

//highlight https://breathtaking-life.tistory.com/147?category=835829
