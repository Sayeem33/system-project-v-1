// API Route: /api/questions
// Handles question submission and retrieval

import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for questions (resets on server restart)
let questions: Array<{
  id: string;
  question: string;
  studentName: string;
  studentEmail: string;
  isAnswered: boolean;
  answer?: string;
  askedAt: string;
}> = [];

// GET: Fetch all questions
export async function GET(request: NextRequest) {
  try {
    // Return all questions sorted by newest first
    const sortedQuestions = [...questions].sort(
      (a, b) => new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        questions: sortedQuestions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST: Submit a new question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, studentName, studentEmail } = body;

    // Validate input
    if (!question || !question.trim()) {
      return NextResponse.json(
        { success: false, message: 'Question is required' },
        { status: 400 }
      );
    }

    // Create new question with default values if student info is missing
    const newQuestion = {
      id: Date.now().toString(),
      question: question.trim(),
      studentName: studentName?.trim() || 'Anonymous',
      studentEmail: studentEmail?.toLowerCase() || 'anonymous@example.com',
      isAnswered: false,
      askedAt: new Date().toISOString(),
    };

    questions.push(newQuestion);

    return NextResponse.json(
      {
        success: true,
        message: 'Question submitted successfully',
        question: newQuestion,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit question' },
      { status: 500 }
    );
  }
}
