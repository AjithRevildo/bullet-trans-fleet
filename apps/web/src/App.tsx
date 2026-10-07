import { useMemo, useState } from 'react';
import { clearSession, createDemoSession, DEMO_EMAIL, DEMO_PASSWORD, readSession, saveSession } from './lib/auth';
import { fallbackOverview, fallbackVehicles } from './lib/fleet';
import {
  alertRecords,
  branchRecords,
  dispatchQueue,
  driverRecords,
  geofenceZones,
  maintenanceRecords,
  tripRecords,
  complianceRecords,
  type BranchRecord,
  type DriverRecord,
  type FleetVehicleRecord,
  type TripRecord,
} from './data/fleetModules';

const overviewCards = [
  { label: 'Total Vehicles', key: 'totalVehicles', accent: 'text-cyan-400', bg: 'from-cyan-500/15 to-sky-500/5' },
  { label: 'Moving', key: 'moving', accent: 'text-emerald-400', bg: 'from-emerald-500/15 to-green-500/5' },
  { label: 'Idle', key: 'idle', accent: 'text-amber-400', bg: 'from-amber-500/15 to-yellow-500/5' },
  { label: 'Offline', key: 'offline', accent: 'text-rose-400', bg: 'from-rose-500/15 to-red-500/5' },
] as const;

