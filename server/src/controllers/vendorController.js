import Vendor from '../models/Vendor.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

export const createOrUpdateVendorProfile = async (req, res) => {
  try {
    console.log('Vendor Data Received:', req.body);
    console.log('Files Received:', req.files?.length || 0);
    const { businessName, category, pricing, location, description, phone, whatsapp, instagram, availability } = req.body;

    let vendor = await Vendor.findOne({ user: req.user._id });

    const vendorData = {
      user: req.user._id,
      businessName,
      category,
      pricing: Number(pricing),
      location,
      description,
      phone,
      whatsapp,
      instagram,
      availability: availability === 'true' || availability === true,
    };

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      vendorData.gallery = vendor ? [...vendor.gallery, ...imageUrls] : imageUrls;
    }

    if (vendor) {
      vendor = await Vendor.findOneAndUpdate(
        { user: req.user._id },
        { $set: vendorData },
        { new: true }
      );
      return res.status(200).json(vendor);
    }

    vendor = await Vendor.create(vendorData);
    
    // Update user role to vendor
    await User.findByIdAndUpdate(req.user._id, { role: 'vendor' });

    // Notify Admin of New Vendor Registration
    await Notification.create({
      type: 'NEW_VENDOR',
      title: 'New Vendor Application',
      message: `${businessName} has applied to join ShaadiHub as a ${category}.`,
      relatedId: vendor._id
    });

    res.status(201).json(vendor);
  } catch (error) {
    console.error('Error in createOrUpdateVendorProfile:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    let { category, location, search, maxPrice, minRating, availability } = req.query;
    let query = { isApproved: true };

    // Smart Search Parsing
    if (search) {
      // Extract "under 20000" or "below 20000"
      const budgetMatch = search.match(/(?:under|below|less than|within)\s?(?:rs\.?|₹)?\s?(\d+)/i);
      if (budgetMatch && !maxPrice) {
        maxPrice = budgetMatch[1];
        search = search.replace(budgetMatch[0], '').trim();
      }

      // Extract "in Lucknow"
      const locationMatch = search.match(/(?:in|at|from)\s+([a-zA-Z\s]+)$/i);
      if (locationMatch && !location) {
        location = locationMatch[1].trim();
        search = search.replace(locationMatch[0], '').trim();
      }
    }

    if (category) query.category = new RegExp(`^${category}$`, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (maxPrice) query.pricing = { $lte: Number(maxPrice) };
    if (minRating) query.ratings = { $gte: Number(minRating) };
    if (availability === 'true') query.availability = true;
    
    if (search && search.trim() !== '') {
      query.$or = [
        { businessName: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
      ];
    }

    const vendors = await Vendor.find(query).populate('user', 'name email').sort({ ratings: -1 });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('user', 'name email');
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
