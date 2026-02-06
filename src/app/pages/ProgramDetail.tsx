import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Users, Target } from 'lucide-react';

const programsData = {
  foundation: {
    title: 'Foundation Program',
    ageRange: 'Ages 6-10',
    description: 'Building fundamental skills and passion for the game through structured play and technical training.',
    overview: 'Our Foundation Program is designed to introduce young players to the beautiful game in a fun, supportive environment. We focus on developing basic motor skills, coordination, and a love for football that will last a lifetime.',
    whoFor: 'Perfect for beginners and young players taking their first steps in organized football. No prior experience required.',
    trainingFocus: [
      'Basic ball control and dribbling',
      'Fundamental passing and receiving',
      'Introduction to teamwork and sportsmanship',
      'Coordination and movement skills',
      'Game understanding through small-sided play',
    ],
    schedule: 'Twice weekly sessions: Tuesday & Thursday, 4:00 PM - 5:30 PM',
    location: 'Main Training Complex, Fields 1-3',
    image: 'https://images.unsplash.com/photo-1761039807688-f5b154a8827a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXJzJTIwdGVhbSUyMHlvdXRofGVufDF8fHx8MTc3MDA5MDAxMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  development: {
    title: 'Development Program',
    ageRange: 'Ages 11-14',
    description: 'Advanced technical training with tactical awareness and competitive match experience.',
    overview: 'The Development Program bridges the gap between foundational skills and elite performance. Players receive intensive technical training combined with tactical education and regular competitive matches.',
    whoFor: 'Intermediate players with 2+ years of experience looking to take their game to the next level and compete at regional tournaments.',
    trainingFocus: [
      'Advanced ball mastery and control',
      'Tactical positioning and game reading',
      'Set pieces and game situations',
      'Speed and agility development',
      'Match analysis and feedback sessions',
    ],
    schedule: 'Three weekly sessions: Monday, Wednesday, Friday, 5:00 PM - 7:00 PM + Weekend matches',
    location: 'Main Training Complex, Fields 4-6',
    image: 'https://images.unsplash.com/photo-1763643425378-fecc79d33159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMHRyYWluaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcwMDkwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  elite: {
    title: 'Elite Program',
    ageRange: 'Ages 15-18',
    description: 'Professional-level training preparing players for collegiate and professional pathways.',
    overview: 'Our Elite Program provides professional-level training and development for players with aspirations of playing at the collegiate or professional level. Includes exposure to scouts and college recruitment support.',
    whoFor: 'Advanced players with significant competitive experience who are committed to pursuing football at the highest levels.',
    trainingFocus: [
      'Professional-level technical refinement',
      'Advanced tactical systems and formations',
      'Physical conditioning and injury prevention',
      'Mental performance and resilience',
      'College recruitment preparation and showcases',
    ],
    schedule: 'Five weekly sessions: Monday-Friday, 6:00 PM - 8:30 PM + Weekend matches + Optional morning sessions',
    location: 'Elite Performance Center',
    image: 'https://images.unsplash.com/photo-1641821330404-765069b99aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MDA5MDAxMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  goalkeeper: {
    title: 'Goalkeeper Academy',
    ageRange: 'Ages 10-18',
    description: 'Specialized training for aspiring goalkeepers focusing on technique, positioning, and mental preparation.',
    overview: 'Dedicated goalkeeper development program with specialized coaching, video analysis, and position-specific training. Our goalkeeper coaches have professional experience and understand the unique demands of the position.',
    whoFor: 'Players committed to developing as goalkeepers and willing to put in the specialized work required to excel in this position.',
    trainingFocus: [
      'Shot stopping and diving technique',
      'Distribution and ball-playing skills',
      'Positioning and angle management',
      'Command of the box and communication',
      'Mental preparation and game management',
    ],
    schedule: 'Three weekly sessions: Tuesday, Thursday, Saturday, 5:00 PM - 6:30 PM',
    location: 'Goalkeeper Training Area, Main Complex',
    image: 'https://images.unsplash.com/photo-1760890518049-47b9822e1c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBiYWxsJTIwZ3Jhc3MlMjBjbG9zZXVwfGVufDF8fHx8MTc3MDA5MDAxMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  girls: {
    title: "Girls' Academy",
    ageRange: 'Ages 8-18',
    description: 'Empowering female athletes through comprehensive training and competitive opportunities.',
    overview: 'Our Girls Academy provides a supportive, empowering environment for female players to develop their skills and compete at the highest levels. We participate in elite girls leagues and tournaments nationwide.',
    whoFor: 'Female players of all skill levels committed to developing in a supportive, competitive environment designed specifically for girls.',
    trainingFocus: [
      'Technical skills and tactical awareness',
      'Physical development and strength training',
      'Leadership and team building',
      'Competition in elite girls leagues',
      'Pathway to collegiate opportunities',
    ],
    schedule: 'Age-dependent: 2-4 sessions per week + Weekend matches',
    location: 'Main Training Complex & Elite Performance Center',
    image: 'https://images.unsplash.com/photo-1761039807688-f5b154a8827a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXJzJTIwdGVhbSUyMHlvdXRofGVufDF8fHx8MTc3MDA5MDAxMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  summer: {
    title: 'Summer Intensive',
    ageRange: 'Ages 8-16',
    description: 'Immersive summer training camps focused on rapid skill development and team building.',
    overview: 'Our Summer Intensive camps provide week-long immersive training experiences during school breaks. Combines intensive skill work with competitive matches, team activities, and guest coaching from professional players.',
    whoFor: 'All players looking to maintain and improve their skills during the summer break through intensive, focused training.',
    trainingFocus: [
      'Intensive technical skill development',
      'Tactical workshops and match play',
      'Fitness and conditioning sessions',
      'Team building activities',
      'Guest coaching and player appearances',
    ],
    schedule: 'Week-long camps: Multiple sessions throughout summer, Monday-Friday, 9:00 AM - 3:00 PM',
    location: 'Main Training Complex',
    image: 'https://images.unsplash.com/photo-1763643425378-fecc79d33159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMHRyYWluaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcwMDkwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
};

export function ProgramDetail() {
  const { programId } = useParams();

  if (!programId || !(programId in programsData)) {
    return <Navigate to="/programs" replace />;
  }

  const program = programsData[programId as keyof typeof programsData];

  return (
    <div>
      {/* Back Navigation */}
      <section className="py-12 bg-[#0066CC] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm tracking-tight uppercase text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#004C97]">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4">
                {program.ageRange}
              </div>
              <h1 className="text-5xl lg:text-6xl tracking-tight text-white">
                {program.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 lg:py-32 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">
                  Overview
                </div>
                <p className="text-xl text-white/80 leading-relaxed">
                  {program.overview}
                </p>
              </motion.div>

              {/* Who It's For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-white/40" />
                  <div className="text-xs tracking-[0.2em] uppercase text-white/40">
                    Who It's For
                  </div>
                </div>
                <p className="text-lg text-white/70 leading-relaxed">
                  {program.whoFor}
                </p>
              </motion.div>

              {/* Training Focus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <Target className="w-5 h-5 text-white/40" />
                  <div className="text-xs tracking-[0.2em] uppercase text-white/40">
                    Training Focus
                  </div>
                </div>
                <ul className="space-y-4">
                  {program.trainingFocus.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-lg text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#004C97] p-8 space-y-8 sticky top-32"
              >
                {/* Schedule */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-white/40" />
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40">
                      Schedule
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed">{program.schedule}</p>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-white/40" />
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40">
                      Location
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed">{program.location}</p>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button className="w-full bg-[#00BFFF] text-white px-6 py-4 text-sm tracking-tight hover:bg-[#00A8E6] transition-colors">
                    Register Now
                  </button>
                  <Link
                    to="/contact"
                    className="block text-center mt-4 text-sm tracking-tight uppercase text-white/70 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-24 bg-[#004C97]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-12">
            Explore Other Programs
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm tracking-tight uppercase text-white/70 hover:text-white transition-colors"
          >
            View All Programs
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}