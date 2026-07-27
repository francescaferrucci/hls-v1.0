/* Foundations Academy · Lesson 5 — Safety & Security
   Single-scroll lesson page. All activity icons are inline SVG (no emoji, no photos). */
(function () {
  "use strict";

  const NS = "hls.foundations.course5";

  function read(key) {
    try { return localStorage.getItem(NS + "." + key); } catch (err) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(NS + "." + key, value); } catch (err) { /* storage unavailable */ }
  }

  /* ================================================================
     Icon system — one circle badge + one single-color glyph path.
     Same construction as course-4's classifyIcon(); glyphs drawn on a
     0 0 90 90 canvas so every icon reads at 40–60px.
     ================================================================ */
  const GLYPHS = {
    /* hazards — Module 2 */
    sharp: "M60 20l10 10-30 30-6 14 14-6 30-30-10-10zM30 62l-8 18 18-8-10-10z",
    chemical: "M38 20h14v12l14 30a10 10 0 0 1-9 14H33a10 10 0 0 1-9-14l14-30V20zm3 8v6l-11 24h30l-11-24v-6h-8z",
    wetfloor: "M45 18c10 14 18 24 18 33a18 18 0 0 1-36 0c0-9 8-19 18-33zm0 12c-6 9-10 16-10 21a10 10 0 0 0 20 0c0-5-4-12-10-21zM22 72h46v6H22z",
    blockedexit: "M22 30h46v40H22V30zm6 6v28h34V36H28zm-6 12h46v6H22zM42 30h6v40h-6z",
    petescape: "M32 26a6 6 0 0 1 6 6v8h-12v-8a6 6 0 0 1 6-6zm26 0a6 6 0 0 1 6 6v8H52v-8a6 6 0 0 1 6-6zM45 40c11 0 20 9 20 18 0 7-6 10-20 10s-20-3-20-10c0-9 9-18 20-18zm-27 6l8 6-8 6v-12z",
    biohazard: "M45 16c9 14 17 24 17 33a17 17 0 0 1-34 0c0-9 8-19 17-33zm0 13c-6 9-11 16-11 20a11 11 0 0 0 22 0c0-4-5-11-11-20zm-6 20a6 6 0 1 0 12 0 6 6 0 0 0-12 0z",
    /* PPE — Module 3 */
    gloves: "M32 22h6v20h4V26h6v16h4V28h6v14h4v-8h6v30c0 10-7 18-18 18H44c-8 0-12-5-12-12V22zm6 32v10c0 4 2 6 6 6h12c8 0 12-5 12-12V50H38v4z",
    gown: "M36 18l9 6 9-6 14 8-6 14 4 34H24l4-34-6-14 14-8zm0 9l-6 4 4 9-3 28h28l-3-28 4-9-6-4-8 5-10-5z",
    mask: "M20 34l25-6 25 6v14c0 12-11 24-25 24S20 60 20 48V34zm6 5v9c0 9 8 18 19 18s19-9 19-18v-9l-19-4-19 4zm2 10h34v5H28v-5z",
    eyeprotection: "M18 38c8-8 18-12 27-12s19 4 27 12v14c0 6-5 10-11 10-5 0-9-3-11-7h-10c-2 4-6 7-11 7-6 0-11-4-11-10V38zm7 4v10c0 2 2 4 4 4 3 0 5-2 5-5v-4h22v4c0 3 2 5 5 5 2 0 4-2 4-4V42c-6-6-14-9-20-9s-14 3-20 9z",
    /* waste — Module 5 */
    sharpsbin: "M26 30h38l-4 40a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7l-4-40zm7 7l3 33h18l3-33H33zM22 20h44v8H22v-8z",
    biobin: "M26 32h38l-4 38a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7l-4-38zm7 7l3 31h18l3-31H33zM36 18h18l4 8H32l4-8zM45 42c5 7 9 13 9 17a9 9 0 0 1-18 0c0-4 4-10 9-17z",
    paper: "M30 18h22l14 14v40H30V18zm6 6v42h24V36H48V24H36zm18 1v8h8l-8-8z",
    laundry: "M26 26h38v46H26V26zm6 6v34h26V32H32zm13 5a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm0 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM34 20h22v4H34v-4z",
    /* emergencies — Module 6 */
    fire: "M46 16c2 10 12 15 12 28 0 6-3 11-7 14 6-1 10-6 10-13 5 6 8 12 8 18 0 13-11 22-24 22s-24-9-24-21c0-14 12-22 16-32 2-5 3-11 2-16h7zm-1 22c-3 8-13 14-13 25 0 8 7 14 13 14s13-6 13-13c0-9-9-15-13-26z",
    power: "M50 14l-4 24h14L40 76l4-26H30L50 14zm-8 30l-1 8h9l-1 6 8-14h-8l2-12-9 12z",
    aggressivepet: "M24 24l12 8h18l12-8v18c0 16-9 28-21 28S24 58 24 42V24zm7 11v7c0 12 6 21 14 21s14-9 14-21v-7l-7 4H38l-7-4zm5 12h6l3 5 3-5h6l-6 10h-6l-6-10z",
    medical: "M38 18h14v16h16v14H52v16H38V48H22V34h16V18zm6 6v16H28v2h16v16h2V42h16v-2H46V24h-2z",
    earthquake: "M45 16a29 29 0 1 1 0 58 29 29 0 0 1 0-58zm0 6a23 23 0 0 0-22 17h14l4-9 5 14 5-11 3 6h13a23 23 0 0 0-22-17zm-22 23a23 23 0 0 0 44 0H50l-4-8-5 11-5-14-3 11H23z",
    fume: "M28 34a12 12 0 0 1 22-7 11 11 0 0 1 16 9 10 10 0 0 1-3 20H32a11 11 0 0 1-4-22zm4 6a5 5 0 0 0 1 10h31a4 4 0 0 0 1-8l-5-1 1-5a5 5 0 0 0-8-4l-4 3-3-5a6 6 0 0 0-11 4l1 6h-4zM32 62h10v6H32v-6zm16 0h10v6H48v-6z",
    /* radiation — Module 7 */
    door: "M28 18h34v56H28V18zm6 6v44h22V24H34zm18 18a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
    apron: "M36 18h18v6a9 9 0 0 0 9 6l4 2-4 12 3 30H24l3-30-4-12 4-2a9 9 0 0 0 9-6v-6zm6 6v1a15 15 0 0 1-11 11l2 7-3 25h30l-3-25 2-7a15 15 0 0 1-11-11v-1h-6z",
    dosimeter: "M32 20h26v50H32V20zm6 6v38h14V26H38zm3 5h8v10h-8V31zm0 15h8v4h-8v-4zm0 8h8v4h-8v-4z",
    unauthorized: "M45 20a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm0 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM24 74c0-13 9-22 21-22s21 9 21 22h-6c0-10-6-16-15-16s-15 6-15 16h-6zM60 20l10 10-4 4-10-10 4-4zm-4 14l10-10 4 4-10 10-4-4z",
    clock: "M45 16a29 29 0 1 1 0 58 29 29 0 0 1 0-58zm0 6a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm-3 6h6v18l13 8-3 5-16-10V28z",
    distance: "M18 40h54v10H18V40zm6 6v-2h4v2h-4zm10 0v-2h4v2h-4zm10 0v-2h4v2h-4zm10 0v-2h4v2h-4zm10 0v-2h4v2h-4zM22 24h4v10h-4V24zm42 0h4v10h-4V24zm-38 4h34v3H26v-3z",
    /* toggles — Module 4 */
    sds: "M30 18h22l14 14v40H30V18zm6 6v42h24V36H48V24H36zm4 20h16v4H40v-4zm0 9h16v4H40v-4z",
    storage: "M22 26h46v44H22V26zm6 6v14h34V32H28zm0 20v12h34V52H28zm8-14h8v6h-8v-6zm0 20h8v6h-8v-6z",
    spillkit: "M26 32h38v38H26V32zm6 6v26h26V38H32zm4-16h18v8H36v-8zm9 20c4 6 7 11 7 14a7 7 0 0 1-14 0c0-3 3-8 7-14z",
    eyewash: "M45 20c8 0 14 5 14 12h-6c0-4-3-6-8-6s-8 2-8 6h-6c0-7 6-12 14-12zm-3 12h6v14h16v6H26v-6h16V32zm-14 26h34v14H28V58zm6 6v2h22v-2H34z"
  };

  function icon(glyph) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 90 90");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "45");
    circle.setAttribute("cy", "45");
    circle.setAttribute("r", "42");
    circle.setAttribute("class", "l5-icon-bg");
    svg.appendChild(circle);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", GLYPHS[glyph] || GLYPHS.sharp);
    path.setAttribute("class", "l5-icon-glyph");
    svg.appendChild(path);
    return svg;
  }

  function iconWrap(glyph) {
    const span = document.createElement("span");
    span.className = "l5-icon";
    span.appendChild(icon(glyph));
    return span;
  }

  /* ================================================================
     Knowledge checks — shared .choice-grid[data-answer] component
     (copied from course-4/app.js, extended to append the module's
     data-explain text to the status line).
     ================================================================ */
  document.querySelectorAll(".choice-grid[data-answer]").forEach((grid) => {
    const answer = grid.getAttribute("data-answer");
    const explain = grid.getAttribute("data-explain") || "";
    const status = grid.nextElementSibling && grid.nextElementSibling.classList.contains("choice-status")
      ? grid.nextElementSibling
      : null;
    grid.querySelectorAll(".decision-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.getAttribute("data-choice");
        const isCorrect = choice === answer;
        grid.querySelectorAll(".decision-option").forEach((b) => b.classList.remove("correct", "wrong"));
        if (isCorrect) {
          btn.classList.add("correct");
          if (status) {
            status.textContent = ("Correct. " + explain).trim();
            status.classList.remove("wrong");
            status.classList.add("correct");
          }
        } else {
          btn.classList.add("wrong");
          const correctBtn = grid.querySelector(`[data-choice="${answer}"]`);
          if (correctBtn) correctBtn.classList.add("correct");
          if (status) {
            status.textContent = ("Not quite — the correct answer is highlighted above. " + explain).trim();
            status.classList.remove("correct");
            status.classList.add("wrong");
          }
        }
      });
    });
  });

  /* ================================================================
     Hazard-spotting grids — Module 2 (osha) and Module 7 (radiation)
     ================================================================ */
  const HAZARD_SETS = {
    osha: [
      ["sharp", "Unsecured sharp"],
      ["chemical", "Unlabeled chemical"],
      ["wetfloor", "Wet floor"],
      ["blockedexit", "Blocked exit"],
      ["petescape", "Pet escape risk"],
      ["biohazard", "Uncontained bodily fluid"]
    ],
    radiation: [
      ["door", "Door unsecured"],
      ["apron", "No protective apron"],
      ["dosimeter", "No dosimeter badge"],
      ["unauthorized", "Unauthorized person present"],
      ["clock", "Unnecessary exposure time"],
      ["distance", "Insufficient distance"]
    ]
  };

  document.querySelectorAll("[data-hazard-grid]").forEach((grid) => {
    const key = grid.getAttribute("data-hazard-grid");
    const set = HAZARD_SETS[key];
    if (!set) return;
    const hint = grid.getAttribute("data-hint") || "Click to inspect";
    const status = document.querySelector(`[data-hazard-status="${key}"]`);
    const total = set.length;

    function report() {
      const found = grid.querySelectorAll(".l5-hazard.found").length;
      if (!status) return;
      status.textContent = found === total
        ? "Excellent. You found all six hazards."
        : `Hazards found: ${found} of ${total}.`;
      status.classList.toggle("correct", found === total);
    }

    set.forEach(([glyph, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "l5-hazard";
      btn.setAttribute("data-hazard", label);
      btn.appendChild(iconWrap(glyph));
      const strong = document.createElement("strong");
      strong.textContent = label;
      btn.appendChild(strong);
      const small = document.createElement("small");
      small.textContent = hint;
      btn.appendChild(small);
      btn.addEventListener("click", () => {
        btn.classList.add("found");
        small.textContent = "Identified";
        report();
      });
      grid.appendChild(btn);
    });

    report();
  });

  /* ================================================================
     PPE selection — Module 3
     ================================================================ */
  const PPE_ITEMS = [
    ["gloves", "Gloves"],
    ["gown", "Gown"],
    ["mask", "Mask"],
    ["eyeprotection", "Eye protection"]
  ];

  document.querySelectorAll("[data-ppe]").forEach((wrap) => {
    const grid = wrap.querySelector(".l5-ppe-grid");
    const status = wrap.querySelector(".l5-ppe-status");
    if (!grid) return;

    PPE_ITEMS.forEach(([glyph, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "l5-ppe-item";
      btn.setAttribute("aria-pressed", "false");
      btn.appendChild(iconWrap(glyph));
      const span = document.createElement("span");
      span.className = "l5-ppe-label";
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener("click", () => {
        const on = btn.classList.toggle("selected");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      grid.appendChild(btn);
    });

    const check = wrap.querySelector(".l5-ppe-check");
    if (check) {
      check.addEventListener("click", () => {
        const items = Array.from(grid.querySelectorAll(".l5-ppe-item"));
        const all = items.length > 0 && items.every((i) => i.classList.contains("selected"));
        if (!status) return;
        status.textContent = all
          ? "Correct. Enhanced precautions apply in this scenario."
          : "Select all four items for this isolation scenario.";
        status.classList.toggle("correct", all);
        status.classList.toggle("wrong", !all);
      });
    }
  });

  /* ================================================================
     Toggle lists — Module 4 (chemical locations) and Module 8 (security)
     ================================================================ */
  const TOGGLE_SETS = {
    chemical: [
      ["sds", "SDS binder or digital SDS access", "on"],
      ["storage", "Chemical storage area", "on"],
      ["spillkit", "Spill kit", "on"],
      ["eyewash", "Eyewash station", "on"]
    ],
    security: [
      ["door", "Keep restricted areas controlled", "on"],
      ["unauthorized", "Challenge or escort unauthorized visitors", "on"],
      ["sds", "Protect passwords and Member information", "on"],
      ["storage", "Secure keys and controlled substances", "on"],
      ["dosimeter", "Report suspicious behavior", "on"],
      ["blockedexit", "Allow former Team Members into treatment without permission", "off"]
    ]
  };

  const TOGGLE_MESSAGES = {
    security: {
      pass: "Correct. Access, information, keys, and controlled substances stay protected.",
      fail: "Review the final statement carefully: former Team Members require authorization and normal visitor controls."
    }
  };

  document.querySelectorAll("[data-toggles]").forEach((list) => {
    const key = list.getAttribute("data-toggles");
    const set = TOGGLE_SETS[key];
    if (!set) return;
    const status = document.querySelector(`[data-toggle-status="${key}"]`);
    const autoSuccess = list.getAttribute("data-success");

    function allCorrect() {
      return Array.from(list.querySelectorAll(".l5-switch"))
        .every((s) => (s.getAttribute("data-should") === "on") === s.classList.contains("on"));
    }

    set.forEach(([glyph, label, should]) => {
      const row = document.createElement("div");
      row.className = "l5-toggle-row";
      row.appendChild(iconWrap(glyph));
      const text = document.createElement("span");
      text.className = "l5-toggle-label";
      text.textContent = label;
      row.appendChild(text);
      const sw = document.createElement("button");
      sw.type = "button";
      sw.className = "l5-switch";
      sw.setAttribute("data-should", should);
      sw.setAttribute("aria-pressed", "false");
      sw.setAttribute("aria-label", label);
      sw.addEventListener("click", () => {
        const on = sw.classList.toggle("on");
        sw.setAttribute("aria-pressed", on ? "true" : "false");
        if (autoSuccess && status && allCorrect()) {
          status.textContent = autoSuccess;
          status.classList.add("correct");
          status.classList.remove("wrong");
        }
      });
      row.appendChild(sw);
      list.appendChild(row);
    });

    const check = document.querySelector(`[data-toggle-check="${key}"]`);
    if (check && status) {
      const msg = TOGGLE_MESSAGES[key] || { pass: "Correct.", fail: "Review each statement and try again." };
      check.addEventListener("click", () => {
        const pass = allCorrect();
        status.textContent = pass ? msg.pass : msg.fail;
        status.classList.toggle("correct", pass);
        status.classList.toggle("wrong", !pass);
      });
    }
  });

  /* ================================================================
     Waste sorting — Module 5 (click item, then click zone)
     ================================================================ */
  const WASTE_ITEMS = [
    ["sharp", "Used needle", "sharps"],
    ["biohazard", "Blood-soaked gauze", "bio"],
    ["paper", "Clean paper wrapper", "trash"],
    ["laundry", "Soiled bedding", "laundry"]
  ];
  const WASTE_ZONES = [
    ["paper", "trash", "Regular Trash"],
    ["biobin", "bio", "Biohazard"],
    ["sharpsbin", "sharps", "Sharps"],
    ["laundry", "laundry", "Laundry"]
  ];

  document.querySelectorAll("[data-waste]").forEach((wrap) => {
    const tokens = wrap.querySelector(".l5-waste-tokens");
    const zones = wrap.querySelector(".l5-waste-zones");
    const status = wrap.querySelector(".l5-waste-status");
    if (!tokens || !zones) return;
    let selected = null;

    function say(text, good) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle("correct", good === true);
      status.classList.toggle("wrong", good === false);
    }

    WASTE_ITEMS.forEach(([glyph, label, type]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "l5-waste-item";
      btn.setAttribute("data-type", type);
      btn.setAttribute("data-item", label);
      btn.appendChild(iconWrap(glyph));
      const span = document.createElement("span");
      span.className = "l5-waste-label";
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener("click", () => {
        tokens.querySelectorAll(".l5-waste-item").forEach((x) => x.classList.remove("selected"));
        btn.classList.add("selected");
        selected = btn;
      });
      tokens.appendChild(btn);
    });

    WASTE_ZONES.forEach(([glyph, type, label]) => {
      const zone = document.createElement("div");
      zone.className = "l5-waste-zone";
      zone.setAttribute("data-zone", type);
      zone.setAttribute("role", "button");
      zone.setAttribute("tabindex", "0");
      zone.appendChild(iconWrap(glyph));
      const strong = document.createElement("strong");
      strong.textContent = label;
      zone.appendChild(strong);
      const small = document.createElement("small");
      small.textContent = "Click after selecting an item";
      zone.appendChild(small);
      const bin = document.createElement("div");
      bin.className = "l5-waste-zone-items";
      zone.appendChild(bin);

      function drop() {
        if (!selected) {
          say("Select an item first.", false);
          return;
        }
        if (selected.getAttribute("data-type") === type) {
          const chip = document.createElement("span");
          chip.className = "l5-waste-chip";
          chip.textContent = selected.getAttribute("data-item");
          bin.appendChild(chip);
          selected.disabled = true;
          selected.classList.remove("selected");
          selected.classList.add("placed");
          selected = null;
          say("Correct disposal choice.", true);
        } else {
          say("That item belongs in a different category.", false);
        }
      }

      zone.addEventListener("click", drop);
      zone.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); drop(); }
      });
      zones.appendChild(zone);
    });
  });

  /* ================================================================
     Emergency practice cards — Module 6
     ================================================================ */
  const EMERGENCIES = [
    ["fire", "Fire", "Follow the evacuation route, communicate, and report to the rally point."],
    ["power", "Power Failure", "Protect patients and equipment, then notify hospital leadership."],
    ["aggressivepet", "Aggressive Pet", "Secure the area and escalate immediately."],
    ["medical", "Medical Emergency", "Notify the Medical Team and follow instructions."],
    ["earthquake", "Earthquake", "Protect yourself, then follow evacuation or shelter procedures."],
    ["fume", "Gas or Fume Concern", "Move away, warn others, and escalate."]
  ];

  document.querySelectorAll("[data-emergency-grid]").forEach((grid) => {
    EMERGENCIES.forEach(([glyph, name, response]) => {
      const card = document.createElement("div");
      card.className = "l5-emergency-card";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "l5-emergency-btn";
      btn.setAttribute("data-emergency", name);
      btn.setAttribute("aria-expanded", "false");
      btn.appendChild(iconWrap(glyph));
      const h4 = document.createElement("strong");
      h4.textContent = name;
      btn.appendChild(h4);
      const small = document.createElement("small");
      small.textContent = "Practice response";
      btn.appendChild(small);
      card.appendChild(btn);

      const body = document.createElement("p");
      body.className = "l5-emergency-response";
      body.textContent = response;
      card.appendChild(body);

      btn.addEventListener("click", () => {
        const open = card.classList.toggle("revealed");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        small.textContent = open ? "Correct response" : "Practice response";
      });

      grid.appendChild(card);
    });
  });

  /* ================================================================
     Reflection & completion
     ================================================================ */
  const reflection = document.getElementById("reflection");
  const reflectionStatus = document.getElementById("reflectionStatus");
  const saveBtn = document.getElementById("saveReflection");
  const completeBtn = document.getElementById("completeLesson");
  const completeStatus = document.getElementById("completeStatus");

  if (reflection) {
    const stored = read("reflection");
    if (stored) {
      reflection.value = stored;
      if (reflectionStatus) reflectionStatus.textContent = "Reflection saved to this browser.";
    }
  }

  if (saveBtn && reflection) {
    saveBtn.addEventListener("click", () => {
      const value = reflection.value.trim();
      if (!reflectionStatus) return;
      if (value.length < 25) {
        reflectionStatus.textContent = "Add a little more detail before saving.";
        reflectionStatus.classList.remove("correct");
        reflectionStatus.classList.add("wrong");
        return;
      }
      write("reflection", value);
      reflectionStatus.textContent = "Reflection saved to this browser.";
      reflectionStatus.classList.remove("wrong");
      reflectionStatus.classList.add("correct");
    });
  }

  if (completeStatus && read("complete") === "true") {
    completeStatus.textContent = "Lesson marked complete.";
    completeStatus.classList.add("pass");
  }

  if (completeBtn && completeStatus) {
    completeBtn.addEventListener("click", () => {
      const saved = read("reflection");
      if (!saved || saved.trim().length < 25) {
        completeStatus.textContent = "Save your safety walk reflection before marking the lesson complete.";
        completeStatus.classList.remove("pass");
        completeStatus.classList.add("fail");
        return;
      }
      write("complete", "true");
      completeStatus.textContent = "Lesson marked complete.";
      completeStatus.classList.remove("fail");
      completeStatus.classList.add("pass");
    });
  }
})();
