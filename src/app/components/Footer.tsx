import { Link } from 'react-router';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Subtle background elements for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0066CC]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#00BFFF]/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#00BFFF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img src={logo} alt="NOOR SPORTS" className="h-16 w-auto relative z-10 drop-shadow-lg" style={{ filter: 'brightness(0) saturate(100%) invert(23%) sepia(98%) saturate(1789%) hue-rotate(195deg) brightness(92%) contrast(101%)' }} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-[#004C97] uppercase leading-none group-hover:text-[#0066CC] transition-colors">NOOR SPORTS</span>
                <span className="text-[10px] tracking-[0.25em] text-[#004C97]/60 uppercase leading-none mt-1">Youth Athletics</span>
              </div>
            </Link>
            <p className="text-sm text-[#004C97]/70 leading-relaxed italic">
              Empowering young athletes through skill development, character building, and the beautiful game.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[#004C97] font-bold text-sm uppercase tracking-wide mb-4 relative z-10">Quick Links</h3>
            <ul className="space-y-3 relative z-10">
              <li>
                <Link to="/" className="text-[#004C97]/70 hover:text-[#0066CC] transition-all text-sm inline-block hover:translate-x-1 duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-[#004C97]/70 hover:text-[#0066CC] transition-all text-sm inline-block hover:translate-x-1 duration-200">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#004C97]/70 hover:text-[#0066CC] transition-all text-sm inline-block hover:translate-x-1 duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#004C97]/70 hover:text-[#0066CC] transition-all text-sm inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#004C97]/70 hover:text-[#0066CC] transition-all text-sm inline-block hover:translate-x-1 duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[#004C97] font-bold text-sm uppercase tracking-wide mb-4 relative z-10">Get In Touch</h3>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#004C97]/70 mt-0.5 flex-shrink-0" />
                <span className="text-[#004C97]/70 text-sm">
                  San Diego, California
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#004C97]/70 mt-0.5 flex-shrink-0" />
                <a href="mailto:noorsports.youth@gmail.com" className="text-[#004C97]/70 hover:text-[#0066CC] transition-colors text-sm">
                  noorsports.youth@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#004C97]/70 mt-0.5 flex-shrink-0" />
                <a href="tel:4093336619" className="text-[#004C97]/70 hover:text-[#0066CC] transition-colors text-sm">
                  (409) 333-6619
                </a>
              </li>
            </ul>

            {/* Social Media with 3D effect */}
            <div className="flex items-center gap-4 mt-6 relative z-10">
              <motion.a
                href="https://www.instagram.com/noorsportss/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#004C97]/70 hover:text-[#0066CC] transition-all relative group"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] to-[#00BFFF] rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-2 shadow-md group-hover:shadow-xl transition-shadow">
                  <Instagram className="w-5 h-5" />
                </div>
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#004C97]/70 hover:text-[#0066CC] transition-all relative group"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] to-[#00BFFF] rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-2 shadow-md group-hover:shadow-xl transition-shadow">
                  <Facebook className="w-5 h-5" />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-[#004C97]/50">
            © 2026 NOOR SPORTS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-[#004C97]/50 hover:text-[#004C97]/70 transition-colors hover:translate-y-[-1px] inline-block">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-[#004C97]/50 hover:text-[#004C97]/70 transition-colors hover:translate-y-[-1px] inline-block">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}