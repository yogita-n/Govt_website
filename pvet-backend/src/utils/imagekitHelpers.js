import imagekit from '../config/imagekit.js';

/**
 * Upload a Buffer to ImageKit.
 * @param {Buffer} buffer    - File buffer from multer memoryStorage
 * @param {string} folder    - ImageKit folder path (e.g. 'pvet/activities/123')
 * @param {string|null} fileName - Optional fixed file name (omit for auto-unique)
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadToImageKit = (buffer, folder, fileName = null) => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file:            buffer,
        fileName:        fileName || `img_${Date.now()}`,
        folder,
        useUniqueFileName: !fileName,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url:      result.url,
          publicId: result.fileId, // fileId is ImageKit's equivalent of Cloudinary's publicId
        });
      }
    );
  });
};

/**
 * Delete an asset from ImageKit by its fileId.
 * Silently ignores empty/null values.
 * @param {string} fileId
 */
export const deleteFromImageKit = async (fileId) => {
  if (!fileId) return;
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error('ImageKit delete error (non-fatal):', error.message);
  }
};