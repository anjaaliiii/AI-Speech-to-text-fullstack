import { Search, X } from "lucide-react";
// Icons use the `icon` token for unified pale blue
import { useRef } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  matchCount: number;
}

const SearchBar = ({ query, onQueryChange, matchCount }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-icon" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search transcript…"
        className="w-full pl-9 pr-20 py-2 text-sm font-body bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
        aria-label="Search transcript"
      />
      {query && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-body tabular-nums">
            {matchCount} {matchCount === 1 ? "match" : "matches"}
          </span>
          <button
            onClick={() => { onQueryChange(""); inputRef.current?.focus(); }}
            className="p-0.5 rounded hover:bg-accent transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
