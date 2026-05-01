import { Category, type AnalyzeOptions, type AnalyzerResult, type HighlightSegment } from './types';

const LEGAL = /(ley|real decreto|reglamento|orden|art[ií]culo|directiva|boe)/i;
const NUMBERS = /(\b\d+[\d.,%/:-]*\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b)/;
const HIGH = /(debe|obligatorio|prohibido|se define|se considera)/i;
const MEDIUM = /(será|consiste en|salvo|excepto)/i;

function titleCategory(line: string): Category | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^tema\s+\d+/i.test(trimmed) || (trimmed.length < 70 && trimmed === trimmed.toUpperCase())) return Category.TitleL1;
  if (/^(cap[ií]tulo|secci[oó]n)\b/i.test(trimmed)) return Category.TitleL2;
  if (/^\d+\.\d+\.\d+/.test(trimmed)) return Category.TitleL4;
  if (/^\d+\.\d+/.test(trimmed)) return Category.TitleL3;
  if (/^\d+\./.test(trimmed)) return Category.TitleL2;
  return null;
}

export function analyzeText(text: string, options: AnalyzeOptions): AnalyzerResult {
  const lines = text.split('\n');
  const words = text.toLowerCase().match(/[a-záéíóúñ]{4,}/gi) ?? [];
  const freq = new Map<string, number>();
  words.forEach((w) => freq.set(w, (freq.get(w) ?? 0) + 1));

  const segments: HighlightSegment[] = lines.map((line, index) => {
    const title = titleCategory(line);
    let category: Category | null = title;

    if (!category && LEGAL.test(line)) category = Category.Legal;
    if (!category && NUMBERS.test(line)) category = Category.Number;
    if (!category && HIGH.test(line)) category = Category.MaxImportance;
    if (!category && MEDIUM.test(line)) category = Category.MediumImportance;
    if (!category && line.length > 0) category = Category.Complementary;

    if (category && !options.colorsEnabled[category]) category = null;

    return { id: `${index}-${Math.random().toString(36).slice(2, 8)}`, text: line, category };
  });

  const keywordSet = [...freq.entries()].filter(([, c]) => c >= 3).map(([w]) => w);
  const summary = segments
    .filter((s) => s.category === Category.MaxImportance || s.category === Category.TitleL1 || s.category === Category.TitleL2)
    .map((s) => s.text.trim())
    .filter(Boolean)
    .slice(0, 8);

  const questions = summary.slice(0, 5).map((s, i) => ({
    question: `¿Cuál es la idea principal del punto ${i + 1}?`,
    options: [s, 'No aplica', 'Es un ejemplo secundario', 'No aparece en el temario'],
    answer: s,
  }));

  segments.forEach((segment) => {
    if (segment.category === Category.Complementary && keywordSet.some((kw) => segment.text.toLowerCase().includes(kw))) {
      segment.category = options.colorsEnabled[Category.Keyword] ? Category.Keyword : segment.category;
    }
  });

  return { segments, summary, questions };
}
