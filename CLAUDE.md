# CLAUDE.md

Notion을 CMS로 사용하는 기술 문서 포탈 (Tech Docs Portal) 프로젝트입니다.

# Project Context
- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

# 기술 스택
- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Lucide React
- CMS: Notion API (@notionhq/client)
- 배포: Vercel

# 작업 규칙
- 응답, 코드 주석, 커밋 메시지는 한국어로 작성한다
- 구현은 ROADMAP.md의 Phase 순서(골격 → 공통 → 개별 기능)를 따른다
- 완료한 작업은 ROADMAP.md 체크박스를 갱신한다
- API 키 등 비밀 값은 `.env.local`에만 두고 커밋하지 않는다
