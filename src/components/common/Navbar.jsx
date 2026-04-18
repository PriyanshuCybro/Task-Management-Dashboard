import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, CheckSquare2, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare2 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Modern Design */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300 transform group-hover:scale-110">
              <CheckSquare2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                TaskHub
              </h1>
              <p className="text-xs text-gray-400 leading-none">Pro Dashboard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium group ${
                  isActive(path)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {isActive(path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                )}
                <div className={`relative flex items-center gap-2 transition-all ${
                  isActive(path) ? 'text-white' : ''
                }`}>
                  <Icon className={`w-5 h-5 transition-transform ${
                    isActive(path) ? 'animate-pulse' : 'group-hover:rotate-12'
                  }`} />
                  <span>{label}</span>
                  {isActive(path) && (
                    <Sparkles className="w-4 h-4 text-accent-400" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Modern */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 transition-transform rotate-90" />
            ) : (
              <Menu className="w-6 h-6 transition-transform" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Modern Glass Effect */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium group ${
                  isActive(path)
                    ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white border border-primary-400/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className={`w-5 h-5 transition-transform ${
                  isActive(path) ? 'animate-bounce' : ''
                }`} />
                <span>{label}</span>
                {isActive(path) && <Sparkles className="w-4 h-4 ml-auto text-accent-400" />}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
