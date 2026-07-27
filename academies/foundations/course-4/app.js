(() => {
  "use strict";
  const NS = "hls.foundations.course4";
  const PASS_MARK = 90;

  function shuffled(list) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  // ---- Single-answer knowledge checks (.choice-grid[data-answer]) ----
  document.querySelectorAll(".choice-grid[data-answer]").forEach((grid) => {
    const answer = grid.getAttribute("data-answer");
    const status = grid.nextElementSibling && grid.nextElementSibling.classList.contains("choice-status")
      ? grid.nextElementSibling
      : null;
    const coach = grid.parentElement ? grid.parentElement.querySelector(".l4-coach") : null;
    grid.querySelectorAll(".decision-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.getAttribute("data-choice");
        const isCorrect = choice === answer;
        grid.querySelectorAll(".decision-option").forEach((b) => b.classList.remove("correct", "wrong"));
        if (isCorrect) {
          btn.classList.add("correct");
          if (status) { status.textContent = "Correct."; status.classList.remove("wrong"); status.classList.add("correct"); }
        } else {
          btn.classList.add("wrong");
          const correctBtn = grid.querySelector(`[data-choice="${answer}"]`);
          if (correctBtn) correctBtn.classList.add("correct");
          if (status) { status.textContent = "Not quite — the correct answer is highlighted above."; status.classList.remove("correct"); status.classList.add("wrong"); }
        }
        if (coach) {
          coach.classList.add("revealed");
          coach.querySelectorAll("[data-coach]").forEach((p) => {
            p.classList.toggle("shown", p.getAttribute("data-coach") === choice);
          });
        }
      });
    });
  });

  // ---- Module 1: value flip cards ----
  document.querySelectorAll("[data-flip-group]").forEach((group) => {
    const name = group.getAttribute("data-flip-group");
    const cards = Array.from(group.querySelectorAll(".l4-flip-card"));
    const progress = document.querySelector(`[data-flip-progress="${name}"]`);
    const revealed = new Set();

    function refresh() {
      if (!progress) return;
      progress.textContent = revealed.size === cards.length
        ? `All ${cards.length} values revealed. These eight words are how professionalism is measured at Hannah.`
        : `${revealed.size} of ${cards.length} values revealed.`;
    }

    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        const nowOpen = !card.classList.contains("flipped");
        card.classList.toggle("flipped", nowOpen);
        card.setAttribute("aria-expanded", String(nowOpen));
        if (nowOpen) revealed.add(i);
        refresh();
      });
    });
    refresh();
  });

  // ---- Module 2: sort / categorize ----
  document.querySelectorAll("[data-sorter]").forEach((sorter) => {
    const pool = sorter.querySelector(".l4-sort-pool");
    const items = Array.from(sorter.querySelectorAll(".l4-sort-item"));
    const zones = Array.from(sorter.querySelectorAll(".l4-sort-zone"));
    const status = sorter.querySelector(".l4-sort-status");
    const resetBtn = sorter.querySelector(".l4-sort-reset");
    let active = null;

    function say(message, tone) {
      if (!status) return;
      status.textContent = message;
      status.classList.remove("correct", "wrong");
      if (tone) status.classList.add(tone);
    }

    function placedCount() {
      return items.filter((it) => it.classList.contains("placed")).length;
    }

    function clearActive() {
      if (active) active.classList.remove("selected");
      active = null;
      zones.forEach((z) => z.classList.remove("armed"));
    }

    items.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.classList.contains("placed")) return;
        if (active === item) { clearActive(); say("Selection cleared.", null); return; }
        clearActive();
        active = item;
        item.classList.add("selected");
        zones.forEach((z) => z.classList.add("armed"));
        say(`"${item.textContent}" selected — now choose a column.`, null);
      });
    });

    function assign(zone, ev) {
      // The active check must run before ignoring clicks that land on already-placed
      // chips, otherwise a full column becomes unclickable at its center.
      if (!active) {
        if (ev && ev.target && ev.target.closest && ev.target.closest(".l4-sort-item")) return;
        say("Select a behavior first, then choose a column.", null);
        return;
      }
      const item = active;
      const correct = item.getAttribute("data-bucket") === zone.getAttribute("data-zone");
      clearActive();
      item.classList.add("placed", correct ? "correct" : "wrong");
      const bin = zone.querySelector(".l4-sort-zone-items");
      if (bin) bin.appendChild(item);
      const done = placedCount() === items.length;
      if (correct) {
        say(done
          ? "All six behaviors classified. Review any marked in red — those belong in the other column."
          : `Correct. "${item.textContent}" belongs here. ${items.length - placedCount()} to go.`, "correct");
      } else {
        say(`Not quite — "${item.textContent}" belongs in the other column.`, "wrong");
      }
    }

    zones.forEach((zone) => {
      zone.addEventListener("click", (ev) => assign(zone, ev));
      zone.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); assign(zone, null); }
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        clearActive();
        items.forEach((item) => {
          item.classList.remove("placed", "correct", "wrong", "selected");
          if (pool) pool.appendChild(item);
        });
        say("Activity reset.", null);
      });
    }
  });

  // ---- Module 3: Hannah Translator game ----
  const TRANSLATOR_ROUNDS = [
    {
      phrase: "The owner called Corporate.",
      options: [
        { text: "The Member called Hannah Team Support.", correct: true, note: "Correct. “Owner” becomes Member, and “Corporate” becomes Hannah Team Support (HTS)." },
        { text: "The client called the administrative office.", correct: false, note: "Both terms are still off-brand — “client” and “administrative office” are exactly what we replace." },
        { text: "The Pet Parent called Corporate.", correct: false, note: "Pet Parent is a valid Hannah term, but “Corporate” still needs to become Hannah Team Support." }
      ]
    },
    {
      phrase: "The rabbit is ready.",
      options: [
        { text: "The bunny is ready.", correct: true, note: "Correct. Hannah says bunny, not rabbit." },
        { text: "The animal is ready.", correct: false, note: "“Animal” is replaced by Pet — and we can be more specific than that here." },
        { text: "The rabbit Pet is ready.", correct: false, note: "Still uses “rabbit.” The Hannah term is bunny." }
      ]
    },
    {
      phrase: "The staff meeting begins at 2.",
      options: [
        { text: "The Team meeting begins at 2.", correct: true, note: "Correct. Staff becomes Team; individuals are Team Members." },
        { text: "The employee meeting begins at 2.", correct: false, note: "“Employee” is replaced by Team Member, so an employee meeting is still off-brand." },
        { text: "The department meeting begins at 2.", correct: false, note: "“Department” is replaced by Team as well — so this trades one off-brand word for another." }
      ]
    },
    {
      phrase: "The receptionist will check the client in.",
      options: [
        { text: "The Service Coordinator will check the Member in.", correct: true, note: "Correct. Receptionist becomes Service Coordinator, and client becomes Member." },
        { text: "The receptionist will check the Member in.", correct: false, note: "Half right. Member is correct, but the role title is Service Coordinator." },
        { text: "The Service Coordinator will check the client in.", correct: false, note: "Half right. The role is correct, but “client” should be Member." }
      ]
    },
    {
      phrase: "The feline in room 3 belongs to that client.",
      options: [
        { text: "The Cat in room 3 belongs to that Member.", correct: true, note: "Correct. Feline becomes Cat, and client becomes Member." },
        { text: "The feline in room 3 belongs to that Pet Parent.", correct: false, note: "Pet Parent works, but “feline” should be Cat." },
        { text: "The animal in room 3 belongs to that Member.", correct: false, note: "Member is right, but “animal” becomes Pet — and here we know it is a Cat." }
      ]
    },
    {
      phrase: "Someone from the administrative office called about an employee.",
      options: [
        { text: "Someone from Hannah Team Support called about a Team Member.", correct: true, note: "Correct. Administrative office becomes Hannah Team Support (HTS); employee becomes Team Member." },
        { text: "Someone from Corporate called about a Team Member.", correct: false, note: "Team Member is right, but “Corporate” is also replaced by Hannah Team Support." },
        { text: "Someone from Hannah Team Support called about a staff person.", correct: false, note: "HTS is right, but “staff” becomes Team Member." }
      ]
    }
  ];

  document.querySelectorAll("[data-translator]").forEach((widget) => {
    const progress = widget.querySelector(".l4-translator-progress");
    const phraseEl = widget.querySelector(".l4-translator-phrase");
    const optionsEl = widget.querySelector(".l4-translator-options");
    const feedbackEl = widget.querySelector(".l4-translator-feedback");
    const nextBtn = widget.querySelector(".l4-translator-next");
    const restartBtn = widget.querySelector(".l4-translator-restart");
    let index = 0;
    let score = 0;
    let answered = false;
    let shownOptions = [];

    function render() {
      const round = TRANSLATOR_ROUNDS[index];
      answered = false;
      shownOptions = shuffled(round.options);
      if (progress) progress.textContent = `Phrase ${index + 1} of ${TRANSLATOR_ROUNDS.length} · Score ${score}`;
      if (phraseEl) phraseEl.textContent = `“${round.phrase}”`;
      if (feedbackEl) { feedbackEl.textContent = ""; feedbackEl.classList.remove("correct", "wrong"); }
      if (nextBtn) nextBtn.hidden = true;
      if (restartBtn) restartBtn.hidden = true;
      if (!optionsEl) return;
      optionsEl.textContent = "";
      shownOptions.forEach((option) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "l4-translator-option";
        btn.textContent = option.text;
        btn.addEventListener("click", () => choose(btn, option));
        optionsEl.appendChild(btn);
      });
    }

    function choose(btn, option) {
      if (answered) return;
      answered = true;
      if (option.correct) score += 1;
      Array.from(optionsEl.children).forEach((child, i) => {
        child.disabled = true;
        if (shownOptions[i].correct) child.classList.add("correct");
      });
      if (!option.correct) btn.classList.add("wrong");
      if (feedbackEl) {
        feedbackEl.textContent = option.note;
        feedbackEl.classList.toggle("correct", !!option.correct);
        feedbackEl.classList.toggle("wrong", !option.correct);
      }
      if (progress) progress.textContent = `Phrase ${index + 1} of ${TRANSLATOR_ROUNDS.length} · Score ${score}`;
      if (index < TRANSLATOR_ROUNDS.length - 1) {
        if (nextBtn) nextBtn.hidden = false;
      } else {
        if (feedbackEl) {
          feedbackEl.textContent = `${option.note} — Final score: ${score} of ${TRANSLATOR_ROUNDS.length}.`;
        }
        if (restartBtn) restartBtn.hidden = false;
      }
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { index += 1; render(); });
    if (restartBtn) restartBtn.addEventListener("click", () => { index = 0; score = 0; render(); });
    render();
  });

  // ---- Module 4: role-based uniform guide tabs ----
  document.querySelectorAll("[data-role-guide]").forEach((guide) => {
    const tabs = Array.from(guide.querySelectorAll(".l4-role-tab"));
    const panels = Array.from(guide.querySelectorAll(".l4-role-panel"));

    function select(role, focus) {
      tabs.forEach((tab) => {
        const on = tab.getAttribute("data-role") === role;
        tab.classList.toggle("active", on);
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        if (on && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute("data-role-panel") !== role;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab.getAttribute("data-role"), false));
      tab.addEventListener("keydown", (ev) => {
        if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
        ev.preventDefault();
        const step = ev.key === "ArrowRight" ? 1 : -1;
        const nextTab = tabs[(i + step + tabs.length) % tabs.length];
        select(nextTab.getAttribute("data-role"), true);
      });
    });

    if (tabs.length) select(tabs[0].getAttribute("data-role"), false);
  });

  // ---- Module 4: appearance standards classification ----
  const CLASSIFY_GLYPHS = {
    hair: "M45 26c-13 0-22 9-22 21v9h44v-9c0-12-9-21-22-21Zm-14 30v-9c0-8 6-14 14-14s14 6 14 14v9Z",
    fragrance: "M39 22h12v7h-12Zm-6 11h24v25a5 5 0 0 1-5 5H38a5 5 0 0 1-5-5Z",
    jewelry: "M45 24a8 8 0 0 1 8 8h-6a2 2 0 0 0-4 0h-6a8 8 0 0 1 8-8Zm0 18a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z",
    footwear: "M26 40h16l6 8h14a6 6 0 0 1 6 6v6H26Z",
    uniform: "M36 24h18l12 8-6 8-3-2v24H33V38l-3 2-6-8Z",
    makeup: "M38 22h14l-2 12H40Zm1 16h12v22a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z",
    ppe: "M24 38h42v6a21 21 0 0 1-42 0Zm-6 2h6v10h-6Zm48 0h6v10h-6Z",
    tattoo: "M30 30h30v10a15 15 0 0 1-30 0Zm4 24h22v6H34Z",
    nails: "M38 24h14v22a7 7 0 0 1-14 0Zm0 26h14v10H38Z"
  };

  const CLASSIFY_ITEMS = [
    { glyph: "hair", label: "Hair tied back and off the collar", answer: "ok", note: "Appropriate. Hair is secured, out of the face, and will not contact a Pet or a sterile field." },
    { glyph: "fragrance", label: "Cologne applied heavily before a shift", answer: "improve", note: "Needs improvement. Strong fragrance can distress Pets and trigger reactions in Members. Hannah is fragrance-light." },
    { glyph: "jewelry", label: "Small, plain stud earrings", answer: "ok", note: "Appropriate. Studs sit flush, cannot be grabbed, and do not interfere with PPE." },
    { glyph: "jewelry", label: "Long dangling necklace worn over scrubs", answer: "improve", note: "Needs improvement. Dangling jewelry is a grab hazard around Pets and cannot be sanitized between rooms." },
    { glyph: "uniform", label: "Clean, pressed Hannah scrub jacket", answer: "ok", note: "Appropriate. The uniform is intact, clean, and clearly identifies you as a Hannah Team Member." },
    { glyph: "footwear", label: "Open-toe sandals in the treatment area", answer: "improve", note: "Needs improvement. Closed-toe shoes are required anywhere Pets, instruments, or fluids are handled." },
    { glyph: "makeup", label: "Neutral, natural makeup", answer: "ok", note: "Appropriate. Makeup is permitted when it reads as professional and understated." },
    { glyph: "ppe", label: "Facial jewelry that blocks a fitted mask seal", answer: "improve", note: "Needs improvement. Anything that breaks a mask seal fails the PPE compatibility standard." },
    { glyph: "tattoo", label: "Visible tattoo with non-offensive content", answer: "ok", note: "Appropriate. Visible tattoos are acceptable as long as the imagery and wording remain professional." },
    { glyph: "nails", label: "Long acrylic nails that prevent proper glove fit", answer: "improve", note: "Needs improvement. Nails must allow gloves to seat correctly and must not scratch a Pet." }
  ];

  function classifyIcon(glyph) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 90 90");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "45");
    circle.setAttribute("cy", "45");
    circle.setAttribute("r", "42");
    circle.setAttribute("class", "l4-classify-icon-bg");
    svg.appendChild(circle);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", CLASSIFY_GLYPHS[glyph] || CLASSIFY_GLYPHS.uniform);
    path.setAttribute("class", "l4-classify-icon-glyph");
    svg.appendChild(path);
    return svg;
  }

  document.querySelectorAll("[data-classify]").forEach((widget) => {
    const grid = widget.querySelector(".l4-classify-grid");
    const status = widget.querySelector(".l4-classify-status");
    const resetBtn = widget.querySelector(".l4-classify-reset");
    if (!grid) return;
    let answeredCount = 0;
    let correctCount = 0;

    function say() {
      if (!status) return;
      if (answeredCount === 0) {
        status.textContent = `Classify each of the ${CLASSIFY_ITEMS.length} appearance details below.`;
        status.classList.remove("correct", "wrong");
        return;
      }
      const done = answeredCount === CLASSIFY_ITEMS.length;
      status.textContent = done
        ? `${correctCount} of ${CLASSIFY_ITEMS.length} classified correctly. Read the notes on any you missed.`
        : `${answeredCount} of ${CLASSIFY_ITEMS.length} classified · ${correctCount} correct.`;
      status.classList.toggle("correct", done && correctCount === CLASSIFY_ITEMS.length);
      status.classList.remove("wrong");
    }

    function build() {
      grid.textContent = "";
      answeredCount = 0;
      correctCount = 0;
      shuffled(CLASSIFY_ITEMS).forEach((item) => {
        const card = document.createElement("article");
        card.className = "l4-classify-card";

        const icon = document.createElement("div");
        icon.className = "l4-classify-icon";
        icon.appendChild(classifyIcon(item.glyph));
        card.appendChild(icon);

        const label = document.createElement("p");
        label.className = "l4-classify-label";
        label.textContent = item.label;
        card.appendChild(label);

        const buttons = document.createElement("div");
        buttons.className = "l4-classify-buttons";
        const note = document.createElement("p");
        note.className = "l4-classify-note";

        [["ok", "Appropriate"], ["improve", "Needs improvement"]].forEach(([value, text]) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "l4-classify-choice";
          btn.textContent = text;
          btn.addEventListener("click", () => {
            if (card.classList.contains("answered")) return;
            const right = value === item.answer;
            card.classList.add("answered", right ? "correct" : "wrong");
            Array.from(buttons.children).forEach((b) => { b.disabled = true; });
            btn.classList.add(right ? "correct" : "wrong");
            note.textContent = item.note;
            note.classList.add("shown");
            answeredCount += 1;
            if (right) correctCount += 1;
            say();
          });
          buttons.appendChild(btn);
        });

        card.appendChild(buttons);
        card.appendChild(note);
        grid.appendChild(card);
      });
      say();
    }

    if (resetBtn) resetBtn.addEventListener("click", build);
    build();
  });

  // ---- Reflection ----
  document.querySelectorAll(".reflection-box textarea[data-reflection-key]").forEach((ta) => {
    const key = `${NS}.reflection.${ta.getAttribute("data-reflection-key")}`;
    ta.value = localStorage.getItem(key) || "";
  });
  const saveReflectionBtn = document.querySelector(".save-reflection");
  if (saveReflectionBtn) {
    saveReflectionBtn.addEventListener("click", () => {
      document.querySelectorAll(".reflection-box textarea[data-reflection-key]").forEach((ta) => {
        localStorage.setItem(`${NS}.reflection.${ta.getAttribute("data-reflection-key")}`, ta.value.trim());
      });
      const status = document.querySelector(".reflection-status");
      if (status) status.textContent = "Saved.";
    });
  }

  // ---- Final assessment ----
  const gradeBtn = document.getElementById("gradeAssessment");
  const assessmentResult = document.getElementById("assessmentResult");
  const signoffScore = document.getElementById("signoffScore");

  function gradeAssessment() {
    const questions = document.querySelectorAll("#finalAssessment .l3-quiz-question");
    let correct = 0;
    questions.forEach((q) => {
      const name = q.querySelector("input[type=radio]").name;
      const answer = q.getAttribute("data-answer");
      const selected = q.querySelector(`input[name="${name}"]:checked`);
      if (selected && selected.value === answer) correct += 1;
    });
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    const passed = pct >= PASS_MARK;
    if (assessmentResult) {
      assessmentResult.textContent = `Score: ${correct}/${total} (${pct}%) — ${passed ? "Passed" : `Not yet passing (${PASS_MARK}% required)`}`;
      assessmentResult.classList.toggle("pass", passed);
      assessmentResult.classList.toggle("fail", !passed);
    }
    localStorage.setItem(`${NS}.assessment.score`, `${correct}/${total}`);
    localStorage.setItem(`${NS}.assessment.passed`, String(passed));
    if (signoffScore) signoffScore.value = `${correct}/${total} (${pct}%)`;
    return passed;
  }

  if (gradeBtn) gradeBtn.addEventListener("click", gradeAssessment);

  // Restore prior assessment score into sign-off field on load
  (() => {
    const savedScore = localStorage.getItem(`${NS}.assessment.score`);
    if (savedScore && signoffScore) {
      const passed = localStorage.getItem(`${NS}.assessment.passed`) === "true";
      signoffScore.value = savedScore + (passed ? " (Passed)" : "");
    }
  })();

  // ---- Facilitator sign-off ----
  const learnerName = document.getElementById("learnerName");
  const facilitatorName = document.getElementById("facilitatorName");
  const signoffDate = document.getElementById("signoffDate");
  const saveSignoffBtn = document.getElementById("saveSignoff");
  const signoffStatus = document.getElementById("signoffStatus");
  const signChecks = document.querySelectorAll(".sign-check");

  if (learnerName) learnerName.value = localStorage.getItem(`${NS}.signoff.learner`) || "";
  if (facilitatorName) facilitatorName.value = localStorage.getItem(`${NS}.signoff.facilitator`) || "";
  if (signoffDate) signoffDate.value = localStorage.getItem(`${NS}.signoff.date`) || "";
  signChecks.forEach((box, i) => {
    box.checked = localStorage.getItem(`${NS}.signoff.check.${i}`) === "true";
  });

  if (saveSignoffBtn) {
    saveSignoffBtn.addEventListener("click", () => {
      const allChecked = Array.from(signChecks).every((box) => box.checked);
      const passed = localStorage.getItem(`${NS}.assessment.passed`) === "true";
      if (!passed) {
        if (signoffStatus) { signoffStatus.textContent = `The learner must pass the final assessment (${PASS_MARK}% or higher) before sign-off.`; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
        return;
      }
      if (!allChecked) {
        if (signoffStatus) { signoffStatus.textContent = "All checklist items must be confirmed before saving sign-off."; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
        return;
      }
      if (!learnerName.value.trim() || !facilitatorName.value.trim() || !signoffDate.value) {
        if (signoffStatus) { signoffStatus.textContent = "Learner signature, facilitator signature, and date are required."; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
        return;
      }
      localStorage.setItem(`${NS}.signoff.learner`, learnerName.value.trim());
      localStorage.setItem(`${NS}.signoff.facilitator`, facilitatorName.value.trim());
      localStorage.setItem(`${NS}.signoff.date`, signoffDate.value);
      signChecks.forEach((box, i) => localStorage.setItem(`${NS}.signoff.check.${i}`, String(box.checked)));
      localStorage.setItem(`${NS}.signoff.complete`, "true");
      if (signoffStatus) { signoffStatus.textContent = `Sign-off saved for ${learnerName.value.trim()}.`; signoffStatus.classList.remove("fail"); signoffStatus.classList.add("pass"); }
    });
  }

  // ---- Mark complete ----
  const completeBtn = document.getElementById("completeLesson");
  const completeStatus = document.getElementById("completeStatus");

  function refreshCompleteStatus() {
    if (localStorage.getItem(`${NS}.complete`) === "true" && completeStatus) {
      completeStatus.textContent = "Lesson marked complete.";
      completeStatus.classList.add("pass");
    }
  }
  refreshCompleteStatus();

  if (completeBtn) {
    completeBtn.addEventListener("click", () => {
      const passed = localStorage.getItem(`${NS}.assessment.passed`) === "true";
      const signedOff = localStorage.getItem(`${NS}.signoff.complete`) === "true";
      if (!passed || !signedOff) {
        if (completeStatus) {
          completeStatus.textContent = `Complete the final assessment (${PASS_MARK}%+) and facilitator sign-off first.`;
          completeStatus.classList.remove("pass");
          completeStatus.classList.add("fail");
        }
        return;
      }
      localStorage.setItem(`${NS}.complete`, "true");
      if (completeStatus) {
        completeStatus.textContent = "Lesson marked complete.";
        completeStatus.classList.remove("fail");
        completeStatus.classList.add("pass");
      }
    });
  }
})();
