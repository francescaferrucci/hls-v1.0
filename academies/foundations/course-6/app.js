/* Foundations Academy · Lesson 6 — Hannahware Basics
   Single-scroll lesson page. All activity icons are inline SVG (no emoji, no photos).
   Structure, storage pattern, and the shared knowledge-check handler mirror course-5. */
(function () {
  "use strict";

  const NS = "hls.foundations.course6";

  function read(key) {
    try { return localStorage.getItem(NS + "." + key); } catch (err) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(NS + "." + key, value); } catch (err) { /* storage unavailable */ }
  }

  /* ================================================================
     Icon system — one circle badge + one single-color glyph path,
     drawn on a 0 0 90 90 canvas. Same construction as course-4's
     classifyIcon() and course-5's icon(). Glyphs marked "carried"
     are reused unchanged from course-5's map rather than redrawn.
     ================================================================ */
  const GLYPHS = {
    /* new for Lesson 6 */
    search: "M41 22a19 19 0 1 1 0 38 19 19 0 0 1 0-38zm0 7a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm16 30l4-4 13 13-4 4-13-13z",
    verify: "M45 16l22 8v20c0 14-9 24-22 30-13-6-22-16-22-30V24l22-8zm0 7l-15 5v16c0 10 6 18 15 23 9-5 15-13 15-23V28l-15-5zm-9 21l-4 4 10 10 17-17-4-4-13 13-6-6z",
    save: "M24 22h32l12 12v34H24V22z M30 28v12h24V28H30z M30 48h30v14H30V48z M36 53h18v4H36v-4z",
    lock: "M45 18a14 14 0 0 1 14 14v6h5v30H26V38h5v-6a14 14 0 0 1 14-14zm0 6a8 8 0 0 0-8 8v6h16v-6a8 8 0 0 0-8-8z M32 44v18h26V44H32z M42 48h6v10h-6V48z",
    person: "M45 20a13 13 0 1 1 0 26 13 13 0 0 1 0-26zm0 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM23 74c0-13 10-22 22-22s22 9 22 22h-6c0-10-7-16-16-16s-16 6-16 16h-6z",
    contactcard: "M20 26h50v38H20V26z M26 32v26h38V32H26z M31 37h12v12H31V37z M47 38h16v4H47v-4z M47 46h16v4H47v-4z M31 54h20v4H31v-4z",
    calendar: "M28 20h6v8h22v-8h6v8h8v44H20V28h8v-8z M26 34v32h38V34H26z M32 39h8v8h-8v-8z M45 39h8v8h-8v-8z M58 39h6v8h-6v-8z M32 52h8v8h-8v-8z M45 52h8v8h-8v-8z",
    arrival: "M38 20h30v50H38v-6h24V26H38v-6z M20 42h16v-9l15 12-15 12v-9H20v-6z",
    steps: "M22 28h8v8h-8v-8z M38 30h30v5H38v-5z M22 42h8v8h-8v-8z M38 44h30v5H38v-5z M22 56h8v8h-8v-8z M38 58h30v5H38v-5z",
    chart: "M34 18h22v6H34v-6z M26 24h12v6h14v-6h12v52H26V24z M32 36v34h26V36H32z M38 42h14v5H38v-5z M38 52h14v5H38v-5z M38 62h10v5H38v-5z",
    teamwork: "M34 24a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M58 26a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 68c0-10 7-18 16-18s16 8 16 18h-6c0-7-4-12-10-12s-10 5-10 12h-6z M53 68c0-9 4-16 10-16s10 7 10 16h-6c0-6-2-10-4-10s-4 4-4 10h-6z",
    ask: "M20 24h50v34H48l-13 13V58H20V24zM26 30v22h15v9l9-9h14V30H26z",
    /* carried unchanged from course-5's glyph map */
    door: "M28 18h34v56H28V18zm6 6v44h22V24H34zm18 18a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
    sds: "M30 18h22l14 14v40H30V18zm6 6v42h24V36H48V24H36zm4 20h16v4H40v-4zm0 9h16v4H40v-4z",
    storage: "M22 26h46v44H22V26zm6 6v14h34V32H28zm0 20v12h34V52H28zm8-14h8v6h-8v-6zm0 20h8v6h-8v-6z",
    unauthorized: "M45 20a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm0 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM24 74c0-13 9-22 21-22s21 9 21 22h-6c0-10-6-16-15-16s-15 6-15 16h-6zM60 20l10 10-4 4-10-10 4-4zm-4 14l10-10 4 4-10 10-4-4z",
    medical: "M38 18h14v16h16v14H52v16H38V48H22V34h16V18zm6 6v16H28v2h16v16h2V42h16v-2H46V24h-2z"
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
    path.setAttribute("d", GLYPHS[glyph] || GLYPHS.search);
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
     Knowledge checks — shared .choice-grid[data-answer] component,
     identical to course-5's handler.
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
     Module 1 — navigation habit cards (click to reveal why it matters)
     ================================================================ */
  const HABIT_SETS = {
    navigation: [
      ["search", "Look up before you act",
        "Start every task by finding the Member and Pet in the system. Working from memory, or from a record someone else left open, is how information lands in the wrong place."],
      ["verify", "Confirm identity before charting",
        "Check that the record in front of you belongs to the Pet you are actually working with. Names repeat, households have several Pets, and an entry in the wrong record is difficult to unwind."],
      ["save", "Save before switching",
        "Confirm your entry is saved before you move to another record or task. An entry that was never saved is, to the next Team Member, an entry that never happened."],
      ["door", "Close out properly",
        "Finish and close the record when the task is done. It protects the Member's information and it stops the next Team Member from charting into a record you left open."],
      ["ask", "Ask before you guess",
        "If you are unsure where something belongs or whether you are permitted to change it, ask your manager or mentor. A question costs seconds; a wrong entry can follow a Pet for years."]
    ]
  };

  document.querySelectorAll("[data-habits]").forEach((grid) => {
    const key = grid.getAttribute("data-habits");
    const set = HABIT_SETS[key];
    if (!set) return;
    const status = document.querySelector(`[data-habit-status="${key}"]`);
    const total = set.length;

    function report() {
      if (!status) return;
      const seen = grid.querySelectorAll(".l6-habit.revealed").length;
      status.textContent = seen === total
        ? "All five habits reviewed."
        : `Habits reviewed: ${seen} of ${total}.`;
      status.classList.toggle("correct", seen === total);
    }

    set.forEach(([glyph, title, body]) => {
      const card = document.createElement("div");
      card.className = "l6-habit";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "l6-habit-btn";
      btn.setAttribute("data-habit", title);
      btn.setAttribute("aria-expanded", "false");
      btn.appendChild(iconWrap(glyph));
      const strong = document.createElement("strong");
      strong.textContent = title;
      btn.appendChild(strong);
      const small = document.createElement("small");
      small.textContent = "Why it matters";
      btn.appendChild(small);
      card.appendChild(btn);

      const p = document.createElement("p");
      p.className = "l6-habit-body";
      p.textContent = body;
      card.appendChild(p);

      btn.addEventListener("click", () => {
        const open = card.classList.toggle("revealed");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        report();
      });

      grid.appendChild(card);
    });

    report();
  });

  /* ================================================================
     Module 2 — Member information toggle checklist.
     Reuses course-5's .l5-toggle-* / .l5-switch component verbatim;
     data-should="off" marks the one deliberately unsafe practice.
     ================================================================ */
  const TOGGLE_SETS = {
    information: [
      ["verify", "Verify identity before discussing or changing account information", "on"],
      ["person", "Confirm you have the correct Member's record open before making a change", "on"],
      ["contactcard", "Update contact details as soon as a Member tells you they have changed", "on"],
      ["lock", "Access only the Member information your current task requires", "on"],
      ["storage", "Keep Member information on approved Hannah systems and channels", "on"],
      ["unauthorized", "Share a Member's phone number with a friend who says they know the Member", "off"]
    ]
  };

  const TOGGLE_MESSAGES = {
    information: {
      pass: "Correct. Member information stays accurate, accessed only as needed, and inside approved Hannah channels.",
      fail: "Review the final statement carefully: Member information is never shared outside approved channels, even with someone who says they already know the Member."
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
     Module 3 — check-in sequencing (click steps in the correct order)
     ================================================================ */
  const SEQUENCES = {
    checkin: {
      steps: [
        ["person", "Confirm the Member and the Pet who arrived"],
        ["calendar", "Confirm the appointment details match"],
        ["arrival", "Update the arrival status in the system"],
        ["teamwork", "Notify the care team the Pet is ready"]
      ],
      /* deliberately not in answer order so the activity requires thought */
      order: [2, 0, 3, 1],
      success: "Correct. Verify who arrived, confirm the appointment, make the arrival visible, then hand off to the care team."
    }
  };

  document.querySelectorAll("[data-sequence]").forEach((wrap) => {
    const key = wrap.getAttribute("data-sequence");
    const config = SEQUENCES[key];
    if (!config) return;
    const slotsEl = wrap.querySelector(".l6-seq-slots");
    const tokensEl = wrap.querySelector(".l6-seq-tokens");
    const status = wrap.querySelector(".l6-seq-status");
    const resetBtn = wrap.querySelector(".l6-seq-reset");
    if (!slotsEl || !tokensEl) return;

    let position = 0;

    function say(text, good) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle("correct", good === true);
      status.classList.toggle("wrong", good === false);
    }

    function build() {
      slotsEl.textContent = "";
      tokensEl.textContent = "";
      position = 0;

      config.steps.forEach((step, i) => {
        const slot = document.createElement("div");
        slot.className = "l6-seq-slot";
        slot.setAttribute("data-slot", String(i + 1));
        const num = document.createElement("span");
        num.className = "l6-seq-num";
        num.textContent = String(i + 1);
        slot.appendChild(num);
        const label = document.createElement("span");
        label.className = "l6-seq-slot-label";
        label.textContent = "Waiting";
        slot.appendChild(label);
        slotsEl.appendChild(slot);
      });

      config.order.forEach((stepIndex) => {
        const [glyph, label] = config.steps[stepIndex];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "l6-seq-token";
        btn.setAttribute("data-step", String(stepIndex));
        btn.setAttribute("data-label", label);
        btn.appendChild(iconWrap(glyph));
        const span = document.createElement("span");
        span.className = "l6-seq-token-label";
        span.textContent = label;
        btn.appendChild(span);
        btn.addEventListener("click", () => {
          if (stepIndex !== position) {
            say("That step comes at a different point in the sequence.", false);
            return;
          }
          const slot = slotsEl.children[position];
          if (slot) {
            slot.classList.add("filled");
            const slotLabel = slot.querySelector(".l6-seq-slot-label");
            if (slotLabel) slotLabel.textContent = label;
          }
          btn.disabled = true;
          btn.classList.add("placed");
          position += 1;
          if (position === config.steps.length) {
            say(config.success, true);
          } else {
            say(`Correct. Step ${position} of ${config.steps.length} placed.`, true);
          }
        });
        tokensEl.appendChild(btn);
      });

      say("Select the step that comes first.", null);
    }

    if (resetBtn) resetBtn.addEventListener("click", build);
    build();
  });

  /* ================================================================
     Module 4 — PetNurse / Nurse Aide responsibility matching
     ================================================================ */
  const MATCH_SETS = {
    roles: {
      options: [["petnurse", "PetNurse"], ["aide", "Nurse Aide"]],
      rows: [
        ["medical", "Performs the physical examination of the Pet", "petnurse"],
        ["ask", "Verbalizes exam findings out loud during the examination", "petnurse"],
        ["chart", "Performs the Hannahware data entry for those findings", "aide"],
        ["verify", "Confirms the correct Pet's record is open before entering", "aide"],
        ["sds", "Determines the treatment plan and follow-up", "petnurse"],
        ["steps", "Asks for a finding to be repeated when it was not clear", "aide"]
      ],
      success: "Correct on all six. The PetNurse examines and verbalizes; the Nurse Aide confirms the record and performs the entry."
    }
  };

  document.querySelectorAll("[data-match]").forEach((wrap) => {
    const key = wrap.getAttribute("data-match");
    const config = MATCH_SETS[key];
    if (!config) return;
    const rowsEl = wrap.querySelector(".l6-match-rows");
    const status = wrap.querySelector(".l6-match-status");
    if (!rowsEl) return;
    const total = config.rows.length;

    function report() {
      if (!status) return;
      const done = rowsEl.querySelectorAll(".l6-match-row.answered").length;
      const right = rowsEl.querySelectorAll(".l6-match-row.answered.right").length;
      if (done === 0) {
        status.textContent = "";
        status.classList.remove("correct", "wrong");
        return;
      }
      if (done === total && right === total) {
        status.textContent = config.success;
        status.classList.add("correct");
        status.classList.remove("wrong");
        return;
      }
      status.textContent = `Matched correctly: ${right} of ${total}.`;
      status.classList.toggle("correct", right === done);
      status.classList.toggle("wrong", right < done);
    }

    config.rows.forEach(([glyph, label, answer]) => {
      const row = document.createElement("div");
      row.className = "l6-match-row";
      row.setAttribute("data-answer", answer);
      row.appendChild(iconWrap(glyph));

      const text = document.createElement("span");
      text.className = "l6-match-label";
      text.textContent = label;
      row.appendChild(text);

      const choices = document.createElement("div");
      choices.className = "l6-match-choices";
      config.options.forEach(([value, optionLabel]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "l6-match-choice";
        btn.setAttribute("data-choice", value);
        btn.textContent = optionLabel;
        btn.addEventListener("click", () => {
          const isRight = value === answer;
          choices.querySelectorAll(".l6-match-choice").forEach((b) => {
            b.classList.remove("correct", "wrong");
            b.disabled = true;
          });
          btn.classList.add(isRight ? "correct" : "wrong");
          if (!isRight) {
            const rightBtn = choices.querySelector(`[data-choice="${answer}"]`);
            if (rightBtn) rightBtn.classList.add("correct");
          }
          row.classList.add("answered");
          row.classList.toggle("right", isRight);
          report();
        });
        choices.appendChild(btn);
      });
      row.appendChild(choices);
      rowsEl.appendChild(row);
    });

    report();
  });

  /* ================================================================
     Reflection & completion — same gate chain as course-5
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
        completeStatus.textContent = "Save your reflection before marking the lesson complete.";
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
