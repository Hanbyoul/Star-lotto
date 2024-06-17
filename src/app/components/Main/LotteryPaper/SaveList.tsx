'use client';

import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { nextRoundDate } from '../../../utils/nextRoundDate';
import { resultDateFormat } from '../../../utils/resultDateFormat';
import { arrChar } from '../../../constant/lineCount';
import { useSession } from 'next-auth/react';
import { Session } from '../../Navigation';
import banPeriod from '../../../utils/banPeriod';
import {
	currentDrawCountState,
	isDuplicateState,
	loadListSelector,
	spinCountState,
} from '../../../GlobalState/atom';
import handleAlertError from '../../../utils/handleAlertError';

interface ResponseMessage {
	message: string;
}

const SaveList = () => {
	const [duplicate, setDuplicate] = useRecoilState(isDuplicateState);
	const loadList = useRecoilValue(loadListSelector);
	const spinCount = useRecoilValue(spinCountState);
	const currentDrawCount = useRecoilValue(currentDrawCountState);
	const nextDrawDate = nextRoundDate(currentDrawCount);
	const listChar = arrChar.slice(0, loadList ? loadList.length : 0);
	const { data } = useSession();
	const session = data as Session;

	// console.log("타입 체크해보기",typeof nextDrawDate)
	// console.log("타입 체크해보기",nextDrawDate instanceof Date)
	interface LotteryNumberParams {
		session: Session;
		currentDrawCount: number;
		lottNum: number[];
	}

	const addLotteryNumber = async ({
		session,
		currentDrawCount,
		lottNum,
	}: LotteryNumberParams) => {
		if (spinCount === 6 && session.user) {
			const [userId, round, numbers] = [
				session.user.userId,
				currentDrawCount + 1,
				lottNum,
			];

			const result = duplicate.every(num =>
				loadList.slice(-1)[0].includes(num),
			);

			const now = new Date();
			/**
			 * @description:매주 토요일 20시 ~ 24시 까지는 DB 저장 무시
			 */
			const pending = banPeriod(now);
			if (!pending) {
				alert('매주 토요일 20시 ~ 24시 까지는 로또번호를 저장할 수 없습니다.');
			}

			if (!result && pending) {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/auth/lottery`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ userId, round, numbers }),
						},
					);

					const result: ResponseMessage = await res.json();

					if (!res.ok) {
						throw new Error(result.message || '서버 오류가 발생되었습니다.');
					}

					alert('로또 번호가 저장되었습니다.');

					setDuplicate(numbers);
				} catch (error) {
					handleAlertError(error);
				}
			}
		}
	};

	useEffect(() => {
		if (session?.user && loadList.length >= 1) {
			const lottNum = loadList.slice(-1).flat();
			addLotteryNumber({ session, currentDrawCount, lottNum });
		}
	}, [session, loadList]);

	return (
		<Container>
			<Title>
				<h1>제 {currentDrawCount + 1}회</h1>
				<div>{`추첨일 : ${resultDateFormat(nextDrawDate)}`}</div>
				{listChar.map(char => (
					<ListChar key={`char-${char}`}>{char}</ListChar>
				))}
			</Title>

			<Area>
				{loadList?.map((list, index) => (
					<ListBall key={`listIndex-${index}`}>
						{list.map(ball => (
							<Ball key={`listPaper-${ball}`} num={ball}>
								{ball}
							</Ball>
						))}
					</ListBall>
				))}
			</Area>
		</Container>
	);
};

export default React.memo(SaveList);

const Container = styled.div`
	position: relative;
	border-radius: 25px;
	width: 360px;
	min-height: 500px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background-image: url('/list.png');
	background-position: center center;
	background-size: cover;
`;

const Title = styled.div`
	position: absolute;
	top: 131px;
	text-align: center;
	h1 {
		font-weight: 700;
		font-size: large;
	}
`;

const Area = styled.div`
	position: absolute;
	top: 189px;
`;

const ListChar = styled.span`
	position: relative;
	display: flex;
	flex-direction: column;
	font-size: large;
	font-weight: 700;
	right: 140px;
	top: 17px;
	margin-bottom: 22px;
`;

const ListBall = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 4px;
	border-radius: 25px;
	height: 45px;
`;

const Ball = styled.div<{ num: number }>`
	margin-top: 5px;
	margin-right: 2px;
	height: 36px;
	width: 36px;
	border-radius: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	background-color: ${props =>
		props.num <= 10
			? 'rgb(246,206,7)'
			: props.num <= 20
				? 'rgb(41,96,244)'
				: props.num <= 30
					? 'rgb(234,59,61)'
					: props.num <= 40
						? 'rgb(191,191,191)'
						: 'rgb(16,196,102)'};
`;
