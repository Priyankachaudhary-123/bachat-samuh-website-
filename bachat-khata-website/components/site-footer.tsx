// import Link from "next/link";
// import { Mail, Phone, MapPin } from "lucide-react";

// export function SiteFooter() {
//   return <footer className="site-footer">
//     <div className="container footer-grid">
//       <div><div className="footer-brand">Bachat Samuha</div>
//         <p>A community built on trust, consistency and the habit of saving together.</p>
//       </div>
//       <div><h3>Quick links</h3><Link href="/about">About</Link><Link href="/members">Members</Link><Link href="/contact">Contact us</Link></div>
//       <div><h3>Get in touch</h3>
//         <p><Mail size={16}/> <a href="mailto:hello@bachatkhata.com">hello@bachatkhata.com</a></p>
//         <p><Phone size={16}/> <a href="tel:+9779800000000">+977 9800000000</a></p>
//         <p><MapPin size={16}/> Nepal</p>
//       </div>
//     </div>
//     <div className="container footer-bottom"><span>© {new Date().getFullYear()} Bachat Samuha. All rights reserved.</span><span>Made with trust & togetherness.</span></div>
//   </footer>;
// }


// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Instagram,
// } from "lucide-react";

// export function SiteFooter() {
//   return (
//     <footer className="site-footer">
//       <div className="container footer-grid">

//         <div>
//           <div className="footer-brand">Bachat Samuha</div>
//           <p>
//             A community built on trust, consistency
//             and the habit of saving together.
//           </p>
//         </div>

//         <div>
//           <h3>Quick links</h3>
//           <Link href="/about">About</Link>
//           <Link href="/members">Members</Link>
//           <Link href="/contact">Contact us</Link>
//         </div>

//         <div>
//           <h3>Get in touch</h3>
//           <p>
//             <Mail size={16} />
//             <a href="mailto:hello@bachatkhata.com">
//               hello@bachatkhata.com
//             </a>
//           </p>
//           <p>
//             <Phone size={16} />
//             <a href="tel:+9779800000000">
//               +977 9800000000
//             </a>
//           </p>
//           <p>
//             <MapPin size={16} /> Nepal
//           </p>
//         </div>

//         {/* Social Media Links */}
//         <div className="footer-social">
//           <h3>Follow Us</h3>

//           <div className="social-icons">
//             <a
//               href="https://www.facebook.com/YOUR_PAGE"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//             >
//               <Facebook size={21} />
//             </a>

//             <a
//               href="https://www.instagram.com/YOUR_USERNAME"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//             >
//               <Instagram size={21} />
//             </a>
//           </div>
//         </div>

//       </div>

//       <div className="container footer-bottom">
//         <span>
//           © {new Date().getFullYear()} Bachat Samuha.
//           All rights reserved.
//         </span>
//         <span>Made with trust & togetherness.</span>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-column">
          <div className="footer-brand">Bachat Samuha</div>
          <p>
            A community built on trust, consistency
            and the habit of saving together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link href="/about">About</Link>
          <Link href="/members">Members</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Get in Touch</h3>

          <p>
            <Mail size={15} />
            <a href="mailto:hello@bachatkhata.com">
              hello@bachatkhata.com
            </a>
          </p>

          <p>
            <Phone size={15} />
            <a href="tel:+9779800000000">
              +977 9800000000
            </a>
          </p>

          <p>
            <MapPin size={15} /> Nepal
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/YOUR_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={19} />
            </a>

            <a
              href="https://www.instagram.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>
          </div>
        </div>

      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Bachat Samuha.
          All rights reserved.
        </span>

        <span>Made with trust & togetherness.</span>
      </div>
    </footer>
  );
}

