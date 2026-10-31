const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${path.basename(destPath)} (${fs.statSync(destPath).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function fetchModel(id, destDir) {
  console.log(`\nFetching metadata for model: ${id}...`);
  const meta = await new Promise((resolve, reject) => {
    https.get(`https://api.polyhaven.com/files/${id}`, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const gltfInfo = meta.gltf?.['1k']?.gltf;
  if (!gltfInfo) throw new Error(`No 1k gltf found for ${id}`);

  // 1. Download .gltf
  const gltfFileName = path.basename(gltfInfo.url);
  await downloadFile(gltfInfo.url, path.join(destDir, gltfFileName));

  // 2. Download includes (.bin and textures)
  const includes = gltfInfo.include || {};
  for (const [relPath, info] of Object.entries(includes)) {
    const targetFile = path.join(destDir, relPath);
    await downloadFile(info.url, targetFile);
  }
  return gltfFileName;
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');

  // Textures
  console.log('--- Downloading PBR Textures ---');
  await downloadFile(
    'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/leafy_grass/leafy_grass_diff_1k.jpg',
    path.join(publicDir, 'textures', 'grass_diff.jpg')
  );
  await downloadFile(
    'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/leafy_grass/leafy_grass_rough_1k.jpg',
    path.join(publicDir, 'textures', 'grass_rough.jpg')
  );
  await downloadFile(
    'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brushed_concrete_2/brushed_concrete_2_diff_1k.jpg',
    path.join(publicDir, 'textures', 'concrete_diff.jpg')
  );
  await downloadFile(
    'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brushed_concrete_2/brushed_concrete_2_rough_1k.jpg',
    path.join(publicDir, 'textures', 'concrete_rough.jpg')
  );

  // Models
  console.log('\n--- Downloading 3D GLTF Models ---');
  try {
    await fetchModel('painted_wooden_bench', path.join(publicDir, 'models', 'bench'));
    await fetchModel('street_lamp_01', path.join(publicDir, 'models', 'lamp'));
    await fetchModel('wild_rooibos_bush', path.join(publicDir, 'models', 'bush'));
    console.log('\nAll assets successfully downloaded and stored locally in /public!');
  } catch (err) {
    console.error('Error downloading models:', err.message);
  }
}

main().catch(console.error);
