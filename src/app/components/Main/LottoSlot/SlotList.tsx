"use client";

import styled, { css } from "styled-components";
import React, { useEffect } from "react";
import Slot from "./Slot";
import { LINE_LIMITED_COUNT } from "../../../constant/lineCount";
import { useRecoilState } from "recoil";
import {
  allSpinState,
  numberState,
  saveListState,
  spinCountState,
} from "@/\bGlobalState/atom";
import shuffleArray from "@/app/utils/shuffleArray";

const SlotList = () => {
  const [numbers, setNumbers] = useRecoilState(numberState);
  const [spinStopCount, setSpinStopCount] = useRecoilState(spinCountState);
  const [AllSpin, setAllSpin] = useRecoilState(allSpinState);
  const [saveList, setSaveList] = useRecoilState(saveListState);

  const shuffle = () => {
    if (saveList.length >= 30) {
      if (confirm("리스트가 가득 찼습니다. 비우시겠습니까?")) {
        return setSaveList([]);
      } else {
        return;
      }
    }
    if (spinStopCount === LINE_LIMITED_COUNT) {
      setSpinStopCount(0);
      setAllSpin(false);
      const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);

      setNumbers(() => {
        const shuffleNum = shuffleArray(numberArray);
        return shuffleNum;
      });
    }
  };

  const allStopHandler = () => {
    if (spinStopCount < 1 && !AllSpin) {
      return setAllSpin(true);
    }
  };

  useEffect(() => {
    setSaveList((prev) => {
      const CopyNum = [...numbers];
      const AddNum: number[] = [];
      let isEqual = false;

      for (let i = 0; i < numbers.length; i++) {
        AddNum.push(CopyNum[i][0]);
      }

      if (prev.length >= 6) {
        let prevNum = prev.slice(-6);
        isEqual = prevNum.every((value, index) => value === AddNum[index]);
      }
      if (isEqual) {
        return prev;
      }

      const newList = [...prev, ...AddNum];

      return newList;
    });
  }, [numbers]);

  return (
    <Container>
      <DrawArea>
        {numbers.map((line, index) => (
          <Slot key={`slot-${index}`} line={line} lineIndex={index} />
        ))}
      </DrawArea>
      <Footer>
        <StartBtn
          onClick={shuffle}
          disabled={spinStopCount >= LINE_LIMITED_COUNT ? false : true}
        >
          START
        </StartBtn>
        <AllStopBtn
          onClick={allStopHandler}
          disabled={spinStopCount >= 1 ? true : false}
        >
          ALL STOP
        </AllStopBtn>
      </Footer>
    </Container>
  );
};

export default SlotList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 705px) {
    background-color: orange;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const DrawArea = styled.div`
  margin: 0px auto;
  width: 700px;
  height: 180px;
  padding: 10px;
  background-color: orange;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media screen and (max-width: 705px) {
    width: 360px;
    height: 70px;
    gap: 5px;
    border-radius: 15px;
    box-shadow: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  padding: 10px;
  button {
    margin-right: 1em;
    width: 100px;
    height: 50px;
  }

  button:not(:disabled):hover {
    transform: scale(1.1);
    transition: 0.2s;
  }

  @media screen and (max-width: 705px) {
    padding: 5px;
    button {
      width: 90px;
      height: 35px;
      font-size: medium;
    }
  }
`;

const StartBtn = styled.button`
  border-radius: 12px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: x-large;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
`;

const AllStopBtn = styled.button`
  border-radius: 12px;
  background-color: rgb(234, 59, 61);
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
  color: white;
  font-size: large;
`;
