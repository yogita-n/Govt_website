import { Router } from 'express';
import Activity from '../../models/Activity.js';

const router = Router();

// GET /api/public/activities
router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.find({ published: true }).sort({ date: -1 });
    res.json({ success: true, data: activities });
  } catch (err) {
    next(err);
  }
});

export default router;
