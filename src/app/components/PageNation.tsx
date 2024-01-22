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

  const currentGroup = Math.ceil(currentPage / pagesToShow);

  const firstPageNum = (currentGroup - 1) * pagesToShow + 1;

  const lastPageNum = Math.min(totalPageNum, currentGroup * pagesToShow);

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
              key={`pageNum-${number}`}
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

  &.disabled {
    border: 1px solid #e0e0e0;
    color: #e0e0e0;
    cursor: default;
    pointer-events: none;
  }

  @media screen and (min-width: 705px) {
    &:hover {
      border: none;
      background-color: #e0e0e0;
      cursor: pointer;
      color: white;
    }
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

  &.disabled {
    border: 1px solid #e0e0e0;
    color: #e0e0e0;
    cursor: default;
    pointer-events: none;
  }
  @media screen and (min-width: 705px) {
    &:hover {
      border: none;
      background-color: #e0e0e0;
      cursor: pointer;
      color: white;
    }
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
