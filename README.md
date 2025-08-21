# Study Bank

Study Bank는 사용자가 학습 세트를 만들고, 관리하며, 효과적으로 공부할 수 있도록 돕는 플래시카드 학습 애플리케이션입니다.

## ✨ 주요 기능

- **사용자 인증**: Supabase를 이용한 안전한 이메일/비밀번호 및 소셜 로그인 기능.
- **폴더 및 세트 관리**: 학습 콘텐츠를 체계적으로 정리할 수 있는 폴더와 플래시카드 세트 생성, 수정, 삭제 기능.
- **플래시카드 편집기**: 직관적인 UI를 통해 플래시카드를 쉽게 추가하고 편집할 수 있습니다.
- **학습 공간**: 생성된 카드를 활용하여 학습하고 퀴즈를 풀 수 있는 학습 모드.
- **학습 진행 상태**: 학습 진행 상황을 추적하고 관리하는 기능.

## 🛠️ 기술 스택

- **프레임워크**: React, Vite
- **언어**: TypeScript
- **상태 관리**: TanStack Query (React Query) for server state, Zustand for client state
- **백엔드 및 데이터베이스**: Supabase
- **라우팅**: React Router DOM
- **스타일링**: TailwindCSS
- **배포**: Vercel

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/Tessa1217/study-bank.git
cd study-bank
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Supabase 프로젝트의 키를 입력하세요.

```env
VITE_APP_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_APP_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📂 프로젝트 구조

```
src/
├── api/        # Supabase API 호출 함수
├── assets/     # 정적 파일 (이미지, 폰트)
├── components/ # 재사용 가능한 UI 컴포넌트
├── hooks/      # 커스텀 훅
├── lib/        # 외부 라이브러리 설정 (e.g., Supabase 클라이언트)
├── pages/      # 페이지 컴포넌트
├── routes/     # 라우팅 설정
├── store/      # Zustand를 사용한 전역 상태 관리
├── styles/     # 전역 스타일 및 테마
├── types/      # TypeScript 타입 정의
└── validation/ # Zod 등을 사용한 유효성 검사 스키마
```

## 📜 코딩 컨벤션

### 서비스 레이어 네이밍

서비스 레이어(`api`, `repository`)의 함수는 역할에 따라 다음과 같은 규칙으로 네이밍합니다.

#### Repository (`/api/repository/*.repository.ts`)

데이터 소스와 직접 통신하는 레이어입니다. 데이터베이스 작업을 명시하는 동사를 사용합니다.

- `findAll`: 여러 개의 데이터를 조회
- `findById`: ID로 특정 데이터 1건을 조회
- `create`: 새로운 데이터를 생성
- `update`: 기존 데이터를 수정
- `deleteById`: ID로 특정 데이터를 삭제

#### API Service (`/api/*.api.ts`)

Repository를 호출하여 비즈니스 로직을 수행하는 레이어입니다. 애플리케이션 관점의 동작을 명시하는 동사를 사용합니다.

- `get[Noun]s`: 여러 개의 데이터를 조회하는 비즈니스 로직 (e.g., `getStudySets`)
- `get[Noun]ById`: ID로 특정 데이터 1건을 조회하는 비즈니스 로직 (e.g., `getStudySetById`)
- `create[Noun]`: 새로운 데이터를 생성하는 비즈니스 로직 (e.g., `createStudySet`)
- `update[Noun]`: 기존 데이터를 수정하는 비즈니스 로직 (e.g., `updateStudySet`)
- `save[Noun]`: 아이디가 없는 경우 새로운 데이터를 생성, 기존 데이터가 있는 경우 데이터를 수정하는 비지니스 로직 (e.g., `saveStudySet`)
- `delete[Noun]`: 특정 데이터를 삭제하는 비즈니스 로직 (e.g., `deleteStudySet`)
