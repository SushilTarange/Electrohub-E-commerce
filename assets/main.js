/* ============================================
   ELECTROHUB — COMPLETE APP.JS
   All features: Cart, Wishlist, Auth, Orders,
   Admin, Reviews, Search, Checkout, Profile
   ============================================ */

/* ==================== DATA ==================== */
const PRODUCTS_DATA = [
  { id:1, name:"iPhone 15 Pro", brand:"Apple", category:"phones", price:134900, original:149900, image:"https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80", short:"A17 Pro chip, Titanium design, 48MP camera", desc:"The iPhone 15 Pro features the groundbreaking A17 Pro chip, a titanium frame for premium durability, and a 48MP main camera with advanced computational photography. The 6.1-inch Super Retina XDR display delivers stunning visuals.", specs:["A17 Pro Chip","6.1-inch OLED","48MP Camera","USB-C Port","5G Ready","256GB Storage"], rating:4.8, reviews:1240, stock:25, isNew:true },
  { id:2, name:"Samsung Galaxy S24 Ultra", brand:"Samsung", category:"phones", price:129999, original:134999, image:"https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&q=80", short:"200MP camera, S-Pen included, 6.8-inch display", desc:"The Galaxy S24 Ultra sets the benchmark with its 200MP camera, integrated S-Pen, and the powerful Snapdragon 8 Gen 3 processor. Experience Galaxy AI features like Circle to Search and Live Translate.", specs:["Snapdragon 8 Gen 3","6.8-inch QHD+","200MP Camera","S-Pen Included","5000mAh Battery","12GB RAM"], rating:4.7, reviews:980, stock:18 },
  { id:3, name:"MacBook Air M3", brand:"Apple", category:"laptops", price:114900, original:124900, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", short:"M3 chip, 15-inch Liquid Retina, 18hr battery", desc:"The MacBook Air with M3 chip delivers exceptional performance with up to 18 hours of battery life. The stunning 15-inch Liquid Retina display and silent fanless design make it the perfect everyday laptop.", specs:["Apple M3 Chip","15-inch Liquid Retina","18hr Battery","16GB Unified Memory","512GB SSD","MagSafe Charging"], rating:4.9, reviews:2100, stock:12, isNew:true },
  { id:4, name:"Dell XPS 15", brand:"Dell", category:"laptops", price:169900, original:184900, image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80", short:"Intel Core i9, RTX 4070, 4K OLED display", desc:"The Dell XPS 15 combines stunning design with extreme performance. Featuring a 4K OLED display, Intel Core i9 processor, and NVIDIA GeForce RTX 4070 graphics for content creation and gaming.", specs:["Intel Core i9","15.6-inch 4K OLED","RTX 4070 8GB","64GB DDR5 RAM","2TB NVMe SSD","Thunderbolt 4"], rating:4.6, reviews:456, stock:8 },
  { id:5, name:"Sony Bravia XR 55-inch 4K", brand:"Sony", category:"tvs", price:89990, original:109990, image:"https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80", short:"XR Processor, Google TV, Dolby Vision", desc:"Sony Bravia XR with Cognitive Processor XR delivers picture quality that mirrors how humans see. Dolby Vision and Dolby Atmos support for an immersive home theatre experience.", specs:["55-inch 4K OLED","XR Cognitive Processor","Dolby Vision & Atmos","Google TV","HDMI 2.1 x4","120Hz Refresh Rate"], rating:4.7, reviews:789, stock:15 },
  { id:6, name:"LG OLED C3 65-inch", brand:"LG", category:"tvs", price:139990, original:164990, image:"https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400&q=80", short:"OLED evo panel, a9 AI Processor, 120Hz", desc:"LG OLED C3 features the brightest OLED panel with the a9 Gen6 AI Processor 4K. Perfect blacks, infinite contrast, and webOS 23 with ThinQ AI for smart home integration.", specs:["65-inch OLED evo","a9 Gen6 AI Processor","120Hz VRR","Dolby Vision IQ","webOS 23","NVIDIA G-Sync"], rating:4.8, reviews:612, stock:9 },
  { id:7, name:"Sony WH-1000XM5", brand:"Sony", category:"audio", price:29990, original:34990, image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", short:"Industry-best ANC, 30hr battery, LDAC", desc:"The WH-1000XM5 sets the industry standard for noise cancellation with dual processors. Crystal clear hands-free calling and up to 30 hours of playtime with quick charging.", specs:["30hr Battery Life","Industry-Best ANC","LDAC Hi-Res Audio","Multipoint Connection","360° Spatial Sound","Quick Charge (3min=3hrs)"], rating:4.9, reviews:3400, stock:50 },
  { id:8, name:"Apple AirPods Pro 2nd Gen", brand:"Apple", category:"audio", price:24900, original:26900, image:"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80", short:"H2 chip, Adaptive Transparency, MagSafe", desc:"AirPods Pro with H2 chip deliver up to 2x more Active Noise Cancellation. Adaptive Transparency lets you hear the world while protecting your hearing in loud environments.", specs:["H2 Chip","Adaptive ANC","6hr Battery (30hr case)","MagSafe Case","USB-C Charging","Spatial Audio"], rating:4.7, reviews:2800, stock:40 },
  { id:9, name:"Canon EOS R6 Mark II", brand:"Canon", category:"cameras", price:239990, original:259990, image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", short:"40fps burst, 4K 60p video, IBIS", desc:"The EOS R6 Mark II is Canon's most versatile mirrorless camera. With 40fps burst shooting, subject recognition AF, and 6K RAW video oversampled to 4K, it's perfect for professionals.", specs:["40fps RAW Burst","4K 60p Video","In-Body Stabilization","Subject Recognition AF","Dual Memory Slots","Wi-Fi & Bluetooth"], rating:4.8, reviews:340, stock:6 },
  { id:10, name:"Sony Alpha A7 IV", brand:"Sony", category:"cameras", price:259990, original:279990, image:"https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&q=80", short:"33MP full-frame, 4K 60p, 759-point AF", desc:"The Alpha 7 IV is a high-resolution hybrid camera for photo and video creators. The 33MP full-frame sensor and Real-time Tracking AF with 759-point coverage delivers professional results.", specs:["33MP Full-Frame","4K 60p 10-bit","759-Point AF","5-Axis Stabilization","Dual SD Slots","CFexpress Type A"], rating:4.7, reviews:280, stock:5 },
  { id:11, name:"Samsung 49-inch Odyssey G9", brand:"Samsung", category:"gaming", price:109990, original:124990, image:"https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&q=80", short:"240Hz, 1ms, DQHD Curved Gaming Monitor", desc:"The Odyssey G9 is the ultimate gaming monitor with a massive 49-inch 1000R curved display. 240Hz refresh rate and 1ms response time ensure you never miss a frame.", specs:["49-inch DQHD Curved","240Hz Refresh Rate","1ms Response Time","HDR2000","G-Sync Compatible","USB Hub Built-in"], rating:4.6, reviews:520, stock:11 },
  { id:12, name:"PlayStation 5 Console", brand:"Sony", category:"gaming", price:54990, original:54990, image:"https://images.unsplash.com/photo-1607853202273-232359b5d0a4?w=400&q=80", short:"4K gaming, 120fps, DualSense controller", desc:"The PlayStation 5 delivers lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback and adaptive triggers in the DualSense controller.", specs:["Custom AMD RDNA 2","4K 120fps Gaming","Ultra-High Speed SSD","3D Audio","Ray Tracing","Backward Compatible"], rating:4.9, reviews:4200, stock:3, isNew:true },
  { id:13, name:"Apple Watch Ultra 2", brand:"Apple", category:"wearables", price:89900, original:96900, image:"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80", short:"Titanium case, 60hr battery, dual-frequency GPS", desc:"Apple Watch Ultra 2 with the brightest Apple Watch display ever. Built for athletes and adventurers with dual-frequency GPS, precision search for diving, and 60-hour battery in Low Power Mode.", specs:["49mm Titanium Case","S9 SiP Chip","60hr Battery","Dual-Frequency GPS","100m Water Resistance","Emergency Siren"], rating:4.8, reviews:890, stock:14 },
  { id:14, name:"Samsung Galaxy Watch 6 Classic", brand:"Samsung", category:"wearables", price:34999, original:39999, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", short:"Rotating bezel, BioActive sensor, WearOS", desc:"Galaxy Watch 6 Classic brings back the iconic rotating bezel with advanced health features. The BioActive sensor monitors heart rate, ECG, body composition and blood oxygen.", specs:["47mm Stainless Steel","Rotating Bezel","BioActive Sensor","ECG & Blood Pressure","40hr Battery","WearOS 4"], rating:4.5, reviews:670, stock:22 },
  { id:15, name:"Anker 735 GaN Charger 65W", brand:"Anker", category:"accessories", price:2999, original:3999, image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80", short:"65W GaN, 3 ports, compact design", desc:"The Anker 735 Charger uses GaN II technology to deliver ultra-fast charging through 3 ports simultaneously. Charge a MacBook, iPhone, and AirPods all at once with one compact brick.", specs:["65W Total Output","3 Ports (2 USB-C + 1 USB-A)","GaN II Technology","Compact Design","Foldable Plug","ActiveShield 2.0"], rating:4.7, reviews:1560, stock:80 },
  { id:16, name:"Logitech MX Master 3S", brand:"Logitech", category:"accessories", price:9995, original:10995, image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", short:"8000 DPI, MagSpeed scroll, Quiet clicks", desc:"The MX Master 3S is the most advanced Master Series mouse ever. Ultra-fast MagSpeed electromagnetic scrolling lets you scroll 1000 lines per second with zero noise.", specs:["8000 DPI Sensor","MagSpeed Scrolling","Quiet Clicks","3 Device Bluetooth","USB-C Charging","70-Day Battery"], rating:4.8, reviews:2300, stock:35 },
  { id:17, name:"iPad Pro 12.9-inch M4", brand:"Apple", category:"phones", price:109900, original:119900, image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", short:"M4 chip, Ultra Retina XDR, Apple Pencil Pro", desc:"The iPad Pro with M4 chip is the thinnest Apple product ever. The Ultra Retina XDR OLED display with nano-texture glass and Apple Pencil Pro support makes it perfect for creative professionals.", specs:["Apple M4 Chip","12.9-inch Ultra Retina XDR","Apple Pencil Pro Support","Wi-Fi 6E + 5G","Thunderbolt 4","Face ID"], rating:4.9, reviews:540, stock:20, isNew:true },
  { id:18, name:"OnePlus 12", brand:"OnePlus", category:"phones", price:64999, original:69999, image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80", short:"Snapdragon 8 Gen 3, 100W charging, Hasselblad", desc:"OnePlus 12 features the flagship Snapdragon 8 Gen 3 processor, Hasselblad-tuned cameras, and blazing 100W SUPERVOOC charging that fills up the 5400mAh battery in just 26 minutes.", specs:["Snapdragon 8 Gen 3","6.82-inch QHD+ 120Hz","100W SUPERVOOC","5400mAh Battery","Hasselblad Camera","50MP Triple Camera"], rating:4.6, reviews:780, stock:30 },
];

/* ==================== INIT STATE ==================== */
let cart = JSON.parse(localStorage.getItem('eh_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('eh_wishlist') || '[]');
let orders = JSON.parse(localStorage.getItem('eh_orders') || '[]');
let users = JSON.parse(localStorage.getItem('eh_users') || '[]');
let currentUser = JSON.parse(localStorage.getItem('eh_currentUser') || 'null');
let products = JSON.parse(localStorage.getItem('eh_products') || 'null') || PRODUCTS_DATA;
let reviews = JSON.parse(localStorage.getItem('eh_reviews') || '{}');

let currentCategory = 'all';
let currentSort = 'default';
let currentMaxPrice = 200000;
let currentSearch = '';
let currentDetailId = null;
let editingProductId = null;
let reviewStarRating = 5;
let pageHistory = [];
let couponApplied = false;

/* ==================== SAVE ==================== */
function saveAll() {
  localStorage.setItem('eh_cart', JSON.stringify(cart));
  localStorage.setItem('eh_wishlist', JSON.stringify(wishlist));
  localStorage.setItem('eh_orders', JSON.stringify(orders));
  localStorage.setItem('eh_users', JSON.stringify(users));
  localStorage.setItem('eh_products', JSON.stringify(products));
  localStorage.setItem('eh_reviews', JSON.stringify(reviews));
  if (currentUser) localStorage.setItem('eh_currentUser', JSON.stringify(currentUser));
  else localStorage.removeItem('eh_currentUser');
}

/* ==================== TOAST ==================== */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ==================== PAGES ==================== */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (!pg) return;
  pg.classList.add('active');
  pageHistory.push(name);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const catNav = document.getElementById('catNav');
  const footer = document.getElementById('mainFooter');
  const hideNav = ['login','register','admin'].includes(name);
  catNav.style.display = hideNav ? 'none' : '';

  // Per-page render
  if (name === 'home') renderProducts();
  if (name === 'wishlist') renderWishlist();
  if (name === 'orders') renderOrders();
  if (name === 'profile') renderProfile();
  if (name === 'checkout') renderCheckout();
  if (name === 'admin') { if (!currentUser || currentUser.role !== 'admin') { showPage('login'); showToast('Admin access only'); return; } renderAdmin(); }
  updateAuthUI();
}

function historyBack() {
  pageHistory.pop();
  const prev = pageHistory[pageHistory.length - 1] || 'home';
  showPage(prev);
}

/* ==================== NAVBAR ==================== */
document.addEventListener('click', function(e) {
  const drop = document.getElementById('accountDropdown');
  const btn = document.getElementById('accountBtn');
  if (drop && !drop.contains(e.target) && !btn.contains(e.target)) {
    drop.classList.remove('open');
  }
});

function toggleAccountMenu() {
  document.getElementById('accountDropdown').classList.toggle('open');
}
function closeAccountMenu() {
  document.getElementById('accountDropdown').classList.remove('open');
}
function toggleMobileMenu() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  const isOpen = m.classList.toggle('open');
  h.classList.toggle('open', isOpen);
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ==================== AUTH UI ==================== */
function updateAuthUI() {
  const guestMenu = document.getElementById('guestMenu');
  const userMenu = document.getElementById('userMenu');
  const adminBtn = document.getElementById('adminMenuBtn');
  const accInfo = document.getElementById('accUserInfo');

  if (currentUser) {
    guestMenu.style.display = 'none';
    userMenu.style.display = 'block';
    accInfo.innerHTML = `<strong>${currentUser.name}</strong>${currentUser.email}`;
    adminBtn.style.display = currentUser.role === 'admin' ? 'flex' : 'none';
  } else {
    guestMenu.style.display = 'block';
    userMenu.style.display = 'none';
  }
  updateBadges();
}

/* ==================== REGISTER ==================== */
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  if (password !== confirm) { showToast('❌ Passwords do not match'); return; }
  if (password.length < 6) { showToast('❌ Password must be at least 6 characters'); return; }
  if (users.find(u => u.email === email)) { showToast('❌ Email already registered'); return; }

  const user = { id: Date.now(), name, email, phone, password, role: 'user', joined: new Date().toLocaleDateString('en-IN'), address: '' };
  users.push(user);
  currentUser = user;
  saveAll();
  showToast('✅ Account created successfully!');
  showPage('home');
  updateAuthUI();
}

/* ==================== LOGIN ==================== */
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { showToast('❌ Invalid email or password'); return; }
  currentUser = user;
  saveAll();
  showToast(`✅ Welcome back, ${user.name}!`);
  showPage('home');
  updateAuthUI();
}

function demoLogin(role) {
  if (role === 'admin') {
    let admin = users.find(u => u.role === 'admin');
    if (!admin) {
      admin = { id: 1, name: 'Admin User', email: 'admin@electrohub.com', phone: '9999999999', password: 'admin123', role: 'admin', joined: '01/01/2024', address: '' };
      users.push(admin);
    }
    currentUser = admin;
  } else {
    let demo = users.find(u => u.email === 'demo@electrohub.com');
    if (!demo) {
      demo = { id: 2, name: 'Demo User', email: 'demo@electrohub.com', phone: '8888888888', password: 'demo123', role: 'user', joined: new Date().toLocaleDateString('en-IN'), address: '123 Demo Street, Pune' };
      users.push(demo);
    }
    currentUser = demo;
  }
  saveAll();
  showToast(`✅ Logged in as ${currentUser.name}`);
  showPage('home');
  updateAuthUI();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('eh_currentUser');
  updateAuthUI();
  showPage('home');
  showToast('👋 Logged out successfully');
  closeAccountMenu();
}

function togglePw(id) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

/* ==================== PRODUCTS ==================== */
function getFilteredProducts() {
  let list = [...products];
  if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.short.toLowerCase().includes(q));
  }
  list = list.filter(p => p.price <= currentMaxPrice);

  if (currentSort === 'price-low') list.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-high') list.sort((a,b) => b.price - a.price);
  else if (currentSort === 'rating') list.sort((a,b) => b.rating - a.rating);
  else if (currentSort === 'discount') list.sort((a,b) => (b.original - b.price) - (a.original - a.price));

  return list;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const noRes = document.getElementById('noResults');
  const label = document.getElementById('productCountLabel');
  const list = getFilteredProducts();
  label.textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;
  if (!list.length) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';
  grid.innerHTML = list.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  const disc = p.original > p.price ? Math.round((p.original - p.price) / p.original * 100) : 0;
  const isWished = wishlist.includes(p.id);
  const stars = renderStars(p.rating);
  const badge = p.isNew ? '<span class="prod-badge new">NEW</span>' : disc > 10 ? `<span class="prod-badge">${disc}% OFF</span>` : '';
  const stockTxt = p.stock < 5 ? `<span class="stock-low">Only ${p.stock} left!</span>` : '';
  return `
  <div class="product-card" onclick="openDetail(${p.id})">
    <div class="prod-img-wrap">
      ${badge}
      <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'"/>
      <button class="wish-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation();toggleWishlist(${p.id})" title="Wishlist">
        <i class="${isWished ? 'fa' : 'far'} fa-heart"></i>
      </button>
    </div>
    <div class="prod-body">
      <div class="prod-brand">${p.brand}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-short">${p.short}</div>
      <div class="prod-rating"><span class="stars">${stars}</span><span class="rating-count">${p.rating} (${p.reviews.toLocaleString()})</span></div>
      <div class="prod-pricing">
        <span class="prod-price">₹${p.price.toLocaleString('en-IN')}</span>
        ${p.original > p.price ? `<span class="prod-original">₹${p.original.toLocaleString('en-IN')}</span><span class="prod-discount">${disc}% off</span>` : ''}
      </div>
      ${stockTxt}
      <div class="prod-actions">
        <button class="add-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'Out of Stock' : '<i class="fa fa-cart-plus"></i> Add to Cart'}</button>
        <button class="view-btn" onclick="event.stopPropagation();openDetail(${p.id})" title="View Details"><i class="fa fa-eye"></i></button>
      </div>
    </div>
  </div>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '½';
  return s;
}

function filterCategory(cat, btn) {
  currentCategory = cat; currentSearch = '';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else { const b = document.querySelector(`.cat-btn[data-cat="${cat}"]`); if (b) b.classList.add('active'); }
  showPage('home');
  renderProducts();
  setTimeout(() => scrollToProducts(), 100);
}

function sortProducts(val) { currentSort = val; renderProducts(); }

function applyPriceFilter(val) {
  currentMaxPrice = parseInt(val);
  document.getElementById('priceLabel').textContent = '₹' + parseInt(val).toLocaleString('en-IN');
  renderProducts();
}

function scrollToProducts() {
  const el = document.getElementById('productsSection');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ==================== SEARCH ==================== */
let searchTimeout;
function liveSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (val.trim().length > 1) doSearch(val);
    else if (!val.trim()) { currentSearch = ''; renderProducts(); }
  }, 300);
}

function doSearch(query) {
  const q = query || document.getElementById('searchInput').value.trim();
  if (!q) return;
  currentSearch = q;
  document.getElementById('searchQueryLabel').textContent = q;
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase()) ||
    p.short.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  const grid = document.getElementById('searchGrid');
  const empty = document.getElementById('searchEmpty');
  if (!results.length) { grid.innerHTML = ''; empty.style.display = 'block'; }
  else { empty.style.display = 'none'; grid.innerHTML = results.map(p => productCardHTML(p)).join(''); }
  showPage('search');
}

/* ==================== DETAIL ==================== */
function openDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentDetailId = id;
  const disc = p.original > p.price ? Math.round((p.original - p.price) / p.original * 100) : 0;
  const isWished = wishlist.includes(p.id);
  const stars = renderStars(p.rating);
  const specHTML = (p.specs || []).map(s => `<div class="spec-item">${s}</div>`).join('');
  const prodReviews = reviews[id] || [];

  document.getElementById('detailContent').innerHTML = `
    <div>
      <div class="detail-img-wrap">
        <img class="detail-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'"/>
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-brand">${p.brand}</div>
      <h1 class="detail-name">${p.name}</h1>
      <div class="detail-rating">
        <span class="stars">${stars}</span>
        <span>${p.rating} stars · ${p.reviews.toLocaleString()} reviews</span>
        ${p.stock < 5 ? `<span class="stock-low">Only ${p.stock} left!</span>` : '<span class="stock-ok">✓ In Stock</span>'}
      </div>
      <div class="detail-pricing">
        <span class="detail-price">₹${p.price.toLocaleString('en-IN')}</span>
        ${p.original > p.price ? `<span class="detail-original">₹${p.original.toLocaleString('en-IN')}</span><span class="detail-discount">${disc}% OFF</span>` : ''}
      </div>
      <p class="detail-desc">${p.desc}</p>
      <div class="detail-specs"><h4>Key Specifications</h4><div class="spec-grid">${specHTML}</div></div>
      <div class="qty-wrap">
        <label>Quantity:</label>
        <div class="qty-ctrl">
          <button onclick="changeDetailQty(-1)">−</button>
          <span id="detailQty">1</span>
          <button onclick="changeDetailQty(1)">+</button>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn-primary" onclick="addToCartWithQty(${p.id})"><i class="fa fa-cart-plus"></i> Add to Cart</button>
        <button class="btn-ghost ${isWished ? 'active' : ''}" id="detailWishBtn" onclick="toggleWishlist(${p.id});updateDetailWish(${p.id})">
          <i class="${isWished ? 'fa' : 'far'} fa-heart"></i> ${isWished ? 'Wishlisted' : 'Wishlist'}
        </button>
      </div>
      <div class="detail-badges">
        <span class="detail-badge">🚚 Free Delivery</span>
        <span class="detail-badge">🔒 Secure Payment</span>
        <span class="detail-badge">🛡️ 1-Year Warranty</span>
        <span class="detail-badge">↩️ 30-Day Returns</span>
      </div>
    </div>`;

  const reviewsHTML = prodReviews.length
    ? prodReviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <div class="review-av">${r.author[0].toUpperCase()}</div>
          <div class="review-meta"><strong>${r.author}</strong><small>${r.date}</small></div>
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        </div>
        <p class="review-text">${r.text}</p>
      </div>`).join('')
    : '<p style="color:var(--text-muted);font-size:14px">No reviews yet. Be the first!</p>';

  document.getElementById('reviewsSection').innerHTML = `
    <h3>Customer Reviews (${prodReviews.length})</h3>
    ${reviewsHTML}
    <button class="btn-primary" style="margin-top:16px" onclick="openReviewModal()"><i class="fa fa-pen"></i> Write a Review</button>`;

  showPage('detail');
}

function changeDetailQty(d) {
  const el = document.getElementById('detailQty');
  const v = parseInt(el.textContent) + d;
  if (v < 1) return;
  const p = products.find(x => x.id === currentDetailId);
  if (v > (p?.stock || 99)) { showToast('⚠️ Not enough stock'); return; }
  el.textContent = v;
}

function addToCartWithQty(id) {
  const qty = parseInt(document.getElementById('detailQty')?.textContent || '1');
  for (let i = 0; i < qty; i++) addToCart(id, true);
  showToast(`🛒 Added ${qty} item${qty>1?'s':''} to cart!`);
  updateBadges();
}

function updateDetailWish(id) {
  const btn = document.getElementById('detailWishBtn');
  const isWished = wishlist.includes(id);
  if (btn) btn.innerHTML = `<i class="${isWished ? 'fa' : 'far'} fa-heart"></i> ${isWished ? 'Wishlisted' : 'Wishlist'}`;
}

/* ==================== CART ==================== */
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCart();
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function addToCart(id, silent = false) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    if (existing.qty >= p.stock) { showToast('⚠️ Max stock reached'); return; }
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveAll(); updateBadges();
  if (!silent) { showToast('🛒 Added to cart!'); renderCart(); }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveAll(); updateBadges(); renderCart();
}

function updateCartQty(id, d) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const p = products.find(x => x.id === id);
  item.qty += d;
  if (item.qty <= 0) { removeFromCart(id); return; }
  if (item.qty > (p?.stock || 99)) { item.qty--; showToast('⚠️ Not enough stock'); return; }
  saveAll(); updateBadges(); renderCart();
}

function renderCart() {
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const empty = document.getElementById('cartEmpty');
  const countLbl = document.getElementById('cartCountLabel');

  if (!cart.length) {
    items.style.display = 'none'; footer.style.display = 'none';
    empty.style.display = 'flex'; return;
  }
  items.style.display = 'flex'; footer.style.display = 'block'; empty.style.display = 'none';

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  countLbl.textContent = `(${totalItems} item${totalItems !== 1 ? 's' : ''})`;

  items.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    return `
    <div class="cart-item">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80'"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">₹${(p.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="cart-item-controls">
          <div class="qty-ctrl-sm">
            <button onclick="updateCartQty(${p.id},-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty(${p.id},1)">+</button>
          </div>
          <button class="cart-item-del" onclick="removeFromCart(${p.id})" title="Remove"><i class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');

  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = cart.reduce((s, i) => {
    const p = products.find(x => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * 0.18);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = taxable + tax + shipping;

  document.getElementById('cartSubtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : '₹99';
  document.getElementById('cartTax').textContent = '₹' + tax.toLocaleString('en-IN');
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
  const discRow = document.getElementById('discountRow');
  if (discRow) { discRow.style.display = couponApplied ? '' : 'none'; document.getElementById('cartDiscount').textContent = '-₹' + discount.toLocaleString('en-IN'); }
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (code === 'ELECTRO10') { couponApplied = true; showToast('🎉 Coupon applied! 10% discount'); updateCartTotals(); }
  else { showToast('❌ Invalid coupon code'); }
}

function updateBadges() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  document.getElementById('wishlistBadge').textContent = wishlist.length;
}

function goCheckout() {
  if (!currentUser) { closeCart(); showPage('login'); showToast('Please login to checkout'); return; }
  if (!cart.length) { showToast('Your cart is empty!'); return; }
  closeCart(); showPage('checkout');
}

/* ==================== WISHLIST ==================== */
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) { wishlist.splice(idx, 1); showToast('💔 Removed from wishlist'); }
  else { wishlist.push(id); showToast('❤️ Added to wishlist!'); }
  saveAll(); updateBadges();
  // Update card button
  const btn = document.querySelector(`.wish-btn[onclick*="${id}"]`);
  if (btn) {
    const isW = wishlist.includes(id);
    btn.classList.toggle('active', isW);
    btn.innerHTML = `<i class="${isW ? 'fa' : 'far'} fa-heart"></i>`;
  }
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const empty = document.getElementById('wishlistEmpty');
  if (!wishlist.length) { grid.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  grid.innerHTML = wishlist.map(id => { const p = products.find(x => x.id === id); return p ? productCardHTML(p) : ''; }).join('');
}

/* ==================== CHECKOUT ==================== */
let currentStep = 1;

function renderCheckout() {
  currentStep = 1;
  updateStepUI();
  // Pre-fill if user has data
  if (currentUser) {
    document.getElementById('chkName').value = currentUser.name || '';
    document.getElementById('chkPhone').value = currentUser.phone || '';
    if (currentUser.address) document.getElementById('chkAddr1').value = currentUser.address;
  }
  renderChkSummary();
}

function renderChkSummary() {
  const itemsEl = document.getElementById('chkItems');
  itemsEl.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    return `<div class="chk-item"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&q=80'"/><div>${p.name}<br/><small>x${item.qty}</small></div><span>₹${(p.price*item.qty).toLocaleString('en-IN')}</span></div>`;
  }).join('');

  const subtotal = cart.reduce((s, i) => { const p = products.find(x => x.id === i.id); return s + (p ? p.price * i.qty : 0); }, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * 0.18);
  const total = taxable + tax;
  document.getElementById('chkSubtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('chkTax').textContent = '₹' + tax.toLocaleString('en-IN');
  document.getElementById('chkTotal').textContent = '₹' + total.toLocaleString('en-IN');
  const dRow = document.getElementById('chkDiscRow');
  if (dRow) { dRow.style.display = couponApplied ? '' : 'none'; document.getElementById('chkDiscount').textContent = '-₹' + discount.toLocaleString('en-IN'); }
}

function goToStep(step) {
  if (step === 2) {
    const name = document.getElementById('chkName').value.trim();
    const phone = document.getElementById('chkPhone').value.trim();
    const addr = document.getElementById('chkAddr1').value.trim();
    const city = document.getElementById('chkCity').value.trim();
    const state = document.getElementById('chkState').value.trim();
    const pin = document.getElementById('chkPin').value.trim();
    if (!name || !phone || !addr || !city || !state || !pin) { showToast('⚠️ Please fill all required fields'); return; }
    if (!/^\d{6}$/.test(pin)) { showToast('⚠️ Enter a valid 6-digit pincode'); return; }
  }
  if (step === 3) {
    // Build review
    const name = document.getElementById('chkName').value;
    const addr1 = document.getElementById('chkAddr1').value;
    const addr2 = document.getElementById('chkAddr2').value;
    const city = document.getElementById('chkCity').value;
    const state = document.getElementById('chkState').value;
    const pin = document.getElementById('chkPin').value;
    const pay = document.querySelector('input[name="payment"]:checked')?.value || 'upi';
    const payLabels = { upi:'📱 UPI', card:'💳 Credit/Debit Card', netbanking:'🏦 Net Banking', emi:'📅 EMI', cod:'💵 Cash on Delivery' };

    document.getElementById('reviewAddress').innerHTML = `<strong>📍 Delivery Address</strong>${name}<br/>${addr1}${addr2 ? ', '+addr2 : ''}, ${city}, ${state} - ${pin}`;
    document.getElementById('reviewPayment').innerHTML = `<strong>💳 Payment Method</strong>${payLabels[pay]}`;

    const itemsEl = document.getElementById('reviewItems');
    itemsEl.innerHTML = cart.map(item => {
      const p = products.find(x => x.id === item.id);
      return p ? `<div class="review-item-row"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&q=80'"/><div>${p.name}<br/><small>Qty: ${item.qty}</small></div><span>₹${(p.price*item.qty).toLocaleString('en-IN')}</span></div>` : '';
    }).join('');
  }
  currentStep = step; updateStepUI();
}

function updateStepUI() {
  [1,2,3].forEach(s => {
    document.getElementById(`chkStep${s}`).style.display = s === currentStep ? '' : 'none';
    const ind = document.getElementById(`stepInd${s}`);
    ind.classList.toggle('active', s === currentStep);
    ind.classList.toggle('done', s < currentStep);
    if (s < currentStep) ind.querySelector('.step-num').textContent = '✓';
    else ind.querySelector('.step-num').textContent = s;
  });
}

function placeOrder() {
  const subtotal = cart.reduce((s, i) => { const p = products.find(x => x.id === i.id); return s + (p ? p.price * i.qty : 0); }, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const total = subtotal - discount + Math.round((subtotal - discount) * 0.18);
  const orderId = 'EH' + Date.now().toString().slice(-8);
  const pay = document.querySelector('input[name="payment"]:checked')?.value || 'upi';
  const addr = `${document.getElementById('chkName').value}, ${document.getElementById('chkAddr1').value}, ${document.getElementById('chkCity').value}, ${document.getElementById('chkState').value} - ${document.getElementById('chkPin').value}`;

  const order = {
    id: orderId, userId: currentUser.id, userName: currentUser.name,
    items: cart.map(i => { const p = products.find(x => x.id === i.id); return { id: i.id, name: p?.name, image: p?.image, price: p?.price, qty: i.qty }; }),
    total, subtotal, discount, payment: pay, address: addr,
    status: 'confirmed', date: new Date().toLocaleDateString('en-IN'),
    timestamp: Date.now()
  };
  orders.unshift(order);

  // Reduce stock
  cart.forEach(item => {
    const p = products.find(x => x.id === item.id);
    if (p) p.stock = Math.max(0, p.stock - item.qty);
  });

  cart = []; couponApplied = false;
  saveAll(); updateBadges();
  document.getElementById('successOrderId').textContent = orderId;
  showPage('success');
}

/* ==================== ORDERS ==================== */
function renderOrders() {
  const list = document.getElementById('ordersList');
  const empty = document.getElementById('ordersEmpty');
  const userOrders = currentUser ? orders.filter(o => o.userId === currentUser.id) : [];

  if (!userOrders.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  list.innerHTML = userOrders.map(o => {
    const statusClass = `status-${o.status}`;
    const steps = ['confirmed','processing','shipped','delivered'];
    const stepIdx = steps.indexOf(o.status);
    const trackHTML = steps.map((s, i) => `<div class="otb-step ${i <= stepIdx ? (i === stepIdx ? 'active' : 'done') : ''}"><span>${s.charAt(0).toUpperCase()+s.slice(1)}</span></div>`).join('');
    const thumbs = o.items.slice(0,4).map(i => `<img class="order-thumb" src="${i.image}" alt="${i.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&q=80'"/>`).join('');
    return `
    <div class="order-card">
      <div class="order-card-top">
        <div class="order-id"><strong>${o.id}</strong>${o.items.length} item${o.items.length!==1?'s':''} · ${o.date}</div>
        <span class="order-status ${statusClass}">${o.status.charAt(0).toUpperCase()+o.status.slice(1)}</span>
      </div>
      <div class="order-items-preview">${thumbs}</div>
      <div class="order-track-bar">${trackHTML}</div>
      <div class="order-card-btm">
        <div class="order-total">₹${o.total.toLocaleString('en-IN')}</div>
        <div class="order-date">Payment: ${o.payment?.toUpperCase()}</div>
        ${o.status === 'confirmed' ? `<button class="btn-ghost" style="font-size:12px;padding:6px 12px" onclick="cancelOrder('${o.id}')">Cancel Order</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function cancelOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  if (!confirm('Are you sure you want to cancel this order?')) return;
  order.status = 'cancelled';
  // Restore stock
  order.items.forEach(item => {
    const p = products.find(x => x.id === item.id);
    if (p) p.stock += item.qty;
  });
  saveAll(); renderOrders(); showToast('❌ Order cancelled');
}

/* ==================== PROFILE ==================== */
function renderProfile() {
  if (!currentUser) { showPage('login'); return; }
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('profileAv').textContent = initials;
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('editName').value = currentUser.name;
  document.getElementById('editEmail').value = currentUser.email;
  document.getElementById('editPhone').value = currentUser.phone || '';
  document.getElementById('editAddress').value = currentUser.address || '';
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  document.getElementById('profOrderCnt').textContent = userOrders.length;
  document.getElementById('profWishCnt').textContent = wishlist.length;
  const userReviews = Object.values(reviews).flat().filter(r => r.userId === currentUser.id);
  document.getElementById('profReviewCnt').textContent = userReviews.length;
}

function saveProfile() {
  if (!currentUser) return;
  currentUser.name = document.getElementById('editName').value.trim() || currentUser.name;
  currentUser.email = document.getElementById('editEmail').value.trim() || currentUser.email;
  currentUser.phone = document.getElementById('editPhone').value.trim();
  currentUser.address = document.getElementById('editAddress').value.trim();
  const userIdx = users.findIndex(u => u.id === currentUser.id);
  if (userIdx > -1) users[userIdx] = { ...users[userIdx], ...currentUser };
  saveAll(); renderProfile(); showToast('✅ Profile saved!');
}

function changePassword() {
  const cur = document.getElementById('curPw').value;
  const nw = document.getElementById('newPw').value;
  const conf = document.getElementById('confirmPw').value;
  if (cur !== currentUser.password) { showToast('❌ Current password is wrong'); return; }
  if (nw.length < 6) { showToast('❌ New password must be 6+ characters'); return; }
  if (nw !== conf) { showToast('❌ Passwords do not match'); return; }
  currentUser.password = nw;
  const userIdx = users.findIndex(u => u.id === currentUser.id);
  if (userIdx > -1) users[userIdx].password = nw;
  saveAll(); showToast('✅ Password updated!');
  document.getElementById('curPw').value = '';
  document.getElementById('newPw').value = '';
  document.getElementById('confirmPw').value = '';
}

/* ==================== REVIEWS ==================== */
function openReviewModal() {
  if (!currentUser) { showPage('login'); showToast('Please login to write a review'); return; }
  reviewStarRating = 5;
  document.getElementById('reviewText').value = '';
  updateStarInput(5);
  document.getElementById('reviewModal').classList.add('open');
}
function closeReviewModal() { document.getElementById('reviewModal').classList.remove('open'); }
function setStarRating(n) { reviewStarRating = n; updateStarInput(n); }
function updateStarInput(n) {
  document.querySelectorAll('#starInput span').forEach((s, i) => s.classList.toggle('active', i < n));
}
function submitReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text) { showToast('⚠️ Please write your review'); return; }
  if (!reviews[currentDetailId]) reviews[currentDetailId] = [];
  reviews[currentDetailId].unshift({
    userId: currentUser.id, author: currentUser.name,
    rating: reviewStarRating, text, date: new Date().toLocaleDateString('en-IN')
  });
  saveAll(); closeReviewModal();
  openDetail(currentDetailId);
  showToast('✅ Review submitted!');
}

/* ==================== ADMIN ==================== */
function renderAdmin() {
  const allOrders = orders;
  const totalRevenue = allOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  document.getElementById('aStat-products').textContent = products.length;
  document.getElementById('aStat-orders').textContent = allOrders.length;
  document.getElementById('aStat-users').textContent = users.length;
  document.getElementById('aStat-revenue').textContent = '₹' + totalRevenue.toLocaleString('en-IN');
  renderAdminOrders(); renderAdminProducts(); renderAdminUsers();
  renderAdminRecentOrders();
}

function renderAdminRecentOrders() {
  const recent = orders.slice(0, 5);
  document.getElementById('adminRecentOrders').innerHTML = recent.length
    ? recent.map(o => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px"><div><strong>${o.id}</strong><br/><small>${o.userName} · ${o.date}</small></div><div><span class="order-status status-${o.status}">${o.status}</span></div><div><strong>₹${o.total.toLocaleString('en-IN')}</strong></div></div>`).join('')
    : '<p style="color:var(--text-muted);font-size:14px;padding:12px 0">No orders yet</p>';
}

function renderAdminProducts() {
  document.getElementById('adminProductBody').innerHTML = products.map(p => `
    <tr>
      <td><img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&q=80'"/></td>
      <td><strong>${p.name}</strong><br/><small>${p.brand}</small></td>
      <td>${p.category}</td>
      <td>₹${p.price.toLocaleString('en-IN')}</td>
      <td>${p.stock < 5 ? `<span class="stock-low">${p.stock}</span>` : p.stock}</td>
      <td>⭐ ${p.rating}</td>
      <td><div class="tbl-actions">
        <button class="edit-btn" onclick="openEditProduct(${p.id})"><i class="fa fa-edit"></i> Edit</button>
        <button class="del-btn" onclick="deleteProduct(${p.id})"><i class="fa fa-trash"></i> Del</button>
      </div></td>
    </tr>`).join('');
}

function renderAdminOrders() {
  document.getElementById('adminOrderBody').innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.userName}</td>
      <td>${o.items.length} items</td>
      <td>₹${o.total.toLocaleString('en-IN')}</td>
      <td><span class="order-status status-${o.status}">${o.status}</span></td>
      <td>${o.date}</td>
      <td>
        <select onchange="updateOrderStatus('${o.id}',this.value)" style="font-size:12px;padding:4px 6px;border-radius:6px;border:1px solid var(--border)">
          <option value="confirmed" ${o.status==='confirmed'?'selected':''}>Confirmed</option>
          <option value="processing" ${o.status==='processing'?'selected':''}>Processing</option>
          <option value="shipped" ${o.status==='shipped'?'selected':''}>Shipped</option>
          <option value="delivered" ${o.status==='delivered'?'selected':''}>Delivered</option>
          <option value="cancelled" ${o.status==='cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
    </tr>`).join('');
}

function renderAdminUsers() {
  document.getElementById('adminUserBody').innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td>${u.phone || '-'}</td>
      <td><span style="font-size:12px;padding:2px 8px;border-radius:4px;background:${u.role==='admin'?'#dbeafe':'#f0fdf4'};color:${u.role==='admin'?'#1d4ed8':'#166534'}">${u.role}</span></td>
      <td>${orders.filter(o => o.userId === u.id).length}</td>
      <td>${u.joined}</td>
    </tr>`).join('');
}

function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) { order.status = status; saveAll(); showToast('✅ Order status updated'); renderAdminRecentOrders(); }
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-content').forEach(c => c.style.display = 'none');
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`adminTab-${tab}`).style.display = '';
  btn.classList.add('active');
}

/* ==================== PRODUCT MODAL ==================== */
function openProductModal() {
  editingProductId = null;
  document.getElementById('prodModalTitle').textContent = 'Add Product';
  ['pName','pBrand','pImage','pShort','pDesc','pSpecs'].forEach(id => document.getElementById(id).value = '');
  ['pPrice','pOriginal','pStock','pRating','pReviews'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pCat').value = 'phones';
  document.getElementById('productModal').classList.add('open');
}

function openEditProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('prodModalTitle').textContent = 'Edit Product';
  document.getElementById('pName').value = p.name;
  document.getElementById('pBrand').value = p.brand;
  document.getElementById('pCat').value = p.category;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pOriginal').value = p.original;
  document.getElementById('pStock').value = p.stock;
  document.getElementById('pImage').value = p.image;
  document.getElementById('pShort').value = p.short;
  document.getElementById('pDesc').value = p.desc;
  document.getElementById('pRating').value = p.rating;
  document.getElementById('pReviews').value = p.reviews;
  document.getElementById('pSpecs').value = (p.specs || []).join(', ');
  document.getElementById('productModal').classList.add('open');
}

function closeProductModal() { document.getElementById('productModal').classList.remove('open'); }

function saveProduct() {
  const name = document.getElementById('pName').value.trim();
  const price = parseInt(document.getElementById('pPrice').value);
  if (!name || !price) { showToast('⚠️ Name and Price are required'); return; }

  const data = {
    name, brand: document.getElementById('pBrand').value.trim(),
    category: document.getElementById('pCat').value,
    price, original: parseInt(document.getElementById('pOriginal').value) || price,
    stock: parseInt(document.getElementById('pStock').value) || 100,
    image: document.getElementById('pImage').value.trim() || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    short: document.getElementById('pShort').value.trim(),
    desc: document.getElementById('pDesc').value.trim(),
    rating: parseFloat(document.getElementById('pRating').value) || 4.5,
    reviews: parseInt(document.getElementById('pReviews').value) || 0,
    specs: document.getElementById('pSpecs').value.split(',').map(s => s.trim()).filter(Boolean),
  };

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx > -1) products[idx] = { ...products[idx], ...data };
    showToast('✅ Product updated!');
  } else {
    data.id = Date.now(); data.isNew = true;
    products.unshift(data);
    showToast('✅ Product added!');
  }
  saveAll(); closeProductModal(); renderAdminProducts(); renderProducts();
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  products = products.filter(p => p.id !== id);
  saveAll(); renderAdminProducts(); renderProducts();
  showToast('🗑️ Product deleted');
}

/* ==================== STICKY NAVBAR ==================== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.1)' : '';
});

/* ==================== INIT ==================== */
function init() {
  updateAuthUI();
  renderProducts();
  showPage('home');

  // Seed demo admin if empty
  if (!users.find(u => u.role === 'admin')) {
    users.push({ id: 1, name: 'Admin User', email: 'admin@electrohub.com', phone: '9999999999', password: 'admin123', role: 'admin', joined: '01/01/2024', address: '' });
    saveAll();
  }
}

document.addEventListener('DOMContentLoaded', init);