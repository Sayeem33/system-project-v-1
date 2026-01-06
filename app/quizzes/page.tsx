// Quizzes Page - Displays a list of available quizzes
// Features: Static dummy data, QuizCard components, topic-based organization

import QuizCard from '@/components/QuizCard';

// Dummy data: Static array of science quizzes
const quizzes = [
  {
    id: 1,
    title: 'Photosynthesis Basics Quiz',
    topic: 'Biology',
    questionsCount: 10,
    estimatedTime: 5,
  },
  {
    id: 2,
    title: 'Water Cycle Assessment',
    topic: 'Earth Science',
    questionsCount: 8,
    estimatedTime: 4,
  },
  {
    id: 3,
    title: 'Newton\'s Laws Challenge',
    topic: 'Physics',
    questionsCount: 12,
    estimatedTime: 8,
  },
  {
    id: 4,
    title: 'Chemical Bonding Quiz',
    topic: 'Chemistry',
    questionsCount: 15,
    estimatedTime: 10,
  },
  {
    id: 5,
    title: 'Genetics & Inheritance Test',
    topic: 'Biology',
    questionsCount: 20,
    estimatedTime: 12,
  },
  {
    id: 6,
    title: 'Quantum Mechanics Fundamentals',
    topic: 'Physics',
    questionsCount: 18,
    estimatedTime: 15,
  },
];

export default function QuizzesPage() {
  return (
    <main className="p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Science Quizzes</h1>
        <p className="text-sm text-gray-700 mb-4">
          Test your knowledge with science quizzes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>

        <div className="mt-4 bg-purple-100 border border-purple-400 p-3">
          <p className="text-sm text-purple-900">
            <strong>Note:</strong> Quiz results coming in future updates.
          </p>
        </div>
      </div>
    </main>
  );
}
