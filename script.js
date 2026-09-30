(() => {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");

  // Sticky nav background
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Reveal on scroll
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.documentElement.classList.add("js-reveal");
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
    else revealer.observe(el);
  });

  // Count-up stats
  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1400, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counter.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

  // WhatsApp chat: messages appear one by one when the tab is shown
  const chat = document.getElementById("waChat");
  let chatTimer;
  const playChat = () => {
    clearTimeout(chatTimer);
    const msgs = [...chat.querySelectorAll(".msg")];
    chat.classList.add("is-animating");
    msgs.forEach((m) => m.classList.remove("is-shown"));
    let i = 0;
    const next = () => {
      if (i >= msgs.length) return;
      msgs[i++].classList.add("is-shown");
      chatTimer = setTimeout(next, 650);
    };
    next();
  };

  // Tabs
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab);
      });
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === tab.dataset.tab));
      if (tab.dataset.tab === "wa") playChat();
    })
  );

  // Demo form (front-end only — wire to your backend / CRM / WhatsApp)
  const form = document.getElementById("demoForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const bad = !input.value.trim();
      input.classList.toggle("is-invalid", bad);
      if (bad) ok = false;
    });
    note.classList.toggle("is-error", !ok);
    if (!ok) {
      note.textContent = "Please fill in the highlighted fields.";
      return;
    }
    note.textContent = "Thank you! Our team will contact you on WhatsApp shortly.";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
