import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbLeaf, TbMail, TbLock, TbBrandGoogle, TbEye, TbEyeOff, TbArrowLeft } from 'react-icons/tb';
import './AuthPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Both fields are required.');
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 900));
    const name = form.email.split('@')[0].replace(/\./g, ' ');
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email });
    setLoading(false);
    navigate('/app');
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login({ name: 'Google User', email: 'user@gmail.com' });
    setLoading(false);
    navigate('/app');
  };

  return (
    <div className="auth-page">
      <div className="auth-page__blob auth-page__blob--1" />
      <div className="auth-page__blob auth-page__blob--2" />

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" className="auth-card__back">
          <TbArrowLeft size={16} /> Back to home
        </Link>

        <div className="auth-card__logo">
          <div className="auth-card__logo-icon"><TbLeaf size={22} /></div>
          <span>Cyclos</span>
        </div>

        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__sub">Sign in to your Cyclos account</p>

        {error && (
          <motion.div className="auth-error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <TbMail size={17} className="auth-field__icon" />
            <input
              type="email"
              placeholder="Email address"
              className="input-field auth-field__input"
              value={form.email}
              onChange={update('email')}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <TbLock size={17} className="auth-field__icon" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="input-field auth-field__input"
              value={form.password}
              onChange={update('password')}
              autoComplete="current-password"
            />
            <button type="button" className="auth-field__toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? <TbEyeOff size={16} /> : <TbEye size={16} />}
            </button>
          </div>

          <div className="auth-forgot">
            <a href="#" className="auth-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            <span>{loading ? <><div className="spinner" /> Signing in…</> : 'Sign In'}</span>
          </button>
        </form>

        <div className="divider">or</div>

        <button className="auth-google" onClick={handleGoogle} disabled={loading}>
          <TbBrandGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
