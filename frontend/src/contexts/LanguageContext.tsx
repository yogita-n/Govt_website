// import { createContext, useContext, useState, ReactNode } from 'react';

// type Lang = 'en' | 'kn';

// interface LanguageContextType {
//   lang: Lang;
//   toggleLang: () => void;
//   t: (key: string) => string;
// }

// const translations: Record<string, Record<Lang, string>> = {
//   // Navbar
//   'nav.home': { en: 'Home', kn: 'ಮುಖಪುಟ' },
//   'nav.about': { en: 'About', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
//   'nav.campus': { en: 'Campus', kn: 'ಕ್ಯಾಂಪಸ್' },
//   'nav.activities': { en: 'Activities', kn: 'ಚಟುವಟಿಕೆಗಳು' },
//   'nav.donors': { en: 'Donors', kn: 'ದಾನಿಗಳು' },
//   'nav.contact': { en: 'Contact', kn: 'ಸಂಪರ್ಕ' },
//   'nav.donate': { en: 'Donate Now', kn: 'ಈಗ ದಾನ ಮಾಡಿ' },

//   // Hero
//   'hero.title': { en: 'Free Education for Every Child', kn: 'ಪ್ರತಿ  ಮಗುವಿಗೂ ಉಚಿತ ಶಿಕ್ಷಣ' },
//   'hero.subtitle': {
//     en: 'Pramila Veerappa Educational Trust · Est. 1985 · Valagerehalli, Maddur, Karnataka',
//     kn: 'ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್ · ಸ್ಥಾಪನೆ 1985 · ವಾಲಗೆರೆಹಳ್ಳಿ, ಮದ್ದೂರು, ಕರ್ನಾಟಕ',
//   },
//   'hero.story': { en: 'Our Story →', kn: 'ನಮ್ಮ ಕಥೆ →' },

//   // About
//   'about.label': { en: 'About', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
//   'about.title': { en: 'A Vision Born in a Village', kn: 'ಒಂದು ಹಳ್ಳಿಯಲ್ಲಿ ಹುಟ್ಟಿದ ದೃಷ್ಟಿ' },
//   'about.p1': {
//     en: 'V.K. Veerappa (1929–2017) was born into a poor family in the small village of Valagerehalli. He worked hard, became an Engineer, but never forgot his roots.',
//     kn: 'ವಿ.ಕೆ. ವೀರಪ್ಪ (1929–2017) ವಾಲಗೆರೆಹಳ್ಳಿಯ ಸಣ್ಣ ಹಳ್ಳಿಯ ಬಡ ಕುಟುಂಬದಲ್ಲಿ ಜನಿಸಿದರು. ಅವರು ಕಷ್ಟಪಟ್ಟು ಇಂಜಿನಿಯರ್ ಆದರು, ಆದರೆ ತಮ್ಮ ಬೇರುಗಳನ್ನು ಮರೆಯಲಿಲ್ಲ.',
//   },
//   'about.p2': {
//     en: 'In 1985, he started the school in a small shed with a few children. Through unwavering determination, he collected charitable funds and built the entire campus over two decades.',
//     kn: '1985ರಲ್ಲಿ, ಅವರು ಕೆಲವು ಮಕ್ಕಳೊಂದಿಗೆ ಸಣ್ಣ ಶೆಡ್‌ನಲ್ಲಿ ಶಾಲೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದರು. ಅಚಲ ನಿರ್ಧಾರದಿಂದ ದತ್ತಿ ನಿಧಿ ಸಂಗ್ರಹಿಸಿ ಎರಡು ದಶಕಗಳಲ್ಲಿ ಇಡೀ ಕ್ಯಾಂಪಸ್ ನಿರ್ಮಿಸಿದರು.',
//   },
//   'about.p3': {
//     en: 'Today, over 200 students study here and have gone on to become engineers, doctors, and business people — fulfilling his dream.',
//     kn: 'ಇಂದು, 200ಕ್ಕೂ ಹೆಚ್ಚು ವಿದ್ಯಾರ್ಥಿಗಳು ಇಲ್ಲಿ ಓದುತ್ತಿದ್ದಾರೆ ಮತ್ತು ಇಂಜಿನಿಯರ್, ವೈದ್ಯರು ಮತ್ತು ವ್ಯಾಪಾರಸ್ಥರಾಗಿದ್ದಾರೆ — ಅವರ ಕನಸನ್ನು ನನಸು ಮಾಡಿದ್ದಾರೆ.',
//   },
//   'about.quote': {
//     en: '"Progress in every country depends mainly on the education of its people." — Sir M. Visvesvaraya',
//     kn: '"ಪ್ರತಿ ದೇಶದ ಪ್ರಗತಿ ಮುಖ್ಯವಾಗಿ ಅದರ ಜನರ ಶಿಕ್ಷಣದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ." — ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ',
//   },

