/* ============================================================
   FABIANS EINLADUNGEN – Spiel-Engine
   ============================================================ */

const els = {
  headerArt: document.getElementById("header-art"),
  scene: document.getElementById("scene"),
  hotspots: document.getElementById("hotspots"),
  caption: document.getElementById("caption"),
  dialogue: document.getElementById("dialogue"),
  dialogueText: document.getElementById("dialogue-text"),
  dialogueChoices: document.getElementById("dialogue-choices"),
  intro: document.getElementById("intro"),
  introScene: document.getElementById("intro-scene"),
  introText: document.getElementById("intro-text"),
  introNextBtn: document.getElementById("intro-next-btn"),
  introSkipBtn: document.getElementById("intro-skip-btn"),
  namecard: document.getElementById("namecard"),
  nameInput: document.getElementById("name-input"),
  nameSubmitBtn: document.getElementById("name-submit-btn"),
  endcard: document.getElementById("endcard"),
  endcardTitle: document.getElementById("endcard-title"),
  endcardText: document.getElementById("endcard-text"),
  restartBtn: document.getElementById("restart-btn"),
  invItems: document.getElementById("inventory-items"),
  verbButtons: document.querySelectorAll(".verb"),
};

const VERB_HINT = {
  look: "Was möchtest du ansehen?",
  talk: "Mit wem möchtest du reden?",
  take: "Was möchtest du nehmen?",
  use: "Gegenstand aus der Tasche wählen und dann anwenden.",
};

const WEDDING = { date: "17.10.2026" };

const INTRO_SLIDES = [
  {
    bg: () => BG.introForest,
    text:
      "Tief im Wald, in wenigen Wochen: die Hochzeit des Jahres. Fabian Bär gibt seiner Claudia das Jawort – " +
      "vorausgesetzt, die Einladungen finden vorher noch ihren Weg zu den Gästen.",
  },
  {
    bg: () => BG.bau,
    text:
      "Leider hat Fabian noch nicht eine EINZIGE Einladung verschickt. Genau genommen sind sie nicht mal fertig: " +
      "Tinte verschüttet, Feder verloren, die Gästeliste aus dem Fenster geweht. „Wer hilft mir bloß?!“, ruft er verzweifelt in den Wald.",
  },
  {
    bg: () => BG.bau,
    text: "Geh zu Fabian in seinem Bau und rede mit ihm – er sagt dir genau, was er braucht!",
  },
];

/* ---------------- Zustand ---------------- */

const state = {
  room: "bau",
  inventory: [],
  delivered: [],
  verb: "look",
  selectedItem: null,
  playerName: "",
  juliaUsed: [],
  juliaLastDestination: null,
  usedTopics: [],
  won: false,
  sawTopic(key) {
    return this.usedTopics.includes(key);
  },
  markTopic(key) {
    if (!this.sawTopic(key)) this.usedTopics.push(key);
  },
  has(id) {
    return this.inventory.includes(id);
  },
  add(id) {
    if (!this.has(id)) this.inventory.push(id);
  },
  remove(id) {
    this.inventory = this.inventory.filter((i) => i !== id);
  },
  given(id) {
    return this.delivered.includes(id);
  },
  markGiven(id) {
    if (!this.given(id)) this.delivered.push(id);
  },
};

let dialogueNpc = null;

function caption(text) {
  els.caption.textContent = text;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

/* ---------------- Intro-Slides ---------------- */

let introIndex = 0;

function renderIntroSlide() {
  const slide = INTRO_SLIDES[introIndex];
  els.introScene.innerHTML = slide.bg();
  els.introText.textContent = slide.text;
  els.introNextBtn.textContent = introIndex === INTRO_SLIDES.length - 1 ? "Wer hilft ihm bloß? →" : "Weiter →";
}

function showNameCard() {
  els.intro.classList.add("hidden");
  els.namecard.classList.remove("hidden");
  els.nameInput.focus();
}

els.introNextBtn.addEventListener("click", () => {
  if (introIndex < INTRO_SLIDES.length - 1) {
    introIndex++;
    renderIntroSlide();
  } else {
    showNameCard();
  }
});
els.introSkipBtn.addEventListener("click", showNameCard);

function submitName() {
  const val = els.nameInput.value.trim();
  state.playerName = val || "Waldfreund";
  els.namecard.classList.add("hidden");
  caption(`Fabian blinzelt. „${state.playerName}? Zum Glück kommst du vorbei! Ich brauch dringend Hilfe...“ Rede mit ihm! (Reden-Symbol wählen und Fabian anklicken)`);
}
els.nameSubmitBtn.addEventListener("click", submitName);
els.nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitName();
});

