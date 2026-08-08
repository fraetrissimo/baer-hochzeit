/* ============================================================
   BRUMMELS EINLADUNGEN – Szenen-, Sprite- und Dialogdaten
   Alles wird als kleine Pixel-Rects direkt in SVG gezeichnet,
   damit das Spiel ganz ohne Bilddateien auskommt.
   ============================================================ */

function R(x, y, w, h, c, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${extra}/>`;
}
function C(cx, cy, r, c) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`;
}
function G(x, y, inner, extra = "") {
  return `<g transform="translate(${x},${y})" ${extra}>${inner}</g>`;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickDifferent(arr, last) {
  if (arr.length <= 1) return arr[0];
  let choice;
  do {
    choice = pick(arr);
  } while (choice === last);
  return choice;
}

/* ---------- Sprites (lokale Koordinaten, ca. 26x34 Box) ---------- */

function bearSprite({ fur = "#b5824f", furDark = "#8a5a35" } = {}) {
  const belly = "#fbe8c9";
  const blush = "#ffb6c6";
  const ink = "#2a1810";
  let s = "";
  s += `<ellipse cx="13" cy="33.5" rx="10" ry="2.2" fill="#000" opacity="0.18"/>`; // Bodenschatten
  s += R(4, 28, 6, 6, furDark, 'rx="2"') + R(16, 28, 6, 6, furDark, 'rx="2"'); // legs
  s += C(5, -1, 5.5, fur) + C(21, -1, 5.5, fur); // round ears
  s += C(5, -1, 2.6, "#c99a68") + C(21, -1, 2.6, "#c99a68"); // ear inner
  s += R(2, 12, 22, 18, fur, 'rx="7"'); // body
  s += R(6, 17, 14, 12, belly, 'rx="5"'); // belly
  s += R(9, 18, 3, 2, "#fffdf5", 'rx="1" opacity="0.55"'); // belly highlight
  s += R(0, 14, 4, 12, fur, 'rx="2"') + R(22, 14, 4, 12, fur, 'rx="2"'); // arms
  s += R(3, 0, 20, 15, fur, 'rx="8"'); // head
  s += R(8, 6, 10, 8, belly, 'rx="4.5"'); // snout
  s += `<path d="M6.5,2.5 Q9,0.5 11.5,2" stroke="${furDark}" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.7"/>`; // Augenbraue
  s += `<path d="M14.5,2 Q17,0.5 19.5,2.5" stroke="${furDark}" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.7"/>`;
  s += C(9, 4.6, 1.7, ink) + C(17, 4.6, 1.7, ink); // eyes
  s += C(9.5, 4, 0.6, "#fff") + C(17.5, 4, 0.6, "#fff"); // eye sparkle
  s += C(6.5, 8.5, 1.8, blush) + C(19.5, 8.5, 1.8, blush); // blush
  s += R(11, 9.5, 4, 2.6, ink, 'rx="1.3"'); // nose
  s += `<path d="M11,12.3 Q13,14.2 15,12.3" stroke="${ink}" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.8"/>`; // Lächeln
  return s;
}

function raccoonSprite() {
  const body = "#a4a4b4";
  const bodyLight = "#c6c6d6";
  const dark = "#2e2e38";
  const blush = "#ffb6c6";
  let s = "";
  s += `<ellipse cx="12" cy="31" rx="9" ry="2" fill="#000" opacity="0.18"/>`; // Bodenschatten
  s += R(4, 24, 5, 6, dark, 'rx="2"') + R(15, 24, 5, 6, dark, 'rx="2"');
  s += C(4, -2, 5, body) + C(17, -2, 5, body); // round ears
  s += R(2, 10, 20, 16, body, 'rx="7"');
  s += R(6, 20, 12, 8, bodyLight, 'rx="4"'); // belly patch
  s += R(4, 0, 16, 13, body, 'rx="6"');
  s += R(5, 4.5, 5.5, 4.5, dark, 'rx="2"') + R(13.5, 4.5, 5.5, 4.5, dark, 'rx="2"'); // mask
  s += C(7.7, 6.7, 0.6, "#fff") + C(16.2, 6.7, 0.6, "#fff"); // eye sparkle
  s += R(9, 8, 6, 4.5, "#f0ece4", 'rx="2"'); // snout
  s += C(10, 11, 1.6, blush) + C(16, 11, 1.6, blush); // blush
  s += C(12, 10, 1.1, "#151519"); // nose
  s += `<line x1="2" y1="9.5" x2="8" y2="9" stroke="#e8e2d8" stroke-width="0.5" opacity="0.8"/><line x1="2" y1="11" x2="8" y2="11" stroke="#e8e2d8" stroke-width="0.5" opacity="0.8"/>`; // Schnurrhaare links
  s += `<line x1="16" y1="9" x2="22" y2="9.5" stroke="#e8e2d8" stroke-width="0.5" opacity="0.8"/><line x1="16" y1="11" x2="22" y2="11" stroke="#e8e2d8" stroke-width="0.5" opacity="0.8"/>`; // Schnurrhaare rechts
  s += R(20, 14, 13, 6, body, 'rx="3"') + R(24, 14, 3, 6, dark) + R(30, 14, 3, 6, dark); // striped tail
  return s;
}

function beeSprite() {
  const gold = "#ffd23f";
  const stripe = "#2a1810";
  let s = "";
  s += `<ellipse cx="14" cy="27" rx="7" ry="1.6" fill="#000" opacity="0.15"/>`; // sanfter Bodenschatten
  s += R(-5, 3, 13, 9, "#d9f4f2", 'rx="5" opacity="0.8"'); // wing
  s += R(22, 3, 13, 9, "#d9f4f2", 'rx="5" opacity="0.8"');
  s += `<line x1="-2" y1="6" x2="8" y2="8" stroke="#fff" stroke-width="0.4" opacity="0.6"/>`; // Flügeladern
  s += `<line x1="25" y1="8" x2="30" y2="6" stroke="#fff" stroke-width="0.4" opacity="0.6"/>`;
  s += R(9, 23, 2, 4, stripe, 'rx="1"') + R(17, 23, 2, 4, stripe, 'rx="1"'); // kleine Beinchen
  s += R(6, 6, 16, 16, gold, 'rx="7"'); // body
  s += R(6, 10.5, 16, 3, stripe) + R(6, 16, 16, 3, stripe); // stripes
  s += C(14, 22, 8.5, gold); // rounded bottom
  s += R(10, -1, 8, 9, gold, 'rx="4"'); // head
  s += C(12, 2.6, 1.3, stripe) + C(16, 2.6, 1.3, stripe); // eyes
  s += C(12.3, 2.2, 0.4, "#fff") + C(16.3, 2.2, 0.4, "#fff");
  s += C(10.5, 5, 1.4, "#ffb6c6") + C(17.5, 5, 1.4, "#ffb6c6"); // blush
  s += `<line x1="11" y1="-1" x2="9" y2="-5" stroke="${stripe}" stroke-width="0.6"/><line x1="17" y1="-1" x2="19" y2="-5" stroke="${stripe}" stroke-width="0.6"/>`; // Fühler
  s += C(9, -5, 1, stripe) + C(19, -5, 1, stripe);
  return s;
}

function owlSprite() {
  const body = "#8a6248";
  const bodyLight = "#c99a68";
  const blush = "#ffb6c6";
  let s = "";
  s += `<ellipse cx="11" cy="32" rx="8" ry="1.8" fill="#000" opacity="0.16"/>`; // Bodenschatten
  s += R(3, 26, 5, 5, "#4a2f1c", 'rx="1.5"') + R(14, 26, 5, 5, "#4a2f1c", 'rx="1.5"');
  s += R(2, 6, 18, 22, body, 'rx="9"');
  s += R(6, 14, 10, 12, bodyLight, 'rx="5"'); // belly
  s += C(6, 1, 4, body) + C(16, 1, 4, body); // ear tufts
  s += C(7, 10, 4.4, "#fff4e0") + C(15, 10, 4.4, "#fff4e0"); // eye rings
  s += C(7, 10, 2, "#0c0716") + C(15, 10, 2, "#0c0716");
  s += C(7.6, 9.3, 0.6, "#fff") + C(15.6, 9.3, 0.6, "#fff"); // sparkle
  s += C(3.5, 12, 1.4, blush) + C(18.5, 12, 1.4, blush); // blush
  s += `<polygon points="9,13.5 15,13.5 11,17.5" fill="#ffb703"/>`; // beak
  s += `<path d="M4,18 Q6,22 4,26 M18,18 Q16,22 18,26" stroke="${bodyLight}" stroke-width="0.6" fill="none" opacity="0.6"/>`; // Federstruktur an den Flanken
  s += R(0, 20, 22, 3, "#5c3e28", 'rx="1.5"'); // little stole
  return s;
}

function slothSprite() {
  const fur = "#a89880";
  const furDark = "#8a7a64";
  const patch = "#5c5040";
  const face = "#e8dfc9";
  const ink = "#2a1810";
  let s = "";
  // Arme zum Kappenrand
  s += `<path d="M10,8 Q2,-2 4,-10" stroke="${fur}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M18,8 Q26,-2 24,-10" stroke="${fur}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += C(4, -10, 1.6, patch) + C(24, -10, 1.6, patch); // Klauen oben
  // Körper
  s += R(5, 8, 18, 20, fur, 'rx="9"');
  // Kopf
  s += C(14, 6, 9, fur);
  s += C(9.5, 4.5, 3.4, patch) + C(18.5, 4.5, 3.4, patch); // Augen-Patches
  s += C(9.5, 4.5, 1.6, "#3a2e22") + C(18.5, 4.5, 1.6, "#3a2e22");
  s += R(8, 3.8, 3, 1, face, 'rx="1.5" opacity="0.9"'); // schläfriges Lid
  s += R(17, 3.8, 3, 1, face, 'rx="1.5" opacity="0.9"');
  s += R(11.5, 8, 5, 3, face, 'rx="1.5"'); // Schnauze
  s += `<path d="M12,10.5 Q14,12 16,10.5" stroke="${ink}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`; // Lächeln
  // Beine, hängend
  s += `<path d="M9,26 Q7,32 8,37" stroke="${fur}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M19,26 Q21,32 20,37" stroke="${furDark}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  s += C(8, 37, 1.4, patch) + C(20, 37, 1.4, patch);
  // Bauplan in der Hand
  s += R(22, 11, 7, 9, "#f4e9c9", 'rx="1" transform="rotate(14 25.5 15.5)"');
  s += `<line x1="23.5" y1="13.5" x2="27" y2="13.5" stroke="${ink}" stroke-width="0.5" transform="rotate(14 25.5 15.5)"/>`;
  s += `<line x1="23.5" y1="15.5" x2="27" y2="15.5" stroke="${ink}" stroke-width="0.5" transform="rotate(14 25.5 15.5)"/>`;
  s += `<line x1="23.5" y1="17.5" x2="26" y2="17.5" stroke="${ink}" stroke-width="0.5" transform="rotate(14 25.5 15.5)"/>`;
  return s;
}
function giantMushroom(x, y, capW, capH, stemH, capColor, spotColor) {
  const cx = x + capW / 2;
  const capBottom = y + capH;
  const rx = capW / 2;
  const ry = capH;
  let s = "";
  s += R(cx - capW * 0.09, capBottom - 2, capW * 0.18, stemH, "#f4e9c9", 'rx="4"'); // Stiel
  s += `<path d="M${x},${capBottom} A${rx},${ry} 0 0 1 ${x + capW},${capBottom} Z" fill="${capColor}"/>`; // Kappe (Halbellipse)
  s += `<path d="M${x + capW * 0.06},${capBottom} A${rx * 0.94},${ry * 0.12} 0 0 1 ${x + capW * 0.94},${capBottom}" stroke="#000" stroke-width="${capH * 0.08}" fill="none" opacity="0.15"/>`; // Schattenkante am Rand
  // Punkte, als Bruchteile von (rx,ry) relativ zur Kappenmitte platziert – bleiben garantiert innerhalb der Halbellipse
  const spots = [
    [-0.35, -0.55],
    [0.3, -0.65],
    [0.05, -0.32],
    [-0.1, -0.82],
    [0.45, -0.28],
    [-0.48, -0.18],
  ];
  spots.forEach(([fx, fy], i) => {
    const r = capW * (i % 2 === 0 ? 0.045 : 0.036);
    s += C(cx + fx * rx, capBottom + fy * ry, r, spotColor);
  });
  return s;
}

function sheepSprite() {
  const wool = "#f4f0e6";
  const woolShade = "#e0dbcc";
  const dark = "#3a3226";
  const band = "#ff8fa3";
  let s = "";
  s += `<ellipse cx="13" cy="33.5" rx="10" ry="2.2" fill="#000" opacity="0.18"/>`; // Bodenschatten
  s += R(4, 27, 6, 7, dark, 'rx="2"') + R(16, 27, 6, 7, dark, 'rx="2"'); // Beine
  // Wolliger Körper
  s += C(8, 20, 7.5, wool) + C(18, 20, 7.5, wool) + C(13, 15, 8.5, wool) + C(13, 24, 7, wool);
  s += C(7, 24, 3.5, woolShade, 'opacity="0.5"');
  // Ohren
  s += R(2, 4, 6, 6, dark, 'rx="3" transform="rotate(-15 5 7)"') + R(18, 4, 6, 6, dark, 'rx="3" transform="rotate(15 21 7)"');
  // Kopf
  s += R(6, 2, 16, 13, dark, 'rx="6"');
  // Stirnband
  s += R(5, 3, 18, 4, band, 'rx="2"');
  s += C(13, 5, 1.4, "#fff", 'opacity="0.35"');
  // wache, aufmerksame Augen mit einer Spur Müdigkeit
  s += C(10, 10, 1.5, "#2a1810") + C(17, 10, 1.5, "#2a1810");
  s += C(10.4, 9.4, 0.5, "#fff") + C(17.4, 9.4, 0.5, "#fff");
  s += `<ellipse cx="10" cy="12.2" rx="1.8" ry="0.6" fill="#8a7a64" opacity="0.22"/><ellipse cx="17" cy="12.2" rx="1.8" ry="0.6" fill="#8a7a64" opacity="0.22"/>`; // dezente Augenschatten
  // Schnauze
  s += R(9, 10, 8, 5, "#5c5044", 'rx="2.5"');
  s += `<path d="M11,13.5 Q13,15 15,13.5" stroke="${wool}" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.7"/>`; // Lächeln
  return s;
}

function monkeySprite() {
  const fur = "#8a5a3b";
  const furLight = "#e8cfa9";
  const ink = "#2a1810";
  let s = "";
  s += `<ellipse cx="14" cy="30" rx="12" ry="2.2" fill="#000" opacity="0.16"/>`; // Bodenschatten
  s += `<path d="M24,20 Q34,18 32,8 Q31,2 24,4" stroke="${fur}" stroke-width="4" fill="none" stroke-linecap="round"/>`; // Schwanz
  s += R(4, 22, 8, 8, fur, 'rx="3" transform="rotate(8 8 26)"') + R(14, 22, 8, 8, fur, 'rx="3" transform="rotate(-6 18 26)"'); // Beine, lässig
  s += R(4, 8, 20, 18, fur, 'rx="8"'); // Körper
  s += R(8, 12, 12, 12, furLight, 'rx="5"'); // Bauch
  s += R(0, 10, 5, 12, fur, 'rx="2" transform="rotate(15 2 16)"') + R(23, 10, 5, 12, fur, 'rx="2" transform="rotate(-15 26 16)"'); // Arme
  s += C(9, -1, 5, fur) + C(19, -1, 5, fur); // Ohren
  s += R(4, 0, 20, 14, fur, 'rx="8"'); // Kopf
  s += R(7, 5, 14, 9, furLight, 'rx="4"'); // Gesicht
  s += C(10, 8, 1.5, ink) + C(18, 8, 1.5, ink); // Augen
  s += C(10.4, 7.4, 0.5, "#fff") + C(18.4, 7.4, 0.5, "#fff");
  s += `<path d="M9,11 Q14,14.5 19,11" stroke="${ink}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`; // Grinsen
  return s;
}

function goatSprite() {
  const fur = "#f4f0e6";
  const furShade = "#ddd6c4";
  const dark = "#3a3226";
  const horn = "#c9a876";
  const box = "#8a5a3b";
  const ring = "#ffd23f";
  let s = "";
  s += `<ellipse cx="13" cy="33.5" rx="10" ry="2.2" fill="#000" opacity="0.18"/>`; // Bodenschatten
  s += R(4, 27, 6, 7, dark, 'rx="2"') + R(16, 27, 6, 7, dark, 'rx="2"'); // Beine
  s += R(3, 12, 20, 18, fur, 'rx="8"'); // Körper
  s += R(7, 17, 12, 10, furShade, 'rx="4" opacity="0.5"'); // Bauch-Schatten
  s += `<path d="M7,2 Q4,-4 8,-6" stroke="${horn}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; // Hörner
  s += `<path d="M19,2 Q22,-4 18,-6" stroke="${horn}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  s += R(0, 3, 6, 4, fur, 'rx="2" transform="rotate(-20 3 5)"') + R(20, 3, 6, 4, fur, 'rx="2" transform="rotate(20 23 5)"'); // Ohren
  s += R(5, 1, 16, 13, fur, 'rx="6"'); // Kopf
  s += C(10, 7, 1.6, dark) + C(16, 7, 1.6, dark); // Augen
  s += C(10.4, 6.4, 0.5, "#fff") + C(16.4, 6.4, 0.5, "#fff");
  s += C(7, 10, 1.6, "#ffb6c6") + C(19, 10, 1.6, "#ffb6c6"); // Blush
  s += R(9, 9, 8, 5, "#efe6d3", 'rx="2.5"'); // Schnauze
  s += `<path d="M10,12 Q13,16.5 16,12 Q13,14.5 10,12 Z" fill="${dark}"/>`; // lachender Mund
  s += R(11, 14, 4, 5, furShade, 'rx="1.5"'); // Bart
  // Zwei identisch aussehende Kästchen (Ringe & Pralinen – nicht verwechseln!)
  s += R(16, 28, 12, 8, box, 'rx="1"');
  s += R(17, 29, 10, 3, "#6b4226", 'rx="1"');
  s += R(19, 25, 12, 8, box, 'rx="1"');
  s += R(20, 26, 10, 3, "#6b4226", 'rx="1"');
  s += C(23, 29, 1.6, ring) + C(28, 29, 1.6, ring);
  return s;
}

function alexSprite() {
  const hoodie = "#5b6b8c";
  const hoodieDark = "#465578";
  const fur = "#d9793f";
  const furLight = "#f4e3c9";
  const ink = "#2a1810";
  let s = "";
  s += `<ellipse cx="13" cy="33.5" rx="10" ry="2.2" fill="#000" opacity="0.18"/>`; // Bodenschatten
  s += `<path d="M21,21 Q30,18 28,29 Q27,34 21,31 Q25,26 21,21 Z" fill="${fur}"/>`; // buschiger Schwanz
  s += C(25.5, 29.5, 2.1, furLight); // Schwanzspitze
  s += R(4, 28, 6, 6, hoodieDark, 'rx="2"') + R(16, 28, 6, 6, hoodieDark, 'rx="2"'); // Beine
  s += R(2, 16, 22, 14, hoodie, 'rx="7"'); // Hoodie-Körper
  s += R(9, 19, 8, 9, hoodieDark, 'rx="4" opacity="0.55"'); // Kängurutasche
  s += R(-1, 17, 5, 11, hoodie, 'rx="2"') + R(22, 17, 5, 11, hoodie, 'rx="2"'); // Ärmel
  s += C(1.5, 27.5, 2.4, fur) + C(24.5, 27.5, 2.4, fur); // Pfoten
  s += `<path d="M2,10 Q13,-8 24,10 Q24,17 17,17 L9,17 Q2,17 2,10 Z" fill="${hoodie}"/>`; // Kapuze
  s += `<line x1="10" y1="16" x2="9" y2="21" stroke="${hoodieDark}" stroke-width="0.8" stroke-linecap="round"/>`;
  s += `<line x1="16" y1="16" x2="17" y2="21" stroke="${hoodieDark}" stroke-width="0.8" stroke-linecap="round"/>`;
  s += C(9, 21, 0.9, hoodieDark) + C(17, 21, 0.9, hoodieDark); // Kordel-Enden
  s += R(9, 10, 8, 8, fur, 'rx="3"'); // der wohlgeformte Hals
  s += R(10, 11, 6, 2, furLight, 'rx="1" opacity="0.6"'); // Hals-Highlight
  s += R(4, 1, 18, 13, fur, 'rx="7"'); // Kopf
  s += R(8, 7, 10, 7, furLight, 'rx="4"'); // Schnauzenfleck
  s += C(9.5, 6.6, 1.6, ink) + C(16.5, 6.6, 1.6, ink); // Augen
  s += C(10, 6, 0.55, "#fff") + C(17, 6, 0.55, "#fff"); // Glanz
  s += R(12, 10, 3, 2, ink, 'rx="1"'); // Nase
  s += `<path d="M11,12.5 Q13,14 15,12.5" stroke="${ink}" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.7"/>`; // Lächeln
  return s;
}

function treeSilo(x, topY, w, h) {
  const trunkW = Math.round(w * 0.22);
  const cx = x + w / 2;
  const topCy = topY + h * 0.35;
  const r = w / 2;
  let s = "";
  s += R(cx - trunkW / 2, topY + h * 0.55, trunkW, h * 0.45, "#3a2414");
  s += R(cx - trunkW / 2 - 1, topY + h * 0.55, trunkW * 0.3, h * 0.45, "#20120a"); // trunk shading
  s += C(cx, topCy, r, "#16281d");
  s += C(cx - r * 0.35, topCy - r * 0.25, r * 0.65, "#20402f"); // puffy highlight lobe
  s += C(cx + r * 0.4, topCy + r * 0.1, r * 0.45, "#122d1f"); // shadow lobe
  s += C(cx - r * 0.15, topCy - r * 0.55, r * 0.3, "#2f5c3f", 'opacity="0.8"'); // top sparkle-light
  return s;
}
function pianoKeys(x, y, w) {
  const n = 12;
  const kw = w / n;
  let s = "";
  for (let i = 0; i < n; i++) s += R(x + i * kw, y, kw - 0.6, 10, "#f4e9c9");
  for (let i = 0; i < n - 1; i++) {
    if (i % 7 === 2 || i % 7 === 6) continue;
    s += R(x + (i + 1) * kw - kw * 0.28, y, kw * 0.56, 6, "#151011");
  }
  return s;
}
function scrapPile(x, y) {
  const m1 = "#8a8a8a";
  const m2 = "#6b6b6b";
  const m3 = "#a3a3a3";
  const rust = "#b5651d";
  let s = "";
  s += `<ellipse cx="17" cy="27" rx="18" ry="3" fill="#000" opacity="0.2"/>`; // Schatten
  s += R(0, 14, 34, 12, m2, 'rx="2"'); // Basis
  s += R(4, 6, 14, 12, m1, 'rx="1" transform="rotate(-8 11 12)"');
  s += R(16, 2, 16, 10, m3, 'rx="1" transform="rotate(6 24 7)"');
  s += C(10, 8, 4, rust);
  s += R(20, 12, 10, 4, m2, 'rx="1"');
  s += `<line x1="2" y1="10" x2="14" y2="4" stroke="${m3}" stroke-width="2"/>`; // Rohr
  s += C(28, 16, 3, m1);
  return G(x, y, s);
}
function humMachine(x, y, color) {
  const body = color || "#5a5a6b";
  const dark = "#3a3a46";
  const accent = "#ffd23f";
  const pipe = "#8a8a96";
  let s = "";
  s += `<ellipse cx="14" cy="30" rx="14" ry="3" fill="#000" opacity="0.2"/>`; // Schatten
  s += R(0, 10, 28, 20, body, 'rx="3"'); // Korpus
  s += R(4, 14, 8, 8, dark, 'rx="2"'); // Bullauge
  s += C(8, 18, 3, accent, 'opacity="0.8"');
  s += R(16, 2, 6, 12, dark, 'rx="2"'); // Schlot
  s += C(19, 2, 3, pipe);
  s += R(20, 16, 6, 10, dark, 'rx="1"'); // zweites Rohr
  s += C(24, 24, 3, pipe) + C(24, 24, 1, dark); // Zahnrädchen
  // Summen-Wellen
  s += `<path d="M30,6 Q35,10 30,14" stroke="${accent}" stroke-width="1" fill="none" opacity="0.7"/>`;
  s += `<path d="M33,3 Q40,10 33,17" stroke="${accent}" stroke-width="1" fill="none" opacity="0.45"/>`;
  return G(x, y, s);
}
function flowerPatch(x, y, hue) {
  const colors = hue ? [hue] : ["#ffb703", "#ff8fa3", "#f4e9c9", "#7fe0d6"];
  const c = colors[(x + y) % colors.length];
  let s = R(x, y, 2, 11, "#2f5c3f", 'rx="1"');
  s += R(x - 2, y + 4, 3, 4, "#3f7a52", 'rx="1.5" transform="rotate(-25 ' + x + " " + (y + 6) + ')"');
  const petalR = 2.6;
  const cx = x + 1,
    cy = y - 3;
  [0, 72, 144, 216, 288].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    s += C(cx + Math.cos(rad) * petalR, cy + Math.sin(rad) * petalR, 2.1, c);
  });
  s += C(cx, cy, 1.6, "#ffe066");
  return s;
}
function featherIcon(x, y) {
  const vane = "#fdf6e3";
  const vaneShade = "#e0d5b8";
  const shaft = "#c9a876";
  const quill = "#b5824f";
  let barbs = "";
  for (let i = 3; i <= 22; i += 3) {
    const w = 4.5 - Math.abs(i - 13) * 0.15;
    barbs += `<line x1="6" y1="${i}" x2="${6 - w}" y2="${i - 2}" stroke="${vaneShade}" stroke-width="0.6"/>`;
    barbs += `<line x1="6" y1="${i}" x2="${6 + w}" y2="${i - 2}" stroke="${vaneShade}" stroke-width="0.6"/>`;
  }
  const shape =
    `<path d="M6,0 C11,5 11,19 6,26 C1,19 1,5 6,0 Z" fill="${vane}"/>` +
    barbs +
    `<line x1="6" y1="1" x2="6" y2="26" stroke="${shaft}" stroke-width="0.9"/>` +
    `<line x1="6" y1="26" x2="6" y2="32" stroke="${quill}" stroke-width="1.6" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) rotate(-20 6 16)">${shape}</g>`;
}
function sparkle(cx, cy, r, color = "#fff4e0") {
  return (
    R(cx - 0.6, cy - r, 1.2, r * 2, color, 'opacity="0.85"') +
    R(cx - r, cy - 0.6, r * 2, 1.2, color, 'opacity="0.85"')
  );
}
function heart(cx, cy, s, color) {
  return G(
    cx,
    cy,
    C(-s * 0.5, -s * 0.3, s * 0.55, color) + C(s * 0.5, -s * 0.3, s * 0.55, color) + `<polygon points="${-s * 1.05},-0.1 ${s * 1.05},-0.1 0,${s * 1.2}" fill="${color}"/>`
  );
}
function bowIcon(cx, cy, s, color) {
  return (
    `<polygon points="${cx - s},${cy} ${cx},${cy - s * 0.6} ${cx},${cy + s * 0.6}" fill="${color}"/>` +
    `<polygon points="${cx + s},${cy} ${cx},${cy - s * 0.6} ${cx},${cy + s * 0.6}" fill="${color}"/>` +
    C(cx, cy, s * 0.4, "#ff5d8f")
  );
}
function buntingFlags(x, y, w, count, colors) {
  const cols = colors || ["#ff8fa3", "#ffd23f", "#7fe0d6", "#c9a8ff"];
  let s = `<path d="M${x},${y} Q${x + w / 2},${y + 14} ${x + w},${y}" stroke="#f4e9c9" stroke-width="1" fill="none"/>`;
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const px = x + t * w;
    const py = y + Math.sin(t * Math.PI) * 14;
    s += `<polygon points="${px - 4},${py} ${px + 4},${py} ${px},${py + 7}" fill="${cols[i % cols.length]}"/>`;
  }
  return s;
}
function weddingArch(x, y, w, h) {
  const wood = "#6b4226";
  const petals = ["#ff8fa3", "#fdf6e3", "#ffd23f"];
  let s = "";
  s += R(x, y, 6, h, wood, 'rx="2"');
  s += R(x + w - 6, y, 6, h, wood, 'rx="2"');
  s += `<path d="M${x},${y} Q${x + w / 2},${y - h * 0.55} ${x + w},${y}" stroke="${wood}" stroke-width="6" fill="none"/>`;
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const px = x + t * w;
    const py = y - Math.sin(t * Math.PI) * h * 0.55;
    s += C(px, py, 4, petals[i % petals.length]);
  }
  return s;
}
function exitArrow(cx, cy, angleDeg, color = "#ffd166") {
  return `<g transform="translate(${cx},${cy}) rotate(${angleDeg})" opacity="0.85">
    <polygon points="-7,-9 7,0 -7,9" fill="${color}" opacity="0.25">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="1.8s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="-5,-6.5 5,0 -5,6.5" fill="${color}">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
    </polygon>
  </g>`;
}

