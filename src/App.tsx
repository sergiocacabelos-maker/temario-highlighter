import { useEffect, useMemo, useState } from 'react';
import { CategorySettings } from './components/CategorySettings';
import { ColorLegend } from './components/ColorLegend';
import { ExportButtons } from './components/ExportButtons';
import { HighlightedPreview } from './components/HighlightedPreview';
import { QuestionsPanel } from './components/QuestionsPanel';
import { SummaryPanel } from './components/SummaryPanel';
import { TextInputPanel } from './components/TextInputPanel';
import { analyzeText } from './lib/analyzer';
import { DEFAULT_COLORS, DEFAULT_TOGGLES } from './lib/defaultColors';
import { type CategoryColorMap, type CategoryToggleMap, type HighlightSegment } from './lib/types';

export default function App() {
  const [text, setText] = useState('');
  const [colors, setColors] = useState<CategoryColorMap>(DEFAULT_COLORS);
  const [toggles, setToggles] = useState<CategoryToggleMap>(DEFAULT_TOGGLES);
  const analysis = useMemo(() => analyzeText(text, { colorsEnabled: toggles }), [text, toggles]);
  const [segments, setSegments] = useState<HighlightSegment[]>(analysis.segments);

  useEffect(() => setSegments(analysis.segments), [analysis.segments]);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-bold">Temario Highlighter</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-4">
          <TextInputPanel text={text} setText={setText} />
          <CategorySettings
            colors={colors}
            toggles={toggles}
            onColorChange={(category, color) => setColors((prev) => ({ ...prev, [category]: color }))}
            onToggle={(category, enabled) => setToggles((prev) => ({ ...prev, [category]: enabled }))}
          />
          <ColorLegend colors={colors} toggles={toggles} />
          <ExportButtons />
        </section>

        <section className="space-y-4">
          <HighlightedPreview
            segments={segments}
            colors={colors}
            onChangeCategory={(id, category) => setSegments((prev) => prev.map((seg) => seg.id === id ? { ...seg, category } : seg))}
          />
          <SummaryPanel points={analysis.summary} />
          <QuestionsPanel questions={analysis.questions} />
        </section>
      </div>
    </main>
  );
}
