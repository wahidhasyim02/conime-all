// ====== LOADING SCREEN ======
const MIN_LOADING_TIME = 9000;
const loading = $('#loading-screen');
const header = $('header');
const footer = $('footer'); 
const menuMain = $('#main-menu');
const main = $('main');

const showMainContent = () => {
  if (loading) {
    loading.classList.remove('opacity-100');
    loading.classList.add('opacity-0');

    // Setelah fade-out selesai
    setTimeout(() => {
      loading.classList.add('hidden');
      console.log('✅ Loading screen hidden');
    }, 1000);
  }

  header?.classList.remove('hidden'); header?.classList.add('flex');
  footer?.classList.remove('hidden'); footer?.classList.add('flex'); 
  main?.classList.remove('hidden');
  menuMain?.classList.remove('hidden'); menuMain?.classList.add('flex');
  console.log('✅ Konten dimunculkan');
};

// Cek apakah sebelumnya sudah pernah tampil loading
if (sessionStorage.getItem('loadingShown') === 'true') {
  showMainContent();
} else {
  const startTime = performance.now(); // lebih akurat dari Date.now()

  window.addEventListener('load', () => {
    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

    setTimeout(() => {
      sessionStorage.setItem('loadingShown', 'true');
      showMainContent();
    }, remainingTime);
  });
}
