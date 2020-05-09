import { useState } from 'react';

const useAddTodo = () => {
	const [task, setTask] = useState('');
	const [showAddTask, setShowAddTask] = useState(false);
	const [showDueDate, setShowDueDate] = useState(false);
	const [showReminder, setShowReminder] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);

	const taskInputHandler = (text: string) => {
		setTask(text);
	};
	const addNewTask = () => {
		console.log('Submit');
	};
	const dueDateShow = () => {
		if (showReminder || showDueDate) {
			cancelAllShows();
			return;
		}
		setShowDueDate(true);
	};
	const reminderShow = () => {
		if (showDueDate || showRepeat) {
			cancelAllShows();
			return;
		}
		setShowReminder(true);
	};
	const repeatShow = () => {
		if (showDueDate || showReminder) {
			cancelAllShows();
			return;
		}
		setShowRepeat(true);
	};
	const cancelAllShows = () => {
		if (!showDueDate && !showReminder && !showRepeat) {
			setShowAddTask(false);
		}
		setShowDueDate(false);
		setShowReminder(false);
		setShowRepeat(false);
	};
	const addTaskShow = () => {
		setShowAddTask(true);
	};
	const closeDueDateHandler = () => {
		setShowDueDate(false);
	};
	const dueDate = (date: Date) => {
		console.log(date);
    };
    
    return {
        task,
        showAddTask,
        showDueDate,
        showReminder,
        showRepeat,
        taskInputHandler,
        addNewTask,
        dueDate,
        closeDueDateHandler,
        addTaskShow,
        cancelAllShows,
        repeatShow,
        reminderShow,
        dueDateShow
    }
};

export default useAddTodo;