/* ---------- Kopf-Illustration (ersetzt reinen Schrift-Titel) ---------- */

const HEADER_ART = `
  ${sparkle(60, 8, 1.6, "#ffe9b0")}${sparkle(268, 34, 1.6, "#ffe9b0")}
  <g transform="translate(28,10) scale(1.15)">${bearSprite()}</g>
  ${heart(160, 26, 9, "#ff5d8f")}
  ${sparkle(144, 14, 2, "#fff4e0")}${sparkle(178, 16, 1.5, "#fff4e0")}
  <g transform="translate(256,10) scale(1.15)">${bearSprite()}${bowIcon(13, -7, 4.5, "#ff8fa3")}</g>
`;

/* ---------- Hintergründe ---------- */

const BG = {
  bau: `
    ${R(0, 0, 320, 140, "#3a2414")}
    ${R(170, 20, 60, 18, "#2c1a0f")}
    ${R(0, 140, 320, 40, "#1c1006")}
    ${R(0, 140, 320, 4, "#4a2f1c")}
    <!-- Fenster: sperrangelweit offen -->
    ${R(28, 26, 56, 56, "#20120a")}
    ${R(34, 32, 44, 44, "#3d2a63")}
    ${C(70, 42, 3, "#f4e9c9")}${C(50, 50, 2, "#f4e9c9")}
    ${R(55, 32, 2, 44, "#20120a")}${R(34, 52, 44, 2, "#20120a")}
    ${R(24, 22, 10, 30, "#6b4226")}
    <!-- Wecker auf Sims -->
    ${R(148, 62, 40, 8, "#2c1a0f")}
    ${C(168, 48, 15, "#f4e9c9")}
    ${C(168, 48, 12, "#fffdf5")}
    <line x1="168" y1="48" x2="168" y2="39" stroke="#0c0716" stroke-width="2"/>
    <line x1="168" y1="48" x2="175" y2="48" stroke="#0c0716" stroke-width="2"/>
    ${C(159, 36, 4, "#8a5a3b")}${C(177, 36, 4, "#8a5a3b")}
    <!-- Schreibtisch: Chaos -->
    ${R(96, 118, 92, 10, "#2c1a0f")}
    ${R(98, 128, 5, 18, "#241407")}${R(178, 128, 5, 18, "#241407")}
    ${R(150, 100, 22, 15, "#f4e9c9", 'transform="rotate(-6 161 107)"')}
    ${R(148, 104, 18, 12, "#e8e2d8", 'transform="rotate(8 157 110)"')}
    ${R(118, 104, 13, 10, "#0c0716", 'rx="2"')}
    ${C(112, 116, 7, "#0c0716", "")}
    <rect x="-1" y="-14" width="2" height="26" fill="#8a5a3b" transform="translate(134,100) rotate(25)"/>
    ${heart(160, 108, 3, "#ff8fa3")}
    <!-- Tunnel-Ausgang -->
    ${R(288, 46, 32, 94, "#0c0602")}
    ${R(296, 80, 16, 40, "#20402f")}
    ${exitArrow(304, 92, 0)}
    <!-- gemütlicher Teppich -->
    ${C(70, 158, 26, "#4a2f1c", 'opacity="0.6"')}
    ${sparkle(168, 30, 2.5, "#ffe9b0")}${sparkle(200, 88, 1.6, "#ffe9b0")}
    <!-- Tim, entspannt auf dem Teppich -->
    ${G(45, 128, bearSprite({ fur: "#8a7060", furDark: "#6b5647" }))}
    <!-- Fabian -->
    <g transform="translate(150,84) scale(1.35)">${bearSprite()}</g>
  `,

  wald: `
    ${R(0, 0, 320, 150, "#241645")}
    ${R(0, 0, 320, 60, "#3d2a63")}
    ${C(270, 30, 16, "#f4e9c9", "")}
    ${C(275, 26, 4, "#fffdf5", 'opacity="0.9"')}
    ${treeSilo(10, 20, 40, 130)}${treeSilo(250, 10, 46, 150)}${treeSilo(300, 30, 30, 120)}
    ${R(0, 150, 320, 30, "#16281d")}
    ${R(0, 150, 320, 4, "#20402f")}
    <!-- Glühwürmchen -->
    ${sparkle(120, 130, 2, "#c8ffb0")}${sparkle(200, 60, 1.6, "#c8ffb0")}${sparkle(60, 60, 1.4, "#c8ffb0")}
    <!-- Wegweiser-Pfeile zu den Ausgängen -->
    ${exitArrow(14, 75, 180)}
    ${exitArrow(305, 95, 0, "#3ad6c9")}
    ${exitArrow(160, 165, 90)}
    ${exitArrow(160, 25, 270, "#c9a8ff")}
    <!-- KSC-Fahne -->
    ${R(160, 58, 3, 86, "#9a9a9a", 'rx="1"')}
    ${C(161, 57, 2.5, "#ffd23f")}
    <path d="M163,60 L206,65 L206,82 L163,87 Z" fill="#004b93"/>
    <path d="M163,73 L206,76 L206,82 L163,87 Z" fill="#f4f4f4"/>
    <!-- Stumpf mit Johannes -->
    ${R(30, 132, 46, 20, "#4a2f1c", 'rx="3"')}
    ${R(30, 128, 46, 8, "#6b4226", 'rx="3"')}
    ${G(38, 96, raccoonSprite())}
    <!-- Alex, der Trauzeuge -->
    ${G(255, 116, alexSprite())}
  `,

  see: `
    ${R(0, 0, 320, 120, "#122233")}
    ${R(0, 0, 320, 50, "#1b3a4b")}
    ${C(260, 26, 14, "#cdeeee", 'opacity="0.9"')}
    ${R(0, 120, 320, 60, "#1b3a4b")}
    ${R(0, 122, 320, 4, "#3ad6c9", 'opacity="0.5"')}
    ${R(0, 140, 320, 4, "#2a5b73")}
    ${treeSilo(0, 40, 30, 90)}${treeSilo(280, 30, 40, 100)}
    <!-- Verlassenes Klavier (Kleinanzeigen-Fund, will niemand haben) -->
    ${R(38, 66, 112, 60, "#241407", 'rx="3"')}
    ${R(38, 58, 112, 12, "#1c1006", 'rx="3"')}
    ${R(44, 92, 100, 5, "#0c0602")}
    ${pianoKeys(50, 98, 84)}
    ${R(46, 118, 96, 6, "#1c1006")}
    ${R(50, 124, 6, 12, "#1c1006")}${R(126, 124, 6, 12, "#1c1006")}
    <!-- Kleinanzeigen-Zettel dran getackert -->
    ${R(112, 72, 38, 22, "#f4e9c9", 'transform="rotate(6 131 83)"')}
    <text x="131" y="82" text-anchor="middle" font-family="'Press Start 2P',monospace" font-size="3.4" fill="#241407" transform="rotate(6 131 83)">2000&#8364;</text>
    <text x="131" y="90" text-anchor="middle" font-family="'Press Start 2P',monospace" font-size="2.6" fill="#241407" transform="rotate(6 131 83)">NUR ABHOLUNG</text>
    <!-- Gästeliste klemmt unterm Deckel -->
    ${R(92, 62, 16, 12, "#f4e9c9", 'transform="rotate(-8 100 68)"')}
    <line x1="95" y1="67" x2="105" y2="67" stroke="#8a76b8" stroke-width="1"/>
    <line x1="95" y1="70" x2="105" y2="70" stroke="#8a76b8" stroke-width="1"/>
    <!-- Schilf -->
    ${R(200, 90, 3, 40, "#20402f")}${R(210, 84, 3, 46, "#20402f")}${R(190,94,3,36,'#20402f')}
    <!-- Sonjas kleiner Garten -->
    ${flowerPatch(163, 138, "#7fe0d6")}${flowerPatch(178, 142, "#ffb703")}${flowerPatch(170, 132, "#ff8fa3")}
    ${G(158, 105, sheepSprite())}
    <!-- Stephan am Seeufer -->
    ${G(228, 108, monkeySprite())}
    <!-- Haufen Metallschrott -->
    ${scrapPile(262, 118)}
    ${exitArrow(15, 85, 180, "#3ad6c9")}
  `,

  wiese: `
    ${R(0, 0, 320, 110, "#7a4a9c")}
    ${R(0, 0, 320, 60, "#a85fa0")}
    ${C(60, 30, 20, "#ffb703")}
    ${R(0, 110, 320, 70, "#3f7a52")}
    ${R(0, 110, 320, 6, "#5a9a68")}
    <!-- Baum mit Bienenstock und Annas Ast -->
    ${R(230, 20, 14, 100, "#4a2f1c")}
    ${C(237, 12, 34, "#2f5c3f")}
    ${R(222, 40, 26, 22, "#e8cfa9", 'rx="10"')}
    ${R(228, 46, 4, 4, "#0c0716")}${R(236, 46, 4, 4, "#0c0716")}${R(232,52,4,4,'#0c0716')}
    ${G(205, 68, beeSprite())}
    ${R(190, 30, 60, 8, "#20402f")}
    ${G(196, 7, owlSprite())}
    <!-- verlorene Feder am Baumfuß -->
    ${featherIcon(196, 90)}
    <!-- Blumenbeet (hübsch, aber gerade unwichtig) -->
    ${flowerPatch(50, 132)}${flowerPatch(80, 140)}${flowerPatch(110, 130)}${flowerPatch(70,150)}
    ${exitArrow(305, 85, 0)}
    ${exitArrow(15, 85, 180, "#ff8fa3")}
  `,

  lichtung: `
    ${R(0, 0, 320, 110, "#7a4a8c")}
    ${R(0, 0, 320, 55, "#ffb08a")}
    ${C(270, 30, 20, "#ffe066")}
    ${R(0, 110, 320, 70, "#3f7a52")}
    ${R(0, 110, 320, 6, "#5a9a68")}
    ${treeSilo(0, 10, 40, 130)}${treeSilo(280, 10, 40, 130)}
    <!-- Lichterkette zwischen den Bäumen -->
    <path d="M30,55 Q160,30 290,55" stroke="#f4e9c9" stroke-width="1" fill="none" opacity="0.6"/>
    ${sparkle(70, 50, 1.8, "#ffe9b0")}${sparkle(110, 38, 1.6, "#ffe9b0")}${sparkle(160, 32, 1.8, "#ffe9b0")}${sparkle(210, 38, 1.6, "#ffe9b0")}${sparkle(250, 50, 1.8, "#ffe9b0")}
    <!-- Wimpelkette -->
    ${buntingFlags(40, 20, 240, 9)}
    <!-- Traubogen -->
    ${weddingArch(120, 115, 80, 55)}
    <!-- Deko-Stühlchen -->
    ${R(30, 148, 10, 14, "#4a2f1c")}${R(50, 152, 10, 14, "#4a2f1c")}${R(260,152,10,14,'#4a2f1c')}${R(280,148,10,14,'#4a2f1c')}
    <!-- Geschenke-/Deko-Tisch mit kleiner Torte -->
    ${R(220, 130, 44, 6, "#6b4226")}
    ${R(222, 136, 4, 14, "#6b4226")}${R(258, 136, 4, 14, "#6b4226")}
    ${R(232, 112, 22, 18, "#fdf6e3", 'rx="2"')}
    ${R(236, 100, 14, 12, "#fff", 'rx="2"')}
    ${C(243, 98, 2, "#ff8fa3")}
    <!-- Sandra, Claudias Trauzeugin -->
    ${G(24, 118, goatSprite())}
    <!-- Claudia, seelenruhig beim Dekorieren -->
    <g transform="translate(140,120) scale(1.2)">${bearSprite({ fur: "#c98a8a", furDark: "#a86868" })}</g>
    ${exitArrow(305, 85, 0, "#ff8fa3")}
  `,

  pilzwald: `
    ${R(0, 0, 320, 120, "#241238")}
    ${R(0, 0, 320, 55, "#3a1f52")}
    ${sparkle(60, 30, 2, "#c9a8ff")}${sparkle(220, 20, 1.6, "#c9a8ff")}${sparkle(150, 45, 1.4, "#ffe9b0")}${sparkle(280, 60, 1.6, "#c9a8ff")}
    ${R(0, 120, 320, 60, "#180b28")}
    ${R(0, 120, 320, 4, "#3a1f52")}
    <!-- kleine Pilze am Boden, nur zur Größenkontrast-Deko -->
    ${giantMushroom(16, 140, 18, 11, 8, "#ff5d5d", "#fdf6e3")}
    ${giantMushroom(276, 143, 16, 10, 7, "#7fe0d6", "#241238")}
    <!-- der eine große Pilz -->
    ${giantMushroom(75, 12, 160, 62, 48, "#c9455a", "#fdf6e3")}
    ${G(96, 84, slothSprite())}
    <!-- Janos' drei summende Maschinen -->
    ${humMachine(45, 95, "#5a5a6b")}
    ${humMachine(245, 95, "#6b4a5a")}
    ${humMachine(12, 148, "#4a5a6b")}
    ${exitArrow(160, 165, 90, "#c9a8ff")}
  `,

  introForest: `
    ${R(0, 0, 320, 110, "#2b1c4d")}
    ${R(0, 0, 320, 55, "#3d2a63")}
    ${C(250, 26, 16, "#f4e9c9")}
    ${treeSilo(0, 10, 50, 150)}${treeSilo(268, 0, 52, 160)}
    ${R(0, 110, 320, 70, "#1f3d2b")}
    ${R(0, 110, 320, 4, "#2f5c3f")}
    <!-- Banner zwischen den Bäumen -->
    <path d="M55,58 Q160,88 265,58" stroke="#f4e9c9" stroke-width="2" fill="none"/>
    ${R(66, 58, 188, 26, "#ff9f5a", 'transform="rotate(1 160 71)"')}
    <text x="160" y="76" text-anchor="middle" font-family="'Press Start 2P',monospace" font-size="9" fill="#241407">FABIAN + CLAUDIA</text>
    <!-- ein paar Stühlchen werden aufgestellt -->
    ${R(90, 150, 10, 14, "#4a2f1c")}${R(130, 156, 10, 14, "#4a2f1c")}${R(190,152,10,14,'#4a2f1c')}${R(220,158,10,14,'#4a2f1c')}
  `,
};

