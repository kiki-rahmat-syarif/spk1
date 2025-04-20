// Daftar produk dengan harga, rating, dan diskon
const produk = [
  // Fiesta
  { nama: "Produk 1", kategori: "fiesta", harga: 28900, rating: 4.5, diskon: 10, gambar: "so-gooddino.png"},
  { nama: "Produk 2", kategori: "fiesta", harga: 31000, rating: 4.7, diskon: 5, gambar:"so-gooddino.png"},
  { nama: "Fiesta Chicken Nugget", kategori: "fiesta", harga: 33000, rating: 4.4, diskon: 7, gambar:"so-gooddino.png"},
  { nama: "Fiesta Sosis Sapi", kategori: "fiesta", harga: 28000, rating: 4.6, diskon: 6, gambar:"so-gooddino.png"},
  { nama: "Fiesta Spicy Wings", kategori: "fiesta", harga: 36000, rating: 4.2, diskon: 12, gambar:"so-gooddino.png"},
  { nama: "Fiesta Chicken Strip", kategori: "fiesta", harga: 34000, rating: 4.5, diskon: 9, gambar:"so-gooddino.png"},
  { nama: "Fiesta Karage", kategori: "fiesta", harga: 32000, rating: 4.3, diskon: 10, gambar:"so-gooddino.png"},

  // So Good
  { nama: "So Good Dino", kategori: "sogood", harga: 42000, rating: 4.2, diskon: 15, gambar:"so-gooddino.png"},
  { nama: "So Good Chicken Nugget", kategori: "sogood", harga: 39000, rating: 4.6, diskon: 10, gambar:"so-gooddino.png"},
  { nama: "So Good Spicy Chicken", kategori: "sogood", harga: 41000, rating: 4.3, diskon: 12, gambar:"so-gooddino.png"},
  { nama: "So Good Ayam Crispy", kategori: "sogood", harga: 40000, rating: 4.5, diskon: 8, gambar:"so-gooddino.png"},
  { nama: "So Good Hot Wings", kategori: "sogood", harga: 43000, rating: 4.4, diskon: 11, gambar:"so-gooddino.png"},
  { nama: "So Good Mini Nugget", kategori: "sogood", harga: 37000, rating: 4.2, diskon: 9, gambar:"so-gooddino.png"},

  // Kenzleer
  { nama: "Kenzleer Stick Ayam", kategori: "kenzleer", harga: 35000, rating: 4.6, diskon: 8, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Nugget Premium", kategori: "kenzleer", harga: 36000, rating: 4.4, diskon: 7, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Chicken Ball", kategori: "kenzleer", harga: 34500, rating: 4.3, diskon: 10, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Ayam Lada Hitam", kategori: "kenzleer", harga: 37000, rating: 4.7, diskon: 9, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Drumstick", kategori: "kenzleer", harga: 38000, rating: 4.5, diskon: 6, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Ayam Crispy", kategori: "kenzleer", harga: 35500, rating: 4.2, diskon: 11, gambar:"so-gooddino.png"}
];

// Bobot untuk setiap kriteria
const bobot = {
  harga: 0.4,
  rating: 0.3,
  diskon: 0.3,
};

// Fungsi untuk menghitung skor produk
function hitungSkor(produk) {
  const nilaiHarga = 10 - (produk.harga / 10000); // Misalnya, harga lebih murah dapat nilai lebih tinggi
  const nilaiRating = produk.rating; // Rating sudah dalam skala 1-10
  const nilaiDiskon = produk.diskon; // Diskon lebih besar dapat nilai lebih tinggi

  const skor = (nilaiHarga * bobot.harga) + (nilaiRating * bobot.rating) + (nilaiDiskon * bobot.diskon);
  return skor;
}

// Menampilkan produk terbaik setelah perhitungan SMART
function tampilkanProdukTerbaikDanBiasa(kategori = 'semua') {
  const produkTerbaikList = document.getElementById('produk-terbaik-list');
  const produkBiasaList = document.getElementById('produk-biasa-list');

  produkTerbaikList.innerHTML = '';
  produkBiasaList.innerHTML = '';

  // Filter produk berdasarkan kategori yang dipilih
  const produkFiltered = filterByCategory(kategori);

  // Hitung skor semua produk yang sudah difilter
  produkFiltered.forEach(p => {
    p.skor = hitungSkor(p);
  });

  // Sortir berdasarkan skor tertinggi
  const produkUrut = [...produkFiltered].sort((a, b) => b.skor - a.skor);

  // Ambil 3 produk terbaik
  const topProduk = produkUrut.slice(0, 3);

  // Sisanya adalah produk biasa
  const produkBiasa = produkUrut.slice(3);

  // Render produk terbaik
  topProduk.forEach(p => {
    const hargaSetelahDiskon = p.harga - (p.harga * p.diskon / 100);
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}" />
      <h2>${p.nama}</h2>
      <p class="price-original">Rp${p.harga.toLocaleString()}</p>
      <p class="price-discount">Rp${Math.round(hargaSetelahDiskon).toLocaleString()}</p>
      <div class="rating">⭐ ${p.rating}</div>
      <button onclick="tambahKeKeranjang('${p.nama}')">Tambah ke Keranjang</button>
    `;
    produkTerbaikList.appendChild(el);
  });

  // Render produk biasa
  produkBiasa.forEach(p => {
    const hargaSetelahDiskon = p.harga - (p.harga * p.diskon / 100);
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}" />
      <h2>${p.nama}</h2>
      <p class="price-original">Rp${p.harga.toLocaleString()}</p>
      <p class="price-discount">Rp${Math.round(hargaSetelahDiskon).toLocaleString()}</p>
      <div class="rating">⭐ ${p.rating}</div>
      <button onclick="tambahKeKeranjang('${p.nama}')">Tambah ke Keranjang</button>
    `;
    produkBiasaList.appendChild(el);
  });
}

