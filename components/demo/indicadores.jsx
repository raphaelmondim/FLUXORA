import { Boxes, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function Indicadores({ totais }) {
  const itens = [
    { label: "Materiais cadastrados", value: totais.total, icon: Boxes },
    { label: "Estoque normal", value: totais.normal, icon: CheckCircle2 },
    { label: "Estoque baixo", value: totais.baixo, icon: AlertTriangle },
    { label: "Sem estoque", value: totais.semEstoque, icon: XCircle },
  ];
  return (
    <div className="rounded-[2rem] bg-ink px-6 py-8 text-white sm:px-10">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {itens.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-4xl font-semibold text-copper-light">{value}</p>
              <p className="mt-1 text-sm text-white/60">{label}</p>
            </div>
            <Icon className="h-5 w-5 text-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}