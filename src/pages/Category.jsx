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

export default function Category() {
  const { slug } = useParams();
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ subcategory: [], size: [] });

  const allProducts = getProductsByCategory(slug);

  const subcategories = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
  const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))];

  const toggleFilter = (type, value) => {
    setActiveFilters(f => ({
      ...f,
      [type]: f[type].includes(value) ? f[type].filter(v => v !== value) : [...f[type], value]
    }));
  };

  const clearFilters = () => setActiveFilters({ subcategory: [], size: [] });

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (activeFilters.subcategory.length)
      result = result.filter(p => activeFilters.subcategory.includes(p.subcategory));
    if (activeFilters.size.length)
      result = result.filter(p => p.sizes.some(s => activeFilters.size.includes(s)));
    if (sort === 'newest') result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
    else if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [allProducts, activeFilters, sort]);

  const activeFilterCount = activeFilters.subcategory.length + activeFilters.size.length;

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>{slug?.toUpperCase()}</h1>
          <p className={styles.count}>{filtered.length} items</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.toolbar}>
          <button className={styles.filterToggle} onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal size={16} />
            FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <div className={styles.sortRow}>
            <label>SORT BY:</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.layout}>
          {filtersOpen && (
            <aside className={styles.filters}>
              <div className={styles.filtersHeader}>
                <h3>FILTERS</h3>
                {activeFilterCount > 0 && (
                  <button className={styles.clearBtn} onClick={clearFilters}>
                    CLEAR ALL <X size={12} />
                  </button>
                )}
              </div>

              {subcategories.length > 0 && (
                <div className={styles.filterGroup}>
                  <h4>CATEGORY</h4>
                  {subcategories.map(sub => (
                    <label key={sub} className={styles.filterLabel}>
                      <input
                        type="checkbox"
                        checked={activeFilters.subcategory.includes(sub)}
                        onChange={() => toggleFilter('subcategory', sub)}
                      />
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </label>
                  ))}
                </div>
              )}

              <div className={styles.filterGroup}>
                <h4>SIZE</h4>
                <div className={styles.sizeGrid}>
                  {allSizes.slice(0, 10).map(size => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${activeFilters.size.includes(size) ? styles.active : ''}`}
                      onClick={() => toggleFilter('size', size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <div className={`${styles.grid} ${filtersOpen ? styles.withFilters : ''}`}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No products match your filters.</p>
                <button onClick={clearFilters} className={styles.clearBtn}>Clear Filters</button>
              </div>
            ) : (
              filtered.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
