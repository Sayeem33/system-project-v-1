// API Route: /api/questions
// Handles question submission and retrieval

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/lib/models/Question';

// GET: Fetch all questions from MongoDB
export async function GET() {
  try {
    await connectDB();
    const docs = await Question.find().sort({ askedAt: -1 }).lean();

    const questions = docs.map((d: any) => ({
      id: d._id.toString(),
      question: d.question,
      studentName: d.studentName,
      studentEmail: d.studentEmail,
      isAnswered: d.isAnswered,
      answer: d.answer,
      askedAt: d.askedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST: Create a new question in MongoDB
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, studentName, studentEmail } = body;

    if (!question || !question.trim()) {
      return NextResponse.json({ success: false, message: 'Question is required' }, { status: 400 });
    }

    await connectDB();
    const created = await Question.create({
      question: question.trim(),
      studentName: studentName?.trim() || 'Anonymous',
      studentEmail: studentEmail?.toLowerCase() || 'anonymous@example.com',
    });

    const response = {
      id: created._id.toString(),
      question: created.question,
      studentName: created.studentName,
      studentEmail: created.studentEmail,
      isAnswered: created.isAnswered,
      answer: created.answer,
      askedAt: created.askedAt.toISOString(),
    };

    return NextResponse.json({ success: true, message: 'Question submitted successfully', question: response }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit question' }, { status: 500 });
  }
}

// PATCH: Update a question (answer, mark answered)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Question id is required' }, { status: 400 });
    }

    await connectDB();
    const updated = await Question.findByIdAndUpdate(id, updates, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
    }

    const response = {
      id: updated._id.toString(),
      question: updated.question,
      studentName: updated.studentName,
      studentEmail: updated.studentEmail,
      isAnswered: updated.isAnswered,
      answer: updated.answer,
      askedAt: updated.askedAt.toISOString(),
    };

    return NextResponse.json({ success: true, question: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update question' }, { status: 500 });
  }
}

// DELETE: Remove a question. Accepts id via query or JSON body
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idFromQuery = url.searchParams.get('id');
    let id = idFromQuery || undefined;

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body?.id;
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'Question id is required' }, { status: 400 });
    }

    await connectDB();
    const removed = await Question.findByIdAndDelete(id).lean();

    if (!removed) {
      return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Question deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete question' }, { status: 500 });
  }
}
