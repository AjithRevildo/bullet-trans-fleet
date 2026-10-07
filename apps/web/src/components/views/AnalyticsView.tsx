import { Badge, Card } from '../ui';

interface ComplianceViewProps {
  complianceRecords: Array<{ id: string; name: string; detail: string; status: string }>;
}

export function ComplianceView({ complianceRecords }: ComplianceViewProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Compliance tracker</h2>
        <span className="text-sm text-slate-400">{complianceRecords.length} statuses</span>
      </div>

      <div className="space-y-3">
        {complianceRecords.map((record) => (
          <div key={record.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div>
              <div className="font-medium text-white">{record.name}</div>
              <div className="text-xs text-slate-400">{record.detail}</div>
            </div>
            <Badge status={record.status}>{record.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
