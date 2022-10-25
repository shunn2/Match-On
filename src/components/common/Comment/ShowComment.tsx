import styled from "@emotion/styled";
import Child from "../../public/componentSVG/ChildComment.svg";
import { ChildRow, ParentRow } from "./CommentRow";

const ParentComment = styled.div`
  width: 100%;
  min-height: 5rem;
  background: #f2f6f6;
  margin: 1rem 0;
  border-radius: 10px;
`;

const ChildComment = styled.div`
  display: flex;
  width: 100%;
  min-height: 5rem;
  margin: 1rem 0;
  > svg {
    width: 4%;
    min-width: 1.5rem;
    max-width: 3rem;
  }
`;

const ShowComment = ({ commentList, setParentIdx, getPost }) => {
  return (
    <div>
      {commentList.map((parent, i) => {
        return (
          <div key={parent.commentIdx}>
            <ParentComment>
              <ParentRow
                {...parent}
                setParentIdx={setParentIdx}
                getPost={getPost}
              />
            </ParentComment>
            {parent.childComments.map((child, idx) => (
              <ChildComment key={child.commentIdx}>
                <Child />
                <ChildRow {...child} getPost={getPost} />
              </ChildComment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ShowComment;
