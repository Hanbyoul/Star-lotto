import { numberKey, saveList } from "@/store/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";

const SaveBallList = () => {
  const [ballList, setBallList] = useState<numberKey[][]>([]);
  const [saveBall, setSaveBall] = useRecoilState(saveList);
  // const testSelector = useRecoilValue(saveSelector);

  /*
//! 어느시점에서든 다시 뽑기가 가능함
//TODO: STOP버튼이 전부 클릭완료되야 다시 뽑기 버튼 활성화 시키기.

! 코드 업데이트시 중복된 숫자 다시 저장됨.(useEffect렌더 시점 문제)!!!!!!!

//! 다시뽑기 클릭시 바로 저장리스트에 볼이 나타남.(useEffect렌더 시점 문제)
   s
 */

  useEffect(() => {
    if (saveBall.length > 1) {
      setBallList((prev) => {
        const copyList = [...saveBall];
        const addBall = copyList.splice(saveBall.length - 6, 6);
        prev.push(addBall);
        return prev;
      });
    }
  }, [saveBall]);

  //로직 파악 다시하고
  //내일 까지 기능구현 마무리하기.

  /*
    TODO: 저장가능한 ballList max 설정하기.

    TODO: ballList 생성시 framer motion 연결해보기.

    TODO: ballList 초기화 버튼 만들기.

  */
  return (
    <Container>
      <Title>내가 뽑은 번호</Title>
      {ballList &&
        ballList.map((list, index) => (
          <ListBall key={index}>
            {list.map((ball) => (
              <Ball key={ball} num={ball}>
                {ball}
              </Ball>
            ))}
          </ListBall>
        ))}
      <RemoveBtn>리스트 비우기</RemoveBtn>
    </Container>
  );
};

export default React.memo(SaveBallList);

const Container = styled.div`
  border: 1px solid red;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: xx-large;
  text-align: center;
`;

const ListBall = styled.div`
  display: flex;
  justify-content: center;
`;

const Ball = styled.div<{ num: number }>`
  margin-top: 5px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) =>
    props.num <= 10
      ? "rgb(246,206,7)"
      : props.num <= 20
      ? "rgb(41,96,244)"
      : props.num <= 30
      ? "rgb(234,59,61)"
      : props.num <= 40
      ? "rgb(191,191,191)"
      : "rgb(16,196,102)"};
`;

const RemoveBtn = styled.button`
  align-self: center;

  width: 120px;
  height: 40px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: large;
  border-radius: 12px;
`;
