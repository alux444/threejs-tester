import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FormData } from "./FormInterface";

const Display = ({ data }: { data: FormData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(data);

  let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    display: THREE.Mesh;

  // "Capsule",
  // "Cone",
  // "Cylinder",
  // "Dodecahedron",
  // "Isocahedron",
  // "Octahedron",
  // "Sphere",
  // "Tetrahedtron",
  // "Torus",
  // "TorusKnot",

  const chooseShape = () => {
    let geometry;
    if (data.shape == "Capsule") {
      geometry = new THREE.CapsuleGeometry(5, 10, 10);
    } else if (data.shape == "Cone") {
      geometry = new THREE.ConeGeometry(5, 10, 10);
    } else if (data.shape == "Cylinder") {
      geometry = new THREE.CylinderGeometry(5, 10, 10);
    } else if (data.shape == "Dodecahedron") {
      geometry = new THREE.DodecahedronGeometry(5, 1);
    } else if (data.shape == "Icosahedron") {
      geometry = new THREE.IcosahedronGeometry(5, 1);
    } else if (data.shape == "Octahedron") {
      geometry = new THREE.OctahedronGeometry(5, 10);
    } else if (data.shape == "Sphere") {
      geometry = new THREE.SphereGeometry(5, 10, 10);
    } else if (data.shape == "Tetrahedron") {
      geometry = new THREE.TetrahedronGeometry(5, 10);
    } else if (data.shape == "Torus") {
      geometry = new THREE.TorusGeometry(5, 10, 10);
    } else if (data.shape == "TorusKnot") {
      geometry = new THREE.TorusKnotGeometry(5, 10, 10);
    } else {
      geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);
    }

    return geometry;
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
    const material = new THREE.MeshNormalMaterial();
    display = new THREE.Mesh(geometry, material);
    scene.add(display);
  };

  const animate = () => {
    display.rotation.x += 0.01;

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
