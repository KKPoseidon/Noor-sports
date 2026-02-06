import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/40 mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-8 text-[#0066CC]">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-[#004C97]/70 leading-relaxed">
              Have questions about our programs? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/40 mb-8">
                  Contact Information
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#0066CC]/40 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm tracking-tight uppercase text-[#0066CC]/40 mb-2">
                        Email
                      </div>
                      <a
                        href="mailto:noorsports.youth@gmail.com"
                        className="text-lg text-[#0066CC] hover:text-[#004C97] transition-colors"
                      >
                        noorsports.youth@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#0066CC]/40 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm tracking-tight uppercase text-[#0066CC]/40 mb-2">
                        Phone
                      </div>
                      <a
                        href="tel:+14093336619"
                        className="text-lg text-[#0066CC] hover:text-[#004C97] transition-colors"
                      >
                        +1 (409) 333-6619
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-tight uppercase text-[#0066CC]/40 mb-3">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0066CC]/20 focus:border-[#0066CC] outline-none transition-colors text-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm tracking-tight uppercase text-[#0066CC]/40 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0066CC]/20 focus:border-[#0066CC] outline-none transition-colors text-[#0066CC]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block text-sm tracking-tight uppercase text-[#0066CC]/40 mb-3">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0066CC]/20 focus:border-[#0066CC] outline-none transition-colors text-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm tracking-tight uppercase text-[#0066CC]/40 mb-3">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0066CC]/20 focus:border-[#0066CC] outline-none transition-colors appearance-none cursor-pointer text-[#0066CC]"
                    >
                      <option value="" className="bg-white">Select a subject</option>
                      <option value="general" className="bg-white">General Inquiry</option>
                      <option value="programs" className="bg-white">Program Information</option>
                      <option value="registration" className="bg-white">Registration</option>
                      <option value="other" className="bg-white">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm tracking-tight uppercase text-[#0066CC]/40 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-0 py-3 bg-transparent border-b border-[#0066CC]/20 focus:border-[#0066CC] outline-none transition-colors resize-none text-[#0066CC]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight hover:bg-[#00A8E6] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}