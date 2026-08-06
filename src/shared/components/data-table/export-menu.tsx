import { useState } from "react";
import { Download, FileText, FileSpreadsheet, FileType } from "lucide-react";
import { toast } from "sonner";

import {
  exportToCsv,
  exportToExcel,
  exportToPdf,
  type ExportColumn,
} from "@/shared/utils/export/export-data";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

interface ExportMenuProps<T> {
  columns: ExportColumn<T>[];
  fetchAll: () => Promise<T[]>;
  filenameBase: string;
  title?: string;
}

export function ExportMenu<T>({
  columns,
  fetchAll,
  filenameBase,
  title,
}: ExportMenuProps<T>) {
  const [isExporting, setIsExporting] = useState(false);

  async function handleExport(format: "csv" | "excel" | "pdf") {
    setIsExporting(true);
    try {
      const data = await fetchAll();
      if (data.length === 0) {
        toast.error("Não há dados para exportar com os filtros actuais.");
        return;
      }

      const filename = `${filenameBase}-${new Date().toISOString().slice(0, 10)}`;
      if (format === "csv") exportToCsv(data, columns, filename);
      if (format === "excel") exportToExcel(data, columns, filename);
      if (format === "pdf") await exportToPdf(data, columns, filename, title);
    } catch {
      toast.error("Não foi possível exportar os dados.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" disabled={isExporting} />}
      >
        <Download className="size-4" />
        {isExporting ? "A exportar..." : "Exportar"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <FileText className="size-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          <FileSpreadsheet className="size-4" />
          Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileType className="size-4" />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
