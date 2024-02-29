import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Color } from "../theme/color";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import {
  forgetVerifyRequest,
  loginVerifyRequest,
  signUpVerifyOtpRequest,
  signupRequest,
} from "../redux/slices/authSlice";

const OtpScreen = ({ route }: any) => {
  const [otpFields, setOtpFields] = useState(["", "", "", ""]);
  const [count, setCount] = useState(30);
 
  const inputRefs = useRef<Array<React.RefObject<TextInput>>>(
    [...Array(4)].map(() => React.createRef<TextInput>()),
  );

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const dispatch = useDispatch();

  const handleResendbtn = () => {
    setCount(30);
  };
  const handleVerifyOTP = () => {
    switch (route.params.key) {
      case "SignUpViaPhone": {
        const enteredOTP = otpFields.join("");
        const otpPayload: any = {
          countryCode: `${route.params.countryCode}`,
          phoneNo: `${route.params.phoneNumber}`,
          code: parseInt(enteredOTP),
        };
        dispatch(signUpVerifyOtpRequest(otpPayload));
        break;
      }
      case "ForgetPassword": {
        const enteredOTP = otpFields.join("");
        const otpPayload: any = {
          email: `${route.params.email}`,
          otp: parseInt(enteredOTP),
        };
        dispatch(forgetVerifyRequest(otpPayload));
        break;
      }
      case "LoginViaPhone": {
        const enteredOTP = otpFields.join("");
        const otpPayload: any = {
          countryCode: `${route.params.countryCode}`,
          phoneNo: `${route.params.phoneNo}`,
          code: parseInt(enteredOTP),
        };
        dispatch(loginVerifyRequest(otpPayload));
        break;
      }
      case "SignUpViaEmail": {
        const enteredOTP = otpFields.join("");
        const otpPayload: any = {
          email: `${route.params.email}`,
          code: parseInt(enteredOTP),
        };
        dispatch(signupRequest(otpPayload));
        break;
      }
      default:
        break;
    }
  };
  const handleTextChange = (txt: string, index: number) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = txt;
    setOtpFields(newOtpFields);
    if (txt.length >= 1 && index < otpFields.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    } else if (txt.length < 1 && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.title2}>Please enter the code we just sent</Text>
      <View style={styles.otpView}>
        {otpFields.map((value, index) => (
          <TextInput
            key={index}
            ref={inputRefs.current[index]}
            style={[
              styles.inputView,
              { borderColor: value.length >= 1 ? Color.blue : Color.black },
            ]}
            value={value}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(txt) => handleTextChange(txt, index)}
          />
        ))}
      </View>
      <View style={styles.resendView}>
        <Text style={styles.txtn}>If you didn’t receive a code?</Text>
        <Text style={styles.resend} onPress={handleResendbtn}>
          {count === 0 ? "Resend" : `Resend in ${count}s`}
        </Text>
      </View>
      <Button
        buttonStyle={styles.button}
        textStyle={styles.text}
        title="Verify OTP"
        onPress={handleVerifyOTP}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: "25%",
    alignSelf: "center",
    color: Color.black,
  },
  title2: {
    fontSize: 20,
    color: Color.midlightgray,
    marginTop: "3%",
    textAlign: "center",
  },
  otpView: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "18%",
  },
  inputView: {
    width: "13%",
    height: 50,
    backgroundColor: Color.lightgray,
    borderRadius: 10,
    marginHorizontal: "2%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: Color.black,
  },
  resendView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "8%",
  },
  txtn: {
    color: Color.midlightgray,
    fontSize: 17,
  },
  resend: {
    color: Color.purple,
    fontWeight: "700",
    fontSize: 16,
    marginLeft: "2%",
  },
  button: {
    backgroundColor: Color.purple,
    paddingVertical: "5%",
    borderRadius: 25,
    alignSelf: "center",
    marginTop: "5%",
    width: "80%",
  },
  text: {
    color: Color.white,
    fontWeight: "bold",
  },
  errorMessageContainer: {
    marginTop: "4%",
    alignSelf: "center",
  },
  errorMessage: {
    color: Color.red,
    fontSize: 16,
  },
});

export default OtpScreen;
