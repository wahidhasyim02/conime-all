document.addEventListener("DOMContentLoaded", () => {
  const badge = document.getElementById("notifBadge");
  const notifModal = document.getElementById("notifModal");
  const notifList = notifModal?.querySelector(".overflow-x-auto");
  const posts = document.querySelectorAll(".post-notif");
  const toggleText = notifModal?.querySelector(".notif-toggle-text");
  const toggleCircle = notifModal?.querySelector(".notif-toggle-circle");
  const toggleContainer = notifModal?.querySelector(".notif-toggle");

  let newPosts = [];
  const now = new Date();

  posts.forEach(post => {
    const postDate = new Date(post.dataset.date);
    const diff = (now - postDate) / 1000;
    const slug = post.dataset.url;
    const isRead = localStorage.getItem(`notif-read:${slug}`) === "true";

    if (diff < 3600) {
      newPosts.push({
        title: post.dataset.title,
        url: slug,
        date: postDate,
        read: isRead
      });
    }
  });

  newPosts.sort((a, b) => b.date - a.date);
  newPosts = newPosts.slice(0, 5);

  if (newPosts.length > 0) {
    const unread = newPosts.filter(p => !p.read);
    if (unread.length > 0) badge?.classList.remove("hidden");

    notifList.innerHTML = "";
    newPosts.forEach(p => {
      const card = document.createElement("div");
      card.className = `rounded p-3 text-sm transition cursor-pointer relative ${
        p.read
          ? "text-gray-500 dark:text-gray-600 bg-gray-100 dark:bg-gray-950/30"
          : "bg-gray-100 dark:bg-gray-950/30 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`;
      card.innerHTML = `
        <div class="font-semibold w-[90%] line-clamp-2">${p.title}</div>
        <p class="w-full text-right text-xs mt-1">${p.date.toLocaleTimeString("id-ID", {
          hour: "2-digit", minute: "2-digit"
        })}</p>
        <div class="relative">
        <div class="absolute z-30 top-1 right-2 badge">
          <div class="flex relative justify-center items-center">
            <div class="w-3 h-3 opacity-50 rounded-full ${
              p.read ? "bg-gray-600 dark:bg-gray-700" : "bg-conime-500 dark:bg-conime-600"
            }"></div>
            <div class="w-2 h-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full ${
              p.read ? "bg-gray-600 dark:bg-gray-700" : "bg-conime-500 dark:bg-conime-600"
            }"></div> 
        <span class="pr-4 absolute right-0 -top-1 group">
          <span class="p-2 rounded opacity-0 group-hover:opacity-100 justify-center items-start lg:items-center transition duration-1000 ease-in-out  ${
            p.read ? "bg-gray-300" : "bg-white"
          } dark:bg-gray-950 z-20 h-fit w-fit text-sm">
            ${p.read ? "Mark as unread" : "Mark as read"}
          </span>
        </span>
        </div>
      `;
      card.addEventListener("click", () => {
        localStorage.setItem(`notif-read:${p.url}`, "true");
        window.location.href = p.url;
      });

      notifList.appendChild(card);
    });

    // Toggle All Switch
    const allRead = newPosts.every(p => p.read);
    toggleText.textContent = allRead ? "Mark all as unread" : "Mark all as read";
    toggleCircle.classList.toggle("translate-x-6", allRead);
    toggleCircle.classList.toggle("bg-conime-500", allRead);
    toggleCircle.classList.toggle("dark:bg-conime-500", allRead);

    toggleContainer.addEventListener("click", () => {
      const markingUnread = newPosts.every(p => p.read);
      newPosts.forEach(p => {
        localStorage.setItem(`notif-read:${p.url}`, markingUnread ? "false" : "true");
      });
      location.reload(); // Re-render with new states
    });
  } else {
    badge?.classList.add("hidden");
  }
});
