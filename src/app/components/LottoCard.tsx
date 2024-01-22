"use client";
import { css, styled } from "styled-components";
import { lottoProps } from "@/\bGlobalState/atom";

export default function LottoCard({ numbers }: lottoProps) {
  return (
    <Container>
      {numbers?.map((ball) => (
        <Ball key={`ball-${ball}`} num={ball}>
          {ball}
        </Ball>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Ball = styled.div<{ num: number }>`
  margin-right: 5px;
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