/* ============================================================
   RÄUME
   ============================================================ */

const ROOMS = {
  bau: {
    name: "Fabians Bau",
    bg: () => BG.bau,
    intro: "Fabians Bau. Zettel fliegen durch die Luft, Tinte klebt überall. Reinstes Chaos.",
    hotspots: [
      {
        id: "fenster",
        name: "Fenster",
        x: 26, y: 24, w: 58, h: 58,
        look: "Das Fenster steht sperrangelweit offen. Kein Wunder, dass die halbe Gästeliste einfach weggeflogen ist.",
      },
      {
        id: "wecker",
        name: "Wecker",
        x: 148, y: 30, w: 40, h: 40,
        look: "„Einladungen HEUTE verschicken!“ steht auf einem Zettel drangeklebt. Von gestern. Zur Sicherheit.",
      },
      {
        id: "schreibtisch",
        name: "Schreibtisch",
        x: 94, y: 96, w: 96, h: 44,
        look: "Umgekippte Tinte, eine zerknickte Feder und der Rest der Gästeliste ist einfach... weg. Sehr Fabian.",
      },
      {
        id: "brummel",
        name: "Fabian",
        x: 128, y: 78, w: 90, h: 100,
        npc: "brummel",
        look: "Fabian. Bräutigam in spe. Aktueller Zustand: totale Panik.",
      },
      {
        id: "tim",
        name: "Tim",
        x: 40, y: 124, w: 44, h: 60,
        npc: "tim",
        look: "Tim, Fabians Bruder. Wirkt deutlich entspannter als Fabian – passt aber trotzdem auf jeden Fall auf ihn auf.",
      },
      {
        id: "exit_wald",
        name: "Ausgang",
        x: 288, y: 44, w: 32, h: 96,
        exit: "wald",
      },
    ],
  },

  wald: {
    name: "Der Wald",
    bg: () => BG.wald,
    intro: "Mitten im Wald. Wege führen zum See und zur Bienenwiese.",
    hotspots: [
      {
        id: "johannes",
        name: "Johannes",
        x: 30, y: 88, w: 58, h: 66,
        npc: "johannes",
        look: "Johannes, der Waschbär. Hängt hier vermutlich schon seit Stunden ab und grübelt.",
      },
      {
        id: "ksc_fahne",
        name: "KSC-Fahne",
        x: 155, y: 55, w: 56, h: 40,
        look: "Blau-weiß im Abendwind. Beim Anblick überkommt dich für einen Moment die Wehmut, die nur das ewige Dahinfristen in der 2. Liga hervorbringen kann.",
        take: true,
        item: "ksc_fahne",
        takeMsg: "Du reißt die Fahnenstange kurzerhand aus der Erde. Irgendwie fühlt sich das nach Vereinsverrat an.",
      },
      {
        id: "alex",
        name: "Alex",
        x: 251, y: 114, w: 34, h: 40,
        npc: "alex",
        look: "Alex, der Trauzeuge. Hoodie an, Kapuze auf, absolut entspannt.",
      },
      { id: "exit_bau", name: "Zurück zum Bau", x: 140, y: 150, w: 40, h: 30, exit: "bau" },
      { id: "exit_see", name: "Zum See", x: 290, y: 40, w: 30, h: 110, exit: "see" },
      { id: "exit_wiese", name: "Zur Bienenwiese", x: 0, y: 20, w: 24, h: 110, exit: "wiese" },
      { id: "exit_pilzwald", name: "Tiefer in den Wald", x: 142, y: 8, w: 36, h: 45, exit: "pilzwald" },
    ],
  },

  see: {
    name: "Seeufer",
    bg: () => BG.see,
    intro: "Der See liegt still und glitzernd da. Von Ruhe kannst du gerade nur träumen.",
    hotspots: [
      {
        id: "klavier",
        name: "Verlassenes Klavier",
        x: 36, y: 58, w: 112, h: 72,
        look: "Ein Klavier, das seit Wochen für 2000€ auf Kleinanzeigen steht. Bei dem Preis beißt niemand an. Und klemmt da nicht ein Zettel deiner Gästeliste unterm Deckel?!",
      },
      {
        id: "sonja",
        name: "Sonja",
        x: 148, y: 100, w: 44, h: 50,
        npc: "sonja",
        look: "Sonja, das Schaf. Sitzt inmitten ihres Gartens und wirkt, als würde sie gerade über das Leben nachdenken.",
      },
      {
        id: "stephan",
        name: "Stephan",
        x: 220, y: 100, w: 40, h: 44,
        npc: "stephan",
        look: "Stephan, der Affe. Lebt hier am See und lässt es sich sichtlich gut gehen.",
      },
      {
        id: "metallschrott_haufen",
        name: "Haufen Metallschrott",
        x: 260, y: 116, w: 38, h: 34,
        look: "Ein ordentlicher Haufen Metallschrott. Sieht aus, als hätte ihn jemand gezielt hier abgelegt.",
        takeFail: "Das ist nicht dein Schrott. Frag lieber erst Stephan, ob du dir was davon nehmen darfst.",
      },
      { id: "exit_wald", name: "Zurück zum Wald", x: 0, y: 20, w: 26, h: 130, exit: "wald" },
    ],
  },

  wiese: {
    name: "Bienenwiese",
    bg: () => BG.wiese,
    intro: "Eine Wiese im Abendlicht. Ein Bienenstock summt, und hoch oben döst jemand Gefiedertes.",
    hotspots: [
      {
        id: "bienenstock",
        name: "Bienenstock",
        x: 220, y: 38, w: 30, h: 26,
        look: "Aus dem Stock dringt ein wohliges Summen. So muss es sich anhören, wenn irgendwo gerade Recht gebeugt und verdreht wird.",
      },
      {
        id: "julia",
        name: "Julia",
        x: 198, y: 58, w: 70, h: 48,
        npc: "julia",
        look: "Julia, eine Biene aus dem Stock. Ewig in Eile – die Kollegen warten schon wieder auf den nächsten Trip.",
      },
      {
        id: "anna",
        name: "Anna die Posteule",
        x: 186, y: 0, w: 52, h: 46,
        npc: "anna",
        look: "Anna. Zuständig für sämtliche Waldpost. Wirkt ziemlich nervös auf ihrem Ast.",
      },
      {
        id: "feder",
        name: "Feder",
        x: 188, y: 82, w: 26, h: 30,
        take: true,
        takeMsg: "Eine große, fast unbenutzte Feder. Anna wird sie kaum vermissen – sie hat sie sowieso fallen lassen.",
        item: "feder",
      },
      {
        id: "blumen",
        name: "Blumenbeet",
        x: 44, y: 122, w: 90, h: 46,
        look: "Hübsche Wiesenblumen. Ein Strauß davon wäre bestimmt eine nette Geste für jemanden.",
        take: true,
        item: "blumenstrauss",
        takeMsg: "Du pflückst einen bunten Blumenstrauß.",
      },
      { id: "exit_wald", name: "Zurück zum Wald", x: 294, y: 20, w: 26, h: 130, exit: "wald" },
      { id: "exit_lichtung", name: "Zur Lichtung", x: 0, y: 20, w: 24, h: 110, exit: "lichtung" },
    ],
  },

  lichtung: {
    name: "Die geschmückte Lichtung",
    bg: () => BG.lichtung,
    intro: "Eine Lichtung, komplett für die Hochzeit geschmückt. Girlanden, ein Traubogen, Lichterketten – hier ist wirklich alles vorbereitet.",
    hotspots: [
      {
        id: "traubogen",
        name: "Traubogen",
        x: 118, y: 60, w: 84, h: 110,
        look: "Ein liebevoll mit Blüten geschmückter Traubogen. Hier wird morgen das Jawort gegeben.",
      },
      {
        id: "dekotisch",
        name: "Deko-Tisch",
        x: 218, y: 95, w: 48, h: 55,
        look: "Ein kleiner Tisch mit einer Probe-Torte. Noch nicht die echte – aber schon zum Anbeißen.",
      },
      {
        id: "sandra",
        name: "Sandra",
        x: 20, y: 115, w: 40, h: 48,
        npc: "sandra",
        look: "Sandra, Claudias Trauzeugin. Grinst breit und hält zwei kleine Kästchen fest umklammert – die sehen verdächtig gleich aus.",
      },
      {
        id: "claudia",
        name: "Claudia",
        x: 128, y: 82, w: 44, h: 66,
        npc: "claudia",
        look: "Claudia, die Braut. Bindet seelenruhig Schleifen und Girlanden, mitten im ganzen Vorbereitungs-Trubel.",
      },
      { id: "exit_wiese", name: "Zurück zur Wiese", x: 294, y: 20, w: 26, h: 130, exit: "wiese" },
    ],
  },

  pilzwald: {
    name: "Pilzwald",
    bg: () => BG.pilzwald,
    intro: "Ein leuchtender Pilzwald. Die Luft riecht nach Moos, und irgendwo glitzert Sporenstaub durch die Luft.",
    hotspots: [
      {
        id: "riesenpilz",
        name: "Riesenpilz",
        x: 75, y: 12, w: 160, h: 108,
        look: "Ein Pilz, so groß wie ein Haus. Niemand weiß, warum er so groß ist. Niemand fragt hier so genau nach.",
      },
      {
        id: "janos",
        name: "Janos",
        x: 90, y: 78, w: 50, h: 55,
        npc: "janos",
        look: "Janos, das Faultier. Hängt kopfüber am Rand des Riesenpilzes und hält ein zerknittertes Blatt Papier in der Pfote.",
      },
      {
        id: "maschine1",
        name: "Maschine",
        x: 42, y: 85, w: 42, h: 48,
        look: "Diese Maschine hat einen kleinen Hebel mit der Aufschrift „NICHT DRÜCKEN“. Verlockend. Du lässt es trotzdem lieber bleiben.",
      },
      {
        id: "maschine2",
        name: "Maschine",
        x: 242, y: 85, w: 42, h: 48,
        look: "Diese Maschine hat ein kleines Guckloch. Dahinter: nichts als Dunkelheit und ein stetiges Summen.",
      },
      {
        id: "maschine3",
        name: "Maschine",
        x: 8, y: 138, w: 42, h: 42,
        look: "Die dritte Maschine schnurrt leise vor sich hin. Wofür sie gedacht ist, weiß vermutlich nicht mal Janos selbst.",
      },
      { id: "exit_wald", name: "Zurück zum Wald", x: 140, y: 150, w: 40, h: 30, exit: "wald" },
    ],
  },
};

