import { Router } from 'express';
import SiteImage from '../../models/SiteImage.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/site-images
router.get('/', async (req, res, next) => {
  try {
    const images = await SiteImage.find();
    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/site-images/:key  — replace a static site image
router.put('/:key', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const existing = await SiteImage.findOne({ key: req.params.key });

    // Delete old Cloudinary asset if one exists
    if (existing?.publicId) {
      await deleteFromCloudinary(existing.publicId);
    }

    // Upload new image with a fixed publicId
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'pvet/static',
      `pvet/static/${req.params.key}`
    );

    const updated = await SiteImage.findOneAndUpdate(
      { key: req.params.key },
      { $set: { url, publicId } },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
