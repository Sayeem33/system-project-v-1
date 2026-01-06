// API Route: /api/auth/login
// POST endpoint for student login
// Validates credentials and returns session via cookie

import { NextRequest, NextResponse } from 'next/server';
import { loginStudent } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Call login logic
    const result = loginStudent(email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    // Create response with session data
    const response = NextResponse.json(
      {
        success: true,
        message: result.message,
        user: result.user,
      },
      { status: 200 }
    );

    // Set session cookie with user info (base64 encoded, not encrypted - demo only)
    const sessionData = btoa(JSON.stringify(result.user));
    response.cookies.set('student_session', sessionData, {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: false, // Accessible from client for demo
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookies.set('is_logged_in', 'true', {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during login' },
      { status: 500 }
    );
  }
}
