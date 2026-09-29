import { PackageOpen, Search, X } from "lucide-react";
import {
  Button, Input,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui";
import { CATEGORIAS } from "@/data/materiais";
import { SITUACOES, SITUACAO_LABEL } from "@/lib/helpers";
import { TODAS } from "@/lib/demo-constants";
import { SituacaoBadge } from "@/components/demo/situacao-badge";

export function MateriaisPanel({ materiais, filtros, onBusca, onCategoria, onSituacao, onLimpar }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-state-out/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-state-low/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-state-normal/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">fluxora / estoque</span>
      </div>

      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="busca-material" aria-label="Buscar por nome ou código" value={filtros.busca} onChange={(e) => onBusca(e.target.value)} placeholder="Buscar por nome ou código (ex.: aço, MP-001)" className="rounded-full pl-10" />
        </div>
        <Select value={filtros.categoria} onValueChange={onCategoria}>
          <SelectTrigger id="filtro-categoria" aria-label="Categoria" className="rounded-full lg:w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={TODAS}>Todas as categorias</SelectItem>
            {CATEGORIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filtros.situacao} onValueChange={onSituacao}>
          <SelectTrigger id="filtro-situacao" aria-label="Situação" className="rounded-full lg:w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={TODAS}>Todas as situações</SelectItem>
            {Object.values(SITUACOES).map((s) => <SelectItem key={s} value={s}>{SITUACAO_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button type="button" variant="ghost" className="rounded-full" disabled={!filtros.ativos} onClick={onLimpar}>
          <X className="h-4 w-4" />
          Limpar
        </Button>
      </div>

      {materiais.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <PackageOpen className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-display text-base font-medium text-ink">Nada encontrado por aqui</p>
            <p className="mt-1 text-sm text-muted-foreground">Mude a busca ou os filtros para ver outros materiais.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-right">Em estoque</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead>Situação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materiais.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{item.codigo}</TableCell>
                  <TableCell className="font-medium text-ink">{item.material}</TableCell>
                  <TableCell className="text-muted-foreground">{item.categoria}</TableCell>
                  <TableCell className="text-muted-foreground">{item.unidade}</TableCell>
                  <TableCell className="text-right tabular-nums">{item.quantidade}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">{item.estoqueMinimo}</TableCell>
                  <TableCell><SituacaoBadge situacao={item.situacao} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}