import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaTrophy, 
  FaUsers, 
  FaClock, 
  FaGamepad,
  FaDesktop,
  FaMobile,
  FaChevronRight,
  FaPlus,
  FaTimes,
  FaCalendar,
  FaDollarSign,
  FaCrown
} from 'react-icons/fa';
import { getTournaments } from '../../api/tournamentAPI';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';

const Tournaments = () => {
  const { user } = useAuth();
  const { currentUser } = useUser();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Check if user is host
  const isHost = currentUser?.role === 'instructor' || currentUser?.role === 'admin' || currentUser?.role === 'host';

  const [filters, setFilters] = useState({
    game: 'all',
    platform: 'all',
    teamSize: 'all',
    entryFee: 'all',
  });

  const games = ['All Games', 'BGMI', 'Valorant', 'Free Fire', 'COD Mobile', 'PUBG PC', 'Fortnite'];
  const platforms = ['All Platforms', 'Mobile', 'PC'];
  const teamSizes = ['All Sizes', 'Solo', 'Duo', 'Squad (4)', 'Team (5)'];
  const entryFees = ['All', 'Free Entry', 'Paid'];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'live', label: '🔴 Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ];

  useEffect(() => {
    fetchTournaments();
  }, [activeTab, filters]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const apiFilters = {
        game: filters.game,
        platform: filters.platform,
        status: activeTab !== 'all' ? activeTab : undefined,
        search: searchQuery || undefined
      };
      const data = await getTournaments(apiFilters);
      setTournaments(data || []);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        fetchTournaments();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTournaments = tournaments.filter(t => {
    // Tab filter (if not already filtered by API)
    if (activeTab !== 'all' && t.status !== activeTab) return false;
    
    // Search filter (backup if API doesn't support)
    if (searchQuery && !t.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const TournamentCard = ({ tournament }) => (
    <div className="gaming-card overflow-hidden card-shine group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={tournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500'} 
          alt={tournament.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {tournament.status === 'live' ? (
            <span className="badge-live">🔴 LIVE</span>
          ) : tournament.status === 'upcoming' ? (
            <span className="badge-primary">UPCOMING</span>
          ) : (
            <span className="badge bg-gray-500/20 text-gray-400">COMPLETED</span>
          )}
        </div>
        
        {/* Platform Badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded-lg text-xs text-white">
            {tournament.platform === 'Mobile' ? <FaMobile /> : <FaDesktop />}
            {tournament.platform}
          </span>
        </div>

        {/* Game Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="flex items-center gap-1 px-3 py-1 bg-primary/80 rounded-lg text-sm font-medium text-white">
            <FaGamepad />
            {tournament.game}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-3 line-clamp-1">{tournament.name}</h3>
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <FaTrophy className="text-yellow-500" />
            <span className="text-gray-400">Prize:</span>
            <span className="text-white font-semibold">₹{tournament.prize}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaUsers className="text-primary" />
            <span className="text-gray-400">Players:</span>
            <span className="text-white font-semibold">{tournament.players}/{tournament.maxPlayers}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaCalendar className="text-green-500" />
            <span className="text-gray-400">Date:</span>
            <span className="text-white font-semibold">{tournament.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaDollarSign className="text-orange-500" />
            <span className="text-gray-400">Entry:</span>
            <span className="text-white font-semibold">
              {tournament.entryFee === 0 ? 'Free' : `₹${tournament.entryFee}`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Registration</span>
            <span className="text-white">{Math.round((tournament.players / tournament.maxPlayers) * 100)}% Full</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(tournament.players / tournament.maxPlayers) * 100}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">By {tournament.host}</span>
          <Link 
            to={`/tournament/${tournament.id || tournament._id}`}
            className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
          >
            {tournament.status === 'live' ? 'Watch' : 'Register'}
            <FaChevronRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tournaments</h1>
            <p className="text-gray-400">Discover and join competitive gaming tournaments</p>
          </div>
          {isHost ? (
            <Link to="/host-tournament" className="btn-gradient flex items-center gap-2 self-start">
              <FaPlus />
              Host Tournament
            </Link>
          ) : (
            <Link to="/become-host" className="btn-gradient flex items-center gap-2 self-start">
              <FaCrown />
              Become a Host
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-gaming pl-12"
            />
          </div>
          
          {/* Filter Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'border-primary text-primary' : ''}`}
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="gaming-card p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Game</label>
                <select 
                  value={filters.game}
                  onChange={(e) => setFilters({...filters, game: e.target.value})}
                  className="input-gaming"
                >
                  {games.map(game => (
                    <option key={game} value={game.toLowerCase()}>{game}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Platform</label>
                <select 
                  value={filters.platform}
                  onChange={(e) => setFilters({...filters, platform: e.target.value})}
                  className="input-gaming"
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform.toLowerCase()}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Team Size</label>
                <select 
                  value={filters.teamSize}
                  onChange={(e) => setFilters({...filters, teamSize: e.target.value})}
                  className="input-gaming"
                >
                  {teamSizes.map(size => (
                    <option key={size} value={size.toLowerCase()}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Entry Fee</label>
                <select 
                  value={filters.entryFee}
                  onChange={(e) => setFilters({...filters, entryFee: e.target.value})}
                  className="input-gaming"
                >
                  {entryFees.map(fee => (
                    <option key={fee} value={fee.toLowerCase()}>{fee}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white glow-blue'
                  : 'bg-[#0F1629] text-gray-400 hover:text-white border border-[#1F2937]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tournament Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gaming-card animate-pulse">
                <div className="h-44 bg-[#1A2332]" />
                <div className="p-5">
                  <div className="h-6 bg-[#1A2332] rounded w-3/4 mb-3" />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="h-4 bg-[#1A2332] rounded" />
                    <div className="h-4 bg-[#1A2332] rounded" />
                    <div className="h-4 bg-[#1A2332] rounded" />
                    <div className="h-4 bg-[#1A2332] rounded" />
                  </div>
                  <div className="h-2 bg-[#1A2332] rounded mb-4" />
                  <div className="h-10 bg-[#1A2332] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament, index) => (
              <TournamentCard key={tournament._id || tournament.id || index} tournament={tournament} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaTrophy className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tournaments found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
            {isHost ? (
              <Link to="/host-tournament" className="btn-primary inline-flex items-center gap-2">
                <FaPlus /> Host a Tournament
              </Link>
            ) : (
              <Link to="/become-host" className="btn-primary inline-flex items-center gap-2">
                <FaCrown /> Become a Host
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
