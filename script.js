// ============================================
// TEQNIKO ENGINEERING — script.js
// Cart + Tracking + Google Sheets Integration
// ============================================

// ============================================
// The tracking/enquiry endpoint hosted on Vercel
// ============================================
const SHEET_URL = "/api/submit";

// ============================================
// PRODUCT DATA
// ============================================
const PRODUCTS = [
  // --- WELDING RODS ---
  { id: "w1", name: "Mild Steel Rod", cat: "welding", catLabel: "Welding Rods", spec: "General purpose MS welding electrode", icon: "🔧" },
  { id: "w2", name: "Stainless Steel Rod", cat: "welding", catLabel: "Welding Rods", spec: "For SS welding applications", icon: "🔧" },
  { id: "w3", name: "Cast Iron Rod", cat: "welding", catLabel: "Welding Rods", spec: "For cast iron repair & joining", icon: "🔧" },
  { id: "w4", name: "Hard Facing Rod", cat: "welding", catLabel: "Welding Rods", spec: "High wear-resistance hard facing", icon: "🔧" },
  { id: "w5", name: "Gouging & Cutting Rod", cat: "welding", catLabel: "Welding Rods", spec: "For gouging, cutting operations", icon: "🔧" },
  { id: "w6", name: "Joining Rod", cat: "welding", catLabel: "Welding Rods", spec: "Special purpose joining electrode", icon: "🔧" },
  { id: "w7", name: "Aluminium Rod", cat: "welding", catLabel: "Welding Rods", spec: "For aluminium & alloy welding", icon: "🔧" },
  { id: "w8", name: "Tungsten Rod", cat: "welding", catLabel: "Welding Rods", spec: "TIG welding tungsten electrode", icon: "🔧" },
  { id: "w9", name: "SS Filler Wire", cat: "welding", catLabel: "Filler Wires", spec: "Stainless steel MIG/TIG filler wire", icon: "🔩" },
  { id: "w10", name: "MS Wire", cat: "welding", catLabel: "Filler Wires", spec: "Mild steel MIG wire", icon: "🔩" },
  { id: "w11", name: "Hard Facing Wire", cat: "welding", catLabel: "Filler Wires", spec: "Wear-resistant hard facing wire", icon: "🔩" },
  { id: "w12", name: "Joining Wire", cat: "welding", catLabel: "Filler Wires", spec: "Special purpose joining wire", icon: "🔩" },

  // --- STONES ---
  { id: "s1", name: "Rough Polishing Stone", cat: "stones", catLabel: "Stones", spec: "150×50×25 | Very Tough Abrasive | Rough polishing & high metal removal", icon: "🪨" },
  { id: "s2", name: "Medium Polishing Stone", cat: "stones", catLabel: "Stones", spec: "150×25×15 | Medium polishing, metal removal & light cutting", icon: "🪨" },
  { id: "s3", name: "Smooth Polishing Stone", cat: "stones", catLabel: "Stones", spec: "150×25×8 | Smooth polishing, cool cutting & sharping", icon: "🪨" },
  { id: "s4", name: "Tool Sharping Stone", cat: "stones", catLabel: "Stones", spec: "150×50×25 | Sharping tools, grinding & honing tool steel edges", icon: "🪨" },
  { id: "s5", name: "Diamond Dressing Stone", cat: "stones", catLabel: "Stones", spec: "150×25×25 | Truing, cleaning & dressing diamond", icon: "🪨" },

  // --- ABRASIVES ---
  { id: "a1", name: "Grinding Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "Heavy duty grinding for steel & metals", icon: "⭕" },
  { id: "a2", name: "Cut Off Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "Precision cutting of metal & pipes", icon: "⭕" },
  { id: "a3", name: "Flap Disc", cat: "abrasives", catLabel: "Abrasives", spec: "For blending, finishing & deburring", icon: "⭕" },
  { id: "a4", name: "Parting Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "14\" heavy duty parting / cut-off wheel", icon: "⭕" },
  { id: "a5", name: "2\" Grinding Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "Compact grinding for tight spaces", icon: "⭕" },
  { id: "a6", name: "Mop Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "For polishing & surface finishing", icon: "⭕" },
  { id: "a7", name: "Polishing Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "Non-woven polishing abrasive", icon: "⭕" },
  { id: "a8", name: "Non Woven Disc", cat: "abrasives", catLabel: "Abrasives", spec: "Surface conditioning & deburring", icon: "⭕" },
  { id: "a9", name: "Hand Pad", cat: "abrasives", catLabel: "Abrasives", spec: "Manual surface conditioning pad", icon: "⭕" },
  { id: "a10", name: "Emery Belt", cat: "abrasives", catLabel: "Abrasives", spec: "For belt sanding applications", icon: "⭕" },
  { id: "a11", name: "Abrasive Sheet", cat: "abrasives", catLabel: "Abrasives", spec: "Flexible abrasive sheets", icon: "⭕" },
  { id: "a12", name: "Rubber Wheel", cat: "abrasives", catLabel: "Abrasives", spec: "Mounted rubber abrasive points", icon: "⭕" },
  { id: "a13", name: "CMPT", cat: "abrasives", catLabel: "Abrasives", spec: "Cone-mounted point tool", icon: "⭕" },
  { id: "a14", name: "Velcro Disc", cat: "abrasives", catLabel: "Abrasives", spec: "Hook & loop backing disc", icon: "⭕" },
  { id: "a15", name: "Quick Change Disc", cat: "abrasives", catLabel: "Abrasives", spec: "Easy mount/dismount abrasive disc", icon: "⭕" },
  { id: "a16", name: "Surface Condition Disc", cat: "abrasives", catLabel: "Abrasives", spec: "Heavy-duty surface conditioning", icon: "⭕" },

  // --- PNEUMATIC TOOLS ---
  { id: "p1", name: "Die Grinder (6mm Lever)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 6mm | 22000 RPM | 0.6 Kg | Lever type", icon: "🔨" },
  { id: "p2", name: "Die Grinder (6mm Roll)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 6mm | 24000 RPM | 0.6 Kg | Roll type", icon: "🔨" },
  { id: "p3", name: "Die Grinder (6mm 32k)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 6mm | 32000 RPM | 0.73 Kg | Lever type", icon: "🔨" },
  { id: "p4", name: "Die Grinder (3mm Roll)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 3mm | 32000 RPM | 0.4 Kg | Roll type", icon: "🔨" },
  { id: "p5", name: "Die Grinder (3mm Flex)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 3mm | 56000 RPM | 0.25 Kg | Flexible", icon: "🔨" },
  { id: "p6", name: "Die Grinder (Angle 6mm)", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Collet: 6mm | 22000 RPM | 0.7 Kg | Lever, angle", icon: "🔨" },
  { id: "p7", name: "Angle Grinder 2\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 2\" (50.8mm) | 15000 RPM | 0.82 Kg | Roll", icon: "🔨" },
  { id: "p8", name: "Angle Grinder 4\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 4\" (101.6mm) | 12000 RPM | 1.6 Kg | Lever", icon: "🔨" },
  { id: "p9", name: "Sander 5\" Pistol", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 5\" | 18000 RPM | 1.2 Kg | Pistol type", icon: "🔨" },
  { id: "p10", name: "Orbital Sander 5\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 5\" | 12000 RPM | 0.9 Kg | Non-vacuum", icon: "🔨" },
  { id: "p11", name: "Sander 3\" Pistol", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 3\" | 15000 RPM | 0.7 Kg | Pistol type", icon: "🔨" },
  { id: "p12", name: "Polisher 7\" Lever", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Disc: 7\" | 2500 RPM | 1.9 Kg | Lever type", icon: "🔨" },
  { id: "p13", name: "Belt Sander 20mm", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Belt: 20mm | 16000 RPM | 1.4 Kg | Lever", icon: "🔨" },
  { id: "p14", name: "Impact Wrench 1/2\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: 1/2\" | 13000 RPM | 1.6 Kg | Pistol", icon: "🔩" },
  { id: "p15", name: "Impact Wrench 3/8\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: 3/8\" | 12000 RPM | 1.24 Kg | Pistol", icon: "🔩" },
  { id: "p16", name: "Impact Wrench 3/4\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: 3/4\" | 5500 RPM | 3.53 Kg | Pistol", icon: "🔩" },
  { id: "p17", name: "Impact Wrench 1\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: 1\" | 6000 RPM | 6.3 Kg | Pistol", icon: "🔩" },
  { id: "p18", name: "Air Drill 1/2\"", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: 1/2\" | 800 RPM | 1.4 Kg | Pistol", icon: "🔩" },
  { id: "p19", name: "Air Riveter", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "3/32\" to 3/16\" | 1.5 Kg | Pistol type", icon: "🔩" },
  { id: "p20", name: "Nutsetter M6-M8", cat: "pneumatic", catLabel: "Pneumatic Tools", spec: "Size: M6-M8 | 400 RPM | 1.85 Kg | Pistol", icon: "🔩" },

  // --- MOULD & DIE ---
  { id: "m1", name: "Guide Post & Bushes", cat: "mould", catLabel: "Mould & Die Parts", spec: "Standard guide post and bush sets", icon: "🔩" },
  { id: "m2", name: "Die & Mould Spring", cat: "mould", catLabel: "Mould & Die Parts", spec: "Standard die & mould compression springs", icon: "🔩" },
  { id: "m3", name: "Gas Spring", cat: "mould", catLabel: "Mould & Die Parts", spec: "Nitrogen gas springs for tooling", icon: "🔩" },
  { id: "m4", name: "Cam Units", cat: "mould", catLabel: "Mould & Die Parts", spec: "Standard cam units for press tools", icon: "🔩" },
  { id: "m5", name: "Ejector Pins", cat: "mould", catLabel: "Mould & Die Parts", spec: "Precision ejector pins for moulds", icon: "🔩" },
  { id: "m6", name: "Die Punch & Bushes", cat: "mould", catLabel: "Mould & Die Parts", spec: "Hardened die punches and bushes", icon: "🔩" },
  { id: "m7", name: "Toggle Clamp", cat: "mould", catLabel: "Mould & Die Parts", spec: "Standard toggle clamping systems", icon: "🔩" },
  { id: "m8", name: "Snap Gauge", cat: "mould", catLabel: "Mould & Die Parts", spec: "Precision snap gauges for QC", icon: "🔩" },
  { id: "m9", name: "GBW Guide Element", cat: "mould", catLabel: "Mould & Die Parts", spec: "Bronze guide elements for precision", icon: "🔩" },
  { id: "m10", name: "Dowel Pin", cat: "mould", catLabel: "Mould & Die Parts", spec: "Hardened & ground dowel pins", icon: "🔩" },
  { id: "m11", name: "Letter Punch Set", cat: "mould", catLabel: "Mould & Die Parts", spec: "Steel letter & number punch set", icon: "🔩" },
];

// ============================================
// CART STATE
// ============================================
let cart = JSON.parse(localStorage.getItem("teqnikoCart") || "[]");

function saveCart() {
  localStorage.setItem("teqnikoCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cart.length;
}

function isInCart(id) {
  return cart.some(p => p.id === id);
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  if (!isInCart(id)) {
    cart.push(product);
    saveCart();
    showToast(`✓ ${product.name} added to enquiry`);
    trackEvent("add_to_cart", { product: product.name, category: product.catLabel });
  } else {
    removeFromCart(id);
  }
  renderCart();
  updateAddButtons();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
  updateAddButtons();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateAddButtons();
}

// ============================================
// TOAST
// ============================================
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ============================================
// RENDER PRODUCTS GRID
// ============================================
function renderProducts(cat = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = "";
  filtered.forEach((p, i) => {
    const inCart = isInCart(p.id);
    const card = document.createElement("div");
    card.className = "product-card" + (inCart ? " added" : "");
    card.style.animationDelay = (i * 0.04) + "s";
    card.setAttribute("data-id", p.id);
    card.innerHTML = `
      <div class="product-img" style="font-size:3.5rem; display:flex; align-items:center; justify-content:center; background:#f5f5f5; height:160px;">
        ${p.icon}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.catLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-spec">${p.spec}</div>
        <button class="add-btn ${inCart ? "added-state" : ""}" onclick="addToCart('${p.id}')">
          ${inCart ? "✓ Added to Enquiry" : "+ Add to Enquiry"}
        </button>
      </div>
    `;
    // Track product view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent("product_viewed", { product: p.name, category: p.catLabel });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    grid.appendChild(card);
    observer.observe(card);
  });
}

function updateAddButtons() {
  document.querySelectorAll("[data-id]").forEach(card => {
    const id = card.getAttribute("data-id");
    const btn = card.querySelector(".add-btn");
    if (!btn) return;
    if (isInCart(id)) {
      btn.textContent = "✓ Added to Enquiry";
      btn.classList.add("added-state");
      card.classList.add("added");
    } else {
      btn.textContent = "+ Add to Enquiry";
      btn.classList.remove("added-state");
      card.classList.remove("added");
    }
  });
}

// ============================================
// FILTER BUTTONS
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  renderCart();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.getAttribute("data-cat"));
    });
  });

  // Track page visit
  trackEvent("page_visit", { page: window.location.pathname });
});

// ============================================
// RENDER CART PAGE
// ============================================
function renderCart() {
  const container = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const actionsEl = document.getElementById("cartActions");
  const submitBtn = document.getElementById("submitBtn");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyEl) emptyEl.style.display = "block";
    if (actionsEl) actionsEl.style.display = "none";
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";
  if (actionsEl) actionsEl.style.display = "flex";
  if (submitBtn) submitBtn.disabled = false;

  container.innerHTML = "";
  cart.forEach(p => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <div class="cart-item-icon">${p.icon}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-cat">${p.catLabel}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${p.id}')" title="Remove">✕</button>
    `;
    container.appendChild(item);
  });

  // Track cart viewed
  trackEvent("cart_viewed", { products: cart.map(p => p.name).join(", "), count: cart.length });
}

// ============================================
// AUTO-SAVE FORM (for abandonment tracking)
// ============================================
function autoSave() {
  const email = document.getElementById("femail")?.value || "";
  const phone = document.getElementById("fphone")?.value || "";
  const name = document.getElementById("fname")?.value || "";
  if (email || phone || name) {
    trackEvent("form_partial", { name, email, phone, products: cart.map(p => p.name).join(", ") });
  }
}

// ============================================
// SUBMIT ENQUIRY
// ============================================
function submitEnquiry() {
  const name = document.getElementById("fname")?.value.trim();
  const company = document.getElementById("fcompany")?.value.trim();
  const phone = document.getElementById("fphone")?.value.trim();
  const email = document.getElementById("femail")?.value.trim();
  const city = document.getElementById("fcity")?.value.trim();
  const message = document.getElementById("fmessage")?.value.trim();

  // Basic validation
  if (!name) { alert("Please enter your name."); return; }
  if (!company) { alert("Please enter your company name."); return; }
  if (!phone || phone.length < 10) { alert("Please enter a valid phone number."); return; }
  if (!city) { alert("Please enter your city."); return; }
  if (cart.length === 0) { alert("Please add at least one product to your enquiry."); return; }

  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  submitBtn.disabled = true;
  submitText.textContent = "⏳ Submitting...";

  const queryId = "TQ" + Date.now().toString().slice(-6);
  const products = cart.map(p => p.name).join(", ");

  const payload = {
    type: "enquiry",
    queryId,
    timestamp: new Date().toLocaleString("en-IN"),
    name, company, phone, email, city, message, products,
    source: document.referrer || "Direct",
    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"
  };

  // Save for thank you page
  localStorage.setItem("lastEnquiry", JSON.stringify({ name, company, phone, products, queryId }));

  // Submit to Secure Vercel API
  fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    cart = [];
    saveCart();
    localStorage.removeItem("teqnikoCart");
    window.location.href = "thankyou.html";
  }).catch(() => {
    // Even if fetch fails, redirect (no-cors issue)
    cart = [];
    saveCart();
    window.location.href = "thankyou.html";
  });
}

// ============================================
// VISITOR / EVENT TRACKING → Google Sheet
// ============================================
const SESSION_ID = localStorage.getItem("tq_session") || ("S" + Date.now());
localStorage.setItem("tq_session", SESSION_ID);

function trackEvent(eventType, data = {}) {
  if (!SHEET_URL || SHEET_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") return;
  const payload = {
    type: "tracking",
    sessionId: SESSION_ID,
    event: eventType,
    timestamp: new Date().toLocaleString("en-IN"),
    page: window.location.pathname,
    referrer: document.referrer || "Direct",
    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
    ...data
  };
  fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => { });
}
