// Dashboard Page - User learning progress and summary
// Features: Auth-aware display, welcome message, placeholder progress metrics

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [questionInput, setQuestionInput] = useState('');
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [questionMessage, setQuestionMessage] = useState('');

  // Check authentication on mount
  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  // Check if user is authenticated
  const checkAuthAndLoadData = () => {
    try {
      // Check for login cookie
      const isLoggedInCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('is_logged_in='));

      if (!isLoggedInCookie || !isLoggedInCookie.includes('true')) {
        // Not logged in - redirect to login
        router.push('/login');
        return;
      }

      setIsLoggedIn(true);

      // Extract student info from session cookie
      const sessionCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('student_session='));

      if (sessionCookie) {
        try {
          const sessionData = sessionCookie.split('=')[1];
          const userData = JSON.parse(atob(sessionData));
          setStudentName(userData.name || '');
          setStudentEmail(userData.email || '');
        } catch (e) {
          console.log('Could not parse session');
        }
      }
    } catch (e) {
      console.log('Auth check failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle question submission
  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!questionInput.trim()) {
      setQuestionMessage('Please enter a question');
      return;
    }

    setSubmittingQuestion(true);
    setQuestionMessage('');

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: questionInput,
          studentName: studentName || 'Anonymous',
          studentEmail: studentEmail || 'anonymous@example.com',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setQuestionMessage('✓ Question submitted successfully!');
        setQuestionInput('');
        
        // Clear message after 3 seconds
        setTimeout(() => setQuestionMessage(''), 3000);
      } else {
        setQuestionMessage('✗ ' + data.message);
      }
    } catch (error) {
      setQuestionMessage('✗ Failed to submit question');
      console.error('Question submission error:', error);
    } finally {
      setSubmittingQuestion(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  // If not logged in, show message
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  // Placeholder user data for demo
  const userStats = {
    lessonsCompleted: 3,
    totalLessons: 6,
    quizzesCompleted: 2,
    totalQuizzes: 6,
    averageScore: 78,
    streakDays: 5,
  };

  // Sample topics for recommendations
  const recommendedTopics = [
    { name: 'Photosynthesis', type: 'lesson', progress: 65 },
    { name: 'Newton\'s Laws', type: 'quiz', progress: 45 },
    { name: 'Chemical Bonding', type: 'lesson', progress: 30 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {studentName}! 👋
          </h1>
          <p className="text-blue-100 mb-2">
            Email: <span className="font-semibold">{studentEmail}</span>
          </p>
          <p className="text-blue-100">
            Continue your learning journey and track your progress below.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Lessons Progress */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              LESSONS COMPLETED
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-blue-600">
                {userStats.lessonsCompleted}
              </p>
              <span className="text-gray-600">of {userStats.totalLessons}</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${(userStats.lessonsCompleted / userStats.totalLessons) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Quizzes Progress */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              QUIZZES COMPLETED
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-purple-600">
                {userStats.quizzesCompleted}
              </p>
              <span className="text-gray-600">of {userStats.totalQuizzes}</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{
                  width: `${(userStats.quizzesCompleted / userStats.totalQuizzes) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              AVERAGE SCORE
            </div>
            <p className="text-3xl font-bold text-green-600">
              {userStats.averageScore}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Across all quizzes</p>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              LEARNING STREAK
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {userStats.streakDays}
            </p>
            <p className="text-xs text-gray-500 mt-2">Days in a row</p>
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Recommended For You
          </h2>
          <div className="space-y-4">
            {recommendedTopics.map((topic, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{topic.name}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {topic.type === 'lesson' ? '📖 Lesson' : '📝 Quiz'}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {topic.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ask a Question Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ❓ Ask a Question
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question about the lessons or quizzes? Submit it here and get help!
          </p>

          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                id="question"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Type your question here..."
                rows={4}
                disabled={submittingQuestion}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
              />
            </div>

            {/* Message Display */}
            {questionMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  questionMessage.includes('✓')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {questionMessage}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submittingQuestion || !questionInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                {submittingQuestion ? 'Submitting...' : 'Submit Question'}
              </button>

              <Link
                href="/questions"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold transition-colors"
              >
                View All Questions
              </Link>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/lessons"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg text-center font-bold transition-colors"
          >
            <div className="text-3xl mb-2">📖</div>
            Continue Learning
          </Link>
          <Link
            href="/quizzes"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg text-center font-bold transition-colors"
          >
            <div className="text-3xl mb-2">✏️</div>
            Take a Quiz
          </Link>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900">
            🚀 <strong>Coming Soon:</strong> Enhanced dashboard with personalized AI
            recommendations, detailed analytics, and adaptive learning paths will be
            available in future releases.
          </p>
        </div>
      </div>
    </main>
  );
}
