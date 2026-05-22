import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/useStore';
import ProductCard from '../components/product/ProductCard';
import styles from './Wishlist.module.css';

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <h1>MY WISHLIST</h1>
          <p>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <Heart size={64} strokeWidth={1} />
            <h2>YOUR WISHLIST IS EMPTY</h2>
            <p>Save items you love by clicking the heart icon on any product.</p>
            <Link to="/" className={styles.shopBtn}>DISCOVER NEW ARRIVALS</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