function filterByCategory(kategori) {
  // Pastikan jika kategori adalah "semua", semua produk ditampilkan
  if (kategori === 'semua') {
    return produk; // Semua produk ditampilkan jika kategori adalah "semua"
  }

  // Filter produk berdasarkan kategori lainnya
  return produk.filter(p => p.kategori === kategori);
}





function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  // Tambahan logika reset ketika kembali ke beranda
  if (pageId === "beranda") {
    // Aktifkan kategori "Semua"
    const kategoriList = document.querySelectorAll(".category");
    kategoriList.forEach(k => k.classList.remove("active"));
    const semua = document.querySelector('.category[data-kategori="semua"], .category.active'); // fallback
    if (semua) semua.classList.add("active");

    // Kosongkan kotak search
    const searchInput = document.getElementById("search-box");
    if (searchInput) searchInput.value = "";

    // Tampilkan produk terbaik setelah dihitung berdasarkan skor SMART
    tampilkanProdukTerbaikDanBiasa();
    sesuaikanUkuranTeksProduk();
  }

  // Render ulang keranjang kalau buka halaman keranjang
  if (pageId === "keranjang") {
    renderKeranjang();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Render produk terbaik pada halaman pertama kali
  tampilkanProdukTerbaikDanBiasa();
  sesuaikanUkuranTeksProduk();

  document.getElementById('search-box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      cariProduk();
    }
  });
})

function sesuaikanUkuranTeksProduk() {
  const judulProduk = document.querySelectorAll('.product h2');
  judulProduk.forEach(h2 => {
    if (h2.textContent.length > 21) {
      h2.style.fontSize = '18px';
    } else {
      h2.style.fontSize = '20px';
    }
  });
}


function filterCategory(selectedCategory, event) {
  // Ubah active class untuk kategori
  document.querySelectorAll('.category').forEach(cat => {
    cat.classList.remove('active');
  });
  event.target.classList.add('active');

  // Panggil fungsi untuk menampilkan produk berdasarkan kategori
  tampilkanProdukTerbaikDanBiasa(selectedCategory);
  sesuaikanUkuranTeksProduk();
}


function cariProduk() {
  const keyword = document.getElementById('search-box').value.toLowerCase();
  const hasil = produk.filter(p => p.nama.toLowerCase().includes(keyword));
  tampilkanProdukTerbaik(hasil);
}

