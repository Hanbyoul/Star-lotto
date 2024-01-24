# 🎰StarLotto

![스크린샷 2024-01-24 오후 11 08 05](https://github.com/Hanbyoul/Star-lotto/assets/99850326/e2a518dd-5124-4d96-80b4-6023299e0918)

- 배포 : https://star-lotto.vercel.app/

<br>

## 프로젝트 개요

Lotto 슬롯 머신은 동행복권의 비공식 API를 활용하여 로또 당첨 번호를 확인하고, 슬롯 애니메이션을 통해 사용자에게 생동감 있는 경험을 제공하는 웹 애플리케이션입니다. 로또 번호 생성 및 확인 과정을 자동화하고, 사용자 인터페이스(UI)를 통해 직관적인 상호 작용을 가능하게 합니다.

<br>

## 시작 가이드

#### Requirements

- Node.js 19.5.0
- Npm 9.3.1 or Yarn 1.22.19

#### Install

```bash
git clone https://github.com/Hanbyoul/Star-lotto.git
cd Star-lotto
```

#### Start

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

<br>

### Skills

<img src="https://img.shields.io/badge/Next.js-black?style=flat&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-blue?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/mongoDB-47A248?style=flat&logo=mongoDB&logoColor=green"/>
<img src="https://img.shields.io/badge/styled components-CC6699?style=flat&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/>
<img src="https://img.shields.io/badge/ApecChart-0D74E8?style=flat&logo=&Color=white"/>
<img src="https://img.shields.io/badge/react hook form-white?style=flat&logo=react hook form&Color=black"/>

<br>

## 화면구성

|                                                       메인화면                                                        |                                                        내 정보                                                         |
| :-------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/Hanbyoul/Star-lotto/assets/99850326/7aee3473-190a-4c31-91f9-19bfed332f14" width="450"/>  | <img src="https://github.com/Hanbyoul/Star-lotto/assets/99850326/2261e8ba-08fc-43f7-a650-a654d806ff7a" width="450"  /> |
|                                                        당첨자                                                         |                                                          통계                                                          |
| <img src="https://github.com/Hanbyoul/Star-lotto/assets/99850326/4b1aab5c-e0d1-4a13-8fff-3787d430d005" width="450" /> | <img src="https://github.com/Hanbyoul/Star-lotto/assets/99850326/0a1ccf67-e3db-4bdb-88a6-c5f8013824c6" width="450" />  |

<br>

### API 목록

|   Method   |           API            |              설명               |         비고          |
| :--------: | :----------------------: | :-----------------------------: | :-------------------: |
|  **POST**  |   endPoint/auth/signup   |            회원가입             |                       |
|  **POST**  |   endPoint/auth/login    |             로그인              |                       |
|  **POST**  | endPoint/auth/pw_change  |          비밀번호 변경          |                       |
|  **POST**  | endPoint/auth/pw_Inquiry |          비밀번호 찾기          |                       |
| **DELETE** |   endPoint/auth/delete   |            회원탈퇴             |                       |
|  **GET**   |  endPoint/auth/lottery   |        사용자 로또 조회         |                       |
|  **POST**  |  endPoint/auth/lottery   |        사용자 로또 생성         |                       |
|  **POST**  | endPoint/lottery_update  | 사용자 로또 번호 추첨 결과 반영 | cron-job.org 스케쥴링 |
|  **GET**   |  endPoint/round_update   |     로또 당첨 번호 업데이트     | cron-job.org 스케쥴링 |
|  **GET**   |  endPoint/stats_lottert  |         전체 로또 조회          |                       |
|  **GET**   |   endPoint/winningList   |        로또 당첨자 조회         |                       |
|  **GET**   |   endPoint/winningNum    |       로또 당첨 번호 조회       |                       |

<br>

## 주요기능

#### 내비게이션바

- 모바일 화면 DropDown 기능.
  - 리팩토링: useRef와 useEffect를 활용한 useOutSideClick 커스텀 훅을 통해 메뉴의 내부 및 외부 클릭 구분 기능 개선.

<br>

#### 메인 페이지

- 당첨번호 조회 및 업데이트
  - 클라이언트-서버 아키텍처를 통한 CORS 문제 해결.
    - 리팩토링: 외부 API 대신 DB 저장된 데이터 활용.
  - 매주 토요일 자동 업데이트를 위한 cron-job.org 스케쥴링.

<br>

- 슬롯 애니메이션
  - 색별 랜덤 숫자 생성 및 순차적 정지 기능.
  - Recoil을 활용한 상태 관리.

<br>

- 로또 번호 생성
  - 슬롯 정지 후 번호 반영 및 저장 (로그인 상태 확인).

<br>

#### 인증(Auth)

- 회원가입
  - react-hook-form을 사용한 폼 관리.
    - Input 이벤트 처리.
    - 사용자 입력 예외 처리.
  - 비밀번호 해시 처리 및 DB 저장 (bcrypt 활용).

<br>

- 비밀번호 찾기
  - nodemailer와 gmail SMTP를 이용한 임시 비밀번호 발급.

<br>

- 로그인
  - AJAX를 통한 사용자 정보 전송 및 검증.
    - 리팩토링: NextAuth 도입으로 로그인 관리 개선.
  - bcrypt의 compare 메서드를 활용한 비밀번호 검증.

<br>

- 페이지 접근 제한
  - 리팩토링: 미들웨어를 이용한 로그인 전 페이지 접근 차단 및 리다이렉트.

<br>

#### 서브 페이지

- 사용자 로또 정보 시각화
  - DB에서 불러온 데이터를 Apex 차트로 표현.

<br>

- 자동 당첨 결과 업데이트
  - cron-job.org 스케줄링을 통한 자동 비교 및 업데이트.

<br>

- 페이지네이션

  - 서버 부하 감소 및 UX 개선.

## 디렉토리 구조

```
 ├── public
 │     ├── bg.jpg
 │     ├── list.png
 │     ├── logo.png
 │     └── menu.svg
 │
 └── src
      ├── app
      │    │
      │    ├── @types
      │    │     └── mongodb.ts
      │    │
      │    ├── api
      │    │     ├── auth
      │    │     │     ├── [...nextauth]
      │    │     │     │          └── route.ts
      │    │     │     ├── delete
      │    │     │     │     └── route.ts
      │    │     │     ├── login
      │    │     │     │     └── route.ts
      │    │     │     ├── lottery
      │    │     │     │     └── route.ts
      │    │     │     ├── pw_change
      │    │     │     │     └── route.ts
      │    │     │     ├── pw_Inquiry
      │    │     │     │     └── route.ts
      │    │     │     └── signup
      │    │     │           └── route.ts
      │    │     │
      │    │     ├── lottery_update
      │    │     │        └── route.ts
      │    │     ├── round_update
      │    │     │        └── route.ts
      │    │     ├── stats_lottery
      │    │     │        └── route.ts
      │    │     ├── winningList
      │    │     │        └── route.ts
      │    │     └── winningNum
      │    │              └── route.ts
      │    │
      │    ├── components
      │    │     ├── Auth
      │    │     │     ├── Login.tsx
      │    │     │     └── SignUp.tsx
      │    │     │
      │    │     ├── Main
      │    │     │     ├── Loading
      │    │     │     │      ├── LoadingBall.tsx
      │    │     │     │      └── LoadingLottery.tsx
      │    │     │     ├── LotteryPaper
      │    │     │     │      └── SaveList.tsx
      │    │     │     ├── LottoSlot
      │    │     │     │      ├── Slot.tsx
      │    │     │     │      └── SlotList.tsx
      │    │     │     └── WinningNumber.tsx
      │    │     │
      │    │     ├── MyList
      │    │     │     ├── AccountSettings.tsx
      │    │     │     └── LottoList.tsx
      │    │     │
      │    │     ├── WinnerList
      │    │     │     ├── Winner.tsx
      │    │     │     └── WinningLotto.tsx
      │    │     │
      │    │     ├── Loadings.tsx
      │    │     ├── LottoCard.tsx
      │    │     ├── LottoChart.tsx
      │    │     ├── Modal.tsx
      │    │     ├── Navigation.tsx
      │    │     ├── PageNation.tsx
      │    │     └── Stats.tsx
      │    │
      │    ├── constants
      │    │     └── linCount.tsx
      │    │
      │    ├── GlobalState
      │    │     ├── atom.tsx
      │    │     └── Recoil.tsx
      │    │
      │    ├── hook
      │    │     └── useOutSideClick.tsx
      │    │
      │    ├── info
      │    │     └── page.tsx
      │    │
      │    ├── lib
      │    │     └──mongoose
      │    │            └── dbConnect.tsx
      │    │
      │    ├── login
      │    │     └── page.tsx
      │    │
      │    ├── lottoStats
      │    │     └── page.tsx
      │    │
      │    ├── models
      │    │     ├── Lottery.ts
      │    │     ├── User.ts
      │    │     └── WinningRound.ts
      │    │
      │    ├── pwInquiry
      │    │     └── page.tsx
      │    │
      │    ├── sign
      │    │     └── page.tsx
      │    │
      │    ├── styles
      │    │     ├── globals.css
      │    │     └── registry.tsx
      │    │
      │    ├── UserAuth
      │    │     └── NextAuthProviders.tsx
      │    │
      │    ├── utils
      │    │     ├── banPeriod.ts
      │    │     ├── checkLottoRank.ts
      │    │     ├── generateRandomPassword.ts
      │    │     ├── handleAlertError.ts
      │    │     ├── handleError.ts
      │    │     ├── latestCount.ts
      │    │     ├── nextRoundDate.ts
      │    │     ├── resultDateFormat.ts
      │    │     ├── shuffleArray.ts
      │    │     ├── sortingArray.ts
      │    │     ├── sortWinnersByRank.ts
      │    │     └── validateUserID.ts
      │    │
      │    ├── winnerList
      │    │     └── page.tsx
      │    │
      │    ├── favicon.ico
      │    │
      │    ├── layout.tsx
      │    │
      │    └── page.tsx
      │
      └── middleware.ts
```
