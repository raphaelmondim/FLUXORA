import { RECURSOS } from "@/data/home-content";

export function Recursos() {
  return (
    <section id="recursos" className="border-t border-border">
      <div className="container grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium text-copper">Recursos</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            O essencial para acompanhar o estoque, sem excesso
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Seis funções pensadas para o dia a dia de quem cuida de matéria-prima.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {RECURSOS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="border-t border-border py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-copper/30">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="h-5 w-5 text-copper" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}