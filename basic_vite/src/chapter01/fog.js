import * as THREE from 'three';

export default function fog() {
//리페인트 : 브라우저가 연산 종료 후 오브젝트들의 위치 결정된 이후에 그림을 다시 그리는 과정. 
// 리페인트가 일어나면 브라우저는 CPU와 GPU를 사용하여 화면을 다시 그리는 작업을 수행한다. 
// 이 과정에서 CPU는 자바스크립트 코드를 실행하여 오브젝트들의 위치와 상태를 업데이트하고,
// GPU는 이러한 업데이트된 정보를 바탕으로 화면에 픽셀을 다시 그리는 작업을 수행한다. 
// 리페인트가 일어날 때마다 CPU와 GPU가 협력하여 화면을 다시 그리는 작업을 수행하기 때문에, 
// 리페인트가 자주 발생하면 성능 저하가 발생할 수 있다. 따라서, 리페인트를 최소화하는 것이 중요하다.

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
const meshes = [];
let mesh;

for(let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 -2.5; 
    //mesh.position.y = Math.random() * 5 -2.5;
    mesh.position.z = Math.random() * 5 -2.5;
    scene.add(mesh);
    meshes.push(mesh);
}

scene.fog = new THREE.Fog('black', 3, 7); // 안개 효과를 추가하는 객체. 첫 번째 매개변수는 안개의 색상을 나타내며, 두 번째 매개변수는 안개가 시작되는 거리를 나타내고, 세 번째 매개변수는 안개가 완전히 불투명해지는 거리를 나타낸다. 예시에서는 안개의 색상을 흰색으로 설정하고, 안개가 시작되는 거리를 3으로 설정하며, 안개가 완전히 불투명해지는 거리를 7로 설정한다. 이 설정에 따라 카메라에서 3에서 7 사이의 거리에 있는 오브젝트들은 점점 더 안개에 가려지게 된다.
scene.add(camera);
scene.add(light);

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    rendderer.setSize(window.innerWidth, window.innerHeight);
    rendderer.render(scene, camera);
    
    
}


function draw() {
 
    rendderer.render(scene, camera);

    window.requestAnimationFrame(draw); // 브라우저에게 다음 프레임을 요청하는 메서드. 이 메서드를 호출하면 브라우저는 다음 프레임이 준비되었을 때 draw 함수를 호출하여 애니메이션을 계속 실행한다. 이 방법은 setInterval이나 setTimeout보다 효율적이며, 브라우저의 리프레시 레이트에 맞춰 애니메이션을 최적화할 수 있다.
}




draw();
window.addEventListener('resize', setSize);
}