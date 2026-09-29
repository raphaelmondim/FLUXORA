"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Button, Input, Label,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui";
import { CATEGORIAS } from "@/data/materiais";
import { UNIDADES } from "@/lib/demo-constants";

export function CadastrarMaterialDialog({ codigosExistentes, onCadastrar }) {
  const inicial = { codigo: "", material: "", categoria: "", unidade: "", quantidade: "", estoqueMinimo: "" };
  const [open, setOpen] = useState(false);
  const [campos, setCampos] = useState(inicial);
  const [erro, setErro] = useState("");

  function fechar() {
    setOpen(false);
    setCampos(inicial);
    setErro("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const codigo = campos.codigo.trim().toUpperCase();
    const nome = campos.material.trim();
    const quantidade = Number(campos.quantidade);
    const estoqueMinimo = Number(campos.estoqueMinimo);

    if (!codigo || !nome || !campos.categoria || !campos.unidade || campos.quantidade === "" || campos.estoqueMinimo === "") {
      setErro("Preencha todos os campos antes de cadastrar.");
      return;
    }
    if (codigosExistentes.includes(codigo)) {
      setErro(`Já existe um material com o código ${codigo}.`);
      return;
    }
    if (quantidade < 0 || estoqueMinimo < 0) {
      setErro("Quantidade e estoque mínimo não podem ser negativos.");
      return;
    }

    onCadastrar({ id: codigo, codigo, material: nome, categoria: campos.categoria, unidade: campos.unidade, quantidade, estoqueMinimo });
    fechar();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : fechar())}>
      <DialogTrigger asChild>
        <Button variant="copper" className="rounded-full">
          <Plus className="h-4 w-4" />
          Novo material
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Novo material</DialogTitle>
          <DialogDescription>Ele aparece na hora na tabela, nos indicadores e nos gráficos.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="novo-codigo">Código</Label>
              <Input id="novo-codigo" className="rounded-xl" value={campos.codigo} onChange={(e) => setCampos({ ...campos, codigo: e.target.value })} placeholder="MP-017" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="novo-unidade">Unidade</Label>
              <Select value={campos.unidade} onValueChange={(v) => setCampos({ ...campos, unidade: v })}>
                <SelectTrigger id="novo-unidade" className="rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {UNIDADES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="novo-material">Nome do material</Label>
            <Input id="novo-material" className="rounded-xl" value={campos.material} onChange={(e) => setCampos({ ...campos, material: e.target.value })} placeholder="Ex.: Chapa de aço galvanizado" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="novo-categoria">Categoria</Label>
            <Select value={campos.categoria} onValueChange={(v) => setCampos({ ...campos, categoria: v })}>
              <SelectTrigger id="novo-categoria" className="rounded-xl"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="novo-quantidade">Quantidade em estoque</Label>
              <Input id="novo-quantidade" className="rounded-xl" type="number" min="0" value={campos.quantidade} onChange={(e) => setCampos({ ...campos, quantidade: e.target.value })} placeholder="0" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="novo-minimo">Estoque mínimo</Label>
              <Input id="novo-minimo" className="rounded-xl" type="number" min="0" value={campos.estoqueMinimo} onChange={(e) => setCampos({ ...campos, estoqueMinimo: e.target.value })} placeholder="0" />
            </div>
          </div>
          {erro ? <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{erro}</p> : null}
          <DialogFooter>
            <Button type="button" variant="ghost" className="rounded-full" onClick={fechar}>Cancelar</Button>
            <Button type="submit" className="rounded-full">Salvar material</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}