/* ---------------- Raumwechsel & Rendering ---------------- */

function renderRoom(roomId) {
  closeDialogue();
  state.room = roomId;
  state.selectedItem = null;
  const room = ROOMS[roomId];
  els.scene.innerHTML = room.bg();
  renderHotspots(room);
  caption(room.intro);
  renderInventory();
}

function renderHotspots(room) {
  els.hotspots.innerHTML = "";
  room.hotspots.forEach((h) => {
    const div = document.createElement("div");
    div.className = "hotspot";
    div.style.left = (h.x / 320) * 100 + "%";
    div.style.top = (h.y / 180) * 100 + "%";
    div.style.width = (h.w / 320) * 100 + "%";
    div.style.height = (h.h / 180) * 100 + "%";
    div.title = h.name;
    div.addEventListener("click", () => onHotspotClick(h));
    els.hotspots.appendChild(div);
  });
}

function renderInventory() {
  els.invItems.innerHTML = "";
  state.inventory.forEach((id) => {
    const item = ITEMS[id];
    const div = document.createElement("div");
    div.className = "inv-item" + (state.selectedItem === id ? " selected" : "");
    div.textContent = item.icon;
    div.dataset.tooltip = item.name;
    div.tabIndex = 0;
    div.addEventListener("click", () => onInventoryClick(id));
    els.invItems.appendChild(div);
  });
}

/* ---------------- Verben ---------------- */

function selectVerb(v) {
  state.verb = v;
  state.selectedItem = null;
  els.verbButtons.forEach((b) => b.classList.toggle("active", b.dataset.verb === v));
  renderInventory();
  caption(VERB_HINT[v]);
}

els.verbButtons.forEach((b) => b.addEventListener("click", () => selectVerb(b.dataset.verb)));

/* ---------------- Interaktion: Hotspots ---------------- */

function onHotspotClick(hotspot) {
  if (state.won) return;

  if (hotspot.exit) {
    renderRoom(hotspot.exit);
    return;
  }

  switch (state.verb) {
    case "look":
      caption(hotspot.look || `${hotspot.name}. Nichts Besonderes.`);
      break;
    case "talk":
      if (hotspot.npc) openDialogue(hotspot.npc);
      else caption(`${hotspot.name} antwortet nicht. Erwartungsgemäß.`);
      break;
    case "take":
      doTake(hotspot);
      break;
    case "use":
      doUse(hotspot);
      break;
  }
}

function doTake(hotspot) {
  if (!hotspot.item) {
    caption(hotspot.takeFail || `Das lässt sich nicht mitnehmen.`);
    return;
  }
  if (state.has(hotspot.item)) {
    caption("Habe ich schon in der Tasche.");
    return;
  }
  state.add(hotspot.item);
  caption(hotspot.takeMsg || `Du nimmst: ${ITEMS[hotspot.item].name}`);
  renderInventory();
}

