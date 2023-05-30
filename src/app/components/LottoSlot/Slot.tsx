"use client";

import { allSpinState, spinStopState, saveListState } from "@/store/atom";
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import LoadingBall from "../Loading/LoadingBall";

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

const Slot = ({ line, lineIndex }: ISlotLineProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [slotSize, setSlotSize] = useState(94);
  const setSaveBall = useSetRecoilState(saveListState);
  const [spinStopCount, setSpinStopCount] = useRecoilState(spinStopState);
  const [isSpin, setSpin] = useState(false);
  const [AllSpin, setAllSpin] = useRecoilState(allSpinState);

  const line_px = line.length * slotSize;

  const spinHandler = () => {
    setSpin(true);

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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 705) {
      setSlotSize(52);
    } else {
      setSlotSize(94);
    }
  }, [windowWidth]);

  useEffect(() => {
    setSaveBall((prev) => {
      const addNumber = [...prev];
      addNumber.push(line[0]);
      return addNumber;
    });
  }, [setSaveBall, line]);

  useEffect(() => {
    if (spinStopCount === 0) {
      return setSpin(false);
    }
  }, [spinStopCount]);

  useEffect(() => {
    if (AllSpin) {
      setTimeout(() => {
        setSpin(true);
        if (lineIndex === 5) {
          setTimeout(() => {
            setSpinStopCount((prev) => prev + 1);
          }, 1500);
        } else {
          setSpinStopCount((prev) => prev + 1);
        }
      }, lineIndex * 1000);
    }
  }, [AllSpin]);

  return (
    <Container>
      <ViewZone>
        {hydrated ? (
          <Line line_px={line_px} $spin_stop={isSpin} $hydrated={hydrated}>
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

      <StopBtn onClick={() => spinHandler()} disabled={isSpin || AllSpin}>
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
    margin: -38px auto;
    border-radius: 5px;
  }

  overflow: hidden;
  background-color: white;
  border-radius: 5px;
`;

const Line = styled.div<ILineProps>`
  ${(props) =>
    props.$spin_stop
      ? css`
          animation: ${endingSpin(props.line_px)} 1.5s 1 ease-out;
        `
      : css`
          animation: ${createSpin(props.line_px)} 1s infinite linear;
        `}

  display: flex;

  flex-direction: column;
  background-color: white;
`;

const Ball = styled.div<IBallProps>`
  height: 84px;
  width: 84px;
  font-size: xx-large;
  margin: 5px auto;
  border-radius: 42px;

  @media screen and (max-width: 705px) {
    height: 42px;
    width: 42px;
    font-size: large;
    margin: 5px auto;
    border-radius: 21px;
  }

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
`;

const StopBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 25px;
  font-size: x-large;
  top: 13px;

  @media screen and (max-width: 705px) {
    width: 40px;
    height: 20px;
    font-size: 10px;
    border-radius: 10px;
    top: 47px;
  }

  background-color: rgb(234, 59, 61);
  color: white;
  position: relative;
  margin-left: 5px;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `};
`;
