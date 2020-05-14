import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export type repeatOptions = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export const createNewReminder = async (title: string, reminderDate: string, repeatType?: repeatOptions) => {
	try {
		let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		const localNotification = {
			title: 'Task Reminder',
			body: title,
		};
		const schedulingOptions = {
			time: new Date(reminderDate),
			repeat: repeatType,
		};
		if (status === 'granted') {
			const notificationId = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
			return notificationId;
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};