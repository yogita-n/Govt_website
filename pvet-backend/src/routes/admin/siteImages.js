import { Router } from 'express';
import { db } from '../../config/firebase.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/site-images
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.collection('siteimages').get();
    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

    const imageRef = db.collection('siteimages').doc(req.params.key);
    const existing = await imageRef.get();

    // Delete old Cloudinary asset if one exists
    if (existing.exists && existing.data()?.publicId) {
      await deleteFromCloudinary(existing.data().publicId);
    }

    // Upload new image with a fixed publicId
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'pvet/static',
      `pvet/static/${req.params.key}`
    );

    await imageRef.set({ url, publicId }, { merge: true });

    const snap = await imageRef.get();
    res.json({ success: true, data: { id: snap.id, ...snap.data() } });
  } catch (err) {
    next(err);
  }
});

export default router;
