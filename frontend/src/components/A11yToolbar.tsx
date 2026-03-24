import { ZoomIn, ZoomOut, Type, Contrast, Focus, Accessibility } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export type FontScale = 1 | 1.25 | 1.5;

interface A11yToolbarProps {
  fontScale: FontScale;
  onFontScaleChange: (scale: FontScale) => void;
  dyslexicFont: boolean;
  onDyslexicFontChange: (on: boolean) => void;
  highContrast: boolean;
  onHighContrastChange: (on: boolean) => void;
  focusMode: boolean;
  onFocusModeChange: (on: boolean) => void;
}

const scales: FontScale[] = [1, 1.25, 1.5];

const A11yToolbar = ({
  fontScale,
  onFontScaleChange,
  dyslexicFont,
  onDyslexicFontChange,
  highContrast,
  onHighContrastChange,
  focusMode,
  onFocusModeChange,
}: A11yToolbarProps) => {
  const scaleIndex = scales.indexOf(fontScale);

  return (
    <div
      className="shrink-0 border-b border-border bg-surface px-4 py-2 flex items-center gap-6 flex-wrap"
      role="toolbar"
      aria-label="Accessibility controls"
    >
      <div className="flex items-center gap-1.5">
        <Accessibility className="w-4 h-4 text-icon" aria-hidden="true" />
        <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
          A11y
        </span>
      </div>

      {/* Font Scaling */}
      <div className="flex items-center gap-1.5" role="group" aria-label="Font scaling">
        <button
          onClick={() => scaleIndex > 0 && onFontScaleChange(scales[scaleIndex - 1])}
          disabled={scaleIndex === 0}
          className="p-1.5 rounded-md hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease font size"
        >
          <ZoomOut className="w-3.5 h-3.5 text-icon" aria-hidden="true" />
        </button>
        <span className="text-xs font-display font-medium text-foreground tabular-nums w-8 text-center">
          {fontScale}x
        </span>
        <button
          onClick={() => scaleIndex < scales.length - 1 && onFontScaleChange(scales[scaleIndex + 1])}
          disabled={scaleIndex === scales.length - 1}
          className="p-1.5 rounded-md hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase font size"
        >
          <ZoomIn className="w-3.5 h-3.5 text-icon" aria-hidden="true" />
        </button>
      </div>

      {/* Dyslexic Font */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Type className="w-3.5 h-3.5 text-icon" aria-hidden="true" />
        <span className="text-xs font-display text-foreground">Dyslexic</span>
        <Switch
          checked={dyslexicFont}
          onCheckedChange={onDyslexicFontChange}
          aria-label="Toggle dyslexic-friendly font"
        />
      </label>

      {/* High Contrast */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Contrast className="w-3.5 h-3.5 text-icon" aria-hidden="true" />
        <span className="text-xs font-display text-foreground">Hi-Contrast</span>
        <Switch
          checked={highContrast}
          onCheckedChange={onHighContrastChange}
          aria-label="Toggle high contrast mode"
        />
      </label>

      {/* Focus Mode */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Focus className="w-3.5 h-3.5 text-icon" aria-hidden="true" />
        <span className="text-xs font-display text-foreground">Focus</span>
        <Switch
          checked={focusMode}
          onCheckedChange={onFocusModeChange}
          aria-label="Toggle focus mode — hides sidebars"
        />
      </label>
    </div>
  );
};

export default A11yToolbar;
