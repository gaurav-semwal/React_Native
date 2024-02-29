import { regExp } from '../constants/regex';

export const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidNumber = (number: string): boolean => {
  return regExp.phoneRegExp.test(number);
};
