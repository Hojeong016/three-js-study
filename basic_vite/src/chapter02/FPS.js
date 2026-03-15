import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module";

/*주제: FPS 초당 프레임수 측정하기*/
//FPS 높을 수록 부드러움
//1초당 : 60프레임
//그런데 5프레임밖에 없으면 끊겨보임

//npm i stats.js


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
    window.addEventListener('resize',setSize);
}