import React, { useRef } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Button } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { repeatOptions } from '../utils/notification';

type taskArgs = {
	task: string;
	show: boolean;
	dueDate: Date | undefined;
	reminderDate: Date | undefined;
	repeatType: repeatOptions | undefined;
	taskInputHandler: (val: string) => void;
	submitTaskHandler: () => void;
	showDueDateHandler: () => void;
	showReminderHandler: () => void;
	showRepeatHandler: () => void;
	removeDueDate: () => void;
	removeReminderDate: () => void;
	removeRepeatType: () => void;
};

const AddTask: React.FC<taskArgs> = ({
	task,
	removeRepeatType,
	repeatType,
	removeDueDate,
	reminderDate,
	removeReminderDate,
	dueDate,
	show,
	taskInputHandler,
	showReminderHandler,
	showRepeatHandler,
	submitTaskHandler,
	showDueDateHandler,
}) => {
	if (!show) {
		return null;
	}
	const panelElement = useRef<SlidingUpPanel>(null);
	return (
		<View style={styles.container}>
			<View style={styles.input}>
				<FontAwesome name="circle-thin" size={18} color="#868a8f" />
				<TextInput value={task} onChangeText={taskInputHandler} style={styles.textInput} placeholder="Task Title" />
				<MaterialCommunityIcons
					name="arrow-up-box"
					size={30}
					color={task.trim().length > 0 ? 'blue' : '#ccc'}
					onPress={() => {
						if (task.trim().length <= 0) return;
						submitTaskHandler();
					}}
				/>
			</View>
			<ScrollView horizontal={true} style={styles.actions} contentContainerStyle={styles.contentContainer}>
				<View style={styles.action}>
					<AntDesign name="home" size={22} color="#868a8f" />
					<Text style={styles.actionText}>Tasks</Text>
				</View>
				<View style={{ ...styles.action, backgroundColor: dueDate ? '#757268' : 'white', borderRadius: 20 }}>
					<Entypo name="calendar" size={18} color={dueDate ? 'white' : '#868a8f'} />
					{!dueDate ? (
						<TouchableOpacity onPress={showDueDateHandler}>
							<Text style={styles.actionText}> Set due date </Text>
						</TouchableOpacity>
					) : (
						<>
							<TouchableOpacity onPress={showDueDateHandler}>
								<Text style={styles.selected}> Due {dueDate.toString().substr(0, 10)} </Text>
							</TouchableOpacity>
							<FontAwesome name="times" size={18} color="white" onPress={removeDueDate} />
						</>
					)}
				</View>
				<View style={{ ...styles.action, backgroundColor: reminderDate ? '#043136' : 'white', borderRadius: 20 }}>
					<AntDesign name="bells" size={18} color={reminderDate ? 'white' : '#868a8f'} />
					{!reminderDate ? (
						<TouchableOpacity onPress={showReminderHandler}>
							<Text style={styles.actionText}> Remind me </Text>
						</TouchableOpacity>
					) : (
						<>
							<TouchableOpacity onPress={showReminderHandler}>
								<Text style={styles.selected}> Remind me at {reminderDate.toString().substr(0, 10)} </Text>
							</TouchableOpacity>
							<FontAwesome name="times" size={18} color="white" onPress={removeReminderDate} />
						</>
					)}
				</View>
				<View style={{ ...styles.action, backgroundColor: repeatType ? '#090414' : 'white', borderRadius: 20 }}>
					<Entypo name="loop" size={18} color={repeatType ? 'white' : '#868a8f'} />
					{!repeatType ? (
						<TouchableOpacity onPress={showRepeatHandler}>
							<Text style={styles.actionText}> Repeat </Text>
						</TouchableOpacity>
					) : (
						<>
							<TouchableOpacity onPress={showRepeatHandler}>
								<Text style={styles.selected}> {repeatType} </Text>
							</TouchableOpacity>
							<FontAwesome name="times" size={18} color="white" onPress={removeRepeatType} />
						</>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 5,
		position: 'absolute',
		width: '100%',
		bottom: 0,
		left: 0,
		zIndex: 100,
	},
	panel: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textInput: {
		width: '80%',
		height: 40,
		padding: 6,
		fontFamily: 'Roboto-Regular',
		fontSize: 18,
		color: '#868a8f',
		textDecorationLine: 'none',
	},
	contentContainer: {
		paddingVertical: 20,
	},
	actions: {
		flexDirection: 'row',
	},
	action: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 5,
		padding: 5,
	},
	actionText: {
		color: '#868a8f',
		fontFamily: 'Roboto-Regular',
		marginHorizontal: 5,
	},
	selected: {
		fontFamily: 'Roboto-Regular',
		fontSize: 18,
		color: 'white',
		marginHorizontal: 5,
	},
});

export default AddTask;
