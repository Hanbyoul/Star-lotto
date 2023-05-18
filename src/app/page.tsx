"use client";

import styled from "styled-components";
import SlotList from "./components/SlotList";
import SaveBallList from "./components/SaveBallList";

export default function Page() {
  return (
    <Container>
      <SlotList />
      <SaveBallList />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;

  width: 100%;
  height: 100%;
`;
