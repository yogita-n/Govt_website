import { Router } from 'express';
import { db } from '../../config/firebase.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/activities?status=published|draft|all
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = db.collection('activities');

    if (status === 'published') {
      query = query.where('published', '==', true);
    } else if (status === 'draft') {
      query = query.where('published', '==', false);
    }

    query = query.orderBy('date', 'desc');
    const snapshot = await query.get();
    const activities = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({ success: true, data: activities });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/activities/:id
router.get('/:id', async (req, res, next) => {
  try {
    const snap = await db.collection('activities').doc(req.params.id).get();
    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: { id: snap.id, ...snap.data() } });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/activities  — create (images uploaded separately)
router.post('/', async (req, res, next) => {
  try {
    const { title, date, category, description, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Activity title is required' });
    }

    const data = {
      title,
      date: date || null,
      category: category || '',
      description: description || '',
      published: published || false,
      images: [],
    };

    const ref = await db.collection('activities').add(data);
    res.status(201).json({ success: true, data: { id: ref.id, ...data } });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/activities/:id  — update text fields
router.put('/:id', async (req, res, next) => {
  try {
    const { title, date, category, description, published } = req.body;
    const activityRef = db.collection('activities').doc(req.params.id);
    const snap = await activityRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const updateData = { title, date, category, description, published };
    await activityRef.update(updateData);

    res.json({ success: true, data: { id: snap.id, ...snap.data(), ...updateData } });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/activities/:id/publish  — toggle published flag
router.put('/:id/publish', async (req, res, next) => {
  try {
    const activityRef = db.collection('activities').doc(req.params.id);
    const snap = await activityRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const newPublished = !snap.data().published;
    await activityRef.update({ published: newPublished });

    const updated = { id: snap.id, ...snap.data(), published: newPublished };
    res.json({
      success: true,
      data: updated,
      message: `Activity ${newPublished ? 'published' : 'unpublished'}`,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/activities/:id/images  — upload images to existing activity
router.post('/:id/images', upload.array('images', 20), async (req, res, next) => {
  try {
    const activityRef = db.collection('activities').doc(req.params.id);
    const snap = await activityRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images provided' });
    }

    // Parse optional captions array
    let captions = [];
    try {
      captions = JSON.parse(req.body.captions || '[]');
    } catch {
      captions = [];
    }

    // Upload each file to Cloudinary
    const uploadPromises = req.files.map((file, i) =>
      uploadToCloudinary(file.buffer, `pvet/activities/${req.params.id}`)
        .then(({ url, publicId }) => ({
          url,
          publicId,
          caption: captions[i] || '',
        }))
    );

    const newImages = await Promise.all(uploadPromises);
    const existing = snap.data().images || [];
    const merged = [...existing, ...newImages];

    await activityRef.update({ images: merged });

    res.json({ success: true, data: { id: snap.id, ...snap.data(), images: merged } });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/activities/:id/images/:imageIndex  — remove one image
router.delete('/:id/images/:imageIndex', async (req, res, next) => {
  try {
    const activityRef = db.collection('activities').doc(req.params.id);
    const snap = await activityRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const images = [...(snap.data().images || [])];
    const imageIndex = parseInt(req.params.imageIndex, 10);

    if (isNaN(imageIndex) || imageIndex < 0 || imageIndex >= images.length) {
      return res.status(400).json({ success: false, message: 'Invalid image index' });
    }

    const imageToDelete = images[imageIndex];

    // Clean up Cloudinary asset first
    if (imageToDelete?.publicId) {
      await deleteFromCloudinary(imageToDelete.publicId);
    }

    images.splice(imageIndex, 1);
    await activityRef.update({ images });

    res.json({ success: true, data: { id: snap.id, ...snap.data(), images } });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/activities/:id  — delete activity + all its Cloudinary images
router.delete('/:id', async (req, res, next) => {
  try {
    const activityRef = db.collection('activities').doc(req.params.id);
    const snap = await activityRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Clean up all Cloudinary assets
    const deletePromises = (snap.data().images || [])
      .filter((img) => img.publicId)
      .map((img) => deleteFromCloudinary(img.publicId));
    await Promise.all(deletePromises);

    await activityRef.delete();

    res.json({ success: true, message: 'Activity deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
