/* ===================================================================
   Data sekaček — převzato z inzerátů (Bazoš). Ceny: dohodou.
   Pořadí položek = pořadí zobrazení na webu.
   images = seznam souborů ve složce images/<slug>/
   =================================================================== */
const MOWERS = [
  {
    slug: "lf550-4wd",
    name: "Jacobsen LF550 4WD",
    tags: ["Pohon 4WD", "2 078 mth", "Kartáčové stěrky", "Golf / fotbal"],
    desc: "Vřetenová sekačka vhodná na údržbu golfových i fotbalových hřišť. Připravena rovnou k používání. Zadní válečky s kartáčovými stěrkami. Najeto 2 078 motohodin. Doprava po dohodě.",
    images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  },
  {
    slug: "lf570-4x4",
    name: "Jacobsen LF570 — pohon 4×4",
    tags: ["Pohon 4×4", "Tempomat", "Nová vřetena", "Sběrací koše"],
    desc: "Vřetenová sekačka vhodná na údržbu golfových i fotbalových hřišť, k dispozici jsou i sběrací koše. Připravena rovnou k používání. Tempomat, nová vřetena a spodní nože, nabroušené nože, pohon 4×4 a nové zadní gumy. Zadní válečky s kartáčovými stěrkami. Doprava po dohodě.",
    images: [1,2,3,4,5,6,7,8,9],
  },
  {
    slug: "lf570",
    name: "Jacobsen LF570",
    tags: ["Tempomat", "Nová vřetena", "Nové pneu", "Sběrací koše"],
    desc: "Vřetenová sekačka vhodná na údržbu golfových i fotbalových hřišť, k dispozici jsou i sběrací koše. Připravena rovnou k používání. Tempomat, nová vřetena, spodní nože a všechny nové pneumatiky. Zadní válečky s kartáčovými stěrkami. Doprava po dohodě.",
    images: [1,2,3,5,6,7,8],
  },
  {
    slug: "jacobsen-305-2000mh",
    name: "Jacobsen 305",
    tags: ["Záběr 3 m", "≈ 2 000 mth", "Turbomotor", "Golf / fotbal"],
    desc: "Vřetenová sekačka se záběrem 3 m — patří mezi nejproduktivnější stroje na trhu. Najeto cca 2 000 motohodin. Vhodná na fotbalová i golfová hřiště. Turbomotor bez filtru pevných částic, zadní rotační stěrače válečků. Doprava po dohodě.",
    images: [1,2,3,4],
  },
  {
    slug: "jacobsen-305-nove-pneu",
    name: "Jacobsen 305 — nové pneu",
    tags: ["Záběr 3 m", "Nové pneumatiky", "Turbomotor", "Golf / fotbal"],
    desc: "Vřetenová sekačka se záběrem 3 m, vhodná na fotbalová i golfová hřiště. Připravena rovnou k provozu, nové pneumatiky. Turbomotor bez filtru pevných částic, zadní rotační stěrače válečků. Doprava po dohodě.",
    images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  },
  {
    slug: "jacobsen-305-370k",
    name: "Jacobsen 305",
    tags: ["Záběr 3 m", "1 490 mth", "Velmi dobrý stav"],
    desc: "Sekačka Jacobsen 305 ve velmi dobrém stavu. Najeto 1 490 motohodin. Cena nového stroje cca 80 000 €. Prohlídka vítána, dovoz po dohodě.",
    images: [1,2,3,4,5,6,7,8,9],
  },
  {
    slug: "jacobsen-522a",
    name: "Jacobsen 522A — ruční vřetenová",
    tags: ["Ruční", "Vřetenová", "Nové vřeteno"],
    desc: "Ruční vřetenová sekačka Jacobsen 522A. Plně funkční, s novým vřetenem. Doprava po dohodě.",
    images: [1,2,3,4,5],
  },
  {
    slug: "jacobsen-522",
    name: "Jacobsen 522 — ruční vřetenová",
    tags: ["Ruční", "Vřetenová", "Plně funkční"],
    desc: "Ruční vřetenová sekačka Jacobsen 522. Plně funkční. Doprava po dohodě.",
    images: [1,2,3,4,5],
  },
];

const PRICE_LABEL = "Cena dohodou";
const MAX_THUMBS = 5; // kolik náhledů ukázat na kartě, zbytek skryje "+N"

/* ---------- Render karet ---------- */
function imgPath(slug, n) { return `images/${slug}/${n}.jpg`; }

function renderCards() {
  const grid = document.getElementById("mowers");
  grid.innerHTML = MOWERS.map((m, mi) => {
    const cover = imgPath(m.slug, m.images[0]);
    const tags = m.tags.map((t) => `<li>${t}</li>`).join("");

    const shown = m.images.slice(0, MAX_THUMBS);
    const extra = m.images.length - shown.length;
    let thumbs = shown.map((n, i) =>
      `<button type="button" data-mower="${mi}" data-index="${i}" aria-label="Fotka ${i + 1}">
         <img src="${imgPath(m.slug, n)}" alt="${m.name} – fotka ${i + 1}" loading="lazy" />
       </button>`
    ).join("");
    if (extra > 0) {
      const i = MAX_THUMBS;
      thumbs += `<button type="button" class="more" data-mower="${mi}" data-index="${i}" aria-label="Zobrazit další fotky">+${extra}</button>`;
    }

    return `
      <article class="card">
        <div class="card-cover" data-mower="${mi}" data-index="0">
          <img src="${cover}" alt="${m.name}" loading="lazy" />
          <span class="card-price">${PRICE_LABEL}</span>
          <span class="card-count">📷 ${m.images.length}</span>
        </div>
        <div class="card-body">
          <h3>${m.name}</h3>
          <ul class="tags">${tags}</ul>
          <p class="card-desc">${m.desc}</p>
          <div class="thumbs">${thumbs}</div>
        </div>
      </article>`;
  }).join("");
}

/* ---------- Lightbox ---------- */
const lb = {
  el: document.getElementById("lightbox"),
  img: document.getElementById("lbImg"),
  caption: document.getElementById("lbCaption"),
  mower: 0,
  index: 0,
};

function openLightbox(mowerIndex, imageIndex) {
  lb.mower = mowerIndex;
  lb.index = imageIndex;
  updateLightbox();
  lb.el.classList.add("open");
  lb.el.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.el.classList.remove("open");
  lb.el.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function step(dir) {
  const m = MOWERS[lb.mower];
  lb.index = (lb.index + dir + m.images.length) % m.images.length;
  updateLightbox();
}

function updateLightbox() {
  const m = MOWERS[lb.mower];
  const n = m.images[lb.index];
  lb.img.src = imgPath(m.slug, n);
  lb.img.alt = `${m.name} – fotka ${lb.index + 1}`;
  lb.caption.textContent = `${m.name} · ${lb.index + 1} / ${m.images.length}`;
}

/* ---------- Události ---------- */
function bindEvents() {
  document.getElementById("mowers").addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-mower]");
    if (!trigger) return;
    openLightbox(Number(trigger.dataset.mower), Number(trigger.dataset.index));
  });

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  lb.el.addEventListener("click", (e) => { if (e.target === lb.el) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.el.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  bindEvents();
  document.getElementById("stat-count").textContent = MOWERS.length;
  document.getElementById("year").textContent = new Date().getFullYear();
});
