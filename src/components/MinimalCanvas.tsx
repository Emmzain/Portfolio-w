'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MinimalCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.innerWidth <= 768) return; // Disable WebGL on mobile to prevent performance lag

    // Use parent container bounding box for correct height/width allocation (avoids any layout cutting)
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || 500;
    const height = rect.height || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera - Adjusted FOV and position slightly back to accommodate scale-up without edge clipping
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 8.5;

    // Renderer with high antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Dynamic 3D Object Group representing "Programming / Web Dev Laptop"
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Color Palette
    const accentColor = 0x0d9488; // Teal
    const greyColor = 0x555555;   // Dark Grey

    // 1. Laptop Base (Bottom Keyboard part)
    const baseGeom = new THREE.BoxGeometry(3.0, 0.1, 2.0);
    const baseMat = new THREE.MeshBasicMaterial({
      color: greyColor,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const laptopBase = new THREE.Mesh(baseGeom, baseMat);
    laptopBase.position.y = -0.55;
    laptopGroup.add(laptopBase);

    // Keyboard Trackpad wireframe outline
    const padGeom = new THREE.BoxGeometry(0.8, 0.02, 0.5);
    const padMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const trackpad = new THREE.Mesh(padGeom, padMat);
    trackpad.position.set(0, -0.49, 0.5);
    laptopGroup.add(trackpad);

    // 2. Laptop Screen (Top display part, angled slightly back)
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, -0.5, -0.95); // Pivot at the back hinge
    laptopGroup.add(screenGroup);

    const lidGeom = new THREE.BoxGeometry(3.0, 1.9, 0.08);
    const lidMat = new THREE.MeshBasicMaterial({
      color: greyColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const screenLid = new THREE.Mesh(lidGeom, lidMat);
    screenLid.position.y = 0.95; // Shift center up so screen rotates around bottom pivot
    screenGroup.add(screenLid);

    // Screen Bezel Inner Display Area
    const displayGeom = new THREE.PlaneGeometry(2.8, 1.7);
    const displayMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const displayScreen = new THREE.Mesh(displayGeom, displayMat);
    displayScreen.position.set(0, 0.95, 0.05);
    screenGroup.add(displayScreen);

    // 3. Floating Code Window emerging from the screen (representing Web Dev)
    const codeWinGeom = new THREE.PlaneGeometry(1.6, 1.1);
    const codeWinMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });
    const codeWindow = new THREE.Mesh(codeWinGeom, codeWinMat);
    codeWindow.position.set(0.4, 0.8, 0.6); // Hovering in front of screen
    laptopGroup.add(codeWindow);

    // Brackets/lines inside the code window
    const codeLinesGroup = new THREE.Group();
    codeWindow.add(codeLinesGroup);

    // Render tiny horizontal wireframe lines representing programmatic syntax
    const lineMat = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.6
    });

    const createCodeLine = (yOffset: number, length: number, xShift: number) => {
      const points = [];
      points.push(new THREE.Vector3(-0.6 + xShift, yOffset, 0.02));
      points.push(new THREE.Vector3(-0.6 + xShift + length, yOffset, 0.02));
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMat);
      codeLinesGroup.add(line);
    };

    createCodeLine(0.3, 0.4, 0);       // import ...
    createCodeLine(0.1, 0.8, 0.1);     // function dev() {
    createCodeLine(-0.1, 0.6, 0.2);    //   return code;
    createCodeLine(-0.3, 0.2, 0.1);     // }

    // Keyboard keys (represented by particles grid on the base)
    const keysCount = 24;
    const keysGeometry = new THREE.BufferGeometry();
    const keysPositions = new Float32Array(keysCount * 3);
    for (let i = 0; i < keysCount; i++) {
      const row = Math.floor(i / 6);
      const col = i % 6;
      keysPositions[i * 3] = -1.0 + col * 0.4 + (Math.random() - 0.5) * 0.05;
      keysPositions[i * 3 + 1] = -0.48;
      keysPositions[i * 3 + 2] = -0.7 + row * 0.4 + (Math.random() - 0.5) * 0.05;
    }
    keysGeometry.setAttribute('position', new THREE.BufferAttribute(keysPositions, 3));
    const keysMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: accentColor,
      transparent: true,
      opacity: 0.6
    });
    const keyboardKeys = new THREE.Points(keysGeometry, keysMaterial);
    laptopGroup.add(keyboardKeys);

    // Set Initial Angle for Laptop screen lid opening
    screenGroup.rotation.x = -0.2; // Slightly open angled back

    // Mouse Interaction variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse positions (-1 to 1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Map to subtle rotation offsets
      targetRotationY = mouse.x * 0.5;
      targetRotationX = -mouse.y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation (lerp) from base rotation + mouse interactive hover rotation
      const baseRotationY = elapsedTime * 0.15;
      laptopGroup.rotation.y += (baseRotationY + targetRotationY - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (targetRotationX - laptopGroup.rotation.x) * 0.05;

      // Gentle breathing float effect
      laptopGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Make code window float slightly faster/independent
      codeWindow.position.y = 0.8 + Math.cos(elapsedTime * 2.0) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // GSAP ScrollTrigger Animation: Scale up organically, move backward (bg), and fade out completely
    const anim = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });

    // Animate scale (reduced visual scale target on zoom to guarantee it never cuts 4 sides)
    anim.to(laptopGroup.scale, {
      x: 2.2,
      y: 2.2,
      z: 2.2,
      ease: 'none'
    }, 0);

    anim.to([baseMat, lidMat, displayMat, codeWinMat, keysMaterial, lineMat], {
      opacity: 0,
      ease: 'power2.out',
      stagger: 0.02
    }, 0.2);

    // Handle Resize (Re-calculates clientBoundingRect to avoid clipping)
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Initial trigger to match canvas bounds correctly
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Replaced old cleanup logic with correct geometry and material resource disposals
      baseGeom.dispose();
      baseMat.dispose();
      padGeom.dispose();
      padMat.dispose();
      lidGeom.dispose();
      lidMat.dispose();
      displayGeom.dispose();
      displayMat.dispose();
      codeWinGeom.dispose();
      codeWinMat.dispose();
      lineMat.dispose();
      keysGeometry.dispose();
      keysMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'visible' /* Ensures no edges are clipped */
      }}
    />
  );
}
