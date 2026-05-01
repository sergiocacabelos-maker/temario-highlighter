import { exportAsHTML, exportAsPDF } from '../lib/export';

export function ExportButtons() {
  const getTarget = () => document.getElementById('highlight-preview') as HTMLElement | null;

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Exportación</h3>
      <div className="flex gap-2">
        <button className="rounded bg-slate-800 px-3 py-2 text-white" onClick={() => { const el = getTarget(); if (el) exportAsHTML(el); }}>Exportar HTML</button>
        <button className="rounded bg-indigo-600 px-3 py-2 text-white" onClick={() => { const el = getTarget(); if (el) void exportAsPDF(el); }}>Exportar PDF</button>
      </div>
    </div>
  );
}
