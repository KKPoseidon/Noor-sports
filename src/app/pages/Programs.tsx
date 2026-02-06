import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Heart, Trophy } from 'lucide-react';
import { useState } from 'react';
import heroBackground from 'figma:asset/7cba33ba2432ff081f2077b687ce447b3b4cd8f2.png';
import teamPhoto1 from 'figma:asset/cfad9dc392ab10e6ac66c611601bc99a75338413.png';
import teamPhoto2 from 'figma:asset/b411fd244aa457eb574e8a5ac3d1b9d3c1cdcff3.png';
import teamPhoto3 from 'figma:asset/9fe90dcf36039f7b6bb4afe35c7066b4df0e7a40.png';

export function Programs() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-[#0066CC] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#0066CC]/75"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
              Training Programs
            </div>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-8 text-white">
              Building Future Athletes
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Quality youth training focused on real skills, genuine care, and the pure excitement of the game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl tracking-tight text-[#0066CC] mb-8">
                Quality Training for Young Athletes
              </h2>
              <div className="w-24 h-1 bg-[#0066CC]/30 mx-auto mb-12"></div>
              
              <div className="space-y-6 text-lg text-[#004C97]/80 leading-relaxed">
                <p>
                  At Noor Sports, we offer comprehensive athletic programs designed for children from TK through high school. Our approach combines professional-level training techniques with a fun, supportive environment that keeps kids excited about sports.
                </p>
                <p>
                  Whether your child is just starting their athletic journey or looking to compete at a higher level, we provide the coaching, structure, and encouragement they need to develop both as athletes and as confident individuals.
                </p>
                <p className="text-[#0066CC] font-medium">
                  Explore our current and upcoming programs below to find the perfect fit for your young athlete.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fall Program Section */}
      <section className="py-20 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-white/10 px-6 py-3 mb-6 backdrop-blur-sm">
                <span className="text-sm tracking-[0.3em] uppercase text-white">Past Program</span>
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-white">
                Previous Season
              </h2>
              <div className="w-24 h-1 bg-[#00BFFF] mx-auto mt-8"></div>
            </div>
            
            {/* Highlighted Program Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-[#004C97] p-12 lg:p-16 relative overflow-hidden group cursor-pointer"
            >
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]"></div>
              
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl tracking-tight mb-6 text-white">
                  Fall 2025 Soccer Program
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-center gap-3 text-white/80">
                    <div className="w-12 h-px bg-white/30"></div>
                    <span className="text-xl tracking-tight">September - November</span>
                    <div className="w-12 h-px bg-white/30"></div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <MapPin className="w-5 h-5 text-[#00BFFF]" />
                    <span className="text-lg">7050 Eckstrom Ave, San Diego, CA 92111</span>
                  </div>
                  
                  <div className="inline-block bg-white/10 px-6 py-3 backdrop-blur-sm">
                    <span className="text-lg tracking-tight text-white">TK - 3rd Grade</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                    Join us at Bright Horizon Academy for an exciting season of soccer development. Our fall program combines professional training methods with a fun, supportive environment perfect for young learners.
                  </p>
                </div>
                
                {/* Team Photos Grid - Integrated */}
                <div className="mt-12 pt-12 border-t border-white/20">
                  <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-8 text-center">
                    Our Teams
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Girls Team */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group relative"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={teamPhoto1}
                          alt="Girls 1st-3rd Grade"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <div className="text-xs tracking-[0.15em] uppercase text-white/60 mb-1">
                            Girls Division
                          </div>
                          <div className="text-sm tracking-tight text-white">
                            1st-3rd Grade
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Boys Team */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group relative cursor-pointer"
                      onClick={() => setSelectedImage(teamPhoto2)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={teamPhoto2}
                          alt="Boys 1st-3rd Grade"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <div className="text-xs tracking-[0.15em] uppercase text-white/60 mb-1">
                            Boys Division
                          </div>
                          <div className="text-sm tracking-tight text-white">
                            1st-3rd Grade
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* TK & Kindergarten Team */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group relative cursor-pointer"
                      onClick={() => setSelectedImage(teamPhoto3)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={teamPhoto3}
                          alt="TK & Kindergarten"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <div className="text-xs tracking-[0.15em] uppercase text-white/60 mb-1">
                            Youth Division
                          </div>
                          <div className="text-sm tracking-tight text-white">
                            TK & Kindergarten
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#00BFFF] transition-colors text-sm tracking-[0.2em] uppercase"
            >
              Close ✕
            </button>
            
            {/* Image */}
            <img
              src={selectedImage}
              alt="Team Photo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0066CC]/10 px-6 py-3 mb-6">
                <span className="text-sm tracking-[0.3em] uppercase text-[#0066CC]">Coming Soon</span>
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-[#0066CC]">
                Expanding Our Programs
              </h2>
              <div className="w-24 h-1 bg-[#0066CC]/30 mx-auto mt-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* High School Tournaments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#0066CC]/5 backdrop-blur-sm p-10 relative overflow-hidden border border-[#0066CC]/20"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]"></div>
                <div className="inline-block bg-[#0066CC]/10 px-4 py-2 mb-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#0066CC]">Coming Soon</span>
                </div>
                <h3 className="text-2xl lg:text-3xl tracking-tight mb-4 text-[#0066CC]">
                  High School Tournaments
                </h3>
                <p className="text-base text-[#004C97]/80 leading-relaxed">
                  Competitive tournament opportunities for high school athletes looking to showcase their skills and compete at the next level. Stay tuned for registration details.
                </p>
              </motion.div>

              {/* Multi-Sport Youth Programs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#0066CC]/5 backdrop-blur-sm p-10 relative overflow-hidden border border-[#0066CC]/20"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]"></div>
                <div className="inline-block bg-[#0066CC]/10 px-4 py-2 mb-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#0066CC]">Coming Soon</span>
                </div>
                <h3 className="text-2xl lg:text-3xl tracking-tight mb-4 text-[#0066CC]">
                  Multi-Sport Youth Programs
                </h3>
                <p className="text-base text-[#004C97]/80 leading-relaxed">
                  Expanding beyond soccer with additional youth sports programs designed to develop well-rounded athletes across multiple disciplines.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Philosophy */}
      <section className="py-20 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-white/10 px-6 py-3 mb-6 backdrop-blur-sm">
                <span className="text-sm tracking-[0.3em] uppercase text-white">Our Approach</span>
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-white">
                How We Train
              </h2>
              <div className="w-24 h-1 bg-[#00BFFF] mx-auto mt-8"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/10 p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-[#00BFFF]/20 rounded-full">
                    <Trophy className="w-8 h-8 text-[#00BFFF]" />
                  </div>
                  <h3 className="text-2xl tracking-tight mb-4 text-white">Real Sports Team Values</h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    Our programs are built on authentic sports team principles. We teach the fundamentals the way professional academies do: proper technique, tactical awareness, and the discipline that creates great athletes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/10 p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-[#00BFFF]/20 rounded-full">
                    <Heart className="w-8 h-8 text-[#00BFFF]" />
                  </div>
                  <h3 className="text-2xl tracking-tight mb-4 text-white">Care & Happiness First</h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    Every child deserves to feel valued and supported. We create a positive, encouraging environment where kids feel safe to learn, make mistakes, and grow. Their happiness and confidence are just as important as their development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/10 p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-[#00BFFF]/20 rounded-full">
                    <ArrowRight className="w-8 h-8 text-[#00BFFF]" />
                  </div>
                  <h3 className="text-2xl tracking-tight mb-4 text-white">Excitement & Real Skills</h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    Sports should be fun and exhilarating. We keep the energy high and the excitement flowing while teaching genuine technical skills that will serve athletes throughout their sports journey. No shortcuts, just quality training delivered with passion.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#004C97] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-8">
                Ready to Join Noor Sports?
              </h2>
              <p className="text-xl text-white/70 mb-12">
                Get in touch to learn more about our programs and how we can help your child to develop as an athlete in a supportive, exciting environment.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight hover:bg-[#00A8E6] transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}