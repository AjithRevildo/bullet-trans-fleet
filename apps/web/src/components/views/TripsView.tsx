import { Badge, Card } from '../ui';

interface VehiclesViewProps {
  vehicles: Array<{ id: string; vehicleNumber: string; registrationNumber: string; status: string; vehicleType: string; make: string; model: string; branchId: string | null; gpsProvider: string; ownership: string; lastUpdated: string }>;
  selectedVehicle: { id: string; vehicleNumber: string; registrationNumber: string; status: string; vehicleType: string; make: string; model: string; branchId: string | null; gpsProvider: string; ownership: string; lastUpdated: string } | undefined;
  onSelectVehicle: (id: string) => void;
}

export function VehiclesView({ vehicles, selectedVehicle, onSelectVehicle }: VehiclesViewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <Card>
        <h2 className="text-xl font-semibold text-white">Fleet inventory</h2>
        <div className="mt-4 space-y-3">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                selectedVehicle?.id === vehicle.id ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-white">{vehicle.vehicleNumber}</div>
                  <div className="text-xs text-slate-400">{vehicle.registrationNumber}</div>
                </div>
                <Badge status={vehicle.status}>{vehicle.status}</Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        {selectedVehicle ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Vehicle detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedVehicle.vehicleNumber}</h2>
              </div>
              <Badge status={selectedVehicle.status}>{selectedVehicle.status}</Badge>
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
                <div key={String(label)} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{String(label)}</div>
                  <div className="mt-2 text-sm font-medium text-slate-100">{String(value)}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
}
