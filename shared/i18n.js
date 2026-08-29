/* Light mock i18n - EN / HI / BN (ASCII-safe labels in UI cards; strings below for data-i18n) */
(function () {
  var dict = {
    en: {
      "app.name": "Green Kabadi",
      "splash.tag": "Sell scrap. Track pickup. Get paid at your door.",
      "splash.login": "Log in",
      "splash.create": "Create account",
      "lang.title": "Choose your language",
      "lang.sub": "You can change this later in Settings.",
      "lang.continue": "Continue",
      "login.title": "Welcome back",
      "login.email": "Email",
      "login.password": "Password",
      "login.submit": "Log in",
      "signup.title": "Create account",
      "signup.name": "Full name",
      "signup.phone": "Mobile number",
      "signup.submit": "Sign up",
      "home.hi": "Hello",
      "home.title": "Ready to recycle?",
      "home.sub": "Post scrap - track pickup - get paid at door",
      "tab.home": "Home",
      "tab.history": "History",
      "tab.messages": "Messages",
      "tab.profile": "Profile",
      "tab.jobs": "Jobs",
      "settings.title": "Settings",
      "settings.language": "Language",
      "settings.language.hint": "App display language",
      "profile.settings": "Settings",
      "profile.logout": "Log out"
    },
    hi: {
      "app.name": "Green Kabadi",
      "splash.tag": "Scrap bechen. Pickup track karein. Ghar par payment.",
      "splash.login": "Log in",
      "splash.create": "Account banayein",
      "lang.title": "Bhasha chunein",
      "lang.sub": "Baad mein Settings mein badal sakte hain.",
      "lang.continue": "Continue",
      "login.title": "Phir se swagat",
      "login.email": "Email",
      "login.password": "Password",
      "login.submit": "Log in",
      "signup.title": "Account banayein",
      "signup.name": "Pura naam",
      "signup.phone": "Mobile number",
      "signup.submit": "Sign up",
      "home.hi": "Namaste",
      "home.title": "Recycle ke liye ready?",
      "home.sub": "Scrap post - pickup track - ghar par payment",
      "tab.home": "Home",
      "tab.history": "History",
      "tab.messages": "Messages",
      "tab.profile": "Profile",
      "tab.jobs": "Jobs",
      "settings.title": "Settings",
      "settings.language": "Bhasha",
      "settings.language.hint": "App display language",
      "profile.settings": "Settings",
      "profile.logout": "Log out"
    },
    bn: {
      "app.name": "Green Kabadi",
      "splash.tag": "Scrap bikri. Pickup track. Dore payment.",
      "splash.login": "Log in",
      "splash.create": "Account create",
      "lang.title": "Bhasha beche nin",
      "lang.sub": "Pore Settings e change korte parben.",
      "lang.continue": "Continue",
      "login.title": "Welcome back",
      "login.email": "Email",
      "login.password": "Password",
      "login.submit": "Log in",
      "signup.title": "Account create",
      "signup.name": "Full name",
      "signup.phone": "Mobile number",
      "signup.submit": "Sign up",
      "home.hi": "Hello",
      "home.title": "Recycle korte ready?",
      "home.sub": "Scrap post - pickup track - dore payment",
      "tab.home": "Home",
      "tab.history": "History",
      "tab.messages": "Messages",
      "tab.profile": "Profile",
      "tab.jobs": "Jobs",
      "settings.title": "Settings",
      "settings.language": "Bhasha",
      "settings.language.hint": "App display language",
      "profile.settings": "Settings",
      "profile.logout": "Log out"
    }
  };

  function getLang() {
    try {
      return localStorage.getItem("gk_lang") || "en";
    } catch (e) {
      return "en";
    }
  }

  function setLang(code) {
    try {
      localStorage.setItem("gk_lang", code);
    } catch (e) {}
    apply();
  }

  function t(key) {
    var lang = getLang();
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.documentElement.setAttribute("lang", getLang());
  }

  window.GK_I18N = { getLang: getLang, setLang: setLang, t: t, apply: apply };
  document.addEventListener("DOMContentLoaded", apply);
})();
