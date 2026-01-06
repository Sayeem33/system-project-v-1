// Asked Questions Page - Display all student questions with status
// Features: Shows answered/unanswered questions, status icons

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  studentName: string;
  studentEmail: string;
  isAnswered: boolean;
  answer?: string;
  askedAt: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();

      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter questions based on selected filter
  const filteredQuestions = questions.filter((q) => {
    if (filter === 'answered') return q.isAnswered;
    if (filter === 'unanswered') return !q.isAnswered;
    return true;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Asked Questions
          </h1>
          <p className="text-base text-gray-600">
            View all questions submitted by students and their status
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter('answered')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'answered'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Answered ({questions.filter((q) => q.isAnswered).length})
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unanswered'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Unanswered ({questions.filter((q) => !q.isAnswered).length})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading questions...</p>
          </div>
        )}

        {/* No Questions */}
        {!loading && filteredQuestions.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Questions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'Be the first to ask a question!'
                : `No ${filter} questions found.`}
            </p>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        )}

        {/* Questions List */}
        {!loading && filteredQuestions.length > 0 && (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {question.isAnswered ? (
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✗</span>
                      </div>
                    )}
                  </div>

                  {/* Question Content */}
                  <div className="flex-grow">
                    {/* Question Text */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.question}
                    </h3>

                    {/* Student Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>
                        <strong>Asked by:</strong> {question.studentName}
                      </span>
                      <span>•</span>
                      <span>{formatDate(question.askedAt)}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {question.isAnswered ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          ✓ Answered
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                          ⏳ Pending
                        </span>
                      )}
                    </div>

                    {/* Answer (if available) */}
                    {question.isAnswered && question.answer && (
                      <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <p className="text-sm font-semibold text-green-900 mb-1">
                          Answer:
                        </p>
                        <p className="text-gray-800">{question.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900">
            💡 <strong>Note:</strong> Questions are stored in-memory for this demo.
            They will reset when the server restarts. In a production system, questions
            would be stored in a database.
          </p>
        </div>
      </div>
    </main>
  );
}
