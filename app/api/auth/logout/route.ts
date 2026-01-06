// API Route: /api/auth/logout
// POST endpoint for student logout
// Clears session cookies

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    // Clear session cookies
    response.cookies.set('student_session', '', { maxAge: 0 });
    response.cookies.set('is_logged_in', '', { maxAge: 0 });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during logout' },
      { status: 500 }
    );
  }
}
