# 기술 문서 포탈 (Tech Docs Portal) - PRD

**Document Version**: 1.0  
**Last Updated**: 2026-05-17  
**Status**: Design Phase

---

## 📋 프로젝트 개요

### 프로젝트명
**기술 문서 포탈 (Tech Docs Portal)**

### 목적
Notion을 CMS(Content Management System)로 활용하여 팀/조직의 기술 문서를 한곳에서 관리하고 공유하는 웹 포탈입니다.

### CMS 선택 이유
- **비개발자 친화적**: Notion에서 마크다운으로 문서 작성 가능
- **실시간 반영**: Notion API를 통해 수정 사항 자동 반영
- **버전 관리**: Notion의 기본 기능으로 버전 추적 가능
- **협업 용이**: Notion의 권한 관리로 팀 협업 간편
- **무료 솔루션**: 추가 DB 비용 없이 운영 가능
- **확장성**: Relation을 통한 연관 문서 관리 가능

---

## ✨ 주요 기능

### 1. 기술 문서 조회 및 검색
- 카테고리별 문서 분류 (Backend, Database, Architecture, DevOps 등)
- 버전별 문서 관리 (v1.0, v2.0 등)
- 전체 문서 검색 기능
- 최근 업데이트 순으로 정렬
- 즐겨찾기/북마크 기능

### 2. 문서 상세 페이지
- Notion 문서의 마크다운 렌더링
- 목차 (Table of Contents) 자동 생성
- 코드 블록 신택스 하이라이팅
- 관련 문서 추천
- 마지막 수정일시 표시
- 작성자 정보 표시

### 3. 카테고리 및 태그 관리
- 카테고리별 문서 필터링
- 태그 기반 다중 검색
- 카테고리별 문서 개수 표시
- 인기 태그 자동 추출

### 4. 버전 관리
- 문서 버전 선택 조회
- 버전별 변경 이력 추적
- 최신 버전과 이전 버전 비교

### 5. 기여자 관리
- 문서 작성자/수정자 표시
- 기여자 통계 (문서 개수, 최근 활동)
- 팀 멤버 프로필

### 6. 반응형 디자인
- 모바일/태블릿/데스크톱 최적화
- 다크모드 지원
- 접근성 (WCAG 2.1) 준수

---

## 🔧 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.2+
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context + Hooks
- **Markdown Rendering**: react-markdown, rehype-highlight
- **Search**: Local Search (Algolia 옵션)

### CMS & Data
- **CMS**: Notion API (@notionhq/client)
- **API Client**: Axios or Fetch API
- **Caching**: Next.js ISR (Incremental Static Regeneration)
- **Database**: Notion (No additional DB needed)

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Linting**: ESLint
- **Code Formatter**: Prettier
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel (Recommended)

### DevOps
- **Environment**: Node.js 20+
- **CI/CD**: GitHub Actions (optional)
- **Monitoring**: Vercel Analytics

---

## 📊 Notion 데이터베이스 구조

### 주 테이블: Documents (문서)

| 필드명 | 타입 | 설명 | 필수 | 예시 |
|--------|------|------|------|------|
| **Title** | Title | 문서 제목 | ✅ | "Oracle Database 성능 튜닝 가이드" |
| **Category** | Select | 주 카테고리 | ✅ | Backend, Database, Architecture, DevOps |
| **Tags** | Multi-select | 세부 태그 | ❌ | NestJS, TypeScript, Performance |
| **Version** | Select | 문서 버전 | ✅ | v1.0, v2.0, v3.0 |
| **Status** | Select | 문서 상태 | ✅ | Draft(초안), Published(발행), Archived(보관) |
| **Author** | Person | 작성자 | ✅ | User Profile |
| **LastEditor** | Person | 마지막 수정자 | ✅ | User Profile |
| **PublishedDate** | Date | 발행일 | ✅ | 2026-05-17 |
| **UpdatedDate** | Date | 마지막 수정일 | ✅ | 2026-05-17 |
| **Summary** | Text | 간단한 설명 | ❌ | "Oracle 데이터베이스의 성능 최적화 방법론을..." |
| **Slug** | Text | URL 친화적 ID | ✅ | "oracle-db-tuning-guide" |
| **Content** | Page Content | 문서 본문 | ✅ | (Notion 페이지 본문) |
| **RelatedDocs** | Relation | 관련 문서 | ❌ | 다른 Document 참조 |
| **ViewCount** | Number | 조회수 | ❌ | 1234 |

