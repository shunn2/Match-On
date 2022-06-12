import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import ClassTable from "../components/ClassTable";
import UploadModal from "../components/Modal/UploadModal";

const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const InfoBoard = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "contents",
        Header: "Contents",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "seen",
        noHeader: "Seen",
      },
      {
        accessor: "comments",
        noHeader: "Comments",
      },
    ],
    []
  );
  const data = [
    {
      class: "infoboard",
      id: "info-125345",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-02",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1234215",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-21",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1234445",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-21",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1254345",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-06",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1236545",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-08",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-12365445",
      name: "abc",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-09",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1234845",
      name: "abcd",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-10",
      seen: 15,
      comments: 3,
    },
    {
      class: "infoboard",
      id: "info-1237845",
      name: "abcde",
      contents: ["안녕하세요ㅇㅇㅇㅇㅇㅇㅇ", <br />, "hihihihi", <br />, "안녕하세용ㅇㅇㅇ"],
      date: "2022-06-11",
      seen: 15,
      comments: 3,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <ClassTable columns={columns} data={data} handleInputOpen={handleModalOpen} />
      {isOpen && <UploadModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

export default InfoBoard;
