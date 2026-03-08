# 07. 안개 효과 (Fog)

> 참고 파일: `src/fog.js`

---

## 핵심 개념

**Fog (안개)**는 카메라로부터의 거리에 따라 오브젝트를 점점 안개 색상으로 덮어 **깊이감과 분위기**를 만들어주는 효과다.

---

## Fog 설정

```js
scene.fog = new THREE.Fog('black', 3, 7);
// 매개변수: (색상, near, far)
```

| 매개변수 | 설명 |
|----------|------|
| **색상** | 안개의 색상 (`'black'`, `'white'`, `0xffffff` 등) |
| **near** | 안개가 **시작**되는 거리 (이 거리까지는 안개 없음) |
| **far** | 안개가 **완전히 불투명**해지는 거리 |

### 동작 원리
```
카메라 ──────[near=3]──── 점점 안개 ────[far=7]──── 완전히 안개에 가림
         안개 없음        서서히 사라짐          보이지 않음
```

---

## 다중 메쉬 생성 (for 반복문)

```js
const meshes = [];
let mesh;

for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5; // -2.5 ~ 2.5 랜덤 위치
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh); // 배열에 저장 (나중에 제어하기 위해)
}
```

### `Math.random() * 5 - 2.5` 계산
- `Math.random()` → 0 ~ 1
- `* 5` → 0 ~ 5
- `- 2.5` → **-2.5 ~ 2.5** (원점을 중심으로 분포)

---

## 전체 코드 흐름

```
1. 렌더러, 카메라, 조명, 씬 설정
2. geometry + material 생성
3. for문으로 여러 메쉬를 랜덤 위치에 배치
4. scene.fog 설정으로 안개 효과 추가
5. draw() 애니메이션 루프로 매 프레임 렌더링
```

---

## 퀴즈

### Q1. `new THREE.Fog('black', 3, 7)`에서 각 매개변수의 의미는?
<details>
<summary>정답 보기</summary>
'black'은 안개의 색상, 3은 안개가 시작되는 거리(near), 7은 안개가 완전히 불투명해지는 거리(far)이다.
</details>

### Q2. 카메라에서 거리 2에 있는 오브젝트와 거리 5에 있는 오브젝트 중, `Fog('white', 3, 7)` 설정에서 더 안개에 가려지는 것은?
<details>
<summary>정답 보기</summary>
거리 5에 있는 오브젝트. 거리 2는 near(3)보다 가까우므로 안개가 없고, 거리 5는 near(3)과 far(7) 사이에 있으므로 부분적으로 안개에 가려진다.
</details>

### Q3. `Math.random() * 5 - 2.5`의 결과 범위는?
<details>
<summary>정답 보기</summary>
-2.5 ~ 2.5 (원점을 중심으로 양쪽에 분포)
</details>

### Q4. 메쉬를 배열(`meshes`)에 저장하는 이유는?
<details>
<summary>정답 보기</summary>
나중에 애니메이션 루프 등에서 각 메쉬에 개별적으로 접근하여 위치, 회전 등을 제어하기 위해서이다.
</details>
