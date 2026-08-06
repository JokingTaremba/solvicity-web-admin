import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ExportColumn<T> {
  header: string;
  accessor: (row: T) => string | number;
}

function toRecords<T>(data: T[], columns: ExportColumn<T>[]) {
  return data.map((row) => {
    const record: Record<string, string | number> = {};
    columns.forEach((col) => {
      record[col.header] = col.accessor(row);
    });
    return record;
  });
}

function downloadBlob(content: BlobPart, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToCsv<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string,
) {
  const csv = Papa.unparse(toRecords(data, columns));
  downloadBlob(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function exportToExcel<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string,
) {
  const worksheet = XLSX.utils.json_to_sheet(toRecords(data, columns));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToPdf<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string,
  title?: string,
) {
  const doc = new jsPDF();

  if (title) {
    doc.setFontSize(14);
    doc.text(title, 14, 15);
  }

  autoTable(doc, {
    startY: title ? 22 : 14,
    head: [columns.map((c) => c.header)],
    body: data.map((row) => columns.map((c) => String(c.accessor(row)))),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  doc.save(`${filename}.pdf`);
}
