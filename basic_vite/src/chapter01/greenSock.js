import * as THREE from 'three';
import gsap from 'gsap';

export default function Gsap() {
//npm i gsap

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
light.position.set(6, 4, 10); 
camera.position.z=5; 
camera.position.y=1;
camera.position.x=2;
//  - position = 촬영 위치 (구도를결정)
//  - lookAt = 시선 방향 (피사체를화면 중앙에 놓기)
camera.lookAt(0, 0, 0);

camera.zoom = 1; //카메라의 줌을 조절하는 요소 이것만 사용하면 반영이 안되고 
camera.updateProjectionMatrix(); // 해당 메서드를 호출해야 카메라의 투영 행렬이 업데이트 되면서 줌이 적용된다.

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 'red'
});
const scene = new THREE.Scene();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.fog = new THREE.Fog('black', 3, 7); // 안개 효과를 추가하는 객체. 첫 번째 매개변수는 안개의 색상을 나타내며, 두 번째 매개변수는 안개가 시작되는 거리를 나타내고, 세 번째 매개변수는 안개가 완전히 불투명해지는 거리를 나타낸다. 예시에서는 안개의 색상을 흰색으로 설정하고, 안개가 시작되는 거리를 3으로 설정하며, 안개가 완전히 불투명해지는 거리를 7로 설정한다. 이 설정에 따라 카메라에서 3에서 7 사이의 거리에 있는 오브젝트들은 점점 더 안개에 가려지게 된다.
scene.add(camera);
scene.add(light);

// 변화를 주고 싶은 오브젝트, 재생 시간
gsap.to(mesh.position,{
    duration: 1,
    y: 2,
    z: 2
});

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    rendderer.setSize(window.innerWidth, window.innerHeight);
    rendderer.render(scene, camera);
    
    
}

//. 브라우저 창 크기가 변경될 때, 장면에 제대로 대응하기 위해 카메라와 Renderer에서 주로 업데이트= 카메라 종횡비와 Renderer 크기
function draw() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendderer.render(scene, camera);

    window.requestAnimationFrame(draw); // 브라우저에게 다음 프레임을 요청하는 메서드. 이 메서드를 호출하면 브라우저는 다음 프레임이 준비되었을 때 draw 함수를 호출하여 애니메이션을 계속 실행한다. 이 방법은 setInterval이나 setTimeout보다 효율적이며, 브라우저의 리프레시 레이트에 맞춰 애니메이션을 최적화할 수 있다.
}

//Three.js에서 브라우저의 화면 재생 주기와 동기화하여 부드럽고 효율적인 애니메이션을 만들기 위해 권장되는 웹 API
//requestAnimationFrame


draw();
window.addEventListener('resize', setSize);
}