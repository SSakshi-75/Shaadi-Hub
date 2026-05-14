import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String, // Icon name or URL
    default: 'Store'
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
