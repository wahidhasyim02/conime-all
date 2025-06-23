// Helper function
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ====== DARK MODE TOGGLE ======
const html = document.documentElement;
const toggleBtn = $("#theme-toggle");

toggleBtn?.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("darkmode", isDark.toString());
});

// ====== BERSIHKAN %20 PADA LINK ======
$$('a[href*="%20"]').forEach(link => {
  link.href = link.href.replace(/%20/g, '');
});

// ====== AUTO SCROLL ======
const scrollContainer = $("#autoScroll");
if (scrollContainer) {
  let scrollDirection = 1;
  function autoScroll() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    scrollContainer.scrollLeft += scrollDirection * 0.5;
    if (scrollContainer.scrollLeft >= maxScroll || scrollContainer.scrollLeft <= 0) {
      scrollDirection *= -1;
    }
    requestAnimationFrame(autoScroll);
  }
  requestAnimationFrame(autoScroll);
}

// ====== MODAL SHARE ======
function toggleShareModal() {
  const modal = $("#shareModal");
  modal?.classList.toggle("hidden");
}

$("#closeModal")?.addEventListener("click", () => {
  $("#shareModal")?.classList.add("hidden");
});

document.addEventListener("click", (event) => {
  const modal = $("#shareModal");
  if (
    modal &&
    !modal.classList.contains("hidden") &&
    !modal.contains(event.target) &&
    !event.target.closest('button[onclick="toggleShareModal()"]')
  ) {
    modal.classList.add("hidden");
  }
});

// ====== MODAL SEARCH ======
const btnSearchElements = $$('#searchBtn');
const searchModal = $('#searchModal');

btnSearchElements.forEach(el => {
  el.classList.add('tombol');
  el.addEventListener('click', () => {
    searchModal?.classList.remove('hidden');
  });
});

document.addEventListener('click', (e) => {
  if (
    searchModal &&
    !searchModal.contains(e.target) &&
    ![...btnSearchElements].some(btn => btn.contains(e.target))
  ) {
    searchModal.classList.add('hidden');
  }
});

// ====== LAST VIEWED STORAGE ======
window.addEventListener("DOMContentLoaded", () => {
  const maxItems = 5;
  const currentUrl = window.location.pathname;
  const isValidSinglePage = /^\/posts\/(animes|comics|movies|games)\/.+$/.test(currentUrl);

  if (isValidSinglePage) {
    const contentTitle = $(".post-title")?.innerText.trim();
    const contentImage = $("img.post-img")?.getAttribute("src") || "";

    if (contentTitle) {
      const currentPage = {
        url: window.location.href,
        title: contentTitle,
        image: contentImage
      };

      let lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
      lastViewed = lastViewed.filter(item => item.url !== currentPage.url);
      lastViewed.unshift(currentPage);
      lastViewed = lastViewed.slice(0, maxItems);
      localStorage.setItem("lastViewed", JSON.stringify(lastViewed));
    }
  }

  const listEl = $("#last-viewed-list");
  if (listEl) {
    const lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
    listEl.innerHTML = "";

    lastViewed.forEach(item => {
      const li = document.createElement("li");
      li.className = "relative flex flex-1 justify-start items-center group gap-x-0 w-full h-full bg-cover overflow-hidden rounded-md bg-white dark:bg-gray-950 ";
      const imageSrc = item.image || "/images/default.png";

      li.innerHTML = `
        <img src="${imageSrc}" alt="Gambar-${item.title}" class="w-full h-full  opacity-40 lg:opacity-100 group-hover:opacity-0 lg:group-hover:opacity-0 transition duration-500 ease-in-out object-cover"/>
        <div class="absolute inset-0 w-full h-full flex justify-center items-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out px-4 text-2xl">
          <h2><a href="${item.url}" class="hover:underline break-words line-clamp-2 text-xl font-light dark:font-extralight">${item.title}</a></h2>
        </div>
      `;
      listEl.appendChild(li);
    });
  }
});

// ====== COPY SHARE LINK ======
function copyShareLink() {
  const linkInput = $("#shareLink");
  const popup = $("#popup-copy");

  if (!linkInput || !popup) return;

  linkInput.select();
  linkInput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(linkInput.value).then(() => {
    setTimeout(() => {
      popup.classList.remove("hidden");
      popup.classList.add("flex");
    }, 1000);

    setTimeout(() => {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }, 3000);
  });
}

