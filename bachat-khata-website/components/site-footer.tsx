import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><div className="footer-brand">Bachat Khata</div>
        <p>A community built on trust, consistency and the habit of saving together.</p>
      </div>
      <div><h3>Quick links</h3><Link href="/about">About</Link><Link href="/members">Members</Link><Link href="/contact">Contact us</Link></div>
      <div><h3>Get in touch</h3>
        <p><Mail size={16}/> <a href="mailto:hello@bachatkhata.com">hello@bachatkhata.com</a></p>
        <p><Phone size={16}/> <a href="tel:+9779800000000">+977 9800000000</a></p>
        <p><MapPin size={16}/> Nepal</p>
      </div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Bachat Khata. All rights reserved.</span><span>Made with trust & togetherness.</span></div>
  </footer>;
}
