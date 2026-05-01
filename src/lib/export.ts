import html2pdf from 'html2pdf.js';

export function exportAsHTML(element: HTMLElement, filename = 'temario-highlighter.html') {
  const blob = new Blob([`<html><body>${element.innerHTML}</body></html>`], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportAsPDF(element: HTMLElement, filename = 'temario-highlighter.pdf') {
  await html2pdf().from(element).set({ filename, margin: 10 }).save();
}
