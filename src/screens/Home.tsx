import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Button from "../components/Button";
import { logOutRequest } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { getErrorMessage } from "../constants/getErrorMessage";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutRequest());
    Toast.show({type:'success',text1:getErrorMessage("E-10004")})
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/97/05/7c/97057c70bc6dfcd8706a6dc4b2f811d2.jpg",
        }}
        style={styles.image}
      />
      <Text>Home</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
backgroundColor: "#f7f3f2",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: "20%",
  },
});
export default Home;
