import mongoose from 'mongoose';

const siteImageSchema = new mongoose.Schema(
  {
    key:     { type: String, required: true, unique: true },
    label:   { type: String, required: true },
    section: {
      type: String,
      enum: ['home', 'about', 'campus', 'gallery'],
    },
    url:      { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const SiteImage = mongoose.model('SiteImage', siteImageSchema);
export default SiteImage;
