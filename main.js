/**
 * Koi Konveksi Malang - Main JavaScript File
 * Mengatur interaktivitas, validasi form WA, filter portofolio, dan utilitas UI.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Konstanta WhatsApp Nomor Resmi
  const WA_NUMBER = '6289696883904';

  // 2. Update Tahun di Footer Otomatis
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Efek Sticky Navbar Saat Scroll
  const navbar = document.querySelector('.navbar-koi');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 4. Highlight Navigasi Aktif Otomatis
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html') ||
      (currentPath === '/' && linkPath === 'index.html')
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 5. Portfolio Filtering Logic (pada halaman portofolio.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        // Hapus active class dari semua tombol
        filterButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 6. Portfolio Modal Detail Viewer
  const portfolioModalEl = document.getElementById('portfolioModal');
  if (portfolioModalEl) {
    portfolioModalEl.addEventListener('show.bs.modal', function (event) {
      const triggerCard = event.relatedTarget;
      if (!triggerCard) return;

      const title = triggerCard.getAttribute('data-title') || 'Proyek Konveksi';
      const category = triggerCard.getAttribute('data-category-name') || 'Kaos Custom';
      const fabric = triggerCard.getAttribute('data-fabric') || 'Katun Combed';
      const print = triggerCard.getAttribute('data-print') || 'Sablon Plastisol';
      const qty = triggerCard.getAttribute('data-qty') || '50 Pcs';
      const client = triggerCard.getAttribute('data-client') || 'Klien Koi Konveksi';
      const imgSrc = triggerCard.getAttribute('data-img') || 'img/portofolio-1.svg';
      const desc = triggerCard.getAttribute('data-desc') || 'Pengerjaan kaos berkualitas tinggi dengan jahitan standar distro Malang.';

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalCategory').textContent = category;
      document.getElementById('modalFabric').textContent = fabric;
      document.getElementById('modalPrint').textContent = print;
      document.getElementById('modalQty').textContent = qty;
      document.getElementById('modalClient').textContent = client;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalImg').src = imgSrc;
      document.getElementById('modalImg').alt = title;

      // Update tombol pesan modal
      const modalWaBtn = document.getElementById('modalWaBtn');
      if (modalWaBtn) {
        const orderText = `Halo Koi Konveksi Malang, saya tertarik dengan proyek "${title}" (${category}). Saya ingin membuat pesanan serupa. Mohon info estimasi harga dan konsultasinya.`;
        modalWaBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderText)}`;
      }
    });
  }

  // 7. Form Pemesanan Kontak ke WhatsApp (kontak.html)
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Ambil nilai input
      const nama = document.getElementById('nama')?.value.trim();
      const whatsapp = document.getElementById('whatsapp')?.value.trim();
      const instansi = document.getElementById('instansi')?.value.trim() || '-';
      const jenisPesanan = document.getElementById('jenisPesanan')?.value;
      const bahan = document.getElementById('bahan')?.value;
      const sablon = document.getElementById('sablon')?.value;
      const jumlah = document.getElementById('jumlah')?.value.trim();
      const deadline = document.getElementById('deadline')?.value.trim() || 'Fleksibel';
      const catatan = document.getElementById('catatan')?.value.trim() || 'Tidak ada catatan tambahan';

      // Validasi sederhana
      if (!nama || !whatsapp || !jenisPesanan || !bahan || !sablon || !jumlah) {
        alert('Mohon lengkapi semua kolom wajib bertanda bintang (*)');
        return;
      }

      // Susun pesan terstruktur WhatsApp
      const pesan =
        `*FORMULIR PEMESANAN - KOI KONVEKSI MALANG*\n` +
        `-----------------------------------------\n` +
        `👤 *Nama Pemesan:* ${nama}\n` +
        `📱 *No. WhatsApp:* ${whatsapp}\n` +
        `🏢 *Komunitas/Instansi:* ${instansi}\n` +
        `👕 *Jenis Pesanan:* ${jenisPesanan}\n` +
        `🧵 *Pilihan Bahan:* ${bahan}\n` +
        `🎨 *Sablon/Aplikasi:* ${sablon}\n` +
        `📦 *Jumlah (Qty):* ${jumlah} pcs\n` +
        `📅 *Target Selesai:* ${deadline}\n` +
        `📝 *Catatan Detail:* ${catatan}\n` +
        `-----------------------------------------\n` +
        `Halo Admin Koi Konveksi Malang, mohon informasi estimasi biaya dan jadwal produksi untuk pesanan di atas. Terima kasih!`;

      // Buat URL WhatsApp
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;

      // Buka URL di tab baru
      window.open(waUrl, '_blank');

      // Tampilkan notifikasi konfirmasi di halaman
      const formAlert = document.getElementById('formSuccessAlert');
      if (formAlert) {
        formAlert.classList.remove('d-none');
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 8. Tombol Pesan Langsung Kategori Portofolio / Layanan
  window.orderCustomItem = function (itemName) {
    const text = `Halo Koi Konveksi Malang, saya ingin konsultasi dan memesan jasa "${itemName}". Mohon info minimal order, bahan, dan estimasi biayanya.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };
});
