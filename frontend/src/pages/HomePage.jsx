import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import Sidebar from '../components/Sidebar.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import Navbar from '../components/Navbar.jsx';
import { gsap } from 'gsap';
import { MessageSquare, Zap, Shield, Globe } from 'lucide-react';

const WelcomeScreen = () => {
  const ref = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { y: -10, duration: 2.5 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5 });
    });
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div ref={ref} className="text-center px-8 relative">
        <div
          ref={el => iconsRef.current[0] = el}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/8 border border-accent/15 mb-6 shadow-glow"
        >
          <MessageSquare size={34} className="text-accent" />
        </div>

        <h2 className="font-display text-2xl font-bold text-bright mb-2 tracking-wide">
          Select a conversation
        </h2>
        <p className="text-soft text-sm mb-10 max-w-xs mx-auto leading-relaxed">
          Choose a person from the sidebar to start chatting in real-time
        </p>

        {/* <div className="flex items-center justify-center gap-5">
          {[
            { icon: Zap,          label: 'Real-time',  color: 'text-warn',    bg: 'bg-warn/8',    ref: 1 },
            { icon: Shield,       label: 'Secure',     color: 'text-success', bg: 'bg-success/8', ref: 2 },
            { icon: Globe,        label: 'Always on',  color: 'text-accent',  bg: 'bg-accent/8',  ref: 3 },
          ].map(({ icon: Icon, label, color, bg, ref: refIdx }) => (
            <div
              key={label}
              ref={el => iconsRef.current[refIdx] = el}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-11 h-11 rounded-xl ${bg} border border-border flex items-center justify-center`}>
                <Icon size={16} className={color} />
              </div>
              <span className="text-xs text-soft/60 font-mono">{label}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex flex-col bg-void overflow-hidden">
      {/* <div className="scan-line" /> */}
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {selectedUser ? <ChatContainer /> : <WelcomeScreen />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
