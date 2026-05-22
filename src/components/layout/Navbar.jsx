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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
          <span>FREE SHIPPING ON ORDERS OVER £50</span>
        </div>

        <nav className={styles.nav}>
          <button className={styles.iconBtn} onClick={toggleMobileMenu} aria-label="Menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className={styles.navLinks}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`${styles.navLink} ${cat.id === 'sale' ? styles.saleLink : ''}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <Link to="/" className={styles.logo}>ZARR</Link>

          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={toggleSearch} aria-label="Search">
              <Search size={18} />
            </button>
            <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>
            <Link to="/account" className={styles.iconBtn} aria-label="Account">
              <User size={18} />
            </Link>
            <button className={styles.iconBtn} onClick={openCart} aria-label="Cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
          </div>
        </nav>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay} onClick={closeSearch}>
          <div className={styles.searchBox} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <Search size={18} />
              <input
                autoFocus
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={closeSearch}><X size={18} /></button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`${styles.mobileNavLink} ${cat.id === 'sale' ? styles.saleLink : ''}`}
                onClick={closeMobileMenu}
              >
                {cat.label}
              </Link>
            ))}
            <hr className={styles.mobileDivider} />
            <Link to="/account" className={styles.mobileNavLink} onClick={closeMobileMenu}>MY ACCOUNT</Link>
            <Link to="/wishlist" className={styles.mobileNavLink} onClick={closeMobileMenu}>WISHLIST ({wishlistCount})</Link>
          </div>
        </div>
      )}
    </>
  );
}
