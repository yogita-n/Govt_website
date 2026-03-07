import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'main',
      unique: true,
    },
    email:               { type: String, default: '' },
    phone:               { type: String, default: '' },
    contactPersonName:   { type: String, default: '' },
    contactPersonTitle:  { type: String, default: '' },
    address:             { type: String, default: '' },
    taxNote: {
      type: String,
      default:
        'Registered under Section 12A of the Income Tax Act, 1961 and qualifies under Section 80G (5)(iv)-(v). Donations are eligible for tax deduction.',
    },
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
export default ContactInfo;
