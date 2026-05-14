import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Cookie Policy | ShaadiHub" description="Cookie policy for ShaadiHub" />
      <Navbar dark={true} />
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-20">
        <h1 className="text-4xl font-serif font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-pink max-w-none text-gray-600 space-y-6">
          <p>Last updated: May 12, 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">1. What are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">2. How We Use Cookies</h2>
            <p>We use cookies to understand how you use our site and to keep you logged in to your account.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
