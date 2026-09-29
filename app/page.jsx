"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Menu,
  X,
  CheckCircle2,
  Boxes,
  ArrowDownUp,
  SearchCheck,
  BarChart3,
  Workflow,
  PackageSearch,
  ClipboardList,
  BellRing,
  PieChart,
  ArrowRightLeft,
  LayoutGrid,
} from "lucide-react";
import {
  Button,
  buttonVariants,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

const NAV_LINKS = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#recursos", label: "Recursos" },
  { href: "#numeros", label: "Painel" },
  { href: "#contato", label: "Contato" },
];

const VANTAGENS = [
  { icon: Boxes, title: "Cada material no seu lugar", description: "Metais, polímeros, químicos e embalagens, todos com código, unidade e estoque mínimo definidos já no cadastro.", span: "lg:col-span-3", dark: true },
  { icon: ArrowDownUp, title: "Movimentação sem furos", description: "Entrou, saiu, ficou registrado. O sistema barra qualquer retirada maior que o saldo.", span: "lg:col-span-3" },
  { icon: SearchCheck, title: "A falta aparece sozinha", description: "A situação de cada item é calculada pela quantidade e pelo mínimo, sem planilha.", span: "lg:col-span-2" },
  { icon: BarChart3, title: "Números que não ficam velhos", description: "Indicadores e gráficos acompanham cada movimentação assim que ela acontece.", span: "lg:col-span-2" },
  { icon: Workflow, title: "Compras e produção alinhadas", description: "Quem compra e quem produz enxergam a mesma informação, antes da linha parar.", span: "lg:col-span-2" },
];

const RECURSOS = [
  { icon: LayoutGrid, title: "Cadastro de materiais", description: "Código, categoria, unidade e níveis de estoque em um só registro." },
  { icon: PieChart, title: "Visão geral do estoque", description: "Cartões e gráficos que se atualizam a cada alteração." },
  { icon: PackageSearch, title: "Busca instantânea", description: "Ache por nome ou código e refine por categoria e situação." },
  { icon: ArrowRightLeft, title: "Entradas e saídas", description: "Lançamentos com conferência de saldo, sem risco de ficar negativo." },
  { icon: BellRing, title: "Sinalização de risco", description: "Itens com estoque baixo ou zerado ganham destaque na hora." },
  { icon: ClipboardList, title: "Panorama por categoria", description: "Veja como os materiais se distribuem entre os quatro grupos." },
];

const AREAS_DE_INTERESSE = ["Produção", "Compras / Suprimentos", "Qualidade", "TI", "Direção / Gestão"];

function Mark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 2 28 9v14L16 30 4 23V9z" fill="hsl(var(--ink))" />
      <path d="M9 19c3.5 0 3.5-6 7-6s3.5 6 7 6" stroke="hsl(var(--copper))" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="9.5" r="1.8" fill="hsl(var(--copper))" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background/85 shadow-sm backdrop-blur">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <Mark />
            <span className="font-display text-lg font-semibold tracking-tight">Fluxora</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <Link href="/demo" className={`hidden rounded-full md:inline-flex ${buttonVariants({ size: "sm" })}`}>
            Ver na prática
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-border px-3 py-3 md:hidden">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm hover:bg-secondary">
                {l.label}
              </a>
            ))}
            <Link href="/demo" className={`mt-2 rounded-full ${buttonVariants()}`} onClick={() => setOpen(false)}>
              Ver na prática
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Hero() {
  const stats = [
    { label: "Materiais", value: "16" },
    { label: "Normais", value: "9", tone: "text-state-normal" },
    { label: "Em alerta", value: "4", tone: "text-state-low" },
    { label: "Zerados", value: "3", tone: "text-state-out" },
  ];
  const linhas = [
    { codigo: "MP-004", material: "Tubo de aço inox 304", classe: "bg-state-normal/10 text-state-normal", label: "Normal" },
    { codigo: "MP-009", material: "Ácido sulfúrico técnico", classe: "bg-state-low/10 text-state-low", label: "Estoque baixo" },
    { codigo: "MP-011", material: "Óleo lubrificante industrial", classe: "bg-state-out/10 text-state-out", label: "Sem estoque" },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-copper/15 blur-3xl" />
      <div className="container relative pb-8 pt-20 text-center md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          Gestão de estoque para a indústria
        </span>
        <h1 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Matéria-prima sob controle, do recebimento à linha de produção.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Registre o que entra, acompanhe o que sai e receba o aviso quando um material estiver perto do mínimo,
          tudo em um único lugar.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/demo" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
            Abrir a demonstração
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href="#contato" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full" })}>
            Conversar com a equipe
          </a>
        </div>
      </div>

      <div className="container relative pb-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-state-out/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-low/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-normal/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">fluxora / estoque</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="p-5 text-left">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`mt-1 font-display text-3xl font-semibold ${s.tone ?? "text-ink"}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {linhas.map((item) => (
              <li key={item.codigo} className="flex items-center justify-between px-5 py-3.5 text-left">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{item.codigo}</span>
                  <span className="text-sm">{item.material}</span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.classe}`}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Vantagens() {
  return (
    <section id="vantagens" className="border-t border-border bg-secondary/40">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-copper">Vantagens</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Menos improviso no almoxarifado, mais previsibilidade na fábrica
          </h2>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {VANTAGENS.map(({ icon: Icon, title, description, span, dark }) => (
            <div
              key={title}
              className={`${span} rounded-3xl border p-7 ${dark ? "border-ink bg-ink text-white" : "border-border bg-card"}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${dark ? "bg-copper text-white" : "bg-copper/10 text-copper"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recursos() {
  return (
    <section id="recursos" className="border-t border-border">
      <div className="container grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium text-copper">Recursos</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            O essencial para acompanhar o estoque, sem excesso
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Seis funções pensadas para o dia a dia de quem cuida de matéria-prima.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {RECURSOS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="border-t border-border py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-copper/30">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="h-5 w-5 text-copper" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numeros() {
  const stats = [
    { label: "Materiais cadastrados", value: "16" },
    { label: "Estoque normal", value: "9" },
    { label: "Estoque baixo", value: "4" },
    { label: "Sem estoque", value: "3" },
  ];
  const categorias = [
    { label: "Metais", valor: 62 },
    { label: "Polímeros", valor: 48 },
    { label: "Químicos", valor: 40 },
    { label: "Embalagens", valor: 34 },
  ];
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
              {stats.map((s) => (
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
              {categorias.map((c) => (
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

function LeadForm() {
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
          <SelectTrigger id="lead-area" className="rounded-xl">
            <SelectValue placeholder="Escolha uma área" />
          </SelectTrigger>
          <SelectContent>
            {AREAS_DE_INTERESSE.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {erro ? <p role="alert" className="text-sm text-destructive">{erro}</p> : null}
      <Button type="submit" size="lg" className="mt-1 w-full rounded-full">Quero ser contatado</Button>
      <p className="text-center text-xs text-muted-foreground">Formulário ilustrativo: nenhum dado é enviado a um servidor.</p>
    </form>
  );
}

function Contato() {
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
            {["Sem compromisso", "Resposta em até 1 dia útil", "Demonstração guiada com a sua equipe"].map((t) => (
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

function Footer() {
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
            <a href="#recursos" className="hover:text-white">Recursos</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#vantagens" className="hover:text-white">Vantagens</a>
            <a href="#contato" className="hover:text-white">Contato</a>
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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Vantagens />
        <Recursos />
        <Numeros />
        <Contato />
      </main>
      <Footer />
    </>
  );
}