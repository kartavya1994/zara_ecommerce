import { useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, Camera, X, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { getProductById, products } from '../data/products';
import styles from './TryOn.module.css';

export default function TryOn() {
  const [searchParams] = useSearchParams();
  const defaultProductId = searchParams.get('product');
  const defaultProduct = defaultProductId ? getProductById(defaultProductId) : null;

  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [userImage, setUserImage] = useState(null);
  const [userImageBase64, setUserImageBase64] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const tryOnProducts = products.filter(p => p.category !== 'sale').slice(0, 12);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be under 8MB.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    setUserImage(url);
    const reader = new FileReader();
    reader.onload = (e) => setUserImageBase64(e.target.result.split(',')[1]);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleGenerate = async () => {
    if (!userImageBase64 || !selectedProduct) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const prompt = `You are a fashion AI assistant for Regent & Row, a luxury linen clothing brand.

The user has uploaded a photo of themselves. You need to create a detailed, vivid, written "virtual try-on" description that paints a picture of how they would look wearing the "${selectedProduct.name}" in colour "${selectedProduct.colors[0]}".

The garment details:
- Name: ${selectedProduct.name}
- Fabric: ${selectedProduct.fabric}
- Colours available: ${selectedProduct.colors.join(', ')}
- Description: ${selectedProduct.description}

Based on the person's photo, write a warm, personal, luxury fashion stylist's description (150–200 words) of:
1. How the garment would fit and drape on their body
2. Which colour from the options would suit them best and why
3. How the linen fabric would feel and look on them specifically
4. A styling suggestion — what to pair it with

Write in second person ("you / your"). Be specific, warm, and aspirational — like a personal stylist at a luxury boutique. End with a one-sentence affirmation about their style.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/jpeg', data: userImageBase64 }
              },
              { type: 'text', text: prompt }
            ]
          }]
        })
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const text = data.content.map(b => b.text || '').join('');
      setResult(text);
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>New Experience</span>
          <h1>Virtual Try-On</h1>
          <p>Upload your photo. Our AI stylist will tell you exactly how any Regent & Row piece will look and feel on you — colour, drape, fit and all.</p>
        </div>

        <div className={styles.layout}>
          {/* LEFT: Upload + Product Select */}
          <div className={styles.leftPanel}>

            {/* Step 1 – Photo */}
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepContent}>
                <h3>Your Photo</h3>
                <p>A clear, well-lit photo works best. Full-body or upper body.</p>
                {!userImage ? (
                  <div
                    className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" accept="image/*" className={styles.fileInput}
                      onChange={e => handleFile(e.target.files[0])} />
                    <Upload size={28} strokeWidth={1.5} />
                    <p>Drop your photo here</p>
                    <span>or click to browse</span>
                    <span className={styles.dropzoneNote}>JPG, PNG, WEBP · Max 8MB</span>
                  </div>
                ) : (
                  <div className={styles.uploadedImage}>
                    <img src={userImage} alt="Your photo" />
                    <button className={styles.removeImage} onClick={reset}><X size={16} /></button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 – Product */}
            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepContent}>
                <h3>Choose a Piece</h3>
                <p>Select the linen garment you'd like to try on.</p>
                <div className={styles.productPicker}>
                  {tryOnProducts.map(p => (
                    <button
                      key={p.id}
                      className={`${styles.pickerItem} ${selectedProduct?.id === p.id ? styles.pickerActive : ''}`}
                      onClick={() => { setSelectedProduct(p); setResult(null); }}
                    >
                      <img src={p.image} alt={p.name} />
                      <div className={styles.pickerInfo}>
                        <span className={styles.pickerName}>{p.name}</span>
                        <span className={styles.pickerPrice}>{p.currency}{p.price.toLocaleString('en-IN')}</span>
                      </div>
                      {selectedProduct?.id === p.id && <div className={styles.pickerCheck}>✓</div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              className={`${styles.generateBtn} ${(!userImage || !selectedProduct || loading) ? styles.disabled : ''}`}
              onClick={handleGenerate}
              disabled={!userImage || !selectedProduct || loading}
            >
              {loading ? (
                <><RefreshCw size={16} className={styles.spinning} /> Analysing your style...</>
              ) : (
                <><Sparkles size={16} /> See It On You</>
              )}
            </button>

            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>

          {/* RIGHT: Result */}
          <div className={styles.rightPanel}>
            {!result && !loading && (
              <div className={styles.resultPlaceholder}>
                <div className={styles.placeholderIcon}>✦</div>
                <h3>Your Style Reading</h3>
                <p>Upload your photo and select a garment to receive a personalised style description from our AI stylist.</p>
                <div className={styles.howItWorks}>
                  <h4>How it works</h4>
                  {[
                    'Upload a clear photo of yourself',
                    'Choose a linen piece from our collection',
                    'Our AI analyses your photo and the garment',
                    'Receive a personalised fit and style description',
                  ].map((s, i) => (
                    <div key={i} className={styles.howStep}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className={styles.loadingState}>
                <div className={styles.loadingIcon}>✦</div>
                <h3>Reading your style...</h3>
                <p>Our AI stylist is analysing your photo and the selected piece. This takes just a moment.</p>
                <div className={styles.loadingDots}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            {result && selectedProduct && (
              <div className={styles.result}>
                <div className={styles.resultHeader}>
                  <Sparkles size={16} className={styles.sparkle} />
                  <span>Your Style Reading</span>
                </div>

                <div className={styles.resultProduct}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                  <div>
                    <p className={styles.resultProductName}>{selectedProduct.name}</p>
                    <p className={styles.resultProductFabric}>{selectedProduct.fabric}</p>
                  </div>
                </div>

                <div className={styles.resultText}>
                  {result.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className={styles.resultActions}>
                  <Link to={`/product/${selectedProduct.id}`} className={styles.shopNowBtn}>
                    Shop This Piece <ArrowRight size={14} />
                  </Link>
                  <button className={styles.tryAnotherBtn} onClick={() => setResult(null)}>
                    Try Another Piece
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          Your photo is processed securely and never stored. The AI stylist provides descriptive guidance — actual fit may vary. For size queries, consult our Size Guide.
        </p>
      </div>
    </main>
  );
}
