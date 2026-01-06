// LessonCard Component - Displays individual lesson information
// Props: lesson object with title, description, topic, difficulty

interface Lesson {
  id: number;
  title: string;
  description: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  // Determine difficulty badge color based on level
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="border border-gray-400 p-3">
      <h3 className="font-bold mb-1">{lesson.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{lesson.topic} - {lesson.difficulty}</p>
      <p className="text-sm text-gray-700 mb-2">{lesson.description}</p>
      <button className="bg-blue-600 text-white px-3 py-1 text-sm">
        Start
      </button>
    </div>
  );
}
