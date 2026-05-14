import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Lehenga', icon: '👗', image: '/images/lehenga.png' },
  { name: 'Makeup', icon: '💄', image: '/images/makeup.png' },
  { name: 'Photographer', icon: '📸', image: '/images/photographer.png' },
  { name: 'Decoration', icon: '✨', image: '/images/decoration.png' },
  { name: 'Caterer', icon: '🥘', image: '/images/catering.png' },
  { name: 'DJ', icon: '🎧', image: '/images/dj.png' },
  { name: 'Mehendi', icon: '🎨', image: '/images/mehendi.png' },
  { name: 'Wedding Planner', icon: '📋', image: '/images/planner.png' },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/vendors?category=${category}`);
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-dark-text mb-4">Browse Categories</h2>
        <div className="w-20 h-1 bg-primary-pink mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            whileHover={{ y: -10 }}
            onClick={() => handleCategoryClick(cat.name)}
            className="group cursor-pointer"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-md">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="font-bold text-lg">{cat.name}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
