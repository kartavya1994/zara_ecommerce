import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../../store/useStore';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const displayPrice = `${product.currency}${product.price.toLocaleString('en-IN')}`;
  const displayOriginal = product.originalPrice ? `${product.currency}${product.originalPrice.toLocaleString('en-IN')}` : null;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

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
          onClick={() => toggleItem(product)} aria-label="Save to wishlist"
        >
          <Heart size={15} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className={styles.badges}>
          {product.isNew && <span className={styles.badge}>New</span>}
          {product.isBestseller && !product.isNew && <span className={`${styles.badge} ${styles.bestsellerBadge}`}>Bestseller</span>}
          {discount && <span className={`${styles.badge} ${styles.saleBadge}`}>-{discount}%</span>}
        </div>
        <div className={styles.fabricTag}>{product.fabric}</div>
      </div>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.name}>{product.name}</Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>{displayPrice}</span>
          {displayOriginal && <span className={styles.originalPrice}>{displayOriginal}</span>}
        </div>
        <div className={styles.colorRow}>
          {product.colors.slice(0, 3).map(c => (
            <span key={c} className={styles.colorChip} title={c} />
          ))}
          {product.colors.length > 3 && <span className={styles.moreColors}>+{product.colors.length - 3}</span>}
        </div>
      </div>
    </div>
  );
}
