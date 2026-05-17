# 기술 문서 포탈 (Tech Docs Portal)

Notion을 CMS로 활용하여 팀/조직의 기술 문서를 한곳에서 관리하고 공유하는 웹 포탈입니다.

## 🎯 프로젝트 개요

- **목적**: 기술 문서를 Notion에서 작성하고 웹 포탈에서 아름답게 표시
- **대상**: 백엔드 팀, 데이터 팀, DevOps 팀 등 기술 문서가 많은 조직
- **특징**: 비개발자도 Notion에서 쉽게 문서 작성 가능

## 📦 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.2+
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Markdown**: react-markdown + rehype-highlight

### CMS & Data
- **CMS**: Notion API (@notionhq/client)
- **Caching**: Next.js ISR (Incremental Static Regeneration)
- **Search**: Client-side Search

### Development
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## ✨ 주요 기능

- 📚 **문서 조회**: 카테고리별 기술 문서 분류 및 검색
- 🔍 **전체 검색**: 키워드 기반 문서 검색
- 🏷️ **태그 필터링**: 태그별 문서 필터링
- 📄 **마크다운 렌더링**: Notion 문서를 마크다운으로 렌더링
- 📑 **목차 생성**: 문서 목차 자동 생성
- 🎨 **신택스 하이라이팅**: 코드 블록 신택스 하이라이팅
- 🌙 **다크모드**: 다크모드 지원
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🚀 빠른 시작

### 1. 프로젝트 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
```

### 2. Notion API 설정

1. [Notion Integrations](https://www.notion.com/my-integrations)에서 새 Integration 생성
2. "Tech Docs Portal" 이름으로 생성
3. API 토큰 복사
4. 데이터베이스에 Integration 추가

### 3. 환경 변수 설정

`.env.local` 파일에 다음 정보 추가:

```env
# Notion API
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_api_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 📊 Notion 데이터베이스 구조

### Documents 테이블

| 필드 | 타입 | 설명 |
|------|------|------|
| Title | Title | 문서 제목 |
| Category | Select | 카테고리 (Backend, Database, Architecture) |
| Tags | Multi-select | 태그 (NestJS, TypeScript, Performance) |
| Version | Select | 버전 (v1.0, v2.0 등) |
| Status | Select | 상태 (Draft, Published, Archived) |
| Author | Person | 작성자 |
| PublishedDate | Date | 발행일 |
| UpdatedDate | Date | 수정일 |
| Summary | Text | 간단한 설명 |
| Slug | Text | URL 친화적 ID |
| Content | Page Content | 문서 본문 |

## 📖 Notion 설정 가이드

### 데이터베이스 생성

1. Notion에서 새 Database 생성 (Table view)
2. 이름: "Documents"
3. 위의 필드 구조대로 설정

### API 토큰 생성

1. [Notion Integrations](https://www.notion.com/my-integrations)
2. "Create new integration" 클릭
3. Integration 이름: "Tech Docs Portal"
4. "show API token" 클릭
5. 토큰 복사해서 `.env.local`에 저장

### 데이터베이스 권한 설정

1. Notion 데이터베이스 우측 상단의 세 점 메뉴
2. "Connection" 또는 "+ Add connection" 클릭
3. 위에서 생성한 Integration 선택

## 🏗️ 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── page.tsx          # 홈 페이지
│   ├── layout.tsx        # 레이아웃
│   ├── docs/
│   │   ├── page.tsx      # 문서 목록
│   │   └── [slug]/
│   │       └── page.tsx  # 문서 상세
│   └── api/
│       └── revalidate/   # ISR 재검증 API
├── components/            # React 컴포넌트
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── DocumentCard.tsx
│   └── ...
├── lib/                   # 유틸리티 함수
│   ├── notion.ts        # Notion API 클라이언트
│   ├── types.ts         # TypeScript 타입
│   └── utils.ts         # 헬퍼 함수
├── docs/
│   └── PRD.md           # 프로젝트 요구사항 문서
├── .env.example         # 환경 변수 예제
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지
npm run test:cov
```

## 🔧 코드 스타일

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format
```

## 📚 추가 가이드

- [PRD 문서](./docs/PRD.md) - 상세 프로젝트 요구사항
- [Notion API 문서](https://developers.notion.com/)
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/)

## 🚀 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에서 로그인
2. 프로젝트 import
3. 환경 변수 설정
   - `NEXT_PUBLIC_NOTION_DATABASE_ID`
   - `NOTION_API_KEY`
4. Deploy

### ISR 재검증

환경 변수 `REVALIDATE_TOKEN` 설정 후 다음 요청:

```bash
curl -X POST http://localhost:3000/api/revalidate?token=YOUR_TOKEN
```

## 📈 성능 최적화

- **ISR**: 매 30초마다 페이지 재검증
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 동적 import로 번들 크기 최적화
- **캐싱**: Notion API 응답 캐싱

## 🔒 보안

- API 키는 `.env.local`에 저장 (절대 노출 금지)
- 환경 변수는 `.gitignore`에 포함
- 서버 사이드에서만 API 호출 수행

## 📄 라이선스

MIT

## 👨‍💻 기여

이 프로젝트는 개발 중입니다. 문제가 있거나 개선 사항이 있으면 Issue를 등록해주세요.

---

**생성일**: 2026-05-17  
**프로젝트 상태**: MVP 설계 완료, 개발 준비 중
