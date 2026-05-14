import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Privacy Policy | ShaadiHub" description="Privacy policy for ShaadiHub" />
      <Navbar dark={true} />
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-20">
        <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-pink max-w-none text-gray-600 space-y-6">
          <p>Last updated: May 12, 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with vendors.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, and to connect you with wedding vendors.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
