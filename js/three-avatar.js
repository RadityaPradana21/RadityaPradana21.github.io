/**
 * LADITTO PORTFOLIO — 3D Avatar Hero Scene
 * File: js/three-avatar.js
 *
 * - Profile photo as circular portrait in centre
 * - Skill logos (SVG/PNG) loaded as real textures → Sprites
 * - Each sprite orbits in a random 3D plane
 * - Camera zoomed out so ALL particles are fully visible
 */

(function initAvatarCanvas() {
  const canvas = document.getElementById('avatar-canvas');
  if (!canvas) return;

  const parent = canvas.parentElement;
  let w = parent.offsetWidth;
  let h = parent.offsetHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);

  const scene  = new THREE.Scene();
  // ── Camera zoomed out so outermost orbit ring (r≈3.8) fully fits ──
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.set(0, 0, 9.5);

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const light1 = new THREE.PointLight(0x6c63ff, 2.5, 30);
  light1.position.set(5, 5, 5); scene.add(light1);
  const light2 = new THREE.PointLight(0x43e8d8, 1.5, 25);
  light2.position.set(-5, -3, 4); scene.add(light2);
  const light3 = new THREE.PointLight(0xff6584, 1, 20);
  light3.position.set(0, -5, 3); scene.add(light3);

  const group = new THREE.Group();
  scene.add(group);

  /* ════════════════════════════════════════
     PROFILE PHOTO — circular crop
  ════════════════════════════════════════ */
  const PHOTO_R = 1.5;

  function buildPhotoMesh(tex) {
    const S = 512, c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.arc(S/2, S/2, S/2 - 2, 0, Math.PI*2);
    ctx.closePath(); ctx.clip();
    const img = tex.image;
    const iw = img.naturalWidth || img.width || S;
    const ih = img.naturalHeight || img.height || S;
    const sc = Math.max(S/iw, S/ih);
    ctx.drawImage(img, (S - iw*sc)/2, (S - ih*sc)/2, iw*sc, ih*sc);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(S/2, S/2, S/2 - 4, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(108,99,255,1)';
    ctx.lineWidth = 8; ctx.stroke();
    const ft = new THREE.CanvasTexture(c);
    return new THREE.Mesh(
      new THREE.CircleGeometry(PHOTO_R, 96),
      new THREE.MeshBasicMaterial({ map: ft, transparent: true, side: THREE.DoubleSide })
    );
  }

  if (DB.photo && DB.photo.trim() !== '') {
    new THREE.TextureLoader().load(DB.photo, tex => {
      group.add(buildPhotoMesh(tex));
      const ph = document.getElementById('avatar-placeholder');
      if (ph) ph.style.display = 'none';
    });
  }

  /* Glow ring */
  const glowRing = new THREE.Mesh(
    new THREE.RingGeometry(PHOTO_R + 0.02, PHOTO_R + 0.14, 96),
    new THREE.MeshBasicMaterial({ color:0x6c63ff, transparent:true, opacity:0.4, side:THREE.DoubleSide })
  );
  glowRing.position.z = -0.01;
  group.add(glowRing);

  /* Orbit guide rings — all fully inside camera FOV */
  function addRing(r, color, opacity, rx, ry) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.011, 8, 120),
      new THREE.MeshBasicMaterial({ color, transparent:true, opacity })
    );
    m.rotation.x = rx; m.rotation.y = ry||0;
    group.add(m); return m;
  }
  const rings = [
    addRing(2.2, 0x6c63ff, 0.22, Math.PI/3, 0),
    addRing(2.8, 0x43e8d8, 0.15, Math.PI/6, Math.PI/5),
    addRing(3.3, 0xff6584, 0.11, Math.PI/2, Math.PI/4),
    addRing(3.8, 0x6c63ff, 0.08, -Math.PI/4, Math.PI/3),
  ];

  /* ════════════════════════════════════════
     SKILL LOGO DEFINITIONS — Synced with DB.skills
     Converts DB.skills into orbiting sprite format
  ════════════════════════════════════════ */
  
  // Predefined fallback configs for common skill names
  const SKILL_FALLBACK_MAP = {
    'HTML 5': { bg:'#e34f26', draw:(x,s)=>txt(x,s,'HTML','5','#fff') },
    'CSS 3': { bg:'#264de4', draw:(x,s)=>txt(x,s,'CSS','3','#fff') },
    'JavaScript': { bg:'#f7df1e', draw:(x,s)=>txt(x,s,'JS','','#222') },
    'PHP': { bg:'#6181b6', draw:(x,s)=>txt(x,s,'PHP','','#fff') },
    'Laravel': { bg:'#ff2d20', draw:(x,s)=>txt(x,s,'L','','#fff') },
    'MySQL': { bg:'#005c84', draw:(x,s)=>txt(x,s,'My','SQL','#fff') },
    'Figma': { bg:'#1e1e1e', draw:(x,s)=>figmaDraw(x,s) },
    'Flutter': { bg:'#02569b', draw:(x,s)=>flutterDraw(x,s) },
    'Firebase': { bg:'#ff8f00', draw:(x,s)=>txt(x,s,'FB','','#fff') },
    'Canva': { bg:'#00c4cc', draw:(x,s)=>txt(x,s,'C','','#fff') },
    'VS Code': { bg:'#007acc', draw:(x,s)=>vscodeDraw(x,s) },
    'Python': { bg:'#3776ab', draw:(x,s)=>txt(x,s,'Py','','#fff') },
    'React': { bg:'#61dafb', draw:(x,s)=>txt(x,s,'⚛','React','#000') },
    'Node.js': { bg:'#68a063', draw:(x,s)=>txt(x,s,'Node','','#fff') },
    'TypeScript': { bg:'#3178c6', draw:(x,s)=>txt(x,s,'TS','','#fff') },
  };

  // Convert DB.skills to SKILL_LOGOS format
  const SKILL_LOGOS = DB.skills.map(skill => {
    const fallback = SKILL_FALLBACK_MAP[skill.name] || { bg:'#6c63ff', draw:(x,s)=>txt(x,s,skill.name.split(' ')[0],'','#fff') };
    return {
      name: skill.name,
      url: skill.icon || '',
      bg: fallback.bg,
      draw: fallback.draw
    };
  });

  /* ── Shared fallback drawing helpers ── */
  function txt(x, s, line1, line2, color) {
    x.fillStyle = color;
    if (line2) {
      x.font = `bold ${s*.26}px Arial`; x.textAlign='center'; x.textBaseline='middle';
      x.fillText(line1, s/2, s*.38);
      x.font = `bold ${s*.2}px Arial`;
      x.fillText(line2, s/2, s*.65);
    } else {
      x.font = `bold ${s*.34}px Arial`; x.textAlign='center'; x.textBaseline='middle';
      x.fillText(line1, s/2, s/2);
    }
  }
  function figmaDraw(x, s) {
    const r=s*.13, cx=s/2;
    [{dx:-r,dy:-r*1.55,c:'#f24e1e'},{dx:r,dy:-r*1.55,c:'#ff7262'},
     {dx:-r,dy:0,c:'#a259ff'},{dx:r,dy:0,c:'#1abcfe'},{dx:-r,dy:r*1.55,c:'#0acf83'}]
    .forEach(d=>{x.beginPath();x.arc(cx+d.dx,s/2+d.dy,r*.9,0,Math.PI*2);x.fillStyle=d.c;x.fill();});
  }
  function flutterDraw(x, s) {
    const cx=s/2, h=s*.28;
    x.fillStyle='#54c5f8'; x.beginPath();
    x.moveTo(cx-h*.6,s/2-h); x.lineTo(cx+h*.6,s/2-h*.15); x.lineTo(cx-h*.1,s/2+h*.3); x.closePath(); x.fill();
    x.fillStyle='#01579b'; x.beginPath();
    x.moveTo(cx-h*.1,s/2+h*.3); x.lineTo(cx+h*.6,s/2-h*.15); x.lineTo(cx+h*.4,s/2+h*.6); x.lineTo(cx-h*.3,s/2+h*.6); x.closePath(); x.fill();
    x.fillStyle='#29b6f6'; x.beginPath();
    x.moveTo(cx-h*.1,s/2+h*.3); x.lineTo(cx+h*.4,s/2+h*.6); x.lineTo(cx+h*.05,s/2+h*1.0); x.lineTo(cx-h*.3,s/2+h*.6); x.closePath(); x.fill();
  }
  function vscodeDraw(x, s) {
    x.strokeStyle='#fff'; x.lineWidth=s*.09; x.lineCap='round'; x.lineJoin='round';
    const cx=s/2, hw=s*.18, hh=s*.24;
    x.beginPath(); x.moveTo(cx-hw*.2,s/2-hh); x.lineTo(cx-hw*1.6,s/2); x.lineTo(cx-hw*.2,s/2+hh); x.stroke();
    x.beginPath(); x.moveTo(cx+hw*.2,s/2-hh); x.lineTo(cx+hw*1.6,s/2); x.lineTo(cx+hw*.2,s/2+hh); x.stroke();
  }
  function geminiDraw(x, s) {
    const cx=s/2,cy=s/2,r=s*.32,ri=s*.05;
    x.beginPath();
    for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/2,rr=i%2===0?r:ri;i===0?x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr):x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);}
    x.closePath();
    const g=x.createLinearGradient(cx-r,cy-r,cx+r,cy+r);
    g.addColorStop(0,'#4285f4');g.addColorStop(.4,'#9b72f7');g.addColorStop(1,'#ea4335');
    x.fillStyle=g; x.fill();
  }
  function chatgptDraw(x, s) {
    x.fillStyle='#fff';
    const cx=s/2,cy=s/2,r=s*.28,n=8;
    for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2,bx=cx+Math.cos(a)*r*.44,by=cy+Math.sin(a)*r*.44;x.beginPath();x.ellipse(bx,by,r*.3,r*.12,a,0,Math.PI*2);x.fill();}
    x.beginPath();x.arc(cx,cy,r*.19,0,Math.PI*2);x.fill();
  }
  function windsurfDraw(x, s) {
    x.strokeStyle='#00d4ff'; x.lineWidth=s*.07; x.lineCap='round';
    x.beginPath(); x.moveTo(s*.15,s*.68); x.quadraticCurveTo(s*.35,s*.42,s*.5,s*.22); x.quadraticCurveTo(s*.65,s*.42,s*.85,s*.68); x.stroke();
    x.strokeStyle='rgba(0,212,255,.45)'; x.lineWidth=s*.04;
    x.beginPath(); x.moveTo(s*.15,s*.8); x.quadraticCurveTo(s*.5,s*.58,s*.85,s*.8); x.stroke();
    x.fillStyle='rgba(0,212,255,.9)'; x.font=`bold ${s*.13}px Arial`;
    x.textAlign='center'; x.textBaseline='middle'; x.fillText('Windsurf',s/2,s*.91);
  }

  /* ════════════════════════════════════════
     BUILD SPRITE WITH LOGO TEXTURE
     Try loading real SVG logo → canvas fallback on error
  ════════════════════════════════════════ */
  const SZ = 128;   // canvas resolution
  const SC = 0.44;  // world scale per sprite

  function makeFallbackTex(def) {
    const c = document.createElement('canvas');
    c.width = c.height = SZ;
    const ctx = c.getContext('2d');
    // rounded square bg
    const rr = SZ*.22;
    ctx.beginPath();
    ctx.moveTo(rr,0); ctx.lineTo(SZ-rr,0); ctx.quadraticCurveTo(SZ,0,SZ,rr);
    ctx.lineTo(SZ,SZ-rr); ctx.quadraticCurveTo(SZ,SZ,SZ-rr,SZ);
    ctx.lineTo(rr,SZ); ctx.quadraticCurveTo(0,SZ,0,SZ-rr);
    ctx.lineTo(0,rr); ctx.quadraticCurveTo(0,0,rr,0); ctx.closePath();
    ctx.fillStyle = def.bg; ctx.fill();
    // inner glow
    const g = ctx.createRadialGradient(SZ/2,SZ/2,SZ*.05,SZ/2,SZ/2,SZ*.7);
    g.addColorStop(0,'rgba(255,255,255,.18)'); g.addColorStop(1,'rgba(0,0,0,.18)');
    ctx.fillStyle=g; ctx.fill();
    ctx.save(); def.draw(ctx, SZ); ctx.restore();
    // label text
    ctx.fillStyle='rgba(255,255,255,.9)';
    ctx.font=`600 ${SZ*.11}px Inter,Arial`;
    ctx.textAlign='center'; ctx.textBaseline='bottom';
    ctx.fillText(def.name, SZ/2, SZ-4);
    return new THREE.CanvasTexture(c);
  }

  function makeLogoTex(def, logoImg) {
    const c = document.createElement('canvas');
    c.width = c.height = SZ;
    const ctx = c.getContext('2d');
    // rounded square bg
    const rr = SZ*.22;
    ctx.beginPath();
    ctx.moveTo(rr,0); ctx.lineTo(SZ-rr,0); ctx.quadraticCurveTo(SZ,0,SZ,rr);
    ctx.lineTo(SZ,SZ-rr); ctx.quadraticCurveTo(SZ,SZ,SZ-rr,SZ);
    ctx.lineTo(rr,SZ); ctx.quadraticCurveTo(0,SZ,0,SZ-rr);
    ctx.lineTo(0,rr); ctx.quadraticCurveTo(0,0,rr,0); ctx.closePath();
    ctx.fillStyle = def.bg; ctx.fill();
    // inner glow
    const g = ctx.createRadialGradient(SZ/2,SZ/2,SZ*.05,SZ/2,SZ/2,SZ*.7);
    g.addColorStop(0,'rgba(255,255,255,.15)'); g.addColorStop(1,'rgba(0,0,0,.15)');
    ctx.fillStyle=g; ctx.fill();
    // draw the real logo image centred, leaving room for label
    const pad = SZ*.1, logoH = SZ*.56;
    const lw = logoImg.width||SZ, lh = logoImg.height||SZ;
    const ls = Math.min((SZ-pad*2)/lw, logoH/lh);
    ctx.drawImage(logoImg, (SZ-lw*ls)/2, pad*.8, lw*ls, lh*ls);
    // label
    ctx.fillStyle='rgba(255,255,255,.95)';
    ctx.font=`600 ${SZ*.11}px Inter,Arial`;
    ctx.textAlign='center'; ctx.textBaseline='bottom';
    ctx.fillText(def.name, SZ/2, SZ-4);
    return new THREE.CanvasTexture(c);
  }

  /* Orbit shells — 4 shells for 15 icons */
  const SHELLS = [
    { r:2.1,  ixB:0.25, ixR:0.5,  spdB:0.007, spdR:0.003 },
    { r:2.7,  ixB:0.7,  ixR:0.6,  spdB:0.005, spdR:0.003 },
    { r:3.25, ixB:1.1,  ixR:0.8,  spdB:0.004, spdR:0.002 },
    { r:3.75, ixB:0.05, ixR:1.0,  spdB:0.003, spdR:0.002 },
  ];

  const sprites = [];

  SKILL_LOGOS.forEach((def, i) => {
    const sh    = SHELLS[i % SHELLS.length];
    const angle = (i / SKILL_LOGOS.length) * Math.PI * 2 + Math.random() * 0.5;
    const ix    = sh.ixB + (Math.random()-.5) * sh.ixR;
    const iz    = Math.random() * Math.PI * 2;
    const spd   = (sh.spdB + Math.random() * sh.spdR) * (Math.random()>.5 ? 1 : -1);
    const r     = sh.r + (Math.random()-.5) * 0.25;
    const ud    = { r, angle, spd, ix, iz, bobAmp:0.1+Math.random()*.15, bobFreq:0.5+Math.random()*.9, phase:Math.random()*Math.PI*2 };

    // Create sprite with fallback first
    const mat    = new THREE.SpriteMaterial({ map: makeFallbackTex(def), transparent:true, opacity:.95, depthWrite:false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(SC, SC, 1);
    sprite.userData = ud;
    group.add(sprite);
    sprites.push(sprite);

    // Try loading real logo — replace texture if success
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      mat.map = makeLogoTex(def, img);
      mat.map.needsUpdate = true;
      mat.needsUpdate = true;
    };
    img.src = def.url;
  });

  /* ════════════════════════════════════════
     MOUSE / TOUCH PARALLAX
  ════════════════════════════════════════ */
  let tRX=0, tRY=0;
  document.addEventListener('mousemove', e => {
    tRY = (e.clientX/window.innerWidth -.5)*.8;
    tRX = (e.clientY/window.innerHeight-.5)*.5;
  });
  document.addEventListener('touchmove', e => {
    const t=e.touches[0];
    tRY=(t.clientX/window.innerWidth -.5)*.8;
    tRX=(t.clientY/window.innerHeight-.5)*.5;
  },{passive:true});

  window.addEventListener('resize', () => {
    w=parent.offsetWidth; h=parent.offsetHeight;
    renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();
  });

  /* ════════════════════════════════════════
     ANIMATION LOOP
  ════════════════════════════════════════ */
  let t = 0;
  (function loop(){
    requestAnimationFrame(loop);
    t += .008;

    group.rotation.y += (tRY - group.rotation.y) * .035;
    group.rotation.x += (tRX - group.rotation.x) * .035;

    rings[0].rotation.z =  t*.14;
    rings[1].rotation.y =  t*.10;
    rings[2].rotation.z = -t*.08;
    rings[3].rotation.y = -t*.06;

    sprites.forEach(sp => {
      const d=sp.userData;
      d.angle += d.spd;
      const cA=Math.cos(d.angle), sA=Math.sin(d.angle);
      const cX=Math.cos(d.ix),    sX=Math.sin(d.ix);
      const cZ=Math.cos(d.iz),    sZ=Math.sin(d.iz);
      let lx=d.r*cA, ly=d.r*sA;
      let rx=lx, ry=ly*cX, rz=ly*sX;
      let fx=rx*cZ-ry*sZ, fy=rx*sZ+ry*cZ, fz=rz;
      fy += Math.sin(t*d.bobFreq+d.phase)*d.bobAmp;
      sp.position.set(fx,fy,fz);
      sp.material.opacity = .72+Math.sin(t*1.1+d.phase)*.22;
      const sc=SC*(.9+Math.sin(t*.7+d.phase)*.1);
      sp.scale.set(sc,sc,1);
    });

    glowRing.material.opacity = .28+Math.sin(t*2)*.1;
    light1.intensity = 2.0+Math.sin(t*1.5)*.6;

    renderer.render(scene, camera);
  })();
})();
