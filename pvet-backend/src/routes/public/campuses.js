import { Router } from 'express';
import Campus from '../../models/Campus.js';

const router = Router();

// GET /api/public/campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.find().sort({ slug: 1 });
    res.json({ success: true, data: campuses });
  } catch (err) {
    next(err);
  }
});

export default router;
