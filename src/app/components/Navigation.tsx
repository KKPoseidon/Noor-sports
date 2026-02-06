import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";


export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
      }}
      style={{
        backgroundColor: isScrolled ? 'rgba(0, 76, 151, 0.95)' : 'rgba(0, 76, 151, 0.7)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="flex items-center gap-8 transition-all duration-300"
            animate={{ height: isScrolled ? '70px' : '90px' }}
          >
            <Link to="/" className="flex items-center gap-4 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative">
                {/* Animated glow effect behind logo */}
                <motion.div
                  className="absolute inset-0 bg-[#00BFFF] rounded-full blur-xl opacity-0 group-hover:opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <img 
                  src={logo} 
                  alt="NOOR SPORTS" 
                  className="relative z-10 w-auto transition-all duration-300 group-hover:scale-110"
                  style={{ height: isScrolled ? '60px' : '75px' }}
                />
              </div>
              
              <div className="flex flex-col gap-0.5">
                <motion.span 
                  className="text-lg font-black tracking-tight text-white uppercase leading-none"
                  whileHover={{ letterSpacing: '0.12em', x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  NOOR SPORTS
                </motion.span>
                <span className="text-[9px] tracking-[0.25em] text-white/60 uppercase leading-none">
                  Youth Athletics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div
                    className={`relative px-6 py-2.5 rounded-full transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'bg-white' 
                        : 'bg-transparent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <motion.span
                      className={`text-lg tracking-tight transition-colors font-semibold ${
                        isActive(link.path)
                          ? 'text-[#0066CC]'
                          : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {link.name}
                    </motion.span>
                  </motion.div>
                  
                  {/* Hover underline effect - only show when NOT active */}
                  {!isActive(link.path) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00BFFF] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Register Button - Right Side */}
            <div className="hidden lg:flex items-center">
              <Link to="/register">
                <motion.div
                  className="relative inline-flex items-center justify-center bg-white text-[#0066CC] px-8 py-3 text-sm tracking-tight font-semibold rounded-full overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#0066CC]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Register Now!
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white ml-auto"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#004C97]/98 backdrop-blur-md"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-2">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base tracking-tight text-white/90 transition-colors hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 ${
                      isActive(link.path) ? 'font-medium bg-white/5' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.1 }}
              >
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-gradient-to-r from-[#00BFFF] to-[#0066CC] text-white px-6 py-4 text-base tracking-tight font-medium text-center mt-4 rounded-full shadow-lg"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}