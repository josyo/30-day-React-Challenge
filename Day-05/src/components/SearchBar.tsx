import type { SearchBarProps } from "../types/task";
import "../App.css";

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Filter down directory by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
