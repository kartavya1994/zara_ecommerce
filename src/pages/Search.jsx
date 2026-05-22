import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './Search.module.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.subcategory?.toLowerCase().includes(q.toLowerCase()) ||
    p.description?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <h1>SEARCH RESULTS</h1>
          <p>"{q}" — {results.length} results</p>
        </div>
        {results.length === 0 ? (
          <div className={styles.empty}>
            <p>No results found for "<strong>{q}</strong>".</p>
            <p>Try a different search term or browse our categories.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