//   // Footer
//   'footer.name': { en: 'Pramila Veerappa Educational Trust', kn: 'ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್' },
//   'footer.rights': { en: '© 2026 Pramila Veerappa Educational Trust ® · All rights reserved', kn: '© 2026 ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್ ® · ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ' },
//   'footer.built': { en: 'Built with ❤ to support rural education', kn: 'ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣವನ್ನು ಬೆಂಬಲಿಸಲು ❤ ಇಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ' },
//   // Stats Strip
// 'stats.students': { en: 'Total Students', kn: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು' },
// 'stats.teachers': { en: 'Teachers', kn: 'ಶಿಕ್ಷಕರು' },
// 'stats.year': { en: 'Est. Year', kn: 'ಸ್ಥಾಪನೆ ವರ್ಷ' },
// 'stats.area': { en: 'Campus Area', kn: 'ಕ್ಯಾಂಪಸ್ ವಿಸ್ತೀರ್ಣ' },
// 'stats.tax': { en: 'Tax Benefit', kn: 'ತೆರಿಗೆ ಸೌಲಭ್ಯ' },

// // Activities
// 'activities.title': { en: 'Recent Activities', kn: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು' },
// 'activities.subtitle': { en: 'A glimpse into student life', kn: 'ವಿದ್ಯಾರ್ಥಿ ಜೀವನದ ಒಂದು ನೋಟ' },
// 'activities.all': { en: 'All', kn: 'ಎಲ್ಲಾ' },
// 'activities.cultural': { en: 'Cultural', kn: 'ಸಾಂಸ್ಕೃತಿಕ' },
// 'activities.academic': { en: 'Academic', kn: 'ಶೈಕ್ಷಣಿಕ' },
// 'activities.sports': { en: 'Sports', kn: 'ಕ್ರೀಡೆ' },
// 'activities.infrastructure': { en: 'Infrastructure', kn: 'ಸೌಕರ್ಯಗಳು' },
// 'activities.viewPhotos': { en: 'View Photos →', kn: 'ಫೋಟೋಗಳನ್ನು ನೋಡಿ →' },

// // Campus
// 'campus.title': { en: 'Our Campus', kn: 'ನಮ್ಮ ಕ್ಯಾಂಪಸ್' },
// 'campus.subtitle': { en: '4 Buildings · 5 Acres · Valagerehalli', kn: '4 ಕಟ್ಟಡಗಳು · 5 ಏಕರೆ · ವಾಲಗೆರೆಹಳ್ಳಿ' },
// 'campus.mapCaption': { en: 'Campus layout — Valagerehalli, Maddur', kn: 'ಕ್ಯಾಂಪಸ್ ವಿನ್ಯಾಸ — ವಾಲಗೆರೆಹಳ್ಳಿ, ಮದ್ದೂರು' },

// // Contact
// 'contact.quote': {
//   en: '"Tiny drops of water make a mighty ocean."',
//   kn: '"ಸಣ್ಣ ನೀರಿನ ಹನಿಗಳು ದೊಡ್ಡ ಸಾಗರವನ್ನು ನಿರ್ಮಿಸುತ್ತವೆ."'
// },
// 'contact.subtitle': {
//   en: 'Every little contribution matters. Help us improve our school infrastructure and education.',
//   kn: 'ಪ್ರತಿ ಸಣ್ಣ ಸಹಾಯವೂ ಮಹತ್ವದ್ದಾಗಿದೆ. ನಮ್ಮ ಶಾಲೆಯ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಶಿಕ್ಷಣವನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ಸಹಕರಿಸಿ.'
// },
// 'contact.getInTouch': { en: 'Get in Touch', kn: 'ಸಂಪರ್ಕಿಸಿ' },
// 'contact.visitUs': { en: 'Visit Us', kn: 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ' },
// 'contact.support': { en: 'Support Our Mission', kn: 'ನಮ್ಮ ಧ್ಯೇಯಕ್ಕೆ ಬೆಂಬಲ ನೀಡಿ' },

