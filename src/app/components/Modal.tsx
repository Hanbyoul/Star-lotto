'use client';

import styled from 'styled-components';
import useOutSideClick from '../hook/useOutSideClick';

interface ModalProp {
	open: boolean;
	close: () => void;
}

export default function Modal({ open, close }: ModalProp) {
	const [modalRef] = useOutSideClick<HTMLDivElement>(() => close());

	if (!open) return null;

	return (
		<Overlay>
			<ModalStyle ref={modalRef}>
				<Content className="text-zinc-600">
					<BtnArea>
						<ExitBtn onClick={() => close()}>x</ExitBtn>
					</BtnArea>
					<Title>이용 안내</Title>
					<Script>
						메인 화면 상단 당첨번호 ❮ ❯ 버튼으로 <br />
						회차별 로또 당첨번호 조회가 가능합니다.
					</Script>
					<Script>
						STOP 버튼을 클릭하면 슬롯이 정지되며
						<br />
						모든 슬롯이 정지되면 아래 로또 용지에 번호가 반영됩니다.
					</Script>
					<Title>-회원가입 이용시-</Title>
					<Script>
						슬롯이 정지되면 로또번호가 자동 저장되며 통계에 반영됩니다.
						<br />
						<span className="text-red-400">토요일 20시 ~ 자정까지 </span>
						로또번호가 저장되지 않습니다.
						<br />
						<span className="text-red-400"> 토요일 22시 이후 </span> 저장된
						로또번호의 당첨결과가 반영됩니다.
					</Script>
					<Script>
						<strong>[내정보]</strong>에서 저장된 로또번호 및 당첨현황을 확인할
						수 있습니다. <br />
						당첨된 번호의 <ResultRank>당첨</ResultRank>을 클릭하면 QR페이지로
						이동되며 당첨 결과를 <br />
						확인할 수 있습니다.
						<br />
					</Script>
					<Script>
						<strong>[당첨자]</strong>에서 다른 사용자의 당첨 결과를 확인할 수
						있습니다.
					</Script>
					<Script>
						<strong>[통계]</strong>에서 전체 및 회차별 통계를 확인할 수
						있습니다.
					</Script>
				</Content>
			</ModalStyle>
		</Overlay>
	);
}

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 5;
	width: 100vw;
	height: 100vh;
`;

const BtnArea = styled.div`
	position: fixed;
	top: 6px;
	left: 6px;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #52525b;
	border-radius: 99px;
`;
const ExitBtn = styled.button`
	color: white;
	font-size: small;
	margin-left: 1px;
	margin-bottom: 2px;
`;

const ModalStyle = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #ffffff;
	z-index: 5;
	border-radius: 8px;
`;

const Content = styled.div`
	min-width: 355px;
	display: flex;
	flex-direction: column;
	padding: 10px;
	margin-bottom: 20px;
`;

const Title = styled.h1`
	margin-top: 15px;
	text-align: center;
`;

const Script = styled.p`
	font-size: 14px;
	margin-top: 20px;
`;

const ResultRank = styled.span`
	background-color: rgb(246, 206, 7);
	padding: 3px;
	border-radius: 5px;
`;
