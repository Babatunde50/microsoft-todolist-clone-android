import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';
import DueDate from '../../components/TimeTask';
import { dueDateActions , remindMeActions, repeatActions } from '../../utils/days';

const MyDayScreen: React.FC = () => {
	const [ task, setTask ] = useState("");
	const [showAddTask, setShowAddTask] = useState(false);
	const [showDueDate, setShowDueDate] = useState(false);
	const [showReminder, setShowReminder] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);
	const todayDate = new Date().toString().split(' ')
	const taskInputHandler = (text: string) => {
		setTask(text);
	}
	const addNewTask = () => {
		console.log("Submit")
	}
	const dueDateShow = () => {
		if(showReminder || showDueDate) {
			cancelAllShows();
			return;
		}
		setShowDueDate(true);
	}
	const reminderShow = () => {
		if(showDueDate || showRepeat) {
			cancelAllShows();
			return;
		}
		setShowReminder(true);
	}
	const repeatShow = () => {
		if(showDueDate || showReminder) {
			cancelAllShows();
			return;
		}
		setShowRepeat(true);
	}
	const cancelAllShows = () => {
		if(!showDueDate && !showReminder && !showRepeat) {
			setShowAddTask(false);
		}
		setShowDueDate(false);
		setShowReminder(false);
		setShowRepeat(false);
	}
	const addTaskShow = () => {
		setShowAddTask(true)
	}
	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={cancelAllShows}>
			<ImageBackground 
				source={require('../../assets/images/myday.webp')} 
				style={styles.image}>
				<Text style={styles.myDayText}> My Day</Text>
				<Text style={styles.dateText} > {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}`} </Text>
				<View style={styles.todayCard}>
					<Entypo name="light-up" size={15} color="white" />
					<Text style={styles.todayText}> Today </Text>
				</View>
				<FabButton style={{backgroundColor: "#376e69"}} onPress={addTaskShow}>  
                	<Entypo name="plus" size={32} color="white" />
            	</FabButton>
				<DueDate show={showDueDate} actions={dueDateActions(new Date().getDay())} />
				<DueDate show={showReminder} actions={remindMeActions(new Date().getDay())} />
				<DueDate show={showRepeat} actions={repeatActions(new Date().getDay())} />
				<AddTask 
					show={showAddTask}
					task={task} 
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
	todayCard: {
		flexDirection: 'row',
		width: 100,
		backgroundColor: "#376e69",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
		position: "absolute",
		bottom: 10,
		margin: 16,
		left: '30%'
	},
	todayText: {
		fontFamily: "Roboto-Bold",
		fontSize: 15,
		color: "white",
		marginLeft: 5
	}
  });

export default MyDayScreen;
