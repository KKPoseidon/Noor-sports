import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Award, Heart, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroImage1 from 'figma:asset/e51c93d80638712f85b81bfe864d5375720ff198.png';
import heroImage2 from 'figma:asset/79062b3039f099ebc5ccb5e92b1996bb736fb4be.png';
import heroImage5 from 'figma:asset/f008ae9cee6c049e9dbe5e6c9642a6ac5646a89b.png';
import heroImage6 from 'figma:asset/cf78a124394450ad1086a0c577a58cf54de2e04a.png';
import heroImage7 from 'figma:asset/188fa0a9c28bde98e25bc5c580338de9624edbb6.png';
import heroImage8 from 'figma:asset/f44df5b4676ee753d1db7bb2eba6a24fa3a2f7b1.png';
import missionImage from 'figma:asset/b411fd244aa457eb574e8a5ac3d1b9d3c1cdcff3.png';
import philosophyImage1 from 'figma:asset/67f17b7a699b3b6e90e02385a39954b603da0ce6.png';
import happinessImage from 'figma:asset/0ba682073e68c090b98e531ab20d6fc11ec5ed64.png';
import philosophyImage3 from 'figma:asset/efc9b9f57a1936609945595ab1dc9ee385cc1aba.png';

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage5, heroImage6, heroImage7, heroImage8];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Soccer training"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Enhanced gradient overlay with glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A75D9] via-[#1A75D9]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-8 text-white drop-shadow-2xl"
              style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Developing The{' '}<br className="hidden sm:block" />
              <motion.span
                className="inline-block text-[#00BFFF] drop-shadow-[0_0_30px_rgba(0,191,255,0.7)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100 
                }}
              >
                Future
              </motion.span>
              {' '}Ummah
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/programs">
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00BFFF] to-[#0099E6] text-white px-10 py-5 text-sm tracking-tight relative overflow-hidden group cursor-pointer rounded-full shadow-[0_10px_40px_rgba(0,191,255,0.4)]"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 60px rgba(0, 191, 255, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: 1 }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#004C97] rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Button content */}
                  <span className="relative z-10 font-bold">Learn More</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Navigation Indicators with glow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 transition-all duration-300 rounded-full ${
                index === currentImageIndex 
                  ? 'w-12 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' 
                  : 'w-8 bg-white opacity-40 hover:opacity-60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About NOOR SPORTS Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative elements - refined for white background */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Decorative top line */}
            <motion.div 
              className="w-24 h-0.5 bg-gradient-to-r from-[#0066CC] to-[#00BFFF] mx-auto mb-8 relative overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Animated shimmer texture */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />
            </motion.div>
            
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-[#0066CC] uppercase mb-4">
              NOOR SPORTS
            </h2>
            
            {/* Accent underline */}
            <motion.div 
              className="w-32 h-0.5 bg-gradient-to-r from-[#0066CC] via-[#00BFFF] to-[#0066CC] mx-auto mb-12 relative overflow-hidden shadow-[0_2px_8px_rgba(0,191,255,0.4)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Animated shimmer texture */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
            </motion.div>
            
            <motion.p 
              className="text-lg text-[#004C97]/80 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Noor Sports is dedicated to building a strong, competitive foundation in athletics for young athletes while simultaneously cultivating exceptional character, respect, and sportsmanship. Our comprehensive approach combines elite-level technical training with values-based development, instilling discipline, teamwork, and leadership qualities that extend far beyond the field. We are committed to developing well-rounded individuals who excel both as athletes and as respectful, confident members of their community.
            </motion.p>
            
            {/* Decorative bottom element */}
            <motion.div 
              className="flex items-center justify-center gap-2 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#0066CC]"></div>
              <div className="w-2 h-2 rounded-full bg-[#00BFFF]"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#0066CC]"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with gradient */}
      <section className="py-16 bg-gradient-to-br from-[#0066CC] via-[#0056B3] to-[#004C97] relative overflow-hidden">
        {/* Gradient overlay layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#004C97]/50 via-transparent to-[#00BFFF]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#0066CC]/30 to-transparent"></div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/30 rounded-full"></div>
          <div className="absolute top-40 right-60 w-24 h-24 border border-white/20 rotate-45"></div>
          <div className="absolute top-60 right-40 w-20 h-20 border border-white/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-10">
          <div className="absolute bottom-20 left-20 w-28 h-28 border border-white/30 rotate-12"></div>
          <div className="absolute bottom-40 left-40 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-60 w-16 h-16 border border-white/20 rotate-45"></div>
        </div>
        
        {/* Decorative glow elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#00BFFF]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
        
        {/* Animated floating orbs for texture */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#00BFFF]/10 rounded-full blur-2xl"
          animate={{ 
            y: [0, 40, 0],
            x: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
              Programs
            </div>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl lg:text-5xl tracking-tight max-w-2xl text-white drop-shadow-lg">
                Our Training Philosophy
              </h2>
              <Link to="/programs">
                <motion.div
                  className="hidden lg:flex items-center gap-2 text-sm tracking-tight uppercase bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all group shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="font-semibold">View Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Real Sports Team Values',
                description: 'Built on authentic sports teams principles with proper technique, tactical awareness, and the discipline that creates great players.',
                image: philosophyImage1
              },
              {
                title: 'Care & Happiness First',
                description: 'A positive, encouraging environment where kids feel safe to learn, make mistakes, and grow with confidence.',
                image: happinessImage
              },
              {
                title: 'Excitement & Real Skills',
                description: 'High-energy training that keeps sports fun while teaching genuine technical skills that last a lifetime.',
                image: philosophyImage3
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="relative overflow-hidden group cursor-pointer aspect-[4/5]"
              >
                {/* Background Image */}
                <img
                  src={value.image}
                  alt={value.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={value.title === 'Care & Happiness First' ? { objectPosition: '60% center' } : undefined}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Blue accent overlay on hover */}
                <div className="absolute inset-0 bg-[#0066CC]/0 group-hover:bg-[#0066CC]/20 transition-all duration-500"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0.8 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                  >
                    <h3 className="text-2xl lg:text-3xl tracking-tight mb-4 text-white font-bold drop-shadow-lg">
                      {value.title}
                    </h3>
                    <p className="text-base text-white/90 leading-relaxed drop-shadow-md">
                      {value.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 lg:hidden">
            <Link to="/programs">
              <motion.div
                className="inline-flex items-center gap-2 text-sm tracking-tight uppercase text-white/70 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                View Programs
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-8 text-[#004C97]">
                Building Champions On and Off the Field
              </h2>
              <p className="text-lg text-[#004C97]/80 leading-relaxed mb-6">
                We believe in nurturing not just skilled players, but well-rounded individuals. Our academy combines technical excellence with character development, creating an environment where young athletes can thrive.
              </p>
              <p className="text-lg text-[#004C97]/80 leading-relaxed">
                Through disciplined training, expert coaching, and a commitment to holistic development, we prepare players for success at every level.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <img
                src={missionImage}
                alt="Soccer ball"
                className="w-full h-auto relative z-10 rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}