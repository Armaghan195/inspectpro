import Link from "next/link"

export function Footer() {
  const links = [
    { name: "Documentation", href: "#docs" },
    { name: "GitHub", href: "#github" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="py-16 border-t border-border/30 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <Link href="/">
              <span className="text-xl font-sentient">InspectPro</span>
            </Link>
          </div>

          <nav className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-sm uppercase text-foreground/60 hover:text-foreground/100 transition-colors duration-150"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <p className="font-mono text-sm text-foreground/40">© 2025 InspectPro</p>
        </div>
      </div>
    </footer>
  )
}
