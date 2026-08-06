import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ExportColumn } from "@/shared/utils/export/export-data";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 8, fontFamily: "Helvetica" },
  title: { fontSize: 14, marginBottom: 4, fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 9, marginBottom: 12, color: "#64748B" },
  table: { display: "flex", width: "100%" },
  headerRow: { flexDirection: "row", backgroundColor: "#2563EB" },
  headerCell: {
    flex: 1,
    padding: 6,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
  },
  row: { flexDirection: "row" },
  cell: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
  },
  cellAlt: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
});

interface PdfTableDocumentProps<T> {
  columns: ExportColumn<T>[];
  data: T[];
  title?: string;
}

export function PdfTableDocument<T>({
  columns,
  data,
  title,
}: PdfTableDocumentProps<T>) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.subtitle}>
          {data.length} {data.length === 1 ? "registo" : "registos"} · exportado
          em {new Date().toLocaleDateString("pt-PT")}
        </Text>

        <View style={styles.table}>
          <View style={styles.headerRow} fixed>
            {columns.map((col) => (
              <Text key={col.header} style={styles.headerCell}>
                {col.header}
              </Text>
            ))}
          </View>

          {data.map((row, index) => (
            <View key={index} style={styles.row} wrap={false}>
              {columns.map((col) => (
                <Text
                  key={col.header}
                  style={index % 2 === 0 ? styles.cell : styles.cellAlt}
                >
                  {String(col.accessor(row))}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
