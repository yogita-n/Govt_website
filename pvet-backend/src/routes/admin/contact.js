import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/admin/contact
router.get('/', async (req, res, next) => {
  try {
    const snap = await db.collection('contactinfos').doc('main').get();
    res.json({ success: true, data: snap.exists ? { id: snap.id, ...snap.data() } : {} });
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

    const data = { email, phone, contactPersonName, contactPersonTitle, address, taxNote };
    await db.collection('contactinfos').doc('main').set(data, { merge: true });

    const snap = await db.collection('contactinfos').doc('main').get();
    res.json({ success: true, data: { id: snap.id, ...snap.data() } });
  } catch (err) {
    next(err);
  }
});

export default router;
