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
            date: `In 5 hours`,
            icon: 'clock',
            reminder: 0
        },
        {  
            date: `Tomorrow (${getDay(num + 1)} 9:00)`,
            icon: 'clock',
            reminder: 1
        },
        {  
            date: `Next Week (${getDay(num)} 9:00)`,
            icon: 'clock',
            reminder: 2
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
            date: 'minute',
            icon: 'figma',
            returnType: 'string'
        },
        {  
            date: 'hour',
            icon: 'more-horizontal',
            returnType: 'string'
        },
        {  
            date: 'day',
            icon: 'more-vertical',
            returnType: 'string'
        },
        {  
            date: "week",
            icon: 'slack',
            returnType: 'string'
        },
        {  
            date: "month",
            icon: 'figma',
            returnType: 'string'
        },
        {  
            date: "year",
            icon: 'grid',
            returnType: 'string'
        },
    ]
}