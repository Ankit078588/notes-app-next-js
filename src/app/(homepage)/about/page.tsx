export default function About() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-200 flex flex-col items-center justify-center px-6">
        
        {/* About Content */}
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            About <span className="text-blue-600">MyApp</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            At MyApp, our mission is to simplify your workflow and make your daily 
            tasks more productive. We believe in building simple, powerful, and 
            accessible tools that help individuals and teams achieve more.
          </p>
        </div>
  
        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower people with technology that improves efficiency and 
              encourages collaboration, helping them focus on what truly matters.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become a trusted platform for productivity worldwide, 
              bringing simplicity and innovation to everyday work.
            </p>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
      </div>
    );
  }
  