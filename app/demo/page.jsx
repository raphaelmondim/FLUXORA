"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Info,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  Plus,
  ArrowRightLeft,
  Search,
  PackageOpen,
  Circle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Button,
  buttonVariants,
  Input,
  Label,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { MATERIAIS_INICIAIS, CATEGORIAS } from "@/data/materiais";
import { SITUACOES, SITUACAO_LABEL, comSituacaoRecalculada } from "@/lib/helpers";

const TODAS = "todas";
const UNIDADES = ["kg", "g", "L", "m", "m²", "un", "ton"];
const CORES_SITUACAO = {
  [SITUACOES.NORMAL]: "hsl(var(--state-normal))",
  [SITUACOES.BAIXO]: "hsl(var(--state-low))",
  [SITUACOES.SEM_ESTOQUE]: "hsl(var(--state-out))",
};
const BADGE_VARIANTE = {
  [SITUACOES.NORMAL]: "normal",
  [SITUACOES.BAIXO]: "baixo",
  [SITUACOES.SEM_ESTOQUE]: "semEstoque",
};
const TOOLTIP_STYLE = { borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 };
const EIXO_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 };

/* Logo (igual ao da home) -------------------------------------------------- */
function Mark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 2 28 9v14L16 30 4 23V9z" fill="hsl(var(--ink))" />
      <path d="M9 19c3.5 0 3.5-6 7-6s3.5 6 7 6" stroke="hsl(var(--copper))" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="9.5" r="1.8" fill="hsl(var(--copper))" />
    </svg>
  );
}

