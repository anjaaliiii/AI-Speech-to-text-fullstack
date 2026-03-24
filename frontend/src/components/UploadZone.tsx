import { Upload, Mic, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface UploadZoneProps {
  isRecording: boolean;
  isUploading: boolean;
  onToggleRecording: () => void;
  onFileSelected: (file: File) => void;
}

const UploadZone = ({ isRecording, isUploading, onToggleRecording, onFileSelected }: UploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = "";
  };

  if (isUploading) {
    return (
      <div className="flex items-center gap-4 px-5 py-3 bg-card border border-border rounded-lg" role="status" aria-live="polite">
        <Loader2 className="w-5 h-5 text-primary animate-spin" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">
          Uploading & transcribing… this may take a moment.
        </span>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="flex items-center gap-4 px-5 py-3 bg-card border border-border rounded-lg" role="status" aria-live="polite">
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="recording-pulse absolute inline-flex h-full w-full rounded-full bg-recording opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-recording" />
        </span>
        <span className="text-sm font-medium text-foreground">
          Recording in progress…
        </span>
        <span className="sr-only">Audio recording is currently active</span>
        <button
          onClick={onToggleRecording}
          className="ml-auto px-4 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Stop recording"
        >
          Stop Recording
        </button>
      </div>
    );
  }

  return (
    <div
      className={`dropzone ${isDragOver ? "border-primary bg-primary/5" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      role="region"
      aria-label="Audio upload area"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.m4a"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center gap-3">
        <Upload className="w-8 h-8 text-icon" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Drag & drop an audio file here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            MP3, WAV, M4A up to 500MB — or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              browse files
            </button>
          </p>
        </div>
        <button
          onClick={onToggleRecording}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Start audio recording"
        >
          <Mic className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
          Start Recording
        </button>
      </div>
    </div>
  );
};

export default UploadZone;