/* ============================================================
   GEGENSTÄNDE
   ============================================================ */

const ITEMS = {
  ksc_fahne: { name: "KSC-Fahnenstange", icon: "🚩", look: "Eine stabile Fahnenstange. Blau-weiß, aber vor allem: stabil." },
  blumenstrauss: { name: "Blumenstrauß", icon: "💐", look: "Ein bunter Wiesenblumenstrauß. Bestimmt freut sich jemand darüber." },
  feder: { name: "Feder", icon: "🪶", look: "Eine prächtige Schreibfeder." },
  gaesteliste: { name: "Gästeliste", icon: "📜", look: "Die geretteten Reste der Gästeliste." },
  wachs: { name: "Siegelwachs", icon: "🕯️", look: "Ein Klümpchen Bienenwachs zum Siegeln." },
  einladungen: { name: "Einladungen", icon: "💌", look: "Ein fertig gebündeltes Stapelchen Hochzeitseinladungen." },
  metallschrott: { name: "Haufen Metallschrott", icon: "🔩", look: "Ein Haufen Metallschrott, den ein Freiwilliger irgendwo liegen gelassen hat." },
  oel: { name: "Öl", icon: "🛢️", look: "Ein Fläschchen Öl. Funktioniert erstaunlich gut als Tintenersatz." },
};

