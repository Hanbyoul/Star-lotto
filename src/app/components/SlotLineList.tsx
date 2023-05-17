"use client";

import React from "react";
import styled from "styled-components";
import SlotLine from "./SlotLine";

const SlotLineList = () => {
  // 2차원 배열로 관리하는게 어떰?

  // 아니면 객체로...? 굳이 key값으로 얻어야할 이유는 없는듯

  // 상태관리 생각해보기

  // 현재 상태는 많이 난잡해보임.

  //[[1],[2],[3]...[45]] , [[1],[2],[3]...[45]],[[1],[2],[3]...[45]],[[1],[2],[3]...[45]],[[1],[2],[3]...[45]],[[1],[2],[3]...[45]]

  return (
    <Wrapper>
      <DrawArea>
        <SlotLine />
        <SlotLine />
        <SlotLine />
        <SlotLine />
        <SlotLine />
        <SlotLine />
      </DrawArea>
      <Footer></Footer>
    </Wrapper>
  );
};

export default SlotLineList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid powderblue;
  width: 700px;
  height: 500px;
`;

const DrawArea = styled.div`
  border: 2px solid orange;
  width: 600px;
  min-height: 350px;
  height: auto;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 9px;
  align-items: center;
`;

const Footer = styled.div`
  border: 2px solid blue;
  width: 600px;
  height: 100%;
  margin: auto;
`;
