/* Admin sidebar badges — Inbox (pending) + Notifications (unread) */
(function () {
  function notifUnread() {
    try {
      var list = JSON.parse(localStorage.getItem("gk_admin_notifications") || "null");
      if (!list || !list.length) return 3;
      return list.filter(function (n) { return !n.read; }).length;
    } catch (e) {
      return 0;
    }
  }

  function inboxPending() {
    try {
      var raw = localStorage.getItem("gk_admin_inbox_pending");
      if (raw != null && raw !== "") {
        var n = parseInt(raw, 10);
        return isNaN(n) ? 0 : n;
      }
    } catch (e) {}
    return 3;
  }

  function setBadge(href, count, attr) {
    var link = document.querySelector('.admin-nav a[href="' + href + '"]');
    if (!link) return;
    var existing = link.querySelector("[" + attr + "]");
    if (existing) existing.remove();
    if (count <= 0) return;
    var badge = document.createElement("span");
    badge.className = "admin-nav-badge";
    badge.setAttribute(attr, "1");
    badge.textContent = count > 9 ? "9+" : String(count);
    link.appendChild(badge);
  }

  function mount() {
    setBadge("notifications.html", notifUnread(), "data-nav-notif-badge");
    setBadge("inbox.html", inboxPending(), "data-nav-inbox-badge");
  }

  window.GK_ADMIN_BADGES = { refresh: mount };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
