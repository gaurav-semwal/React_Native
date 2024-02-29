import { call, put, takeLatest } from "redux-saga/effects";
import {
  signupFailure,
  signupOtpRequest,
  signupOtpRequestSuccess,
  signupOtpRequestFailure,
  signupVerifyRequest,
  signupVerifySuccess,
  signupVerifyFailure,
  loginOtpRequest,
  loginOtpRequestSuccess,
  loginOtpRequestFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  newPasswordRequest,
  newPasswordSuccess,
  newPasswordFailure,
  loginSuccess,
  loginFailure,
  loginRequest,
  loginVerifySuccess,
  loginVerifyFailure,
  forgetVerifySuccess,
  forgetVerfyFailure,
  loginVerifyRequest,
  forgetVerifyRequest,
  sendOtpFailure,
  sendOtpSuccess,
  sendOtpRequest,
  signUpVerifyOtpRequest,
  signUpVerifyOtpSuccess,
  signUpVerifyOtpFailure,
  signupSuccess,
  signupRequest,
} from "../slices/authSlice";
import { post, Put } from "../../network/NetworkManager";
import { API } from "../../constants";
import Logger from "../../utils/LoggerUtils";
import { ScreenNames } from "../../constants/contants";
import { navigationRef } from "../../navigationRoutes/NavigationUtil";
import { getErrorMessage } from "../../constants/getErrorMessage";
interface LoginAction {
  payload: {
    email: string;
    password: string;
  };
}

interface LoginResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      accessToken: string;
      email: string;
      password: string;
    };
  };
}
interface LoginOtpAction {
  payload: {
    countryCode: string;
    phoneNo: string;
  };
}
interface LoginOtpResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      accessToken: string;
      countryCode: string;
      phoneNo: string;
    };
  };
}

interface ValidateOtpAction {
  payload: {
    email: string;
    otp: number;
  };
}
interface ValidateOtpResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      email: string;
      otp: number;
    };
  };
}
interface ForgetPasswordAction {
  payload: {
    email: string;
  };
}
interface NewPasswordAction {
  payload: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  };
}

interface SignupAction {
  payload: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

interface SignupResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      accessToken: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    message: string;
  };
}

interface SignupOtpAction {
  payload: {
    countryCode: string;
    phoneNo: string;
  };
}

interface SignupOtpResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      accessToken: string;
      countryCode: string;
      phoneNo: string;
    };
  };
}

interface VerifyAccountAction {
  payload: {
    email: string;
    code: number;
  };
}

interface VerifyAccountResponse {
  httpCode: number;
  statusCode: number;
  type: string;
  message: string;
  data: {
    accessToken: string;
    email: string;
  };
}

interface VerifyOtpAction {
  payload: {
    countryCode: string;
    phoneNo: string;
    code: number;
  };
}
interface VerifyOtpResponse {
  apiSuccess: boolean;
  responseData: {
    data: {
      accessToken: string;
      countryCode: string;
      phoneNo: string;
      code: number;
    };
  };
}

function* loginOtp(action: LoginOtpAction) {
  const { countryCode, phoneNo } = action.payload;
  Logger.log("action..", action);

  try {
    const loginEndpoint = `${API.baseUrl}${API.public.login}`;
    Logger.log("url", loginEndpoint);

    const loginOtpBody = {
      countryCode,
      phoneNo,
    };
    const loginRes: LoginOtpResponse = yield call(
      post,
      loginEndpoint,
      loginOtpBody,
    );
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      yield put(loginOtpRequestSuccess());

      navigationRef.navigate(ScreenNames.OtpScreen, {
        Screen: ScreenNames.Home,
        countryCode: countryCode,
        phoneNo: phoneNo,
        key: "LoginViaPhone",
      });
    } else {
      yield put(loginOtpRequestFailure("E-10023"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(loginOtpRequestFailure("E-10023"));
  }
}

function* login(action: LoginAction) {
  const { email, password } = action.payload;
  Logger.log("action..", action);

  try {
    const loginEndpoint = `${API.baseUrl}${API.public.login}`;
    Logger.log("url", loginEndpoint);

    const loginBody = {
      email,
      password,
    };
    const loginRes: LoginResponse = yield call(post, loginEndpoint, loginBody);
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      const authToken = loginRes.responseData.data.accessToken;
      Logger.log("received ==>", authToken);
      yield put(loginSuccess({ accessToken: authToken }));
      navigationRef.navigate(ScreenNames.Home);
    } else {
      yield put(loginFailure("E-10001"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(loginFailure(getErrorMessage("E-10001")));
  }
}

function* forgetPasswordSaga(action: ForgetPasswordAction) {
  const { email } = action.payload;
  try {
    const url = `${API.baseUrl}${API.public.forgotPassword}`;
    const response = yield call(post, url, action.payload);
    Logger.log("Response---------->", response);

    if (response.apiSuccess) {
      Logger.log("Response---------->", response);
      yield put(forgetPasswordSuccess());
      navigationRef.navigate(ScreenNames.OtpScreen, {
        Screen: ScreenNames.NewPassword,
        email,
        key: "ForgetPassword",
      });
    } else {
      yield put(forgetPasswordFailure());
    }
  } catch (error) {
    yield put(forgetPasswordFailure());
  }
}

function* newPasswordSaga(action: NewPasswordAction) {
  const { email, newPassword, confirmPassword } = action.payload;
  try {
    const url = `${API.baseUrl}${API.public.resetPassword}`;
    const response = yield call(Put, url, {
      email,
      newPassword,
      confirmPassword,
    });
    Logger.log("New Password Response:", response);

    if (response.apiSuccess) {
      yield put(newPasswordSuccess());
      navigationRef.navigate(ScreenNames.LoginScreen);
    } else {
      yield put(newPasswordFailure());
    }
  } catch (error) {
    Logger.log("Error in new password saga:", error);
    yield put(newPasswordFailure());
  }
}

function* signup(action: SignupAction) {
  const { email, password, confirmPassword } = action.payload;
  Logger.log("signup action..", action);

  try {
    const signupEndpoint = `${API.baseUrl}${API.public.signUp}`;
    Logger.log("signup url", signupEndpoint);

    const signupBody = {
      email,
      password,
      confirmPassword,
    };
    const signupRes: SignupResponse = yield call(
      post,
      signupEndpoint,
      signupBody,
    );
    Logger.log("signupRes ---->", signupRes);

    if (signupRes && signupRes.apiSuccess) {
      yield put(signupVerifySuccess());
    } else {
      yield put(signupFailure(signupRes.responseData.message));
    }
  } catch (error) {
    Logger.log("Signup Saga Error:", error);
    yield put(signupVerifyFailure("E-10002"));
  }
}

function* signupOtp(action: SignupOtpAction) {
  const { countryCode, phoneNo } = action.payload;
  Logger.log("SignupOtp action..", action);

  try {
    const signupOtpEndpoint = `${API.baseUrl}${API.public.signUp}`;
    Logger.log("signupOtp url", signupOtpEndpoint);

    const signupOtpBody = {
      countryCode,
      phoneNo,
    };
    const signupOtpRes: SignupOtpResponse = yield call(
      post,
      signupOtpEndpoint,
      signupOtpBody,
    );
    Logger.log("signupOtpRes ---->", signupOtpRes);
    if (signupOtpRes && signupOtpRes.apiSuccess) {
      yield put(signupOtpRequestSuccess());
    } else {
      yield put(signupOtpRequestFailure());
    }
  } catch (error) {
    Logger.log("SignupOtp Saga Error:", error);
    yield put(signupOtpRequestFailure());
  }
}

function* verifyAccount(action: VerifyAccountAction) {
  const { email, code } = action.payload;
  Logger.log("Verify Account action..", action);

  try {
    const verifyAccountEndpoint = `${API.baseUrl}${API.public.verifyAccount}`;
    Logger.log("Verify Account url", verifyAccountEndpoint);

    const verifyAccountBody = {
      email,
      code,
    };

    const verifyAccountRes: VerifyAccountResponse = yield call(
      post,
      verifyAccountEndpoint,
      verifyAccountBody,
    );

    if (
      verifyAccountRes &&
      verifyAccountRes.httpCode === 200 &&
      verifyAccountRes.statusCode === 201
    ) {
      const authToken = verifyAccountRes.data.accessToken;
      yield put(signupVerifySuccess({ accessToken: authToken }));
    } else {
      yield put(signupVerifyFailure("E-10005"));
    }
  } catch (error) {
    Logger.log("Verify Account Saga Error:", error);
    yield put(signupVerifyFailure("E-10005"));
  }
}
function* code(action: VerifyOtpAction) {
  const { countryCode, phoneNo, code } = action.payload;
  Logger.log("action..", action);
  try {
    const loginEndpoint = `${API.baseUrl}${API.public.verifyLoginOtp}`;
    Logger.log("url", loginEndpoint);
    const loginBody = {
      countryCode,
      phoneNo,
      code,
    };
    const loginRes: VerifyOtpResponse = yield call(
      post,
      loginEndpoint,
      loginBody,
    );
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      const authToken = loginRes.responseData.data.accessToken;
      Logger.log("received ==>", authToken);
      yield put(loginVerifySuccess({ accessToken: authToken }));
        navigationRef.navigate(ScreenNames.Home)
      
    } else {
      yield put(loginVerifyFailure("E-10003"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(loginVerifyFailure("E-10003"));
  }
}

function* validateOtp(action: ValidateOtpAction) {
  const { email, otp } = action.payload;
  Logger.log("action............................", code);
  try {
    const loginEndpoint = `${API.baseUrl}${API.public.validateForgotPassword}`;
    Logger.log("url", loginEndpoint);
    const loginBody = {
      email,
      otp,
    };
    const loginRes: ValidateOtpResponse = yield call(
      post,
      loginEndpoint,
      loginBody,
    );
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      yield put(forgetVerifySuccess());
        navigationRef.navigate(ScreenNames.NewPassword, {
          email: email,
        });
      
    } else {
      yield put(forgetVerfyFailure("E-10003"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(forgetVerfyFailure("E-10003"));
  }
}

function* resendOtp(action: ValidateOtpAction) {
  const { email } = action.payload;
  Logger.log("action............................", code);
  try {
    const loginEndpoint = `${API.baseUrl}${API.public.resendOtp}`;
    Logger.log("url", loginEndpoint);
    const loginBody = {
      email,
    };
    const loginRes: ValidateOtpResponse = yield call(
      post,
      loginEndpoint,
      loginBody,
    );
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      yield put(sendOtpSuccess());
    } else {
      yield put(sendOtpFailure(getErrorMessage("E-10003")));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(sendOtpFailure("E-10003"));
  }
}

function* signUpVerifyOtp(action: {
  payload: { countryCode: string; phoneNo: string; code: string };
}) {
  const { countryCode, phoneNo, code } = action.payload;
  Logger.log("action..", action);
  try {
    const loginEndpoint = `${API.baseUrl}${API.public.verifyAccount}`;
    Logger.log("url", loginEndpoint);
    const loginBody = {
      countryCode,
      phoneNo,
      code,
    };
    const loginRes = yield call(post, loginEndpoint, loginBody);
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      const authToken = loginRes.responseData.data.accessToken;
      Logger.log("received ==>", authToken);
      yield put(signUpVerifyOtpSuccess({ accessToken: authToken }));
    
        navigationRef.navigate(ScreenNames.Home)
    } else {
      yield put(signUpVerifyOtpFailure("E-10003"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(signUpVerifyOtpFailure("E-10003"));
  }
}

function* signUpEmailVerifyOtp(action: {
  payload: { email: string; code: string };
}) {
  const { email, code } = action.payload;
  Logger.log("action..", action);
  try {
    const loginEndpoint = `${API.baseUrl}${API.public.verifyAccount}`;
    Logger.log("url", loginEndpoint);
    const loginBody = {
      email,
      code,
    };
    const loginRes = yield call(post, loginEndpoint, loginBody);
    Logger.log("loginres---->", loginRes);

    if (loginRes && loginRes.apiSuccess) {
      const authToken = loginRes.responseData.data.accessToken;
      Logger.log("received ==>", authToken);
      yield put(signupSuccess({ accessToken: authToken }));
      navigationRef.navigate(ScreenNames.Home)
    } else {
      yield put(signupFailure("E-10006"));
    }
  } catch (error) {
    Logger.log("Login Saga Error:", error);
    yield put(signupFailure("E-10006"));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(forgetPasswordRequest.type, forgetPasswordSaga);
  yield takeLatest(newPasswordRequest.type, newPasswordSaga);
  yield takeLatest(signupVerifyRequest.type, signup);
  yield takeLatest(signupOtpRequest.type, signupOtp);
  yield takeLatest(loginOtpRequest.type, loginOtp);
  yield takeLatest(loginVerifyRequest.type, code);
  yield takeLatest(forgetVerifyRequest.type, validateOtp);
  yield takeLatest(sendOtpRequest.type, resendOtp);
  yield takeLatest(signUpVerifyOtpRequest.type, signUpVerifyOtp);
  yield takeLatest(signupRequest.type, signUpEmailVerifyOtp);
}
