import { useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, X, Copy, Check, ArrowRight, Camera, ExternalLink, Sparkles } from 'lucide-react';
import { getProductById, products } from '../data/products';
import styles from './TryOn.module.css';

function buildPrompt(product, color) {
  return `I am shopping at Regent & Row, a luxury Indian linen brand, and I am considering buying this outfit:

👗 OUTFIT: ${product.name}
🎨 COLOUR I'M CONSIDERING: ${color || product.colors[0]}
🧵 FABRIC: ${product.fabric}
📦 WHAT'S INCLUDED: ${product.outfit?.includes?.join(', ') || product.name}
📝 ABOUT THIS PIECE: ${product.description}
💡 STYLING TIP FROM THE BRAND: ${product.outfit?.styling || 'Style as you wish.'}

I have attached a photo of myself above. Please act as a personal fashion stylist and give me a warm, detailed style reading (about 150 words) covering:
1. How this outfit's silhouette and cut will suit my body type specifically
2. Whether the colour "${color || product.colors[0]}" will complement my skin tone, and if not which colour from these options would suit me better: ${product.colors.join(', ')}
3. How the linen fabric will feel and look on me in Indian/tropical heat
4. One precise styling suggestion — what to pair this with

Be warm, specific, and aspirational. End with a one-line confidence boost about my personal style.`;
}

