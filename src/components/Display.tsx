import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FormData } from "./FormInterface";

const Display = ({ data }: { data: FormData }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    console.log(data);

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        display: THREE.Mesh,
        wireframe: THREE.LineSegments;

    const chooseShape = () => {
        const shapes = {
            Capsule: THREE.CapsuleGeometry,
            Cone: THREE.ConeGeometry,
            Cylinder: THREE.CylinderGeometry,
            Dodecahedron: THREE.DodecahedronGeometry,
            Icosahedron: THREE.IcosahedronGeometry,
            Octahedron: THREE.OctahedronGeometry,
            Sphere: THREE.SphereGeometry,
            Tetrahedron: THREE.TetrahedronGeometry,
            Torus: THREE.TorusGeometry,
            TorusKnot: THREE.TorusKnotGeometry,
        };

        const selectedShape = shapes[data.shape] || THREE.BoxGeometry;
        return new selectedShape(5, 10, 10);
    };

    const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            50,
            (window.innerWidth * 0.8) / (window.innerHeight * 0.8),
            1,
            1000
        );

        camera.position.z = 25;

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current!,
            alpha: true,
        });

        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        renderer.setClearColor(0x000000, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        const spotlight = new THREE.SpotLight(0xffffff, 1);
        spotlight.castShadow = true;
        spotlight.position.set(0, 64, 32);
        scene.add(spotlight);

        //   const texture = new THREE.TextureLoader().load(inputTexture);
        const geometry = chooseShape();
        //   const material = new THREE.MeshBasicMaterial({ map: faceTexture });
        const material = new THREE.MeshBasicMaterial({ color: data.color });
        display = new THREE.Mesh(geometry, material);
        scene.add(display);

        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
        });
        wireframe = new THREE.LineSegments(
            wireframeGeometry,
            wireframeMaterial
        );

        if (data.outlineSegments) {
            scene.add(wireframe);
        }
    };

    const animate = () => {
        display.rotation.x += 0.01;
        if (data.outlineSegments) {
            wireframe.rotation.x += 0.01;
        }

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    useEffect(() => {
        initScene();
        animate();
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default Display;
