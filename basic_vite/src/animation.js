import * as THREE from 'three';

export default function Orthographic() {
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
camera.position.z=3; 
//  - position = 촬영 위치 (구도를결정)
//  - lookAt = 시선 방향 (피사체를화면 중앙에 놓기)
//camera.lookAt(0, 0, 0);

camera.zoom = 1; //카메라의 줌을 조절하는 요소 이것만 사용하면 반영이 안되고 
camera.updateProjectionMatrix(); // 해당 메서드를 호출해야 카메라의 투영 행렬이 업데이트 되면서 줌이 적용된다.

const geometry = new THREE.BoxGeometry(1, 1, 1);
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
// clock : THREE.Clock 객체는 애니메이션에서 시간 관련 기능을 제공하는 객체. 
// 이 객체를 사용하여 애니메이션의 경과 시간을 측정할 수 있다. 
const clock = new THREE.Clock(); // THREE.Clock 객체를 생성하여 clock 변수에 할당한다. 이 객체는 애니메이션에서 시간 관련 기능을 제공하는 객체로, 애니메이션의 경과 시간을 측정할 수 있다. clock.getElapsedTime() 메서드를 사용하여 애니메이션이 시작된 이후의 경과 시간을 초 단위로 얻을 수 있다. 이를 통해 애니메이션의 속도를 일정하게 유지할 수 있다.
//라디안 단위 : 360도 = 2파이 라디안, 180도 = 파이 라디안, 90도 = 파이/2 라디안, 45도 = 파이/4 라디안
//파이: 3.14 라디안 * 2 = 6.28 라디안 6.3 라디안 = 360도
mesh.rotation.y = 1; //메쉬의 y축을 기준으로 회전하는 요소. 1은 라디안 단위로 57.3도 정도 회전하는 것을 의미한다. 이 코드를 실행하면 메쉬가 y축을 기준으로 57.3도 정도 회전하게 된다. 이 값을 변경하여 메쉬의 회전 속도를 조절할 수 있다.

//즉 값을 갱신하면서 메쉬의 회전과 위치를 변경하면서 애니메이션을 만들어보자.
function draw() {
    //getElapsedTime 경과 시간
    const time = clock.getElapsedTime(); // clock.getElapsedTime() 메서드를 사용하여 애니메이션이 시작된 이후의 경과 시간을 초 단위로 얻어서 time 변수에 할당한다. 이 값을 사용하여 애니메이션의 속도를 일정하게 유지할 수 있다.
    //MathUtils : 수학 관련 유틸리티 함수를 제공하는 함수 
    //degToRad : 각도를 라디안으로 변환하는 함수. 예를 들어, degToRad(180)은 180도를 라디안으로 변환하여 반환한다. 이 함수를 사용하면 각도를 라디안으로 쉽게 변환할 수 있다.
    //mesh.rotation.y += THREE.MathUtils.degToRad(1); //  메쉬를 y축을 기준으로 매 프레임마다 0.01 라디안씩 회전시킨다.
    mesh.rotation.y += time * 0.1; 
    // 메쉬를 y축을 기준으로 매 프레임마다 time 변수에 0.1을 곱한 값만큼 회전시킨다. 
    // 이 코드를 실행하면 메쉬가 y축을 기준으로 time 변수에 따라 점점 더 빠르게 회전하게 된다. 
    // 이 값을 변경하여 메쉬의 회전 속도를 조절할 수 있다.
    // 어떤 성능이든 ,,, 동일 한 속도로 회전하게 된다. 즉 성능이 낮은 컴퓨터에서도 동일한 속도로 회전하게 된다.
    // 같이 시간동안 같은 거리를 이동하게 된다.
    //mesh.position.y += 0.01; // 메쉬를 y축을 기준으로 매 프레임마다 0.01씩 이동시킨다. 이 코드를 실행하면 메쉬가 y축을 기준으로 위로 이동하게 된다. 이 값을 변경하여 메쉬의 이동 속도를 조절할 수 있다.
    mesh.position.y += 0.01; // 메쉬를 y축을 기준으로 매 프레임마다 time 변수에 0.1을 곱한 값만큼 이동시킨다. 이 코드를 실행하면 메쉬가 y축을 기준으로 time 변수에 따라 점점 더 빠르게 이동하게 된다. 이 값을 변경하여 메쉬의 이동 속도를 조절할 수 있다.
    
    if(mesh.position.y > 5) {
        mesh.position.y = 0; // 메쉬의 y축 위치가 3보다 커지면, 메쉬의 y축 위치를 0으로 초기화한다. 이 코드를 실행하면 메쉬가 y축을 기준으로 위로 이동하다가 y축 위치가 3보다 커지면 다시 아래로 이동하게 된다. 이 값을 변경하여 메쉬가 이동하는 범위를 조절할 수 있다.
    }

    rendderer.render(scene, camera);

    window.requestAnimationFrame(draw); // 브라우저에게 다음 프레임을 요청하는 메서드. 이 메서드를 호출하면 브라우저는 다음 프레임이 준비되었을 때 draw 함수를 호출하여 애니메이션을 계속 실행한다. 이 방법은 setInterval이나 setTimeout보다 효율적이며, 브라우저의 리프레시 레이트에 맞춰 애니메이션을 최적화할 수 있다.
}
// 해당 방법은 문제가 있을 것 사용자의 컴퓨터 성능에 따라 애니메이션이 부드럽게 실행되지 않을 수 있다.
// 예를 들어, 사용자의 컴퓨터가 낮은 성능을 가지고 있다면, 애니메이션이 끊기거나 느리게 실행될 수 있다. 
// 또한, 애니메이션이 너무 복잡하거나 많은 오브젝트를 포함하고 있다면, 사용자의 컴퓨터가 이를 처리하는 데 어려움을 겪을 수 있다. 
// 따라서, 애니메이션을 최적화하여 사용자 경험을 향상시키는 것이 중요하다.
//따라서 보정을 해줘야한다. 



draw();
window.addEventListener('resize', setSize);
}