// // Donors
// 'donors.title': {
//   en: 'We are grateful to those who believed in this dream',
//   kn: 'ಈ ಕನಸನ್ನು ನಂಬಿದವರಿಗೆ ನಾವು ಕೃತಜ್ಞರಾಗಿದ್ದೇವೆ'
// },
// 'donors.label': { en: 'Our Donors', kn: 'ನಮ್ಮ ದಾನಿಗಳು' },
// 'donors.thanks': {
//   en: '...and many individual donors. Thank you.',
//   kn: '...ಮತ್ತು ಅನೇಕ ವೈಯಕ್ತಿಕ ದಾನಿಗಳು. ಧನ್ಯವಾದಗಳು.'
// },'contact.distance': {
//   en: '90km from Bengaluru via NH 275',
//   kn: 'ಬೆಂಗಳೂರುದಿಂದ NH 275 ಮೂಲಕ 90 ಕಿಮೀ'
// },

// 'contact.registered': {
//   en: 'Registered under 12A & 80G',
//   kn: '12A ಮತ್ತು 80G ಅಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ'
// }

// };

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [lang, setLang] = useState<Lang>('en');

//   const toggleLang = () => setLang(prev => (prev === 'en' ? 'kn' : 'en'));

//   const t = (key: string) => translations[key]?.[lang] || key;

//   return (
//     <LanguageContext.Provider value={{ lang, toggleLang, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => {
//   const ctx = useContext(LanguageContext);
//   if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
//   return ctx;
// };
// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// type Lang = 'en' | 'kn';

// interface LanguageContextType {
//   lang: Lang;
//   toggleLang: () => void;
//   t: (key: string) => string;
// }

// const translations: Record<string, Record<Lang, string>> = {
//   // Navbar
//   'nav.home': { en: 'Home', kn: 'ಮುಖಪುಟ' },
//   'nav.about': { en: 'About', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
//   'nav.campus': { en: 'Campus', kn: 'ಕ್ಯಾಂಪಸ್' },
//   'nav.activities': { en: 'Activities', kn: 'ಚಟುವಟಿಕೆಗಳು' },
//   'nav.donors': { en: 'Donors', kn: 'ದಾನಿಗಳು' },
//   'nav.contact': { en: 'Contact', kn: 'ಸಂಪರ್ಕ' },
//   'nav.donate': { en: 'Donate Now', kn: 'ಈಗ ದಾನ ಮಾಡಿ' },

//   // Hero
//   'hero.title': { en: 'Free Education for Every Child', kn: 'ಪ್ರತಿ  ಮಗುವಿಗೂ ಉಚಿತ ಶಿಕ್ಷಣ' },
//   'hero.subtitle': {
//     en: 'Pramila Veerappa Educational Trust · Est. 1985 · Valagerehalli, Maddur, Karnataka',
//     kn: 'ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್ · ಸ್ಥಾಪನೆ 1985 · ವಾಲಗೆರೆಹಳ್ಳಿ, ಮದ್ದೂರು, ಕರ್ನಾಟಕ',
//   },
//   'hero.story': { en: 'Our Story →', kn: 'ನಮ್ಮ ಕಥೆ →' },

