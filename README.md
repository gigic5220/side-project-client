평소 생각해보고, 공부해온것들을 직접 사용해보고, 테스트해보는 사이드 프로젝트(프론트엔드, 클라이언트) 레파지토리입니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# FAVOR

- 공유 TODO 서비스
- 그룹 생성 및 그룹멤버 초대 후 공유 TODO 등록
- 공유된 TODO 달성 여부 체크

## 사용기술

- React
- Next.js
- TypeScript
- Recoil
- Tanstack-Query (react-query)

==============================

FAVOR 사이드 프로젝트를 진행하며..

# 프론트엔드

좋은 서비스란 무엇일까 - 프론트엔드 관점에서 생각해보고 정리해보자

## 1. 유지 보수성

첫번째. 코드의 유지보수성.

코드의 유지보수성이란 무엇인가?

여러 중요한 부분들이 있지만 제일 와닿는 설명은..

- 개발자 동료 A가 작업중이던 코드를 내가 그대로 인수인계 받아 얼마나 '잘' 이해하고 작업을 이어 나갈 수 있는가?
- 반대로, 내가 작업중이던 코드를 동료 B가 인수인계 받아 얼마나 '잘' 이해하고 수정할 수 있는가?

정도 일것 같다. (클린코드, 코드의 가독성과도 연관이 깊다)

그렇다면, 높은 '유지 보수성'을 위해 본 프로젝트에 적용된, 적용할 부분들을 정리해보자.

### - 비즈니스 로직과 뷰 로직의 분리

비즈니스 로직과 뷰 로직을 분리하는 것은 여러 장점이 있다.

- 가독성
- 모듈화
- 재사용성
- 테스트 용이성

여러 장점은 있지만 참 쉬운 부분은 아닌 것 같다..

실제 본 프로젝트에 어떻게 비즈니스 로직과 뷰 로직을 분리하려고 노력했는지 확인해보자..

```javascript
// src/pages/testPage/index.tsx.

const TestPage = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClickButton = () => {
        setIsClicked(true);
    }

    return (
        <div>
            {isClicked ? <div>clicked</div> : <div>not clicked</div>}
            <button onClick={handleClickButton}>click</button>
        </div>
    )
}
```

test 페이지이다.

버튼 하나가 있고, 버튼을 클릭하면 'clicked'라는 문구가 나온다.

이 페이지를 custom hook을 사용해 뷰로직과 비즈니스로직으로 분리해보자.

```javascript
// src/pages/testPage/index.tsx.

const TestPage = () => {

    const {
        isClicked,
        handleClickButton,
    } = useTestPage()

    return (
        <div>
            {isClicked ? <div>clicked</div> : <div>not clicked</div>}
            <button onClick={handleClickButton}>click</button>
        </div>
    )
}

// src/hooks/useTestPage.tsx.
const useTestPage = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClickButton = () => {
        setIsClicked(true);
    }

    return {
        isClicked,
        handleClickButton,
    }
}
```

이렇게 페이지별 hooks를 두어 뷰 로직과 비즈니스 로직을 분리하고 있다.

하지만.. 비즈니스 로직과 뷰 로직을 분리하는데 장점만 있는 것은 아니다.

- 복잡성 증가
    - 비즈니스 로직과 뷰 로직을 분리하면, 간단한 기능에도 여러 파일과 구조를 관리해야 하므로 프로젝트의 구조가 복잡해 지는 것 같다.. 개발문화, 환경에 따라 다른 부분이겠지만, 초기 구축 단계에서 오버
      엔지니어링으로 이어질 수 있고, 이는 프로젝트의 초기 진행 속도를 늦출 수 있다고 본다.
    - 또한 로직이 분리되어 있으면 관련 로직을 찾기 위해 여러 파일을 넘나들어야 하는 경우가 많아져, 코드 내에서 네비게이션의 복잡성이 증가할 수 있다.
- 개발 비용 증가
    - 위 내용과 어느정도 관련있는 부분이지만, 분리된 구조를 설계하고 유지하기 위해서는 추가적인 시간이 소요될 수 있다고 생각한다. 이는 특히 새로운 팀원이 프로젝트에 참여할 때 러닝커브를 가파르게 만드는
      부분인 듯하다.
    - 만약 리팩토링을 통해 비즈니스로직과 뷰로직을 분리하려 한다면, 이를 위한 비용도 무시못하고, 이 과정에서 버그가 발생하지 않는다고 장담할 수 없다.

다음은 제일 경계하는 부분인데..

- 과도한 일반화
    - 모든 비즈니스 로직을 재사용 가능하게 만들려고 하다 보면, 때로는 실제 사용 사례와 맞지 않는 일반화된 코드가 될 수 있는것 같다. 이는 실제 요구 사항을 정확히 반영하지 못하는 코드를 생산해낼 수 있다.
    - 그래서 제일 어려운 부분 같다. 어디서 부터 어디까지가 두 로직의 경계이고, 그 경계에서 어떤 부분을 재사용 가능하게 만들어야 하는지, 또는 분리조차 하지말아야 하는지 판단하기가 쉽지 않다.

이 외에도 테스트 복잡성 증가를 초래할 수도 있고, 성능적인 문제도 발생할 수 있을 것 같다.

그럼에도 불구하고 비즈니스 로직과 뷰 로직을 분리하는 이유는 위에 작성한 장점들 때문이고, 이를 통해 프로젝트의 유지보수성을 높일 수 있다고 생각한다.

단점을 최대한 경계하고 조심하며, 장점을 최대한 살려야 하겠다.

### - 그룹 만들기

![KakaoTalk_20240414_211858267](https://github.com/gigic5220/side-project-client/assets/59347641/cc557147-88da-4645-8b48-e0030d9e4a07)

### - 그룹 가입하기

![KakaoTalk_20240414_211858267_01](https://github.com/gigic5220/side-project-client/assets/59347641/c0d83597-9d5a-460c-b0e7-01cd5cea0699)

### - 나의 그룹

![KakaoTalk_20240414_211858267_03](https://github.com/gigic5220/side-project-client/assets/59347641/4ff6f9f0-05e1-4c8c-b2ae-67e55d9cd462)

### - FAVOR(TODO) 목록

<img width="377" alt="KakaoTalk_20240414_213240826" src="https://github.com/gigic5220/side-project-client/assets/59347641/d2892a6f-5e39-4532-a5c9-13325c69a4d3">

### - 알림

![KakaoTalk_20240414_211858267_02](https://github.com/gigic5220/side-project-client/assets/59347641/b01669a4-8db9-48cc-a9b7-3961b52b5fa5)
