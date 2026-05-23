import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, X, MoreHorizontal } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../../store/useStore';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
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

  const navLinks = [
    ['/', 'Home'], ['/category/women', 'Women'], ['/category/men', 'Men'],
    ['/category/resort', 'Resort Edit'], ['/category/classics', 'The Classics'],
    ['/collections', 'Collections'], ['/try-on', '✦ Virtual Try-On'],
    ['/category/sale', 'Sale'],
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input type="text" placeholder="Search the Entire Collection Here"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput} />
              <button type="submit" className={styles.searchBtn}>
                <Search size={15} strokeWidth={2} />
              </button>
            </form>
          </div>

          <Link to="/" className={styles.logo}>
            <div className={styles.logoInner}>
              <span className={styles.logoMain}>REGENT <span className={styles.logoAmp}>&</span> ROW</span>
              <span className={styles.logoSub}>Pure Linen</span>
            </div>
          </Link>

          <div className={styles.navRight}>
            <Link to="/account" className={styles.iconBtn} aria-label="Account"><User size={19} strokeWidth={1.8} /></Link>
            <button className={styles.iconBtn} onClick={() => navigate('/wishlist')} aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.8} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </button>
            <button className={styles.iconBtn} onClick={openCart} aria-label="Cart">
              <ShoppingCart size={19} strokeWidth={1.8} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
            <button className={styles.iconBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={19} strokeWidth={1.8} /> : <MoreHorizontal size={19} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {navLinks.map(([path, label]) => (
                <Link key={path} to={path} className={styles.dropdownLink} onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className={styles.catBar}>
        <div className={styles.catBarInner}>
          {[
            ['/category/women', 'Women'], ['/category/men', 'Men'],
            ['/category/resort', 'Resort Edit'], ['/category/classics', 'The Classics'],
            ['/collections', 'Collections'], ['/try-on', '✦ Try-On'],
            ['/category/sale', 'Sale'],
          ].map(([path, label]) => (
            <Link key={path} to={path}
              className={`${styles.catLink} ${label === 'Sale' ? styles.saleLink : ''} ${label.includes('Try-On') ? styles.tryonLink : ''}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
