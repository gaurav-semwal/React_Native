import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { SlashEye, Eye } from "../assets/svgs";
import { regExp } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import Button from "../components/Button";
import { Color } from "../theme/color";
import { useDispatch, useSelector } from "react-redux";
import { newPasswordRequest } from "../redux/slices/authSlice";
import Logger from "../utils/LoggerUtils";
interface NewPasswordProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
  route: {
    params: {
      email: string;
    };
  };
}

const NewPassword: React.FC<NewPasswordProps> = ({ navigation, route }) => {
  const { email } = route.params;
  const dispatch = useDispatch();

  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [condition, setCondition] = useState(false);

  const loading = useSelector((state) => state.auth.newPasswordLoading);

  const handleVerification = () => {
    AllConditions
      ? dispatch(
          newPasswordRequest({
            email,
            newPassword: NewPassword,
            confirmPassword: ConfirmPassword,
          }),
        )
      : setCondition(true);

    Logger.log(email, NewPassword, ConfirmPassword);
  };
  const checkConditions: any = () => {
    return {
      minLength: NewPassword.length >= 8,
      hasLowerCase: regExp.strLowerCase.test(NewPassword),
      hasUpperCase: regExp.strUpperCase.test(NewPassword),
      hasNumber: regExp.containsNum.test(NewPassword),
      hasSpecialChar: regExp.containsSpecialChar.test(NewPassword),
      Passwordmatch: NewPassword === ConfirmPassword,
    };
  };
  const AllConditions =
    checkConditions().minLength &&
    checkConditions().hasUpperCase &&
    checkConditions().hasLowerCase &&
    checkConditions().hasNumber &&
    checkConditions().hasSpecialChar &&
    checkConditions().Passwordmatch;

  const renderCondition = (condition: boolean) => {
    return condition ? (
      <Feather name="check" size={20} color={Color.check} />
    ) : (
      <Feather name="x" size={18} color={Color.cross} />
    );
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
    <View style={styles.container}>
      <Text style={styles.heading}>New Password</Text>
      <Text style={styles.subheading}>
        Create your new password, so you can login to your account.
      </Text>
      <Text style={styles.subheading1}>New Password</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput
          style={styles.input}
          placeholder="NewPassword"
          onChangeText={(text: React.SetStateAction<string>) =>
            setNewPassword(text)
          }
          value={NewPassword}
          secureTextEntry={showNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
          style={styles.eyeIcon}
        >
          {showNewPassword ? <SlashEye /> : <Eye />}
        </TouchableOpacity>
      </View>
      {condition && (
        <>
          <View style={styles.condition}>
            {renderCondition(checkConditions().minLength)}
            <Text> Minimum 8 characters: </Text>
          </View>

          <View style={styles.condition}>
            {renderCondition(
              checkConditions().hasUpperCase && checkConditions().hasLowerCase,
            )}
            <Text> Atleast 1 uppercase and 1 lowercase </Text>
          </View>

          <View style={styles.condition}>
            {renderCondition(
              checkConditions().hasNumber && checkConditions().hasSpecialChar,
            )}
            <Text> Atleast 1 number and 1 special character </Text>
          </View>
        </>
      )}
      <Text style={styles.subheading1}>Confirm Password</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text: React.SetStateAction<string>) =>
            setConfirmPassword(text)
          }
          value={ConfirmPassword}
          secureTextEntry={showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          {showConfirmPassword ? <SlashEye /> : <Eye />}
        </TouchableOpacity>
      </View>
      {condition && !checkConditions().Passwordmatch && (
        <Text style={styles.match}> Password is not matched </Text>
      )}
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Color.white,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
    marginTop: "20%",
    alignSelf: "flex-start",
    color: Color.black,
  },
  condition: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  subheading: {
    color: Color.textgrey,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    alignSelf: "flex-start",
    marginBottom: "5%",
  },
  subheading1: {
    color: Color.black,
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginVertical: 10,
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.textgrey,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Color.lightgray,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: Color.purple,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  buttonText: {
    color: Color.white,
    fontWeight: "bold",
  },

  eyeIcon: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  match: {
    alignSelf: "flex-start",
    color: Color.red,
  },
});

export default NewPassword;
