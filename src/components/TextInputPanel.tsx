import { useState } from 'react';
import { importFile } from '../lib/fileImport';

interface Props {
  text: string;
  setText: (value: string) => void;
}

export function TextInputPanel({ text, setText }: Props) {
  const [status, setStatus] = useState('Puedes subir archivos .txt o .pdf.');

  const onUploadFile = async (file: File | null) => {
    if (!file) return;

    setStatus(file.name.toLowerCase().endsWith('.pdf') ? 'Leyendo PDF…' : 'Cargando archivo…');

    try {
      const result = await importFile(file);
      setText(result.text);
      setStatus(result.warning ?? 'Archivo cargado correctamente.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo leer el archivo.');
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Entrada de temario</h3>
      <textarea className="h-52 w-full rounded border p-2" placeholder="Pega aquí tu temario..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-3 flex items-center gap-2 text-sm">
        <input type="file" accept=".txt,.pdf" onChange={(e) => void onUploadFile(e.target.files?.[0] ?? null)} />
      </div>
      <p className="mt-2 text-xs text-slate-500">{status}</p>
    </div>
  );
}
