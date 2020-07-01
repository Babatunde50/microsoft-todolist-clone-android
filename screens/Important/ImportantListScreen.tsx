import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, FlatList, View } from 'react-native';
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
		addTodo(task, 'tasks', 1, 'tasks', reminderDate?.toString(), dueDate?.toString(), repeatType);
		cancelAllShows();
	};

	useEffect(() => {
		const transformedTodos: todoModel[] = todos
			.filter((todo: any) => +todo.important === 1  )
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
					<Text style={styles.title}> Important </Text>
					<FlatList
						data={myDayTodos}
						renderItem={({ item }) => <TodoCard title={item.title} id={+item.id} isFav={item.important} listType={`${item.listType} - ${item.screen !== "tasks" && item.screen} `} navigation={navigation} />}
						keyExtractor={(item) => item.id}
					/>
					<FabButton style={{ backgroundColor: "#eb3434" }} onPress={addTaskShow}>
						<Entypo name="plus" size={32} color="white" />
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
		backgroundColor: "#ebd5d5"
	},
	title: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30,
		color: "#eb3434",
		paddingHorizontal: 10,
		paddingVertical: 10
	}
});

export default MyDayScreen;
