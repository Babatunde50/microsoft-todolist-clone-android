import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type item = {
	title: string;
};

const TodoCard: React.FC<item> = ({ title }) => {
	return (
		<View style={styles.todoContainer}>
			<View style={styles.todoTexts}>
				<FontAwesome name="circle-thin" size={28} color="#868a8f" />
				<View style={styles.textsContainter}>
					<Text style={styles.todoTitle}> {title} </Text>
					<Text style={styles.todoType}> Task </Text>
				</View>
			</View>
			<FontAwesome name="star" size={28} color="#ccc" />
		</View>
	);
};

const styles = StyleSheet.create({
	todoContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 1,
		padding: 10,
	},
	todoTexts: {
		flexDirection: 'row',
	},
	textsContainter: {
		paddingHorizontal: 8,
	},
	todoTitle: {
		fontFamily: 'Roboto-Regular',
		fontSize: 17,
	},
	todoType: {
		fontFamily: 'Roboto-Regular',
		color: '#ccc',
		fontStyle: 'italic',
	},
});

export default TodoCard;