const NEEDED_ITEMS = ["feder", "oel", "gaesteliste", "wachs"];

const JULIA_COMPLIMENTS = [
  { id: "beine", text: "„Julia! Deine Beine sind so durchtrainiert – für eine Biene bist du praktisch eine Weltklasse-Sprinterin!“" },
  { id: "arme", text: "„Diese Oberarme! Für eine Biene stemmst du ja quasi Gewichtsklassen, von denen andere nur träumen!“" },
  { id: "hoehentraining", text: "„Deine Ausdauer ist der Wahnsinn – warst du heimlich im Höhentraining, oder wie hältst du bloß dieses Tempo durch?“" },
  { id: "leiden", text: "„Deine Leidensbereitschaft ist beeindruckend – du fliegst bei jedem Wetter los, ohne mit der Wimper zu zucken!“" },
];

const JULIA_DESTINATIONS = [
  "die Kollegen warten schon zum Skifahren!",
  "die Boys sind schon aufs Bike-Wochenende unterwegs!",
  "die Kollegen starten gleich nach Mallorca!",
  "die Boys packen gerade fürs Skifahren!",
  "die Kollegen warten, wir biken heute noch los!",
  "die Boys sind schon auf dem Weg zum Flughafen, Mallorca ruft!",
];

const JULIA_OPENERS = [
  (dest) => `Julia schwirrt nervös auf der Stelle. „Ich hab echt keine Zeit, ${dest}“`,
  (dest) => `Julia blickt gehetzt auf die Uhr. „Puh, gerade richtig ungünstig – ${dest}“`,
  (dest) => `Julia flattert aufgeregt hin und her. „Ich müsste eigentlich längst los, ${dest}“`,
  (dest) => `Julia seufzt gestresst. „Ehrlich, keine Sekunde Zeit – ${dest}“`,
  (dest) => `Julia checkt hektisch ihre Fühler. „Wirklich ungünstiger Moment gerade, ${dest}“`,
];

