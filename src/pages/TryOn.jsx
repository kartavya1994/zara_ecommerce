import { useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, X, Sparkles, RefreshCw, ArrowRight, Camera } from 'lucide-react';
import { getProductById, products } from '../data/products';
import styles from './TryOn.module.css';

// ── Calls Anthropic via an iframe/blob trick to bypass CORS ──────────────────
async function callClaudeVision(imageBase64, imageType, productName, fabric, colors, description) {
  return new Promise((resolve, reject) => {
    const html = `<!DOCTYPE html>
<html>
<body>
<script>
(async () => {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "${imageType}", data: "${imageBase64}" }},
            { type: "text", text: \`You are a personal fashion stylist for Regent & Row, a luxury linen brand.

A customer has shared their photo. They are considering buying: "${productName}"
Fabric: ${fabric}
Available colours: ${colors}
About this piece: ${description}

Write a warm, personalised 150-word style reading in second person (you/your). Cover:
1. How this garment's silhouette and cut will suit their body
2. Which colour from the options will complement them best and why
3. How the linen fabric will feel on their skin in Indian/tropical heat
4. One styling suggestion

Be warm, specific, and aspirational — like a luxury boutique stylist. End with a confident one-liner about their style.\` }
          ]
        }]
      })
    });
    const data = await res.json();
    const text = data.content && data.content[0] && data.content[0].text;
    if (!text) throw new Error(data.error?.message || "No response");
    parent.postMessage({ type: "CLAUDE_RESULT", text }, "*");
  } catch(e) {
    parent.postMessage({ type: "CLAUDE_ERROR", message: e.message }, "*");
  }
})();
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Request timed out. Please try again.'));
    }, 30000);

    function cleanup() {
      clearTimeout(timeout);
      window.removeEventListener('message', handler);
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }

    function handler(event) {
      if (event.data?.type === 'CLAUDE_RESULT') {
        cleanup();
        resolve(event.data.text);
      } else if (event.data?.type === 'CLAUDE_ERROR') {
        cleanup();
        reject(new Error(event.data.message));
      }
    }
    window.addEventListener('message', handler);
  });
}

export default function TryOn() {
  const [searchParams] = useSearchParams();
  const defaultProductId = searchParams.get('product');
  const defaultProduct = defaultProductId ? getProductById(defaultProductId) : null;

  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [userImage, setUserImage] = useState(null);
  const [userImageBase64, setUserImageBase64] = useState(null);
  const [userImageType, setUserImageType] = useState('image/jpeg');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const tryOnProducts = products.filter(p => p.category !== 'sale').slice(0, 12);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be under 8MB.');
      return;
    }
    setError(null);
    setUserImageType(file.type || 'image/jpeg');
    setUserImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = e => setUserImageBase64(e.target.result.split(',')[1]);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleDrop = e => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleGenerate = async () => {
    if (!userImageBase64 || !selectedProduct) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const text = await callClaudeVision(
        userImageBase64,
        userImageType,
        selectedProduct.name,
        selectedProduct.fabric,
        selectedProduct.colors.join(', '),
        selectedProduct.description
      );
      setResult(text);
    } catch (err) {
      setError(`Could not generate style reading: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUserImage(null); setUserImageBase64(null);
    setResult(null); setError(null);
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>New Experience</span>
          <h1 className={styles.title}>Virtual Try-On</h1>
          <p className={styles.subtitle}>Upload your photo. Our AI stylist tells you exactly how any piece will look on you — fit, colour and all.</p>
        </div>

        <div className={styles.layout}>
          {/* LEFT PANEL */}
          <div className={styles.leftPanel}>
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepContent}>
                <h3>Your Photo</h3>
                <p>A clear, well-lit photo works best. Full or upper body.</p>
                {!userImage ? (
                  <div
                    className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" accept="image/*"
                      className={styles.fileInput} onChange={e => handleFile(e.target.files[0])} />
                    <Upload size={28} strokeWidth={1.5} />
                    <p>Drop your photo here</p>
                    <span>or click to browse · Max 8MB</span>
                  </div>
                ) : (
                  <div className={styles.uploadedImage}>
                    <img src={userImage} alt="Your photo" />
                    <button className={styles.removeImage} onClick={reset}><X size={16} /></button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepContent}>
                <h3>Choose a Piece</h3>
                <p>Select the linen garment you want to try on.</p>
                <div className={styles.productPicker}>
                  {tryOnProducts.map(p => (
                    <button key={p.id}
                      className={`${styles.pickerItem} ${selectedProduct?.id === p.id ? styles.pickerActive : ''}`}
                      onClick={() => { setSelectedProduct(p); setResult(null); }}>
                      <img src={p.image} alt={p.name} />
                      <div className={styles.pickerInfo}>
                        <span className={styles.pickerName}>{p.name}</span>
                        <span className={styles.pickerPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                      {selectedProduct?.id === p.id && <span className={styles.pickerCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className={`${styles.generateBtn} ${(!userImage || !selectedProduct || loading) ? styles.disabled : ''}`}
              onClick={handleGenerate}
              disabled={!userImage || !selectedProduct || loading}
            >
              {loading
                ? <><RefreshCw size={16} className={styles.spinning} /> Analysing your style...</>
                : <><Sparkles size={16} /> See It On You</>}
            </button>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>

          {/* RIGHT PANEL */}
          <div className={styles.rightPanel}>
            {!result && !loading && (
              <div className={styles.placeholder}>
                <Camera size={48} strokeWidth={1} className={styles.placeholderIcon} />
                <h3>Your Style Reading</h3>
                <p>Upload your photo and select a garment to get a personalised AI style description.</p>
                <div className={styles.howItWorks}>
                  <h4>How it works</h4>
                  {['Upload a clear photo of yourself', 'Choose a linen piece from our collection', 'Our AI reads your photo + the garment', 'Get a personal fit, colour & style guide'].map((s, i) => (
                    <div key={i} className={styles.howStep}>
                      <span>{String(i+1).padStart(2,'0')}</span><p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className={styles.loadingState}>
                <div className={styles.loadingIcon}><Sparkles size={40} strokeWidth={1} /></div>
                <h3>Reading your style...</h3>
                <p>Analysing your photo and the selected garment.</p>
                <div className={styles.loadingDots}><span /><span /><span /></div>
              </div>
            )}

            {result && selectedProduct && (
              <div className={styles.result}>
                <div className={styles.resultHeader}>
                  <Sparkles size={14} /><span>Your Personal Style Reading</span>
                </div>
                <div className={styles.resultProduct}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                  <div>
                    <p className={styles.resultProductName}>{selectedProduct.name}</p>
                    <p className={styles.resultProductFabric}>{selectedProduct.fabric}</p>
                  </div>
                </div>
                <div className={styles.resultText}>
                  {result.split('\n').filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
                </div>
                <div className={styles.resultActions}>
                  <Link to={`/product/${selectedProduct.id}`} className={styles.shopNowBtn}>
                    Shop This Piece <ArrowRight size={14} />
                  </Link>
                  <button className={styles.tryAnotherBtn} onClick={() => setResult(null)}>Try Another</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className={styles.disclaimer}>Your photo is processed securely and never stored. AI descriptions are for guidance only.</p>
      </div>
    </main>
  );
}
