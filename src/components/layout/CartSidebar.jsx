import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeCart} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div>
            <h2>Your Bag</h2>
            {count > 0 && <span className={styles.count}>{count} {count === 1 ? 'piece' : 'pieces'}</span>}
          </div>
          <button onClick={closeCart} className={styles.closeBtn}><X size={18} strokeWidth={1.5} /></button>
        </div>
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={40} strokeWidth={1} />
              <p>Your bag is empty</p>
              <span>Discover our linen collection</span>
              <button onClick={closeCart} className={styles.continueShopping}>Browse Collection</button>
            </div>
          ) : items.map(item => (
            <div key={item.key} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemMeta}>{item.selectedColor} · {item.selectedSize}</p>
                <p className={styles.itemFabric}>{item.fabric}</p>
                <div className={styles.qtyRow}>
                  <div className={styles.qty}>
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={11} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={11} /></button>
                  </div>
                  <p className={styles.itemPrice}>{item.currency}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
                <button className={styles.removeBtn} onClick={() => removeItem(item.key)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className={styles.shipping}>{total >= 3000 ? '✓ Free shipping applied' : `Add ₹${(3000 - total).toLocaleString('en-IN')} more for free shipping`}</p>
            <Link to="/checkout" className={styles.checkoutBtn} onClick={closeCart}>Proceed to Checkout</Link>
            <Link to="/cart" className={styles.viewCartBtn} onClick={closeCart}>View Full Bag</Link>
          </div>
        )}
      </aside>
    </>
  );
}
