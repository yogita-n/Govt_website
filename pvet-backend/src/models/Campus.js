import mongoose from 'mongoose';

const campusSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ['pvhs', 'kehps', 'nursery', 'library'],
    },
    title:       { type: String, required: true },
    subtitle:    { type: String, default: '' },
    description: { type: String, default: '' },
    image: {
      url:      { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    hasStats: { type: Boolean, default: false },
    stats: {
      boys:     { type: Number, default: 0 },
      girls:    { type: Number, default: 0 },
      teachers: { type: Number, default: 0 },
      head:     { type: String, default: '' },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Campus = mongoose.model('Campus', campusSchema);
export default Campus;
