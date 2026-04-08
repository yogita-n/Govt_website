import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/public/site-images
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.collection('siteimages').get();
    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
});

export default router;
