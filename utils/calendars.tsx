import { AsyncStorage } from 'react-native';
import * as Calendar from 'expo-calendar';

export async function createCalendar() {
	const isPermitted = await getCalendarPermission();
	if (isPermitted) {
		const calendars = await Calendar.getCalendarsAsync();
		const retrievedCalID = await retrieveCalendarID();
		const appCalendar = calendars.find((cal) => cal.id === retrievedCalID);
		if (retrievedCalID && appCalendar) return;
		const [defaultCalendarSource] = calendars;
		const newCalendarID = await Calendar.createCalendarAsync({
			title: 'Todo Calendar',
			color: 'blue',
			entityType: Calendar.EntityTypes.EVENT,
			sourceId: defaultCalendarSource.id,
			source: defaultCalendarSource.source,
			name: 'todoCalendar',
			ownerAccount: 'personal',
			accessLevel: Calendar.CalendarAccessLevel.OWNER,
		});
		storeCalendarID(newCalendarID);
		return newCalendarID;
	}
}

const storeCalendarID = async (calendarID: string) => {
	try {
		await AsyncStorage.setItem('calendarID', calendarID);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getCalendarPermission = async () => {
	const { status } = await Calendar.requestCalendarPermissionsAsync();
	return status === 'granted';
};

export const retrieveCalendarID = async () => {
	try {
		const value = await AsyncStorage.getItem('calendarID');
		return value;
	} catch (error) {
		throw error;
	}
};

export const createEventDueDate = async (dueDate: string, title: string) => {
	const calenderID = await retrieveCalendarID();
	if (!calenderID) return;
	if (!dueDate) return;
	try {
		const dueDateId = await Calendar.createEventAsync(calenderID, {
			endDate: new Date(dueDate),
			startDate: new Date(),
			title: title,
			timeZone: "UTC",
		});
		return dueDateId;
	} catch (error) {
		console.log(error);
	}
};
