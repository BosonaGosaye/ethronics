const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
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
