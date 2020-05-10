import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';

import  DateTimePicker  from '@react-native-community/datetimepicker'

import TodoDatesActions from './TodoDatesActions';
import TaskListButton from './TaskListButton';

type args = {
	show: boolean,
	actions: {icon: string, date: string, id?: number, returnType?: string}[],
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
		<>
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
					iconColor="#ccc"
					onPress={() => {
						if(action.date === 'Pick a date') {
							setShowDatePicker(true)
						} else {
							if(action.returnType === 'string') {
								getDateHandler(action.date);
								close();
								return
							}
							let day = new Date();
							day.setDate(day.getDate() + action!.id! || 0 )
							getDateHandler(new Date(day));
							close();
						}
						
					}}
				/>
				))
			}
        </TodoDatesActions>
		</>
    )
}

const styles = StyleSheet.create({
	actionsList: {
		alignItems: 'flex-start'
	}
})

export default TimeTask;