const JULIA_RUSHED = [
  "Julia errötet kurz, schüttelt dann aber den Kopf. „Süß von dir, aber die Kollegen warten nicht ewig! Kollegiale Grüße!“ Sie schwirrt davon.",
  "Julia lacht kurz auf, wird aber sofort wieder hektisch. „Nett gemeint, aber ich hab wirklich keine Zeit! Kollegiale Grüße!“ Sie flattert weiter.",
  "Julia wirkt kurz geschmeichelt, blickt dann aber auf die Uhr. „Schön gesagt – aber ich muss wirklich los! Kollegiale Grüße!“",
  "Julia kichert und schüttelt energisch den Kopf. „Charmant, aber das bringt mich jetzt auch nicht weiter. Kollegiale Grüße!“ Sie surrt ungeduldig auf der Stelle.",
  "Julia legt kurz den Kopf schief, wirkt fast gerührt – dann reißt sie sich los. „Nein, nein, keine Zeit für sowas! Kollegiale Grüße!“",
];

const FABIAN_ITEM_REACTIONS = {
  feder: "Fabian nimmt die Feder entgegen. „Perfekt, jetzt kann ich wenigstens wieder schreiben!“",
  oel: "Fabian blinzelt. „Ich hatte eigentlich auf Tinte gehofft... aber gut, zur Not tut's auch Öl.“ Er hält kurz inne. „Sag mal – funktionieren Tintenkiller eigentlich auch bei Schweröl?“",
  gaesteliste: "Fabian drückt die geretteten Zettel an sich. „Meine Gästeliste! Ich dachte, die ist für immer verloren!“",
  wachs: "Fabian knetet das Wachs nervös. „Damit siegeln wir das Ganze standesgemäß.“",
};

