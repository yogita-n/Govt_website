import { Router } from 'express';
import { db } from '../../config/firebase.js';

const router = Router();

// GET /api/admin/donors
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.collection('donors').orderBy('order').get();
    const donors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: donors });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/donors
router.post('/', async (req, res, next) => {
  try {
    const { name, location, order, isActive } = req.body;
    const type = req.body.type ? req.body.type.toLowerCase() : 'institutional';

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Donor name is required' });
    }

    const data = { name, location: location || '', type, order: order ?? 0, isActive: isActive ?? true };
    const ref = await db.collection('donors').add(data);
    res.status(201).json({ success: true, data: { id: ref.id, ...data } });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/donors/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, location, order, isActive } = req.body;
    const type = req.body.type ? req.body.type.toLowerCase() : undefined;

    const donorRef = db.collection('donors').doc(req.params.id);
    const snap = await donorRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    const updateFields = { name, location, order, isActive };
    if (type) updateFields.type = type;

    await donorRef.update(updateFields);

    res.json({ success: true, data: { id: snap.id, ...snap.data(), ...updateFields } });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/donors/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const donorRef = db.collection('donors').doc(req.params.id);
    const snap = await donorRef.get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    await donorRef.delete();

    res.json({ success: true, message: 'Donor deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
