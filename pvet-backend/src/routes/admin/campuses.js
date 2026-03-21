import { Router } from 'express';
import { db } from '../../config/firebase.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/campuses
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.collection('campuses').orderBy('slug').get();
    const campuses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: campuses });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/campuses/:slug  — update text fields
router.put('/:slug', async (req, res, next) => {
  try {
    const { title, subtitle, description, stats } = req.body;
    const campusRef = db.collection('campuses').doc(req.params.slug);
    const snap = await campusRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Campus not found' });
    }

    const updateData = { title, subtitle, description, stats };
    await campusRef.update(updateData);

    res.json({ success: true, data: { id: snap.id, ...snap.data(), ...updateData } });
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

    const campusRef = db.collection('campuses').doc(req.params.slug);
    const snap = await campusRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Campus not found' });
    }

    // Delete old image from Cloudinary if it exists
    if (snap.data().image?.publicId) {
      await deleteFromCloudinary(snap.data().image.publicId);
    }

    // Upload new image — fixed publicId keeps the same CDN URL
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'pvet/campuses',
      `pvet/campuses/${req.params.slug}`
    );

    await campusRef.update({ image: { url, publicId } });

    res.json({ success: true, data: { id: snap.id, ...snap.data(), image: { url, publicId } } });
  } catch (err) {
    next(err);
  }
});

export default router;
