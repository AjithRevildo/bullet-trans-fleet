import { Badge, Card } from '../ui';

interface AlertsViewProps {
  alerts: Array<{ id: string; title: string; vehicle: string; level: string; description: string; time: string }>;
}

export function AlertsView({ alerts }: AlertsViewProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <h2 className="text-xl font-semibold text-white">Operational alerts</h2>
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-white">{alert.title}</div>
                  <div className="mt-1 text-xs text-slate-400">{alert.vehicle}</div>
                </div>
                <Badge status={alert.level}>{alert.level}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-300">{alert.description}</p>
              <div className="mt-3 text-xs text-slate-400">{alert.time}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-white">Zone risk matrix</h2>
        <div className="mt-5 space-y-3">
          {[
            { name: 'North corridor', risk: 'Low' },
            { name: 'Industrial belt', risk: 'Medium' },
            { name: 'Urban core', risk: 'High' },
            { name: 'Interstate route', risk: 'Medium' },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm">
              <span className="text-slate-300">{item.name}</span>
              <span className={`rounded-full border px-2 py-1 text-[10px] ${item.risk === 'High' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : item.risk === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                {item.risk}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
