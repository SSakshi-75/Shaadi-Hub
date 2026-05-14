import { Search, MessageSquare, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Browse Vendors',
    description: 'Explore thousands of top-rated wedding vendors across all categories.',
    icon: <Search className="w-8 h-8" />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Contact & Inquiry',
    description: 'Send inquiries directly to vendors and discuss your requirements.',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'bg-primary-pink/10 text-primary-pink'
  },
  {
    title: 'Book & Celebrate',
    description: 'Secure your bookings and focus on enjoying your dream wedding.',
    icon: <CalendarCheck className="w-8 h-8" />,
    color: 'bg-green-100 text-green-600'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-text mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Planning your wedding is now as easy as a few clicks. Follow our simple process to find your perfect team.</p>
          <div className="w-20 h-1 bg-primary-pink mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:rotate-12`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
