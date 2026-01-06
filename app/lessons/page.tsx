// Lessons Page - Displays a list of available science lessons
// Features: Static dummy data, LessonCard components, filtering by topic

import LessonCard from '@/components/LessonCard';

// Dummy data: Static array of science lessons
const lessons = [
  {
    id: 1,
    title: 'Introduction to Photosynthesis',
    description:
      'Learn how plants convert sunlight into chemical energy and produce oxygen.',
    topic: 'Biology',
    difficulty: 'Beginner' as const,
  },
  {
    id: 2,
    title: 'The Water Cycle',
    description:
      'Understand evaporation, condensation, and precipitation in the Earth water cycle.',
    topic: 'Earth Science',
    difficulty: 'Beginner' as const,
  },
  {
    id: 3,
    title: 'Newton\'s Laws of Motion',
    description:
      'Explore the three fundamental laws of motion and their real-world applications.',
    topic: 'Physics',
    difficulty: 'Intermediate' as const,
  },
  {
    id: 4,
    title: 'Atomic Structure & Bonding',
    description:
      'Dive deep into atoms, electrons, and chemical bonds that hold matter together.',
    topic: 'Chemistry',
    difficulty: 'Intermediate' as const,
  },
  {
    id: 5,
    title: 'DNA Replication & Genetics',
    description:
      'Understand genetic inheritance and how DNA carries information across generations.',
    topic: 'Biology',
    difficulty: 'Advanced' as const,
  },
  {
    id: 6,
    title: 'Quantum Mechanics Basics',
    description:
      'Introduction to the behavior of matter and energy at the quantum level.',
    topic: 'Physics',
    difficulty: 'Advanced' as const,
  },
];

export default function LessonsPage() {
  return (
    <main className="p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Science Lessons</h1>
        <p className="text-sm text-gray-700 mb-4">
          Explore science lessons across Biology, Chemistry, Physics, and Earth Science.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        <div className="mt-4 bg-blue-100 border border-blue-400 p-3">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Click Start to begin lessons.
          </p>
        </div>
      </div>
    </main>
  );
}
