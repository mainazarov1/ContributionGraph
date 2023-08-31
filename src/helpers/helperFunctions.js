import axios from "axios"
import { addDays, format, isBefore, isSameMonth, startOfWeek } from "date-fns"

export const getColorForContributions = (number) => {
	if (number >= 1 && number <= 4) {
		return '#d9d2e9'
	} else if (number >= 5 && number <= 9) {
		return '#b4a7d6'
	} else if (number >= 10 && number <= 19) {
		return '#8e7cc3'
	} else if (number >= 20 && number <= 29) {
		return '#674ea7'
	} else if (number >= 30) {
		return '#351c75'
	} else {
		return '#EDEDED'
	}
}

export const getContributions = async () => {
	try {
		const { data } = await axios.get('https://dpg.gg/test/calendar.json', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return data
	} catch (error) {
		console.error('Error', error);
	}
};

export const dataIntoWeeks = (data) => {
	const currentDate = new Date();
	const fiftyWeeksAgo = addDays(currentDate, -50 * 7);
	let currentDatePointer = startOfWeek(fiftyWeeksAgo, { weekStartsOn: 1 });
	const weeks = [];
	let currentWeek = [];
	let currentWeekStart = null;
	let prevMonth = null;

	while(isBefore(currentDatePointer, currentDate)) {
		if (currentWeekStart === null) {
			currentWeekStart = startOfWeek(currentDatePointer, { weekStartsOn: 1 });
		}
		const dateString = format(currentDatePointer, 'yyyy-MM-dd');
    if (!prevMonth || !isSameMonth(currentDatePointer, prevMonth)) {
      currentWeek.push({ month: format(currentDatePointer, 'MMM'), date: currentDatePointer, contributions: data?.[dateString] || 0 });
      prevMonth = currentDatePointer;
		} else {
			currentWeek.push({
				date: currentDatePointer,
				contributions: data?.[dateString] || 0
			});
		}

		if (currentWeek.length === 7) {
			weeks.push([...currentWeek]);
			currentWeek = [];
			currentWeekStart = null;
		}
		currentDatePointer = addDays(currentDatePointer, 1);
	}

	if (currentWeek.length > 0) {
		weeks.push([...currentWeek]);
	}
	return weeks;
}