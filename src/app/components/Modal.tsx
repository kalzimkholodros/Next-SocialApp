'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  onSwitchForm: () => void;
}

const Modal = ({ isOpen, onClose, children, title, onSwitchForm }: ModalProps) => {
  const { login, register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (title === 'Login') {
        await login(data.email as string, data.password as string);
      } else {
        // Validate password confirmation
        if (data.password !== data['confirm-password']) {
          throw new Error('Passwords do not match');
        }

        // Validate password strength
        const password = data.password as string;
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
          throw new Error('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
          throw new Error('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
          throw new Error('Password must contain at least one number');
        }

        await register(
          data.email as string,
          data.password as string,
          data.username as string,
          data.name as string
        );
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 border border-purple-800 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-900/20">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-purple-600 rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {title === 'Login' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              )}
            </svg>
          </div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-gray-400 mt-2">
            {title === 'Login' 
              ? 'Welcome back! Please login to your account.' 
              : 'Create a new account to get started.'}
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">
              {title === 'Login' ? 'Login with' : 'Sign up with'}
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center px-4 py-2 border border-purple-800 rounded-lg text-gray-300 hover:bg-purple-900/30 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center px-4 py-2 border border-purple-800 rounded-lg text-gray-300 hover:bg-purple-900/30 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.397,20.997v-8.196h2.765l0.411-3.209h-3.176V7.548c0-0.926,0.258-1.56,1.587-1.56h1.684V3.127C15.849,3.039,15.025,2.997,14.201,3c-2.444,0-4.122,1.492-4.122,4.231v2.355H7.332v3.209h2.753v8.202H13.397z"/>
            </svg>
            Facebook
          </button>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            {children}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : title === 'Login' ? 'Sign in' : 'Create Account'}
            </button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {title === 'Login' ? (
              <>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={onSwitchForm}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={onSwitchForm}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal; 