### 보조 테이블: Categories (카테고리)

| 필드명 | 타입 | 설명 |
|--------|------|------|
| **Name** | Title | 카테고리 이름 |
| **Description** | Text | 카테고리 설명 |
| **Icon** | Text | 이모지 또는 아이콘 |
| **Color** | Select | 카테고리 색상 |
| **Documents** | Relation | 이 카테고리의 문서 |

---

## 🎨 화면 구성

### 1. 홈 (Home Page)
```
┌─────────────────────────────────────┐
│ 🔍 검색창                            │
├─────────────────────────────────────┤
│ 📌 인기 카테고리                     │
│  [Backend] [Database] [Architecture]│
│  [DevOps] [Security]                │
├─────────────────────────────────────┤
│ 📚 최근 문서 (6개)                  │
│ ┌─────────────────────────────────┐ │
│ │ 📄 문서 제목 1                  │ │
│ │ 카테고리: Backend | 작성자: 김철수 │
│ │ 2분 전 업데이트                   │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📄 문서 제목 2                  │ │
│ │ ...                              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**특징**:
- 검색 바에서 전문 검색
- 인기 카테고리 빠른 접근
- 최근 업데이트된 문서 목록
- 모바일 최적화

---

### 2. 카테고리 페이지 (Category Page)
```
┌─────────────────────────────────────┐
│ Backend 문서 (14개)                 │
├─────────────────────────────────────┤
│ 🏷️  태그 필터:                      │
│ [NestJS] [TypeScript] [Performance] │
├─────────────────────────────────────┤
│ 📄 문서 목록                        │
│ ┌─────────────────────────────────┐ │
│ │ ✓ NestJS 성능 최적화 가이드    │ │
│ │ v2.0 | 김철수 | 3일 전        │ │
│ │ 조회수: 234                     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ✓ Express 미들웨어 작성 방법    │ │
│ │ ...                              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**특징**:
- 카테고리별 문서 그룹화
- 태그 기반 필터링
- 문서 메타데이터 표시
- 페이지네이션

---

### 3. 문서 상세 페이지 (Document Detail Page)
```
┌─────────────────────────────────────┐
│ ← 뒤로가기                          │
├─────────────────────────────────────┤
│ 📄 Oracle Database 성능 튜닝 가이드 │
│ Backend | v2.0 | Draft              │
│ 작성자: 김철수 | 수정: 이순신        │
│ 업데이트: 2시간 전 | 조회: 567      │
├─────────────────────────────────────┤
│ 📑 목차                             │
│ 1. 개요                             │
│ 2. 인덱싱 전략                      │
│ 3. 쿼리 최적화                      │
│ 4. Connection Pool 튜닝             │
│ 5. 모니터링                         │
├─────────────────────────────────────┤
│ 📝 문서 본문 (마크다운 렌더링)      │
│                                      │
│ ## 개요                              │
│ Oracle Database의 성능을 개선하기   │
│ 위한 실전 가이드입니다.             │
│                                      │
│ ```typescript                        │
│ // 코드 예제                        │
│ ```                                  │
│                                      │
├─────────────────────────────────────┤
│ 🔗 관련 문서                        │
│ • Tibero 성능 최적화                │
│ • Connection Pool 관리              │
│ • SQL 튜닝 가이드                   │
├─────────────────────────────────────┤
│ 👥 기여자                           │
│ [프로필] 김철수 - 작성              │
│ [프로필] 이순신 - 수정              │
│ [프로필] 장보고 - 검수              │
└─────────────────────────────────────┘
```

**특징**:
- 마크다운 문서 렌더링
- 자동 목차 생성
- 코드 신택스 하이라이팅
- 관련 문서 추천
- 기여자 정보 표시

---

