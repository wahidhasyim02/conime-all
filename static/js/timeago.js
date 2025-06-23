function updateTimeAgo() {
  document.querySelectorAll(".post-time").forEach(el => {
    const timeStr = el.dataset.postTime;
    if (!timeStr) return;

    const postTime = new Date(timeStr);
    const now = new Date();
    const diffSec = Math.floor((now - postTime) / 1000);
    let text = "";
    
    if (diffSec < 60) {
        text = "just now";
    } else if (diffSec < 3600) {
      const m = Math.floor(diffSec / 60);
      text = `${m}m ago`;
    } else if (diffSec < 86400) {
      const h = Math.floor(diffSec / 3600);
      text = `${h}h ago`;
    } else if (diffSec < 604800) {
      const d = Math.floor(diffSec / 86400);
      text = `${d}d ago`;
    } else {
      // fallback: 02.01.2006
      const day = String(postTime.getDate()).padStart(2, '0');
      const month = String(postTime.getMonth() + 1).padStart(2, '0');
      const year = postTime.getFullYear();
      text = `${day}.${month}.${year}`;
    }

    el.textContent = text;
  });
}

// Jalankan saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
  updateTimeAgo();
  // Jalankan ulang setiap 60 detik
  setInterval(updateTimeAgo, 60000);
});
