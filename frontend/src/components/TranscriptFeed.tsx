import { useMemo } from "react";
import { TranscriptSegment } from "@/data/mockData";
import { User, Briefcase, Code, Palette, Loader2 } from "lucide-react";

interface TranscriptFeedProps {
  segments: TranscriptSegment[];
  searchQuery: string;
  activeSegmentId: string | null;
  onSegmentClick: (segment: TranscriptSegment) => void;
}

const speakerConfig: Record<string, { Icon: typeof User; initial: string }> = {
  "Alex Chen": { Icon: Briefcase, initial: "AC" },
  "Sarah Kim": { Icon: User, initial: "SK" },
  "Marcus Johnson": { Icon: Code, initial: "MJ" },
  "Priya Patel": { Icon: Palette, initial: "PP" },
};

const sentimentStyles: Record<string, string> = {
  Organized: "bg-muted text-muted-foreground",
  Confident: "bg-muted text-muted-foreground",
  Curious: "bg-muted text-muted-foreground",
  Enthusiastic: "bg-primary/10 text-primary",
  Proud: "bg-muted text-muted-foreground",
  Concerned: "bg-recording/10 text-recording",
  Collaborative: "bg-primary/10 text-primary",
  Thorough: "bg-muted text-muted-foreground",
  Analytical: "bg-muted text-muted-foreground",
  Strategic: "bg-primary/10 text-primary",
  Pragmatic: "bg-muted text-muted-foreground",
};

function highlightText(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-highlight/30 text-foreground rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const TranscriptFeed = ({ segments, searchQuery, activeSegmentId, onSegmentClick }: TranscriptFeedProps) => {
  const filteredSegments = useMemo(() => {
    if (!searchQuery.trim()) return segments;
    const q = searchQuery.toLowerCase();
    return segments.filter(
      (s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q)
    );
  }, [segments, searchQuery]);

  return (
    <div>
      {/* Processing indicator */}
      <div className="flex items-center gap-2 px-1 py-2 mb-3" role="status" aria-live="polite">
        <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" aria-hidden="true" />
        <span className="text-xs font-display text-muted-foreground">Processing transcript — AI analysis in progress…</span>
      </div>

      <div className="space-y-0.5" role="list" aria-label="Transcript segments">
        {filteredSegments.map((segment) => {
          const config = speakerConfig[segment.speaker] || { Icon: User, initial: "??" };
          const SpeakerIcon = config.Icon;

          return (
            <button
              key={segment.id}
              onClick={() => onSegmentClick(segment)}
              role="listitem"
              aria-label={`${segment.speaker} at ${segment.timestamp}: ${segment.text}`}
              className={`w-full text-left flex gap-3 px-3 py-3 rounded-lg transition-all duration-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeSegmentId === segment.id
                  ? "bg-primary/5 ring-1 ring-primary/20"
                  : "hover:bg-accent/40"
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <SpeakerIcon className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-sm font-display font-semibold text-foreground/80">
                    {highlightText(segment.speaker, searchQuery)}
                  </span>
                  <span className="text-[11px] font-display text-muted-foreground tabular-nums">
                    {segment.timestamp}
                  </span>
                  {segment.sentiment && (
                    <span
                      className={`text-[10px] font-display font-medium px-1.5 py-0.5 rounded-full ${sentimentStyles[segment.sentiment] || "bg-muted text-muted-foreground"}`}
                      aria-label={`Sentiment: ${segment.sentiment}`}
                    >
                      {segment.sentiment}
                    </span>
                  )}
                </div>
                <p className="text-sm font-body text-foreground/85 leading-relaxed">
                  {highlightText(segment.text, searchQuery)}
                </p>
              </div>
            </button>
          );
        })}
        {filteredSegments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm" role="status">
            No segments match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptFeed;
