import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaPlus, 
  FaUsers, 
  FaTrophy,
  FaGamepad,
  FaCrown,
  FaChevronRight,
  FaUserPlus,
  FaCopy,
  FaCheck,
  FaTimes,
  FaEllipsisV
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Teams = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-teams');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sample user ID
  const userId = 'GH-' + (user?.email?.slice(0, 6).toUpperCase() || 'DEMO01');

  // Sample teams data
  const myTeams = [
    {
      id: 1,
      name: 'Team Alpha',
      game: 'BGMI',
      members: [
        { id: 1, name: 'John Doe', role: 'Leader', avatar: null, status: 'online' },
        { id: 2, name: 'Jane Smith', role: 'Member', avatar: null, status: 'online' },
        { id: 3, name: 'Mike Johnson', role: 'Member', avatar: null, status: 'offline' },
        { id: 4, name: 'Sarah Wilson', role: 'Member', avatar: null, status: 'online' },
      ],
      wins: 24,
      tournaments: 12,
      createdAt: 'Dec 2024',
    },
    {
      id: 2,
      name: 'Valorant Squad',
      game: 'Valorant',
      members: [
        { id: 1, name: 'Alex Brown', role: 'Leader', avatar: null, status: 'online' },
        { id: 2, name: 'Chris Lee', role: 'Member', avatar: null, status: 'busy' },
        { id: 3, name: 'Pat Taylor', role: 'Member', avatar: null, status: 'online' },
        { id: 4, name: 'Sam Davis', role: 'Member', avatar: null, status: 'offline' },
        { id: 5, name: 'Jordan White', role: 'Member', avatar: null, status: 'online' },
      ],
      wins: 18,
      tournaments: 8,
      createdAt: 'Nov 2024',
    },
  ];

  const invitations = [
    {
      id: 1,
      teamName: 'Pro Gamers Elite',
      game: 'BGMI',
      invitedBy: 'GameMaster99',
      date: '2 hours ago',
    },
    {
      id: 2,
      teamName: 'Neon Warriors',
      game: 'Free Fire',
      invitedBy: 'ProPlayer123',
      date: '1 day ago',
    },
  ];

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TeamCard = ({ team }) => (
    <div className="gaming-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{team.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{team.name}</h3>
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <FaGamepad />
              {team.game}
            </span>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#1F2937] rounded-lg transition-colors">
          <FaEllipsisV />
        </button>
      </div>

      {/* Members */}
      <div className="mb-4">
        <h4 className="text-gray-400 text-sm mb-3">Team Members ({team.members.length})</h4>
        <div className="flex flex-wrap gap-2">
          {team.members.map((member, index) => (
            <div key={member.id} className="flex items-center gap-2 bg-[#1A2332] px-3 py-2 rounded-lg">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <span className="text-xs text-white">{member.name.charAt(0)}</span>
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1A2332] ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{member.name}</p>
                {member.role === 'Leader' && (
                  <span className="flex items-center gap-1 text-yellow-500 text-xs">
                    <FaCrown className="text-[10px]" /> Leader
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 py-3 border-t border-[#1F2937]">
        <div className="flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          <span className="text-white font-semibold">{team.wins}</span>
          <span className="text-gray-400 text-sm">Wins</span>
        </div>
        <div className="flex items-center gap-2">
          <FaGamepad className="text-primary" />
          <span className="text-white font-semibold">{team.tournaments}</span>
          <span className="text-gray-400 text-sm">Tournaments</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link 
          to={`/teams/${team.id}`}
          className="btn-primary flex-1 py-2.5 text-center text-sm"
        >
          Manage Team
        </Link>
        <button className="btn-secondary py-2.5 px-4 text-sm flex items-center gap-2">
          <FaUserPlus />
          Invite
        </button>
      </div>
    </div>
  );

  const InvitationCard = ({ invitation }) => (
    <div className="gaming-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">{invitation.teamName}</h3>
          <span className="flex items-center gap-1 text-gray-400 text-sm">
            <FaGamepad />
            {invitation.game}
          </span>
        </div>
        <span className="text-gray-500 text-sm">{invitation.date}</span>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">
        Invited by <span className="text-primary">{invitation.invitedBy}</span>
      </p>

      <div className="flex gap-3">
        <button className="btn-primary flex-1 py-2.5 text-center text-sm flex items-center justify-center gap-2">
          <FaCheck />
          Accept
        </button>
        <button className="btn-secondary flex-1 py-2.5 text-center text-sm flex items-center justify-center gap-2 text-red-400 border-red-500/30 hover:border-red-500">
          <FaTimes />
          Decline
        </button>
      </div>
    </div>
  );

  // Create Team Modal
  const CreateTeamModal = () => (
    <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
      <div className="modal-content p-6 max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create New Team</h2>
          <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Team Name</label>
            <input 
              type="text" 
              placeholder="Enter team name" 
              className="input-gaming"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Primary Game</label>
            <select className="input-gaming">
              <option>Select a game</option>
              <option>BGMI</option>
              <option>Valorant</option>
              <option>Free Fire</option>
              <option>COD Mobile</option>
              <option>PUBG PC</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Team Size</label>
            <select className="input-gaming">
              <option>Select team size</option>
              <option>Duo (2 players)</option>
              <option>Squad (4 players)</option>
              <option>Team (5 players)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Description (Optional)</label>
            <textarea 
              placeholder="Tell others about your team..."
              className="input-gaming h-24 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-gradient flex-1">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Teams</h1>
            <p className="text-gray-400">Manage your teams and collaborate with teammates</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-gradient flex items-center gap-2 self-start"
          >
            <FaPlus />
            Create Team
          </button>
        </div>

        {/* User ID Card */}
        <div className="gaming-card p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Your Unique User ID</h3>
              <p className="text-white text-lg font-mono">{userId}</p>
              <p className="text-gray-500 text-xs mt-1">Share this ID to receive team invitations</p>
            </div>
            <button 
              onClick={copyUserId}
              className={`btn-secondary flex items-center gap-2 ${copied ? 'border-green-500 text-green-500' : ''}`}
            >
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? 'Copied!' : 'Copy ID'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my-teams')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'my-teams'
                ? 'bg-primary text-white glow-blue'
                : 'bg-[#0F1629] text-gray-400 hover:text-white border border-[#1F2937]'
            }`}
          >
            My Teams
          </button>
          <button
            onClick={() => setActiveTab('invitations')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all relative ${
              activeTab === 'invitations'
                ? 'bg-primary text-white glow-blue'
                : 'bg-[#0F1629] text-gray-400 hover:text-white border border-[#1F2937]'
            }`}
          >
            Invitations
            {invitations.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {invitations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'discover'
                ? 'bg-primary text-white glow-blue'
                : 'bg-[#0F1629] text-gray-400 hover:text-white border border-[#1F2937]'
            }`}
          >
            Discover
          </button>
        </div>

        {/* Search */}
        {activeTab === 'discover' && (
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-gaming pl-12"
            />
          </div>
        )}

        {/* Content */}
        {activeTab === 'my-teams' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myTeams.length > 0 ? (
              myTeams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <FaUsers className="text-6xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No teams yet</h3>
                <p className="text-gray-400 mb-6">Create a team or join one to get started</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FaPlus /> Create Your First Team
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'invitations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {invitations.length > 0 ? (
              invitations.map(invitation => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <FaUserPlus className="text-6xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No pending invitations</h3>
                <p className="text-gray-400">Share your User ID to receive team invitations</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="text-center py-20">
            <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Discover Teams</h3>
            <p className="text-gray-400 mb-6">Search for teams looking for players</p>
          </div>
        )}
      </div>

      {/* Create Team Modal */}
      {showCreateModal && <CreateTeamModal />}
    </div>
  );
};

export default Teams;
