import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Navigate } from 'react-router-dom';

const InstructorRoute = ({ children }) => {
    const { currentUser, isLoading } = useUser();
    
    // Show loading while fetching user data
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }
   
    // Allow instructor, admin, or host roles
    const allowedRoles = ['instructor', 'admin', 'host'];
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/become-host" replace />
    }

    return children;
};

export default InstructorRoute;