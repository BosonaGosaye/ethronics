import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  Home, GraduationCap, FileText, TrendingUp, 
  Globe, Clock, CheckCircle, AlertCircle, ArrowRight, Info, BookOpen, Briefcase, Mail, HelpCircle, Library, Factory, Newspaper, UserPlus, Microscope, UserCog
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    homeContent: { total: 0, published: 0, draft: 0 },
    academicContent: { total: 0, published: 0, draft: 0 },
    aboutContent: { total: 0, published: 0, draft: 0 },
    blogContent: { total: 0, published: 0, draft: 0 },
    careersContent: { total: 0, published: 0, draft: 0 },
    contactContent: { total: 0, published: 0, draft: 0 },
    faqContent: { total: 0, published: 0, draft: 0 },
    libraryContent: { total: 0, published: 0, draft: 0 },
    manufacturingContent: { total: 0, published: 0, draft: 0 },
    newsEventsContent: { total: 0, published: 0, draft: 0 },
    registerContent: { total: 0, published: 0, draft: 0 },
    researchContent: { total: 0, published: 0, draft: 0 },
    usersCount: { total: 0, active: 0 },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const defaultStats = { total: 0, published: 0, draft: 0 };
      
      // Initialize all stats with defaults
      let homeStats = { ...defaultStats };
      let academicStats = { ...defaultStats };
      let aboutStats = { ...defaultStats };
      let blogStats = { ...defaultStats };
      let careersStats = { ...defaultStats };
      let contactStats = { ...defaultStats };
      let faqStats = { ...defaultStats };
      let libraryStats = { ...defaultStats };
      let recentActivity = [];
      
      // Fetch home content stats
      let homeData = [];
      try {
        const homeResponse = await axios.get('/home/admin/en');
        homeData = homeResponse.data.data || [];
        homeStats = {
          total: homeData.length,
          published: homeData.filter(item => item.isPublished).length,
          draft: homeData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch academic content stats
      let academicData = [];
      try {
        const academicResponse = await axios.get('/academic-sections/admin/en');
        academicData = academicResponse.data.data || [];
        academicStats = {
          total: academicData.length,
          published: academicData.filter(item => item.isPublished).length,
          draft: academicData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch about content stats
      let aboutData = [];
      try {
        const aboutResponse = await axios.get('/about/admin/en');
        aboutData = aboutResponse.data.data || [];
        aboutStats = {
          total: aboutData.length,
          published: aboutData.filter(item => item.isPublished).length,
          draft: aboutData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch blog content stats
      let blogData = [];
      try {
        const blogResponse = await axios.get('/blog/admin/en');
        blogData = blogResponse.data.data || [];
        blogStats = {
          total: blogData.length,
          published: blogData.filter(item => item.isPublished).length,
          draft: blogData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch careers content stats
      let careersData = [];
      try {
        const careersResponse = await axios.get('/careers/admin/en');
        careersData = careersResponse.data.data || [];
        careersStats = {
          total: careersData.length,
          published: careersData.filter(item => item.isPublished).length,
          draft: careersData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch contact content stats
      let contactData = [];
      try {
        const contactResponse = await axios.get('/contact/admin/en');
        contactData = contactResponse.data.data || [];
        contactStats = {
          total: contactData.length,
          published: contactData.filter(item => item.isPublished).length,
          draft: contactData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch FAQ content stats
      let faqData = [];
      try {
        const faqResponse = await axios.get('/faq/admin/en');
        faqData = faqResponse.data.data || [];
        faqStats = {
          total: faqData.length,
          published: faqData.filter(item => item.isPublished).length,
          draft: faqData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch library content stats
      let libraryData = [];
      try {
        const libraryResponse = await axios.get('/library/admin/en');
        libraryData = libraryResponse.data.data || [];
        libraryStats = {
          total: libraryData.length,
          published: libraryData.filter(item => item.isPublished).length,
          draft: libraryData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch manufacturing content stats
      let manufacturingStats = { ...defaultStats };
      let manufacturingData = [];
      try {
        const manufacturingResponse = await axios.get('/manufacturing/admin/en');
        manufacturingData = manufacturingResponse.data.data || [];
        manufacturingStats = {
          total: manufacturingData.length,
          published: manufacturingData.filter(item => item.isPublished).length,
          draft: manufacturingData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch news & events content stats
      let newsEventsStats = { ...defaultStats };
      let newsEventsData = [];
      try {
        const newsEventsResponse = await axios.get('/newsEvents/admin/en');
        newsEventsData = newsEventsResponse.data.data || [];
        newsEventsStats = {
          total: newsEventsData.length,
          published: newsEventsData.filter(item => item.isPublished).length,
          draft: newsEventsData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch register content stats
      let registerStats = { ...defaultStats };
      let registerData = [];
      try {
        const registerResponse = await axios.get('/register/admin/en');
        registerData = registerResponse.data.data || [];
        registerStats = {
          total: registerData.length,
          published: registerData.filter(item => item.isPublished).length,
          draft: registerData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch research content stats
      let researchStats = { ...defaultStats };
      let researchData = [];
      try {
        const researchResponse = await axios.get('/research/admin/en');
        researchData = researchResponse.data.data || [];
        researchStats = {
          total: researchData.length,
          published: researchData.filter(item => item.isPublished).length,
          draft: researchData.filter(item => !item.isPublished).length
        };
      } catch (error) {
        // Silently handle - content may not exist yet
      }

      // Fetch users count
      let usersCount = { total: 0, active: 0 };
      try {
        const usersResponse = await axios.get('/users');
        const usersData = usersResponse.data.data || [];
        usersCount = {
          total: usersData.length,
          active: usersData.filter(user => user.isActive).length
        };
      } catch (error) {
        // Silently handle - may not have permission
      }

      // Fetch recent activity logs from backend
      try {
        const activityResponse = await axios.get('/users/activities/all?limit=10');
        if (activityResponse.data.success) {
          recentActivity = activityResponse.data.data.map(activity => ({
            type: activity.resource,
            action: activity.action,
            section: activity.details?.section || 'N/A',
            language: activity.details?.language || 'en',
            updatedAt: activity.createdAt,
            status: activity.status === 'success' ? 'success' : 'error',
            user: activity.user?.name || 'Unknown',
            resourceId: activity.resourceId
          }));
        }
      } catch (error) {
        // If activity logs fail, build from content data as fallback
        recentActivity = [
          ...homeData.slice(0, 1).map(item => ({
            type: 'home',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...academicData.slice(0, 1).map(item => ({
            type: 'academic',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...aboutData.slice(0, 1).map(item => ({
            type: 'about',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...blogData.slice(0, 1).map(item => ({
            type: 'blog',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...careersData.slice(0, 1).map(item => ({
            type: 'careers',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...contactData.slice(0, 1).map(item => ({
            type: 'contact',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...faqData.slice(0, 1).map(item => ({
            type: 'faq',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...libraryData.slice(0, 1).map(item => ({
            type: 'library',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...manufacturingData.slice(0, 1).map(item => ({
            type: 'manufacturing',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...newsEventsData.slice(0, 1).map(item => ({
            type: 'newsEvents',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...registerData.slice(0, 1).map(item => ({
            type: 'register',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          })),
          ...researchData.slice(0, 1).map(item => ({
            type: 'research',
            action: 'content_update',
            section: item.section,
            language: item.language,
            updatedAt: item.updatedAt,
            status: item.isPublished ? 'published' : 'draft',
            user: 'System'
          }))
        ];

        // Sort by most recent
        recentActivity.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        recentActivity = recentActivity.slice(0, 10); // Show only 10 most recent
      }

      // Set all stats at once
      setStats({
        homeContent: homeStats,
        academicContent: academicStats,
        aboutContent: aboutStats,
        blogContent: blogStats,
        careersContent: careersStats,
        contactContent: contactStats,
        faqContent: faqStats,
        libraryContent: libraryStats,
        manufacturingContent: manufacturingStats,
        newsEventsContent: newsEventsStats,
        registerContent: registerStats,
        researchContent: researchStats,
        usersCount: usersCount,
        recentActivity
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set all defaults if everything fails
      setStats({
        homeContent: { total: 0, published: 0, draft: 0 },
        academicContent: { total: 0, published: 0, draft: 0 },
        aboutContent: { total: 0, published: 0, draft: 0 },
        blogContent: { total: 0, published: 0, draft: 0 },
        careersContent: { total: 0, published: 0, draft: 0 },
        contactContent: { total: 0, published: 0, draft: 0 },
        faqContent: { total: 0, published: 0, draft: 0 },
        libraryContent: { total: 0, published: 0, draft: 0 },
        manufacturingContent: { total: 0, published: 0, draft: 0 },
        newsEventsContent: { total: 0, published: 0, draft: 0 },
        registerContent: { total: 0, published: 0, draft: 0 },
        researchContent: { total: 0, published: 0, draft: 0 },
        usersCount: { total: 0, active: 0 },
        recentActivity: []
      });
    } finally {
      setLoading(false);
    };
  }

  const quickLinks = [
    {
      title: 'Home Page',
      description: 'Manage home page content and sections',
      icon: Home,
      href: '/home-content',
      color: 'from-purple-500 to-cyan-500',
      stats: stats.homeContent
    },
    {
      title: 'Academic Page',
      description: 'Edit academic programs and content',
      icon: GraduationCap,
      href: '/academic-content',
      color: 'from-purple-500 to-pink-500',
      stats: stats.academicContent
    },
    {
      title: 'About Page',
      description: 'Manage about us page content',
      icon: Info,
      href: '/about-content',
      color: 'from-indigo-500 to-purple-500',
      stats: stats.aboutContent
    },
    {
      title: 'Blog Page',
      description: 'Manage blog posts and authors',
      icon: BookOpen,
      href: '/blog-content',
      color: 'from-orange-500 to-pink-500',
      stats: stats.blogContent
    },
    {
      title: 'Careers Page',
      description: 'Manage job listings and applications',
      icon: Briefcase,
      href: '/careers',
      color: 'from-teal-500 to-green-500',
      stats: stats.careersContent
    },
    {
      title: 'Contact Page',
      description: 'Manage contact form and messages',
      icon: Mail,
      href: '/contact',
      color: 'from-orange-500 to-purple-500',
      stats: stats.contactContent
    },
    {
      title: 'FAQ Page',
      description: 'Manage frequently asked questions',
      icon: HelpCircle,
      href: '/faq-dashboard',
      color: 'from-blue-500 to-cyan-500',
      stats: stats.faqContent
    },
    {
      title: 'Library Page',
      description: 'Manage digital library resources',
      icon: Library,
      href: '/library-dashboard',
      color: 'from-indigo-500 to-blue-500',
      stats: stats.libraryContent
    },
    {
      title: 'Manufacturing',
      description: 'Manage manufacturing content and products',
      icon: Factory,
      href: '/manufacturing-dashboard',
      color: 'from-gray-600 to-gray-800',
      stats: stats.manufacturingContent
    },
    {
      title: 'News & Events',
      description: 'Manage news articles and events',
      icon: Newspaper,
      href: '/news-events-dashboard',
      color: 'from-blue-600 to-indigo-600',
      stats: stats.newsEventsContent
    },
    {
      title: 'Register Page',
      description: 'Manage registration content and submissions',
      icon: UserPlus,
      href: '/register-dashboard',
      color: 'from-green-500 to-emerald-600',
      stats: stats.registerContent
    },
    {
      title: 'Research Page',
      description: 'Manage research projects and content',
      icon: Microscope,
      href: '/research-dashboard',
      color: 'from-purple-600 to-indigo-600',
      stats: stats.researchContent
    },
    {
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: UserCog,
      href: '/users',
      color: 'from-red-500 to-pink-600',
      stats: { total: stats.usersCount.total, published: stats.usersCount.active }
    }
  ];

  const totalContent = stats.homeContent.total + stats.academicContent.total + stats.aboutContent.total + stats.blogContent.total + stats.careersContent.total + stats.contactContent.total + stats.faqContent.total + stats.libraryContent.total;
  const totalPublished = stats.homeContent.published + stats.academicContent.published + stats.aboutContent.published + stats.blogContent.published + stats.careersContent.published + stats.contactContent.published + stats.faqContent.published + stats.libraryContent.published;
  const totalDraft = stats.homeContent.draft + stats.academicContent.draft + stats.aboutContent.draft + stats.blogContent.draft + stats.careersContent.draft + stats.contactContent.draft + stats.faqContent.draft + stats.libraryContent.draft;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Ethronics CMS</h1>
        <p className="text-purple-100 text-lg">
          Manage your website content across multiple languages with ease
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Content</p>
          <p className="text-3xl font-bold text-gray-900">{totalContent}</p>
          <p className="text-xs text-gray-500 mt-2">Across all pages</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Published</p>
          <p className="text-3xl font-bold text-green-600">{totalPublished}</p>
          <p className="text-xs text-gray-500 mt-2">Live on website</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-3xl font-bold text-yellow-600">{totalDraft}</p>
          <p className="text-xs text-gray-500 mt-2">Pending review</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Languages</p>
          <p className="text-3xl font-bold text-purple-600">3</p>
          <p className="text-xs text-gray-500 mt-2">EN, AM, OM</p>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${link.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${link.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{link.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{link.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">{link.stats.total} sections</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{link.stats.published} published</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {stats.recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'home' ? 'bg-purple-50' : 
                        activity.type === 'academic' ? 'bg-purple-50' : 
                        activity.type === 'about' ? 'bg-indigo-50' :
                        activity.type === 'blog' ? 'bg-orange-50' :
                        'bg-teal-50'
                      }`}>
                        {activity.type === 'home' ? (
                          <Home className="w-5 h-5 text-purple-600" />
                        ) : activity.type === 'academic' ? (
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                        ) : activity.type === 'about' ? (
                          <Info className="w-5 h-5 text-indigo-600" />
                        ) : activity.type === 'blog' ? (
                          <BookOpen className="w-5 h-5 text-orange-600" />
                        ) : activity.type === 'careers' ? (
                          <Briefcase className="w-5 h-5 text-teal-600" />
                        ) : activity.type === 'contact' ? (
                          <Mail className="w-5 h-5 text-orange-600" />
                        ) : activity.type === 'faq' ? (
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        ) : activity.type === 'library' ? (
                          <Library className="w-5 h-5 text-indigo-600" />
                        ) : activity.type === 'manufacturing' ? (
                          <Factory className="w-5 h-5 text-gray-600" />
                        ) : activity.type === 'newsEvents' ? (
                          <Newspaper className="w-5 h-5 text-blue-600" />
                        ) : activity.type === 'register' ? (
                          <UserPlus className="w-5 h-5 text-green-600" />
                        ) : activity.type === 'research' ? (
                          <Microscope className="w-5 h-5 text-purple-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action === 'content_create' ? 'Created' :
                           activity.action === 'content_update' ? 'Updated' :
                           activity.action === 'content_delete' ? 'Deleted' :
                           activity.action === 'content_publish' ? 'Published' :
                           activity.action === 'content_unpublish' ? 'Unpublished' :
                           activity.action === 'login' ? 'Logged in' :
                           activity.action === 'logout' ? 'Logged out' :
                           activity.action} {activity.section !== 'N/A' ? `- ${activity.section.charAt(0).toUpperCase() + activity.section.slice(1)}` : ''}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.type === 'home' ? 'Home Page' : 
                           activity.type === 'academic' ? 'Academic Page' : 
                           activity.type === 'about' ? 'About Page' :
                           activity.type === 'blog' ? 'Blog Page' :
                           activity.type === 'careers' ? 'Careers Page' :
                           activity.type === 'contact' ? 'Contact Page' :
                           activity.type === 'faq' ? 'FAQ Page' :
                           activity.type === 'library' ? 'Library Page' :
                           activity.type === 'manufacturing' ? 'Manufacturing' :
                           activity.type === 'newsEvents' ? 'News & Events' :
                           activity.type === 'register' ? 'Register Page' :
                           activity.type === 'research' ? 'Research Page' :
                           activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {activity.language.toUpperCase()} • by {activity.user}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        activity.status === 'published' || activity.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : activity.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status === 'success' ? 'Success' : 
                         activity.status === 'error' ? 'Error' :
                         activity.status}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(activity.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}