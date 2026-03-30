import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomeDashboard from './pages/HomeDashboard';
import HomeContentEditor from './pages/HomeContentEditor';
import AcademicDashboard from './pages/AcademicDashboard';
import AcademicContentEditor from './pages/AcademicContentEditor';
import AboutDashboard from './pages/AboutDashboard';
import AboutContentEditor from './pages/AboutContentEditor';
import BlogDashboard from './pages/BlogDashboard';
import BlogContentEditor from './pages/BlogContentEditor';
import BlogPostsManager from './pages/BlogPostsManager';
import BlogPostEditor from './pages/BlogPostEditor';
import BlogCommentsManager from './pages/BlogCommentsManager';
import CareersDashboard from './pages/CareersDashboard';
import CareersContentEditor from './pages/CareersContentEditor';
import JobsManager from './pages/JobsManager';
import JobEditor from './pages/JobEditor_Enhanced';
import ApplicationsManager from './pages/ApplicationsManager';
import ApplicationViewer from './pages/ApplicationViewer';
import ContactDashboard from './pages/ContactDashboard';
import ContactContentEditor from './pages/ContactContentEditor';
import ContactMessagesManager from './pages/ContactMessagesManager';
import FAQDashboard from './pages/FAQDashboard';
import FAQContentEditor from './pages/FAQContentEditor';
import FAQItemsManager from './pages/FAQItemsManager';
import FAQItemEditor from './pages/FAQItemEditor';
import FAQQuestionsManager from './pages/FAQQuestionsManager';
import LibraryDashboard from './pages/LibraryDashboard';
import LibraryContentEditor from './pages/LibraryContentEditor';
import LibraryResourcesManager from './pages/LibraryResourcesManager';
import LibraryResourceEditor from './pages/LibraryResourceEditor';
import ManufacturingDashboard from './pages/ManufacturingDashboard';
import ManufacturingContentEditor from './pages/ManufacturingContentEditor';
import ManufacturingProductsManager from './pages/ManufacturingProductsManager';
import ManufacturingProductEditor from './pages/ManufacturingProductEditor';
import NewsEventsDashboard from './pages/NewsEventsDashboard';
import NewsEventsContentEditor from './pages/NewsEventsContentEditor';
import NewsEventItemsManager from './pages/NewsEventItemsManager';
import NewsEventItemEditor from './pages/NewsEventItemEditor';
import MediaItemsManager from './pages/MediaItemsManager';
import MediaItemEditor from './pages/MediaItemEditor';
import EventsCalendar from './pages/EventsCalendar';
import RegisterDashboard from './pages/RegisterDashboard';
import RegisterContentEditor from './pages/RegisterContentEditor';
import RegistrationsManager from './pages/RegistrationsManager';
import RegistrationViewer from './pages/RegistrationViewer';
import ResearchDashboard from './pages/ResearchDashboard';
import ResearchContentEditor from './pages/ResearchContentEditor';
import ResearchProjectsManager from './pages/ResearchProjectsManager';
import ResearchProjectEditor from './pages/ResearchProjectEditor';
import TrainingVideosManager from './pages/TrainingVideosManager';
import TrainingVideoEditor from './pages/TrainingVideoEditor';
import StudentProjectsManager from './pages/StudentProjectsManager';
import StudentProjectEditor from './pages/StudentProjectEditor';
import UsersManager from './pages/UsersManager';
import UserEditor from './pages/UserEditor';
import UserActivities from './pages/UserActivities';
import ActivityDashboard from './pages/ActivityDashboard';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="home-content" element={<HomeDashboard />} />
            <Route path="home/edit/:section" element={<HomeContentEditor />} />
            <Route path="academic-content" element={<AcademicDashboard />} />
            <Route path="academic/edit/:section" element={<AcademicContentEditor />} />
            <Route path="about-content" element={<AboutDashboard />} />
            <Route path="about/edit/:section" element={<AboutContentEditor />} />
            <Route path="blog-content" element={<BlogDashboard />} />
            <Route path="blog/:section" element={<BlogContentEditor />} />
            <Route path="blog-posts" element={<BlogPostsManager />} />
            <Route path="blog-posts/new" element={<BlogPostEditor />} />
            <Route path="blog-posts/edit/:id" element={<BlogPostEditor />} />
            <Route path="blog-comments" element={<BlogCommentsManager />} />
            <Route path="careers" element={<CareersDashboard />} />
            <Route path="careers/:section" element={<CareersContentEditor />} />
            <Route path="jobs" element={<JobsManager />} />
            <Route path="jobs/new" element={<JobEditor />} />
            <Route path="jobs/edit/:id" element={<JobEditor />} />
            <Route path="applications" element={<ApplicationsManager />} />
            <Route path="applications/:id" element={<ApplicationViewer />} />
            <Route path="contact" element={<ContactDashboard />} />
            <Route path="contact/:section" element={<ContactContentEditor />} />
            <Route path="contact-messages" element={<ContactMessagesManager />} />
            <Route path="faq-dashboard" element={<FAQDashboard />} />
            <Route path="faq/:section" element={<FAQContentEditor />} />
            <Route path="faq-items" element={<FAQItemsManager />} />
            <Route path="faq-items/new" element={<FAQItemEditor />} />
            <Route path="faq-items/edit/:id" element={<FAQItemEditor />} />
            <Route path="faq-questions" element={<FAQQuestionsManager />} />
            <Route path="library-dashboard" element={<LibraryDashboard />} />
            <Route path="library/:section" element={<LibraryContentEditor />} />
            <Route path="library-resources" element={<LibraryResourcesManager />} />
            <Route path="library-resources/new" element={<LibraryResourceEditor />} />
            <Route path="library-resources/edit/:id" element={<LibraryResourceEditor />} />
            <Route path="manufacturing-dashboard" element={<ManufacturingDashboard />} />
            <Route path="manufacturing/:section" element={<ManufacturingContentEditor />} />
            <Route path="manufacturing-products" element={<ManufacturingProductsManager />} />
            <Route path="manufacturing-products/new" element={<ManufacturingProductEditor />} />
            <Route path="manufacturing-products/edit/:id" element={<ManufacturingProductEditor />} />
            <Route path="news-events-dashboard" element={<NewsEventsDashboard />} />
            <Route path="news-events/:section" element={<NewsEventsContentEditor />} />
            <Route path="news-event-items" element={<NewsEventItemsManager />} />
            <Route path="news-event-item-editor/:id" element={<NewsEventItemEditor />} />
            <Route path="media-items" element={<MediaItemsManager />} />
            <Route path="media-items/new" element={<MediaItemEditor />} />
            <Route path="media-items/edit/:id" element={<MediaItemEditor />} />
            <Route path="events-calendar" element={<EventsCalendar />} />
            <Route path="register-dashboard" element={<RegisterDashboard />} />
            <Route path="register/:section" element={<RegisterContentEditor />} />
            <Route path="registrations" element={<RegistrationsManager />} />
            <Route path="registrations/:id" element={<RegistrationViewer />} />
            <Route path="research-dashboard" element={<ResearchDashboard />} />
            <Route path="research/:section" element={<ResearchContentEditor />} />
            <Route path="research-projects" element={<ResearchProjectsManager />} />
            <Route path="research-projects/new" element={<ResearchProjectEditor />} />
            <Route path="research-projects/edit/:id" element={<ResearchProjectEditor />} />
            <Route path="training-videos" element={<TrainingVideosManager />} />
            <Route path="training-videos/new" element={<TrainingVideoEditor />} />
            <Route path="training-videos/:id" element={<TrainingVideoEditor />} />
            <Route path="student-projects" element={<StudentProjectsManager />} />
            <Route path="student-projects/new" element={<StudentProjectEditor />} />
            <Route path="student-projects/:id" element={<StudentProjectEditor />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="users/:id" element={<UserEditor />} />
            <Route path="users/:userId/activities" element={<UserActivities />} />
            <Route path="activities" element={<ActivityDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
