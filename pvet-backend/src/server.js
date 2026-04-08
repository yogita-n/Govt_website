import 'dotenv/config';
import app from './app.js';
import './config/firebase.js'; // initializes Firebase Admin on import
import { seedAdmin, seedSiteImages, seedCampuses, seedContactInfo } from './utils/seedAdmin.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Safe on every restart — only writes if document does not yet exist
    await seedAdmin();
    await seedSiteImages();
    await seedCampuses();
    await seedContactInfo();

    const server = app.listen(PORT, () => {
      console.log(`✓ PVET API running on http://localhost:${PORT}`);
      console.log(`  Health: http://localhost:${PORT}/api/health`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is in use. Retrying in 1s...`);
        setTimeout(() => {
          server.close();
          server.listen(PORT);
        }, 1000);
      } else {
        console.error('Server error:', err.message);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
