/* Lesson 2 Final Assessment question bank.
   Each attempt draws 30 questions at random from this bank and shuffles answer order.
   Types: mc | truefalse | scenario | ordering | matching */
const ASSESSMENT_QUESTIONS = [
  {
    id: "q01",
    module: 1,
    type: "mc",
    prompt: "Why was Hannah Pet Hospital created?",
    options: [
      "To focus on prevention and lifelong care",
      "To increase the number of emergency visits",
      "To sell more medications",
      "To reduce appointment availability"
    ],
    answer: "To focus on prevention and lifelong care",
    explanation: "Hannah exists to prevent disease whenever possible and to stay involved across a pet's whole life, rather than only treating illness after it appears."
  },
  {
    id: "q02",
    module: 1,
    type: "truefalse",
    prompt: "Most traditional veterinary hospitals are built around treating illness after it happens.",
    answer: "True",
    explanation: "That reactive pattern — pet gets sick, then care begins — is exactly the cycle Hannah was created to change."
  },
  {
    id: "q03",
    module: 1,
    type: "mc",
    prompt: "Which of these is NOT one of the reasons Hannah exists?",
    options: [
      "Maximising the number of billable sick visits",
      "Detecting disease earlier",
      "Removing financial barriers to care",
      "Building lifelong relationships"
    ],
    answer: "Maximising the number of billable sick visits",
    explanation: "Hannah's purpose is healthier pets, earlier detection, fewer financial barriers and lifelong relationships — not more sick visits."
  },
  {
    id: "q04",
    module: 1,
    type: "ordering",
    prompt: "Put the traditional veterinary care cycle in order.",
    sequence: ["Pet gets sick", "Member schedules appointment", "Diagnosis", "Estimate", "Treatment"],
    explanation: "The traditional cycle only starts once a pet is already unwell: illness, appointment, diagnosis, estimate, treatment — and then it repeats."
  },
  {
    id: "q05",
    module: 1,
    type: "ordering",
    prompt: "Put the Hannah model in order.",
    sequence: ["Join Membership", "Routine preventive care", "Early detection", "Continuous monitoring", "Better outcomes"],
    explanation: "Hannah begins with Membership, then delivers routine preventive care, catches problems early, monitors continuously, and produces better long-term outcomes."
  },
  {
    id: "q06",
    module: 1,
    type: "mc",
    prompt: "Besides better health, what other benefit does preventive medicine provide to Members?",
    options: [
      "Fewer unexpected medical expenses",
      "Shorter appointment times",
      "Fewer vaccinations over a lifetime",
      "Less contact with the care team"
    ],
    answer: "Fewer unexpected medical expenses",
    explanation: "Preventing and catching disease early reduces the surprise costs that come with advanced illness, and it strengthens the relationship with the care team."
  },
  {
    id: "q07",
    module: 2,
    type: "mc",
    prompt: "How many exams does the Hannah Membership include?",
    options: [
      "Unlimited exams",
      "Two exams per year",
      "One exam per year",
      "Exams are billed individually"
    ],
    answer: "Unlimited exams",
    explanation: "Unlimited exams are a core Membership benefit — Members never have to weigh the cost of an exam against bringing their pet in."
  },
  {
    id: "q08",
    module: 2,
    type: "matching",
    prompt: "Match each Membership benefit to what it means for the Member.",
    pairs: [
      { term: "Unlimited exams", definition: "Bring your pet in any time something seems off, with no exam fee to weigh up" },
      { term: "Preventive care", definition: "Routine wellness care scheduled to keep problems from starting" },
      { term: "Diagnostics", definition: "Testing that confirms what is happening inside the pet" },
      { term: "Care coordination", definition: "One team keeping the whole health record and plan connected over time" }
    ],
    explanation: "The Membership bundles access (unlimited exams), prevention, diagnostics and coordination so the Member is never choosing between cost and care."
  },
  {
    id: "q09",
    module: 2,
    type: "scenario",
    prompt: "A Member says, \"I'll just wait until next month.\" How does the Hannah Membership help in this moment?",
    options: [
      "The visit is already covered by the Membership, so there is no cost reason to delay care",
      "Waiting a month is usually the safest option for a stable pet",
      "The Member should be told the visit will cost more next month",
      "Nothing can be done until the Member changes their mind"
    ],
    answer: "The visit is already covered by the Membership, so there is no cost reason to delay care",
    explanation: "Cost is the most common reason care gets postponed. Because the Membership already covers the exam, you can gently remove that barrier and get the pet seen now."
  },
  {
    id: "q10",
    module: 2,
    type: "truefalse",
    prompt: "The Hannah Membership is designed as a lifetime relationship rather than a one-time transaction.",
    answer: "True",
    explanation: "Membership creates an ongoing relationship — the team follows the pet across their whole life, not just a single visit."
  },
  {
    id: "q11",
    module: 2,
    type: "mc",
    prompt: "Which of the following is included in the Hannah Membership?",
    options: [
      "Vaccinations",
      "Boarding for holidays",
      "Grooming packages",
      "Pet food delivery"
    ],
    answer: "Vaccinations",
    explanation: "Vaccinations sit alongside unlimited exams, preventive care, diagnostics and medical recommendations as Membership benefits."
  },
  {
    id: "q12",
    module: 3,
    type: "mc",
    prompt: "Which statement best captures the difference between a traditional practice and Hannah?",
    options: [
      "Traditional hospitals treat visits; Hannah manages health",
      "Traditional hospitals manage health; Hannah treats visits",
      "Both approaches are identical in practice",
      "Hannah only becomes involved once a pet is seriously ill"
    ],
    answer: "Traditional hospitals treat visits; Hannah manages health",
    explanation: "A traditional practice is organised around discrete appointments. Hannah is organised around managing a pet's health continuously."
  },
  {
    id: "q13",
    module: 3,
    type: "ordering",
    prompt: "Put the Hannah care model in order.",
    sequence: ["Membership", "Prevention", "Monitoring", "Treatment", "Follow-up", "Ongoing care"],
    explanation: "Hannah's model runs Membership → Prevention → Monitoring → Treatment → Follow-up → Ongoing care, and the loop never simply ends."
  },
  {
    id: "q14",
    module: 3,
    type: "matching",
    prompt: "Match each characteristic to the care model it belongs to.",
    pairs: [
      { term: "Only seen when sick", definition: "Traditional veterinary care" },
      { term: "Continuous monitoring", definition: "The Hannah model" }
    ],
    explanation: "Being seen only when sick is the reactive traditional pattern; continuous monitoring is a defining feature of the Hannah model."
  },
  {
    id: "q15",
    module: 3,
    type: "mc",
    prompt: "\"Appointment → Treatment → Done\" describes which model?",
    options: [
      "A traditional veterinary practice",
      "The Hannah model",
      "Total Lifetime Care®",
      "The Explain, Verify, or Refer standard"
    ],
    answer: "A traditional veterinary practice",
    explanation: "That three-step sequence ends at the door. Hannah continues with monitoring, follow-up and ongoing care."
  },
  {
    id: "q16",
    module: 3,
    type: "truefalse",
    prompt: "A one-time transaction mindset is characteristic of the Hannah model.",
    answer: "False",
    explanation: "One-time transactions belong to the traditional model. Hannah is built on a lifelong relationship."
  },
  {
    id: "q17",
    module: 4,
    type: "mc",
    prompt: "What does Total Lifetime Care® mean in practice?",
    options: [
      "Every recommendation considers the pet's entire lifetime, not just today's visit",
      "Care is only provided during a pet's senior years",
      "Members receive one comprehensive visit per lifetime",
      "Recommendations are limited to what is cheapest today"
    ],
    answer: "Every recommendation considers the pet's entire lifetime, not just today's visit",
    explanation: "Total Lifetime Care® means today's decision is weighed against its effect on the pet's whole life."
  },
  {
    id: "q18",
    module: 4,
    type: "ordering",
    prompt: "Put the life stages in order as Total Lifetime Care® follows them.",
    sequence: ["Puppy", "Adult", "Senior", "Geriatric"],
    explanation: "Total Lifetime Care® shifts focus at each stage: Puppy, Adult, Senior, then Geriatric."
  },
  {
    id: "q19",
    module: 4,
    type: "matching",
    prompt: "Match each life stage to the Total Lifetime Care® focus at that stage.",
    pairs: [
      { term: "Puppy", definition: "Vaccine series, parasite control, nutrition and early behaviour foundations" },
      { term: "Adult", definition: "Annual wellness, dental health and weight management to hold a healthy baseline" },
      { term: "Senior", definition: "More frequent screening to catch age-related disease before symptoms appear" },
      { term: "Geriatric", definition: "Comfort, mobility and quality of life alongside chronic disease management" }
    ],
    explanation: "Each stage has its own priorities, but the thread running through all of them is prevention and early detection."
  },
  {
    id: "q20",
    module: 4,
    type: "mc",
    prompt: "Which of these is a Total Lifetime Care® focus area?",
    options: [
      "Behaviour",
      "Property insurance",
      "Vehicle transport",
      "Pet photography"
    ],
    answer: "Behaviour",
    explanation: "Total Lifetime Care® spans preventive medicine, nutrition, behaviour, diagnostics, chronic disease management, quality of life and senior care."
  },
  {
    id: "q21",
    module: 4,
    type: "truefalse",
    prompt: "Under Total Lifetime Care®, quality of life is considered part of medical care.",
    answer: "True",
    explanation: "Quality of life sits alongside diagnostics and disease management as something the team actively cares for."
  },
  {
    id: "q22",
    module: 5,
    type: "ordering",
    prompt: "Put the medical decision-making flow in order.",
    sequence: ["Presenting complaint", "History", "Exam", "Differential diagnoses", "Diagnostics", "Treatment plan", "Follow-up"],
    explanation: "The flow moves from the presenting complaint through history and exam, to differentials, diagnostics, a treatment plan, and follow-up."
  },
  {
    id: "q23",
    module: 5,
    type: "mc",
    prompt: "Which of these is a basis for medical decisions at Hannah?",
    options: [
      "Evidence-based medicine",
      "Whichever option is quickest",
      "Whatever was done at the last visit",
      "Whatever the schedule allows"
    ],
    answer: "Evidence-based medicine",
    explanation: "Decisions rest on the physical exam, history, diagnostics, evidence-based medicine, veterinarian judgment and discussion with the Member."
  },
  {
    id: "q24",
    module: 5,
    type: "scenario",
    prompt: "A Member declines the recommended diagnostics. What should happen next?",
    options: [
      "Document the decision, explain the risks and limits of proceeding without them, and offer an alternative plan with follow-up",
      "Proceed as though the diagnostics had been run",
      "Tell the Member no further care can be provided",
      "Say nothing further so the Member does not feel pressured"
    ],
    answer: "Document the decision, explain the risks and limits of proceeding without them, and offer an alternative plan with follow-up",
    explanation: "A declined recommendation is not the end of care. Explain what is unknown without the testing, document the conversation, and offer a safe next-best plan with follow-up."
  },
  {
    id: "q25",
    module: 5,
    type: "truefalse",
    prompt: "The Member's input is part of medical decision making at Hannah.",
    answer: "True",
    explanation: "Member discussion is one of the listed inputs — decisions are made with the Member, not simply announced to them."
  },
  {
    id: "q26",
    module: 5,
    type: "mc",
    prompt: "What comes immediately after forming differential diagnoses?",
    options: [
      "Diagnostics",
      "Follow-up",
      "Presenting complaint",
      "History"
    ],
    answer: "Diagnostics",
    explanation: "Differentials tell you what to test for; diagnostics then narrow the list before a treatment plan is set."
  },
  {
    id: "q27",
    module: 6,
    type: "mc",
    prompt: "Which of the following is a Hannah responsibility rather than a Member responsibility?",
    options: [
      "Education and recommendations",
      "Administering medications at home",
      "Attending scheduled visits",
      "Monitoring day-to-day changes at home"
    ],
    answer: "Education and recommendations",
    explanation: "Hannah owns education, recommendations, medical care, communication and follow-up. The Member owns approval, home administration, monitoring, attendance and raising concerns."
  },
  {
    id: "q28",
    module: 6,
    type: "matching",
    prompt: "Match each responsibility to who holds it.",
    pairs: [
      { term: "Providing medical care and follow-up", definition: "Hannah's responsibility" },
      { term: "Administering medications at home", definition: "The Member's responsibility" }
    ],
    explanation: "Care and follow-up sit with Hannah; giving medication at home sits with the Member. Outcomes depend on both."
  },
  {
    id: "q29",
    module: 6,
    type: "scenario",
    prompt: "A pet has not improved, and it emerges that the medications were not given at home. How should the team frame this?",
    options: [
      "As shared responsibility — revisit understanding of the plan, remove any barriers, and adjust together",
      "As the Member's failure, and note it in the record as non-compliance",
      "As the team's failure, and apologise without discussing the medication",
      "As an unavoidable outcome that nobody could have influenced"
    ],
    answer: "As shared responsibility — revisit understanding of the plan, remove any barriers, and adjust together",
    explanation: "Outcomes are shared. The useful response is to check understanding, uncover what made dosing hard, and rebuild a plan that works at home — not to assign blame."
  },
  {
    id: "q30",
    module: 6,
    type: "truefalse",
    prompt: "Communicating concerns promptly is listed as a Member responsibility.",
    answer: "True",
    explanation: "Members are asked to monitor changes and communicate concerns so the team can respond early."
  },
  {
    id: "q31",
    module: 6,
    type: "mc",
    prompt: "Why does Hannah frame outcomes as a shared responsibility?",
    options: [
      "Because good outcomes require both the team's care and the Member's follow-through at home",
      "Because it distributes blame more evenly when something goes wrong",
      "Because it reduces the team's obligation to follow up",
      "Because Members are expected to make the medical decisions"
    ],
    answer: "Because good outcomes require both the team's care and the Member's follow-through at home",
    explanation: "Most of a pet's life happens at home. Shared responsibility is a description of how outcomes actually work, not a way to allocate fault."
  },
  {
    id: "q32",
    module: 7,
    type: "mc",
    prompt: "In the Explain, Verify, or Refer standard, what does \"Verify\" mean?",
    options: [
      "Confirm the Member's understanding, for example by asking them to describe how they will give the medication",
      "Double-check the medical record for accuracy",
      "Confirm the Member's billing details",
      "Ask a veterinarian to repeat the explanation"
    ],
    answer: "Confirm the Member's understanding, for example by asking them to describe how they will give the medication",
    explanation: "Verify closes the loop: \"Can you tell me how you'll give this medication?\" surfaces gaps while the Member is still with you."
  },
  {
    id: "q33",
    module: 7,
    type: "matching",
    prompt: "Match each question type to the right person to refer it to.",
    pairs: [
      { term: "Medical questions", definition: "DVM" },
      { term: "Billing questions", definition: "Member Advocate" },
      { term: "Behaviour questions", definition: "Training Team" }
    ],
    explanation: "Referring well is a strength, not a gap: medical to the DVM, billing to the Member Advocate, behaviour to the Training Team."
  },
  {
    id: "q34",
    module: 7,
    type: "scenario",
    prompt: "A Member asks a PetNurse whether their pet's medication dose should be doubled because symptoms have returned. What is the right move?",
    options: [
      "Refer — a dosing change is a medical decision for the DVM",
      "Explain — give the Member your best estimate of a safe dose",
      "Verify — ask the Member to repeat the dose they have been giving and leave it there",
      "Tell the Member to stop the medication until the next visit"
    ],
    answer: "Refer — a dosing change is a medical decision for the DVM",
    explanation: "Explain and Verify apply to information you are qualified to give. A dose change is a medical judgment, so it goes to the DVM."
  },
  {
    id: "q35",
    module: 7,
    type: "truefalse",
    prompt: "Referring a question to another team member is a sign that you have failed to do your job.",
    answer: "False",
    explanation: "Knowing when someone else should help is part of the standard. Referring accurately protects the Member and the pet."
  },
  {
    id: "q36",
    module: 7,
    type: "mc",
    prompt: "A PetNurse examines and verbalises findings. Who performs the Hannahware data entry?",
    options: [
      "The Nurse Aide",
      "The Member Advocate",
      "The Training Team",
      "The DVM"
    ],
    answer: "The Nurse Aide",
    explanation: "The roles are deliberately separated: the PetNurse examines and verbalises, and the Nurse Aide enters the data in Hannahware."
  },
  {
    id: "q37",
    module: 7,
    type: "mc",
    prompt: "What does \"Explain\" require of you?",
    options: [
      "Providing accurate information within your scope",
      "Providing whatever answer reassures the Member fastest",
      "Explaining only when the Member asks twice",
      "Repeating the DVM's words without understanding them"
    ],
    answer: "Providing accurate information within your scope",
    explanation: "Explain means giving accurate information — which also means recognising when a question moves beyond what you can answer."
  },
  {
    id: "q38",
    module: 8,
    type: "scenario",
    prompt: "Cooper is an eight-week-old Labrador who has just joined Hannah. His Member asks whether the vaccine series really needs all its visits. What reflects the Hannah philosophy?",
    options: [
      "Explain that the full series is what builds durable protection, and book the visits now",
      "Agree that one vaccination is usually enough for a healthy puppy",
      "Suggest waiting until Cooper is an adult to start vaccinating",
      "Leave the decision entirely open and take no further action"
    ],
    answer: "Explain that the full series is what builds durable protection, and book the visits now",
    explanation: "Completing the series is preventive care at its most basic. Explaining the reason and scheduling the visits makes follow-through easy."
  },
  {
    id: "q39",
    module: 8,
    type: "scenario",
    prompt: "At Cooper's annual wellness visit as a healthy adult, his Member asks why bloodwork is worth doing when nothing seems wrong.",
    options: [
      "Baseline results while he is healthy make future changes far easier to spot early",
      "Bloodwork is only useful once a pet shows symptoms",
      "It is mainly a formality and can be skipped",
      "It replaces the need for a physical exam"
    ],
    answer: "Baseline results while he is healthy make future changes far easier to spot early",
    explanation: "A healthy baseline is what makes early detection possible later — this is continuous monitoring in action."
  },
  {
    id: "q40",
    module: 8,
    type: "scenario",
    prompt: "Cooper, now seven, has a mild ear infection. His Member wants to treat it at home with leftover medication. What is the Hannah response?",
    options: [
      "Bring Cooper in — the exam is covered, and treating the wrong cause can make an ear worse",
      "Approve using the leftover medication to save the Member a trip",
      "Suggest waiting two weeks to see whether it clears on its own",
      "Refer the Member to a pet shop for an over-the-counter product"
    ],
    answer: "Bring Cooper in — the exam is covered, and treating the wrong cause can make an ear worse",
    explanation: "Unlimited exams exist for exactly this. Ear disease has several causes, and the right treatment depends on identifying which one it is."
  },
  {
    id: "q41",
    module: 8,
    type: "mc",
    prompt: "What is the point of Cooper's story?",
    options: [
      "Consistent preventive choices across a pet's life compound into better outcomes",
      "A single excellent visit determines a pet's lifespan",
      "Senior pets need less medical attention than puppies",
      "Preventive care matters only in the first year"
    ],
    answer: "Consistent preventive choices across a pet's life compound into better outcomes",
    explanation: "No one decision in Cooper's journey is dramatic. It is the accumulation of preventive choices that shapes his senior years."
  },
  {
    id: "q42",
    module: 8,
    type: "truefalse",
    prompt: "Senior screening is recommended more frequently than adult wellness screening because disease becomes more likely with age.",
    answer: "True",
    explanation: "Increasing screening frequency as a pet ages is how Hannah keeps catching disease before it becomes symptomatic."
  },
  {
    id: "q43",
    module: 8,
    type: "ordering",
    prompt: "Put Cooper's journey in order.",
    sequence: ["Joins Hannah as a puppy", "Vaccination series", "Behaviour training", "Annual wellness visits", "Senior screening", "Healthy senior years"],
    explanation: "Cooper's journey runs from joining Hannah through vaccinations, behaviour work, annual wellness and senior screening into healthy senior years."
  },
  {
    id: "q44",
    module: 8,
    type: "mc",
    prompt: "Cooper's Member mentions he is jumping up on visitors and they are unsure how to handle it. What is the best next step?",
    options: [
      "Refer the behaviour question to the Training Team so it is addressed early",
      "Tell the Member it is normal and will pass with age",
      "Recommend medication to calm him down",
      "Suggest keeping Cooper away from visitors indefinitely"
    ],
    answer: "Refer the behaviour question to the Training Team so it is addressed early",
    explanation: "Behaviour is part of Total Lifetime Care®, and behaviour questions route to the Training Team. Addressing it early prevents a harder problem later."
  },
  {
    id: "q45",
    module: 2,
    type: "mc",
    prompt: "Which term should always be used for the people Hannah cares for?",
    options: [
      "Member",
      "Owner",
      "Customer",
      "Client"
    ],
    answer: "Member",
    explanation: "Hannah consistently uses \"Member\" — the word reflects the ongoing relationship rather than a transaction."
  },
  {
    id: "q46",
    module: 1,
    type: "mc",
    prompt: "Preventive medicine strengthens which relationship in particular?",
    options: [
      "The relationship between the veterinary team and the Member",
      "The relationship between two unrelated hospitals",
      "The relationship between diagnostics and billing",
      "No relationship — it is purely clinical"
    ],
    answer: "The relationship between the veterinary team and the Member",
    explanation: "Regular preventive contact builds trust over time, which makes every later conversation about care easier."
  },
  {
    id: "q47",
    module: 5,
    type: "truefalse",
    prompt: "A physical exam and patient history are both inputs to medical decision making.",
    answer: "True",
    explanation: "Both sit alongside diagnostics, evidence-based medicine, veterinarian judgment and Member discussion."
  },
  {
    id: "q48",
    module: 3,
    type: "matching",
    prompt: "Match each mindset to the model it describes.",
    pairs: [
      { term: "Reactive care", definition: "Traditional veterinary care" },
      { term: "Preventive-first mindset", definition: "The Hannah model" },
      { term: "Lifelong relationship", definition: "The Hannah model, extended over time" }
    ],
    explanation: "Reactive care waits for illness; a preventive-first mindset and a lifelong relationship are what distinguish the Hannah model."
  }
];
