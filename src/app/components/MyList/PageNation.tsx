"use client";
import { styled } from "styled-components";
import { userCurrentPageState, userLottoState } from "@/\bGlobalState/atom";
import { useRecoilState } from "recoil";

interface PageNumberProps {
  $number: number;
  $currentPage: number;
}

export default function PageNation() {
  const [currentPage, setCurrentPage] = useRecoilState(userCurrentPageState);

  const lottoData = useRecoilState(userLottoState);

  const totalPage = Math.ceil(lottoData[0].length / 5); // 총 페이지

  const pagesToShow = 5; // 화면에 보여줄 아이템 개 수

  const currentGroup = Math.ceil(currentPage / pagesToShow); // 현재 페이지 그룹

  const firstPageNum = (currentGroup - 1) * pagesToShow + 1; // 첫번째 페이지

  const lastPageNum = Math.min(totalPage, currentGroup * pagesToShow); // 마지막 페이지

  const getPaginationNumbers = () => {
    let paginationNumbers = [];
    for (let i = firstPageNum; i <= lastPageNum; i++) {
      paginationNumbers.push(i);
    }
    return paginationNumbers;
  };
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      {totalPage ? (
        <PageNumberArea>
          <PrevPage
            className={`mr-2 ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => {
              if (currentPage > 1) changePage(currentPage - 1);
            }}
          >
            &lt;
          </PrevPage>
          {getPaginationNumbers().map((number) => (
            <PageNumber
              $currentPage={currentPage}
              $number={number}
              key={number}
              onClick={() => changePage(number)}
            >
              {number}
            </PageNumber>
          ))}
          <NextPage
            className={`ml-2 ${currentPage === totalPage ? "disabled" : ""}`}
            onClick={() => {
              if (currentPage < totalPage) changePage(currentPage + 1);
            }}
          >
            &gt;
          </NextPage>
        </PageNumberArea>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PrevPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: large;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  color: #aeaeae;
  &:hover {
    background-color: #e0e0e0; /* 자연스러운 회색 빛 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    color: white;
  }
  &.disabled {
    color: #c0c0c0; /* 비활성화 상태의 색상 */
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
`;

const NextPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: 600;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  color: #aeaeae;
  &:hover {
    background-color: #e0e0e0; /* 자연스러운 회색 빛 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    color: white;
  }
  &.disabled {
    color: #c0c0c0; /* 비활성화 상태의 색상 */
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
`;

const PageNumberArea = styled.div`
  display: flex;
`;

const PageNumber = styled.div<PageNumberProps>`
  background-color: ${(props) =>
    props.$number === props.$currentPage ? "#3399FF" : "none"};
  color: ${(props) =>
    props.$number === props.$currentPage ? "white" : " #aeaeae"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  font-size: large;
  font-weight: 400;
  cursor: pointer;
`;
