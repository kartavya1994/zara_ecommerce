import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../../store/useStore';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem } = useCartStore();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div className={styles.card} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${product.id}`}>
          <img
            src={hovered && product.images[1] ? product.images[1] : product.image}
            alt={product.name} className={styles.image} loading="lazy"
          />
        </Link>
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={() => toggleItem(product)}
        >
          <Heart size={14} strokeWidth={1.8} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.isNew && <span className={styles.badge}>New</span>}
        {discount && <span className={`${styles.badge} ${styles.saleBadge}`}>-{discount}%</span>}
      </div>

      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.name}>{product.name}</Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}.00
          </span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}.00</span>
          )}
        </div>
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
        <Plus size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
