"use client";
import { styled } from "styled-components";
import LottoCard from "../LottoCard";
import { lottoProps, rankType } from "../../../GlobalState/atom";
import { resultDateFormat } from "../../utils/resultDateFormat";

interface ResultProps {
  $result: "대기" | "낙첨" | "당첨";
}

export default function LottoList({
  numbers,
  rank,
  round,
  createAt,
}: lottoProps) {
  const resultRank = (rank: rankType) => {
    if (rank === null) {
      return "대기";
    } else if (rank === "lose") {
      return "낙첨";
    } else {
      return "당첨";
    }
  };

  const result = resultRank(rank!);
  const formattedNumbers = numbers
    ?.map((num) => num.toString().padStart(2, "0"))
    .join("");
  const formattedRound = round?.toString().padStart(4, "0");

  return (
    <Container>
      <Round>
        <h1>{round}회</h1>
        <CreateDate>{resultDateFormat(createAt!)}</CreateDate>
      </Round>
      <Area>
        <LottoCard numbers={numbers} />

        {result === "당첨" ? (
          <a
            className=" block"
            target="_blank"
            href={`https://m.dhlottery.co.kr/qr.do?method=winQr&v=${formattedRound}q${formattedNumbers}`}
            rel="noopener noreferrer"
          >
            <RoundResult $result={result}>{result}</RoundResult>
          </a>
        ) : (
          <span>
            <RoundResult $result={result}>{result}</RoundResult>
          </span>
        )}
      </Area>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin-top: 8px;
  padding-left: 12px;
  border-bottom: solid 1px #e5e7eb;
  @media screen and (max-width: 705px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const Round = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 705px) {
    max-width: 350px;
  }
`;

const CreateDate = styled.div`
  font-size: small;
  padding-right: 20px;
  color: rgb(107 114 128);
`;

const Area = styled.div`
  display: flex;
`;

const RoundResult = styled.div<ResultProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;
  border-radius: 10px;
  background-color: rgb(246, 206, 7);
  margin-left: 5px;
  margin-bottom: 10px;
  font-weight: 600;

  background-color: ${(props) =>
    props.$result === "낙첨"
      ? "rgb(191,191,191)"
      : props.$result === "당첨"
      ? "rgb(246,206,7)"
      : "rgb(255,113,67)"};
  cursor: ${(props) => (props.$result === "당첨" ? "pointer" : "default")};
`;
