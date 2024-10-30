import { ChangeEvent } from "react";
import { SortBy, TopSortBy } from "../../types.ts";

type Props = {
  sortBy: SortBy;
  timeSort: TopSortBy;
  handleSort: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleTimeSort: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SortingActions = ({
  sortBy,
  timeSort,
  handleSort,
  handleTimeSort,
}: Props) => {
  return (
    <div>
      <select value={sortBy} onChange={handleSort}>
        <option value="New">New</option>
        <option value="Top">Top</option>
      </select>
      {sortBy === "Top" && (
        <select value={timeSort} onChange={handleTimeSort}>
          <option value="Hour">Hour</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
          <option value="AllTime">All time</option>
        </select>
      )}
    </div>
  );
};
export default SortingActions;
