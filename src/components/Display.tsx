import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FormData } from "./FormInterface";

const Display = ({ data }: { data: FormData }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    console.log(data);

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        display: THREE.Mesh,
        texture: THREE.Texture,
        material: THREE.MeshBasicMaterial;

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
        return new selectedShape();
    };

    const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            50,
            (window.innerWidth * 0.8) / (window.innerHeight * 0.8),
            1,
            1000
        );

        camera.position.z = 10;

        rendererRef.current = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current!,
            alpha: true,
        });

        rendererRef.current.setSize(
            window.innerWidth * 0.8,
            window.innerHeight * 0.8
        );
        rendererRef.current.setClearColor(0x000000, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        const spotlight = new THREE.SpotLight(0xffffff, 1);
        spotlight.castShadow = true;
        spotlight.position.set(0, 64, 32);
        scene.add(spotlight);

        const geometry = chooseShape();

        if (data.texture != null) {
            texture = new THREE.TextureLoader().load(data.texture);
            material = new THREE.MeshBasicMaterial({
                map: texture,
            });
        } else {
            material = new THREE.MeshBasicMaterial({
                color: data.color,
            });
        }

        display = new THREE.Mesh(geometry, material);
        scene.add(display);
    };

    const animate = () => {
        display.rotation.x += data.xRotation;
        display.rotation.y += data.yRotation;
        display.rotation.z += data.zRotation;
        rendererRef.current?.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    useEffect(() => {
        initScene();
        animate();
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default Display;
