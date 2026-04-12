import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';

// Public routes
import publicCampusRoutes    from './routes/public/campuses.js';
import publicDonorRoutes     from './routes/public/donors.js';
import publicActivityRoutes  from './routes/public/activities.js';
import publicSiteImageRoutes from './routes/public/siteImages.js';
import publicContactRoutes   from './routes/public/contact.js';

// Admin routes
import adminAuthRoutes       from './routes/admin/auth.js';
import adminCampusRoutes     from './routes/admin/campuses.js';
import adminSiteImageRoutes  from './routes/admin/siteImages.js';
import adminDonorRoutes      from './routes/admin/donors.js';
import adminContactRoutes    from './routes/admin/contact.js';
import adminActivityRoutes   from './routes/admin/activities.js';

// Auth middleware
import authMiddleware from './middleware/auth.js';

const app = express();

/* ─────────────────────────────────────────
   Security middleware
───────────────────────────────────────── */
app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Also allow any localhost origin in development
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/* ─────────────────────────────────────────
   Global rate limiter
   - Development : 1000 req / 15 min  (relaxed for hot-reloads & React Query)
   - Production  :  200 req / 15 min
───────────────────────────────────────── */
const isDev = process.env.NODE_ENV !== 'production';
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev && process.env.DISABLE_RATE_LIMIT === 'true', // opt-out via env var
});
app.use(globalLimiter);

/* ─────────────────────────────────────────
   Body parsers
───────────────────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ─────────────────────────────────────────
   Health check
───────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

/* ─────────────────────────────────────────
   Public routes  (no auth required)
───────────────────────────────────────── */
app.use('/api/public/campuses',    publicCampusRoutes);
app.use('/api/public/donors',      publicDonorRoutes);
app.use('/api/public/activities',  publicActivityRoutes);
app.use('/api/public/site-images', publicSiteImageRoutes);
app.use('/api/public/contact',     publicContactRoutes);

/* ─────────────────────────────────────────
   Admin auth route  (no auth guard)
───────────────────────────────────────── */
app.use('/api/admin/auth', adminAuthRoutes);

/* ─────────────────────────────────────────
   Admin routes  (JWT auth required)
───────────────────────────────────────── */
app.use('/api/admin/campuses',    authMiddleware, adminCampusRoutes);
app.use('/api/admin/site-images', authMiddleware, adminSiteImageRoutes);
app.use('/api/admin/donors',      authMiddleware, adminDonorRoutes);
app.use('/api/admin/contact',     authMiddleware, adminContactRoutes);
app.use('/api/admin/activities',  authMiddleware, adminActivityRoutes);

/* ─────────────────────────────────────────
   404 handler
───────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/* ─────────────────────────────────────────
   Global error handler (must be last)
───────────────────────────────────────── */
app.use(errorHandler);

export default app;
