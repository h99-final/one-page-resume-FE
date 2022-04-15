# Poug - 개발자 전용 포트폴리오

![snsThumbnailImg](https://user-images.githubusercontent.com/89245389/163502020-3f121179-cf98-4f4d-a2cb-d202144783b8.png)

[Poug🚀](https://poug.me)

#### MEMBERS

**Front-End**
[백제열](https://github.com/gwangbaekun/)
[한우진](https://github.com/han-woo-jin/)

**Back-End**
[김현진](https://github.com/guswls159357)
[고영빈](https://github.com/skekq123/)
[김종훈](https://github.com/kjhbbjoker/)

**Design**
[전수미]
[김연수]
</br></br>

## 프로젝트 설명⚡️

우리는 이런 장점을 가지고 있어요😉

> Github API를 통해 내가 작성했던 코드를 온전하게 불러올 수 있습니다. (참 쉬운 트러블슈팅!)
> 디자인, 레이아웃 등 개발포트폴리오를 작성할 때의 모든 고민을 포그 하나로 해결할 수 있어요.
> 포그 유저들과 개발 포트폴리오, 프로젝트를 서로 공유해보세요.

<hr />

## 📢 프로젝트 기능 소개

### 1. **10가지 이상의 다양한 포트폴리오 템플릿 🕶**

> 포그는 **다양한 스타일📚과 색상의 템플릿🌈**을 제공하고 있어요.
> 포트폴리오 디자인을 고민할 필요 없이 마음에 드는 템플릿을 선택하면 됩니다.

### 2. **완벽한 트러블 슈팅 작성 🧑‍💻**

> 포그는 **Github API 기반** 개발 포트폴리오 제작 서비스로 유저가 Github에 업로드한 Patch Code를
> **직접🔥** 가져오기 때문에 완벽하고 자세한 트러블슈팅을 할 수 있어요.

### 3. **포그 유저들의 포트폴리오 염탐 🔍**

> 유저님이 작성한 프로젝트와 포트폴리오를 사이트에 게시하고 다른 유저의 게시물도 구경할 수 있어요.

<hr />

## 프로젝트 사용 환경

- 기간 : 2022.02.25 ~ 2022.04.08
- 개발 : with React
- 배포 환경 : Amazon S3, Aws amplify
- 협업 툴 : Github / Notion / Figma

<br />

## 아키텍처✨

<img width="985" alt="스크린샷 2022-03-17 15 58 48 (1)" src="https://user-images.githubusercontent.com/89245389/163502564-c7c2482d-f0b4-4b6c-b8ad-0c925dcefa3c.png">

<hr />

## 프로젝트 기능🌟

> ### 로그인, 회원가입, 소셜로그인

- axios와 axios-interceptors 를 통한 서버와 api 요청
- 사용자 정보 session storage에 저장 회원가입 간소화
- 카카오톡 api를 이용한 소셜로그인

> ### 메인 화면, 포트폴리오, 프로젝트

- 배너 용량 리사이즈해서 재배포
- 사용자가 입력한 스택에 따라서 메인 화면 카드 재구성
  - 기술 스택을 검색할 수 있는 검색 기능
  - 카드 무한스크롤 구현

> ### 포트폴리오 작성

- 포트폴리오 소개
- 사용자 정보 전환 페이지
- 사용자 기술 스택 입력
- 사용자 경력 입력
- 사용자 프로젝트 선택
- **템플릿 선택 모달**
- 포트폴리오 공개 비공개 여부 모달

> ### 프로젝트 작성

- 프로젝트 기본 입력 폼 작성
  - 다중 이미지 파일 업로드 기능
  - md editor 이용하여 사용자가 직접 커스텀 할 수 있게 구현
- 프로젝트에 속한 트러블 슈팅 작성
  - **github api에 접근하여 사용자가 입력한 github repository에서 커밋 내역 조회 및 저장**
  - 커밋에 따른 바뀐 파일 저장
  - 저장이 얼마나 되고 있는지 프로그래시브 바 구현

> ### 마이페이지

- 사용자가 만든 프로젝트 나열
- 사용자의 포트폴리오 템플릿 미리보기(명함)
- 사용자 정보 미리보기 페이지

<br />

<hr />

## 사용한 라이브러리

| 라이브러리명      | 내용                                    | 참고 |
| :---------------- | :-------------------------------------- | :--- |
| axios             | 서버통신                                |      |
| redux             | 상태관리                                |      |
| redux-actions     | redux actions / 코드 간소화             |      |
| redux-thunk       | 미들웨어                                |      |
| react-helmet      | 브라우저 탭 파비콘 적용                 |      |
| react-dropzone    | 이미지 드래그 앤 드랍                   |      |
| react-ga          | google analystics                       |      |
| material-ui       | 자동 완성 검색 기능                     |      |
| swiper            | 이미지 슬라이더                         |      |
| react-hook-form   | 사용자 입력 창 모두 적용, 예외처리      |      |
| react-scroll      | 부드럽게 움직이는 navbar 적용           |      |
| react-markdown    | 사용자가 입력할 수 있는 마크다운 에디터 |      |
| moment, dayjs     | 시간 핸들링                             |      |
| immer             | 불변성 유지 / 코드 간소화               |      |
| styled-components |                                         |      |
