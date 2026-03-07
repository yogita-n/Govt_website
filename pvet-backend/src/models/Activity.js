import mongoose from 'mongoose';

const activityImageSchema = new mongoose.Schema(
  {
    url:      { type: String, default: '' },
    publicId: { type: String, default: '' },
    caption:  { type: String, default: '' },
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    date:        { type: Date },
    category: {
      type: String,
      enum: ['Cultural', 'Academic', 'Sports', 'Infrastructure', 'Other'],
      default: 'Other',
    },
    description: { type: String, default: '' },
    images:      [activityImageSchema],
    published:   { type: Boolean, default: false },
    createdBy:   { type: String, default: 'admin' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
