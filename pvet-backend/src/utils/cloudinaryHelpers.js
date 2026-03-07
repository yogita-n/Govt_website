import cloudinary from '../config/cloudinary.js';

/**
 * Upload a Buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} folder - Cloudinary folder path
 * @param {string|null} publicId - Optional fixed public_id (enables overwrite/same URL)
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadToCloudinary = (buffer, folder, publicId = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: 'image',
    };

    if (publicId) {
      options.public_id = publicId;
      options.overwrite = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({
        url:      result.secure_url,
        publicId: result.public_id,
      });
    });

    uploadStream.end(buffer);
  });
};

/**
 * Delete an asset from Cloudinary by its public_id.
 * Silently ignores empty/null publicIds.
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error (non-fatal):', error.message);
  }
};