function doUse(hotspot) {
  // Sonderfall: die KSC-Fahnenstange als Hebel unter dem Klavierdeckel einsetzen, um die Gästeliste zu befreien
  if (hotspot.id === "klavier") {
    if (state.has("gaesteliste")) {
      caption("Die Gästeliste hast du schon gerettet. Hier gibt es nichts mehr zu holen.");
      return;
    }
    if (state.selectedItem === "ksc_fahne") {
      state.remove("ksc_fahne");
      state.add("gaesteliste");
      state.selectedItem = null;
      caption("Mit der Fahnenstange hebelst du den klemmenden Klavierdeckel auf – *plopp* – da ist deine Gästeliste!");
      renderInventory();
      return;
    }
    caption("Der Deckel klemmt fest. Vielleicht hilft ein hartnäckiges Werkzeug beim Hebeln.");
    return;
  }

  // Sonderfall: Gegenstände einzeln an Fabian übergeben
  if (hotspot.id === "brummel" && state.selectedItem && NEEDED_ITEMS.includes(state.selectedItem) && !state.given(state.selectedItem)) {
    const item = state.selectedItem;
    state.remove(item);
    state.markGiven(item);
    state.selectedItem = null;
    renderInventory();
    if (NEEDED_ITEMS.every((id) => state.given(id))) {
      state.add("einladungen");
      caption(
        `${FABIAN_ITEM_REACTIONS[item]} Fabian bindet mit zittrigen Pfoten Schleifen um einen Stapel Einladungen. „Fertig! Schnell, ${state.playerName}, bring sie zu Anna der Posteule, bevor sie sich noch mehr Sorgen macht!“`
      );
      renderInventory();
    } else {
      caption(FABIAN_ITEM_REACTIONS[item]);
    }
    return;
  }

  // Sonderfall: Metallschrott an Janos übergeben, dafür gibt es Öl
  if (hotspot.id === "janos") {
    if (state.has("oel")) {
      caption("Janos hat dir schon ein Fläschchen Öl gegeben. Mehr hat er nicht da.");
      return;
    }
    if (state.selectedItem === "metallschrott") {
      state.remove("metallschrott");
      state.add("oel");
      state.selectedItem = null;
      caption(
        "Janos' Augen strahlen, als er den Berg Metallschrott überreicht bekommt. „Perfekt! Den stell ich in den Keller – genau dahin, wo eigentlich noch die Holzstämme liegen... die müssten dann halt nach oben, wo noch die Kisten stehen...“ Er verliert sich kurz in Gedanken, schüttelt den Kopf. „Ach, wird schon. Dann kann ich ja endlich anfangen, meine Bananenplantage anzulegen!“ Er drückt dir ein Fläschchen Öl in die Pfote."
      );
      renderInventory();
      return;
    }
    openDialogue("janos");
    return;
  }

  // Sonderfall: Blumenstrauß an Claudia verschenken (optional, nicht spielentscheidend)
  if (hotspot.id === "claudia" && state.selectedItem === "blumenstrauss") {
    state.remove("blumenstrauss");
    state.selectedItem = null;
    caption(
      "Claudia strahlt, als du ihr den Blumenstrauß überreichst. „Oh, wie schön! Die stell ich sofort mit rein.“ Sie steckt die Blumen liebevoll zwischen die restliche Deko."
    );
    renderInventory();
    return;
  }

  if (hotspot.npc) {
    openDialogue(hotspot.npc);
    return;
  }

  if (state.selectedItem) {
    caption("Das ergibt so keinen Sinn.");
    state.selectedItem = null;
    renderInventory();
    return;
  }

  caption(hotspot.useText || "Vielleicht erstmal ansehen oder nehmen?");
}

/* ---------------- Interaktion: Inventar ---------------- */

function onInventoryClick(itemId) {
  if (state.won) return;

  if (state.verb === "use") {
    if (state.selectedItem === itemId) {
      state.selectedItem = null;
      caption("Auswahl aufgehoben.");
    } else if (state.selectedItem) {
      caption("Das passt nicht zusammen.");
      state.selectedItem = null;
    } else {
      state.selectedItem = itemId;
      caption(`${ITEMS[itemId].name} ausgewählt. Jetzt anklicken, worauf es angewendet werden soll.`);
    }
    renderInventory();
  } else if (state.verb === "look") {
    caption(ITEMS[itemId].look || ITEMS[itemId].name);
  } else if (state.verb === "talk") {
    caption("Gegenstände sind schlechte Zuhörer.");
  } else if (state.verb === "take") {
    caption("Das habe ich schon in der Tasche.");
  }
}

/* ---------------- Hilfe-System ---------------- */

function getHint() {
  if (state.won) return "Du hast es bereits geschafft – die Einladungen sind unterwegs! 🎉";
  if (state.has("einladungen"))
    return "Die Einladungen sind fertig gebündelt! Bring sie schnell zu Anna, der Posteule auf der Bienenwiese.";

  const notGiven = NEEDED_ITEMS.filter((id) => !state.given(id));
  const inBag = notGiven.filter((id) => state.has(id));
  if (inBag.length > 0)
    return `Du hast schon ${ITEMS[inBag[0]].name} in der Tasche! Geh zu Fabian in seinem Bau, wähle es mit „Benutzen“ aus und klicke ihn an.`;

  if (notGiven.includes("gaesteliste")) {
    if (!state.has("ksc_fahne"))
      return "Am See steht ein altes Klavier, das für 2000€ auf Kleinanzeigen steht und das deshalb niemand haben will – da klemmt ein Zettel deiner Gästeliste unterm Deckel. Zum Hebeln brauchst du aber erst etwas Hartes: Im Wald steht eine stabile blau-weiße Fahnenstange. Ein kurzer Schatten der Wehmut legt sich auf sein Gesicht – ob es dieses Jahr etwas mit dem Aufstieg wird?";
    return "Du hast die Fahnenstange dabei! Geh zum See und benutze sie dort am Klavier.";
  }
  if (notGiven.includes("oel")) {
    if (state.has("metallschrott")) return "Du hast etwas Metallschrott dabei! Bring ihn zu Janos im Pilzwald und benutze ihn an ihm.";
    return "Bei Stephan am See liegt ein Haufen Metallschrott, den niemand zuordnen kann. Vielleicht kannst du ihn gebrauchen – zusammen mit Janos im Pilzwald. Frag Stephan danach.";
  }
  if (notGiven.includes("feder")) return "Auf der Bienenwiese liegt eine verlorene Feder am Fuß des großen Baumes.";
  if (notGiven.includes("wachs"))
    return "Julia auf der Wiese gibt sicher Wachs her – wenn du ihr genug Komplimente machst. Vielleicht musst du öfter mit ihr reden.";
  return "Schau dich einfach mal um.";
}

