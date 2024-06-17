'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import useOutSideClick from '../hook/useOutSideClick';
import Modal from './Modal';

export interface Session {
	user?: {
		userId: string;
		createAt: Date;
		email: string;
	};
}

interface LinkAreaPops {
	$viewMenu: boolean;
}

export default function Navigation() {
	const { data } = useSession();
	const session = data as Session;
	const pathname = usePathname();
	const [viewMenu, setViewMenu] = useState(false);
	const [menuBarRef] = useOutSideClick<HTMLLIElement>(() => setViewMenu(false));
	const [isModal, setIsModal] = useState(false);

	return (
		<Container>
			<MenuArea>
				<LogoArea>
					<MenuBar ref={menuBarRef} onClick={() => setViewMenu(prev => !prev)}>
						<img src="/menu.svg" alt="menu" />
					</MenuBar>
					<Link href={'/'}>
						<img src="/logo.png" alt="logo" width={'180px'} />
					</Link>
				</LogoArea>
				<Modal open={isModal} close={() => setIsModal(false)} />
				<ListLink $viewMenu={viewMenu}>
					<LinkArea>
						<li onClick={() => setIsModal(true)}>도움말</li>
					</LinkArea>
					<LinkArea
						className={` ${pathname === '/lottoStats' ? 'active_link' : ''}`}
					>
						<Link href={'/lottoStats'}>
							<li>통계</li>
						</Link>
					</LinkArea>

					<LinkArea
						className={` ${pathname === '/winnerList' ? 'active_link' : ''}`}
					>
						<Link href={'/winnerList'}>
							<li>당첨자</li>
						</Link>
					</LinkArea>

					{session?.user ? (
						<>
							<LinkArea
								className={` ${pathname === '/info' ? 'active_link' : ''}`}
							>
								<Link href={'/info'}>
									<li>내정보</li>
								</Link>
							</LinkArea>

							<LinkArea className="logged_Btn">
								<li onClick={() => signOut()}>로그아웃</li>
							</LinkArea>
						</>
					) : (
						<LinkArea>
							<li onClick={() => signIn()}>로그인</li>
						</LinkArea>
					)}
				</ListLink>
			</MenuArea>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;

	@media screen and (max-width: 705px) {
		flex-direction: column;
	}
`;
const MenuArea = styled.div`
	background-color: white;
	@media screen and (max-width: 705px) {
		display: inline;
		border-radius: 0;
	}

	@media screen and (min-width: 706px) {
		background-color: white;
		min-width: 705px;
		font-weight: 500;

		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: auto;
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}
`;

const LogoArea = styled.span`
	@media screen and (max-width: 705px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
`;

const MenuBar = styled.span`
	padding: 5px;
	border: 2px solid #747d8c;
	border-radius: 5px;
	display: none;
	width: 35px;
	@media screen and (max-width: 705px) {
		display: inline;
		margin-left: 15px;
		cursor: pointer;
		position: absolute;
		left: 1px;
	}
`;

const ListLink = styled.ul<LinkAreaPops>`
	display: flex;
	color: #a9a9a9;
	li {
		margin-right: 10px;
		cursor: pointer;

		&:hover {
			color: #696969;
		}
	}

	@media screen and (max-width: 705px) {
		height: ${props => (props.$viewMenu ? '200px' : '0px')};
		display: flex;
		flex-direction: column;
		overflow: hidden;
		li {
			display: inline;
		}
		transition: 1s;
	}
`;

const LinkArea = styled.div`
	&.active_link {
		font-weight: 600;
		color: black;
		cursor: default;
		pointer-events: none;
	}

	@media screen and (max-width: 705px) {
		margin-left: 15px;
		margin-bottom: 15px;
	}
`;
