import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlay, 
  FaTrophy, 
  FaUsers, 
  FaGamepad, 
  FaChartLine, 
  FaDollarSign,
  FaClock,
  FaArrowRight,
  FaFire,
  FaBolt,
  FaCalendar,
  FaMedal,
  FaChevronRight,
  FaCrown,
  FaDiscord,
  FaYoutube,
  FaTwitch,
  FaStar
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { getTournaments } from '../../api/tournamentAPI';

// Animated Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0F1629] to-[#030712]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-neon-pink/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Live Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              SEASON 5 NOW LIVE
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Compete.
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-neon-pink bg-clip-text text-transparent">
                Conquer.
              </span>
              <br />
              Dominate.
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join the ultimate esports platform. Host tournaments, compete for glory, and build your legacy with the best players worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => navigate('/tournaments')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaPlay className="text-sm" />
                Browse Tournaments
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                Get Started Free
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">50K+</div>
                <div className="text-xs sm:text-sm text-gray-500">Active Players</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">₹10L+</div>
                <div className="text-xs sm:text-sm text-gray-500">Prize Pool</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-xs sm:text-sm text-gray-500">Tournaments</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Card */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-neon-pink/20 rounded-3xl blur-2xl" />
              
              {/* Featured Tournament Card */}
              <div className="relative bg-gradient-to-br from-[#0F1629] to-[#151C2C] rounded-2xl border border-white/10 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" 
                    alt="Featured Tournament"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </span>
                    <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">BGMI Pro League - Season 5</h3>
                  <p className="text-gray-400 text-sm mb-4">Grand Finals happening now. Watch the best teams compete!</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-yellow-500">
                        <FaTrophy />
                        ₹1,00,000
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaUsers />
                        12,450 watching
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/tournaments')}
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPlay className="text-xs" />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, change, changeType, color }) => {
  const colorClasses = {
    blue: 'from-primary/20 to-primary/5 border-primary/20',
    green: 'from-green-500/20 to-green-500/5 border-green-500/20',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
  };

  const iconColors = {
    blue: 'bg-primary/20 text-primary',
    green: 'bg-green-500/20 text-green-500',
    yellow: 'bg-yellow-500/20 text-yellow-500',
    purple: 'bg-purple-500/20 text-purple-500',
  };

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} border p-6 backdrop-blur-sm`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${
              changeType === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              <FaChartLine className={changeType === 'up' ? '' : 'rotate-180'} />
              {change} this week
            </span>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColors[color]}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </motion.div>
  );
};

// Chart Component (Simple Line Graph)
const WinRateChart = () => {
  return (
    <div className="gaming-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-gray-400 text-sm font-medium">Win Rate</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-white">68%</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              <FaChartLine />
              +12%
            </span>
          </div>
        </div>
      </div>
      {/* Simple SVG Chart */}
      <div className="h-32 relative">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q50,70 100,60 T200,40 T300,30 T400,20"
            fill="url(#fillGradient)"
          />
          <path
            d="M0,80 Q50,70 100,60 T200,40 T300,30 T400,20"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};

// Tournament Card Component
const TournamentCard = ({ tournament, index }) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5 hover:border-primary/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={tournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500'} 
          alt={tournament.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-[#0F1629]/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {tournament.status === 'live' ? (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/30">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
              {tournament.game}
            </span>
          )}
        </div>
        
        {/* Players Count */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded-full text-xs backdrop-blur-sm">
          <FaUsers className="text-gray-300" />
          <span className="text-white font-medium">{tournament.players}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {tournament.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1.5">
            <FaClock className="text-xs" />
            {tournament.time}
          </span>
          <span className="flex items-center gap-1.5 text-yellow-500 font-semibold">
            <FaTrophy className="text-xs" />
            ₹{tournament.prize}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-[#0F1629] flex items-center justify-center text-xs text-white font-medium"
              >
                {i}
              </div>
            ))}
            {tournament.players > 3 && (
              <div className="w-8 h-8 rounded-full bg-[#1F2937] border-2 border-[#0F1629] flex items-center justify-center text-xs text-gray-400 font-medium">
                +{tournament.players - 3}
              </div>
            )}
          </div>
          <Link 
            to={`/tournament/${tournament.id}`}
            className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-3 transition-all group/link"
          >
            Details 
            <FaChevronRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Game Card Component
const GameCard = ({ game, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="aspect-square relative overflow-hidden rounded-2xl">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-1">{game.name}</h3>
          <p className="text-gray-300 text-sm">{game.tournaments} tournaments</p>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const colors = {
    blue: 'from-primary/20 to-primary/5 border-primary/20 hover:border-primary/40',
    green: 'from-green-500/20 to-green-500/5 border-green-500/20 hover:border-green-500/40',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40',
  };

  const iconColors = {
    blue: 'bg-primary text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    yellow: 'bg-yellow-500 text-white',
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors[color]} border p-6 transition-all duration-300`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${iconColors[color]}`}>
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Main Home Component
const NewHome = () => {
  const { user } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is host
  const isHost = currentUser?.role === 'instructor' || currentUser?.role === 'admin' || currentUser?.role === 'host';

  // Popular games data with reliable image URLs
  const popularGames = [
    { name: 'BGMI', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop', tournaments: 45 },
    { name: 'Valorant', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop', tournaments: 32 },
    { name: 'Free Fire', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop', tournaments: 28 },
    { name: 'COD Mobile', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=400&h=400&fit=crop', tournaments: 24 },
  ];

  // Features data - shown to all users
  const features = [
    { icon: FaTrophy, title: 'Competitive Tournaments', description: 'Join ranked tournaments with prize pools and climb the leaderboards.', color: 'blue' },
    { icon: FaUsers, title: 'Team Management', description: 'Build your squad, manage rosters, and compete as a team.', color: 'green' },
    { icon: FaChartLine, title: 'Performance Stats', description: 'Track your progress with detailed analytics and match history.', color: 'purple' },
    { icon: FaGamepad, title: 'Multiple Games', description: 'Play tournaments across BGMI, Valorant, Free Fire, COD Mobile and more.', color: 'yellow' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTournaments({ status: 'live' });
        if (!data || data.length === 0) {
          const upcomingData = await getTournaments({ status: 'upcoming' });
          setTournaments(upcomingData || []);
        } else {
          setTournaments(data);
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero Section - Full Width */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Popular Games Section */}
        <section className="py-16">
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Popular Games</h2>
              <p className="text-gray-400">Join tournaments for your favorite games</p>
            </div>
            <Link to="/tournaments" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Games <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularGames.map((game, index) => (
              <GameCard key={game.name} game={game} index={index} />
            ))}
          </div>
        </section>

        {/* Featured Tournaments Section */}
        <section className="py-16 border-t border-white/5">
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">Tournaments</h2>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                  <FaFire />
                  Hot
                </span>
              </div>
              <p className="text-gray-400">Compete and win amazing prizes</p>
            </div>
            <Link to="/tournaments" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-[#0F1629] border border-white/5 overflow-hidden animate-pulse">
                  <div className="h-44 bg-[#1A2332]" />
                  <div className="p-5">
                    <div className="h-5 bg-[#1A2332] rounded-lg w-3/4 mb-3" />
                    <div className="h-4 bg-[#1A2332] rounded-lg w-1/2 mb-4" />
                    <div className="h-10 bg-[#1A2332] rounded-lg" />
                  </div>
                </div>
              ))
            ) : tournaments.length > 0 ? (
              tournaments.slice(0, 6).map((t, index) => (
                <TournamentCard 
                  key={t._id || index}
                  index={index}
                  tournament={{
                    id: t._id,
                    name: t.name,
                    game: t.game || 'BGMI',
                    prize: t.prize || t.prizePool || '10,000',
                    players: t.players || 0,
                    time: t.date || 'TBD',
                    status: t.status || 'upcoming',
                    image: t.image
                  }}
                />
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-16 px-6 rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <FaTrophy className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No Tournaments Available</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">Check back soon for upcoming tournaments. New competitions are added regularly!</p>
                  {isHost && (
                    <button 
                      onClick={() => navigate("/host-tournament")}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
                    >
                      <FaGamepad /> Host Tournament
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t border-white/5">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Gaming Hustlers?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to compete, connect, and conquer in the esports world.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 border-t border-white/5">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Get Started</h2>
            <p className="text-gray-400">Choose your path and start your journey</p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Link to="/tournaments" className="block p-6 rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5 hover:border-primary/30 transition-all group text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FaTrophy className="text-2xl text-primary" />
                </div>
                <span className="text-white font-semibold block mb-1">Browse Tournaments</span>
                <span className="text-gray-500 text-sm">Find your next competition</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/teams" className="block p-6 rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5 hover:border-green-500/30 transition-all group text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FaUsers className="text-2xl text-green-500" />
                </div>
                <span className="text-white font-semibold block mb-1">Find Teams</span>
                <span className="text-gray-500 text-sm">Join or create a squad</span>
              </Link>
            </motion.div>
            
            {/* Only show Host Tournament for hosts */}
            {isHost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/host-tournament" className="block p-6 rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5 hover:border-purple-500/30 transition-all group text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaGamepad className="text-2xl text-purple-500" />
                  </div>
                  <span className="text-white font-semibold block mb-1">Host Tournament</span>
                  <span className="text-gray-500 text-sm">Create your event</span>
                </Link>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isHost ? 0.3 : 0.2 }}
            >
              <Link to="/profile" className="block p-6 rounded-2xl bg-gradient-to-br from-[#0F1629] to-[#151C2C] border border-white/5 hover:border-yellow-500/30 transition-all group text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FaMedal className="text-2xl text-yellow-500" />
                </div>
                <span className="text-white font-semibold block mb-1">View Profile</span>
                <span className="text-gray-500 text-sm">Check your stats</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 pb-24">
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ animation: 'gradient-shift 5s ease infinite' }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Compete?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of players already competing on Gaming Hustlers. Sign up now and get access to exclusive tournaments.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
                >
                  Create Free Account
                </button>
                <button 
                  onClick={() => navigate('/tournaments')}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  Explore Tournaments
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default NewHome;
