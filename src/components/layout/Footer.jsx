import { Link } from 'react-router-dom';
import { Globe, Share2, Play } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div>
              <h3>JOIN THE ZARR LIST</h3>
              <p>Be the first to know about new collections and exclusive offers.</p>
            </div>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="YOUR EMAIL ADDRESS" />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <h2 className={styles.logo}>ZARR</h2>
              <p>Fashion for the modern world. Quality, style, and sustainability.</p>
              <div className={styles.socials}>
                <a href="#" aria-label="Instagram"><Globe size={18} /></a>
                <a href="#" aria-label="Twitter"><Share2 size={18} /></a>
                <a href="#" aria-label="YouTube"><Play size={18} /></a>
              </div>
            </div>

            <div>
              <h4>COMPANY</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
                <li><Link to="/stores">Find a Store</Link></li>
              </ul>
            </div>

            <div>
              <h4>HELP</h4>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping & Returns</Link></li>
                <li><Link to="/sizing">Size Guide</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/track">Track Your Order</Link></li>
              </ul>
            </div>

            <div>
              <h4>COLLECTIONS</h4>
              <ul>
                <li><Link to="/category/woman">Woman</Link></li>
                <li><Link to="/category/man">Man</Link></li>
                <li><Link to="/category/kids">Kids</Link></li>
                <li><Link to="/category/home">Home</Link></li>
                <li><Link to="/category/sale">Sale</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} ZARR. All rights reserved.</p>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
