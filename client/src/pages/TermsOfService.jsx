import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Terms of Service | ShaadiHub" description="Terms of service for ShaadiHub" />
      <Navbar dark={true} />
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-20">
        <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-pink max-w-none text-gray-600 space-y-6">
          <p>Last updated: May 12, 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using ShaadiHub, you agree to be bound by these terms of service and all applicable laws and regulations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-dark-text mt-8 mb-4">2. Use of Service</h2>
            <p>ShaadiHub provides a platform for couples to connect with wedding vendors. We are not responsible for the services provided by third-party vendors.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
