import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTournamentById, registerForTournament } from '../../api/tournamentAPI';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationType, setRegistrationType] = useState('solo');
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      const data = await getTournamentById(id);
      setTournament(data);
    } catch (error) {
      console.error('Error fetching tournament:', error);
      setTournament(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      setRegistering(true);
      await registerForTournament(id, {
        ...formData,
        email: user.email
      });
      setShowRegisterModal(false);
      fetchTournament(); // Refresh data
      alert('Successfully registered for tournament!');
    } catch (error) {
      console.error('Error registering:', error);
      alert(error.response?.data?.message || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] pt-16 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[#030712] pt-16 flex flex-col items-center justify-center text-white">
        <span className="text-6xl mb-4">🏆</span>
        <h2 className="text-2xl font-bold mb-2">Tournament Not Found</h2>
        <p className="text-gray-400 mb-6">The tournament you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tournaments')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium"
        >
          Browse Tournaments
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rules', label: 'Rules' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'participants', label: 'Participants' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'upcoming':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  // Handle both field naming conventions (backend uses maxPlayers/players, some use maxParticipants/currentParticipants)
  const maxSlots = tournament.maxPlayers || tournament.maxParticipants || 100;
  const currentSlots = tournament.players || tournament.currentParticipants || 0;
  const spotsLeft = maxSlots - currentSlots;
  const progress = (currentSlots / maxSlots) * 100;

  return (
    <div className="min-h-screen bg-[#030712] pt-16 pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-xl text-white hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(tournament.status)}`}>
            {tournament.status === 'live' && '🔴 '}{tournament.status?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        {/* Tournament Info Card */}
        <div className="gaming-card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">
                  {tournament.game}
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium">
                  {tournament.platform}
                </span>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium">
                  {tournament.teamSize}v{tournament.teamSize}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {tournament.name}
              </h1>
              
              <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
                <span>by {tournament.hostName || 'GamingHustlers'}</span>
                {tournament.status === 'approved' && (
                  <span className="text-blue-400">✓ Verified</span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Prize Pool</p>
                  <p className="text-xl font-bold text-green-400">₹{tournament.prize || tournament.prizePool || '0'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Entry Fee</p>
                  <p className="text-xl font-bold text-white">
                    {tournament.entryFee > 0 ? `₹${tournament.entryFee}` : 'FREE'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Spots Left</p>
                  <p className="text-xl font-bold text-yellow-400">{spotsLeft}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Team Size</p>
                  <p className="text-xl font-bold text-white">{tournament.teamSize || 4} Players</p>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowRegisterModal(true)}
                disabled={tournament.status === 'completed' || spotsLeft === 0}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  tournament.status === 'completed' || spotsLeft === 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 hover:scale-105'
                }`}
              >
                {tournament.status === 'completed' ? 'Tournament Ended' : spotsLeft === 0 ? 'Sold Out' : 'Register Now'}
              </button>
              
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{tournament.currentParticipants} registered</span>
                  <span className="text-white">{tournament.maxParticipants} max</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">About This Tournament</h3>
                <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-semibold mb-3">Important Dates</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Registration Deadline</span>
                      <span className="text-white">{new Date(tournament.registrationDeadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tournament Start</span>
                      <span className="text-white">{new Date(tournament.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tournament End</span>
                      <span className="text-white">{new Date(tournament.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tournament Rules</h3>
                <ul className="space-y-3">
                  {tournament.rules?.map((rule, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tournament Schedule</h3>
                <div className="space-y-4">
                  {tournament.schedule?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🎮</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.round}</p>
                        <p className="text-gray-400 text-sm">{item.date} at {item.time}</p>
                      </div>
                      {index === 0 && tournament.status === 'upcoming' && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                          Next
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prizes' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Prize Distribution</h3>
                <div className="space-y-3">
                  {tournament.prizes?.map((prize, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                          : index === 1
                          ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-500/30'
                          : index === 2
                          ? 'bg-gradient-to-r from-orange-700/20 to-orange-800/20 border border-orange-700/30'
                          : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                        </span>
                        <span className="text-white font-medium">{prize.position}</span>
                      </div>
                      <span className="text-green-400 font-bold text-lg">
                        ${prize.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Registered Participants ({tournament.currentParticipants})
                </h3>
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl mb-4 block">👥</span>
                  <p>Participant list will be available soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Card */}
            <div className="gaming-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Host</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {(tournament.hostName || 'H').charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium flex items-center gap-2">
                    {tournament.hostName || 'GamingHustlers'}
                    {tournament.status === 'approved' && (
                      <span className="text-blue-400 text-sm">✓</span>
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Official Tournament Host
                  </p>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="gaming-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Share Tournament</h3>
              <div className="flex gap-3">
                <button className="flex-1 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors">
                  📋 Copy Link
                </button>
                <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors">
                  🐦
                </button>
                <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors">
                  📱
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="gaming-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Have questions about this tournament? Contact the organizer or check our FAQ.
              </p>
              <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="gaming-card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Register for Tournament</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Registration Type */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-3">Registration Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRegistrationType('solo')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    registrationType === 'solo'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl block mb-2">👤</span>
                  <span className="font-medium">Solo</span>
                </button>
                <button
                  onClick={() => setRegistrationType('team')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    registrationType === 'team'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl block mb-2">👥</span>
                  <span className="font-medium">Team</span>
                </button>
              </div>
            </div>

            {registrationType === 'team' && (
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">Select Team</label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500">
                  <option value="">Choose a team</option>
                  <option value="team1">Phoenix Esports</option>
                  <option value="team2">Shadow Wolves</option>
                </select>
              </div>
            )}

            {/* Summary */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Entry Fee</span>
                <span className="text-white">${tournament.entryFee}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Platform Fee</span>
                <span className="text-white">$2.00</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-green-400 font-bold">${tournament.entryFee + 2}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetail;
