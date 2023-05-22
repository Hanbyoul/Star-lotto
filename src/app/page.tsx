"use client";

import styled from "styled-components";
import SlotList from "./components/SlotList";
import SaveList from "./components/SaveList";
import WinningNumber from "./components/WinningNumber";

export default async function Page() {
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
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
