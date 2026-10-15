'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '@/data/products';
import { RotateCw, Eye, Sparkles, BookOpen } from 'lucide-react';

interface ThreeBookCanvasProps {
  currentProduct: Product;
  onSelectProduct?: (product: Product) => void;
  allProducts?: Product[];
  onOpenReader?: (product: Product) => void;
  className?: string;
}

export default function ThreeBookCanvas({
  currentProduct,
  onSelectProduct,
  allProducts = [],
  onOpenReader,
  className = '',
}: ThreeBookCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'perspective' | 'front' | 'spine'>('perspective');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bookGroupRef = useRef<THREE.Group | null>(null);
  const frontCoverPivotRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: -0.6 });

  // Generate high-resolution canvas texture for the book cover
  const createCoverTexture = (product: Product, isFront: boolean = true) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const isHuberman = product.slug === 'the-huberman-blueprint';

    // Background gradient: Deep Navy/Obsidian
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1480);
    if (isHuberman) {
      gradient.addColorStop(0, '#09121D');
      gradient.addColorStop(0.35, '#112033');
      gradient.addColorStop(0.7, '#1D3147');
      gradient.addColorStop(1, '#0B1622');
    } else {
      gradient.addColorStop(0, '#050E1A');
      gradient.addColorStop(0.35, '#0A192F');
      gradient.addColorStop(0.7, '#172A45');
      gradient.addColorStop(1, '#050E1A');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1480);

    // Subtle paper noise / cloth texture lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1480; i += 6) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Outer gold foil frame
    ctx.strokeStyle = isHuberman ? 'rgba(212, 163, 115, 0.65)' : 'rgba(212, 175, 55, 0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 924, 1380);
    ctx.strokeStyle = isHuberman ? 'rgba(224, 122, 95, 0.35)' : 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(62, 62, 900, 1356);

    // Decorative corner markers
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = isHuberman ? 'rgba(224, 122, 95, 0.8)' : 'rgba(212, 175, 55, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(0, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();
      ctx.restore();
    };
    drawCorner(75, 75, 0);
    drawCorner(949, 75, Math.PI / 2);
    drawCorner(949, 1405, Math.PI);
    drawCorner(75, 1405, (3 * Math.PI) / 2);

    if (isFront) {
      // Top Masterclass Pill
      ctx.fillStyle = 'rgba(10, 25, 47, 0.85)';
      ctx.strokeStyle = isHuberman ? 'rgba(212, 163, 115, 0.6)' : 'rgba(212, 175, 55, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(260, 150, 504, 48, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHuberman ? '#D4A373' : '#D4AF37';
      ctx.font = 'bold 18px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText(
        isHuberman ? 'BASED ON THE VIRAL INTERVIEW' : 'BASED ON THE IN-DEPTH MASTERCLASS',
        512,
        180
      );

      // Emblem
      ctx.save();
      ctx.translate(512, 330);
      if (isHuberman) {
        const brainGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 85);
        brainGlow.addColorStop(0, 'rgba(224, 122, 95, 0.45)');
        brainGlow.addColorStop(0.7, 'rgba(212, 163, 115, 0.15)');
        brainGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = brainGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 85, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '72px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧠', 0, 0);
      } else {
        const globeGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
        globeGlow.addColorStop(0, 'rgba(45, 212, 191, 0.35)');
        globeGlow.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
        globeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = globeGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.fill();

        const sphereGrad = ctx.createLinearGradient(-45, -45, 45, 45);
        sphereGrad.addColorStop(0, '#38BDF8');
        sphereGrad.addColorStop(0.5, '#0D9488');
        sphereGrad.addColorStop(1, '#0369A1');
        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 52, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Main Book Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '3px';
      ctx.fillText(isHuberman ? 'THE HUBERMAN' : 'THE STUDY ABROAD', 512, 530);

      // Accent Word
      ctx.fillStyle = isHuberman ? '#E07A5F' : '#E63946';
      ctx.font = 'bold 84px "Playfair Display", Georgia, serif';
      ctx.letterSpacing = '5px';
      ctx.fillText(isHuberman ? 'BLUEPRINT' : 'PLAYBOOK', 512, 620);

      // Gold divider line
      ctx.fillStyle = isHuberman ? '#D4A373' : '#D4AF37';
      ctx.fillRect(432, 665, 160, 4);

      // Subtitle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '400 27px -apple-system, sans-serif';
      ctx.letterSpacing = '0.5px';
      if (isHuberman) {
        ctx.fillText("A Neuroscientist's Complete System to Train Your Brain for", 512, 730);
        ctx.fillText('Peak Performance, Unbreakable Resilience & Deep Rest', 512, 775);
      } else {
        ctx.fillText('How to Win the Global Education Game,', 512, 730);
        ctx.fillText('Secure High-Paying Careers & Avoid the 1-Crore Debt Trap', 512, 775);
      }

      // Credentials Section
      ctx.fillStyle = isHuberman ? 'rgba(224, 122, 95, 0.95)' : 'rgba(212, 175, 55, 0.95)';
      ctx.font = 'bold 22px -apple-system, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText(
        isHuberman ? 'INSIGHTS FROM DR. ANDREW HUBERMAN' : 'INSIGHTS FROM DR. KARAN GUPTA',
        512,
        1220
      );

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '500 18px -apple-system, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText(
        isHuberman
          ? 'STANFORD NEUROSCIENTIST & HOST OF HUBERMAN LAB'
          : 'HARVARD BUSINESS SCHOOL ALUMNUS · COUNSELOR TO 100,000+ STUDENTS',
        512,
        1260
      );

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '16px -apple-system, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('WITH RAJ SHAMANI · FIRST EDITION 2026', 512, 1300);

      // Left spine crease gradient highlight
      const spineGlow = ctx.createLinearGradient(0, 0, 80, 0);
      spineGlow.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      spineGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.12)');
      spineGlow.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
      spineGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spineGlow;
      ctx.fillRect(0, 0, 80, 1480);
    } else {
      // Inside first page / Back cover
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(50, 50, 924, 1380);

      ctx.fillStyle = '#0A192F';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(isHuberman ? 'The Huberman Blueprint' : 'The Study Abroad Playbook', 512, 280);

      ctx.fillStyle = isHuberman ? '#E07A5F' : '#E63946';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.fillText(
        isHuberman ? 'By Dr. Andrew Huberman & Raj Shamani' : 'By Dr. Karan Gupta & Raj Shamani',
        512,
        340
      );

      ctx.strokeStyle = isHuberman ? '#D4A373' : '#D4AF37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(350, 390);
      ctx.lineTo(674, 390);
      ctx.stroke();

      ctx.fillStyle = '#1E293B';
      ctx.font = '24px Georgia, serif';
      ctx.textAlign = 'center';
      if (isHuberman) {
        ctx.fillText('"The person who can turn their mind off in the final hour', 512, 520);
        ctx.fillText('will surpass the grinder within 5 to 10 years."', 512, 565);
      } else {
        ctx.fillText('"If you take a heavy loan for an average degree abroad,', 512, 520);
        ctx.fillText('do not go. We will find you something in India."', 512, 565);
      }

      ctx.fillStyle = isHuberman ? '#E07A5F' : '#E63946';
      ctx.font = 'bold 20px -apple-system, sans-serif';
      ctx.fillText(
        isHuberman ? '— DR. ANDREW HUBERMAN (STANFORD)' : '— DR. KARAN GUPTA (HARVARD ALUMNUS)',
        512,
        620
      );

      ctx.fillStyle = '#475569';
      ctx.font = '22px -apple-system, sans-serif';
      ctx.fillText(
        isHuberman
          ? 'Full 54-Page Master Edition · Instant PDF Access'
          : 'Full 12-Chapter Master Edition · Instant PDF Access',
        512,
        750
      );
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Generate Spine Texture
  const createSpineTexture = (product: Product) => {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 1480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const isHuberman = product.slug === 'the-huberman-blueprint';

    ctx.fillStyle = isHuberman ? '#09121D' : '#050E1A';
    ctx.fillRect(0, 0, 160, 1480);

    // Spine shading
    const grad = ctx.createLinearGradient(0, 0, 160, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.6)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.15)');
    grad.addColorStop(0.7, 'rgba(0,0,0,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 160, 1480);

    // Spine text rotated 90 degrees
    ctx.save();
    ctx.translate(80, 740);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText(product.title.toUpperCase(), 0, 10);

    ctx.fillStyle = isHuberman ? '#D4A373' : '#D4AF37';
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(isHuberman ? 'DR. ANDREW HUBERMAN' : 'DR. KARAN GUPTA', 0, 50);
    ctx.restore();

    // Top & bottom golden bands
    ctx.fillStyle = isHuberman ? '#D4A373' : '#D4AF37';
    ctx.fillRect(20, 50, 120, 6);
    ctx.fillRect(20, 1420, 120, 6);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xcfd9cf, 1.0);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe8d0b2, 1.4);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    // 5. Build Realistic 3D Book
    const bookWidth = 2.4;
    const bookHeight = 3.4;
    const bookThickness = 0.45;
    const coverThickness = 0.04;

    const bookGroup = new THREE.Group();
    bookGroupRef.current = bookGroup;
    scene.add(bookGroup);

    // Textures
    const frontCoverTexture = createCoverTexture(currentProduct, true);
    const insideCoverTexture = createCoverTexture(currentProduct, false);
    const spineTexture = createSpineTexture(currentProduct);

    // Paper Pages Texture (Side ridges)
    const paperCanvas = document.createElement('canvas');
    paperCanvas.width = 128;
    paperCanvas.height = 512;
    const paperCtx = paperCanvas.getContext('2d');
    if (paperCtx) {
      paperCtx.fillStyle = '#FAF6EC';
      paperCtx.fillRect(0, 0, 128, 512);
      paperCtx.fillStyle = '#E8E2D1';
      for (let i = 0; i < 512; i += 3) {
        paperCtx.fillRect(0, i, 128, 1);
      }
    }
    const pagesTexture = new THREE.CanvasTexture(paperCanvas);
    pagesTexture.wrapS = THREE.RepeatWrapping;
    pagesTexture.wrapT = THREE.RepeatWrapping;
    pagesTexture.repeat.set(2, 8);

    // Back Cover Mesh
    const backCoverGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, coverThickness);
    const backCoverMaterial = new THREE.MeshStandardMaterial({
      color: currentProduct.slug === 'the-focus-reset' ? 0x16221b : 0x1d1410,
      roughness: 0.35,
      metalness: 0.1,
    });
    const backCover = new THREE.Mesh(backCoverGeometry, backCoverMaterial);
    backCover.position.set(0, 0, -bookThickness / 2);
    backCover.castShadow = true;
    backCover.receiveShadow = true;
    bookGroup.add(backCover);

    // Paper Block Mesh (Interior pages block)
    const pagesGeometry = new THREE.BoxGeometry(bookWidth - 0.08, bookHeight - 0.08, bookThickness - coverThickness * 2);
    const pagesMaterial = new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.85,
      metalness: 0.0,
      color: 0xFDFBF7,
    });
    const pagesBlock = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pagesBlock.position.set(0.02, 0, 0);
    pagesBlock.castShadow = true;
    pagesBlock.receiveShadow = true;
    bookGroup.add(pagesBlock);

    // Spine Mesh
    const spineGeometry = new THREE.BoxGeometry(coverThickness, bookHeight, bookThickness);
    const spineMaterial = new THREE.MeshStandardMaterial({
      map: spineTexture,
      roughness: 0.3,
      metalness: 0.15,
    });
    const spineMesh = new THREE.Mesh(spineGeometry, spineMaterial);
    spineMesh.position.set(-bookWidth / 2, 0, 0);
    spineMesh.castShadow = true;
    bookGroup.add(spineMesh);

    // Front Cover (Pivot on the spine so it can open!)
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-bookWidth / 2, 0, bookThickness / 2);
    frontCoverPivotRef.current = frontCoverPivot;
    bookGroup.add(frontCoverPivot);

    const frontCoverGeo = new THREE.BoxGeometry(bookWidth, bookHeight, coverThickness);
    // Materials for front cover [right, left, top, bottom, front, back]
    const goldTrimMaterial = new THREE.MeshStandardMaterial({ color: 0x987642, roughness: 0.3, metalness: 0.6 });
    const spineSideMaterial = new THREE.MeshStandardMaterial({ color: 0x121714 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontCoverTexture,
      roughness: 0.28,
      metalness: 0.12,
    });
    const insideMat = new THREE.MeshStandardMaterial({
      map: insideCoverTexture,
      roughness: 0.5,
      metalness: 0.0,
    });

    const frontCoverMaterials = [
      goldTrimMaterial, // right
      spineSideMaterial, // left
      goldTrimMaterial, // top
      goldTrimMaterial, // bottom
      frontMat, // front
      insideMat, // inside
    ];

    const frontCoverMesh = new THREE.Mesh(frontCoverGeo, frontCoverMaterials);
    frontCoverMesh.position.set(bookWidth / 2, 0, 0);
    frontCoverMesh.castShadow = true;
    frontCoverPivot.add(frontCoverMesh);

    // Silk Ribbon Bookmark Hanging
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, bookHeight / 2 - 0.1, 0),
      new THREE.Vector3(0.3, 0, 0.05),
      new THREE.Vector3(0.5, -bookHeight / 2 - 0.4, 0.15),
      new THREE.Vector3(0.65, -bookHeight / 2 - 0.7, 0.18),
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 20, 0.035, 8, false);
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xBC8A5F, roughness: 0.4, metalness: 0.2 });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    bookGroup.add(ribbonMesh);

    // Soft Shadow Plane below book
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(15, 18, 20, 0.38)');
      grad.addColorStop(0.4, 'rgba(15, 18, 20, 0.15)');
      grad.addColorStop(1, 'rgba(15, 18, 20, 0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.1;
    scene.add(shadowMesh);

    // Floating Dust / Sparkles
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xDFCBB5,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating levitation
      if (bookGroupRef.current) {
        bookGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

        // Auto-rotation when active
        if (isRotating && !isDraggingRef.current) {
          targetRotationRef.current.y += 0.006;
        }

        // Smooth rotation damping
        bookGroupRef.current.rotation.x += (targetRotationRef.current.x - bookGroupRef.current.rotation.x) * 0.08;
        bookGroupRef.current.rotation.y += (targetRotationRef.current.y - bookGroupRef.current.rotation.y) * 0.08;
      }

      // Smooth Open/Close book hinge animation
      if (frontCoverPivotRef.current) {
        const targetOpenAngle = isOpen ? -Math.PI * 0.75 : 0;
        const currentAngle = frontCoverPivotRef.current.rotation.y;
        frontCoverPivotRef.current.rotation.y += (targetOpenAngle - currentAngle) * 0.1;
      }

      // Slowly rotate dust particles
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) {
        // Subtle perspective parallax tracking
        const rect = container.getBoundingClientRect();
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        if (!isRotating) {
          targetRotationRef.current.x = THREE.MathUtils.clamp(normY * 0.3, -0.6, 0.6);
        }
        return;
      }

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = THREE.MathUtils.clamp(
        targetRotationRef.current.x + deltaY * 0.008,
        -0.8,
        0.8
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x = THREE.MathUtils.clamp(
        targetRotationRef.current.x + deltaY * 0.01,
        -0.8,
        0.8
      );
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      scene.clear();
    };
  }, [currentProduct, isRotating, isOpen]);

  // Preset view buttons
  const setPresetView = (mode: 'perspective' | 'front' | 'spine') => {
    setViewMode(mode);
    setIsRotating(false);
    if (mode === 'front') {
      targetRotationRef.current = { x: 0, y: 0 };
    } else if (mode === 'spine') {
      targetRotationRef.current = { x: 0, y: Math.PI / 2 };
    } else {
      targetRotationRef.current = { x: 0.2, y: -0.6 };
    }
  };

  return (
    <div className={`relative w-full h-[460px] md:h-[560px] select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        aria-label={`Interactive 3D Book viewer for ${currentProduct.title}. Click and drag to rotate.`}
      />

      {/* Floating 3D Interaction Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-charcoal-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-elevated z-10 text-xs text-ivory-100">
        {/* Toggle Auto Spin */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
            isRotating ? 'bg-sage-600 text-white font-medium' : 'hover:bg-white/10 text-ivory-200'
          }`}
          title="Toggle 3D Auto Spin"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isRotating ? 'Spinning' : 'Rotate'}</span>
        </button>

        {/* Toggle Open Cover */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsRotating(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
            isOpen ? 'bg-terracotta-500 text-white font-medium' : 'hover:bg-white/10 text-ivory-200'
          }`}
          title="Open or Close 3D Cover"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Close Cover' : 'Open Cover'}</span>
        </button>

        {/* View Angle Presets */}
        <div className="h-4 w-px bg-white/20 mx-0.5" />
        <button
          onClick={() => setPresetView('front')}
          className={`px-2.5 py-1.5 rounded-full transition-colors ${
            viewMode === 'front' && !isRotating ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-ivory-300'
          }`}
        >
          Front
        </button>
        <button
          onClick={() => setPresetView('spine')}
          className={`px-2.5 py-1.5 rounded-full transition-colors ${
            viewMode === 'spine' && !isRotating ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-ivory-300'
          }`}
        >
          Spine
        </button>
        <button
          onClick={() => setPresetView('perspective')}
          className={`px-2.5 py-1.5 rounded-full transition-colors ${
            viewMode === 'perspective' && !isRotating ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-ivory-300'
          }`}
        >
          3D Angle
        </button>

        {/* "Look Inside" Trigger */}
        {onOpenReader && (
          <>
            <div className="h-4 w-px bg-white/20 mx-0.5" />
            <button
              onClick={() => onOpenReader(currentProduct)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory-100 text-charcoal-900 font-medium hover:bg-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-sage-600" />
              <span>Read Sample</span>
            </button>
          </>
        )}
      </div>

      {/* Product Switcher Pills (If multiple products provided) */}
      {allProducts.length > 1 && onSelectProduct && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1.5 bg-ivory-100/90 backdrop-blur-md border border-stone-200/80 rounded-full shadow-soft max-w-[95%] overflow-x-auto">
          {allProducts.map((prod) => (
            <button
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                prod.id === currentProduct.id
                  ? 'bg-charcoal-800 text-ivory-100 font-medium shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-stone-200/50'
              }`}
            >
              {prod.title}
            </button>
          ))}
        </div>
      )}

      {/* 3D Drag Tip Badge */}
      <div className="absolute top-4 right-4 pointer-events-none hidden md:flex items-center gap-1.5 text-[11px] text-charcoal-400 bg-ivory-100/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-stone-200/60">
        <Sparkles className="w-3 h-3 text-sage-500" />
        <span>Drag to rotate in 3D</span>
      </div>
    </div>
  );
}
