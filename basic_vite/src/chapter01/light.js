import * as THREE from 'three';

export default function Orthographic() {

console.log(THREE);
const canvas = document.querySelector('#three-canvas2');
const light = new THREE.DirectionalLight(0xffffff, 10); // 방향성 광원, 태양빛과 같은 빛을 만들어주는 객체
const rendderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true 
});

rendderer.setSize(window.innerWidth, window.innerHeight);
rendderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); 
rendderer.setClearColor('#000000ff'); 

rendderer.setClearAlpha(1); 
const camera = new THREE.PerspectiveCamera(
    75, // fov (field of view)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1,                      // near
    1000                    // far
);
light.position.set(6, 4, 10); // 빛의 위치를 설정하는 메서드. x, y, z 좌표를 전달하여 빛의 위치를 설정한다. 예시에서는 빛의 위치를 x=1, y=2, z=3으로 설정한다. 이 위치는 씬에서 빛이 어디에서 오는지를 결정한다. 빛의 위치에 따라 물체에 드리워지는 그림자와 밝기가 달라진다.
camera.position.z=3; 
camera.position.y=1;
camera.position.x=1;
//  - position = 촬영 위치 (구도를결정)
//  - lookAt = 시선 방향 (피사체를화면 중앙에 놓기)
//camera.lookAt(0, 0, 0);

camera.zoom = 1; //카메라의 줌을 조절하는 요소 이것만 사용하면 반영이 안되고 
camera.updateProjectionMatrix(); // 해당 메서드를 호출해야 카메라의 투영 행렬이 업데이트 되면서 줌이 적용된다.

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ // 빛의 영향을 받지 않는 재질, 빛의 영향을 받는 재질은 MeshStandardMaterial, MeshPhongMaterial 등이 있다. MeshBasicMaterial은 빛의 영향을 받지 않기 때문에 색상이 항상 일정하게 보인다. 빛의 영향을 받는 재질은 빛의 방향과 세기에 따라 색상이 달라진다.
//     color: 'red'
// });
const material = new THREE.MeshStandardMaterial({
    color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
const scene = new THREE.Scene();

scene.add(camera);
scene.add(mesh);
scene.add(light);

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    rendderer.setSize(window.innerWidth, window.innerHeight);
    rendderer.render(scene, camera);
    
    
}

rendderer.render(scene, camera);

window.addEventListener('resize', setSize);
}