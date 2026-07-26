const BOOK_PAGES = [
  {
    "id": "cover",
    "chapter": "Front Matter",
    "template": "cover",
    "label": "Cover",
    "html": "<img class=\"cover-logo\" src=\"assets/hannah-logo-white.png\" alt=\"Hannah Pet Hospital\">\n<p class=\"cover-system\">Hannah Learning System™</p>\n<h1>FOUNDATIONS</h1>\n<p class=\"cover-subtitle\">Understanding the Hannah Model</p>\n<div class=\"cover-rule\"></div>\n<p class=\"cover-part\">Part II · Understanding the Hannah Model</p>\n<p class=\"cover-version\">Lesson 2 · Version 1.0</p>"
  },
  {
    "id": "title-page",
    "chapter": "Front Matter",
    "template": "title",
    "label": "Title page",
    "html": "<img class=\"blended-photo blended-hero\" src=\"assets/become-a-member-new.jpg\" alt=\"A Hannah Member and their dog at reception\">\n<p class=\"kicker\">Foundations Academy · Lesson 2</p>\n<h1>Understanding the Hannah Model</h1>\n<p class=\"lead\">Why Hannah exists, what Membership means, and how Total Lifetime Care® changes the shape of a pet's whole life.</p>\n<img class=\"hannah-heart-mark\" src=\"assets/hph-favicon.png\" alt=\"Hannah heart mark\">\n<p class=\"cover-part\">Part II · Understanding the Hannah Model</p>\n<p class=\"small-note\">Hannah Learning System™ · Foundations Academy · Estimated time 45–60 minutes</p>"
  },
  {
    "id": "contents",
    "chapter": "Front Matter",
    "template": "contents",
    "label": "Contents",
    "html": "<p class=\"kicker\">Lesson 2</p>\n<h2>Contents</h2>\n<ol class=\"book-contents\">\n  <li><span>Lesson objectives &amp; how to use this lesson</span><span>4</span></li>\n  <li><span>Module 1 · Why Hannah Exists</span><span>6</span></li>\n  <li><span>Module 2 · Hannah Membership</span><span>12</span></li>\n  <li><span>Module 3 · Hannah's Unique Pet Care Model</span><span>18</span></li>\n  <li><span>Module 4 · Total Lifetime Care®</span><span>23</span></li>\n  <li><span>Module 5 · Medical Decision Making</span><span>29</span></li>\n  <li><span>Module 6 · Shared Responsibilities</span><span>34</span></li>\n  <li><span>Module 7 · Explain, Verify, or Refer</span><span>38</span></li>\n  <li><span>Module 8 · Cooper's Hannah Journey</span><span>44</span></li>\n  <li><span>Final Assessment</span><span>54</span></li>\n  <li><span>Facilitator Sign-Off</span><span>56</span></li>\n  <li><span>Lesson Complete</span><span>57</span></li>\n</ol>\n<p class=\"small-note\">Use the Contents button in the toolbar to jump between modules at any time.</p>"
  },
  {
    "id": "objectives",
    "chapter": "Front Matter",
    "template": "prose",
    "label": "Lesson objectives",
    "html": "<p class=\"kicker\">Lesson 2 · Objectives</p>\n<h2>What you will be able to do</h2>\n<p>By the end of this lesson, you will be able to:</p>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Explain why Hannah Pet Hospital was created.</p>\n  <p class=\"list-line\">Describe the Hannah Membership.</p>\n  <p class=\"list-line\">Explain the Total Lifetime Care® model.</p>\n  <p class=\"list-line\">Understand how medical decisions are made.</p>\n  <p class=\"list-line\">Describe shared responsibilities between Hannah and Members.</p>\n  <p class=\"list-line\">Apply the Explain, Verify, or Refer communication model.</p>\n  <p class=\"list-line\">Walk through the Hannah Member Journey.</p>\n  <p class=\"list-line\">Successfully complete the final assessment.</p>\n</div>\n<p class=\"emphasis\">Everything in this lesson comes back to one idea: care that looks at a whole life, not a single visit.</p>"
  },
  {
    "id": "lesson-map",
    "chapter": "Front Matter",
    "template": "prose",
    "label": "How to use this lesson",
    "html": "<p class=\"kicker\">Before you begin</p>\n<h2>How this lesson works</h2>\n<p><strong>Estimated time:</strong> 45–60 minutes. You can leave and return — your place, your answers and your reflections are saved in this browser.</p>\n<p><strong>Interactive elements you will meet:</strong></p>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Knowledge checks after each concept</p>\n  <p class=\"list-line\">Click-to-reveal cards</p>\n  <p class=\"list-line\">Interactive scenarios</p>\n  <p class=\"list-line\">Reflection activities</p>\n  <p class=\"list-line\">A branching story — Cooper's Hannah Journey</p>\n  <p class=\"list-line\">A 30-question Final Assessment (90% to pass)</p>\n  <p class=\"list-line\">Facilitator Sign-Off</p>\n</div>\n<p class=\"small-note\">Turn on the Narrator in the toolbar if you would like the pages read aloud.</p>"
  },
  {
    "id": "m1-opener",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "quote",
    "label": "Module 1 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 1</p>\n<h1>Why Hannah Exists</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Most veterinary hospitals treat illness after it happens. Hannah was created to change that.</blockquote>\n</div>"
  },
  {
    "id": "m1-intro",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "prose",
    "label": "Why Hannah exists",
    "html": "<img class=\"blended-photo\" src=\"assets/petnurse-with-dog.webp\" alt=\"A PetNurse holding a dog during a wellness visit\">\n<p class=\"kicker\">Module 1</p>\n<h2>Prevention, not repair</h2>\n<p>Most veterinary hospitals treat illness after it happens. Hannah was created to change that.</p>\n<p>Instead of focusing on treating disease, Hannah focuses on <em>preventing</em> disease whenever possible.</p>\n<p>Healthy pets live longer, happier lives.</p>\n<p>Preventive medicine also reduces unexpected medical expenses and strengthens the relationship between the veterinary team and the Member.</p>"
  },
  {
    "id": "m1-traditional",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "visual",
    "label": "Traditional veterinary care",
    "html": "<p class=\"kicker\">Interactive timeline · 1 of 2</p>\n<h1>Traditional Veterinary Care</h1>\n<p>Click each step to see what it feels like from the Member's side.</p>\n<div class=\"decision-map\">\n  <button type=\"button\" data-detail=\"Something is already wrong. The pet has been unwell for hours or days before anyone knows care is needed.\">Pet gets sick</button>\n  <button type=\"button\" data-detail=\"The Member schedules an appointment — often the first moment the veterinary team learns anything at all about this pet's problem.\">Member schedules appointment</button>\n  <button type=\"button\" data-detail=\"The team works out what is happening now, without a baseline of what normal looked like for this pet.\">Diagnosis</button>\n  <button type=\"button\" data-detail=\"Cost enters the conversation at the worst possible moment: after the pet is already sick and the Member is already worried.\">Estimate</button>\n  <button type=\"button\" data-detail=\"Treatment addresses today's problem. Nothing in this cycle is designed to prevent the next one.\">Treatment</button>\n  <button type=\"button\" data-detail=\"And then it repeats. The cycle restarts the next time the pet becomes unwell.\">Repeat</button>\n</div>\n<p id=\"decisionDetail\" class=\"viz-caption\">Select a step above.</p>"
  },
  {
    "id": "m1-hannah",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "visual",
    "label": "The Hannah model",
    "html": "<p class=\"kicker\">Interactive timeline · 2 of 2</p>\n<h1>The Hannah Model</h1>\n<p>Now click through the same journey the Hannah way.</p>\n<div class=\"learning-cycle\">\n  <button type=\"button\" data-detail=\"Care begins before anything is wrong. Membership makes the first visit a wellness visit, not an emergency.\">Join Membership</button>\n  <button type=\"button\" data-detail=\"Routine preventive care — exams, vaccinations, parasite control, dental and nutrition guidance — keeps problems from starting.\">Routine Preventive Care</button>\n  <button type=\"button\" data-detail=\"Because the team sees this pet regularly, small changes stand out early, while there are still good options.\">Early Detection</button>\n  <button type=\"button\" data-detail=\"Continuous monitoring means each visit is compared to a known baseline for this individual pet.\">Continuous Monitoring</button>\n  <button type=\"button\" data-detail=\"Problems found early are usually smaller, cheaper and more treatable. That is what better outcomes actually look like.\">Better Outcomes</button>\n  <button type=\"button\" data-detail=\"The result of all of it: longer, healthier lives, and more good years with the people who love them.\">Longer, Healthier Lives</button>\n</div>\n<p id=\"cycleDetail\" class=\"viz-caption\">Select a step above.</p>"
  },
  {
    "id": "m1-takeaways",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "prose",
    "label": "Module 1 key takeaways",
    "html": "<p class=\"kicker\">Module 1 · Key takeaways</p>\n<h2>Hannah exists to…</h2>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Keep pets healthier</p>\n  <p class=\"list-line\">Detect disease earlier</p>\n  <p class=\"list-line\">Remove financial barriers</p>\n  <p class=\"list-line\">Build lifelong relationships</p>\n  <p class=\"list-line\">Improve quality of life</p>\n</div>\n<p class=\"closing-line\">Every one of those five is a promise you keep in ordinary moments, not dramatic ones.</p>"
  },
  {
    "id": "m1-check",
    "chapter": "Module 1 · Why Hannah Exists",
    "template": "activity",
    "label": "Module 1 knowledge check",
    "html": "<p class=\"kicker\">Module 1 · Knowledge check</p>\n<h2>Check your understanding</h2>\n<div class=\"knowledge-check\" data-check=\"m1-why\">\n  <p class=\"kc-prompt\">Why was Hannah created?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"More emergency visits would mean Hannah was failing at its actual purpose — keeping pets well enough that emergencies become rarer.\">Increase emergency visits</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Medication is a tool, never a goal. Recommendations follow from what the pet needs.\">Sell more medications</button>\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"Hannah was created to prevent disease whenever possible and to stay involved across a pet's entire life.\">Focus on prevention and lifelong care</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Hannah works to remove barriers to being seen — unlimited exams exist for exactly that reason.\">Reduce appointment availability</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n<p class=\"small-note\">You can change your answer as often as you like — the correct answer stays visible once revealed.</p>"
  },
  {
    "id": "m2-opener",
    "chapter": "Module 2 · Hannah Membership",
    "template": "quote",
    "label": "Module 2 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 2</p>\n<h1>Hannah Membership</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Membership is not a discount. It is a relationship with no cost barrier standing in the middle of it.</blockquote>\n</div>"
  },
  {
    "id": "m2-benefits",
    "chapter": "Module 2 · Hannah Membership",
    "template": "prose",
    "label": "What Members receive",
    "html": "<img class=\"blended-photo\" src=\"assets/hannah-family-care-team.jpg\" alt=\"A Hannah care team with a Member and their pet\">\n<p class=\"kicker\">Module 2</p>\n<h2>What Members receive</h2>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Unlimited exams</p>\n  <p class=\"list-line\">Preventive care</p>\n  <p class=\"list-line\">Vaccinations</p>\n  <p class=\"list-line\">Diagnostics</p>\n  <p class=\"list-line\">Medical recommendations</p>\n  <p class=\"list-line\">Lifetime relationship</p>\n</div>\n<p class=\"emphasis\">Read that list again as a Member would: nothing on it requires a decision about money first.</p>"
  },
  {
    "id": "m2-cards",
    "chapter": "Module 2 · Hannah Membership",
    "template": "visual",
    "label": "Membership benefits",
    "html": "<p class=\"kicker\">Click to reveal</p>\n<h1>Membership Benefits</h1>\n<p>Click each benefit to learn what it means in practice.</p>\n<div class=\"decision-map\">\n  <button type=\"button\" data-detail=\"Unlimited Exams — bring your pet in any time something seems off. No exam fee, no weighing up whether it is 'worth it'. This is what turns a worried Member into a seen pet.\">Unlimited Exams</button>\n  <button type=\"button\" data-detail=\"Preventive Care — the scheduled, routine work that keeps problems from starting: wellness exams, vaccinations, parasite prevention, dental health, weight management.\">Preventive Care</button>\n  <button type=\"button\" data-detail=\"Medical Guidance — clear recommendations from a team who knows this pet's history, so Members are never left guessing what to do next.\">Medical Guidance</button>\n  <button type=\"button\" data-detail=\"Diagnostics — the testing that confirms what is actually happening inside the pet, instead of treating a guess.\">Diagnostics</button>\n  <button type=\"button\" data-detail=\"Care Coordination — one team holding the whole record and the whole plan, so nothing gets lost between visits, years or life stages.\">Care Coordination</button>\n</div>\n<p id=\"decisionDetail\" class=\"viz-caption\">Select a benefit above.</p>"
  },
  {
    "id": "m2-flip",
    "chapter": "Module 2 · Hannah Membership",
    "template": "activity",
    "label": "Membership in one sentence",
    "html": "<p class=\"kicker\">Module 2 · Reveal</p>\n<h2>Membership in one sentence</h2>\n<p>Tap the card to turn it over.</p>\n<button type=\"button\" class=\"flip-card\" data-front=\"What is Hannah Membership really for?\" data-back=\"Removing every reason to wait.\"><span>What is Hannah Membership really for?</span></button>\n<p class=\"small-note\">Tap again to flip it back.</p>"
  },
  {
    "id": "m2-scenario",
    "chapter": "Module 2 · Hannah Membership",
    "template": "activity",
    "label": "Module 2 scenario",
    "html": "<p class=\"kicker\">Module 2 · Scenario</p>\n<h2>&ldquo;I'll just wait until next month&rdquo;</h2>\n<div class=\"scenario-card\">\n  <p>A Member calls about their cat, who has been drinking more water than usual for a couple of weeks. When you offer an appointment this week, she says: <em>&ldquo;I'll just wait until next month.&rdquo;</em></p>\n</div>\n<div class=\"knowledge-check\" data-check=\"m2-wait\">\n  <p class=\"kc-prompt\">How does Hannah Membership help in this moment?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"Cost is the most common reason care gets postponed. Because the exam is already covered by Membership, you can gently take that reason off the table and get the cat seen while the change is still new.\">The exam is already covered by her Membership, so there is no cost reason to wait — offer the soonest appointment.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"A month is a long time in a cat who is already drinking more. Increased thirst can be an early sign of disease that is far more treatable now than later.\">Waiting a month is reasonable for a cat who is otherwise acting normally.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Pricing pressure is not how Hannah works, and it is not true — Membership does not penalise Members for when they come in.\">Let her know the visit will cost more if she waits until next month.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Respecting a Member's choice does not mean staying silent. Explaining what Membership already covers is information she needs to make a real decision.\">Respect her decision and end the call there.</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>"
  },
  {
    "id": "m2-recap",
    "chapter": "Module 2 · Hannah Membership",
    "template": "prose",
    "label": "Module 2 recap",
    "html": "<p class=\"kicker\">Module 2 · Recap</p>\n<h2>What Membership changes</h2>\n<p>A traditional practice asks a Member to decide, in the middle of worrying about their pet, whether the problem is bad enough to pay to have it looked at.</p>\n<p>Membership removes that question.</p>\n<p class=\"cadence\">Unlimited exams. Preventive care. Vaccinations. Diagnostics. Medical recommendations. A lifetime relationship.</p>\n<p class=\"closing-line\">The benefit list is really a list of reasons a Member no longer has to hesitate.</p>"
  },
  {
    "id": "m3-opener",
    "chapter": "Module 3 · Hannah's Unique Pet Care Model",
    "template": "quote",
    "label": "Module 3 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 3</p>\n<h1>Hannah's Unique Pet Care Model</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Traditional hospitals treat visits. Hannah manages health.</blockquote>\n</div>"
  },
  {
    "id": "m3-explain",
    "chapter": "Module 3 · Hannah's Unique Pet Care Model",
    "template": "prose",
    "label": "Treating visits vs managing health",
    "html": "<img class=\"blended-photo\" src=\"assets/cat-in-library-new.jpg\" alt=\"A cat resting comfortably at home\">\n<p class=\"kicker\">Module 3</p>\n<h2>Treating visits vs managing health</h2>\n<p>Traditional hospitals treat visits. Hannah manages health.</p>\n<p>It sounds like a small difference in wording. It is not. It changes who is responsible for noticing a problem, when cost gets discussed, and whether anyone is watching a pet between appointments.</p>\n<p class=\"emphasis\">A visit ends. Health does not.</p>"
  },
  {
    "id": "m3-illustration",
    "chapter": "Module 3 · Hannah's Unique Pet Care Model",
    "template": "visual",
    "label": "Two models side by side",
    "html": "<p class=\"kicker\">Illustration</p>\n<h1>Two Models</h1>\n<div class=\"split-panels\">\n  <div class=\"split-panel\">\n    <h3>Traditional Practice</h3>\n    <p class=\"flow-line\">Appointment</p>\n    <p class=\"flow-line\">Treatment</p>\n    <p class=\"flow-line\">Done</p>\n  </div>\n  <div class=\"split-panel is-hannah\">\n    <h3>Hannah</h3>\n    <p class=\"flow-line\">Membership</p>\n    <p class=\"flow-line\">Prevention</p>\n    <p class=\"flow-line\">Monitoring</p>\n    <p class=\"flow-line\">Treatment</p>\n    <p class=\"flow-line\">Follow-up</p>\n    <p class=\"flow-line\">Ongoing Care</p>\n  </div>\n</div>\n<p class=\"viz-caption\">One model has an end. The other has a rhythm.</p>"
  },
  {
    "id": "m3-sorter",
    "chapter": "Module 3 · Hannah's Unique Pet Care Model",
    "template": "activity",
    "label": "Module 3 sorting activity",
    "html": "<p class=\"kicker\">Module 3 · Interactive comparison</p>\n<h2>Sort each characteristic</h2>\n<p>Tap a characteristic to pick it up, then tap the column it belongs in. Green means correct; tap a red chip to send it back and try again.</p>\n<div class=\"sorter\" data-sorter=\"m3-model\">\n  <div class=\"sort-chips\">\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c1\" data-category=\"traditional\">Only seen when sick</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c2\" data-category=\"hannah\">Proactive wellness plans</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c3\" data-category=\"traditional\">One-time transaction</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c4\" data-category=\"hannah\">Lifelong relationship</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c5\" data-category=\"traditional\">Reactive care</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c6\" data-category=\"hannah\">Continuous monitoring</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c7\" data-category=\"traditional\">Cost discussed once the pet is already ill</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c8\" data-category=\"hannah\">Preventive-first mindset</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c9\" data-category=\"traditional\">Care ends when the appointment ends</button>\n    <button type=\"button\" class=\"sort-chip\" data-chip=\"c10\" data-category=\"hannah\">Follow-up built into the plan</button>\n  </div>\n  <div class=\"sort-buckets\">\n    <div class=\"sort-bucket\" data-bucket=\"traditional\" role=\"button\" tabindex=\"0\">\n      <h3>Traditional</h3>\n      <div class=\"bucket-items\"></div>\n    </div>\n    <div class=\"sort-bucket\" data-bucket=\"hannah\" role=\"button\" tabindex=\"0\">\n      <h3>Hannah</h3>\n      <div class=\"bucket-items\"></div>\n    </div>\n  </div>\n  <p class=\"sort-status\" role=\"status\" aria-live=\"polite\">0 of 10 placed</p>\n</div>"
  },
  {
    "id": "m3-recap",
    "chapter": "Module 3 · Hannah's Unique Pet Care Model",
    "template": "prose",
    "label": "Module 3 recap",
    "html": "<p class=\"kicker\">Module 3 · Recap</p>\n<h2>Why the model matters</h2>\n<p>Every characteristic in the Hannah column shares one quality: it assumes someone is still paying attention tomorrow.</p>\n<p>That is the whole model. Membership creates access, prevention reduces risk, monitoring catches change, treatment fixes what is found, follow-up confirms it worked — and then it continues.</p>\n<p class=\"closing-line\">Managing health is simply refusing to let the story end at the door.</p>"
  },
  {
    "id": "m4-opener",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "quote",
    "label": "Module 4 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 4</p>\n<h1>Total Lifetime Care®</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Every recommendation considers the pet's entire lifetime — not just today's visit.</blockquote>\n</div>"
  },
  {
    "id": "m4-intro",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "prose",
    "label": "Introducing Total Lifetime Care®",
    "html": "<img class=\"blended-photo\" src=\"assets/tlc-horner-new.png\" alt=\"A veterinarian with a dog during a lifetime care conversation\">\n<p class=\"kicker\">Module 4</p>\n<h2>Introducing Total Lifetime Care®</h2>\n<p>Every recommendation considers the pet's entire lifetime — not just today's visit.</p>\n<p>Total Lifetime Care® spans:</p>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Preventive medicine</p>\n  <p class=\"list-line\">Nutrition</p>\n  <p class=\"list-line\">Behavior</p>\n  <p class=\"list-line\">Diagnostics</p>\n  <p class=\"list-line\">Chronic disease management</p>\n  <p class=\"list-line\">Quality of life</p>\n  <p class=\"list-line\">Senior care</p>\n</div>"
  },
  {
    "id": "m4-stages",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "visual",
    "label": "Life stages",
    "html": "<p class=\"kicker\">Interactive timeline</p>\n<h1>Four Life Stages</h1>\n<p>Click each stage to see what Total Lifetime Care® focuses on.</p>\n<div class=\"learning-cycle\">\n  <button type=\"button\" data-detail=\"Puppy / Kitten — the vaccine series, parasite control, spay or neuter planning, nutrition for growth, and the earliest behaviour foundations. Habits set here last a lifetime.\">Puppy</button>\n  <button type=\"button\" data-detail=\"Adult — annual wellness exams, dental health, weight and body condition, and baseline diagnostics taken while the pet is well, so future changes are obvious.\">Adult</button>\n  <button type=\"button\" data-detail=\"Senior — screening becomes more frequent, because age-related disease is more likely and far more treatable before symptoms appear. Mobility and comfort enter every conversation.\">Senior</button>\n  <button type=\"button\" data-detail=\"Geriatric — comfort, mobility, pain management and quality of life sit alongside chronic disease management. The goal shifts from years of life to life in the years.\">Geriatric</button>\n</div>\n<p id=\"cycleDetail\" class=\"viz-caption\">Select a life stage above.</p>"
  },
  {
    "id": "m4-flip",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "activity",
    "label": "Total Lifetime Care® reveal",
    "html": "<p class=\"kicker\">Module 4 · Reveal</p>\n<h2>The Total Lifetime Care® question</h2>\n<p>Tap the card to turn it over.</p>\n<button type=\"button\" class=\"flip-card\" data-front=\"What question sits behind every recommendation?\" data-back=\"&ldquo;What will this mean for this pet in five years?&rdquo;\"><span>What question sits behind every recommendation?</span></button>\n<p class=\"small-note\">Tap again to flip it back.</p>"
  },
  {
    "id": "m4-reflection",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "reflection",
    "label": "Module 4 reflection",
    "html": "<p class=\"kicker\">Module 4 · Reflection</p>\n<h2>How does preventive medicine change a pet's future?</h2>\n<p>Think about a pet you know — yours, a Member's, one you have cared for. What does the next five years look like with consistent preventive care, and what does it look like without it?</p>\n<div>\n  <label class=\"reflection-label\" for=\"reflection-m4\">My reflection</label>\n  <textarea id=\"reflection-m4\" data-reflection-key=\"module-4\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea>\n  <div class=\"reflection-actions\">\n    <button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button>\n    <span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span>\n  </div>\n  <p class=\"small-note\">Your response is saved in this browser.</p>\n</div>"
  },
  {
    "id": "m4-recap",
    "chapter": "Module 4 · Total Lifetime Care®",
    "template": "prose",
    "label": "Module 4 recap",
    "html": "<p class=\"kicker\">Module 4 · Recap</p>\n<h2>Care with a long memory</h2>\n<p>Total Lifetime Care® is what makes a puppy's nutrition conversation and a geriatric pet's comfort plan part of the same continuous piece of work.</p>\n<p class=\"cadence compact\">Preventive medicine. Nutrition. Behavior. Diagnostics. Chronic disease management. Quality of life. Senior care.</p>\n<p class=\"closing-line\">Seven focus areas, one lifetime, one team keeping track of all of it.</p>"
  },
  {
    "id": "m5-opener",
    "chapter": "Module 5 · Medical Decision Making",
    "template": "quote",
    "label": "Module 5 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 5</p>\n<h1>Medical Decision Making</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>A good decision is not a confident guess. It is a process you can retrace.</blockquote>\n</div>"
  },
  {
    "id": "m5-inputs",
    "chapter": "Module 5 · Medical Decision Making",
    "template": "prose",
    "label": "What decisions are based on",
    "html": "<img class=\"blended-photo\" src=\"assets/petnurse-caring.webp\" alt=\"A PetNurse examining a patient\">\n<p class=\"kicker\">Module 5</p>\n<h2>What medical decisions are based on</h2>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Physical exam</p>\n  <p class=\"list-line\">History</p>\n  <p class=\"list-line\">Diagnostics</p>\n  <p class=\"list-line\">Evidence-based medicine</p>\n  <p class=\"list-line\">Veterinarian judgment</p>\n  <p class=\"list-line\">Member discussion</p>\n</div>\n<p class=\"emphasis\">Notice the last one. The Member is part of the process, not an audience for the result.</p>"
  },
  {
    "id": "m5-flowchart",
    "chapter": "Module 5 · Medical Decision Making",
    "template": "activity",
    "label": "Medical decision flowchart",
    "html": "<p class=\"kicker\">Module 5 · Interactive flowchart</p>\n<h2>Put the flow in order</h2>\n<p>Click the steps in the order a case actually moves. If you pick out of order, the row will shake — try again.</p>\n<div class=\"sequence-activity\" data-sequence=\"complaint,history,exam,differentials,diagnostics,plan,followup\">\n  <button type=\"button\" data-step=\"exam\">Exam</button>\n  <button type=\"button\" data-step=\"plan\">Treatment Plan</button>\n  <button type=\"button\" data-step=\"complaint\">Presenting Complaint</button>\n  <button type=\"button\" data-step=\"followup\">Follow-up</button>\n  <button type=\"button\" data-step=\"differentials\">Differential Diagnoses</button>\n  <button type=\"button\" data-step=\"history\">History</button>\n  <button type=\"button\" data-step=\"diagnostics\">Diagnostics</button>\n</div>\n<p class=\"activity-status\" aria-live=\"polite\">Start with what brought the pet in.</p>\n<blockquote class=\"activity-reveal\">Presenting Complaint → History → Exam → Differential Diagnoses → Diagnostics → Treatment Plan → Follow-up</blockquote>"
  },
  {
    "id": "m5-scenario",
    "chapter": "Module 5 · Medical Decision Making",
    "template": "activity",
    "label": "Module 5 scenario",
    "html": "<p class=\"kicker\">Module 5 · Scenario</p>\n<h2>A Member declines diagnostics</h2>\n<div class=\"scenario-card\">\n  <p>A dog presents with three weeks of intermittent vomiting. The DVM recommends bloodwork and radiographs. The Member says he would rather not run them right now.</p>\n</div>\n<div class=\"knowledge-check\" data-check=\"m5-declines\">\n  <p class=\"kc-prompt\">What should happen next?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"A declined recommendation is not the end of care. Explain plainly what stays unknown without the testing, record the conversation, offer the safest next-best plan, and set a specific follow-up point.\">Explain what remains unknown without the testing, document the conversation, and offer a safe next-best plan with a defined follow-up.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Treating as though results existed means treating a guess. That is precisely the risk the Member needs to understand.\">Proceed with treatment as though the diagnostics had been run.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Hannah does not withdraw care because a recommendation was declined. The relationship continues, and so does the plan.\">Tell the Member that no further care can be offered until he agrees.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Saying nothing protects no one. The Member cannot make a real decision without knowing what the testing would have told you.\">Say nothing more about it so the Member does not feel pressured.</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>"
  },
  {
    "id": "m5-recap",
    "chapter": "Module 5 · Medical Decision Making",
    "template": "prose",
    "label": "Module 5 recap",
    "html": "<p class=\"kicker\">Module 5 · Recap</p>\n<h2>Decisions you can retrace</h2>\n<p>The flow exists so that any member of the team can pick up a record and understand not only what was decided, but why.</p>\n<p>When a Member declines part of the plan, the process does not break — it adapts. You document what was recommended, what was chosen, and when you will look again.</p>\n<p class=\"closing-line\">Evidence, judgment, and a conversation. In that order, every time.</p>"
  },
  {
    "id": "m6-opener",
    "chapter": "Module 6 · Shared Responsibilities",
    "template": "quote",
    "label": "Module 6 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 6</p>\n<h1>Shared Responsibilities</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Most of a pet's life happens at home. Outcomes are shared because the work is shared.</blockquote>\n</div>"
  },
  {
    "id": "m6-split",
    "chapter": "Module 6 · Shared Responsibilities",
    "template": "visual",
    "label": "Shared responsibilities",
    "html": "<p class=\"kicker\">Module 6</p>\n<h1>Who Holds What</h1>\n<div class=\"split-panels\">\n  <div class=\"split-panel is-hannah\">\n    <h3>Hannah Responsibilities</h3>\n    <p class=\"flow-line\">Education</p>\n    <p class=\"flow-line\">Recommendations</p>\n    <p class=\"flow-line\">Medical care</p>\n    <p class=\"flow-line\">Communication</p>\n    <p class=\"flow-line\">Follow-up</p>\n  </div>\n  <div class=\"split-panel\">\n    <h3>Member Responsibilities</h3>\n    <p class=\"flow-line\">Approve care</p>\n    <p class=\"flow-line\">Administer medications</p>\n    <p class=\"flow-line\">Monitor changes</p>\n    <p class=\"flow-line\">Attend visits</p>\n    <p class=\"flow-line\">Communicate concerns</p>\n  </div>\n</div>\n<p class=\"viz-caption\">Neither column can carry a good outcome on its own.</p>"
  },
  {
    "id": "m6-scenario",
    "chapter": "Module 6 · Shared Responsibilities",
    "template": "activity",
    "label": "Module 6 scenario",
    "html": "<p class=\"kicker\">Module 6 · Scenario</p>\n<h2>The medication that was not given</h2>\n<div class=\"scenario-card\">\n  <p>A cat was sent home ten days ago with twice-daily oral medication. She is no better. During the recheck it becomes clear the medication was only given for the first two days — she fought it, and the Member gave up without telling anyone.</p>\n</div>\n<div class=\"knowledge-check\" data-check=\"m6-shared\">\n  <p class=\"kc-prompt\">Who has responsibility here?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"Both. The Member owns administering medication at home; Hannah owns education, verifying understanding and following up. A team that checks in on day three finds this problem on day three. The useful response is to rebuild a plan that actually works in this household.\">Both — this is shared responsibility. Revisit understanding, find out what made dosing hard, and rebuild a plan that works in this home.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Naming it as the Member's failure ends the conversation you most need to have. It also ignores Hannah's own responsibilities for verification and follow-up.\">The Member — the plan was clear and she did not follow it.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Taking all the blame is just as unhelpful as assigning it all. It skips the practical problem: this cat still needs her medication.\">Hannah — the team should apologise and move on without discussing the medication.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"This was entirely influenceable. A verification question at discharge, or a check-in call on day three, would very likely have changed the outcome.\">Nobody — some pets simply do not improve.</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>"
  },
  {
    "id": "m6-recap",
    "chapter": "Module 6 · Shared Responsibilities",
    "template": "prose",
    "label": "Module 6 recap",
    "html": "<p class=\"kicker\">Module 6 · Recap</p>\n<h2>Shared, not split</h2>\n<p>&ldquo;Shared responsibility&rdquo; is not a polite way of dividing blame. It is a description of how outcomes actually happen.</p>\n<p>Hannah educates, recommends, treats, communicates and follows up. The Member approves care, gives medication, watches for change, attends visits and speaks up early.</p>\n<p class=\"closing-line\">When something goes wrong, the first question is never <em>whose fault</em> — it is <em>what got in the way</em>.</p>"
  },
  {
    "id": "m7-opener",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "quote",
    "label": "Module 7 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 7</p>\n<h1>Explain, Verify, or Refer</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>Knowing which of the three you are doing is the skill.</blockquote>\n</div>"
  },
  {
    "id": "m7-standard",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "visual",
    "label": "The three moves",
    "html": "<p class=\"kicker\">Module 7 · Core communication standard</p>\n<h1>Three Moves</h1>\n<p>Click each one to see what it asks of you.</p>\n<div class=\"principles-wheel\">\n  <button type=\"button\" data-detail=\"Explain — provide accurate information, within your scope. Accuracy includes recognising the edge of what you know.\">Explain</button>\n  <button type=\"button\" data-detail=\"Verify — confirm understanding. Ask: &ldquo;Can you tell me how you'll give this medication?&rdquo; The answer tells you whether your explanation actually landed.\">Verify</button>\n  <button type=\"button\" data-detail=\"Refer — know when another team member should help. Referring accurately is a strength, not a gap.\">Refer</button>\n</div>\n<p id=\"principleDetail\" class=\"viz-caption\">Select a move above.</p>"
  },
  {
    "id": "m7-refer",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "prose",
    "label": "Knowing where to refer",
    "html": "<p class=\"kicker\">Module 7</p>\n<h2>Knowing where to refer</h2>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Medical questions → DVM</p>\n  <p class=\"list-line\">Billing questions → Member Advocate</p>\n  <p class=\"list-line\">Behavior questions → Training Team</p>\n</div>\n<p>Role clarity is part of the same standard. In the exam room, the PetNurse examines and verbalises findings, while the Nurse Aide performs the Hannahware data entry. Two roles, deliberately separated, so nothing is missed and nothing is invented.</p>\n<p class=\"emphasis\">&ldquo;Let me get the right person for that&rdquo; is a complete, professional answer.</p>"
  },
  {
    "id": "m7-roleplay-1",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "activity",
    "label": "Role play part 1",
    "html": "<p class=\"kicker\">Module 7 · Role play · 1 of 2</p>\n<h2>Which move is this?</h2>\n<div class=\"scenario-card\">\n  <p>A Member stops you on the way out. <em>&ldquo;His symptoms are back. Should I just double the dose for a few days?&rdquo;</em></p>\n</div>\n<div class=\"knowledge-check\" data-check=\"m7-choose\">\n  <p class=\"kc-prompt\">Do you Explain, Verify, or Refer?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Explain covers information you are qualified to give. A dose change is a medical judgment about a patient whose symptoms have changed — that is not yours to make.\">Explain — give her a safe estimate of a doubled dose.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Verifying what she has been giving is genuinely useful information to gather, but it cannot be where this ends. The question she asked still needs a medical answer.\">Verify — ask her to repeat the current dose, and leave it there.</button>\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"Refer. Returning symptoms plus a proposed dose change is a medical decision for the DVM. You can gather the history and hand over a clear picture — that is you doing your job well.\">Refer — this is a medical decision for the DVM.</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>"
  },
  {
    "id": "m7-roleplay-2",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "activity",
    "label": "Role play part 2",
    "html": "<p class=\"kicker\">Module 7 · Role play · 2 of 2</p>\n<h2>Now find the words</h2>\n<div class=\"scenario-card\">\n  <p>You have decided to refer. The Member is standing in front of you, worried, holding a half-used bottle of medication.</p>\n</div>\n<div class=\"knowledge-check\" data-check=\"m7-words\">\n  <p class=\"kc-prompt\">Which response does the job best?</p>\n  <div class=\"quiz-choices\">\n    <button type=\"button\" class=\"quiz-choice\" data-correct=\"true\" data-explain=\"It answers her real question (what happens now), keeps the current dose safe in the meantime, and hands the DVM the history they need. Warm, accurate, and inside your scope.\">&ldquo;That's a question for the DVM, and I want you to get the right answer. Keep the current dose today, and let me get the details of what you've seen so she can review it before you leave.&rdquo;</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Accurate but cold, and it leaves her with nothing to do between now and the DVM. She came to you with a worry; do not hand it back unchanged.\">&ldquo;I'm not allowed to answer that.&rdquo;</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Vague reassurance is not information. If symptoms have returned, the plan may genuinely need to change, and 'probably fine' delays that.\">&ldquo;It's probably fine — I'd just carry on as you are.&rdquo;</button>\n    <button type=\"button\" class=\"quiz-choice\" data-explain=\"Doubling on your own judgment is exactly the decision that belongs to the DVM, however confident it sounds.\">&ldquo;Doubling it for a few days usually doesn't hurt.&rdquo;</button>\n  </div>\n  <p class=\"kc-result\" role=\"status\" aria-live=\"polite\"></p>\n</div>"
  },
  {
    "id": "m7-recap",
    "chapter": "Module 7 · Explain, Verify, or Refer",
    "template": "prose",
    "label": "Module 7 recap",
    "html": "<p class=\"kicker\">Module 7 · Recap</p>\n<h2>Three moves, one standard</h2>\n<p>Explain gives accurate information. Verify confirms it landed. Refer sends the question to the person who can answer it properly.</p>\n<p>Used together, they mean a Member never leaves holding a question that nobody took seriously.</p>\n<p class=\"closing-line\">&ldquo;Can you tell me how you'll give this medication?&rdquo; — one sentence, and half the follow-up problems disappear.</p>"
  },
  {
    "id": "m8-opener",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "quote",
    "label": "Module 8 opener",
    "html": "<p class=\"kicker\">PART II · MODULE 8</p>\n<h1>Cooper's Hannah Journey</h1>\n<div class=\"truth-block\">\n  <span>Hannah Truth</span>\n  <blockquote>No single visit decides a life. The pattern does.</blockquote>\n</div>"
  },
  {
    "id": "m8-ch1",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 1",
    "html": "<p class=\"kicker\">Chapter 1 of 8</p>\n<h2>Cooper joins Hannah</h2>\n<img class=\"blended-photo\" src=\"assets/paw-partner-new.jpg\" alt=\"An eight-week-old Labrador puppy\">\n<p>Cooper is an eight-week-old Labrador — all feet, no coordination, entirely convinced the world is friendly. His Member, Dana, has brought him in for his very first visit.</p>\n<p>She has questions, and one of them is whether all of this is really necessary for a puppy who seems perfectly healthy.</p>\n\n<div class=\"story-choice\" data-story=\"ch1-a\">\n  <p class=\"story-question\">Dana asks what the first year with Hannah should look like. How do you frame it?</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Dana leaves with a plan and dates in her calendar. Cooper's first year is now a schedule rather than a series of decisions she has to make while busy.\">Walk her through the whole first year now — vaccine series, parasite prevention, nutrition, behaviour — and book the next visits before she leaves.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Dana leaves reassured but without a plan. Cooper's care will now depend on her noticing something — which, with a healthy-looking puppy, she probably will not.\">Tell her to bring him back if anything seems wrong, and take it from there.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch2",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 2",
    "html": "<p class=\"kicker\">Chapter 2 of 8</p>\n<h2>Vaccinations</h2>\n<p>Cooper is back for the second visit in his vaccine series. Dana mentions she has read that puppies only really need &ldquo;the one shot&rdquo;, and asks whether the remaining visits are worth the trips across town.</p>\n\n<div class=\"story-choice\" data-story=\"ch2-a\">\n  <p class=\"story-question\">How do you respond?</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Dana understands the reason, not just the rule. She keeps the appointments, and Cooper finishes the series fully protected.\">Explain that the series is what builds durable protection — one dose is a start, not a finish — and confirm the remaining dates with her.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Cooper's protection is incomplete through the months when he is most vulnerable. Nothing bad happens this week — which is exactly why this kind of gap goes unnoticed.\">Agree that he is probably covered enough and leave the remaining visits open.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch3",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 3",
    "html": "<p class=\"kicker\">Chapter 3 of 8</p>\n<h2>Nutrition</h2>\n<p>Cooper is four months old and growing fast. Dana has been feeding him generously — &ldquo;he's always hungry&rdquo; — and adding table scraps most evenings. He is already at the upper end of a healthy weight for his age.</p>\n\n<div class=\"story-choice\" data-story=\"ch3-a\">\n  <p class=\"story-question\">Nutrition is part of Total Lifetime Care®. What happens here?</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Dana switches to measured meals. Cooper grows into a lean adult — which will protect his joints for the next decade in ways nobody will ever notice, because nothing will go wrong.\">Have the conversation now: measured portions, a growth-appropriate diet, and a weight check at the next visit.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Cooper carries extra weight through the years his joints are forming. It is not visible as a problem yet. It will be.\">Leave it — he is a Labrador, and puppies are meant to be chubby.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch4",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 4",
    "html": "<p class=\"kicker\">Chapter 4 of 8</p>\n<h2>Behavior training</h2>\n<p>Cooper is seven months old and has discovered jumping. Dana laughs about it, then admits her elderly mother has stopped visiting because she is worried about being knocked over.</p>\n\n<div class=\"story-choice\" data-story=\"ch4-a\">\n  <p class=\"story-question\">Behavior questions have a home in the Hannah team. What do you do?</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Cooper learns an alternative greeting within a few weeks. Dana's mother starts visiting again — and Cooper keeps the household that will care for him for the next twelve years.\">Refer the behaviour question to the Training Team so it is addressed while Cooper is still young.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Cooper does not grow out of it; he grows into it, at eighty pounds. Behaviour problems left to mature are the most common reason a home stops working.\">Reassure her that he will grow out of it.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch5",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 5",
    "html": "<p class=\"kicker\">Chapter 5 of 8</p>\n<h2>Annual wellness</h2>\n<p>Cooper is three — a healthy, unremarkable adult dog. This is the visit where nothing is wrong, which makes it the easiest visit in the world to shorten.</p>\n\n<div class=\"story-choice\" data-story=\"ch5-a\">\n  <p class=\"story-question\">Dana asks why you would run bloodwork on a dog who is clearly fine.</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Cooper's normal is now on record. Every result for the rest of his life will be compared to Cooper, not to a textbook average.\">Explain that a baseline taken while he is well is what makes future changes obvious — and that this is the cheapest, easiest sample he will ever give.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"There is no baseline. In eight years, a borderline result will be genuinely ambiguous, because nobody knows what Cooper's normal ever was.\">Skip it — there is no clinical indication today.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n\n<div class=\"story-choice\" data-story=\"ch5-b\">\n  <p class=\"story-question\">You notice mild tartar and early gingivitis. Dana has not mentioned it.</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Cooper's mouth is treated while it is still a cleaning rather than extractions. He will keep his teeth, and the daily pain nobody would have spotted never arrives.\">Raise it now, explain what untreated dental disease does over years, and schedule the dental.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"It progresses quietly. Dental disease is painful long before a dog stops eating, and dogs are very good at not complaining.\">Note it in the record and mention it next year if it progresses.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch6",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 6",
    "html": "<p class=\"kicker\">Chapter 6 of 8</p>\n<h2>Ear infection</h2>\n<p>Cooper is seven. Dana calls: he has been shaking his head and scratching at his left ear for a few days. She still has some ear medication from a bottle prescribed two years ago and wonders whether she could just use that.</p>\n\n<div class=\"story-choice\" data-story=\"ch6-a\">\n  <p class=\"story-question\">What do you tell her?</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"The ear is examined, the cause identified, and the right treatment given. Cooper is comfortable within days, and the ear heals completely.\">Ask her to bring him in — the exam is covered by her Membership, and ear disease has several possible causes that need different treatments.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"The wrong treatment does not resolve it, the ear stays inflamed, and by the time Cooper is seen the problem is deeper and harder to clear.\">Tell her the old medication is fine to try for a few days.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch7",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 7",
    "html": "<p class=\"kicker\">Chapter 7 of 8</p>\n<h2>Senior screening</h2>\n<p>Cooper is nine and officially a senior. He is slower on walks, but Dana puts that down to age. His senior screening is due.</p>\n\n<div class=\"story-choice\" data-story=\"ch7-a\">\n  <p class=\"story-question\">Dana asks whether twice-yearly senior visits are really necessary for a dog who is 'just getting old'.</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Cooper's screening picks up early kidney changes. A diet change and monitoring begin years before he would ever have looked unwell.\">Explain that disease becomes more likely with age and far more treatable before symptoms appear — which is exactly why the interval shortens.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"The early changes go undetected for another eighteen months. When they surface, the options are narrower and the conversation is harder.\">Agree that annual visits are probably enough at his age.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n\n<div class=\"story-choice\" data-story=\"ch7-b\">\n  <p class=\"story-question\">You ask about the slowing down. Dana mentions he has stopped using the stairs.</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Cooper is treated for arthritis he had been quietly living with. Within a month he is using the stairs again. He was not old; he was sore.\">Take it seriously as a clinical finding — assess him for pain and mobility, not just age.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Cooper's pain goes untreated because everyone agreed it was age. He is not slower because he is nine — he is slower because it hurts.\">Reassure her that stiffness is normal in a nine-year-old Labrador.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>"
  },
  {
    "id": "m8-ch8",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper chapter 8",
    "html": "<p class=\"kicker\">Chapter 8 of 8</p>\n<h2>Healthy senior years</h2>\n<p>Cooper is twelve. He sleeps more, still meets Dana at the door, and has never once needed an emergency visit in the middle of the night.</p>\n<p>His last screening was stable. His weight is good. His teeth are his own.</p>\n\n<div class=\"story-choice\" data-story=\"ch8-a\">\n  <p class=\"story-question\">Dana asks what she should be watching for now.</p>\n  <div class=\"story-options\">\n    <button type=\"button\" class=\"story-option\" data-points=\"2\" data-feedback=\"Dana knows exactly what to watch and exactly when to call. Cooper's last years are comfortable, and no change goes unnoticed for long.\">Focus the conversation on quality of life: comfort, mobility, appetite, and the specific changes she should call about — plus continued monitoring.</button>\n    <button type=\"button\" class=\"story-option\" data-points=\"0\" data-feedback=\"Dana has reassurance but no framework. Changes in an old dog are gradual, and gradual changes are the easiest ones to normalise.\">Tell her he is doing well and to carry on as she is.</button>\n  </div>\n  <p class=\"story-feedback\" role=\"status\" aria-live=\"polite\"></p>\n</div>\n\n<p class=\"story-meter\" data-max=\"20\"></p>\n<p class=\"small-note\">Turn the page for Cooper's outcome.</p>"
  },
  {
    "id": "m8-outcome",
    "chapter": "Module 8 · Cooper's Hannah Journey",
    "template": "activity",
    "label": "Cooper's outcome",
    "html": "<p class=\"kicker\">Module 8 · Outcome</p>\n<h2>How Cooper's story ends</h2>\n<div class=\"story-outcome\" id=\"cooperOutcome\" data-max=\"20\">\n  <p class=\"outcome-score\"></p>\n  <div class=\"outcome-tier\" data-min=\"16\" hidden>\n    <p class=\"emphasis\">Cooper lived a long, vibrant life thanks to consistent preventive care.</p>\n    <p>He finished his vaccine series, grew into a lean adult, learned how to greet people, kept his own teeth, and had his kidney changes and his arthritis found before either one had a chance to define him. Almost none of that came from a dramatic intervention. It came from a series of ordinary visits where somebody chose to look properly.</p>\n    <p>That is what the Hannah model produces when it is allowed to work: not miracles, just years.</p>\n  </div>\n  <div class=\"outcome-tier\" data-min=\"10\" hidden>\n    <p class=\"emphasis\">Cooper had a good life — and some of it could have been easier.</p>\n    <p>Several of your choices gave him real protection, and you can see the difference in his story. Others left a gap: a plan without dates, a finding noted but not acted on, a change explained as age. None of those was a failure of care. Each one was simply a moment where prevention was available and the story went the other way.</p>\n    <p>Go back and change one or two decisions, and watch how much of Cooper's later life moves with them.</p>\n  </div>\n  <div class=\"outcome-tier\" data-min=\"0\" hidden>\n    <p class=\"emphasis\">Cooper was loved every day of his life — and preventive care would have given him more of them.</p>\n    <p>Nothing in Cooper's journey went wrong dramatically. That is the point. Each missed opportunity looked entirely reasonable at the time: a healthy puppy, a chubby Labrador, a stiff old dog. The cost of reactive care is never visible in the moment you choose it.</p>\n    <p>This is not a scolding — it is the clearest possible argument for the model. Replay his journey and choose prevention at each turn.</p>\n  </div>\n</div>\n<button type=\"button\" class=\"secondary-button story-reset\">Replay Cooper's journey</button>\n<p class=\"small-note\">Your choices are saved, so you can return and change them at any time.</p>"
  },
  {
    "id": "assessment-brief",
    "chapter": "Final Assessment",
    "template": "prose",
    "label": "Final assessment briefing",
    "html": "<p class=\"kicker\">Final Assessment</p>\n<h2>Before you begin</h2>\n<p>The Final Assessment draws <strong>30 questions</strong> at random from a larger bank covering all eight modules. Answer options are shuffled on every attempt, so no two attempts look the same.</p>\n<div class=\"callout-list\">\n  <p class=\"list-line\">Question types: multiple choice, true or false, scenario, ordering and matching</p>\n  <p class=\"list-line\">Passing score: 90% — that is 27 of 30</p>\n  <p class=\"list-line\">Every question is explained afterwards, whether you got it right or wrong</p>\n  <p class=\"list-line\">You may retake the assessment as many times as you need</p>\n</div>\n<p class=\"emphasis\">Your progress is saved as you go, so you can turn the page and come back without losing your answers.</p>"
  },
  {
    "id": "assessment",
    "chapter": "Final Assessment",
    "template": "activity",
    "label": "Final assessment",
    "html": "<p class=\"kicker\">Lesson 2 · Final Assessment</p>\n<h2>Final Assessment</h2>\n<div class=\"assessment\" id=\"assessment\">\n  <div class=\"assess-intro\" id=\"assessIntro\">\n    <p>30 questions drawn at random from a bank of <strong id=\"assessBankSize\">—</strong>. You need 27 correct (90%) to pass.</p>\n    <button type=\"button\" class=\"primary-button\" id=\"startAssessment\">Start Assessment</button>\n    <p class=\"small-note\" id=\"assessLastResult\"></p>\n  </div>\n  <div class=\"assess-body\" id=\"assessBody\" hidden></div>\n  <div class=\"assess-actions\" id=\"assessActions\" hidden>\n    <button type=\"button\" class=\"primary-button\" id=\"submitAssessment\">Submit Assessment</button>\n    <span class=\"small-note\" id=\"assessProgress\"></span>\n  </div>\n  <div class=\"assess-results\" id=\"assessResults\" hidden></div>\n  <button type=\"button\" class=\"secondary-button\" id=\"retakeAssessment\" hidden>Retake Assessment</button>\n</div>"
  },
  {
    "id": "signoff",
    "chapter": "Facilitator Sign-Off",
    "template": "activity",
    "label": "Facilitator sign-off",
    "html": "<p class=\"kicker\">Lesson 2 · Facilitator Sign-Off</p>\n<h2>Facilitator Sign-Off</h2>\n<p>Before completion, the facilitator verifies that the learner can:</p>\n<div class=\"challenge-list\" data-checklist=\"signoff\">\n  <label><input type=\"checkbox\" value=\"why\"> Explain why Hannah exists</label>\n  <label><input type=\"checkbox\" value=\"membership\"> Describe the Membership</label>\n  <label><input type=\"checkbox\" value=\"tlc\"> Explain Total Lifetime Care®</label>\n  <label><input type=\"checkbox\" value=\"model\"> Explain the Hannah care model</label>\n  <label><input type=\"checkbox\" value=\"decisions\"> Describe medical decision making</label>\n</div>\n<div class=\"challenge-progress\">\n  <span id=\"challengeCount\">0 of 5 complete</span>\n  <progress id=\"challengeProgress\" max=\"5\" value=\"0\"></progress>\n</div>\n<p class=\"assessment-status is-pending\" id=\"signoffAssessmentStatus\"></p>\n<div class=\"oath-card\">\n  <label>Facilitator name <input type=\"text\" data-signoff=\"name\" placeholder=\"Facilitator name\"></label>\n  <label>Date <input type=\"date\" data-signoff=\"date\"></label>\n  <button type=\"button\" class=\"primary-button\" id=\"confirmSignoff\" disabled>Confirm Sign-Off</button>\n  <span id=\"signoffStatus\" role=\"status\" aria-live=\"polite\"></span>\n  <p class=\"small-note\" id=\"signoffHint\"></p>\n</div>"
  },
  {
    "id": "lesson-complete",
    "chapter": "Lesson Complete",
    "template": "graduation",
    "label": "Lesson complete",
    "html": "<div id=\"confettiStage\" class=\"confetti-stage\" aria-hidden=\"true\"></div>\n<div class=\"graduation-card\">\n  <img class=\"graduation-heart\" src=\"assets/hannah-heart.png\" alt=\"Hannah heart\">\n  <p class=\"kicker\">Foundations Academy</p>\n  <h1>Lesson 2 Complete</h1>\n  <h2>Understanding the Hannah Model</h2>\n  <div class=\"achievement-card\">\n    <span>Achievement</span>\n    <strong>Hannah Model · Certified</strong>\n    <small id=\"completionDate\"></small>\n  </div>\n  <p class=\"badge-chip\" id=\"completionBadge\" hidden>🏅 Hannah Foundations Certified</p>\n  <blockquote class=\"graduation-message\">You now know why Hannah exists, what Membership promises, how Total Lifetime Care® shapes a whole life, how medical decisions get made, where your responsibilities meet a Member's, and when to Explain, Verify, or Refer.</blockquote>\n  <p>Cooper's journey was made of ordinary choices. So is yours.</p>\n  <div class=\"graduation-actions\">\n    <button type=\"button\" class=\"primary-button\" id=\"completeLessonButton\">Celebrate completion</button>\n    <button type=\"button\" class=\"secondary-button\" id=\"replayCelebration\" hidden>Replay celebration</button>\n    <button type=\"button\" class=\"secondary-button\" id=\"toggleMusic\" aria-pressed=\"false\">Music: On</button>\n  </div>\n  <p class=\"activity-status\" id=\"completeStatus\" role=\"status\" aria-live=\"polite\"></p>\n  <audio id=\"celebrationAudio\" src=\"assets/hannah-celebration.wav\" preload=\"none\"></audio>\n  <a class=\"continue-button\" href=\"../../../index.html#foundationsAcademy\">← Back to Foundations Academy</a>\n</div>"
  }
];
