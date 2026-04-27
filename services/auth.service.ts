import { signIn, signOut, signUp } from '@/lib/auth-client'
import type { SignInInput, SignUpInput } from '@/lib/validators/auth'

export interface AuthResult {
  ok: boolean
  error?: string
}

export async function signInWithEmail(input: SignInInput): Promise<AuthResult> {
  const result = await signIn.email(input)
  if (result.error) {
    return { ok: false, error: result.error.message ?? 'Invalid credentials. Please try again.' }
  }
  return { ok: true }
}

export async function signUpWithEmail(input: SignUpInput): Promise<AuthResult> {
  const result = await signUp.email(input)
  if (result.error) {
    return {
      ok: false,
      error: result.error.message ?? 'Failed to create account. Please try again.',
    }
  }
  return { ok: true }
}

export async function signOutCurrentUser(): Promise<void> {
  await signOut()
}
