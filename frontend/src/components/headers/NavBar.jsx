import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Switch from '@mui/material/Switch';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const navLinks = [
    { name: 'Home', route: '/' },
    { name: 'Tournaments', route: '/classes' },
    { name: 'Host', route: '/instructors' }
];

const theme = createTheme({
    palette: {
        primary: { main: '#8b5cf6' },
        secondary: { main: '#06b6d4' },
    },
});

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [navBg, setNavBg] = useState('bg-transparent');
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handelLogout = e => {
        e.preventDefault();
        Swal.fire({
            title: 'Ready to sign out?',
            text: "Your gaming session will end",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8b5cf6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Logout!',
            background: '#131318',
            color: '#ffffff'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        Swal.fire({
                            title: 'Logged out!',
                            text: 'See you in the arena!',
                            icon: 'success',
                            background: '#131318',
                            color: '#ffffff',
                            confirmButtonColor: '#8b5cf6'
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: 'error',
                            background: '#131318',
                            color: '#ffffff'
                        });
                    });
            }
        });
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;

        if (isDarkMode) {
            root.classList.add(darkClass);
            setNavBg('glass-dark');
        } else {
            root.classList.remove(darkClass);
            setNavBg('bg-white/90 backdrop-blur-lg');
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition > 50) {
            setNavBg(isDarkMode ? 'glass-dark shadow-lg' : 'bg-white/95 backdrop-blur-xl shadow-lg');
        } else {
            setNavBg(isDarkMode ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md');
        }
    }, [scrollPosition, isDarkMode]);

    return (
        <motion.nav
            className={`${navBg} ${isFixed ? 'static' : 'fixed'} top-0 transition-all duration-300 ease-in-out w-full z-50 border-b border-white/5`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div 
                        onClick={() => navigate('/')} 
                        className="flex-shrink-0 cursor-pointer flex items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-center space-x-2">
                            <img 
                                src="/gh-logo.png" 
                                alt="logo" 
                                className='w-8 h-8' 
                            />
                            <h1 className='text-xl font-bold text-white'>
                                Gaming<span className="text-purple-500">Hustlers</span>
                            </h1>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.route}
                                to={link.route}
                                className={({ isActive }) => 
                                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isActive 
                                            ? 'text-purple-400 bg-purple-500/10' 
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Auth Buttons */}
                        {!user && (
                            <NavLink
                                to={isLogin ? '/register' : '/login'}
                                className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg font-medium text-white text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                                {isLogin ? 'Register' : 'Login'}
                            </NavLink>
                        )}

                        {user && (
                            <>
                                <NavLink
                                    to='/dashboard'
                                    className={({ isActive }) => 
                                        `px-4 py-2 rounded-lg font-medium transition-all ${
                                            isActive ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                
                                <div className="relative group ml-2">
                                    <img 
                                        src={user?.photoURL} 
                                        className='h-9 w-9 rounded-full border border-white/10 object-cover cursor-pointer' 
                                        alt="User avatar" 
                                    />
                                </div>

                                <button 
                                    onClick={handelLogout}
                                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all ml-2"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Theme Toggle */}
                        <div className="ml-2 flex items-center">
                            <ThemeProvider theme={theme}>
                                <Switch 
                                    checked={isDarkMode}
                                    onChange={() => setIsDarkMode(!isDarkMode)} 
                                    size="small"
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#a78bfa',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#8b5cf6',
                                        },
                                    }}
                                />
                            </ThemeProvider>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.route}
                                    to={link.route}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-4 py-3 rounded-lg font-medium transition-all ${
                                            isActive 
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                                : 'text-gray-300 hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {!user && (
                                <NavLink
                                    to={isLogin ? '/register' : '/login'}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg font-medium text-white text-center"
                                >
                                    {isLogin ? 'Register' : 'Login'}
                                </NavLink>
                            )}

                            {user && (
                                <>
                                    <NavLink
                                        to='/dashboard'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => 
                                            `block px-4 py-3 rounded-lg font-medium transition-all ${
                                                isActive ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                                            }`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>

                                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
                                        <img 
                                            src={user?.photoURL} 
                                            className='h-10 w-10 rounded-full border border-white/10 object-cover' 
                                            alt="User avatar" 
                                        />
                                        <span className="text-gray-300 font-medium text-sm">{user?.displayName}</span>
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            handelLogout(e);
                                        }}
                                        className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-gray-300 hover:bg-white/10 transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg mt-4">
                                <span className="text-gray-400 font-medium text-sm">Dark Mode</span>
                                <ThemeProvider theme={theme}>
                                    <Switch 
                                        checked={isDarkMode}
                                        onChange={() => setIsDarkMode(!isDarkMode)} 
                                        size="small"
                                    />
                                </ThemeProvider>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default NavBar;