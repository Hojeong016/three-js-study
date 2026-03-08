# 06. Delta 시간 - 프레임 독립적 애니메이션

> 참고 파일: `src/delta.js`

---

## 핵심 개념

`getElapsedTime()`과 `getDelta()`의 차이를 이해하는 것이 중요하다.

| 메서드 | 반환값 | 용도 |
|--------|--------|------|
| `getElapsedTime()` | 시작 이후 **총 경과 시간** | 절대 위치/회전 설정 |
| `getDelta()` | 이전 프레임과 현재 프레임 **사이의 시간 간격** | 증분(+=) 이동/회전 |

---

## getDelta() 사용법

```js
const clock = new THREE.Clock();

function draw() {
    const delta = clock.getDelta(); // 프레임 간 시간 간격 (초 단위)

    mesh.rotation.y += 2 * delta;   // delta를 곱해서 프레임 독립적 회전
    mesh.position.y += delta;       // delta를 곱해서 프레임 독립적 이동

    renderer.render(scene, camera);
    window.requestAnimationFrame(draw);
}
```

### 왜 delta를 곱하는가?

- 60fps 컴퓨터: delta ≈ 0.0167초 → `2 * 0.0167 = 0.033` 만큼 회전
- 30fps 컴퓨터: delta ≈ 0.0333초 → `2 * 0.0333 = 0.067` 만큼 회전
- 결과: 30fps는 프레임당 2배 더 많이 회전하지만, 프레임 수가 절반이므로 **1초 동안 같은 각도** 회전

---

## getElapsedTime vs getDelta 비교

### getElapsedTime 방식 (절대값 할당)
```js
mesh.rotation.y = time;       // 경과 시간을 직접 할당 → 같은 시간 = 같은 위치
```

### getDelta 방식 (증분 누적)
```js
mesh.rotation.y += 2 * delta; // 프레임 간격만큼 누적 → 일정 속도 유지
```

> **delta는 시간 간격**이므로 `+=`로 **계속 더해줘야** 한다. `=`로 할당하면 안 된다!

---

## 조건부 초기화 (반복 애니메이션)

```js
if (mesh.position.y > 3) {
    mesh.position.y = 0;     // 일정 범위를 넘으면 초기화
} else {
    mesh.position.y += delta; // 프레임 독립적으로 이동
}
```

---

## 퀴즈

### Q1. `getElapsedTime()`과 `getDelta()`의 차이점은?
<details>
<summary>정답 보기</summary>
getElapsedTime()은 시작 이후의 **총 경과 시간**을 반환하고, getDelta()는 이전 프레임과 현재 프레임 사이의 **시간 간격**을 반환한다.
</details>

### Q2. `getDelta()` 값에 속도를 곱하면 프레임 독립적인 애니메이션이 되는 이유는?
<details>
<summary>정답 보기</summary>
프레임 수가 적은(느린) 컴퓨터는 delta 값이 크고, 프레임 수가 많은(빠른) 컴퓨터는 delta 값이 작다. 따라서 delta를 곱하면 1초 동안의 총 이동/회전량이 동일해진다.
</details>

### Q3. `getDelta()` 사용 시 `=`이 아닌 `+=`를 사용해야 하는 이유는?
<details>
<summary>정답 보기</summary>
getDelta()는 한 프레임의 시간 간격(매우 작은 값)을 반환하므로, `=`로 할당하면 오브젝트가 거의 움직이지 않는다. 프레임마다 간격을 누적(`+=`)해야 의미 있는 이동/회전이 된다.
</details>

### Q4. 60fps 환경에서 `getDelta()`의 대략적인 반환값은?
<details>
<summary>정답 보기</summary>
약 0.0167초 (1/60 ≈ 0.0167)
</details>
