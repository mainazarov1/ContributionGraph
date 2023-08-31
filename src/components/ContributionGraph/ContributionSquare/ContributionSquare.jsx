import { format } from "date-fns";
import { getColorForContributions } from "../../../helpers/helperFunctions";
import './../ContributionGraph.css'
import { useState } from "react";
const ContributionSquare = ({ contributions, date }) => {
  const [data, setData] = useState(null)
  const color = getColorForContributions(contributions);
  const style = {
    backgroundColor: color,
  };

  return <div
    onMouseEnter={() => setData(format(date, 'EEEE MMM d, yyyy'))}
    onMouseLeave={() => setData(null)}
    className="contribution-square" style={style} >
    {data && <div className="contribution-tooltip">
      <span>{`${contributions} contributions`}</span>
      <span>{format(date, 'EEEE MMM d, yyyy')}</span>
    </div>}
  </div>;
};

export default ContributionSquare;