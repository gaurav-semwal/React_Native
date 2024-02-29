import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../components/CustomTextInput";
import { ScreenNames } from "../constants/contants";
import { Color } from "../theme/color";
import { isValidEmail, isValidNumber } from "../utils/Validations";
import { CountryPicker } from "react-native-country-codes-picker";
import Logger from "../utils/LoggerUtils";
import Button from "../components/Button";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Apple,
  Circle,
  SlashEye,
  Fb,
  Google,
  Linkedin,
  Eye,
} from "../assets/svgs";
import {
  signupOtpRequest,
  signupVerifyRequest,
} from "../redux/slices/authSlice";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [email, setEmail] = useState(__DEV__ ? "harsh@yopmail.com" : "");
  const [password, setPassword] = useState(__DEV__ ? "harshS@123" : "");
  const [confirmPassword, setConfirmPassword] = useState(
    __DEV__ ? "harshS@123" : "",
  );
  const [show, setShow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(__DEV__ ? "9996230978" : "");
  const [countryCode, setCountryCode] = useState("+91");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const navigation = useNavigation<any>();
  const successphone = useSelector((state: any) => state.auth.signupOtpSuccess);
  const successemail = useSelector(
    (state: any) => state.auth.signupVerificationSuccess,
  );
  const dispatch = useDispatch();

  const handlePress = (menuItem: string) => {
    if (menuItem === "SignUp") navigation.navigate(ScreenNames.LoginScreen);
    else if (menuItem === "Login")
      navigation.navigate(ScreenNames.OtpScreen, {
        Screen: ScreenNames.ForgotPasswordScreen,
      });
  };

  useEffect(() => {
    if (successphone)
      navigation.navigate(ScreenNames.OtpScreen, {
        Screen: ScreenNames.Home,
        phoneNumber,
        countryCode,
        key: "SignUpViaPhone",
      });
    else if (successemail)
      navigation.navigate(ScreenNames.OtpScreen, {
        email,
        key: "SignUpViaEmail",
      });
  }, [successphone, successemail]);

  const handleSignUp = async () => {
    if (!email && !password && !confirmPassword) {
      setEmailError(true);
      setPasswordError(true);
    } else if (!email) {
      setEmailError(true);
    } else if (!password) {
      setPasswordError(true);
    } else if (!confirmPassword) {
      setPasswordError(true);
    } else {
      Logger.log("handleSignUp function is called");
      try {
        setPasswordError(false);
        setEmailError(false);
        dispatch(signupVerifyRequest({ email, password, confirmPassword }));
        Logger.log("signupRequest action dispatched");
      } catch (error) {
        Logger.log("Signup Saga Error:", error);
      }
    }
  };

  const handleSignUpOtp = () => {
    if (!phoneNumber) {
      setPhoneNoError(true);
    } else {
      try {
        setPhoneNoError(false);
        dispatch(signupOtpRequest({ countryCode, phoneNo: phoneNumber }));
      } catch (error) {
        Logger.log("SignUp Saga Error:", error);
      }
    }
  };

  const handleEmailValidation = () => {
    isValidEmail(email);
  };

  const renderInputFields = () => {
    return (
      <View>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomTextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            onBlur={handleEmailValidation}
          />
          {!isValidEmail(email) && email ? (
            <Text style={styles.ErrorText}>Please Enter a valid email</Text>
          ) : null}
          {emailError && (
            <Text style={styles.ErrorText}>Please Enter Email</Text>
          )}
        </View>
        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomTextInput
            placeholder="Password"
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <SlashEye />}
          </TouchableOpacity>
        </View>
        {passwordError && (
          <Text style={styles.ErrorText}>Please Enter Password</Text>
        )}
        <View>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <CustomTextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword1}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword1(!showPassword1)}
          >
            {showPassword1 ? <Eye /> : <SlashEye />}
          </TouchableOpacity>
        </View>
        {passwordError && (
          <Text style={styles.ErrorText}>Please Enter Confirm Password</Text>
        )}
        {password !== confirmPassword && confirmPassword !== "" ? (
          <Text style={styles.ErrorText}>Confirm Password does not match</Text>
        ) : null}
        <View style={styles.ButtonView}>
          <Button onPress={handleSignUp} title="Register"></Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.signUp}>Sign Up</Text>
        <Text style={styles.text1}>Lets help to meet up your tasks</Text>
        <View style={styles.selectIcon}>
          <TouchableOpacity
            style={show ? styles.headerIcon2 : styles.headerIcon1}
            onPress={() => {
              setShow(false);
            }}
          >
            <Text style={!show ? styles.headerText2 : styles.headerText1}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!show ? styles.headerIcon2 : styles.headerIcon1}
            onPress={() => {
              setShow(true);
            }}
          >
            <Text style={show ? styles.headerText2 : styles.headerText1}>
              Phone number
            </Text>
          </TouchableOpacity>
        </View>
        {!show ? (
          renderInputFields()
        ) : (
          <View>
            <Text style={styles.text}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => setshow1(true)}
                style={styles.countryCodeContainer}
              >
                <Text style={styles.countryCodeText}>{countryCode}</Text>
              </TouchableOpacity>
              <CustomTextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={(text: React.SetStateAction<string>) =>
                  setPhoneNumber(text)
                }
                value={phoneNumber}
                keyboardType={"numeric"}
                secureTextEntry={false}
              />
            </View>
            {!isValidNumber(phoneNumber) && phoneNumber ? (
              <Text style={styles.ErrorText}>
                Please Enter a valid Phone Number
              </Text>
            ) : null}
            {phoneNoError && (
              <Text style={styles.ErrorText}>Please Enter Phone Number</Text>
            )}
            <CountryPicker
              show={show1}
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setshow1(false);
              }}
              lang={"en"}
              style={{
                modal: {
                  height: 400,
                },
              }}
            />
            <View style={styles.ButtonView}>
              <Button
                onPress={handleSignUpOtp}
                title="Register with Number"
              ></Button>
            </View>
          </View>
        )}
        <Text style={styles.textcolor}>
          Already have an account?{" "}
          <Text style={styles.signInLink} onPress={() => handlePress("SignUp")}>
            Sign In
          </Text>
        </Text>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.socialIconsRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Circle />
            <Fb style={styles.socialImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Circle />
            <Google style={styles.socialImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Circle />
            <Apple style={styles.socialImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Circle />
            <Linkedin style={styles.socialImage} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ButtonView: {
    paddingTop: 40,
  },
  ErrorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: "6%",
  },
  container: {
    flex: 1,
  },
  selectIcon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 25,
  },
  headerIcon1: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: Color.purple,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.33,
    shadowRadius: 13.97,
    elevation: 21,
  },
  headerIcon2: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: Color.white,
    flex: 1,
    marginHorizontal: 10,
  },
  headerText1: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: Color.black,
  },
  headerText2: {
    color: Color.white,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    margin: 25,
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: Color.lightgray,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  countryCodeContainer: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    maxWidth: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  countryCodeText: {
    fontSize: 18,
  },
  inputLabel: {
    margin: 20,
    fontSize: 18,
    textAlign: "left",
  },
  text1: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.64,
  },
  socialIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  socialIcon: {
    alignItems: "center",
    padding: 20,
    bottom: 15,
  },
  socialImage: {
    bottom: 32,
  },
  eyeIcon: {
    position: "absolute",
    right: "8%",
    top: "70%",
  },
  lineContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    width: "90%",
    height: 1.5,
    backgroundColor: Color.black,
  },
  buttonContainer: {
    backgroundColor: Color.purple,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.purple,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: "6%",
  },
  buttonText: {
    color: Color.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  textcolor: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
  },
  signInLink: {
    color: "#54408C",
  },
  signUp: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 36,
    fontWeight: "800",
  },
  textInput: {
    paddingRight: "10%",
  },
  orText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 10,
  },
});
export default RegisterScreen;
