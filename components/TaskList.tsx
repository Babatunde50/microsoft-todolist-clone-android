import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useLists } from '../providers/List';
import TaskListButton from './TaskListButton';

const TaskList: React.FC = () => {
	const lists = useLists()
	return (
		<View style={styles.taskList}>
			<View style={styles.taskTitle}>
				<AntDesign name="home" size={25} color="#000" />
				<Text style={styles.taskText}> Tasks</Text>
			</View>
			{lists!.length <= 0 ? (
				<Text style={styles.emptyText}> Task List is Empty</Text>
			) : (
				<ScrollView style={styles.lists}>
					{lists!.map((list) => (
						<TaskListButton
							title={list.title}
							iconName="menu"
							iconSize={15}
							iconColor={list.color}
							onPress={() => {
								console.log('BEING PRESSED!!!');
							}}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	taskList: {
		padding: 12,
	},
	taskTitle: {
		// padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		textDecorationColor: 'black',
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
	},
	taskText: {
		fontFamily: 'Roboto-Bold',
		paddingHorizontal: 5,
	},
    lists: {},
    emptyText: {
        textAlign: "center"
    }
});

export default TaskList;
