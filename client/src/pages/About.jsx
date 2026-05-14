import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, ShieldCheck, Users, Star, Sparkles, Award, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: "Elite Vendors", value: "500+", color: "text-primary-pink" },
    { label: "Happy Couples", value: "12k+", color: "text-white" },
    { label: "Luxury Venues", value: "45+", color: "text-gold" },
    { label: "Star Trust", value: "4.9/5", color: "text-white" }
  ];

  const pillars = [
    { 
      Icon: ShieldCheck, 
      title: "Verified Excellence", 
      desc: "Every vendor undergoes a multi-layer verification check by our dedicated quality team." 
    },
    { 
      Icon: Users, 
      title: "Direct Relations", 
      desc: "No middlemen. Just direct conversation between you and your dream vendors." 
    },
    { 
      Icon: Search, 
      title: "Style First Search", 
      desc: "Our engine prioritizes visual aesthetics, matching vendors to your exact vibe." 
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBFB' }}>
      <SEO 
        title="About Us | ShaadiHub"
        description="Discover the story behind India's most luxurious wedding vendor marketplace."
      />
      <Navbar dark={true} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span 
              className="inline-block px-4 py-1.5 text-primary-pink font-black uppercase mb-6"
              style={{ backgroundColor: '#FFF5F7', fontSize: '10px', letterSpacing: '0.3em', borderRadius: '9999px' }}
            >
              Our Legacy & Passion
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark-text mb-6 leading-tight">
              Designing <span className="text-primary-pink italic">Grandeur</span> <br/> Since 2024
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed font-light">
              We don't just list vendors; we curate experiences. Discover the artisans who will paint your wedding day with perfection.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 right-0 w-64 h-64 rounded-full blur-3xl -z-10" style={{ backgroundColor: 'rgba(255, 182, 193, 0.4)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -z-10" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }} />
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden shadow-2xl border-8 border-white" style={{ borderRadius: '40px', aspectRatio: '16/10' }}>
              <img 
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Wedding Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 blur-2xl -z-10" style={{ backgroundColor: 'rgba(255, 182, 193, 0.3)', borderRadius: '60px' }} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-dark-text">The Philosophy of Perfection</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              We believe every wedding has a soul. Our platform isn't just about bookings; it's about connecting you with artists who understand your vision. We bridge the gap between dreams and reality.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div 
                className="p-5 bg-white rounded-2xl shadow-sm border transition-colors"
                style={{ borderColor: '#FFF5F7' }}
              >
                <Sparkles className="text-primary-pink mb-3" size={24} />
                <h4 className="font-bold text-dark-text mb-1 text-base">Curated Excellence</h4>
                <p className="text-gray-400 uppercase font-bold" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Top 5% Vendors Only</p>
              </div>
              <div 
                className="p-5 bg-white rounded-2xl shadow-sm border transition-colors"
                style={{ borderColor: '#FFF5F7' }}
              >
                <Award className="text-gold mb-3" size={24} />
                <h4 className="font-bold text-dark-text mb-1 text-base">Luxury Service</h4>
                <p className="text-gray-400 uppercase font-bold" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Premium Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section 
        className="relative mx-4 mb-24 overflow-hidden py-20 shadow-2xl"
        style={{ backgroundColor: '#0A0A0A', borderRadius: '50px' }}
      >
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full" style={{ backgroundColor: 'rgba(233, 30, 99, 0.1)', filter: 'blur(120px)' }} />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', filter: 'blur(120px)' }} />
        
        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative p-8 border transition-all duration-500"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '32px' }}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-primary-pink group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(233, 30, 99, 0.1)' }}>
                    <Heart size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">Crafting a world where tradition meets modern efficiency.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative p-8 border transition-all duration-500"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '32px' }}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-gold group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                    <Star size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">Empowering professionals with digital tools for seamless journeys.</p>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-5 h-full">
              <div 
                className="h-full flex flex-col justify-center relative p-10 border backdrop-blur-sm"
                style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '40px' }}
              >
                <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-left group/stat">
                      <p className={`text-5xl font-black mb-2 transition-transform group-hover/stat:scale-110 ${stat.color}`}>{stat.value}</p>
                      <p className="font-bold uppercase text-gray-500" style={{ fontSize: '10px', letterSpacing: '0.3em' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-dark-text">The ShaadiHub Promise</h2>
          <div className="w-16 h-1 bg-primary-pink mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="flex flex-col bg-white p-8 text-center shadow-sm border hover:shadow-xl transition-all duration-500"
              style={{ borderColor: '#F9FAFB', borderRadius: '30px' }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary-pink mx-auto mb-6 shadow-inner"
                style={{ backgroundColor: '#FFF5F7' }}
              >
                <pillar.Icon size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-dark-text">{pillar.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ flexGrow: 1 }}>{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
