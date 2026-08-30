/* Shared admin jobs list (website + app) */
(function () {
  var KEY = "gk_admin_jobs";

  function todayLabel() {
    return "Today";
  }

  function seed() {
    return [
      {
        id: "i1",
        orderId: "c4e2a91b-7f03-4d88-a1e6-5b2c9d0e8f14",
        title: "Old fridge",
        customer: "Rina Sharma",
        area: "Salt Lake Sec 2",
        collector: "",
        status: "waiting",
        statusLabel: "Waiting",
        meta: "Electronics · ~40 kg",
        date: todayLabel(),
        tab: "active"
      },
      {
        id: "j2",
        orderId: "b1d9e704-2a6c-4f15-9e8b-3c7a0d1f2e45",
        title: "LED TV 32\"",
        customer: "Amit Das",
        area: "Champasari",
        collector: "Karim",
        status: "enroute",
        statusLabel: "On the way",
        meta: "Electronics · assigned",
        date: todayLabel(),
        tab: "active"
      },
      {
        id: "j3",
        orderId: "d9c1e8a0-4b2f-4e11-9a77-0c3d5e6f7182",
        title: "Copper wire",
        customer: "Priya",
        area: "Bidhannagar",
        collector: "Suman",
        status: "assigned",
        statusLabel: "Assigned",
        meta: "Metal · ~8 kg",
        date: todayLabel(),
        tab: "active"
      },
      {
        id: "j4",
        orderId: "a3f1c8e2-9b4d-4e71-8c2a-1f6d0e9b3a47",
        title: "Metal scrap bag",
        customer: "Amit Das",
        area: "Champasari",
        collector: "Karim",
        status: "completed",
        statusLabel: "Completed",
        meta: "Paid · Rs. 420",
        date: "24 Aug 2026",
        tab: "done"
      },
      {
        id: "j5",
        orderId: "6d2e4b91-0c5a-4f38-b7e1-88a2c4d5f013",
        title: "Paper cartons",
        customer: "Priya",
        area: "Bidhannagar",
        collector: "Suman",
        status: "completed",
        statusLabel: "Completed",
        meta: "Paid · Rs. 180",
        date: "20 Aug 2026",
        tab: "done"
      }
    ];
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.length) return parsed;
      }
    } catch (e) {}
    var s = seed();
    save(s);
    return s;
  }

  function save(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function shortId(id) {
    return "#" + String(id || "").replace(/-/g, "").slice(0, 8);
  }

  window.GK_ADMIN_JOBS = {
    KEY: KEY,
    load: load,
    save: save,
    seed: seed,
    short: shortId
  };
})();
