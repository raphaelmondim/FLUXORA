import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { HERO_STATS, HERO_LINHAS } from "@/data/home-content";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-copper/15 blur-3xl" />
      <div className="container relative pb-8 pt-20 text-center md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          Gestão de estoque para a indústria
        </span>
        <h1 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Matéria-prima sob controle, do recebimento à linha de produção.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Registre o que entra, acompanhe o que sai e receba o aviso quando um material estiver perto do mínimo,
          tudo em um único lugar.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/demo" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
            Abrir a demonstração
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href="#contato" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full" })}>
            Conversar com a equipe
          </a>
        </div>
      </div>

      <div className="container relative pb-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-state-out/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-low/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-normal/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">fluxora / estoque</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border sm:grid-cols-4 sm:divide-y-0">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="p-5 text-left">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`mt-1 font-display text-3xl font-semibold ${s.tone ?? "text-ink"}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {HERO_LINHAS.map((item) => (
              <li key={item.codigo} className="flex items-center justify-between px-5 py-3.5 text-left">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{item.codigo}</span>
                  <span className="text-sm">{item.material}</span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.classe}`}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}