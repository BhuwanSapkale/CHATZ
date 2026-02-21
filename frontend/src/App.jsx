import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore.js';
import HomePage    from './pages/HomePage.jsx';
import LoginPage   from './pages/LoginPage.jsx';
import SignupPage  from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { MessageSquare } from 'lucide-react';

// ─── Route guards ──────────────────────────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" replace />;
};
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/" replace />;
};

// ─── Full-screen loader ────────────────────────────────────────────────────────
const Loader = () => (
  <div className="min-h-screen bg-void flex flex-col items-center justify-center gap-5">
    <div className="relative">
      <div className="w-14 h-14 rounded-2xl bg-accent/8 border border-accent/20 flex items-center justify-center shadow-glow">
        <MessageSquare size={22} className="text-accent" />
      </div>
      <div className="absolute -inset-1 rounded-2xl border border-accent/10 animate-ping" />
    </div>
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent/60 typing-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => { checkAuth(); }, []);

  if (isCheckingAuth) return <Loader />;

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#0D1526',
            color: '#E2E8F0',
            border: '1px solid #1E2D45',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#0D1526' } },
          error:   { iconTheme: { primary: '#F43F5E', secondary: '#0D1526' } },
        }}
      />

      <Routes>
        <Route path="/"        element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/login"   element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup"  element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
