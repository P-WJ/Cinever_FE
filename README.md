# Cinever FE

Cinever FE는 영화 탐색, 리뷰 작성, 사용자 프로필, 리뷰어 피드, 관리자 기능을 제공하는 Vue 3 기반 프런트엔드 프로젝트입니다.

실제 애플리케이션 소스는 [`cinever-FE/`](./cinever-FE) 아래에 있으며, 설치와 실행 명령도 해당 디렉터리에서 수행합니다.

## 프로젝트 개요

- 프레임워크: `Vue 3`, `Vite`
- 라우팅/상태관리: `Vue Router`, `Pinia`
- UI: `Tailwind CSS`, `Swiper`, `Chart.js`, `vue3-word-cloud`
- 기본 실행 모드: `Mock API`
- 실서버 연동 전환: `VITE_USE_MOCK_API=false`
- 메인 API 기본 주소: `http://localhost:8080`
- 키워드 분석 서버 기본 주소: `http://localhost:5050/analyze`

## 주요 기능

- 홈 화면
  - 박스오피스
  - 인기작 / 최신작 / 평점 상위작
  - OTT 기대작
  - 최근 리뷰
- 통합 검색
  - 영화
  - 리뷰어
  - 감독
  - 배우
- 영화 상세
  - 예고편
  - 메타데이터
  - 리뷰 목록
  - 평점/키워드 정보
- 사용자 프로필
  - 프로필 정보 수정
  - 최근 본 영화 / 위시리스트
  - 리뷰 목록
  - 팔로우 / 언팔로우
- 리뷰 피드
  - 팔로우한 사용자의 최신 리뷰 확인
- 장르별 Top 100
- 관리자 화면
  - 리뷰어 관리
  - 리뷰 관리
  - 통계 차트

## 기술 스택

### Frontend

- `Vue 3`
- `Vite`
- `Vue Router`
- `Pinia`
- `pinia-plugin-persistedstate`

### UI / Visualization

- `Tailwind CSS`
- `Swiper`
- `Chart.js`
- `vue3-word-cloud`
- `@headlessui/vue`
- `@heroicons/vue`
- `@vuepic/vue-datepicker`

### Network / Utility

- `Axios`
- `Lodash`

### External Service

- `Firebase Storage`

## 디렉터리 구조

```text
Cinever_FE/
├─ README.md
├─ package-lock.json
├─ vercel.json
└─ cinever-FE/
   ├─ public/
   ├─ src/
   │  ├─ api/          # axios 모듈, mock adapter, Firebase 설정
   │  ├─ assets/       # 이미지, 스타일, 정적 리소스
   │  ├─ components/   # 도메인별 UI 컴포넌트
   │  ├─ layouts/      # Main/Auth/Admin 레이아웃
   │  ├─ pages/        # 라우트 단위 페이지
   │  ├─ router/       # 라우트 정의
   │  ├─ services/     # 페이징, 날짜 포맷 등 공통 로직
   │  ├─ stores/       # Pinia 스토어
   │  └─ utils/        # 기타 유틸 함수
   ├─ .env.example
   └─ package.json
```

## 시작하기

### 1. 사전 요구사항

- `Node.js 18+`
- `npm`

### 2. 설치

```bash
cd cinever-FE
npm install
```

### 3. 환경 변수 설정

`.env.example`을 참고해 `.env.local`을 만들 수 있습니다.

```env
VITE_USE_MOCK_API=true
```

- `true` 또는 미설정: Mock API 사용
- `false`: 실제 백엔드와 연동

환경 파일이 없어도 현재 코드는 기본적으로 Mock API 모드로 동작합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

기본 개발 서버 주소는 `http://localhost:5173`입니다.

### 5. 프로덕션 빌드

```bash
npm run build
```

### 6. 빌드 결과 미리보기

```bash
npm run preview
```

## 실행 모드

### Mock API 모드

현재 프로젝트는 Mock API를 기본 모드로 두고 있습니다. 이 모드에서는 백엔드 서버가 없어도 주요 화면 흐름을 확인할 수 있습니다.

- 홈, 검색, 영화 상세, 사용자 프로필, 피드, 관리자 화면 확인 가능
- 리뷰 작성/수정/삭제, 좋아요, 위시리스트, 팔로우 동작 가능
- 리뷰 키워드 추출도 Mock 데이터로 동작
- 로그인 시 이메일에 `admin`이 포함되면 관리자 계정으로 처리되고, 그 외에는 일반 사용자로 처리됨

UI 작업이나 화면 흐름 점검이 목적이라면 이 모드만으로도 대부분의 작업이 가능합니다.

### 실서버 연동 모드

실제 서버와 연결하려면 `.env.local`에서 아래처럼 변경합니다.

```env
VITE_USE_MOCK_API=false
```

이 경우 아래 서비스가 준비되어 있어야 합니다.

- 메인 API 서버: `http://localhost:8080`
- 키워드 분석 서버: `http://localhost:5050/analyze`

또한 실서버 모드에서 프로필 이미지 업로드를 사용하려면 Firebase Storage 설정이 필요합니다.

## 스크립트

| 명령어            | 설명                |
| ----------------- | ------------------- |
| `npm run dev`     | Vite 개발 서버 실행 |
| `npm run build`   | 프로덕션 빌드 생성  |
| `npm run preview` | 빌드 결과 로컬 확인 |

## 주요 라우트

라우트 정의는 [`cinever-FE/src/router/index.js`](./cinever-FE/src/router/index.js)에 있습니다.

| 경로                | 설명               |
| ------------------- | ------------------ |
| `/`                 | 홈                 |
| `/home`             | 홈 별칭            |
| `/review`           | 리뷰어 목록 페이지 |
| `/top100`           | 장르별 Top 100     |
| `/feed`             | 팔로우 리뷰 피드   |
| `/search`           | 검색 결과 페이지   |
| `/movie/:id`        | 영화 상세          |
| `/user/:id`         | 사용자 프로필      |
| `/login`            | 로그인             |
| `/signup`           | 회원가입           |
| `/admin`            | 관리자 메인        |
| `/admin/reviewer`   | 리뷰어 관리        |
| `/admin/review`     | 리뷰 관리          |
| `/admin/statistics` | 관리자 통계        |

## 코드 구조 메모

- `src/api`
  - 도메인별 API 모듈을 분리해 사용합니다.
  - `index.js`에서 Axios 인스턴스와 인증 헤더를 구성합니다.
  - `mockAdapter.js`가 Mock API 요청을 처리합니다.
- `src/stores`
  - 사용자 정보와 토큰을 Pinia로 관리합니다.
  - `pinia-plugin-persistedstate`를 통해 로그인 상태를 로컬 스토리지에 유지합니다.
- `src/layouts`
  - `MainLayout`, `AuthLayout`, `AdminLayout`으로 화면 구조를 분리합니다.
- `src/pages`
  - 라우트 단위 페이지 컴포넌트가 위치합니다.
- `src/components`
  - `home`, `movie-detail`, `user-detail`, `reviewer`, `common` 등 도메인 기준으로 구성되어 있습니다.
