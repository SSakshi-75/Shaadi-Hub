import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Bride',
    text: 'ShaadiHub made my wedding planning so much easier! I found the best makeup artist and decorator within my budget in just two days.',
    image: '/images/user1.png'
  },
  {
    name: 'Rahul Verma',
    role: 'Groom',
    text: 'The vendor selection is amazing. We booked our photographer through here and the experience was seamless from start to finish.',
    image: '/images/user2.png'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-soft-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-text mb-4">What Couples Say</h2>
          <div className="w-20 h-1 bg-primary-pink mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary-pink/20">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 text-primary-pink/10 w-12 h-12" />
                <p className="text-gray-600 italic mb-4 relative z-10">{t.text}</p>
                <h4 className="font-bold text-dark-text">{t.name}</h4>
                <p className="text-primary-pink text-sm font-medium">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
