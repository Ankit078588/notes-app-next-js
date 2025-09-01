


// export default function Home() {
//   return (
//     <div>
//       <div className="flex w-screen h-[100vh] items-center justify-center bg-gray-100">
//         <p>Hello, welocme to Landing page.</p>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-200 flex flex-col">
      
      {/* Navbar */}
      {/* <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          Get Started
        </button>
      </header> */}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Welcome to <span className="text-blue-600">MyApp</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          A modern platform to manage your work and stay productive. 
          Simple, fast, and powerful.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
            Get Started
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-500 text-sm shadow-inner">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
