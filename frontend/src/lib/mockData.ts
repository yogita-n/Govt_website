export const mockSiteImages = [
  { key: 'hero_banner', label: 'Home Page Hero Banner', section: 'Home', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop', publicId: 'hero_banner' },
  { key: 'school_gate', label: 'School Entrance Gate', section: 'Home', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop', publicId: 'school_gate' },
  { key: 'founder_portrait', label: 'Founder V.K. Veerappa', section: 'About', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', publicId: 'founder_portrait' },

];

export const mockCampuses = [
  {
    slug: 'pvhs',
    title: 'Pramila Veerappa High School',
    subtitle: 'Classes 5–10 · Kannada Medium',
    image: { url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop' },
    description: 'The main high school building with spacious classrooms, a science lab, and a library. Established in 1985, this is the heart of the campus.',
    hasStats: true,
    stats: { boys: 98, girls: 72, teachers: 10, head: 'Sri. Ramesh K.' },
  },
  {
    slug: 'kehps',
    title: 'K.E. Higher Primary School',
    subtitle: 'Classes 1–4 · Kannada Medium',
    image: { url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop' },
    description: 'The primary school wing providing foundational education with dedicated classrooms and a play area for young learners.',
    hasStats: true,
    stats: { boys: 18, girls: 13, teachers: 6, head: 'Smt. Lakshmi N.' },
  },
  {
    slug: 'nursery',
    title: 'Nursery & Pre-School',
    subtitle: 'Ages 3–5 · Play-based Learning',
    image: { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop' },
    description: 'A colorful, nurturing environment for our youngest learners. The nursery focuses on play-based learning, motor skills, and social development.',
    hasStats: false,
    stats: null,
  },
  {
    slug: 'library',
    title: 'Library & Reading Hall',
    subtitle: 'Open to all students',
    image: { url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop' },
    description: 'A well-stocked library with over 3,000 books in Kannada and English. The reading hall provides a quiet space for self-study and research.',
    hasStats: false,
    stats: null,
  },
];

export const mockDonors = [
  { id: '1', name: 'Karnataka State Government', location: 'Bengaluru', type: 'Institutional', isActive: true, order: 1 },
  { id: '2', name: 'Mandya District Administration', location: 'Mandya', type: 'Institutional', isActive: true, order: 2 },
  { id: '3', name: 'Sri. Ramaiah Foundation', location: 'Bengaluru', type: 'Institutional', isActive: true, order: 3 },
  { id: '4', name: 'Rotary Club of Maddur', location: 'Maddur', type: 'Institutional', isActive: true, order: 4 },
  { id: '5', name: 'Dr. Suresh Babu', location: 'Mysuru', type: 'Individual', isActive: true, order: 5 },
  { id: '6', name: 'Smt. Kamala Devi', location: 'Bengaluru', type: 'Individual', isActive: true, order: 6 },
  { id: '7', name: 'Lions Club International', location: 'Mandya', type: 'Institutional', isActive: true, order: 7 },
  { id: '8', name: 'Sri. Venkatesh Murthy', location: 'Maddur', type: 'Individual', isActive: true, order: 8 },
  { id: '9', name: 'Infosys Foundation', location: 'Bengaluru', type: 'Institutional', isActive: false, order: 9 },
  { id: '10', name: 'Dr. Prakash Rao', location: 'Chennai', type: 'Individual', isActive: true, order: 10 },
  { id: '11', name: 'Maddur Taluk Panchayat', location: 'Maddur', type: 'Institutional', isActive: true, order: 11 },
  { id: '12', name: 'Sri. Nagendra Prasad', location: 'Valagerehalli', type: 'Individual', isActive: true, order: 12 },
];

export const mockContact = {
  contactPersonName: 'Sri. Veerappa K.',
  contactPersonTitle: 'Managing Trustee',
  email: 'pvet.trust@gmail.com',
  phone: '+91 98450 12345',
  address: 'Pramila Veerappa Educational Trust, Valagerehalli Village, Maddur Taluk, Mandya District, Karnataka 571428, India',
  taxNote: 'The school is registered under Section 12A of the Income Tax Act, 1961 and qualifies under Section 80G (5)(iv)–(v). Donations are eligible for tax deduction. PAN: AAATV1234F',
};

export const mockActivities = [
  {
    id: '1',
    title: 'Annual Day Celebration 2025',
    date: '2025-01-15',
    category: 'Cultural',
    description: 'Students performed traditional Yakshagana, folk dances, and a play on the life of Sir M. Visvesvaraya. Over 300 parents attended.',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&h=400&fit=crop', caption: 'Students performing folk dance' },
      { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', caption: 'Traditional drama performance' },
    ],
  },
  {
    id: '2',
    title: 'Science Exhibition',
    date: '2024-11-20',
    category: 'Academic',
    description: 'Students from classes 5–10 showcased working science models including solar-powered water pumps and organic farming techniques.',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop', caption: 'Science project display' },
    ],
  },
  {
    id: '3',
    title: 'Inter-School Kabaddi Tournament',
    date: '2024-10-05',
    category: 'Sports',
    description: 'Our school hosted the Mandya district inter-school Kabaddi tournament. PVHS boys team secured 2nd place.',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1461896836934-bd45ba40fcb7?w=600&h=400&fit=crop', caption: 'Kabaddi match in progress' },
    ],
  },
  {
    id: '4',
    title: 'New Computer Lab Inauguration',
    date: '2024-08-12',
    category: 'Infrastructure',
    description: 'A new computer lab with 15 systems was inaugurated by the District Commissioner. This will provide digital literacy to all students.',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop', caption: 'New computer lab' },
    ],
  },
  {
    id: '5',
    title: 'Republic Day Parade',
    date: '2025-01-26',
    category: 'Cultural',
    description: 'Students participated in the Republic Day celebrations with a march past and flag hoisting ceremony.',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', caption: 'Flag hoisting ceremony' },
    ],
  },
  {
    id: '6',
    title: 'Library Renovation',
    date: '2024-06-01',
    category: 'Infrastructure',
    description: 'The school library was renovated with new bookshelves and 500 new books donated by the Rotary Club.',
    published: false,
    images: [],
  },
];

export type SiteImage = typeof mockSiteImages[0];
export type Campus = typeof mockCampuses[0];
export type Donor = typeof mockDonors[0];
export type ContactInfo = typeof mockContact;
export type Activity = typeof mockActivities[0];
