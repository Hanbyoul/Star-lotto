import React from "react";
import "../styles/globals.css";
import Stats from "../components/MyList/Stats";
import LottoList from "../components/MyList/LottoList";

const page = () => {
  return (
    <div className="info shadow-2xl border-solid border">
      <div className="flex justify-center items-center border-solid border-b-2 h-16 text-xl">
        My List
      </div>
      <div className="s-content flex">
        <div className="border-solid border-r w-1/2">
          <Stats />
        </div>
        <div className="border-solid border-l w-1/2">
          <LottoList />
        </div>
      </div>
    </div>
  );
};

// 모바일 사용시 s-content flex 해제

export default page;
