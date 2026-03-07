import { Router } from 'express';
import Donor from '../../models/Donor.js';

const router = Router();

// GET /api/admin/donors
router.get('/', async (req, res, next) => {
  try {
    const donors = await Donor.find().sort({ order: 1 });
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

    const donor = await new Donor({ name, location, type, order, isActive }).save();
    res.status(201).json({ success: true, data: donor });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/donors/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, location, order, isActive } = req.body;
    const type = req.body.type ? req.body.type.toLowerCase() : undefined;

    const updateFields = { name, location, order, isActive };
    if (type) updateFields.type = type;

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    res.json({ success: true, data: donor });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/donors/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    res.json({ success: true, message: 'Donor deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
