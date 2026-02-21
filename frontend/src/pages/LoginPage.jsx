import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { gsap } from 'gsap';
import { Eye, EyeOff, MessageSquare, ArrowRight, Lock, Mail, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const { login, isLoggingIn, authUser } = useAuthStore();
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser]);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(cardRef.current, { y: 40, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out',
      }, '-=0.1');

    // Float orbs
    orbsRef.current.forEach((orb, i) => {
      if (!orb) return;
      gsap.to(orb, {
        y: `${-20 - i * 8}`,
        x: i % 2 === 0 ? 15 : -15,
        duration: 4 + i * 1.2,
        repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.7,
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    await login(form);
  };

  return (
    <div ref={pageRef} className="min-h-screen flex relative overflow-hidden bg-void">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Orbs */}
      <div ref={el => orbsRef.current[0] = el} className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-accent/4 blur-3xl pointer-events-none" />
      <div ref={el => orbsRef.current[1] = el} className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-electric/4 blur-3xl pointer-events-none" />
      <div ref={el => orbsRef.current[2] = el} className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-violet/5 blur-2xl pointer-events-none" />

      {/* Left panel – branding (desktop) */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-glow">
              <MessageSquare size={22} className="text-accent" />
            </div>
            <span className="font-display font-bold text-bright tracking-widest text-xl">CHATZ</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-bright leading-tight mb-4">
            Connect with anyone,<br />
            <span className="text-gradient">instantly.</span>
          </h1>
          {/* <p className="text-soft leading-relaxed mb-8">
            Real-time messaging with end-to-end encryption, image sharing, and live presence indicators.
          </p> */}

          {/* {[
            { icon: Zap, text: 'Real-time socket messaging', color: 'text-warn' },
            { icon: MessageSquare, text: 'Image & text sharing', color: 'text-accent' },
            { icon: Zap, text: 'Live online status', color: 'text-success' },
          ].map(({ icon: Icon, text, color }, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg bg-surface/60 border border-border flex items-center justify-center flex-shrink-0">
                <Icon size={13} className={color} />
              </div>
              <span className="text-soft text-sm">{text}</span>
            </div>
          ))} */}
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-10">
        <div ref={cardRef} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-3 shadow-glow">
              <MessageSquare size={24} className="text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-bright tracking-wide">NEXUS</h1>
          </div>

          <div className="mb-7">
            <h2 className="font-display text-2xl font-bold text-bright">Sign in</h2>
            <p className="text-soft text-sm mt-1">Welcome back — enter your credentials</p>
          </div>

          <div className="glass rounded-2xl p-7 shadow-glow">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-soft/70 uppercase tracking-widest mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soft/50" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="input-field pl-9"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono text-soft/70 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soft/50" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Your password"
                    className="input-field pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-soft/40 hover:text-soft transition-colors"
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>Sign in <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-border text-center">
              <p className="text-soft text-sm">
                No account?{' '}
                <Link to="/signup" className="text-accent hover:text-electric font-medium transition-colors">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
