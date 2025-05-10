import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import "./styles/Footer.css";
import DAV1 from "../images/dav.webp";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Logo and Contact Info */}
          <div className="footer-column">
            <a href="/" className="footer-logo">
              <img src={DAV1} alt="DAV PG College Logo" />
            </a>
            <address className="footer-contact-info">
              DAV PG College, Gorakhpur<br />
              Mobile: <a href="tel:+915513500218">+91-551-3500218</a><br />
              Email: <a href="mailto:principaldavpgc@gmail.com">principaldavpgc@gmail.com</a>
            </address>
            <div className="footer-social">
              <div className="footer-social-icons">
                <a href="/" aria-label="Facebook" className="footer-social-icon"><Facebook size={20} /></a>
                <a href="/" aria-label="Twitter" className="footer-social-icon"><Twitter size={20} /></a>
                <a href="/" aria-label="YouTube" className="footer-social-icon"><Youtube size={20} /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#">Facilities</a></li>
              <li><a href="/nonteaching">Non-Teaching Staff</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">RTI</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="footer-column">
            <h3>Useful Links</h3>
            <div className="footer-link-columns">
              <ul>
                <li><a href="http://ddugu.ac.in/defaulthome.aspx" target="_blank" rel="noreferrer">DDU Gorakhpur</a></li>
                <li><a href="https://www.ugc.gov.in/" target="_blank" rel="noreferrer">UGC</a></li>
                <li><a href="https://ndl.iitkgp.ac.in/" target="_blank" rel="noreferrer">NDL</a></li>
                <li><a href="https://nptel.ac.in/" target="_blank" rel="noreferrer">NPTEL</a></li>
                <li><a href="https://www.mooc.org/" target="_blank" rel="noreferrer">MOOCS</a></li>
              </ul>
              <ul>
                <li><a href="https://swayam.gov.in/" target="_blank" rel="noreferrer">SWAYAM</a></li>
                <li><a href="https://ncert.nic.in/" target="_blank" rel="noreferrer">NCERT</a></li>
                <li><a href="https://www.aicte-india.org/" target="_blank" rel="noreferrer">AICTE</a></li>
                <li><a href="https://aishe.gov.in/aishe/home" target="_blank" rel="noreferrer">AISHE</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Official Website of DAVPG College Gorakhpur | Best viewed in 1366×768 resolution. <br />
          © {new Date().getFullYear()} DAVPGC | Terms & Conditions | Privacy Policy | <br/>
          <br/>Powered by 
        <a
  href="https://bludgers.vercel.app/"
  style={{ color: '#e2f3ca', textDecoration: 'none' }}
  onMouseOver={(e) => (e.target.style.color = 'white')}
  onMouseOut={(e) => (e.target.style.color = '#24342')}
>
 - Bludgers
</a>


        </p>
      </div>
    </footer>
  );
}
