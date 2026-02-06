import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Fall2025() {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1767902012345-bd31f0ba76d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMHRyYWluaW5nJTIwa2lkc3xlbnwxfHx8fDE3NzAxMDQ3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Building fundamental skills through engaging drills',
    },
    {
      url: 'https://images.unsplash.com/photo-1769620869060-a7ea8b59e6dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBzb2NjZXIlMjBmaWVsZHxlbnwxfHx8fDE3NzAwNjE1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Learning the joy of teamwork and competition',
    },
    {
      url: 'https://images.unsplash.com/photo-1695049391011-c69383402fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBjb2FjaCUyMGtpZHMlMjBwcmFjdGljZXxlbnwxfHx8fDE3NzAxMDQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Expert coaching with individual attention',
    },
    {
      url: 'https://images.unsplash.com/photo-1710301431051-ee6923af04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMHRlYW0lMjBoYXBweXxlbnwxfHx8fDE3NzAxMDQ3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Creating lasting friendships and memories',
    },
    {
      url: 'https://images.unsplash.com/photo-1717584146940-118a65525da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29jY2VyJTIwZHJpbGxzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzcwMTA0NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Professional training methods for young athletes',
    },
    {
      url: 'https://images.unsplash.com/photo-1765372674571-afef5d3771b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHNvY2NlciUyMGFjYWRlbXl8ZW58MXx8fHwxNzcwMTA0NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Developing confidence and soccer skills together',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm tracking-tight uppercase text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </Link>
            
            <div className="max-w-3xl">
              <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
                Fall 2025 Program
              </div>
              <h1 className="text-5xl lg:text-6xl tracking-tight mb-8 text-white">
                Fall Program 2025
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="w-5 h-5 text-[#00BFFF]" />
                  <span className="text-xl">September - November 2025</span>
                </div>
                
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-[#00BFFF]" />
                  <span className="text-xl">7050 Eckstrom Ave, San Diego, CA 92111</span>
                </div>
              </div>
              
              <div className="inline-block bg-white/10 px-6 py-3 backdrop-blur-sm mb-8">
                <span className="text-lg tracking-tight text-white">TK - 3rd Grade</span>
              </div>
              
              <p className="text-xl text-white/80 leading-relaxed">
                An exciting season of soccer development at Bright Horizon Academy. Our fall program combines professional training methods with a fun, supportive environment perfect for young learners.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-6">
              Gallery
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight text-[#004C97]">
              Program Highlights
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#F8FBFF] aspect-[4/3]">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[#004C97]/70 leading-relaxed">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#0066CC] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-8">
                Interested in Joining?
              </h2>
              <p className="text-xl text-white/70 mb-12">
                Get in touch to learn more about our fall program and secure your child's spot for an unforgettable soccer experience.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight hover:bg-[#00A8E6] transition-colors"
              >
                Contact Us
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
