import { useMemo } from 'react';
import { Category, type CategoryColorMap, type HighlightSegment } from '../lib/types';

interface Props {
  segments: HighlightSegment[];
  colors: CategoryColorMap;
  onChangeCategory: (id: string, category: Category | null) => void;
}

export function HighlightedPreview({ segments, colors, onChangeCategory }: Props) {
  const categoryOptions = useMemo(() => [null, ...Object.values(Category)], []);

  return (
    <div id="highlight-preview" className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Vista previa subrayada</h3>
      <div className="space-y-2">
        {segments.map((segment) => (
          <div key={segment.id} className="group rounded border p-2 text-sm">
            <span style={{ backgroundColor: segment.category ? colors[segment.category] : 'transparent' }}>{segment.text || '\u00A0'}</span>
            <select className="ml-2 rounded border text-xs opacity-0 group-hover:opacity-100" value={segment.category ?? ''} onChange={(e) => onChangeCategory(segment.id, (e.target.value as Category) || null)}>
              {categoryOptions.map((cat) => (
                <option key={cat ?? 'none'} value={cat ?? ''}>{cat ?? 'Sin resaltado'}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
