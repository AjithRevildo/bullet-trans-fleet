import { Badge, Card } from '../ui';

interface DocumentsViewProps {
  documentRecords: Array<{ id: string; name: string; category: string; owner: string; updatedAt: string; status: string }>;
}

export function DocumentsView({ documentRecords }: DocumentsViewProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Document archive</h2>
        <span className="text-sm text-slate-400">{documentRecords.length} files</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documentRecords.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-white">{doc.name}</p>
              <Badge status={doc.status}>{doc.status}</Badge>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-400">{doc.category}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex justify-between"><span>Owner</span><span>{doc.owner}</span></div>
              <div className="flex justify-between"><span>Updated</span><span>{doc.updatedAt}</span></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
