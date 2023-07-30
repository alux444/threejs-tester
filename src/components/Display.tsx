import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Display = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    display: THREE.Mesh;

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
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);
    //   const material = new THREE.MeshBasicMaterial({ map: faceTexture });
    const material = new THREE.MeshBasicMaterial();
    display = new THREE.Mesh(boxGeometry, material);
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
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Display;
