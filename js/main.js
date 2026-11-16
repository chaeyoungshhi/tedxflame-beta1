/* =========================================================
   TEDxFLAME University 2027 | main.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n, w = 2) => String(Math.max(0, n)).padStart(w, "0");

  /** Initials avatar used whenever a photo is missing. Exposed for inline onerror handlers. */
  window.initialsAvatar = function (name) {
    const el = document.createElement("div");
    el.className = "avatar";
    el.setAttribute("aria-label", name);
    el.textContent = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
    return el;
  };

  function photo(src, name, wrapperClass) {
    const wrap = document.createElement("div");
    wrap.className = wrapperClass;
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = name;
      img.decoding = "async";
      img.onerror = () => img.replaceWith(window.initialsAvatar(name));
      wrap.appendChild(img);
    } else {
      wrap.appendChild(window.initialsAvatar(name));
    }
    return wrap;
  }

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("menu-open", open);
  });
  $$("a", navLinks).forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("menu-open");
    })
  );

  // Highlight active section link
  const sections = ["home", "about", "speakers", "team", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
  const linkFor = (id) => $(`a[href="#${id}"]`, navLinks);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          $$("a", navLinks).forEach((a) => a.classList.remove("is-active"));
          const l = linkFor(e.target.id);
          if (l) l.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- countdown ---------- */
  const TARGET = new Date("2027-01-10T09:00:00+05:30").getTime();
  const cd = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMins"), s: $("#cdSecs"), root: $("#countdown") };

  function tick() {
    let diff = TARGET - Date.now();
    if (diff <= 0) {
      diff = 0;
      cd.root.classList.add("is-live");
      $(".hero__sub").textContent = "THE WILDFIRE IS HERE";
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    cd.d.textContent = pad(d, 3);
    cd.h.textContent = pad(h);
    cd.m.textContent = pad(m);
    cd.s.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- embers canvas ---------- */
  const canvas = $("#embers");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    const COUNT = () => Math.min(160, Math.floor((W * H) / 9000));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: COUNT() }, spawn);
    }
    function spawn(_, i) {
      return {
        x: Math.random() * W,
        y: H + Math.random() * H * 0.5,
        r: 0.6 + Math.random() * 2.2,
        vy: 0.25 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.35,
        life: Math.random(),
        hue: 10 + Math.random() * 30,
        wob: Math.random() * Math.PI * 2
      };
    }
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(t / 900 + p.wob) * 0.25;
        p.life -= 0.0025;
        if (p.y < -10 || p.life <= 0) Object.assign(p, spawn(), { y: H + 10 });
        const a = Math.max(0, Math.min(1, p.life)) * 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${a})`);
        g.addColorStop(0.4, `hsla(${p.hue}, 100%, 50%, ${a * 0.5})`);
        g.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    requestAnimationFrame(frame);
  }

  /* ---------- team ---------- */
  const data = window.TEAM_DATA;
  const root = $("#teamRoot");

  function memberCard(m, lead) {
    const el = document.createElement("article");
    el.className = "member" + (lead ? " member--lead" : "");
    el.appendChild(photo(m.img, m.name, "member__photo"));
    const n = document.createElement("div"); n.className = "member__name"; n.textContent = m.name;
    const r = document.createElement("div"); r.className = "member__role"; r.textContent = m.role;
    el.append(n, r);
    return el;
  }

  function tier(title, members, lead) {
    const t = document.createElement("div");
    t.className = "tier reveal";
    const h = document.createElement("h3"); h.className = "tier__title"; h.textContent = title;
    const g = document.createElement("div"); g.className = "tier__grid";
    members.forEach((m) => g.appendChild(memberCard(m, lead)));
    t.append(h, g);
    return t;
  }

  function chip(m, placeholder) {
    const c = document.createElement("div");
    c.className = "chip" + (placeholder ? " chip--placeholder" : "");
    c.appendChild(photo(placeholder ? null : m.img, m.name, "chip__photo"));
    const n = document.createElement("span"); n.className = "chip__name"; n.textContent = m.name;
    c.appendChild(n);
    if (m.role) { const r = document.createElement("span"); r.className = "chip__role"; r.textContent = m.role; c.appendChild(r); }
    return c;
  }

  function dept(d) {
    const el = document.createElement("div");
    el.className = "dept";
    const count = d.chiefs.length + (d.placeholders || 0);
    const chiefsLabel = d.chiefs.length ? d.chiefs.map((c) => c.name).join(" & ") : "Team";

    const btn = document.createElement("button");
    btn.className = "dept__btn"; btn.type = "button"; btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `<div><div class="dept__name">${d.name}</div><div class="dept__meta">${chiefsLabel} &middot; ${count} member${count === 1 ? "" : "s"}</div></div>
                     <span class="dept__chevron" aria-hidden="true">+</span>`;

    const panel = document.createElement("div"); panel.className = "dept__panel";
    const inner = document.createElement("div"); inner.className = "dept__panel-inner";
    const list = document.createElement("div"); list.className = "dept__members";
    d.chiefs.forEach((c) => list.appendChild(chip(c, false)));
    for (let i = 1; i <= (d.placeholders || 0); i++) list.appendChild(chip({ name: `Team Member ${i}` }, true));
    inner.appendChild(list); panel.appendChild(inner);

    btn.addEventListener("click", () => {
      const open = el.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
    el.append(btn, panel);
    return el;
  }

  if (data && root) {
    root.appendChild(tier("Organizers", data.leadership, true));
    root.appendChild(tier("Chiefs of Staff", data.chiefsOfStaff, false));

    const chiefsTier = [];
    data.departments.forEach((d) => d.chiefs.forEach((c) => chiefsTier.push({ ...c, role: `${d.name} ${c.role}` })));
    root.appendChild(tier("Department Chiefs", chiefsTier, false));

    const wrap = document.createElement("div"); wrap.className = "tier reveal";
    const h = document.createElement("h3"); h.className = "tier__title"; h.textContent = "Departments";
    const grid = document.createElement("div"); grid.className = "depts";
    data.departments.forEach((d) => grid.appendChild(dept(d)));
    wrap.append(h, grid);
    root.appendChild(wrap);
  }

  /* ---------- marquee ---------- */
  const track = $("#marqueeTrack");
  if (track && data && data.marquee) {
    const build = () =>
      data.marquee.forEach((src, i) => {
        const item = document.createElement("div");
        item.className = "marquee__item";
        const img = document.createElement("img");
        img.src = src; img.alt = ""; img.loading = "lazy";
        img.onerror = () => item.remove();
        item.appendChild(img);
        track.appendChild(item);
      });
    build(); build(); // duplicate for seamless loop
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  const observeReveals = () => $$(".reveal:not(.is-in)").forEach((el) => io.observe(el));
  observeReveals();
})();
