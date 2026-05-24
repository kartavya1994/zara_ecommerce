import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { themeCollections, getProductsByTheme, getProductsByCategory, products } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import styles from './Collections.module.css';

// ── Premium Outfit Card ──────────────────────────────────────────────────────
function OutfitCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div className={styles.outfitCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className={styles.outfitImg}>
        <Link to={`/product/${product.id}`}>
          <img src={hovered && product.images[1] ? product.images[1] : product.image} alt={product.name} />
        </Link>
        <div className={styles.outfitImgOverlay}>
          <button className={`${styles.oHeart} ${wishlisted ? styles.hearted : ''}`}
            onClick={() => toggleItem(product)}>
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.8} />
          </button>
          <Link to={`/product/${product.id}`} className={styles.oDetailBtn}>View Outfit</Link>
        </div>
        {product.isNew && <span className={styles.oBadge}>NEW</span>}
        {discount && <span className={`${styles.oBadge} ${styles.oSaleBadge}`}>-{discount}%</span>}
      </div>
      <div className={styles.outfitBody}>
        <div className={styles.outfitMeta}>
          <span className={styles.outfitCategory}>{product.subcategory}</span>
          <span className={styles.outfitFabric}>{product.fabric}</span>
        </div>
        <Link to={`/product/${product.id}`} className={styles.outfitName}>{product.name}</Link>
        {product.outfit && (
          <ul className={styles.outfitIncludes}>
            {product.outfit.includes.map((item, i) => (
              <li key={i}><span>+</span>{item}</li>
            ))}
          </ul>
        )}
        <div className={styles.outfitColors}>
          {product.colors.slice(0, 3).map(c => (
            <span key={c} className={styles.colorPill}>{c}</span>
          ))}
          {product.colors.length > 3 && <span className={styles.colorMore}>+{product.colors.length - 3}</span>}
        </div>
        <div className={styles.outfitFooter}>
          <div>
            <p className={styles.outfitPrice}>₹{product.price.toLocaleString('en-IN')}</p>
            {product.originalPrice && (
              <p className={styles.outfitOriginal}>₹{product.originalPrice.toLocaleString('en-IN')}</p>
            )}
          </div>
          <button className={styles.oAddBtn}
            onClick={() => { addItem(product, product.sizes[0], product.colors[0], 1); openCart(); }}>
            <ShoppingBag size={14} strokeWidth={1.8} /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

// ── All Collections (landing) ─────────────────────────────────────────────────
function AllCollections() {
  const [activeGender, setActiveGender] = useState('all');
  const tabs = [
    { id: 'all',    label: 'All Outfits' },
    { id: 'women',  label: 'Women' },
    { id: 'men',    label: 'Men' },
    { id: 'kids',   label: 'Kids' },
    { id: 'resort', label: 'Resort Edit' },
  ];
  const filtered = activeGender === 'all'
    ? products.filter(p => p.category !== 'sale')
    : getProductsByCategory(activeGender);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <div className={styles.colHero}>
        <div className={styles.colHeroText}>
          <span className={styles.colHeroEye}>Complete Looks, Curated</span>
          <h1>The Linen Collections</h1>
          <p>Every outfit is a complete look — top, bottom, and occasionally an outer layer. Pure linen, thoughtfully assembled.</p>
        </div>
      </div>

      <div className="container">
        {/* Theme tiles */}
        <div className={styles.themeTiles}>
          {themeCollections.map(col => (
            <Link key={col.id} to={`/collections/${col.slug}`} className={styles.themeTile}>
              <img src={col.image} alt={col.name} />
              <div className={styles.themeTileOverlay}>
                <p className={styles.themeTileName}>{col.name}</p>
                <span>{col.tagline}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Gender tabs */}
        <div className={styles.genderTabBar}>
          {tabs.map(t => (
            <button key={t.id}
              className={`${styles.gTab} ${activeGender === t.id ? styles.gTabActive : ''}`}
              onClick={() => setActiveGender(t.id)}>
              {t.label}
              <span className={styles.gTabCount}>
                {t.id === 'all' ? products.filter(p=>p.category!=='sale').length : getProductsByCategory(t.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className={styles.outfitGrid}>
          {filtered.map(p => <OutfitCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}

// ── Single Theme Collection ───────────────────────────────────────────────────
function ThemeCollection({ collection }) {
  const [activeGender, setActiveGender] = useState('all');
  const allThemeProducts = products.filter(p => p.theme === collection.id && p.category !== 'sale');
  const genders = ['all', ...new Set(allThemeProducts.map(p => p.category))];
  const filtered = activeGender === 'all'
    ? allThemeProducts
    : allThemeProducts.filter(p => p.category === activeGender);

  return (
    <main className={styles.main}>
      <div className={styles.themeHero}>
        <img src={collection.image} alt={collection.name} className={styles.themeHeroImg} />
        <div className={styles.themeHeroOverlay} />
        <div className={styles.themeHeroContent}>
          <span className={styles.themeHeroEye}>Theme Collection</span>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.genderTabBar}>
          {genders.map(g => (
            <button key={g}
              className={`${styles.gTab} ${activeGender === g ? styles.gTabActive : ''}`}
              onClick={() => setActiveGender(g)}>
              {g === 'all' ? 'All Pieces' : g.charAt(0).toUpperCase() + g.slice(1)}
              <span className={styles.gTabCount}>
                {g === 'all' ? allThemeProducts.length : allThemeProducts.filter(p=>p.category===g).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.outfitGrid}>
            {filtered.map(p => <OutfitCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Explore other pieces in this collection.</p>
            <button className={styles.emptyBtn} onClick={() => setActiveGender('all')}>Show All</button>
          </div>
        )}

        <div className={styles.backRow}>
          <Link to="/collections" className={styles.backLink}>← All Collections</Link>
        </div>
      </div>
    </main>
  );
}

// ── Router ────────────────────────────────────────────────────────────────────
export default function Collections() {
  const { slug } = useParams();
  const collection = slug ? themeCollections.find(c => c.slug === slug) : null;
  if (collection) return <ThemeCollection collection={collection} />;
  return <AllCollections />;
}
