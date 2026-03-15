import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module";
import dat, {gui} from 'dat.gui'
/*주제: 지금까지는 카메라의 위치를 수동으로 조절하면서 진행했는데 사용자가 마우스로 조절할 수 있는 GUI 제공해보자.*/
// npm i dat.gui

export default function FDS(){
    //renderer
    const canvas = document.querySelector("#three-canvas-helper")

    const renderer = new THREE.WebGLRenderer(
        {
            canvas:canvas,
            antialias:true
        }
    )
    renderer.setSize(
        window.innerWidth,
        window.innerWidth
    )

    //sean
    const scene = new THREE.Scene();

    //camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        80
    )

    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 1;

    //ligh
    const light = new THREE.DirectionalLight(0xffffff, 10);
    light.position.set(1,5,6)
    //Mesh
    const g = new THREE.BoxGeometry(1,1,1,1,1);
    const m = new THREE.MeshBasicMaterial(
        {
            color: 'green'
        }
    );
    const mm = new THREE.MeshStandardMaterial(
        {
            color: 'green'
        }
    )
    const datGui = new dat.GUI();
    const mesh = new THREE.Mesh(g,mm);

    mesh.position.z = 1;



    camera.lookAt(1,1,1)

    //camera.lookAt(0,0,0)
    //state
    // Stats는 애니메이션 루프에서 업데이트해야 함
    const  states = new Stats();
    document.body.appendChild(states.dom);
    //AexsHelper(축)
    const aexsHelper = new THREE.AxesHelper(3);
 //GridHelper(그리드)
    const gridHelper = new THREE.GridHelper(5);
    function setSize(){
        //리사이즈 할 때 조정해야하는 것
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene,camera);
    }

    mesh.rotation.y = 1

    function rotation(){
        mesh.rotation.y += 0.01;
        states.update();
        camera.lookAt(mesh.position)
        renderer.render(scene, camera);
        window.requestAnimationFrame(rotation);
    }


    scene.add(camera);
    scene.add(mesh);
    scene.add(light);
    scene.add(aexsHelper);
    scene.add(gridHelper);

    rotation()
    renderer.render(scene,camera)
    //dat 자바스크립트의 속성값을 그래픽 기반의 Ui 로 조정할 수 있게?? => 코드를 수정하지 않고 화면에서 슬라이더/버튼으로 값을 바꿀 수 있게
    //   해주는 도구/
    //  예시
    //
    //   const datGui = new dat.GUI();
    //   datGui.add(mesh.position, 'x', -10, 10); // x 위치를 -10~10 범위로 조절
    //   datGui.add(mesh.position, 'y', -10, 10);
    //   datGui.addColor(material, 'color');       // 색상 선택기
    //
    //   이렇게 하면 화면 오른쪽 위에 조절 패널이 나타나서, 슬라이더를 움직이면 메시가
    //   실시간으로 움직인다..
    //
    //   왜 쓰나?
    //
    //   코드에서 mesh.position.x = 3 이렇게 바꾸고 → 저장 → 새로고침 → 확인... 이걸
    //   반복하는 게 귀찮으니까,
    //
    //   UI로 드래그하면서 실시간으로 확인하려고 쓰는 겁니다. 개발/디버깅 도구.
    // 오브젝트, 속성, 범위(최소ㅡ 최대), 단계()= 조정 범위

    datGui.add(mesh.position, 'y', -5 , 5, 0.01).name('y');
    datGui
        .add(mesh.position, 'z')
        .min(-3)
        .max(3)
        .step(0.01)
        .name('z 위치')
    datGui.add(camera.position, 'x', -10, 10, 0.01).name('카메라')
    window.addEventListener('resize',setSize);
}