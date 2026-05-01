import type { AnalyzerResult } from '../lib/types';

export function QuestionsPanel({ questions }: { questions: AnalyzerResult['questions'] }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-2 font-semibold">Preguntas tipo test</h3>
      <div className="space-y-4 text-sm">
        {questions.length === 0 && <p>Sin preguntas generadas.</p>}
        {questions.map((q, i) => (
          <div key={i} className="rounded border p-2">
            <p className="font-medium">{i + 1}. {q.question}</p>
            <ul className="mt-1 list-[upper-alpha] pl-5">
              {q.options.map((opt, j) => <li key={j}>{opt}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
