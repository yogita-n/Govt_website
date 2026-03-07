import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    type: {
      type: String,
      enum: ['institutional', 'individual'],
      default: 'institutional',
    },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
