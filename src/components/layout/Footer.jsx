import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>

        {/* LEFT: Address + Contact + Social */}
        <div className={styles.colLeft}>
          <div className={styles.addressBlock}>
            <div className={styles.addressRow}>
              <span className={styles.icon}>📍</span>
              <div>
                <p>221B Maple Grove Avenue</p>
                <p>Westfield Heights</p>
                <p>Austin, TX 78704</p>
                <p>United States</p>
              </div>
            </div>
            <div className={styles.addressRow}>
              <span className={styles.icon}>📞</span>
              <p>01-012-123456</p>
            </div>
            <div className={styles.addressRow}>
              <span className={styles.icon}>✉</span>
              <p>contact@regent&amp;row.com</p>
            </div>
          </div>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* CENTER: How can we Help YOU */}
        <div className={styles.colCenter}>
          <h4 className={styles.colHeading}>How can we Help YOU</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contact">Reach Out to Us</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/faq">F.A.Q</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/returns">Returns | Refunds | Cancellation</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Condition</Link></li>
          </ul>
        </div>

        {/* RIGHT: Online Shop */}
        <div className={styles.colRight}>
          <h4 className={styles.colHeading}>online SHOP</h4>
          <ul>
            <li><Link to="/category/women">Topwear</Link></li>
            <li><Link to="/category/men">Bottomwear</Link></li>
            <li><Link to="/category/classics">Outer</Link></li>
            <li><Link to="/collections">Linen Collection</Link></li>
            <li><Link to="/category/resort">summer Edition</Link></li>
            <li><Link to="/stores">Offline Stores</Link></li>
          </ul>
        </div>

        {/* LOGO */}
        <div className={styles.colLogo}>
          <Link to="/" className={styles.logoMark}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M30 12C30 12 12 28 15 46C17 57 27 65 40 65" stroke="var(--navy)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
              <path d="M40 65C53 65 63 57 65 46C68 28 50 12 50 12" stroke="var(--navy)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
              <path d="M25 32C25 32 32 46 40 50C48 46 55 32 55 32" stroke="var(--navy)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
              <path d="M33 50C33 58 36 64 40 65C44 64 47 58 47 50" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </Link>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Regent & Row. All rights reserved.</p>
      </div>
    </footer>
  );
}
