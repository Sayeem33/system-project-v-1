// Navbar Component - Main navigation bar with authentication state
// Features: Dynamic nav links based on login state, logout functionality

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if user is logged in by reading cookies
  const checkAuthStatus = () => {
    try {
      // Check for login cookie
      const isLoggedInCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('is_logged_in='));

      if (isLoggedInCookie && isLoggedInCookie.includes('true')) {
        setIsLoggedIn(true);

        // Try to get student name from session cookie
        const sessionCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('student_session='));

        if (sessionCookie) {
          try {
            const sessionData = sessionCookie.split('=')[1];
            const userData = JSON.parse(atob(sessionData));
            setStudentName(userData.name || userData.email);
          } catch (e) {
            console.log('Could not parse session data');
          }
        }
      } else {
        setIsLoggedIn(false);
        setStudentName('');
      }
    } catch (e) {
      console.log('Could not check auth status');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      // Clear state
      setIsLoggedIn(false);
      setStudentName('');

      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <Link href="/" className="font-bold">
            Science Learning Platform
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-4 items-center">
            {/* Main Navigation */}
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/lessons" className="font-medium">
              Lessons
            </Link>
            <Link href="/quizzes" className="font-medium">
              Quizzes
            </Link>
            <Link href="/questions" className="font-medium">
              Questions
            </Link>

            {/* Conditional Navigation - Based on Auth Status */}
            {!loading && (
              <>
                {isLoggedIn ? (
                  <>
                    {/* Dashboard Link for Logged In Users */}
                    <Link href="/dashboard" className="font-medium">
                      Dashboard
                    </Link>

                    {/* User Info & Logout - Register button hidden when logged in */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm">User: {studentName}</span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-3 py-1 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Login & Register Links for Guests - Register shown only when not logged in */}
                    <Link href="/login">
                      Login
                    </Link>
                    <Link href="/register" className="bg-white text-blue-600 px-3 py-1">
                      Register
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Loading State */}
            {loading && (
              <span className="text-sm text-blue-200">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
