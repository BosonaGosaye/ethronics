// Default content structures for all sections across different pages

export const getDefaultContent = (page, section) => {
  const defaults = {
    home: {
      hero: {
        badge: '',
        slide1: { line1: '', line2: '', line3: '', description: '', image: '' },
        buttons: { summerTraining: '', explorePrograms: '', viewResearch: '' },
        floatingPromo: { title: '', description: '', button: '' }
      },
      features: {
        title: '',
        subtitle: '',
        learnMore: '',
        modalDescription: '',
        items: []
      },
      solutions: {
        title: '',
        subtitle: '',
        items: []
      },
      gallery: {
        title: '',
        subtitle: '',
        images: []
      },
      partnerships: {
        title: '',
        subtitle: '',
        partners: []
      },
      cta: {
        title: '',
        subtitle: '',
        buttonText: '',
        backgroundImage: ''
      }
    },
    manufacturing: {
      hero: {
        title: '',
        subtitle: '',
        description: '',
        backgroundImage: '',
        buttons: { primary: '', secondary: '' }
      },
      capabilities: {
        title: '',
        subtitle: '',
        items: []
      },
      products: {
        title: '',
        subtitle: '',
        description: ''
      },
      sustainability: {
        title: '',
        subtitle: '',
        description: '',
        items: []
      },
      cta: {
        title: '',
        subtitle: '',
        buttonText: '',
        backgroundImage: ''
      }
    },
    about: {
      hero: {
        title: '',
        subtitle: '',
        description: '',
        backgroundImage: ''
      },
      purpose: {
        title: '',
        description: '',
        items: []
      },
      leaders: {
        title: '',
        subtitle: '',
        teamMembers: []
      },
      threeFronts: {
        title: '',
        subtitle: '',
        fronts: []
      },
      journey: {
        title: '',
        description: '',
        buttonText: ''
      }
    },
    academic: {
      hero: {
        title: '',
        subtitle: '',
        description: '',
        backgroundImage: '',
        buttons: { primary: '', secondary: '' }
      },
      whyChooseUs: {
        title: '',
        subtitle: '',
        features: []
      },
      vision: {
        title: '',
        description: '',
        image: ''
      },
      programs: {
        title: '',
        subtitle: '',
        levels: []
      },
      admissions: {
        title: '',
        subtitle: '',
        steps: []
      },
      faculty: {
        title: '',
        description: '',
        image: ''
      },
      cta: {
        title: '',
        subtitle: '',
        buttonText: '',
        backgroundImage: ''
      }
    },
    careers: {
      hero: {
        title: 'Join Our Team',
        description: 'Build your career with innovative projects and talented people',
        buttons: {
          browse: 'Browse Opportunities',
          post: 'Post a Job'
        }
      },
      search: {
        labels: {
          title: 'Job Title or Keywords',
          location: 'Location',
          type: 'Job Type',
          company: 'Company'
        },
        placeholders: {
          search: 'e.g. Software Engineer',
          location: 'Select location',
          type: 'Select type',
          company: 'Select company'
        },
        button: 'Search Jobs',
        popularSearches: 'Popular Searches:',
        quickFilters: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer'],
        locations: [
          { value: 'all', label: 'All Locations' },
          { value: 'addis-ababa', label: 'Addis Ababa' },
          { value: 'dire-dawa', label: 'Dire Dawa' }
        ],
        jobTypes: [
          { value: 'all', label: 'All Types' },
          { value: 'full-time', label: 'Full Time' },
          { value: 'part-time', label: 'Part Time' },
          { value: 'contract', label: 'Contract' },
          { value: 'internship', label: 'Internship' }
        ],
        companies: [
          { value: 'all', label: 'All Companies' }
        ]
      },
      listings: {
        title: 'Available Positions',
        found: 'Found',
        jobsMatching: 'jobs matching your criteria',
        loading: 'Loading jobs...',
        error: 'Error loading jobs',
        featured: 'Featured',
        applicants: 'applicants',
        deadline: 'Deadline',
        loadMore: 'Load More',
        showing: 'Showing',
        of: 'of',
        noResults: {
          title: 'No jobs found',
          description: 'Try adjusting your search criteria'
        },
        sortBy: {
          label: 'Sort by:',
          newest: 'Newest First',
          salary: 'Salary',
          company: 'Company',
          deadline: 'Deadline'
        }
      },
      process: {
        title: 'Application Process',
        description: 'How to apply and what to expect',
        steps: [
          {
            title: 'Submit Application',
            duration: '5-10 minutes',
            description: 'Complete our online application form',
            details: ['Fill in your personal information', 'Upload your resume/CV', 'Add a cover letter']
          },
          {
            title: 'Initial Screening',
            duration: '1-2 days',
            description: 'Our team reviews your application',
            details: ['Resume review', 'Qualification check', 'Initial assessment']
          },
          {
            title: 'Interview',
            duration: '1-2 weeks',
            description: 'Meet with our team',
            details: ['Technical interview', 'Cultural fit assessment', 'Q&A session']
          }
        ],
        tips: {
          title: 'Application Tips',
          items: [
            {
              title: 'Resume Tips',
              tips: ['Keep it concise and relevant', 'Highlight your achievements', 'Use action verbs']
            }
          ]
        },
        faq: {
          title: 'Frequently Asked Questions',
          questions: [
            {
              question: 'How long does the process take?',
              answer: 'Typically 2-4 weeks from application to offer'
            }
          ]
        },
        support: {
          title: 'Need Help?',
          description: 'Contact our recruitment team',
          buttons: {
            contact: 'Contact Us',
            support: 'Support Center'
          }
        }
      }
    },
    contact: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      details: {
        title: '',
        phone: '',
        email: '',
        address: ''
      },
      location: {
        title: '',
        mapUrl: '',
        address: ''
      },
      form: {
        title: '',
        subtitle: '',
        fields: []
      }
    },
    faq: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      categories: {
        title: '',
        subtitle: '',
        categories: []
      },
      questions: {
        title: '',
        items: []
      }
    },
    library: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      resources: {
        title: '',
        subtitle: '',
        categories: []
      },
      access: {
        title: '',
        description: '',
        buttonText: ''
      }
    },
    register: {
      hero: {
        title: '',
        subtitle: '',
        description: '',
        backgroundImage: ''
      },
      objective: {
        title: '',
        description: '',
        items: []
      },
      highlights: {
        title: '',
        items: []
      },
      form: {
        title: '',
        subtitle: '',
        fields: []
      },
      faq: {
        title: '',
        items: []
      },
      gallery: {
        title: '',
        subtitle: '',
        trainingVideos: [],
        studentProjects: []
      }
    },
    research: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      focus: {
        title: '',
        subtitle: '',
        areas: []
      },
      projects: {
        title: '',
        subtitle: '',
        projects: []
      },
      publications: {
        title: '',
        items: []
      }
    },
    blog: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      featured: {
        title: '',
        posts: []
      },
      categories: {
        title: '',
        categories: []
      }
    },
    newsEvents: {
      hero: {
        title: '',
        subtitle: '',
        description: ''
      },
      mediaCenter: {
        title: '',
        subtitle: '',
        items: []
      },
      events: {
        title: '',
        subtitle: '',
        items: []
      }
    }
  };

  // Return the specific default or a generic one
  return defaults[page]?.[section] || { title: '', description: '', items: [] };
};
