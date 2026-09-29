import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { NUMEROS_STATS, NUMEROS_CATEGORIAS } from "@/data/home-content";

export function Numeros() {
  return (
    <section id="numeros" className="px-4 pb-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-copper-light">O painel</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Tudo o que entra e sai, numa só tela
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {NUMEROS_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-semibold text-copper-light">{s.value}</p>
                  <p className="mt-1 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/demo" className={buttonVariants({ variant: "copper", className: "mt-10 rounded-full" })}>
              Explorar a demonstração
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/60">Materiais por categoria</p>
            <div className="mt-5 space-y-5">
              {NUMEROS_CATEGORIAS.map((c) => (
                <div key={c.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{c.label}</span>
                    <span className="text-white/50">{c.valor}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-copper-light" style={{ width: `${c.valor}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}