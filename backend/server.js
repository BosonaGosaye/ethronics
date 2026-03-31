const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
// Configure helmet with relaxed settings for CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

// CORS configuration - Allow all origins for public API
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      'https://ethronics.vercel.app',
      'https://ethronics-admin.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    
    // Allow all Vercel preview deployments
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For development, allow all origins
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting - more generous for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs (increased for development)
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/site-settings', require('./routes/siteSettings'));
app.use('/api/home', require('./routes/home'));
app.use('/api/academic', require('./routes/academic'));
app.use('/api/academic-sections', require('./routes/academicSection'));
app.use('/api/about', require('./routes/about'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/blog-posts', require('./routes/blogPosts'));
app.use('/api/blog-comments', require('./routes/blogComments'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/contact-messages', require('./routes/contactMessages'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/faq-items', require('./routes/faqItems'));
app.use('/api/faq-questions', require('./routes/faqQuestions'));
app.use('/api/library', require('./routes/library'));
app.use('/api/library-resources', require('./routes/libraryResources'));
app.use('/api/library-users', require('./routes/libraryUsers'));
app.use('/api/manufacturing', require('./routes/manufacturing'));
app.use('/api/manufacturing-products', require('./routes/manufacturingProducts'));
app.use('/api/newsEvents', require('./routes/newsEvents'));
app.use('/api/newsEventItems', require('./routes/newsEventItems'));
app.use('/api/mediaItems', require('./routes/mediaItems'));
app.use('/api/register', require('./routes/register'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/training-videos', require('./routes/trainingVideos'));
app.use('/api/student-projects', require('./routes/studentProjects'));
app.use('/api/research', require('./routes/research'));
app.use('/api/research-projects', require('./routes/researchProjects'));
app.use('/api/content', require('./routes/content'));
app.use('/api/media', require('./routes/media'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
