import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/home/lead-form";

const GARANTIAS = ["Sem compromisso", "Resposta em até 1 dia útil", "Demonstração guiada com a sua equipe"];

export function Contato() {
  return (
    <section id="contato" className="border-t border-border bg-secondary/40">
      <div className="container grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium text-copper">Contato</p>
          <h2 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Vamos olhar juntos para o seu estoque?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Conte um pouco sobre a sua operação e mostramos como a Fluxora pode organizar a rotina de matéria-prima da sua fábrica.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {GARANTIAS.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-copper" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}