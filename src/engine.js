import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Engine {
    constructor() {
        this._scene = null;

        this._renderer = null;

        this._camera = null;
        
        this.init();

        this._object = null;

        this._animationFrame = null;

        this._controls = null;
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createOrbitControl();
        this.startRender();
    }

    createScene() {
        this._scene = new THREE.Scene();
    }

    createCamera() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let wHRate = width / height;
        let s = 200;
        let camera = new THREE.OrthographicCamera(-s * wHRate, s * wHRate, s, -s, 1, 1000);
        camera.position.set(0, 0, 100);
        camera.lookAt(this._scene.position);
        this._camera = camera;
        camera = null;
    }

    createRenderer() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let renderer = new THREE.WebGLRenderer();

        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 1);
        document.body.appendChild(renderer.domElement);
        this._renderer = renderer;
        renderer = null;
    }

    createOrbitControl() {
        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
    }

    startRender() {
        let renderFunc = (time) => {
            this.render();
            requestAnimationFrame(renderFunc);
        }
        renderFunc();
    }

    render() {
        this._renderer.render(this._scene, this._camera);
    }

    createObjects() {
        
        {
            let textureLoader = new THREE.TextureLoader();
            textureLoader.load("../img/earth.png", (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                let width = 1280 * 2;
                texture.repeat.set(width / 64, 1);
                let geometry = new THREE.BoxGeometry(width, 64, 50);
                let material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                let mesh = new THREE.Mesh(geometry, material);
                this._scene.add(mesh);
            });
        }

    }

    start() {
        // let geometry = new THREE.BoxGeometry(100, 100, 100);
        // let mate = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00
        // });
        // let mesh = new THREE.Mesh(geometry, mate);
        // this._scene.add(mesh);
        

        this.createObjects();
    }
}

export default Engine;