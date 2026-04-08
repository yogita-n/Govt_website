import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/public/activities
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db
      .collection('activities')
      .where('published', '==', true)
      .orderBy('date', 'desc')
      .get();

    const activities = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: activities });
  } catch (err) {
    next(err);
  }
});

export default router;