const TIM_PONDER = [
  "Tim kratzt sich nachdenklich am Kopf. „Hmm... lass mich kurz überlegen.“",
  "Tim blinzelt verschlafen. „Warte, warte... ich muss erstmal nachdenken.“",
  "Tim runzelt die Stirn. „Puh, gute Frage. Gib mir 'ne Sekunde.“",
  "Tim starrt eine Weile ins Leere. „Moment... es liegt mir auf der Zunge.“",
  "Tim gähnt ausgiebig. „Puh, so früh schon Denkaufgaben...“",
  "Tim zählt an seinen Pfoten ab, verheddert sich aber. „Ähm... warte.“",
  "Tim legt den Kopf schief. „Gute Frage, ehrlich. Kurz nachdenken...“",
  "Tim reibt sich die Schläfen. „Okay, okay, lass mich sortieren.“",
  "Tim schaut nachdenklich zur Decke. „Hmmmm... ja, Moment mal.“",
  "Tim seufzt tief. „Also gut. Kurz Ruhe, ich brauch Konzentration.“",
];
const TIM_AGREE = [
  "Na gut, überredet – ich helf dir.",
  "Okay, okay, du hast mich überredet.",
  "Na schön, überredet. Kommt hier:",
];

/* ============================================================
   DIALOGE (einfacher Baum: text + choices[{label,next,effect}])
   state wird von game.js durchgereicht (playerName, has(), ...)
   ============================================================ */

