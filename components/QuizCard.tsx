// QuizCard Component - Displays individual quiz information
// Props: quiz object with title, topic, questions count, and estimated time

interface Quiz {
  id: number;
  title: string;
  topic: string;
  questionsCount: number;
  estimatedTime: number; // in minutes
}

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className="border border-gray-400 p-3">
      <h3 className="font-bold mb-1">{quiz.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{quiz.topic}</p>
      <p className="text-sm text-gray-700 mb-2">
        {quiz.questionsCount} questions • {quiz.estimatedTime} min
      </p>
      <button className="bg-purple-600 text-white px-3 py-1 text-sm w-full">
        Start Quiz
      </button>
    </div>
  );
}
