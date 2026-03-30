const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Electronics Engineer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Ethronics transformed my career. The hands-on approach and expert instructors gave me the confidence to excel in my field.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Michael Chen",
      role: "IoT Developer",
      company: "SmartDevices Inc",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The practical projects and real-world applications made all the difference. I landed my dream job within 3 months of graduation.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Robotics Specialist",
      company: "AutoTech Solutions",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The comprehensive curriculum and industry connections at Ethronics opened doors I never thought possible.",
      gradient: "from-emerald-500 to-green-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wide">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            What Our 
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our successful graduates who are now thriving in their careers
            and making a difference in the tech industry worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="absolute -top-2 -left-2 text-6xl text-gray-200 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                  "
                </div>

                <div className="flex items-center mb-6 relative">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-300">
                      {testimonial.name}
                    </h4>
                    <p className={`bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent font-semibold`}>
                      {testimonial.role}
                    </p>
                    <p className="text-gray-500 text-sm font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <blockquote className="text-gray-600 leading-relaxed mb-6 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  {testimonial.quote}
                </blockquote>

                {/* Star rating with animation */}
                <div className="flex text-yellow-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-5 h-5 fill-current transform hover:scale-125 transition-transform duration-200" 
                      viewBox="0 0 20 20"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-bounce delay-1000"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-50 animate-bounce delay-2000"></div>
            </div>
          ))}
        </div>

        {/* Additional testimonial stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "98%", label: "Job Placement Rate", gradient: "from-blue-500 to-cyan-500" },
              { number: "4.9/5", label: "Student Satisfaction", gradient: "from-purple-500 to-indigo-500" },
              { number: "1000+", label: "Graduates", gradient: "from-emerald-500 to-green-500" },
              { number: "50+", label: "Partner Companies", gradient: "from-orange-500 to-yellow-500" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group text-center transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:animate-pulse`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials