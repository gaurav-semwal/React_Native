import {Dimensions, Platform} from 'react-native';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const ScreenNames = {
  Discovery: 'Discovery',
  Profile: 'Profile',
  Home:'Home',
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',
  OtpScreen: 'OtpScreen',
  ForgotPasswordScreen: 'ForgotPasswordScreen',
  SplashScreen: 'SplashScreen',
  MyTabs: 'MyTabs',
  MyStack: 'MyStack',
  NewPassword: 'NewPassword',
};



export const Fonts = {
  OpenSansBold: 'OpenSans-Bold',
  OpenSansBoldItalic: 'OpenSans-BoldItalic',
  OpenSansExtraBold: 'OpenSans-ExtraBold',
  OpenSansExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansLightItalic: 'OpenSans-LightItalic',
  OpenSansMedium: 'OpenSans-Medium',
  OpenSansMediumItalic: 'OpenSans-MediumItalic',
  OpenSansRegular: 'OpenSans-Regular',
  OpenSansSemiBold: 'OpenSans-SemiBold',
  OpenSansSemiBoldItalic: 'OpenSans-SemiBoldItalic',
};

export const AsyncKeys = {
  userData: '@userData',
};

export const Debug = {
  APILogs: true,
};

export const Numbers = {
  maxPhoneNo: 13,
  minPhoneNo: 6,
  maxContributionPercent: 100,
};


export const LoginState = {
  login: 'logged in',
};


