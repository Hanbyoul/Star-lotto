"use client";
import { styled } from "styled-components";

interface PageNumberProps {
  $number: number;
  $currentPage: number;
}

interface PageNationProps {
  totalPage: number;
  currentPage: number;
  pagesToShow: number;
  setCurrentPage: (value: number) => void;
}

export default function PageNation({
  totalPage,
  currentPage,
  setCurrentPage,
  pagesToShow,
}: PageNationProps) {
  const totalPageNum = Math.ceil(totalPage / pagesToShow);

  const currentGroup = Math.ceil(currentPage / pagesToShow); // 현재 페이지 그룹

  const firstPageNum = (currentGroup - 1) * pagesToShow + 1; // 첫번째 페이지

  const lastPageNum = Math.min(totalPageNum, currentGroup * pagesToShow); // 마지막 페이지

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
      {totalPageNum ? (
        <PageNumberArea>
          <PrevPage
            className={`mr-2 ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => {
              if (currentPage > 1) changePage(currentPage - 1);
            }}
          >
            ❮
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
            className={`ml-2 ${currentPage === totalPageNum ? "disabled" : ""}`}
            onClick={() => {
              if (currentPage < totalPageNum) changePage(currentPage + 1);
            }}
          >
            ❯
          </NextPage>
        </PageNumberArea>
      ) : null}
    </Container>
  );
}

const Container = styled.div``;
const PrevPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: large;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  color: #c0c0c0;
  border: 1px solid #e0e0e0;
  &:hover {
    border: none;
    background-color: #e0e0e0; /* 자연스러운 회색 빛 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    color: white;
  }
  &.disabled {
    border: 1px solid #e0e0e0;
    color: #e0e0e0; /* 비활성화 상태의 색상 */
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
`;

const NextPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: 600;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  color: #c0c0c0;
  border: 1px solid #e0e0e0;

  &:hover {
    border: none;
    background-color: #e0e0e0; /* 자연스러운 회색 빛 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    color: white;
  }
  &.disabled {
    border: 1px solid #e0e0e0;
    color: #e0e0e0; /* 비활성화 상태의 색상 */
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
`;

const PageNumberArea = styled.div`
  display: flex;
`;

const PageNumber = styled.button<PageNumberProps>`
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
