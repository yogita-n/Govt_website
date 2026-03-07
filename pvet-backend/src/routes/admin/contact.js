import { Router } from 'express';
import ContactInfo from '../../models/ContactInfo.js';

const router = Router();

// GET /api/admin/contact
router.get('/', async (req, res, next) => {
  try {
    const contact = await ContactInfo.findOne({ singletonKey: 'main' });
    res.json({ success: true, data: contact || {} });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/contact  — upsert singleton
router.put('/', async (req, res, next) => {
  try {
    const {
      email,
      phone,
      contactPersonName,
      contactPersonTitle,
      address,
      taxNote,
    } = req.body;

    const contact = await ContactInfo.findOneAndUpdate(
      { singletonKey: 'main' },
      {
        $set: {
          email,
          phone,
          contactPersonName,
          contactPersonTitle,
          address,
          taxNote,
        },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
});

export default router;
