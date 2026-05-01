interface Props {
  text: string;
  setText: (value: string) => void;
}

export function TextInputPanel({ text, setText }: Props) {
  const onUploadTxt = async (file: File | null) => {
    if (!file) return;
    const content = await file.text();
    setText(content);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-3 font-semibold">Entrada de temario</h3>
      <textarea className="h-52 w-full rounded border p-2" placeholder="Pega aquí tu temario..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-3 flex items-center gap-2 text-sm">
        <input type="file" accept=".txt" onChange={(e) => onUploadTxt(e.target.files?.[0] ?? null)} />
        <span className="text-slate-500">(Arquitectura preparada para PDF/DOCX en v2)</span>
      </div>
    </div>
  );
}
