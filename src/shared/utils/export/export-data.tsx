import Papa from "papaparse";
import * as XLSX from "xlsx";
import { pdf } from "@react-pdf/renderer";

import { PdfTableDocument } from "@/shared/utils/export/pdf-table-document";

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

function download(
  content: Blob | BlobPart,
  filename: string,
  mimeType?: string,
) {
  const blob =
    content instanceof Blob ? content : new Blob([content], { type: mimeType });
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
  download(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
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

export async function exportToPdf<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string,
  title?: string,
) {
  const blob = await pdf(
    <PdfTableDocument columns={columns} data={data} title={title} />,
  ).toBlob();
  download(blob, `${filename}.pdf`);
}
