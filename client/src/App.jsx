import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import VendorLogin from './pages/VendorLogin';
import Signup from './pages/Signup';
import VendorSignup from './pages/VendorSignup';
import Home from './pages/Home';
import VendorListing from './pages/VendorListing';
import VendorDetails from './pages/VendorDetails';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BecomeVendor from './pages/BecomeVendor';
import VendorDashboard from './pages/VendorDashboard';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vendor-signup" element={<VendorSignup />} />
          <Route path="/vendors" element={<VendorListing />} />
          <Route path="/vendor/:id" element={<VendorDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute allowedRoles={['user', 'vendor', 'admin']} />}>
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['vendor', 'admin']} />}>
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/become-vendor" element={<BecomeVendor />} />
          </Route>

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
