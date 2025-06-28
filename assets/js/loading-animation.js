// ====== LOADING SCREEN ======
const MIN_LOADING_TIME = 1500; // minimum 1.5 detik
const MAX_LOADING_TIME = 3000; // maksimum 3 detik
const loading = $('#loading-screen');
const header = $('header');
const footer = $('footer');
const menuMain = $('#main-menu');
const main = $('main');

const showMainContent = () => {
  if (loading) {
    loading.classList.remove('opacity-100');
    loading.classList.add('opacity-0');
    setTimeout(() => {
      loading.classList.add('hidden');
      console.log('✅ Loading screen hidden');
    }, 1000);
  }

  header?.classList.remove('hidden');
  header?.classList.add('flex');
  footer?.classList.remove('hidden');
  footer?.classList.add('flex');
  main?.classList.remove('hidden');
  menuMain?.classList.remove('hidden');
  menuMain?.classList.add('flex');
  console.log('✅ Konten dimunculkan');
};

// Cek apakah sebelumnya sudah pernah tampil loading
if (sessionStorage.getItem('loadingShown') === 'true') {
  showMainContent();
} else {
  const startTime = performance.now();
  let alreadyShown = false;

  const maybeShow = () => {
    if (alreadyShown) return;
    alreadyShown = true;
    sessionStorage.setItem('loadingShown', 'true');
    showMainContent();
  };

  // Saat load selesai
  window.addEventListener('load', () => {
    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);
    setTimeout(maybeShow, remainingTime);
  });

  // Hard timeout: pastikan tidak lebih dari 3 detik
  setTimeout(maybeShow, MAX_LOADING_TIME);
}
