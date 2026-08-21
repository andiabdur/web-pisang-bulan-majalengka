/**
 * PISANG GORENG BULAN MAJALENGKA — MAIN JAVASCRIPT
 * Interactivity: Realtime Store Hours Checker, Menu Filters, Reheating Tabs,
 * Live Order Calculator & WhatsApp Generator, Gallery Filter,
 * Single Image Preview & Gallery Carousel Lightbox with Interactive Zoom & Pan.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStoreStatus();
  initMenuFilter();
  initReheatingTabs();
  initOrderCalculator();
  initMobileNav();
  initSmoothScroll();
  initGalleryFilter();
  initLightbox();
});

// 1. Realtime Store Hours Checker (Sesuai Papan Resmi Kedai)
// Weekday: 10.00 - 18.00 WIB | Jum'at: 13.00 - 18.00 WIB (Setelah Jum'atan) | Weekend: 08.00 - 18.00 WIB
function initStoreStatus() {
  const statusBadges = document.querySelectorAll('.store-status-badge');
  if (!statusBadges.length) return;

  const now = new Date();
  // Get current hour and minute in UTC+7 (WIB)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const wibTime = new Date(utc + (3600000 * 7));
  const currentDay = wibTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const currentHour = wibTime.getHours();
  const currentMinute = wibTime.getMinutes();
  const currentTimeVal = currentHour + (currentMinute / 60);

  let isOpen = false;
  let scheduleText = '';

  if (currentDay === 0 || currentDay === 6) {
    // Weekend (Sabtu & Minggu): 08.00 - 18.00
    isOpen = currentTimeVal >= 8.0 && currentTimeVal < 18.0;
    scheduleText = '08.00 – 18.00 WIB (Weekend)';
  } else if (currentDay === 5) {
    // Jum'at: Buka Setelah Jum'atan (13.00 - 18.00)
    isOpen = currentTimeVal >= 13.0 && currentTimeVal < 18.0;
    scheduleText = '13.00 – 18.00 WIB (Setelah Jum\'atan)';
  } else {
    // Weekday (Senin - Kamis): 10.00 - 18.00
    isOpen = currentTimeVal >= 10.0 && currentTimeVal < 18.0;
    scheduleText = '10.00 – 18.00 WIB (Weekday)';
  }

  statusBadges.forEach(badge => {
    if (isOpen) {
      badge.className = 'store-status-badge open';
      badge.innerHTML = `<span class="status-dot"></span> BUKA SEKARANG (Tutup 18.00 WIB)`;
    } else {
      badge.className = 'store-status-badge closed';
      badge.innerHTML = `<span class="status-dot"></span> TUTUP (Jam Buka: ${scheduleText})`;
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
  let totalItemsCount = 0;
  let itemsListText = '';

  itemKeys.forEach((key, index) => {
    const item = cart[key];
    const subtotal = item.price * item.qty;
    totalPrice += subtotal;
    totalItemsCount += item.qty;

    itemsListText += `${index + 1}. *${item.name}*\n   ${item.qty}x @ ${formatIDR(item.price)} = *${formatIDR(subtotal)}*\n`;
  });

  const divider = '──────────────────────────';

  const message = [
    '*PESANAN BARU — PISANG GORENG BULAN*',
    divider,
    '*Data Pemesan:*',
    `• Nama: *${custName}*`,
    `• Opsi / Catatan: _${custNotes}_`,
    '',
    '*Rincian Menu:*',
    itemsListText.trim(),
    divider,
    `*TOTAL ESTIMASI (${totalItemsCount} item): ${formatIDR(totalPrice)}*`,
    divider,
    '',
    '*Outlet Tujuan:*',
    'Seberang Lapangan GGM, Jl. KH. Abdul Halim, Majalengka',
    '',
    '_Mohon konfirmasi ketersediaan pesanan dan instruksi pembayaran (QRIS/Transfer/Tunai). Terima kasih._'
  ].join('\n');

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

// 7. Gallery Category Filter & Dynamic Pagination
let galleryCurrentPage = 1;
const GALLERY_ITEMS_PER_PAGE = 8;
let galleryActiveFilter = 'all';

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryActiveFilter = btn.getAttribute('data-filter') || 'all';
      galleryCurrentPage = 1; // Reset to page 1 on filter switch
      renderGalleryPagination();
    });
  });

  renderGalleryPagination();
}

function renderGalleryPagination() {
  const allGalleryItems = Array.from(document.querySelectorAll('#galeri-foto .gallery-item'));
  const paginationBar = document.getElementById('gallery-pagination-bar');
  const paginationInfo = document.getElementById('gallery-page-info');

  // Filter items based on active category
  const visibleItems = allGalleryItems.filter(item => {
    const itemCat = item.getAttribute('data-category');
    return galleryActiveFilter === 'all' || itemCat === galleryActiveFilter;
  });

  const totalItems = visibleItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / GALLERY_ITEMS_PER_PAGE));

  // Ensure current page is valid
  if (galleryCurrentPage > totalPages) galleryCurrentPage = totalPages;
  if (galleryCurrentPage < 1) galleryCurrentPage = 1;

  const startIndex = (galleryCurrentPage - 1) * GALLERY_ITEMS_PER_PAGE;
  const endIndex = startIndex + GALLERY_ITEMS_PER_PAGE;

  // Show/hide gallery items
  allGalleryItems.forEach(item => {
    const isMatchingCategory = galleryActiveFilter === 'all' || item.getAttribute('data-category') === galleryActiveFilter;
    const itemIndexInFiltered = visibleItems.indexOf(item);
    
    if (isMatchingCategory && itemIndexInFiltered >= startIndex && itemIndexInFiltered < endIndex) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Render pagination controls
  if (paginationBar) {
    paginationBar.innerHTML = '';

    if (totalPages > 1) {
      // Prev Button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'gallery-page-btn';
      prevBtn.innerHTML = '&larr;';
      prevBtn.disabled = galleryCurrentPage === 1;
      prevBtn.setAttribute('aria-label', 'Halaman Sebelumnya');
      prevBtn.addEventListener('click', () => {
        if (galleryCurrentPage > 1) {
          galleryCurrentPage--;
          renderGalleryPagination();
          scrollToGallery();
        }
      });
      paginationBar.appendChild(prevBtn);

      // Numbered Page Buttons
      for (let p = 1; p <= totalPages; p++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `gallery-page-btn ${p === galleryCurrentPage ? 'active' : ''}`;
        pageBtn.textContent = p;
        pageBtn.setAttribute('aria-label', `Halaman ${p}`);
        pageBtn.addEventListener('click', () => {
          galleryCurrentPage = p;
          renderGalleryPagination();
          scrollToGallery();
        });
        paginationBar.appendChild(pageBtn);
      }

      // Next Button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'gallery-page-btn';
      nextBtn.innerHTML = '&rarr;';
      nextBtn.disabled = galleryCurrentPage === totalPages;
      nextBtn.setAttribute('aria-label', 'Halaman Selanjutnya');
      nextBtn.addEventListener('click', () => {
        if (galleryCurrentPage < totalPages) {
          galleryCurrentPage++;
          renderGalleryPagination();
          scrollToGallery();
        }
      });
      paginationBar.appendChild(nextBtn);
    }
  }

  // Update info text
  if (paginationInfo) {
    if (totalItems === 0) {
      paginationInfo.textContent = 'Tidak ada foto pada kategori ini.';
    } else {
      const shownEnd = Math.min(endIndex, totalItems);
      paginationInfo.textContent = `Menampilkan ${startIndex + 1}–${shownEnd} dari ${totalItems} foto dokumentasi`;
    }
  }
}

function scrollToGallery() {
  const galElem = document.getElementById('galeri-foto');
  if (galElem) {
    galElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 8. Single Image Preview & Gallery Carousel Lightbox with Interactive Zoom & Pan
let galleryCarouselItems = [];
let currentGalleryIndex = 0;
let isGalleryMode = false;

let zoomScale = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

function initLightbox() {
  // 1. Collect Gallery Carousel Items (Only from #galeri-foto)
  const galleryElems = document.querySelectorAll('#galeri-foto .gallery-item');
  galleryCarouselItems = [];

  galleryElems.forEach((el, index) => {
    const src = el.getAttribute('data-lightbox-src') || el.querySelector('img')?.getAttribute('src');
    if (src) {
      galleryCarouselItems.push(src);
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryCarousel(index);
      });
    }
  });

  // 2. Attach Single Image Preview to All Other Narrative / Content Images
  const singlePreviewElems = document.querySelectorAll('.clickable-preview:not(#galeri-foto .gallery-item)');
  singlePreviewElems.forEach(el => {
    const src = el.getAttribute('data-lightbox-src') || el.querySelector('img')?.getAttribute('src') || el.getAttribute('src');
    if (src) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openSinglePreview(src);
      });
    }
  });

  // Modal event listeners
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  // Zoom buttons
  const zoomInBtn = document.getElementById('lightbox-zoom-in');
  const zoomOutBtn = document.getElementById('lightbox-zoom-out');
  const zoomResetBtn = document.getElementById('lightbox-zoom-reset');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrevGalleryImage);
  if (nextBtn) nextBtn.addEventListener('click', showNextGalleryImage);

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => changeZoom(0.35));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => changeZoom(-0.35));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

  const imgWrap = document.querySelector('.lightbox-image-wrap');
  const imgElem = document.getElementById('lightbox-img');

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });
  }

  // Interactive Double Click Zoom Toggle
  if (imgElem) {
    imgElem.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (zoomScale > 1) {
        resetZoom();
      } else {
        setZoom(2.2);
      }
    });

    // Mouse Wheel Zoom
    imgElem.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      changeZoom(delta);
    }, { passive: false });

    // Drag / Pan when zoomed in
    imgElem.addEventListener('mousedown', (e) => {
      if (zoomScale <= 1) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      if (imgWrap) imgWrap.classList.add('is-zoomed');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || zoomScale <= 1) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      applyTransform();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support for Pan
    imgElem.addEventListener('touchstart', (e) => {
      if (zoomScale <= 1 || e.touches.length !== 1) return;
      isDragging = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return;
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY;
      applyTransform();
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (isGalleryMode) {
      if (e.key === 'ArrowLeft') showPrevGalleryImage();
      if (e.key === 'ArrowRight') showNextGalleryImage();
    }
    if (e.key === '+' || e.key === '=') changeZoom(0.35);
    if (e.key === '-' || e.key === '_') changeZoom(-0.35);
    if (e.key === '0') resetZoom();
  });
}

function openSinglePreview(src) {
  isGalleryMode = false;
  setupLightboxUI(src);
}

function openGalleryCarousel(index) {
  isGalleryMode = true;
  currentGalleryIndex = (index >= 0 && index < galleryCarouselItems.length) ? index : 0;
  const src = galleryCarouselItems[currentGalleryIndex];
  setupLightboxUI(src);
}

function setupLightboxUI(src) {
  const modal = document.getElementById('lightbox-modal');
  const imgElem = document.getElementById('lightbox-img');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!modal || !imgElem) return;

  resetZoom();
  imgElem.src = src;

  // Toggle navigation buttons based on mode
  if (isGalleryMode && galleryCarouselItems.length > 1) {
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
  } else {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  resetZoom();
}

function showPrevGalleryImage() {
  if (!isGalleryMode || !galleryCarouselItems.length) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryCarouselItems.length) % galleryCarouselItems.length;
  resetZoom();
  const imgElem = document.getElementById('lightbox-img');
  if (imgElem) imgElem.src = galleryCarouselItems[currentGalleryIndex];
}

function showNextGalleryImage() {
  if (!isGalleryMode || !galleryCarouselItems.length) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryCarouselItems.length;
  resetZoom();
  const imgElem = document.getElementById('lightbox-img');
  if (imgElem) imgElem.src = galleryCarouselItems[currentGalleryIndex];
}

// Zoom & Pan Functions
function setZoom(val) {
  zoomScale = Math.min(Math.max(val, 1), 3.5);
  if (zoomScale === 1) {
    panX = 0;
    panY = 0;
  }
  applyTransform();
}

function changeZoom(delta) {
  setZoom(zoomScale + delta);
}

function resetZoom() {
  zoomScale = 1;
  panX = 0;
  panY = 0;
  applyTransform();
}

function applyTransform() {
  const imgElem = document.getElementById('lightbox-img');
  const imgWrap = document.querySelector('.lightbox-image-wrap');
  const zoomLevelElem = document.getElementById('lightbox-zoom-level');

  if (imgElem) {
    imgElem.style.transform = `scale(${zoomScale}) translate(${panX / zoomScale}px, ${panY / zoomScale}px)`;
  }
  if (imgWrap) {
    if (zoomScale > 1) {
      imgWrap.classList.add('is-zoomed');
    } else {
      imgWrap.classList.remove('is-zoomed');
    }
  }
  if (zoomLevelElem) {
    zoomLevelElem.textContent = `${Math.round(zoomScale * 100)}%`;
  }
}
