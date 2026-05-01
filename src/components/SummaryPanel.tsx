export function SummaryPanel({ points }: { points: string[] }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-2 font-semibold">Resumen</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {points.length === 0 ? <li>No hay puntos detectados todavía.</li> : points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}
