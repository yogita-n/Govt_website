import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import SiteImage from '../models/SiteImage.js';
import Campus from '../models/Campus.js';
import ContactInfo from '../models/ContactInfo.js';

/* ─────────────────────────────────────────────
   Seed Admin
───────────────────────────────────────────── */
export async function seedAdmin() {
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await Admin.create({ email: process.env.ADMIN_EMAIL, password: hashed });
    console.log('✓ Admin seeded');
  }
}

/* ─────────────────────────────────────────────
   Seed Site Images
───────────────────────────────────────────── */
export async function seedSiteImages() {
  const images = [
    { key: 'hero_banner',      label: 'Home Page Hero Banner',   section: 'home',   url: '', publicId: '' },
    { key: 'school_gate',      label: 'School Entrance Gate',    section: 'home',   url: '', publicId: '' },
    { key: 'founder_portrait', label: 'Founder V.K. Veerappa',   section: 'about',  url: '', publicId: '' },
    { key: 'campus_map',       label: 'Campus Layout Map',       section: 'campus', url: '', publicId: '' },
  ];

  for (const img of images) {
    await SiteImage.findOneAndUpdate(
      { key: img.key },
      { $setOnInsert: img },
      { upsert: true, new: true }
    );
  }
  console.log('✓ Site images seeded');
}

/* ─────────────────────────────────────────────
   Seed Campuses
───────────────────────────────────────────── */
export async function seedCampuses() {
  const campuses = [
    {
      slug:        'pvhs',
      title:       'Pramila Veerappa High School (PVHS)',
      subtitle:    'Classes VIII – X Standard',
      description: 'The High School block serves students from Class VIII to X. Government-aided and taught entirely in Kannada medium.',
      hasStats:    true,
      stats:       { boys: 38, girls: 42, teachers: 9, head: 'Headmaster' },
    },
    {
      slug:        'kehps',
      title:       'Kempamma Eregowda Higher Primary School (KEHPS)',
      subtitle:    'Classes I – VII Standard',
      description: 'The Primary School block serves students from Class I to VII. Government-aided with a full teaching staff.',
      hasStats:    true,
      stats:       { boys: 71, girls: 50, teachers: 9, head: 'Headmistress' },
    },
    {
      slug:        'nursery',
      title:       'Nursery Block',
      subtitle:    'LKG & UKG',
      description: 'The Nursery block provides early childhood education in a green, open environment with dedicated play areas.',
      hasStats:    false,
    },
    {
      slug:        'library',
      title:       'Library & Computer Lab',
      subtitle:    'Digital Learning Centre',
      description: 'Houses the school library and computer lab. Students get access to books and digital resources to enhance learning.',
      hasStats:    false,
    },
  ];

  for (const campus of campuses) {
    await Campus.findOneAndUpdate(
      { slug: campus.slug },
      { $setOnInsert: campus },
      { upsert: true, new: true }
    );
  }
  console.log('✓ Campuses seeded');
}

/* ─────────────────────────────────────────────
   Seed Contact Info
───────────────────────────────────────────── */
export async function seedContactInfo() {
  await ContactInfo.findOneAndUpdate(
    { singletonKey: 'main' },
    {
      $setOnInsert: {
        singletonKey:       'main',
        email:              'pramilaveerappa1985@gmail.com',
        phone:              '+91 8123573998',
        contactPersonName:  'Ravi V.M',
        contactPersonTitle: 'Admin Manager',
        address:            'Valagerehalli, Maddur Taluk, Mandya, Karnataka – 571428',
        taxNote:
          'The school is registered under Section 12A of the Income Tax Act, 1961 and satisfies conditions under Section 80G (5)(iv)-(v). Donations are eligible for tax deduction.',
      },
    },
    { upsert: true }
  );
  console.log('✓ Contact info seeded');
}

/* ─────────────────────────────────────────────
   Standalone runner (npm run seed)
───────────────────────────────────────────── */
if (process.argv[1].includes('seedAdmin')) {
  await connectDB();
  await seedAdmin();
  await seedSiteImages();
  await seedCampuses();
  await seedContactInfo();
  console.log('All seeds completed.');
  process.exit(0);
}
