import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ dark = false }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center ${dark ? 'text-dark-text' : 'text-white'}`}>
      <Link to="/" className="text-3xl font-bold font-serif tracking-widest text-gold">
        SHAADI<span className={dark ? 'text-dark-text' : 'text-white'}>HUB</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <Link to="/vendors" className="hover:text-gold transition-colors">Vendors</Link>
        <Link to="/about" className="hover:text-gold transition-colors">About</Link>
        <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
        <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>

        {user ? (
          <div className="flex items-center gap-4">
            {user.role !== 'admin' && (
              <Link
                to={user.role === 'vendor' ? '/vendor-dashboard' : '/my-bookings'}
                className={`btn-secondary ${dark ? 'border-dark-text text-dark-text' : 'border-white text-white hover:bg-white hover:text-dark-text'}`}
              >
                {user.role === 'vendor' ? 'My Dashboard' : 'My Bookings'}
              </Link>
            )}
            <button onClick={logout} className="text-sm hover:text-primary-pink">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-gold font-medium transition-colors">Login</Link>
            <Link to="/signup" className="btn-primary font-bold px-6">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
