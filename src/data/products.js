export const categories = [
  { id: 'woman', label: 'WOMAN', slug: 'woman' },
  { id: 'man', label: 'MAN', slug: 'man' },
  { id: 'kids', label: 'KIDS', slug: 'kids' },
  { id: 'home', label: 'HOME', slug: 'home' },
  { id: 'beauty', label: 'BEAUTY', slug: 'beauty' },
  { id: 'sale', label: 'SALE', slug: 'sale' },
];

const womanImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
  'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
  'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80',
  'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4f3e?w=600&q=80',
];

const manImages = [
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
  'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80',
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
  'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&q=80',
  'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80',
  'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=600&q=80',
];

const kidsImages = [
  'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80',
  'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80',
  'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
];

const homeImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  'https://images.unsplash.com/photo-1590736969596-1a75c5b6e8b8?w=600&q=80',
];

const womanProducts = [
  { id: 'w1', name: 'LINEN BLEND OVERSIZED BLAZER', price: 89.99, originalPrice: null, category: 'woman', subcategory: 'blazers', image: womanImages[0], images: [womanImages[0], womanImages[1]], colors: ['Ecru', 'Black', 'Camel'], sizes: ['XS','S','M','L','XL'], isNew: true, description: 'Oversized blazer in linen blend fabric. Notch lapel collar, long sleeves with button cuffs. Welt pockets at chest and front.' },
  { id: 'w2', name: 'FLOWING MIDI DRESS', price: 69.99, originalPrice: null, category: 'woman', subcategory: 'dresses', image: womanImages[1], images: [womanImages[1], womanImages[2]], colors: ['Sand', 'Black'], sizes: ['XS','S','M','L'], isNew: true, description: 'Flowy midi dress with crossover neckline. Adjustable straps and subtle slit at the hem.' },
  { id: 'w3', name: 'WIDE LEG TROUSERS', price: 49.99, originalPrice: null, category: 'woman', subcategory: 'trousers', image: womanImages[2], images: [womanImages[2], womanImages[3]], colors: ['Black', 'Beige', 'Navy'], sizes: ['XS','S','M','L','XL'], isNew: false, description: 'Wide leg trousers with high waist. Belt loops, side and back pockets.' },
  { id: 'w4', name: 'MINIMALIST WOOL COAT', price: 159.99, originalPrice: null, category: 'woman', subcategory: 'coats', image: womanImages[3], images: [womanImages[3], womanImages[0]], colors: ['Camel', 'Black', 'Grey'], sizes: ['XS','S','M','L'], isNew: true, description: 'Long coat in wool blend. Lapel collar, long sleeves, and single button at chest.' },
  { id: 'w5', name: 'KNIT RIBBED TOP', price: 29.99, originalPrice: null, category: 'woman', subcategory: 'tops', image: womanImages[4], images: [womanImages[4], womanImages[5]], colors: ['White', 'Black', 'Ecru', 'Terracotta'], sizes: ['XS','S','M','L','XL'], isNew: false, description: 'Form-fitting ribbed knit top with round neck and long sleeves.' },
  { id: 'w6', name: 'SATIN EFFECT SLIP SKIRT', price: 39.99, originalPrice: null, category: 'woman', subcategory: 'skirts', image: womanImages[5], images: [womanImages[5], womanImages[6]], colors: ['Champagne', 'Black', 'Dusty Rose'], sizes: ['XS','S','M','L'], isNew: true, description: 'Midi skirt in satin effect fabric. Elasticated waist and subtle side slit.' },
  { id: 'w7', name: 'LEATHER EFFECT JACKET', price: 119.99, originalPrice: null, category: 'woman', subcategory: 'jackets', image: womanImages[6], images: [womanImages[6], womanImages[7]], colors: ['Black', 'Brown'], sizes: ['XS','S','M','L'], isNew: false, description: 'Biker-style jacket in leather effect fabric. Asymmetric zip closure and multiple pockets.' },
  { id: 'w8', name: 'CROPPED SHIRT', price: 35.99, originalPrice: null, category: 'woman', subcategory: 'shirts', image: womanImages[7], images: [womanImages[7], womanImages[8]], colors: ['White', 'Blue', 'Black'], sizes: ['XS','S','M','L','XL'], isNew: false, description: 'Cropped shirt in cotton blend. Classic collar and button closure.' },
  { id: 'w9', name: 'DRAPED EVENING GOWN', price: 129.99, originalPrice: null, category: 'woman', subcategory: 'dresses', image: womanImages[8], images: [womanImages[8], womanImages[9]], colors: ['Black', 'Midnight Blue'], sizes: ['XS','S','M','L'], isNew: true, description: 'Floor-length gown with elegant draping. One shoulder neckline and side slit.' },
  { id: 'w10', name: 'STRUCTURED SHOULDER BAG', price: 79.99, originalPrice: null, category: 'woman', subcategory: 'accessories', image: womanImages[9], images: [womanImages[9], womanImages[10]], colors: ['Black', 'Tan', 'White'], sizes: ['One Size'], isNew: true, description: 'Structured bag with shoulder strap. Magnetic closure and interior zip pocket.' },
  { id: 'w11', name: 'PLEATED MIDI SKIRT', price: 45.99, originalPrice: null, category: 'woman', subcategory: 'skirts', image: womanImages[10], images: [womanImages[10], womanImages[11]], colors: ['Camel', 'Black', 'Forest Green'], sizes: ['XS','S','M','L','XL'], isNew: false, description: 'Pleated skirt with elasticated waist.' },
  { id: 'w12', name: 'BELTED TRENCH COAT', price: 139.99, originalPrice: null, category: 'woman', subcategory: 'coats', image: womanImages[11], images: [womanImages[11], womanImages[0]], colors: ['Camel', 'Khaki'], sizes: ['XS','S','M','L'], isNew: false, description: 'Classic trench coat with storm flap, epaulettes, and belted waist.' },
];

