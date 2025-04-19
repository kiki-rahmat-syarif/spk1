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

    // Tampilkan semua produk
    renderProduk(produk);
  }
    // Render ulang keranjang kalau buka halaman keranjang
    if (pageId === "keranjang") {
      renderKeranjang();
    }
}
document.addEventListener("DOMContentLoaded", function () {
  renderProduk(produk); // render semua dulu pas awal

  document.getElementById('search-box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      cariProduk();
    }
  });
})

function filterCategory(selectedCategory, event) {
    document.querySelectorAll('.category').forEach(cat => {
      cat.classList.remove('active');
    });
    event.target.classList.add('active');

    // Tampilkan produk sesuai kategori
    document.querySelectorAll('.product').forEach(prod => {
      const category = prod.getAttribute('data-category');
      if (selectedCategory === 'all' || category === selectedCategory) {
        prod.style.display = 'block';
      } else {
        prod.style.display = 'none';
      }
    });
}
const produk = [
  { nama: "Produk 1", kategori: "fiesta", harga: 28900, gambar: "so-gooddino.png"},
  { nama: "Produk 2", kategori: "fiesta", harga: 31000, gambar:"so-gooddino.png"},
  { nama: "So Good Dino", kategori: "sogood", harga: 42000, gambar:"so-gooddino.png"},
  { nama: "Kenzleer Stick Ayam", kategori: "kenzleer", harga: 35000, gambar:"so-gooddino.png"},
  // Tambahkan produk lainnya sesuai kebutuhan
];

function cariProduk() {
  const keyword = document.getElementById('search-box').value.toLowerCase();
  const hasil = produk.filter(p => p.nama.toLowerCase().includes(keyword));
  renderProduk(hasil);
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
    alert(`${cariProduk.nama} ditambahkan ke keranjang!`);
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

function kosongkanKeranjang() {
  if (keranjang.length === 0) {
    alert("Keranjang sudah kosong!");
    return;
  }

  const konfirmasi = confirm("Yakin ingin mengosongkan keranjang?");
  if (konfirmasi) {
    keranjang = []; // kosongkan array
    renderKeranjang(); // render ulang tampilan
  }
}


function tampilkanMetode() {
  document.getElementById("metode-popup").classList.add("show");
}

function tutupMetode() {
  document.getElementById("metode-popup").classList.remove("show");
}

function konfirmasiPembayaran() {
  const metodeDipilih = document.querySelector('input[name="metode"]:checked');
  if (!metodeDipilih) {
    alert("Silakan pilih metode pembayaran.");
    return;
  }

  alert(`Pembayaran menggunakan ${metodeDipilih.value} berhasil diproses!`);
  tutupMetode();
  kosongkanKeranjang();
}
function tampilkanCheckout() {
  const modal = document.getElementById("checkout-modal");
  const list = document.getElementById("checkout-produk-list");
  list.innerHTML = "";

  if (keranjang.length === 0) {
    alert("Keranjang masih kosong. Silakan tambahkan produk terlebih dahulu.");
    return; // hentikan fungsi kalau keranjang kosong
  }else {
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
    alert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  alert("Pembayaran dengan " + metode.value + " berhasil!");
  keranjang = [];
  renderKeranjang();
  tutupCheckout();
}



