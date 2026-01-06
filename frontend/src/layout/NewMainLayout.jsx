import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/navigation/TopNav';
import BottomNav from '../components/navigation/BottomNav';

const NewMainLayout = () => {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Main Content - No extra padding/margin */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default NewMainLayout;
