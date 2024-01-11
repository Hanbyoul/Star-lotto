"use client";
import React from "react";
import { keyframes, styled } from "styled-components";

const LoadingLottery = () => {
  return (
    <Container>
      <DateBox>로드중...</DateBox>
      <BallBox>
        <Ball>?</Ball>
      </BallBox>
    </Container>
  );
};

export default LoadingLottery;

const shareSpin = keyframes`
    0%{transform:translateX(-100px) rotateZ(0deg)}
    100%{transform:translateX(100px) rotateZ(360deg)}
`;

const Container = styled.div`
  @media screen and (max-width: 705px) {
    margin: 30px 0;
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
`;

const BallBox = styled.div`
  @media screen and (max-width: 705px) {
    width: 350px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 240px;
  height: 50px;
`;

const Ball = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: large;
  background-color: rgb(234, 59, 61);
  width: 30px;
  height: 30px;
  border-radius: 15px;
  animation: ${shareSpin} 1.5s infinite;
`;
