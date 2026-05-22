import { useState } from 'react';
import { User, Package, Heart, MapPin, CreditCard, LogOut } from 'lucide-react';
import styles from './Account.module.css';

const tabs = [
  { id: 'profile', label: 'PROFILE', icon: <User size={16} /> },
  { id: 'orders', label: 'MY ORDERS', icon: <Package size={16} /> },
  { id: 'wishlist', label: 'WISHLIST', icon: <Heart size={16} /> },
  { id: 'addresses', label: 'ADDRESSES', icon: <MapPin size={16} /> },
  { id: 'payment', label: 'PAYMENT', icon: <CreditCard size={16} /> },
];

const mockOrders = [
  { id: 'ZR-48291', date: '12 May 2025', items: 3, total: 189.97, status: 'Delivered' },
  { id: 'ZR-39104', date: '28 Apr 2025', items: 1, total: 69.99, status: 'In Transit' },
  { id: 'ZR-31002', date: '10 Apr 2025', items: 2, total: 109.98, status: 'Delivered' },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleAuth = (e) => { e.preventDefault(); setLoggedIn(true); };

  if (!loggedIn) return (
    <main className={styles.main}>
      <div className={styles.authBox}>
        <h1>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</h1>
        <p className={styles.authSub}>{isSignUp ? 'Join ZARR for exclusive benefits' : 'Welcome back'}</p>
        <form onSubmit={handleAuth} className={styles.form}>
          {isSignUp && (
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
          )}
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          {!isSignUp && <a href="#" className={styles.forgotLink}>Forgot your password?</a>}
          <button type="submit" className={styles.authBtn}>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</button>
        </form>
        <p className={styles.switchAuth}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className={styles.switchBtn}>
            {isSignUp ? 'SIGN IN' : 'CREATE ONE'}
          </button>
        </p>
      </div>
    </main>
  );

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.avatar}>
              <div className={styles.avatarCircle}><User size={28} /></div>
              <div>
                <p className={styles.userName}>{form.name || 'My Account'}</p>
                <p className={styles.userEmail}>{form.email || 'user@email.com'}</p>
              </div>
            </div>
            <nav className={styles.tabs}>
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={`${styles.tab} ${activeTab === t.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}{t.label}
                </button>
              ))}
              <button className={`${styles.tab} ${styles.logoutTab}`} onClick={() => setLoggedIn(false)}>
                <LogOut size={16} />SIGN OUT
              </button>
            </nav>
          </aside>

          <div className={styles.content}>
            {activeTab === 'profile' && (
              <div className={styles.section}>
                <h2>PERSONAL INFORMATION</h2>
                <div className={styles.profileGrid}>
                  <div className={styles.field}><label>First Name</label><input defaultValue="Kartavya" /></div>
                  <div className={styles.field}><label>Last Name</label><input defaultValue="" /></div>
                  <div className={styles.field}><label>Email</label><input type="email" defaultValue={form.email} /></div>
                  <div className={styles.field}><label>Phone</label><input type="tel" defaultValue="" /></div>
                </div>
                <div className={styles.field}><label>Date of Birth</label><input type="date" /></div>
                <button className={styles.saveBtn}>SAVE CHANGES</button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className={styles.section}>
                <h2>MY ORDERS</h2>
                {mockOrders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <p className={styles.orderId}>Order {order.id}</p>
                        <p className={styles.orderDate}>{order.date} · {order.items} items</p>
                      </div>
                      <div className={styles.orderRight}>
                        <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase().replace(' ', '')]}`}>
                          {order.status}
                        </span>
                        <p className={styles.orderTotal}>£{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className={styles.orderActions}>
                      <button className={styles.orderBtn}>VIEW DETAILS</button>
                      {order.status === 'Delivered' && <button className={styles.orderBtn}>RETURN</button>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className={styles.section}>
                <h2>MY ADDRESSES</h2>
                <div className={styles.addressGrid}>
                  <div className={styles.addressCard}>
                    <p className={styles.addressLabel}>DEFAULT</p>
                    <p>Kartavya</p>
                    <p>123 Fashion Street</p>
                    <p>London, EC1A 1BB</p>
                    <p>United Kingdom</p>
                    <div className={styles.addressActions}>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                  <button className={styles.addAddressBtn}>+ ADD NEW ADDRESS</button>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className={styles.section}>
                <h2>PAYMENT METHODS</h2>
                <div className={styles.paymentCard}>
                  <CreditCard size={20} />
                  <div>
                    <p>Visa ending in 4242</p>
                    <p className={styles.cardExpiry}>Expires 12/27</p>
                  </div>
                  <span className={styles.defaultBadge}>Default</span>
                </div>
                <button className={styles.saveBtn}>+ ADD NEW CARD</button>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className={styles.section}>
                <h2>MY WISHLIST</h2>
                <p className={styles.emptyText}>View your saved items on the <a href="/wishlist">wishlist page</a>.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
