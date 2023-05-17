"use client";

import styled from "styled-components";
import SlotLineList from "./components/SlotLineList";

export default function Page() {
  return (
    <Container>
      <SlotLineList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
