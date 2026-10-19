# Development Guidelines — Tech Docs Portal (Notion CMS)

## 프로젝트 개요

- Notion 데이터베이스를 CMS로 사용하는 기술 문서 포탈이다
- 기술 스택: **Next.js 15 (App Router), TypeScript strict, Tailwind CSS, shadcn/ui, Lucide React, @notionhq/client**
- 배포 대상: **Vercel**
- 요구사항은 `docs/PRD.md`, 구현 순서는 `docs/ROADMAP.md`를 따른다

## 현재 코드 상태 (중요)

- ⚠️ 현재 `src/`, `test/`, `package.json`, `nest-cli` 관련 설정은 **NestJS Starter Kit 잔재**이다
- **ROADMAP Phase 1에서 Next.js 구조로 교체한다.** Phase 1 완료 전에는 NestJS 코드에 기능을 추가하지 않는다
- `.claude/`(agents, commands, settings.json), `.mcp.json`, `docs/`, `CLAUDE.md`, `shrimp-rules.md`, `shrimp_data/`는 **유지**한다

## 디렉터리 구조 (Phase 1 이후 기준)

| 경로 | 용도 |
|------|------|
| `src/app/` | 라우트: `/`, `/docs/[slug]`, `/category/[name]`, `/search` |
| `src/components/ui/` | shadcn/ui 생성 컴포넌트 — **직접 대규모 수정 금지**, 래핑해서 사용 |
| `src/components/layout/` | Header, Footer, Container |
| `src/components/docs/` | DocCard, MetaInfo, TagChip, CategoryBadge, Toc |
| `src/lib/notion/` | Notion 클라이언트, 조회 함수, mapper |
| `src/types/` | `Doc`, `DocSummary`, `Category`, `Tag`, `Author` |

## 코드 규칙

- TypeScript `strict: true`를 유지한다. `any` 사용 금지 (Notion 응답은 mapper에서 도메인 타입으로 변환)
- 컴포넌트 파일명은 PascalCase, 유틸/함수 파일명은 camelCase
- 경로 import는 `@/` alias를 사용한다
- 주석과 커밋 메시지는 **한국어**로 작성한다
- `npm run lint`, `npm run build`가 통과하지 않으면 작업 완료로 보지 않는다

## Notion 연동 규칙

- **Notion API 호출은 `src/lib/notion/`에서만** 한다. 페이지/컴포넌트에서 `@notionhq/client`를 직접 import 금지
- 서버 컴포넌트에서만 호출한다. `NOTION_API_KEY`를 클라이언트 번들에 노출 금지 (`NEXT_PUBLIC_` 접두사 금지)
- 목록 조회는 항상 `Status = Published` 필터를 적용한다
- 캐싱은 ISR `revalidate = 30` 공통 상수를 사용한다
- 환경 변수 추가 시 `.env.example`도 함께 갱신한다

## 파일 동시 수정 규칙

| 수정 대상 | 함께 수정할 파일 |
|-----------|------------------|
| Notion 데이터베이스 필드 | `src/types/`, `src/lib/notion/mapper`, `docs/PRD.md` 데이터 구조 표 |
| 새 라우트 추가 | Header 내비게이션, `sitemap` |
| 환경 변수 | `.env.example`, `README.md` 설정 섹션 |
| 작업 완료 | `docs/ROADMAP.md` 해당 체크박스 |

## 작업 순서 규칙

- **골격 → 공통 → 개별 기능** 순서를 지킨다 (ROADMAP Phase 1 → 5)
- 공통 모듈(Phase 2)이 없는 상태에서 페이지(Phase 3)를 먼저 만들지 않는다
- 예: ✅ `getPublishedDocs()` 작성 → 목록 페이지에서 사용 / ❌ 목록 페이지 안에서 Notion API 직접 호출 후 나중에 분리

## AI 판단 기준

- PRD와 ROADMAP이 충돌하면 **ROADMAP의 순서, PRD의 기능 정의**를 따른다
- MVP 범위(PRD "포함되는 기능") 밖의 기능은 Backlog로 남기고 구현하지 않는다
- 새 라이브러리 추가가 필요하면 PRD 기술 스택에 있는 것을 우선한다

## 금지 사항

- `.env`, `.env.local` 커밋 금지
- `shrimp_data/`를 `.gitignore`에 추가 금지 (작업 계획 공유용)
- shadcn/ui 원본 컴포넌트 대규모 수정 금지
- Notion API 키를 코드에 하드코딩 금지