function renderProduk(listProduk) {
  const container = document.querySelector('.product-list');
  container.innerHTML = ''; // bersihin dulu

  if (listProduk.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = "Produk tidak ada.";
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.marginTop = '20px';
    emptyMsg.style.color = 'gray';
    container.appendChild(emptyMsg);
    return;
  }

  listProduk.forEach(p => {
    const el = document.createElement('div');
    el.className = 'product';
    el.setAttribute('data-category', p.kategori);
    el.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}" />
      <h2>${p.nama}</h2>
      <p>Rp${p.harga.toLocaleString()}</p>
      <button onclick="tambahKeKeranjang('${p.nama}')">Tambah</button>
    `;
    container.appendChild(el);
  });
}

let keranjang = [];

function tambahKeKeranjang(namaProduk) {
  const cariProduk = produk.find(p => p.nama === namaProduk);
  if (cariProduk) {
    keranjang.push(cariProduk);
    tampilkanCustomAlert(`${cariProduk.nama} ditambahkan ke keranjang!`);
  }
}

function renderKeranjang() {
  const daftarKeranjang = document.getElementById("daftar-keranjang");
  const totalHargaContainer = document.getElementById("total-harga-container");
  daftarKeranjang.innerHTML = "";
  totalHargaContainer.innerHTML = "";

  if (keranjang.length === 0) {
    daftarKeranjang.innerHTML = "<p>Keranjang kosong</p>";
    return;
  }

  let total = 0;

  keranjang.forEach((item, index) => {
    total += item.harga;
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="product-item" style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
        <img src="${item.gambar}" width="60" />
        <span style="flex: 1;">${item.nama}</span>
        <span>Rp${item.harga.toLocaleString()}</span>
        <button class="hapus-button" onclick="hapusDariKeranjang(${index})">Hapus</button>
      </div>
    `;
    daftarKeranjang.appendChild(li);
  });

  totalHargaContainer.innerText = `Total Harga: Rp${total.toLocaleString()}`;
}
function hapusDariKeranjang(index) {
  if (index >= 0 && index < keranjang.length) {
    const nama = keranjang[index].nama;
    keranjang.splice(index, 1);
    renderKeranjang();
    tampilkanCustomAlert(`"${nama}" dihapus dari keranjang.`);
  }
}


function kosongkanKeranjang() {
  if (keranjang.length === 0) {
    tampilkanCustomAlert("Keranjang sudah kosong!");
    return;
  }

  const konfirmasi = confirm("Yakin ingin mengosongkan keranjang?");
  if (konfirmasi) {
    keranjang = []; // kosongkan array
    renderKeranjang(); // render ulang tampilan
  }
}

// Modal dan Checkout
function tampilkanCheckout() {
  const modal = document.getElementById("checkout-modal");
  const list = document.getElementById("checkout-produk-list");
  list.innerHTML = "";

  if (keranjang.length === 0) {
    tampilkanCustomAlert("Keranjang masih kosong. Silakan tambahkan produk terlebih dahulu.");
    return; // hentikan fungsi kalau keranjang kosong
  } else {
    keranjang.forEach(p => {
      const item = document.createElement("div");
      item.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <img src="${p.gambar}" alt="${p.nama}" />
          <span>${p.nama} - Rp${p.harga.toLocaleString()}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }

  modal.classList.add("show");
}

function tutupCheckout() {
  document.getElementById("checkout-modal").classList.remove("show");
}

function konfirmasiPembayaran() {
  const metode = document.querySelector('input[name="metode"]:checked');
  if (!metode) {
    tampilkanCustomAlert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  tampilkanCustomAlert("Pembayaran dengan " + metode.value + " berhasil!");
  keranjang = [];
  renderKeranjang();
  tutupCheckout();
}

// ✅ Tampilkan custom alert
function tampilkanCustomAlert(pesan, autoClose = true) {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("custom-alert-message");

  if (!alertBox || !alertMessage) return;

  alertMessage.textContent = pesan;
  alertBox.classList.add("show");

  // Tutup otomatis dalam 2 detik (bisa diubah)
  if (autoClose) {
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 2000);
  }
}

// ✅ Tutup alert manual lewat tombol OK
function tutupCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  if (alertBox) alertBox.classList.remove("show");
}
