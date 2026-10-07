import { useQuery } from '@tanstack/react-query';
import { fetchFleetOverview, fetchFleetVehicles, fallbackOverview, fallbackVehicles } from './lib/fleet';

const statusStyles: Record<string, string> = {
  MOVING: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  IDLE: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  MAINTENANCE: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  OFFLINE: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const overviewCards = [
  { label: 'Total Vehicles', key: 'totalVehicles', accent: 'text-cyan-400', bg: 'from-cyan-500/15 to-sky-500/5' },
  { label: 'Moving', key: 'moving', accent: 'text-emerald-400', bg: 'from-emerald-500/15 to-green-500/5' },
  { label: 'Idle', key: 'idle', accent: 'text-amber-400', bg: 'from-amber-500/15 to-yellow-500/5' },
  { label: 'Offline', key: 'offline', accent: 'text-rose-400', bg: 'from-rose-500/15 to-red-500/5' },
] as const;

const App = () => {
  const overviewQuery = useQuery({
    queryKey: ['fleetOverview'],
    queryFn: fetchFleetOverview,
    staleTime: 30_000,
    retry: 1,
  });

  const vehiclesQuery = useQuery({
    queryKey: ['fleetVehicles'],
    queryFn: fetchFleetVehicles,
    staleTime: 30_000,
    retry: 1,
  });

  const overview = overviewQuery.data ?? fallbackOverview;
  const vehicles = vehiclesQuery.data ?? fallbackVehicles;

  const isDemoMode = overviewQuery.isError || vehiclesQuery.isError || !overviewQuery.data || !vehiclesQuery.data;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">Bullet Trans</p>
              <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">Fleet Command Center</h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${isDemoMode ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              {isDemoMode ? 'Demo mode active' : 'Live fleet sync'}
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <article key={card.label} className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.bg} p-5`}>
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className={`mt-4 text-3xl font-bold ${card.accent}`}>{overview[card.key]}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Vehicle map overview</h2>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
                {overview.onlineVehicles} online
              </span>
            </div>

            <div className="relative h-[300px] overflow-hidden rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(135deg,#020617,#0f172a_35%,#111827)]">
              <div className="absolute inset-0 opacity-60" aria-hidden="true">
                <div className="absolute left-[10%] top-[20%] h-12 w-12 rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="absolute right-[16%] top-[30%] h-14 w-14 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute bottom-[15%] left-[30%] h-16 w-16 rounded-full bg-violet-500/10 blur-3xl" />
              </div>

              <div className="absolute inset-0">
                {vehicles.slice(0, 8).map((vehicle, index) => {
                  const left = 12 + (index * 13) % 68;
                  const top = 18 + (index * 17) % 60;

                  return (
                    <div
                      key={vehicle.id}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <span
                        className={`h-3.5 w-3.5 rounded-full border border-white/40 ${
                          vehicle.status === 'MOVING'
                            ? 'bg-emerald-400'
                            : vehicle.status === 'IDLE'
                              ? 'bg-amber-400'
                              : vehicle.status === 'MAINTENANCE'
                                ? 'bg-violet-400'
                                : 'bg-rose-400'
                        }`}
                      />
                      <span className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-200">
                        {vehicle.vehicleNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold text-white">Operations snapshot</h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <span className="text-slate-300">API health</span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                  {isDemoMode ? 'Demo' : 'Live'}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <span className="text-slate-300">GPS feeds</span>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                  26 active
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <span className="text-slate-300">Stops today</span>
                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
                  184
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <span className="text-slate-300">Alerts</span>
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">
                  7 critical
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Active fleet list</h2>
            <span className="text-sm text-slate-400">{vehicles.length} tracked vehicles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 pr-4 font-medium">Vehicle</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Provider</th>
                  <th className="pb-3 pr-4 font-medium">Ownership</th>
                  <th className="pb-3 pr-4 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-slate-800/80 text-slate-200">
                    <td className="py-3 pr-4">
                      <div>
                        <div className="font-medium text-white">{vehicle.vehicleNumber}</div>
                        <div className="text-xs text-slate-400">{vehicle.registrationNumber}</div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">{vehicle.vehicleType}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[vehicle.status] || 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">{vehicle.gpsProvider}</td>
                    <td className="py-3 pr-4">{vehicle.ownership}</td>
                    <td className="py-3 pr-4 text-slate-400">
                      {new Date(vehicle.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
