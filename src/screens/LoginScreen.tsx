import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  SlashEye,
  Fb,
  Google,
  Circle,
  Apple,
  Linkedin,
  Eye,
} from "../assets/svgs";
import { ScreenNames } from "../constants/contants";
import { Color } from "../theme/color";
import { isValidEmail, isValidNumber } from "../utils/Validations";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";
import { CountryPicker } from "react-native-country-codes-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginRequest, loginOtpRequest } from "../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import Logger from "../utils/LoggerUtils";

interface LoginScreen {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const LoginScreen: React.FC<LoginScreen> = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNo, setPhoneNo] = useState(__DEV__ ? "9996230978" : "");
  const [email, setEmail] = useState(__DEV__ ? "harsh@yopmail.com" : "");
  const [password, setPassword] = useState(__DEV__ ? "12w3485@Ankush" : "");
  const [show1, setshow1] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const navigation = useNavigation();
  const handlePress = (menuItem: string) => {
    if (menuItem === "SignUp") navigation.navigate(ScreenNames.RegisterScreen);
    else if (menuItem === "Login")
      navigation.navigate(ScreenNames.OtpScreen, {
        Screen: ScreenNames.ForgotPasswordScreen,
      });
  };

  const handleLogin = async () => {
    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
    } else if (!email) {
      setEmailError(true);
    } else if (!password) {
      setPasswordError(true);
    } else {
      Logger.log("handleLogin function is called");
      try {
        setPasswordError(false);
        setEmailError(false);
        dispatch(loginRequest({ email, password }));
        Logger.log("loginRequest action dispatched");
      } catch (error) {
        Logger.log("Login Saga Error:", error);
      }
    }
  };
  const handleOtp = async () => {
    if (!phoneNo) {
      setPhoneNoError(true)
    } else {
      try {
        setPhoneNoError(false)
        dispatch(loginOtpRequest({ countryCode, phoneNo }));
      } catch (error) {
        Logger.log("Login Saga Error:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.signUp}>Welcome Back 👋</Text>
        <Text style={styles.text1}>Sign to your account</Text>
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

        {!show && (
          <View>
            <Text style={styles.text}>Email</Text>
            <CustomTextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            {!isValidEmail(email) && email ? (
              <Text style={styles.ErrorText}>Please Enter a valid email</Text>
            ) : null}
            {emailError && (
              <Text style={styles.ErrorText}>Please Enter Email</Text>
            )}

            <Text style={styles.text}>Password</Text>
            <View>
              <CustomTextInput
                secureTextEntry={!showPassword}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                style={styles.inputBox}
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
            <TouchableOpacity style={styles.forgetLogin}>
              <Text
                style={[styles.textcolor]}
                onPress={() => {
                  navigation.navigate(ScreenNames.ForgotPasswordScreen);
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            <Button onPress={handleLogin} title="Login"></Button>
          </View>
        )}
        {show && (
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
                placeholder="Phone No."
                onChangeText={(text: React.SetStateAction<string>) =>
                  setPhoneNo(text)
                }
                value={phoneNo}
                keyboardType={"numeric"}
              />
            </View>
            {!isValidNumber(phoneNo) && phoneNo ? (
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
              <Button onPress={handleOtp} title="Send Otp"></Button>
            </View>
          </View>
        )}
        <Text style={[styles.textcolor1]}>
          Don’t have an account ?
          <Text style={styles.buttonText} onPress={() => handlePress("SignUp")}>
            {" "}
            Sign Up
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
  container: { flex: 1 },
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
  ErrorText: {
    color: Color.red,
    marginTop: 10,
    marginHorizontal: 20,
  },
  countryCodeText: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  text: {
    margin: 25,
    fontSize: 18,
  },
  socialIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
  ButtonView: {
    paddingTop: 40,
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
    right: "10%",
    top: "27%",
  },
  lineContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: Color.grey,
  },
  buttonContainer: {
    backgroundColor: Color.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.purple,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 80,
  },
  buttonText: {
    color: Color.purple,
    fontSize: 18,
    fontWeight: "bold",
    margin: "auto",
  },
  textcolor: {
    color: Color.blue,
    fontSize: 16,
    fontWeight: "500",
    marginVertical: "6%",
    marginLeft: "8%",
  },
  textcolor1: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: "6%",
    textAlign: "center",
  },
  signUp: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 36,
    fontWeight: "800",
  },
  inputBox: {
    paddingRight: 60,
  },
  text1: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.64,
  },
  orText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 10,
  },
  forgetLogin: {
    margin: 10,
    width: '40%',
  },
});

export default LoginScreen;
