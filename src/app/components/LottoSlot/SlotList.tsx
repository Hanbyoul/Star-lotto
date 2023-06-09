"use client";

import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Slot from "./Slot";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  allSpinState,
  spinCountState,
  numberState,
  saveListState,
} from "@/store/atom";
import shuffleArray from "../../utils/ShuffleArray";
import { LINE_LIMITED_COUNT } from "../../constant/lineCount";

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
    <Wrapper>
      <DrawArea>
        {numbers.map((line, index) => (
          <Slot key={index} line={line} lineIndex={index} />
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
    </Wrapper>
  );
};

export default SlotList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawArea = styled.div`
  @media screen and (max-width: 705px) {
    width: 100%;
    height: 102px;
    gap: 5px;
    border-radius: 15px;
  }

  margin: 0px auto;
  width: 700px;
  height: 180px;
  padding: 10px;
  background-color: orange;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  padding: 10px;
  button {
    margin-right: 1em;
  }

  button:not(:disabled):hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;

const StartBtn = styled.button`
  width: 100px;
  height: 50px;
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
  width: 100px;
  height: 50px;
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
