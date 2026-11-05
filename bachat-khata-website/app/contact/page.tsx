import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return <main className="inner-page">
    <section className="page-hero"><div className="container"><span className="eyebrow">We are here to connect</span><h1>Contact <em>us.</em></h1><p>Have a question or want to know more about Bachat Khata? Get in touch.</p></div></section>
    <section className="container contact-section">
      <div className="contact-card"><span className="contact-icon"><Mail/></span><h2>Email</h2><p>Send us your questions or feedback.</p><a href="mailto:spybs3@gmail.com"> spybs3@gmail.com</a></div>
      <div className="contact-card"><span className="contact-icon"><Phone/></span><h2>Phone</h2><p>We would be happy to hear from you.</p><a href="tel:+9779800000000">+977 9800000000</a></div>
      <div className="contact-card"><span className="contact-icon"><MapPin/></span><h2>Location</h2><p>Birgunj, Nepal</p><span className="contact-static">Connect with our team</span></div>
    </section>
  </main>;
}
