import { Category, type CategoryColorMap, type CategoryToggleMap } from './types';

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.MaxImportance]: 'Importancia máxima',
  [Category.MediumImportance]: 'Importancia media',
  [Category.Complementary]: 'Información complementaria',
  [Category.Keyword]: 'Palabras clave',
  [Category.Number]: 'Números',
  [Category.Legal]: 'Leyes / normativa',
  [Category.TitleL1]: 'Título principal',
  [Category.TitleL2]: 'Capítulo / sección',
  [Category.TitleL3]: 'Subapartado',
  [Category.TitleL4]: 'Sub-subapartado',
};

export const DEFAULT_COLORS: CategoryColorMap = {
  [Category.MaxImportance]: '#22c55e',
  [Category.MediumImportance]: '#f97316',
  [Category.Complementary]: '#facc15',
  [Category.Keyword]: '#ef4444',
  [Category.Number]: '#a855f7',
  [Category.Legal]: '#ec4899',
  [Category.TitleL1]: '#1e3a8a',
  [Category.TitleL2]: '#1d4ed8',
  [Category.TitleL3]: '#3b82f6',
  [Category.TitleL4]: '#93c5fd',
};

export const DEFAULT_TOGGLES: CategoryToggleMap = Object.values(Category).reduce(
  (acc, category) => ({ ...acc, [category]: true }),
  {} as CategoryToggleMap,
);
