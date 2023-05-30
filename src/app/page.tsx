"use client";

import styled from "styled-components";
import SlotList from "./components/LottoSlot/SlotList";
import SaveList from "./components/LotteryPaper/SaveList";
import WinningNumber from "./components/WinningNumber";

/**
 * TODO : 로그인 상태
 * ? ID /  로그아웃 / My-Page UI 및 컴포넌트 생성
 * TODO : 로그인아웃 상태
 * ? 로그인 / 회원가입 UI 및 컴포넌트 생성
 *
 * 이후 로또 번호 DB 생성 로직 진행.
 */

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
