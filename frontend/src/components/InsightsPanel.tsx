import { Search, BarChart3, CheckCircle2, Lightbulb, ListChecks } from "lucide-react";

const takeaways = [
  "User engagement up 23% with collaboration tools driving growth",
  "Mobile app has 3 critical pain points being addressed next sprint",
  "Accessibility audit found 17 issues — 12 already resolved",
  "Enterprise tier has 8 inbound requests from 500+ employee companies",
];

const actionItems = [
  { text: "Improve documentation for new features", assignee: "Sarah Kim", done: false },
  { text: "Ship mobile navigation fix in next sprint", assignee: "Marcus Johnson", done: false },
  { text: "Complete remaining 5 accessibility issues", assignee: "Priya Patel", done: true },
  { text: "Prepare enterprise dashboard mockups", assignee: "Priya Patel", done: false },
  { text: "Build SSO integration estimate", assignee: "Marcus Johnson", done: false },
];

interface InsightsPanelProps {
  searchQuery: string;
  onQueryChange: (q: string) => void;
  matchCount: number;
}

const InsightsPanel = ({ searchQuery, onQueryChange, matchCount }: InsightsPanelProps) => {
  return (
    <aside className="w-80 shrink-0 border-l border-border bg-surface h-full overflow-y-auto hidden xl:flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search keywords, speakers, or dates…"
            className="w-full pl-9 pr-3 py-2.5 text-sm font-body bg-card border-2 border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-shadow"
            aria-label="Search transcript"
          />
          {searchQuery && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground tabular-nums">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
            </span>
          )}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-icon" aria-hidden="true" />
          <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
            Key Takeaways
          </h3>
        </div>
        <ul className="space-y-2.5">
          {takeaways.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-foreground/85 leading-snug font-body">
              <BarChart3 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4 text-icon" aria-hidden="true" />
          <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
            Action Items
          </h3>
        </div>
        <ul className="space-y-2">
          {actionItems.map((item, i) => (
            <li
              key={i}
              className={`flex gap-2.5 p-2.5 rounded-lg border border-border bg-card text-sm ${
                item.done ? "opacity-50" : ""
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 shrink-0 ${item.done ? "text-emerald-400" : "text-muted-foreground"}`}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className={`text-foreground/90 font-body leading-snug ${item.done ? "line-through" : ""}`}>
                  {item.text}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.assignee}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default InsightsPanel;
