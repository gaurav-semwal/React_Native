const BASEURL = 'https://nodercc-dev-api.appskeeper.in';
export const API = {
  baseUrl: BASEURL,
  public: {
    signUp: '/api/v1/users/signup',
    login: '/api/v1/users/login',
    socialLogin: '/api/v1/users/social-login',
    verifyAccount: '/api/v1/users/verify-account',
    verifyLoginOtp: '/api/v1/users/verify-login-otp',
    getVerificationCode: '/api/v1/users/verification-code',
    forgotPassword: '/api/v1/users/forgot-password',
    resendOtp: '/api/v1/users/resend-otp',
    validateForgotPassword: '/api/v1/users/validate-code',
    resetPassword: '/api/v1/users/reset-password',
  },
};
https://nodercc-dev-api.appskeeper.in/api/v1/users/reset-password