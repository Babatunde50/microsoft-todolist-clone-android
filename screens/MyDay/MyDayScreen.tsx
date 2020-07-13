import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, FlatList, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';
import TimeTask from '../../components/TimeTask';
import SmallCard from '../../components/SmallCard';
import TodoCard from '../../components/TodoCard';
import { dueDateActions, remindMeActions, repeatActions } from '../../utils/days';

import useAddTodo from '../../hooks/useAddTodo';
import { useDispatchTodos, useTodos } from '../../providers/Todo';
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
	const todayDate = new Date().toString().split(' ');
	const todos = useTodos();
	const todosDispatch = useDispatchTodos()

	const [myDayTodos, setMyDayTodo] = useState<null | todoModel[]>(null);

	const addNewTask = () => {
		todosDispatch!.addTodo(task, 'myDay', 0, 'tasks', reminderDate?.toString(), dueDate?.toString(), repeatType);
		cancelAllShows();
	};

	useEffect(() => {
		const transformedTodos: todoModel[] = todos!
			.filter((todo: any) => todo.screen === 'myDay')
			.map((filteredTodo: any) => {
				const transformedTodo: todoModel = {
					id: filteredTodo.id.toString(),	
					...filteredTodo
				};
				return transformedTodo;
			});
		setMyDayTodo(transformedTodos);
	}, [todos]);
	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={cancelAllShows}>
			<ImageBackground source={require('../../assets/images/myday.jpeg')} style={styles.image}>
				<View style={styles.titleContainer}>
					<Text style={styles.myDayText}> My Day</Text>
					<Text style={styles.dateText}> {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}`} </Text>
				</View>
				<FlatList
					data={myDayTodos}
					renderItem={({ item }) => <TodoCard title={item.title} id={+item.id} isFav={item.important} listType={item.listType} navigation={navigation} />}
					keyExtractor={(item) => item.id}
				/>
				<SmallCard>
					<Entypo name="light-up" size={15} color="white" />
					<Text style={styles.todayText}> Today </Text>
				</SmallCard>
				<FabButton style={{ backgroundColor: '#376e69' }} onPress={addTaskShow}>
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
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
	},
	image: {
		flex: 1,
		resizeMode: 'center',
		backgroundColor: 'rgba(0,0,0,.8)',
		//   paddingHorizontal: 5
	},
	titleContainer: {
		paddingVertical: 15,
		paddingHorizontal: 15
	},
	myDayText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 22,
		color: 'white',
		paddingVertical: 2,
	},
	dateText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 16,
		color: 'white',
		letterSpacing: 3,
		paddingVertical: 3,
	},
	todayText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 15,
		color: 'white',
		marginLeft: 5,
	},
});

export default MyDayScreen;
