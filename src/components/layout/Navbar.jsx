import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, X, MoreHorizontal } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '../../store/useStore';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { openCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          {/* LEFT: Search */}
          <div className={styles.navLeft}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search the Entire Collection Here"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>
                <Search size={16} strokeWidth={2} />
              </button>
            </form>
          </div>

          {/* CENTER: Logo */}
          <Link to="/" className={styles.logo}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C24 4 10 14 10 26C10 33 16 38 24 38C32 38 38 33 38 26C38 14 24 4 24 4Z" fill="var(--navy)" opacity="0.15"/>
              <path d="M18 8C18 8 8 18 10 28C11 34 17 40 24 40" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M24 40C31 40 37 34 38 28C40 18 30 8 30 8" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M16 20C16 20 20 28 24 30C28 28 32 20 32 20" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </Link>

          {/* RIGHT: Icons */}
          <div className={styles.navRight}>
            <Link to="/account" className={styles.iconBtn} aria-label="Account">
              <User size={20} strokeWidth={1.8} />
            </Link>
            <button className={`${styles.iconBtn} ${styles.wishlistBtn}`} onClick={() => navigate('/wishlist')} aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.8} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </button>
            <button className={`${styles.iconBtn} ${styles.cartBtn}`} onClick={openCart} aria-label="Cart">
              <ShoppingCart size={20} strokeWidth={1.8} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
            <button className={styles.iconBtn} onClick={() => setMobileOpen(!mobileOpen)} aria-label="More">
              <MoreHorizontal size={20} strokeWidth={1.8} />
            </button>
          </div>
        </nav>

        {/* Mobile/dropdown menu */}
        {mobileOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {[
                ['/', 'Home'],
                ['/category/women', 'Women'],
                ['/category/men', 'Men'],
                ['/category/resort', 'Resort Edit'],
                ['/category/classics', 'The Classics'],
                ['/collections', 'Collections'],
                ['/try-on', 'Virtual Try-On'],
                ['/category/sale', 'Sale'],
              ].map(([path, label]) => (
                <Link key={path} to={path} className={styles.dropdownLink} onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Top nav category bar */}
      <div className={styles.catBar}>
        <div className={styles.catBarInner}>
          {[
            ['/category/women', 'Women'],
            ['/category/men', 'Men'],
            ['/category/resort', 'Resort Edit'],
            ['/category/classics', 'The Classics'],
            ['/collections', 'Collections'],
            ['/try-on', '✦ Virtual Try-On'],
            ['/category/sale', 'Sale'],
          ].map(([path, label]) => (
            <Link key={path} to={path} className={`${styles.catLink} ${label === 'Sale' ? styles.saleLink : ''}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
