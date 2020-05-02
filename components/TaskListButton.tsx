import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TaskListButton: React.FC<{ title: string; iconName: string; iconSize: number; iconColor: string, onPress: () => void  }> = ({
	title,
	iconName,
	iconSize,
    iconColor,
    onPress
}) => {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={onPress}>
			<View style={styles.button}>
                <Feather name={iconName} size={iconSize} color={iconColor} />
				<Text style={styles.buttonText}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    button: {
		backgroundColor: 'white',
		paddingVertical: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
	buttonText: {
		color: 'black',
        fontSize: 15,
        paddingHorizontal: 10,
        fontFamily: "Roboto-Bold"
	},
})

export default TaskListButton;
