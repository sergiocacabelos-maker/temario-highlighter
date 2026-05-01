export enum Category {
  MaxImportance = 'maxImportance',
  MediumImportance = 'mediumImportance',
  Complementary = 'complementary',
  Keyword = 'keyword',
  Number = 'number',
  Legal = 'legal',
  TitleL1 = 'titleL1',
  TitleL2 = 'titleL2',
  TitleL3 = 'titleL3',
  TitleL4 = 'titleL4',
}

export type CategoryColorMap = Record<Category, string>;
export type CategoryToggleMap = Record<Category, boolean>;

export interface HighlightSegment {
  id: string;
  text: string;
  category: Category | null;
}

export interface AnalyzerResult {
  segments: HighlightSegment[];
  summary: string[];
  questions: { question: string; options: string[]; answer: string }[];
}

export interface AnalyzeOptions {
  colorsEnabled: CategoryToggleMap;
}
