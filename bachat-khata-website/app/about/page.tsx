import { HeartHandshake, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return <main className="inner-page">
    <section className="page-hero"><div className="container"><span className="eyebrow">Who we are</span><h1>About <em>Bachat Khata</em></h1><p>A community shaped by trust, shared responsibility and the power of saving together.</p></div></section>
    <section className="container about-content">
      <div className="about-intro"><span className="large-icon"><HeartHandshake/></span><div><h2>Our story</h2><p>Bachat Khata brings people together around a simple, meaningful practice: saving regularly and supporting one another. We believe that consistency, honest communication and collective responsibility can help create a stronger financial future.</p></div></div>
      <div className="about-cards">
        <article><Target/><h3>Our mission</h3><p>Encourage regular saving and build a dependable, supportive community.</p></article>
        <article><Eye/><h3>Our vision</h3><p>A financially aware community where people grow through unity and mutual trust.</p></article>
      </div>
      <div className="about-note"><strong>Our values</strong><p>Trust · Transparency · Discipline · Respect · Togetherness</p></div>
    </section>
  </main>;
}
