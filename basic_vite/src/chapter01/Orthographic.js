import * as THREE from 'three';

export default function Orthographic() {

console.log(THREE);
const canvas = document.querySelector('#three-canvas2');

const rendderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

rendderer.setSize(window.innerWidth, window.innerHeight);
 //렌더러의 픽셀 비율을 확인하는 방법 //rendderer.devicePixelRatio 사용자 별로 다르다  setPixelRatio 고해상도 디스플레이에서 렌더링 품질을 향상시키기 위해 사용되는 메서드. 픽셀 비율이 1보다 크면 2로 설정, 그렇지 않으면 1로 설정
rendderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //픽셀 비율이 1보다 크면 2로 설정, 그렇지 않으면 1로 설정

//오쏘그라픽 카메라 (직교 카메라) 거리와 상관없이 물체의 크기가 동일하게 보이는 카메라
//인자 : left, right, top, bottom, near, far 절두체: 니어와 파의 사이에 존재하는 공간의 형태 오쏘그래픽은 직육면체의 형태로 절두체가 만들어진다. left, right, top, bottom은 절두체의 크기를 결정하는 요소
const OrthographicCamera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1,                      // top
    -1,                     // bottom
    0.1,                      // near
    1000                    // far
);

OrthographicCamera.position.z=5; //오쏘그래픽 카메라의 z축 이동 감각이 아직 어려움
OrthographicCamera.position.y=2;
OrthographicCamera.position.x=1;
//  - position = 촬영 위치 (구도를결정)
//  - lookAt = 시선 방향 (피사체를화면 중앙에 놓기)
OrthographicCamera.lookAt(0, 0, 0);

OrthographicCamera.zoom = 1; //카메라의 줌을 조절하는 요소 이것만 사용하면 반영이 안되고 
OrthographicCamera.updateProjectionMatrix(); // 해당 메서드를 호출해야 카메라의 투영 행렬이 업데이트 되면서 줌이 적용된다.

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'red'
});

const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();
scene.add(OrthographicCamera);
scene.add(mesh);

function setSize() {
    OrthographicCamera.aspect = window.innerWidth / window.innerHeight; //카메라의 종횡비를 업데이트 해주는 것이 좋다. 화면의 비율이 바뀌었기 때문에 카메라의 종횡비도 업데이트 해주는 것이 좋다.
    OrthographicCamera.updateProjectionMatrix(); // 카메라가 업데이트 되었을떄 ..  함께 사용해야하는 메서드
    rendderer.setSize(window.innerWidth, window.innerHeight); //렌더러의 크기도 업데이트 해주는 것이 좋다. 화면의 크기가 바뀌었기 때문에 렌더러의 크기도 업데이트 해주는 것이 좋다.
    rendderer.render(scene, OrthographicCamera); //렌더러로 다시 그려주는 것이 좋다. 화면의 크기가 바뀌었기 때문에 렌더러로 다시 그려주는 것이 좋다.
    // 그런데 여기까지하면 메쉬의 크기까지 영향을 받게 된다. 그래서 카메라의 zoom을 조절해서 메쉬의 크기가 변하지 않도록 해주는 것이 좋다.
    
}

rendderer.render(scene, OrthographicCamera);

//윈도우의 리사이즈 이벤트를 받아서 카메라의 종횡비와 렌더러의 크기를 업데이트 해주는 것이 좋다.
window.addEventListener('resize', setSize);
}