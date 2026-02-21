import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import Avatar from './Avatar.jsx';
import { X, Phone, Video, Info } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [selectedUser?._id]);

  return (
    <div ref={headerRef} className="flex items-center gap-3 px-5 py-3 border-b border-border glass-dark">
      <Avatar user={selectedUser} size="md" showOnline isOnline={isOnline} />

      <div className="flex-1 min-w-0">
        <h2 className="font-display font-semibold text-bright text-sm tracking-wide truncate">
          {selectedUser?.fullName}
        </h2>
        <p className={`text-xs ${isOnline ? 'text-success' : 'text-soft/50'}`}>
          {isOnline ? '● Active now' : '○ Last seen recently'}
        </p>
      </div>

      {/* <div className="flex items-center gap-0.5">
        {[
          { Icon: Phone, label: 'Call' },
          { Icon: Video, label: 'Video' },
          { Icon: Info,  label: 'Info' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            title={label}
            className="p-2 rounded-xl text-soft hover:text-bright hover:bg-surface/60 transition-all"
          >
            <Icon size={15} />
          </button>
        ))}

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-xl text-soft hover:text-danger hover:bg-danger/10 transition-all ml-1"
          title="Close"
        >
          <X size={15} />
        </button>
      </div> */}
    </div>
  );
};

export default ChatHeader;