//   // About
//   'about.label': { en: 'About', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
//   'about.title': { en: 'A Vision Born in a Village', kn: 'ಒಂದು ಹಳ್ಳಿಯಲ್ಲಿ ಹುಟ್ಟಿದ ದೃಷ್ಟಿ' },
//   'about.p1': {
//     en: 'V.K. Veerappa (1929–2017) was born into a poor family in the small village of Valagerehalli. He worked hard, became an Engineer, but never forgot his roots.',
//     kn: 'ವಿ.ಕೆ. ವೀರಪ್ಪ (1929–2017) ವಾಲಗೆರೆಹಳ್ಳಿಯ ಸಣ್ಣ ಹಳ್ಳಿಯ ಬಡ ಕುಟುಂಬದಲ್ಲಿ ಜನಿಸಿದರು. ಅವರು ಕಷ್ಟಪಟ್ಟು ಇಂಜಿನಿಯರ್ ಆದರು, ಆದರೆ ತಮ್ಮ ಬೇರುಗಳನ್ನು ಮರೆಯಲಿಲ್ಲ.',
//   },
//   'about.p2': {
//     en: 'In 1985, he started the school in a small shed with a few children. Through unwavering determination, he collected charitable funds and built the entire campus over two decades.',
//     kn: '1985ರಲ್ಲಿ, ಅವರು ಕೆಲವು ಮಕ್ಕಳೊಂದಿಗೆ ಸಣ್ಣ ಶೆಡ್‌ನಲ್ಲಿ ಶಾಲೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದರು. ಅಚಲ ನಿರ್ಧಾರದಿಂದ ದತ್ತಿ ನಿಧಿ ಸಂಗ್ರಹಿಸಿ ಎರಡು ದಶಕಗಳಲ್ಲಿ ಇಡೀ ಕ್ಯಾಂಪಸ್ ನಿರ್ಮಿಸಿದರು.',
//   },
//   'about.p3': {
//     en: 'Today, over 200 students study here and have gone on to become engineers, doctors, and business people — fulfilling his dream.',
//     kn: 'ಇಂದು, 200ಕ್ಕೂ ಹೆಚ್ಚು ವಿದ್ಯಾರ್ಥಿಗಳು ಇಲ್ಲಿ ಓದುತ್ತಿದ್ದಾರೆ ಮತ್ತು ಇಂಜಿನಿಯರ್, ವೈದ್ಯರು ಮತ್ತು ವ್ಯಾಪಾರಸ್ಥರಾಗಿದ್ದಾರೆ — ಅವರ ಕನಸನ್ನು ನನಸು ಮಾಡಿದ್ದಾರೆ.',
//   },
//   'about.quote': {
//     en: '"Progress in every country depends mainly on the education of its people." — Sir M. Visvesvaraya',
//     kn: '"ಪ್ರತಿ ದೇಶದ ಪ್ರಗತಿ ಮುಖ್ಯವಾಗಿ ಅದರ ಜನರ ಶಿಕ್ಷಣದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ." — ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ',
//   },

//   // Footer
//   'footer.name': { en: 'Pramila Veerappa Educational Trust', kn: 'ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್' },
//   'footer.rights': { en: '© 2026 Pramila Veerappa Educational Trust ® · All rights reserved', kn: '© 2026 ಪ್ರಮಿಳಾ ವೀರಪ್ಪ ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್ ® · ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ' },
//   'footer.built': { en: 'Built with ❤ to support rural education', kn: 'ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣವನ್ನು ಬೆಂಬಲಿಸಲು ❤ ಇಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ' },

//   // Stats Strip
//   'stats.students': { en: 'Total Students', kn: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು' },
//   'stats.teachers': { en: 'Teachers', kn: 'ಶಿಕ್ಷಕರು' },
//   'stats.year': { en: 'Est. Year', kn: 'ಸ್ಥಾಪನೆ ವರ್ಷ' },
//   'stats.area': { en: 'Campus Area', kn: 'ಕ್ಯಾಂಪಸ್ ವಿಸ್ತೀರ್ಣ' },
//   'stats.tax': { en: 'Tax Benefit', kn: 'ತೆರಿಗೆ ಸೌಲಭ್ಯ' },

