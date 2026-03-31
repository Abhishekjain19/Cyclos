import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PrimaryDomainPage from './pages/PrimaryDomainPage';
import SecondaryDomainPage from './pages/SecondaryDomainPage';
import MainPage from './pages/MainPage';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const OnboardRoute = ({ children }) => {
  const { user, userProfile } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (userProfile?.secondaryDomain) return <Navigate to="/app" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboard/primary" element={<OnboardRoute><PrimaryDomainPage /></OnboardRoute>} />
      <Route path="/onboard/secondary" element={<OnboardRoute><SecondaryDomainPage /></OnboardRoute>} />
      <Route path="/app" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
