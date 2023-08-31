import ContributionSquare from './ContributionSquare/ContributionSquare';
import './ContributionGraph.css';
import { dataIntoWeeks, getContributions } from '../../helpers/helperFunctions';
import { useEffect, useState } from 'react';
import ContributionWeek from './ContributionWeek/ContributionWeek';
import './ContributionGraph.css'
const ContributionGraph = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		const getData = async () => {
			let dataOfContributions = []
			const fetchData = await getContributions()
			dataOfContributions = dataIntoWeeks(fetchData)
			setData(dataOfContributions)
		}
		getData()
	}, [])


	return (
		<div>
			<div className="contribution-graph">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{['Пн', '', 'Ср', '', 'Пт', '', '', ''].map((el, i) => (
						<div key={i} className='contribution-square' style={{ margin: '0 5px 1px 0' }}>{el}</div>
					))}
				</div>
				{data?.map((weekData, weekIndex) => (
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
				<ContributionSquare contributions={5} />
				<ContributionSquare contributions={10} />
				<ContributionSquare contributions={20} />
				<ContributionSquare contributions={30} />
				<span style={{ marginLeft: '5px' }}>Больше</span>
			</div>
		</div>
	);
};

export default ContributionGraph;
