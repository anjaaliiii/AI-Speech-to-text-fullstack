import { FileText, Clock, ChevronRight, Plus } from "lucide-react";

export interface SessionTranscript {
  id: string;
  title: string;
  date: string;
  duration: string;
}

interface SidebarNavProps {
  transcripts: SessionTranscript[];
  activeTranscriptId: string | null;
  onSelectTranscript: (id: string) => void;
}

const SidebarNav = ({ transcripts, activeTranscriptId, onSelectTranscript }: SidebarNavProps) => {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface h-full overflow-y-auto hidden lg:flex flex-col">
      {/* Brand */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-display font-semibold text-lg text-foreground">MeetNote</span>
        </div>
      </div>

      {/* Transcription History */}
      <div className="p-3 flex-1 overflow-y-auto">
        <p className="text-[11px] font-display font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Transcription History
        </p>
        <nav className="space-y-0.5" aria-label="Transcription history">
          {transcripts.length === 0 && (
            <p className="text-xs text-muted-foreground px-3 py-4">
              No transcripts yet. Upload an audio file to get started.
            </p>
          )}
          {transcripts.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTranscript(t.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md transition-colors duration-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTranscriptId === t.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-accent"
              }`}
              aria-current={activeTranscriptId === t.id ? "page" : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">{t.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                  activeTranscriptId === t.id ? "text-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`} aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" aria-hidden="true" />
                <span>{t.date}</span>
                <span aria-hidden="true">·</span>
                <span>{t.duration}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarNav;
