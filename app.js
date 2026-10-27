/* Portafolio · Luisa Lozada — demo */
const IMG = "assets/img/";

const SERIES = [
  {
    id: "despues-del-ruido",
    name: "Después del ruido",
    year: "2026",
    tech: "Resinas y técnicas mixtas",
    blurb: "La emoción de la Fórmula 1 hecha forma, color y materia: la flama que enciende, el corazón que sostiene el movimiento y la curva que guarda la huella de la velocidad.",
    note: "Render de la propuesta de exhibición; medidas indicadas en la ficha.",
    items: [
      { slug: "impulso", title: "Impulso", w: 445, h: 967, dims: "Alto 60 cm · ancho 24–27 cm · prof. 22–25 cm", extra: ["Base", "30 × 30 cm"], price: "$48,000 MXN" },
      { slug: "latido", title: "Latido", w: 417, h: 743, dims: "Alto 40 cm · ancho 23–26 cm · prof. 20–22 cm", extra: ["Base", "26 × 26 cm"], price: "$42,000 MXN" },
      { slug: "aceleracion", title: "Aceleración", w: 567, h: 975, dims: "Alto 60 cm · ancho 28–32 cm · prof. 24–27 cm", extra: ["Base", "32 × 32 cm"], price: "$50,000 MXN" },
    ],
  },
  {
    id: "efimero",
    name: "Efímero",
    year: "2025",
    tech: "Patinas al ácido sobre metal",
    blurb: "Metal fundido y arrojado sobre el lienzo metálico, con el soplete como pincel: una cartografía emocional entre la fugacidad y la permanencia.",
    items: [
      { slug: "efimero-1", title: "Efímero I", w: 1688, h: 1679 },
      { slug: "efimero-2", title: "Efímero II", w: 1709, h: 1795 },
      { slug: "efimero-3", title: "Efímero III", w: 1690, h: 1679 },
      { slug: "efimero-4", title: "Efímero IV", w: 1710, h: 1720 },
      { slug: "efimero-5", title: "Efímero V", w: 1688, h: 1682 },
      { slug: "efimero-6", title: "Efímero VI", w: 1710, h: 1709 },
    ].map((o) => ({ ...o, dims: "29 × 29 cm (49 × 49 cm con marco)" })),
  },
  {
    id: "transmutacion",
    name: "Transmutación",
    year: "2025",
    tech: "Metalurgia",
    blurb: "Superficies de metal que el fuego y la fundición transforman en el registro de un instante irrepetible.",
    items: [
      { slug: "transmutacion-1", title: "Transmutación I", w: 896, h: 895, dims: "21 × 21 cm" },
      { slug: "transmutacion-2", title: "Transmutación II", w: 1564, h: 940, dims: "18 × 35 cm" },
      { slug: "transmutacion-3", title: "Transmutación III", w: 1550, h: 833, dims: "40.5 × 24 cm" },
      { slug: "transmutacion-4", title: "Transmutación IV", w: 1256, h: 1202, dims: "28 × 27 cm" },
      { slug: "transmutacion-5", title: "Transmutación V", w: 1419, h: 984, dims: "18 × 26.5 cm" },
    ],
  },
  {
    id: "resiliencias",
    name: "Resiliencias",
    year: "2025",
    tech: "Técnica mixta",
    blurb: "Troncos hallados en una reserva ecológica de Veracruz, a los que el aluminio, el acrílico, el metal o la cerámica devuelven la voz.",
    items: [
      { slug: "arrecife", title: "Arrecife", w: 1688, h: 1543, dims: "60 × 60 × 28 cm" },
      { slug: "vejez", title: "Vejez", w: 1800, h: 1240, dims: "68 × 44 × 26 cm" },
      { slug: "ecos", title: "Ecos", w: 1800, h: 1311, dims: "79 × 47 × 20 cm" },
      { slug: "efecto-mariposa", title: "Efecto mariposa", w: 1542, h: 1598, dims: "55 × 60 × 30 cm" },
    ],
  },
];

