
  const MIN_LOADING_TIME = 9000; // dalam ms
  const loading = document.getElementById('loading-screen');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer'); 
  const menuMain = document.getElementById('main-menu');
  const main = document.querySelector('main');
  const gooey = document.getElementById('gooey');

  const showMainContent = () => {
    if (loading) {
      loading.classList.remove('opacity-100');
      loading.classList.add('opacity-0');

      // Setelah animasi fade-out selesai
      setTimeout(() => {
        loading.remove(); // ❌ benar-benar menghapus dari DOM
        gooey.remove();
      }, 1000);
    }

    header?.classList.remove('hidden'); header?.classList.add('flex');
    footer?.classList.remove('hidden'); footer?.classList.add('flex'); 
    main?.classList.remove('hidden');
    menuMain?.classList.remove('hidden'); menuMain?.classList.add('flex');
  };

  if (sessionStorage.getItem('loadingShown') === 'true') {
    // Jika sudah pernah tampil, langsung tampilkan konten
    showMainContent();
    console.log("✅ Sudah pernah tampil, loading dihapus");
  } else {
    const startTime = performance.now();

    window.addEventListener('load', () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        sessionStorage.setItem('loadingShown', 'true');
        showMainContent();
        console.log("🎉 Pertama kali tampil, loading selesai");
      }, remainingTime);
    });
  } 