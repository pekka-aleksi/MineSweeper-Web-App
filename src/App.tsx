import React, {Component} from 'react';
import './App.css';
import * as THREE from 'three';

class App extends Component {
    private readonly animate: () => void;
    private cube: any;
    private renderer: any;
    private scene: any;
    private camera: any;

    constructor(props:Object) {
        super(props);

        this.animate = function (this: App) {
            requestAnimationFrame(() => this.animate());

            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

            this.renderer.render(this.scene, this.camera);
        };
    }


    componentDidMount() {


        console.log("Calling constructor!")
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 0.1, 1000);



        const geometry = new THREE.BoxGeometry(3, 1, 3);

        for (let i = 0; i < geometry.faces.length; i++) {

            const face = geometry.faces[i];
            face.color.setHex(Math.random() * 0xffffff);
        }

        // @ts-ignore
        this.cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors}));


        this.scene.add(this.cube);

        this.camera.position.z = 5;



        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

    }

    render() {
        console.log("rendering")
        return <div style={{'textAlign': 'center', 'padding': 10, 'margin': 10}}>
            <button onClick={() => this.animate()}>Enable Animation!</button>
        </div>

    }
}

export default App;
