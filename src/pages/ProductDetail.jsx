import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RefreshCw, Leaf, Camera } from 'lucide-react';
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
  const [openAccordion, setOpenAccordion] = useState('desc');
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  if (!product) return (
    <div className={styles.notFound}>
      <h2>Product not found</h2>
      <Link to="/" className={styles.backHome}>← Back to Home</Link>
    </div>
  );

  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const displayPrice = `${product.currency}${product.price.toLocaleString('en-IN')}`;
  const displayOriginal = product.originalPrice ? `${product.currency}${product.originalPrice.toLocaleString('en-IN')}` : null;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accordionItems = [
    { key: 'desc', title: 'About This Piece', content: product.description },
    { key: 'fabric', title: 'Fabric & Craft', content: `Made from ${product.fabric}. Linen is the world's most breathable natural fabric — it becomes softer and more beautiful with every wash. Our linen is stone-washed for a relaxed texture that drapes beautifully from day one.` },
    { key: 'care', title: 'Care Guide', content: product.care },
    { key: 'delivery', title: 'Delivery & Returns', content: 'Free standard delivery across India on orders above ₹3,000. International shipping to 60+ countries. Free returns within 30 days — no questions asked.' },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link><span>/</span>
          <Link to={`/category/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
          <span>/</span><span>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <button key={i}
                  className={`${styles.thumb} ${i === selectedImage ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImage(i)}>
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
              <button
                className={`${styles.wishlistGallery} ${isWishlisted(product.id) ? styles.wishlisted : ''}`}
                onClick={() => toggleItem(product)}>
                <Heart size={18} strokeWidth={1.5} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
              <div className={styles.fabricBadge}>{product.fabric}</div>
            </div>
          </div>

          {/* Info panel */}
          <div className={styles.info}>
            <div className={styles.infoTop}>
              {product.isNew && <span className={styles.newBadge}>New Season</span>}
              {product.isBestseller && <span className={styles.bestBadge}>Bestseller</span>}
            </div>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.priceRow}>
              <span className={styles.price}>{displayPrice}</span>
              {displayOriginal && (
                <>
                  <span className={styles.originalPrice}>{displayOriginal}</span>
                  <span className={styles.discount}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>
            <p className={styles.taxNote}>Incl. of all taxes · Also available in USD ${product.priceUSD}</p>

            {/* Color */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}>
                <span>Colour</span><span className={styles.optionValue}>{selectedColor}</span>
              </div>
              <div className={styles.colorList}>
                {product.colors.map(c => (
                  <button key={c}
                    className={`${styles.colorBtn} ${selectedColor === c ? styles.activeColor : ''}`}
                    onClick={() => setSelectedColor(c)}>{c}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}>
                <span>Size</span>
                <Link to="#" className={styles.sizeGuide}>Size Guide</Link>
              </div>
              {sizeError && <p className={styles.sizeError}>Please select a size to continue</p>}
              <div className={styles.sizeGrid}>
                {product.sizes.map(s => (
                  <button key={s}
                    className={`${styles.sizeBtn} ${selectedSize === s ? styles.activeSize : ''}`}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}><span>Quantity</span></div>
              <div className={styles.qtyControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={13} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={13} /></button>
              </div>
            </div>

            {/* CTAs */}
            <button className={`${styles.addBtn} ${added ? styles.added : ''}`} onClick={handleAddToCart}>
              {added ? '✓  Added to Bag' : 'Add to Bag'}
            </button>
            <button
              className={`${styles.wishlistBtn} ${isWishlisted(product.id) ? styles.wishlisted : ''}`}
              onClick={() => toggleItem(product)}>
              <Heart size={15} strokeWidth={1.5} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              {isWishlisted(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
            </button>

            {/* Virtual Try-On CTA */}
            <Link to={`/try-on?product=${product.id}`} className={styles.tryonBtn}>
              <Camera size={15} strokeWidth={1.5} />
              Virtual Try-On — See it on you
            </Link>

            {/* Trust row */}
            <div className={styles.trust}>
              <div className={styles.trustItem}><Truck size={13} /><span>Free delivery over ₹3,000</span></div>
              <div className={styles.trustItem}><RefreshCw size={13} /><span>30-day free returns</span></div>
              <div className={styles.trustItem}><Leaf size={13} /><span>100% natural linen</span></div>
            </div>

            {/* Accordion */}
            <div className={styles.accordion}>
              {accordionItems.map(item => (
                <div key={item.key} className={styles.accordionItem}>
                  <button className={styles.accordionTrigger}
                    onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)}>
                    {item.title}
                    {openAccordion === item.key ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
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
            <div className={styles.relatedHeader}>
              <span className={styles.relatedEyebrow}>You May Also Love</span>
              <h2>Complete the Look</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
