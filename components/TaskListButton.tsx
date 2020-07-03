import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TaskListButton: React.FC<{ totalItems?: string,  title: string; iconName: string; iconSize: number; iconColor: string, onPress: () => void  }> = ({
	title,
	iconName,
	iconSize,
	iconColor,
	totalItems,
    onPress
}) => {
	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
			<View style={styles.button}>
                <Feather name={iconName} size={iconSize} color={iconColor} />
				<Text style={styles.buttonText}>{title}</Text>
			</View>
			<Text style={styles.text}> { totalItems !== "0" && totalItems } </Text> 
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    button: {
		// backgroundColor: 'white',
		paddingVertical: 12,
        marginBottom: 8,
		flexDirection: 'row',
		justifyContent: 'flex-start',
        alignItems: 'center'
    },
	buttonText: {
		color: 'black',
        fontSize: 15,
        paddingHorizontal: 10,
        fontFamily: "Roboto-Bold"
	},
	text: {
		color: "#5e6360",
		fontSize: 15,
        paddingHorizontal: 10,
        fontFamily: "Roboto-Regular"
	}
})

export default TaskListButton;
