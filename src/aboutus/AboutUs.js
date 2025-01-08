import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-indigo-400 text-center animate-fade-in">
          About NoteNest
        </h1>

        {/* Welcome Message */}
        <p className="text-lg text-gray-300 leading-relaxed text-center animate-fade-in">
          Welcome to <span className="text-indigo-400 font-bold">NoteNest</span>, your go-to platform for sharing and downloading study notes. 
          We believe in the power of collaboration and knowledge sharing. Our mission is to provide a space where students can easily access 
          high-quality notes and contribute their own, fostering a community of learners helping each other succeed.
        </p>

        {/* Mission Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-indigo-300 text-center animate-fade-in">
            Our Mission
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed animate-fade-in">
            Our mission is to democratize education by providing free access to study materials for students around the world. We aim to make studying easier and 
            more efficient by creating a centralized repository of notes covering a wide range of subjects and topics.
          </p>
        </div>

        {/* Why Choose NoteNest */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-indigo-300 text-center animate-fade-in">
            Why Choose NoteNest?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg animate-fade-in">
            <li>Access a wide variety of study notes from different subjects and topics.</li>
            <li>Share your own notes and help others in their learning journey.</li>
            <li>Easy-to-use platform with a community-driven approach.</li>
            <li>Completely free to use with no hidden charges.</li>
          </ul>
        </div>

        {/* Join Our Community */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-indigo-300 text-center animate-fade-in">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed animate-fade-in">
            Join <span className="text-indigo-400 font-bold">NoteNest</span> today and become part of a thriving community of learners. 
            Whether you're looking to improve your grades, share your knowledge, or just find some inspiration, NoteNest is the place for you. 
            Together, we can make learning more accessible and enjoyable for everyone.
          </p>
        </div>

        {/* Credit Section */}
        <div className="space-y-2 text-gray-400 text-sm">
          <h2 className="text-lg font-bold text-indigo-300 animate-fade-in">Credit:</h2>
          <p className="animate-fade-in">
            Landing page image is taken from:{" "}
            <a
              href="https://www.freepik.com/free-vector/focused-people-studying-online-school_8609144.htm#from_view=detail_alsolike"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Image by pch.vector on Freepik
            </a>
          </p>
          <br />
          <span>For Any Enquiry Feel Free to Contact:  </span><span className=" text-purple-600">codewizard368@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
