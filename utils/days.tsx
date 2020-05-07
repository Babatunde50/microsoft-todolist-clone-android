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
    return [
        {  
            date: `Today (${getDay(num)})`,
            icon: 'calendar'
        },
        {  
            date: `Tomorrow (${getDay(num + 1)})`,
            icon: 'calendar'
        },
        {  
            date: `Next week (${getDay(0)})`,
            icon: 'calendar'
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

export const repeatActions = (num: number) => {
    return [
        {  
            date: `Daily`,
            icon: 'figma'
        },
        {  
            date: `Weekdays`,
            icon: 'more-horizontal'
        },
        {  
            date: `Weekly`,
            icon: 'more-vertical'
        },
        {  
            date: "Monthly",
            icon: 'slack'
        },
        {  
            date: "Yearly",
            icon: 'figma'
        },
        {  
            date: "Custom",
            icon: 'grid'
        },
    ]
}