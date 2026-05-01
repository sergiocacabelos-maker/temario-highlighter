import { CATEGORY_LABELS } from '../lib/defaultColors';
import { Category, type CategoryColorMap, type CategoryToggleMap } from '../lib/types';

interface Props {
  colors: CategoryColorMap;
  toggles: CategoryToggleMap;
  onColorChange: (category: Category, color: string) => void;
  onToggle: (category: Category, enabled: boolean) => void;
}

export function CategorySettings({ colors, toggles, onColorChange, onToggle }: Props) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Configuración de categorías</h3>
      <div className="space-y-2">
        {Object.values(Category).map((category) => (
          <div key={category} className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={toggles[category]} onChange={(e) => onToggle(category, e.target.checked)} />
              {CATEGORY_LABELS[category]}
            </label>
            <input type="color" value={colors[category]} onChange={(e) => onColorChange(category, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}
