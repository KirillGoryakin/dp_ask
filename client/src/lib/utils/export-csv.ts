import { unparse } from 'papaparse';

export function exportCsv(data: any[], filename = 'export.csv') {
  const csvBody = unparse(data, { delimiter: ';' });
  const csvWithBom = '\uFEFF' + csvBody;

  const blob = new Blob([csvWithBom], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
