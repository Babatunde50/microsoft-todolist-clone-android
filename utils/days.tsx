const getDay = (day: number) => {
	switch (day) {
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		case 0:
			return 'Sunday';
		default:
			return 'Error';
	}
};

export const dueDateActions = (num: number) => {
    let nextDay = num + 1
    if(num >= 6) {
        nextDay = 0;
    }
    return [
        {  
            date: `Today (${getDay(num)})`,
            icon: 'calendar',
            id: 0
        },
        {  
            date: `Tomorrow (${getDay(nextDay)})`,
            icon: 'calendar',
            id: 1
        },
        {  
            date: `Next week (${getDay(0)})`,
            icon: 'calendar',
            id: 6
        },
        {  
            date: "Pick a date",
            icon: 'calendar'
        },
    ]
}

export const remindMeActions = (num: number) => {
    return [
        {  
            date: `Later Today (6:00)`,
            icon: 'clock'
        },
        {  
            date: `Tomorrow (${getDay(num + 1)} 9:00)`,
            icon: 'clock'
        },
        {  
            date: `Next week (${getDay(0)} 9:00)`,
            icon: 'clock'
        },
        {  
            date: "Pick a date",
            icon: 'clock'
        },
    ]
}

export const repeatActions = () => {
    return [
        {  
            date: `Daily`,
            icon: 'figma',
            returnType: 'string'
        },
        {  
            date: `Weekdays`,
            icon: 'more-horizontal',
            returnType: 'string'
        },
        {  
            date: `Weekly`,
            icon: 'more-vertical',
            returnType: 'string'
        },
        {  
            date: "Monthly",
            icon: 'slack',
            returnType: 'string'
        },
        {  
            date: "Yearly",
            icon: 'figma',
            returnType: 'string'
        },
        {  
            date: "Custom",
            icon: 'grid',
            returnType: 'string'
        },
    ]
}