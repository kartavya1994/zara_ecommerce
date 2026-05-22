import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides, products, themeCollections } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './Home.module.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrentSlide(s => (s + 1) % heroSlides.length), 6000);
  };

  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, []);
  const goTo = (i) => { setCurrentSlide(i); startInterval(); };

  const newArrivals = products.filter(p => p.isNew && p.category !== 'sale').slice(0, 8);
  const bestsellers = products.filter(p => p.isBestseller && p.category !== 'sale').slice(0, 4);
  const saleItems = products.filter(p => p.category === 'sale').slice(0, 4);

  return (
    <main className={styles.main}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className={`${styles.slide} ${i === currentSlide ? styles.active : ''}`}>
            <img src={slide.image} alt={slide.title} className={styles.slideImage} />
            <div className={styles.slideOverlay} />
            <div className={styles.slideContent}>
              <span className={styles.slideLabel}>{slide.label}</span>
              <h1 className={styles.slideTitle}>{slide.title}</h1>
              <Link to={slide.link} className={styles.slideCta}>
                {slide.cta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
        <button className={`${styles.slideNav} ${styles.prev}`} onClick={() => goTo((currentSlide - 1 + heroSlides.length) % heroSlides.length)}>
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button className={`${styles.slideNav} ${styles.next}`} onClick={() => goTo((currentSlide + 1) % heroSlides.length)}>
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
        <div className={styles.heroBottom}>
          <div className={styles.dots}>
            {heroSlides.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === currentSlide ? styles.activeDot : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
          <span className={styles.heroCounter}>{String(currentSlide+1).padStart(2,'0')} — {String(heroSlides.length).padStart(2,'0')}</span>
        </div>
      </section>

      {/* ── BRAND STATEMENT ──────────────────────────────── */}
      <section className={styles.manifesto}>
        <div className="container">
          <div className={styles.manifestoInner}>
            <span className={styles.manifestoEyebrow}>Our Philosophy</span>
            <h2 className={styles.manifestoText}>
              We believe clothing should feel as natural as the air around you. Every piece at Regent & Row is made from 100% pure linen — breathable, timeless, and thoughtfully sourced from the finest mills in Europe and India.
            </h2>
            <Link to="/category/classics" className={styles.manifestoLink}>Discover The Classics <ArrowRight size={13} /></Link>
          </div>
        </div>
      </section>

      {/* ── SHOP BY PERSON ───────────────────────────────── */}
      <section className={styles.shopBy}>
        <div className="container">
          <div className={styles.shopByGrid}>
            <Link to="/category/women" className={styles.shopByCard}>
              <div className={styles.shopByImgWrap}>
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85" alt="Women" />
              </div>
              <div className={styles.shopByInfo}>
                <h3>For Her</h3>
                <p>Dresses, sets, kurtas & more</p>
                <span className={styles.shopByArrow}><ArrowRight size={14} /></span>
              </div>
            </Link>
            <Link to="/category/men" className={styles.shopByCard}>
              <div className={styles.shopByImgWrap}>
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85" alt="Men" />
              </div>
              <div className={styles.shopByInfo}>
                <h3>For Him</h3>
                <p>Shirts, kurtas, suits & sets</p>
                <span className={styles.shopByArrow}><ArrowRight size={14} /></span>
              </div>
            </Link>
            <Link to="/category/resort" className={styles.shopByCard}>
              <div className={styles.shopByImgWrap}>
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85" alt="Resort" />
              </div>
              <div className={styles.shopByInfo}>
                <h3>Resort Edit</h3>
                <p>Kaftans, beach wear & more</p>
                <span className={styles.shopByArrow}><ArrowRight size={14} /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Just Landed</span>
              <h2>New Arrivals</h2>
            </div>
            <Link to="/category/women" className={styles.viewAll}>View All <ArrowRight size={12} /></Link>
          </div>
          <div className={styles.productGrid}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── THEME COLLECTIONS ────────────────────────────── */}
      <section className={styles.themes}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Curated by Mood</span>
              <h2>Theme Collections</h2>
            </div>
            <Link to="/collections" className={styles.viewAll}>All Collections <ArrowRight size={12} /></Link>
          </div>
          <div className={styles.themeGrid}>
            {themeCollections.map(col => (
              <Link key={col.id} to={`/collections/${col.slug}`} className={styles.themeCard}>
                <div className={styles.themeImgWrap}>
                  <img src={col.image} alt={col.name} />
                  <div className={styles.themeOverlay} style={{ background: `${col.color}55` }} />
                </div>
                <div className={styles.themeInfo}>
                  <span className={styles.themeTagline}>{col.tagline}</span>
                  <h3>{col.name}</h3>
                  <span className={styles.themeExplore}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIRTUAL TRY-ON FEATURE TEASER ────────────────── */}
      <section className={styles.tryonBanner}>
        <div className="container">
          <div className={styles.tryonInner}>
            <div className={styles.tryonText}>
              <span className={styles.tryonEyebrow}>New Feature</span>
              <h2>See It On You</h2>
              <p>Upload your photo and virtually try on any linen piece from our collection. Experience the drape, the colour, the silhouette — before you order.</p>
              <Link to="/try-on" className={styles.tryonCta}>Try It Now <ArrowRight size={14} /></Link>
            </div>
            <div className={styles.tryonVisual}>
              <div className={styles.tryonCard}>
                <div className={styles.tryonCardIcon}>✦</div>
                <p>AI Virtual Try-On</p>
                <span>Powered by Claude Vision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Loved by Many</span>
              <h2>Bestsellers</h2>
            </div>
          </div>
          <div className={styles.productGrid4}>
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL PULL QUOTE ─────────────────────────── */}
      <section className={styles.pullQuote}>
        <div className="container">
          <blockquote className={styles.quote}>
            "Linen is the most honest fabric. It wrinkles when it's been lived in. It softens with every wash. It tells a story."
          </blockquote>
          <cite className={styles.quoteAttrib}>— The Regent & Row Story</cite>
        </div>
      </section>

      {/* ── SALE ─────────────────────────────────────────── */}
      {saleItems.length > 0 && (
        <section className={styles.saleSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>Limited Time</span>
                <h2 className={styles.saleTitle}>Sale — Up to 40% off</h2>
              </div>
              <Link to="/category/sale" className={styles.viewAll}>View All <ArrowRight size={12} /></Link>
            </div>
            <div className={styles.productGrid4}>
              {saleItems.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── PROMISE STRIP ────────────────────────────────── */}
      <section className={styles.promises}>
        <div className="container">
          <div className={styles.promiseGrid}>
            {[
              { icon: '✦', title: '100% Pure Linen', desc: 'Every fibre, every stitch' },
              { icon: '⦾', title: 'Worldwide Shipping', desc: 'India & 60+ countries' },
              { icon: '↺', title: '30-Day Returns', desc: 'No questions asked' },
              { icon: '◈', title: 'Ethically Sourced', desc: 'Responsible from farm to fabric' },
            ].map(f => (
              <div key={f.title} className={styles.promise}>
                <span className={styles.promiseIcon}>{f.icon}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
