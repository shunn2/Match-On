<a href="https://www.swaicau.com/bbs/board.php?bo_table=program5&wr_id=41">프로젝트 정보</a>

#### Organization Github: https://github.com/Match-on
#### 기간: 2022년 2월 23일 → 2022년 9월 28일
#### 사이트: https://match-on-shunn2.vercel.app/
#### 속성: emotion, next.js, node.js, react.js, redux, typescript

![Untitled](https://user-images.githubusercontent.com/86822777/197477767-23a4a6cc-88dc-4156-8fa7-d1b29847489d.png)
![Untitled 1](https://user-images.githubusercontent.com/86822777/197477714-5f64c6f9-d2f8-4475-8359-5340c3b26414.png)


### [🏆 중앙대학교 SW AI 공모전 대회 최우수상 수상](https://www.swaicau.com/bbs/board.php?bo_table=program5&wr_id=41)


### 🎨 **프로젝트 개발 배경**

- 포스트 코로나를 대비해 코로나 시대 대학생들 간 벌어진 **정보의 격차 해소**
- **수업 별 게시판**을 통해 해당 수업에 관한 정보 모아보기
- **팀플 및 프로젝트** 관리, 진행을 도와주는 프로젝트 탭
- 스터디, 공모전, 설문조사등을 진행할 수 있는 기능

### 🛠️ **주요 기능**

- **프로젝트 관리**: 거창한 프로젝트가 아닌 수업 팀플이라도 쉽게 팀을 모집하고 일정 관리, 운영까지 한번에!
- **스터디, 공모전**: 교내, 전국 단위로 마음이 맞는 스터디원 모집 가능
- **수업 별 게시판**: 기존 서비스에 부재했던 교내 수업별로 게시판을 만들어 같은 수업을 듣는 학생들끼리 정보 공유, 팀원 모집 가능
- **DM 기능**: 팀원 모집 전 상대방과의 대화
- **화상회의**: 기존 화상회의 서비스에 더해 회의 도중 회의록 작성 가능!

### 🏆 **기대효과**

- 코로나 시대로 교내 일면식 없는 사람들과의 정보 공유, 팀 조직 가능
- 프로젝트(수업 팀플) 일정 관리, 진행 수월
- 스터디, 공모전 인원 모집 편이

### 🤔 경험 & 고민

- Next.js의 장점들을 최대한 끌어내고자 여러 레퍼런스, 공식 문서들을 참고하며 공부하였습니다.
- parameter가 여러 depth를 거치는 것을 방지하고자 redux를 활용하여 전역 상태 관리를 이용하였습니다.
- 이미지에 대한 lazy loading을 고민했습니다.
- atomic design을 고려하여 폴더를 재구조화

**역할**

- 총 4명이 함께 진행 (프론트엔드 1명, 백엔드 1명, 디자이너 2명)
- 프론트엔드 개발자로 역할 수행
- **사용 기술**
    - Next.js
    - Typescript
    - Redux
    - Emotion

**성과**

- 서비스 최종 배포
- 중앙대학교 SW AI 공모전 최우수상 수상

# 📝프론트엔드 개발

---

- Next.js + Typescript 활용
- Redux로 유저 정보관리, 채팅 유형 관리

### 개발 일정

1. 2022.02.23 ~ 2022.03.15
    
    서비스 기획
    
2. 2022.03.10 ~ 2022.06.05
    
    서비스 디자인 참여
    
3. 2022.04.01 ~ 2022.09.20
    
    서비스 개발
    
4. 2022.9.21 ~ 진행중
    
    서비스 리팩토링

<h3>client 디렉토리 구조</h3>

```bash
 ┣ pages
 ┃ ┣ api
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┗ [...nextauth].ts
 ┃ ┣ classboard
 ┃ ┣ contest
 ┃ ┣ home
 ┃ ┣ main
 ┃ ┣ myproject
 ┃ ┣ register
 ┃ ┣ study
 ┃ ┣ survey
 ┃ ┣ [setting]
 ┃ ┣ index.tsx
 ┃ ┣ login.tsx
 ┃ ┣ _app.tsx
 ┃ ┗ _document.tsx
 ┣ patches
 ┣ public
 ┃ ┣ components
 ┃ ┣ file
 ┃ ┣ logo
 ┃ ┣ setting
 ┃ ┗ sidebar
 ┣ src
   ┣ api
   ┃ ┗ API.tsx
   ┣ auth
   ┃ ┣ refreshTokenHandler.ts
   ┃ ┗ useAuth.ts
   ┣ components
   ┃ ┣ common
   ┃ ┃ ┣ BoxContainer
   ┃ ┃ ┣ Carousel
   ┃ ┃ ┣ Comment
   ┃ ┃ ┣ Datepicker
   ┃ ┃ ┣ DirectMessage
   ┃ ┃ ┣ Editor
   ┃ ┃ ┣ File
   ┃ ┃ ┣ firebase
   ┃ ┃ ┣ Modal
   ┃ ┃ ┣ Post
   ┃ ┃ ┣ Resume
   ┃ ┃ ┗ Table
   ┃ ┣ layouts
   ┃ ┃ ┣ sidebar
   ┃ ┃ ┣ topbar
   ┃ ┃ ┣ Header.tsx
   ┃ ┃ ┗ Layout.tsx
   ┃ ┗ pageElements
   ┃ ┃ ┣ classboard
   ┃ ┃ ┣ contest
   ┃ ┃ ┣ main
   ┃ ┃ ┣ myprojects
   ┃ ┃ ┣ notification
   ┃ ┃ ┣ register
   ┃ ┃ ┣ study
   ┃ ┃ ┣ survey
   ┃ ┃ ┗ userInfo
   ┣ hooks
   ┣ interfaces
   ┗ redux
```
