# 기술 문서 포탈 (Tech Docs Portal)

Notion을 CMS로 사용해 팀의 기술 문서를 한곳에서 보여주는 웹 포탈입니다.
Notion에서 문서를 작성하고 `Status`를 **Published**로 바꾸면 30초 이내(ISR) 사이트에 반영됩니다.

- 요구사항: [docs/PRD.md](docs/PRD.md)
- 개발 순서: [docs/ROADMAP.md](docs/ROADMAP.md)
- 작업 계획: `shrimp_data/tasks.json` (Shrimp Task Manager)

## 기술 스택

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide · @notionhq/client · notion-to-md · react-markdown · Vercel

## 주요 화면

| 경로 | 설명 |
|------|------|
| `/` | 검색창, 카테고리, 최근 문서 6개 |
| `/docs` | 전체 문서 (최근 수정순, 페이지네이션) |
| `/docs/[slug]` | 문서 상세 (마크다운 렌더링, 코드 하이라이팅, 목차, 관련 문서) |
| `/category/[name]` | 카테고리별 문서 |
| `/search` | 전체 검색 + 카테고리/태그 필터 |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

### 환경 변수

| 이름 | 설명 |
|------|------|
| `NOTION_API_KEY` | Notion 개발자 도구 > 연결 > API 토큰 |
| `NOTION_DATABASE_ID` | Documents 데이터베이스 URL의 32자리 ID |

Notion 데이터베이스의 **⋯ → 연결**에서 위 API 토큰의 연결을 추가해야 조회할 수 있습니다.
환경 변수가 없으면 사이트는 빌드되지만 "Notion 연결이 설정되지 않았습니다" 안내가 표시됩니다.

### Notion 데이터베이스 속성

`Title`(제목), `Category`(선택), `Tags`(다중 선택), `Version`(선택), `Status`(선택: Draft/Published/Archived),
`Slug`(텍스트), `Summary`(텍스트), `PublishedDate`/`UpdatedDate`(날짜), `Author`(사람), `ViewCount`(숫자), `RelatedDocs`(관계형)

## 폴더 구조

```
src/
├── app/                 # 라우트
├── components/
│   ├── ui/              # shadcn/ui
│   ├── layout/          # Header, Footer, Container, Theme
│   └── docs/            # DocCard, MetaInfo, Toc, Markdown, SearchView ...
├── lib/
│   ├── notion/          # Notion 클라이언트·조회·mapper (API 호출은 여기서만)
│   ├── constants.ts
│   └── toc.ts
└── types/doc.ts
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |
