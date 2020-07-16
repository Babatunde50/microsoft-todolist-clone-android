import { useState } from 'react';
import { repeatOptions } from '../utils/notification';

const useAddTodo = () => {
	// Task 
	const [task, setTask] = useState('');
	const [ dueDate, setDueDate] = useState<Date | undefined>();
	const [ reminderDate, setReminderDate ] = useState<Date | undefined>();
	const [ repeatType, setRepeatType] = useState<repeatOptions>();
	// Visual States
	const [showAddTask, setShowAddTask] = useState(false);
	const [showDueDate, setShowDueDate] = useState(false);
	const [showReminder, setShowReminder] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);

	const taskInputHandler = (text: string) => {
		setTask(text);
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
		setDueDate(undefined);
	}

	const addReminderDate = (date: Date | string) => {
		setReminderDate(date as Date);
	}

	const removeReminderDate = () => {
		setReminderDate(undefined);
	}

	const addRepeatHandler = (repeatType: string | Date ) => {
		setRepeatType(repeatType as repeatOptions);
	}

	const removeRepeatHandler = () => {
		setRepeatType(undefined);
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