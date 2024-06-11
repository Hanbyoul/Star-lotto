"use client";
import { styled } from "styled-components";
import { lottoProps } from "../../GlobalState/atom";
import LottoChart from "./LottoChart";

interface StatsProps {
  lottoData: lottoProps[];
}

export default function Stats({ lottoData }: StatsProps) {
  const rankCount = {
    rank1: 0,
    rank2: 0,
    rank3: 0,
    rank4: 0,
    rank5: 0,
    lose: 0,
    empty: 0,
  };

  for (let i = 0; i < lottoData.length; i++) {
    if (lottoData[i].rank === 1) {
      rankCount.rank1++;
    } else if (lottoData[i].rank === 2) {
      rankCount.rank2++;
    } else if (lottoData[i].rank === 3) {
      rankCount.rank3++;
    } else if (lottoData[i].rank === 4) {
      rankCount.rank4++;
    } else if (lottoData[i].rank === 5) {
      rankCount.rank5++;
    } else if (lottoData[i].rank === "lose") {
      rankCount.lose++;
    } else if (lottoData[i].rank === null) {
      rankCount.empty++;
    }
  }

  const totalWinningRank = Object.keys(rankCount)
    .filter(
      (key): key is keyof typeof rankCount => key !== "lose" && key !== "empty"
    )
    .reduce((total, key) => total + Number(rankCount[key]), 0);





  return (
    <Container>
      {lottoData.length >= 1 ? (
        <>
          <LengthContainer>
            <LottoLength>저장된 로또 번호 : {lottoData.length}</LottoLength>
            <WinningLength>
              당첨된 로또 번호 : {totalWinningRank}{" "}
            </WinningLength>
            <PendingLength>
              추첨 대기 로또 번호 : {rankCount.empty}{" "}
            </PendingLength>
          </LengthContainer>
          <LottoChart rank={rankCount} />
        </>
      ) : (
        <EmptyLotto>생성된 로또 번호가없습니다.</EmptyLotto>
      )}
    </Container>
  );
}
const Container = styled.div``;
const LengthContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LottoLength = styled.div`
  font-size: x-large;
`;

const WinningLength = styled.div`
  margin-top: 15px;
  font-size: x-large;
`;

const PendingLength = styled.div`
  margin-top: 15px;
  font-size: x-large;
`;

const EmptyLotto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: large;
  font-weight: 600;
`;
