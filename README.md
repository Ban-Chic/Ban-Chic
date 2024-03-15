# 이미지 기반 향수 추천 반:칙

- 프로젝트 기간 : 24.02.26 ~ 24.04.05 (6 weeks)
- 도메인 : 빅데이터 추천

## 바로가기

[커밋 컨벤션](#커밋-컨벤션)

[코드 컨벤션](#코드-컨벤션)

[기술 스택](#기술-스택)

[팀원 역할](#팀원-역할)

## 커밋 컨벤션

커밋 컨벤션은 프론트, 백엔드 모두 통일함을 기본으로 합니다.
지라 이슈와 커밋을 연동해 사용할 예정입니다.

```
커밋 메시지 구조

#<지라 이슈번호> 타입: <파일명> 간단 핵심 설명
변경 사항에 대한 자세한 설명

예시

feat: API를 이용한 추천 페이지 구현
- 유저 데이터 POST 요청으로 전송 후 결과를 받아 페이지 렌더링
```

### 타입의 종류

- build: 시스템 또는 외부 종속성에 영향을 미치는 변경사항

- ci: ci구성파일 및 스크립트 변경

- chore: 패키지 매니저 설정 및 기타 사소한 변경사항

- docs: documentation 변경

- design: UI 디자인 변경

- feat: 새로운 기능

- fix: 버그 수정

- perf: 성능 개선

- refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링

- style: 코드 의미에 영향을 주지 않는 변경사항

- test: 누락된 테스트 추가 또는 기존 테스트 수정

- revert: 작업 되돌리기

- remove: 파일 삭제

## 코드 컨벤션

### Frontend

- Airbnb 기반 Javascript, React 코드 컨벤션 준수
- Eslint + Prettier를 사용한 code auto conversion

### Backend

- Google Java Convention 준수

## 기술 스택

### 프로젝트 사용 도구

- 형상 관리 : Git, GitLab
- 일정 관리 : Jira
- 문서 관리 : notion
- 소통 : mattermost

Gitlab, Jira 변경 사항을 mattermost에 연동해 사용하고 있습니다.

### 코드 분석 및 품질 관리

- FE : Eslint, Prettier
- BE : SonarCube, Scavenger

## 팀원 역할

엄진식 : 팀장, FE

이호진 : FE

구본민 : FE

김현준 : BE, Infra

김성재 : BE

백성욱 : BE
