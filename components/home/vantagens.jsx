import { VANTAGENS } from "@/data/home-content";

export function Vantagens() {
  return (
    <section id="vantagens" className="border-t border-border bg-secondary/40">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-copper">Vantagens</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Menos improviso no almoxarifado, mais previsibilidade na fábrica
          </h2>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {VANTAGENS.map(({ icon: Icon, title, description, span, dark }) => (
            <div key={title} className={`${span} rounded-3xl border p-7 ${dark ? "border-ink bg-ink text-white" : "border-border bg-card"}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${dark ? "bg-copper text-white" : "bg-copper/10 text-copper"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}