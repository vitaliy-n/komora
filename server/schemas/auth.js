import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3, 'Логін має бути не менше 3 символів').max(30, 'Логін занадто довгий'),
  email: z.string().email('Невірний формат email').optional().or(z.literal('')),
  password: z.string().min(6, 'Пароль має бути не менше 6 символів').max(100, 'Пароль занадто довгий'),
})

export const loginSchema = z.object({
  username: z.string().min(1, 'Введіть логін'),
  password: z.string().min(1, 'Введіть пароль'),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Введіть поточний пароль'),
  newPassword: z.string().min(6, 'Новий пароль має бути не менше 6 символів').max(100, 'Пароль занадто довгий'),
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Потрібен refreshToken'),
})
