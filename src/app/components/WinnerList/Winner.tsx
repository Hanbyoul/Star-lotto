"use client";

import styled from "styled-components";
import { LotteryWinner } from "./WinningLotto";
import LottoCard from "../LottoCard";
import { resultDateFormat } from "../../utils/resultDateFormat";

export default function Winner({
  createAt,
  numbers,
  owner,
  rank,
}: LotteryWinner) {
  // 랭크 / 카드

  const maskLastThreeChars = (userId: string) => {
    const frontPart = userId.substring(0, userId.length - 3);
    const maskedPart = "***";
    return frontPart + maskedPart;
  };

  const maskedUserId = maskLastThreeChars(owner.userId);

  return (
    <Container>
      <LeftBox>{rank}등</LeftBox>
      <RightBox>
        <Tag>
          <span>{maskedUserId}</span>
          <span className="mr-3 text-gray-400">
            {resultDateFormat(createAt)}
          </span>
        </Tag>
        <LottoCard numbers={numbers} />
      </RightBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 2px #e5e7eb;

  &:last-child {
    border: none;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 65px;
  font-size: 14px;
  font-weight: bold;
  border-right: solid 2px #e5e7eb;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  padding-left: 20px;
`;

const Tag = styled.div`
  font-size: small;
  display: flex;
  justify-content: space-between;
`;
