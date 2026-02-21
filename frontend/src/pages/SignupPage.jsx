import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { gsap } from 'gsap';
import { Eye, EyeOff, MessageSquare, ArrowRight, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

const pwStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  return s;
};

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLOR = ['', 'bg-danger', 'bg-warn', 'bg-electric', 'bg-success'];

const SignupPage = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const { signup, isSigningUp, authUser } = useAuthStore();
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => { if (authUser) navigate('/'); }, [authUser]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(cardRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.1');

    orbsRef.current.forEach((orb, i) => {
      if (!orb) return;
      gsap.to(orb, {
        y: -(18 + i * 7), x: i % 2 === 0 ? 12 : -12,
        duration: 3.8 + i * 1.1, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: i * 0.5,
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) return toast.error('Please fill all fields');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    await signup(form);
  };

  const strength = pwStrength(form.password);

  return (
    <div ref={pageRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-void py-10">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div ref={el => orbsRef.current[0] = el} className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-electric/4 blur-3xl pointer-events-none" />
      <div ref={el => orbsRef.current[1] = el} className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-violet/5 blur-3xl pointer-events-none" />

      <div ref={cardRef} className="w-full max-w-md mx-6">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-3 shadow-glow">
            <MessageSquare size={24} className="text-accent" />
          </div>
          <h1 className="font-display text-2xl font-bold text-bright">Create account</h1>
          {/* <p className="text-soft text-sm mt-1">Join NEXUS — it's free</p> */}
        </div>

        <div className="glass rounded-2xl p-7 shadow-glow">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-soft/70 uppercase tracking-widest mb-1.5">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soft/50" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="input-field pl-9"
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
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

              {/* Strength bar */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          strength >= lvl ? STRENGTH_COLOR[strength] : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-soft/60 font-mono">{STRENGTH_LABEL[strength]}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
            >
              {isSigningUp ? (
                <>
                  <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>Create account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-soft text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:text-electric font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
