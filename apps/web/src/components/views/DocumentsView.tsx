import { Badge, Card } from '../ui';

interface AnalyticsViewProps {
  analyticsRecords: Array<{ id: string; label: string; value: string; change: string; trend: string }>;
}

export function AnalyticsView({ analyticsRecords }: AnalyticsViewProps) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analyticsRecords.map((item) => (
          <Card key={item.id}>
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{item.change}</span>
              <Badge status={item.trend}>{item.trend}</Badge>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-semibold text-white">Route performance</h2>
          <div className="mt-5 space-y-4">
            {[
              { route: 'Bengaluru › Mysuru', rate: 92 },
              { route: 'Hubli › Mangalore', rate: 85 },
              { route: 'Coimbatore › Salem', rate: 89 },
              { route: 'Chennai › Trichy', rate: 94 },
            ].map((item) => (
              <div key={item.route}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.route}</span>
                  <span>{item.rate}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" style={{ width: `${item.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-white">Operational reports</h2>
          <div className="mt-5 space-y-3">
            {[
              'Daily fuel efficiency report',
              'Driver attendance compliance',
              'Vehicle uptime summary',
              'Route optimization review',
            ].map((report) => (
              <div key={report} className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-300">
                {report}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
