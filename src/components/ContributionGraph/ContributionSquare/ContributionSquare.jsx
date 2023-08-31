import { format, getDay } from "date-fns";
import { getColorForContributions } from "../../../helpers/helperFunctions";
import './../ContributionGraph.css'
import { useState } from "react";
const ContributionSquare = ({ contributions, date = new Date() }) => {
  const [data, setData] = useState(null)
  const color = getColorForContributions(contributions);
  const style = {
    backgroundColor: color,
  };
  const getDayOfWeek = [1, 2, 3].includes(getDay(date))
  return <div
    onMouseEnter={() => setData(format(date, 'EEEE MMM d, yyyy'))}
    onMouseLeave={() => setData(null)}
    className="contribution-square" style={style} >
    {data && <div className={"contribution-tooltip" + (getDayOfWeek ? '_down' : '')}>
      <span>{`${contributions} contributions`}</span>
      <span>{format(date, 'EEEE MMM d, yyyy')}</span>
    </div>}
  </div>; 
};

export default ContributionSquare;