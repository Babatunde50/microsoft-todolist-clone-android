import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, FlatList, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';
import TimeTask from '../../components/TimeTask';
import SmallCard from '../../components/SmallCard';
import TodoCard from '../../components/TodoCard';
import { dueDateActions , remindMeActions, repeatActions } from '../../utils/days';

import useAddTodo from '../../hooks/useAddTodo'
import { TodoListContext, todoContext } from '../../providers/TodoList'

type todoModel = {
	category: string,
	favourite: boolean, 
	title: string,
	id: string
}

const MyDayScreen: React.FC = () => {
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
		repeatType
	} = useAddTodo();
	const todayDate = new Date().toString().split(' ');
	const { todos, addTodo } = useContext(TodoListContext) as todoContext;
	const [ myDayTodos, setMyDayTodo] = useState<null | todoModel[]>(null)
	
	const addNewTask = () => {
		console.log('adding todo...')
		// addTodo(task, "myDay");
		cancelAllShows();
	};

	console.log(todos[0].title, "myDAy")
	// console.log(todo)

	useEffect(() => {
		const filteredTodos = todos.filter( (todo: any) => todo.category === "myDay");

		// compare if filteredTodos is equal to myDayTodo in the state, if equal return;
		
		const transformedTodos: todoModel[] = filteredTodos.map( (filteredTodo: any) => {
			const transformedTodo: todoModel = {
				category: filteredTodo.category,
				favourite: !!filteredTodo.favourite,
				title: filteredTodo.title,
				id: filteredTodo.id.toString()
			}
			return transformedTodo;
		})
		setMyDayTodo(transformedTodos);
	}, [todos] )
	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={cancelAllShows}>
			<ImageBackground 
				source={require('../../assets/images/myday.webp')} 
				style={styles.image}>
				<Text style={styles.myDayText}> My Day</Text>
				<Text style={styles.dateText} > {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}`} </Text>
				{/* <View style={styles.todoList}> */}
					<FlatList
						data={myDayTodos}
						renderItem={({ item }) => (
							<TodoCard title={item.title} />
						)}
						keyExtractor={(item) => item.id }
					/>
				{/* </View> */}
				<SmallCard>
					<Entypo name="light-up" size={15} color="white" />
					<Text style={styles.todayText}> Today </Text>
				</SmallCard>
				<FabButton style={{backgroundColor: "#376e69"}} onPress={addTaskShow}>  
                	<Entypo name="plus" size={32} color="white" />
            	</FabButton>
				<TimeTask show={showDueDate} close={closeDueDateHandler}  getDateHandler={dueDateHandler} actions={dueDateActions(new Date().getDay())} />
				<TimeTask show={showReminder} close={ closeReminderHandler } getDateHandler={addReminderDate} actions={remindMeActions(new Date().getDay())} />
				<TimeTask show={showRepeat} close={ closeRepeatHandler } getDateHandler={addRepeatHandler} actions={repeatActions()} />
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
	  flexDirection: "column"
	},
	image: {
	  flex: 1,
	  resizeMode: "center",
	  backgroundColor: 'rgba(0,0,0,.8)',
	  paddingHorizontal: 5
	},
	myDayText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30,
		color: 'white',
		paddingHorizontal: 10
	},
	dateText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 18,
		color: 'white',
		letterSpacing: 3,
		paddingHorizontal: 10
	},
	todayText: {
		fontFamily: "Roboto-Bold",
		fontSize: 15,
		color: "white",
		marginLeft: 5
	}
  });

export default MyDayScreen;
