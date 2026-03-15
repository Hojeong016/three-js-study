import * as THREE from 'three';
//기본 구성

export default function Perspective() {

//동적으로 캔버스 조립하기
//const rendderer = new THREE.WebGLRenderer();
//rendderer.setSize(window.innerWidth, window.innerHeight); //캔버스 크기 설정 전체 화면으로
//console.log(rendderer.domElement); //캔버스 요소
//document.body.appendChild(rendderer.domElement); //캔버스 body에 추가 + 하지만 여러 요소들이 어우러지게 하는 것 <canvas> 요소를 html에서 가져와서 사용하기

// html에서 캔버스 가져와서 사용하기
const canvas = document.querySelector('#three-canvas');
const rendderer = new THREE.WebGLRenderer({
    canvas: canvas, //캔버스 요소를 렌더러에 전달 파라미터로 전달
    antialias: true //계단 현상 제거, 메쉬를 부드럽게 보이게 하는 옵션
});

rendderer.setSize(window.innerWidth, window.innerHeight); //캔버스 크기 설정 전체 화면으로

//전체 요소가 포함(렌더링)되는 공간
const scene = new THREE.Scene();

//카메라
//원근 카메라 펄스텍티브 카메라 매개변수 (fov[시야각], aspect[종횡부 화면의 가로 세로 비율, 화면의 비율], near[가까운ㄴ쪽 한계], far[먼쪽 한계])
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, // 렌더러의 크기와 동일하게 설정 
    0.1, //숫자에 대한 감각을 추후에 익히게 될 것
    1000
);


//scene.add(camera); //카메라 씬에 추가 아직 위치 설정을 하지 않았기 때문에 카메라는 원점에 위치

camera.position.z = 5; //카메라의 위치를 z축으로 5만큼 이동 정면 
camera.position.y = 2; //카메라의 위치를 y축으로 2만큼 이동 위에서 아래로 내려다보는 느낌
camera.position.x = 1; //카메라의 위치를 x축으로 1만큼 이동 오른쪽에서 왼쪽으로 바라보는 느낌
scene.add(camera); //카메라 씬에 추가

//mesh = geometry + material
//geometry는 도형의 형태를 의미하는 것 모양이 매우 다양하다. 박스, 구, 원기둥 등등
const geometry = new THREE.BoxGeometry(1, 1, 1); //가로, 세로, 깊이
//material은 도형의 재질을 의미하는 것 색상, 투명도, 반짝임 등등 오브젝트 하나에 인자를 여러개 줄 수 있다.
const material = new THREE.MeshBasicMaterial({
    //color: 0xff0000 //red color in hexadecimal
    //color: '#ff0000' //red color in hexadecimal
    //color: 'red' //red color in string
    color: 'red'
});

const mesh = new THREE.Mesh(geometry, material); //geometry와 material을 합쳐서 mesh를 만든다.

scene.add(mesh); //mesh를 씬에 추가 default로 카메라는 원점

//그리기 
rendderer.render(scene, camera); //렌더러에 씬과 카메라를 전달해서 그리기
}