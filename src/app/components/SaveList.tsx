import {
  listResetState,
  numberKey,
  saveListState,
  spinStopState,
} from "@/store/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css, styled } from "styled-components";
import { LINE_LIMITED_COUNT } from "../constant/lineCount";
import sortingArray from "../hooks/sortingArray";

const SaveList = () => {
  const [ballList, setBallList] = useState<numberKey[][]>([]);
  const [saveList, setSaveList] = useRecoilState(saveListState);
  const [listReset, setListReset] = useRecoilState(listResetState);
  const spinStopCount = useRecoilValue(spinStopState);

  const resetHandler = () => {
    if (spinStopCount === LINE_LIMITED_COUNT) {
      setListReset(true);
      setSaveList([]);
    }
  };

  useEffect(() => {
    if (listReset) {
      setBallList([]);
    }
  }, [listReset]);

  useEffect(() => {
    if (saveList.length > 1 && spinStopCount === 5) {
      setBallList((prev) => {
        const currentNumber = [...prev][prev.length - 1];
        const copyList = [...saveList];
        const addBall = copyList.splice(saveList.length - 6, 6);
        const sortBall = sortingArray(addBall);
        const isDuplicate =
          currentNumber?.every((value, index) => value === addBall[index]) ||
          false;
        if (!isDuplicate) {
          prev.push(sortBall);
        }

        return prev;
      });
    }
  }, [saveList, spinStopCount]);

  /**
   *@spinStopCount 의존성 연결후 감지시 렌더링...........
   */

  return (
    <Container className="bg-color">
      <Title>
        LIST
        <hr className="mb-3" style={{ width: 200 }} />
      </Title>

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

      <RemoveBtn
        $saveList={saveList}
        onClick={resetHandler}
        disabled={spinStopCount === LINE_LIMITED_COUNT ? false : true}
      >
        LIST비우기
      </RemoveBtn>
    </Container>
  );
};

export default React.memo(SaveList);

const Container = styled.div`
  border-radius: 25px;
  width: 300px;
  min-height: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  font-size: xx-large;
  text-align: center;
`;

const ListBall = styled.div`
  display: flex;
  justify-content: center;
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

const RemoveBtn = styled.button<{ $saveList: number[] }>`
  position: absolute;
  bottom: 10px;
  align-self: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: large;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
`;