/* ---------------- Dialogsystem ---------------- */

function resolveNode(npcId, key) {
  const raw = DIALOGUES[npcId][key];
  return typeof raw === "function" ? raw(state) : raw;
}

function openDialogue(npcId) {
  dialogueNpc = npcId;
  renderDialogueNode(resolveNode(npcId, "start"));
  els.dialogue.classList.remove("hidden");
}

function renderDialogueNode(node) {
  els.dialogueText.textContent = node.text;
  els.dialogueChoices.innerHTML = "";
  node.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    btn.addEventListener("click", () => handleChoice(choice));
    els.dialogueChoices.appendChild(btn);
  });
}

function handleChoice(choice) {
  if (choice.effect) applyEffect(choice.effect);
  if (state.won) return; // winGame() übernimmt die Anzeige
  if (choice.end) {
    closeDialogue();
    return;
  }
  if (choice.next) {
    renderDialogueNode(resolveNode(dialogueNpc, choice.next));
  }
}

function closeDialogue() {
  els.dialogue.classList.add("hidden");
  dialogueNpc = null;
}

function applyEffect(name) {
  if (name.startsWith("julia_")) {
    const id = name.slice(6);
    if (!state.juliaUsed.includes(id)) state.juliaUsed.push(id);
    return;
  }
  if (name.startsWith("seen:")) {
    state.markTopic(name.slice(5));
    return;
  }
  switch (name) {
    case "get_wachs":
      state.add("wachs");
      caption("Du hast ein Klümpchen Bienenwachs bekommen!");
      break;
    case "get_metallschrott":
      state.add("metallschrott");
      caption("Du hievst dir den Haufen Metallschrott irgendwie unter den Arm.");
      break;
    case "win":
      winGame();
      break;
  }
  renderInventory();
}

function winGame() {
  state.won = true;
  els.dialogue.classList.add("hidden");
  els.endcardTitle.textContent = "Erfolgreich verschickt! 💌";
  const name = escapeHtml(state.playerName);
  els.endcardText.innerHTML = `
    <div class="invitation">
      <div class="invitation-seal">🕯️💌</div>
      <p>Liebe(r) <strong>${name}</strong>,</p>
      <p>du bist herzlich eingeladen zur Hochzeit von<br><strong>Fabian &amp; Claudia</strong>!</p>
      <div class="invitation-details">
        <p style="margin-bottom:0">📅 ${escapeHtml(WEDDING.date)}</p>
      </div>
      <p class="invitation-note">Komme auf KEINEN Fall verkleidet!</p>
      <p class="invitation-sign">– mit tollpatschiger Vorfreude,<br>Fabian + Claudia 🐻</p>
    </div>
    <p class="endnote">Anna flattert – etwas zittrig, aber entschlossen – mit dem restlichen Stapel Einladungen davon. Mission erfüllt, ${name}!</p>
  `;
  els.endcard.classList.remove("hidden");
}

/* ---------------- Start / Neustart ---------------- */

function restartGame() {
  state.inventory = [];
  state.delivered = [];
  state.selectedItem = null;
  state.juliaUsed = [];
  state.juliaLastDestination = null;
  state.usedTopics = [];
  state.won = false;
  els.endcard.classList.add("hidden");
  els.dialogue.classList.add("hidden");
  selectVerb("look");
  renderRoom("bau");
}

els.restartBtn.addEventListener("click", restartGame);

els.headerArt.innerHTML = HEADER_ART;

selectVerb("look");
renderRoom("bau");
renderIntroSlide();
