import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p className="text-lg">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your data.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p className="text-lg">
          We collect personal information such as your name, email address, and usage data when you interact with our website.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-lg">
          <li>To provide and improve our services.</li>
          <li>To communicate with you regarding updates and promotions.</li>
          <li>To personalize your experience on our platform.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Data Protection</h2>
        <p className="text-lg">
          We use industry-standard security measures to protect your information from unauthorized access.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Changes to Privacy Policy</h2>
        <p className="text-lg">
          We may update this Privacy Policy from time to time. We encourage you to review it periodically.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
