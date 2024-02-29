import { createSlice } from "@reduxjs/toolkit";
import { useTypedSelector } from "../configureStore/store";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isAuthenticatedConfirm: false,
  tokenInfo: null,
  userInfo: null,
  errorSignIn: null,
  errSignup: null,
  otpVerificationError: null,
  loginOtpLoading: false,
  loginOtpError: false,
  signupOtpLoading: false,
  signupOtpError: false,
  signupOtpSuccess: false,
  loginVerificationLoading: false,
  loginVerificationError: null,
  signupVerificationLoading: false,
  signupVerificationError: null,
  signupVerificationSuccess: false,
  isUserLoading: false,
  userError: null,
  forgetPasswordLoading: false,
  forgetPasswordError: null,
 
  newPasswordLoading: false,
  newPasswordError: null,
 
  forgetVerificationLoading: false,
  forgetVerificationError: null,
  forgetOtpLoading: false,
  forgetOtpError: false,
  forgetOtpSuccess: false,
  sendOtpLoading: false,
  sendVerificationError: null,
  sendOtpError: false,
  sendVerficationSuccess: false,
  signUpOtpVerificationLoading: false,
  signUpOtpVerificationError: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    signupRequest(state) {
      state.isLoading = true;
      state.errSignup = null;
    },
    signupSuccess(state, action) {
      state.isLoading = false;
     
      state.tokenInfo = action.payload.accessToken;
    },
    signupFailure(state, action) {
      state.isLoading = false;
      state.errSignup = action.payload;
    },
    signupOtpRequest(state) {
      state.signupOtpLoading = true;
      state.signupOtpError = false;
    },
    signupOtpRequestSuccess(state) {
      state.signupOtpLoading = false;
      state.signupOtpSuccess = true;
    },
    signupOtpRequestFailure(state) {
      state.signupOtpLoading = false;
      state.signupOtpError = true;
    },
    signupVerifyRequest(state) {
      state.signupVerificationLoading = true;
      state.signupVerificationError = null;
    },
    signupVerifySuccess(state) {
      state.signupVerificationLoading = false;
      state.signupVerificationSuccess = true;
    },
    signupVerifyFailure(state, action) {
      state.signupVerificationLoading = false;
      state.signupVerificationError = action.payload;
    },
    signUpVerifyOtpRequest(state) {
      state.signUpOtpVerificationLoading = true;
      state.signUpOtpVerificationError = null;
    },
    signUpVerifyOtpSuccess(state, action) {
      state.signUpOtpVerificationLoading = false;
      state.isAuthenticatedConfirm = true;
      state.tokenInfo = action.payload.accessToken;
    },
    signUpVerifyOtpFailure(state, action) {
      state.signUpOtpVerificationLoading = false;
      state.signUpOtpVerificationError = action.payload;
    },
    loginRequest(state) {
      state.isLoading = true;
      state.errorSignIn = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.tokenInfo = action.payload.accessToken;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.errSignup = action.payload;
    },
    loginOtpRequest(state) {
      state.loginOtpLoading = true;
      state.loginOtpError = false;
    },
    loginOtpRequestSuccess(state) {
      state.loginOtpLoading = false;
    },
    loginOtpRequestFailure(state) {
      state.loginOtpLoading = false;
      state.loginOtpError = true;
    },
    loginVerifyRequest(state) {
      state.loginVerificationLoading = true;
      state.loginVerificationError = null;
    },
    loginVerifySuccess(state, action) {
      state.loginVerificationLoading = false;
      state.isAuthenticated = true;
      state.tokenInfo = action.payload.accessToken;
    },
    loginVerifyFailure(state, action) {
      state.loginVerificationLoading = false;
      state.loginVerificationError = action.payload;
    },
    forgetVerifyRequest(state) {
      state.forgetVerificationLoading = true;
      state.forgetVerificationError = null;
    },
    forgetVerifySuccess(state) {
      state.forgetOtpLoading = false;
      state.forgetOtpSuccess = true;
    },
    forgetVerfyFailure(state) {
      state.forgetOtpLoading = false;
      state.forgetOtpError = true;
    },
    sendOtpRequest(state) {
      state.sendOtpLoading = true;
      state.sendVerificationError = null;
    },
    sendOtpSuccess(state) {
      state.sendOtpLoading = true;
      state.sendVerficationSuccess = true;
    },
    sendOtpFailure(state) {
      state.sendOtpLoading = false;
      state.sendOtpError = true;
    },
    userDetailsRequest(state) {
      state.isUserLoading = true;
      state.userError = null;
    },
    updateUserDetailsRequest(state) {
      state.isUserLoading = true;
      state.userError = null;
    },
    logOutRequest(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.tokenInfo = null;
    },
    forgetPasswordRequest(state) {
      state.forgetPasswordLoading = true;
      
    },
    forgetPasswordSuccess(state) {
      state.forgetPasswordLoading = false;
    },
    forgetPasswordFailure(state) {
      state.forgetPasswordLoading = false;
    },
    getVerificationCodeRequest(state) {
      state.isLoading = true;
      state.otpVerificationError = null;
    },
    getVerificationCodeSuccess(state) {
      state.isLoading = false;
    },
    getVerificationCodeFailure(state, action) {
      state.isLoading = false;
      state.otpVerificationError = action.payload;
    },
    newPasswordRequest(state) {
      state.newPasswordLoading = true;
  
    },
    newPasswordSuccess(state) {
      state.newPasswordLoading = false;
     
    },
    newPasswordFailure(state) {
      state.newPasswordLoading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginOtpRequestFailure,
  loginOtpRequestSuccess,
  loginOtpRequest,
  loginVerifyFailure,
  loginVerifyRequest,
  loginVerifySuccess,
  userDetailsRequest,
  updateUserDetailsRequest,
  signupFailure,
  signupRequest,
  signupSuccess,
  signupOtpRequest,
  signupOtpRequestFailure,
  signupOtpRequestSuccess,
  signupVerifyFailure,
  signupVerifyRequest,
  signupVerifySuccess,
  signUpVerifyOtpRequest,
  signUpVerifyOtpSuccess,
  signUpVerifyOtpFailure,
  logOutRequest,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  newPasswordRequest,
  newPasswordSuccess,
  newPasswordFailure,
  getVerificationCodeRequest,
  getVerificationCodeSuccess,
  getVerificationCodeFailure,
  forgetVerifyRequest,
  forgetVerifySuccess,
  forgetVerfyFailure,
  sendOtpRequest,
  sendOtpSuccess,
  sendOtpFailure,
} = authSlice.actions;

export default authSlice.reducer;

export const getAuthToken = () =>{
  const token = useTypedSelector(state => state.auth.tokenInfo)
  return token;
}