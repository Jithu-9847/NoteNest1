import React from 'react';
import { Link } from 'react-router-dom';
import edu from "./Education.svg";
import card1 from "../assests/study.jpg";
import card2 from "../assests/community.jpg";
import card3 from "../assests/ace-exam.jpg";
import DecryptedText from '../animations/text-animation';

function LandingPage() {
  console.log("hello world")
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      {/* Main Content Section */}
      <main className="flex flex-col md:flex-row justify-center items-center px-8 py-16 space-y-1 md:space-y-0 h-screen">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 mb-48">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          <DecryptedText
              text="Unlock the Best Study Resources"
              speed={150}
              animateOn="view"
              revealDirection="start"
            />
           </h2>
          <p className="text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
            <DecryptedText
              text="Short on time, long on goals? Note Nest is your hub to download notes, connect with classmates, and ace your exams effortlessly!"
              speed={100}
              animateOn="view"
              revealDirection="start"
            />
            
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <Link to="/Contribute">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                Contribute
              </button>
            </Link>
            <Link to="/Notes">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                Get Notes
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={edu}
            alt="Students studying"
            className="w-3/4 md:w-full animate-transform duration-500 transform hover:scale-105"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-800 py-12 px-8">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">Why Choose Note Nest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img src={card1} alt="Easy Access" className="w-32 h-32 mb-4 rounded-xl" />
            <h3 className="text-xl font-semibold">Easy Access</h3>
            <p className="text-gray-300">Access notes anytime, anywhere with just a click.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={card2} alt="Community" className="w-32 h-32 mb-4 rounded-xl" />
            <h3 className="text-xl font-semibold">Collaborative Community</h3>
            <p className="text-gray-300">Connect and share with your classmates seamlessly.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={card3} alt="Exam Success" className="w-32 h-32 mb-4 rounded-xl" />
            <h3 className="text-xl font-semibold">Ace Your Exams</h3>
            <p className="text-gray-300">Prepare with the best resources and achieve your goals.</p>
          </div>
        </div>
      </section>





      {/* Call to Action Section
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16 px-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8">Join Note Nest today and unlock a world of knowledge.</p>
        <Link to="/Notes">
          <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 rounded-lg shadow-lg font-semibold transform transition duration-300 hover:scale-105">
            Get Notes!
          </button>
        </Link>
      </section> */}
    </div>
  );
}

export default LandingPage;
