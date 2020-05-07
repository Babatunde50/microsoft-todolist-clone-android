import React from 'react';
import { StyleSheet } from 'react-native';

import TodoDatesActions from './todoDatesActions';
import TaskListButton from './TaskListButton';

type args = {
	show: boolean,
	actions: {icon: string, date: string}[]
}

const TimeTask: React.FC<args> = ({ show, actions }) => {
    const num = new Date().getDay();
    if(!show) {
        return null;
    }
    return (
        <TodoDatesActions>
			{
				actions.map(action => (
					<TaskListButton
					key={action.date}
					title={action.date}
					iconName={action.icon}
					iconSize={15}
					iconColor="#ccc"
					onPress={() => {
                        console.log("Pressed")
					}}
				/>
				))
			}
        </TodoDatesActions>
    )
}

const styles = StyleSheet.create({

})

export default TimeTask;