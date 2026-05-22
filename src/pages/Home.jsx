import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides, products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './Home.module.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(s => (s + 1) % heroSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    setCurrentSlide(idx);
    startInterval();
  };

  const newArrivals = products.filter(p => p.isNew && p.category !== 'sale').slice(0, 8);
  const saleItems = products.filter(p => p.category === 'sale').slice(0, 4);

  return (
    <main className={styles.main}>
      {/* Hero Slider */}
      <section className={styles.hero}>
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className={`${styles.slide} ${i === currentSlide ? styles.active : ''}`}>
            <img src={slide.image} alt={slide.title} className={styles.slideImage} />
            <div className={styles.slideOverlay} />
            <div className={styles.slideContent}>
              <span className={styles.slideSubtitle}>{slide.subtitle}</span>
              <h1 className={styles.slideTitle}>{slide.title}</h1>
              <Link to={slide.link} className={styles.slideCta}>{slide.cta}</Link>
            </div>
          </div>
        ))}

        <button className={`${styles.slideNav} ${styles.prev}`} onClick={() => goTo((currentSlide - 1 + heroSlides.length) % heroSlides.length)}>
          <ChevronLeft size={24} />
        </button>
        <button className={`${styles.slideNav} ${styles.next}`} onClick={() => goTo((currentSlide + 1) % heroSlides.length)}>
          <ChevronRight size={24} />
        </button>

        <div className={styles.dots}>
          {heroSlides.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === currentSlide ? styles.activeDot : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>

        <div className={styles.slideCounter}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </div>
      </section>

      {/* Category Grid */}
      <section className={styles.categoryGrid}>
        <div className="container">
          <div className={styles.categories}>
            {[
              { label: 'WOMAN', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', slug: 'woman' },
              { label: 'MAN', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80', slug: 'man' },
              { label: 'KIDS', image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80', slug: 'kids' },
              { label: 'HOME', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', slug: 'home' },
            ].map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className={styles.catCard}>
                <img src={cat.image} alt={cat.label} />
                <div className={styles.catLabel}>{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>NEW ARRIVALS</h2>
            <Link to="/category/woman" className={styles.viewAll}>VIEW ALL</Link>
          </div>
          <div className={styles.productGrid}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className={styles.editorial}>
        <div className={styles.editorialInner}>
          <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=85" alt="Editorial" className={styles.editorialImage} />
          <div className={styles.editorialContent}>
            <span className={styles.editorialLabel}>THE COLLECTION</span>
            <h2>TIMELESS PIECES FOR EVERY WARDROBE</h2>
            <Link to="/category/woman" className={styles.editorialCta}>DISCOVER NOW</Link>
          </div>
        </div>
      </section>

      {/* Sale */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.saleTitle}>SALE — UP TO 50% OFF</h2>
            <Link to="/category/sale" className={styles.viewAll}>VIEW ALL</Link>
          </div>
          <div className={styles.productGrid4}>
            {saleItems.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featureGrid}>
            {[
              { icon: '🚚', title: 'FREE SHIPPING', desc: 'On orders over £50' },
              { icon: '↩', title: 'FREE RETURNS', desc: 'Within 30 days' },
              { icon: '🔒', title: 'SECURE PAYMENT', desc: 'SSL encrypted checkout' },
              { icon: '💬', title: '24/7 SUPPORT', desc: 'We are here to help' },
            ].map(f => (
              <div key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
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
