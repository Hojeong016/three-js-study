# 03. 배경색과 투명도 (Alpha)

> 참고 파일: `src/alpha.js`

---

## 핵심 개념

Three.js에서 배경색은 **두 곳**에서 설정할 수 있으며, 서로 다른 역할을 한다:

| 설정 위치 | 역할 |
|-----------|------|
| **CSS body 배경색** | 웹 페이지 전체의 배경색 |
| **렌더러 배경색** | Three.js 캔버스의 배경색 |

렌더러 배경이 투명하면 → CSS body 배경색이 비쳐 보이게 된다.

---

## 투명 배경 설정

### 1단계: 렌더러에 alpha 옵션 활성화
```js
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true  // 캔버스 배경을 투명하게 만드는 옵션
});
```

### 2단계: 배경색 & 투명도 조절
```js
renderer.setClearColor('#00ff00');  // 캔버스 배경색 설정 (초록색)
renderer.setClearAlpha(0.5);        // 배경 투명도 설정 (0~1)
```

| 값 | 의미 |
|----|------|
| `0` | 완전 투명 |
| `0.5` | 50% 투명 |
| `1` | 완전 불투명 |

### 설정 순서 주의!
```
setClearColor → setClearAlpha (이 순서로!)
```
> 색 설정을 먼저, 투명도 설정을 나중에 해야 투명도가 제대로 적용된다.

---

## Scene 배경 설정 (다른 방법)

```js
scene.background = new THREE.Color('#e14414'); // 씬 배경색 설정
scene.background = null;                        // 씬 배경을 투명으로
```

---

## 정리: 배경 제어 계층

```
[CSS body 배경] ← 가장 뒤
    ↑
[렌더러 배경 (setClearColor + setClearAlpha)]
    ↑
[씬 배경 (scene.background)] ← 가장 앞
```

- `alpha: true` + `setClearAlpha(0)` → 렌더러 배경이 투명 → CSS body 배경이 보임
- `scene.background`를 설정하면 렌더러 배경도 덮어씌움

---

## 퀴즈

### Q1. CSS body 배경색과 렌더러 배경색의 차이는?
<details>
<summary>정답 보기</summary>
CSS body 배경색은 웹 페이지 전체의 배경색이고, 렌더러 배경색은 Three.js 캔버스(canvas)만의 배경색이다. 렌더러 배경이 투명하면 CSS body 배경이 비쳐 보인다.
</details>

### Q2. 렌더러의 캔버스를 투명하게 만들기 위해 필요한 설정은?
<details>
<summary>정답 보기</summary>
WebGLRenderer 생성 시 `alpha: true` 옵션을 전달하고, `renderer.setClearAlpha(0)`으로 투명도를 0으로 설정한다.
</details>

### Q3. `setClearColor`와 `setClearAlpha`의 올바른 호출 순서는?
<details>
<summary>정답 보기</summary>
`setClearColor`를 먼저, `setClearAlpha`를 나중에 호출해야 투명도가 제대로 적용된다.
</details>

### Q4. `setClearAlpha(0.5)`는 어떤 상태를 의미하는가?
<details>
<summary>정답 보기</summary>
캔버스 배경이 50% 투명한 상태. 렌더러 배경색과 그 뒤의 CSS body 배경색이 반반 섞여서 보인다.
</details>
