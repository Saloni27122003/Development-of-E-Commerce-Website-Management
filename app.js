// app.js - shared logic: products data + localStorage cart utilities

/* ---------- PRODUCTS ----------
   You can replace or extend this array.
   Each product: id, title, price (number), img (relative or remote), desc
*/
const PRODUCTS = [
  {id: 'pd01', title: 'Classic Sneakers', price: 39.99, img: 'images/pexels-rafael-quaty-13236693.jpg', desc: 'Comfortable everyday sneakers.'},
  {id: 'pd02', title: 'Canvas Backpack', price: 49.50, img: 'images/81RM66wayOL.jpg', desc: 'Durable, water-resistant.'},
  {id: 'pd03', title: 'Wireless Headphones', price: 79.00, img: 'images/R.jpeg', desc: 'Noise-reducing, long battery.'},
  {id: 'pd04', title: 'Sport Watch', price: 129.99, img: 'images/watch-club-rolex-deepsea-d-blue-126660-rolexwarrantyto2024-ref-126660-year-2019-15129-wb.png5.jpg', desc: 'Fitness tracker + notifications.'}
];

/* ---------- CART STORAGE UTIL ----------
 cart stored as object { productId: qty, ... } in localStorage key 'ecom_cart'
*/
const CART_KEY = 'ecom_cart';

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function writeCart(cartObj) { localStorage.setItem(CART_KEY, JSON.stringify(cartObj)); }

function addToCart(productId, qty = 1) {
  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + Number(qty);
  writeCart(cart);
}

function setQty(productId, qty) {
  const cart = readCart();
  qty = Number(qty);
  if (qty <= 0) { delete cart[productId]; } else { cart[productId] = qty; }
  writeCart(cart);
}

function removeFromCart(productId) {
  const cart = readCart();
  delete cart[productId];
  writeCart(cart);
}

function cartItemsDetailed() {
  const cart = readCart();
  const items = [];
  for (const id of Object.keys(cart)) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) continue;
    items.push({ ...p, qty: cart[id], subtotal: Number((p.price * cart[id]).toFixed(2)) });
  }
  return items;
}

function cartTotals() {
  const items = cartItemsDetailed();
  const subtotal = Number(items.reduce((s,i)=>s+i.subtotal,0).toFixed(2));
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0; // example rule
  const tax = Number((subtotal * 0.12).toFixed(2)); // example 12% tax
  const total = Number((subtotal + shipping + tax).toFixed(2));
  return { subtotal, shipping, tax, total };
}

/* helper to show a small notification */
function toast(msg) {
  let t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', right:'20px', bottom:'20px', background:'#111827', color:'white',
    padding:'10px 14px', borderRadius:'10px', boxShadow:'0 8px 20px rgba(2,6,23,0.4)', zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', 1800);
  setTimeout(()=> t.remove(), 2200);
}
