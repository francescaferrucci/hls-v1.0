(() => {
  "use strict";
  const NS = "hls.foundations.course3";

  // ---- Single-answer knowledge checks (.choice-grid[data-answer]) ----
  document.querySelectorAll(".choice-grid[data-answer]").forEach((grid) => {
    const answer = grid.getAttribute("data-answer");
    const status = grid.nextElementSibling && grid.nextElementSibling.classList.contains("choice-status")
      ? grid.nextElementSibling
      : null;
    grid.querySelectorAll(".decision-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-choice") === answer;
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
      });
    });
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
    const passed = pct >= 80;
    if (assessmentResult) {
      assessmentResult.textContent = `Score: ${correct}/${total} (${pct}%) — ${passed ? "Passed" : "Not yet passing (80% required)"}`;
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
      if (!allChecked) {
        if (signoffStatus) { signoffStatus.textContent = "All checklist items must be confirmed before saving sign-off."; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
        return;
      }
      if (!passed) {
        if (signoffStatus) { signoffStatus.textContent = "The learner must pass the final assessment (80% or higher) before sign-off."; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
        return;
      }
      if (!learnerName.value.trim() || !facilitatorName.value.trim() || !signoffDate.value) {
        if (signoffStatus) { signoffStatus.textContent = "Learner name, facilitator name, and date are required."; signoffStatus.classList.remove("pass"); signoffStatus.classList.add("fail"); }
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
          completeStatus.textContent = "Complete the final assessment (80%+) and facilitator sign-off first.";
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
