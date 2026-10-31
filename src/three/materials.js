import * as THREE from 'three';

// Texture Loader helper
const textureLoader = new THREE.TextureLoader();

function loadPBRTexture(url, repeatX = 1, repeatY = 1) {
  const tex = textureLoader.load(url);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

// Poly Haven Textures with suitable UV tiling
export const TEXTURES = {
  facadeDiff: loadPBRTexture('/textures/facade_diff.jpg', 6, 6),
  facadeRough: loadPBRTexture('/textures/facade_rough.jpg', 6, 6),
  asphaltDiff: loadPBRTexture('/textures/asphalt_diff.jpg', 16, 16),
  asphaltRough: loadPBRTexture('/textures/asphalt_rough.jpg', 16, 16),
  pavementDiff: loadPBRTexture('/textures/pavement_diff.jpg', 12, 12),
  pavementRough: loadPBRTexture('/textures/pavement_rough.jpg', 12, 12),
  grassDiff: loadPBRTexture('/textures/grass_diff.jpg', 14, 14),
  grassRough: loadPBRTexture('/textures/grass_rough.jpg', 14, 14),
  concreteDiff: loadPBRTexture('/textures/concrete_diff.jpg', 10, 10),
  concreteRough: loadPBRTexture('/textures/concrete_rough.jpg', 10, 10),
};

// Procedural Canvas Bark Texture for realistic tree trunks
function createBarkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#3a2e24';
  ctx.fillRect(0, 0, 256, 512);

  // Vertical bark ridges
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 512;
    const h = 20 + Math.random() * 60;
    const w = 2 + Math.random() * 5;
    const shade = Math.floor(35 + Math.random() * 45);
    ctx.fillStyle = `rgb(${shade + 15}, ${shade + 5}, ${shade})`;
    ctx.fillRect(x, y, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  return texture;
}

// Procedural Canvas Foliage Leaf Noise Texture for organic tree crowns
function createFoliageTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#284d22';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 2800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 3 + Math.random() * 7;
    const gVal = Math.floor(70 + Math.random() * 85);
    const rVal = Math.floor(35 + Math.random() * 45);
    const bVal = Math.floor(20 + Math.random() * 30);
    ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.65, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Procedural Date Palm Trunk Texture with fibrous horizontal ring ridges
function createPalmTrunkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4c3c2e';
  ctx.fillRect(0, 0, 256, 512);

  for (let y = 0; y < 512; y += 10) {
    ctx.fillStyle = '#261e16';
    ctx.fillRect(0, y, 256, 3);
    ctx.fillStyle = '#655340';
    ctx.fillRect(0, y + 3, 256, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 6);
  return texture;
}

// Procedural Botanical Leaf Cluster Texture with Dense Natural Leaf Coverage
function createFoliageLeafTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  // Helper to draw realistic tapered pointed leaf
  function drawLeaf(lx, ly, len, ang, col, veinCol) {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(ang);
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-len * 0.42, -len * 0.32, -len * 0.36, -len * 0.8, 0, -len);
    ctx.bezierCurveTo(len * 0.36, -len * 0.8, len * 0.42, -len * 0.32, 0, 0);
    ctx.fill();

    // Leaf edge subtle shading
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Central leaf vein
    ctx.strokeStyle = veinCol;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len * 0.95);
    ctx.stroke();
    ctx.restore();
  }

  // Branch twigs
  ctx.strokeStyle = '#322316';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(256, 510);
  ctx.quadraticCurveTo(256, 320, 250, 110);
  ctx.stroke();

  const twigs = [
    [256, 430, 120, 350, 5],
    [256, 400, 390, 320, 5],
    [253, 310, 130, 210, 4],
    [251, 260, 380, 180, 4],
    [249, 190, 160, 110, 3.5],
    [247, 140, 340, 80, 3],
  ];
  twigs.forEach(([x1, y1, x2, y2, lw]) => {
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Dense overlapping foliage (120 leaves in varied natural tones for full, lush silhouettes)
  const leafColors = [
    '#1c3814', '#24481a', '#2c5620', '#366427', '#427431',
    '#50873b', '#2e5a22', '#396b2b', '#487f37', '#254a1d'
  ];
  const leafCount = 130;
  for (let i = 0; i < leafCount; i++) {
    const t = i / leafCount;
    const spread = 200 * Math.sin(t * Math.PI);
    const bx = 256 + (Math.sin(i * 4.3) * spread);
    const by = 40 + t * 440;
    const len = 38 + Math.sin(i * 2.1) * 16;
    const ang = (Math.sin(i * 3.1) * 1.4) + (bx > 256 ? 0.75 : -0.75);
    const col = leafColors[i % leafColors.length];
    drawLeaf(bx, by, len, ang, col, '#152c10');
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Botanical Date Palm Frond Texture with Pinnate Leaflets
function createPalmLeafTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 256);

  // Central Arching Rachis Rib
  ctx.strokeStyle = '#4e6827';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(20, 128);
  ctx.quadraticCurveTo(240, 126, 495, 128);
  ctx.stroke();

  // 56 Pairs of Slender Pointed Leaflets Radiating Outward
  const pairs = 56;
  for (let i = 2; i < pairs; i++) {
    const x = 20 + (i / pairs) * 475;
    const t = i / pairs;
    const maxLen = 92 * Math.sin(t * Math.PI);

    // Upper Leaflet
    ctx.strokeStyle = i % 2 === 0 ? '#224418' : '#326022';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x, 127);
    ctx.quadraticCurveTo(x + maxLen * 0.6, 127 - maxLen * 0.7, x + maxLen * 0.88, 127 - maxLen);
    ctx.stroke();

    // Lower Leaflet
    ctx.strokeStyle = i % 2 === 0 ? '#1b3813' : '#2b521d';
    ctx.beginPath();
    ctx.moveTo(x, 129);
    ctx.quadraticCurveTo(x + maxLen * 0.6, 129 + maxLen * 0.7, x + maxLen * 0.88, 129 + maxLen);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Jacaranda / Gulmohar Floral Blossom Texture
function createJacarandaFloralTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  const colors = ['#69327a', '#7e3e94', '#9648b0', '#ab5ac7', '#b96fd4', '#552864'];
  for (let i = 0; i < 220; i++) {
    const cx = 256 + (Math.sin(i * 3.7) * 190 * Math.random());
    const cy = 60 + Math.random() * 410;
    const r = 12 + Math.random() * 18;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Evergreen Cypress Needle Texture
function createCypressFoliageTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  const colors = ['#172e16', '#1f3c1e', '#264824', '#2d532b', '#1b3419'];
  for (let i = 0; i < 400; i++) {
    const cx = 256 + (Math.sin(i * 5.1) * 160 * (1 - (i / 400) * 0.7));
    const cy = 40 + (i / 400) * 440;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 26, (Math.random() - 0.5) * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

const barkTex = createBarkTexture();
const foliageTex = createFoliageTexture();
const palmTrunkTex = createPalmTrunkTexture();
const foliageLeafTex = createFoliageLeafTexture();
const palmLeafTex = createPalmLeafTexture();
const jacarandaFloralTex = createJacarandaFloralTexture();
const cypressFoliageTex = createCypressFoliageTexture();

// Master Architectural PBR Materials
export const ARCH_MATERIALS = {
  // Main building facade - Warm architectural limestone/stucco (recalibrated to prevent glare)
  // Main building facade - Warm architectural limestone/stucco
  wallIvory: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ece6da'),
    map: TEXTURES.facadeDiff,
    roughnessMap: TEXTURES.facadeRough,
    roughness: 0.84,
    metalness: 0.02,
    bumpMap: TEXTURES.facadeRough,
    bumpScale: 0.015,
  }),

  // Warm sand / camel beige for the prominent vertical pilasters and window surrounds
  wallSand: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbb79c'),
    map: TEXTURES.facadeDiff,
    roughnessMap: TEXTURES.facadeRough,
    roughness: 0.80,
    metalness: 0.03,
    bumpMap: TEXTURES.facadeRough,
    bumpScale: 0.02,
  }),

  // Backward compatible wallBeige (warm sand tone)
  wallBeige: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbb79c'),
    map: TEXTURES.facadeDiff,
    roughnessMap: TEXTURES.facadeRough,
    roughness: 0.80,
    metalness: 0.03,
    bumpMap: TEXTURES.facadeRough,
    bumpScale: 0.02,
  }),

  // Warm mocha / taupe accent for recessed balcony backwalls and window reveals (matching reference render)
  wallMocha: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#937f6d'),
    roughness: 0.85,
    metalness: 0.02,
  }),

  // Medium-dark taupe for recessed central staircase / open circulation lightwell
  wallStairCore: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#615548'),
    roughness: 0.88,
    metalness: 0.02,
  }),

  // Deep slate charcoal for recessed vertical service/shaft ducts & window spandrel panels
  shaftDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2e3137'),
    roughness: 0.88,
    metalness: 0.1,
  }),

  // Ribbed dark spandrel panel below bedroom windows
  spandrelDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#26292f'),
    roughness: 0.85,
    metalness: 0.15,
  }),

  // Architectural vertical fins and bands - Warm champagne bronze
  wallAccent: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b89d79'),
    roughness: 0.42,
    metalness: 0.35,
  }),

  // Deep bronze/terracotta architectural highlights & canopy
  wallWarmBronze: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5e4635'),
    roughness: 0.42,
    metalness: 0.4,
  }),

  // Rooftop 4 corner penthouses / canopy crowns
  rooftopCrown: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5e4635'),
    roughness: 0.48,
    metalness: 0.35,
  }),

  // Precast concrete pergola beams and rooftop louvers
  pergolaBeam: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#dcd6cb'),
    roughness: 0.82,
    metalness: 0.02,
  }),

  // Ground level stilt parking columns (pilotis)
  stiltColumn: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cec3b2'),
    roughness: 0.75,
    metalness: 0.04,
  }),

  // Dark charcoal window framing & mullions (dielectric finish)
  windowFrame: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22242a'),
    roughness: 0.38,
    metalness: 0.45,
  }),

  // Neutral linen curtains visible through patio and bedroom windows
  windowCurtains: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#eae5da'),
    roughness: 0.88,
  }),

  // Realistic architectural exterior window glass (dielectric, non-metallic, reflective HDRI sky)
  glassDay: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4a6a82'),
    roughness: 0.06,
    metalness: 0.08,
    envMapIntensity: 2.4,
  }),

  // Occupied interior window with warm interior illumination
  glassLit: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffe1a6'),
    emissive: new THREE.Color('#ffbe54'),
    emissiveIntensity: 0.75,
    roughness: 0.2,
    metalness: 0.08,
  }),

  // Night window glow
  glassNight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffd899'),
    emissive: new THREE.Color('#ffb042'),
    emissiveIntensity: 0.95,
    roughness: 0.25,
    metalness: 0.08,
  }),

  // Balcony railings (dark charcoal metal stanchions)
  railingDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#202328'),
    roughness: 0.35,
    metalness: 0.65,
  }),

  // Balcony glass balustrade (clear laminated glass with subtle blue tint)
  balconyGlass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#b5d8ea'),
    roughness: 0.06,
    metalness: 0.04,
    transmission: 0.72,
    transparent: true,
    opacity: 0.62,
    reflectivity: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),

  // Concrete floor slab edge (band) - Muted natural architectural precast concrete
  slabEdge: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d0c8bd'),
    map: TEXTURES.concreteDiff,
    roughnessMap: TEXTURES.concreteRough,
    roughness: 0.85,
    metalness: 0.02,
    bumpMap: TEXTURES.concreteRough,
    bumpScale: 0.02,
  }),

  // Selected floor glowing accent border/overlay
  floorGlow: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e0a96d'),
    emissive: new THREE.Color('#c59b6d'),
    emissiveIntensity: 0.55,
    roughness: 0.4,
    transparent: true,
    opacity: 0.9,
  }),

  // Ghosted transparent material for unselected floors in isolation mode
  ghostedFloor: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbd0d8'),
    roughness: 0.8,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  }),

  // Asphalt road with PBR maps
  roadAsphalt: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#24262c'),
    map: TEXTURES.asphaltDiff,
    roughnessMap: TEXTURES.asphaltRough,
    roughness: 0.88,
    metalness: 0.08,
  }),

  // Road white paint markings
  roadMarking: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f5f2e8'),
    roughness: 0.6,
  }),

  // Road yellow divider markings
  roadYellowMarking: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#eab308'),
    roughness: 0.55,
  }),

  // Concrete curb & sidewalks with cobblestone/paving maps
  concretePaving: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#dcd5c7'),
    map: TEXTURES.pavementDiff,
    roughnessMap: TEXTURES.pavementRough,
    roughness: 0.78,
    metalness: 0.04,
  }),

  // Landscaped grass lawn (rich natural turf with PBR maps)
  grassTurf: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#385e2e'),
    map: TEXTURES.grassDiff,
    roughnessMap: TEXTURES.grassRough,
    roughness: 0.9,
    metalness: 0.02,
    bumpMap: TEXTURES.grassRough,
    bumpScale: 0.04,
  }),

  // Central lawn accent vibrant green with PBR maps
  grassLawnCenter: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#467f37'),
    map: TEXTURES.grassDiff,
    roughnessMap: TEXTURES.grassRough,
    roughness: 0.86,
    metalness: 0.02,
    bumpMap: TEXTURES.grassRough,
    bumpScale: 0.03,
  }),

  // Terracotta / brick-red rubberized jogging track loop
  joggingTrack: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b3482d'),
    roughness: 0.78,
    metalness: 0.04,
  }),

  // Boulevard median landscaped grass with PBR maps
  roadMedian: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#386429'),
    map: TEXTURES.grassDiff,
    roughnessMap: TEXTURES.grassRough,
    roughness: 0.88,
    metalness: 0.02,
  }),

  // Children play area rubber flooring
  playSurfaceRed: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c95e34'),
    roughness: 0.75,
  }),
  playSurfaceBlue: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2f7a9e'),
    roughness: 0.75,
  }),

  // Water / Swimming Pool
  poolWater: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#12a3c7'),
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.6,
    ior: 1.333,
    transparent: true,
    opacity: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  }),

  // Tennis court blue
  tennisBlue: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#226597'),
    roughness: 0.82,
  }),

  // Tennis court green border
  tennisGreen: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2a7548'),
    roughness: 0.82,
  }),

  // Clubhouse & pergola teak wood
  teakWood: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#784e2a'),
    roughness: 0.55,
    metalness: 0.1,
  }),

  // Tree Bark
  treeBark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4a3b2c'),
    map: barkTex,
    roughness: 0.9,
    metalness: 0.02,
  }),

  // Palm Trunk with fibrous ring texture and bump map
  palmTrunk: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#584736'),
    map: palmTrunkTex,
    bumpMap: palmTrunkTex,
    bumpScale: 0.08,
    roughness: 0.88,
  }),

  // Tree Foliage Canopies with organic leaf micro-texture
  foliageCanopy: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2d5725'),
    map: foliageTex,
    bumpMap: foliageTex,
    bumpScale: 0.06,
    roughness: 0.72,
    metalness: 0.02,
  }),
  foliageLight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3d7532'),
    map: foliageTex,
    bumpMap: foliageTex,
    bumpScale: 0.06,
    roughness: 0.7,
    metalness: 0.02,
  }),
  palmFronds: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#255422'),
    map: foliageTex,
    bumpMap: foliageTex,
    bumpScale: 0.05,
    roughness: 0.62,
    metalness: 0.04,
  }),

  // Boxwood Hedge
  hedgeBoxwood: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#254d20'),
    map: foliageTex,
    roughness: 0.82,
  }),

  // Floral Accents (Magenta / Coral Bougainvillea)
  floralMagenta: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b32d5e'),
    roughness: 0.7,
  }),
  floralAmber: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d97724'),
    roughness: 0.7,
  }),

  // Automotive Clearcoat Metallic Paints
  carWhite: new THREE.MeshPhysicalMaterial({
    color: '#f8f8f8',
    roughness: 0.1,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),
  carCharcoal: new THREE.MeshPhysicalMaterial({
    color: '#1a1c20',
    roughness: 0.12,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),
  carSilver: new THREE.MeshPhysicalMaterial({
    color: '#a8adb4',
    roughness: 0.12,
    metalness: 0.92,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),
  carRed: new THREE.MeshPhysicalMaterial({
    color: '#9e1f1f',
    roughness: 0.12,
    metalness: 0.82,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),
  carBlue: new THREE.MeshPhysicalMaterial({
    color: '#1f4878',
    roughness: 0.12,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  }),

  // Detailed automotive materials for realistic 3D vehicles
  carGlass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0c1219'),
    roughness: 0.04,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.88,
  }),
  carTire: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#18191c'),
    roughness: 0.88,
    metalness: 0.08,
  }),
  carRim: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d4d8de'),
    roughness: 0.18,
    metalness: 0.92,
  }),
  carHeadlight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    emissive: new THREE.Color('#e0f2fe'),
    emissiveIntensity: 0.85,
    roughness: 0.08,
    metalness: 0.6,
  }),
  carTaillight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#991b1b'),
    emissive: new THREE.Color('#dc2626'),
    emissiveIntensity: 0.95,
    roughness: 0.15,
  }),
  carTrim: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1f242d'),
    roughness: 0.45,
    metalness: 0.4,
  }),

  // Botanical Foliage Card Material (Clean Cutout Masking - No transparent sorting artifacts)
  foliageCard: new THREE.MeshStandardMaterial({
    map: foliageLeafTex,
    alphaTest: 0.5,
    depthWrite: true,
    side: THREE.DoubleSide,
    roughness: 0.65,
    metalness: 0.02,
  }),

  // Botanical Palm Frond Material (Clean Cutout Masking)
  palmFrondCard: new THREE.MeshStandardMaterial({
    map: palmLeafTex,
    alphaTest: 0.5,
    depthWrite: true,
    side: THREE.DoubleSide,
    roughness: 0.58,
    metalness: 0.02,
  }),

  // Blooming Jacaranda / Gulmohar Floral Blossom Foliage
  floralJacaranda: new THREE.MeshStandardMaterial({
    map: jacarandaFloralTex,
    alphaTest: 0.5,
    depthWrite: true,
    side: THREE.DoubleSide,
    roughness: 0.65,
    metalness: 0.02,
  }),

  // Architectural Columnar Evergreen / Cypress Foliage
  cypressFoliage: new THREE.MeshStandardMaterial({
    map: cypressFoliageTex,
    alphaTest: 0.5,
    depthWrite: true,
    side: THREE.DoubleSide,
    roughness: 0.78,
    metalness: 0.02,
  }),
};
