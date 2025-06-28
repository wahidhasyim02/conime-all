// HOVER-INIT.JS
const THREE = window.THREE;
const gsap = window.gsap;
const hoverEffect = window.hoverEffect;


  const importMapSupported = () => {
    const script = document.createElement("script");
    return "importmap" in script;
  };

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isSafari && !importMapSupported()) {
    console.warn("⚠️ Safari tanpa importmap support — hoverEffect dinonaktifkan.");
    document.querySelectorAll(".divDistortion2").forEach(el => {
      const img1 = el.querySelector(".image1");
      const img2 = el.querySelector(".image2");
      if (img1 && img2) {
        img1.classList.remove("lg:w-[0.1px]", "lg:h-[0.1px]", "pointer-events-none");
        img1.classList.add("w-full", "h-full");
        img2.classList.add("hidden");
      }
    });
    sessionStorage.setItem("hoverEffectInitialized", "true");
  }

  if (!importMapSupported) {
    console.warn("⚠️ Browser tidak support importmap → hoverEffect dinonaktifkan.");
    document.querySelectorAll(".divDistortion2").forEach(el => {
      const img1 = el.querySelector(".image1");
      const img2 = el.querySelector(".image2");
      if (img1 && img2) {
        img1.classList.remove("lg:w-[0.1px]", "lg:h-[0.1px]", "pointer-events-none");
        img1.classList.add("w-full", "h-full");
        img2.classList.add("hidden");
      }
    });
    sessionStorage.setItem("hoverEffectInitialized", "true");
  }

  window.addEventListener("load", () => {
    const isFirstVisit = !sessionStorage.getItem("hoverEffectInitialized");
    const navType = performance.getEntriesByType("navigation")[0].type;
    const isHome = location.pathname === "/";
    const delayTime = (isFirstVisit && isHome && navType === "navigate") ? 9000 : 100;

    setTimeout(() => {
      if (!importMapSupported) return;

      document.querySelectorAll('.divDistortion').forEach((el) => {
        applyHoverEffect(el, 0.3, "/images/distortion/ramen.jpg");
      });
      document.querySelectorAll('.divDistortion2').forEach((el) => {
        applyHoverEffect(el, 0.3, "/images/distortion/heightMap.png");
      });

      sessionStorage.setItem("hoverEffectInitialized", "true");
    }, delayTime);

    function applyHoverEffect(el, intensity, displacementPath) {
      const defaultImage = "/images/default.png";
      const img1Src = el.dataset.image1 || el.querySelector('.image1')?.src || defaultImage;
      let img2Src = el.dataset.image2 || el.querySelector('.image2')?.src;

      if (!img2Src || img2Src === "") {
        img2Src = img1Src;
        console.log("🌀 Hanya satu gambar tersedia → image2 diisi dari image1:", img2Src);
      }

      const img1 = new Image();
      const img2 = new Image();
      img1.src = img1Src;
      img2.src = img2Src;

      let img1Loaded = false;
      let img2Loaded = false;

      const checkBothLoaded = () => {
        if (img1Loaded && img2Loaded) {
          if (img1.src.includes(defaultImage) && img2.src.includes(defaultImage)) {
            console.warn("⚠️ Semua gambar fallback — hoverEffect dilewati:", el);
            return;
          }

          const imgRatio = img1.naturalHeight / img1.naturalWidth;

          setTimeout(() => {
            try {
              new hoverEffect({
                parent: el,
                angle: Math.PI / 4,
                intensity1: intensity,
                intensity2: intensity,
                image1: img1.src,
                image2: img2.src,
                displacementImage: displacementPath,
                imagesRatio: imgRatio,
                speedIn: 1.0,
                speedOut: 1.0
              });

              setTimeout(() => {
                el.querySelectorAll('.image1, .image2').forEach(img => {
                  img.classList.add('lg:w-[0.1px]', 'lg:h-[0.1px]', 'pointer-events-none');
                });
              }, 500);

              sessionStorage.removeItem("hoverReloaded");
              console.log("✅ Hover effect diterapkan:", el);
            } catch (error) {
              console.warn("❌ hoverEffect gagal:", error);
            }
          }, 0);
        }
      };

      img1.onload = () => { img1Loaded = true; checkBothLoaded(); };
      img1.onerror = () => fallbackHandler(img1, el, '.image1');
      img2.onload = () => { img2Loaded = true; checkBothLoaded(); };
      img2.onerror = () => fallbackHandler(img2, el, '.image2');

      function fallbackHandler(img, el, selector) {
        console.warn(`⚠️ Gagal load (${img.src}) → fallback ke default.png`);
        img.src = defaultImage;
        const domImg = el.querySelector(selector);
        if (domImg) domImg.src = defaultImage;
        if (selector.includes("1")) img1Loaded = true;
        if (selector.includes("2")) img2Loaded = true;
        checkBothLoaded();
      }
    }
  });