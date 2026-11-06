// import Link from "next/link";
// import { Landmark, Menu } from "lucide-react";

// export function SiteHeader() {
//   return <header className="site-header">
//     <div className="container nav-wrap">
//       <Link href="/" className="brand" aria-label="Bachat Khata home">
// <img
//   src="/logo.jpeg"
//   alt="Bachat Khata Logo"
//   width={40}
//   height={40}
// />        <span className="brand-mark"><Landmark size={23}/></span>  
//         <span><strong>Bachat Khata</strong><small>Saving together, growing together</small></span>
//       </Link>
//       <nav className="main-nav" aria-label="Main navigation">
//         <Link href="/about">About</Link>
//         <Link href="/members">Members</Link>
//         <Link href="/contact">Contact</Link>
//       </nav>
//     </div>
//   </header>;
// }


// import Link from "next/link";

// export function SiteHeader() {
//   return (
//     <header className="site-header">
//       <div className="container nav-wrap">
//         <Link href="/" className="brand" aria-label="Bachat Khata home">
//           <img
//             src="/logo/logo2.png"
//             alt="Bachat Khata Logo"
//             width={50}
//             height={50}
//             style={{
//               objectFit: "contain",
//               borderRadius: "55%",
//             }}
//           />
//        <span>
//   <strong>Shree Pashupati Yuwa Bachat Samuha</strong>
//   <small>Saving together, growing together</small>
// </span>
// </Link>

//         <nav className="main-nav" aria-label="Main navigation">
//           <Link href="/about">About</Link>
//           <Link href="/members">Members</Link>
//           <Link href="/contact">Contact</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">

        <Link href="/" className="brand" aria-label="Home" onClick={closeMenu}>
          <img
            src="/logo/logo2.png"
            alt="Shree Pashupati Yuva Bachat Samuha Logo"
          />

          <span>
            <strong>Shree Pashupati Yuva Bachat Samuha</strong>
            <small>Saving together, growing together</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/members" onClick={closeMenu}>Members</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

      </div>
    </header>
  );
}

