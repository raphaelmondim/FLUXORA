import Link from "next/link";
import { Mark } from "@/components/brandmark/mark";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-white/70">
      <div className="container flex flex-col gap-8 pt-14 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white"><Mark className="h-7 w-7" /></span>
          <p className="max-w-xs text-sm">Controle de matéria-prima feito para a rotina da indústria.</p>
        </div>
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <Link href="/demo" className="hover:text-white">Demonstração</Link>
            <Link href="/#recursos" className="hover:text-white">Recursos</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/#vantagens" className="hover:text-white">Vantagens</Link>
            <Link href="/#contato" className="hover:text-white">Contato</Link>
          </div>
        </div>
      </div>
      <p className="mt-10 select-none text-center font-display text-[22vw] font-semibold leading-[0.8] tracking-tighter text-white/[0.06]">
        Fluxora
      </p>
      <div className="border-t border-white/10 py-4">
        <p className="container text-xs text-white/40">
          © {new Date().getFullYear()} Fluxora. Empresa e dados fictícios, apenas para demonstração.
        </p>
      </div>
    </footer>
  );
}