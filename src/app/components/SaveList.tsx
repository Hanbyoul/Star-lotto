import {
  currentDrawCountState,
  listResetState,
  numberKey,
  saveListState,
  spinStopState,
} from "@/store/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css, styled } from "styled-components";
import sortingArray from "../hooks/sortingArray";
import { nextDrawing } from "../hooks/nextDrawing";
import { dateFormat } from "../hooks/dateFormat";
import { arrChar } from "../constant/lineCount";

const SaveList = () => {
  const [ballList, setBallList] = useState<numberKey[][]>([]);
  const saveList = useRecoilValue(saveListState);
  const listReset = useRecoilValue(listResetState);
  const spinStopCount = useRecoilValue(spinStopState);
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const nextDrawDate = nextDrawing(currentDrawCount);

  useEffect(() => {
    if (listReset) {
      setBallList([]);
    }
  }, [listReset]);

  useEffect(() => {
    if (saveList.length > 1 && spinStopCount === 5) {
      setBallList((prev) => {
        const copyList = [...saveList];
        const addBall = copyList.splice(saveList.length - 6, 6);
        const sortBall = sortingArray(addBall);
        prev.push(sortBall);

        return prev;
      });
    }
  }, [saveList, spinStopCount]);

  const listChar = arrChar.slice(0, ballList.length);

  console.log("현재 회차는?", currentDrawCount);

  return (
    <Container>
      <Header>
        <h1>제 {currentDrawCount + 1}회</h1>
        <div>{`추첨일 : ${dateFormat(nextDrawDate)}`}</div>
        {listChar.map((char) => (
          <ListChar key={char}>{char}</ListChar>
        ))}
      </Header>

      <Area>
        {!listReset && ballList
          ? ballList.map((list, index) => (
              <ListBall key={index}>
                {list.map((ball) => (
                  <Ball key={ball} num={ball}>
                    {ball}
                  </Ball>
                ))}
              </ListBall>
            ))
          : null}
      </Area>
    </Container>
  );
};

export default React.memo(SaveList);

const Container = styled.div`
  position: relative;
  border-radius: 25px;
  width: 380px;
  min-height: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("/list.png");
  background-position: center center;
  background-size: cover;
`;

const Header = styled.div`
  position: absolute;
  top: 131px;
  text-align: center;
  h1 {
    font-weight: 700;
    font-size: large;
  }
`;

const Area = styled.div`
  position: absolute;
  top: 189px;
`;

const ListChar = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: 700;
  right: 140px;
  top: 17px;
  margin-bottom: 22px;
`;

const ListBall = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  border-radius: 25px;
  height: 45px;
`;

const Ball = styled.div<{ num: number }>`
  margin-top: 5px;
  margin-right: 2px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) =>
    props.num <= 10
      ? "rgb(246,206,7)"
      : props.num <= 20
      ? "rgb(41,96,244)"
      : props.num <= 30
      ? "rgb(234,59,61)"
      : props.num <= 40
      ? "rgb(191,191,191)"
      : "rgb(16,196,102)"};
`;

// const SaveBtn = styled.button`
//   position: relative;
//   width: 200px;
//   height: 25px;
//   border-radius: 7px;
//   top: 448px;
//   right: 10px;
//   background-color: #5c636a;
//   color: white;
//   font-size: large;

//   &:hover {
//     transition: 0.3s;
//     background-color: #212529;
//   }
// `;

// const RemoveBtn = styled.button<{ $saveList: number[] }>`
//   position: absolute;
//   bottom: 10px;
//   align-self: center;
//   width: 100px;
//   height: 50px;
//   border-radius: 12px;
//   background-color: rgb(234, 59, 61);
//   color: white;
//   font-size: large;
//   ${(props) =>
//     props.disabled &&
//     css`
//       background-color: gray;
//     `}
// `;
