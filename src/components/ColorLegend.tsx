import { CATEGORY_LABELS } from '../lib/defaultColors';
import { Category, type CategoryColorMap, type CategoryToggleMap } from '../lib/types';

export function ColorLegend({ colors, toggles }: { colors: CategoryColorMap; toggles: CategoryToggleMap }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Leyenda de colores</h3>
      <div className="grid gap-2">
        {Object.values(Category).map((category) => (
          <div key={category} className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 rounded" style={{ backgroundColor: colors[category], opacity: toggles[category] ? 1 : 0.3 }} />
            <span>{CATEGORY_LABELS[category]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
