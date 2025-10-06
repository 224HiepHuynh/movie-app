
export function Search({query, setQuery}) {
  return(
    <select 
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    >
      <option value="">Select a trending time frame</option>
      <option value="day">Today</option>
      <option value="week">This Week</option>
    </select>
  )
}