//   // Activities
//   'activities.title': { en: 'Recent Activities', kn: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು' },
//   'activities.subtitle': { en: 'A glimpse into student life', kn: 'ವಿದ್ಯಾರ್ಥಿ ಜೀವನದ ಒಂದು ನೋಟ' },
//   'activities.all': { en: 'All', kn: 'ಎಲ್ಲಾ' },
//   'activities.cultural': { en: 'Cultural', kn: 'ಸಾಂಸ್ಕೃತಿಕ' },
//   'activities.academic': { en: 'Academic', kn: 'ಶೈಕ್ಷಣಿಕ' },
//   'activities.sports': { en: 'Sports', kn: 'ಕ್ರೀಡೆ' },
//   'activities.infrastructure': { en: 'Infrastructure', kn: 'ಸೌಕರ್ಯಗಳು' },
//   'activities.viewPhotos': { en: 'View Photos →', kn: 'ಫೋಟೋಗಳನ್ನು ನೋಡಿ →' },

//   // Campus
//   'campus.title': { en: 'Our Campus', kn: 'ನಮ್ಮ ಕ್ಯಾಂಪಸ್' },
//   'campus.subtitle': { en: '3 Buildings · 5 Acres · Valagerehalli', kn: '3 ಕಟ್ಟಡಗಳು · 5 ಏಕರೆ · ವಾಲಗೆರೆಹಳ್ಳಿ' },
//   'campus.mapCaption': { en: 'Campus layout — Valagerehalli, Maddur', kn: 'ಕ್ಯಾಂಪಸ್ ವಿನ್ಯಾಸ — ವಾಲಗೆರೆಹಳ್ಳಿ, ಮದ್ದೂರು' },

//   // Contact
//   'contact.quote': {
//     en: '"Tiny drops of water make a mighty ocean."',
//     kn: '"ಸಣ್ಣ ನೀರಿನ ಹನಿಗಳು ದೊಡ್ಡ ಸಾಗರವನ್ನು ನಿರ್ಮಿಸುತ್ತವೆ."'
//   },
//   'contact.subtitle': {
//     en: 'Every little contribution matters. Help us improve our school infrastructure and education.',
//     kn: 'ಪ್ರತಿ ಸಣ್ಣ ಸಹಾಯವೂ ಮಹತ್ವದ್ದಾಗಿದೆ. ನಮ್ಮ ಶಾಲೆಯ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಶಿಕ್ಷಣವನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ಸಹಕರಿಸಿ.'
//   },
//   'contact.getInTouch': { en: 'Get in Touch', kn: 'ಸಂಪರ್ಕಿಸಿ' },
//   'contact.visitUs': { en: 'Visit Us', kn: 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ' },
//   'contact.support': { en: 'Support Our Mission', kn: 'ನಮ್ಮ ಧ್ಯೇಯಕ್ಕೆ ಬೆಂಬಲ ನೀಡಿ' },
//   'contact.distance': {
//     en: '90km from Bengaluru via NH 275',
//     kn: 'ಬೆಂಗಳೂರುದಿಂದ NH 275 ಮೂಲಕ 90 ಕಿಮೀ'
//   },
//   'contact.registered': {
//     en: 'Registered under 12A & 80G',
//     kn: '12A ಮತ್ತು 80G ಅಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ'
//   },

//   // Donors
//   'donors.title': {
//     en: 'We are grateful to those who believed in this dream',
//     kn: 'ಈ ಕನಸನ್ನು ನಂಬಿದವರಿಗೆ ನಾವು ಕೃತಜ್ಞರಾಗಿದ್ದೇವೆ'
//   },
//   'donors.label': { en: 'Our Donors', kn: 'ನಮ್ಮ ದಾನಿಗಳು' },
//   'donors.thanks': {
//     en: '...and many individual donors. Thank you.',
//     kn: '...ಮತ್ತು ಅನೇಕ ವೈಯಕ್ತಿಕ ದಾನಿಗಳು. ಧನ್ಯವಾದಗಳು.'
//   },
// };

// // ─── Google Translate ────────────────────────────────────────────────────────

// function loadGoogleTranslateScript() {
//   if (document.getElementById('gt-script')) return;

//   (window as any).googleTranslateElementInit = () => {
//     new (window as any).google.translate.TranslateElement(
//       {
//         pageLanguage: 'en',
//         includedLanguages: 'en,kn',
//         autoDisplay: false,
//       },
//       'google_translate_element'
//     );
//   };

//   const s = document.createElement('script');
//   s.id = 'gt-script';
//   s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//   s.async = true;
//   document.body.appendChild(s);
// }