const PAGES = {
  galeria: { hash: "#/", title: "Galería", label: "Galería" },
  sobre: { hash: "#/sobre", title: "Sobre mí", label: "Sobre mí" },
  contacto: { hash: "#/contacto", title: "Contacto", label: "Contacto" },
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ALL = SERIES.flatMap((s) => s.items.map((it) => ({ ...it, series: s })));
const DY = [0, 44, 14, 70, 26, 56];

/* ---------- galería ---------- */
function tileHTML(it, i) {
  const ar = (it.w / it.h).toFixed(3);
  const wf = Math.sqrt(it.w / it.h).toFixed(3);
  const idx = ALL.findIndex((a) => a.slug === it.slug);
  return `<button class="tile" data-i="${idx}" style="--ar:${ar};--w:${wf};--dy:${DY[i % DY.length]}" aria-label="${it.title}, ${it.series.year}">
    <img src="${IMG}thumb/${it.slug}.jpg" alt="${it.title}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
    <span class="cap"><em>${it.title}</em><b>${it.series.year}</b></span>
  </button>`;
}

function buildGallery() {
  $("#view-galeria").innerHTML = SERIES.map((s, si) => {
    const items = s.items.map((it) => ({ ...it, series: s }));
    const cut = Math.ceil(items.length / 2);
    const side = (arr, cls, off) => `<div class="side ${cls}">${arr.map((it, i) => tileHTML(it, i + off)).join("")}</div>`;
    const headSide = si % 2 === 0 ? "hl" : "hr";
    return `<article class="series" id="${s.id}" data-name="${s.name}">
      ${side(items.slice(0, cut), "l", 0)}
      ${side(items.slice(cut), "r", 3)}
      <div class="head ${headSide}">
        <h2>${s.name}</h2>
        <p class="meta">${s.year} · ${s.tech}</p>
        <p class="blurb">${s.blurb}</p>
      </div>
    </article>`;
  }).join("");

  $("#index").innerHTML = SERIES.map((s) => `<a href="#${s.id}" data-id="${s.id}">${s.name}<small>${s.year}</small></a>`).join("");
}

function observeGallery() {
  const reveal = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
  }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  $$(".tile").forEach((t, i) => { t.style.transitionDelay = `${(i % 3) * 70}ms`; reveal.observe(t); });

  const links = $$("#index a");
  const setOn = (id) => links.forEach((a) => a.classList.toggle("on", a.dataset.id === id));
  const spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(e.target.id); }),
    { rootMargin: "-45% 0px -50% 0px" });
  $$(".series").forEach((s) => spy.observe(s));
  setOn(SERIES[0].id);

  links.forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.getElementById(a.dataset.id);
    const y = el.getBoundingClientRect().top + scrollY - (innerWidth > 1000 ? 40 : 130);
    scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
}

/* ---------- rutas ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, "");
  const key = h === "sobre" ? "sobre" : h === "contacto" ? "contacto" : "galeria";
  const p = PAGES[key];

  $$(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${key}`));
  document.body.dataset.page = key;
  document.title = `${p.title} · Luisa Lozada`;
  $("#topTitle").textContent = p.title;
  $("#topNav").innerHTML = Object.entries(PAGES).filter(([k]) => k !== key)
    .map(([, v]) => `<a href="${v.hash}">${v.label}</a>`).join("");

  const big = $("#bigletter");
  big.classList.add("swap");
  setTimeout(() => big.classList.remove("swap"), 180);
  scrollTo(0, 0);
  closeLB(false);
}

/* ---------- visor ---------- */
const lb = $("#lb");
let cur = 0, opener = null;

function showLB(i) {
  cur = (i + ALL.length) % ALL.length;
  const it = ALL[cur], s = it.series;
  const img = $("#lbImg");
  img.src = `${IMG}${it.slug}.jpg`;
  img.alt = it.title;
  $("#lbSeries").textContent = s.name;
  $("#lbTitle").textContent = it.title;
  $("#lbYear").textContent = `${s.year} · ${s.tech}`;
  const rows = [["Medidas", it.dims], ...(it.extra ? [it.extra] : []), ["Técnica", s.tech], ["Producción", s.year]];
  $("#lbDl").innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("") +
    (it.price ? `<div class="price"><dt>Precio</dt><dd>${it.price}</dd></div>` : "");
  $("#lbNote").textContent = s.note || "";
  $("#lbCount").textContent = `${String(cur + 1).padStart(2, "0")} / ${String(ALL.length).padStart(2, "0")}`;
}

function openLB(i, from) {
  opener = from || null;
  showLB(i);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
}
function closeLB(restore = true) {
  if (lb.hidden) return;
  lb.hidden = true;
  document.body.style.overflow = "";
  if (restore && opener) opener.focus({ preventScroll: true });
}

/* ---------- init ---------- */
buildGallery();
observeGallery();

$("#view-galeria").addEventListener("click", (e) => {
  const t = e.target.closest(".tile");
  if (t) openLB(+t.dataset.i, t);
});
$("#lbClose").addEventListener("click", () => closeLB());
$("#lbPrev").addEventListener("click", () => showLB(cur - 1));
$("#lbNext").addEventListener("click", () => showLB(cur + 1));
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLB();
  else if (e.key === "ArrowLeft") showLB(cur - 1);
  else if (e.key === "ArrowRight") showLB(cur + 1);
});

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, note = $("#formNote");
  if (!f.checkValidity()) { note.textContent = "Completa los tres campos, por favor."; return; }
  const d = new FormData(f);
  const body = `${d.get("mensaje")}\n\n— ${d.get("nombre")} (${d.get("correo")})`;
  note.textContent = "Se abrirá tu app de correo para enviar el mensaje.";
  location.href = `mailto:luisa24lozada@gmail.com?subject=${encodeURIComponent("Contacto desde el portafolio")}&body=${encodeURIComponent(body)}`;
});

addEventListener("hashchange", route);
route();
