/* Shared admin category + subcategory catalog (localStorage mock) */
(function () {
  var KEY = "gk_admin_catalog";

  function seed() {
    return [
      {
        id: "metal",
        name: "Metal",
        description: "Ferrous and non-ferrous scrap",
        active: true,
        subs: [
          { id: "copper", name: "Copper", rate: 450, unit: "kg", active: true, note: "" },
          { id: "iron", name: "Iron", rate: 25, unit: "kg", active: true, note: "" },
          { id: "aluminium", name: "Aluminium", rate: 120, unit: "kg", active: true, note: "" },
          { id: "steel", name: "Steel", rate: 30, unit: "kg", active: true, note: "" }
        ]
      },
      {
        id: "electronics",
        name: "Electronics",
        description: "Appliances and e-waste",
        active: true,
        subs: [
          { id: "fridge", name: "Fridge / AC", rate: 8, unit: "kg", active: true, note: "" },
          { id: "tv", name: "TV / Monitor", rate: 10, unit: "kg", active: true, note: "" },
          { id: "laptop", name: "Laptop / PC", rate: 40, unit: "kg", active: true, note: "" },
          { id: "mixed", name: "Mixed e-waste", rate: 8, unit: "kg", active: true, note: "" }
        ]
      },
      {
        id: "paper",
        name: "Paper",
        description: "Paper and cardboard",
        active: true,
        subs: [
          { id: "newspaper", name: "Newspaper", rate: 10, unit: "kg", active: true, note: "" },
          { id: "carton", name: "Carton / cardboard", rate: 6, unit: "kg", active: true, note: "" },
          { id: "mixed", name: "Mixed paper", rate: 4, unit: "kg", active: true, note: "" }
        ]
      },
      {
        id: "plastic",
        name: "Plastic",
        description: "PET, HDPE and mixed plastic",
        active: true,
        subs: [
          { id: "pet", name: "PET bottles", rate: 12, unit: "kg", active: true, note: "" },
          { id: "hdpe", name: "HDPE", rate: 15, unit: "kg", active: true, note: "" },
          { id: "mixed", name: "Mixed plastic", rate: 5, unit: "kg", active: true, note: "" }
        ]
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

  function slug(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "item-" + Date.now();
  }

  function findCat(id) {
    return load().find(function (c) { return c.id === id; }) || null;
  }

  function findSub(catId, subId) {
    var c = findCat(catId);
    if (!c) return null;
    return (c.subs || []).find(function (s) { return s.id === subId; }) || null;
  }

  function upsertCat(cat) {
    var list = load();
    var i = list.findIndex(function (c) { return c.id === cat.id; });
    if (i >= 0) list[i] = cat;
    else list.push(cat);
    save(list);
  }

  function upsertSub(catId, sub) {
    var list = load();
    var c = list.find(function (x) { return x.id === catId; });
    if (!c) return false;
    c.subs = c.subs || [];
    var i = c.subs.findIndex(function (s) { return s.id === sub.id; });
    if (i >= 0) c.subs[i] = sub;
    else c.subs.push(sub);
    save(list);
    return true;
  }

  window.GK_CATALOG = {
    load: load,
    save: save,
    seed: seed,
    slug: slug,
    findCat: findCat,
    findSub: findSub,
    upsertCat: upsertCat,
    upsertSub: upsertSub
  };
})();
