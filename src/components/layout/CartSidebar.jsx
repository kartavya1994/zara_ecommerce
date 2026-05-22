import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeCart} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>MY BAG ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button onClick={closeCart} className={styles.closeBtn}><X size={20} /></button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={40} strokeWidth={1} />
              <p>Your bag is empty</p>
              <button onClick={closeCart} className={styles.continueShopping}>CONTINUE SHOPPING</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>{item.selectedColor} · {item.selectedSize}</p>
                  <div className={styles.qtyRow}>
                    <div className={styles.qty}>
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={12} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={12} /></button>
                    </div>
                    <p className={styles.itemPrice}>£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.key)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>TOTAL</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <p className={styles.shipping}>Shipping calculated at checkout</p>
            <Link to="/checkout" className={styles.checkoutBtn} onClick={closeCart}>
              PROCEED TO CHECKOUT
            </Link>
            <button className={styles.viewCartBtn} onClick={closeCart}>
              <Link to="/cart">VIEW BAG</Link>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
