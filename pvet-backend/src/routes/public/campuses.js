import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/public/campuses
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.collection('campuses').orderBy('slug').get();
    const campuses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: campuses });
  } catch (err) {
    next(err);
  }
});

export default router;
