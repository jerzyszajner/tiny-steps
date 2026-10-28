import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Wrong email or password",
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/too-many-requests": "Too many attempts. Try again later",
  "auth/network-request-failed": "Network error. Check your connection",
  "auth/user-disabled": "This account has been disabled",
};

export function getAuthErrorMessage(err: unknown, fallback: string) {
  if (err instanceof FirebaseError) {
    return authErrorMessages[err.code] ?? fallback;
  }
  return fallback;
}
