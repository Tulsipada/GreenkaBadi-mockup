/* Admin sidebar badges + mobile desktop gate */
(function () {
  var MOBILE_MQ = "(max-width: 900px)";
  var PLAY_STORE_URL = "https://play.google.com/store";
  var ADMIN_APP_URL = "../admin-app/login.html";

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

  function mountBadges() {
    setBadge("notifications.html", notifUnread(), "data-nav-notif-badge");
    setBadge("inbox.html", inboxPending(), "data-nav-inbox-badge");
  }

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function removeGate() {
    var gate = document.getElementById("gk-admin-mobile-gate");
    if (gate) gate.remove();
    document.documentElement.classList.remove("gk-admin-mobile-blocked");
  }

  function showGate() {
    if (document.getElementById("gk-admin-mobile-gate")) return;
    document.documentElement.classList.add("gk-admin-mobile-blocked");

    var gate = document.createElement("div");
    gate.id = "gk-admin-mobile-gate";
    gate.className = "mobile-gate";
    gate.innerHTML =
      '<div class="mobile-gate-card">' +
        '<img class="mobile-gate-logo" src="../assets/logo-mark-transparent.png" alt="" />' +
        '<p class="mobile-gate-brand">' +
          '<span class="g">Green</span><span class="ka">क</span><span class="b">Badi</span>' +
        "</p>" +
        "<h1>Admin website is for desktop</h1>" +
        '<p class="mobile-gate-copy">' +
          "This panel is not built for mobile browsers. Use the Admin app on your phone, or open this site on a computer." +
        "</p>" +
        '<a class="store-badge" href="' + PLAY_STORE_URL + '" target="_blank" rel="noopener noreferrer">' +
          '<svg class="play-ico" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path fill="#EA4335" d="M3.6 2.3c-.3.2-.6.6-.6 1.1v17.2c0 .5.3.9.6 1.1l.1.1 9.6-9.6v-.3L3.7 2.2l-.1.1z"/>' +
            '<path fill="#FBBC04" d="M16.1 14.7l-2.8-2.8v-.3l2.8-2.8.1.1 3.3 1.9c.9.5.9 1.4 0 1.9l-3.3 1.9-.1.1z"/>' +
            '<path fill="#4285F4" d="M16.2 14.8l-2.9-2.9-9.6 9.6c.4.4 1 .5 1.6.1l10.9-6.8z"/>' +
            '<path fill="#34A853" d="M16.2 9.2L3.3 2.4c-.6-.3-1.2-.3-1.6.1l9.6 9.6 2.9-2.9z"/>' +
          "</svg>" +
          '<span class="lines"><small>Get the Admin app</small><strong>Google Play</strong></span>' +
        "</a>" +
        '<a class="Btn Btn-outline Btn-block mobile-gate-app" href="' + ADMIN_APP_URL + '">Open Admin app mockup</a>' +
        '<button type="button" class="Btn Btn-ghost Btn-block mobile-gate-desktop" id="gk-open-desktop">' +
          '<svg class="desktop-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none">' +
            '<rect x="2" y="4" width="20" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/>' +
            '<path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
          "</svg>" +
          "Open on desktop" +
        "</button>" +
        '<div class="mobile-gate-tip" id="gk-desktop-tip" hidden>' +
          "<p>On your phone browser: open the menu and choose <strong>Desktop site</strong> / <strong>Request desktop site</strong>, then tap Check again.</p>" +
          '<p class="muted">Or open this page on a laptop or PC.</p>' +
          '<button type="button" class="Btn Btn-primary Btn-block" id="gk-check-again">Check again</button>' +
        "</div>" +
      "</div>";

    document.body.appendChild(gate);

    document.getElementById("gk-open-desktop").addEventListener("click", function () {
      var tip = document.getElementById("gk-desktop-tip");
      tip.hidden = !tip.hidden;
    });
    document.getElementById("gk-check-again").addEventListener("click", function () {
      syncGate();
    });
  }

  function syncGate() {
    if (isMobile()) showGate();
    else removeGate();
  }

  function mount() {
    mountBadges();
    syncGate();
    window.matchMedia(MOBILE_MQ).addEventListener("change", syncGate);
  }

  window.GK_ADMIN_BADGES = { refresh: mountBadges };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
