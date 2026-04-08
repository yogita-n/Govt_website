import bcrypt from 'bcryptjs';
import { db } from '../config/firebase.js';

/* ─────────────────────────────────────────────
   Seed Admin
───────────────────────────────────────────── */
export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const snap = await db.collection('admins').doc(email).get();
  if (!snap.exists) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await db.collection('admins').doc(email).set({ email, password: hashed });
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
    const snap = await db.collection('siteimages').doc(img.key).get();
    if (!snap.exists) {
      await db.collection('siteimages').doc(img.key).set(img);
    }
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
    const snap = await db.collection('campuses').doc(campus.slug).get();
    if (!snap.exists) {
      await db.collection('campuses').doc(campus.slug).set(campus);
    }
  }
  console.log('✓ Campuses seeded');
}

/* ─────────────────────────────────────────────
   Seed Contact Info
───────────────────────────────────────────── */
export async function seedContactInfo() {
  const snap = await db.collection('contactinfos').doc('main').get();
  if (!snap.exists) {
    await db.collection('contactinfos').doc('main').set({
      singletonKey:       'main',
      email:              'pramilaveerappa1985@gmail.com',
      phone:              '+91 8123573998',
      contactPersonName:  'Ravi V.M',
      contactPersonTitle: 'Admin Manager',
      address:            'Valagerehalli, Maddur Taluk, Mandya, Karnataka – 571428',
      taxNote:
        'The school is registered under Section 12A of the Income Tax Act, 1961 and satisfies conditions under Section 80G (5)(iv)-(v). Donations are eligible for tax deduction.',
    });
    console.log('✓ Contact info seeded');
  }
}