const manProducts = [
  { id: 'm1', name: 'SLIM FIT SUIT', price: 199.99, originalPrice: null, category: 'man', subcategory: 'suits', image: manImages[0], images: [manImages[0], manImages[1]], colors: ['Navy', 'Charcoal', 'Black'], sizes: ['44','46','48','50','52'], isNew: true, description: 'Slim fit suit with notch lapel. Two-button closure and welt pockets.' },
  { id: 'm2', name: 'LINEN SHIRT', price: 39.99, originalPrice: null, category: 'man', subcategory: 'shirts', image: manImages[1], images: [manImages[1], manImages[2]], colors: ['White', 'Ecru', 'Blue', 'Olive'], sizes: ['S','M','L','XL','XXL'], isNew: false, description: '100% linen shirt. Classic collar and front button placket.' },
  { id: 'm3', name: 'STRAIGHT FIT TROUSERS', price: 55.99, originalPrice: null, category: 'man', subcategory: 'trousers', image: manImages[2], images: [manImages[2], manImages[3]], colors: ['Black', 'Grey', 'Beige'], sizes: ['28','30','32','34','36'], isNew: false, description: 'Straight fit trousers with belt loops and side pockets.' },
  { id: 'm4', name: 'WOOL BLEND OVERCOAT', price: 179.99, originalPrice: null, category: 'man', subcategory: 'coats', image: manImages[3], images: [manImages[3], manImages[0]], colors: ['Camel', 'Navy', 'Grey'], sizes: ['S','M','L','XL'], isNew: true, description: 'Long overcoat in wool blend. Notch collar and single-button closure.' },
  { id: 'm5', name: 'RELAXED FIT TEE', price: 19.99, originalPrice: null, category: 'man', subcategory: 'tshirts', image: manImages[4], images: [manImages[4], manImages[5]], colors: ['White', 'Black', 'Grey', 'Navy'], sizes: ['S','M','L','XL','XXL'], isNew: false, description: 'Relaxed fit T-shirt in 100% cotton. Crew neck.' },
  { id: 'm6', name: 'DENIM JACKET', price: 79.99, originalPrice: null, category: 'man', subcategory: 'jackets', image: manImages[5], images: [manImages[5], manImages[6]], colors: ['Light Blue', 'Dark Blue', 'Black'], sizes: ['S','M','L','XL'], isNew: false, description: 'Classic denim jacket with chest pockets and button closure.' },
  { id: 'm7', name: 'KNIT SWEATER', price: 65.99, originalPrice: null, category: 'man', subcategory: 'knitwear', image: manImages[6], images: [manImages[6], manImages[7]], colors: ['Camel', 'Navy', 'Grey', 'Black'], sizes: ['S','M','L','XL'], isNew: true, description: 'Fine knit sweater with crew neck and ribbed hem.' },
  { id: 'm8', name: 'LEATHER BELT', price: 35.99, originalPrice: null, category: 'man', subcategory: 'accessories', image: manImages[7], images: [manImages[7], manImages[0]], colors: ['Black', 'Brown'], sizes: ['85','90','95','100','105'], isNew: false, description: 'Genuine leather belt with metal buckle.' },
];

