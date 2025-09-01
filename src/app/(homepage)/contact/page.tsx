export default function Contact() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-200 flex flex-col items-center justify-center px-6 pt-15">
        
        {/* Contact Content */}
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Contact <span className="text-blue-600">MyApp</span>
          </h1>
          <p className="text-lg text-gray-600">
            Have questions, feedback, or just want to say hello?  
            We’d love to hear from you. Reach out to us anytime.
          </p>
        </div>
  
        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-16">
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <textarea 
                rows={4} 
                placeholder="Your Message" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
  
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              You can also reach us through the following channels:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li><span className="font-semibold">Email:</span> support@myapp.com</li>
              <li><span className="font-semibold">Phone:</span> +91 98765 43210</li>
              <li><span className="font-semibold">Address:</span> 123 MyApp Street, Bengaluru, India</li>
            </ul>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
      </div>
    );
  }
  