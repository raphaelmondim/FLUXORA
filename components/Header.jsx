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