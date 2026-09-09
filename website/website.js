(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var ratesCatalog = [
    {
      id: "metal",
      labelKey: "rates.cat.metal",
      rows: [
        ["Copper", "₹450", "kg"],
        ["Aluminium", "₹120", "kg"],
        ["Iron", "₹25", "kg"],
        ["Steel", "₹30", "kg"]
      ]
    },
    {
      id: "electronics",
      labelKey: "rates.cat.electronics",
      rows: [
        ["Fridge / AC", "₹8", "kg"],
        ["TV / Monitor", "₹10", "kg"],
        ["Laptop / PC", "₹40", "kg"],
        ["Mixed e-waste", "₹8", "kg"]
      ]
    },
    {
      id: "paper",
      labelKey: "rates.cat.paper",
      rows: [
        ["Newspaper", "₹10", "kg"],
        ["Carton / cardboard", "₹6", "kg"],
        ["Mixed paper", "₹4", "kg"]
      ]
    },
    {
      id: "plastic",
      labelKey: "rates.cat.plastic",
      rows: [
        ["PET bottles", "₹12", "kg"],
        ["HDPE", "₹15", "kg"],
        ["Mixed plastic", "₹5", "kg"]
      ]
    }
  ];

  var tabs = document.getElementById("rateTabs");
  var body = document.getElementById("rateBody");
  var activeRate = "metal";

  function t(key) {
    return window.GK_WEB_I18N ? GK_WEB_I18N.t(key) : key;
  }

  function renderRates(id) {
    if (!body) return;
    var cat = ratesCatalog.find(function (c) { return c.id === id; }) || ratesCatalog[0];
    body.innerHTML = cat.rows
      .map(function (r) {
        return (
          "<tr><td>" +
          r[0] +
          '</td><td class="rate-pill">' +
          r[1] +
          '</td><td>/ ' +
          r[2] +
          "</td></tr>"
        );
      })
      .join("");
  }

  function buildRateTabs() {
    if (!tabs) return;
    tabs.innerHTML = "";
    ratesCatalog.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = t(cat.labelKey);
      btn.dataset.id = cat.id;
      if (cat.id === activeRate) btn.className = "active";
      btn.addEventListener("click", function () {
        activeRate = cat.id;
        tabs.querySelectorAll("button").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        renderRates(activeRate);
      });
      tabs.appendChild(btn);
    });
    renderRates(activeRate);
  }

  if (tabs && body) {
    buildRateTabs();
    if (window.GK_WEB_I18N) {
      GK_WEB_I18N.onChange(function () {
        buildRateTabs();
      });
    }
  }
})();
