(() => {
  "use strict";

  const left = document.getElementById("pageLeft");
  const right = document.getElementById("pageRight");
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");
  const pageStatus = document.getElementById("pageStatus");
  const progressBar = document.getElementById("progressBar");
  const turnOverlay = document.getElementById("turnOverlay");
  const contentsPanel = document.getElementById("contentsPanel");
  const contentsButton = document.getElementById("contentsButton");
  const closeContentsButton = document.getElementById("closeContentsButton");
  const contentsList = document.getElementById("contentsList");
  const scrim = document.getElementById("scrim");
  const bookmarkButton = document.getElementById("bookmarkButton");
  const printButton = document.getElementById("printButton");
  const textSizeButton = document.getElementById("textSizeButton");
  const narratorButton = document.getElementById("narratorButton");
  const printEdition = document.getElementById("printEdition");

  const synth = window.speechSynthesis;
  const narratorSupported = !!synth && typeof window.SpeechSynthesisUtterance === "function";
  let narratorEnabled = false;
  let narratorSpeaking = false;

  const mobileQuery = window.matchMedia("(max-width: 760px)");
  const NS = "hls.lesson2";
  const STORAGE = {
    position: `${NS}.position`,
    bookmark: `${NS}.bookmark`,
    fontScale: `${NS}.fontScale`,
    cooperScore: `${NS}.cooperScore`,
    attempt: `${NS}.assessment.attempt`,
    passed: `${NS}.assessment.passed`,
    lastScore: `${NS}.assessment.lastScore`,
    complete: `${NS}.complete`,
    completeDate: `${NS}.completeDate`
  };

  const ASSESSMENT_LENGTH = 30;
  const PASS_RATIO = 0.9;

  let spreadIndex = Number.parseInt(localStorage.getItem(STORAGE.position) || "0", 10);
  if (!Number.isFinite(spreadIndex)) spreadIndex = 0;
  let fontScaleIndex = Number.parseInt(localStorage.getItem(STORAGE.fontScale) || "0", 10);
  const fontScales = [1, 1.12, 1.24];

  function pagesPerView() { return mobileQuery.matches ? 1 : 2; }
  function maxIndex() { return Math.max(0, BOOK_PAGES.length - pagesPerView()); }
  function clampIndex(index) { return Math.min(Math.max(index, 0), maxIndex()); }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (error) { return fallback; }
  }
  function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[ch]);
  }

  // Detail panels are looked up inside the owning page first so two widgets of the
  // same family can safely appear on the left and right halves of one spread.
  function detailTarget(node, id) {
    const scope = node.closest(".page, .print-page");
    return (scope && scope.querySelector(`#${id}`)) || document.getElementById(id);
  }

  function renderPage(element, page, pageNumber) {
    if (!page) {
      element.innerHTML = "";
      element.removeAttribute("data-template");
      element.removeAttribute("data-page-number");
      element.removeAttribute("data-page-id");
      return;
    }
    element.innerHTML = page.html;
    element.dataset.template = page.template;
    element.dataset.pageNumber = String(pageNumber);
    element.dataset.pageId = page.id;
    element.setAttribute("aria-label", `${page.label}, page ${pageNumber}`);
    element.scrollTop = 0;
  }

  function extractNarrationText(root) {
    if (!root) return "";
    const skipTags = new Set(["BUTTON", "INPUT", "TEXTAREA", "SELECT", "IFRAME", "AUDIO", "VIDEO", "PROGRESS", "SCRIPT", "STYLE"]);
    const breakTags = new Set(["P", "H1", "H2", "H3", "LI", "BLOCKQUOTE", "DIV", "BR", "LEGEND"]);
    let text = "";
    (function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) { text += node.textContent; return; }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (skipTags.has(node.tagName)) return;
      if (node.hidden) return;
      node.childNodes.forEach(walk);
      if (breakTags.has(node.tagName)) text += ". ";
    })(root);
    return text.replace(/\s+/g, " ").replace(/(\.\s*){2,}/g, ". ").trim();
  }

  function updateNarratorButton() {
    if (!narratorButton) return;
    narratorButton.setAttribute("aria-pressed", String(narratorEnabled));
    narratorButton.textContent = narratorSpeaking
      ? "🔊 Narrator: Reading…"
      : narratorEnabled
        ? "🔊 Narrator: On"
        : "🔊 Narrator: Off";
  }

  function stopNarration() {
    if (narratorSupported && (synth.speaking || synth.pending)) synth.cancel();
    narratorSpeaking = false;
    updateNarratorButton();
  }

  function speakVisiblePages() {
    if (!narratorSupported || !narratorEnabled) return;
    synth.cancel();
    const text = [left, right]
      .filter(el => el && el.dataset.pageId)
      .map(el => extractNarrationText(el))
      .filter(Boolean)
      .join(". ");
    if (!text) { narratorSpeaking = false; updateNarratorButton(); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.15;
    utterance.onstart = () => { narratorSpeaking = true; updateNarratorButton(); };
    utterance.onend = () => { narratorSpeaking = false; updateNarratorButton(); };
    utterance.onerror = () => { narratorSpeaking = false; updateNarratorButton(); };
    synth.speak(utterance);
  }

  function toggleNarrator() {
    if (!narratorSupported) return;
    narratorEnabled = !narratorEnabled;
    if (narratorEnabled) speakVisiblePages();
    else stopNarration();
    updateNarratorButton();
  }

  /* ---------------------------------------------------------------- *
   * Reusable behaviours carried over from Lesson 1
   * ---------------------------------------------------------------- */
  function bindReflections() {
    document.querySelectorAll("textarea[data-reflection-key]").forEach(textarea => {
      const key = `${NS}.reflection.${textarea.dataset.reflectionKey}`;
      textarea.value = localStorage.getItem(key) || "";
      const scope = textarea.parentElement;
      const button = scope.querySelector(".save-reflection");
      const status = scope.querySelector(".reflection-status");
      if (button && status) button.addEventListener("click", () => {
        localStorage.setItem(key, textarea.value.trim());
        status.textContent = "Saved.";
        window.setTimeout(() => { status.textContent = ""; }, 1800);
      });
    });
  }

  function bindRevealWidgets() {
    const families = [
      [".principles-wheel button", "principleDetail"],
      [".decision-map button", "decisionDetail"],
      [".learning-cycle button", "cycleDetail"],
      [".scenario-steps button", "scenarioDetail"]
    ];
    families.forEach(([selector, targetId]) => {
      document.querySelectorAll(selector).forEach(button => button.addEventListener("click", () => {
        const target = detailTarget(button, targetId);
        if (target) target.textContent = button.dataset.detail || "";
        const group = button.parentElement;
        if (group) group.querySelectorAll("button").forEach(item => item.classList.remove("selected"));
        button.classList.add("selected");
      }));
    });
  }

  function bindSequenceActivities() {
    document.querySelectorAll(".sequence-activity").forEach(activity => {
      const expected = (activity.dataset.sequence || "").split(",");
      const selected = [];
      activity.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
        const step = button.dataset.step;
        if (selected.includes(step)) return;
        if (step === expected[selected.length]) {
          selected.push(step);
          button.classList.add("selected");
          const status = activity.nextElementSibling;
          if (status) status.textContent = selected.join(" → ") + (selected.length === expected.length ? " ✓" : "");
        } else {
          activity.classList.add("needs-reset");
          window.setTimeout(() => activity.classList.remove("needs-reset"), 450);
        }
      }));
    });
  }

  function bindStorageGroups() {
    document.querySelectorAll("[data-storage-group]").forEach(group => {
      const groupKey = `${NS}.choice.${group.dataset.storageGroup}`;
      group.querySelectorAll('input[type="radio"]').forEach(input => {
        if (localStorage.getItem(`${groupKey}.${input.name}`) === input.value) input.checked = true;
        input.addEventListener("change", () => localStorage.setItem(`${groupKey}.${input.name}`, input.value));
      });
    });
  }

  function bindFlipCards() {
    document.querySelectorAll(".flip-card").forEach(card => card.addEventListener("click", () => {
      const flipped = card.classList.toggle("flipped");
      const span = card.querySelector("span");
      if (span) span.textContent = flipped ? card.dataset.back : card.dataset.front;
    }));
  }

  function bindChecklists() {
    document.querySelectorAll("[data-checklist]").forEach(list => {
      const keyBase = `${NS}.checklist.${list.dataset.checklist}`;
      const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
      const scope = list.closest(".page, .print-page") || document;
      const countEl = scope.querySelector("#challengeCount");
      const progress = scope.querySelector("#challengeProgress");
      const update = () => {
        const count = boxes.filter(box => box.checked).length;
        if (countEl) countEl.textContent = `${count} of ${boxes.length} complete`;
        if (progress) progress.value = count;
        updateSignOffGate();
      };
      boxes.forEach(box => {
        box.checked = localStorage.getItem(`${keyBase}.${box.value}`) === "true";
        box.addEventListener("change", () => {
          localStorage.setItem(`${keyBase}.${box.value}`, String(box.checked));
          update();
        });
      });
      update();
    });
  }

  /* ---------------------------------------------------------------- *
   * NEW: graded knowledge checks
   * ---------------------------------------------------------------- */
  function bindKnowledgeChecks() {
    document.querySelectorAll(".knowledge-check").forEach(check => {
      const key = `${NS}.check.${check.dataset.check}`;
      const choices = [...check.querySelectorAll(".quiz-choice")];
      const result = check.querySelector(".kc-result");
      const reveal = index => {
        const choice = choices[index];
        if (!choice) return;
        const correct = choice.dataset.correct === "true";
        choices.forEach(item => item.classList.remove("chosen", "wrong", "right"));
        choice.classList.add("chosen", correct ? "right" : "wrong");
        choices.forEach(item => {
          if (item.dataset.correct === "true") item.classList.add("right");
        });
        if (result) {
          result.className = `kc-result ${correct ? "is-correct" : "is-incorrect"}`;
          result.textContent = `${correct ? "✓ Correct." : "✗ Not quite."} ${choice.dataset.explain || ""}`.trim();
        }
      };
      choices.forEach((choice, index) => choice.addEventListener("click", () => {
        localStorage.setItem(key, String(index));
        reveal(index);
      }));
      const saved = Number.parseInt(localStorage.getItem(key) || "-1", 10);
      if (saved >= 0) reveal(saved);
    });
  }

  /* ---------------------------------------------------------------- *
   * NEW: click-to-place sorter (deliberately not HTML5 drag-and-drop)
   * ---------------------------------------------------------------- */
  function bindSorters() {
    document.querySelectorAll(".sorter").forEach(sorter => {
      const key = `${NS}.sorter.${sorter.dataset.sorter}`;
      const pool = sorter.querySelector(".sort-chips");
      const buckets = [...sorter.querySelectorAll(".sort-bucket")];
      const status = sorter.querySelector(".sort-status");
      const chips = [...sorter.querySelectorAll(".sort-chip")];
      const placements = readJson(key, {});
      let active = null;

      const update = () => {
        const placed = chips.filter(chip => placements[chip.dataset.chip]);
        const correct = placed.filter(chip => placements[chip.dataset.chip] === chip.dataset.category);
        if (status) {
          status.textContent = placed.length === chips.length
            ? `All ${chips.length} placed · ${correct.length} correct${correct.length === chips.length ? " ✓" : " — tap a red chip to try it again"}`
            : `${placed.length} of ${chips.length} placed · ${correct.length} correct so far`;
        }
      };

      const place = (chip, bucketName) => {
        const bucket = buckets.find(item => item.dataset.bucket === bucketName);
        if (!bucket) return;
        const target = bucket.querySelector(".bucket-items") || bucket;
        placements[chip.dataset.chip] = bucketName;
        writeJson(key, placements);
        chip.classList.remove("selected");
        chip.classList.add("placed");
        chip.classList.toggle("is-correct", bucketName === chip.dataset.category);
        chip.classList.toggle("is-wrong", bucketName !== chip.dataset.category);
        target.append(chip);
        update();
      };

      const reset = chip => {
        delete placements[chip.dataset.chip];
        writeJson(key, placements);
        chip.classList.remove("placed", "is-correct", "is-wrong");
        if (pool) pool.append(chip);
        update();
      };

      chips.forEach(chip => chip.addEventListener("click", () => {
        if (chip.classList.contains("placed")) {
          if (chip.classList.contains("is-wrong")) reset(chip);
          return;
        }
        if (active === chip) { chip.classList.remove("selected"); active = null; return; }
        chips.forEach(item => item.classList.remove("selected"));
        chip.classList.add("selected");
        active = chip;
      }));

      buckets.forEach(bucket => bucket.addEventListener("click", event => {
        if (!active) {
          // A tap on an already-placed chip is handled by the chip's own listener.
          if (event.target.closest(".sort-chip")) return;
          if (status) status.textContent = "Pick a characteristic first, then tap the column it belongs in.";
          return;
        }
        place(active, bucket.dataset.bucket);
        active = null;
      }));

      buckets.forEach(bucket => bucket.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        bucket.click();
      }));

      chips.forEach(chip => {
        const saved = placements[chip.dataset.chip];
        if (saved) place(chip, saved);
      });
      update();
    });
  }

  /* ---------------------------------------------------------------- *
   * NEW: branching story engine — Cooper's Hannah Journey
   * ---------------------------------------------------------------- */
  function cooperTotal(scores) {
    return Object.values(scores).reduce((sum, value) => sum + (Number(value) || 0), 0);
  }

  function bindStory() {
    const scores = readJson(STORAGE.cooperScore, {});

    document.querySelectorAll(".story-choice").forEach(widget => {
      const id = widget.dataset.story;
      const options = [...widget.querySelectorAll(".story-option")];
      const feedback = widget.querySelector(".story-feedback");
      const reveal = index => {
        const option = options[index];
        if (!option) return;
        options.forEach(item => item.classList.remove("chosen"));
        option.classList.add("chosen");
        option.classList.toggle("preventive", option.dataset.points === "2");
        if (feedback) feedback.textContent = option.dataset.feedback || "";
      };
      options.forEach((option, index) => option.addEventListener("click", () => {
        scores[id] = Number(option.dataset.points) || 0;
        localStorage.setItem(`${NS}.story.${id}`, String(index));
        writeJson(STORAGE.cooperScore, scores);
        reveal(index);
        paintStoryMeters();
      }));
      const saved = Number.parseInt(localStorage.getItem(`${NS}.story.${id}`) || "-1", 10);
      if (saved >= 0) reveal(saved);
    });

    document.querySelectorAll(".story-reset").forEach(button => button.addEventListener("click", () => {
      Object.keys(localStorage)
        .filter(storageKey => storageKey.startsWith(`${NS}.story.`))
        .forEach(storageKey => localStorage.removeItem(storageKey));
      localStorage.removeItem(STORAGE.cooperScore);
      render();
    }));

    paintStoryMeters();
  }

  function paintStoryMeters() {
    const scores = readJson(STORAGE.cooperScore, {});
    const total = cooperTotal(scores);

    document.querySelectorAll(".story-meter").forEach(meter => {
      const max = Number(meter.dataset.max) || 0;
      meter.textContent = `Cooper's wellbeing score: ${total}${max ? ` of ${max}` : ""}`;
    });

    document.querySelectorAll(".story-outcome").forEach(outcome => {
      const max = Number(outcome.dataset.max) || 0;
      const scoreLine = outcome.querySelector(".outcome-score");
      if (scoreLine) {
        scoreLine.textContent = `Cooper's wellbeing score: ${total} of ${max}`;
      }
      const tiers = [...outcome.querySelectorAll(".outcome-tier")];
      let shown = false;
      tiers.forEach(tier => {
        const min = Number(tier.dataset.min) || 0;
        const match = !shown && total >= min;
        tier.hidden = !match;
        if (match) shown = true;
      });
      if (!shown && tiers.length) tiers[tiers.length - 1].hidden = false;
    });
  }

  /* ---------------------------------------------------------------- *
   * NEW: final assessment engine
   * ---------------------------------------------------------------- */
  function questionById(id) {
    return ASSESSMENT_QUESTIONS.find(question => question.id === id);
  }

  function optionsFor(question) {
    if (question.type === "truefalse") return ["True", "False"];
    return question.options || [];
  }

  function buildAttempt() {
    const picked = shuffle(ASSESSMENT_QUESTIONS).slice(0, Math.min(ASSESSMENT_LENGTH, ASSESSMENT_QUESTIONS.length));
    return {
      questions: picked.map(question => {
        const entry = { id: question.id };
        if (question.type === "matching") {
          entry.terms = shuffle(question.pairs.map(pair => pair.term));
          entry.choices = shuffle(question.pairs.map(pair => pair.definition));
        } else if (question.type === "ordering") {
          entry.steps = shuffle(question.sequence);
        } else {
          entry.opts = shuffle(optionsFor(question));
        }
        return entry;
      }),
      answers: {},
      submitted: false,
      score: null
    };
  }

  function answeredCount(attempt) {
    return attempt.questions.filter(entry => {
      const answer = attempt.answers[entry.id];
      const question = questionById(entry.id);
      if (!question || answer == null) return false;
      if (question.type === "ordering") return Array.isArray(answer) && answer.length === question.sequence.length;
      if (question.type === "matching") return question.pairs.every(pair => answer[pair.term]);
      return typeof answer === "string" && answer.length > 0;
    }).length;
  }

  function isCorrect(question, answer) {
    if (answer == null) return false;
    if (question.type === "ordering") {
      return Array.isArray(answer)
        && answer.length === question.sequence.length
        && question.sequence.every((step, index) => answer[index] === step);
    }
    if (question.type === "matching") {
      return question.pairs.every(pair => answer[pair.term] === pair.definition);
    }
    return answer === question.answer;
  }

  function answerLabel(question, answer) {
    if (answer == null) return "No answer given";
    if (question.type === "ordering") {
      return Array.isArray(answer) && answer.length ? answer.join(" → ") : "No answer given";
    }
    if (question.type === "matching") {
      const lines = question.pairs.map(pair => `${pair.term} → ${answer[pair.term] || "—"}`);
      return lines.join("; ");
    }
    return answer;
  }

  function correctLabel(question) {
    if (question.type === "ordering") return question.sequence.join(" → ");
    if (question.type === "matching") return question.pairs.map(pair => `${pair.term} → ${pair.definition}`).join("; ");
    return question.answer;
  }

  const TYPE_LABEL = {
    mc: "Multiple choice",
    truefalse: "True or false",
    scenario: "Scenario",
    ordering: "Put in order",
    matching: "Matching"
  };

  function questionMarkup(entry, index, attempt) {
    const question = questionById(entry.id);
    if (!question) return "";
    const answer = attempt.answers[entry.id];
    const head = `<p class="assess-q-head"><span class="assess-q-number">Question ${index + 1}</span>
      <span class="assess-q-type">${escapeHtml(TYPE_LABEL[question.type] || question.type)}</span></p>
      <p class="assess-q-prompt">${escapeHtml(question.prompt)}</p>`;

    if (question.type === "ordering") {
      const picked = Array.isArray(answer) ? answer : [];
      const pool = entry.steps
        .filter(step => !picked.includes(step))
        .map(step => `<button type="button" class="order-step" data-step="${escapeHtml(step)}">${escapeHtml(step)}</button>`)
        .join("");
      const chosen = picked
        .map((step, position) => `<li><span class="order-rank">${position + 1}</span>${escapeHtml(step)}</li>`)
        .join("");
      return `<li class="assess-q" data-qid="${escapeHtml(entry.id)}">${head}
        <ol class="order-picked">${chosen}</ol>
        <div class="order-pool">${pool}</div>
        <button type="button" class="secondary-button order-clear">Clear order</button></li>`;
    }

    if (question.type === "matching") {
      const rows = entry.terms.map(term => {
        const selected = answer ? answer[term] : "";
        const options = entry.choices
          .map(choice => `<option value="${escapeHtml(choice)}"${choice === selected ? " selected" : ""}>${escapeHtml(choice)}</option>`)
          .join("");
        return `<label class="match-row"><span class="match-term">${escapeHtml(term)}</span>
          <select class="match-select" data-term="${escapeHtml(term)}">
            <option value="">Choose…</option>${options}
          </select></label>`;
      }).join("");
      return `<li class="assess-q" data-qid="${escapeHtml(entry.id)}">${head}<div class="match-grid">${rows}</div></li>`;
    }

    const choices = entry.opts.map(option => `<button type="button" class="assess-choice${option === answer ? " chosen" : ""}" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("");
    return `<li class="assess-q" data-qid="${escapeHtml(entry.id)}">${head}<div class="assess-choices">${choices}</div></li>`;
  }

  function resultsMarkup(attempt) {
    const total = attempt.questions.length;
    const score = attempt.score;
    const percent = Math.round((score / total) * 100);
    const passed = score >= Math.ceil(total * PASS_RATIO);
    const rows = attempt.questions.map((entry, index) => {
      const question = questionById(entry.id);
      if (!question) return "";
      const answer = attempt.answers[entry.id];
      const right = isCorrect(question, answer);
      return `<li class="review-item ${right ? "was-right" : "was-wrong"}">
        <p class="review-head"><span class="review-badge">${right ? "✓" : "✗"}</span> Question ${index + 1} · ${escapeHtml(TYPE_LABEL[question.type] || question.type)}</p>
        <p class="review-prompt">${escapeHtml(question.prompt)}</p>
        <p class="review-line"><strong>Your answer:</strong> ${escapeHtml(answerLabel(question, answer))}</p>
        <p class="review-line"><strong>Correct answer:</strong> ${escapeHtml(correctLabel(question))}</p>
        <p class="review-why">${escapeHtml(question.explanation)}</p>
      </li>`;
    }).join("");

    return `<div class="assess-scorecard ${passed ? "did-pass" : "did-fail"}">
        <p class="assess-score">${score} of ${total} correct · ${percent}%</p>
        <p class="assess-verdict">${passed
          ? "Passed — you met the 90% standard. Take this result to your facilitator for sign-off."
          : "Not yet at 90%. Review the explanations below, then retake the assessment when you are ready."}</p>
      </div>
      <ol class="review-list">${rows}</ol>`;
  }

  function bindAssessment() {
    const host = document.getElementById("assessment");
    if (!host) return;

    const intro = host.querySelector("#assessIntro");
    const body = host.querySelector("#assessBody");
    const actions = host.querySelector("#assessActions");
    const results = host.querySelector("#assessResults");
    const progress = host.querySelector("#assessProgress");
    const startButton = host.querySelector("#startAssessment");
    const submitButton = host.querySelector("#submitAssessment");
    const retakeButton = host.querySelector("#retakeAssessment");
    const lastResult = host.querySelector("#assessLastResult");
    const bankSize = host.querySelector("#assessBankSize");

    if (bankSize) bankSize.textContent = String(ASSESSMENT_QUESTIONS.length);

    let attempt = readJson(STORAGE.attempt, null);

    const save = () => writeJson(STORAGE.attempt, attempt);

    const paintLastResult = () => {
      if (!lastResult) return;
      const score = localStorage.getItem(STORAGE.lastScore);
      if (!score) { lastResult.textContent = ""; return; }
      const passed = localStorage.getItem(STORAGE.passed) === "true";
      lastResult.textContent = `Most recent attempt: ${score} — ${passed ? "passed" : "not yet passed"}.`;
    };

    const paintProgress = () => {
      if (!progress || !attempt) return;
      const done = answeredCount(attempt);
      progress.textContent = `${done} of ${attempt.questions.length} answered`;
    };

    const paint = () => {
      if (!attempt) {
        if (intro) intro.hidden = false;
        if (body) { body.hidden = true; body.innerHTML = ""; }
        if (actions) actions.hidden = true;
        if (results) { results.hidden = true; results.innerHTML = ""; }
        if (retakeButton) retakeButton.hidden = true;
        paintLastResult();
        return;
      }
      if (intro) intro.hidden = true;
      if (attempt.submitted) {
        if (body) { body.hidden = true; body.innerHTML = ""; }
        if (actions) actions.hidden = true;
        if (results) { results.hidden = false; results.innerHTML = resultsMarkup(attempt); }
        if (retakeButton) retakeButton.hidden = false;
        return;
      }
      if (results) { results.hidden = true; results.innerHTML = ""; }
      if (retakeButton) retakeButton.hidden = false;
      if (body) {
        body.hidden = false;
        body.innerHTML = `<ol class="assess-list">${attempt.questions.map((entry, index) => questionMarkup(entry, index, attempt)).join("")}</ol>`;
      }
      if (actions) actions.hidden = false;
      paintProgress();
      wireQuestions();
    };

    function wireQuestions() {
      if (!body) return;
      body.querySelectorAll(".assess-q").forEach(item => {
        const id = item.dataset.qid;
        const question = questionById(id);
        if (!question) return;

        item.querySelectorAll(".assess-choice").forEach(choice => choice.addEventListener("click", () => {
          attempt.answers[id] = choice.dataset.value;
          item.querySelectorAll(".assess-choice").forEach(other => other.classList.remove("chosen"));
          choice.classList.add("chosen");
          save();
          paintProgress();
        }));

        item.querySelectorAll(".match-select").forEach(select => select.addEventListener("change", () => {
          const current = attempt.answers[id] && typeof attempt.answers[id] === "object" ? attempt.answers[id] : {};
          if (select.value) current[select.dataset.term] = select.value;
          else delete current[select.dataset.term];
          attempt.answers[id] = current;
          save();
          paintProgress();
        }));

        item.querySelectorAll(".order-step").forEach(step => step.addEventListener("click", () => {
          const current = Array.isArray(attempt.answers[id]) ? attempt.answers[id] : [];
          if (current.includes(step.dataset.step)) return;
          current.push(step.dataset.step);
          attempt.answers[id] = current;
          save();
          repaintOrdering(item, id);
        }));

        const clear = item.querySelector(".order-clear");
        if (clear) clear.addEventListener("click", () => {
          attempt.answers[id] = [];
          save();
          repaintOrdering(item, id);
        });
      });
    }

    function repaintOrdering(item, id) {
      const entry = attempt.questions.find(candidate => candidate.id === id);
      const index = attempt.questions.indexOf(entry);
      const replacement = document.createElement("div");
      replacement.innerHTML = questionMarkup(entry, index, attempt);
      const fresh = replacement.firstElementChild;
      item.replaceWith(fresh);
      wireQuestions();
      paintProgress();
    }

    if (startButton) startButton.addEventListener("click", () => {
      attempt = buildAttempt();
      save();
      paint();
    });

    if (submitButton) submitButton.addEventListener("click", () => {
      if (!attempt) return;
      const unanswered = attempt.questions.length - answeredCount(attempt);
      if (unanswered > 0 && !window.confirm(`${unanswered} question${unanswered === 1 ? " is" : "s are"} still unanswered and will be marked incorrect. Submit anyway?`)) return;
      attempt.score = attempt.questions.reduce((sum, entry) => {
        const question = questionById(entry.id);
        return sum + (question && isCorrect(question, attempt.answers[entry.id]) ? 1 : 0);
      }, 0);
      attempt.submitted = true;
      save();
      const total = attempt.questions.length;
      const passed = attempt.score >= Math.ceil(total * PASS_RATIO);
      localStorage.setItem(STORAGE.passed, String(passed));
      localStorage.setItem(STORAGE.lastScore, `${attempt.score}/${total}`);
      paint();
      updateSignOffGate();
    });

    if (retakeButton) retakeButton.addEventListener("click", () => {
      attempt = buildAttempt();
      save();
      paint();
    });

    paint();
  }

  /* ---------------------------------------------------------------- *
   * NEW: facilitator sign-off
   * ---------------------------------------------------------------- */
  function signOffChecklistComplete() {
    const list = document.querySelector('[data-checklist="signoff"]');
    if (!list) return false;
    const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
    return boxes.length > 0 && boxes.every(box => box.checked);
  }

  function updateSignOffGate() {
    const button = document.getElementById("confirmSignoff");
    const statusLine = document.getElementById("signoffAssessmentStatus");
    const passed = localStorage.getItem(STORAGE.passed) === "true";
    const score = localStorage.getItem(STORAGE.lastScore);

    if (statusLine) {
      statusLine.className = `assessment-status ${passed ? "is-pass" : "is-pending"}`;
      statusLine.textContent = passed
        ? `Final Assessment: passed${score ? ` (${score})` : ""} ✓`
        : score
          ? `Final Assessment: not yet passed (${score}). A score of 27 of 30 or better is required.`
          : "Final Assessment: not yet attempted. The learner must pass before sign-off.";
    }

    if (!button) return;
    const ready = passed && signOffChecklistComplete();
    button.disabled = !ready;
    const hint = document.getElementById("signoffHint");
    if (hint) {
      hint.textContent = ready
        ? "All requirements met — you may confirm sign-off."
        : "Sign-off unlocks once all five items are checked and the Final Assessment is passed.";
    }
  }

  function bindSignOff() {
    const nameInput = document.querySelector('[data-signoff="name"]');
    const dateInput = document.querySelector('[data-signoff="date"]');
    if (nameInput) {
      nameInput.value = localStorage.getItem(`${NS}.signoff.name`) || "";
      nameInput.addEventListener("input", () => localStorage.setItem(`${NS}.signoff.name`, nameInput.value));
    }
    if (dateInput) {
      dateInput.value = localStorage.getItem(`${NS}.signoff.date`) || "";
      dateInput.addEventListener("change", () => localStorage.setItem(`${NS}.signoff.date`, dateInput.value));
    }

    const status = document.getElementById("signoffStatus");
    const confirm = document.getElementById("confirmSignoff");

    const paintConfirmed = () => {
      if (!status) return;
      if (localStorage.getItem(STORAGE.complete) !== "true") { status.textContent = ""; return; }
      const name = localStorage.getItem(`${NS}.signoff.name`) || "Facilitator";
      const date = localStorage.getItem(`${NS}.signoff.date`) || localStorage.getItem(STORAGE.completeDate) || "";
      status.textContent = `Signed off by ${name}${date ? ` on ${date}` : ""} ✓`;
    };

    if (confirm) confirm.addEventListener("click", () => {
      localStorage.setItem(STORAGE.complete, "true");
      if (!localStorage.getItem(STORAGE.completeDate)) {
        localStorage.setItem(STORAGE.completeDate, new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
      }
      paintConfirmed();
    });

    paintConfirmed();
    updateSignOffGate();
  }

  /* ---------------------------------------------------------------- *
   * Closing / graduation page
   * ---------------------------------------------------------------- */
  function celebrate(stage, audio) {
    if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.innerHTML = "";
      const symbols = ["●", "◆", "♥", "★", "🐾"];
      for (let i = 0; i < 72; i += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.color = ["#003b5c", "#ef7622", "#ffffff", "#00a3e0", "#93b52b"][i % 5];
        piece.style.setProperty("--duration", `${3.4 + Math.random() * 2.1}s`);
        piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
        piece.style.setProperty("--spin", `${360 + Math.random() * 900}deg`);
        piece.style.setProperty("--size", `${9 + Math.random() * 13}px`);
        piece.style.animationDelay = `${Math.random() * 0.8}s`;
        stage.append(piece);
      }
      window.setTimeout(() => { stage.innerHTML = ""; }, 6500);
    }
    if (audio && !audio.muted) { audio.currentTime = 0; audio.play().catch(() => {}); }
  }

  function bindGraduation() {
    const complete = document.getElementById("completeLessonButton");
    const completeStatus = document.getElementById("completeStatus");
    if (!complete || !completeStatus) return;

    const audio = document.getElementById("celebrationAudio");
    const replay = document.getElementById("replayCelebration");
    const music = document.getElementById("toggleMusic");
    const date = document.getElementById("completionDate");
    const stage = document.getElementById("confettiStage");
    const badge = document.getElementById("completionBadge");

    const savedDate = localStorage.getItem(STORAGE.completeDate);
    if (date && savedDate) date.textContent = `Completed ${savedDate}`;

    const paint = () => {
      const done = localStorage.getItem(STORAGE.complete) === "true";
      completeStatus.textContent = done
        ? "Lesson 2 completed ✓"
        : "Complete the Final Assessment and facilitator sign-off to finish Lesson 2.";
      if (replay) replay.hidden = !done;
      if (badge) badge.hidden = !done;
    };

    complete.addEventListener("click", () => {
      if (localStorage.getItem(STORAGE.passed) !== "true") {
        completeStatus.textContent = "Pass the Final Assessment first, then return here.";
        return;
      }
      if (localStorage.getItem(STORAGE.complete) !== "true") {
        completeStatus.textContent = "Ask your facilitator to confirm sign-off on the previous page first.";
        return;
      }
      const completed = localStorage.getItem(STORAGE.completeDate)
        || new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      localStorage.setItem(STORAGE.completeDate, completed);
      if (date) date.textContent = `Completed ${completed}`;
      paint();
      celebrate(stage, audio);
    });

    if (replay) replay.addEventListener("click", () => celebrate(stage, audio));
    if (music && audio) music.addEventListener("click", () => {
      audio.muted = !audio.muted;
      music.setAttribute("aria-pressed", String(audio.muted));
      music.textContent = audio.muted ? "Music: Off" : "Music: On";
    });

    paint();
    if (localStorage.getItem(STORAGE.complete) === "true") celebrate(stage, audio);
  }

  function bindDynamicControls() {
    bindReflections();
    bindRevealWidgets();
    bindSequenceActivities();
    bindStorageGroups();
    bindFlipCards();
    bindKnowledgeChecks();
    bindSorters();
    bindStory();
    bindAssessment();
    bindChecklists();
    bindSignOff();
    bindGraduation();

    const restartButton = document.getElementById("restartButton");
    if (restartButton) restartButton.addEventListener("click", () => goTo(0, "prev"));
    document.querySelectorAll("[data-goto]").forEach(button => button.addEventListener("click", () => {
      const index = BOOK_PAGES.findIndex(page => page.id === button.dataset.goto);
      if (index >= 0) goTo(index, index >= spreadIndex ? "next" : "prev");
    }));
  }

  function render() {
    spreadIndex = clampIndex(spreadIndex);
    const perView = pagesPerView();
    if (perView === 1) {
      renderPage(left, null, 0);
      renderPage(right, BOOK_PAGES[spreadIndex], spreadIndex + 1);
    } else {
      renderPage(left, BOOK_PAGES[spreadIndex], spreadIndex + 1);
      renderPage(right, BOOK_PAGES[spreadIndex + 1], spreadIndex + 2);
    }

    previousButton.disabled = spreadIndex === 0;
    nextButton.disabled = spreadIndex >= maxIndex();
    const visibleEnd = Math.min(BOOK_PAGES.length, spreadIndex + perView);
    pageStatus.textContent = perView === 1
      ? `Page ${spreadIndex + 1} of ${BOOK_PAGES.length}`
      : `Pages ${spreadIndex + 1}–${visibleEnd} of ${BOOK_PAGES.length}`;
    progressBar.style.width = `${(visibleEnd / BOOK_PAGES.length) * 100}%`;
    localStorage.setItem(STORAGE.position, String(spreadIndex));
    updateBookmarkState();
    updateContentsActiveState();
    bindDynamicControls();
    if (narratorEnabled) speakVisiblePages();
  }

  function animate(direction, callback) {
    turnOverlay.classList.remove("turn-next", "turn-prev");
    void turnOverlay.offsetWidth;
    turnOverlay.classList.add(direction === "next" ? "turn-next" : "turn-prev");
    window.setTimeout(callback, 180);
    window.setTimeout(() => turnOverlay.classList.remove("turn-next", "turn-prev"), 450);
  }

  function goTo(index, direction = "next") {
    const target = clampIndex(index);
    if (target === spreadIndex) return;
    animate(direction, () => { spreadIndex = target; render(); });
  }

  function next() { goTo(spreadIndex + pagesPerView(), "next"); }
  function previous() { goTo(spreadIndex - pagesPerView(), "prev"); }

  function buildContents() {
    const seen = new Set();
    BOOK_PAGES.forEach((page, index) => {
      if (seen.has(page.chapter)) return;
      seen.add(page.chapter);
      const li = document.createElement("li");
      li.dataset.index = String(index);
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = page.chapter;
      button.addEventListener("click", () => {
        closeContents();
        goTo(index, index >= spreadIndex ? "next" : "prev");
      });
      li.append(button);
      contentsList.append(li);
    });
  }

  function updateContentsActiveState() {
    const visible = BOOK_PAGES[spreadIndex];
    contentsList.querySelectorAll("li").forEach(li => {
      const index = Number.parseInt(li.dataset.index, 10);
      li.classList.toggle("active", BOOK_PAGES[index]?.chapter === visible?.chapter);
    });
  }

  function openContents() {
    contentsPanel.hidden = false;
    scrim.hidden = false;
    contentsButton.setAttribute("aria-expanded", "true");
    closeContentsButton.focus();
  }

  function closeContents() {
    contentsPanel.hidden = true;
    scrim.hidden = true;
    contentsButton.setAttribute("aria-expanded", "false");
    contentsButton.focus();
  }

  function updateBookmarkState() {
    const bookmarked = Number.parseInt(localStorage.getItem(STORAGE.bookmark) || "-1", 10);
    const active = bookmarked === spreadIndex;
    bookmarkButton.setAttribute("aria-pressed", String(active));
    bookmarkButton.textContent = active ? "Bookmarked ✓" : "Bookmark";
  }

  function toggleBookmark() {
    const bookmarked = Number.parseInt(localStorage.getItem(STORAGE.bookmark) || "-1", 10);
    if (bookmarked === spreadIndex) localStorage.removeItem(STORAGE.bookmark);
    else localStorage.setItem(STORAGE.bookmark, String(spreadIndex));
    updateBookmarkState();
  }

  function cycleTextSize() {
    fontScaleIndex = (fontScaleIndex + 1) % fontScales.length;
    document.documentElement.style.setProperty("--font-scale", String(fontScales[fontScaleIndex]));
    localStorage.setItem(STORAGE.fontScale, String(fontScaleIndex));
    textSizeButton.textContent = ["Text size", "Text size: large", "Text size: larger"][fontScaleIndex];
  }

  function buildPrintEdition() {
    BOOK_PAGES.forEach((page, index) => {
      const article = document.createElement("article");
      article.className = "print-page";
      article.dataset.template = page.template;
      article.innerHTML = `${page.html}<span class="print-page-number">${index + 1}</span>`;
      article.querySelectorAll("textarea, select, audio").forEach(node => node.remove());
      article.querySelectorAll("button").forEach(button => button.remove());
      printEdition.append(article);
    });
  }

  previousButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);
  contentsButton.addEventListener("click", openContents);
  closeContentsButton.addEventListener("click", closeContents);
  scrim.addEventListener("click", closeContents);
  bookmarkButton.addEventListener("click", toggleBookmark);
  printButton.addEventListener("click", () => window.print());
  textSizeButton.addEventListener("click", cycleTextSize);
  if (narratorButton) {
    if (narratorSupported) {
      narratorButton.addEventListener("click", toggleNarrator);
    } else {
      narratorButton.disabled = true;
      narratorButton.title = "Read-aloud isn't supported in this browser.";
      narratorButton.textContent = "🔊 Narrator: Unavailable";
    }
  }
  contentsButton.addEventListener("click", stopNarration);

  document.addEventListener("keydown", event => {
    if (event.target.matches("textarea, input, select")) return;
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
    if (event.key === "Escape" && !contentsPanel.hidden) closeContents();
  });

  mobileQuery.addEventListener("change", render);
  document.documentElement.style.setProperty("--font-scale", String(fontScales[fontScaleIndex] || 1));
  textSizeButton.textContent = ["Text size", "Text size: large", "Text size: larger"][fontScaleIndex] || "Text size";
  buildContents();
  buildPrintEdition();
  render();
})();
