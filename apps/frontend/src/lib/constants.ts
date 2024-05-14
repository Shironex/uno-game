export const EMAIL_SENDER = '"Writewiz" <noreply@Writewiz.com>'
export const APP_TITLE = 'Uno'

export const redirects = {
  toLogin: '/login',
  toSignup: '/register',
  toProfile: '/dashboard/profile',
  toForgotPassword: '/forgot-password',
  afterLogin: '/dashboard',
  afterLogout: '/',
  toVerify: '/verify-email',
  afterVerify: '/dashboard',
} as const
