import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, MapPin, Calendar, Users, CheckCircle, Info, Bell } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  season: string;
  location: string;
  address: string;
  ageGroup: string;
  status: 'active' | 'upcoming';
}

const programs: Program[] = [
  {
    id: 'fall-2026-icsd',
    title: 'Fall Program 2026',
    season: 'September - November 2026',
    location: 'Islamic Center of San Diego (ICSD)',
    address: 'San Diego, CA',
    ageGroup: 'TK - 3rd Grade',
    status: 'upcoming',
  },
];

export function Register() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [waitlistData, setWaitlistData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const activePrograms = programs.filter(p => p.status === 'active');
  const upcomingPrograms = programs.filter(p => p.status === 'upcoming');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitlistData({
      ...waitlistData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate waitlist submission
    console.log('Waitlist submitted:', { program: selectedProgram, ...waitlistData });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedProgram(null);
      setWaitlistData({
        parentName: '',
        email: '',
        phone: '',
        childName: '',
      });
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
              Registration
            </div>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-8 text-white">
              Join Noor Sports
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Register your child for our upcoming programs and start their journey to soccer excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {selectedProgram ? (
        // Registration Form View
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Program Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="sticky top-8">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="text-sm text-[#0066CC] mb-6 hover:text-[#004C97] transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Programs
                  </button>

                  <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-6">
                    Selected Program
                  </div>
                  
                  {programs
                    .filter((p) => p.id === selectedProgram)
                    .map((program) => (
                      <div key={program.id}>
                        <h2 className="text-4xl lg:text-5xl tracking-tight mb-8 text-[#004C97]">
                          {program.title}
                        </h2>

                        <div className="space-y-6 mb-12">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#0066CC]/10 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-[#0066CC]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-[#004C97] mb-1">Season</h3>
                              <p className="text-[#004C97]/70">{program.season}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#0066CC]/10 flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-[#0066CC]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-[#004C97] mb-1">Location</h3>
                              <p className="text-[#004C97]/70">{program.location}</p>
                              <p className="text-sm text-[#004C97]/50">{program.address}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#0066CC]/10 flex items-center justify-center">
                              <Users className="w-6 h-6 text-[#0066CC]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-[#004C97] mb-1">Age Group</h3>
                              <p className="text-[#004C97]/70">{program.ageGroup}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#F8FBFF] p-8 border-l-4 border-[#0066CC]">
                          <h3 className="text-xl tracking-tight mb-4 text-[#004C97]">What's Included</h3>
                          <ul className="space-y-3">
                            {[
                              'Two training sessions per week',
                              'Professional soccer training',
                              'Age-appropriate skill development',
                              'Women coaches available for girls',
                              'Complete uniform (shirt & socks)',
                              'Community event',
                              'Positive, encouraging environment',
                              'Expert coaching staff',
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-[#004C97]/70">
                                <CheckCircle className="w-5 h-5 text-[#00BFFF] flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>

              {/* Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-[#F8FBFF] p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#00BFFF]/10 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-[#00BFFF]" />
                    </div>
                    <h2 className="text-3xl tracking-tight text-[#004C97]">
                      Join Waitlist
                    </h2>
                  </div>

                  <p className="text-[#004C97]/70 mb-8 leading-relaxed">
                    Registration for this program hasn't opened yet. Join our waitlist and we'll notify you as soon as registration is available.
                  </p>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl tracking-tight mb-4 text-[#004C97]">
                        You're on the Waitlist!
                      </h3>
                      <p className="text-[#004C97]/70">
                        We'll contact you when registration opens for this program.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Parent Information */}
                      <div>
                        <h3 className="text-sm tracking-[0.1em] uppercase text-[#0066CC]/70 mb-4">
                          Parent/Guardian Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="parentName" className="block text-sm text-[#004C97]/70 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="parentName"
                              name="parentName"
                              value={waitlistData.parentName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] focus:outline-none focus:border-[#0066CC] transition-colors"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm text-[#004C97]/70 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={waitlistData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] focus:outline-none focus:border-[#0066CC] transition-colors"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm text-[#004C97]/70 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={waitlistData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] focus:outline-none focus:border-[#0066CC] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Child Information */}
                      <div>
                        <h3 className="text-sm tracking-[0.1em] uppercase text-[#0066CC]/70 mb-4">
                          Child Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="childName" className="block text-sm text-[#004C97]/70 mb-2">
                              Child's Full Name *
                            </label>
                            <input
                              type="text"
                              id="childName"
                              name="childName"
                              value={waitlistData.childName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] focus:outline-none focus:border-[#0066CC] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-3 bg-[#0066CC] text-white px-8 py-4 text-sm tracking-tight relative overflow-hidden group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-[#004C97]"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <Bell className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Join Waitlist</span>
                      </motion.button>

                      <p className="text-xs text-[#004C97]/50 text-center">
                        We'll only contact you about this program and won't share your information.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        // Programs List View - Split into Active and Upcoming
        <section className="py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Active Programs - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-8">
                  Active Programs
                </div>
                
                {activePrograms.length === 0 ? (
                  <div className="bg-[#F8FBFF] border-2 border-dashed border-[#0066CC]/20 p-16 text-center">
                    <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Info className="w-8 h-8 text-[#0066CC]/50" />
                    </div>
                    <h3 className="text-2xl tracking-tight mb-4 text-[#004C97]">
                      No Active Programs
                    </h3>
                    <p className="text-[#004C97]/60 leading-relaxed">
                      There are currently no active programs running. Check out our upcoming programs to register for future sessions.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activePrograms.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-[#0066CC] p-12 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]"></div>
                        
                        <h2 className="text-3xl tracking-tight mb-6 text-white">
                          {program.title}
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3 text-white/80">
                            <Calendar className="w-5 h-5 text-[#00BFFF]" />
                            <span className="text-base">{program.season}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-white/80">
                            <MapPin className="w-5 h-5 text-[#00BFFF]" />
                            <span className="text-base">{program.location}</span>
                          </div>
                          
                          <div className="inline-block bg-white/10 px-6 py-3 backdrop-blur-sm">
                            <span className="text-base tracking-tight text-white">{program.ageGroup}</span>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => setSelectedProgram(program.id)}
                          className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight relative overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#00A8E6]"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <Bell className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Join Waitlist</span>
                        </motion.button>
                        
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Upcoming Programs - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-8">
                  Upcoming Programs
                </div>
                
                {upcomingPrograms.length === 0 ? (
                  <div className="bg-[#F8FBFF] border-2 border-dashed border-[#0066CC]/20 p-16 text-center">
                    <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Info className="w-8 h-8 text-[#0066CC]/50" />
                    </div>
                    <h3 className="text-2xl tracking-tight mb-4 text-[#004C97]">
                      No Upcoming Programs
                    </h3>
                    <p className="text-[#004C97]/60 leading-relaxed">
                      We're currently working on scheduling our next programs. Check back soon for updates!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingPrograms.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-[#0066CC] p-12 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]"></div>
                        
                        <h2 className="text-3xl tracking-tight mb-6 text-white">
                          {program.title}
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3 text-white/80">
                            <Calendar className="w-5 h-5 text-[#00BFFF]" />
                            <span className="text-base">{program.season}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-white/80">
                            <MapPin className="w-5 h-5 text-[#00BFFF]" />
                            <span className="text-base">{program.location}</span>
                          </div>
                          
                          <div className="inline-block bg-white/10 px-6 py-3 backdrop-blur-sm">
                            <span className="text-base tracking-tight text-white">{program.ageGroup}</span>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => setSelectedProgram(program.id)}
                          className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight relative overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#00A8E6]"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <Bell className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Join Waitlist</span>
                        </motion.button>
                        
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}