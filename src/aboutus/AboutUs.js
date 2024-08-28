// AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="fade-in">About NoteNest</h1>
      <p className="fade-in">
        Welcome to NoteNest, your go-to platform for sharing and downloading study notes.
        We believe in the power of collaboration and knowledge sharing. Our mission is to
        provide a space where students can easily access high-quality notes and contribute
        their own, fostering a community of learners helping each other succeed.
      </p>
      <h2 className="fade-in">Our Mission</h2>
      <p className="fade-in">
        Our mission is to democratize education by providing free access to study materials
        for students around the world. We aim to make studying easier and more efficient by
        creating a centralized repository of notes covering a wide range of subjects and topics.
      </p>
      <h2 className="fade-in">Why Choose NoteNest?</h2>
      <ul className="fade-in">
        <li>Access a wide variety of study notes from different subjects and topics.</li>
        <li>Share your own notes and help others in their learning journey.</li>
        <li>Easy-to-use platform with a community-driven approach.</li>
        <li>Completely free to use with no hidden charges.</li>
      </ul>
      <h2 className="fade-in">Join Our Community</h2>
      <p className="fade-in">
        Join NoteNest today and become part of a thriving community of learners. Whether you're
        looking to improve your grades, share your knowledge, or just find some inspiration,
        NoteNest is the place for you. Together, we can make learning more accessible and enjoyable
        for everyone.
      </p>
           <h2>Credit:</h2>
      <p>Landing Page image is taken from:<a href="https://www.freepik.com/free-vector/focused-people-studying-online-school_8609144.htm#from_view=detail_alsolike">Image by pch.vector on Freepik</a></p>
    </div>
  );
};

export default AboutUs;
