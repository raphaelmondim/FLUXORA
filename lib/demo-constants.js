import { SITUACOES } from "@/lib/helpers";

export const TODAS = "todas";
export const UNIDADES = ["kg", "g", "L", "m", "m²", "un", "ton"];

export const CORES_SITUACAO = {
  [SITUACOES.NORMAL]: "hsl(var(--state-normal))",
  [SITUACOES.BAIXO]: "hsl(var(--state-low))",
  [SITUACOES.SEM_ESTOQUE]: "hsl(var(--state-out))",
};

export const BADGE_VARIANTE = {
  [SITUACOES.NORMAL]: "normal",
  [SITUACOES.BAIXO]: "baixo",
  [SITUACOES.SEM_ESTOQUE]: "semEstoque",
};

export const TOOLTIP_STYLE = { borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 };
export const EIXO_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 };