import { useMemo, useState } from 'react';
import { clearSession, createDemoSession, DEMO_EMAIL, DEMO_PASSWORD, readSession, saveSession } from './lib/auth';
import { fallbackOverview, fallbackVehicles } from './lib/fleet';
import {
  alertRecords,
  analyticsRecords,
  auditRecords,
  branchRecords,
  complianceRecords,
  dispatchQueue,
  documentRecords,
  driverRecords,
  geofenceZones,
  maintenanceRecords,
  tripRecords,
  type BranchRecord,
  type DriverRecord,
} from './data/fleetModules';
import { DashboardView } from './components/views/DashboardView';
import { VehiclesView } from './components/views/VehiclesView';
import { TripsView } from './components/views/TripsView';
import { DriversView } from './components/views/DriversView';
import { AlertsView } from './components/views/AlertsView';
import { MaintenanceView } from './components/views/MaintenanceView';
import { ComplianceView } from './components/views/ComplianceView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { DocumentsView } from './components/views/DocumentsView';
import { AuditView } from './components/views/AuditView';
import { Button } from './components/ui';

type View =
  | 'dashboard'
  | 'vehicles'
  | 'trips'
  | 'drivers'
  | 'branches'
  | 'alerts'
  | 'maintenance'
  | 'compliance'
  | 'analytics'
  | 'documents'
  | 'audit';

const navItems: Array<{ key: View; label: string }> = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'trips', label: 'Trips' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'branches', label: 'Branches' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'documents', label: 'Documents' },
  { key: 'audit', label: 'Audit Log' },
];

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
              <label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email</label>
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
              <label htmlFor="password" className="mb-2 block text-sm text-slate-300">Password</label>
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

            <Button type="submit" className="w-full">
              Sign in
            </Button>
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
              <DashboardView
                overview={fallbackOverview}
                vehicles={fallbackVehicles}
                dispatchQueue={dispatchQueue}
                geofenceZones={geofenceZones}
              />
            )}

            {activeView === 'vehicles' && (
              <VehiclesView
                vehicles={fallbackVehicles}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={setSelectedVehicleId}
              />
            )}

            {activeView === 'trips' && (
              <TripsView
                trips={tripRecords}
                selectedTrip={selectedTrip}
                onSelectTrip={setSelectedTripId}
              />
            )}

            {activeView === 'drivers' && <DriversView drivers={driverRecords as DriverRecord[]} />}

            {activeView === 'branches' && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{branchRecords.map((branch: BranchRecord) => (
              <div key={branch.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{branch.name}</h3>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-300">
                    {branch.code}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{branch.location}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400"><span>Vehicles</span><span className="text-slate-100">{branch.vehicles}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Drivers</span><span className="text-slate-100">{branch.drivers}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Operating</span><span className="text-slate-100">{branch.operating}</span></div>
                </div>
              </div>
            ))}</div>}

            {activeView === 'alerts' && <AlertsView alerts={alertRecords} />}
            {activeView === 'maintenance' && <MaintenanceView maintenanceRecords={maintenanceRecords} />}
            {activeView === 'compliance' && <ComplianceView complianceRecords={complianceRecords} />}
            {activeView === 'analytics' && <AnalyticsView analyticsRecords={analyticsRecords} />}
            {activeView === 'documents' && <DocumentsView documentRecords={documentRecords} />}
            {activeView === 'audit' && <AuditView auditRecords={auditRecords} />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
