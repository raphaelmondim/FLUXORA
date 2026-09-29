"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import {
  Button, Input, Label,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui";

export function MovimentacaoDialog({ materiais, onMovimentar }) {
  const inicial = { codigo: "", tipo: "entrada", quantidade: "" };
  const [open, setOpen] = useState(false);
  const [campos, setCampos] = useState(inicial);
  const [erro, setErro] = useState("");
  const material = materiais.find((m) => m.codigo === campos.codigo);

  function fechar() {
    setOpen(false);
    setCampos(inicial);
    setErro("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!material) {
      setErro("Selecione o material que terá o estoque movimentado.");
      return;
    }
    const quantidade = Number(campos.quantidade);
    if (campos.quantidade === "" || Number.isNaN(quantidade) || quantidade <= 0) {
      setErro("A quantidade deve ser maior que zero.");
      return;
    }
    if (campos.tipo === "saida" && quantidade > material.quantidade) {
      setErro(`Saldo insuficiente: ${material.material} tem apenas ${material.quantidade} ${material.unidade}.`);
      return;
    }
    onMovimentar({ codigo: material.codigo, tipo: campos.tipo, quantidade });
    fechar();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : fechar())}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <ArrowRightLeft className="h-4 w-4" />
          Lançar movimentação
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Lançar movimentação</DialogTitle>
          <DialogDescription>Entrada soma ao estoque, saída subtrai. A situação do item é atualizada na hora.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="mov-material">Material</Label>
            <Select value={campos.codigo} onValueChange={(v) => setCampos({ ...campos, codigo: v })}>
              <SelectTrigger id="mov-material" className="rounded-xl"><SelectValue placeholder="Escolha um material" /></SelectTrigger>
              <SelectContent>
                {materiais.map((m) => <SelectItem key={m.codigo} value={m.codigo}>{m.codigo} — {m.material}</SelectItem>)}
              </SelectContent>
            </Select>
            {material ? <p className="text-xs text-muted-foreground">Saldo atual: {material.quantidade} {material.unidade}</p> : null}
          </div>
          <div className="grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
            <button type="button" onClick={() => setCampos({ ...campos, tipo: "entrada" })}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${campos.tipo === "entrada" ? "bg-ink text-white" : "text-muted-foreground"}`}>
              Entrada
            </button>
            <button type="button" onClick={() => setCampos({ ...campos, tipo: "saida" })}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${campos.tipo === "saida" ? "bg-copper text-white" : "text-muted-foreground"}`}>
              Saída
            </button>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="mov-quantidade">Quantidade</Label>
            <Input id="mov-quantidade" className="rounded-xl" type="number" min="1" value={campos.quantidade} onChange={(e) => setCampos({ ...campos, quantidade: e.target.value })} placeholder="0" />
          </div>
          {erro ? <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{erro}</p> : null}
          <DialogFooter>
            <Button type="button" variant="ghost" className="rounded-full" onClick={fechar}>Cancelar</Button>
            <Button type="submit" className="rounded-full">Confirmar lançamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}