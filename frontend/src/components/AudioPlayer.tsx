import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState, useMemo } from "react";

type PlaybackSpeed = 1 | 1.25 | 1.5;
const speeds: PlaybackSpeed[] = [1, 1.25, 1.5];

interface AudioPlayerProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const AudioPlayer = ({ currentTime, duration, onSeek }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const cycleSpeed = () => {
    const idx = speeds.indexOf(speed);
    setSpeed(speeds[(idx + 1) % speeds.length]);
  };

  const bars = useMemo(() => {
    const count = 80;
    return Array.from({ length: count }, (_, i) => {
      const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return 0.15 + (seed - Math.floor(seed)) * 0.85;
    });
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 10))}
            className="p-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack className="w-4 h-4 text-icon" aria-hidden="true" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 10))}
            className="p-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="w-4 h-4 text-icon" aria-hidden="true" />
          </button>
        </div>

        {/* Time */}
        <span className="text-xs font-display font-medium text-muted-foreground tabular-nums w-10 text-right shrink-0">
          {formatTime(currentTime)}
        </span>

        {/* Waveform */}
        <div
          className="flex-1 flex items-center gap-px h-10 cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            onSeek(ratio * duration);
          }}
          role="slider"
          aria-label="Audio progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
        >
          {bars.map((height, i) => {
            const barProgress = (i / bars.length) * 100;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-75 ${
                  isPlayed ? "bg-primary" : "bg-border"
                }`}
                style={{ height: `${height * 100}%` }}
              />
            );
          })}
        </div>

        {/* Duration */}
        <span className="text-xs font-display font-medium text-muted-foreground tabular-nums w-10 shrink-0">
          {formatTime(duration)}
        </span>

        {/* Playback speed */}
        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1 text-xs font-display font-semibold text-foreground bg-muted rounded-md hover:bg-accent transition-colors tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Playback speed ${speed}x, click to change`}
        >
          {speed}x
        </button>

        {/* Volume */}
        <button
          className="p-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Volume"
        >
          <Volume2 className="w-4 h-4 text-icon" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};

export default AudioPlayer;
