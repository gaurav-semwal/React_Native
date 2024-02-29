import React from "react";
import { TextInput } from "react-native";
const CustomTextInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  maxLength,
  autoCorrect,
  placeholderTextColor,
  style,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <TextInput
      style={{
        ...inputStyles,
        ...style,
      }}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      value={value}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
    />
  );
};
const inputStyles = {
  marginHorizontal: 20,
  borderRadius: 10,
  backgroundColor: "lightgrey",
  padding: 15,
  fontSize: 16,
};
export default CustomTextInput;
