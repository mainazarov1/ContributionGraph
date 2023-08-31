import ContributionSquare from "../ContributionSquare/ContributionSquare";
import './../ContributionGraph.css'
const ContributionWeek = ({ weekData }) => {
  return (
    <div className="contribution-week">
      {weekData.map((day) => (
        <>
          {day?.month && (
            <div style={{position: 'absolute', top: '-20px', fontSize: '12px'}}>
              {day.month}
            </div>
          )}
          <ContributionSquare
            key={day.date.toISOString()}
            contributions={day.contributions}
            date={day.date}
          />
        </>
      ))}
    </div>
  );
};

export default ContributionWeek;