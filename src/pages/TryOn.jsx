import { useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, X, Sparkles, RefreshCw, ArrowRight, Camera, Key } from 'lucide-react';
import { getProductById, products } from '../data/products';
import styles from './TryOn.module.css';

async function callClaudeVision(apiKey, imageBase64, imageType, product) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: imageType, data: imageBase64 }
          },
          {
            type: 'text',
            text: `You are a personal fashion stylist at Regent & Row, a luxury Indian linen brand.

A customer has shared their photo. They are considering: "${product.name}"
Fabric: ${product.fabric}
Available colours: ${product.colors.join(', ')}
About this piece: ${product.description}

Write a warm, personalised 150-word style reading in second person. Cover:
1. How this garment's silhouette will suit their body type
2. Which colour will complement them best and why
3. How the linen will feel in Indian/tropical heat
4. One precise styling suggestion

Be warm, specific, and aspirational — like a luxury boutique stylist.`
          }
        ]
      }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '';
}

export default function TryOn() {
  const [searchParams] = useSearchParams();
  const defaultProduct = searchParams.get('product') ? getProductById(searchParams.get('product')) : null;

  const [apiKey, setApiKey] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [userImage, setUserImage] = useState(null);
  const [userImageBase64, setUserImageBase64] = useState(null);
  const [userImageType, setUserImageType] = useState('image/jpeg');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [gender, setGender] = useState('all');
  const fileInputRef = useRef(null);

  const tryOnProducts = products.filter(p => p.category !== 'sale' &&
    (gender === 'all' || p.category === gender));

  const handleFile = useCallback((file) => {
    if (!file?.type.startsWith('image/')) { setError('Please upload a valid image (JPG, PNG, WEBP).'); return; }
    if (file.size > 8 * 1024 * 1024) { setError('Image must be under 8MB.'); return; }
    setError(null);
    setUserImageType(file.type || 'image/jpeg');
    setUserImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = e => setUserImageBase64(e.target.result.split(',')[1]);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleGenerate = async () => {
    if (!userImageBase64 || !selectedProduct || !apiKey) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const text = await callClaudeVision(apiKey, userImageBase64, userImageType, selectedProduct);
      setResult(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>AI-Powered Experience</span>
          <h1>Virtual Try-On</h1>
          <p>Upload your photo. Our AI stylist will tell you exactly how any piece looks on you — fit, colour, drape and all.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ── LEFT: Steps ── */}
          <div className={styles.leftPanel}>

            {/* Step 0: API Key */}
            <div className={`${styles.step} ${apiKeySet ? styles.stepDone : ''}`}>
              <div className={styles.stepNum}>{apiKeySet ? '✓' : '00'}</div>
              <div className={styles.stepContent}>
                <h3>Your Anthropic API Key</h3>
                <p>Required to power the AI. Your key is never stored — used only in your browser session.</p>
                {!apiKeySet ? (
                  <div className={styles.apiKeyForm}>
                    <div className={styles.apiKeyInput}>
                      <Key size={14} />
                      <input
                        type="password"
                        placeholder="sk-ant-api03-..."
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                      />
                    </div>
                    <button
                      className={styles.apiKeyBtn}
                      onClick={() => { if (apiKey.startsWith('sk-ant')) setApiKeySet(true); else setError('Please enter a valid Anthropic API key (starts with sk-ant)'); }}
                    >
                      Confirm Key
                    </button>
                    <a href="https://console.anthropic.com/keys" target="_blank" rel="noopener noreferrer" className={styles.getKeyLink}>
                      Get a free API key →
                    </a>
                  </div>
                ) : (
                  <div className={styles.keyConfirmed}>
                    <span>✓ API key confirmed</span>
                    <button onClick={() => { setApiKeySet(false); setApiKey(''); }} className={styles.changeKey}>Change</button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 1: Photo */}
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepContent}>
                <h3>Your Photo</h3>
                <p>Well-lit, full or upper body. Front-facing works best.</p>
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
                    <Upload size={26} strokeWidth={1.5} />
                    <p>Drop photo here or click to browse</p>
                    <span>JPG · PNG · WEBP · Max 8MB</span>
                  </div>
                ) : (
                  <div className={styles.uploadedWrap}>
                    <img src={userImage} alt="Your photo" className={styles.uploadedImg} />
                    <button className={styles.removeImg} onClick={() => { setUserImage(null); setUserImageBase64(null); setResult(null); }}>
                      <X size={14} /> Change photo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Product */}
            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepContent}>
                <h3>Choose a Piece</h3>
                <p>Select the linen garment you want to try on.</p>
                <div className={styles.genderTabs}>
                  {[['all','All'],['women','Women'],['men','Men'],['resort','Resort']].map(([v,l]) => (
                    <button key={v} className={`${styles.genderTab} ${gender===v ? styles.activeTab : ''}`}
                      onClick={() => setGender(v)}>{l}</button>
                  ))}
                </div>
                <div className={styles.productPicker}>
                  {tryOnProducts.map(p => (
                    <button key={p.id}
                      className={`${styles.pickerItem} ${selectedProduct?.id === p.id ? styles.pickerActive : ''}`}
                      onClick={() => { setSelectedProduct(p); setResult(null); }}>
                      <img src={p.image} alt={p.name} />
                      <div className={styles.pickerInfo}>
                        <span className={styles.pickerName}>{p.name}</span>
                        <span className={styles.pickerMeta}>{p.fabric}</span>
                        <span className={styles.pickerPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                      {selectedProduct?.id === p.id && <span className={styles.pickerCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className={`${styles.generateBtn} ${(!userImage || !selectedProduct || loading || !apiKeySet) ? styles.disabled : ''}`}
              onClick={handleGenerate}
              disabled={!userImage || !selectedProduct || loading || !apiKeySet}
            >
              {loading
                ? <><RefreshCw size={16} className={styles.spinning} />Analysing your style...</>
                : <><Sparkles size={16} />See It On You</>}
            </button>
            {error && <div className={styles.errorMsg}><span>⚠</span>{error}</div>}
          </div>

          {/* ── RIGHT: Result ── */}
          <div className={styles.rightPanel}>
            {!result && !loading && (
              <div className={styles.placeholder}>
                <div className={styles.placeholderVisual}>
                  <Camera size={52} strokeWidth={1} />
                </div>
                <h3>Your Style Reading</h3>
                <p>Complete all steps on the left to receive a personalised AI style description tailored to you.</p>
                <div className={styles.steps}>
                  {['Enter your Anthropic API key', 'Upload a clear photo', 'Select a linen piece', 'Click "See It On You"'].map((s, i) => (
                    <div key={i} className={styles.stepHint}>
                      <span className={styles.stepHintNum}>{i + 1}</span>
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className={styles.loadingState}>
                <Sparkles size={40} strokeWidth={1} className={styles.loadingIcon} />
                <h3>Reading your style...</h3>
                <p>Our AI is analysing your photo and the selected garment.</p>
                <div className={styles.dots}><span /><span /><span /></div>
              </div>
            )}

            {result && selectedProduct && (
              <div className={styles.result}>
                <div className={styles.resultBadge}><Sparkles size={13} />Personal Style Reading</div>
                <div className={styles.resultProduct}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                  <div>
                    <p className={styles.rProductName}>{selectedProduct.name}</p>
                    <p className={styles.rProductFabric}>{selectedProduct.fabric}</p>
                    <p className={styles.rProductPrice}>₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className={styles.resultBody}>
                  {result.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className={styles.resultActions}>
                  <Link to={`/product/${selectedProduct.id}`} className={styles.shopBtn}>
                    Shop This Piece <ArrowRight size={14} />
                  </Link>
                  <button className={styles.tryAgainBtn} onClick={() => setResult(null)}>Try Another</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className={styles.disclaimer}>
          Your API key and photo are never stored on our servers. All processing happens in your browser session only.
          Style descriptions are AI-generated guidance — actual fit may vary.
        </p>
      </div>
    </main>
  );
}
