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

rendderer.setClearColor('#00ff00'); 
rendderer.setClearAlpha(0.5); 
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

scene.add(OrthographicCamera);
scene.add(mesh);

function setSize() {
    OrthographicCamera.aspect = window.innerWidth / window.innerHeight; 
    OrthographicCamera.updateProjectionMatrix();
    rendderer.setSize(window.innerWidth, window.innerHeight);
    rendderer.render(scene, OrthographicCamera);
    
    
}
const clock = new THREE.Clock(); // 애니메이션에서 시간 간격을 계산하기 위해 사용하는 객체. Clock 객체는 애니메이션 루프에서 매 프레임마다 시간 간격을 계산하여 반환하는 메서드를 제공한다. 이를 통해 애니메이션이 프레임 속도에 관계없이 일정하게 유지될 수 있도록 도와준다. 예를 들어, 오브젝트의 위치를 업데이트할 때 delta 값을 곱하여 이동 거리를 계산하면, 프레임 속도가 느려지거나 빨라져도 오브젝트가 일정한 속도로 움직이는 것처럼 보이게 된다.


function draw() {
   const delta = clock.getDelta(); 
    // 이전 프레임과 현재 프레임 사이의 시간 간격을 초 단위로 반환하는 메서드.
    // 이 값을 사용하면 애니메이션이 프레임 속도에 관계없이 일정하게 유지될 수 있다. 
    // 예를 들어, 오브젝트의 위치를 업데이트할 때 delta 값을 곱하여 이동 거리를 계산하면, 
    // 프레임 속도가 느려지거나 빨라져도 오브젝트가 일정한 속도로 움직이는 것처럼 보이게 된다.
    mesh.rotation.y += 2 * delta; 
    // 시간 간격이기 떄문에 일정하기 때문에 계속 더해 줘야하는 것 
    if(mesh.position.y > 3) {
        mesh.position.y = 0;
    } else {
        mesh.position.y += delta;
    }

    rendderer.render(scene, OrthographicCamera);

    window.requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', setSize);
}