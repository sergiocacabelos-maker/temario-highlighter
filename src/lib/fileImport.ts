import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export async function importTextFile(file: File): Promise<string> {
  return file.text();
}

export async function importPdfFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: buffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ((item as TextItem).str ?? ''))
      .join(' ')
      .trim();

    pages.push(pageText);
  }

  return pages.join('\n').trim();
}

export async function importFile(file: File): Promise<{ text: string; warning?: string }> {
  if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
    return { text: await importTextFile(file) };
  }

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const text = await importPdfFile(file);
    if (!text) {
      return {
        text: '',
        warning: 'Este PDF parece escaneado o no contiene texto extraíble. Para estos casos haría falta OCR.',
      };
    }

    return { text };
  }

  throw new Error('Formato no compatible. Sube un archivo .txt o .pdf');
}
