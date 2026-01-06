// Home Page - Landing page for the Science Learning Platform
// Features: Project description, navigation links, featured content preview

import Link from 'next/link';

export default function Home() {
  // Featured lessons for quick access
  const featuredLessons = [
    { id: 1, title: 'Photosynthesis', emoji: '🌱' },
    { id: 2, title: 'Water Cycle', emoji: '💧' },
    { id: 3, title: 'Newton\'s Laws', emoji: '⚡' },
  ];

  return (
    <main className="p-4">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3">
            Science Learning Platform
          </h1>
          <p className="text-base text-gray-700 mb-2">
            An Interactive AI-Assisted Learning Platform for Science Education
          </p>
          <p className="text-base text-gray-500 mb-6">
            Master science concepts through engaging lessons, comprehensive quizzes,
            and personalized learning paths.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 justify-center">
            <Link href="/lessons" className="bg-blue-600 text-white px-4 py-2">
              View Lessons
            </Link>
            <Link href="/quizzes" className="bg-purple-600 text-white px-4 py-2">
              View Quizzes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-6 my-6">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-4">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="bg-white p-4 border border-gray-400">
              <h3 className="font-bold mb-2">Lessons</h3>
              <p className="text-sm text-gray-700">
                Learn science concepts through well-structured lessons covering
                Biology, Chemistry, Physics, and Earth Science.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 border border-gray-300 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Interactive Quizzes
              </h3>
              <p className="text-gray-600">
                Test your knowledge with quizzes designed to reinforce learning and
                identify areas for improvement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 border border-gray-300 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey with a personalized dashboard showing
                your progress and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Lessons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {featuredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white border border-gray-300 p-4 text-center"
            >
              <div className="text-5xl mb-4">{lesson.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {lesson.title}
              </h3>
              <Link
                href="/lessons"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/lessons"
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            View All Lessons →
          </Link>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="bg-gray-100 py-12 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Navigation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/"
              className="bg-white p-4 border border-gray-300 text-center"
            >
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-bold text-gray-900">Home</h3>
            </Link>

            <Link
              href="/lessons"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-bold text-gray-900">Lessons</h3>
            </Link>

            <Link
              href="/quizzes"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-3xl mb-2">✏️</div>
              <h3 className="font-bold text-gray-900">Quizzes</h3>
            </Link>

            <Link
              href="/dashboard"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-gray-900">Dashboard</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6 mb-6">
        <div className="bg-yellow-100 border border-yellow-400 p-4">
          <p className="text-yellow-900 font-semibold mb-1">
            🚀 Project Status: Week 1-2 Foundation
          </p>
          <p className="text-yellow-800 text-sm">
            This platform is in its initial phase with basic structure and static
            content. Advanced features including AI recommendations, user
            authentication, and backend integration will be added in subsequent phases.
          </p>
        </div>
      </section>
    </main>
  );
}
