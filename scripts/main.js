/**
 * PISANG GORENG BULAN MAJALENGKA — MAIN JAVASCRIPT
 * Interactivity: Live Order Calculator, WhatsApp Order Generator,
 * Store Hours Checker, Reheating Tabs, and Menu Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStoreStatus();
  initMenuFilter();
  initReheatingTabs();
  initOrderCalculator();
  initMobileNav();
  initSmoothScroll();
});

// 1. Realtime Store Hours Checker (10.00 - 21.00 WIB)
function initStoreStatus() {
  const statusBadges = document.querySelectorAll('.store-status-badge');
  if (!statusBadges.length) return;

  const now = new Date();
  // Get current hour in UTC+7 (WIB)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const wibTime = new Date(utc + (3600000 * 7));
  const currentHour = wibTime.getHours();
  const currentMinute = wibTime.getMinutes();

  const isOpen = currentHour >= 10 && (currentHour < 21 || (currentHour === 21 && currentMinute === 0));

  statusBadges.forEach(badge => {
    if (isOpen) {
      badge.className = 'store-status-badge open';
      badge.innerHTML = '<span class="status-dot"></span> BUKA SEKARANG (10.00 – 21.00 WIB)';
    } else {
      badge.className = 'store-status-badge closed';
      badge.innerHTML = '<span class="status-dot"></span> TUTUP (Buka Kembali Pukul 10.00 WIB)';
    }
  });
}

// 2. Menu Category Filtering
function initMenuFilter() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 3. Reheating Guide Tabs
function initReheatingTabs() {
  const reheatBtns = document.querySelectorAll('.reheat-tab-btn');
  const methodTitle = document.getElementById('reheat-method-title');
  const methodDesc = document.getElementById('reheat-method-desc');
  const methodTip = document.getElementById('reheat-method-tip');

  const reheatingData = {
    teflon: {
      title: 'Panaskan Pakai Teflon / Wajan Datar',
      desc: 'Letakkan pisang goreng di atas teflon <strong>tanpa minyak tambahan</strong> dengan api paling kecil. Bolak-balik perlahan selama kurang lebih 8–10 menit hingga kulit luar kembali renyah dan harum.',
      tip: '<em>Tips:</em> Tutup teflon sesekali agar panas merata ke bagian dalam adonan.'
    },
    oven: {
      title: 'Panaskan Pakai Oven',
      desc: 'Panaskan oven pada suhu <strong>200°C</strong>. Masukkan pisang goreng ke dalam oven selama kurang lebih 10 menit (sesuaikan dengan karakteristik jenis oven Anda).',
      tip: '<em>Tips:</em> Gunakan rak tengah agar lapisan wijen tidak mudah gosong.'
    },
    airfryer: {
      title: 'Panaskan Pakai Air Fryer (Paling Praktis)',
      desc: 'Set suhu Air Fryer pada <strong>200°C</strong>. Masukkan pisang goreng selama <strong>3–5 menit</strong>. Minyak berlebih akan tiris otomatis dan kerenyahannya kembali maksimal seperti baru diangkat dari wajan.',
      tip: '<em>Tips:</em> Jangan tumpuk pisang di dalam keranjang air fryer agar sirkulasi udara optimal.'
    },
    microwave: {
      title: 'Panaskan Pakai Microwave',
      desc: 'Gunakan suhu sedang-tinggi (suhu 200°C) selama <strong>1 menit</strong> saja untuk mengembalikan kehangatan pisang dengan cepat.',
      tip: '<em>Tips:</em> Microwave mengutamakan kehangatan dan kelembutan tekstur pisang di bagian dalam.'
    }
  };

  reheatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reheatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const method = btn.getAttribute('data-method');
      if (reheatingData[method]) {
        methodTitle.innerHTML = reheatingData[method].title;
        methodDesc.innerHTML = reheatingData[method].desc;
        methodTip.innerHTML = reheatingData[method].tip;
      }
    });
  });
}

// 4. Live Order Calculator & WhatsApp Generator
let cart = {};

const MENU_CATALOG = {
  'pisang-satuan': { name: 'Pisang Goreng Wijen (Satuan)', price: 6000 },
  'pisang-paket-5': { name: 'Pisang Goreng Wijen (Paket Isi 5)', price: 28500 },
  'pisang-paket-10': { name: 'Pisang Goreng Wijen (Paket Dus Isi 10)', price: 60000 },
  'nangka-satuan': { name: 'Nangka Goreng Wijen (Satuan)', price: 6500 },
  'nangka-paket-5': { name: 'Nangka Goreng Wijen (Paket Isi 5)', price: 31000 },
  'nangka-paket-10': { name: 'Nangka Goreng Wijen (Paket Dus Isi 10)', price: 65000 },
  'bapiah-satuan': { name: 'Bapiah Ayam (Satuan)', price: 7500 },
  'bapiah-paket-5': { name: 'Bapiah Ayam (Paket Isi 5)', price: 36000 },
  'bapiah-paket-10': { name: 'Bapiah Ayam (Paket Dus Isi 10)', price: 75000 },
  'pastel-satuan': { name: 'Pastel Apel (Satuan)', price: 7500 },
  'pastel-paket-5': { name: 'Pastel Apel (Paket Isi 5)', price: 36000 },
  'pastel-paket-10': { name: 'Pastel Apel (Paket Dus Isi 10)', price: 75000 },
  'kopi-americano': { name: 'Es Kopi Hitam Americano (Arabica)', price: 15000 },
  'kopi-susu-aren': { name: 'Es Kopi Susu Aren (Kopi Apik)', price: 19500 },
  'air-mineral': { name: 'Air Mineral Botol', price: 5000 }
};

function formatIDR(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

function initOrderCalculator() {
  const addButtons = document.querySelectorAll('.btn-add-item');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectId = btn.getAttribute('data-select');
      const selectElem = document.getElementById(selectId);
      const selectedItemKey = selectElem ? selectElem.value : btn.getAttribute('data-item-key');

      if (selectedItemKey && MENU_CATALOG[selectedItemKey]) {
        addItemToCart(selectedItemKey);
        // Visual feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Ditambahkan!';
        btn.style.backgroundColor = '#137333';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 900);
      }
    });
  });

  const sendWaBtn = document.getElementById('btn-send-whatsapp');
  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', sendOrderToWhatsApp);
  }

  // Pre-load default popular item (1 Dus Pisang Goreng Wijen)
  addItemToCart('pisang-paket-10');
}

function addItemToCart(itemKey) {
  if (cart[itemKey]) {
    cart[itemKey].qty += 1;
  } else {
    cart[itemKey] = {
      ...MENU_CATALOG[itemKey],
      qty: 1
    };
  }
  renderCart();
}

function updateItemQty(itemKey, delta) {
  if (!cart[itemKey]) return;
  cart[itemKey].qty += delta;
  if (cart[itemKey].qty <= 0) {
    delete cart[itemKey];
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items-list');
  const cartTotalElem = document.getElementById('cart-total-price');
  const cartCountElem = document.getElementById('cart-total-count');

  if (!cartList) return;

  cartList.innerHTML = '';
  let totalPrice = 0;
  let totalCount = 0;

  const itemKeys = Object.keys(cart);

  if (itemKeys.length === 0) {
    cartList.innerHTML = '<li style="padding: 1rem 0; color: #7D6F64; text-align: center; font-style: italic;">Keranjang pesanan masih kosong. Silakan pilih menu di atas.</li>';
  } else {
    itemKeys.forEach(key => {
      const item = cart[key];
      const itemSubtotal = item.price * item.qty;
      totalPrice += itemSubtotal;
      totalCount += item.qty;

      const li = document.createElement('li');
      li.className = 'cart-item-row';
      li.innerHTML = `
        <div style="flex: 1; padding-right: 0.5rem;">
          <div class="cart-item-name">${item.name}</div>
          <div style="font-size: 0.8rem; color: #7D6F64;">@ ${formatIDR(item.price)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateItemQty('${key}', -1)">-</button>
          <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateItemQty('${key}', 1)">+</button>
          <span style="font-weight: 700; min-width: 80px; text-align: right; color: #7A1C1C;">${formatIDR(itemSubtotal)}</span>
        </div>
      `;
      cartList.appendChild(li);
    });
  }

  if (cartTotalElem) cartTotalElem.innerText = formatIDR(totalPrice);
  if (cartCountElem) cartCountElem.innerText = totalCount;
}

// Global scope for onclick
window.updateItemQty = updateItemQty;

function sendOrderToWhatsApp() {
  const itemKeys = Object.keys(cart);
  if (itemKeys.length === 0) {
    alert('Silakan pilih minimal 1 menu sebelum melakukan pemesanan via WhatsApp.');
    return;
  }

  const custName = document.getElementById('cust-name')?.value.trim() || 'Pelanggan';
  const custNotes = document.getElementById('cust-notes')?.value.trim() || 'Diambil di Kedai';

  let totalPrice = 0;
  let itemsText = '';

  itemKeys.forEach((key, index) => {
    const item = cart[key];
    const subtotal = item.price * item.qty;
    totalPrice += subtotal;
    itemsText += `${index + 1}. *${item.name}* x ${item.qty} = ${formatIDR(subtotal)}\n`;
  });

  const message = `Halo Pisang Goreng Bulan Majalengka,\n\nSaya ingin memesan menu berikut:\n\n${itemsText}\n*Total Pembayaran:* ${formatIDR(totalPrice)}\n\n*Nama Pemesan:* ${custName}\n*Catatan / Pengambilan:* ${custNotes}\n\nMohon konfirmasi ketersediaan dan estimasi pesanannya. Terima kasih.`;

  const phone = '6282118467453';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// 5. Mobile Navigation
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// 6. Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
