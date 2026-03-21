import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/public/contact
router.get('/', async (req, res, next) => {
  try {
    const snap = await db.collection('contactinfos').doc('main').get();
    // Return empty object if not seeded yet — frontend handles gracefully
    res.json({ success: true, data: snap.exists ? { id: snap.id, ...snap.data() } : {} });
  } catch (err) {
    next(err);
  }
});

export default router;
