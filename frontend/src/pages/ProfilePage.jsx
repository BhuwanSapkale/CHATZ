import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { gsap } from 'gsap';
import { Camera, Mail, User, Calendar, Shield, Edit3 } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Avatar from '../components/Avatar.jsx';

const InfoRow = ({ icon: Icon, label, value, color = 'text-accent', bg = 'bg-accent/8' }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/30 hover:bg-surface/50 transition-colors">
    <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={15} className={color} />
    </div>
    <div>
      <p className="text-[10px] text-soft/60 font-mono uppercase tracking-widest">{label}</p>
      <p className="text-bright text-sm font-medium mt-0.5">{value}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [preview, setPreview] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setPreview(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
  };

  const joined = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  return (
    <>
      <Navbar />
      <div ref={pageRef} className="min-h-screen bg-void pt-20 pb-12 px-4 relative">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

        <div className="relative max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-bright">Your Profile</h1>
            <p className="text-soft text-sm mt-1">Manage your account information</p>
          </div>

          <div className="glass rounded-2xl overflow-hidden shadow-glow">
            {/* Cover */}
            <div className="h-28 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-electric/8 to-violet/10" />
              <div className="absolute inset-0 grid-bg-sm opacity-40" />
              {/* Decorative lines */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>

            <div className="px-7 pb-7">
              {/* Avatar + upload */}
              <div className="flex items-end justify-between -mt-12 mb-5">
                <div className="relative">
                  {preview || authUser?.profilePic ? (
                    <img
                      src={preview || authUser.profilePic}
                      alt="profile"
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-void border border-border shadow-glow-sm"
                    />
                  ) : (
                    <div className="ring-4 ring-void rounded-2xl">
                      <Avatar user={authUser} size="2xl" square />
                    </div>
                  )}
                  <label className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-accent rounded-xl flex items-center justify-center cursor-pointer hover:bg-electric transition-colors shadow-lg">
                    <Camera size={13} className="text-void" />
                    <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  </label>
                </div>

                {isUpdatingProfile && (
                  <div className="flex items-center gap-2 text-accent text-xs bg-accent/8 border border-accent/20 rounded-xl px-3 py-2">
                    <span className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    Uploading...
                  </div>
                )}
              </div>

              {/* Name + email */}
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-bright">{authUser?.fullName}</h2>
                <p className="text-soft text-sm">{authUser?.email}</p>
              </div>

              {/* Info grid */}
              <div className="grid gap-2.5">
                <InfoRow icon={User}     label="Full Name"      value={authUser?.fullName} color="text-accent"         bg="bg-accent/8" />
                <InfoRow icon={Mail}     label="Email Address"  value={authUser?.email}    color="text-electric"       bg="bg-electric/8" />
                <InfoRow icon={Calendar} label="Member Since"   value={joined}             color="text-violet"         bg="bg-violet/8" />
                <InfoRow
                  icon={Shield}
                  label="Account Status"
                  value="Active & Verified"
                  color="text-success"
                  bg="bg-success/8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
