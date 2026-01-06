import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  FaBell, 
  FaSearch, 
  FaUserCircle, 
  FaGamepad,
  FaPlus,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
  FaTrophy,
  FaUsers,
  FaHome,
  FaCrown
} from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';

const TopNav = () => {
  const { user, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Check if user is host/instructor/admin
  const isHost = currentUser?.role === 'instructor' || currentUser?.role === 'admin' || currentUser?.role === 'host';

  // Sample notifications
  const notifications = [
    { id: 1, type: 'invite', message: 'Team Alpha invited you to join', time: '2m ago', unread: true },
    { id: 2, type: 'tournament', message: 'BGMI Pro League starts in 1 hour', time: '1h ago', unread: true },
    { id: 3, type: 'match', message: 'Your match result is ready', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/tournaments', label: 'Tournaments', icon: FaTrophy },
    { path: '/teams', label: 'Teams', icon: FaUsers },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0F1C]/98 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/gh-logo.png" alt="GamingHustlers" className="w-10 h-10" />
            <span className="text-xl font-bold text-white hidden sm:block">
              Gaming<span className="text-purple-500">Hustlers</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-[#1F2937]'
                  }`
                }
              >
                <link.icon className="text-sm" />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center relative">
              <FaSearch className="absolute left-3 text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-[#0F1629] border border-[#1F2937] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {user ? (
              <>
                {/* Host Button - Only shown for users with host role */}
                {isHost && (
                  <Link
                    to="/host-tournament"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
                  >
                    <FaPlus className="text-sm" />
                    <span>Host</span>
                  </Link>
                )}

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaBell className="text-xl" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#0F1629] border border-[#1F2937] rounded-xl shadow-lg overflow-hidden animate-fade-in">
                      <div className="px-4 py-3 border-b border-[#1F2937]">
                        <h3 className="text-white font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-[#1A2332] cursor-pointer transition-colors ${
                              notification.unread ? 'bg-primary/5' : ''
                            }`}
                          >
                            <p className="text-white text-sm">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/notifications"
                        className="block px-4 py-3 text-center text-primary text-sm font-medium hover:bg-[#1A2332] border-t border-[#1F2937]"
                      >
                        View All
                      </Link>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full border-2 border-[#1F2937]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <FaUserCircle className="text-primary text-lg" />
                      </div>
                    )}
                    <FaChevronDown className={`text-gray-400 text-xs transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0F1629] border border-[#1F2937] rounded-xl shadow-lg overflow-hidden animate-fade-in">
                      <div className="px-4 py-3 border-b border-[#1F2937]">
                        <p className="text-white font-medium truncate">{user.displayName || 'User'}</p>
                        <p className="text-gray-500 text-sm truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-[#1A2332] transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUserCircle />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-[#1A2332] transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaCog />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-[#1A2332] transition-colors w-full"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {showMobileMenu ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#0A0F1C] border-t border-[#1F2937] animate-slide-down">
          <div className="px-4 py-3">
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search tournaments..."
                className="w-full pl-10 pr-4 py-3 bg-[#0F1629] border border-[#1F2937] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-400 hover:text-white hover:bg-[#1F2937]'
                    }`
                  }
                >
                  <link.icon />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
