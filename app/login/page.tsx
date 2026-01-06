// Login Page - Student Login Form
// Features: Email/password validation, session via cookies, redirect on success

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Session cookies are set by the server
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4">
      <div className="max-w-md mx-auto">
        {/* Card Container */}
        <div className="border border-gray-400 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Login</h1>
            <p className="text-sm text-gray-700">Sign in to your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Login Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register here
              </Link>
            </p>
          </div>

          {/* Test Credentials Box */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-yellow-900 mb-2">
              🧪 Demo Test Account:
            </p>
            <p className="text-xs text-yellow-800">
              <strong>Email:</strong> test@example.com
            </p>
            <p className="text-xs text-yellow-800">
              <strong>Password:</strong> test123
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Register a new account first, or use these test credentials if already registered.
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              <strong>Demo Note:</strong> This is a Week 2 prototype with in-memory storage.
              Sessions are stored in browser cookies.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
