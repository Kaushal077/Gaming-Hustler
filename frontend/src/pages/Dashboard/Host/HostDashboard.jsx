import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  FaCog, 
  FaTrophy, 
  FaUsers, 
  FaPlus, 
  FaMinus,
  FaGamepad,
  FaCalendar,
  FaDollarSign,
  FaChartBar,
  FaCrown,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaEnvelope
} from 'react-icons/fa';
import { createTournament, getTournamentsByHost, deleteTournament } from '../../../api/tournamentAPI';

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    customGame: '',
    startDate: '',
    prizePool: 0,
    maxPlayers: 32,
    rules: '',
    description: '',
    platform: 'Mobile',
    teamSize: 4,
    entryFee: 0,
  });

  const games = [
    { id: 'bgmi', name: 'BGMI', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100' },
    { id: 'valorant', name: 'Valorant', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100' },
    { id: 'freefire', name: 'Free Fire', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=100' },
    { id: 'codm', name: 'COD Mobile', image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=100' },
    { id: 'pubg', name: 'PUBG PC', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=100' },
    { id: 'other', name: 'Other', image: null },
  ];

  useEffect(() => {
    if (user?.email) {
      fetchHostTournaments();
    }
  }, [user]);

  const fetchHostTournaments = async () => {
    try {
      setLoading(true);
      const data = await getTournamentsByHost(user.email);
      setTournaments(data || []);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleGameSelect = (gameId) => {
    setFormData(prev => ({ ...prev, game: gameId }));
  };

  const adjustPlayers = (amount) => {
    setFormData(prev => ({
      ...prev,
      maxPlayers: Math.max(4, Math.min(500, prev.maxPlayers + amount))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.game || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    setCreating(true);
    try {
      const selectedGame = games.find(g => g.id === formData.game);
      const tournamentData = {
        name: formData.name,
        game: formData.game === 'other' ? formData.customGame : selectedGame?.name,
        platform: formData.platform,
        description: formData.description || formData.rules,
        prize: formData.prizePool.toString(),
        prizePool: formData.prizePool,
        entryFee: formData.entryFee,
        maxPlayers: formData.maxPlayers,
        teamSize: formData.teamSize,
        date: new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        startDate: formData.startDate,
        rules: formData.rules ? formData.rules.split('\n').filter(r => r.trim()) : [],
        image: selectedGame?.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
        hostName: user?.displayName || 'Host',
        hostEmail: user?.email,
        hostImage: user?.photoURL,
        status: 'pending', // Needs admin approval
      };

      const response = await createTournament(tournamentData);
      if (response.success) {
        alert('Tournament created! It will be visible after admin approval.');
        setFormData({
          name: '',
          game: '',
          customGame: '',
          startDate: '',
          prizePool: 0,
          maxPlayers: 32,
          rules: '',
          description: '',
          platform: 'Mobile',
          teamSize: 4,
          entryFee: 0,
        });
        fetchHostTournaments();
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert(error.response?.data?.message || 'Error creating tournament');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTournament = async (id) => {
    if (!confirm('Are you sure you want to delete this tournament?')) return;
    
    try {
      await deleteTournament(id);
      fetchHostTournaments();
    } catch (error) {
      console.error('Error deleting tournament:', error);
      alert('Failed to delete tournament');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'LIVE NOW';
      case 'upcoming': return 'UPCOMING';
      case 'pending': return 'PENDING APPROVAL';
      case 'completed': return 'COMPLETED';
      default: return status?.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="w-14 h-14 rounded-full border-2 border-primary"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                  {user?.displayName?.charAt(0) || 'H'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030712]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Host Panel</p>
              <h2 className="text-white font-bold text-xl">{user?.displayName || 'Host'}</h2>
            </div>
          </div>
          <button className="p-3 rounded-xl bg-[#0F1629] border border-[#1F2937] text-gray-400 hover:text-white transition-colors">
            <FaCog className="text-xl" />
          </button>
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Create Tournament */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Create Tournament</h1>
              <button 
                onClick={() => setShowDrafts(!showDrafts)}
                className="px-4 py-2 rounded-xl bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors"
              >
                Drafts ({tournaments.filter(t => t.status === 'pending').length})
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tournament Name */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Tournament Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Weekly Showdown #42"
                  className="w-full px-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Select Game */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                  Select Game
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {games.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleGameSelect(game.id)}
                      className={`relative p-3 rounded-xl border-2 transition-all ${
                        formData.game === game.id
                          ? 'border-primary bg-primary/20'
                          : 'border-[#1F2937] bg-[#0F1629] hover:border-primary/50'
                      }`}
                    >
                      {game.image ? (
                        <img 
                          src={game.image} 
                          alt={game.name}
                          className="w-full h-16 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-16 bg-[#1F2937] rounded-lg mb-2 flex items-center justify-center">
                          <FaGamepad className="text-2xl text-gray-500" />
                        </div>
                      )}
                      <span className="text-xs font-medium text-white block truncate">{game.name}</span>
                      {formData.game === game.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {formData.game === 'other' && (
                  <input
                    type="text"
                    name="customGame"
                    value={formData.customGame}
                    onChange={handleInputChange}
                    placeholder="Enter game name"
                    className="w-full mt-3 px-5 py-3 bg-[#0F1629] border border-[#1F2937] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                )}
              </div>

              {/* Date and Prize */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                    <FaCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                    Prize Pool
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                    <input
                      type="number"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full pl-10 pr-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Platform and Team Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                    Platform
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Mobile">Mobile</option>
                    <option value="PC">PC</option>
                    <option value="Console">Console</option>
                    <option value="Cross-Platform">Cross-Platform</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                    Team Size
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value={1}>Solo (1)</option>
                    <option value={2}>Duo (2)</option>
                    <option value={4}>Squad (4)</option>
                    <option value={5}>Team (5)</option>
                  </select>
                </div>
              </div>

              {/* Participants */}
              <div className="gaming-card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <FaUsers className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Participants</h3>
                      <p className="text-gray-400 text-sm">Max players allowed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => adjustPlayers(-4)}
                      className="w-10 h-10 rounded-lg bg-[#1F2937] text-white hover:bg-[#2D3748] transition-colors flex items-center justify-center"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-2xl font-bold text-white w-16 text-center">{formData.maxPlayers}</span>
                    <button
                      type="button"
                      onClick={() => adjustPlayers(4)}
                      className="w-10 h-10 rounded-lg bg-[#1F2937] text-white hover:bg-[#2D3748] transition-colors flex items-center justify-center"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Entry Fee */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Entry Fee (₹0 for free)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                  <input
                    type="number"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full pl-10 pr-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    min="0"
                  />
                </div>
              </div>

              {/* Format Rules */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Format Rules
                </label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="Enter tournament rules, elimination type, map rotation..."
                  rows={4}
                  className="w-full px-5 py-4 bg-[#0F1629] border border-[#1F2937] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={creating}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus className="text-lg" />
                    Create Tournament
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Active Tournaments */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Active Tournaments</h2>
              <button 
                onClick={() => navigate('/tournaments')}
                className="text-primary hover:text-primary-light font-medium"
              >
                Manage All
              </button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="gaming-card p-5 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-[#1F2937]" />
                      <div className="flex-1">
                        <div className="h-5 bg-[#1F2937] rounded w-3/4 mb-2" />
                        <div className="h-4 bg-[#1F2937] rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tournaments.length > 0 ? (
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <div key={tournament._id} className="gaming-card p-5">
                    <div className="flex items-start gap-4">
                      <img 
                        src={tournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100'}
                        alt={tournament.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold text-lg">{tournament.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(tournament.status)}`}>
                            {getStatusText(tournament.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <FaUsers />
                            {tournament.players || 0}/{tournament.maxPlayers}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaTrophy className="text-yellow-500" />
                            ₹{tournament.prize}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    {tournament.status === 'live' && (
                      <div className="mt-4 pt-4 border-t border-[#1F2937]">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">ROUND {tournament.currentRound || 1}</span>
                          <span className="text-gray-400">MATCH {tournament.currentMatch || 1}/{tournament.totalMatches || 8}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${((tournament.currentMatch || 1) / (tournament.totalMatches || 8)) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button 
                        onClick={() => navigate(`/tournament/${tournament._id}`)}
                        className="py-3 rounded-xl bg-[#1F2937] text-white font-medium hover:bg-[#2D3748] transition-colors"
                      >
                        {tournament.status === 'live' ? 'Bracket' : 'View'}
                      </button>
                      <button 
                        onClick={() => handleDeleteTournament(tournament._id)}
                        className="py-3 rounded-xl bg-[#1F2937] text-white font-medium hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      >
                        {tournament.status === 'pending' ? 'Delete' : 'Settings'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="gaming-card p-8 text-center">
                <FaTrophy className="text-5xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Tournaments Yet</h3>
                <p className="text-gray-400">Create your first tournament to get started!</p>
              </div>
            )}

            {/* Stats Card */}
            <div className="gaming-card p-5 mt-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaChartBar className="text-primary" />
                Your Stats
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{tournaments.length}</p>
                  <p className="text-gray-400 text-sm">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{tournaments.filter(t => t.status === 'live' || t.status === 'upcoming').length}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">{tournaments.filter(t => t.status === 'pending').length}</p>
                  <p className="text-gray-400 text-sm">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
