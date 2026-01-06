import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';

const Profile = () => {
  const { user, logout } = useAuth();
  const { currentUser, refetch } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate a unique user ID (in production, this would come from the database)
  const userId = currentUser?._id?.slice(-8)?.toUpperCase() || 'XXXXXXXX';

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'teams', label: 'My Teams', icon: '👥' },
    { id: 'tournaments', label: 'Tournaments', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Mock data - Replace with actual API data
  const stats = {
    tournamentsPlayed: 45,
    tournamentsWon: 12,
    winRate: 67,
    totalEarnings: 15420,
    currentRank: 'Diamond',
    globalRanking: 1247,
  };

  const recentMatches = [
    { game: 'BGMI', result: 'Win', placement: '1st', kills: 8, earnings: '+$250' },
    { game: 'Free Fire', result: 'Loss', placement: '5th', kills: 4, earnings: '+$50' },
    { game: 'COD Mobile', result: 'Win', placement: '2nd', kills: 12, earnings: '+$150' },
    { game: 'BGMI', result: 'Win', placement: '1st', kills: 10, earnings: '+$300' },
  ];

  const teams = [
    { name: 'Phoenix Esports', role: 'Captain', members: 5, game: 'BGMI' },
    { name: 'Shadow Wolves', role: 'Member', members: 4, game: 'Free Fire' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] pt-16 pb-20 md:pb-8">
      {/* Header Background */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent"></div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-[#030712] ring-2 ring-blue-500/50">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=3B82F6&color=fff&size=160`}
                alt={user?.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {stats.currentRank?.charAt(0)}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {user?.displayName || 'Gaming Pro'}
              </h1>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">
                {currentUser?.role?.toUpperCase() || 'PLAYER'}
              </span>
            </div>
            
            {/* User ID */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-400 text-sm">User ID:</span>
              <code className="px-2 py-1 bg-gray-800/50 rounded text-blue-400 font-mono text-sm">
                #{userId}
              </code>
              <button
                onClick={copyUserId}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                title="Copy User ID"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {user?.email}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Global Rank:</span>
                <span className="text-white font-semibold">#{stats.globalRanking}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-green-400 font-semibold">{stats.winRate}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Tournaments:</span>
                <span className="text-blue-400 font-semibold">{stats.tournamentsWon}/{stats.tournamentsPlayed}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    label="Tournaments Won"
                    value={stats.tournamentsWon}
                    icon="🏆"
                    color="yellow"
                  />
                  <StatCard
                    label="Total Earnings"
                    value={`$${stats.totalEarnings.toLocaleString()}`}
                    icon="💰"
                    color="green"
                  />
                  <StatCard
                    label="Win Rate"
                    value={`${stats.winRate}%`}
                    icon="📈"
                    color="blue"
                  />
                  <StatCard
                    label="Current Rank"
                    value={stats.currentRank}
                    icon="💎"
                    color="purple"
                  />
                </div>

                {/* Recent Matches */}
                <div className="gaming-card p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Matches</h3>
                  <div className="space-y-3">
                    {recentMatches.map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                            match.result === 'Win' ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}>
                            {match.result === 'Win' ? '🏆' : '💀'}
                          </div>
                          <div>
                            <p className="text-white font-medium">{match.game}</p>
                            <p className="text-gray-400 text-sm">
                              {match.placement} • {match.kills} kills
                            </p>
                          </div>
                        </div>
                        <span className={`font-semibold ${
                          match.result === 'Win' ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {match.earnings}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'stats' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">Detailed Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Total Matches</p>
                    <p className="text-2xl font-bold text-white">247</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Average Kills</p>
                    <p className="text-2xl font-bold text-white">6.8</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Top 10 Finishes</p>
                    <p className="text-2xl font-bold text-white">189</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">MVP Awards</p>
                    <p className="text-2xl font-bold text-white">23</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="gaming-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">My Teams</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Create Team
                  </button>
                </div>
                <div className="space-y-3">
                  {teams.map((team, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{team.name}</p>
                          <p className="text-gray-400 text-sm">{team.game} • {team.members} members</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        team.role === 'Captain'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {team.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tournaments' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">Tournament History</h3>
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl mb-4 block">🏆</span>
                  <p>Your tournament history will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="gaming-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700 rounded-xl text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">In-Game Username (BGMI)</label>
                    <input
                      type="text"
                      placeholder="Enter your BGMI username"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="gaming-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
              <div className="grid grid-cols-4 gap-3">
                {['🏆', '⚔️', '🎯', '💎', '🔥', '⭐', '👑', '🎮'].map((emoji, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                      index < 5 ? 'bg-gray-800' : 'bg-gray-800/50 opacity-50'
                    }`}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-4">5/8 unlocked</p>
            </div>

            {/* Linked Games */}
            <div className="gaming-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Linked Games</h3>
              <div className="space-y-3">
                {[
                  { name: 'BGMI', username: 'ProGamer123', verified: true },
                  { name: 'Free Fire', username: 'ShadowKing', verified: true },
                  { name: 'COD Mobile', username: null, verified: false },
                ].map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl"
                  >
                    <div>
                      <p className="text-white font-medium">{game.name}</p>
                      {game.username ? (
                        <p className="text-gray-400 text-sm">{game.username}</p>
                      ) : (
                        <p className="text-gray-500 text-sm">Not linked</p>
                      )}
                    </div>
                    {game.verified ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <button className="text-blue-400 text-sm hover:underline">Link</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon, color }) => {
  const colorClasses = {
    yellow: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  };

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} border`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
};

export default Profile;
