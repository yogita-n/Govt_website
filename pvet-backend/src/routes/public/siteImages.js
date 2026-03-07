import { Router } from 'express';
import SiteImage from '../../models/SiteImage.js';

const router = Router();

// GET /api/public/site-images
router.get('/', async (req, res, next) => {
  try {
    const images = await SiteImage.find();
    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
});

export default router;
