import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createTournament } from '../../api/tournamentAPI';

const HostTournament = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    platform: 'Mobile',
    description: '',
    teamSize: 4,
    maxParticipants: 100,
    entryFee: 0,
    prizePool: 0,
    startDate: '',
    startTime: '',
    endDate: '',
    registrationDeadline: '',
    rules: [''],
    image: '',
    isPrivate: false,
    discordLink: '',
  });

  const games = [
    { id: 'bgmi', name: 'BGMI', icon: '🎮' },
    { id: 'freefire', name: 'Free Fire', icon: '🔥' },
    { id: 'codm', name: 'COD Mobile', icon: '🎯' },
    { id: 'valorant', name: 'Valorant', icon: '⚔️' },
    { id: 'csgo', name: 'CS:GO', icon: '🔫' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
    { id: 'apex', name: 'Apex Legends', icon: '🦊' },
    { id: 'other', name: 'Other', icon: '🎲' },
  ];

  const platforms = ['Mobile', 'PC', 'Console', 'Cross-Platform'];
  const teamSizes = [1, 2, 3, 4, 5, 6];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const addRule = () => {
    setFormData(prev => ({ ...prev, rules: [...prev.rules, ''] }));
  };

  const removeRule = (index) => {
    const newRules = formData.rules.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const tournamentData = {
        ...formData,
        rules: formData.rules.filter(r => r.trim() !== ''),
        hostName: user?.displayName,
        hostEmail: user?.email,
        hostImage: user?.photoURL,
        status: 'pending', // Needs admin approval
        players: 0,
        maxPlayers: parseInt(formData.maxParticipants),
        prize: formData.prizePool,
        date: formData.startDate,
        registeredTeams: [],
      };

      const response = await createTournament(tournamentData);
      if (response.success) {
        alert('Tournament created! It will be visible after admin approval.');
        navigate('/tournaments');
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert(error.response?.data?.message || 'Error creating tournament');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Details' },
    { number: 3, title: 'Rules & Settings' },
    { number: 4, title: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] pt-16 pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Host a Tournament</h1>
          <p className="text-gray-400">Create and manage your own esports tournament</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= step.number
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className={`mt-2 text-xs ${
                  currentStep >= step.number ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded ${
                  currentStep > step.number ? 'bg-blue-500' : 'bg-gray-800'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="gaming-card p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
              
              {/* Tournament Name */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Tournament Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., BGMI Pro League Season 5"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Game Selection */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Select Game *</label>
                <div className="grid grid-cols-4 gap-3">
                  {games.map(game => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, game: game.name }))}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.game === game.name
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{game.icon}</span>
                      <span className="text-xs">{game.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Platform *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, platform }))}
                      className={`p-3 rounded-xl border transition-all ${
                        formData.platform === platform
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your tournament..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Tournament Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Team Size */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Team Size *</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    {teamSizes.map(size => (
                      <option key={size} value={size}>
                        {size === 1 ? 'Solo (1v1)' : `${size} Players`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Participants */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Max Teams/Participants *</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    min={2}
                    max={1000}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Entry Fee */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Entry Fee ($)</label>
                  <input
                    type="number"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleInputChange}
                    min={0}
                    step={1}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Prize Pool */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Prize Pool ($)</label>
                  <input
                    type="number"
                    name="prizePool"
                    value={formData.prizePool}
                    onChange={handleInputChange}
                    min={0}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Start Time *</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Registration Deadline *</label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Cover Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Rules & Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Rules & Settings</h2>
              
              {/* Tournament Rules */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Tournament Rules</label>
                <div className="space-y-3">
                  {formData.rules.map((rule, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder={`Rule ${index + 1}`}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                      {formData.rules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRule(index)}
                          className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRule}
                    className="w-full p-3 border border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
                  >
                    + Add Rule
                  </button>
                </div>
              </div>

              {/* Discord Link */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Discord Server Link</label>
                <input
                  type="url"
                  name="discordLink"
                  value={formData.discordLink}
                  onChange={handleInputChange}
                  placeholder="https://discord.gg/your-server"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Privacy Setting */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <p className="text-white font-medium">Private Tournament</p>
                  <p className="text-gray-400 text-sm">Only invited players can join</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Review & Publish</h2>
              
              {/* Preview Card */}
              <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Tournament Cover"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {formData.game || 'Game'}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                      {formData.platform}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {formData.name || 'Tournament Name'}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {formData.description || 'Tournament description...'}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Team Size</span>
                  <span className="text-white">{formData.teamSize} players</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Max Participants</span>
                  <span className="text-white">{formData.maxParticipants}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Entry Fee</span>
                  <span className="text-white">
                    {formData.entryFee > 0 ? `$${formData.entryFee}` : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Prize Pool</span>
                  <span className="text-green-400 font-bold">${formData.prizePool}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-white">
                    {formData.startDate} at {formData.startTime}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-800/30 rounded-xl">
                  <span className="text-gray-400">Rules</span>
                  <span className="text-white">
                    {formData.rules.filter(r => r.trim()).length} rules
                  </span>
                </div>
              </div>

              {/* Agreement */}
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 text-sm">
                  ⚠️ By publishing this tournament, you agree to our terms of service and
                  tournament hosting guidelines. You are responsible for managing the
                  tournament and distributing prizes.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Tournament'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostTournament;
