"client";

import React from "react";
import { styled, keyframes } from "styled-components";

interface ILoadingBallProps {
  $lineIndex: number;
}

const LoadingBall = ({ $lineIndex }: ILoadingBallProps) => {
  return <Loading $lineIndex={$lineIndex}>?</Loading>;
};

export default LoadingBall;

const rotate = keyframes`
      0% { transform:rotateY(0deg) }
      100% { transform:rotateY(360deg) }

`;

const Loading = styled.div<{ $lineIndex: number }>`
  @media screen and (max-width: 705px) {
    height: 50px;
    width: 50px;
    font-size: x-large;
    margin: auto;
    border-radius: 26px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  width: 84px;
  margin: auto;
  margin-top: 5px;
  font-size: 4em;
  color: white;
  border-radius: 42px;
  background-color: ${(props) =>
    props.$lineIndex === 0
      ? "rgb(246,206,7)"
      : props.$lineIndex === 1
      ? "rgb(41,96,244)"
      : props.$lineIndex === 2
      ? "rgb(234,59,61)"
      : props.$lineIndex === 3
      ? "rgb(191,191,191)"
      : props.$lineIndex === 4
      ? "rgb(16,196,102)"
      : "rgb(255,156,0)"};

  animation: ${rotate} 0.4s infinite linear;
`;
