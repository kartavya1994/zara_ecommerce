import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { useCartStore } from '../store/useStore';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1); // 1=address, 2=shipping, 3=payment
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '',
    postcode: '', country: 'United Kingdom', phone: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) return (
    <main className={styles.main}>
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h1>ORDER CONFIRMED</h1>
        <p>Thank you for your order. We've sent a confirmation email to <strong>{form.email || 'your email'}</strong>.</p>
        <p className={styles.orderNum}>Order #ZR-{Math.floor(Math.random() * 90000) + 10000}</p>
        <Link to="/" className={styles.shopBtn}>CONTINUE SHOPPING</Link>
      </div>
    </main>
  );

  if (items.length === 0) return (
    <main className={styles.main}>
      <div className={styles.empty}>
        <p>Your bag is empty.</p>
        <Link to="/" className={styles.shopBtn}>GO SHOPPING</Link>
      </div>
    </main>
  );

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.formSide}>
          <Link to="/" className={styles.logoLink}>ZARR</Link>

          {/* Steps */}
          <div className={styles.steps}>
            {['CONTACT', 'SHIPPING', 'PAYMENT'].map((s, i) => (
              <div key={s} className={`${styles.step} ${step > i + 1 ? styles.done : ''} ${step === i + 1 ? styles.active : ''}`}>
                <span className={styles.stepNum}>{step > i + 1 ? '✓' : i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handlePlaceOrder} className={styles.form}>
            {step === 1 && (
              <div className={styles.formStep}>
                <h2>CONTACT INFORMATION</h2>
                <div className={styles.field}>
                  <label>Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label>First Name *</label>
                    <input name="firstName" required value={form.firstName} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label>Last Name *</label>
                    <input name="lastName" required value={form.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Address *</label>
                  <input name="address" required value={form.address} onChange={handleChange} placeholder="Street address" />
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label>City *</label>
                    <input name="city" required value={form.city} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label>Postcode *</label>
                    <input name="postcode" required value={form.postcode} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
                </div>
                <button type="button" className={styles.nextBtn} onClick={() => setStep(2)}>CONTINUE TO SHIPPING</button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.formStep}>
                <h2>SHIPPING METHOD</h2>
                <div className={styles.shippingOptions}>
                  <label className={styles.shippingOption}>
                    <input type="radio" name="shipping" defaultChecked />
                    <div>
                      <p>Standard Delivery (3-5 days)</p>
                      <p className={styles.shippingPrice}>{subtotal >= 50 ? 'FREE' : '£4.99'}</p>
                    </div>
                  </label>
                  <label className={styles.shippingOption}>
                    <input type="radio" name="shipping" />
                    <div>
                      <p>Express Delivery (1-2 days)</p>
                      <p className={styles.shippingPrice}>£9.99</p>
                    </div>
                  </label>
                  <label className={styles.shippingOption}>
                    <input type="radio" name="shipping" />
                    <div>
                      <p>Next Day Delivery</p>
                      <p className={styles.shippingPrice}>£14.99</p>
                    </div>
                  </label>
                </div>
                <div className={styles.btnRow}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>← BACK</button>
                  <button type="button" className={styles.nextBtn} onClick={() => setStep(3)}>CONTINUE TO PAYMENT</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.formStep}>
                <h2>PAYMENT</h2>
                <div className={styles.paymentMethods}>
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                    { id: 'apple', label: 'Apple Pay', icon: <Smartphone size={18} /> },
                    { id: 'bank', label: 'Bank Transfer', icon: <Building2 size={18} /> },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      className={`${styles.paymentMethod} ${paymentMethod === m.id ? styles.activeMethod : ''}`}
                      onClick={() => setPaymentMethod(m.id)}
                    >
                      {m.icon}{m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div className={styles.field}>
                      <label>Card Number</label>
                      <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className={styles.grid2}>
                      <div className={styles.field}>
                        <label>Expiry Date</label>
                        <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className={styles.field}>
                        <label>CVC</label>
                        <input name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" maxLength={3} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Name on Card</label>
                      <input name="cardName" value={form.cardName} onChange={handleChange} />
                    </div>
                  </>
                )}

                {paymentMethod === 'apple' && (
                  <div className={styles.applePay}>
                    <button type="button" className={styles.applePayBtn}>Pay with Apple Pay</button>
                  </div>
                )}

                <div className={styles.btnRow}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>← BACK</button>
                  <button type="submit" className={styles.placeOrderBtn}>PLACE ORDER — £{total.toFixed(2)}</button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Summary */}
        <div className={styles.summarySide}>
          <h3>YOUR ORDER</h3>
          <div className={styles.summaryItems}>
            {items.map(item => (
              <div key={item.key} className={styles.summaryItem}>
                <div className={styles.summaryImageWrapper}>
                  <img src={item.image} alt={item.name} />
                  <span className={styles.summaryQty}>{item.quantity}</span>
                </div>
                <div className={styles.summaryItemInfo}>
                  <p className={styles.summaryItemName}>{item.name}</p>
                  <p className={styles.summaryItemMeta}>{item.selectedColor} · {item.selectedSize}</p>
                </div>
                <span className={styles.summaryItemPrice}>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className={styles.summaryRow}><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span></div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>TOTAL</span><span>£{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
