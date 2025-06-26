
document.addEventListener("DOMContentLoaded", () => {
  const notifBtn = document.getElementById("notifBtn");
  const notifModal = document.getElementById("notifModal");
  const notifContainer = notifModal?.querySelector(".notif-container");
  const closeBtn = notifModal?.querySelector(".closeModal");
  const markAll = document.querySelector(".mark-all-read");
  const markText = document.getElementById("textMark");
  const toggleBall = document.getElementById("toggleBall");
  const notifBadge = document.getElementById("notifBadge");

  const posts = document.querySelectorAll(".post-notif");
  const now = new Date();
  const newNotifs = [];
  let unreadCount = 0;

  posts.forEach(post => {
    const postDate = new Date(post.dataset.date);
    const diff = (now - postDate) / 1000;
    const slug = post.dataset.url;
    const title = post.dataset.title || "Notifikasi baru";
    const isRead = localStorage.getItem(`notif-read:${slug}`) === "true";

    if (diff < 10800) {
      const isUnread = !isRead;
      if (isUnread) unreadCount++;

      const badgeClass = isUnread
        ? "bg-conime-500 dark:bg-conime-500"
        : "bg-gray-600 dark:bg-gray-700";

      const html = `
        <a href="${slug}" class="notif-item bg-gray-100 dark:bg-gray-950/20 rounded p-3 relative block transition hover:bg-gray-200 dark:hover:bg-gray-800 ${isRead ? 'opacity-75 dark:opacity-50' : ''}" data-url="${slug}" data-date="${post.dataset.date}">
          <div class="flex justify-end items-right right-2 badge">
            <div class="flex relative justify-center items-center rounded-full">
              <div class="w-3 h-3 opacity-50 rounded-full ${badgeClass}"></div>
              <div class="w-2 h-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${badgeClass}"></div>
            </div>
          </div>
          <h2 class="line-clamp-2 w-[80%] text-sm font-light dark:font-extralight text-gray-900 dark:text-white">${title}</h2>
          <p class="w-full text-right text-xs font-light dark:font-extralight"><time datetime="${post.dataset.date}">Just now</time></p>
        </a>`;
      newNotifs.push(html);
    }
  });

  if (newNotifs.length > 0 && notifContainer) {
    notifContainer.innerHTML = newNotifs.join("");
  } else if (notifContainer) {
    notifContainer.innerHTML = `<div class="text-center text-sm py-4 text-gray-500 dark:text-gray-400">Tidak ada notifikasi baru.</div>`;
  } if (notifContainer) {
    notifContainer.classList.remove("hidden");

    if (unreadCount > 0) {
      notifBadge?.classList.remove("hidden");
    }

    notifContainer.querySelectorAll(".notif-item").forEach(item => {
      item.addEventListener("click", () => {
        const slug = item.dataset.url;
        localStorage.setItem(`notif-read:${slug}`, "true");
        item.classList.add("opacity-50");

        const dots = item.querySelectorAll(".badge div");
        dots.forEach(dot => {
          dot.classList.remove("bg-conime-500", "dark:bg-conime-500");
          dot.classList.add("bg-gray-600", "dark:bg-gray-700");
        });

        unreadCount--;
        if (unreadCount <= 0) {
          notifBadge?.classList.add("hidden");
        }
      });
    });
  }

  const openModal = () => {
    notifModal?.classList.remove("hidden");
    requestAnimationFrame(() => {
      notifModal?.classList.add("scale-100", "opacity-100", "translate-y-0");
      notifModal?.classList.remove("scale-95", "opacity-0", "translate-y-6");
    });
  };

  const closeModal = () => {
    notifModal?.classList.add("scale-95", "opacity-0", "translate-y-6");
    notifModal?.classList.remove("scale-100", "opacity-100", "translate-y-0");
    setTimeout(() => notifModal?.classList.add("hidden"), 300);
  };

  notifBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  // Klik di luar modal → tutup
  document.addEventListener("click", (e) => {
    if (
      notifModal &&
      !notifModal.classList.contains("hidden") &&
      !notifModal.contains(e.target) &&
      e.target !== notifBtn &&
      !notifBtn.contains(e.target)
    ) {
      closeModal();
    }
  });

  // Toggle Mark All
  let isAllRead = false;

  markAll?.addEventListener("click", () => {
    isAllRead = !isAllRead;

    notifContainer?.querySelectorAll(".notif-item").forEach(item => {
      const slug = item.dataset.url;
      const postDate = new Date(item.dataset.date);
      const diff = (now - postDate) / 1000;

      if (diff < 10800) {
        const dots = item.querySelectorAll(".badge div");

        if (isAllRead) {
          localStorage.setItem(`notif-read:${slug}`, "true");
          item.classList.add("opacity-75", "dark:opacity-50");
          dots.forEach(dot => {
            dot.classList.remove("bg-conime-500", "dark:bg-conime-500");
            dot.classList.add("bg-gray-600", "dark:bg-gray-700");
          });
        } else {
          localStorage.removeItem(`notif-read:${slug}`);
          item.classList.remove("opacity-75", "dark:opacity-50");
          dots.forEach(dot => {
            dot.classList.remove("bg-gray-600", "dark:bg-gray-700");
            dot.classList.add("bg-conime-500", "dark:bg-conime-500");
          });
        }
      }
    });

    if (isAllRead) {
      toggleBall.classList.remove("-translate-x-[85%]");
      toggleBall.classList.add("translate-x-[85%]");
      toggleBall.classList.remove("bg-conime-500", "dark:bg-conime-500");
      toggleBall.classList.add("bg-gray-500", "dark:bg-gray-500");
      markText.innerText = "Mark all as unread";
      notifBadge?.classList.add("hidden");
    } else {
      toggleBall.classList.remove("translate-x-[85%]");
      toggleBall.classList.add("-translate-x-[85%]");
      toggleBall.classList.remove("bg-gray-500", "dark:bg-gray-500");
      toggleBall.classList.add("bg-conime-500", "dark:bg-conime-500");
      markText.innerText = "Mark all as read";
      if (notifContainer.querySelectorAll(".notif-item").length > 0) {
        notifBadge?.classList.remove("hidden");
      }
    }
  });
}); 