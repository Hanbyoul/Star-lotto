"use client";

import { currentDrawCountState } from "@/\bGlobalState/atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function WinningLotto() {
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const [initCount, setInitCount] = useState(currentDrawCount);

  console.log("initCount :", initCount);
  const getWinningLotto = async (count: number) => {
    const res = await fetch(
      `http://localhost:3000/api/winningList?round=${count}`
    );

    const winnerList = await res.json();

    console.log(winnerList);
  };

  useEffect(() => {
    getWinningLotto(initCount);
  }, [initCount]);

  return <div>당첨자 리스트</div>;
}
