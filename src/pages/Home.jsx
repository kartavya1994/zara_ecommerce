import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, heroSlides, themeCollections } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import styles from './Home.module.css';

// ── Quick-add card matching PDF style exactly ───────────────────────────────
function ProductCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem } = useCartStore();
  return (
    <div className={styles.pCard}>
      <div className={styles.pCardImg}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button className={`${styles.pHeart} ${isWishlisted(product.id) ? styles.hearted : ''}`}
          onClick={() => toggleItem(product)}>
          <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} strokeWidth={1.8} />
        </button>
        {product.isNew && <span className={styles.pBadge}>NEW</span>}
      </div>
      <div className={styles.pCardBody}>
        <p className={styles.pName}>{product.name}</p>
        <p className={styles.pPrice}>₹{product.price.toLocaleString('en-IN')}.00</p>
        <div className={styles.pSizes}>
          {product.sizes.slice(0, 4).map(s => <span key={s} className={styles.pSize}>{s}</span>)}
          {product.sizes.length > 4 && <span className={styles.pSizeMore}>...</span>}
        </div>
      </div>
      <button className={styles.pAdd}
        onClick={() => addItem(product, product.sizes[0], product.colors[0], 1)}>
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5500);
  };
  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);
  const goTo = i => { setSlide(i); startTimer(); };

  const newProducts   = products.filter(p => p.isNew && p.category !== 'sale').slice(0, 3);
  const menProducts   = products.filter(p => p.category === 'men').slice(0, 3);
  const womenProducts = products.filter(p => p.category === 'women').slice(0, 3);
  const kidsProducts  = products.filter(p => p.category === 'kids').slice(0, 3);
  const saleProducts  = products.filter(p => p.category === 'sale').slice(0, 3);

  return (
    <main className={styles.main}>

      {/* ── 1. HERO IMAGE GRID (PDF style: 4 tall editorial cols) ── */}
      <section className={styles.heroTop}>
        <div className={styles.heroGrid}>
          {heroSlides.concat(heroSlides[0]).slice(0, 4).map((s, i) => (
            <div key={i} className={styles.heroCol}>
              <img src={s.image} alt={s.label} />
            </div>
          ))}
        </div>
        <div className={styles.heroCaption}>
          <div className={styles.heroCaptionLeft}>
            <h1 className={styles.bareLinenTitle}>Bare Linen</h1>
            <Link to="/category/men" className={styles.shopNowCta}>SHOP NOW</Link>
          </div>
          <div className={styles.heroCaptionRight}>
            <span className={styles.byText}>by</span>
            <span className={styles.brandBig}>Regent &amp; Row</span>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className={styles.trustBar}>
        {[
          { icon: '🚚', label: 'Free Shipping', sub: 'Available' },
          { icon: '↩', label: 'Free Returns', sub: 'Within 7 Days' },
          { icon: '🔒', label: '100% Secure', sub: 'Online Shopping' },
          { icon: '💵', label: 'Cash on Delivery', sub: 'Available' },
        ].map(t => (
          <div key={t.label} className={styles.trustItem}>
            <span className={styles.trustIcon}>{t.icon}</span>
            <div><p>{t.label}</p><span>{t.sub}</span></div>
          </div>
        ))}
      </section>

      {/* ── 3. FASHION WEEK HERO ── */}
      <section className={styles.fwSection}>
        <div className={styles.fwLeft}>
          <p className={styles.fwLabel}>NEW SUMMER EDITION</p>
          <h2 className={styles.fwYear}>2026</h2>
          <Link to="/category/men" className={styles.fwBtn}>SHOP LINEN</Link>
        </div>
        <div className={styles.fwCenter}>
          <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=90" alt="Fashion Week 2026" />
        </div>
        <div className={styles.fwRight}>
          <div className={styles.fwBadge}>PREMIUM<br />LINEN</div>
          <div className={styles.fwBrandBadge}>
            <span>REGENT &amp; ROW</span>
            <span>FASHION WEEK</span>
          </div>
        </div>
      </section>

      {/* ── 4. SHOP BY STYLE ── */}
      <section className={styles.shopByStyle}>
        <div className="container">
          <h2 className={styles.shopByHeading}>
            SHOP BY <em className={styles.shopByEm}>Style</em>
          </h2>
          <div className={styles.cardGrid3}>{newProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      {/* ── 5. CASUAL + FORMAL EDITORIAL BANNERS ── */}
      <section className={styles.editorialSection}>
        <div className={styles.editorialPair}>
          <div className={styles.editorialPanel}>
            <img src="https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=85" alt="Casual" />
            <div className={styles.editorialLayer}>
              <Link to="/category/men" className={styles.viewShopBtn}>VIEW &amp; SHOP</Link>
              <div className={styles.editorialLabel}>
                <p className={styles.editorialBig}>CASUAL</p>
                <p className={styles.editorialSmall}>Premium Lightwear</p>
              </div>
            </div>
          </div>
          <div className={styles.editorialPanel}>
            <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85" alt="Formal" />
            <div className={styles.editorialLayer}>
              <Link to="/category/classics" className={styles.viewShopBtn}>VIEW &amp; SHOP</Link>
              <div className={styles.editorialLabel}>
                <p className={styles.editorialBig}>FORMAL</p>
                <p className={styles.editorialSmall}>Luxe Bottoms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REGULAR CASUALS / CO-ORD SETS ── */}
      <section className={styles.coordSection}>
        <div className="container">
          <div className={styles.coordLayout}>
            <div className={styles.coordTextBlock}>
              <h2 className={styles.coordBig}>REGULAR<br />CASUALS</h2>
              <span className={styles.coordTag}>CO-ORD SETS</span>
            </div>
            <div className={styles.coordCards}>
              {menProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className={styles.coordModel}>
              <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=85" alt="Co-ord model" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. WOMEN'S SECTION ── */}
      <section className={styles.genderSection}>
        <div className="container">
          <div className={styles.genderHeader}>
            <div>
              <span className={styles.sectionEye}>Her Collection</span>
              <h2 className={styles.sectionTitle}>Women's Linen</h2>
            </div>
            <Link to="/category/women" className={styles.seeAll}>See All <ArrowRight size={13} /></Link>
          </div>
          <div className={styles.cardGrid3}>{womenProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      {/* ── 8. KIDS SECTION ── */}
      <section className={styles.kidsSection}>
        <div className="container">
          <div className={styles.kidsLayout}>
            <div className={styles.kidsText}>
              <span className={styles.sectionEye}>Mini Collection</span>
              <h2 className={styles.kidsBig}>Mini<br />Linen.</h2>
              <p>Soft, breathable linen for little ones. Easy to wash, made to last.</p>
              <Link to="/category/kids" className={styles.kidsBtn}>Shop Kids <ArrowRight size={14} /></Link>
            </div>
            <div className={styles.kidsCards}>
              {kidsProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. THEME COLLECTIONS ── */}
      <section className={styles.themesSection}>
        <div className="container">
          <div className={styles.genderHeader}>
            <div>
              <span className={styles.sectionEye}>Curated by Mood</span>
              <h2 className={styles.sectionTitle}>Theme Collections</h2>
            </div>
            <Link to="/collections" className={styles.seeAll}>See All <ArrowRight size={13} /></Link>
          </div>
          <div className={styles.themeGrid}>
            {themeCollections.map(col => (
              <Link key={col.id} to={`/collections/${col.slug}`} className={styles.themeCard}>
                <div className={styles.themeImg}>
                  <img src={col.image} alt={col.name} />
                  <div className={styles.themeOverlay} />
                </div>
                <div className={styles.themeInfo}>
                  <p className={styles.themeTagline}>{col.tagline}</p>
                  <h3>{col.name}</h3>
                  <span>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. STUDIO SECTION ── */}
      <section className={styles.studio}>
        <div className="container">
          <div className={styles.studioHead}>
            <span className={styles.studioSmall}>Regent &amp; Row</span>
            <span className={styles.studioLarge}>STUDIO</span>
          </div>
          <div className={styles.studioGrid}>
            {[
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
              'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=85',
              'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=600&q=85',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85',
              'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=85',
              'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=85',
            ].map((src, i) => (
              <div key={i} className={`${styles.studioCell} ${i === 0 || i === 3 ? styles.studioCellTall : ''}`}>
                <img src={src} alt={`Studio ${i+1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. SALE STRIP ── */}
      {saleProducts.length > 0 && (
        <section className={styles.saleSection}>
          <div className="container">
            <div className={styles.genderHeader}>
              <div>
                <span className={styles.sectionEye}>Limited Time</span>
                <h2 className={`${styles.sectionTitle} ${styles.saleTitle}`}>Sale — Up to 40% off</h2>
              </div>
              <Link to="/category/sale" className={styles.seeAll}>See All <ArrowRight size={13} /></Link>
            </div>
            <div className={styles.cardGrid3}>{saleProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        </section>
      )}

    </main>
  );
}
