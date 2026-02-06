import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Heart, Users, Trophy, Sparkles, Calendar } from 'lucide-react';
import communityImg1 from "../../assets/community1.png";
import communityImg2 from "../../assets/community2.png";
import heroBackground from "../../assets/abouthero.png";
import pillarImg1 from "../../assets/pillar1.png";
import pillarImg3 from "../../assets/pillar3.png";
import safeEnvImg from "../../assets/safeenv.png";
import athleticDevImg from "../../assets/athleticdev.png";
import seasonCelebrationsImg from "../../assets/celebration.png";

export function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const pillars = [
    {
      icon: Heart,
      title: 'Safe & Fun Environment',
      description: 'Creating a welcoming space where kids feel comfortable being themselves.',
      details: [
        'Positive coaching methods',
        'Inclusive atmosphere for all',
        'Focus on joy and happiness',
        'Building confidence every day'
      ],
      color: '#FF6B9D',
      bgImage: safeEnvImg
    },
    {
      icon: Users,
      title: 'Friends & Community',
      description: 'Connecting kids with teammates they relate to and friendships that last.',
      details: [
        'Teammates become best friends',
        'Shared experiences and growth',
        'Supportive peer relationships',
        'Celebrating together'
      ],
      color: '#00BFFF',
      bgImage: pillarImg1
    },
    {
      icon: Trophy,
      title: 'Athletic Development',
      description: 'Building strong foundations in soccer skills and physical fitness.',
      details: [
        'Professional training methods',
        'Age-appropriate skill building',
        'Coordination & athleticism',
        'Proper technique from day one'
      ],
      color: '#FFD700',
      bgImage: athleticDevImg
    },
    {
      icon: Sparkles,
      title: 'Growing Together',
      description: 'Watching our community and each player flourish season after season.',
      details: [
        'Long-term player development',
        'Community that cares',
        'Parents as partners',
        'Building something special'
      ],
      color: '#9D4EDD',
      bgImage: pillarImg3
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/80 via-[#0066CC]/75 to-[#004C97]/80"></div>
        </div>
        
        <motion.div 
          style={{ y, opacity }}
          className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-7xl tracking-tight mb-8 text-white">
              Where Kids Thrive,
              <br />
              <span className="text-[#00BFFF]">Together</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
              Noor Sports is more than just training. It's a community where every child feels at home, makes real friends, and grows into a confident, skilled athlete across multiple sports.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 text-white/10 text-8xl z-10"
        >
          ⚽
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-10 text-white/10 text-6xl z-10"
        >
          ❤️
        </motion.div>
      </section>

      {/* Our Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-6">
              What We're About
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-8 text-[#004C97] max-w-3xl mx-auto">
              Building a Place Where Every Kid Belongs
            </h2>
            <p className="text-xl text-[#004C97]/70 leading-relaxed max-w-3xl mx-auto">
              We started Noor Sports with a simple vision: create a soccer program where kids can be themselves, play with friends who get them, develop real skills, and have an absolute blast doing it. We're building a community that celebrates every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Pillars Grid */}
      <section className="py-24 bg-[#F8FBFF]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-6">
              What Makes Us Special
            </div>
            <h2 className="text-4xl lg:text-6xl tracking-tight text-[#004C97] mb-6">
              The Noor Sports Way
            </h2>
            <p className="text-xl text-[#004C97]/60 max-w-2xl mx-auto leading-relaxed">
              Four core values that define everything we do and every experience we create for our young athletes.
            </p>
          </motion.div>

          {/* First Row - Two Large Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {pillars.slice(0, 2).map((pillar, i) => {
              const Icon = pillar.icon;
              
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative overflow-hidden cursor-pointer group bg-[#004C97] h-[550px]"
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover transition-all duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${pillar.bgImage})`,
                      backgroundPosition: i === 0 ? 'center left' : 'center center',
                      backgroundSize: i === 0 ? '120%' : 'cover'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[#004C97]/98 via-[#004C97]/85 to-transparent"
                    animate={{
                      opacity: hoveredCard === i ? 0.95 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Accent Bar */}
                  <motion.div 
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{ backgroundColor: pillar.color }}
                    animate={{
                      width: hoveredCard === i ? 8 : 8
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10 p-10 h-full flex flex-col">
                    {/* Icon Badge */}
                    <motion.div
                      animate={{ 
                        scale: hoveredCard === i ? 1.1 : 1,
                        y: hoveredCard === i ? -5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-auto"
                    >
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20"
                      >
                        <Icon 
                          className="w-10 h-10 text-white" 
                        />
                      </div>
                    </motion.div>
                    
                    {/* Content at bottom */}
                    <div>
                      <h3 className="text-3xl lg:text-4xl tracking-tight mb-4 text-white">
                        {pillar.title}
                      </h3>
                      
                      <p className="text-lg text-white/85 mb-6 leading-relaxed">
                        {pillar.description}
                      </p>
                      
                      <motion.ul
                        animate={{ 
                          opacity: hoveredCard === i ? 1 : 0.8
                        }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5"
                      >
                        {pillar.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            animate={{ 
                              x: hoveredCard === i ? 5 : 0
                            }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-3 text-white/90"
                          >
                            <div 
                              className="w-1 h-1 rounded-full bg-[#00BFFF]"
                            />
                            <span className="text-base">{detail}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Second Row - One Large Card + One White Card */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Third Card with Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onHoverStart={() => setHoveredCard(2)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative overflow-hidden cursor-pointer group bg-[#004C97] h-[550px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${pillars[2].bgImage})` }}
              />
              
              {/* Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#004C97]/98 via-[#004C97]/85 to-transparent"
                animate={{
                  opacity: hoveredCard === 2 ? 0.95 : 1
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Accent Bar */}
              <motion.div 
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: pillars[2].color }}
                animate={{
                  width: hoveredCard === 2 ? 8 : 8
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 p-10 h-full flex flex-col">
                <motion.div
                  animate={{ 
                    scale: hoveredCard === 2 ? 1.1 : 1,
                    y: hoveredCard === 2 ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-auto"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20"
                  >
                    <Trophy 
                      className="w-10 h-10 text-white" 
                    />
                  </div>
                </motion.div>
                
                <div>
                  <h3 className="text-3xl lg:text-4xl tracking-tight mb-4 text-white">
                    {pillars[2].title}
                  </h3>
                  
                  <p className="text-lg text-white/85 mb-6 leading-relaxed">
                    {pillars[2].description}
                  </p>
                  
                  <motion.ul
                    animate={{ 
                      opacity: hoveredCard === 2 ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    {pillars[2].details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        animate={{ 
                          x: hoveredCard === 2 ? 5 : 0
                        }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <div className="w-1 h-1 rounded-full bg-[#00BFFF]" />
                        <span className="text-base">{detail}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>

            {/* Fourth Card - Clean White Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              onHoverStart={() => setHoveredCard(3)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative overflow-hidden cursor-pointer group bg-[#004C97] h-[550px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${pillars[3].bgImage})` }}
              />
              
              {/* Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#004C97]/98 via-[#004C97]/85 to-transparent"
                animate={{
                  opacity: hoveredCard === 3 ? 0.95 : 1
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Accent Bar */}
              <motion.div 
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: pillars[3].color }}
                animate={{
                  width: hoveredCard === 3 ? 8 : 8
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 p-10 h-full flex flex-col">
                <motion.div
                  animate={{ 
                    scale: hoveredCard === 3 ? 1.1 : 1,
                    y: hoveredCard === 3 ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-auto"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20"
                  >
                    <Sparkles 
                      className="w-10 h-10 text-white" 
                    />
                  </div>
                </motion.div>
                
                <div>
                  <h3 className="text-3xl lg:text-4xl tracking-tight mb-4 text-white">
                    {pillars[3].title}
                  </h3>
                  
                  <p className="text-lg text-white/85 mb-6 leading-relaxed">
                    {pillars[3].description}
                  </p>
                  
                  <motion.ul
                    animate={{ 
                      opacity: hoveredCard === 3 ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    {pillars[3].details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        animate={{ 
                          x: hoveredCard === 3 ? 5 : 0
                        }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <div 
                          className="w-1 h-1 rounded-full bg-[#00BFFF]"
                        />
                        <span className="text-base">{detail}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Events Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-[#0066CC]" />
              <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50">
                Community Events
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight text-center text-[#004C97] mb-6">
              More Than Just Soccer
            </h2>
            <p className="text-xl text-[#004C97]/70 text-center max-w-3xl mx-auto leading-relaxed">
              We bring families together through special events, celebrations, and community gatherings. These moments create the bonds that make Noor Sports feel like home.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden bg-[#F8FBFF]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={seasonCelebrationsImg}
                  alt="Community gathering with NOOR SPORTS families"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl tracking-tight text-[#004C97] mb-3">
                  Season Celebrations
                </h3>
                <p className="text-[#004C97]/70 leading-relaxed">
                  Bringing families together to celebrate achievements, share meals, and create memories that last beyond the season.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden bg-[#F8FBFF]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={communityImg1}
                  alt="Happy kids at NOOR SPORTS community event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl tracking-tight text-[#004C97] mb-3">
                  Building Friendships
                </h3>
                <p className="text-[#004C97]/70 leading-relaxed">
                  Watching friendships blossom as kids share experiences, support each other, and grow together as a team.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="w-24 h-1 bg-[#00BFFF] mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-[#004C97] to-[#0066CC] text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              Join the Noor Sports Family
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Be part of a community where your child will thrive, make lifelong friends, and discover the joy of sports in a safe, supportive environment.
            </p>
            
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#00BFFF] text-white px-10 py-5 text-lg tracking-tight hover:bg-[#00A8E6] transition-colors"
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}