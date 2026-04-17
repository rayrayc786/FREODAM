import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isHome 
    ? (isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-20')
    : 'bg-white shadow-sm h-20';
    
  const navText = isHome
    ? (isScrolled ? 'text-black' : 'text-white')
    : 'text-black';

  const hoverBg = isHome && !isScrolled ? 'hover:bg-white/20' : 'hover:bg-gray-100';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg} ${navText}`}>
      {/* Search Overlay */}
      <div className={`absolute inset-0 bg-white z-[60] flex items-center px-4 transition-all duration-300 ${isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto w-full flex items-center gap-4">
              <Search className="w-6 h-6 text-black" />
              <input 
                  type="text" 
                  autoFocus 
                  placeholder="SEARCH FOR OVERSIZED, BOTTOMS, OUTERWEAR..." 
                  className="flex-1 bg-transparent border-none outline-none text-black font-display font-black italic text-xl md:text-2xl uppercase tracking-tighter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden sm:block p-3 bg-black text-white hover:bg-gray-900 transition-colors">
                  <ArrowRight className="w-6 h-6" />
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-black" />
              </button>
          </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden p-2 ${hoverBg} rounded-full transition-colors`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-display text-2xl font-black italic tracking-tighter">
            <span className={isHome && !isScrolled ? 'text-white' : 'text-black'}>FREO</span>
            <span className="text-accent underline decoration-2 underline-offset-4">DEM</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 px-10">
          <Link to="/category/All" className="font-display uppercase text-xs tracking-widest font-bold hover:text-accent transition-colors">Shop All</Link>
          <Link to="/category/Oversized T-Shirts" className="font-display uppercase text-xs tracking-widest font-bold hover:text-accent transition-colors">Oversized</Link>
          <Link to="/category/Bottoms" className="font-display uppercase text-xs tracking-widest font-bold hover:text-accent transition-colors">Bottoms</Link>
          <Link to="/category/Outerwear" className="font-display uppercase text-xs tracking-widest font-bold hover:text-accent transition-colors">Outerwear</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            className={`p-2 ${hoverBg} rounded-full transition-colors`}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 ${hoverBg} rounded-full transition-colors relative`}
            onClick={() => dispatch(toggleCart())}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`absolute inset-y-0 left-0 w-3/4 max-w-sm bg-white p-6 transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <span className="font-display text-xl font-black italic">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <Link to="/category/All" onClick={() => setMobileMenuOpen(false)} className="font-display uppercase text-lg tracking-widest font-bold">Shop All</Link>
            <Link to="/category/Oversized T-Shirts" onClick={() => setMobileMenuOpen(false)} className="font-display uppercase text-lg tracking-widest font-bold">Oversized</Link>
            <Link to="/category/Bottoms" onClick={() => setMobileMenuOpen(false)} className="font-display uppercase text-lg tracking-widest font-bold">Bottoms</Link>
            <Link to="/category/Outerwear" onClick={() => setMobileMenuOpen(false)} className="font-display uppercase text-lg tracking-widest font-bold">Outerwear</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
