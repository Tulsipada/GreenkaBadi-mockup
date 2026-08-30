/* Shared admin mobile chrome — footer badges */
(function () {
  function pending() {
    try {
      return parseInt(localStorage.getItem("gk_admin_inbox_pending") || "3", 10) || 0;
    } catch (e) {
      return 3;
    }
  }
  function unreadNotif() {
    try {
      return parseInt(localStorage.getItem("gk_admin_notif_unread") || "2", 10) || 0;
    } catch (e) {
      return 2;
    }
  }
  function refresh() {
    var n = pending();
    document.querySelectorAll("[data-badge=inbox]").forEach(function (el) {
      if (n > 0) {
        el.textContent = String(n);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
    var u = unreadNotif();
    document.querySelectorAll("[data-badge=notif]").forEach(function (el) {
      if (u > 0) {
        el.textContent = String(u);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }
  window.GK_ADMIN_APP = { refresh: refresh, pending: pending, unreadNotif: unreadNotif };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refresh);
  } else {
    refresh();
  }
})();
