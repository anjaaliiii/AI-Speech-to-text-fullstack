import { useState, useMemo, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, Mic, FileAudio } from "lucide-react";
import SidebarNav, { type SessionTranscript } from "@/components/SidebarNav";
import UploadZone from "@/components/UploadZone";
import TranscriptFeed from "@/components/TranscriptFeed";
import A11yToolbar, { type FontScale } from "@/components/A11yToolbar";
import InsightsPanel from "@/components/InsightsPanel";
import { TranscriptSegment } from "@/data/mockData";
import { uploadAudio } from "@/services/api";
import { toast } from "sonner";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);

  // Session history
  const [sessionTranscripts, setSessionTranscripts] = useState<SessionTranscript[]>([]);
  const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null);

  // A11y state
  const [fontScale, setFontScale] = useState<FontScale>(1);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 100}%`;
    return () => { document.documentElement.style.fontSize = ""; };
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dyslexic-font", dyslexicFont);
  }, [dyslexicFont]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  const handleFileSelected = useCallback(async (file: File) => {
    setIsUploading(true);
    setTranscript([]);
    setActiveSegmentId(null);
    try {
      const result = await uploadAudio(file);
      const lines = result.transcript.split("\n").filter((l) => l.trim());
      const segments: TranscriptSegment[] = lines.map((line, i) => ({
        id: `s${i}`,
        timestamp: formatSecondsToTimestamp(i * 10),
        speaker: "Speaker",
        text: line.trim(),
        startSeconds: i * 10,
      }));
      setTranscript(segments);

      const newEntry: SessionTranscript = {
        id: `t${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        duration: `${segments.length * 10}s`,
      };
      setSessionTranscripts((prev) => [newEntry, ...prev]);
      setActiveTranscriptId(newEntry.id);
      toast.success("Transcription complete!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, []);

  function formatSecondsToTimestamp(sec: number) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const matchCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const q = searchQuery.toLowerCase();
    return transcript.filter(
      (s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q)
    ).length;
  }, [searchQuery, transcript]);

  const handleSegmentClick = useCallback((segment: TranscriptSegment) => {
    setActiveSegmentId(segment.id);
  }, []);

  /* ── Hero / Landing View ── */
  if (!showDashboard) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <A11yToolbar
          fontScale={fontScale} onFontScaleChange={setFontScale}
          dyslexicFont={dyslexicFont} onDyslexicFontChange={setDyslexicFont}
          highContrast={highContrast} onHighContrastChange={setHighContrast}
          focusMode={focusMode} onFocusModeChange={setFocusMode}
        />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight leading-tight">
              Turn meetings<br />into transcrip<span className="text-primary">ts</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 font-body leading-relaxed max-w-lg">
              MeetNote is the AI notetaker that builds your knowledge base and powers your workflow with transcription, automated summaries, and more.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setShowDashboard(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-icon" aria-hidden="true" />
                Live transcription
              </span>
              <span className="flex items-center gap-2">
                <FileAudio className="w-4 h-4 text-icon" aria-hidden="true" />
                Audio upload
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ── Dashboard View ── */
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <A11yToolbar
        fontScale={fontScale} onFontScaleChange={setFontScale}
        dyslexicFont={dyslexicFont} onDyslexicFontChange={setDyslexicFont}
        highContrast={highContrast} onHighContrastChange={setHighContrast}
        focusMode={focusMode} onFocusModeChange={setFocusMode}
      />

      <div className="flex flex-1 min-h-0">
        {!focusMode && (
          <SidebarNav
            transcripts={sessionTranscripts}
            activeTranscriptId={activeTranscriptId}
            onSelectTranscript={setActiveTranscriptId}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <header className="shrink-0 border-b border-border bg-surface px-4 md:px-6 py-3 flex items-center gap-4">
            <button
              onClick={() => setShowDashboard(false)}
              className="p-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4 text-icon" aria-hidden="true" />
            </button>
            <h2 className="text-sm font-display font-semibold text-foreground">Live Transcript</h2>
          </header>

          <main className="flex-1 overflow-y-auto pb-20">
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 gradient-surface">
              <UploadZone isRecording={isRecording} isUploading={isUploading} onToggleRecording={() => setIsRecording(!isRecording)} onFileSelected={handleFileSelected} />
              <TranscriptFeed
                segments={transcript}
                searchQuery={searchQuery}
                activeSegmentId={activeSegmentId}
                onSegmentClick={handleSegmentClick}
              />
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default Index;