const kidsProducts = [
  { id: 'k1', name: 'GIRLS FLORAL DRESS', price: 29.99, originalPrice: null, category: 'kids', subcategory: 'girls', image: kidsImages[0], images: [kidsImages[0], kidsImages[1]], colors: ['Pink', 'Blue'], sizes: ['2Y','3Y','4Y','5Y','6Y'], isNew: true, description: 'Pretty floral print dress with smock details.' },
  { id: 'k2', name: 'BOYS CHINO TROUSERS', price: 24.99, originalPrice: null, category: 'kids', subcategory: 'boys', image: kidsImages[1], images: [kidsImages[1], kidsImages[2]], colors: ['Khaki', 'Navy', 'Black'], sizes: ['3Y','4Y','5Y','6Y','7Y','8Y'], isNew: false, description: 'Slim fit chino trousers with adjustable waistband.' },
  { id: 'k3', name: 'KIDS KNIT CARDIGAN', price: 32.99, originalPrice: null, category: 'kids', subcategory: 'unisex', image: kidsImages[2], images: [kidsImages[2], kidsImages[3]], colors: ['Camel', 'Grey', 'Pink'], sizes: ['2Y','3Y','4Y','5Y','6Y'], isNew: true, description: 'Soft knit cardigan with button closure.' },
  { id: 'k4', name: 'KIDS PUFFER JACKET', price: 49.99, originalPrice: null, category: 'kids', subcategory: 'unisex', image: kidsImages[3], images: [kidsImages[3], kidsImages[0]], colors: ['Navy', 'Red', 'Black'], sizes: ['3Y','4Y','5Y','6Y','7Y','8Y','9Y','10Y'], isNew: false, description: 'Lightweight puffer jacket. Perfect for cold weather.' },
];

const homeProducts = [
  { id: 'h1', name: 'LINEN CUSHION COVER', price: 25.99, originalPrice: null, category: 'home', subcategory: 'cushions', image: homeImages[0], images: [homeImages[0], homeImages[1]], colors: ['Natural', 'White', 'Sage'], sizes: ['45x45cm', '50x50cm'], isNew: true, description: '100% washed linen cushion cover. Invisible zip closure.' },
  { id: 'h2', name: 'CERAMIC MUG SET', price: 39.99, originalPrice: null, category: 'home', subcategory: 'kitchen', image: homeImages[1], images: [homeImages[1], homeImages[2]], colors: ['White', 'Sage', 'Terracotta'], sizes: ['Set of 2', 'Set of 4'], isNew: false, description: 'Handmade ceramic mugs. 350ml capacity. Dishwasher safe.' },
  { id: 'h3', name: 'WAFFLE WEAVE THROW', price: 55.99, originalPrice: null, category: 'home', subcategory: 'textiles', image: homeImages[2], images: [homeImages[2], homeImages[3]], colors: ['Ecru', 'Oatmeal', 'Charcoal'], sizes: ['130x170cm'], isNew: true, description: 'Cotton waffle weave throw blanket. Perfect for the sofa.' },
  { id: 'h4', name: 'SCENTED CANDLE', price: 22.99, originalPrice: null, category: 'home', subcategory: 'fragrance', image: homeImages[3], images: [homeImages[3], homeImages[0]], colors: ['Black Vessel', 'White Vessel'], sizes: ['200g', '400g'], isNew: false, description: 'Hand-poured soy wax candle. Burn time: 45 hours (200g).' },
];

const saleProducts = [
  { ...womanProducts[2], id: 's1', price: 29.99, originalPrice: 49.99, category: 'sale' },
  { ...womanProducts[4], id: 's2', price: 19.99, originalPrice: 29.99, category: 'sale' },
  { ...manProducts[1], id: 's3', price: 24.99, originalPrice: 39.99, category: 'sale' },
  { ...manProducts[4], id: 's4', price: 12.99, originalPrice: 19.99, category: 'sale' },
  { ...kidsProducts[1], id: 's5', price: 14.99, originalPrice: 24.99, category: 'sale' },
  { ...homeProducts[3], id: 's6', price: 14.99, originalPrice: 22.99, category: 'sale' },
];

export const products = [
  ...womanProducts,
  ...manProducts,
  ...kidsProducts,
  ...homeProducts,
  ...saleProducts,
];

export const getProductsByCategory = (category) =>
  category === 'all' ? products : products.filter(p => p.category === category);

export const getProductById = (id) => products.find(p => p.id === id);

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=85',
    title: 'NEW COLLECTION',
    subtitle: 'SS 2025',
    cta: 'SHOP WOMAN',
    link: '/category/woman',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1400&q=85',
    title: 'THE MODERN MAN',
    subtitle: 'ESSENTIALS',
    cta: 'SHOP MAN',
    link: '/category/man',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85',
    title: 'ZARA HOME',
    subtitle: 'LIVING COLLECTION',
    cta: 'SHOP HOME',
    link: '/category/home',
  },
];
