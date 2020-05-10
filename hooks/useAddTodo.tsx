import { useState } from 'react';

const useAddTodo = () => {
	// Task 
	const [task, setTask] = useState('');
	const [ dueDate, setDueDate] = useState<Date | null>(null);
	const [ reminderDate, setReminderDate ] = useState<Date | null>(null);
	const [ repeatType, setRepeatType] = useState<null | string>(null)
	// Visual States
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
	const closeReminderHandler = () => {
		setShowReminder(false);
	};
	const closeRepeatHandler = () => {
		setShowRepeat(false);
	};
	const dueDateHandler = (date: Date | string) => {
		setDueDate(date as Date);
	};
	
	const removeDueDate = () => {
		setDueDate(null);
	}

	const addReminderDate = (date: Date | string) => {
		setReminderDate(date as Date);
	}

	const removeReminderDate = () => {
		setReminderDate(null);
	}

	const addRepeatHandler = (repeatType: string | Date ) => {
		setRepeatType(repeatType as string);
	}

	const removeRepeatHandler = () => {
		setRepeatType(null);
	}
    
    return {
        task,
        showAddTask,
        showDueDate,
        showReminder,
		showRepeat,
		repeatType,
		addRepeatHandler,
		removeRepeatHandler,
		closeReminderHandler,
		closeRepeatHandler,
        taskInputHandler,
        addNewTask,
        dueDateHandler,
        closeDueDateHandler,
        addTaskShow,
        cancelAllShows,
        repeatShow,
        reminderShow,
		dueDateShow,
		dueDate,
		removeDueDate,
		addReminderDate,
		removeReminderDate,
		reminderDate
    }
};

export default useAddTodo;