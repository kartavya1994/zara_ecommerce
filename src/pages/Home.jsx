import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import styles from './Home.module.css';

// Quick-add product card matching the design
function StyleCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem } = useCartStore();
  const wishlisted = isWishlisted(product.id);
  return (
    <div className={styles.styleCard}>
      <div className={styles.styleCardImg}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button
          className={`${styles.cardHeart} ${wishlisted ? styles.hearted : ''}`}
          onClick={() => toggleItem(product)}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.8} />
        </button>
      </div>
      <div className={styles.styleCardBody}>
        <p className={styles.styleCardName}>{product.name}</p>
        <p className={styles.styleCardPrice}>₹{product.price.toLocaleString('en-IN')}.00</p>
        <div className={styles.sizeRow}>
          {product.sizes.slice(0, 4).map(s => (
            <span key={s} className={styles.sizeChip}>{s}</span>
          ))}
          {product.sizes.length > 4 && <span className={styles.sizeMore}>...</span>}
        </div>
      </div>
      <button
        className={styles.addBtn}
        onClick={() => addItem(product, product.sizes[0], product.colors[0], 1)}
        aria-label="Add to cart"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function Home() {
  const featuredProducts = products.filter(p => p.category !== 'sale').slice(0, 3);
  const coordSets = products.filter(p => p.subcategory === 'sets').slice(0, 3);
  const studioImages = [
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=85',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=85',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=85',
    'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&q=85',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=85',
  ];

  return (
    <main className={styles.main}>

      {/* ── SECTION 1: HERO IMAGE GRID + BARE LINEN ──────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div className={styles.heroGridImg}><img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=85" alt="Linen style 1" /></div>
          <div className={styles.heroGridImg}><img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=85" alt="Linen style 2" /></div>
          <div className={styles.heroGridImg}><img src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=85" alt="Linen style 3" /></div>
          <div className={styles.heroGridImg}><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85" alt="Linen style 4" /></div>
        </div>
        <div className={styles.bareLinenRow}>
          <div className={styles.bareLinenLeft}>
            <h1 className={styles.bareLinenTitle}>Bare Linen</h1>
            <Link to="/category/men" className={styles.shopNowBtn}>SHOP NOW</Link>
          </div>
          <div className={styles.bareLinenRight}>
            <span className={styles.byText}>by</span>
            <span className={styles.brandName}>Regent & Row</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRUST BAR ─────────────────────────── */}
      <section className={styles.trustBar}>
        <div className={styles.trustItem}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="none"/><path d="M4 20h18l4-8H8L6 8H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="25" r="2" fill="white"/><circle cx="20" cy="25" r="2" fill="white"/></svg>
          <div><p>Free Shipping</p><span>Available</span></div>
        </div>
        <div className={styles.trustItem}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 6h20v16H6z" stroke="white" strokeWidth="2" strokeLinejoin="round"/><path d="M10 22v4M22 22v4M6 10h20" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          <div><p>Free Returns</p><span>Within 7 Days</span></div>
        </div>
        <div className={styles.trustItem}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3l11 4v9c0 6-4.5 10.5-11 12C9.5 26.5 5 22 5 16V7l11-4z" stroke="white" strokeWidth="2" strokeLinejoin="round"/><path d="M11 16l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div><p>100% Secure</p><span>Online shopping</span></div>
        </div>
        <div className={styles.trustItem}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M16 8v16" stroke="white" strokeWidth="2" strokeLinecap="round"/><rect x="4" y="4" width="24" height="24" rx="4" stroke="white" strokeWidth="2"/></svg>
          <div><p>Cash on delivery</p><span>Available</span></div>
        </div>
      </section>

      {/* ── SECTION 3: FASHION WEEK HERO ─────────────────── */}
      <section className={styles.fashionWeekSection}>
        <div className={styles.fashionWeekLeft}>
          <p className={styles.fwEditionLabel}>NEW SUMMER EDITION</p>
          <h2 className={styles.fwYear}>2026</h2>
          <Link to="/category/men" className={styles.shopLinenBtn}>SHOP LINEN</Link>
        </div>
        <div className={styles.fashionWeekCenter}>
          <img
            src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=900&q=90"
            alt="Fashion Week 2026"
            className={styles.fwImage}
          />
        </div>
        <div className={styles.fashionWeekRight}>
          <p className={styles.fwPremium}>PREMIUM<br />LINEN</p>
          <div className={styles.fwBrand}>
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path d="M18 8C18 8 8 18 10 28C11 34 17 40 24 40" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M24 40C31 40 37 34 38 28C40 18 30 8 30 8" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
            <p className={styles.fwBrandName}>REGENT & ROW<br /><span>FASHION WEEK</span></p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SHOP BY STYLE ─────────────────────── */}
      <section className={styles.shopByStyle}>
        <div className="container">
          <h2 className={styles.shopByTitle}>
            SHOP BY <span className={styles.shopByItalic}>Style</span>
          </h2>
          <div className={styles.styleCardsGrid}>
            {featuredProducts.map(p => <StyleCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CASUAL + FORMAL EDITORIAL BANNERS ─── */}
      <section className={styles.editorialBanners}>
        <div className={styles.editorialDuo}>
          <div className={styles.editorialCard}>
            <img src="https://images.unsplash.com/photo-1602810316693-3667c854239a?w=700&q=85" alt="Casual" />
            <div className={styles.editorialOverlay}>
              <div className={styles.editorialTopBtn}>
                <Link to="/category/men" className={styles.viewShopBtn}>VIEW & SHOP</Link>
              </div>
              <div className={styles.editorialBottom}>
                <p className={styles.editorialCategory}>CASUAL</p>
                <p className={styles.editorialSub}>Premium Lightwear</p>
              </div>
            </div>
          </div>
          <div className={styles.editorialCard}>
            <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=85" alt="Formal" />
            <div className={styles.editorialOverlay}>
              <div className={styles.editorialTopBtn} style={{justifyContent:'flex-end'}}>
                <Link to="/category/classics" className={styles.viewShopBtn}>VIEW & SHOP</Link>
              </div>
              <div className={styles.editorialBottom}>
                <p className={styles.editorialCategory}>FORMAL</p>
                <p className={styles.editorialSub}>Luxe Bottoms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: REGULAR CASUALS / CO-ORD SETS ─────── */}
      <section className={styles.coordSection}>
        <div className="container">
          <div className={styles.coordInner}>
            <div className={styles.coordLeft}>
              <div className={styles.coordHeadingWrap}>
                <h2 className={styles.coordHeading}>REGULAR<br />CASUALS</h2>
                <span className={styles.coordBadge}>CO-ORD SETS</span>
              </div>
            </div>
            <div className={styles.coordCards}>
              {(coordSets.length > 0 ? coordSets : featuredProducts).map(p => (
                <StyleCard key={p.id} product={p} />
              ))}
            </div>
            <div className={styles.coordModelImg}>
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=85" alt="Co-ord model" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: REGENT & ROW STUDIO ───────────────── */}
      <section className={styles.studio}>
        <div className="container">
          <div className={styles.studioHeader}>
            <h2 className={styles.studioTitle}>
              <span className={styles.studioSmall}>Regent & Row</span>
              <span className={styles.studioLarge}>STUDIO</span>
            </h2>
          </div>
          <div className={styles.studioGrid}>
            <div className={`${styles.studioCell} ${styles.studioCellTall}`}>
              <img src={studioImages[0]} alt="Studio 1" />
            </div>
            <div className={styles.studioSubGrid}>
              <div className={`${styles.studioCell} ${styles.studioCellBlue}`}>
                <img src={studioImages[1]} alt="Studio 2" />
              </div>
              <div className={styles.studioCell}>
                <img src={studioImages[2]} alt="Studio 3" />
              </div>
            </div>
            <div className={`${styles.studioCell} ${styles.studioCellTall}`}>
              <img src={studioImages[3]} alt="Studio 4" />
            </div>
            <div className={styles.studioCell}>
              <img src={studioImages[4]} alt="Studio 5" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
