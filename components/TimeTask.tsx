import React, { useState } from 'react';
import { StyleSheet, Platform, View } from 'react-native';

import  DateTimePicker  from '@react-native-community/datetimepicker'

import TodoDatesActions from './TodoDatesActions';
import TaskListButton from './TaskListButton';

type args = {
	show: boolean,
	actions: {icon: string, date: string, id?: number, returnType?: string, reminder?: number}[],
	getDateHandler: (date: Date | string) => void,
	close: () => void
}

const TimeTask: React.FC<args> = ({ show, actions, getDateHandler, close }) => {
	const num = new Date().getDay();
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker ] = useState(false);

	const changeDateHandler = (event: Event, selectedDate: Date) => {
		const currentDate = selectedDate || date;
		if(event.type === "dismissed") {
			setShowDatePicker(false);
			return;
		}
		setShowDatePicker(Platform.OS === 'ios');
		setDate(currentDate);
		getDateHandler(currentDate);
		close();
	  };

    if(!show) {
        return null;
    }
    return (
		<View style={styles.container}>
		{showDatePicker && (
			<DateTimePicker
				testID="dateTimePicker"
				value={date}
				mode="date"
				minimumDate={new Date()}
				display="default"
				onChange={changeDateHandler}
				/>
      )}
        <TodoDatesActions style={styles.actionsList}>
			{
				actions.map(action => (
					<TaskListButton
					key={action.date}
					title={ action.date  }
					iconName={action.icon}
					iconSize={15}
					iconColor="black"
					onPress={() => {
						if(action.date === 'Pick a date') {
							setShowDatePicker(true)
						} else {
							if(action.returnType === 'string') {
								getDateHandler(action.date);
								close();
								return
							}
							if(action.id !== undefined) {
								let day = new Date();
								day.setDate(day.getDate() + action.id || 0 )
								getDateHandler(new Date(day));
								close();
								return;
							}
							if(action.reminder !== undefined) {
								const year = new Date().getFullYear();
								const month = new Date().getMonth();
								const day = new Date().getDate();	
								const hours = new Date().getHours();
								let date: Date;
								if(action.reminder === 0) {
									date = new Date(year, month, day, hours + 6,0,0,0 )
								} else if(action.reminder === 1) {
									date = new Date(year, month, day + 1, 22, 0,0,0 )
								} else {
									date = new Date(year, month, day + 6, 22, 0, 0, 0)
								}
								getDateHandler(date);
								close()
								return;
							}
						}
						
					}}
				/>
				))
			}
        </TodoDatesActions>
		</View>
    )
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 30, 
		left: 40,
		zIndex: 1000,
		elevation: 10,
		backgroundColor: "white",
        shadowOffset: { width: 2, height: 2},
		shadowColor: "rgba(0,0,0,.26)",
		shadowRadius: 2,
		shadowOpacity: 1
	},
	actionsList: {
		alignItems: 'flex-start'
	}
})

export default TimeTask;