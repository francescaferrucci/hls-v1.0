/* ==========================================================================
   Member Services Academy · Course 1 — Member Service Success
   Browser-local lesson engine. No network calls, no external dependencies.
   Storage namespace: hls.member-services.course-1
   ========================================================================== */
(function () {
  "use strict";

  var NS = "hls.member-services.course-1";
  var PASS_MARK = 80;
  var MODULES = ["module-1", "module-2", "module-3", "module-4", "module-5", "module-6"];
  var TOTAL_STEPS = MODULES.length + 2; /* six modules + assessment pass + completion */

  /* ---------------- storage helpers (degrade quietly) ---------------- */
  function get(key) {
    try { return window.localStorage.getItem(NS + "." + key); }
    catch (err) { return null; }
  }
  function set(key, value) {
    try { window.localStorage.setItem(NS + "." + key, value); return true; }
    catch (err) { return false; }
  }
  function isTrue(key) { return get(key) === "true"; }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Option explanations sometimes begin with their own verdict word; strip it so
  // the engine's verdict prefix does not read twice.
  function why(text) {
    return String(text || "").replace(/^(Correct|Incorrect|Not correct|Not the best choice|Best|Strongest)[.,]\s+/, "");
  }

  function setFeedback(el, text, state) {
    el.className = "ms1-feedback" + (state ? " " + state : "");
    el.textContent = text;
  }

  function feedbackNode(fieldset) {
    var node = fieldset.querySelector(".ms1-feedback");
    if (!node) {
      node = document.createElement("p");
      node.className = "ms1-feedback";
      fieldset.appendChild(node);
    }
    return node;
  }

  /* ================================================================
     1. Progress tracking
     ================================================================ */
  var progressFill = $("#lessonProgressFill");
  var progressText = $("#lessonProgressLabel");

  function completedSteps() {
    var done = 0;
    MODULES.forEach(function (id) { if (isTrue("module." + id)) done += 1; });
    if (isTrue("assessment.passed")) done += 1;
    if (isTrue("complete")) done += 1;
    return done;
  }

  function updateProgress() {
    var done = completedSteps();
    var pct = Math.round((done / TOTAL_STEPS) * 100);
    set("progress.percent", String(pct));
    if (progressFill) progressFill.style.width = pct + "%";
    if (progressText) {
      progressText.textContent = "Lesson progress: " + pct + "% · " + done +
        " of " + TOTAL_STEPS + " steps complete (saved in this browser)";
    }
    MODULES.forEach(function (id) {
      var link = document.querySelector('.ms1-nav a[href="#' + id + '"]');
      if (link) {
        if (isTrue("module." + id)) {
          link.classList.add("ms1-nav-done");
          link.setAttribute("title", "Marked complete");
        } else {
          link.classList.remove("ms1-nav-done");
          link.removeAttribute("title");
        }
      }
    });
  }

  /* module completion buttons */
  $$("[data-complete]").forEach(function (btn) {
    var id = btn.getAttribute("data-complete");
    var next = btn.getAttribute("data-next");
    var status = document.querySelector('[data-complete-status="' + id + '"]');

    function paint() {
      if (isTrue("module." + id)) {
        btn.textContent = "Module complete ✓ — continue";
        if (status) status.textContent = "Marked complete in this browser. You can revisit this module at any time.";
      }
    }
    paint();

    btn.addEventListener("click", function () {
      set("module." + id, "true");
      updateProgress();
      paint();
      if (next) {
        var target = document.querySelector(next);
        if (target) {
          window.location.hash = next;
          var heading = target.querySelector("h2");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus();
          }
        }
      }
    });
  });

  /* ================================================================
     2. Section nav current-state + hash restore
     ================================================================ */
  var navLinks = $$(".ms1-nav a");
  var sections = $$(".ms1-section");

  function markCurrent(id) {
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (id) set("lastSection", id);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markCurrent(entry.target.id);
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  } else {
    navLinks.forEach(function (a) {
      a.addEventListener("click", function () { markCurrent(a.getAttribute("href").slice(1)); });
    });
  }
  window.addEventListener("hashchange", function () {
    if (window.location.hash) markCurrent(window.location.hash.slice(1));
  });

  /* ================================================================
     3. Single-answer activities (radios and selects)
     ================================================================ */
  $$('[data-check]').forEach(function (btn) {
    var group = btn.getAttribute("data-check");
    var wrap = document.querySelector('[data-group="' + group + '"]');
    if (!wrap) return;
    var status = document.querySelector('[data-status="' + group + '"]');
    var items = $$(".ms1-item", wrap);
    if (!items.length) return;

    btn.addEventListener("click", function () {
      var answered = 0;
      var correct = 0;

      items.forEach(function (item) {
        var expected = item.getAttribute("data-answer");
        var chosenValue = null;
        var chosenWhy0 = "";
        var select = item.querySelector("select");
        if (select) {
          chosenValue = select.value;
          if (chosenValue) chosenWhy0 = select.options[select.selectedIndex].getAttribute("data-why") || "";
        } else {
          var checked = item.querySelector("input[type=radio]:checked");
          if (checked) {
            chosenValue = checked.value;
            chosenWhy0 = checked.getAttribute("data-why") || "";
          }
        }
        var node = feedbackNode(item);
        item.classList.remove("is-correct", "is-wrong");
        if (!chosenValue) {
          setFeedback(node, "Not answered yet — choose an option for this item.", "is-partial");
          return;
        }
        answered += 1;
        if (chosenValue === expected) {
          correct += 1;
          item.classList.add("is-correct");
          setFeedback(node, "\u2713 Correct \u2014 " + why(chosenWhy0), "is-correct");
        } else {
          item.classList.add("is-wrong");
          setFeedback(node, "\u2717 Not correct \u2014 " + why(chosenWhy0), "is-wrong");
        }
      });

      if (status) {
        if (!answered) {
          status.textContent = "Nothing selected yet. Make a choice for each item, then check again.";
        } else if (correct === items.length) {
          status.textContent = (items.length === 1)
            ? "Correct. Read the explanation before you move on."
            : "All " + items.length + " correct. Read the explanation under each item before you move on.";
        } else {
          status.textContent = correct + " of " + items.length +
            " correct. Read the explanation under each item, then adjust your answers and check again.";
        }
      }
    });
  });

  /* reset for single-answer activities and multi-selects */
  $$('[data-reset]').forEach(function (btn) {
    var group = btn.getAttribute("data-reset");
    var wrap = document.querySelector('[data-group="' + group + '"]');
    if (!wrap) return;
    var status = document.querySelector('[data-status="' + group + '"]');
    btn.addEventListener("click", function () {
      $$("input[type=radio], input[type=checkbox]", wrap).forEach(function (i) { i.checked = false; });
      $$("select", wrap).forEach(function (s) { s.value = ""; });
      $$(".ms1-feedback", wrap).forEach(function (n) { n.parentNode.removeChild(n); });
      $$(".ms1-item, .ms1-multi", wrap).forEach(function (n) { n.classList.remove("is-correct", "is-wrong"); });
      if (status) status.textContent = "Activity reset. Nothing is scored until you check your answers.";
      if (wrap.getAttribute("data-builder")) updateBuilder();
      var first = wrap.querySelector("input, select");
      if (first) first.focus();
    });
  });

  /* ================================================================
     4. Multi-select activities
     ================================================================ */
  $$(".ms1-multi").forEach(function (set0) {
    var wrap = set0.closest("[data-group]");
    if (!wrap) return;
    var group = wrap.getAttribute("data-group");
    var checkBtn = document.querySelector('[data-check="' + group + '"]');
    var status = document.querySelector('[data-status="' + group + '"]');
    if (!checkBtn) return;

    checkBtn.addEventListener("click", function () {
      var boxes = $$("input[type=checkbox]", set0);
      var hits = 0, misses = 0, falseHits = 0, expected = 0;
      var lines = [];

      boxes.forEach(function (box) {
        var shouldBe = box.getAttribute("data-correct") === "true";
        var boxWhy = why(box.getAttribute("data-why") || "");
        var text = box.parentNode.textContent.trim();
        if (shouldBe) expected += 1;
        if (box.checked && shouldBe) { hits += 1; lines.push(["ok", text, boxWhy]); }
        else if (!box.checked && shouldBe) { misses += 1; lines.push(["missed", text, boxWhy]); }
        else if (box.checked && !shouldBe) { falseHits += 1; lines.push(["extra", text, boxWhy]); }
        else { lines.push(["left", text, boxWhy]); }
      });

      var node = feedbackNode(set0);
      node.textContent = "";
      var state = (hits === expected && falseHits === 0) ? "is-correct" : (hits ? "is-partial" : "is-wrong");
      node.className = "ms1-feedback " + state;

      var head = document.createElement("p");
      head.style.margin = "0";
      var parts = ["You found " + hits + " of " + expected + " correct selections"];
      if (falseHits) parts.push("selected " + falseHits + (falseHits === 1 ? " item that does not apply" : " items that do not apply"));
      if (misses) parts.push("missed " + misses);
      head.textContent = (state === "is-correct")
        ? "All correct — you selected every item that applies and nothing extra."
        : (parts.length > 1
            ? parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1] + "."
            : parts[0] + ".");
      node.appendChild(head);

      var list = document.createElement("ul");
      lines.forEach(function (line) {
        var li = document.createElement("li");
        var label = line[0] === "ok" ? "\u2713 Correctly selected"
          : line[0] === "missed" ? "\u2717 Missed"
          : line[0] === "extra" ? "\u2717 Should not be selected"
          : "\u2713 Correctly left unselected";
        li.innerHTML = "";
        var strong = document.createElement("strong");
        strong.textContent = label + " — " + line[1] + ": ";
        li.appendChild(strong);
        li.appendChild(document.createTextNode(line[2]));
        list.appendChild(li);
      });
      node.appendChild(list);

      if (status) {
        status.textContent = (state === "is-correct")
          ? "Correct. Review the notes for each item, then continue."
          : "Not complete yet. Read the notes under the list, adjust your selections, and check again.";
      }
    });
  });

  /* ================================================================
     5. Greeting builder (live preview)
     ================================================================ */
  var builderWrap = document.querySelector('[data-builder="greeting"]');
  var preview = $("#greetingPreview");

  function updateBuilder() {
    if (!builderWrap || !preview) return;
    var parts = ["clear", "caring", "confident"].map(function (part) {
      var fs = builderWrap.querySelector('[data-part="' + part + '"]');
      if (!fs) return null;
      var checked = fs.querySelector("input[type=radio]:checked");
      return checked ? checked.getAttribute("data-part-text") : null;
    });
    var chosen = parts.filter(Boolean);
    if (!chosen.length) {
      preview.textContent = "Choose an option in each of the three sets above.";
      return;
    }
    preview.textContent = "“" + chosen.join(" ") + "”" +
      (chosen.length < 3 ? " …" : "");
  }
  if (builderWrap) {
    $$("input[type=radio]", builderWrap).forEach(function (input) {
      input.addEventListener("change", updateBuilder);
    });
    updateBuilder();
  }

  /* ================================================================
     6. Branching scenario
     ================================================================ */
  var SCENARIOS = {
    recover: [
      {
        heading: "Step 1 — the first ten seconds",
        text: "A Member arrives for Luna's recheck. She has waited 40 minutes past her appointment time, the practitioner she expected is not the one available today, and she says, loudly enough for the lobby to hear: “This is the second time this has happened. Does anyone here actually plan the day?”",
        options: [
          {
            text: "“I am sorry this happened again, and I understand why you are frustrated — a 40 minute wait with Luna is a lot to ask of you.”",
            best: true,
            why: "Best. You apologize for the experience, empathize with the effect on her and Luna, and you have not blamed anyone or promised anything you cannot deliver. Emotion first."
          },
          {
            text: "“I'm sorry you feel that way. Let me get you checked in.”",
            best: false,
            why: "This apologizes for her reaction rather than for what happened, which is why it lands as a dismissal. Rewrite it: “I am sorry this happened, and I understand why you are frustrated.”"
          },
          {
            text: "“We are extremely short-staffed today, so the schedule is running long for everyone.”",
            best: false,
            why: "Explaining before acknowledging sounds like a defense. The explanation may be true, and it is not what she can hear yet."
          },
          {
            text: "“Let me see what I can take off today's bill to make up for it.”",
            best: false,
            why: "Billing adjustments are not a service-recovery tool you can reach for on your own. This course sets no pricing or credit authority — that follows Hannah protocol and your leader."
          }
        ]
      },
      {
        heading: "Step 2 — find out what she actually needs",
        text: "Her shoulders drop slightly. She says: “I took a half day for this. And now it is someone who has never seen Luna before.”",
        options: [
          {
            text: "“So the wait cost you a half day, and the bigger worry is that today's practitioner does not know Luna's history. Did I get that right?”",
            best: true,
            why: "Best. You paraphrase both the fact and the feeling, and you invite correction rather than assuming. This is where you learn that the real concern is continuity, not the clock."
          },
          {
            text: "“Every practitioner here reads the record before the visit, so it will be fine.”",
            best: false,
            why: "You may be right, and you have jumped to a conclusion and closed the topic. She has not been asked what she is actually worried about."
          },
          {
            text: "“I completely understand. Do you want to reschedule for next week instead?”",
            best: false,
            why: "This offers a solution before understanding the problem — and rescheduling may cost her another half day. Ask first."
          },
          {
            text: "“I hear you. Anything else before I check you in?”",
            best: false,
            view: true,
            why: "“Anything else?” invites “no.” Nothing was played back, so she still does not know what you heard or what will be done with it."
          }
        ]
      },
      {
        heading: "Step 3 — close the loop",
        text: "She nods: “Exactly. I just do not want to explain everything from scratch again.” Luna is now due to go back. What do you do before they go?",
        options: [
          {
            text: "“Here is what I will do: I will note in Luna's record that continuity matters to you, and I will tell the practitioner myself that Luna's history and last visit need to be reviewed before she comes in. Then I will check back with you before you leave. What questions do you have for me?”",
            best: true,
            why: "Best. You assure with a specific action you can actually own, name yourself as the owner, and finish with an open comprehension check instead of “any questions?”"
          },
          {
            text: "“I will make sure you always get the same practitioner from now on.”",
            best: false,
            why: "A promise you cannot guarantee. Scheduling and staffing are not yours to commit to, and a broken promise costs more than the original wait."
          },
          {
            text: "“Based on what you have told me about Luna, I would not worry — this is probably nothing serious.”",
            best: false,
            why: "This is a medical opinion. Interpreting Luna's condition is the medical team's decision under the current Hannah protocol for your role."
          },
          {
            text: "“You are all set — go ahead and take a seat, and someone will call you.”",
            best: false,
            why: "No owner, no acknowledgement of what she just told you, no check for understanding. The interaction ends where it started."
          }
        ]
      }
    ]
  };

  Object.keys(SCENARIOS).forEach(function (key) {
    var steps = SCENARIOS[key];
    var sceneEl = document.querySelector('[data-branch-scene="' + key + '"]');
    var optionsEl = document.querySelector('[data-branch-options="' + key + '"]');
    var feedbackEl = document.querySelector('[data-branch-feedback="' + key + '"]');
    var progressEl = document.querySelector('[data-branch-progress="' + key + '"]');
    var nextBtn = document.querySelector('[data-branch-next="' + key + '"]');
    var resetBtn = document.querySelector('[data-branch-reset="' + key + '"]');
    if (!sceneEl || !optionsEl) return;
    var index = 0;
    var bestCount = 0;

    function render() {
      var step = steps[index];
      sceneEl.textContent = "";
      var h = document.createElement("h4");
      h.textContent = step.heading;
      var p = document.createElement("p");
      p.textContent = step.text;
      sceneEl.appendChild(h);
      sceneEl.appendChild(p);

      if (progressEl) progressEl.textContent = "Step " + (index + 1) + " of " + steps.length;
      feedbackEl.textContent = "";
      feedbackEl.className = "ms1-branch-feedback";
      if (nextBtn) nextBtn.hidden = true;

      optionsEl.textContent = "";
      step.options.forEach(function (opt) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ms1-branch-option";
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = opt.text;
        btn.addEventListener("click", function () {
          $$(".ms1-branch-option", optionsEl).forEach(function (b) {
            b.disabled = true;
            b.setAttribute("aria-pressed", "false");
          });
          btn.setAttribute("aria-pressed", "true");
          if (opt.best) bestCount += 1;
          feedbackEl.className = "ms1-branch-feedback ms1-feedback " + (opt.best ? "is-correct" : "is-wrong");
          feedbackEl.textContent = (opt.best ? "\u2713 Strong choice \u2014 " : "\u2717 Consider a different approach \u2014 ") + why(opt.why);
          if (nextBtn) {
            nextBtn.hidden = false;
            nextBtn.textContent = (index < steps.length - 1) ? "Continue to step " + (index + 2) : "See scenario summary";
            nextBtn.focus();
          }
        });
        optionsEl.appendChild(btn);
      });
    }

    function summary() {
      sceneEl.textContent = "";
      var h = document.createElement("h4");
      h.textContent = "Scenario summary";
      var p = document.createElement("p");
      p.textContent = "You chose the strongest response at " + bestCount + " of " + steps.length +
        " steps. The pattern that works: acknowledge the experience, paraphrase what you heard, then assure with a next step you can personally own — and route anything involving billing, staffing commitments, or medical meaning to Hannah protocol and your leader.";
      sceneEl.appendChild(h);
      sceneEl.appendChild(p);
      optionsEl.textContent = "";
      feedbackEl.textContent = "";
      feedbackEl.className = "ms1-branch-feedback";
      if (progressEl) progressEl.textContent = "Scenario complete";
      if (nextBtn) nextBtn.hidden = true;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (index < steps.length - 1) { index += 1; render(); }
        else { summary(); }
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        index = 0; bestCount = 0; render();
        var first = optionsEl.querySelector("button");
        if (first) first.focus();
      });
    }
    render();
  });

  /* ================================================================
     7. Reflections
     ================================================================ */
  $$("[data-reflection]").forEach(function (ta) {
    var key = ta.getAttribute("data-reflection");
    var saved = get("reflection." + key);
    if (saved) ta.value = saved;
    var status = document.querySelector('[data-reflection-status="' + key + '"]');
    if (saved && status) status.textContent = "Saved reflection loaded from this browser.";
    var btn = document.querySelector('[data-save-reflection="' + key + '"]');
    if (!btn) return;
    btn.addEventListener("click", function () {
      var text = ta.value.trim();
      if (!text) {
        if (status) status.textContent = "Write something first, then save.";
        ta.focus();
        return;
      }
      var ok = set("reflection." + key, text);
      if (status) {
        status.textContent = ok
          ? "Saved in this browser only. It will still be here after a reload."
          : "This browser is blocking local storage, so the text cannot be saved. Copy it somewhere before you leave the page.";
      }
    });
  });

  /* ================================================================
     8. Final assessment
     ================================================================ */
  var form = $("#finalAssessment");
  var resultEl = $("#assessmentResult");
  var retakeBtn = $("#retakeAssessment");
  var scoreField = $("#signoffScore");

  function paintSavedScore() {
    var saved = get("assessment.score");
    var passed = isTrue("assessment.passed");
    if (saved && scoreField) {
      scoreField.value = saved + (passed ? " — passed" : " — not passed");
    }
    if (saved && resultEl && !resultEl.textContent) {
      resultEl.className = "ms1-result " + (passed ? "is-pass" : "is-fail");
      resultEl.textContent = passed
        ? "Previous attempt saved in this browser: " + saved + " — passed. Submit again any time to review the explanations."
        : "Previous attempt saved in this browser: " + saved + " — not passed. Review the modules and retake when you are ready.";
      if (retakeBtn) retakeBtn.hidden = false;
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var questions = $$(".ms1-q", form);
      var correct = 0;
      var unanswered = 0;

      questions.forEach(function (q) {
        var expected = q.getAttribute("data-answer");
        var chosen = q.querySelector("input[type=radio]:checked");
        var node = feedbackNode(q);
        q.classList.remove("is-correct", "is-wrong");
        if (!chosen) {
          unanswered += 1;
          setFeedback(node, "Not answered. This item is scored as incorrect until you choose an answer.", "is-partial");
          return;
        }
        var chosenWhy = why(chosen.getAttribute("data-why") || "");
        var correctInput = q.querySelector('input[value="' + expected + '"]');
        var correctWhy = correctInput ? why(correctInput.getAttribute("data-why") || "") : "";
        var correctText = correctInput ? correctInput.parentNode.textContent.trim() : "";
        if (chosen.value === expected) {
          correct += 1;
          q.classList.add("is-correct");
          setFeedback(node, "\u2713 Correct \u2014 " + chosenWhy, "is-correct");
        } else {
          q.classList.add("is-wrong");
          setFeedback(node, "\u2717 Not correct \u2014 your answer: " + chosenWhy +
            " The best answer is “" + correctText + "” \u2014 " + correctWhy, "is-wrong");
        }
      });

      var total = questions.length;
      var pct = Math.round((correct / total) * 100);
      var passed = pct >= PASS_MARK;
      set("assessment.score", correct + "/" + total + " (" + pct + "%)");
      set("assessment.passed", String(passed));
      var attempts = parseInt(get("assessment.attempts") || "0", 10) + 1;
      set("assessment.attempts", String(attempts));
      updateProgress();

      if (resultEl) {
        resultEl.className = "ms1-result " + (passed ? "is-pass" : "is-fail");
        resultEl.textContent = (passed
          ? "Passed — " + correct + " of " + total + " correct (" + pct + "%). The pass mark is " + PASS_MARK + "%. "
            + "Read the explanations on any item you missed, then complete the teach-back with your leader to finish the course."
          : "Not passed — " + correct + " of " + total + " correct (" + pct + "%). You need " + PASS_MARK +
            "% (8 of 10) to pass. Every item now shows why the best answer is best; review those, revisit the modules, and retake.")
          + (unanswered ? " " + unanswered + " item(s) were left unanswered." : "")
          + " Attempt " + attempts + ", saved in this browser only.";
      }
      if (retakeBtn) retakeBtn.hidden = false;
      if (scoreField) scoreField.value = correct + "/" + total + " (" + pct + "%)" + (passed ? " — passed" : " — not passed");
      if (resultEl) { resultEl.setAttribute("tabindex", "-1"); resultEl.focus(); }
      updateSignoffGate();
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener("click", function () {
      $$(".ms1-q", form).forEach(function (q) {
        $$("input[type=radio]", q).forEach(function (i) { i.checked = false; });
        var node = q.querySelector(".ms1-feedback");
        if (node) node.parentNode.removeChild(node);
        q.classList.remove("is-correct", "is-wrong");
      });
      if (resultEl) { resultEl.textContent = ""; resultEl.className = "ms1-result"; }
      retakeBtn.hidden = true;
      var first = form.querySelector("input[type=radio]");
      if (first) first.focus();
    });
  }

  /* ================================================================
     9. Teach-back sign-off
     ================================================================ */
  var signoffForm = $("#signoffForm");
  var signoffStatus = $("#signoffStatus");
  var learnerName = $("#learnerName");
  var leaderName = $("#leaderName");
  var signoffDate = $("#signoffDate");
  var signChecks = $$("[data-signoff]");

  if (learnerName) learnerName.value = get("signoff.learner") || "";
  if (leaderName) leaderName.value = get("signoff.leader") || "";
  if (signoffDate) signoffDate.value = get("signoff.date") || "";
  signChecks.forEach(function (box) {
    box.checked = isTrue("signoff.check." + box.getAttribute("data-signoff"));
  });

  function updateSignoffGate() {
    if (!signoffStatus) return;
    if (!isTrue("assessment.passed") && !isTrue("signoff.complete")) {
      signoffStatus.textContent = "The final assessment must be passed (80% or higher) before the teach-back can be saved.";
    }
  }

  if (signoffForm) {
    signoffForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!isTrue("assessment.passed")) {
        signoffStatus.textContent = "Not saved: the final assessment must be passed (80% or higher) first.";
        return;
      }
      if (!learnerName.value.trim() || !leaderName.value.trim() || !signoffDate.value) {
        signoffStatus.textContent = "Not saved: team member name, leader name, and date are all required.";
        (learnerName.value.trim() ? (leaderName.value.trim() ? signoffDate : leaderName) : learnerName).focus();
        return;
      }
      var unchecked = signChecks.filter(function (b) { return !b.checked; });
      if (unchecked.length) {
        signoffStatus.textContent = "Not saved: confirm all " + signChecks.length +
          " teach-back items. " + unchecked.length + " still unconfirmed.";
        unchecked[0].focus();
        return;
      }
      set("signoff.learner", learnerName.value.trim());
      set("signoff.leader", leaderName.value.trim());
      set("signoff.date", signoffDate.value);
      signChecks.forEach(function (b) { set("signoff.check." + b.getAttribute("data-signoff"), String(b.checked)); });
      set("signoff.complete", "true");
      signoffStatus.textContent = "Teach-back saved in this browser only — it is not sent to a central record. You can now mark the course complete.";
    });
  }

  /* ================================================================
     10. Finish the course
     ================================================================ */
  var finishBtn = $("#finishLesson");
  var finishStatus = $("#finishStatus");

  function paintFinish() {
    if (!finishStatus) return;
    if (isTrue("complete")) {
      finishStatus.className = "ms1-result is-pass";
      finishStatus.textContent = "Course marked complete in this browser on " +
        (get("completedOn") || "an earlier visit") +
        ". Progress: 100%. Return to the Member Services Academy whenever you want to review.";
      if (finishBtn) finishBtn.textContent = "Course complete ✓";
    }
  }

  if (finishBtn) {
    finishBtn.addEventListener("click", function () {
      if (!isTrue("assessment.passed")) {
        finishStatus.className = "ms1-result is-fail";
        finishStatus.textContent = "Not complete yet: pass the final assessment (80% or higher) first.";
        return;
      }
      if (!isTrue("signoff.complete")) {
        finishStatus.className = "ms1-result is-fail";
        finishStatus.textContent = "Not complete yet: save the teach-back with your leader first.";
        return;
      }
      set("complete", "true");
      set("completedOn", new Date().toISOString().slice(0, 10));
      updateProgress();
      paintFinish();
      finishStatus.setAttribute("tabindex", "-1");
      finishStatus.focus();
    });
  }

  /* ================================================================
     11. Print job aid
     ================================================================ */
  var printBtn = $("#printJobAid");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ================================================================
     12. Boot
     ================================================================ */
  paintSavedScore();
  updateSignoffGate();
  paintFinish();
  updateProgress();
  if (window.location.hash) markCurrent(window.location.hash.slice(1));
  else markCurrent("overview");
})();