// ====== LOADING SCREEN ======
const MIN_LOADING_TIME = 9000;
const loading = $('#loading-screen');
const header = $('header');
const footer = $('footer'); 
const menuKiri = $('#main-menu');
const main = $('main');

const showMainContent = () => {
 if (loading) {
  loading.classList.remove('opacity-100');
  loading.classList.add('opacity-0');

  // Setelah transisi selesai (1 detik), baru hidden agar tidak mengganggu klik
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1000); // durasi fade-out
}

  header?.classList.remove('hidden'); header?.classList.add('flex');
  footer?.classList.remove('hidden'); footer?.classList.add('flex'); 
  main?.classList.remove('hidden');
  menuKiri?.classList.remove('hidden'); menuKiri?.classList.add('flex');
};

const alreadyShown = sessionStorage.getItem('loadingShown');
if (alreadyShown === 'true') {
  showMainContent();
} else {
  const startTime = Date.now();
  document.addEventListener('DOMContentLoaded', () => {
    const elapsed = Date.now() - startTime;
    const waitTime = Math.max(0, MIN_LOADING_TIME - elapsed);
    setTimeout(() => {
      sessionStorage.setItem('loadingShown', 'true');
      showMainContent();
    }, waitTime);
  });
}

// ====== SUBSCRIBE FORM ======
  document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputSubs");
  const btn = document.getElementById("letSubs");
  const errorMsg = document.getElementById("errorMsg");

  // Awal: tombol dimatikan
  btn.setAttribute("disabled", true);
  setDisabledStyle(true);

  // Saat input diketik
  input.addEventListener("input", () => {
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    errorMsg.classList.add("hidden"); // sembunyikan error saat ketik
    input.classList.remove("border", "border-red-500");

    if (isValid) {
      btn.setAttribute("disabled", true);//sementara tombol tidak bisa diklik (untuk sementara, nanti akan diaktifkan jika tersedia)
      setDisabledStyle(true);
    } else {
      btn.setAttribute("disabled", true);
      setDisabledStyle(true);
    }
  });

  // Saat tombol diklik
  btn.addEventListener("click", () => {
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      // kemungkinan terjadi jika user memanipulasi HTML tombol agar bisa diklik
      errorMsg.classList.remove("hidden");
      input.classList.add("border", "border-red-500");
      return;
    }

    // sukses
    alert("Successfully subscribed with email: " + email);
    input.value = "";
    errorMsg.classList.add("hidden");
    input.classList.remove("border", "border-red-500");

    // reset tombol
    btn.setAttribute("disabled", true);
    setDisabledStyle(true);
  });

  // Fungsi bantu ganti style tombol
  function setDisabledStyle(disabled) {
    if (disabled) {
      btn.classList.add("bg-gray-600", "dark:bg-gray-800", "hover:bg-gray-600", "hover:dark:bg-gray-800", "cursor-not-allowed");
      btn.classList.remove("bg-conime-400", "dark:bg-conime-500", "hover:bg-conime-600", "dark:hover:bg-conime-300");
    } else {
      btn.classList.remove("bg-gray-600", "dark:bg-gray-800", "hover:bg-gray-600", "hover:dark:bg-gray-800", "cursor-not-allowed");
      btn.classList.add("bg-conime-400", "dark:bg-conime-500", "hover:bg-conime-600", "dark:hover:bg-conime-300");
    }
  }
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slideshow").forEach(container => {
    const images = container.querySelectorAll(".slide-img");
    if (images.length === 0) return;

    let current = 0;
    images[current].classList.add("active");

    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    }, 5000); // ganti setiap 5 detik
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const fallback = "/images/default.png";

  document.querySelectorAll("img").forEach(img => {
    const rawSrc = img.getAttribute("src") || "";
    const cleanedSrc = rawSrc.trim();

    const isReallyBadSrc =
      cleanedSrc === "" || cleanedSrc === "%20" || /^(\s*|\/?%20)$/.test(rawSrc);

    if (isReallyBadSrc) {
      console.warn(`🔍 src kosong/tidak valid (${rawSrc}), set default`);
      img.src = fallback;
    }

    // Deteksi gambar gagal dimuat sebelum error handler dipasang
    if (img.complete && img.naturalWidth === 0) {
      console.warn(`⚠️ Gambar gagal dimuat sejak awal: ${img.src}, ganti default`);
      img.src = fallback;
    }

    img.onerror = () => {
      if (img.src !== fallback) {
        console.warn(`❌ Gagal muat gambar: ${img.src}, ganti default`);
        img.src = fallback;
      }
    };
  });
});
