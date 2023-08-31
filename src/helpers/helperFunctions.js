import axios from "axios"
import { addDays, format, isBefore, isSameMonth, startOfWeek } from "date-fns"

export const getColorForContributions = (number) => {
	if (number >= 1 && number <= 9) {
		return '#ACD5F2'
	} else if (number >= 10 && number <= 19) {
		return '#7FA8C9'
	} else if (number >= 20 && number <= 29) {
		return '#527BA0'
	} else if (number >= 30) {
		return '#254E77'
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
	// const sortedDates = Object.keys(data).sort();
	const currentDate = new Date();
	const fiftyWeeksAgo = addDays(currentDate, -50 * 7);
	let currentDatePointer = startOfWeek(fiftyWeeksAgo, { weekStartsOn: 1 });
	const weeks = [];
	let currentWeek = [];
	let currentWeekStart = null;
	let prevMonth = null; // Для отслеживания предыдущего месяца

	// while (isBefore(currentDatePointer, currentDate)) {
	// 	const dateString = format(currentDatePointer, 'yyyy-MM-dd');
	// 	console.log(dateString, fetchData?.[dateString])
	// 	dataOfContributions.push({
	// 		date: new Date(currentDatePointer),
	// 		contributions: fetchData?.[dateString] || 0
	// 	});
	// 	currentDatePointer = addDays(currentDatePointer, 1);
	// }
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
	console.log(weeks)
	return weeks;
}
// export const data = {
// 	'2023-05-28': 1,
// 	'2023-05-01': 2,
// 	'2023-05-03': 39,
// 	'2023-05-06': 14,
// 	'2023-05-07': 6,
// 	'2023-05-09': 7,
// 	'2023-05-10': 7,
// 	'2023-05-13': 19,
// 	'2023-05-14': 21,
// 	'2023-05-15': 8,
// 	'2023-05-17': 1,
// 	'2023-05-20': 8,
// 	'2023-05-21': 8,
// 	'2023-05-22': 7,
// 	'2023-05-23': 7,
// 	'2023-05-24': 4,
// 	'2023-05-27': 1,
// 	'2023-05-28': 7,
// 	'2023-06-29': 4,
// 	'2023-06-30': 12,
// 	'2023-06-31': 5,
// 	'2023-06-03': 1,
// 	'2023-06-04': 2,
// 	'2023-06-05': 1,
// 	'2023-06-06': 7,
// 	'2023-06-07': 1,
// 	'2023-06-10': 5,
// 	'2023-06-11': 2,
// 	'2023-06-12': 1,
// 	'2023-06-13': 1,
// 	'2023-06-14': 2,
// 	'2023-06-17': 1,
// 	'2023-06-18': 2,
// 	'2023-06-19': 4,
// 	'2023-06-20': 1,
// 	'2023-06-21': 1,
// 	'2023-06-24': 3,
// 	'2023-06-25': 1,
// 	'2023-06-26': 1,
// 	'2023-07-02': 1,
// 	'2023-07-04': 4,
// 	'2023-07-05': 1,
// 	'2023-08-11': 1,
// 	'2023-08-22': 2,
// 	'2023-08-23': 1,
// 	'2023-08-24': 2
// }