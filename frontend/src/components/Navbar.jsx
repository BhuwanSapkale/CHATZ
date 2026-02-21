import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { gsap } from 'gsap';
import { MessageSquare, User, LogOut, Wifi } from 'lucide-react';
import Avatar from './Avatar.jsx';

const Navbar = () => {
  const { authUser, logout, onlineUsers } = useAuthStore();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const onlineCount = Math.max(0, onlineUsers.length - 1);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-14 glass-dark border-b border-border"
    >
      <div className="h-full flex items-center px-5 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-all group-hover:bg-accent/20 group-hover:shadow-glow-sm">
            <MessageSquare size={15} className="text-accent" />
          </div>
          <span className="font-display font-bold text-bright tracking-widest text-sm">CHATZ</span>
        </Link>

        {/* Online indicator */}
        {authUser && (
          <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-lg bg-success/5 border border-success/15">
            <Wifi size={11} className="text-success" />
            <span className="text-xs text-success font-mono">
              {onlineCount} online
            </span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-1">
          {authUser && (
            <>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all
                  ${location.pathname === '/profile'
                    ? 'text-accent bg-accent/10 border border-accent/20'
                    : 'text-soft hover:text-bright hover:bg-surface/60 border border-transparent'
                  }`}
              >
                <User size={14} />
                <span className="hidden sm:block font-body">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-soft
                  hover:text-danger hover:bg-danger/10 border border-transparent
                  transition-all font-body"
              >
                <LogOut size={14} />
                <span className="hidden sm:block">Logout</span>
              </button>

              <div className="ml-1 pl-3 border-l border-border">
                <Avatar user={authUser} size="sm" showOnline isOnline />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
