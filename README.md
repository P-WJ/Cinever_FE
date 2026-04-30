# Cinever FE

Cinever FE는 영화 탐색, 리뷰, 사용자 프로필, 팔로잉 피드, 관리자 화면을 제공하는 Vue 3 기반 프런트엔드 프로젝트입니다.

실제 앱 소스는 [`cinever-FE/`](./cinever-FE)에 있으며, 설치·실행·빌드 명령은 모두 해당 디렉터리에서 수행합니다.

## 핵심 요약

- 프레임워크: `Vue 3`, `Vite`, `Vue Router`, `Pinia`
- 스타일/시각화: `Tailwind CSS`, `Swiper`, `Chart.js`, `vue3-word-cloud`
- 기본 실행 모드: `Mock API`
- 실서버 연동 전환: `VITE_USE_MOCK_API=false`
- 실제 백엔드 API 기본 주소: `http://localhost:8080`
- 키워드 분석 서버 기본 주소: `http://localhost:5050`

## 주요 기능

- 홈 큐레이션
  - 박스오피스
  - 인기작 / 최신작 / 평점 상위작
  - OTT 기대작
  - 최근 리뷰
- 통합 검색
  - 영화 / 리뷰어 / 감독 / 배우
- 영화 상세
  - 예고편
  - 메타데이터
  - 리뷰 목록
  - 평점 분포
  - 키워드 워드클라우드
- 사용자 프로필
  - 위시리스트
  - 최근 본 영화
  - 선호 / 비선호 영화
  - 작성 리뷰
  - 팔로우 / 언팔로우
- 팔로잉 리뷰 피드
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
└─ cinever-FE/
   ├─ public/
   ├─ src/
   │  ├─ api/
   │  ├─ assets/
   │  ├─ components/
   │  ├─ layouts/
   │  ├─ pages/
   │  ├─ router/
   │  ├─ services/
   │  ├─ stores/
   │  └─ utils/
   ├─ .env.example
   ├─ index.html
   ├─ package.json
   ├─ postcss.config.js
   ├─ tailwind.config.js
   ├─ vercel.json
   └─ vite.config.js
```

## 빠른 시작

### 1. 사전 요구사항

- `Node.js 18+`
- `npm`

### 2. 설치

```bash
cd cinever-FE
npm install
```

### 3. 환경 변수 설정

기본 예시는 [`cinever-FE/.env.example`](./cinever-FE/.env.example)에 있습니다.

```env
VITE_USE_MOCK_API=true
```

동작 방식:

- `true` 또는 미설정: Mock API 사용
- `false`: 실제 백엔드 API 사용

### 4. 개발 서버 실행

```bash
npm run dev
```

기본 개발 서버 주소는 `http://localhost:5173`입니다.

### 5. 빌드

```bash
npm run build
```

### 6. 미리보기

```bash
npm run preview
```

## Mock API 모드

현재 코드 기준 기본 동작은 Mock API 모드입니다.

관련 파일:

- [`cinever-FE/src/api/index.js`](./cinever-FE/src/api/index.js)
- [`cinever-FE/src/api/flask.js`](./cinever-FE/src/api/flask.js)
- [`cinever-FE/src/api/mockAdapter.js`](./cinever-FE/src/api/mockAdapter.js)
- [`cinever-FE/src/api/mockData.js`](./cinever-FE/src/api/mockData.js)

Mock API 모드에서는:

- 백엔드 서버가 없어도 주요 화면 UI를 확인할 수 있습니다.
- 검색, 상세, 리뷰, 관리자 화면을 목 데이터 기반으로 점검할 수 있습니다.
- 키워드 추출도 목 데이터 기반으로 동작합니다.

UI 개발이나 화면 검토가 목적이라면 기본 설정 그대로 시작하는 편이 효율적입니다.

## 실서버 연동

실제 서버와 연결하려면 `.env.local` 또는 `.env.example` 기반 설정에서 아래처럼 바꿉니다.

```env
VITE_USE_MOCK_API=false
```

이 경우 아래 서비스가 필요합니다.

- 메인 API 서버: `http://localhost:8080`
- 키워드 분석 서버: `http://localhost:5050/analyze`

현재 코드 기준 API 주소는 환경변수로 분리되어 있지 않고 일부가 하드코딩되어 있습니다.

- [`cinever-FE/src/api/index.js`](./cinever-FE/src/api/index.js)
- [`cinever-FE/src/api/flask.js`](./cinever-FE/src/api/flask.js)

## 스크립트

[`cinever-FE/package.json`](./cinever-FE/package.json)에 정의된 스크립트입니다.

| 명령어            | 설명                |
| ----------------- | ------------------- |
| `npm run dev`     | Vite 개발 서버 실행 |
| `npm run build`   | 프로덕션 빌드 생성  |
| `npm run preview` | 빌드 결과 로컬 확인 |

## 주요 라우트

라우트 정의는 [`cinever-FE/src/router/index.js`](./cinever-FE/src/router/index.js)에 있습니다.

| 경로                | 설명             |
| ------------------- | ---------------- |
| `/`                 | 홈               |
| `/home`             | 홈 별칭          |
| `/review`           | 리뷰어 페이지    |
| `/top100`           | 장르별 Top 100   |
| `/feed`             | 팔로잉 리뷰 피드 |
| `/search`           | 검색 결과        |
| `/movie/:id`        | 영화 상세        |
| `/user/:id`         | 사용자 프로필    |
| `/login`            | 로그인           |
| `/signup`           | 회원가입         |
| `/admin/reviewer`   | 리뷰어 관리      |
| `/admin/review`     | 리뷰 관리        |
| `/admin/statistics` | 관리자 통계      |

## 코드 구조 메모

- [`cinever-FE/src/pages/`](./cinever-FE/src/pages/)  
  라우트 단위 페이지
- [`cinever-FE/src/components/`](./cinever-FE/src/components/)  
  기능별 UI 컴포넌트
- [`cinever-FE/src/layouts/`](./cinever-FE/src/layouts/)  
  메인 / 인증 / 관리자 레이아웃
- [`cinever-FE/src/api/`](./cinever-FE/src/api/)  
  인증, 영화, 리뷰, 사용자, 관리자 API 래퍼
- [`cinever-FE/src/stores/userStore.js`](./cinever-FE/src/stores/userStore.js)  
  로그인 사용자 상태와 토큰 저장

## 참고 사항

- 인증 상태는 `Pinia + persistedstate`로 유지됩니다.
- 프로필 이미지 업로드는 [`cinever-FE/src/api/firebase.js`](./cinever-FE/src/api/firebase.js)의 Firebase Storage 설정을 사용합니다.
- `Google` 로그인 버튼 UI는 존재하지만 OAuth 플로우는 연결되어 있지 않습니다.
- [`cinever-FE/vercel.json`](./cinever-FE/vercel.json)에 SPA 재작성 설정이 포함되어 있습니다.

## 현재 상황에 대한 메모

현재 실서버 연동 상태가 불안정하더라도, 기본 Mock API 모드로는 프런트엔드 구조와 대부분의 화면 흐름을 확인할 수 있습니다.

실데이터 검증이 필요할 때만:

1. `VITE_USE_MOCK_API=false`로 전환하고
2. 메인 API와 키워드 분석 서버를 함께 준비하면 됩니다.
