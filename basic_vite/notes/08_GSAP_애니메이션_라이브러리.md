# 08. GSAP 애니메이션 라이브러리 (GreenSock)

> 참고 파일: `src/greenSock.js`

---

## 핵심 개념

**GSAP (GreenSock Animation Platform)**은 자바스크립트 애니메이션 전문 라이브러리로, Three.js의 `requestAnimationFrame` 수동 루프보다 **간결하고 강력한** 애니메이션을 제공한다.

---

## 설치

```bash
npm i gsap
```

---

## 기본 사용법: `gsap.to()`

```js
import gsap from 'gsap';

gsap.to(mesh.position, {
    duration: 1, // 애니메이션 지속 시간 (초)
    y: 2,        // y 위치를 2로 이동
    z: 2         // z 위치를 2로 이동
});
```

### gsap.to() 구조
```js
gsap.to(대상_객체, {
    duration: 시간(초),
    속성: 목표값,
    속성: 목표값,
    // ...
});
```

| 매개변수 | 설명 |
|----------|------|
| **대상 객체** | 변화를 줄 오브젝트 (예: `mesh.position`, `mesh.rotation`) |
| **duration** | 애니메이션 재생 시간 (초 단위) |
| **속성: 목표값** | 해당 시간 동안 속성이 목표값으로 변화 |

---

## GSAP vs 수동 애니메이션 비교

### 수동 (requestAnimationFrame)
```js
function draw() {
    mesh.position.y += 0.01;
    if (mesh.position.y > 2) mesh.position.y = 2;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
```

### GSAP
```js
gsap.to(mesh.position, { duration: 1, y: 2 });
```

> GSAP이 훨씬 **간결**하며, easing(가감속), 반복, 딜레이 등 다양한 옵션을 쉽게 추가할 수 있다.

---

## 주의: draw 루프는 여전히 필요

GSAP이 값을 자동으로 변경해주지만, **렌더링은 여전히 매 프레임 해줘야** 한다:

```js
function draw() {
    renderer.render(scene, camera);         // GSAP이 바꾼 값을 화면에 반영
    window.requestAnimationFrame(draw);
}
draw();
```

---

## 퀴즈

### Q1. GSAP을 설치하는 npm 명령어는?
<details>
<summary>정답 보기</summary>
`npm i gsap`
</details>

### Q2. `gsap.to(mesh.position, { duration: 1, y: 2, z: 2 })`의 동작을 설명하시오.
<details>
<summary>정답 보기</summary>
mesh의 position을 1초 동안 현재 위치에서 y=2, z=2로 부드럽게 이동시킨다.
</details>

### Q3. GSAP을 사용해도 `requestAnimationFrame` 렌더링 루프가 필요한 이유는?
<details>
<summary>정답 보기</summary>
GSAP은 오브젝트의 속성 값(position, rotation 등)만 자동으로 변경할 뿐, 화면에 렌더링하는 것은 별도로 `renderer.render()`를 매 프레임 호출해야 하기 때문이다.
</details>

### Q4. `gsap.to()`에서 첫 번째 인자와 두 번째 인자의 역할은?
<details>
<summary>정답 보기</summary>
첫 번째 인자는 변화를 줄 **대상 객체** (예: mesh.position), 두 번째 인자는 duration과 목표 속성값을 포함한 **설정 객체**이다.
</details>
