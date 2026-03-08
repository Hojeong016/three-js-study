import * as THREE from 'three';

export default function Orthographic() {

console.log(THREE);
const canvas = document.querySelector('#three-canvas2');

const rendderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true //캔버스의 배경을 투명하게 만들어주는 옵션
});

rendderer.setSize(window.innerWidth, window.innerHeight);
 
rendderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); 

rendderer.setClearColor('#00ff00'); //캔버스의 배경 색상을 설정하는 메서드. '#00ff00'는 초록색을 의미한다. 이 메서드를 사용하면 캔버스의 배경이 초록색으로 설정된다. alpha 옵션과 함께 사용하면 배경 색상의 투명도도 조절할 수 있다.
//css body 에서 설정하는 바디 색과 렌더러의 배경색은 다른 것이다. 
// 렌더러의 배경색은 캔버스의 배경색을 의미한다.
// css body에서 설정하는 바디 색은 웹 페이지 전체의 배경색을 의미한다. 
// 렌더러의 배경색이 투명하게 설정되어 있다면, 웹 페이지 전체의 배경색이 렌더러의 배경색으로 보이게 된다.
rendderer.setClearAlpha(0.5); //캔버스의 배경 투명도를 조절하는 메서드 0.5는 50% 투명한 상태를 의미한다. 0은 완전히 투명한 상태, 1은 완전히 불투명한 상태를 의미한다.
// //렌더러의 색 설정을 먼저하고 투명도 설정을 뒤로 해주어야 렌더러의 배경색이 투명하게 설정된다. 
// 만약 투명도 설정을 먼저하고 색 설정을 뒤로 해주면, 렌더러의 배경색이 불투명하게 설정된다.
const OrthographicCamera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1,                      // top
    -1,                     // bottom
    0.1,                      // near
    1000                    // far
);

OrthographicCamera.position.z=5; 
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
//scene.background = null; //씬의 배경을 투명하게 만들어주는 옵션

//scene.background = new THREE.Color('#e14414');
scene.add(OrthographicCamera);
scene.add(mesh);

function setSize() {
    OrthographicCamera.aspect = window.innerWidth / window.innerHeight; 
    OrthographicCamera.updateProjectionMatrix();
    rendderer.setSize(window.innerWidth, window.innerHeight);
    rendderer.render(scene, OrthographicCamera);
    
    
}

rendderer.render(scene, OrthographicCamera);

window.addEventListener('resize', setSize);
}