import { Router } from 'express';
import Campus from '../../models/Campus.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.find().sort({ slug: 1 });
    res.json({ success: true, data: campuses });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/campuses/:slug  — update text fields
router.put('/:slug', async (req, res, next) => {
  try {
    const { title, subtitle, description, stats } = req.body;

    const campus = await Campus.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { title, subtitle, description, stats } },
      { new: true, runValidators: true }
    );

    if (!campus) {
      return res.status(404).json({ success: false, message: 'Campus not found' });
    }

    res.json({ success: true, data: campus });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/campuses/:slug/image  — replace campus image
router.put('/:slug/image', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const campus = await Campus.findOne({ slug: req.params.slug });
    if (!campus) {
      return res.status(404).json({ success: false, message: 'Campus not found' });
    }

    // Delete old image from Cloudinary if it exists
    if (campus.image?.publicId) {
      await deleteFromCloudinary(campus.image.publicId);
    }

    // Upload new image — fixed publicId keeps the same CDN URL
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'pvet/campuses',
      `pvet/campuses/${req.params.slug}`
    );

    const updated = await Campus.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { image: { url, publicId } } },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
