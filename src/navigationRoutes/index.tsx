import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import { ScreenNames } from "../constants/contants";
import {
  stackScreenOptions,
  drawerScreenOptions,
  navigationRef,
} from "./NavigationUtil";
import ForgetPasswordScreen from "../screens/Forgetpassword";
import NewPassword from "../screens/NewPassword";
import {
  DISCOVERY,
  LOGINSCREEN,
  OTPSCREEN,
  PROFILE,
  REGISTERSCREEN,
} from "../screens";
import Home from "../screens/Home";
import { getAuthToken } from "../redux/slices/authSlice";
const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ScreenNames.Home} component={Home} />
      <Tab.Screen name={ScreenNames.Discovery} component={DISCOVERY} />
    </Tab.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.Profile} component={PROFILE} />
      <Stack.Screen name={ScreenNames.Discovery} component={DISCOVERY} />
      <Tab.Screen name={ScreenNames.Home} component={Home} />
    </Stack.Navigator>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={drawerScreenOptions}>
      <Drawer.Screen name={ScreenNames.MyTabs} component={MainTab} />
      <Drawer.Screen name={ScreenNames.MyStack} component={MainStack} />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.LoginScreen} component={LOGINSCREEN} />
      <Stack.Screen name={ScreenNames.OtpScreen} component={OTPSCREEN} />
      <Stack.Screen
        name={ScreenNames.ForgotPasswordScreen}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name={ScreenNames.RegisterScreen}
        component={REGISTERSCREEN}
      />
      <Stack.Screen name={ScreenNames.NewPassword} component={NewPassword} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const token = getAuthToken();
  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
