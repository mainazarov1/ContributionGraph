import { subWeeks, addDays, isBefore, getDay, format, startOfWeek } from 'date-fns';
import ContributionSquare from './ContributionSquare/ContributionSquare';
import './ContributionGraph.css';
import { dataIntoWeeks, getContributions } from '../../helpers/helperFunctions';
import { useEffect, useState } from 'react';
import ContributionWeek from './ContributionWeek/ContributionWeek';
import './ContributionGraph.css'
const ContributionGraph = () => {
	// const currentDate = new Date();
	// const fiftyWeeksAgo = addDays(currentDate, -50 * 7);
	const [data, setData] = useState([])
	// let currentDatePointer = startOfWeek(fiftyWeeksAgo, { weekStartsOn: 1 });
	// const [contributions, setContributions] = useState(getContributions());

	// const response = await dataOfContr;
	// setContributions(response)
	useEffect(() => {
		const getData = async () => {
			let dataOfContributions = []
			const fetchData = await getContributions()
			dataOfContributions = dataIntoWeeks(fetchData)
			// 		// while (isBefore(currentDatePointer, currentDate)) {
			// 		// 	const dateString = format(currentDatePointer, 'yyyy-MM-dd');
			// 		// 	console.log(dateString, fetchData?.[dateString])
			// 		// 	dataOfContributions.push({
			// 		// 		date: new Date(currentDatePointer),
			// 		// 		contributions: fetchData?.[dateString] || 0
			// 		// 	});
			// 		// 	currentDatePointer = addDays(currentDatePointer, 1);
			// 		// }
			setData(dataOfContributions)
		}
		getData()
	}, [])


	console.log(data)
	return (
		<div>
			<div className="contribution-graph">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{['Пн', '', 'Ср', '', 'Пт', '', '', ''].map((el, i) => (
						<div key={i} className='contribution-square' style={{ margin: '0 5px 1px 0' }}>{el}</div>
					))}
				</div>
				{data.map((weekData, weekIndex) => (
					<ContributionWeek
						key={weekIndex}
						weekData={weekData}
					/>
				))}
			</div>
			<div style={{ display: "flex", marginLeft: '20px' }}>
				<span style={{ marginRight: '5px' }}>Меньше</span>
				<ContributionSquare contributions={0} />
				<ContributionSquare contributions={1} />
				<ContributionSquare contributions={10} />
				<ContributionSquare contributions={20} />
				<ContributionSquare contributions={30} />
				<span style={{ marginLeft: '5px' }}>Больше</span>
			</div>
		</div>
	);
};

export default ContributionGraph;