/* Cabeçalho flutuante (igual ao da home) ------------------------------------ */
function Header() {
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background/85 shadow-sm backdrop-blur">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <Mark />
            <span className="font-display text-lg font-semibold tracking-tight">Fluxora</span>
          </Link>
          <Link
            href="/"
            className={`rounded-full ${buttonVariants({ size: "sm", variant: "outline" })}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a home
          </Link>
        </div>
      </div>
    </header>
  );
}

/* Rodapé (igual ao da home) -------------------------------------------------- */
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
            <Link href="/" className="hover:text-white">Página inicial</Link>
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

/* Badge de situação ---------------------------------------------------------- */
function SituacaoBadge({ situacao }) {
  return (
    <Badge variant={BADGE_VARIANTE[situacao]} className="rounded-full">
      <Circle className="h-2 w-2 fill-current" />
      {SITUACAO_LABEL[situacao]}
    </Badge>
  );
}

/* Dialog: cadastrar novo material -------------------------------------------- */
function CadastrarMaterialDialog({ codigosExistentes, onCadastrar }) {
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

/* Dialog: registrar entrada/saída ---------------------------------------------- */
function MovimentacaoDialog({ materiais, onMovimentar }) {
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
            <button
              type="button"
              onClick={() => setCampos({ ...campos, tipo: "entrada" })}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${campos.tipo === "entrada" ? "bg-ink text-white" : "text-muted-foreground"}`}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setCampos({ ...campos, tipo: "saida" })}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${campos.tipo === "saida" ? "bg-copper text-white" : "text-muted-foreground"}`}
            >
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

/* Página da demonstração --------------------------------------------------------- */
export default function DemoPage() {
  const [materiaisBase, setMateriaisBase] = useState(MATERIAIS_INICIAIS);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(TODAS);
  const [filtroSituacao, setFiltroSituacao] = useState(TODAS);
  const [feedback, setFeedback] = useState(null);

  // Base completa, com a situação SEMPRE recalculada. Cards e gráficos usam
  // esta lista inteira — os filtros afetam apenas a tabela.
  const materiais = useMemo(() => materiaisBase.map(comSituacaoRecalculada), [materiaisBase]);

  const materiaisFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return materiais.filter((m) => {
      const combinaBusca = termo === "" || m.material.toLowerCase().includes(termo) || m.codigo.toLowerCase().includes(termo);
      const combinaCategoria = filtroCategoria === TODAS || m.categoria === filtroCategoria;
      const combinaSituacao = filtroSituacao === TODAS || m.situacao === filtroSituacao;
      return combinaBusca && combinaCategoria && combinaSituacao;
    });
  }, [materiais, busca, filtroCategoria, filtroSituacao]);

  const totais = useMemo(() => ({
    total: materiais.length,
    normal: materiais.filter((m) => m.situacao === SITUACOES.NORMAL).length,
    baixo: materiais.filter((m) => m.situacao === SITUACOES.BAIXO).length,
    semEstoque: materiais.filter((m) => m.situacao === SITUACOES.SEM_ESTOQUE).length,
  }), [materiais]);

  const porCategoria = useMemo(
    () => CATEGORIAS.map((categoria) => ({ categoria, total: materiais.filter((m) => m.categoria === categoria).length })),
    [materiais]
  );

  const porSituacao = useMemo(
    () => Object.values(SITUACOES)
      .map((s) => ({ situacao: s, label: SITUACAO_LABEL[s], total: materiais.filter((m) => m.situacao === s).length, fill: CORES_SITUACAO[s] }))
      .filter((s) => s.total > 0),
    [materiais]
  );

  const filtrosAtivos = busca.trim() !== "" || filtroCategoria !== TODAS || filtroSituacao !== TODAS;

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  function handleCadastrar(novo) {
    setMateriaisBase((atual) => [...atual, novo]);
    setFeedback({ message: `${novo.material} cadastrado com sucesso.` });
  }

  function handleMovimentar({ codigo, tipo, quantidade }) {
    const material = materiaisBase.find((m) => m.codigo === codigo);
    setMateriaisBase((atual) =>
      atual.map((m) => (m.codigo === codigo ? { ...m, quantidade: tipo === "entrada" ? m.quantidade + quantidade : m.quantidade - quantidade } : m))
    );
    setFeedback({
      message: tipo === "entrada"
        ? `Entrada registrada: +${quantidade} ${material.unidade} em ${material.material}.`
        : `Saída registrada: -${quantidade} ${material.unidade} em ${material.material}.`,
    });
  }

  const indicadores = [
    { label: "Materiais cadastrados", value: totais.total, icon: Boxes },
    { label: "Estoque normal", value: totais.normal, icon: CheckCircle2 },
    { label: "Estoque baixo", value: totais.baixo, icon: AlertTriangle },
    { label: "Sem estoque", value: totais.semEstoque, icon: XCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Topo da página, no estilo do hero da home */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[820px] -translate-x-1/2 rounded-full bg-copper/15 blur-3xl" />
          <div className="container relative pb-10 pt-14 text-center md:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Info className="h-3.5 w-3.5 text-copper" />
              Ambiente de teste: todos os dados são inventados
            </span>
            <h1 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
              Estoque de matérias-primas
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Acompanhe os saldos, lance entradas e saídas e veja quem precisa de reposição.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CadastrarMaterialDialog codigosExistentes={materiais.map((m) => m.codigo)} onCadastrar={handleCadastrar} />
              <MovimentacaoDialog materiais={materiais} onMovimentar={handleMovimentar} />
            </div>
          </div>
        </section>

        <div className="container flex flex-col gap-6 pb-20">
          {feedback ? (
            <div role="status" className="flex items-start justify-between gap-3 rounded-2xl bg-state-normal/10 px-4 py-3 text-sm text-state-normal">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{feedback.message}</p>
              </div>
              <button type="button" onClick={() => setFeedback(null)} aria-label="Fechar aviso" className="opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {/* Indicadores: painel escuro, como a seção "O painel" da home */}
          <div className="rounded-[2rem] bg-ink px-6 py-8 text-white sm:px-10">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {indicadores.map(({ label, value, icon: Icon }) => (
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

          {/* Gráficos (sempre com a base completa, independente dos filtros) */}
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

          {/* Tabela em "janela", como o mockup do hero da home */}
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
                <Input id="busca-material" aria-label="Buscar por nome ou código" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou código (ex.: aço, MP-001)" className="rounded-full pl-10" />
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger id="filtro-categoria" aria-label="Categoria" className="rounded-full lg:w-52"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODAS}>Todas as categorias</SelectItem>
                  {CATEGORIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filtroSituacao} onValueChange={setFiltroSituacao}>
                <SelectTrigger id="filtro-situacao" aria-label="Situação" className="rounded-full lg:w-52"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODAS}>Todas as situações</SelectItem>
                  {Object.values(SITUACOES).map((s) => <SelectItem key={s} value={s}>{SITUACAO_LABEL[s]}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button type="button" variant="ghost" className="rounded-full" disabled={!filtrosAtivos} onClick={() => { setBusca(""); setFiltroCategoria(TODAS); setFiltroSituacao(TODAS); }}>
                <X className="h-4 w-4" />
                Limpar
              </Button>
            </div>

            {materiaisFiltrados.length === 0 ? (
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
                    {materiaisFiltrados.map((item) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
}