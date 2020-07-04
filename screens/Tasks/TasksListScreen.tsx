import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, FlatList, View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';
import TimeTask from '../../components/TimeTask';
import TodoCard from '../../components/TodoCard';
import { dueDateActions, remindMeActions, repeatActions } from '../../utils/days';

import useAddTodo from '../../hooks/useAddTodo';
import { TodoListContext, todoContext } from '../../providers/TodoList';
import { MyDayProps } from '../../navigation/TodoNavigation';

type todoModel = {
	screen: string;
	important: number;
	title: string;
	id: string;
	listType: string;
};

function MyDayScreen ({ route, navigation }: MyDayProps)  {
	const {
		task,
		showAddTask,
		showDueDate,
		showReminder,
		taskInputHandler,
		dueDateHandler,
		closeDueDateHandler,
		addTaskShow,
		cancelAllShows,
		repeatShow,
		reminderShow,
		dueDateShow,
		showRepeat,
		dueDate,
		removeDueDate,
		addReminderDate,
		removeReminderDate,
		reminderDate,
		closeReminderHandler,
		closeRepeatHandler,
		addRepeatHandler,
		removeRepeatHandler,
		repeatType,
	} = useAddTodo();

	const { todos, addTodo } = useContext(TodoListContext) as todoContext;
	const [myDayTodos, setMyDayTodo] = useState<null | todoModel[]>(null);

	const addNewTask = () => {
		addTodo(task, 'tasks', 0, 'tasks', reminderDate?.toString(), dueDate?.toString(), repeatType);
		cancelAllShows();
	};

	useEffect(() => {
		const transformedTodos: todoModel[] = todos
			.sort((a, b) => b.important - a.important )
			.map((filteredTodo: any) => {
				const transformedTodo: todoModel = {
					id: filteredTodo.id.toString(),	
					...filteredTodo
				};
				return transformedTodo;
			});
		console.log(transformedTodos);
		setMyDayTodo(transformedTodos);
	}, [todos]);
	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={cancelAllShows}>
				<View style={styles.container}>
					<Text style={styles.title}> Tasks </Text>
					<FlatList
						data={myDayTodos}
						renderItem={({ item }) => <TodoCard color="#4f6d9e" title={item.title} id={+item.id} isFav={item.important} navigation={navigation} />}
						keyExtractor={(item) => item.id}
					/>
					<FabButton style={{ backgroundColor: "#bec3e6" }} onPress={addTaskShow}>
						<Entypo name="plus" size={32} color="#4f6d9e" />
					</FabButton>
					<TimeTask
						show={showDueDate}
						close={closeDueDateHandler}
						getDateHandler={dueDateHandler}
						actions={dueDateActions(new Date().getDay())}
					/>
					<TimeTask
						show={showReminder}
						close={closeReminderHandler}
						getDateHandler={addReminderDate}
						actions={remindMeActions(new Date().getDay())}
					/>
					<TimeTask
						show={showRepeat}
						close={closeRepeatHandler}
						getDateHandler={addRepeatHandler}
						actions={repeatActions()}
					/>
					<AddTask
						show={showAddTask}
						task={task}
						dueDate={dueDate}
						reminderDate={reminderDate}
						repeatType={repeatType}
						removeDueDate={removeDueDate}
						removeReminderDate={removeReminderDate}
						removeRepeatType={removeRepeatHandler}
						taskInputHandler={taskInputHandler}
						submitTaskHandler={addNewTask}
						showDueDateHandler={dueDateShow}
						showReminderHandler={reminderShow}
						showRepeatHandler={repeatShow}
					/>
				</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	container: {
		flex: 1,
		backgroundColor: "#4f6d9e"
	},
	title: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30,
		color: "white",
		paddingHorizontal: 10,
		paddingVertical: 10
	}
});

export default MyDayScreen;
