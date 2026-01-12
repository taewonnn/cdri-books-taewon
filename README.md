# CERTICOS BOOKS

- 프로젝트 개요  
  Kakao 책 검색 API를 사용해 도서를 검색·필터링하고, 상세 검색과 위시리스트를 지원하는 SPA

- 실행 방법 및 환경 설정

  - 요구사항: Node 18+
  - 설치: `npm install`
  - 개발 서버: `npm run dev`
  - 빌드: `npm run build`
  - 미리보기: `npm run preview`
  - 환경변수: `.env` 별도 전달 예정

- 폴더 구조 및 주요 코드 설명

  - `src/api/`: Axios 인스턴스(`axios.ts`), 책 검색 API 래퍼(`books.ts`)
  - `src/components/`: 검색 UI(SearchBar/DetailSearch), 책 리스트/아이템/스켈레톤, 공통 컴포넌트
  - `src/components/stores/`: `useWishListStore` – 찜 상태 관리
  - `src/hooks/`: `useSearchBooks`(무한 스크롤), `useSearchHistory`(검색 기록)
  - `src/pages/`: `SearchPage`, `SearchResultPage`, `WishListPage` : 각 페이지
  - `src/layout/`: `AppLayout` 공용 헤더/네비게이션
  - `src/types/`: `book` 타입 정의

- 라이브러리 선택 이유

  - Vite: 빠른 개발 환경과 번들 최적화
  - React Router: 검색/결과/찜 라우팅 관리
  - TanStack Query: 검색 결과 캐싱, 무한 스크롤, 로딩/에러 상태 표준화
  - Axios: API 호출 인터페이스 단순화
  - Zustand: 전역 찜 상태 관리 + 로컬 영속성

- 강조하고 싶은 기능
  - 상세 검색: 제목/저자/출판사 필터를 쿼리 파라미터로 반영
  - 스켈레톤 로딩
  - 찜 기능: 클릭 시 스냅샷 저장, 브라우저 재시작 후에도 유지
  - 반응형 디자인
