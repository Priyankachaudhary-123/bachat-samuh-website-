import Link from "next/link";
import { Landmark, Menu } from "lucide-react";

export function SiteHeader() {
  return <header className="site-header">
    <div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="Bachat Khata home">
        <span className="brand-mark"><Landmark size={23}/></span>
        <span><strong>Bachat Khata</strong><small>Saving together, growing together</small></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/about">About</Link>
        <Link href="/members">Members</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  </header>;
}