// function applyGoogleTranslate(targetLang: 'en' | 'kn') {
//   const trySelect = () => {
//     const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
//     if (select) {
//       select.value = targetLang === 'kn' ? 'kn' : 'en';
//       select.dispatchEvent(new Event('change'));
//       return true;
//     }
//     return false;
//   };

//   // If widget already ready, use it immediately
//   if (trySelect()) return;

//   // Otherwise poll every 250ms for up to 5 seconds
//   let attempts = 0;
//   const interval = setInterval(() => {
//     attempts++;
//     if (trySelect()) {
//       clearInterval(interval);
//       return;
//     }
//     if (attempts >= 20) {
//       clearInterval(interval);
//       // Last resort: cookie + reload
//       const value = targetLang === 'kn' ? '/en/kn' : '/en/en';
//       document.cookie = `googtrans=${value};path=/`;
//       document.cookie = `googtrans=${value};domain=${window.location.hostname};path=/`;
//       window.location.reload();
//     }
//   }, 250);
// }

// // ─── Context ─────────────────────────────────────────────────────────────────

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [lang, setLang] = useState<Lang>('en');

//   useEffect(() => {
//     loadGoogleTranslateScript();
//   }, []);

//   const toggleLang = () => {
//     const next: Lang = lang === 'en' ? 'kn' : 'en';
//     setLang(next);
//     applyGoogleTranslate(next);
//   };

//   const t = (key: string) => translations[key]?.[lang] || key;

//   return (
//     <LanguageContext.Provider value={{ lang, toggleLang, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => {
//   const ctx = useContext(LanguageContext);
//   if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
//   return ctx;
// };
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Lang = 'en' | 'kn';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─── Hide Google Translate bar completely ─────────────────────────────────────
function injectHideStyles() {
  if (document.getElementById('gt-hide-style')) return;
  const style = document.createElement('style');
  style.id = 'gt-hide-style';
  style.innerHTML = `
    .goog-te-banner-frame,
    .goog-te-banner-frame.skiptranslate,
    .goog-te-ftab-float,
    #goog-gt-tt,
    .goog-te-balloon-frame,
    .goog-tooltip,
    .goog-tooltip:hover,
    .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
    .VIpgJd-ZVi9od-aZ2wEe-OiiCO {
      display: none !important;
      visibility: hidden !important;
    }
    body {
      top: 0 !important;
      position: static !important;
    }
    #google_translate_element {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

// ─── Load Google Translate widget script ─────────────────────────────────────
function loadScript() {
  if (document.getElementById('gt-script')) return;

  (window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'en,kn', autoDisplay: false },
      'google_translate_element'
    );
  };

  const s = document.createElement('script');
  s.id = 'gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

// ─── Trigger translation silently ────────────────────────────────────────────
function applyTranslation(targetLang: 'en' | 'kn') {
  const doIt = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!select) return false;
    select.value = targetLang === 'kn' ? 'kn' : 'en';
    select.dispatchEvent(new Event('change'));
    [100, 400, 800, 1500].forEach(ms => setTimeout(injectHideStyles, ms));
    return true;
  };

  if (doIt()) return;

  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (doIt()) { clearInterval(timer); return; }
    if (tries >= 30) {
      clearInterval(timer);
      const val = targetLang === 'kn' ? '/en/kn' : '/en/en';
      document.cookie = `googtrans=${val};path=/`;
      document.cookie = `googtrans=${val};domain=${window.location.hostname};path=/`;
      window.location.reload();
    }
  }, 200);
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    injectHideStyles();
    loadScript();

    const observer = new MutationObserver(() => {
      const bar = document.querySelector('.goog-te-banner-frame') as HTMLElement;
      if (bar) {
        bar.style.cssText = 'display:none!important;visibility:hidden!important;';
        document.body.style.top = '0';
        document.body.style.position = 'static';
      }
    });
    observer.observe(document.body, {
      childList: true, subtree: true,
      attributes: true, attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'kn' : 'en';
    setLang(next);
    applyTranslation(next);
  };

  // t() returns empty string — components that still call t() won't crash
  // but won't show static text either (Google Translate handles everything)
  const t = (_key: string) => '';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};