/**
 * LADITTO PORTFOLIO — 3D Background Canvas
 * File: js/three-bg.js
 * Depends on: THREE (r128) loaded before this script
 */

(function initBgCanvas() {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  /* Particles */
  const count = 3000;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  const col   = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i*3]   = (Math.random() - .5) * 20;
    pos[i*3+1] = (Math.random() - .5) * 20;
    pos[i*3+2] = (Math.random() - .5) * 20;
    const t    = Math.random();
    col[i*3]   = t < .5 ? .42 + t * .3 : .27;
    col[i*3+1] = t < .5 ? .39 + t * .2 : .91;
    col[i*3+2] = t < .5 ? 1 : .85;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat       = new THREE.PointsMaterial({ size:.03, vertexColors:true, transparent:true, opacity:.6, sizeAttenuation:true });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  /* Subtle grid */
  const gridLines = [];
  for (let i = -10; i <= 10; i++) {
    gridLines.push(-10,-5,i, 10,-5,i, i,-5,-10, i,-5,10);
  }
  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(gridLines), 3));
  scene.add(new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color:0x6c63ff, transparent:true, opacity:.05 })));

  /* Mouse */
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - .5) * 2;
    mouseY = (e.clientY / window.innerHeight - .5) * 2;
  });

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += .001;
    particles.rotation.y = t * .1 + mouseX * .05;
    particles.rotation.x = mouseY * .05;
    camera.position.x += (mouseX * .3 - camera.position.x) * .02;
    camera.position.y += (-mouseY * .2 - camera.position.y) * .02;
    renderer.render(scene, camera);
  })();
})();
