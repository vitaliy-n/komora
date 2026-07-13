import { describe, it, expect } from 'vitest'
import { registerSchema, loginSchema, changePasswordSchema, refreshTokenSchema } from '../schemas/auth.js'

describe('auth schemas', () => {
  it('validates register input', () => {
    const valid = registerSchema.safeParse({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    })
    expect(valid.success).toBe(true)
  })

  it('rejects short password', () => {
    const result = registerSchema.safeParse({
      username: 'testuser',
      email: 'test@example.com',
      password: '123',
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing username', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('validates login input', () => {
    const valid = loginSchema.safeParse({
      username: 'testuser',
      password: 'password123',
    })
    expect(valid.success).toBe(true)
  })

  it('validates change password input', () => {
    const valid = changePasswordSchema.safeParse({
      currentPassword: 'old123',
      newPassword: 'new123456',
    })
    expect(valid.success).toBe(true)
  })

  it('validates refresh token input', () => {
    const valid = refreshTokenSchema.safeParse({
      refreshToken: 'some-token-string',
    })
    expect(valid.success).toBe(true)
  })
})
