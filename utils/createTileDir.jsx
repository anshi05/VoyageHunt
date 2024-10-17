import RNFS from 'react-native-fs';

const TILE_DIR = `${RNFS.DocumentDirectoryPath}/tiles`;

// Function to create the directory if it doesn't exist
const createTileDir = async () => {
  const exists = await RNFS.exists(TILE_DIR);
  if (!exists) {
    await RNFS.mkdir(TILE_DIR);
  }
};

// Function to generate tile filename
const getTileFilePath = (z, x, y) => `${TILE_DIR}/${z}/${x}_${y}.png`;

// Function to download and cache the tile
export const cacheTile = async (url, z, x, y) => {
  await createTileDir();
  const filePath = getTileFilePath(z, x, y);
  
  // Check if the tile already exists
  const exists = await RNFS.exists(filePath);
  if (!exists) {
    // Download the tile if it doesn't exist
    const tileUrl = url.replace('{z}', z).replace('{x}', x).replace('{y}', y);
    const download = await RNFS.downloadFile({
      fromUrl: tileUrl,
      toFile: filePath,
    }).promise;

    if (download.statusCode !== 200) {
      console.error(`Failed to download tile: ${tileUrl}`);
    }
  }
  return filePath;
};
