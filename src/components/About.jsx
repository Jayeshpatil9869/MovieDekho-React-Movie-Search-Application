const AboutUs = () => {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-100">About Us</h1>
          <p className="text-lg text-gray-300 mb-6">
            We are a team of passionate creators, dedicated to delivering innovative solutions
            through technology and design. Our goal is to create experiences that are seamless,
            engaging, and impactful.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Our Mission</h2>
              <p className="text-gray-400 mt-2">Empowering businesses with cutting-edge solutions.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Our Vision</h2>
              <p className="text-gray-400 mt-2">To revolutionize the industry through technology.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Our Values</h2>
              <p className="text-gray-400 mt-2">Innovation, integrity, and excellence.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  