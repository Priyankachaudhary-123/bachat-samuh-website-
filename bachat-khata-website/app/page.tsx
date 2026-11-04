import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Wallet } from "lucide-react";

export default function HomePage() {
  return <main>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">A community savings group</span>
          <h1>Small savings.<br/><em>Stronger futures.</em></h1>
          <p className="lead">Together, we build a habit of saving, support one another and move towards a more secure tomorrow.</p>
          <Link className="button button-primary" href="/members">Meet our members <ArrowRight size={17}/></Link>
          <div className="trust-line"><ShieldCheck size={17}/> Built on trust, unity and shared commitment</div>
        </div>
        <div className="hero-art">
          <div className="hero-circle"><Wallet size={78} strokeWidth={1.15}/></div>
          <div className="floating-note"><span className="note-dot"/> Growing together, every month</div>
          <div className="hero-caption">A little saved today<br/><strong>can mean a lot tomorrow.</strong></div>
        </div>
      </div>
    </section>
    <section className="values-section">
      <div className="container value-grid">
        <div><span className="value-icon"><Wallet/></span><h3>Save consistently</h3><p>Build a healthy saving habit through regular contributions.</p></div>
        <div><span className="value-icon"><Users/></span><h3>Grow together</h3><p>Stay connected as a group and encourage one another.</p></div>
        <div><span className="value-icon"><ShieldCheck/></span><h3>Trust & transparency</h3><p>Keep communication clear and the community strong.</p></div>
      </div>
    </section>
    <section className="leader-section">
      <div className="container leader-grid">
        <div className="leader-photo">
          <div className="photo-placeholder"><Users size={58}/><span>Client / CEO photo</span></div>
          <span className="photo-label">Leadership</span>
        </div>
        <div className="leader-copy">
          <span className="eyebrow">A note from our leadership</span>
          <h2>Building a future through <em>togetherness.</em></h2>
          <p>Bachat Khata is guided by a simple belief: when people come together with discipline and trust, small steps can create meaningful progress.</p>
          <p>Our goal is to create a supportive community where every member feels valued and every contribution matters.</p>
          <div className="leader-name"><strong>Client Full Name</strong><span>Founder / CEO</span></div>
          <Link href="/about" className="text-link">Learn more about us <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
    <section className="closing-cta"><div className="container cta-inner"><div><span className="eyebrow">Our community</span><h2>Meet the people behind Bachat Khata.</h2></div><Link href="/members" className="button button-light">View all members <ArrowRight size={17}/></Link></div></section>
  </main>;
}
