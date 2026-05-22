import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import ProductCard from '../components/product/ProductCard';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  if (!product) return (
    <div className={styles.notFound}>
      <h2>Product not found</h2>
      <Link to="/">Go home</Link>
    </div>
  );

  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordionItems = [
    { key: 'desc', title: 'DESCRIPTION', content: product.description },
    { key: 'size', title: 'SIZE & FIT', content: 'Model is 178cm/5\'10" and wearing size S. For best fit, we recommend checking our size guide.' },
    { key: 'care', title: 'CARE INSTRUCTIONS', content: 'Machine wash at 30°C. Do not bleach. Iron at medium temperature. Do not tumble dry. Dry clean.' },
    { key: 'delivery', title: 'DELIVERY & RETURNS', content: 'Free standard delivery on orders over £50. Express delivery available. Free returns within 30 days.' },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === selectedImage ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
              <button
                className={`${styles.wishlistGallery} ${isWishlisted(product.id) ? styles.wishlisted : ''}`}
                onClick={() => toggleItem(product)}
              >
                <Heart size={20} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            {product.isNew && <span className={styles.newBadge}>NEW SEASON</span>}
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.priceRow}>
              <span className={styles.price}>£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className={styles.original}>£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Color */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>
                <span>COLOUR</span>
                <span className={styles.selectedValue}>{selectedColor}</span>
              </div>
              <div className={styles.colorList}>
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`${styles.colorBtn} ${selectedColor === color ? styles.activeColor : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>
                <span>SIZE</span>
                <Link to="#" className={styles.sizeGuide}>Size Guide</Link>
              </div>
              {sizeError && <p className={styles.sizeError}>Please select a size</p>}
              <div className={styles.sizeGrid}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''}`}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}><span>QUANTITY</span></div>
              <div className={styles.qtyControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <button
              className={`${styles.addBtn} ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
            </button>
            <button
              className={`${styles.wishlistBtn} ${isWishlisted(product.id) ? styles.wishlisted : ''}`}
              onClick={() => toggleItem(product)}
            >
              <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              {isWishlisted(product.id) ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
            </button>

            {/* Trust badges */}
            <div className={styles.trust}>
              <div className={styles.trustItem}><Truck size={14} /><span>Free delivery over £50</span></div>
              <div className={styles.trustItem}><RefreshCw size={14} /><span>Free 30-day returns</span></div>
              <div className={styles.trustItem}><Shield size={14} /><span>Secure checkout</span></div>
            </div>

            {/* Accordion */}
            <div className={styles.accordion}>
              {accordionItems.map(item => (
                <div key={item.key} className={styles.accordionItem}>
                  <button
                    className={styles.accordionTrigger}
                    onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)}
                  >
                    {item.title}
                    {openAccordion === item.key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openAccordion === item.key && (
                    <p className={styles.accordionContent}>{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2>YOU MIGHT ALSO LIKE</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
