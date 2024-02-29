import { StackAnimationTypes } from "react-native-screens";
import { DrawerNavigationOptions } from "@react-navigation/drawer/lib/typescript/src/types";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();
export const stackScreenOptions = {
  headerShown: false,
  animation: "slide_from_right" as StackAnimationTypes,
};

export const drawerScreenOptions: DrawerNavigationOptions = {
  drawerType: "front",
  headerShown: true,

};
