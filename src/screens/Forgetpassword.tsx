import React, { useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { isValidEmail } from "../utils/Validations";
import CustomTextInput from "../components/CustomTextInput";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Color } from "../theme/color";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordRequest } from "../redux/slices/authSlice";
interface ForgetPasswordProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const ForgetPasswordScreen: React.FC<ForgetPasswordProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState(__DEV__ ? "harsh@yopmail.com" : "");
  const [condition, setCondition] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth.forgetPasswordLoading);

  const handleVerification = () => {
    isValidEmail(email)
      ? dispatch(forgetPasswordRequest({ email }))
      : setCondition(true);
  };
  const Loading = (): any => {
    return loading ? (
      <ActivityIndicator size="large" color={Color.purple} />
    ) : (
      <Button
        title={"Send"}
        onPress={handleVerification}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="arrowleft"
        size={32}
        color={Color.black}
        onPress={() => navigation.goBack()}
        style={styles.arrow}
      />
      <Text style={styles.heading}>Reset Password</Text>
      <Text style={styles.subheading}>
        Please enter your email, we will send a verification code to your email.
      </Text>

      <CustomTextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      {condition && (
        <Text style={styles.condition}> Please Enter a Valid Email</Text>
      )}
      <Loading />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Color.white,
  },
  arrow: {
    alignSelf: "flex-start",
    marginTop: "8%",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    marginTop: "8%",
    alignSelf: "flex-start",
  },
  subheading: {
    color: Color.textgrey,
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    marginTop: "5%",
    marginBottom: 25,
    borderRadius: 15,
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.textgrey,
  },
  button: {
    backgroundColor: Color.purple,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  buttonText: {
    color: Color.white,
    fontWeight: "bold",
  },
  condition: {
    alignSelf: "flex-start",
    color: Color.red,
  },
});

export default ForgetPasswordScreen;
