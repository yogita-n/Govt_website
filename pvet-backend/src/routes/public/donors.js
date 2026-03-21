import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/public/donors
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db
      .collection('donors')
      .where('isActive', '==', true)
      .orderBy('order')
      .get();

    const donors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: donors });
  } catch (err) {
    next(err);
  }
});

export default router;
