import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import Avatar from './Avatar.jsx';
import { Search, Users, Radio } from 'lucide-react';

const SkeletonRow = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl">
    <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 skeleton rounded-lg w-28" />
      <div className="h-2 skeleton rounded-lg w-16" />
    </div>
  </div>
);

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [search, setSearch] = useState('');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const listRef = useRef(null);

  useEffect(() => { getUsers(); }, []);

  useEffect(() => {
    if (!isUsersLoading && users.length && listRef.current) {
      gsap.fromTo(
        Array.from(listRef.current.children),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [isUsersLoading, users]);

  const filtered = users.filter((u) => {
    const nameMatch = u.fullName.toLowerCase().includes(search.toLowerCase());
    const onlineMatch = onlineOnly ? onlineUsers.includes(u._id) : true;
    return nameMatch && onlineMatch;
  });

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col glass border-r border-border h-full overflow-hidden">
      {/* ── Header ── */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-bright tracking-widest text-sm">MESSAGES</span>
          <span className="text-xs font-mono text-soft/60 bg-surface px-2 py-0.5 rounded-md border border-border">
            {users.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-soft/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people..."
            className="w-full bg-void/70 border border-border rounded-lg pl-8 pr-3 py-2
              text-xs text-bright placeholder-soft/40
              focus:outline-none focus:border-accent/40 transition-all"
          />
        </div>

        {/* Online filter */}
        <button
          onClick={() => setOnlineOnly(!onlineOnly)}
          className={`flex items-center gap-2 text-xs w-full px-3 py-1.5 rounded-lg transition-all border ${
            onlineOnly
              ? 'bg-success/8 border-success/20 text-success'
              : 'bg-transparent border-border text-soft hover:text-bright hover:border-soft/30'
          }`}
        >
          <Radio size={11} className={onlineOnly ? 'text-success' : ''} />
          {onlineOnly ? 'Online users only' : 'All users'}
        </button>
      </div>

      {/* ── User List ── */}
      <div className="flex-1 overflow-y-auto p-2">
        {isUsersLoading ? (
          <div className="space-y-1">
            {[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Users size={22} className="text-border" />
            <p className="text-soft/60 text-xs text-center">
              {search ? 'No users match your search' : 'No users found'}
            </p>
          </div>
        ) : (
          <div ref={listRef} className="space-y-0.5">
            {filtered.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isActive = selectedUser?._id === user._id;
              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`user-row w-full ${isActive ? 'active' : ''}`}
                >
                  <Avatar user={user} size="md" showOnline isOnline={isOnline} />
                  <div className="flex-1 text-left min-w-0">
                    <p className={`text-sm font-medium truncate leading-tight ${isActive ? 'text-accent' : 'text-bright'}`}>
                      {user.fullName}
                    </p>
                    <p className={`text-xs mt-0.5 ${isOnline ? 'text-success' : 'text-soft/45'}`}>
                      {isOnline ? '● Active now' : '○ Offline'}
                    </p>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Footer: self ── */}
      <div className="px-3 py-2.5 border-t border-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-surface/30">
          <Avatar user={authUser} size="sm" showOnline isOnline />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-bright truncate">{authUser?.fullName}</p>
            <p className="text-[10px] text-success">● You</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
