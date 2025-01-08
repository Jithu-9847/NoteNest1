import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6">Terms of Use</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p className="text-lg">
          Welcome to NoteNest. By using our website, you agree to comply with and be bound by these Terms of Use.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Usage Rights</h2>
        <p className="text-lg">
          You are granted a limited, non-exclusive license to access and use the website and services provided.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
        <ul className="list-disc pl-6 text-lg">
          <li>Reproducing, distributing, or selling any content without permission.</li>
          <li>Engaging in activities that disrupt or interfere with the website's operations.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Liability</h2>
        <p className="text-lg">
          We are not responsible for any damages, losses, or issues arising from your use of the website.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Changes to Terms</h2>
        <p className="text-lg">
          We reserve the right to modify or update these Terms of Use at any time. Please check periodically for changes.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
