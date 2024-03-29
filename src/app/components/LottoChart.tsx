"use client";
import styled from "styled-components";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface rankCountProps {
  rank: {
    rank1: number;
    rank2: number;
    rank3: number;
    rank4: number;
    rank5: number;
    lose: number;
    empty: number;
  };
}

export default function LottoChart({ rank }: rankCountProps) {
  const chartData = {
    series: Object.values(rank),
    options: {
      labels: ["1등", "2등", "3등", "4등", "5등", "낙첨", "대기"],
      colors: [
        "#FFBB28",
        "#FF4560",
        "#008FFB",
        "#00E396",
        "#782CF6",
        "#BFBFBF",
        "#EF8C00",
      ],
      legend: {
        show: true,
        position: "bottom" as "bottom",
        horizontalAlign: "center" as "center",
        fontWeight: "bold",
        fontSize: "16px",
        fontFamily: "Helvetica, Arial, sans-serif",
        markers: {
          width: 10,
          height: 10,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {},
          },
        },
      ],
    },
  };

  return (
    <Wrapper>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="360"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
