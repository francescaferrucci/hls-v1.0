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
  const printEdition = document.getElementById("printEdition");

  const mobileQuery = window.matchMedia("(max-width: 760px)");
  const STORAGE = {
    position: "hls.phase2.position",
    bookmark: "hls.phase2.bookmark",
    reflection: "hls.phase2.reflection",
    fontScale: "hls.phase2.fontScale"
  };

  let spreadIndex = Number.parseInt(localStorage.getItem(STORAGE.position) || "0", 10);
  if (!Number.isFinite(spreadIndex)) spreadIndex = 0;
  let fontScaleIndex = Number.parseInt(localStorage.getItem(STORAGE.fontScale) || "0", 10);
  const fontScales = [1, 1.12, 1.24];

  function pagesPerView() { return mobileQuery.matches ? 1 : 2; }
  function maxIndex() { return Math.max(0, BOOK_PAGES.length - pagesPerView()); }
  function clampIndex(index) { return Math.min(Math.max(index, 0), maxIndex()); }

  function renderPage(element, page, pageNumber) {
    if (!page) {
      element.innerHTML = "";
      element.removeAttribute("data-template");
      element.removeAttribute("data-page-number");
      return;
    }
    element.innerHTML = page.html;
    element.dataset.template = page.template;
    element.dataset.pageNumber = String(pageNumber);
    element.dataset.pageId = page.id;
    element.setAttribute("aria-label", `${page.label}, page ${pageNumber}`);
    element.scrollTop = 0;
  }

  function bindDynamicControls() {
    document.querySelectorAll("textarea[data-reflection-key]").forEach(textarea => {
      const key = `hls.phase2.reflection.${textarea.dataset.reflectionKey}`;
      textarea.value = localStorage.getItem(key) || "";
      const button = textarea.parentElement.querySelector(".save-reflection");
      const status = textarea.parentElement.querySelector(".reflection-status");
      if (button && status) button.addEventListener("click", () => {
        localStorage.setItem(key, textarea.value.trim());
        status.textContent = "Saved.";
        window.setTimeout(() => { status.textContent = ""; }, 1800);
      });
    });

    document.querySelectorAll(".principles-wheel button").forEach(button => button.addEventListener("click", () => {
      const target = document.getElementById("principleDetail"); if (target) target.textContent = button.dataset.detail;
    }));
    document.querySelectorAll(".decision-map button").forEach(button => button.addEventListener("click", () => {
      const target = document.getElementById("decisionDetail"); if (target) target.textContent = button.dataset.detail;
    }));
    document.querySelectorAll(".learning-cycle button").forEach(button => button.addEventListener("click", () => {
      const target = document.getElementById("cycleDetail"); if (target) target.textContent = button.dataset.detail;
    }));
    document.querySelectorAll(".team-orbit button").forEach(button => button.addEventListener("click", () => {
      const target = document.getElementById("teamDetail");
      const orbit = button.closest(".team-orbit");
      if (target) target.textContent = button.dataset.detail;
      if (!orbit) return;
      orbit.querySelectorAll("button").forEach(item => item.classList.remove("active"));
      orbit.querySelectorAll(".team-connector").forEach(line => line.remove());
      button.classList.add("active"); orbit.classList.add("has-active");
      const o = orbit.getBoundingMemberRect(), b = button.getBoundingMemberRect();
      const cx=o.width/2, cy=o.height/2, bx=b.left-o.left+b.width/2, by=b.top-o.top+b.height/2;
      const dx=bx-cx, dy=by-cy, length=Math.max(0,Math.hypot(dx,dy)-Math.min(b.width,b.height)/2-55);
      const line=document.createElement("span"); line.className="team-connector";
      line.style.width=`${length}px`; line.style.setProperty("--angle",`${Math.atan2(dy,dx)}rad`);
      line.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`; orbit.append(line);
    }));

    document.querySelectorAll(".scenario-steps button").forEach(button => button.addEventListener("click", () => {
      const target = document.getElementById("scenarioDetail"); if (target) target.textContent = button.dataset.detail;
      button.classList.add("selected");
    }));
    document.querySelectorAll(".sequence-activity").forEach(activity => {
      const expected = (activity.dataset.sequence || "").split(","); let selected = [];
      activity.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
        const step = button.dataset.step;
        if (selected.includes(step)) return;
        if (step === expected[selected.length]) {
          selected.push(step); button.classList.add("selected");
          const status = activity.nextElementSibling; if (status) status.textContent = selected.join(" → ") + (selected.length === expected.length ? " ✓" : "");
        } else { activity.classList.add("needs-reset"); window.setTimeout(() => activity.classList.remove("needs-reset"), 450); }
      }));
    });
    document.querySelectorAll("[data-storage-group]").forEach(group => {
      const groupKey = `hls.phase2.choice.${group.dataset.storageGroup}`;
      group.querySelectorAll('input[type="radio"]').forEach(input => {
        const saved = localStorage.getItem(`${groupKey}.${input.name}`); if (saved === input.value) input.checked = true;
        input.addEventListener("change", () => localStorage.setItem(`${groupKey}.${input.name}`, input.value));
      });
    });
    document.querySelectorAll(".flip-card").forEach(card => card.addEventListener("click", () => {
      const flipped = card.classList.toggle("flipped"); const span = card.querySelector("span");
      if (span) span.textContent = flipped ? card.dataset.back : card.dataset.front;
    }));
    document.querySelectorAll("[data-checklist]").forEach(list => {
      const keyBase = `hls.phase2.checklist.${list.dataset.checklist}`; const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
      const update = () => { const count = boxes.filter(box => box.checked).length; const countEl = document.getElementById("challengeCount"); const progress = document.getElementById("challengeProgress"); if (countEl) countEl.textContent = `${count} of ${boxes.length} complete`; if (progress) progress.value = count; };
      boxes.forEach(box => { box.checked = localStorage.getItem(`${keyBase}.${box.value}`) === "true"; box.addEventListener("change", () => { localStorage.setItem(`${keyBase}.${box.value}`, String(box.checked)); update(); }); }); update();
    });

    const oathName = document.querySelector('[data-oath="name"]');
    const oathDate = document.querySelector('[data-oath="date"]');
    if (oathName) oathName.value = localStorage.getItem("hls.phase2.oath.name") || "";
    if (oathDate) oathDate.value = localStorage.getItem("hls.phase2.oath.date") || "";
    const saveOath = document.getElementById("saveOath");
    if (saveOath) saveOath.addEventListener("click", () => {
      localStorage.setItem("hls.phase2.oath.name", oathName?.value || "");
      localStorage.setItem("hls.phase2.oath.date", oathDate?.value || "");
      const status = document.getElementById("oathStatus"); if (status) status.textContent = "Commitment saved.";
    });

    const complete = document.getElementById("completePartButton");
    const completeStatus = document.getElementById("completeStatus");
    if (complete && completeStatus) {
      const audio = document.getElementById("celebrationAudio");
      const replay = document.getElementById("replayCelebration");
      const music = document.getElementById("toggleMusic");
      const date = document.getElementById("completionDate");
      const stage = document.getElementById("confettiStage");
      const savedDate = localStorage.getItem("hls.phase2.completeDate");
      if (date && savedDate) date.textContent = `Completed ${savedDate}`;
      const celebrate = () => {
        if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          stage.innerHTML = "";
          const symbols=["●","◆","♥","★","🐾"];
          for(let i=0;i<72;i++){
            const piece=document.createElement("span"); piece.className="confetti-piece";
            piece.textContent=symbols[Math.floor(Math.random()*symbols.length)];
            piece.style.left=`${Math.random()*100}%`; piece.style.color=["#003b5c","#ef7622","#ffffff","#00a3e0","#93b52b"][i%5];
            piece.style.setProperty("--duration",`${3.4+Math.random()*2.1}s`); piece.style.setProperty("--drift",`${-90+Math.random()*180}px`);
            piece.style.setProperty("--spin",`${360+Math.random()*900}deg`); piece.style.setProperty("--size",`${9+Math.random()*13}px`);
            piece.style.animationDelay=`${Math.random()*.8}s`; stage.append(piece);
          }
          window.setTimeout(()=>{stage.innerHTML="";},6500);
        }
        if (audio && !audio.muted) { audio.currentTime=0; audio.play().catch(()=>{}); }
      };
      if (localStorage.getItem("hls.phase2.complete") === "true") { completeStatus.textContent = "Part I completed ✓"; if(replay) replay.hidden=false; }
      complete.addEventListener("click", () => {
        localStorage.setItem("hls.phase2.complete", "true");
        const completed = new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
        localStorage.setItem("hls.phase2.completeDate",completed); if(date) date.textContent=`Completed ${completed}`;
        completeStatus.textContent = "Part I completed ✓"; if(replay) replay.hidden=false; celebrate();
      });
      if(replay) replay.addEventListener("click",celebrate);
      if(music && audio) music.addEventListener("click",()=>{ audio.muted=!audio.muted; music.setAttribute("aria-pressed",String(audio.muted)); music.textContent=audio.muted?"Music: Off":"Music: On"; });
      const continueButton=document.getElementById("continuePartTwo");
      if(continueButton) continueButton.addEventListener("click",()=>{ completeStatus.textContent="Part II will continue in the next Hannah Learning System module."; });
    }
    const restartButton = document.getElementById("restartButton");
    if (restartButton) restartButton.addEventListener("click", () => goTo(0, "prev"));
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
      const textarea = article.querySelector("textarea");
      if (textarea) textarea.remove();
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
