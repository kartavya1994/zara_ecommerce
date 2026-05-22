import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './Category.module.css';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'New In' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const categoryNames = {
  women: 'Women', men: 'Men', resort: 'Resort Edit',
  classics: 'The Classics', sale: 'Sale',
};

export default function Category() {
  const { slug } = useParams();
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ subcategory: [], size: [], theme: [] });

  const allProducts = getProductsByCategory(slug);
  const subcategories = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
  const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))].slice(0, 12);
  const activeCount = Object.values(activeFilters).flat().length;

  const toggleFilter = (type, value) =>
    setActiveFilters(f => ({
      ...f, [type]: f[type].includes(value) ? f[type].filter(v => v !== value) : [...f[type], value]
    }));

  const clearFilters = () => setActiveFilters({ subcategory: [], size: [], theme: [] });

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (activeFilters.subcategory.length) result = result.filter(p => activeFilters.subcategory.includes(p.subcategory));
    if (activeFilters.size.length) result = result.filter(p => p.sizes.some(s => activeFilters.size.includes(s)));
    if (sort === 'newest') result = [...result.filter(p => p.isNew), ...result.filter(p => !p.isNew)];
    else if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [allProducts, activeFilters, sort]);

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>{categoryNames[slug] || slug}</h1>
          <p className={styles.subtitle}>100% Pure Linen · {filtered.length} pieces</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.toolbar}>
          <button className={styles.filterToggle} onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal size={15} strokeWidth={1.5} />
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>
          <div className={styles.sortRow}>
            <label>Sort:</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.layout}>
          {filtersOpen && (
            <aside className={styles.filters}>
              <div className={styles.filtersHeader}>
                <h3>Filter</h3>
                {activeCount > 0 && <button className={styles.clearBtn} onClick={clearFilters}>Clear all <X size={11} /></button>}
              </div>
              {subcategories.length > 0 && (
                <div className={styles.filterGroup}>
                  <h4>Category</h4>
                  {subcategories.map(sub => (
                    <label key={sub} className={styles.filterLabel}>
                      <input type="checkbox" checked={activeFilters.subcategory.includes(sub)} onChange={() => toggleFilter('subcategory', sub)} />
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </label>
                  ))}
                </div>
              )}
              <div className={styles.filterGroup}>
                <h4>Size</h4>
                <div className={styles.sizeGrid}>
                  {allSizes.map(size => (
                    <button key={size}
                      className={`${styles.sizeBtn} ${activeFilters.size.includes(size) ? styles.active : ''}`}
                      onClick={() => toggleFilter('size', size)}>{size}</button>
                  ))}
                </div>
              </div>
            </aside>
          )}
          <div className={`${styles.grid} ${filtersOpen ? styles.withFilters : ''}`}>
            {filtered.length === 0
              ? <div className={styles.empty}><p>No pieces match your filters.</p><button onClick={clearFilters} className={styles.clearBtn}>Clear Filters</button></div>
              : filtered.map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </div>
      </div>
    </main>
  );
}