export default function TryOn() {
  const [searchParams] = useSearchParams();
  const defaultProduct = searchParams.get('product') ? getProductById(searchParams.get('product')) : null;

  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [selectedColor, setSelectedColor] = useState(defaultProduct?.colors[0] || '');
  const [userImage, setUserImage] = useState(null);
  const [gender, setGender] = useState('all');
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(1); // 1=select, 2=ready
  const fileInputRef = useRef(null);

  const tryOnProducts = products.filter(p =>
    p.category !== 'sale' &&
    (gender === 'all' || p.category === gender)
  );

  const handleFile = useCallback((file) => {
    if (!file?.type.startsWith('image/')) return;
    setUserImage(URL.createObjectURL(file));
  }, []);

  const handleCopyPrompt = async () => {
    if (!selectedProduct) return;
    const prompt = buildPrompt(selectedProduct, selectedColor);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenClaude = () => {
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
  };

  const isReady = selectedProduct && userImage;

  return (
    <main className={styles.main}>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>✦ Free Feature</span>
          <h1>Virtual Try-On</h1>
          <p>Upload your photo, select a piece, copy your personalised prompt — then paste it into Claude.ai for a free AI style reading. No account needed on our end.</p>
          <div className={styles.heroSteps}>
            {['Select outfit', 'Upload photo', 'Copy prompt', 'Open Claude.ai'].map((s, i) => (
              <div key={i} className={styles.heroStep}>
                <span>{i + 1}</span><p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ── LEFT PANEL ── */}
          <div className={styles.left}>

            {/* STEP 1: Select Product */}
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepBadge}>01</div>
                <div>
                  <h3>Choose Your Outfit</h3>
                  <p>Select the linen piece you want to try on</p>
                </div>
              </div>

              <div className={styles.genderTabs}>
                {[['all','All'],['women','Women'],['men','Men'],['kids','Kids'],['resort','Resort']].map(([v,l]) => (
                  <button key={v}
                    className={`${styles.gTab} ${gender === v ? styles.gTabActive : ''}`}
                    onClick={() => setGender(v)}>{l}</button>
                ))}
              </div>

              <div className={styles.productList}>
                {tryOnProducts.map(p => (
                  <button key={p.id}
                    className={`${styles.productItem} ${selectedProduct?.id === p.id ? styles.productActive : ''}`}
                    onClick={() => { setSelectedProduct(p); setSelectedColor(p.colors[0]); }}>
                    <div className={styles.productItemImg}>
                      <img src={p.image} alt={p.name} />
                    </div>
                    <div className={styles.productItemInfo}>
                      <span className={styles.productItemCat}>{p.category} · {p.subcategory}</span>
                      <span className={styles.productItemName}>{p.name}</span>
                      <span className={styles.productItemPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                    {selectedProduct?.id === p.id && <span className={styles.productCheck}>✓</span>}
                  </button>
                ))}
              </div>

              {/* Color picker */}
              {selectedProduct && (
                <div className={styles.colorPicker}>
                  <p className={styles.colorLabel}>Choose colour:</p>
                  <div className={styles.colorBtns}>
                    {selectedProduct.colors.map(c => (
                      <button key={c}
                        className={`${styles.colorBtn} ${selectedColor === c ? styles.colorActive : ''}`}
                        onClick={() => setSelectedColor(c)}>{c}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Upload Photo */}
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepBadge}>02</div>
                <div>
                  <h3>Upload Your Photo</h3>
                  <p>You'll paste this into Claude.ai in the next step</p>
                </div>
              </div>

              {!userImage ? (
                <div
                  className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input ref={fileInputRef} type="file" accept="image/*"
                    className={styles.fileInput} onChange={e => handleFile(e.target.files[0])} />
                  <Upload size={28} strokeWidth={1.5} />
                  <p>Drop your photo here or click to browse</p>
                  <span>JPG · PNG · WEBP · Any size</span>
                </div>
              ) : (
                <div className={styles.uploadedWrap}>
                  <img src={userImage} alt="Your photo" className={styles.uploadedImg} />
                  <button className={styles.changePhoto}
                    onClick={() => { setUserImage(null); fileInputRef.current?.click(); }}>
                    <X size={13} /> Change photo
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*"
                    className={styles.fileInput} onChange={e => handleFile(e.target.files[0])} />
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className={styles.right}>

            {!isReady ? (
              <div className={styles.waitCard}>
                <div className={styles.waitIcon}><Camera size={48} strokeWidth={1} /></div>
                <h3>Complete steps 01 &amp; 02</h3>
                <p>Once you've selected an outfit and uploaded your photo, your personalised try-on prompt will appear here — ready to copy and paste into Claude.ai.</p>
                <div className={styles.claudePreview}>
                  <div className={styles.claudePreviewHeader}>
                    <span>claude.ai</span>
                    <span className={styles.claudeFree}>Free</span>
                  </div>
                  <p>Claude.ai is a free AI assistant that can analyse your photo and give you a detailed style reading. No sign-up required for basic use.</p>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className={styles.claudeLink}>
                    Visit Claude.ai <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ) : (
              <div className={styles.readyCard}>
                {/* Selected product summary */}
                <div className={styles.selectedSummary}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                  <div>
                    <p className={styles.summaryName}>{selectedProduct.name}</p>
                    <p className={styles.summaryColor}>Colour: {selectedColor}</p>
                    <p className={styles.summaryFabric}>{selectedProduct.fabric}</p>
                  </div>
                </div>

                <div className={styles.divider} />

                {/* Instructions */}
                <div className={styles.instructions}>
                  <h3>You're ready! Here's how:</h3>
                  <div className={styles.instrSteps}>
                    <div className={styles.instrStep}>
                      <div className={styles.instrNum}>1</div>
                      <div>
                        <p><strong>Copy your personalised prompt</strong></p>
                        <span>Click the button below — it copies a detailed style prompt with your outfit details</span>
                      </div>
                    </div>
                    <div className={styles.instrStep}>
                      <div className={styles.instrNum}>2</div>
                      <div>
                        <p><strong>Open Claude.ai</strong></p>
                        <span>Click the button to open Claude.ai in a new tab — it's free to use</span>
                      </div>
                    </div>
                    <div className={styles.instrStep}>
                      <div className={styles.instrNum}>3</div>
                      <div>
                        <p><strong>Paste prompt + attach photo</strong></p>
                        <span>Paste the prompt, then attach your photo using the 📎 button in Claude.ai</span>
                      </div>
                    </div>
                    <div className={styles.instrStep}>
                      <div className={styles.instrNum}>4</div>
                      <div>
                        <p><strong>Get your style reading</strong></p>
                        <span>Claude will analyse your photo and give a personalised style description</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prompt preview */}
                <div className={styles.promptPreview}>
                  <div className={styles.promptPreviewHeader}>
                    <span>Your personalised prompt</span>
                  </div>
                  <p className={styles.promptText}>
                    I am shopping at Regent &amp; Row and considering: <strong>{selectedProduct.name}</strong> in <strong>{selectedColor}</strong>. I have attached my photo — please give me a personalised style reading covering fit, colour, fabric and styling...
                  </p>
                </div>

                {/* Action buttons */}
                <div className={styles.actionBtns}>
                  <button className={`${styles.copyBtn} ${copied ? styles.copiedBtn : ''}`}
                    onClick={handleCopyPrompt}>
                    {copied
                      ? <><Check size={16} /> Prompt Copied!</>
                      : <><Copy size={16} /> Copy My Prompt</>}
                  </button>
                  <button className={styles.claudeBtn} onClick={handleOpenClaude}>
                    <ExternalLink size={16} /> Open Claude.ai Free
                  </button>
                </div>

                <div className={styles.tipBox}>
                  <span>💡</span>
                  <p>On Claude.ai, paste the prompt first, then click the <strong>📎 paperclip icon</strong> to attach your photo, then press Enter.</p>
                </div>

                {/* Shop CTA */}
                <div className={styles.shopCta}>
                  <p>Love what you see?</p>
                  <Link to={`/product/${selectedProduct.id}`} className={styles.shopBtn}>
                    View Full Outfit Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className={styles.disclaimer}>
          Your photo is never uploaded to our servers. The try-on feature works entirely through Claude.ai, which has its own privacy policy. We have no access to your photo or Claude.ai conversation.
        </p>
      </div>
    </main>
  );
}
