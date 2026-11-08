/*! Pool Atlas "Swim here" card. Drop on any page:
 *  <div class="pa-swim" data-pools="54,83,37" data-campaign="tws_tuscany"></div>
 *  <script src="https://poolatlas.io/embed/swim-here.js" async></script>
 * Options: data-pools (ids) | data-near="lat,lng" + data-km | data-country,
 * data-n (1-6), data-title, data-intro, data-campaign.
 * Renders in a shadow root so the host theme can't bend it, picks up the host's
 * heading and body fonts, loads only when scrolled near, and quietly removes
 * itself if anything fails. */
(function () {
  var script = document.currentScript
  var API = (script && script.src ? new URL(script.src).origin : "https://poolatlas.io") + "/api/swim-here"

  var CSS =
    ":host{display:block;margin:2.5rem 0;font-family:var(--pa-body,inherit);color:#353018}" +
    ".card{position:relative;background:#fffdf5;border:1px solid rgba(53,48,24,.16);border-radius:18px;padding:22px 22px 18px;overflow:hidden}" +
    ".card:before{content:'';position:absolute;inset:0 0 auto 0;height:5px;background:linear-gradient(90deg,#1aa3b0,#5ccfd6 55%,#1aa3b0)}" +
    ".kick{margin:0;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#746b3e}" +
    "h3{margin:6px 0 0;font-family:var(--pa-head,inherit);font-size:clamp(1.3rem,3.6vw,1.65rem);line-height:1.15;font-weight:700;color:#353018}" +
    ".intro{margin:6px 0 0;font-size:.95rem;line-height:1.5;color:rgba(53,48,24,.78);max-width:60ch}" +
    ".grid{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}" +
    "a.tile{display:block;color:inherit;text-decoration:none;min-width:0}" +
    ".ph{position:relative;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:#e9e4cf}" +
    ".ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}" +
    "a.tile:hover img{transform:scale(1.04)}" +
    ".rank{position:absolute;left:8px;top:8px;background:#353018;color:#f5d63d;font-size:12px;font-weight:700;letter-spacing:.04em;padding:3px 9px;border-radius:999px}" +
    ".hotel{margin:9px 0 0;font-family:var(--pa-head,inherit);font-weight:700;font-size:1rem;line-height:1.25;overflow-wrap:anywhere}" +
    "a.tile:hover .hotel{text-decoration:underline;text-decoration-color:#1aa3b0;text-underline-offset:3px}" +
    ".where{margin:2px 0 0;font-size:.82rem;line-height:1.35;color:rgba(53,48,24,.7)}" +
    ".closed{margin:4px 0 0;font-size:.75rem;color:#746b3e;font-style:italic}" +
    ".foot{margin:16px 0 0;padding-top:12px;border-top:1px solid rgba(53,48,24,.14);display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;justify-content:space-between;font-size:.82rem;color:rgba(53,48,24,.72)}" +
    ".foot a{color:#353018;font-weight:600;text-decoration:underline;text-decoration-color:#1aa3b0;text-underline-offset:3px}" +
    "@media (max-width:420px){.card{padding:18px 16px 14px}.grid{gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}.grid li:nth-child(odd):last-child{grid-column:1/-1}.grid li:nth-child(odd):last-child .ph{aspect-ratio:2/1}}" +
    "@media (prefers-reduced-motion:reduce){.ph img{transition:none}}"

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    })
  }

  function fonts(host) {
    try {
      var h = document.querySelector("article h2, .entry-content h2, h2, h1")
      if (h) host.style.setProperty("--pa-head", getComputedStyle(h).fontFamily)
      var p = document.querySelector(".entry-content p, article p, p")
      if (p) host.style.setProperty("--pa-body", getComputedStyle(p).fontFamily)
    } catch (e) {}
  }

  function render(el, data) {
    if (!data || !data.pools || !data.pools.length) return el.remove()
    var d = el.dataset
    var root = el.attachShadow ? el.attachShadow({ mode: "open" }) : el
    fonts(el)
    var tiles = data.pools
      .map(function (p) {
        return (
          '<li><a class="tile" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          '<div class="ph"><img src="' + esc(p.image) + '" alt="' + esc(p.name + " at " + p.hotel) + '" loading="lazy" decoding="async">' +
          '<span class="rank">No. ' + esc(p.rank) + "</span></div>" +
          '<p class="hotel">' + esc(p.hotel) + "</p>" +
          '<p class="where">' + esc(p.location) + "</p>" +
          (p.closedNow ? '<p class="closed">Closed for the season</p>' : "") +
          "</a></li>"
        )
      })
      .join("")
    root.innerHTML =
      "<style>" + CSS + "</style>" +
      '<aside class="card" aria-label="Hotel pools ranked by Pool Atlas">' +
      '<p class="kick">Swim here · ranked by Pool Atlas</p>' +
      "<h3>" + esc(d.title || "The pools worth landing for") + "</h3>" +
      (d.intro ? '<p class="intro">' + esc(d.intro) + "</p>" : "") +
      '<ul class="grid">' + tiles + "</ul>" +
      '<div class="foot"><span>From Pool Atlas, our guide to the world’s best hotel pools.</span>' +
      '<a href="' + esc(data.more) + '" target="_blank" rel="noopener">See all the rankings</a></div>' +
      "</aside>"
  }

  function load(el) {
    var d = el.dataset
    var q = new URLSearchParams()
    if (d.pools) q.set("pools", d.pools)
    else if (d.near) { q.set("near", d.near); if (d.km) q.set("km", d.km) }
    else if (d.country) q.set("country", d.country)
    else return el.remove()
    if (d.n) q.set("n", d.n)
    q.set("campaign", d.campaign || "tws_swim_here")
    fetch(API + "?" + q.toString())
      .then(function (r) { return r.ok ? r.json() : null })
      .then(function (data) { render(el, data) })
      .catch(function () { el.remove() })
  }

  function init() {
    var els = document.querySelectorAll(".pa-swim:not([data-pa-ready])")
    Array.prototype.forEach.call(els, function (el) {
      el.setAttribute("data-pa-ready", "")
      if (!("IntersectionObserver" in window)) return load(el)
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); load(el) }
      }, { rootMargin: "600px 0px" })
      io.observe(el)
    })
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init)
  else init()
})()
