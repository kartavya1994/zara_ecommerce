import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { themeCollections, getProductsByTheme, products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './Collections.module.css';

export default function Collections() {
  const { slug } = useParams();
  const collection = slug ? themeCollections.find(c => c.slug === slug) : null;
  const collectionProducts = collection ? getProductsByTheme(collection.id) : [];

  // Single collection view
  if (collection) return (
    <main className={styles.main}>
      <div className={styles.collectionHero} style={{ '--col-color': collection.color }}>
        <img src={collection.image} alt={collection.name} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Theme Collection</span>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.collectionGrid}>
          {collectionProducts.length > 0
            ? collectionProducts.map(p => <ProductCard key={p.id} product={p} />)
            : products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
        <div className={styles.backRow}>
          <Link to="/collections" className={styles.backLink}>← All Collections</Link>
        </div>
      </div>
    </main>
  );

  // All collections view
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.pageHeader}>
          <span className={styles.eyebrow}>Curated by Mood & Moment</span>
          <h1>Theme Collections</h1>
          <p>Four worlds. One fabric. Pure linen, styled for every chapter of life.</p>
        </div>
        <div className={styles.collectionsGrid}>
          {themeCollections.map(col => (
            <Link key={col.id} to={`/collections/${col.slug}`} className={styles.colCard}>
              <div className={styles.colImgWrap}>
                <img src={col.image} alt={col.name} />
                <div className={styles.colOverlay} style={{ background: `linear-gradient(to top, ${col.color}cc 0%, transparent 60%)` }} />
              </div>
              <div className={styles.colInfo}>
                <span className={styles.colTagline}>{col.tagline}</span>
                <h2>{col.name}</h2>
                <p>{col.description}</p>
                <span className={styles.colExplore}>Explore Collection <ArrowRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
