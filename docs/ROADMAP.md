# 기술 문서 포탈 (Tech Docs Portal) - ROADMAP

**Document Version**: 1.0
**Last Updated**: 2026-10-19
**기준 문서**: [docs/PRD.md](./PRD.md)

> PRD는 **무엇을** 만들지, ROADMAP은 **어떤 순서로** 만들지를 정의합니다.
> 개발 원칙: **골격 → 공통 → 개별 기능** (기능부터 만들지 않는다)

---

## 📌 전체 흐름

| Phase | 단계 | 핵심 산출물 | 예상 기간 |
|-------|------|-------------|-----------|
| 1 | 프로젝트 초기 설정 (골격) | Next.js 15 앱, 폴더 구조, 기본 레이아웃 | 1-2일 |
| 2 | 공통 모듈/컴포넌트 | Notion API 클라이언트, 타입, 공통 UI | 2-3일 |
| 3 | 핵심 기능 (MVP) | 문서 목록 · 상세 · 카테고리 페이지 | 3-4일 |
| 4 | 추가 기능 | 검색, 태그 필터, 다크모드, 관련 문서 | 2-3일 |
| 5 | 최적화 및 배포 | 성능 · SEO · 테스트 · Vercel 배포 | 1-2일 |

**총 예상 기간: 약 9-14일**

---

## Phase 1: 프로젝트 초기 설정 — 골격 구축 (1-2일)

### 작업
- [ ] 기존 Starter Kit(NestJS) 코드 정리 — PRD 기술 스택(Next.js)에 맞게 프로젝트 재구성
- [ ] Next.js 15 (App Router) + TypeScript 프로젝트 생성
- [ ] Tailwind CSS, shadcn/ui, Lucide React 설정
- [ ] ESLint, Prettier 설정 및 `npm run lint` / `npm run build` 통과
- [ ] 폴더 구조 설계
  ```
  src/
  ├── app/            # 라우트 (/, /docs/[slug], /category/[name], /search)
  ├── components/     # ui/(shadcn), layout/, docs/
  ├── lib/            # notion/, utils
  └── types/          # 공통 타입
  ```
- [ ] 루트 레이아웃 (Header, Footer, 컨테이너) 뼈대
- [ ] 환경 변수 템플릿 `.env.example` (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)

### 왜 먼저인가?
모든 페이지와 기능이 올라갈 **기반**입니다. 폴더 구조·스타일 시스템·빌드 설정이 흔들리면 이후 모든 작업을 다시 손봐야 합니다.

### 완료 기준
- `npm run dev`로 빈 레이아웃 페이지가 뜬다
- `npm run lint`, `npm run build`가 에러 없이 통과한다
- 폴더 구조가 위 설계대로 존재한다

---

## Phase 2: 공통 모듈/컴포넌트 개발 (2-3일)

### 작업
- [ ] **Notion API 공통 모듈** (`src/lib/notion/`)
  - `client.ts` — `@notionhq/client` 인스턴스
  - `getPublishedDocs()` — Status=Published 문서 목록 조회
  - `getDocBySlug(slug)` — 단일 문서 + 본문 블록 조회
  - `getCategories()` — 카테고리 목록 및 문서 수
  - Notion 응답 → 도메인 타입 변환 함수 (mapper)
- [ ] **공통 타입** (`src/types/`): `Doc`, `DocSummary`, `Category`, `Tag`, `Author`
- [ ] **공통 UI 컴포넌트**: `DocCard`, `CategoryBadge`, `TagChip`, `MetaInfo`(작성자·버전·수정일), `EmptyState`, `Skeleton`
- [ ] **캐싱 전략**: ISR `revalidate = 30` 공통 상수화
- [ ] Notion 테스트 데이터베이스 생성 (PRD의 Documents 스키마) + 예제 문서 4건

### 왜 이 순서인가?
목록·상세·검색 등 **모든 기능이 같은 데이터 함수와 카드 컴포넌트를 재사용**합니다. 먼저 만들어 두면 기능마다 API 호출과 UI를 중복 작성하지 않아도 됩니다.

