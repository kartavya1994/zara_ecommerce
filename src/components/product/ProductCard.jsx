import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../../store/useStore';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrapper}>
        <Link to={`/product/${product.id}`}>
          <img
            src={hovered && product.images[1] ? product.images[1] : product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
        </Link>
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={() => toggleItem(product)}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.isNew && <span className={styles.badge}>NEW</span>}
        {product.originalPrice && <span className={`${styles.badge} ${styles.saleBadge}`}>SALE</span>}
      </div>

      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>£{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>£{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className={styles.colors}>
          {product.colors.slice(0, 4).map(color => (
            <span key={color} className={styles.colorDot} title={color} />
          ))}
          {product.colors.length > 4 && (
            <span className={styles.moreColors}>+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
