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
          { id: "copper", name: "Copper", rate: 450, unit: "kg", active: true, note: "", instruction: "Clean copper only — remove plastic coating and mixed metals. Wet or painted copper may be paid at a lower rate." },
          { id: "iron", name: "Iron", rate: 25, unit: "kg", active: true, note: "", instruction: "Separate heavy iron from light tin. Remove wood, rubber, and concrete attached to scrap." },
          { id: "aluminium", name: "Aluminium", rate: 120, unit: "kg", active: true, note: "", instruction: "Keep cast and sheet aluminium separate if possible. Remove steel screws and plastic parts." },
          { id: "steel", name: "Steel", rate: 30, unit: "kg", active: true, note: "", instruction: "No sealed cylinders or pressurised containers. Drain oil from machine parts before pickup." }
        ]
      },
      {
        id: "electronics",
        name: "Electronics",
        description: "Appliances and e-waste",
        active: true,
        subs: [
          { id: "fridge", name: "Fridge / AC", rate: 8, unit: "kg", active: true, note: "", instruction: "Empty food and water. Gas must remain sealed — do not cut pipes. Keep unit upright if possible." },
          { id: "tv", name: "TV / Monitor", rate: 10, unit: "kg", active: true, note: "", instruction: "Include remote and stand if available. Broken screens are accepted — wrap glass for safe handling." },
          { id: "laptop", name: "Laptop / PC", rate: 40, unit: "kg", active: true, note: "", instruction: "Remove personal data if you can. Batteries and chargers can be included with the device." },
          { id: "mixed", name: "Mixed e-waste", rate: 8, unit: "kg", active: true, note: "", instruction: "No wet batteries or leaking cells. Bag small parts together so nothing is lost in transit." }
        ]
      },
      {
        id: "paper",
        name: "Paper",
        description: "Paper and cardboard",
        active: true,
        subs: [
          { id: "newspaper", name: "Newspaper", rate: 10, unit: "kg", active: true, note: "", instruction: "Keep dry and bundled. Remove plastic covers and metal clips." },
          { id: "carton", name: "Carton / cardboard", rate: 6, unit: "kg", active: true, note: "", instruction: "Flatten boxes. Remove tape and packing foam where easy." },
          { id: "mixed", name: "Mixed paper", rate: 4, unit: "kg", active: true, note: "", instruction: "No wet or food-soiled paper. Books and notebooks are fine." }
        ]
      },
      {
        id: "plastic",
        name: "Plastic",
        description: "PET, HDPE and mixed plastic",
        active: true,
        subs: [
          { id: "pet", name: "PET bottles", rate: 12, unit: "kg", active: true, note: "", instruction: "Empty and rinse bottles. Caps can stay on. Crush to save space." },
          { id: "hdpe", name: "HDPE", rate: 15, unit: "kg", active: true, note: "", instruction: "Clean containers only. No chemical or oil residue." },
          { id: "mixed", name: "Mixed plastic", rate: 5, unit: "kg", active: true, note: "", instruction: "No PVC pipes or foam. Soft and hard plastic can be mixed for this rate." }
        ]
      }
    ];
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.length) {
          return ensureInstructions(parsed);
        }
      }
    } catch (e) {}
    var s = seed();
    save(s);
    return s;
  }

  /** Fill missing customer-facing instructions from seed (only if field was never set). */
  function ensureInstructions(list) {
    var seeded = seed();
    var changed = false;
    list.forEach(function (cat) {
      var seedCat = seeded.find(function (c) { return c.id === cat.id; });
      if (!seedCat) return;
      (cat.subs || []).forEach(function (sub) {
        if (Object.prototype.hasOwnProperty.call(sub, "instruction")) return;
        var seedSub = (seedCat.subs || []).find(function (s) { return s.id === sub.id; });
        if (seedSub && seedSub.instruction) {
          sub.instruction = seedSub.instruction;
          changed = true;
        } else {
          sub.instruction = "";
          changed = true;
        }
      });
    });
    if (changed) save(list);
    return list;
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
    var next = Object.assign({}, i >= 0 ? c.subs[i] : {}, sub);
    if (!Object.prototype.hasOwnProperty.call(sub, "instruction")) {
      next.instruction = (i >= 0 && c.subs[i].instruction) || "";
    } else {
      next.instruction = String(sub.instruction || "").trim();
    }
    if (i >= 0) c.subs[i] = next;
    else c.subs.push(next);
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
