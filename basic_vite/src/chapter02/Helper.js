import * as THREE from 'three';
import {color} from "three/tsl";

/*주제: AexsHelper(축), GridHelper(그리드)*/
//: 시각적 가이드를 제공해준다.

export default function Helper(){
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
    mesh.position.x = 1;
    mesh.position.y = 1;


    camera.lookAt(1,1,1)

    //camera.lookAt(0,0,0)

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

    scene.add(camera);
    scene.add(mesh);
    scene.add(light);
    scene.add(aexsHelper);
    scene.add(gridHelper);

    renderer.render(scene,camera)

    window.addEventListener('resize',setSize);
}