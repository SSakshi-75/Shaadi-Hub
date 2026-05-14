import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

dotenv.config({ path: './.env' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Finalizing Categorized Seeding...');

    // Clear existing data (Optional - Be careful)
    await User.deleteMany({ role: 'vendor' });
    await Vendor.deleteMany({});

    const password = await bcrypt.hash('password123', 10);

    const vendors = [
      {
        name: 'Anita Dongre Rentals',
        email: 'anita@example.com',
        businessName: 'Anita Dongre Bridal Studio',
        category: 'Lehenga',
        pricing: '₹25,000 - ₹1,50,000',
        location: 'Mumbai',
        description: 'Exquisite bridal lehengas and ethnic wear.',
        gallery: ['/images/lehenga.png']
      },
      {
        name: 'Sabyasachi Mukherjee',
        email: 'sabya@example.com',
        businessName: 'Sabyasachi Bridal Heritage',
        category: 'Lehenga',
        pricing: '₹5,00,000 - ₹15,00,000',
        location: 'Kolkata',
        description: 'Iconic Indian designer.',
        gallery: ['/images/lehenga2.png']
      },
      {
        name: 'Manish Malhotra',
        email: 'manish@example.com',
        businessName: 'Manish Malhotra World',
        category: 'Lehenga',
        pricing: '₹3,00,000 - ₹10,00,000',
        location: 'Mumbai',
        description: 'Glamourous emerald green and gold collections.',
        gallery: ['/images/lehenga3.png']
      },
      {
        name: 'Tarun Tahiliani',
        email: 'tarun@example.com',
        businessName: 'Tarun Tahiliani Studio',
        category: 'Lehenga',
        pricing: '₹1,50,000 - ₹6,00,000',
        location: 'Delhi',
        description: 'Master of pastel drapes and silhouettes.',
        gallery: ['/images/lehenga4.png']
      },
      {
        name: 'Namrata Soni',
        email: 'namrata@example.com',
        businessName: 'Namrata Soni Makeup',
        category: 'Makeup',
        pricing: '₹40,000 - ₹1,00,000',
        location: 'Mumbai',
        description: 'Celebrity makeup artist.',
        gallery: ['/images/makeup1.png']
      },
      {
        name: 'Glamour by Gauri',
        email: 'gauri@example.com',
        businessName: 'Gauri Makeup Artistry',
        category: 'Makeup',
        pricing: '₹15,000 - ₹40,000',
        location: 'Delhi',
        description: 'Professional makeup artist.',
        gallery: ['/images/makeup2.png']
      },
      {
        name: 'Ambika Pillai',
        email: 'ambika@example.com',
        businessName: 'Ambika Pillai Studio',
        category: 'Makeup',
        pricing: '₹30,000 - ₹80,000',
        location: 'Kochi',
        description: 'Expert in traditional bridal aesthetics.',
        gallery: ['/images/makeup3.png']
      },
      {
        name: 'Mickey Contractor',
        email: 'mickey@example.com',
        businessName: 'Mickey Contractor Glam',
        category: 'Makeup',
        pricing: '₹50,000 - ₹1,50,000',
        location: 'Mumbai',
        description: 'Iconic minimalist and natural makeup look.',
        gallery: ['/images/makeup4.png']
      },
      {
        name: 'Joseph Radhik',
        email: 'joseph@example.com',
        businessName: 'Stories by Joseph Radhik',
        category: 'Photographer',
        pricing: '₹3,00,000 - ₹8,00,000',
        location: 'Mumbai',
        description: 'Award-winning celebrity wedding photographer.',
        gallery: ['https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80']
      },
      {
        name: 'Royal Frames',
        email: 'royal@example.com',
        businessName: 'Royal Frames Photography',
        category: 'Photographer',
        pricing: '₹50,000 - ₹2,00,000',
        location: 'Jaipur',
        description: 'Capturing royal wedding moments in Rajasthan.',
        gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80']
      },
      {
        name: 'Badal Raja Company',
        email: 'badal@example.com',
        businessName: 'Badal Raja Cinematic',
        category: 'Photographer',
        pricing: '₹2,00,000 - ₹6,00,000',
        location: 'Delhi',
        description: 'Experts in cinematic wedding films and photography.',
        gallery: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80']
      },
      {
        name: 'Wedding Nama',
        email: 'nama@example.com',
        businessName: 'Wedding Nama Studios',
        category: 'Photographer',
        pricing: '₹1,50,000 - ₹4,00,000',
        location: 'Mumbai',
        description: 'Dreamy and artistic wedding photography.',
        gallery: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80']
      },
      {
        name: 'Floral Art by Srishti',
        email: 'srishti@example.com',
        businessName: 'Floral Art & Design',
        category: 'Decoration',
        pricing: '₹2,00,000 - ₹10,00,000',
        location: 'Pune',
        description: 'Exotic floral decorations for grand weddings.',
        gallery: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80']
      },
      {
        name: 'Dreamy Decors',
        email: 'decor@example.com',
        businessName: 'Dreamy Decors & Events',
        category: 'Decoration',
        pricing: '₹1,00,000 - ₹5,00,000',
        location: 'Bangalore',
        description: 'Magical fairy-tale setups with lights and drapes.',
        gallery: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80']
      },
      {
        name: 'The Floral Knot',
        email: 'knot@example.com',
        businessName: 'The Floral Knot Studios',
        category: 'Decoration',
        pricing: '₹3,00,000 - ₹12,00,000',
        location: 'Delhi',
        description: 'Specialists in traditional Mandap and floral arrangements.',
        gallery: ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80']
      },
      {
        name: 'Urban Decors',
        email: 'urban@example.com',
        businessName: 'Urban Modern Events',
        category: 'Decoration',
        pricing: '₹50,000 - ₹3,00,000',
        location: 'Hyderabad',
        description: 'Contemporary and minimalist wedding decorations.',
        gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80']
      },
      {
        name: 'Vikas Khanna Catering',
        email: 'vikas@example.com',
        businessName: 'Vikas Khanna Cuisines',
        category: 'Caterer',
        pricing: '₹3,000 - ₹8,000',
        location: 'Amritsar',
        description: 'Michelin-starred chef experience for your wedding.',
        gallery: ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80']
      },
      {
        name: 'Lajawab Catering',
        email: 'cater@example.com',
        businessName: 'Lajawab Royal Catering',
        category: 'Caterer',
        pricing: '₹1,500 - ₹4,500',
        location: 'Lucknow',
        description: 'Authentic royal Mughlai and Awadhi cuisine.',
        gallery: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80']
      },
      {
        name: 'Royal Sweets & Catering',
        email: 'sweets@example.com',
        businessName: 'Royal Mithai Junction',
        category: 'Caterer',
        pricing: '₹800 - ₹2,500',
        location: 'Delhi',
        description: 'Famous for traditional Indian desserts and sweets.',
        gallery: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80']
      },
      {
        name: 'Fusion Bites',
        email: 'fusion@example.com',
        businessName: 'Fusion Global Cuisines',
        category: 'Caterer',
        pricing: '₹2,500 - ₹6,000',
        location: 'Mumbai',
        description: 'Modern fusion food with a global twist.',
        gallery: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80']
      },
      {
        name: 'DJ Aqeel',
        email: 'aqeel@example.com',
        businessName: 'DJ Aqeel Live',
        category: 'DJ',
        pricing: '₹1,00,000 - ₹3,00,000',
        location: 'Mumbai',
        description: 'The king of remixes and Bollywood beats.',
        gallery: ['https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'DJ Sumit Sethi',
        email: 'dj@example.com',
        businessName: 'Sumit Sethi Live',
        category: 'DJ',
        pricing: '₹50,000 - ₹2,00,000',
        location: 'Chandigarh',
        description: 'Celebrity DJ known for high-energy wedding sets.',
        gallery: ['https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'DJ Suketu',
        email: 'suketu@example.com',
        businessName: 'DJ Suketu Official',
        category: 'DJ',
        pricing: '₹80,000 - ₹2,50,000',
        location: 'Mumbai',
        description: 'Famous for his iconic Bollywood remixes.',
        gallery: ['https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'DJ Chetas',
        email: 'chetas@example.com',
        businessName: 'DJ Chetas Mashups',
        category: 'DJ',
        pricing: '₹1,50,000 - ₹4,00,000',
        location: 'Mumbai',
        description: 'The world-famous Bollywood mashup specialist.',
        gallery: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'Veena Nagda',
        email: 'veena@example.com',
        businessName: 'Veena Nagda Mehendi Art',
        category: 'Mehendi',
        pricing: '₹10,000 - ₹50,000',
        location: 'Mumbai',
        description: 'India\'s most famous mehendi artist for celebrities.',
        gallery: ['https://images.pexels.com/photos/28496968/pexels-photo-28496968.jpeg']
      },
      {
        name: 'Aysha Mehendi',
        email: 'aysha@example.com',
        businessName: 'Aysha Bridal Mehendi',
        category: 'Mehendi',
        pricing: '₹5,000 - ₹15,000',
        location: 'Delhi',
        description: 'Specialist in intricate bridal and traditional designs.',
        gallery: ['https://images.pexels.com/photos/13102907/pexels-photo-13102907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'Harsha Arts',
        email: 'harsha@example.com',
        businessName: 'Harsha Mehendi Studio',
        category: 'Mehendi',
        pricing: '₹3,00,000 - ₹10,00,000',
        location: 'Ahmedabad',
        description: 'Beautiful Arabic and contemporary mehendi styles.',
        gallery: ['https://images.pexels.com/photos/33557621/pexels-photo-33557621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'Kundan Mehendi',
        email: 'kundan@example.com',
        businessName: 'Kundan Henna Art',
        category: 'Mehendi',
        pricing: '₹2,000 - ₹8,000',
        location: 'Jaipur',
        description: 'Famous for Rajasthani and Marwari mehendi patterns.',
        gallery: ['https://images.pexels.com/photos/15460659/pexels-photo-15460659.jpeg']
      },
      {
        name: 'WedWise',
        email: 'planner@example.com',
        businessName: 'WedWise Planners',
        category: 'Wedding Planner',
        pricing: '₹5,00,000 - ₹25,00,000',
        location: 'Delhi',
        description: 'Complete wedding planning services.',
        gallery: ['https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'Elite Weddings',
        email: 'elite@example.com',
        businessName: 'Elite Wedding Co.',
        category: 'Wedding Planner',
        pricing: '₹10,00,000 - ₹50,00,000',
        location: 'Mumbai',
        description: 'Luxury wedding planning for high-end clients.',
        gallery: ['https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'The Dream Makers',
        email: 'dream@example.com',
        businessName: 'The Dream Makers Events',
        category: 'Wedding Planner',
        pricing: '₹3,00,000 - ₹15,00,000',
        location: 'Bangalore',
        description: 'Turning your dream wedding into a reality.',
        gallery: ['https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        name: 'Royal Events',
        email: 'royal_events@example.com',
        businessName: 'Royal Weddings India',
        category: 'Wedding Planner',
        pricing: '₹8,00,000 - ₹30,00,000',
        location: 'Jaipur',
        description: 'Specialists in destination and heritage weddings.',
        gallery: ['https://images.pexels.com/photos/2253844/pexels-photo-2253844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ];

    for (const v of vendors) {
      const existingUser = await User.findOne({ email: v.email });
      if (existingUser) continue;

      const user = await User.create({
        name: v.name,
        email: v.email,
        password: password,
        role: 'vendor'
      });

      await Vendor.create({
        user: user._id,
        businessName: v.businessName,
        category: v.category,
        pricing: v.pricing,
        location: v.location,
        description: v.description,
        gallery: v.gallery,
        isApproved: true
      });
    }

    console.log('Marketplace Populated with High-Quality Categorized Data!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