const statusStyles: Record<string, string> = {
  MOVING: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  IDLE: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  MAINTENANCE: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  OFFLINE: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  ACTIVE: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  ASSIGNED: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  ON_ROUTE: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  DELAYED: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  COMPLETED: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  ALERT: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  WARNING: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  OK: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

type View = 'dashboard' | 'vehicles' | 'trips' | 'drivers' | 'branches' | 'alerts' | 'maintenance' | 'compliance';

const App = () => {
  const [session, setSession] = useState(() => readSession());
  const [credentials, setCredentials] = useState({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
  const [loginError, setLoginError] = useState('');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(fallbackVehicles[0]?.id ?? '1');
  const [selectedTripId, setSelectedTripId] = useState<string>(tripRecords[0]?.id ?? 'TRIP-1001');

  const selectedVehicle = useMemo(
    () => fallbackVehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? fallbackVehicles[0],
    [selectedVehicleId],
  );
  const selectedTrip = useMemo(
    () => tripRecords.find((trip) => trip.id === selectedTripId) ?? tripRecords[0],
    [selectedTripId],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSession = createDemoSession(credentials.email, credentials.password);

    if (!nextSession) {
      setLoginError('Use the demo Fleet Manager credentials to continue.');
      return;
    }

    setSession(nextSession);
    setLoginError('');
    saveSession(nextSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">Bullet Trans</p>
            <h1 className="mt-3 text-3xl font-bold text-white">Fleet Command Center</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-cyan-500"
                placeholder="ops@bullettrans.example"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-cyan-500"
                placeholder="********"
              />
            </div>

            {loginError ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                {loginError}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Demo credentials</p>
            <p className="mt-2">Email: {DEMO_EMAIL}</p>
            <p>Password: {DEMO_PASSWORD}</p>
          </div>
        </div>
      </main>
    );
  }

  const navItems: Array<{ key: View; label: string }> = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'vehicles', label: 'Vehicles' },
    { key: 'trips', label: 'Trips' },
    { key: 'drivers', label: 'Drivers' },
    { key: 'branches', label: 'Branches' },
    { key: 'alerts', label: 'Alerts' },
    { key: 'maintenance', label: 'Maintenance' },
    { key: 'compliance', label: 'Compliance' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
        <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">Bullet Trans</p>
              <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">Fleet Operations Center</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                {session.email}
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">
                {session.role}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveView(item.key)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    activeView === item.key
                      ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">
            {activeView === 'dashboard' && (
              <>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {overviewCards.map((card) => (
                    <article key={card.label} className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.bg} p-5`}>
                      <p className="text-sm text-slate-400">{card.label}</p>
                      <p className={`mt-4 text-3xl font-bold ${card.accent}`}>{fallbackOverview[card.key]}</p>
                    </article>
                  ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">Fleet live map</h2>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
                        {fallbackOverview.onlineVehicles} online
                      </span>
                    </div>

                    <div className="relative h-[320px] overflow-hidden rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(135deg,#020617,#0f172a_35%,#111827)]">
                      {fallbackVehicles.slice(0, 8).map((vehicle, index) => {
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

                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
                  </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
                            <span className={`rounded-full border px-2 py-1 text-xs ${statusStyles[item.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                              {item.status}
                            </span>
                            <span className="text-xs text-slate-400">ETA {item.eta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
                            <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[zone.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                              {zone.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeView === 'vehicles' && (
              <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Fleet inventory</h2>
                  <div className="mt-4 space-y-3">
                    {fallbackVehicles.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => setSelectedVehicleId(vehicle.id)}
                        className={`w-full rounded-xl border p-3 text-left transition ${
                          selectedVehicle?.id === vehicle.id
                            ? 'border-cyan-500/30 bg-cyan-500/10'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium text-white">{vehicle.vehicleNumber}</div>
                            <div className="text-xs text-slate-400">{vehicle.registrationNumber}</div>
                          </div>
                          <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[vehicle.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                            {vehicle.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  {selectedVehicle ? (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Vehicle detail</p>
                          <h2 className="mt-2 text-2xl font-semibold text-white">{selectedVehicle.vehicleNumber}</h2>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs ${statusStyles[selectedVehicle.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                          {selectedVehicle.status}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {[
                          ['Registration', selectedVehicle.registrationNumber],
                          ['Type', selectedVehicle.vehicleType],
                          ['Make', selectedVehicle.make],
                          ['Model', selectedVehicle.model],
                          ['GPS Provider', selectedVehicle.gpsProvider],
                          ['Ownership', selectedVehicle.ownership],
                          ['Last Update', new Date(selectedVehicle.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })],
                          ['Branch', selectedVehicle.branchId ?? 'N/A'],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                            <div className="mt-2 text-sm font-medium text-slate-100">{value}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {activeView === 'trips' && (
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Trip management</h2>
                  <div className="mt-4 space-y-3">
                    {tripRecords.map((trip) => (
                      <button
                        key={trip.id}
                        type="button"
                        onClick={() => setSelectedTripId(trip.id)}
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          selectedTrip?.id === trip.id
                            ? 'border-cyan-500/30 bg-cyan-500/10'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{trip.id}</p>
                            <h3 className="mt-2 text-lg font-semibold text-white">{trip.route}</h3>
                          </div>
                          <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[trip.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                            {trip.status}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                          <span>{trip.vehicle}</span>
                          <span>{trip.driver}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  {selectedTrip ? (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Selected trip</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">{selectedTrip.route}</h2>

                      <div className="mt-5 space-y-4">
                        {[
                          ['Trip ID', selectedTrip.id],
                          ['Vehicle', selectedTrip.vehicle],
                          ['Driver', selectedTrip.driver],
                          ['Status', selectedTrip.status],
                          ['ETA', selectedTrip.eta],
                          ['Distance', selectedTrip.distance],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                            <span className="text-sm text-slate-400">{label}</span>
                            <span className="text-sm font-medium text-slate-100">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <button type="button" className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
                          Dispatch now
                        </button>
                        <button type="button" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200 hover:border-slate-500">
                          Update ETA
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {activeView === 'drivers' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Driver roster</h2>
                  <span className="text-sm text-slate-400">{driverRecords.length} drivers</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 pr-4 font-medium">Driver</th>
                        <th className="pb-3 pr-4 font-medium">Assigned Vehicle</th>
                        <th className="pb-3 pr-4 font-medium">Status</th>
                        <th className="pb-3 pr-4 font-medium">Shift</th>
                        <th className="pb-3 pr-4 font-medium">Branch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverRecords.map((driver: DriverRecord) => (
                        <tr key={driver.id} className="border-b border-slate-800/80 text-slate-200">
                          <td className="py-3 pr-4">
                            <div className="font-medium text-white">{driver.name}</div>
                            <div className="text-xs text-slate-400">{driver.phone}</div>
                          </td>
                          <td className="py-3 pr-4">{driver.vehicle}</td>
                          <td className="py-3 pr-4">
                            <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[driver.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                              {driver.status}
                            </span>
                          </td>
                          <td className="py-3 pr-4">{driver.shift}</td>
                          <td className="py-3 pr-4">{driver.branch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'branches' && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {branchRecords.map((branch: BranchRecord) => (
                  <div key={branch.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{branch.name}</h3>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-300">
                        {branch.code}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{branch.location}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between text-slate-400">
                        <span>Vehicles</span>
                        <span className="text-slate-100">{branch.vehicles}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Drivers</span>
                        <span className="text-slate-100">{branch.drivers}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Operating</span>
                        <span className="text-slate-100">{branch.operating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'alerts' && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Operational alerts</h2>
                  <div className="mt-4 space-y-3">
                    {alertRecords.map((alert) => (
                      <div key={alert.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="font-medium text-white">{alert.title}</div>
                            <div className="mt-1 text-xs text-slate-400">{alert.vehicle}</div>
                          </div>
                          <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[alert.level] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                            {alert.level}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{alert.description}</p>
                        <div className="mt-3 text-xs text-slate-400">{alert.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Zone risk matrix</h2>
                  <div className="mt-5 space-y-3">
                    {[{ name: 'North corridor', risk: 'Low' }, { name: 'Industrial belt', risk: 'Medium' }, { name: 'Urban core', risk: 'High' }, { name: 'Interstate route', risk: 'Medium' }].map((item) => (
                      <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm">
                        <span className="text-slate-300">{item.name}</span>
                        <span className={`rounded-full border px-2 py-1 text-[10px] ${item.risk === 'High' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : item.risk === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                          {item.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'maintenance' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Maintenance scheduler</h2>
                  <span className="text-sm text-slate-400">{maintenanceRecords.length} records</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 pr-4 font-medium">Vehicle</th>
                        <th className="pb-3 pr-4 font-medium">Service</th>
                        <th className="pb-3 pr-4 font-medium">Due date</th>
                        <th className="pb-3 pr-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceRecords.map((record) => (
                        <tr key={record.id} className="border-b border-slate-800/80 text-slate-200">
                          <td className="py-3 pr-4">{record.vehicle}</td>
                          <td className="py-3 pr-4">{record.service}</td>
                          <td className="py-3 pr-4">{record.date}</td>
                          <td className="py-3 pr-4">
                            <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[record.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'compliance' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
                      <span className={`rounded-full border px-2 py-1 text-[10px] ${statusStyles[record.status] ?? 'border-slate-600 bg-slate-800 text-slate-300'}`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
