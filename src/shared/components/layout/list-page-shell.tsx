interface ListPageShellProps {
  header: React.ReactNode;
  filters?: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function ListPageShell({
  header,
  filters,
  footer,
  children,
}: ListPageShellProps) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="shrink-0">{header}</div>
      {filters && <div className="shrink-0">{filters}</div>}

      <div className="flex-1 overflow-y-auto rounded-sm bg-card">
        {children}
      </div>

      <div className="shrink-0">{footer}</div>
    </div>
  );
}
