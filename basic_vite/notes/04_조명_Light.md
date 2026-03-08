# 04. 조명 (Light)

> 참고 파일: `src/light.js`

---

## 핵심 개념

Three.js에서 **조명(Light)**은 3D 오브젝트에 빛을 비추어 입체감과 현실감을 만들어준다.

### 조명과 Material의 관계

| Material | 빛의 영향 | 특징 |
|----------|-----------|------|
| `MeshBasicMaterial` | 받지 않음 | 색상이 항상 일정, 조명 불필요 |
| `MeshStandardMaterial` | 받음 | 빛의 방향/세기에 따라 색상 변화 |
| `MeshPhongMaterial` | 받음 | 광택 표현에 특화 |

> **조명이 없으면** `MeshStandardMaterial`로 만든 오브젝트는 **검은색**으로 보인다!

---

## DirectionalLight (방향성 광원)

```js
const light = new THREE.DirectionalLight(0xffffff, 10);
// 매개변수: (색상, 강도)
// 0xffffff = 흰색 빛
// 10 = 빛의 강도

light.position.set(6, 4, 10); // 빛의 위치 설정 (x, y, z)
scene.add(light);              // 씬에 추가해야 작동!
```

- **태양빛**과 같은 빛 → 모든 광선이 평행하게 같은 방향으로 비춤
- `position.set(x, y, z)`: 빛이 **어디에서** 오는지 결정
- 빛의 위치에 따라 물체의 **그림자와 밝기**가 달라짐

---

## 기본 설정 흐름

```js
// 1. 조명 생성 & 위치 설정
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(6, 4, 10);

// 2. 빛의 영향을 받는 Material 사용
const material = new THREE.MeshStandardMaterial({ color: 'red' });

// 3. 씬에 추가
scene.add(light);
scene.add(mesh);
```

---

## MeshBasicMaterial vs MeshStandardMaterial

```js
// 빛의 영향 X — 조명 없어도 색이 보임
const basic = new THREE.MeshBasicMaterial({ color: 'red' });

// 빛의 영향 O — 조명이 있어야 색이 보임
const standard = new THREE.MeshStandardMaterial({ color: 'red' });
```

---

## 퀴즈

### Q1. `MeshBasicMaterial`과 `MeshStandardMaterial`의 핵심 차이는?
<details>
<summary>정답 보기</summary>
MeshBasicMaterial은 빛의 영향을 받지 않아 항상 일정한 색상으로 보이고, MeshStandardMaterial은 빛의 영향을 받아 조명의 방향과 세기에 따라 색상이 달라진다.
</details>

### Q2. DirectionalLight는 어떤 종류의 빛을 표현하는가?
<details>
<summary>정답 보기</summary>
태양빛과 같은 방향성 광원. 모든 광선이 평행하게 같은 방향으로 비추며, 거리에 관계없이 일정한 세기로 빛을 비춘다.
</details>

### Q3. `MeshStandardMaterial`을 사용했는데 오브젝트가 검은색으로 보인다면 원인은?
<details>
<summary>정답 보기</summary>
씬에 조명(Light)을 추가하지 않았기 때문이다. MeshStandardMaterial은 빛의 영향을 받는 재질이므로 빛이 없으면 아무것도 보이지 않는다.
</details>

### Q4. `light.position.set(6, 4, 10)`에서 각 숫자의 의미는?
<details>
<summary>정답 보기</summary>
빛의 위치를 x=6, y=4, z=10으로 설정한다. 이 위치에서 원점 방향으로 빛이 비추어진다.
</details>
