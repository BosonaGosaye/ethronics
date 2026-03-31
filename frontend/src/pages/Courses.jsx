import { useState } from 'react'

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'programming', name: 'Programming' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'iot', name: 'IoT' }
  ]

  const courses = [
    {
      id: 1,
      title: "Electronics Fundamentals",
      category: "electronics",
      level: "Beginner",
      duration: "8 weeks",
      price: "$299",
      image: "",
      description: "Master the basics of electronics including circuits, components, and measurements.",
      features: ["Circuit Analysis", "Component Identification", "Hands-on Labs", "Certificate"]
    },
    {
      id: 2,
      title: "Arduino Programming",
      category: "programming",
      level: "Intermediate",
      duration: "6 weeks",
      price: "$249",
      image: "",
      description: "Learn to program Arduino microcontrollers for various projects and applications.",
      features: ["C++ Programming", "Sensor Integration", "Project Building", "Certificate"]
    },
    {
      id: 3,
      title: "Robotics Engineering",
      category: "robotics",
      level: "Advanced",
      duration: "12 weeks",
      price: "$599",
      image: "",
      description: "Design and build autonomous robots using advanced engineering principles.",
      features: ["Mechanical Design", "Control Systems", "AI Integration", "Certificate"]
    },
    {
      id: 4,
      title: "IoT Development",
      category: "iot",
      level: "Intermediate",
      duration: "10 weeks",
      price: "$449",
      image: "",
      description: "Create connected devices and smart systems using IoT technologies.",
      features: ["Cloud Integration", "Wireless Communication", "Data Analytics", "Certificate"]
    },
    {
      id: 5,
      title: "PCB Design Mastery",
      category: "electronics",
      level: "Advanced",
      duration: "8 weeks",
      price: "$399",
      image: "",
      description: "Professional PCB design using industry-standard tools and best practices.",
      features: ["Altium Designer", "Signal Integrity", "Manufacturing", "Certificate"]
    },
    {
      id: 6,
      title: "Embedded Systems",
      category: "programming",
      level: "Advanced",
      duration: "14 weeks",
      price: "$699",
      image: "",
      description: "Comprehensive embedded systems development from basics to advanced topics.",
      features: ["Real-time OS", "Hardware Interfacing", "Debugging", "Certificate"]
    }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive electronics and technology courses designed to advance your career 
            and expand your technical expertise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card group hover:scale-105 transition-transform duration-300">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="text-2xl font-bold text-primary-600">{course.price}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">📅 {course.duration}</span>
                <span>🎓 Certificate included</span>
              </div>
              <ul className="space-y-2 mb-6">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-primary">
                Enroll Now
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We offer custom training programs tailored to your specific needs and goals.
          </p>
          <button className="btn-primary">
            Contact Us for Custom Training
          </button>
        </div>
      </div>
    </div>
  )
}

export default Courses