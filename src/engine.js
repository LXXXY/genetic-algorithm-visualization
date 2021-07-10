import * as THREE from "three";

class Engine {
    constructor() {
        this._scene = null;

        this._renderer = null;

        this._camera = null;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
    }

    createScene() {
        this._scene = new THREE.Scene();
    }

    createCamera() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let wHRate = width / height;
        let s = 500;
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

    render() {
        this._renderer.render(this._scene, this._camera);
    }

    start() {
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        let mate = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        let mesh = new THREE.Mesh(geometry, mate);
        this._scene.add(mesh);
        this.render();
    }
}

export default Engine;