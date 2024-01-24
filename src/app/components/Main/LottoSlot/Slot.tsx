"use client";

import styled, { keyframes, css } from "styled-components";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingBall from "../Loading/LoadingBall";
import {
  allSpinState,
  spinCountState,
  spinStopState,
} from "../../../GlobalState/atom";

interface ISlotLineProps {
  line: number[];
  lineIndex: number;
}

interface ILineProps {
  line_px: number;
  $spin_stop: boolean;
  $spinLock: boolean;
  $spinStopCount: number;
}
interface IBallProps {
  num: number;
}

const Slot = ({ line, lineIndex }: ISlotLineProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [spinStopCount, setSpinStopCount] = useRecoilState(spinCountState);
  const [spinState, setSpinState] = useRecoilState(spinStopState);
  const [spinLock, setSpinLock] = useState(false);
  const AllSpin = useRecoilValue(allSpinState);

  /**
   * @description: 애니메이션 시작 지점 Y축 px
   */
  const line_px = 2340;

  const spinHandler = () => {
    setSpinState((prev) => {
      return { ...prev, [lineIndex]: true };
    });

    setSpinLock(true);
    if (spinStopCount === 5) {
      setTimeout(() => {
        setSpinStopCount((prev) => prev + 1);
      }, 1500);
    } else {
      setSpinStopCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (spinStopCount === 0) {
      setSpinLock(false);
      setSpinState((prev) => {
        return { ...prev, [lineIndex]: false };
      });
    }
  }, [spinStopCount, lineIndex, setSpinState]);

  useEffect(() => {
    if (AllSpin && spinStopCount === 0) {
      setTimeout(() => {
        if (lineIndex === 5) {
          setSpinLock(true);
          setSpinState((prev) => {
            return { ...prev, [lineIndex]: true };
          });
          setTimeout(() => {
            setSpinStopCount((prev) => prev + 1);
          }, 1500);
        } else {
          setSpinState((prev) => {
            return { ...prev, [lineIndex]: true };
          });
          setSpinStopCount((prev) => prev + 1);
          setSpinLock(true);
        }
      }, lineIndex * 1000);
    }
  }, [AllSpin, lineIndex, setSpinState, setSpinStopCount, spinStopCount]);

  return (
    <Container>
      <ViewZone>
        {hydrated ? (
          <Line
            line_px={line_px}
            $spin_stop={spinState[lineIndex]}
            $spinLock={spinLock}
            $spinStopCount={spinStopCount}
          >
            {line.map((num) => (
              <Ball key={`num-${num}`} num={num}>
                {num}
              </Ball>
            ))}
          </Line>
        ) : (
          <LoadingBall $lineIndex={lineIndex} />
        )}
      </ViewZone>

      <StopBtn
        onClick={() => spinHandler()}
        disabled={spinState[lineIndex] || AllSpin}
        $line={lineIndex}
      >
        STOP
      </StopBtn>
    </Container>
  );
};

export default React.memo(Slot);
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
  height: 94px;
  width: 94px;

  @media screen and (max-width: 705px) {
    height: 52px;
    width: 52px;
    font-size: large;
    border-radius: 5px;
  }

  overflow: hidden;
  background-color: white;
  border-radius: 5px;
`;

const Line = styled.div<ILineProps>`
  ${(props) =>
    props.$spin_stop && props.$spinLock
      ? css`
          animation: ${endingSpin(props.line_px)} 1.5s 1 ease-out;
        `
      : !props.$spin_stop && !props.$spinLock
      ? css`
          animation: ${createSpin(props.line_px)} 1.5s infinite linear;
        `
      : props.$spin_stop && !props.$spinLock
      ? css`
          animation: none;
        `
      : ""}

  display: flex;

  flex-direction: column;
  background-color: white;

  @media screen and (max-width: 705px) {
    ${(props) =>
      props.$spin_stop && props.$spinLock
        ? css`
            animation: ${endingSpin(props.line_px)} 1.5s 1 ease-out;
          `
        : !props.$spin_stop && !props.$spinLock
        ? css`
            animation: ${createSpin(props.line_px)} 3.5s infinite linear;
          `
        : props.$spin_stop && !props.$spinLock
        ? css`
            animation: none;
          `
        : ""}
  }
`;

const Ball = styled.div<IBallProps>`
  height: 84px;
  width: 84px;
  font-size: xx-large;
  margin: 5px auto;
  border-radius: 42px;

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  @media screen and (max-width: 705px) {
    height: 42px;
    width: 42px;
    font-size: large;
    margin: 5px auto;
    border-radius: 21px;
  }
`;

const StopBtn = styled.button<{ $line: number }>`
  width: 80px;
  height: 40px;
  border-radius: 25px;
  font-size: x-large;
  top: 13px;
  background-color: rgb(234, 59, 61);
  color: white;
  position: relative;
  margin-left: 5px;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `};

  @media screen and (max-width: 705px) {
    display: none;
  }
`;
