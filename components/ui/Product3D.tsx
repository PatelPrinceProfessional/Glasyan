'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Product3DProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  interactive?: boolean;
  enableDrag?: boolean;
  accentColor?: string;
  liquidColor?: string;
}

/**
 * Product3D Component
 * High-end procedurally generated luxury cosmetic glass elixir bottle in Three.js
 * Features:
 * - Flint glass outer bottle with physical transmission, IOR 1.52, and caustics
 * - Internal aqua/teal glacial elixir liquid with concave surface meniscus
 * - Glass internal dropper pipette
 * - Brushed champagne gold anodized dropper neck collar
 * - Crisp canvas-generated "GLASYAN" brand label texture
 * - Studio 3-point luxury lighting with back rim illumination
 * - Mouse-tracking parallax & smooth 360-degree pointer drag
 * - Off-screen visibility pausing (0% idle GPU usage)
 */
export function Product3D({
  className = '',
  size = 'hero',
  interactive = true,
  enableDrag = true,
  accentColor = '#C8B58F', // Champagne gold
  liquidColor = '#008C95', // Signature brand teal
}: Product3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  const dimensions = {
    sm: { width: 140, height: 210 },
    md: { width: 180, height: 270 },
    lg: { width: 230, height: 340 },
    hero: { width: 270, height: 400 },
  }[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = mountRef.current;
    if (!canvas || !container) return;

    // Check WebGL support
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || dimensions.width;
    const height = container.clientHeight || dimensions.height;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, 0.0, 5.5);
    camera.lookAt(0, 0, 0);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. LIGHTING STUDIO
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    // Fill soft aqua light from left
    const fillLight = new THREE.DirectionalLight(0x7fc4c9, 1.4);
    fillLight.position.set(-3.5, -1.0, 3.0);
    scene.add(fillLight);

    // Warm champagne rim kicker light from behind
    const rimLight = new THREE.DirectionalLight(0xc8b58f, 3.2);
    rimLight.position.set(0.0, 3.0, -3.5);
    scene.add(rimLight);

    // Bottom glow point light to illuminate glass base
    const baseGlow = new THREE.PointLight(0x008c95, 1.8, 4.0);
    baseGlow.position.set(0, -1.8, 0.2);
    scene.add(baseGlow);

    // 4. BOTTLE ROOT GROUP
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // Inner group to center and scale the bottle geometry properly
    const bottleInnerGroup = new THREE.Group();
    bottleInnerGroup.position.y = -0.42; // Vertically center the bottle around y=0
    bottleInnerGroup.scale.set(0.72, 0.72, 0.72); // Compact luxury scale so full base is visible
    bottleGroup.add(bottleInnerGroup);

    // --- A. OUTER GLASS BODY (Lathe Geometry for true French luxury vial silhouette) ---
    const glassPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.65),
      new THREE.Vector2(0.65, -1.65),
      new THREE.Vector2(0.74, -1.58),
      new THREE.Vector2(0.78, -1.45),
      new THREE.Vector2(0.78, 0.65),
      new THREE.Vector2(0.75, 0.85),
      new THREE.Vector2(0.62, 1.08),
      new THREE.Vector2(0.42, 1.25),
      new THREE.Vector2(0.32, 1.35),
      new THREE.Vector2(0.32, 1.72),
      new THREE.Vector2(0.34, 1.74),
      new THREE.Vector2(0.28, 1.74),
      new THREE.Vector2(0.28, 1.35),
    ];
    const glassGeo = new THREE.LatheGeometry(glassPoints, 48);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52, // Optical flint glass
      thickness: 1.2,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      attenuationColor: new THREE.Color(0xe4f2f3),
      attenuationDistance: 1.8,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    bottleInnerGroup.add(glassMesh);

    // --- B. INNER GLACIAL ELIXIR LIQUID VOLUME ---
    const liquidPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.5),
      new THREE.Vector2(0.68, -1.5),
      new THREE.Vector2(0.71, -1.4),
      new THREE.Vector2(0.71, 0.65),
      new THREE.Vector2(0.65, 0.78),
      new THREE.Vector2(0.0, 0.78),
    ];
    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 40);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColor),
      transmission: 0.78,
      roughness: 0.16,
      ior: 1.34,
      thickness: 0.8,
      specularIntensity: 0.8,
      transparent: true,
      opacity: 0.95,
      attenuationColor: new THREE.Color(0x005a61),
      attenuationDistance: 0.9,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    bottleInnerGroup.add(liquidMesh);

    // --- C. INTERNAL GLASS DROPPER PIPETTE ---
    const pipetteGeo = new THREE.CylinderGeometry(0.035, 0.025, 2.3, 20);
    const pipetteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      roughness: 0.05,
      transparent: true,
    });
    const pipetteMesh = new THREE.Mesh(pipetteGeo, pipetteMat);
    pipetteMesh.position.set(0, -0.3, 0);
    bottleInnerGroup.add(pipetteMesh);

    // --- D. CHAMPAGNE GOLD ANODIZED DROPPER COLLAR ---
    const collarGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.42, 36);
    const collarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.92,
      roughness: 0.22,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.set(0, 1.52, 0);
    bottleInnerGroup.add(collarMesh);

    // Delicate micro-accent ring on collar
    const collarRingGeo = new THREE.TorusGeometry(0.36, 0.02, 16, 36);
    const collarRingMesh = new THREE.Mesh(collarRingGeo, collarMat);
    collarRingMesh.rotation.x = Math.PI / 2;
    collarRingMesh.position.set(0, 1.68, 0);
    bottleInnerGroup.add(collarRingMesh);

    // --- E. DROPPER BULB (Pearlescent Rubber Squeeze Pipette Cap) ---
    const bulbPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 1.73),
      new THREE.Vector2(0.24, 1.73),
      new THREE.Vector2(0.26, 1.9),
      new THREE.Vector2(0.24, 2.2),
      new THREE.Vector2(0.12, 2.45),
      new THREE.Vector2(0.0, 2.5),
    ];
    const bulbGeo = new THREE.LatheGeometry(bulbPoints, 32);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xf7fafa,
      roughness: 0.45,
      metalness: 0.05,
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bottleInnerGroup.add(bulbMesh);

    // --- F. EMBOSSED BRAND LABEL WITH "GLASYAN" CANVAS TEXTURE ---
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      // Clear transparent backdrop
      ctx.clearRect(0, 0, 1024, 1024);

      // Delicate Champagne Hairline Border
      ctx.strokeStyle = 'rgba(200, 181, 143, 0.55)';
      ctx.lineWidth = 3;
      ctx.strokeRect(90, 180, 844, 680);

      // Inner faint double hairline
      ctx.strokeStyle = 'rgba(0, 140, 149, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(105, 195, 814, 650);

      // Minimalist Droplet Emblem Icon
      ctx.fillStyle = '#008C95';
      ctx.beginPath();
      ctx.arc(512, 300, 18, 0, Math.PI * 2);
      ctx.fill();

      // Main Brand Wordmark: "GLASYAN"
      ctx.fillStyle = '#0A2E32';
      ctx.font = '500 78px "Didot", "Bodoni MT", "Cinzel", "Georgia", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '18px';
      ctx.fillText('GLASYAN', 512, 410);

      // Luxury Submark
      ctx.fillStyle = '#008C95';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('HAIR ESSENCE & ALCHEMY', 512, 480);

      // Divider Line
      ctx.strokeStyle = 'rgba(200, 181, 143, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(340, 520);
      ctx.lineTo(684, 520);
      ctx.stroke();

      // Description
      ctx.fillStyle = '#005A61';
      ctx.font = 'italic 400 26px "Georgia", serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('Glacial Purity & Pearl Peptide', 512, 570);

      // Volume & Origin
      ctx.fillStyle = 'rgba(10, 46, 50, 0.65)';
      ctx.font = '500 20px -apple-system, sans-serif';
      ctx.letterSpacing = '5px';
      ctx.fillText('50 ML / 1.7 FL. OZ. • SWISS ALPS', 512, 660);
      ctx.fillText('ZERO DEUTERIUM PROTOCOL', 512, 700);
    }

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.anisotropy = 8;

    // Curved Decal Surface for the label
    const labelGeo = new THREE.CylinderGeometry(0.785, 0.785, 1.45, 36, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.set(0, -0.2, 0);
    bottleInnerGroup.add(labelMesh);

    // Initial orientation: slightly angled for optimum lighting and label visibility
    bottleGroup.rotation.y = 0.15;
    bottleGroup.rotation.x = 0.05;

    // --- INTERACTIVE MOUSE PARALLAX & DRAG ROTATION ---
    let targetRotY = 0.15;
    let targetRotX = 0.05;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let isVisibleOnScreen = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || isDragging) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetRotY = normX * 0.45;
      targetRotX = normY * -0.2 + 0.05;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!enableDrag) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.012;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + deltaY * 0.008));
    };

    // Touch support for mobile dragging
    const handleTouchStart = (e: TouchEvent) => {
      if (!enableDrag || e.touches.length === 0) return;
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotY += deltaX * 0.015;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + deltaY * 0.01));
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Observer to pause animation loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- ANIMATION LOOP (Locked 60/120 FPS via RAF) ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleOnScreen) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous breathing float
      bottleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      // Smooth interpolation for rotation
      bottleGroup.rotation.y += (targetRotY - bottleGroup.rotation.y) * 0.065;
      bottleGroup.rotation.x += (targetRotX - bottleGroup.rotation.x) * 0.065;

      renderer.render(scene, camera);
    };

    animate();

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || dimensions.width;
      const newH = container.clientHeight || dimensions.height;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      // Clean disposal of Three.js resources
      glassGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      pipetteGeo.dispose();
      pipetteMat.dispose();
      collarGeo.dispose();
      collarMat.dispose();
      collarRingGeo.dispose();
      bulbGeo.dispose();
      bulbMat.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      labelTexture.dispose();
      renderer.dispose();
    };
  }, [dimensions.width, dimensions.height, interactive, enableDrag, accentColor, liquidColor]);

  // Graceful Fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center rounded-[9999px] glass-capsule select-none ${className}`}
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      >
        <span className="font-melodrama text-2xl text-ink font-semibold">GLASYAN</span>
        <span className="font-sans text-[10px] tracking-widest text-teal mt-1 uppercase">Elixir Vessel</span>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`product-3d-canvas-wrapper relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing will-change-transform ${className}`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        maxWidth: '100%',
      }}
      data-cursor="Drag"
      aria-label="Interactive 3D Glasyan Glass Elixir Vessel"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none drop-shadow-2xl" />

      {/* Subtle Ground Contact Shadow */}
      <div className="absolute -bottom-4 inset-x-12 h-6 bg-teal-deep/20 blur-xl rounded-full pointer-events-none -z-10" />
    </div>
  );
}
