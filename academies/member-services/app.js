/* Member Services Academy hub — reads Course 1 browser-local progress.
   Namespace: hls.member-services.course-1 (browser-local prototype only). */
(function () {
  "use strict";
  var NS = "hls.member-services.course-1";

  function read(key) {
    try { return window.localStorage.getItem(NS + "." + key); }
    catch (err) { return null; }
  }

  var percent = 0;
  var raw = read("progress.percent");
  if (raw !== null && raw !== "" && !isNaN(parseInt(raw, 10))) {
    percent = Math.max(0, Math.min(100, parseInt(raw, 10)));
  }
  var complete = read("complete") === "true";
  var passed = read("assessment.passed") === "true";
  if (complete) percent = 100;

  var label;
  if (complete) label = "Complete in this browser — 100%";
  else if (percent > 0) label = "In progress — " + percent + "% complete in this browser";
  else label = "Not started";

  var bar1 = document.getElementById("hubCourse1Bar");
  var lab1 = document.getElementById("hubCourse1Label");
  var link = document.getElementById("hubCourse1Link");
  var badge = document.getElementById("hubCourse1Badge");
  var hubBar = document.getElementById("hubProgressBar");
  var hubLabel = document.getElementById("hubProgressLabel");

  if (bar1) bar1.style.width = percent + "%";
  if (lab1) lab1.textContent = label;
  if (hubBar) hubBar.style.width = percent + "%";
  if (hubLabel) {
    hubLabel.textContent = "Course 1 progress: " + percent + "%" +
      (complete ? " — marked complete in this browser." :
        percent > 0 ? " — in progress in this browser." : " — not started.");
  }
  if (link && percent > 0 && !complete) link.textContent = "Continue Course 1";
  if (link && complete) link.textContent = "Review Course 1";
  if (badge && complete) {
    badge.textContent = "Completed in this browser";
    badge.className = "ms-badge ms-badge-done";
  } else if (badge && passed) {
    badge.textContent = "Assessment passed";
    badge.className = "ms-badge ms-badge-done";
  }
})();
