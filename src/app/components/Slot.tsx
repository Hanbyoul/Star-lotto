"use client";

import { allSpinState, lineStopState, saveBallState } from "@/store/atom";
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import LoadingBall from "./LoadingBall";

interface ISlotLineProps {
  line: number[];
  lineIndex: number;
}

interface ILineProps {
  line_px: number;
  $spin_stop: boolean;
  $hydrated: boolean;
}
interface IBallProps {
  num: number;
}

const SlotLine = ({ line, lineIndex }: ISlotLineProps) => {
  const [hydrated, setHydrated] = useState(false);
  const setSaveBall = useSetRecoilState(saveBallState);
  const [LineStopCount, setLineStopCount] = useRecoilState(lineStopState);
  const [isSpinning, setSpinning] = useState(false); //recoil로변경
  const [AllSpin, setAllSpin] = useRecoilState(allSpinState);
  const line_px = line.length * 84;

  const spinHandler = () => {
    setSpinning(true);
    setAllSpin(false);
    if (LineStopCount === 5) {
      setTimeout(() => {
        setLineStopCount((prev) => prev + 1);
      }, 1000);
    } else {
      setLineStopCount((prev) => prev + 1);
    }
    /*
    //TODO:setTimeout으로 count + 되는 시간 지연 시켜서 다시 돌리기 버튼 시간에 맞게 맞추기!
    */
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setSaveBall((prev) => {
      const choiceBall = [...prev];
      choiceBall.push(line[0]);
      return choiceBall;
    });

    if (AllSpin) {
      return setSpinning(false);
    }
  }, [line]);

  /*
TODO: SLOT 컴포넌트의 Ball 컴포넌트에 layoutID 적용시키기. line[ball[0]]의 0번지만 layoutID 적용시키는법 생각해보기
TODO: 마찬가지로 SaveBll컴포넌트에 위에서 햇듯이 동일 layoutID 적용 시키기


*/

  console.log(line);
  console.log(line[0]);
  return (
    <Container>
      <ViewZone>
        {hydrated ? (
          <Line line_px={line_px} $spin_stop={isSpinning} $hydrated={hydrated}>
            {line.map((num) => (
              <Ball key={num + ""} num={num}>
                {num}
              </Ball>
            ))}
          </Line>
        ) : (
          <LoadingBall $lineIndex={lineIndex} />
        )}
      </ViewZone>

      <StopBtn onClick={() => spinHandler()} disabled={isSpinning}>
        STOP
      </StopBtn>
    </Container>
  );
};

export default React.memo(SlotLine);
const createSpin = (line_px: number) => keyframes`
  0% { transform: translateY(${-line_px}px); } 
  100% { transform: translateY(0px); }
`;

const endingSpin = (line_px: number) => keyframes`
    0% { transform: translateY(${-line_px}px); } 
  100% { transform: translateY(0px); }
`;
const Container = styled.div`
  position: relative;
  margin: auto;
`;

const ViewZone = styled.div`
  border-left: 2px solid brown;
  border-right: 2px solid brown;
  height: 84px;
  width: 91px;
  overflow: hidden;
`;

const Line = styled.div<ILineProps>`
  ${(props) =>
    props.$spin_stop
      ? css`
          animation: ${endingSpin(props.line_px)} 1s 1;
        `
      : css`
          animation: ${createSpin(props.line_px)} 0.5s infinite linear;
        `}

  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Ball = styled.div<IBallProps>`
  height: 84px;
  width: 84px;
  font-size: xx-large;
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
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StopBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 25px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: x-large;
  position: relative;
  top: 100px;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
`;
