import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ExportColumn } from "@/shared/utils/export/export-data";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 8, fontFamily: "Helvetica" },

  brandRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  logoBox: {
    width: 22,
    height: 22,
    backgroundColor: "#2563EB",
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 11 },
  brandName: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0F172A" },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: 16,
  },

  title: { fontSize: 14, marginBottom: 2, fontFamily: "Helvetica-Bold" },
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

  footer: {
    position: "absolute",
    bottom: 16,
    left: 24,
    right: 24,
    fontSize: 7,
    color: "#94A3B8",
    textAlign: "center",
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
  const exportedAt = new Date().toLocaleString("pt-PT");

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>SC</Text>
          </View>
          <Text style={styles.brandName}>Solvicity</Text>
        </View>
        <View style={styles.divider} />

        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.subtitle}>
          {data.length} {data.length === 1 ? "registo" : "registos"} · exportado
          em {exportedAt}
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

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Solvicity · Documento gerado automaticamente · Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
