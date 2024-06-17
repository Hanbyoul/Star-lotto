'use client';
import { styled } from 'styled-components';
import WinningLotto from '../components/WinnerList/WinningLotto';

// 추첨완료된 round 에 대한 로또 번호받기

export default function Page() {
	return (
		<Container>
			<Title>회차별 당첨 현황</Title>
			<WinningLotto />
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	margin-top: 50px;
	width: 500px;
	height: 700px;
	background-color: white;
	border-radius: 20px;
	border: solid 1px #e5e7eb;
	box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

	@media screen and (max-width: 705px) {
		width: 100%;
		border-radius: 0px;
	}
`;

const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: larger;
	height: 50px;
	border-bottom: solid 2px #e5e7eb;
`;
