# 02. 카메라 - PerspectiveCamera vs OrthographicCamera

> 참고 파일: `src/perspective.js`, `src/Orthographic.js`

---

## 핵심 개념

Three.js에서 카메라는 **씬을 바라보는 시점**을 결정한다. 두 가지 주요 카메라 타입이 있다.

| 카메라 | 특징 | 절두체 형태 |
|--------|------|-------------|
| **PerspectiveCamera** | 원근감 있음 (현실적) | 사다리꼴 (피라미드) |
| **OrthographicCamera** | 원근감 없음 (거리와 무관하게 같은 크기) | 직육면체 |

---

## PerspectiveCamera (원근 카메라)

```js
const camera = new THREE.PerspectiveCamera(
    75,                                      // fov: 시야각 (Field of View)
    window.innerWidth / window.innerHeight,  // aspect: 종횡비 (가로/세로)
    0.1,                                     // near: 가까운 쪽 한계
    1000                                     // far: 먼 쪽 한계
);
```

### 매개변수 설명
- **fov (시야각)**: 카메라가 볼 수 있는 수직 각도 (단위: 도)
- **aspect (종횡비)**: 화면의 가로/세로 비율 → 렌더러 크기와 동일하게 설정
- **near / far**: 이 범위 안에 있는 오브젝트만 렌더링됨 (절두체)

---

## OrthographicCamera (직교 카메라)

```js
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight,    // right
    1,                                          // top
    -1,                                         // bottom
    0.1,                                        // near
    1000                                        // far
);
```

### 매개변수 설명
- **left, right, top, bottom**: 절두체의 크기를 결정 (직육면체의 경계)
- **near, far**: 렌더링 범위
- 거리에 관계없이 오브젝트 크기가 **동일하게** 보임

---

## 카메라 공통 속성

### position (위치)
```js
camera.position.x = 1;  // 좌우 이동
camera.position.y = 2;  // 상하 이동
camera.position.z = 5;  // 앞뒤 이동 (양수 = 뒤로)
```

### lookAt (시선 방향)
```js
camera.lookAt(0, 0, 0); // 원점을 바라보도록 설정
```

- **position** = 촬영 위치 (구도 결정)
- **lookAt** = 시선 방향 (피사체를 화면 중앙에 놓기)

### zoom (줌)
```js
camera.zoom = 0.5;
camera.updateProjectionMatrix(); // 반드시 호출해야 줌이 적용됨!
```

> **주의**: `zoom` 값만 변경하면 반영되지 않는다. 반드시 `updateProjectionMatrix()`를 함께 호출해야 한다.

---

## 리사이즈 대응

```js
function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 업데이트
    camera.updateProjectionMatrix(); // 투영 행렬 업데이트
    renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 업데이트
    renderer.render(scene, camera); // 다시 그리기
}
window.addEventListener('resize', setSize);
```
> **종횡비를 업데이트 하는 이유** :  3D 장면을 2D 화면에 투영할 때, 카메라가 화면의 가로/세로 비율을 알아야        
찌그러지지 않고 올바르게 렌더링되기 때문이다. 예로 카메라의 aspect가 기본 1:1(정사각)비율일 때 화면이 16:9일 경우 정사각형의 메쉬가 찌그러질 수 있다.

> **종횡비 계산 원리**:  Three.js의 PerspectiveCamera는 세로 시야각(fov)을 기준으로 잡고, aspect 값을  
보고 가로 시야각을 자동으로 계산한다. (즉 카메라는 aspect를 맞출 때 세로를 기준으로 가로가 세로의 몇 배인지를 계산하여    
카메라의 종횡을 결정한다.

>**렌더러 setSize를 안 하면?**: renderer.setSize()는 canvas 요소의 실제 픽셀 크기를 바꿔주는 것, 
즉 카메라의 종횡비만 맞추면 투영의 비율을 맞지만 실제 출력되는 캔버스의 크기가 조정되지 않기 때문에 메쉬가 잘리거나 늘어날 수 있다. 
---

## Pixel Ratio (픽셀 비율)

```js
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
```

- 고해상도 디스플레이(레티나 등)에서 렌더링 품질을 향상시키기 위해 사용
- `devicePixelRatio`는 사용자 디스플레이마다 다름

---

## 퀴즈

### Q1. PerspectiveCamera와 OrthographicCamera의 가장 큰 차이점은?
<details>
<summary>정답 보기</summary>
PerspectiveCamera는 원근감이 있어 먼 물체가 작게 보이고, OrthographicCamera는 거리에 관계없이 물체 크기가 동일하게 보인다.
</details>

### Q2. PerspectiveCamera의 4가지 매개변수는?
<details>
<summary>정답 보기</summary>
fov(시야각), aspect(종횡비), near(가까운 쪽 한계), far(먼 쪽 한계)
</details>

### Q3. 카메라의 zoom을 변경한 후 반드시 호출해야 하는 메서드는?
<details>
<summary>정답 보기</summary>
`camera.updateProjectionMatrix()` — 이 메서드를 호출해야 카메라의 투영 행렬이 업데이트되어 줌이 실제로 적용된다.
</details>

### Q4. `position`과 `lookAt`의 역할 차이는?
<details>
<summary>정답 보기</summary>
position은 카메라의 **촬영 위치**(구도)를 결정하고, lookAt은 카메라의 **시선 방향**(어디를 바라볼지)을 결정한다.
</details>

### Q5. 윈도우 리사이즈 시 업데이트해야 하는 3가지는?
<details>
<summary>정답 보기</summary>
1) 카메라의 aspect(종횡비), 2) updateProjectionMatrix() 호출, 3) 렌더러의 setSize()
</details>
