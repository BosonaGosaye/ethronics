import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Research from './pages/Research';
import Manufacturing from './pages/Manufacturing';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Register from './pages/Register';
import Library from './pages/Library';
import ResourceDetail from './pages/ResourceDetail';
import Careers from './pages/Careers';
import NewsEvents from './pages/NewsEvents';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import FAQ from './pages/FAQ';
import FeatureDetail from './pages/FeatureDetail';


// Layout component that conditionally renders navbar and footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isUKRoute = location.pathname.startsWith('/uk');
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return children;
  }

  return (
    <div className="App flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {!isUKRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isUKRoute && <Footer />}
    </div>
  );
};

// 404 Not Found component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <a 
        href="/" 
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          {/* Admin Routes */}
          
          {/* Main Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/feature/:featureId" element={<Layout><FeatureDetail /></Layout>} />
          <Route path="/manufacturing" element={<Layout><Manufacturing /></Layout>} />
          <Route path="/academics" element={<Layout><Academics /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/research" element={<Layout><Research /></Layout>} />
          <Route path="/research-development" element={<Layout><Research /></Layout>} />
          
          {/* Register route */}
          <Route path="/register" element={<Layout><Register /></Layout>} />
          
          {/* Library route */}
          <Route path="/library" element={<Layout><Library /></Layout>} />
          <Route path="/library/resource/:id" element={<Layout><ResourceDetail /></Layout>} />
          
          {/* Careers route */}
          <Route path="/careers" element={<Layout><Careers /></Layout>} />
          
          {/* News & Events route */}
          <Route path="/news" element={<Layout><NewsEvents /></Layout>} />
          <Route path="/events" element={<Layout><NewsEvents /></Layout>} />
          
          {/* Blog route */}
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPostDetail /></Layout>} />
          
          {/* FAQ route */}
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          
          {/* UK routes - without navbar/footer */}
          <Route path="/uk" element={<NotFound />} />
          <Route path="/uk/register" element={<NotFound />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;