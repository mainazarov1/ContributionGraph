import React from "react";
import ContributionSquare from "../ContributionSquare/ContributionSquare";
import './../ContributionGraph.css'
const ContributionWeek = ({ weekData }) => {
  return (
    <div className="contribution-week">
      {weekData.map((day) => (
        <React.Fragment key={day.date}>
          {day?.month && (
            <div key={day.month} style={{position: 'absolute', top: '-20px', fontSize: '12px'}}>
              {day.month}
            </div>
          )}
          <ContributionSquare
            key={day.date.toISOString()}
            contributions={day.contributions}
            date={day.date}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContributionWeek;