/* Each pickup Order ID = unique UUID (lists show short form) */
(function () {
  function uuidv4() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /** Short display: #c4e2a91b (first 8 hex of UUID) */
  function shortId(id) {
    if (!id) return "#--------";
    var hex = String(id).replace(/-/g, "");
    return "#" + hex.slice(0, 8);
  }

  function pillHtml(id, size) {
    var cls = size === "sm" ? "OrderId OrderId-sm" : "OrderId";
    return '<span class="' + cls + '" title="' + String(id || "") + '">' + shortId(id) + "</span>";
  }

  function bindOrderBar(root, id) {
    if (!root || !id) return;
    var shortEl = root.querySelector("[data-order-short]");
    var fullEl = root.querySelector("[data-order-full]");
    var btn = root.querySelector("[data-order-copy]");
    if (shortEl) shortEl.textContent = shortId(id);
    if (fullEl) fullEl.textContent = id;
    if (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var done = function () {
          var prev = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = prev; }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(id).then(done).catch(done);
        } else {
          done();
        }
      };
    }
  }

  function ensurePickups() {
    try {
      var raw = localStorage.getItem("gk_pickups");
      if (raw) {
        var parsed = JSON.parse(raw);
        return parsed.map(function (p) {
          var id = p.orderId && p.orderId.indexOf("-") > 10 ? p.orderId : (p.uuid || uuidv4());
          return {
            orderId: id,
            title: p.title,
            status: p.status,
            amount: p.amount,
            date: p.date,
            chip: p.chip
          };
        });
      }
    } catch (e) {}
    var seed = [
      {
        orderId: "a3f1c8e2-9b4d-4e71-8c2a-1f6d0e9b3a47",
        title: "Metal scrap bag",
        status: "Completed",
        amount: "Rs. 420",
        date: "24 Aug 2026",
        chip: "done"
      },
      {
        orderId: "6d2e4b91-0c5a-4f38-b7e1-88a2c4d5f013",
        title: "Paper cartons",
        status: "Completed",
        amount: "Rs. 180",
        date: "20 Aug 2026",
        chip: "done"
      },
      {
        orderId: "e8b7a016-3d2f-4c9a-9e55-2a1b7c8d9e0f",
        title: "Old plastic drums",
        status: "Cancelled",
        amount: "-",
        date: "18 Aug 2026",
        chip: "cancel"
      }
    ];
    try {
      localStorage.setItem("gk_pickups", JSON.stringify(seed));
    } catch (e) {}
    return seed;
  }

  function addPickup(partial) {
    var list = ensurePickups();
    var item = {
      orderId: partial.orderId || uuidv4(),
      title: partial.title || "Pickup",
      status: partial.status || "Waiting",
      amount: partial.amount || "-",
      date: partial.date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      chip: partial.chip || "waiting"
    };
    list.unshift(item);
    try {
      localStorage.setItem("gk_pickups", JSON.stringify(list));
    } catch (e) {}
    return item;
  }

  window.GK_IDS = {
    uuidv4: uuidv4,
    short: shortId,
    pill: pillHtml,
    bindBar: bindOrderBar,
    list: ensurePickups,
    add: addPickup
  };
})();
