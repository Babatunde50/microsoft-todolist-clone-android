import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { TodoListContext, todoContext } from '../providers/TodoList';
import { MyDayNavigationProp } from '../navigation/TodoNavigation'

type item = {
	title: string;
	id: number;
	isFav: number;
	listType?: string;
	color?: string
	navigation: MyDayNavigationProp
};

const TodoCard: React.FC<item> = ({ title, listType, isFav, id, navigation, color="red" }) => {
	const { toggleImportant } = useContext(TodoListContext) as todoContext;
	return (
		<TouchableOpacity style={styles.todoContainer} activeOpacity={0.9}  onPress={() => {
			navigation.navigate("TodoDetails", { id })
		}}>
			<View style={styles.todoTexts}>
				<FontAwesome name="circle-thin" size={28} color="#868a8f" />
				<View style={styles.textsContainter}>
					<Text style={styles.todoTitle}> {title} </Text>
					{ listType &&  <Text style={styles.todoType}> { listType } </Text> }
				</View>
			</View>
			<FontAwesome name="star" size={28} color={isFav === 1 ? color : "#ccc"} onPress={() => {
				toggleImportant(id, +(!isFav) )
			}} />
		</TouchableOpacity>
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
		justifyContent: "center",
		alignItems: "center"
	},
	textsContainter: {
		paddingHorizontal: 12,
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