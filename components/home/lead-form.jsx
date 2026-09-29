"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Button, Input, Label,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui";
import { AREAS_DE_INTERESSE } from "@/data/home-content";

export function LeadForm() {
  const [campos, setCampos] = useState({ nome: "", email: "", empresa: "", area: "" });
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!campos.nome.trim() || !campos.email.includes("@") || !campos.empresa.trim() || !campos.area) {
      setErro("Preencha todos os campos com um e-mail válido.");
      return;
    }
    setErro("");
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-state-normal/10 px-6 py-14 text-center">
        <CheckCircle2 className="h-9 w-9 text-state-normal" />
        <p className="font-display text-lg font-semibold">Pedido enviado</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Em breve alguém da nossa equipe retorna o contato. Enquanto isso, que tal explorar a demonstração?
        </p>
        <Button variant="outline" size="sm" onClick={() => setEnviado(false)} className="mt-2 rounded-full">
          Enviar outro pedido
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="lead-nome">Seu nome</Label>
        <Input id="lead-nome" className="rounded-xl" value={campos.nome} onChange={(e) => setCampos({ ...campos, nome: e.target.value })} placeholder="Nome completo" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-email">E-mail de trabalho</Label>
        <Input id="lead-email" className="rounded-xl" type="email" value={campos.email} onChange={(e) => setCampos({ ...campos, email: e.target.value })} placeholder="voce@suaempresa.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-empresa">Empresa</Label>
        <Input id="lead-empresa" className="rounded-xl" value={campos.empresa} onChange={(e) => setCampos({ ...campos, empresa: e.target.value })} placeholder="Nome da sua indústria" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-area">Sua área</Label>
        <Select value={campos.area} onValueChange={(v) => setCampos({ ...campos, area: v })}>
          <SelectTrigger id="lead-area" className="rounded-xl"><SelectValue placeholder="Escolha uma área" /></SelectTrigger>
          <SelectContent>
            {AREAS_DE_INTERESSE.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {erro ? <p role="alert" className="text-sm text-destructive">{erro}</p> : null}
      <Button type="submit" size="lg" className="mt-1 w-full rounded-full">Quero ser contatado</Button>
      <p className="text-center text-xs text-muted-foreground">Formulário ilustrativo: nenhum dado é enviado a um servidor.</p>
    </form>
  );
}