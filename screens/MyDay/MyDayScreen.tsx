import React from 'react';
import { Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';
import TimeTask from '../../components/TimeTask';
import SmallCard from '../../components/SmallCard';
import { dueDateActions , remindMeActions, repeatActions } from '../../utils/days';

import useAddTodo from '../../hooks/useAddTodo'

const MyDayScreen: React.FC = () => {
	const {
		task,
		showAddTask,
		showDueDate,
		showReminder,
		taskInputHandler,
		addNewTask,
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
	const todayDate = new Date().toString().split(' ')
	console.log(task, dueDate, repeatType, reminderDate)
	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={cancelAllShows}>
			<ImageBackground 
				source={require('../../assets/images/myday.webp')} 
				style={styles.image}>
				<Text style={styles.myDayText}> My Day</Text>
				<Text style={styles.dateText} > {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}`} </Text>
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
	//   padding: 10
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
