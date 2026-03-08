# 05. 애니메이션 - requestAnimationFrame & Clock

> 참고 파일: `src/animation.js`

---

## 핵심 개념

Three.js에서 애니메이션은 **매 프레임마다 값을 갱신하고 다시 렌더링**하는 방식으로 구현한다.

### 리페인트 (Repaint)
- 브라우저가 연산 종료 후 화면을 **다시 그리는** 과정
- CPU: 자바스크립트 실행 → 오브젝트 위치/상태 업데이트
- GPU: 업데이트된 정보로 화면에 픽셀을 다시 그림
- 리페인트가 자주 발생하면 **성능 저하** → 최소화가 중요

---

## requestAnimationFrame

```js
function draw() {
    mesh.rotation.y += 0.01;       // 매 프레임마다 값 변경
    renderer.render(scene, camera); // 다시 그리기
    window.requestAnimationFrame(draw); // 다음 프레임 요청
}
draw(); // 최초 호출
```

### `setInterval`/`setTimeout`보다 좋은 이유
- 브라우저의 **리프레시 레이트에 맞춰** 최적화
- 탭이 비활성화되면 자동으로 일시 정지 (성능 절약)
- 더 부드러운 애니메이션 제공

---

## THREE.Clock — 시간 기반 애니메이션

프레임 기반 애니메이션의 문제: 컴퓨터 성능에 따라 **속도가 달라짐**

### getElapsedTime() — 경과 시간

```js
const clock = new THREE.Clock();

function draw() {
    const time = clock.getElapsedTime(); // 시작 후 경과 시간 (초)
    mesh.rotation.y = time;              // 시간에 비례하여 회전

    renderer.render(scene, camera);
    window.requestAnimationFrame(draw);
}
```

- `getElapsedTime()`: 애니메이션 시작 이후의 **총 경과 시간** (초 단위)
- 어떤 성능의 컴퓨터든 **같은 시간 동안 같은 거리**를 이동

---

## 라디안 단위

Three.js에서 회전은 **라디안(radian)** 단위를 사용한다.

| 도(degree) | 라디안(radian) |
|------------|----------------|
| 360도 | 2π ≈ 6.28 |
| 180도 | π ≈ 3.14 |
| 90도 | π/2 ≈ 1.57 |
| 45도 | π/4 ≈ 0.79 |
| 1 라디안 | ≈ 57.3도 |

### 도 → 라디안 변환
```js
THREE.MathUtils.degToRad(180); // 180도 → π 라디안
```

---

## 회전 & 이동

```js
// 회전
mesh.rotation.y += time * 0.1; // y축 기준 회전 (시간에 따라 가속)

// 이동
mesh.position.y += 0.01; // y축 방향으로 이동

// 조건 초기화 (반복 이동)
if (mesh.position.y > 5) {
    mesh.position.y = 0;
}
```

---

## 퀴즈

### Q1. `requestAnimationFrame`이 `setInterval`보다 애니메이션에 적합한 이유 2가지는?
<details>
<summary>정답 보기</summary>
1) 브라우저의 리프레시 레이트에 맞춰 최적화되어 더 부드럽다. 2) 탭이 비활성화되면 자동으로 일시 정지하여 성능을 절약한다.
</details>

### Q2. `clock.getElapsedTime()`은 무엇을 반환하는가?
<details>
<summary>정답 보기</summary>
Clock 객체가 생성된 이후의 총 경과 시간을 초 단위로 반환한다.
</details>

### Q3. Three.js에서 360도는 몇 라디안인가?
<details>
<summary>정답 보기</summary>
2π ≈ 6.28 라디안
</details>

### Q4. 프레임 기반 애니메이션(`mesh.rotation.y += 0.01`)의 문제점은?
<details>
<summary>정답 보기</summary>
컴퓨터 성능(프레임 레이트)에 따라 애니메이션 속도가 달라진다. 고성능 컴퓨터는 더 빠르게, 저성능 컴퓨터는 더 느리게 움직인다.
</details>

### Q5. `THREE.MathUtils.degToRad(90)`의 반환값은 약 얼마인가?
<details>
<summary>정답 보기</summary>
약 1.57 (π/2)
</details>
