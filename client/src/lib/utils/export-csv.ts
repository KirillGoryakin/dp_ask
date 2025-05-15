import { unparse, UnparseConfig } from 'papaparse';

export function exportCsv(
  data: any[],
  filename = 'export.csv',
  delimiter = ',', // you can switch to ';' if your locale uses that
) {
  // 1. Force CRLF line endings
  const config: UnparseConfig = {
    delimiter,
    newline: '\r\n',
  };
  const csvBody = unparse(data, config);

  // 2. Prepend UTF-8 BOM so Excel recognises UTF-8 correctly
  const BOM = '\uFEFF';

  const blob = new Blob([BOM + csvBody], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);

  // Trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
