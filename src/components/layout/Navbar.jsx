import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Menu, X, User } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '../../store/useStore';
import { categories } from '../../data/products';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { searchOpen, mobileMenuOpen, toggleSearch, closeSearch, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const { openCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.topBar}>
          <span>Complimentary shipping on orders over ₹3,000 &nbsp;·&nbsp; Worldwide delivery available</span>
        </div>
        <nav className={styles.nav}>
          <button className={styles.iconBtn} onClick={toggleMobileMenu} aria-label="Menu">
            {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>

          <div className={styles.navLinks}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.id === 'themes' ? '/collections' : `/category/${cat.slug}`}
                className={`${styles.navLink} ${cat.id === 'sale' ? styles.saleLink : ''}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <Link to="/" className={styles.logo}>
            <span className={styles.logoMain}>Regent & Row</span>
            <span className={styles.logoSub}>Pure Linen</span>
          </Link>

          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={toggleSearch} aria-label="Search">
              <Search size={17} strokeWidth={1.5} />
            </button>
            <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <Heart size={17} strokeWidth={1.5} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>
            <Link to="/account" className={styles.iconBtn} aria-label="Account">
              <User size={17} strokeWidth={1.5} />
            </Link>
            <button className={styles.iconBtn} onClick={openCart} aria-label="Cart">
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
          </div>
        </nav>
      </header>

      {searchOpen && (
        <div className={styles.searchOverlay} onClick={closeSearch}>
          <div className={styles.searchBox} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <Search size={16} strokeWidth={1.5} />
              <input autoFocus type="text" placeholder="Search linen pieces..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button type="button" onClick={closeSearch}><X size={16} /></button>
            </form>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            {categories.map(cat => (
              <Link key={cat.id}
                to={cat.id === 'themes' ? '/collections' : `/category/${cat.slug}`}
                className={`${styles.mobileNavLink} ${cat.id === 'sale' ? styles.saleLink : ''}`}
                onClick={closeMobileMenu}>
                {cat.label}
              </Link>
            ))}
            <hr className={styles.mobileDivider} />
            <Link to="/account" className={styles.mobileNavLink} onClick={closeMobileMenu}>My Account</Link>
            <Link to="/wishlist" className={styles.mobileNavLink} onClick={closeMobileMenu}>Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}</Link>
          </div>
        </div>
      )}
    </>
  );
}
