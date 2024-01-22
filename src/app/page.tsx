"use client";
import SlotList from "./components/Main/LottoSlot/SlotList";
import SaveList from "./components/Main/LotteryPaper/SaveList";
import WinningNumber from "./components/Main/WinningNumber";
import styled from "styled-components";

export default function Page() {
  return (
    <Container>
      <WinningNumber />
      <SlotList />
      <SaveList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
