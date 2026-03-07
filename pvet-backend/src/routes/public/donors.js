import { Router } from 'express';
import Donor from '../../models/Donor.js';

const router = Router();

// GET /api/public/donors
router.get('/', async (req, res, next) => {
  try {
    const donors = await Donor.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: donors });
  } catch (err) {
    next(err);
  }
});

export default router;
