import { Badge, Card } from '../ui';

interface TripsViewProps {
  trips: Array<{ id: string; route: string; vehicle: string; driver: string; status: string; eta: string; distance: string }>;
  selectedTrip: { id: string; route: string; vehicle: string; driver: string; status: string; eta: string; distance: string } | undefined;
  onSelectTrip: (id: string) => void;
}

export function TripsView({ trips, selectedTrip, onSelectTrip }: TripsViewProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <h2 className="text-xl font-semibold text-white">Trip management</h2>
        <div className="mt-4 space-y-3">
          {trips.map((trip) => (
            <button
              key={trip.id}
              type="button"
              onClick={() => onSelectTrip(trip.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedTrip?.id === trip.id ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{trip.id}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{trip.route}</h3>
                </div>
                <Badge status={trip.status}>{trip.status}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                <span>{trip.vehicle}</span>
                <span>{trip.driver}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
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
                <div key={String(label)} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                  <span className="text-sm text-slate-400">{String(label)}</span>
                  <span className="text-sm font-medium text-slate-100">{String(value)}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
}
