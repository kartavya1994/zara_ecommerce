import { Link } from 'react-router-dom';
import { Globe, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div>
              <h3>Join the Inner Circle</h3>
              <p>New arrivals, stories from linen country, and private sale access — for subscribers first.</p>
            </div>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <Link to="/" className={styles.logoWrap}>
                <span className={styles.logoMain}>Regent & Row</span>
                <span className={styles.logoSub}>Pure Linen</span>
              </Link>
              <p>Luxury linen clothing, thoughtfully made for the modern wardrobe. Rooted in India. Worn around the world.</p>
              <div className={styles.socials}>
                <a href="#" aria-label="Instagram" className={styles.socialLink}>Instagram</a>
                <a href="#" aria-label="Pinterest" className={styles.socialLink}>Pinterest</a>
                <a href="#" aria-label="LinkedIn" className={styles.socialLink}>LinkedIn</a>
              </div>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>
                <li><Link to="/category/women">Women</Link></li>
                <li><Link to="/category/men">Men</Link></li>
                <li><Link to="/category/resort">Resort Edit</Link></li>
                <li><Link to="/category/classics">The Classics</Link></li>
                <li><Link to="/collections">Collections</Link></li>
                <li><Link to="/category/sale">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping & Returns</Link></li>
                <li><Link to="/sizing">Size Guide</Link></li>
                <li><Link to="/care">Care Guide</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4>Our World</h4>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
                <li><Link to="/craft">The Craft of Linen</Link></li>
                <li><Link to="/try-on">Virtual Try-On</Link></li>
                <li><Link to="/stores">Flagship Store</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Regent & Row. All rights reserved.</p>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
