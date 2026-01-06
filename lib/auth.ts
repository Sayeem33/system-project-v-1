// Authentication Utilities - Simple session & user management
// NOTE: This is a demo implementation for Week 2 design phase
// Not suitable for production - uses in-memory storage and no password hashing

// In-memory user store (resets when server restarts)
// In production, this would be a database
let registeredUsers: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
}> = [];

/**
 * Register a new student
 * @param name - Student name
 * @param email - Student email
 * @param password - Student password (not hashed - demo only)
 * @returns Object with success flag and message
 */
export function registerStudent(
  name: string,
  email: string,
  password: string
): { success: boolean; message: string } {
  // Validate inputs
  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required' };
  }

  // Check if email already exists
  const existingUser = registeredUsers.find((u) => u.email === email);
  if (existingUser) {
    return { success: false, message: 'Email already registered' };
  }

  // Validate email format (simple check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  // Validate password length (simple check)
  if (password.length < 4) {
    return { success: false, message: 'Password must be at least 4 characters' };
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.toLowerCase(),
    password: password, // NOT HASHED - Demo only!
  };

  registeredUsers.push(newUser);

  return {
    success: true,
    message: 'Registration successful! You can now login.',
  };
}

/**
 * Verify student login credentials
 * @param email - Student email
 * @param password - Student password
 * @returns Object with success flag, message, and user info if successful
 */
export function loginStudent(
  email: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: { id: string; name: string; email: string };
} {
  // Validate inputs
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }

  // Find user by email
  const user = registeredUsers.find(
    (u) => u.email === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  // Return user info (without password)
  return {
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

/**
 * Get all registered students (for debugging - remove in production)
 */
export function getAllStudents() {
  return registeredUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
  }));
}
