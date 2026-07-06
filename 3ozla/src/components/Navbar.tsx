import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 md:flex text-sm font-medium text-foreground/80">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <Link to="/community" className="hover:text-primary transition-colors">المجتمع</Link>
          <Link to="/booking" className="hover:text-primary transition-colors">الحجز</Link>
        </div>
        <Link
          to="/booking"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
        >
          احجز تذكرتك
        </Link>
      </nav>
    </header>
  );
}
