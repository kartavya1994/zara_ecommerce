import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RefreshCw, Leaf, Camera, Package } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import styles from './ProductDetail.module.css';

function RelatedCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem } = useCartStore();
  return (
    <div className={styles.relCard}>
      <div className={styles.relImg}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button className={`${styles.relHeart} ${isWishlisted(product.id) ? styles.hearted : ''}`}
          onClick={() => toggleItem(product)}>
          <Heart size={13} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} strokeWidth={1.8} />
        </button>
      </div>
      <div className={styles.relBody}>
        <Link to={`/product/${product.id}`} className={styles.relName}>{product.name}</Link>
        <p className={styles.relPrice}>₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selImg, setSelImg] = useState(0);
  const [selSize, setSelSize] = useState('');
  const [selColor, setSelColor] = useState(product?.colors[0] || '');
  const [qty, setQty] = useState(1);
  const [sizeErr, setSizeErr] = useState(false);
  const [openAcc, setOpenAcc] = useState('desc');
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  if (!product) return (
    <div className={styles.notFound}>
      <h2>Product not found</h2>
      <Link to="/" className={styles.backHome}>← Back to Home</Link>
    </div>
  );

  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const displayPrice = `₹${product.price.toLocaleString('en-IN')}`;
  const displayOriginal = product.originalPrice ? `₹${product.originalPrice.toLocaleString('en-IN')}` : null;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    if (!selSize) { setSizeErr(true); return; }
    setSizeErr(false);
    addItem(product, selSize, selColor, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const accordionItems = [
    { key: 'desc', title: 'About This Piece', content: product.description },
    { key: 'outfit', title: 'What\'s Included', content: product.outfit ? `This outfit includes: ${product.outfit.includes.join(', ')}.` : null },
    { key: 'styling', title: 'How to Style It', content: product.outfit?.styling },
    { key: 'fabric', title: 'Fabric & Craft', content: `Made from ${product.fabric}. Linen becomes softer and more beautiful with every wash. Our linen is stone-washed for a relaxed texture that drapes beautifully from day one.` },
    { key: 'care', title: 'Care Guide', content: product.care },
    { key: 'delivery', title: 'Delivery & Returns', content: 'Free standard delivery across India on orders above ₹3,000. International shipping available. Free returns within 7 days — no questions asked.' },
  ].filter(a => a.content);

  return (
    <main className={styles.main}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link><span>/</span>
          <Link to={`/category/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
          <span>/</span><span>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* ── Gallery ── */}
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {product.images.map((img, i) => (
                <button key={i} className={`${styles.thumb} ${i === selImg ? styles.thumbActive : ''}`}
                  onClick={() => setSelImg(i)}>
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImg}>
              <img src={product.images[selImg]} alt={product.name} />
              <button className={`${styles.galleryHeart} ${isWishlisted(product.id) ? styles.hearted : ''}`}
                onClick={() => toggleItem(product)}>
                <Heart size={18} strokeWidth={1.8} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
              <div className={styles.fabricTag}>{product.fabric}</div>
            </div>
          </div>

          {/* ── Info ── */}
          <div className={styles.info}>
            <div className={styles.badges}>
              {product.isNew && <span className={styles.badgeNew}>New Season</span>}
              {product.isBestseller && <span className={styles.badgeBest}>Bestseller</span>}
              {discount && <span className={styles.badgeSale}>-{discount}% Off</span>}
            </div>
            <h1 className={styles.name}>{product.name}</h1>

            {/* Outfit includes summary */}
            {product.outfit && (
              <div className={styles.outfitSummary}>
                <Package size={14} strokeWidth={1.8} />
                <span>Complete outfit: {product.outfit.includes.join(' + ')}</span>
              </div>
            )}

            <div className={styles.priceRow}>
              <span className={styles.price}>{displayPrice}</span>
              {displayOriginal && <span className={styles.origPrice}>{displayOriginal}</span>}
            </div>
            <p className={styles.taxNote}>Incl. of all taxes · USD ${product.priceUSD} approx.</p>

            {/* Color */}
            <div className={styles.optGroup}>
              <div className={styles.optLabel}><span>Colour</span><span className={styles.optVal}>{selColor}</span></div>
              <div className={styles.colorList}>
                {product.colors.map(c => (
                  <button key={c} className={`${styles.colorBtn} ${selColor === c ? styles.colorActive : ''}`}
                    onClick={() => setSelColor(c)}>{c}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className={styles.optGroup}>
              <div className={styles.optLabel}>
                <span>Size</span>
                <Link to="#" className={styles.sizeGuide}>Size Guide</Link>
              </div>
              {sizeErr && <p className={styles.sizeErr}>Please select a size</p>}
              <div className={styles.sizeGrid}>
                {product.sizes.map(s => (
                  <button key={s} className={`${styles.sizeBtn} ${selSize === s ? styles.sizeActive : ''}`}
                    onClick={() => { setSelSize(s); setSizeErr(false); }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className={styles.optGroup}>
              <div className={styles.optLabel}><span>Quantity</span></div>
              <div className={styles.qtyRow}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={13} /></button>
                <span className={styles.qtyNum}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}><Plus size={13} /></button>
              </div>
            </div>

            {/* CTAs */}
            <button className={`${styles.addToBagBtn} ${added ? styles.addedBtn : ''}`} onClick={handleAdd}>
              {added ? '✓  Added to Bag!' : 'Add to Bag'}
            </button>
            <button className={`${styles.wishBtn} ${isWishlisted(product.id) ? styles.wishActive : ''}`}
              onClick={() => toggleItem(product)}>
              <Heart size={15} strokeWidth={1.8} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              {isWishlisted(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
            </button>
            <Link to={`/try-on?product=${product.id}`} className={styles.tryonBtn}>
              <Camera size={15} strokeWidth={1.8} />
              Virtual Try-On — See it on you
            </Link>

            {/* Trust */}
            <div className={styles.trust}>
              <div className={styles.trustItem}><Truck size={13} /><span>Free delivery over ₹3,000</span></div>
              <div className={styles.trustItem}><RefreshCw size={13} /><span>7-day free returns</span></div>
              <div className={styles.trustItem}><Leaf size={13} /><span>100% natural linen</span></div>
            </div>

            {/* Accordion */}
            <div className={styles.accordion}>
              {accordionItems.map(item => (
                <div key={item.key} className={styles.accItem}>
                  <button className={styles.accTrigger}
                    onClick={() => setOpenAcc(openAcc === item.key ? null : item.key)}>
                    {item.title}
                    {openAcc === item.key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openAcc === item.key && <p className={styles.accBody}>{item.content}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relHeader}>
              <span className={styles.relEye}>Complete Your Wardrobe</span>
              <h2>You May Also Love</h2>
            </div>
            <div className={styles.relGrid}>
              {related.map(p => <RelatedCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