### 완료 기준
- 임시 페이지에서 `getPublishedDocs()` 결과가 타입 안전하게 출력된다
- 공통 컴포넌트가 단독으로 렌더링된다
- API 키 누락 시 명확한 에러 메시지를 낸다

---

## Phase 3: 핵심 기능 개발 — MVP (3-4일)

### 작업
- [ ] **홈** (`/`): 인기 카테고리 + 최근 업데이트 문서 6개
- [ ] **문서 목록**: 최근 수정순 정렬, 페이지네이션
- [ ] **문서 상세** (`/docs/[slug]`)
  - Notion 블록 → 마크다운 렌더링 (react-markdown)
  - 코드 신택스 하이라이팅 (rehype-highlight)
  - 메타데이터 (카테고리 · 버전 · 작성자 · 수정일)
  - 목차(TOC) 자동 생성
- [ ] **카테고리 페이지** (`/category/[name]`): 카테고리별 문서 목록 + 문서 수
- [ ] 404 / 에러 / 로딩 상태 처리

### 왜 이 순서인가?
"문서를 보고 찾아간다"는 포탈의 **본질 기능**입니다. Phase 2의 공통 모듈을 조합해 빠르게 만들 수 있고, 이것만으로 MVP로서 가치가 있습니다.

### 완료 기준
- Notion에서 Published 문서를 추가하면 30초 내 목록에 반영된다
- 상세 페이지에서 제목/코드블록/목차가 정상 렌더링된다
- 카테고리 클릭 시 해당 문서만 필터링된다

---

## Phase 4: 추가 기능 개발 (2-3일)

### 작업
- [ ] **전체 검색** (`/search?q=`): 제목·요약·태그 클라이언트 사이드 검색
- [ ] **태그 기반 다중 필터** + 버전 필터
- [ ] **관련 문서 추천** (RelatedDocs Relation 활용)
- [ ] **다크모드** (next-themes)
- [ ] 반응형 디자인 다듬기 (모바일 · 태블릿 · 데스크톱)

### 왜 이 순서인가?
검색·필터·추천은 **핵심 기능(목록·상세)이 있어야 의미가 있는 부가 기능**입니다. 핵심 데이터 흐름이 안정된 뒤 붙여야 재작업이 없습니다.

### 완료 기준
- 검색어 입력 시 500ms 이내에 결과가 표시된다
- 태그 여러 개를 조합해 필터링할 수 있다
- 다크/라이트 모드 전환이 모든 페이지에 적용된다

---

## Phase 5: 최적화 및 배포 (1-2일)

### 작업
- [ ] 성능 최적화: `next/image`, 동적 import, 번들 크기 점검
- [ ] SEO: 페이지별 `metadata`, Open Graph, `sitemap.xml`, `robots.txt`
- [ ] 접근성 점검 (WCAG 2.1 기본 항목)
- [ ] 테스트: 공통 모듈 단위 테스트(Jest), 주요 플로우 E2E(Playwright)
- [ ] Vercel 배포 + 환경 변수 설정, main push 시 자동 배포

### 왜 이 순서인가?
기능이 확정된 후에 최적화해야 **측정할 대상이 명확**하고, 중간에 바뀔 코드를 미리 최적화하는 낭비를 피할 수 있습니다.

### 완료 기준
- Lighthouse Performance / SEO 90점 이상
- 페이지 로드 2초 이내
- Vercel 프로덕션 URL에서 모든 페이지가 정상 동작한다

---

## 🔭 MVP 이후 (Backlog)

PRD "향후 추가 기능" 항목 — MVP 배포 후 우선순위를 정해 버전별로 진행합니다.

- 북마크/좋아요 (Local Storage)
- 문서 버전 비교
- 조회 통계 대시보드 / 관리자 기능
- 서버사이드 검색 (Algolia)
- RSS 피드, PWA, 다국어 지원

---

## ✅ 순서 점검 체크리스트

- [x] Phase 1: 프로젝트 골격이 가장 먼저인가?
- [x] Phase 2: 공통 모듈/컴포넌트가 개별 기능보다 먼저인가?
- [x] Phase 3~4: 개별 기능이 공통 모듈 이후에 있는가?
- [x] 각 단계마다 왜 이 순서인지 설명이 있는가?
