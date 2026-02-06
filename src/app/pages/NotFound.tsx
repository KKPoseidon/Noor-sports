import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0066CC]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl px-6"
      >
        <div className="text-8xl lg:text-9xl tracking-tight mb-8 text-white">404</div>
        <h1 className="text-3xl lg:text-4xl tracking-tight mb-6 text-white">Page Not Found</h1>
        <p className="text-lg text-white/80 mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-8 py-4 text-sm tracking-tight hover:bg-[#00A8E6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}