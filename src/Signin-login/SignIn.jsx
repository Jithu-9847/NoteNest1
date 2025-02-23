// src/components/SignIn.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInAnonymously,
  updateProfile, // Import this
} from '../firebase';

const SignIn = () => {
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState(''); // For display name
  const [showNameInput, setShowNameInput] = useState(false); // Toggle display name input
  const navigate = useNavigate();

  const handleAnonymousSignIn = async () => {
    if (!displayName) {
      setError('Please enter a display name.');
      return;
    }

    try {
      // Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Update the user's profile with the display name
      await updateProfile(user, { displayName });

      console.log('Anonymous Sign-In Success:', user);
      navigate('/dashboard'); // Redirect after anonymous sign-in
    } catch (error) {
      setError(error.message); // Display error message
      console.error('Anonymous Sign-In Error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In Success:', user);
      navigate('/dashboard'); // Redirect after successful Google sign-in
    } catch (error) {
      setError(error.message); // Display error message
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6"
    >
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-blue-400 mb-6 text-center"
        >
          Sign In
        </motion.h1>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-red-600 text-white p-3 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        )}
        {!showNameInput ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 space-y-4"
            >
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Sign In with Google
              </button>
              <button
                onClick={() => setShowNameInput(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Continue as Guest
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4"
          >
            <p className="text-gray-300 text-center">
              Enter a display name to continue as a guest.
            </p>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAnonymousSignIn}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Continue
            </button>
            <button
              onClick={() => setShowNameInput(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Back
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SignIn;