### 4. 검색 결과 페이지 (Search Results Page)
```
┌─────────────────────────────────────┐
│ 🔍 검색: "성능 최적화" (12건)      │
├─────────────────────────────────────┤
│ 🏷️  정제 검색 (필터):              │
│ 카테고리: [Backend▼] [Database▼]   │
│ 태그: [NestJS] [Performance] [×]    │
│ 버전: [모든 버전▼]                  │
│ 상태: [Published▼]                  │
├─────────────────────────────────────┤
│ 📄 검색 결과                        │
│ ┌─────────────────────────────────┐ │
│ │ ⭐ NestJS 성능 최적화 가이드    │ │
│ │ Backend | v2.0                  │ │
│ │ ...성능을 최적화하기 위한...    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ⭐ Oracle DB 성능 튜닝          │ │
│ │ Database | v1.0                 │ │
│ │ ...데이터베이스 성능...          │ │
│ └─────────────────────────────────┘ │
│ [이전] [1] [2] [3] [다음]          │
└─────────────────────────────────────┘
```

**특징**:
- 전체 문서 검색
- 다중 필터링
- 관련성 순 정렬
- 페이지네이션

---

## 🎯 MVP (Minimum Viable Product) 범위

### 포함되는 기능
- ✅ Notion API 연동
- ✅ 문서 목록 페이지
- ✅ 문서 상세 페이지
- ✅ 카테고리별 필터링
- ✅ 전체 검색 기능 (클라이언트 사이드)
- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 다크모드 지원
- ✅ 기본 스타일링 (shadcn/ui, Tailwind)
- ✅ 문서 메타데이터 표시

### 향후 추가 기능 (Phase 2+)
- ⏳ 서버사이드 검색 (Algolia)
- ⏳ 사용자 댓글 기능
- ⏳ 북마크/좋아요 기능 (Local Storage)
- ⏳ 문서 버전 비교
- ⏳ RSS 피드
- ⏳ 조회 통계 대시보드
- ⏳ SEO 최적화
- ⏳ PWA 지원
- ⏳ 다국어 지원

---

## 📐 구현 단계

### Phase 1: 기본 구조 (1주)
- [ ] 1.1 Next.js 프로젝트 생성 및 기본 설정
- [ ] 1.2 Tailwind CSS, shadcn/ui 설정
- [ ] 1.3 프로젝트 폴더 구조 설계
- [ ] 1.4 레이아웃 컴포넌트 구현

### Phase 2: Notion API 연동 (1주)
- [ ] 2.1 Notion API 클라이언트 설정
- [ ] 2.2 환경 변수 설정 (.env.local)
- [ ] 2.3 Notion 데이터베이스 쿼리 함수 작성
- [ ] 2.4 API 응답 타입 정의 (TypeScript)
- [ ] 2.5 캐싱 전략 구현 (ISR)

### Phase 3: 홈 및 카테고리 페이지 (1주)
- [ ] 3.1 홈 페이지 UI 구현
- [ ] 3.2 문서 목록 컴포넌트 구현
- [ ] 3.3 카테고리 페이지 구현
- [ ] 3.4 필터링 로직 구현
- [ ] 3.5 페이지네이션 구현

### Phase 4: 문서 상세 페이지 (1주)
- [ ] 4.1 마크다운 렌더링 설정 (react-markdown)
- [ ] 4.2 코드 신택스 하이라이팅 (rehype-highlight)
- [ ] 4.3 목차 자동 생성
- [ ] 4.4 관련 문서 추천 로직
- [ ] 4.5 기여자 정보 표시

### Phase 5: 검색 및 필터링 (1주)
- [ ] 5.1 전체 검색 기능 구현 (클라이언트)
- [ ] 5.2 태그 기반 필터링
- [ ] 5.3 고급 필터링 UI
- [ ] 5.4 검색 결과 페이지
- [ ] 5.5 검색 성능 최적화

### Phase 6: 스타일링 및 UX (1주)
- [ ] 6.1 다크모드 구현
- [ ] 6.2 반응형 디자인 완성
- [ ] 6.3 접근성 검사 (WCAG 2.1)
- [ ] 6.4 로딩 상태 및 에러 처리
- [ ] 6.5 애니메이션 및 인터랙션

