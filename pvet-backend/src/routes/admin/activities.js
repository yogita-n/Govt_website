import { Router } from 'express';
import Activity from '../../models/Activity.js';
import upload from '../../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelpers.js';

const router = Router();

// GET /api/admin/activities?status=published|draft|all
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status === 'published') filter = { published: true };
    if (status === 'draft') filter = { published: false };

    const activities = await Activity.find(filter).sort({ date: -1 });
    res.json({ success: true, data: activities });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/activities/:id
router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity });
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

    const activity = await new Activity({
      title,
      date,
      category,
      description,
      published: published || false,
    }).save();

    res.status(201).json({ success: true, data: activity });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/activities/:id  — update text fields
router.put('/:id', async (req, res, next) => {
  try {
    const { title, date, category, description, published } = req.body;

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: { title, date, category, description, published } },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    res.json({ success: true, data: activity });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/activities/:id/publish  — toggle published flag
router.put('/:id/publish', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    activity.published = !activity.published;
    await activity.save();

    res.json({
      success: true,
      data: activity,
      message: `Activity ${activity.published ? 'published' : 'unpublished'}`,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/activities/:id/images  — upload images to existing activity
router.post('/:id/images', upload.array('images', 20), async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
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
    activity.images.push(...newImages);
    await activity.save();

    res.json({ success: true, data: activity });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/activities/:id/images/:imageIndex  — remove one image
router.delete('/:id/images/:imageIndex', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const imageIndex = parseInt(req.params.imageIndex, 10);
    if (isNaN(imageIndex) || imageIndex < 0 || imageIndex >= activity.images.length) {
      return res.status(400).json({ success: false, message: 'Invalid image index' });
    }

    const imageToDelete = activity.images[imageIndex];

    // Clean up Cloudinary asset first
    if (imageToDelete?.publicId) {
      await deleteFromCloudinary(imageToDelete.publicId);
    }

    activity.images.splice(imageIndex, 1);
    await activity.save();

    res.json({ success: true, data: activity });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/activities/:id  — delete activity + all its Cloudinary images
router.delete('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Clean up all Cloudinary assets
    const deletePromises = activity.images
      .filter((img) => img.publicId)
      .map((img) => deleteFromCloudinary(img.publicId));
    await Promise.all(deletePromises);

    await Activity.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Activity deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
