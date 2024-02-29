import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TextStyle,
} from "react-native";
import { Color } from "../theme/color";

interface ButtonProps {
  onPress: () => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
	onPress,
	title,
	buttonStyle,
	textStyle,
}) => {
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, buttonStyle]}
			onPress={onPress}
		>
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
		// Add any additional styling for the button text if needed @ahtesham
	},
});

export default Button;
