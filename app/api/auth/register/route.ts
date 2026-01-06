// API Route: /api/auth/register
// POST endpoint for student registration
// Stores user data in memory and returns session cookie

import { NextRequest, NextResponse } from 'next/server';
import { registerStudent } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Call registration logic
    const result = registerStudent(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // Create response with success message
    const response = NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: 201 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during registration' },
      { status: 500 }
    );
  }
}
