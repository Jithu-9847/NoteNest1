import React, { useState } from 'react';

function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleMailto = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;

    // Create the mailto link
    const mailtoLink = `mailto:codewizard368@gmail.com?subject=Message from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-extrabold text-indigo-400 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 text-center">
          We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
        </p>

        <form className="space-y-4" onSubmit={handleMailto}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message here"
              value={formState.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
