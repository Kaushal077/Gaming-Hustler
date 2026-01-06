import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaTrophy, 
  FaUsers, 
  FaChartLine, 
  FaCheckCircle,
  FaCrown,
  FaGamepad,
  FaArrowRight
} from 'react-icons/fa';

const BecomeHost = () => {
  const adminEmail = 'kaushalmandal13590@gmail.com';
  
  const benefits = [
    {
      icon: <FaTrophy className="text-yellow-500" />,
      title: 'Host Unlimited Tournaments',
      description: 'Create and manage tournaments for any game with full control over rules and prizes.'
    },
    {
      icon: <FaUsers className="text-blue-500" />,
      title: 'Build Your Community',
      description: 'Attract players and build a loyal community around your tournaments.'
    },
    {
      icon: <FaChartLine className="text-green-500" />,
      title: 'Analytics Dashboard',
      description: 'Track registrations, engagement, and tournament performance with detailed stats.'
    },
    {
      icon: <FaCrown className="text-purple-500" />,
      title: 'Verified Host Badge',
      description: 'Get a verified badge that builds trust with players and participants.'
    },
  ];

  const requirements = [
    'Experience in organizing esports events or tournaments',
    'Understanding of competitive gaming rules and formats',
    'Ability to manage and communicate with participants',
    'Commitment to fair play and anti-cheat policies',
    'Active presence in the gaming community'
  ];

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Host Application - Gaming Hustlers');
    const body = encodeURIComponent(`Hello Gaming Hustlers Team,

I am interested in becoming a tournament host on your platform.

My Details:
- Name: 
- Email: 
- Discord/Social: 
- Gaming Experience: 
- Games I want to host tournaments for: 
- Previous tournament hosting experience (if any): 

Why I want to become a host:


Thank you for considering my application.

Best regards`);
    
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#030712] pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold mb-4">
            <FaCrown />
            BECOME A HOST
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Host Your Own
            <span className="gradient-text block">Tournaments</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our team of verified tournament hosts and create amazing esports experiences for gamers across India.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="gaming-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F2937] flex items-center justify-center text-2xl">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="gaming-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaGamepad className="text-primary" />
            Requirements
          </h2>
          <ul className="space-y-4">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application CTA */}
        <div className="gaming-card p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Send us an email with your details and experience. Our team will review your application and get back to you within 2-3 business days.
            </p>
            
            <button
              onClick={handleEmailClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all glow-blue"
            >
              <FaEnvelope className="text-xl" />
              Apply via Email
              <FaArrowRight />
            </button>
            
            <p className="text-gray-500 text-sm mt-4">
              Or email us directly at: <a href={`mailto:${adminEmail}`} className="text-primary hover:underline">{adminEmail}</a>
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="gaming-card p-5">
              <h3 className="text-white font-semibold mb-2">How long does the application process take?</h3>
              <p className="text-gray-400">We typically review applications within 2-3 business days. You'll receive an email with our decision.</p>
            </div>
            <div className="gaming-card p-5">
              <h3 className="text-white font-semibold mb-2">Is there a fee to become a host?</h3>
              <p className="text-gray-400">No, becoming a host is completely free. We only take a small platform fee from paid tournaments.</p>
            </div>
            <div className="gaming-card p-5">
              <h3 className="text-white font-semibold mb-2">What games can I host tournaments for?</h3>
              <p className="text-gray-400">You can host tournaments for any popular esports title including BGMI, Valorant, Free Fire, COD Mobile, and more.</p>
            </div>
            <div className="gaming-card p-5">
              <h3 className="text-white font-semibold mb-2">Do I need my own prize pool?</h3>
              <p className="text-gray-400">You can set up tournaments with your own prize pool or create free-to-enter tournaments with no prizes.</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
