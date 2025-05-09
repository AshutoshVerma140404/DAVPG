import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import "./styles/Footer.css";

export default function Footer() {


  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Column 1: Logo and Contact */}
          <div className="footer-column">
            <div className="footer-logo">
              <a href="/">
                <img src="/assets/img/logo1.jpg" className="img-fluid" alt="logo" />
              </a>
            </div>
            <div className="footer-contact-info">
              <p style={{ textAlign: "justify" }}>
                DAV PG College, Gorakhpur<br />
                Mobile Number: +91-551-3500218<br />
                Email: <a href="mailto:principaldavpgc@gmail.com">principaldavpgc@gmail.com</a>
              </p>
            </div>
            <div className="footer-social">
              <div className="footer-social-icons">
                <a href="/" aria-label="Facebook" className="footer-social-icon"><Facebook size={20} /></a>
                <a href="/" aria-label="Twitter" className="footer-social-icon"><Twitter size={20} /></a>
                <a href="/" aria-label="YouTube" className="footer-social-icon"><Youtube size={20} /></a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="/"><span className="footer-list-dot" />Home</a></li>
              <li><a href="#"><span className="footer-list-dot" />Facilities</a></li>
              <li><a href="/nonteaching"><span className="footer-list-dot" />Non-Teaching Staff</a></li>
              <li><a href="#"><span className="footer-list-dot" />Courses</a></li>
              <li><a href="#"><span className="footer-list-dot" />RTI</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Useful Links</h3>
            <ul className="footer-list">
              <li><a href="http://ddugu.ac.in/defaulthome.aspx" target="_blank" rel="noreferrer"><span className="footer-list-dot" />DDU Gorakhpur</a></li>
              <li><a href="https://www.ugc.gov.in/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />UGC</a></li>
              <li><a href="https://ndl.iitkgp.ac.in/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />NDL</a></li>
              <li><a href="https://nptel.ac.in/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />NPTEL</a></li>
              <li><a href="https://www.mooc.org/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />MOOCS</a></li>
              <li><a href="https://swayam.gov.in/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />SWAYAM</a></li>
              <li><a href="https://ncert.nic.in/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />NCERT</a></li>
              <li><a href="https://www.aicte-india.org/" target="_blank" rel="noreferrer"><span className="footer-list-dot" />AICTE</a></li>
              <li><a href="https://aishe.gov.in/aishe/home" target="_blank" rel="noreferrer"><span className="footer-list-dot" />AISHE</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p style={{ textAlign: "center" }}>
            This is the official Website of DAVPG College Gorakhpur. | Best viewed in 1366×768 pixel resolution. <br />
            Copyright Statement | Hyperlinking Policy | Terms & Conditions | Privacy Policy | Disclaimer | Powered By RS Infotech
          </p>
        </div>
      </div>
    </footer>
  );
}
