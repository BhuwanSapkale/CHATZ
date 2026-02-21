import { getInitials, getAvatarGradient } from '../lib/utils.js';

const SIZE = {
  xs:  { wrap: 'w-6 h-6',   text: 'text-[10px]', dot: 'w-2 h-2 border' },
  sm:  { wrap: 'w-9 h-9',   text: 'text-xs',      dot: 'w-2.5 h-2.5 border' },
  md:  { wrap: 'w-10 h-10', text: 'text-sm',      dot: 'w-3 h-3 border-2' },
  lg:  { wrap: 'w-12 h-12', text: 'text-base',    dot: 'w-3.5 h-3.5 border-2' },
  xl:  { wrap: 'w-16 h-16', text: 'text-lg',      dot: 'w-4 h-4 border-2' },
  '2xl': { wrap: 'w-20 h-20', text: 'text-xl',   dot: 'w-5 h-5 border-2' },
};

const Avatar = ({ user, size = 'md', showOnline = false, isOnline = false, className = '', square = false }) => {
  const s = SIZE[size] || SIZE.md;
  const radius = square ? 'rounded-xl' : 'rounded-full';
  const gradient = getAvatarGradient(user?.fullName);

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {user?.profilePic ? (
        <img
          src={user.profilePic}
          alt={user?.fullName || 'User'}
          className={`${s.wrap} ${radius} object-cover ring-1 ring-border`}
        />
      ) : (
        <div
          className={`${s.wrap} ${radius} bg-gradient-to-br ${gradient}
            flex items-center justify-center font-display font-bold text-white
            ring-1 ring-white/10 select-none`}
        >
          <span className={s.text}>{getInitials(user?.fullName)}</span>
        </div>
      )}

      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 ${s.dot} rounded-full border-void
            ${isOnline ? 'bg-success' : 'bg-soft/40'}`}
        />
      )}
    </div>
  );
};

export default Avatar;
