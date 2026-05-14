import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedVendors from '../components/FeaturedVendors';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen">
      <SEO 
        title="Home"
        description="ShaadiHub is India's leading wedding vendor marketplace. Find the best Lehenga rentals, makeup artists, photographers, and more for your dream wedding."
        type="website"
      />
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedVendors />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