const DIALOGUES = {
  brummel: {
    start: (st) => {
      if (st.has("einladungen")) {
        return {
          text: `Fabian schubst dich sanft Richtung Ausgang. „Lauf, ${st.playerName}! Anna wartet nicht ewig – und wird sonst nur noch nervöser!“`,
          choices: [{ label: "(weiter)", end: true }],
        };
      }
      const missing = NEEDED_ITEMS.filter((id) => !st.given(id)).map((id) => (id === "oel" ? "Tinte" : ITEMS[id].name));
      const inBag = NEEDED_ITEMS.filter((id) => !st.given(id) && st.has(id));
      const hint =
        inBag.length > 0
          ? ` Du hast doch schon ${ITEMS[inBag[0]].name} dabei – benutze es einfach an mir!`
          : "";
      return {
        text: `Fabian wuselt panisch umher. „${st.playerName}! Gut, dass du da bist! Mir fehlen noch: ${missing.join(
          ", "
        )}.${hint}“`,
        choices: [{ label: "(Ich kümmere mich darum.)", end: true }],
      };
    },
  },

  johannes: {
    start: (st) => {
      const topics = [
        { key: "johannes:relief", label: "„Ich glaub, das hebt man sich fürs Fest auf.“", next: "relief" },
        { key: "johannes:hilfe", label: "„Kannst du mir helfen?“", next: "hilfe" },
      ].filter((t) => !st.sawTopic(t.key));
      return {
        text: "Johannes hängt auf dem Stumpf und starrt nachdenklich ins Leere. „Sag mal... muss man eigentlich schon beim Standesamt Geld geben? Oder hebt man sich das nicht lieber fürs große Fest auf?“",
        choices: [
          ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
          { label: "„Keine Ahnung, frag Fabian.“", end: true },
        ],
      };
    },
    relief: {
      text: "Johannes atmet sichtlich erleichtert aus. „Gott sei Dank. Dann spar ich mir das Kuvert für heute. Beim Fest hau ich dann richtig einen raus.“",
      choices: [{ label: "(...na dann.)", next: "start" }],
    },
    hilfe: {
      text: "„Ich würd dir ja liebend gern helfen, aber ehrlich, ich hab keinen Schimmer. Warst du schon bei Tim?“",
      choices: [{ label: "(okay...)", next: "start" }],
    },
  },

  janos: {
    start: {
      text: "Janos hängt reglos unter dem Riesenpilz, ein zerknittertes Blatt Papier in der Pfote. „Ich wollte eigentlich nur ein Bett bauen...“",
      choices: [
        { label: "„Und? Läuft's?“", next: "explain1" },
        { label: "„Kannst du mir helfen?“", next: "hilfe" },
        { label: "(ihn weiterhängen lassen)", end: true },
      ],
    },
    explain1: {
      text: "„Naja, beim Bett bauen hab ich gemerkt: mir fehlt Werkzeug.“ Er seufzt schwer. „Also brauch ich erstmal Werkzeug.“",
      choices: [{ label: "„Klingt doch einfach?“", next: "explain2" }],
    },
    explain2: {
      text: "„Tja. Aber um GUTES Werkzeug zu bauen, brauch ich eigentlich eine Maschine, die mir das Werkzeug baut.“ Er zeigt stolz auf seinen Bauplan.",
      choices: [{ label: "„...und dann baust du das Bett?“", next: "explain3" }],
    },
    explain3: {
      text: "„Genau! Sobald die Maschine fertig ist, die das Werkzeug baut, mit dem ich das Werkzeug baue, mit dem ich das Bett baue.“ Er nickt zufrieden, hellwach vor Begeisterung.",
      choices: [
        { label: "„...schlaf einfach auf dem Boden, Janos.“", next: "final" },
        { label: "„Brauchen Faultiere überhaupt Betten?“", next: "final2" },
      ],
    },
    final: {
      text: "Janos denkt kurz nach. „Das... wäre auch eine Idee.“ Dann schüttelt er entschieden den Kopf. „Nein. Nein, die Maschine ist eleganter.“ Er kritzelt aufgeregt weiter an seinem Bauplan.",
      choices: [{ label: "(ihn seinen Plan verfolgen lassen)", next: "start" }],
    },
    final2: {
      text: "Janos hält inne. „...gute Frage, ehrlich gesagt.“ Er überlegt sichtlich. „Aber jetzt, wo ich schon so weit bin, mach ich trotzdem weiter.“ Er grinst und widmet sich wieder seinem Bauplan.",
      choices: [{ label: "(ihn seinen Plan verfolgen lassen)", next: "start" }],
    },
    hilfe: {
      text: "„Ich würd dir ja gern helfen... aber ehrlich, keine Ahnung.“ Er blinzelt müde. „Warst du schon bei Tim? Der weiß bestimmt mehr als ich.“ Er verliert schon wieder den Faden.",
      choices: [{ label: "(okay...)", next: "start" }],
    },
  },

  alex: {
    start: (st) => {
      const topics = [
        { key: "alex:neck", label: "„Wow, du hast echt einen wohlgeformten Hals.“", next: "neck" },
        { key: "alex:hoodie", label: "„Cooler Hoodie.“", next: "hoodie" },
        { key: "alex:hilfe", label: "„Kannst du mir helfen?“", next: "hilfe" },
      ].filter((t) => !st.sawTopic(t.key));
      return {
        text: "Alex lehnt entspannt am Baum, Kapuze tief ins Gesicht gezogen. „Läuft bei dir? Ich hab hier nur nochmal die Rede fürs Festessen geübt.“",
        choices: [
          ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
          { label: "„Alles klar, bis später!“", end: true },
        ],
      };
    },
    neck: {
      text: "Alex' Augen leuchten unter der Kapuze auf. „Danke! ENDLICH bemerkt das mal jemand. Hier reden alle immer nur über den Hoodie...“",
      choices: [{ label: "(Weitergehen)", next: "start" }],
    },
    hoodie: {
      text: "„Danke, ist auch praktisch – da passt die ganze Rede locker in die Tasche.“ Er klopft stolz auf die Kängurutasche.",
      choices: [{ label: "(Weitergehen)", next: "start" }],
    },
    hilfe: {
      text: "„Puh, da muss ich leider passen – ich hab echt keine Ahnung. Warst du schon bei Tim?“",
      choices: [{ label: "(Weitergehen)", next: "start" }],
    },
  },

  sonja: {
    start: (st) => {
      const topics = [
        { key: "sonja:theorie", label: "„Worüber denkst du nach?“", next: "theorie" },
        { key: "sonja:garten", label: "„Was pflanzt du denn?“", next: "garten" },
        { key: "sonja:hilfe", label: "„Kannst du mir helfen?“", next: "hilfe" },
      ].filter((t) => !st.sawTopic(t.key));
      return {
        text: "Sonja sitzt inmitten ihres Gartens, ein Notizbuch auf den Knien, und beobachtet konzentriert eine Pflanze. „Ah, Besuch! Setz dich ruhig, wenn du magst. Ich werte gerade eine Beobachtungsreihe aus.“",
        choices: [
          ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
          { label: "(sie in Ruhe lassen)", end: true },
        ],
      };
    },
    theorie: {
      text: "„Meine Hypothese, über Jahre empirisch bestätigt: Man hilft sich gegenseitig nicht aus Verpflichtung, sondern aus Befähigung – eine klare Korrelation zwischen Fähigkeit und Fürsorge.“",
      choices: [{ label: "„Und?“", next: "theorie2" }],
    },
    theorie2: {
      text: "„Besonders signifikant wird der Effekt, wenn eine Testperson regelmäßig alles verlegt, verschüttet oder falsch anpackt.“",
      choices: [{ label: "„Klingt nach jemand Bestimmtem.“", next: "bruder" }],
    },
    bruder: {
      text: "Sonja lächelt wissend und tippt sich ans Kinn. „Nennen wir es eine Langzeitstudie mit einem sehr ungeschickten Bruder als Probanden. Datenlage eindeutig: Geduld korreliert stärker mit Erfolg als Perfektion. Und die Kontrollgruppe zeigt – man lässt ihn trotzdem nicht allein.“",
      choices: [{ label: "(nachdenklich nicken)", next: "start" }],
    },
    garten: {
      text: "„Botanisch gesehen ein bisschen von allem – Kräuter, Gemüse, ein paar Blumen, sauber nach Lichtbedarf sortiert. Die wichtigste Variable in meinem Versuchsaufbau bleibt aber konstant: Jeder ist willkommen, der mal eine Pause braucht.“",
      choices: [{ label: "(schmunzeln)", next: "start" }],
    },
    hilfe: {
      text: "„Dazu liegen mir leider keine validen Daten vor. Warst du schon bei Tim? Der hat da sicher mehr empirisches Material.“",
      choices: [{ label: "(okay...)", next: "start" }],
    },
  },

  stephan: {
    start: (st) => {
      if (st.has("metallschrott") || st.has("oel")) {
        return {
          text: "Stephan winkt entspannt vom Ufer. „Alles gut bei dir? Ich mache gleich noch Yoga.“",
          choices: [{ label: "(weiter)", end: true }],
        };
      }
      return {
        text: "Stephan liegt lässig am Seeufer und starrt in die Wolken. „Sag mal... ist der zehnte Monat jetzt September, Oktober oder November? Komm da grad durcheinander.“",
        choices: [
          { label: "„Es ist Oktober.“", next: "oktober" },
          { label: "„Was ist das für ein Ding neben dir?“", next: "metallschrott_frage" },
          { label: "„Kannst du mir helfen?“", next: "hilfe" },
          { label: "(weiterziehen)", end: true },
        ],
      };
    },
    oktober: {
      text: "„Oktober? Ach cool, dann komm ich ja zur Hochzeit! Im September ist nämlich das große Festival – das hätte ich echt nur ungern verpasst.“",
      choices: [{ label: "„Freut mich, Stephan!“", next: "start" }],
    },
    metallschrott_frage: {
      text: "„Ach DER Haufen? Keine Ahnung, ehrlich. Das hat bestimmt ein Freiwilliger hier liegen lassen. Nimm dir ruhig was davon, ich weiß eh nicht, wofür man das braucht.“",
      choices: [{ label: "Metallschrott nehmen", effect: "get_metallschrott", next: "start" }],
    },
    hilfe: {
      text: "„Würd ich dir ja sagen, wenn ich's wüsste! Warst du schon bei Tim?“",
      choices: [{ label: "(okay...)", next: "start" }],
    },
  },

  sandra: {
    start: (st) => {
      const topics = [
        { key: "sandra:warum", label: "„Warum du und nicht Alex oder Fabian?“", next: "warum" },
        { key: "sandra:pralinen", label: "„Hast du sonst noch was zu tun?“", next: "pralinen" },
        { key: "sandra:hilfe", label: "„Kannst du mir helfen?“", next: "hilfe" },
      ].filter((t) => !st.sawTopic(t.key));
      return {
        text: "Sandra strahlt über beide Ohren und hält stolz zwei kleine, verdächtig gleich aussehende Kästchen fest. „Na, schon aufgeregt? Ich pass hier auf die Ringe auf – sicherer geht's nicht!“",
        choices: [
          ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
          { label: "(sie weiter grinsen lassen)", end: true },
        ],
      };
    },
    warum: {
      text: "Sandra lacht laut auf. „Ganz ehrlich? Claudia und ich haben uns das genau überlegt. Bei Alex und Fabian wären die Ringe jetzt vermutlich schon in einem Fluss, einem Vogelnest oder bei irgendeinem Faultier gelandet.“",
      choices: [{ label: "„...das ist fair.“", next: "start" }],
    },
    pralinen: {
      text: "„Oh, stimmt! Ich muss Claudia noch diese länglichen Schokopralinen bringen, die sie so liebt.“ Sie klopft auf ein zweites Kästchen, das genauso aussieht wie das mit den Ringen. „Wichtiger Auftrag, sag ich dir. Fast so wichtig wie die Ringe. Ich hoffe nur, ich verwechsle die beiden nicht...“",
      choices: [{ label: "(schmunzeln)", next: "start" }],
    },
    hilfe: {
      text: "„Ich würd dir wirklich gern helfen, aber ich hab von deinem Kram keine Ahnung. Warst du schon bei Tim?“",
      choices: [{ label: "(okay...)", next: "start" }],
    },
  },

  claudia: {
    start: (st) => {
      const topics = [
        { key: "claudia:gewohnt", label: "„War es eigentlich eine gute Idee, Fabian die Einladungen zu überlassen?“", next: "gewohnt" },
        { key: "claudia:freude", label: "„Freust du dich?“", next: "freude" },
      ].filter((t) => !st.sawTopic(t.key));
      return {
        text: "Claudia sitzt seelenruhig zwischen Girlanden und Blumenkränzen und bindet in aller Ruhe eine Schleife. „Oh, hallo! Schön, dich zu sehen. Ich wollte nur noch schnell die letzten Kränze aufhängen.“",
        choices: [
          ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
          { label: "(sie weitermachen lassen)", end: true },
        ],
      };
    },
    gewohnt: {
      text: "Claudia lacht leise und bindet seelenruhig weiter. „Ehrlich gesagt bin ich das gewöhnt. Bei Fabian ist immer irgendwas – aber am Ende klappt es doch noch. Meistens jedenfalls.“",
      choices: [{ label: "(schmunzeln)", next: "start" }],
    },
    freude: {
      text: "Claudia hält kurz inne und lächelt breit. „Und ob ich mich freue. Auch wenn hier gerade alles ein bisschen chaotisch wird – genau deswegen wird's bestimmt eine Geschichte, die wir noch oft erzählen.“",
      choices: [{ label: "(sich mitfreuen)", next: "start" }],
    },
  },

  julia: {
    start: (st) => {
      if (st.has("wachs")) {
        return { text: "„Keine Zeit, keine Zeit! Wir SIND praktisch schon im Urlaub. Kollegiale Grüße!“", choices: [{ label: "(gehen)", end: true }] };
      }
      const dest = pickDifferent(JULIA_DESTINATIONS, st.juliaLastDestination);
      st.juliaLastDestination = dest;
      const remaining = JULIA_COMPLIMENTS.filter((c) => !st.juliaUsed.includes(c.id));
      return {
        text: pick(JULIA_OPENERS)(dest),
        choices: [
          { label: "„Kannst du mir einfach das Wachs geben?“", next: "termin" },
          ...remaining.map((c) => ({
            label: c.text,
            effect: `julia_${c.id}`,
            next: remaining.length === 1 ? "relent" : "rushed",
          })),
          { label: "„Dann ein andermal.“", end: true },
        ],
      };
    },
    rushed: () => ({
      text: pick(JULIA_RUSHED),
      choices: [{ label: "(nachsehen)", next: "start" }],
    }),
    relent: {
      text: "Julia seufzt enttäuscht. „...dass ausgerechnet SO VIEL Schmeichelei am Ende funktioniert. Na gut, hier ist dein Wachs. Aber jetzt beeil dich, wir sind spät dran! Kollegiale Grüße!“",
      choices: [{ label: "Wachs annehmen", effect: "get_wachs", next: "start" }],
    },
    termin: {
      text: "Julia tippt nachdenklich auf ihrem unsichtbaren Terminplan herum. „Puh, so direkt? Da müsste ich schauen... in zwei, drei Wochen hätte ich mal einen Slot frei, das rauszusuchen. Kollegiale Grüße!“",
      choices: [{ label: "(...das hilft mir jetzt nicht wirklich.)", next: "start" }],
    },
  },

  anna: {
    start: (st) => {
      if (st.won) {
        return { text: "Anna ist schon lange fort – hoffentlich ist die Post heil angekommen...", choices: [{ label: "(gehen)", end: true }] };
      }
      if (!st.has("einladungen")) {
        const topics = [{ key: "anna:ausruestung", label: "„Was bräuchtest du denn eigentlich für den Job?“", next: "ausruestung" }].filter(
          (t) => !st.sawTopic(t.key)
        );
        return {
          text: "Anna hockt zittrig auf ihrem Ast und knabbert nervös an einer Feder. „Oh! Ein Besuch! Ich hoffe, du bringst keine Post – ich verliere doch sowieso alles...“",
          choices: [
            ...topics.map((t) => ({ label: t.label, effect: `seen:${t.key}`, next: t.next })),
            { label: "(sie weiter grübeln lassen)", end: true },
          ],
        };
      }
      return {
        text: "Annas Augen werden riesig. „D-das ist die Post?! Oh nein, was, wenn ich sie fallen lasse wie letztes Mal beim Eichhörnchen-Newsletter?!“",
        choices: [{ label: "„Du schaffst das bestimmt, Anna!“", next: "reassure" }],
      };
    },
    ausruestung: {
      text: "Anna kramt nervös in ihrem Gefieder. „Eigentlich bräuchte ich mein Adressbuch, um überhaupt zu wissen, wo ich was hinbringen muss... das hab ich heute Morgen zu Hause liegen lassen. Wie so ziemlich alles, ehrlich gesagt.“",
      choices: [{ label: "(...na dann.)", next: "start" }],
    },
    reassure: {
      text: "Anna atmet tief durch. „Okay... okay, ich pack das. Für Fabian und Claudia mach ich das!“ Sie schnappt sich das Bündel fest mit beiden Krallen.",
      choices: [{ label: "Einladungen übergeben", effect: "win", end: true }],
    },
  },

  tim: {
    start: () => ({
      text: pick(TIM_PONDER),
      choices: [{ label: "„Ach komm, hilf mir!“", next: "reveal" }],
    }),
    reveal: () => ({
      text: `Tim seufzt. „${pick(TIM_AGREE)}“ ${getHint()}`,
      choices: [{ label: "„Danke, Tim!“", end: true }],
    }),
  },
};
