import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useStore';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.empty}>
          <ShoppingBag size={64} strokeWidth={1} />
          <h2>YOUR BAG IS EMPTY</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/" className={styles.shopBtn}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </main>
  );

  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>MY BAG ({items.reduce((s, i) => s + i.quantity, 0)} items)</h1>
        <div className={styles.layout}>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.key} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.image} />
                <div className={styles.details}>
                  <div className={styles.top}>
                    <div>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.meta}>{item.selectedColor} · Size {item.selectedSize}</p>
                      <p className={styles.ref}>REF. {item.id.toUpperCase()}</p>
                    </div>
                    <button onClick={() => removeItem(item.key)} className={styles.remove}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.qty}>
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={12} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={12} /></button>
                    </div>
                    <p className={styles.price}>£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className={styles.clearBtn}>Clear Bag</button>
          </div>

          <div className={styles.summary}>
            <h2>ORDER SUMMARY</h2>
            <div className={styles.summaryRows}>
              <div className={styles.row}><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className={styles.row}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && <p className={styles.freeShippingNote}>Add £{(50 - subtotal).toFixed(2)} more for free shipping</p>}
              <div className={`${styles.row} ${styles.total}`}><span>TOTAL</span><span>£{total.toFixed(2)}</span></div>
            </div>

            <div className={styles.promoSection}>
              <input type="text" placeholder="PROMO CODE" className={styles.promoInput} />
              <button className={styles.promoBtn}>APPLY</button>
            </div>

            <Link to="/checkout" className={styles.checkoutBtn}>PROCEED TO CHECKOUT</Link>
            <Link to="/" className={styles.continueShopping}>← CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
