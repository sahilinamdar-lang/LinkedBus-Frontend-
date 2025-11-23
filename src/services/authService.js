// src/services/authService.js
const API_BASE = "https://linkedbus-backend-production.up.railway.app/api/auth";

/**
 * Registration step 1: request OTP (sends OTP to email)
 * Backend: POST /api/auth/register  (full user JSON)
 */
export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

/**
 * Registration step 2: verify OTP and create user (returns token + user DTO)
 * Backend: POST /api/auth/verify-register { email, otp }
 */
export async function verifyRegister({ email, otp }) {
  const res = await fetch(`${API_BASE}/verify-register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
}

/** Login: POST /api/auth/login { email, password } */
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

/**
 * Forgot password (send OTP):
 * Backend: POST /api/auth/forgot-password { email }
 * Exports the name your code expects: forgotPassword
 */
export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

/**
 * Verify OTP + reset password:
 * Backend: POST /api/auth/verify-otp { email, otp, newPassword }
 */
export async function verifyOtpReset({ email, otp, newPassword }) {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });
  return res.json();
}

/* Aliases for backward compatibility with code that used older names */
export const sendOtp = forgotPassword; // some components imported sendOtp
export const verifyOtp = ({ email, otp }) => verifyOtpReset({ email, otp, newPassword: undefined });
export const resetPassword = (email, newPassword) => verifyOtpReset({ email, otp: undefined, newPassword });
