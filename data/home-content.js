import {
  Boxes, ArrowDownUp, SearchCheck, BarChart3, Workflow,
  PackageSearch, ClipboardList, BellRing, PieChart, ArrowRightLeft, LayoutGrid,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#recursos", label: "Recursos" },
  { href: "#numeros", label: "Painel" },
  { href: "#contato", label: "Contato" },
];

export const VANTAGENS = [
  { icon: Boxes, title: "Cada material no seu lugar", description: "Metais, polímeros, químicos e embalagens, todos com código, unidade e estoque mínimo definidos já no cadastro.", span: "lg:col-span-3", dark: true },
  { icon: ArrowDownUp, title: "Movimentação sem furos", description: "Entrou, saiu, ficou registrado. O sistema barra qualquer retirada maior que o saldo.", span: "lg:col-span-3" },
  { icon: SearchCheck, title: "A falta aparece sozinha", description: "A situação de cada item é calculada pela quantidade e pelo mínimo, sem planilha.", span: "lg:col-span-2" },
  { icon: BarChart3, title: "Números que não ficam velhos", description: "Indicadores e gráficos acompanham cada movimentação assim que ela acontece.", span: "lg:col-span-2" },
  { icon: Workflow, title: "Compras e produção alinhadas", description: "Quem compra e quem produz enxergam a mesma informação, antes da linha parar.", span: "lg:col-span-2" },
];

export const RECURSOS = [
  { icon: LayoutGrid, title: "Cadastro de materiais", description: "Código, categoria, unidade e níveis de estoque em um só registro." },
  { icon: PieChart, title: "Visão geral do estoque", description: "Cartões e gráficos que se atualizam a cada alteração." },
  { icon: PackageSearch, title: "Busca instantânea", description: "Ache por nome ou código e refine por categoria e situação." },
  { icon: ArrowRightLeft, title: "Entradas e saídas", description: "Lançamentos com conferência de saldo, sem risco de ficar negativo." },
  { icon: BellRing, title: "Sinalização de risco", description: "Itens com estoque baixo ou zerado ganham destaque na hora." },
  { icon: ClipboardList, title: "Panorama por categoria", description: "Veja como os materiais se distribuem entre os quatro grupos." },
];

export const AREAS_DE_INTERESSE = ["Produção", "Compras / Suprimentos", "Qualidade", "TI", "Direção / Gestão"];

export const HERO_STATS = [
  { label: "Materiais", value: "16" },
  { label: "Normais", value: "9", tone: "text-state-normal" },
  { label: "Em alerta", value: "4", tone: "text-state-low" },
  { label: "Zerados", value: "3", tone: "text-state-out" },
];

export const HERO_LINHAS = [
  { codigo: "MP-004", material: "Tubo de aço inox 304", classe: "bg-state-normal/10 text-state-normal", label: "Normal" },
  { codigo: "MP-009", material: "Ácido sulfúrico técnico", classe: "bg-state-low/10 text-state-low", label: "Estoque baixo" },
  { codigo: "MP-011", material: "Óleo lubrificante industrial", classe: "bg-state-out/10 text-state-out", label: "Sem estoque" },
];

export const NUMEROS_STATS = [
  { label: "Materiais cadastrados", value: "16" },
  { label: "Estoque normal", value: "9" },
  { label: "Estoque baixo", value: "4" },
  { label: "Sem estoque", value: "3" },
];

export const NUMEROS_CATEGORIAS = [
  { label: "Metais", valor: 62 },
  { label: "Polímeros", valor: 48 },
  { label: "Químicos", valor: 40 },
  { label: "Embalagens", valor: 34 },
];