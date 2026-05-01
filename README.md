# Temario Highlighter

Aplicación web en React + TypeScript + Vite para subrayar temarios de oposiciones con un código de colores configurable y un analizador local heurístico.

## Requisitos
- Node.js 18+
- npm

## Instalación y ejecución
```bash
npm install
npm run dev
```

## Funcionalidades incluidas (v1)
- Pegado manual de texto y carga de archivos `.txt`.
- Leyenda y panel de configuración de categorías/colores (activar/desactivar y color picker).
- Análisis local heurístico con categorías:
  - Importancia máxima, media, complementaria
  - Palabras clave
  - Números
  - Leyes/normativa
  - Títulos jerárquicos en tonos azules
- Vista previa editable del resaltado (cambio de categoría o quitar resaltado por fragmento).
- Exportación a HTML y PDF conservando colores.
- Panel de resumen y panel de preguntas tipo test.

## Preparado para IA real
Existe una capa `src/lib/aiAnalyzer.ts` como placeholder. La integración real con OpenAI debe hacerse desde backend seguro (no en frontend con API key).

## Estructura principal
- `src/components/`
- `src/lib/`
- `src/App.tsx`
