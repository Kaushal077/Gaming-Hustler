import React from 'react';
import { 
  FaHome, 
  FaTrophy, 
  FaUsers, 
  FaUser
} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/tournaments', icon: FaTrophy, label: 'Events' },
    { path: '/teams', icon: FaUsers, label: 'Teams' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0F1C]/98 backdrop-blur-xl border-t border-white/5 md:hidden safe-area-pb">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-1 py-1.5 px-5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
              <item.icon className={`text-xl transition-transform ${isActive ? 'text-primary scale-110' : ''}`} />
              <span className={`text-[10px] font-semibold uppercase tracking-wide ${isActive ? 'text-primary' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
