const App = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Bullet Trans Solutions
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Fleet Command Center
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Production-grade GPS fleet tracking and transport management for 164+ vehicles, real-time monitoring,
            route intelligence, and operational control center workflows.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total Vehicles', value: '164', accent: 'cyan' },
            { label: 'Moving', value: 'Dynamic', accent: 'emerald' },
            { label: 'Idle', value: 'Dynamic', accent: 'amber' },
            { label: 'Offline', value: 'Dynamic', accent: 'rose' },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className={`mt-4 text-3xl font-bold text-${card.accent}-400`}>{card.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Mission overview</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Real-time fleet visibility and route monitoring</li>
              <li>• Driver, vehicle, branch, and document lifecycle management</li>
              <li>• GPS ingestion, validation, and alerting pipeline</li>
              <li>• RBAC, audit logging, and secure backend APIs</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">System status</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">API</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">
                  Ready
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Database</span>
                <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-xs font-medium text-cyan-300">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">GPS</span>
                <span className="rounded-full bg-amber-500/15 px-2 py-1 text-xs font-medium text-amber-300">
                  Mock mode
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
