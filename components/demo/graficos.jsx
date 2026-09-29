"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TOOLTIP_STYLE, EIXO_TICK } from "@/lib/demo-constants";

export function Graficos({ porCategoria, porSituacao }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Materiais por categoria</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Quantos itens existem em cada grupo</p>
        <div className="mt-4 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porCategoria} margin={{ left: -16 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="categoria" tickLine={false} axisLine={false} tick={EIXO_TICK} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} tick={EIXO_TICK} />
              <Tooltip cursor={{ fill: "hsl(var(--secondary))" }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="total" name="Materiais" fill="hsl(var(--copper))" radius={[10, 10, 0, 0]} maxBarSize={52} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Situação do estoque</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Normais, em alerta e zerados</p>
        <div className="mt-4 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Pie data={porSituacao} dataKey="total" nameKey="label" innerRadius={50} outerRadius={76} paddingAngle={4} cornerRadius={6} strokeWidth={0}>
                {porSituacao.map((entry) => <Cell key={entry.situacao} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {porSituacao.map((item) => (
            <li key={item.situacao} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.fill }} />
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-ink">{item.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}