### Phase 7: 테스트 및 배포 (1주)
- [ ] 7.1 단위 테스트 작성
- [ ] 7.2 E2E 테스트 작성
- [ ] 7.3 성능 최적화
- [ ] 7.4 SEO 최적화
- [ ] 7.5 Vercel 배포

---

## 📋 Notion 설정 체크리스트

### 1. Notion 데이터베이스 생성
- [ ] "Documents" 데이터베이스 생성
- [ ] 모든 필드 추가 (Title, Category, Tags, Version, Status 등)
- [ ] "Categories" 데이터베이스 생성 (옵션)

### 2. Notion API 설정
- [ ] Notion Integrations 페이지에서 새 Integration 생성
- [ ] Integration 이름: "Tech Docs Portal"
- [ ] 권한 설정: Read, Update, Create
- [ ] API 토큰 복사
- [ ] 데이터베이스 권한 부여 (Integration 추가)

### 3. 환경 변수 설정
```
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_api_key
```

---

## 🚀 배포 전략

### 개발 환경
- **로컬**: `npm run dev`
- **원격 개발**: GitHub에 push하면 Vercel Preview 자동 배포

### 프로덕션 배포
- **플랫폼**: Vercel (Next.js 최적화)
- **빌드**: `npm run build`
- **시작**: `npm start`
- **자동 배포**: main 브랜치 push 시 자동 배포

### 성능 최적화
- **ISR (증분 정적 재생성)**: 매 30초마다 재검증
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 스플리팅**: 동적 import 활용
- **번들 최적화**: Tree-shaking, Code splitting

---

## 📊 성공 지표 (KPI)

| 지표 | 목표 | 측정 방법 |
|------|------|---------|
| **페이지 로드 속도** | < 2초 | Lighthouse, Vercel Analytics |
| **검색 응답 시간** | < 500ms | 클라이언트 측정 |
| **모바일 호환성** | 100% | Mobile Friendly Test |
| **SEO 점수** | 90+ | Lighthouse |
| **가용성** | 99.9% | Vercel 모니터링 |

---

## 📝 문서 예제

### Notion에 작성할 예제 문서들

1. **NestJS 성능 최적화 가이드**
   - 카테고리: Backend
   - 버전: v2.0
   - 태그: NestJS, Performance, TypeScript

2. **Oracle Database 인덱싱 전략**
   - 카테고리: Database
   - 버전: v1.0
   - 태그: Oracle, Indexing, Performance

3. **마이크로서비스 아키텍처 가이드**
   - 카테고리: Architecture
   - 버전: v1.0
   - 태그: Microservices, Design Pattern

4. **CI/CD 파이프라인 구축**
   - 카테고리: DevOps
   - 버전: v1.0
   - 태그: GitHub Actions, Deployment

---

## 🎓 학습 목표

이 프로젝트를 통해 학습할 수 있는 것:

1. **Notion API 활용**
   - API 인증 및 쿼리
   - 데이터 필터링 및 정렬
   - Relation 활용

2. **Next.js 고급 기능**
   - ISR (증분 정적 재생성)
   - 동적 라우팅
   - API 라우트

3. **마크다운 렌더링**
   - react-markdown 활용
   - 신택스 하이라이팅
   - 커스텀 컴포넌트

4. **TypeScript 타입 시스템**
   - 외부 API 타입 정의
   - Generic 활용
   - 타입 안정성

5. **성능 최적화**
   - 캐싱 전략
   - 이미지 최적화
   - 검색 최적화

---

## 📚 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)

---

## ✅ 승인 현황

| 항목 | 상태 | 담당자 | 날짜 |
|------|------|--------|------|
| PRD 작성 | ✅ 완료 | 개발팀 | 2026-05-17 |
| 기술 스택 검토 | ✅ 승인 | 기술리더 | 2026-05-17 |
| 일정 검토 | ✅ 승인 | PM | 2026-05-17 |
| 리소스 배치 | ✅ 승인 | 리드 | 2026-05-17 |

---

**Document Prepared By**: AI Assistant  
**Last Reviewed**: 2026-05-17  
**Next Review Date**: 프로젝트 착수 후 1주일
