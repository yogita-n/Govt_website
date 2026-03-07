import { Router } from 'express';
import ContactInfo from '../../models/ContactInfo.js';

const router = Router();

// GET /api/public/contact
router.get('/', async (req, res, next) => {
  try {
    const contact = await ContactInfo.findOne({ singletonKey: 'main' });
    // Return empty object if not seeded yet — frontend handles gracefully
    res.json({ success: true, data: contact || {} });
  } catch (err) {
    next(err);
  }
});

export default router;
