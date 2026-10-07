import { Badge, Card } from '../ui';
import { getStatusStyle } from '../../lib/styles';

type DashboardOverview = {
  totalVehicles: number;
  onlineVehicles: number;
  moving: number;
  idle: number;
  maintenance: number;
  offline: number;
};

interface DashboardViewProps {
  overview: DashboardOverview;
  vehicles: Array<{ id: string; vehicleNumber: string; status: string }>;
  dispatchQueue: Array<{ id: string; route: string; vehicle: string; status: string; eta: string }>;
  geofenceZones: Array<{ id: string; name: string; region: string; status: string }>;
}

const overviewCards = [
  { label: 'Total Vehicles', key: 'totalVehicles', accent: 'text-cyan-400', bg: 'from-cyan-500/15 to-sky-500/5' },
  { label: 'Moving', key: 'moving', accent: 'text-emerald-400', bg: 'from-emerald-500/15 to-green-500/5' },
  { label: 'Idle', key: 'idle', accent: 'text-amber-400', bg: 'from-amber-500/15 to-yellow-500/5' },
  { label: 'Offline', key: 'offline', accent: 'text-rose-400', bg: 'from-rose-500/15 to-red-500/5' },
] as const;

export function DashboardView({ overview, vehicles, dispatchQueue, geofenceZones }: DashboardViewProps) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <article key={card.label} className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.bg} p-5`}>
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className={`mt-4 text-3xl font-bold ${card.accent}`}>{overview[card.key]}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Fleet live map</h2>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
              {overview.onlineVehicles} online
            </span>
          </div>

          <div className="relative h-[320px] overflow-hidden rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]">
            {vehicles.slice(0, 8).map((vehicle, index) => {
              const left = 12 + (index * 13) % 68;
              const top = 18 + (index * 17) % 60;
              const statusStyle = getStatusStyle(vehicle.status);

              return (
                <div key={vehicle.id} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2" style={{ left: `${left}%`, top: `${top}%` }}>
                  <span className={`h-3.5 w-3.5 rounded-full border border-white/40 ${statusStyle.indicator}`} />
                  <span className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-200">
                    {vehicle.vehicleNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-white">Operations snapshot</h2>
          <div className="mt-5 space-y-4">
            {[
              { label: 'API health', value: 'Live', tone: 'emerald' },
              { label: 'GPS feeds', value: '26 active', tone: 'cyan' },
              { label: 'Stops today', value: '184', tone: 'violet' },
              { label: 'Alerts', value: '7 critical', tone: 'amber' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <span className="text-slate-300">{item.label}</span>
                <span className={`rounded-full border border-${item.tone}-500/20 bg-${item.tone}-500/10 px-2 py-1 text-xs text-${item.tone}-300`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Dispatch queue</h2>
            <span className="text-sm text-slate-400">{dispatchQueue.length} active items</span>
          </div>
          <div className="space-y-3">
            {dispatchQueue.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.id}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.route}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.vehicle}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge status={item.status}>{item.status}</Badge>
                  <span className="text-xs text-slate-400">ETA {item.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Geofence zones</h2>
            <span className="text-sm text-slate-400">{geofenceZones.length} active</span>
          </div>
          <div className="space-y-3">
            {geofenceZones.map((zone) => (
              <div key={zone.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-white">{zone.name}</div>
                    <div className="text-xs text-slate-400">{zone.region}</div>
                  </div>
                  <Badge status={zone.status}>{zone.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
