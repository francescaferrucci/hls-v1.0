
const state = {
 role: "General Manager",
 location: "Portland Market",
 learningTab: "assigned",
 managerTab: "team",
 competencyFilter: "all",
 savedCourses: new Set(),
 completedCourses: new Set(["Hannah Foundations"]),
 currentSim: null,
 simStep: 0,
 simScore: 0
};

const roleProfiles = {
 "General Manager": {manager:true,admin:true,readiness:84,continue:"Leadership Academy: Performance Management",progress:64},
 "Pet Nurse": {manager:false,admin:false,readiness:81,continue:"Medical Academy: Patient Assessment",progress:58},
 "DVM / Practitioner": {manager:false,admin:false,readiness:88,continue:"Diagnostic Testing Protocols",progress:73},
 "Service Coordinator": {manager:false,admin:false,readiness:86,continue:"Member Services: Phone Excellence",progress:67},
 "Membership Coordinator": {manager:false,admin:false,readiness:83,continue:"Membership Enrollment Accuracy",progress:49},
 "Member Advocate": {manager:false,admin:false,readiness:85,continue:"Medical Records Request Process",progress:78}
};

const academies = [
 {id:"foundations",title:"Foundations Academy",track:"foundation",group:"Operations",icon:"H",progress:100,description:"Hannah culture, service philosophy, safety, compliance, and core expectations."},
 {id:"medical",title:"Medical Academy",track:"clinical",group:"Clinical",icon:"＋",progress:72,description:"Patient assessment, diagnostics, treatment workflows, and clinical communication."},
 {id:"client",title:"Member Services Academy",track:"client",group:"Member Services",icon:"☎",progress:64,description:"Service Coordinator, Membership Coordinator, and Member Advocate pathways."},
 {id:"leadership",title:"Leadership Academy",track:"leadership",group:"Leadership",icon:"★",progress:48,description:"Coaching, accountability, performance, team membersing, and operational leadership."},
 {id:"operations",title:"Operations Academy",track:"operations",group:"Operations",icon:"⚙",progress:56,description:"Billing, records, scheduling, inventory, systems, and quality processes."},
 {id:"ce",title:"Continuing Education",track:"ce",group:"Clinical",icon:"↗",progress:31,description:"Advanced professional growth and role-specific continuing education."}
];

const courses = [
 {title:"Phone Answering Expectations",academy:"Member Services Academy",role:"Service Coordinator",progress:0,status:"assigned",duration:"12 min",due:"Jul 29",track:"client"},
 {title:"Diagnostic Testing Protocol",academy:"Medical Academy",role:"DVM / Practitioner",progress:42,status:"progress",duration:"18 min",due:"Jul 31",track:"clinical"},
 {title:"Nose-to-Tail Exam",academy:"Medical Academy",role:"Pet Nurse",progress:58,status:"progress",duration:"24 min",due:"Aug 3",track:"clinical"},
 {title:"Medical Records Request Process",academy:"Operations Academy",role:"Member Advocate",progress:78,status:"progress",duration:"10 min",due:"Aug 5",track:"operations"},
 {title:"Membership Enrollment Accuracy",academy:"Member Services Academy",role:"Membership Coordinator",progress:0,status:"assigned",duration:"16 min",due:"Aug 10",track:"client"},
 {title:"Accountability Conversations",academy:"Leadership Academy",role:"Leadership",progress:0,status:"assigned",duration:"20 min",due:"Aug 12",track:"leadership"},
 {title:"Hannah Foundations",academy:"Foundations Academy",role:"All roles",progress:100,status:"completed",duration:"45 min",due:"Completed",track:"foundation"},
 {title:"Cycle of Service",academy:"Member Services Academy",role:"Member Services",progress:100,status:"completed",duration:"25 min",due:"Completed",track:"client"},
 {title:"Canine Otitis Externa",academy:"Medical Academy",role:"Clinical",progress:0,status:"saved",duration:"30 min",due:"Optional",track:"clinical"}
];

const resources = [
 {title:"Medical Records Request Process",category:"Operations",type:"Procedure",version:"v2.1",effective:"Jul 16, 2026",icon:"P",summary:"Hannahware workflow for Member medical record requests."},
 {title:"Phone Answering Expectations",category:"Member Services",type:"Policy",version:"v1.0",effective:"Jul 16, 2026",icon:"☎",summary:"Three-ring standard, cold transfers, and high-volume call handling."},
 {title:"Diagnostic Testing Protocol",category:"Clinical",type:"Protocol",version:"v3.2",effective:"Jul 8, 2026",icon:"＋",summary:"Approval and ordering expectations for outside diagnostic testing."},
 {title:"Nose-to-Tail Examination",category:"Clinical",type:"Procedure",version:"v2.0",effective:"Jul 21, 2026",icon:"＋",summary:"Standardized patient examination and documentation workflow."},
 {title:"Cycle of Service",category:"Member Services",type:"Guide",version:"v4.0",effective:"Jul 8, 2026",icon:"C",summary:"Member experience standards from arrival through follow-up."},
 {title:"ER On-Call Expectations",category:"Clinical",type:"Policy",version:"v1.4",effective:"Jul 13, 2026",icon:"!",summary:"On-call availability, response, and escalation expectations."},
 {title:"Leadership Coaching Framework",category:"Leadership",type:"Guide",version:"v1.0",effective:"Jul 20, 2026",icon:"★",summary:"Objective, fair, documented coaching and accountability conversations."},
 {title:"Annual OSHA Refresher",category:"Compliance",type:"Course",version:"2026",effective:"Jan 1, 2026",icon:"✓",summary:"Required annual workplace safety training."}
];

const diagnostics = [
 {title:"Respiratory Distress",tags:["Emergency","Breathing","Oxygen"],description:"Rapid recognition, immediate stabilization, and escalation pathway."},
 {title:"Possible Blocked Cat",tags:["Emergency","Urinary","Feline"],description:"Triage, stabilization, diagnostic, and treatment workflow."},
 {title:"Acute Vomiting",tags:["GI","Diagnostics","Triage"],description:"History, risk stratification, minimum database, and next steps."},
 {title:"Otic Disorder",tags:["Ear","Cytology","Dermatology"],description:"Ear examination, cytology, predisposing factors, and treatment pathway."},
 {title:"Red Eye",tags:["Ophthalmology","Pain","Urgent"],description:"Urgency screening and diagnostic workflow for ocular presentations."},
 {title:"Anemia",tags:["CBC","Urgent","Workup"],description:"Severity assessment, regeneration, stabilization, and diagnostic pathway."},
 {title:"Dysuria / Incontinence",tags:["Urinary","UA","Imaging"],description:"Differentiate lower urinary disease, obstruction risk, and incontinence."},
 {title:"Growth or Lump",tags:["Mass","Cytology","Imaging"],description:"Measurement, sampling, imaging, and follow-up decision support."}
];

const competencies = [
 {name:"Nose-to-Tail Exam",owner:"Emily Johnson",role:"Pet Nurse",status:"Certified",expires:"Jan 2027"},
 {name:"IV Catheter Placement",owner:"Marcus Lee",role:"Pet Nurse",status:"Practicing",expires:"—"},
 {name:"Urgent Call Triage",owner:"Sofia Ramirez",role:"Service Coordinator",status:"Awaiting Sign-Off",expires:"—"},
 {name:"Membership Presentation",owner:"Maya Chen",role:"Membership Coordinator",status:"Certified",expires:"Mar 2027"},
 {name:"CPR Certification",owner:"Taylor Brooks",role:"Pet Nurse",status:"Expiring",expires:"Aug 2026"},
 {name:"Conflict Resolution",owner:"Jordan Kim",role:"Leadership",status:"Practicing",expires:"—"},
 {name:"Medical Records Workflow",owner:"Alex Rivera",role:"Member Advocate",status:"Certified",expires:"—"}
];

const simulations = [
 {id:"patient-decline",title:"Hospitalized Patient Decline",role:"Pet Nurse",difficulty:"Advanced",duration:"18 min",track:"clinical",description:"Recognize changing patient status, update the treatment timeline, and escalate appropriately."},
 {id:"urgent-triage",title:"Urgent Call Triage",role:"Service Coordinator",difficulty:"Intermediate",duration:"12 min",track:"client",description:"Respond to a Member reporting rapid breathing and pale gums."},
 {id:"membership-objection",title:"Membership Price Objection",role:"Membership Coordinator",difficulty:"Intermediate",duration:"10 min",track:"operations",description:"Use discovery and value-based communication without overpromising."},
 {id:"upset-member",title:"Upset Member at Discharge",role:"Member Advocate",difficulty:"Intermediate",duration:"14 min",track:"client",description:"Acknowledge, clarify, restore confidence, and document follow-up."},
 {id:"coaching",title:"Accountability Conversation",role:"Leadership",difficulty:"Advanced",duration:"16 min",track:"leadership",description:"Address a repeated performance gap with clarity, support, and accountability."},
 {id:"blocked-cat",title:"Possible Blocked Cat",role:"DVM / Practitioner",difficulty:"Advanced",duration:"20 min",track:"clinical",description:"Prioritize stabilization, diagnostics, and communication for possible obstruction."}
];

const team = [
 {name:"Emily Johnson",initials:"EJ",role:"Pet Nurse",location:"HE1 Portland",completion:91,overdue:0,skills:12,status:"On track"},
 {name:"Marcus Lee",initials:"ML",role:"Pet Nurse",location:"HE2 Tigard",completion:82,overdue:2,skills:15,status:"Attention"},
 {name:"Taylor Brooks",initials:"TB",role:"Pet Nurse",location:"HE2 ER",completion:76,overdue:1,skills:10,status:"Attention"},
 {name:"Sofia Ramirez",initials:"SR",role:"Service Coordinator",location:"HE1 Portland",completion:94,overdue:0,skills:9,status:"On track"},
 {name:"Maya Chen",initials:"MC",role:"Membership Coordinator",location:"HE2 Tigard",completion:88,overdue:0,skills:8,status:"On track"},
 {name:"Jordan Kim",initials:"JK",role:"Leadership",location:"HE2 Tigard",completion:79,overdue:1,skills:11,status:"Attention"},
 {name:"Alex Rivera",initials:"AR",role:"Member Advocate",location:"HE1 Portland",completion:86,overdue:0,skills:7,status:"On track"},
 {name:"Dr. Ana Mejia",initials:"AM",role:"DVM / Practitioner",location:"HE2 Tigard",completion:89,overdue:0,skills:14,status:"On track"},
 {name:"Noah Williams",initials:"NW",role:"Service Coordinator",location:"HE2 ER",completion:68,overdue:3,skills:5,status:"At risk"}
];

const assignments = [
 {title:"Phone Answering Expectations",audience:"Service Coordinators",due:"Jul 29",complete:"78%",status:"Active"},
 {title:"Diagnostic Testing Protocol",audience:"DVM / Practitioners",due:"Jul 31",complete:"71%",status:"Active"},
 {title:"Nose-to-Tail Exam",audience:"Pet Nurses",due:"Aug 3",complete:"64%",status:"Active"},
 {title:"Medical Records Request Process",audience:"Member Advocates",due:"Aug 5",complete:"82%",status:"Active"},
 {title:"Membership Enrollment Accuracy",audience:"Membership Coordinators",due:"Aug 10",complete:"0%",status:"Scheduled"}
];

const contentItems = [
 {type:"Course",title:"Nose-to-Tail Exam",academy:"Medical Academy",status:"Published",updated:"Jul 21"},
 {type:"Procedure",title:"Medical Records Request Process",academy:"Operations Academy",status:"Published",updated:"Jul 16"},
 {type:"Simulation",title:"Urgent Call Triage",academy:"Member Services Academy",status:"Draft",updated:"Jul 24"},
 {type:"Course",title:"Membership Enrollment Accuracy",academy:"Member Services Academy",status:"Review",updated:"Jul 24"},
 {type:"Quiz",title:"Canine Otitis Externa",academy:"Medical Academy",status:"Published",updated:"Jul 23"}
];

const simulationSteps = {
 "urgent-triage":[
  {heading:"The call begins",text:"A Member says their dog is breathing very fast, will not lie down, and the gums look pale.",details:["Caller is at home","Pet is conscious","Symptoms worsened over 20 minutes"],options:[
   ["Ask the Member to hold while you finish another task.",false,"Potential respiratory distress requires immediate attention."],
   ["Keep the Member on the line, confirm location, and alert the medical team that an urgent arrival may be coming.",true,"Correct. You recognized a potential emergency and began coordinated triage."],
   ["Offer the next available appointment tomorrow.",false,"These symptoms should not wait for a routine appointment."]
  ]},
  {heading:"Clarify immediate risk",text:"The Member asks whether they should wait to see if the breathing improves.",details:["Respiratory effort remains high","Pale gums continue","Travel time is 15 minutes"],options:[
   ["Tell them to monitor for another hour.",false,"Waiting could delay life-saving care."],
   ["Advise immediate evaluation and explain that breathing difficulty and pale gums are emergency warning signs.",true,"Correct. Clear, confident direction reduces dangerous delays."],
   ["Give detailed home treatment instructions.",false,"A Service Coordinator should not attempt to manage this emergency at home."]
  ]},
  {heading:"Prepare the hospital",text:"The Member confirms they are leaving now for HE2 ER.",details:["Estimated arrival: 15 minutes","Pet may need oxygen immediately"],options:[
   ["Document the call and alert the ER team with the Pet name, symptoms, and ETA.",true,"Correct. This supports a prepared, coordinated handoff."],
   ["Wait until they arrive before telling anyone.",false,"Advance notice allows the team to prepare."],
   ["Transfer the call without providing context.",false,"A contextual handoff is safer and more efficient."]
  ]}
 ],
 "patient-decline":[
  {heading:"A change in status",text:"A hospitalized dog that was resting comfortably is now restless, panting, and repeatedly changing position.",details:["Heart rate increased from 100 to 148","Respiratory rate increased from 24 to 48","Mucous membranes are pale pink"],options:[
   ["Record the vitals and wait until the next scheduled check.",false,"A meaningful trend requires prompt reassessment and escalation."],
   ["Repeat the assessment, alert the clinician, and prepare likely support while awaiting direction.",true,"Correct. You recognized a concerning change and escalated appropriately."],
   ["Offer food and water first.",false,"Stabilization and clinical reassessment take priority."]
  ]},
  {heading:"The plan changes",text:"The clinician orders oxygen, repeat blood pressure, PCV/TS, and more frequent monitoring.",details:["Oxygen ordered now","Vitals every 15 minutes","Diagnostics added"],options:[
   ["Add the new treatments and monitoring frequency to the timeline and communicate changes to the care team.",true,"Correct. Plan changes must update the treatment timeline and tasks."],
   ["Write the orders on paper only.",false,"The active treatment plan and task timeline must reflect the changes."],
   ["Wait for shift change to enter the orders.",false,"Delayed entry creates patient-safety risk."]
  ]}
 ]
};

simulations.forEach(s=>{
 if(!simulationSteps[s.id]) simulationSteps[s.id]=[
  {heading:s.title,text:s.description,details:["Review the information provided","Consider Hannah policy and your role"],options:[
   ["Choose the response that prioritizes safety, clear communication, and approved workflow.",true,"Correct. Hannah decisions should align safety, communication, and the approved process."],
   ["Skip documentation to save time.",false,"Documentation supports continuity and accountability."],
   ["Act outside your role instead of escalating.",false,"Recognize role limits and escalate appropriately."]
  ]},
  {heading:"Complete the follow-through",text:"The immediate issue is addressed. What is the strongest next step?",details:["The outcome must be documented","Other team members may need context"],options:[
   ["Document the outcome, communicate next steps, and confirm ownership.",true,"Correct. Closed-loop follow-through is essential."],
   ["Assume someone else will handle it.",false,"Ownership should be explicit."],
   ["Wait until the end of the week to update the record.",false,"Documentation should be timely."]
  ]}
 ];
});

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(html){$("#modalContent").innerHTML=html;$("#modal").showModal()}
function switchView(id){
 $$(".view").forEach(v=>v.classList.toggle("active",v.id===id));
 $$(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
 const n=$(`.nav[data-view="${id}"]`);$("#pageLabel").textContent=n?n.textContent.trim():"Simulation";
 $("#sidebar").classList.remove("open");window.scrollTo(0,0);
}
$$(".nav").forEach(n=>n.addEventListener("click",()=>switchView(n.dataset.view)));
$$("[data-jump]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.jump)));
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));

function applyHashRoute(){const id=location.hash.replace('#','');if(id&&document.getElementById(id)?.classList.contains('view'))switchView(id)}
window.addEventListener('hashchange',applyHashRoute);


function updateRole(){
 state.role=$("#roleSwitch").value;state.location=$("#locationSwitch").value;
 const p=roleProfiles[state.role];
 $$(".manager-only").forEach(x=>x.style.display=p.manager?"":"none");
 $$(".admin-only").forEach(x=>x.style.display=p.admin?"":"none");
 $("#readinessScore").textContent=p.readiness+"%";
 $("#continueTitle").textContent=p.continue;
 $("#continueMeta").textContent=`Current course • ${p.progress}% complete`;
 $("#continueProgress").style.width=p.progress+"%";
 renderDashboard();renderCourses();renderSimulations();renderManager();
 toast(`View updated for ${state.role} at ${state.location}`);
 if(!p.manager && ["manager","content","reports","admin"].includes(document.querySelector(".view.active").id)) switchView("dashboard");
}
$("#roleSwitch").addEventListener("change",updateRole);$("#locationSwitch").addEventListener("change",updateRole);

function renderDashboard(){
 const p=roleProfiles[state.role];
 const metrics=p.manager?[
  ["Active learners","96","Across three locations"],
  ["Completion rate","87%","Up 4% this month"],
  ["Pending sign-offs","17","Manager validation required"],
  ["Compliance risk","6","Due within 30 days"]
 ]:[
  ["Assigned learning","4","Two due this week"],
  ["Completion rate","86%","Up 5% this month"],
  ["Validated skills","9","Two ready for sign-off"],
  ["Certificates","3","All currently valid"]
 ];
 $("#dashboardMetrics").innerHTML=metrics.map(m=>`<article class="metric"><span>${m[0]}</span><strong>${m[1]}</strong><small>${m[2]}</small></article>`).join("");
 $("#actionQueue").innerHTML=(p.manager?[
  ["Overdue learning","14 assignments","risk"],["Competency reviews","4 pending","warning"],["Renewals","6 due soon","warning"]
 ]:[
  ["Assigned course","Due Jul 29","warning"],["Skill sign-off","Ready to request","good"],["Simulation","Recommended","neutral"]
 ]).map(x=>`<div class="queue-item"><div><strong>${x[0]}</strong><span>${x[1]}</span></div><span class="badge ${x[2]}">Review</span></div>`).join("");
 const qs=["What is the blocked cat protocol?","How do I request medical records?","What is the phone answering expectation?","How do outside labs get approved?"];
 $("#popularQuestions").innerHTML=qs.map(q=>`<button class="question-item question-link" data-question="${q}"><span>${q}</span><span>→</span></button>`).join("");
 $$(".question-link").forEach(b=>b.addEventListener("click",()=>{switchView("ask");$("#askInput").value=b.dataset.question;askHannah()}));
 $("#dashboardAcademies").innerHTML=academies.slice(0,3).map(a=>`<button class="mini-academy dashboard-academy" data-academy="${a.id}"><strong>${a.title}</strong><span>${a.progress}% complete</span><div class="progress"><span style="width:${a.progress}%"></span></div></button>`).join("");
 $$(".dashboard-academy").forEach(b=>b.onclick=()=>b.dataset.academy==="foundations"?switchView("foundationsAcademy"):switchView("academies"));
}
$("#resumeLessonBtn").addEventListener("click",()=>openCourse(roleProfiles[state.role].continue));

function renderCourses(){
 const tab=state.learningTab;
 let list=courses.filter(c=>tab==="assigned"?["assigned","progress"].includes(c.status):c.status===tab);
 if(tab==="saved") list=courses.filter(c=>c.status==="saved"||state.savedCourses.has(c.title));
 if(state.role!=="General Manager") {
  const relevant=list.filter(c=>c.role===state.role||c.role==="All roles"||c.role==="Clinical"&&["Pet Nurse","DVM / Practitioner"].includes(state.role)||c.role==="Member Services"&&["Service Coordinator","Membership Coordinator","Member Advocate"].includes(state.role));
  if(relevant.length) list=relevant;
 }
 $("#courseGrid").innerHTML=list.map(c=>`<article class="course-card"><div class="card-banner ${c.track}"><strong>${c.academy}</strong><span>${c.role}</span></div><div class="card-body"><h2>${c.title}</h2><div class="card-meta"><span>${c.duration}</span><span>${c.due}</span></div><div class="progress"><span style="width:${c.progress}%"></span></div><div class="card-footer"><strong>${c.progress}%</strong><div><button class="secondary save-course" data-title="${c.title}">${state.savedCourses.has(c.title)?"Saved":"Save"}</button> <button class="primary open-course" data-title="${c.title}">${c.progress?"Continue":"Start"}</button></div></div></div></article>`).join("");
 $$(".open-course").forEach(b=>b.addEventListener("click",()=>openCourse(b.dataset.title)));
 $$(".save-course").forEach(b=>b.addEventListener("click",()=>{state.savedCourses.add(b.dataset.title);toast("Course saved");renderCourses()}));
}
$("#learningTabs").addEventListener("click",e=>{if(!e.target.matches(".chip"))return;$$("#learningTabs .chip").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");state.learningTab=e.target.dataset.tab;renderCourses()});
function openCourse(title){
 openModal(`<span class="eyebrow">Interactive course preview</span><h1 class="modal-title">${title}</h1><p>This unified prototype demonstrates the course-launch experience. A production course would include lessons, videos, knowledge checks, acknowledgments, and completion tracking.</p><div class="detail-card"><strong>Learning objective</strong><span>Apply the approved Hannah workflow consistently and explain why each step matters.</span></div><div class="detail-card"><strong>Progress</strong><span>Your progress is saved in this browser session.</span></div><button class="primary" id="completeCourseModal">Mark lesson complete</button>`);
 $("#completeCourseModal").addEventListener("click",()=>{state.completedCourses.add(title);$("#modal").close();toast("Lesson completed and progress updated")});
}
$("#certificateBtn").addEventListener("click",()=>openModal(`<span class="eyebrow">My achievements</span><h1 class="modal-title">Certificates</h1>${["Hannah Foundations","Cycle of Service","Annual OSHA Refresher"].map(x=>`<div class="list-item"><div><strong>${x}</strong><span class="badge good">Valid</span></div><button class="secondary">View</button></div>`).join("")}`));

function renderAcademies(){
 const f=$("#academyRoleFilter").value;
 const list=academies.filter(a=>f==="all"||a.group===f);
 $("#academyGrid").innerHTML=list.map(a=>`<article class="academy-card"><div class="academy-icon ${a.track}">${a.icon}</div><span class="eyebrow">${a.group}</span><h2>${a.title}</h2><p>${a.description}</p><div class="progress"><span style="width:${a.progress}%"></span></div><div class="card-footer"><strong>${a.progress}% complete</strong><button class="primary academy-open" data-title="${a.title}">Open academy</button></div></article>`).join("");
 $$(".academy-open").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.title==="Foundations Academy") return switchView("foundationsAcademy");
  openModal(`<span class="eyebrow">Curriculum map</span><h1 class="modal-title">${b.dataset.title}</h1>${["Foundation knowledge","Role-specific workflow","Guided practice","Knowledge check","Competency validation"].map((x,i)=>`<div class="list-item"><span>${i+1}. ${x}</span><span class="badge ${i<2?"good":i===2?"warning":"neutral"}">${i<2?"Complete":i===2?"Current":"Locked"}</span></div>`).join("")}`)
 }));
}
$("#academyRoleFilter").addEventListener("change",renderAcademies);

const answers = [
 {keys:["medical records","records request"],answer:"In the Member profile, go to Active Hannah Pets and select Medical Records Request for each Pet. Confirm the Member's email address and prepare the Member for the payment authorization email. The Member Advocate Team processes the request; do not enter the request in Slack.",sources:["Medical Records Request Process — v2.1","Member Advocate Workflow Guide — v1.3"]},
 {keys:["phone","three rings","call"],answer:"All calls routed to front desk or medical are expected to be answered within three rings. During high call volume, briefly place the current Member on hold, answer the incoming call using the high-volume greeting, place that caller on hold, and return to the original call.",sources:["Phone Answering Expectations — v1.0","Cycle of Service — v4.0"]},
 {keys:["blocked cat","urinary obstruction"],answer:"Treat a possible blocked cat as an emergency. Promptly alert the clinical team, assess stability, prepare for immediate evaluation and stabilization, and use the approved Blocked Cat diagnostic pathway. Do not delay evaluation while attempting routine scheduling.",sources:["Possible Blocked Cat Pathway — v3.0","Emergency Triage Standards — v2.4"]},
 {keys:["outside lab","diagnostic testing","approval"],answer:"Outside diagnostic testing must follow the Hannahware Diagnostic Workflow Hub and required submission and approval process. Only authorized DVMs or Pet Practitioners should place the order using their PIN. The approved form and documentation must be completed before processing.",sources:["Diagnostic Testing Protocol — v3.2","Diagnostic Workflow Hub Guide — v2.0"]},
 {keys:["on-call","on call"],answer:"The on-call Practitioner must remain reliably available and respond promptly. Failed contact attempts should be escalated according to the current ER escalation pathway and documented with the patient-care impact.",sources:["ER On-Call Expectations — v1.4"]}
];
function askHannah(){
 const q=$("#askInput").value.trim();if(!q)return;
 const user=document.createElement("div");user.className="message user";user.innerHTML=`<div class="message-avatar">FF</div><div><strong>You</strong><p>${escapeHtml(q)}</p></div>`;$("#chatMessages").appendChild(user);
 const lower=q.toLowerCase();const hit=answers.find(a=>a.keys.some(k=>lower.includes(k)));
 const a=hit||{answer:"I found related Hannah resources, but this prototype does not have enough approved content to give a definitive answer. In production, Ask Hannah would retrieve current permission-aware sources, cite them, and route uncertain clinical or policy questions to the appropriate leader.",sources:["Prototype knowledge index"]};
 const msg=document.createElement("div");msg.className="message assistant";msg.innerHTML=`<div class="message-avatar">H</div><div><strong>Hannah</strong><p>${a.answer}</p><div class="citation-box"><span class="eyebrow">Sources</span>${a.sources.map(s=>`<button class="citation">${s}</button>`).join("")}</div></div>`;$("#chatMessages").appendChild(msg);
 $("#askInput").value="";$("#chatMessages").scrollTop=$("#chatMessages").scrollHeight;
 $$(".citation").forEach(c=>c.addEventListener("click",()=>toast("Source preview opened")));
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
$("#askBtn").addEventListener("click",askHannah);$("#askInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askHannah()}});
const suggestions=["What is the medical records request process?","What is the blocked cat protocol?","How should high call volume be handled?","How are outside diagnostics approved?"];
$("#suggestedQuestions").innerHTML=suggestions.map(q=>`<button class="suggestion" data-q="${q}">${q}</button>`).join("");
$$(".suggestion").forEach(b=>b.addEventListener("click",()=>{$("#askInput").value=b.dataset.q;askHannah()}));

function renderResources(){
 const q=$("#knowledgeSearch").value.toLowerCase(),cat=$("#knowledgeCategory").value;
 const list=resources.filter(r=>(cat==="all"||r.category===cat)&&(!q||`${r.title} ${r.summary} ${r.type}`.toLowerCase().includes(q)));
 $("#resourceList").innerHTML=list.map(r=>`<div class="resource-row"><div class="resource-icon">${r.icon}</div><div><strong>${r.title}</strong><span>${r.summary}</span></div><span>${r.category}</span><span>${r.type}</span><span>${r.version}<br>${r.effective}</span><button class="secondary resource-open" data-title="${r.title}">Open</button></div>`).join("");
 $$(".resource-open").forEach(b=>b.addEventListener("click",()=>openResource(b.dataset.title)));
}
function openResource(title){
 const r=resources.find(x=>x.title===title);
 openModal(`<span class="eyebrow">${r.category} • ${r.type}</span><h1 class="modal-title">${r.title}</h1><p>${r.summary}</p><div class="detail-card"><strong>Current version</strong><span>${r.version} • Effective ${r.effective}</span></div><div class="detail-card"><strong>Approval status</strong><span>Approved and published</span></div><button class="primary">Launch resource</button>`);
}
$("#knowledgeSearch").addEventListener("input",renderResources);$("#knowledgeCategory").addEventListener("change",renderResources);
$("#uploadResourceBtn").addEventListener("click",()=>contentForm("Add knowledge resource"));

function renderDiagnostics(){
 const q=$("#diagnosticSearch").value.toLowerCase();
 const list=diagnostics.filter(d=>!q||`${d.title} ${d.tags.join(" ")} ${d.description}`.toLowerCase().includes(q));
 $("#diagnosticGrid").innerHTML=list.map(d=>`<article class="diagnostic-card"><span class="eyebrow">Diagnostic pathway</span><h2>${d.title}</h2><p>${d.description}</p><div class="diagnostic-tags">${d.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><button class="primary diagnostic-open" data-title="${d.title}">Open pathway</button></article>`).join("");
 $$(".diagnostic-open").forEach(b=>b.addEventListener("click",()=>openDiagnostic(b.dataset.title)));
}
function openDiagnostic(title){
 const d=diagnostics.find(x=>x.title===title);
 openModal(`<span class="eyebrow">Clinical decision support</span><h1 class="modal-title">${d.title}</h1><p>${d.description}</p>${["Assess urgency and stability","Review minimum diagnostic database","Select approved diagnostics","Document and communicate plan","Reassess and update timeline"].map((x,i)=>`<div class="list-item"><span>${i+1}. ${x}</span><span class="badge ${i===0?"warning":"neutral"}">${i===0?"Start here":"View"}</span></div>`).join("")}<p class="safety-note"><strong>Clinical note</strong><span>This prototype is illustrative. Production pathways require current CMO-approved content and safety review.</span></p>`);
}
$("#diagnosticSearch").addEventListener("input",renderDiagnostics);$("#guidedTriageBtn").addEventListener("click",()=>openModal(`<span class="eyebrow">Guided triage</span><h1 class="modal-title">What is the primary concern?</h1><div class="form-grid"><label class="full">Presenting complaint<select><option>Breathing difficulty</option><option>Unable to urinate</option><option>Seizure</option><option>Vomiting</option><option>Red eye</option></select></label><label>Species<select><option>Dog</option><option>Cat</option></select></label><label>Current status<select><option>Stable</option><option>Concerning</option><option>Critical</option></select></label></div><button class="primary" id="triageNext">Show pathway</button>`));

function renderCompetencies(){
 const f=state.competencyFilter,list=competencies.filter(c=>f==="all"||c.status===f);
 const counts=[["Certified",competencies.filter(c=>c.status==="Certified").length],["Practicing",competencies.filter(c=>c.status==="Practicing").length],["Awaiting sign-off",competencies.filter(c=>c.status==="Awaiting Sign-Off").length],["Expiring",competencies.filter(c=>c.status==="Expiring").length]];
 $("#competencyMetrics").innerHTML=counts.map(x=>`<div class="metric-small"><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join("");
 $("#competencyTable").innerHTML=`<div class="competency-head"><span>Competency</span><span>Team member</span><span>Status</span><span>Expiration</span><span></span></div>`+list.map(c=>`<div class="competency-row"><strong>${c.name}</strong><span>${c.owner}<br>${c.role}</span><span class="badge ${c.status==="Certified"?"good":c.status==="Expiring"?"risk":c.status==="Practicing"?"warning":"neutral"}">${c.status}</span><span>${c.expires}</span><button class="secondary competency-open" data-name="${c.name}">Review</button></div>`).join("");
 $$(".competency-open").forEach(b=>b.addEventListener("click",()=>openModal(`<span class="eyebrow">Competency profile</span><h1 class="modal-title">${b.dataset.name}</h1><div class="detail-card"><strong>Evidence</strong><span>Course completion, simulation score, and observed practice.</span></div><div class="detail-card"><strong>Validation criteria</strong><span>Performs consistently using the approved Hannah workflow without prompting.</span></div><button class="primary">Request sign-off</button>`)));
}
$(".filters").addEventListener("click",e=>{if(!e.target.matches("[data-competency-filter]"))return;$$("[data-competency-filter]").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");state.competencyFilter=e.target.dataset.competencyFilter;renderCompetencies()});
$("#newAssessmentBtn").addEventListener("click",()=>assessmentForm());

function renderSimulations(){
 const f=$("#simulationRoleFilter").value;
 let list=simulations.filter(s=>f==="all"||s.role===f);
 if(state.role!=="General Manager"&&f==="all"){const roleList=list.filter(s=>s.role===state.role);if(roleList.length)list=roleList}
 $("#simulationGrid").innerHTML=list.map(s=>`<article class="simulation-card"><div class="card-banner ${s.track}"><span>${s.role}</span><strong>${s.difficulty}</strong></div><div class="card-body"><h2>${s.title}</h2><p>${s.description}</p><div class="card-meta"><span>${s.duration}</span><span>Interactive</span></div><button class="primary simulation-start" data-id="${s.id}">Start simulation</button></div></article>`).join("");
 $$(".simulation-start").forEach(b=>b.addEventListener("click",()=>startSimulation(b.dataset.id)));
}
$("#simulationRoleFilter").addEventListener("change",renderSimulations);
function startSimulation(id){state.currentSim=simulations.find(s=>s.id===id);state.simStep=0;state.simScore=0;switchView("simulationRunner");renderSimStep()}
function renderSimStep(){
 const steps=simulationSteps[state.currentSim.id],step=steps[state.simStep];
 $("#runnerRole").textContent=state.currentSim.role;$("#runnerTitle").textContent=state.currentSim.title;$("#runnerStepText").textContent=`Step ${state.simStep+1} of ${steps.length}`;$("#runnerProgress").style.width=`${state.simStep/steps.length*100}%`;
 $("#casePill").textContent=state.currentSim.difficulty+" scenario";$("#caseHeading").textContent=step.heading;$("#caseText").textContent=step.text;$("#caseDetails").innerHTML=step.details.map(d=>`<div class="detail-card"><strong>Case detail</strong><span>${d}</span></div>`).join("");
 $("#decisionOptions").innerHTML=step.options.map((o,i)=>`<button class="decision-option" data-choice="${i}">${o[0]}</button>`).join("");$("#decisionFeedback").innerHTML="";
 $$("[data-choice]").forEach(b=>b.addEventListener("click",()=>chooseDecision(Number(b.dataset.choice))));
}
function chooseDecision(i){
 const step=simulationSteps[state.currentSim.id][state.simStep],opt=step.options[i];
 $$("[data-choice]").forEach((b,j)=>{b.disabled=true;if(step.options[j][1])b.classList.add("correct");if(j===i&&!opt[1])b.classList.add("wrong")});
 if(opt[1])state.simScore++;
 $("#decisionFeedback").innerHTML=`<div class="feedback"><strong>${opt[1]?"Strong decision":"Consider a safer response"}</strong><p>${opt[2]}</p><button class="primary" id="nextDecision">${state.simStep===simulationSteps[state.currentSim.id].length-1?"Complete simulation":"Continue"}</button></div>`;
 $("#nextDecision").addEventListener("click",()=>{state.simStep++;if(state.simStep>=simulationSteps[state.currentSim.id].length)finishSimulation();else renderSimStep()});
}
function finishSimulation(){
 const total=simulationSteps[state.currentSim.id].length,pct=Math.round(state.simScore/total*100);
 openModal(`<div style="text-align:center"><span class="eyebrow">Simulation complete</span><h1>${state.currentSim.title}</h1><div class="readiness-ring" style="margin:20px auto;color:var(--ink);border-color:var(--line);border-top-color:var(--green)"><strong>${pct}%</strong><span>Simulation score</span></div><p>${pct>=80?"You demonstrated strong decision-making and are progressing toward competency validation.":"Review the coaching and repeat the scenario to strengthen your response."}</p><button class="primary" id="finishReturn">Return to simulations</button></div>`);
 $("#finishReturn").addEventListener("click",()=>{$("#modal").close();switchView("simulations")});
}
$("#exitSimulation").addEventListener("click",()=>switchView("simulations"));

function renderManager(){
 const metrics=[["Team completion","87%","Up 4%"],["Overdue","14","Needs follow-up"],["Sign-offs pending","17","Four high priority"],["Renewals due","6","Next 30 days"]];
 $("#managerMetrics").innerHTML=metrics.map(m=>`<article class="metric"><span>${m[0]}</span><strong>${m[1]}</strong><small>${m[2]}</small></article>`).join("");
 if(state.managerTab==="team"){
  $("#managerContent").innerHTML=`<div class="manager-team-grid">${team.map(t=>`<article class="team-card"><div class="team-head"><div class="team-avatar">${t.initials}</div><div><strong>${t.name}</strong><span>${t.role} • ${t.location}</span></div></div><div class="team-stats"><div class="team-stat"><strong>${t.completion}%</strong><span>Complete</span></div><div class="team-stat"><strong>${t.overdue}</strong><span>Overdue</span></div><div class="team-stat"><strong>${t.skills}</strong><span>Skills</span></div></div><div class="progress"><span style="width:${t.completion}%"></span></div><div class="card-footer"><span class="badge ${t.status==="On track"?"good":t.status==="At risk"?"risk":"warning"}">${t.status}</span><button class="secondary profile-open" data-name="${t.name}">Open profile</button></div></article>`).join("")}</div>`;
  $$(".profile-open").forEach(b=>b.addEventListener("click",()=>openProfile(b.dataset.name)));
 } else if(state.managerTab==="assignments"){
  $("#managerContent").innerHTML=`<div class="assignment-table"><div class="assignment-head"><span>Assignment</span><span>Audience</span><span>Due</span><span>Complete</span><span>Status</span><span></span></div>${assignments.map(a=>`<div class="assignment-row"><strong>${a.title}</strong><span>${a.audience}</span><span>${a.due}</span><span>${a.complete}</span><span class="badge ${a.status==="Active"?"warning":"neutral"}">${a.status}</span><button class="secondary">Manage</button></div>`).join("")}</div>`;
 } else if(state.managerTab==="approvals"){
  $("#managerContent").innerHTML=`<div class="approval-grid"><section class="panel"><h2>Competency validations</h2>${competencies.filter(c=>["Awaiting Sign-Off","Practicing"].includes(c.status)).map(c=>`<div class="list-item"><div><strong>${c.name}</strong><span>${c.owner}</span></div><button class="primary">Review</button></div>`).join("")}</section><section class="panel"><h2>Content approvals</h2>${contentItems.filter(c=>["Review","Draft"].includes(c.status)).map(c=>`<div class="list-item"><div><strong>${c.title}</strong><span>${c.type} • ${c.status}</span></div><button class="primary">Review</button></div>`).join("")}</section></div>`;
 } else {
  $("#managerContent").innerHTML=`<div class="compliance-grid"><section class="panel"><h2>Requirements</h2>${["CPR Certification","Radiation Safety","Annual OSHA Refresher","HIPAA & Records Privacy"].map((x,i)=>`<div class="list-item"><div><strong>${x}</strong><span>${[92,88,96,90][i]}% current</span></div><span class="badge ${i===2?"risk":"warning"}">${[6,3,2,4][i]} due</span></div>`).join("")}</section><section class="panel"><h2>90-day forecast</h2>${[["0–30 days",6],["31–60 days",5],["61–90 days",7]].map(x=>`<div class="list-item"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("")}</section></div>`;
 }
}
$("#managerTabs").addEventListener("click",e=>{if(!e.target.matches(".chip"))return;$$("#managerTabs .chip").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");state.managerTab=e.target.dataset.managerTab;renderManager()});
function openProfile(name){const t=team.find(x=>x.name===name);openModal(`<span class="eyebrow">${t.role}</span><h1 class="modal-title">${t.name}</h1><p>${t.location}</p><div class="form-grid"><div><strong>Completion</strong><p>${t.completion}%</p></div><div><strong>Validated skills</strong><p>${t.skills}</p></div><div><strong>Overdue</strong><p>${t.overdue}</p></div><div><strong>Status</strong><p>${t.status}</p></div></div><button class="primary" id="assignFromProfile">Assign learning</button>`);$("#assignFromProfile").addEventListener("click",assignmentForm)}
$("#createAssignmentBtn").addEventListener("click",assignmentForm);
function assignmentForm(){openModal(`<span class="eyebrow">Manager workflow</span><h1 class="modal-title">Create assignment</h1><div class="form-grid"><label class="full">Learning content<select><option>Nose-to-Tail Exam</option><option>Phone Answering Expectations</option><option>Membership Enrollment Accuracy</option><option>Urgent Call Triage Simulation</option></select></label><label>Assignment type<select><option>Role-based</option><option>Location-based</option><option>Individual</option><option>All team members</option></select></label><label>Audience<select><option>Service Coordinator</option><option>Membership Coordinator</option><option>Pet Nurse</option><option>DVM / Practitioner</option><option>Leadership</option></select></label><label>Start date<input type="date" value="2026-07-25"></label><label>Due date<input type="date" value="2026-08-08"></label><label class="full">Manager message<textarea rows="3" placeholder="Why is this learning being assigned?"></textarea></label></div><button class="primary" id="saveAssignment">Create assignment</button>`);$("#saveAssignment").addEventListener("click",()=>{$("#modal").close();toast("Assignment created")})}
function assessmentForm(){openModal(`<span class="eyebrow">Competency validation</span><h1 class="modal-title">New assessment</h1><div class="form-grid"><label>Team member<select>${team.map(t=>`<option>${t.name}</option>`).join("")}</select></label><label>Competency<select>${competencies.map(c=>`<option>${c.name}</option>`).join("")}</select></label><label>Status<select><option>Practicing</option><option>Awaiting Sign-Off</option><option>Certified</option><option>Needs Practice</option></select></label><label>Evidence type<select><option>Observed practice</option><option>Simulation</option><option>Skills lab</option><option>Document upload</option></select></label><label class="full">Notes<textarea rows="4"></textarea></label></div><button class="primary" id="saveAssessment">Save assessment</button>`);$("#saveAssessment").addEventListener("click",()=>{$("#modal").close();toast("Assessment saved")})}

function renderContent(){
 $("#contentStats").innerHTML=[["Published","86"],["In review","7"],["Drafts","12"],["Expiring","4"]].map(x=>`<div class="metric-small"><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join("");
 const f=$("#contentTypeFilter").value,list=contentItems.filter(c=>f==="all"||c.type===f);
 $("#contentInventory").innerHTML=list.map(c=>`<div class="content-item"><div class="content-icon">${c.type[0]}</div><div><strong>${c.title}</strong><span>${c.type} • ${c.academy} • Updated ${c.updated}</span></div><span class="badge ${c.status==="Published"?"good":c.status==="Review"?"warning":"neutral"}">${c.status}</span></div>`).join("");
 $("#contentApprovalQueue").innerHTML=contentItems.filter(c=>c.status!=="Published").map(c=>`<div class="list-item"><div><strong>${c.title}</strong><span>${c.status} • ${c.type}</span></div><button class="secondary">Review</button></div>`).join("");
}
$("#contentTypeFilter").addEventListener("change",renderContent);$("#createContentBtn").addEventListener("click",()=>contentForm("Create learning content"));
function contentForm(title){openModal(`<span class="eyebrow">Content Studio</span><h1 class="modal-title">${title}</h1><div class="form-grid"><label>Content type<select><option>Course</option><option>Procedure</option><option>Simulation</option><option>Quiz</option><option>Reference</option></select></label><label>Academy<select><option>Foundations Academy</option><option>Medical Academy</option><option>Member Services Academy</option><option>Leadership Academy</option><option>Operations Academy</option></select></label><label class="full">Title<input placeholder="Enter title"></label><label>Owner<select><option>Francesca Ferrucci</option><option>Dr. Joshua Horner</option><option>Dr. Kirsten Brown</option></select></label><label>Approval route<select><option>Manager review</option><option>Clinical review</option><option>Executive review</option></select></label><label class="full">Summary<textarea rows="3"></textarea></label></div><button class="primary" id="saveContent">Create draft</button>`);$("#saveContent").addEventListener("click",()=>{$("#modal").close();toast("Content draft created")})}

function renderReports(){
 const reports=["Executive Learning Summary","Compliance Audit","Role Readiness","Simulation Performance","Assignment Completion","Academy Progress"];
 $("#reportGrid").innerHTML=reports.map(r=>`<article class="report-card"><div class="report-icon">▦</div><h2>${r}</h2><p>Filter by location, role, manager, Academy, and date range.</p><button class="secondary run-report" data-report="${r}">Run report</button></article>`).join("");
 $$(".run-report").forEach(b=>b.addEventListener("click",()=>toast(`${b.dataset.report} generated`)));
 const vals=[66,71,74,78,82,87],months=["Feb","Mar","Apr","May","Jun","Jul"];
 $("#trendChart").innerHTML=vals.map((v,i)=>`<div class="trend-column"><div class="trend-bar" style="height:${v*2.15}px"></div><strong>${v}%</strong><span>${months[i]}</span></div>`).join("");
}
$("#scheduleReportBtn").addEventListener("click",()=>openModal(`<span class="eyebrow">Automated reporting</span><h1 class="modal-title">Schedule report</h1><div class="form-grid"><label>Report<select><option>Executive Learning Summary</option><option>Compliance Audit</option><option>Role Readiness</option></select></label><label>Frequency<select><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select></label><label class="full">Recipients<input placeholder="Email addresses"></label></div><button class="primary" id="saveReport">Schedule</button>`));

function renderAdmin(){
 const cards=[
  ["Role architecture",["DVM / Practitioner","Pet Nurse","Nurse Aide","Service Coordinator","Membership Coordinator","Member Advocate","Leadership","Operations"]],
  ["Assignment automations",["Assign Foundations to new hires","Enroll Academy when role changes","Send expiration reminders","Send manager overdue digest"]],
  ["Locations",["HE1 Portland","HE2 Tigard","HE2 ER"]],
  ["Security & governance",["Role-based permissions","Content approval routing","Audit logs","Retention policy"]]
 ];
 $("#adminGrid").innerHTML=cards.map((c,idx)=>`<section class="panel"><h2>${c[0]}</h2>${c[1].map((x,i)=>idx===1?`<div class="setting-row"><div><strong>${x}</strong><span>${i<3?"Enabled":"Optional"}</span></div><label class="switch"><input type="checkbox" ${i<3?"checked":""}><span></span></label></div>`:`<div class="setting-row"><div><strong>${x}</strong><span>Active configuration</span></div><button class="secondary">Configure</button></div>`).join("")}</section>`).join("");
}

const searchIndex=[
 ...resources.map(x=>({title:x.title,type:"Knowledge Base",view:"knowledge"})),
 ...courses.map(x=>({title:x.title,type:"Course",view:"learning"})),
 ...diagnostics.map(x=>({title:x.title,type:"Diagnostic Pathway",view:"diagnostics"})),
 ...competencies.map(x=>({title:x.name,type:"Competency",view:"competencies"})),
 ...simulations.map(x=>({title:x.title,type:"Simulation",view:"simulations"}))
];
$("#globalSearch").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase(),results=q?searchIndex.filter(x=>x.title.toLowerCase().includes(q)).slice(0,7):[];
 $("#globalResults").innerHTML=results.map(r=>`<button class="search-result" data-view="${r.view}"><strong>${r.title}</strong><span>${r.type}</span></button>`).join("");
 $("#globalResults").classList.toggle("open",results.length>0);
 $$(".search-result").forEach(b=>b.addEventListener("click",()=>{$("#globalSearch").value="";$("#globalResults").classList.remove("open");switchView(b.dataset.view)}));
});
document.addEventListener("click",e=>{if(!e.target.closest(".global-search-wrap"))$("#globalResults").classList.remove("open")});

$("#themeBtn").addEventListener("click",()=>{const n=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=n;$("#themeBtn").textContent=n==="dark"?"☀":"☾"});
$("#profileBtn").addEventListener("click",()=>openModal(`<span class="eyebrow">User profile</span><h1 class="modal-title">Francesca Ferrucci</h1><p>General Manager — Portland Market</p><div class="detail-card"><strong>Permissions</strong><span>Learner • Manager • Validator • Content Owner • Administrator</span></div><div class="detail-card"><strong>Learning summary</strong><span>86% completion • 12 validated competencies • 3 certificates</span></div>`));
$("#modalClose").addEventListener("click",()=>$("#modal").close());

const notifications=[
 ["Competency review ready","Sofia Ramirez requested sign-off for Urgent Call Triage."],
 ["Assignment overdue","Three HE2 ER assignments require follow-up."],
 ["Content awaiting approval","Membership Enrollment Accuracy is ready for review."],
 ["Renewal approaching","Six CPR or Radiation Safety renewals are due within 30 days."]
];
$("#notificationList").innerHTML=notifications.map(n=>`<div class="notification-item"><strong>${n[0]}</strong><span>${n[1]}</span></div>`).join("");
function toggleNotifications(open){$("#notificationDrawer").classList.toggle("open",open);$("#overlay").classList.toggle("open",open)}
$("#notificationBtn").addEventListener("click",()=>toggleNotifications(true));$("#closeNotifications").addEventListener("click",()=>toggleNotifications(false));$("#overlay").addEventListener("click",()=>toggleNotifications(false));

renderDashboard();renderCourses();renderAcademies();renderResources();renderDiagnostics();renderCompetencies();renderSimulations();renderManager();renderContent();renderReports();renderAdmin();updateRole();

/* ===== Hannah Medical Academy — Integrated Level 5 Prototype ===== */
(()=>{
const medicalLevels=[
 {n:1,title:'Medical Foundations',desc:'Safety, terminology, anatomy, calculations, communication, and Hannah standards.',progress:100,status:'Complete'},
 {n:2,title:'Patient Assessment',desc:'History, observation, vital signs, physical assessment, and patient presentation.',progress:78,status:'In progress'},
 {n:3,title:'Clinical Diagnostics',desc:'Diagnostic workflows, sample collection, imaging support, and case presentation.',progress:62,status:'In progress'},
 {n:4,title:'Clinical Skills & Treatment Delivery',desc:'Medication safety, asepsis, catheter care, fluids, reassessment, and discharge.',progress:31,status:'In progress'},
 {n:5,title:'Internal Medicine',desc:'Case-based learning that connects body systems, diagnostics, treatment response, and monitoring.',progress:42,status:'In progress'},
 {n:6,title:'Emergency & Critical Care',desc:'Rapid recognition, triage, stabilization support, monitoring, escalation, and emergency teamwork.',progress:36,status:'In progress'},
 {n:7,title:'Surgery & Perioperative Care',desc:'Surgical safety, asepsis, anesthesia support, intraoperative teamwork, recovery, and discharge.',progress:68,status:'In progress'},
 {n:8,title:'Dentistry & Oral Health',desc:'Oral assessment, charting, radiography support, procedure safety, recovery, and Member education.',progress:100,status:'Complete'},
 {n:9,title:'Hospitalized Patient Care',desc:'Treatment plans, timelines, monitoring, nursing notes, escalation, handoffs, and discharge preparation.',progress:100,status:'Complete'},
 {n:10,title:'Member Communication',desc:'Medical education, diagnostic recommendations, finances, difficult conversations, end-of-life care, and discharge instructions.',progress:24,status:'Current'},
 {n:11,title:'Advanced Medicine',desc:'Oncology, neurology, ophthalmology, cardiology, ultrasound, advanced anesthesia, ICU, and ventilation concepts.',progress:8,status:'Available'},
 {n:12,title:'Hannah Standards of Excellence',desc:'The connected workflows, documentation, approvals, service standards, and quality controls unique to Hannah.',progress:0,status:'Available'}
];
const l5Courses=[
 'Principles of Internal Medicine','Gastrointestinal Disease','Renal & Urinary Disease','Endocrine Disease','Respiratory Disease','Cardiology','Neurology','Dermatology & Otology','Hematology & Oncology','Infectious Disease','Geriatric Medicine','Internal Medicine Capstone'
];
const l5Cases=[
 ['Bella — Vomiting Labrador','Gastrointestinal','Interactive preview','History through discharge'],
 ['Milo — Blocked Cat','Renal & Urinary','Planned','Urgency, diagnostics, hospitalization'],
 ['Luna — Diabetic Cat','Endocrine','Planned','Monitoring, insulin education, recheck'],
 ['Cooper — Coughing Senior Dog','Cardiology','Planned','Respiratory assessment and cardiac workup'],
 ['Oliver — Hyperthyroid Cat','Endocrine','Planned','Trends, medication monitoring, Member education'],
 ['Daisy — Seizure Presentation','Neurology','Planned','Observation, emergency communication, monitoring']
];
const l5Stages=['History','Assessment','Differentials','Diagnostics','Treatment','Hospitalization','SOAP Note','Discharge','Debrief'];
let l5State=JSON.parse(localStorage.getItem('hlsTrueLevel5')||'{"tab":"overview","caseStep":0,"completed":false}');
const persist=()=>localStorage.setItem('hlsTrueLevel5',JSON.stringify(l5State));

function renderMedicalAcademy(){
 const grid=document.querySelector('#medicalLevelGrid'); if(!grid)return;
 grid.innerHTML=medicalLevels.map(l=>`<article class="level-card ${l.n===10?'current':''} ${l.status==='Locked'?'locked':''}"><div class="section-head"><div class="level-number">${l.n}</div><span class="badge ${l.status==='Complete'?'good':l.status==='Current'?'warning':l.status==='Locked'?'neutral':'warning'}">${l.status}</span></div><h2>Level ${l.n} — ${l.title}</h2><p>${l.desc}</p><div class="progress"><span style="width:${l.progress}%"></span></div><div class="card-footer"><strong>${l.progress}%</strong><button class="${l.n===10?'primary':'secondary'} medical-level-open" data-level="${l.n}" ${l.status==='Locked'?'disabled':''}>${l.status==='Complete'?'Review':`Open Level ${l.n}`}</button></div></article>`).join('');
 document.querySelectorAll('.medical-level-open').forEach(b=>b.onclick=()=>{const n=+b.dataset.level;if(n===2)window.openLevel2Hub();else if(n===5)openLevel5();else if(n===6)openLevel6();else if(n===7||n===9)openLevel7();else if(n>=10)openUpperLevel(n);else openModal(`<span class="eyebrow">Hannah Medical Academy</span><h1 class="modal-title">Level ${n} — ${medicalLevels[n-1].title}</h1><p>${n===8?'Level 8 is complete and remains available for review.':'This level remains part of the same Medical Academy pathway inside the shared Hannah Learning System.'}</p><button class="primary" onclick="document.querySelector('#modal').close()">Return to pathway</button>`)});
 document.querySelector('#medicalAcademyMetrics').innerHTML=[['12','Levels available'],['31','Courses completed'],['12','Competencies validated'],['3','Certificates earned']].map(x=>`<div class="metric-card"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
}
function openMedicalAcademy(){renderMedicalAcademy();switchView('medicalAcademy')}
window.openMedicalAcademy=openMedicalAcademy;
function openLevel5(tab){if(tab)l5State.tab=tab;persist();renderLevel5();switchView('level5')}

function renderLevel5(){
 document.querySelectorAll('[data-l5tab]').forEach(b=>b.classList.toggle('active',b.dataset.l5tab===l5State.tab));
 const host=document.querySelector('#level5Content'); if(!host)return;
 if(l5State.tab==='overview') host.innerHTML=`<div class="l5-dashboard-grid"><section class="panel"><span class="eyebrow">Continue learning</span><div class="l5-continue"><div class="patient-avatar">🐕</div><div class="grow"><h2>Bella — Vomiting Labrador</h2><p>Longitudinal Internal Medicine Case • ${l5Stages[l5State.caseStep]}</p><div class="progress"><span style="width:${((l5State.caseStep+1)/l5Stages.length)*100}%"></span></div></div><button class="primary" id="overviewResumeCase">Resume</button></div></section><section class="panel"><span class="eyebrow">Level progress</span><h2>18% complete</h2><div class="progress"><span style="width:18%"></span></div><div class="list-item"><span>Courses started</span><strong>2 of 12</strong></div><div class="list-item"><span>Cases completed</span><strong>${l5State.completed?'1':'0'} of 12</strong></div><div class="list-item"><span>Competencies ready</span><strong>2</strong></div></section><section class="panel span-2"><div class="section-head"><div><span class="eyebrow">Level 5 learning tools</span><h2>Internal medicine workspace</h2></div></div><div class="l5-tool-grid">${[['Clinical Cases','Follow a patient from presentation through discharge.','cases'],['Virtual Hospital','Move the active patient between connected care areas.','hospital'],['Diagnostics Lab','Review sample CBC, chemistry, trends, and imaging.','diagnostics'],['Competencies','Connect learning evidence to observed performance.','competencies']].map(t=>`<article class="l5-tool"><h3>${t[0]}</h3><p>${t[1]}</p><button class="secondary l5-jump" data-tab="${t[2]}">Open</button></article>`).join('')}</div></section></div>`;
 if(l5State.tab==='curriculum') host.innerHTML=`<div class="l5-course-grid">${l5Courses.map((c,i)=>`<article class="l5-course"><span class="course-num">Course ${i+1}</span><h2>${c}</h2><p>${i===0?'Clinical reasoning, disease progression, acute versus chronic illness, and trend recognition.':i===1?'Vomiting, diarrhea, obstruction, pancreatitis, liver disease, and patient monitoring.':'Planned course using the same Level 5 case and learning engine.'}</p><span class="badge ${i<2?'good':'neutral'}">${i<2?'Preview available':'Planned'}</span><br><button class="secondary l5-course-open" data-course="${i}">${i===1?'Open Bella case':'Preview course'}</button></article>`).join('')}</div>`;
 if(l5State.tab==='cases') host.innerHTML=`<div class="case-library-grid">${l5Cases.map((c,i)=>`<article class="clinical-case"><span class="eyebrow">${c[1]}</span><h2>${c[0]}</h2><p>${c[3]}</p><span class="badge ${i===0?'good':'neutral'}">${c[2]}</span><br><button class="${i===0?'primary':'secondary'} l5-case-open" data-case="${i}">${i===0?'Open case':'View plan'}</button></article>`).join('')}</div>`;
 if(l5State.tab==='hospital') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Connected patient journey</span><h2>Virtual Hannah Hospital</h2><p>Bella's case, notes, and progress follow her between rooms.</p></div></div><div class="hospital-room-grid">${[['Reception','🛎️','Confirm complaint and urgency'],['Exam Room','🩺','History and assessment'],['Laboratory','🔬','CBC, chemistry, and trends'],['Radiology','🩻','Imaging review'],['Treatment','💉','DVM-directed care'],['ICU','❤️','Monitoring and reassessment'],['Pharmacy','💊','Medication education'],['Discharge','📋','Teach-back and follow-up']].map((r,i)=>`<article class="hospital-room" data-room="${r[0]}"><div class="room-icon">${r[1]}</div><h3>${r[0]}</h3><p>${r[2]}</p><button class="secondary">Open activity</button></article>`).join('')}</div></section>`;
 if(l5State.tab==='diagnostics') host.innerHTML=`<section class="panel"><div class="diagnostic-tabs"><button class="chip active" data-l5diag="cbc">CBC</button><button class="chip" data-l5diag="chem">Chemistry</button><button class="chip" data-l5diag="trend">Trend Viewer</button><button class="chip" data-l5diag="image">Radiograph</button></div><div id="l5DiagnosticContent"></div></section>`;
 if(l5State.tab==='competencies') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>Level 5 validation pathway</h2></div><button class="primary" id="requestL5Validation">Request validation</button></div><div class="competency-head"><span>Competency</span><span>Evidence</span><span>Status</span><span></span><span></span></div>${[['Presents a concise internal medicine case','Bella case presentation','Ready to practice'],['Recognizes meaningful diagnostic trends','Trend viewer','Ready to practice'],['Separates observation from diagnosis','Differential builder','In progress'],['Documents response using objective findings','SOAP note','In progress'],['Uses teach-back at discharge','Discharge simulation','In progress']].map(c=>`<div class="competency-row"><strong>${c[0]}</strong><span>${c[1]}</span><span class="badge warning">${c[2]}</span><span></span><button class="secondary">View</button></div>`).join('')}</section>`;
 wireLevel5();
}
function wireLevel5(){
 document.querySelectorAll('.l5-jump').forEach(b=>b.onclick=()=>{l5State.tab=b.dataset.tab;persist();renderLevel5()});
 document.querySelector('#overviewResumeCase')?.addEventListener('click',openBellaCase);
 document.querySelectorAll('.l5-course-open').forEach(b=>b.onclick=()=>b.dataset.course==='1'?openBellaCase():openModal(`<span class="eyebrow">Level 5 course preview</span><h1>${l5Courses[+b.dataset.course]}</h1><p>Lessons, cases, checks, notes, bookmarks, and competency evidence remain connected to the same Hannah Learning System learner record.</p>`));
 document.querySelectorAll('.l5-case-open').forEach(b=>b.onclick=()=>b.dataset.case==='0'?openBellaCase():openModal(`<span class="eyebrow">Planned Level 5 case</span><h1>${l5Cases[+b.dataset.case][0]}</h1><p>${l5Cases[+b.dataset.case][3]}</p><p class="safety-note"><strong>Content governance</strong><span>Clinical content requires Hannah-approved protocols and CMO review before production.</span></p>`));
 document.querySelectorAll('.hospital-room').forEach(r=>r.onclick=()=>{const room=r.dataset.room;if(room==='Laboratory'||room==='Radiology'){l5State.tab='diagnostics';persist();renderLevel5()}else{openBellaCase();document.querySelector('#bellaLocation').textContent=room;toast(`${room} activity opened`)}});
 document.querySelectorAll('[data-l5diag]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-l5diag]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderL5Diagnostic(b.dataset.l5diag)});
 if(document.querySelector('#l5DiagnosticContent'))renderL5Diagnostic('cbc');
 document.querySelector('#requestL5Validation')?.addEventListener('click',()=>openModal('<span class="eyebrow">Competency validation</span><h1>Request Level 5 observation</h1><p>Select a competency, approved validator, location, and observation shift.</p><button class="primary" onclick="document.querySelector(\'#modal\').close()">Submit request</button>'));
}
function renderL5Diagnostic(type){
 const el=document.querySelector('#l5DiagnosticContent');if(!el)return;
 const cbc=`<span class="eyebrow">Educational sample</span><h2>CBC pattern review</h2><div class="lab-result-grid"><div class="lab-result"><span>HCT</span><strong class="flag-high">58%</strong><small>Flagged high</small></div><div class="lab-result"><span>WBC</span><strong class="flag-high">18.4</strong><small>Flagged high</small></div><div class="lab-result"><span>Platelets</span><strong class="flag-normal">Adequate</strong><small>Estimate acceptable</small></div></div><p class="safety-note"><strong>Learning boundary</strong><span>Recognize and communicate patterns; diagnosis and final interpretation remain with the DVM.</span></p>`;
 const chem=`<span class="eyebrow">Educational sample</span><h2>Chemistry pattern review</h2><div class="lab-result-grid"><div class="lab-result"><span>BUN</span><strong class="flag-high">34</strong><small>Flagged high</small></div><div class="lab-result"><span>Creatinine</span><strong>1.4</strong><small>Sample value</small></div><div class="lab-result"><span>ALT</span><strong class="flag-high">146</strong><small>Mild increase</small></div></div><p class="safety-note"><strong>Governance</strong><span>Production ranges and interpretation guidance require Hannah approval.</span></p>`;
 const trend=`<span class="eyebrow">Trend viewer</span><h2>Follow change over time</h2><div class="trend-chart"><div class="trend-bar" style="height:85%"><span>Day 1</span></div><div class="trend-bar" style="height:58%"><span>Day 2</span></div><div class="trend-bar" style="height:35%"><span>Recheck</span></div></div><p>Compare trends with examination findings, intake, output, comfort, and treatment response.</p>`;
 const image=`<span class="eyebrow">Radiograph viewer</span><h2>Observation and communication practice</h2><div style="height:320px;border-radius:16px;background:radial-gradient(circle at 52% 45%,#68747d,#111820 65%);position:relative"><button class="primary" style="position:absolute;left:42%;top:35%" id="xrayHotspotOne">Hotspot 1</button><button class="secondary" style="position:absolute;left:60%;top:60%" id="xrayHotspotTwo">Hotspot 2</button></div><div class="safety-note" id="xrayNote"><strong>Viewer guidance</strong><span>Select a hotspot to practice describing an area for DVM review.</span></div>`;
 el.innerHTML=type==='cbc'?cbc:type==='chem'?chem:type==='trend'?trend:image;
 document.querySelector('#xrayHotspotOne')?.addEventListener('click',()=>document.querySelector('#xrayNote').innerHTML='<strong>Selected area</strong><span>Describe location, pattern, and change without independently diagnosing.</span>');
 document.querySelector('#xrayHotspotTwo')?.addEventListener('click',()=>document.querySelector('#xrayNote').innerHTML='<strong>Selected area</strong><span>Correlate the observed region with Bella’s pain, history, and other diagnostics.</span>');
}
function openBellaCase(){renderBellaCase();switchView('level5CaseRunner')}
function renderBellaCase(){
 document.querySelector('#l5CaseStepLabel').textContent=l5Stages[l5State.caseStep];
 document.querySelector('#l5CaseProgress').style.width=`${((l5State.caseStep+1)/l5Stages.length)*100}%`;
 document.querySelector('#l5CaseStageNav').innerHTML=l5Stages.map((s,i)=>`<button class="${i===l5State.caseStep?'active':''}" data-case-step="${i}">${i+1}. ${s}</button>`).join('');
 const content=[
 `<span class="eyebrow">History</span><h2>Ask focused questions</h2><p>Bella vomited five times in 24 hours and has refused food since last evening. No known toxin exposure was reported.</p><div class="choice-grid"><button class="case-choice">Ask about access to foreign material</button><button class="case-choice">Clarify vomiting frequency and appearance</button><button class="case-choice">Review medications and recent diet changes</button></div>`,
 `<span class="eyebrow">Assessment</span><h2>Recognize the current patient picture</h2><div class="lab-result-grid"><div class="lab-result"><span>Temperature</span><strong>102.1°F</strong><small>Sample finding</small></div><div class="lab-result"><span>Heart rate</span><strong>128</strong><small>Mildly increased</small></div><div class="lab-result"><span>Hydration</span><strong class="flag-high">~6%</strong><small>Estimated deficit</small></div></div><p class="safety-note"><strong>Observation</strong><span>Bella is quiet and tense on cranial abdominal palpation. Communicate objective findings promptly.</span></p>`,
 `<span class="eyebrow">Differential builder</span><h2>Organize possibilities without diagnosing</h2><div class="choice-grid"><button class="case-choice">Gastrointestinal obstruction</button><button class="case-choice">Pancreatic inflammation</button><button class="case-choice">Dietary indiscretion</button><button class="case-choice">Renal or metabolic disease</button></div>`,
 `<span class="eyebrow">Diagnostics</span><h2>Review results and present the pattern</h2><p>CBC, chemistry, trend, and imaging activities are available in the shared Level 5 Diagnostics Lab.</p><button class="primary" id="caseOpenDiagnostics">Open Diagnostics Lab</button> <button class="secondary" id="practicePresentation">Practice DVM presentation</button>`,
 `<span class="eyebrow">DVM-directed treatment</span><h2>Translate the plan into safe care</h2>${[['10:15','IV access placed and ordered fluids initiated.'],['10:30','Ordered antiemetic administered and documented.'],['11:00','Pain and nausea reassessed; findings communicated.']].map(x=>`<div class="timeline-row"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}`,
 `<span class="eyebrow">Hospitalization</span><h2>Watch the patient, not only the clock</h2><div class="lab-result-grid"><div class="lab-result"><span>Vomiting</span><strong class="flag-normal">None</strong><small>Since treatment</small></div><div class="lab-result"><span>Comfort</span><strong>Improved</strong><small>Still guarded</small></div><div class="lab-result"><span>Water intake</span><strong class="flag-high">Low</strong><small>Continue monitoring</small></div></div>`,
 `<span class="eyebrow">SOAP note builder</span><h2>Document the change clearly</h2><div class="soap-grid"><label>Subjective<textarea>Bella is quieter but resting comfortably. No vomiting observed since treatment.</textarea></label><label>Objective<textarea>HR 108 bpm; MM pink; CRT less than 2 seconds; abdomen remains mildly guarded.</textarea></label><label>Assessment / communication<textarea>Response and remaining discomfort communicated to DVM for reassessment.</textarea></label></div><button class="primary" id="saveL5Soap">Save practice note</button>`,
 `<span class="eyebrow">Member discharge</span><h2>Use teach-back</h2><p>Explain the DVM-approved medication schedule, food and water plan, warning signs, and follow-up instructions.</p><div class="choice-grid"><button class="case-choice">“Please tell me how you will give Bella’s medication at home.”</button><button class="case-choice">“Do you understand?”</button></div>`,
 `<span class="eyebrow">Case debrief</span><h2>Connect the complete medical picture</h2><p>No single finding explained Bella’s presentation. The useful pattern came from history, examination, diagnostic changes, imaging, treatment response, and reassessment.</p><button class="primary" id="completeBellaCase">Complete preview case</button>`
 ];
 document.querySelector('#l5CaseStageContent').innerHTML=content[l5State.caseStep];
 document.querySelectorAll('[data-case-step]').forEach(b=>b.onclick=()=>{l5State.caseStep=+b.dataset.caseStep;persist();renderBellaCase()});
 document.querySelectorAll('.case-choice').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');toast('Selection recorded')});
 document.querySelector('#caseOpenDiagnostics')?.addEventListener('click',()=>openLevel5('diagnostics'));
 document.querySelector('#practicePresentation')?.addEventListener('click',()=>openModal('<span class="eyebrow">Case presentation practice</span><h1>Present Bella to the DVM</h1><p>Patient and complaint → relevant history → objective findings → diagnostic changes → treatment response → specific question.</p><textarea rows="7" style="width:100%" placeholder="Practice your concise presentation..."></textarea>'));
 document.querySelector('#saveL5Soap')?.addEventListener('click',()=>toast('Practice SOAP note saved'));
 document.querySelector('#completeBellaCase')?.addEventListener('click',()=>{l5State.completed=true;persist();toast('Bella case completed')});
}


/* ===== Level 6 — Emergency & Critical Care ===== */
const l6Courses=[
 'Emergency Mindset & Team Roles','Emergency Triage & Primary Survey','Respiratory Emergencies','Cardiovascular Emergencies & Shock','CPR & Cardiopulmonary Arrest','Neurologic Emergencies','Toxicology Emergencies','Trauma & Hemorrhage','Gastrointestinal & Abdominal Emergencies','Urinary & Metabolic Emergencies','Emergency Hospitalization & Monitoring','Level 6 Capstone — The Emergency Shift'
];
const l6Cases=[
 ['Milo — Respiratory Distress','Immediate','Oxygen-first workflow and low-stress handling'],
 ['Daisy — Active Seizure','Immediate','Safety, timing, communication, and reassessment'],
 ['Cooper — Hit by Car','Immediate','Primary survey, hemorrhage control, and team roles'],
 ['Oliver — Blocked Cat','Urgent','Recognition, escalation, stabilization support, and monitoring'],
 ['Luna — Possible Toxin Exposure','Urgent','Exposure history, packaging, poison-control coordination'],
 ['The Emergency Shift','Capstone','Prioritize multiple arrivals while maintaining reassessment and handoff']
];
const l6Stages=['Arrival','Triage','Primary Survey','Team Roles','Stabilization','Reassessment','Second Arrival','Handoff','Debrief'];
let l6State=JSON.parse(localStorage.getItem('hlsTrueLevel6')||'{"tab":"overview","caseStep":0,"completed":false,"triage":{}}');
const persistL6=()=>localStorage.setItem('hlsTrueLevel6',JSON.stringify(l6State));
function openLevel6(tab){if(tab)l6State.tab=tab;persistL6();renderLevel6();switchView('level6')}
function renderLevel6(){
 document.querySelectorAll('[data-l6tab]').forEach(b=>b.classList.toggle('active',b.dataset.l6tab===l6State.tab));
 const host=document.querySelector('#level6Content');if(!host)return;
 if(l6State.tab==='overview') host.innerHTML=`<div class="l5-dashboard-grid"><section class="panel"><span class="eyebrow">Continue learning</span><div class="l5-continue"><div class="patient-avatar emergency-avatar">⚕</div><div class="grow"><h2>The Emergency Shift</h2><p>Multi-patient capstone • ${l6Stages[l6State.caseStep]}</p><div class="progress"><span style="width:${((l6State.caseStep+1)/l6Stages.length)*100}%"></span></div></div><button class="primary" id="overviewResumeEmergency">Resume</button></div></section><section class="panel"><span class="eyebrow">Level progress</span><h2>12% complete</h2><div class="progress"><span style="width:12%"></span></div><div class="list-item"><span>Courses started</span><strong>2 of 12</strong></div><div class="list-item"><span>Simulations completed</span><strong>${l6State.completed?'1':'0'} of 6</strong></div><div class="list-item"><span>Competencies ready</span><strong>2</strong></div></section><section class="panel span-2"><div class="section-head"><div><span class="eyebrow">Level 6 learning tools</span><h2>Emergency command center</h2></div></div><div class="l5-tool-grid">${[['Triage Board','Prioritize arrivals using observable urgency and immediate threats.','triage'],['Crash Cart','Practice readiness checks, roles, and equipment location.','crashcart'],['ICU Monitor','Recognize worsening trends and escalate changes.','icu'],['Emergency Cases','Practice focused stabilization and handoff workflows.','cases']].map(t=>`<article class="l5-tool emergency-tool"><h3>${t[0]}</h3><p>${t[1]}</p><button class="secondary l6-jump" data-tab="${t[2]}">Open</button></article>`).join('')}</div></section></div>`;
 if(l6State.tab==='curriculum') host.innerHTML=`<div class="l5-course-grid">${l6Courses.map((c,i)=>`<article class="l5-course"><span class="course-num">Course ${i+1}</span><h2>${c}</h2><p>${i===0?'Emergency mindset, role clarity, closed-loop communication, and maintaining situational awareness.':i===1?'Rapid triage, ABC primary survey, perfusion, mentation, pain, and escalation.':i===11?'Integrated multi-patient emergency shift with prioritization, reassessment, and handoff.':'Planned interactive emergency course using Hannah-approved protocols and role boundaries.'}</p><span class="badge ${i<2||i===11?'good':'neutral'}">${i<2||i===11?'Preview available':'Planned'}</span><br><button class="secondary l6-course-open" data-course="${i}">${i===11?'Open capstone':'Preview course'}</button></article>`).join('')}</div>`;
 if(l6State.tab==='triage') host.innerHTML=renderTriageBoard();
 if(l6State.tab==='crashcart') host.innerHTML=renderCrashCart();
 if(l6State.tab==='icu') host.innerHTML=renderICUMonitor();
 if(l6State.tab==='cases') host.innerHTML=`<div class="case-library-grid">${l6Cases.map((c,i)=>`<article class="clinical-case emergency-case"><span class="eyebrow">${c[1]} priority</span><h2>${c[0]}</h2><p>${c[2]}</p><span class="badge ${i===5?'good':'neutral'}">${i===5?'Interactive capstone':'Scenario preview'}</span><br><button class="${i===5?'primary':'secondary'} l6-case-open" data-case="${i}">${i===5?'Open capstone':'View scenario'}</button></article>`).join('')}</div>`;
 if(l6State.tab==='competencies') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>Level 6 validation pathway</h2></div><button class="primary" id="requestL6Validation">Request validation</button></div><div class="competency-head"><span>Competency</span><span>Evidence</span><span>Status</span><span></span><span></span></div>${[['Recognizes immediate life threats','Triage board','Ready to practice'],['Performs a structured primary survey','Capstone simulation','Ready to practice'],['Uses closed-loop emergency communication','Team-role activity','In progress'],['Recognizes worsening monitored trends','ICU monitor','In progress'],['Provides concise emergency handoff','Capstone handoff','In progress']].map(c=>`<div class="competency-row"><strong>${c[0]}</strong><span>${c[1]}</span><span class="badge warning">${c[2]}</span><span></span><button class="secondary">View</button></div>`).join('')}</section>`;
 bindLevel6();
}
function renderTriageBoard(){
 const patients=[['Milo','Open-mouth breathing','Immediate','Minimize handling; alert medical team and prepare oxygen support.'],['Cooper','Limping after fall','Urgent','Assess perfusion, pain, and evidence of additional trauma.'],['Luna','Vomited once, bright and alert','Priority','Collect focused history and monitor while awaiting assessment.'],['Daisy','Actively seizing','Immediate','Protect patient, time seizure, alert team, and prepare directed emergency care.']];
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Interactive triage board</span><h2>Who needs the team first?</h2><p>Assign each patient based on observable urgency. Triage is continuous; reassess patients waiting for care.</p></div><button class="secondary" id="resetTriage">Reset</button></div><div class="triage-board">${patients.map((p,i)=>`<article class="triage-patient"><div><span class="case-pill">Arrival ${i+1}</span><h3>${p[0]}</h3><p>${p[1]}</p></div><label>Assign priority<select class="triage-select" data-patient="${p[0]}" data-correct="${p[2]}"><option value="">Select</option><option>Immediate</option><option>Urgent</option><option>Priority</option></select></label><div class="triage-feedback" id="triage-${p[0]}"></div></article>`).join('')}</div><p class="safety-note"><strong>Emergency boundary</strong><span>Use approved triage criteria, alert the DVM or Pet Practitioner promptly, and never delay stabilization for completion of a learning activity.</span></p></section>`;
}
function renderCrashCart(){
 const groups=[['Airway & breathing',['Oxygen delivery supplies','Endotracheal tubes','Laryngoscope readiness','Ventilation equipment']],['Circulation',['IV access supplies','Flushes and extension sets','Emergency medication access','CPR documentation sheet']],['Monitoring & workflow',['ECG/monitor leads','Timer visible','Role cards','Restock seal and checklist']]];
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Virtual crash cart</span><h2>Readiness before the emergency</h2><p>Select every check that should be completed during routine crash-cart verification.</p></div><button class="primary" id="verifyCrashCart">Verify cart</button></div><div class="crashcart-grid">${groups.map(g=>`<article class="crash-drawer"><h3>${g[0]}</h3>${g[1].map(x=>`<label class="check-row"><input type="checkbox" class="cart-check"> <span>${x}</span></label>`).join('')}</article>`).join('')}</div><div id="crashCartResult" class="safety-note"><strong>Readiness principle</strong><span>Know where equipment is located, confirm function and expiration status, and report missing supplies before an emergency occurs.</span></div></section>`;
}
function renderICUMonitor(){
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Serial reassessment</span><h2>ICU monitoring board</h2><p>Review the trend and choose the finding that requires immediate escalation.</p></div></div><div class="icu-table"><div class="icu-row icu-head"><strong>Time</strong><span>HR</span><span>RR / effort</span><span>MM / CRT</span><span>Mentation</span></div><div class="icu-row"><strong>10:00</strong><span>148</span><span>42 / increased</span><span>Pink / 2 sec</span><span>Quiet, responsive</span></div><div class="icu-row"><strong>10:15</strong><span>156</span><span>48 / increased</span><span>Pale pink / 2 sec</span><span>Quiet</span></div><div class="icu-row critical-row"><strong>10:30</strong><span>172</span><span>60 / marked</span><span>Pale / 3 sec</span><span>Less responsive</span></div></div><div class="choice-grid"><button class="case-choice icu-choice" data-correct="false">Wait for the next scheduled check</button><button class="case-choice icu-choice" data-correct="true">Alert the DVM immediately and prepare for reassessment</button><button class="case-choice icu-choice" data-correct="false">Document only after the shift ends</button></div><div id="icuFeedback"></div></section>`;
}
function bindLevel6(){
 document.querySelectorAll('.l6-jump').forEach(b=>b.onclick=()=>{l6State.tab=b.dataset.tab;persistL6();renderLevel6()});
 document.querySelector('#overviewResumeEmergency')?.addEventListener('click',openEmergencyShift);
 document.querySelectorAll('.l6-course-open').forEach(b=>b.onclick=()=>b.dataset.course==='11'?openEmergencyShift():openModal(`<span class="eyebrow">Level 6 course preview</span><h1>${l6Courses[+b.dataset.course]}</h1><p>This course will use interactive decisions, brief knowledge checks, team-role practice, and competency evidence within the same Hannah Learning System.</p><p class="safety-note"><strong>Clinical governance</strong><span>Detailed protocols, medication guidance, CPR standards, and role permissions require Hannah approval before production.</span></p>`));
 document.querySelectorAll('.l6-case-open').forEach(b=>b.onclick=()=>b.dataset.case==='5'?openEmergencyShift():openModal(`<span class="eyebrow">Emergency scenario</span><h1>${l6Cases[+b.dataset.case][0]}</h1><p>${l6Cases[+b.dataset.case][2]}</p><p>This preview focuses on recognition, communication, stabilization support, reassessment, and escalation—not independent diagnosis or prescribing.</p>`));
 document.querySelectorAll('.triage-select').forEach(sel=>sel.onchange=()=>{const right=sel.value===sel.dataset.correct;document.querySelector('#triage-'+sel.dataset.patient).innerHTML=sel.value?`<span class="badge ${right?'good':'warning'}">${right?'Appropriate priority':'Reassess priority'}</span>`:'';l6State.triage[sel.dataset.patient]=sel.value;persistL6()});
 document.querySelector('#resetTriage')?.addEventListener('click',()=>{l6State.triage={};persistL6();renderLevel6()});
 document.querySelector('#verifyCrashCart')?.addEventListener('click',()=>{const boxes=[...document.querySelectorAll('.cart-check')];const done=boxes.filter(x=>x.checked).length;document.querySelector('#crashCartResult').innerHTML=`<strong>${done===boxes.length?'Cart verification complete':'Continue the check'}</strong><span>${done} of ${boxes.length} readiness items selected.</span>`});
 document.querySelectorAll('.icu-choice').forEach(b=>b.onclick=()=>{document.querySelector('#icuFeedback').innerHTML=`<p class="safety-note"><strong>${b.dataset.correct==='true'?'Escalate now':'Do not delay'}</strong><span>${b.dataset.correct==='true'?'The combined trend shows worsening respiratory effort, perfusion, heart rate, and mentation. Communicate immediately and prepare for directed intervention.':'Worsening trends require prompt communication and reassessment rather than waiting for the next routine interval.'}</span></p>`});
 document.querySelector('#requestL6Validation')?.addEventListener('click',()=>openModal('<span class="eyebrow">Competency validation</span><h1>Request Level 6 observation</h1><p>Select a competency, approved validator, location, and emergency or simulation shift.</p><button class="primary" onclick="document.querySelector(\'#modal\').close()">Submit request</button>'));
}
function openEmergencyShift(){renderEmergencyShift();switchView('level6CaseRunner')}
function renderEmergencyShift(){
 document.querySelector('#l6CaseStepLabel').textContent=l6Stages[l6State.caseStep];
 document.querySelector('#l6CaseProgress').style.width=`${((l6State.caseStep+1)/l6Stages.length)*100}%`;
 document.querySelector('#l6CaseStageNav').innerHTML=l6Stages.map((s,i)=>`<button class="${i===l6State.caseStep?'active':''}" data-l6-step="${i}">${i+1}. ${s}</button>`).join('');
 const stages=[
 `<span class="eyebrow">Two patients arrive together</span><h2>Scan before starting tasks</h2><div class="emergency-arrivals"><article><span class="badge warning">Patient A</span><h3>Milo</h3><p>Cat in carrier, open-mouth breathing, neck extended.</p></article><article><span class="badge neutral">Patient B</span><h3>Cooper</h3><p>Dog non-weight-bearing after a fall; alert and vocal.</p></article></div><div class="choice-grid"><button class="case-choice l6-decision" data-right="true">Alert the medical team about Milo and minimize handling</button><button class="case-choice l6-decision">Begin a complete history with Cooper first</button></div>`,
 `<span class="eyebrow">Triage</span><h2>Assign priority from observable threats</h2><p>Milo has an immediate breathing threat. Cooper is urgent and still requires prompt assessment and repeated observation.</p><div class="triage-summary"><strong>Milo — Immediate</strong><span>Respiratory distress signs</span><strong>Cooper — Urgent</strong><span>Trauma and pain; currently alert</span></div>`,
 `<span class="eyebrow">Primary survey</span><h2>Use a structured first look</h2><div class="abc-grid"><article><strong>A — Airway</strong><p>Is air moving? Is there obstruction or abnormal sound?</p></article><article><strong>B — Breathing</strong><p>Rate, effort, pattern, posture, and oxygenation concerns.</p></article><article><strong>C — Circulation</strong><p>Pulse quality, mucous membranes, CRT, bleeding, and perfusion.</p></article></div><button class="primary" id="recordPrimarySurvey">Record primary survey</button>`,
 `<span class="eyebrow">Team roles</span><h2>Use closed-loop communication</h2><div class="role-board"><label>Team Lead<select><option>DVM / Practitioner</option></select></label><label>Airway / breathing<select><option>Pet Nurse</option></select></label><label>Circulation / procedures<select><option>Pet Nurse</option></select></label><label>Recorder / runner<select><option>Nurse Aide</option></select></label></div><p class="safety-note"><strong>Closed loop</strong><span>Name the person, state the task, receive confirmation, and report when the task is complete.</span></p>`,
 `<span class="eyebrow">DVM-directed stabilization</span><h2>Support care without adding stress</h2><div class="timeline-row"><strong>0:00</strong><span>Medical team alerted; low-stress oxygen support prepared.</span></div><div class="timeline-row"><strong>0:02</strong><span>Focused visual assessment and monitoring initiated.</span></div><div class="timeline-row"><strong>0:05</strong><span>Directed interventions completed and documented.</span></div><p class="safety-note"><strong>Learning boundary</strong><span>Exact oxygen methods, medication protocols, doses, and procedures must follow Hannah-approved emergency standards and DVM direction.</span></p>`,
 `<span class="eyebrow">Reassessment</span><h2>Look for response or deterioration</h2><div class="lab-result-grid"><div class="lab-result"><span>Respiratory rate</span><strong>52 → 44</strong><small>Trend improving</small></div><div class="lab-result"><span>Effort</span><strong>Marked → moderate</strong><small>Still abnormal</small></div><div class="lab-result"><span>Mentation</span><strong>Responsive</strong><small>Continue close monitoring</small></div></div><button class="secondary" id="documentReassessment">Document and communicate</button>`,
 `<span class="eyebrow">New arrival</span><h2>Daisy begins seizing in the lobby</h2><p>The team must protect Daisy, time the event, alert the DVM, and maintain care for Milo and Cooper.</p><div class="choice-grid"><button class="case-choice l6-decision" data-right="true">Call for help, protect Daisy from injury, and start timing</button><button class="case-choice l6-decision">Place hands near Daisy's mouth to check the tongue</button><button class="case-choice l6-decision">Leave Milo unmonitored while everyone responds</button></div>`,
 `<span class="eyebrow">Emergency handoff</span><h2>Make the next team effective</h2><textarea rows="8" style="width:100%" placeholder="Patient and priority → immediate threat → actions completed → response → remaining concerns → next required reassessment"></textarea><button class="primary" id="saveEmergencyHandoff">Save practice handoff</button>`,
 `<span class="eyebrow">Debrief</span><h2>Review the system, not just the outcome</h2><p>The shift required continuous triage, clear role assignment, low-stress stabilization, serial reassessment, and concise handoffs. Emergency readiness depends on team systems established before the crisis.</p><button class="primary" id="completeEmergencyShift">Complete Level 6 preview</button>`
 ];
 document.querySelector('#l6CaseStageContent').innerHTML=stages[l6State.caseStep];
 const patient=['Multiple arrivals','Milo','Milo','Milo','Milo','Milo','Daisy','All patients','All patients'][l6State.caseStep];
 document.querySelector('#activeEmergencyPatient').textContent=patient;
 document.querySelector('#emergencyPriority').textContent=l6State.caseStep===0?'Unassigned':l6State.caseStep<6?'Immediate':l6State.caseStep===6?'Immediate — new arrival':'Multiple priorities';
 document.querySelector('#emergencyTeamStatus').textContent=l6State.caseStep<3?'Mobilizing':'Roles assigned';
 document.querySelector('#emergencyLocation').textContent=l6State.caseStep===6?'Lobby / Triage':l6State.caseStep>6?'ER handoff':'Emergency treatment';
 document.querySelectorAll('[data-l6-step]').forEach(b=>b.onclick=()=>{l6State.caseStep=+b.dataset.l6Step;persistL6();renderEmergencyShift()});
 document.querySelectorAll('.l6-decision').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Priority action recorded':'Reconsider safety and priority')});
 document.querySelector('#recordPrimarySurvey')?.addEventListener('click',()=>toast('Primary survey documented'));
 document.querySelector('#documentReassessment')?.addEventListener('click',()=>toast('Reassessment communicated'));
 document.querySelector('#saveEmergencyHandoff')?.addEventListener('click',()=>toast('Practice handoff saved'));
 document.querySelector('#completeEmergencyShift')?.addEventListener('click',()=>{l6State.completed=true;persistL6();toast('Emergency shift completed')});
}


/* ===== Level 9 — Hospitalized Patient Care ===== */
const l7Courses=[
 {title:'Treatment Plans',focus:'Translate DVM direction into a complete, current, actionable inpatient plan.',objectives:['Identify required plan elements','Verify ownership, frequency, route, and timing','Recognize when a plan requires clarification'],workflow:['Review active orders and patient goals','Confirm every treatment has complete instructions','Assign due times and accountable roles','Reconcile changes immediately','Document clarification and approval'],check:'Which action best prevents an outdated order from remaining active?',answer:'Reconcile the plan immediately after every approved change'},
 {title:'Treatment Timeline',focus:'Use the timeline as the shared source of truth for due, completed, delayed, and reassessed care.',objectives:['Read treatment status at a glance','Record completion in real time','Manage delays and dependencies safely'],workflow:['Review overdue and upcoming items at shift start','Complete only after treatment is performed','Record reason for delay or omission','Link reassessment to the treatment event','Escalate conflicts before care is missed'],check:'When should a treatment be marked complete?',answer:'Immediately after it is actually performed and documented'},
 {title:'Monitoring',focus:'Recognize trends, not isolated numbers, and connect observations to timely reassessment.',objectives:['Perform ordered monitoring consistently','Compare findings with baseline and trend','Escalate meaningful changes promptly'],workflow:['Confirm monitoring frequency and parameters','Observe the whole patient before entering values','Compare with previous findings','Recheck unexpected values','Escalate and document the response'],check:'What is the safest response to an unexpected monitored value?',answer:'Assess the patient, verify the value, compare the trend, and escalate'},
 {title:'Nursing Notes',focus:'Create objective, time-linked notes that communicate patient status, response, and next actions.',objectives:['Separate observation from interpretation','Document response to care','Write notes that support the next caregiver'],workflow:['Record date and time','Describe objective observations','Connect findings to treatments and reassessment','Document communications and directions','State pending actions and follow-up'],check:'Which note is most useful?',answer:'A time-stamped objective note describing findings, response, communication, and next action'},
 {title:'Escalation',focus:'Use stop-the-line authority and closed-loop communication when a hospitalized patient declines or care cannot be completed.',objectives:['Identify clinical and workflow triggers','Use concise escalation language','Confirm that responsibility transfers clearly'],workflow:['Recognize the concern','Stabilize within role and approved protocol','Contact the assigned DVM or escalation path','Use patient, change, concern, and request','Read back directions and document'],check:'When is escalation complete?',answer:'When the concern is received, directions are confirmed, and follow-up ownership is clear'},
 {title:'Shift Handoffs',focus:'Transfer responsibility without losing critical context, due care, risks, or Member commitments.',objectives:['Prepare a structured handoff','Prioritize unstable and time-sensitive patients','Confirm acceptance of responsibility'],workflow:['Update the record before handoff','Lead with patient stability and active concerns','Review due and overdue treatments','Identify pending diagnostics and communications','Use read-back and questions'],check:'What must happen before leaving the shift?',answer:'The receiving caregiver accepts the handoff and all urgent responsibilities are clear'},
 {title:'Discharge Preparation',focus:'Begin discharge planning early so medications, instructions, follow-up, and Member education are accurate and ready.',objectives:['Identify discharge dependencies','Reconcile instructions with the final plan','Use teach-back and document understanding'],workflow:['Track anticipated discharge criteria','Prepare draft instructions and medication list','Confirm final DVM directions','Schedule follow-up and resolve pending items','Review with the Member using teach-back'],check:'When should discharge preparation begin?',answer:'During hospitalization, not after the discharge decision is made'}
];
const l7Cases=[
 ['Declining Hospitalized Patient','Trend recognition, escalation, reassessment'],
 ['Missed Treatment','Delay documentation, patient assessment, recovery plan'],
 ['Updating Treatment Plans','Order reconciliation and timeline synchronization'],
 ['Member Communication','Status update, expectations, and documented follow-up']
];
const l7State=JSON.parse(localStorage.getItem('hannahLevel9')||'{"tab":"overview","caseStep":0,"completed":false,"courseProgress":{},"quizScore":0}');
function persistL7(){localStorage.setItem('hannahLevel9',JSON.stringify(l7State))}
function openLevel7(){switchView('level7');l7State.tab='overview';renderLevel7()}
function openSurgicalDay(){switchView('level7CaseRunner');renderSurgicalDay()}
function level9CourseModal(i){
 const c=l7Courses[i];
 openModal(`<span class="eyebrow">Level 9 course ${i+1} of 7</span><h1>${c.title}</h1><div class="detail-card"><strong>Why it matters</strong><span>${c.focus}</span></div><h3>Learning objectives</h3><ul>${c.objectives.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Hannah standard workflow</h3><div class="timeline-list">${c.workflow.map((x,n)=>`<div class="timeline-row"><strong>${n+1}</strong><span>${x}</span></div>`).join('')}</div><h3>Interactive decision point</h3><p>${c.check}</p><div class="choice-grid"><button class="case-choice course-check" data-right="true">${c.answer}</button><button class="case-choice course-check">Wait until the end of the shift to resolve it</button></div><p class="safety-note"><strong>Competency evidence</strong><span>Knowledge check, simulation performance, record review, and direct manager or clinician observation.</span></p><button class="primary" id="completeL9Course" data-course="${i}">Mark course preview complete</button>`);
 document.querySelectorAll('.course-check').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Correct — safe workflow selected':'Review the Hannah workflow and choose the action that closes the loop')});
 document.querySelector('#completeL9Course')?.addEventListener('click',e=>{l7State.courseProgress[e.target.dataset.course]=100;persistL7();document.querySelector('#modal').close();renderLevel7();toast('Course preview completed')});
}
function renderLevel7(){
 document.querySelectorAll('[data-l7tab]').forEach(b=>b.classList.toggle('active',b.dataset.l7tab===l7State.tab));
 const host=document.querySelector('#level7Content');
 const completed=Object.keys(l7State.courseProgress).length;
 if(l7State.tab==='overview') host.innerHTML=`<div class="level-hero surgery-hero"><div><span class="eyebrow light">Level 9 learning path</span><h2>Hospitalized care is a continuous cycle of plan, action, reassessment, and communication.</h2><p>Level 9 connects the Hospitalization Board, treatment plan, timeline, monitoring, nursing documentation, escalation, handoffs, and discharge preparation in one reliable workflow.</p><div class="button-row"><button class="primary" id="overviewResumeSurgery">Open Luna’s hospitalization</button><button class="ghost" data-open-l7="curriculum">View curriculum</button></div></div><div class="readiness-ring"><strong>${Math.round((completed/7)*80+(l7State.completed?20:0))}%</strong><span>Level progress</span></div></div><div class="metric-grid"><article class="metric"><span>Courses</span><strong>7</strong><small>Hospitalization workflow</small></article><article class="metric"><span>Simulations</span><strong>4</strong><small>High-risk decisions</small></article><article class="metric"><span>Competencies</span><strong>8</strong><small>Manager validation</small></article><article class="metric"><span>Job aids</span><strong>7</strong><small>Point-of-care tools</small></article></div><div class="dashboard-layout"><section class="panel span-2"><span class="eyebrow">Hospitalized-care cycle</span><h2>Keep the patient, plan, timeline, and team synchronized</h2><div class="pathway-strip">${['Assess','Plan','Schedule','Treat','Monitor','Escalate','Handoff','Discharge'].map((x,i)=>`<div><strong>${i+1}</strong><span>${x}</span></div>`).join('')}</div></section><section class="panel"><span class="eyebrow">Current simulation</span><h2>Luna’s Hospitalization</h2><p>Manage a changing inpatient case across two shifts and a discharge transition.</p><button class="primary full" id="overviewResumeSurgery2">Resume</button></section><section class="panel"><span class="eyebrow">Hannah systems</span><h2>Prototype integration</h2><p>Demonstrates how treatment-plan changes update the timeline, tasks, reassessment, handoff, and discharge readiness.</p></section></div>`;
 if(l7State.tab==='curriculum') host.innerHTML=`<div class="course-grid">${l7Courses.map((c,i)=>`<article class="course-card"><div class="course-top"><span class="course-number">${String(i+1).padStart(2,'0')}</span><span class="badge ${l7State.courseProgress[i]?'good':'neutral'}">${l7State.courseProgress[i]?'Complete':'Course'}</span></div><h2>${c.title}</h2><p>${c.focus}</p><div class="progress"><span style="width:${l7State.courseProgress[i]||0}%"></span></div><button class="secondary l7-course-open" data-course="${i}">${l7State.courseProgress[i]?'Review':'Open course'}</button></article>`).join('')}</div>`;
 if(l7State.tab==='checklist') host.innerHTML=renderTreatmentPlanBuilder();
 if(l7State.tab==='sterile') host.innerHTML=renderTimelineExercise();
 if(l7State.tab==='recovery') host.innerHTML=renderMonitoringExercise();
 if(l7State.tab==='cases') host.innerHTML=`<div class="case-grid">${l7Cases.map((c,i)=>`<article class="case-card"><span class="case-pill">Simulation ${i+1}</span><h2>${c[0]}</h2><p>${c[1]}</p><button class="secondary l9-sim-open" data-case="${i}">Launch simulation</button></article>`).join('')}</div>`;
 if(l7State.tab==='competencies') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency Passport</span><h2>Level 9 validation plan</h2></div><button class="primary" id="requestL7Validation">Request observation</button></div><div class="competency-table"><div class="competency-row table-head"><strong>Competency</strong><span>Evidence</span><span>Status</span><span></span></div>${[['Build and reconcile a complete treatment plan','Simulation + record review','Ready'],['Maintain an accurate treatment timeline','Direct observation','Practice'],['Recognize and escalate a declining trend','Simulation + observation','Ready'],['Write objective nursing notes','Record review','Practice'],['Complete a structured shift handoff','Observed handoff','Practice'],['Prepare and teach discharge instructions','Observed communication','Not started']].map(c=>`<div class="competency-row"><strong>${c[0]}</strong><span>${c[1]}</span><span class="badge ${c[2]==='Ready'?'warning':'neutral'}">${c[2]}</span><span></span><button class="secondary">View</button></div>`).join('')}</div></section>`;
 document.querySelectorAll('[data-open-l7]').forEach(b=>b.onclick=()=>{l7State.tab=b.dataset.openL7;persistL7();renderLevel7()});
 document.querySelectorAll('.l7-course-open').forEach(b=>b.onclick=()=>level9CourseModal(+b.dataset.course));
 document.querySelectorAll('.l9-sim-open').forEach(b=>b.onclick=()=>{l7State.caseStep=+b.dataset.case===0?2:+b.dataset.case===1?4:+b.dataset.case===2?1:7;persistL7();openSurgicalDay()});
 document.querySelector('#overviewResumeSurgery')?.addEventListener('click',openSurgicalDay);document.querySelector('#overviewResumeSurgery2')?.addEventListener('click',openSurgicalDay);
 document.querySelector('#requestL7Validation')?.addEventListener('click',()=>openModal('<span class="eyebrow">Competency validation</span><h1>Request Level 9 observation</h1><p>Select the hospitalization competency, approved validator, hospital location, patient-care shift, and supporting evidence.</p><button class="primary" onclick="document.querySelector(\'#modal\').close()">Submit request</button>'));
 bindLevel9Tools();
}
function renderTreatmentPlanBuilder(){
 const rows=[['IV fluid therapy','Continuous','Pet Nurse','Active'],['Prescribed medication','BID','Pet Nurse','Active'],['Pain reassessment','Every 4 hours','Pet Nurse','Active'],['DVM reassessment','Morning rounds','DVM','Active'],['Member update','By 2:00 PM','TC / DVM','Pending']];
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Interactive treatment plan</span><h2>Build a complete, actionable plan</h2><p>Review every item for what, who, when, status, and reassessment. Clinical details remain placeholders pending Hannah approval.</p></div><button class="primary" id="validatePlan">Validate plan</button></div><div class="competency-table"><div class="competency-row table-head"><strong>Treatment / task</strong><span>Frequency</span><span>Owner</span><span>Status</span></div>${rows.map(r=>`<div class="competency-row"><strong>${r[0]}</strong><span>${r[1]}</span><span>${r[2]}</span><select class="plan-status"><option>${r[3]}</option><option>Clarification needed</option><option>Held by DVM</option><option>Complete</option></select></div>`).join('')}</div><div id="planResult" class="safety-note"><strong>Plan integrity</strong><span>A treatment plan is not ready until every active item can be understood and performed without guessing.</span></div></section>`;
}
function renderTimelineExercise(){
 const events=[['08:00','Baseline assessment','Completed'],['09:00','Medication due','Completed'],['10:00','Monitoring','Due now'],['10:30','Diagnostic sample','Pending result'],['12:00','Medication due','Upcoming'],['14:00','Member update','Upcoming']];
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Treatment timeline</span><h2>Manage due care and plan changes in real time</h2><p>A new DVM order changes monitoring frequency. Select the safest workflow.</p></div></div><div class="timeline-list">${events.map(e=>`<div class="timeline-row"><strong>${e[0]}</strong><span>${e[1]}</span><span class="badge ${e[2]==='Due now'?'warning':'neutral'}">${e[2]}</span></div>`).join('')}</div><div class="choice-grid"><button class="case-choice timeline-choice" data-right="true">Update the active plan, regenerate affected timeline tasks, verify the next due time, and communicate the change</button><button class="case-choice timeline-choice">Write the change in a note and leave the old timeline unchanged</button></div><div id="timelineFeedback"></div></section>`;
}
function renderMonitoringExercise(){
 return `<section class="panel"><div class="section-head"><div><span class="eyebrow">Monitoring & trend recognition</span><h2>See the patient behind the numbers</h2><p>Luna’s latest assessment differs from her established trend. Exact clinical thresholds are intentionally excluded.</p></div><button class="secondary" id="addNursingNote">Write nursing note</button></div><div class="lab-result-grid"><div class="lab-result"><span>Mentation</span><strong>Less responsive</strong><small>Changed from prior check</small></div><div class="lab-result"><span>Respiratory effort</span><strong>Increased</strong><small>Verify and observe patient</small></div><div class="lab-result"><span>Perfusion indicators</span><strong>Changed</strong><small>Trend requires escalation</small></div><div class="lab-result"><span>Comfort</span><strong>Not settled</strong><small>Reassess after intervention</small></div></div><div class="choice-grid"><button class="case-choice monitor-choice" data-right="true">Stay with Luna, verify findings, notify the DVM using closed-loop communication, follow approved directions, and document reassessment</button><button class="case-choice monitor-choice">Enter the values and wait for the next scheduled check</button></div></section>`;
}
function bindLevel9Tools(){
 document.querySelector('#validatePlan')?.addEventListener('click',()=>{document.querySelector('#planResult').innerHTML='<strong>Plan check complete</strong><span>All items have an owner, timing, status, and a clear next action. Any clinical ambiguity still requires DVM clarification.</span>';toast('Treatment plan validated')});
 document.querySelectorAll('.timeline-choice,.monitor-choice').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Safe closed-loop workflow selected':'This option leaves a patient-care loop open')});
 document.querySelector('#addNursingNote')?.addEventListener('click',()=>openModal('<span class="eyebrow">Practice nursing note</span><h1>Document the change objectively</h1><textarea rows="10" style="width:100%" placeholder="Time, objective patient findings, comparison with prior trend, DVM notification, directions received, treatment performed, response, and next reassessment..."></textarea><button class="primary" onclick="document.querySelector(\'#modal\').close()">Save practice note</button>'));
}
function renderSurgicalDay(){
 const labels=['Admission','Plan','Baseline','Decline','Escalation','Plan change','Handoff','Member update','Discharge'];
 document.querySelector('#l7CaseStageNav').innerHTML=labels.map((x,i)=>`<button data-l7-step="${i}" class="${i===l7State.caseStep?'active':''}">${i+1}. ${x}</button>`).join('');
 document.querySelector('#l7CaseStepLabel').textContent=labels[l7State.caseStep];document.querySelector('#l7CaseProgress').style.width=((l7State.caseStep+1)/labels.length*100)+'%';
 const stages=[
 `<span class="eyebrow">Hospital admission</span><h2>Start with a complete patient and plan handoff</h2><p>Luna is admitted for ongoing treatment and monitoring. The admission record contains active concerns, ordered care, pending diagnostics, Member commitments, and DVM instructions.</p><div class="choice-grid"><button class="case-choice l7-decision" data-right="true">Verify two identifiers, current status, active orders, monitoring frequency, due treatments, escalation plan, and communication expectations</button><button class="case-choice l7-decision">Begin care from the schedule and review the full record later</button></div>`,
 `<span class="eyebrow">Treatment plan</span><h2>Convert directions into accountable work</h2><p>One medication order lacks a clearly documented next due time, and the reassessment instruction is incomplete.</p><div class="choice-grid"><button class="case-choice l7-decision" data-right="true">Pause that item, clarify with the DVM, then update the plan and timeline before assigning it</button><button class="case-choice l7-decision">Choose a reasonable time based on the prior shift</button></div>`,
 `<span class="eyebrow">Baseline monitoring</span><h2>Establish the trend before interpreting change</h2><div class="abc-grid"><article><strong>Whole patient</strong><p>Mentation, posture, breathing, comfort, interaction, and elimination.</p></article><article><strong>Ordered measures</strong><p>Collect consistently using approved technique and frequency.</p></article><article><strong>Context</strong><p>Compare with prior findings, treatments, diagnostics, and environment.</p></article></div><button class="primary" id="recordPrep">Record baseline assessment</button>`,
 `<span class="eyebrow">Declining patient simulation</span><h2>Luna no longer matches her baseline</h2><p>Her responsiveness, breathing pattern, comfort, and monitored findings have changed since the last assessment.</p><div class="choice-grid"><button class="case-choice l7-decision" data-right="true">Remain with Luna, verify the findings, call for assistance, and escalate immediately using the approved chain</button><button class="case-choice l7-decision">Document the changes and reassess at the next scheduled interval</button></div><p class="safety-note"><strong>Prototype boundary</strong><span>Exact thresholds, emergency interventions, medications, and DVM orders must come from Hannah-approved clinical protocols.</span></p>`,
 `<span class="eyebrow">Closed-loop escalation</span><h2>Communicate the patient, change, concern, and request</h2><div class="role-board"><label>Patient<input value="Luna — hospitalized patient" readonly></label><label>Change<input value="Meaningful decline from baseline" readonly></label><label>Concern<input value="Patient requires immediate reassessment" readonly></label><label>Request<input value="DVM bedside assessment and directions" readonly></label></div><button class="primary" id="saveCountRecord">Read back and document directions</button>`,
 `<span class="eyebrow">Updating treatment plans</span><h2>The DVM changes the plan</h2><p>Monitoring becomes more frequent, one treatment is held, and a new reassessment task is added.</p><div class="choice-grid"><button class="case-choice l7-decision" data-right="true">Update the approved treatment plan, cancel or hold obsolete tasks, generate new timeline items, verify ownership and timing, and notify the team</button><button class="case-choice l7-decision">Add the new instructions while leaving prior tasks active for reference</button></div>`,
 `<span class="eyebrow">Shift handoff</span><h2>Transfer responsibility without losing risk</h2><div class="timeline-row"><strong>Current stability</strong><span>State the trend and most recent reassessment first.</span></div><div class="timeline-row"><strong>Due care</strong><span>Review upcoming, delayed, held, and conditional tasks.</span></div><div class="timeline-row"><strong>Open loops</strong><span>Pending diagnostics, DVM follow-up, Member update, and discharge barriers.</span></div><button class="primary" id="recordRecovery">Complete read-back handoff</button>`,
 `<span class="eyebrow">Member communication</span><h2>Give an accurate update without overpromising</h2><textarea rows="8" style="width:100%" placeholder="Explain Luna’s current status, what has changed, what the team is doing, what remains uncertain, when the next update will occur, and who will provide it..."></textarea><button class="primary" id="saveSurgicalDischarge">Save practice communication</button>`,
 `<span class="eyebrow">Discharge preparation</span><h2>Close every patient-care and Member communication loop</h2><p>Luna meets DVM-directed discharge criteria. Reconcile final medications, instructions, warning signs, follow-up, pending results, and contact information.</p><div class="choice-grid"><button class="case-choice l7-decision" data-right="true">Review final DVM directions, use Member teach-back, document understanding, and confirm all pending follow-up ownership</button><button class="case-choice l7-decision">Provide the printed instructions and ask whether the Member has questions</button></div><button class="primary" id="completeSurgicalDay">Complete Level 9 simulation</button>`
 ];
 document.querySelector('#l7CaseStageContent').innerHTML=stages[l7State.caseStep];
 const phases=['Admission','Planning','Monitoring','Declining','Escalation','Plan update','Handoff','Communication','Discharge'];
 const locations=['Hospitalization Intake','Hospitalization Board','Treatment Area','Treatment Area','Treatment Area','Hospitalization Board','Treatment Area','Communication Desk','Discharge Room'];
 document.querySelector('#surgeryPhase').textContent=phases[l7State.caseStep];document.querySelector('#surgeryLocation').textContent=locations[l7State.caseStep];document.querySelector('#surgerySafety').textContent=l7State.caseStep<3?'Plan active':l7State.caseStep<6?'Escalation active':'Transition controlled';
 document.querySelectorAll('[data-l7-step]').forEach(b=>b.onclick=()=>{l7State.caseStep=+b.dataset.l7Step;persistL7();renderSurgicalDay()});
 document.querySelectorAll('.l7-decision').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Safe hospitalization action recorded':'This choice leaves a safety or communication loop open')});
 document.querySelector('#recordPrep')?.addEventListener('click',()=>toast('Baseline assessment documented'));document.querySelector('#saveCountRecord')?.addEventListener('click',()=>toast('Directions read back and documented'));document.querySelector('#recordRecovery')?.addEventListener('click',()=>toast('Structured handoff completed'));document.querySelector('#saveSurgicalDischarge')?.addEventListener('click',()=>toast('Member communication saved'));document.querySelector('#completeSurgicalDay')?.addEventListener('click',()=>{l7State.completed=true;persistL7();toast('Level 9 simulation completed')});
}

// Intercept Medical Academy actions before the generic prototype modal.
document.addEventListener('click',e=>{
 const academy=e.target.closest('.academy-open');
 if(academy&&academy.dataset.title==='Medical Academy'){e.preventDefault();e.stopImmediatePropagation();openMedicalAcademy()}
},true);
document.querySelector('#resumeLessonBtn')?.addEventListener('click',e=>{e.stopImmediatePropagation();openMedicalAcademy()},true);
document.querySelector('#openLevel5Btn')?.addEventListener('click',()=>openLevel5());
document.querySelector('#backToMedicalAcademy')?.addEventListener('click',openMedicalAcademy);
document.querySelector('#resumeBellaBtn')?.addEventListener('click',openBellaCase);
document.querySelector('#exitLevel5Case')?.addEventListener('click',()=>openLevel5());
document.querySelector('#level5ResourcesBtn')?.addEventListener('click',()=>openModal('<span class="eyebrow">Level 5 resources</span><h1>Internal Medicine resource library</h1><p>Approved Hannah protocols, Diagnostic Workflow Hub pathways, case job aids, and clinical references will appear here. Content not supported by approved sources remains clearly marked as pending review.</p>'));
document.querySelector('#openAskHannahCase')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='How should I present Bella’s vomiting case to the DVM?'});
document.querySelectorAll('[data-l5tab]').forEach(b=>b.onclick=()=>{l5State.tab=b.dataset.l5tab;persist();renderLevel5()});

document.querySelector('#backToMedicalAcademyL6')?.addEventListener('click',openMedicalAcademy);
document.querySelector('#resumeEmergencyBtn')?.addEventListener('click',openEmergencyShift);
document.querySelector('#exitLevel6Case')?.addEventListener('click',()=>openLevel6());
document.querySelector('#level6ResourcesBtn')?.addEventListener('click',()=>openModal('<span class="eyebrow">Level 6 resources</span><h1>Emergency & Critical Care resource library</h1><p>Approved triage criteria, CPR standards, crash-cart checklists, emergency drug protocols, oxygen-support procedures, hospitalization standards, and role permissions will appear here after clinical review.</p><p class="safety-note"><strong>Prototype boundary</strong><span>This build intentionally avoids inventing doses, critical thresholds, or treatment protocols not supported by Hannah-approved sources.</span></p>'));
document.querySelector('#openAskHannahEmergency')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah emergency triage and escalation workflow?'});
document.querySelectorAll('[data-l6tab]').forEach(b=>b.onclick=()=>{l6State.tab=b.dataset.l6tab;persistL6();renderLevel6()});

document.querySelector('#backToMedicalAcademyL7')?.addEventListener('click',openMedicalAcademy);
document.querySelector('#resumeSurgeryBtn')?.addEventListener('click',openSurgicalDay);
document.querySelector('#exitLevel7Case')?.addEventListener('click',()=>openLevel7());
document.querySelector('#level7ResourcesBtn')?.addEventListener('click',()=>openModal('<span class="eyebrow">Level 9 resources</span><h1>Hospitalized Patient Care job-aid library</h1><p>Treatment-plan checklist, timeline status guide, monitoring trend sheet, nursing-note template, escalation script, shift-handoff checklist, and discharge-readiness guide.</p><p class="safety-note"><strong>Clinical governance</strong><span>Production content must use Hannah-approved hospitalization, monitoring, escalation, documentation, medication, discharge, and role-permission standards.</span></p>'));
document.querySelector('#openAskHannahSurgery')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah hospitalized-patient treatment plan, monitoring, escalation, handoff, and discharge workflow?'});
document.querySelectorAll('[data-l7tab]').forEach(b=>b.onclick=()=>{l7State.tab=b.dataset.l7tab;persistL7();renderLevel7()});


/* ===== Levels 10–12 Complete Prototype ===== */
const upperLevels={
 10:{title:'Member Communication',subtitle:'Clear information. Shared decisions. Compassionate follow-through.',tabs:['Overview','Courses','Practice Lab','Simulations','Competencies'],courses:[
  {title:'Medical Education',why:'Members make better decisions when medical information is organized, understandable, and connected to their Pet.',objectives:['Explain medical concepts in plain language','Check understanding without judgment','Separate known facts from uncertainty'],foundation:'Use short segments, familiar words, visual support, and teach-back. Avoid jargon or explain it immediately.',workflow:['Confirm what the Member already understands','State the main message first','Explain what is known, suspected, and still being evaluated','Connect information to the Pet and next decision','Ask the Member to explain the plan in their own words'],decision:'The Member nods but cannot describe the plan. What should you do?',answer:'Re-explain the key point in a different way and use teach-back again',job:'Plain-language medical education checklist'},
  {title:'Delivering Diagnostic Recommendations',why:'A recommendation is easier to evaluate when the Member understands the clinical question, value, limits, and next step.',objectives:['Present the clinical question before the test','Explain benefits and limitations','Confirm the decision and document it'],foundation:'Diagnostic conversations should explain what the team is trying to learn, how the result may change care, and what uncertainty may remain.',workflow:['Summarize the current concern','Name the recommended diagnostic and clinical question','Explain how results may affect the plan','Discuss timing, limitations, and alternatives within role','Confirm the Member decision and document'],decision:'The Member asks, “Do we really need this test?”',answer:'Explain the question the test is intended to answer and how the result could change care',job:'Diagnostic recommendation conversation map'},
  {title:'Financial Discussions',why:'Transparent financial conversations reduce surprises while protecting trust and access to informed choices.',objectives:['Discuss cost without judgment','Separate medical recommendation from payment logistics','Escalate financial exceptions appropriately'],foundation:'Use neutral language, confirm what is included, avoid assumptions about affordability, and never promise unapproved discounts or outcomes.',workflow:['Confirm the recommended plan is understood','Review the authorized estimate or financial information','Pause for questions','Discuss approved alternatives only with the appropriate clinician','Confirm authorization, declined items, and next steps'],decision:'A Member says the recommendation is more than expected.',answer:'Acknowledge the concern, review the approved information clearly, and involve the appropriate clinician for medical alternatives',job:'Financial discussion and authorization checklist'},
  {title:'Difficult Conversations',why:'Concerns handled with calm structure can restore trust and reveal what the Member needs most.',objectives:['De-escalate without becoming defensive','Identify the underlying concern','Set a clear next step and owner'],foundation:'Listen first, acknowledge impact, gather facts, avoid speculation, and make realistic commitments.',workflow:['Create space and listen without interruption','Reflect the concern and impact','Clarify facts and desired resolution','State what you can do now and what requires review','Confirm owner, timing, and follow-up'],decision:'A Member is angry and repeats the same concern.',answer:'Acknowledge the impact, summarize the concern, and clarify the specific outcome they are seeking',job:'Difficult-conversation response guide'},
  {title:'End-of-Life Communication',why:'Compassionate, unhurried communication helps families understand options and feel supported during an emotionally difficult time.',objectives:['Use clear and compassionate language','Avoid euphemisms that create confusion','Support choice and privacy without pressure'],foundation:'Follow clinician direction, use the Pet and Member’s preferred names, pause often, and never rush or overstate certainty.',workflow:['Confirm the clinician has explained the medical situation','Ask what the Member understands and needs','Use direct, compassionate language','Explain the process and choices within role','Confirm wishes, privacy needs, and next steps'],decision:'The Member asks whether euthanasia means their Pet will suffer.',answer:'Respond compassionately, explain the process within your role, and involve the clinician for medical details',job:'End-of-life communication and room-readiness guide'},
  {title:'Discharge Instructions',why:'Discharge succeeds only when the Member can carry out the plan and knows what should trigger follow-up.',objectives:['Reconcile instructions with the final plan','Prioritize key home-care actions','Use teach-back and document understanding'],foundation:'Written instructions support—not replace—a structured conversation. Highlight medications, feeding, activity, warning signs, and follow-up.',workflow:['Verify final DVM directions and medication list','Organize instructions by what to do today, later, and if concerned','Demonstrate unfamiliar tasks when needed','Use teach-back for medications and warning signs','Document understanding and unresolved questions'],decision:'The Member says they will read the instructions at home.',answer:'Review the highest-risk instructions now and use teach-back before departure',job:'Discharge excellence checklist'}],
 simulations:[['Explaining an uncertain diagnosis','Educate without overpromising and identify the next decision.'],['Diagnostic recommendation and cost concern','Separate medical value, financial information, and approved alternatives.'],['Difficult service-recovery conversation','Listen, clarify impact, and establish ownership.'],['End-of-life and discharge communication','Use compassionate clarity, privacy, and teach-back.']],competencies:['Uses plain language and teach-back','Presents diagnostic value and limitations','Discusses finances neutrally and accurately','De-escalates and identifies the underlying concern','Uses compassionate end-of-life language','Delivers complete discharge education']},
 11:{title:'Advanced Medicine',subtitle:'Advanced pattern recognition, specialty support, and complex patient coordination.',tabs:['Overview','Courses','Case Conference','ICU Lab','Competencies'],courses:[
  {title:'Oncology',why:'Complex cancer cases require accurate staging support, symptom monitoring, safe handling, and coordinated communication.',objectives:['Describe staging and treatment goals at a high level','Recognize common supportive-care needs','Follow hazardous-drug safety requirements'],foundation:'Production content must be approved by Hannah clinical leadership and applicable safety standards.',workflow:['Confirm diagnosis, staging plan, and treatment intent','Prepare ordered diagnostics and safe-handling controls','Monitor patient response and adverse effects','Document trends and escalation concerns','Coordinate Member updates and follow-up'],decision:'A patient receiving chemotherapy develops a meaningful new symptom.',answer:'Assess within role, use required safety precautions, and escalate promptly to the supervising clinician',job:'Oncology visit and monitoring checklist'},
  {title:'Neurology',why:'Neurologic patients can deteriorate quickly and benefit from consistent examination, localization support, and serial trends.',objectives:['Recognize major neurologic presentation categories','Perform consistent clinician-directed observations','Escalate meaningful neurologic change'],foundation:'Use approved neurologic assessment methods; do not infer diagnosis from one sign.',workflow:['Identify presenting complaint and immediate stability','Record mentation, gait, posture, cranial observations, and pain as directed','Compare with baseline and prior findings','Protect patient safety and mobility','Escalate and document change'],decision:'A hospitalized neurologic patient is less responsive than baseline.',answer:'Remain with the patient, verify the change, protect safety, and escalate immediately',job:'Serial neurologic observation sheet'},
  {title:'Ophthalmology',why:'Eye conditions may be painful and vision-threatening, so precise observation and timely escalation matter.',objectives:['Recognize urgent ocular warning signs','Support approved examination and diagnostics','Protect the eye and prevent delays'],foundation:'Avoid pressure or manipulation when globe integrity is uncertain; follow clinician direction and approved protocols.',workflow:['Identify pain, vision concern, trauma, discharge, redness, or globe change','Protect from self-trauma','Prepare ordered ocular diagnostics and supplies','Document findings consistently','Escalate worsening pain, vision, or structural concern'],decision:'A patient’s eye appears suddenly enlarged and painful.',answer:'Prevent self-trauma and obtain immediate clinician assessment',job:'Urgent ocular assessment support guide'},
  {title:'Cardiology',why:'Cardiac patients require careful low-stress assessment, trend recognition, medication accuracy, and discharge education.',objectives:['Recognize common perfusion and breathing concerns','Collect reliable serial measurements','Support medication and follow-up accuracy'],foundation:'Respiratory effort, perfusion, comfort, and trends often matter more than a single isolated number.',workflow:['Use low-stress observation before handling','Collect ordered cardiovascular and respiratory measures','Compare trends with treatments and diagnostics','Escalate meaningful deterioration','Reconcile medications and home monitoring at discharge'],decision:'A cardiac patient’s resting breathing pattern worsens.',answer:'Minimize stress, reassess, and escalate promptly rather than waiting for the next routine check',job:'Cardiac monitoring trend guide'},
  {title:'Ultrasound',why:'Reliable preparation, patient positioning, image labeling, and documentation improve diagnostic usefulness.',objectives:['Prepare patient and equipment correctly','Support efficient image acquisition','Maintain accurate labels and records'],foundation:'Image interpretation is limited to qualified clinicians; support team members focus on preparation, acquisition assistance, and documentation.',workflow:['Confirm indication, patient, and ordered study','Prepare equipment, patient, and positioning','Support safe restraint or sedation workflow','Label and save images accurately','Document completion and follow-up owner'],decision:'The saved images have incomplete patient labels.',answer:'Stop and correct labeling before the study is finalized or shared',job:'Ultrasound preparation and image-management checklist'},
  {title:'Advanced Anesthesia',why:'Higher-risk patients require individualized preparation, vigilant monitoring, rapid communication, and deliberate recovery.',objectives:['Connect patient risk to monitoring plans','Recognize concerning trends early','Support structured anesthesia handoffs'],foundation:'Exact drugs, doses, thresholds, and interventions must follow approved protocols and DVM direction.',workflow:['Review patient risk, procedure, and contingency plan','Verify equipment, monitoring, and emergency readiness','Record continuous trends and interventions','Communicate changes using closed loop','Transfer to recovery with risks and next reassessment'],decision:'Two monitored values and patient appearance worsen together.',answer:'Verify equipment while immediately alerting the anesthetist and preparing directed support',job:'Advanced anesthesia readiness and handoff guide'},
  {title:'ICU',why:'ICU safety depends on integrated plans, high-frequency reassessment, accurate documentation, and rapid escalation.',objectives:['Prioritize competing ICU tasks','Interpret trends in context','Coordinate team communication and Member updates'],foundation:'Use the active treatment plan and timeline as shared sources of truth.',workflow:['Verify active problems, goals, and monitoring frequency','Organize time-critical and conditional tasks','Perform and document serial reassessments','Escalate deviations and update the plan','Complete structured handoff and open-loop review'],decision:'Two ICU patients need attention at the same time.',answer:'Triage immediate risk, call for help, and redistribute tasks with explicit ownership',job:'ICU prioritization and open-loop checklist'},
  {title:'Mechanical Ventilation',why:'When applicable, ventilated patients require specialized equipment competency, continuous monitoring, and immediate escalation.',objectives:['Describe ventilation workflow roles','Recognize equipment and patient alarms','Support documentation and emergency response'],foundation:'This module is conditional and must only be deployed if Hannah provides mechanical ventilation with approved equipment, protocols, training, and clinical oversight.',workflow:['Verify indication, team roles, equipment, and backup plan','Complete equipment and circuit checks','Monitor patient, ventilator, and ordered diagnostics','Respond to alarms using approved troubleshooting sequence','Document changes and communicate continuously'],decision:'A ventilator alarm sounds and the patient changes clinically.',answer:'Call for immediate help, assess the patient first, and follow the approved alarm response sequence',job:'Mechanical ventilation readiness checklist'}],
 simulations:[['Complex oncology follow-up','Identify adverse-effect concerns and coordinate staging or supportive-care follow-up.'],['Neurologic decline','Compare serial findings and escalate deterioration.'],['High-risk anesthesia event','Verify equipment, recognize trends, and use closed-loop response.'],['Two-patient ICU prioritization','Triage risk and redistribute care without losing open loops.']],competencies:['Supports complex specialty workflows within role','Collects consistent serial assessments','Recognizes and escalates specialty red flags','Maintains advanced anesthesia monitoring records','Prioritizes ICU care and open loops','Uses specialty-specific safety controls']},
 12:{title:'Hannah Standards of Excellence',subtitle:'One connected operating model from first concern through documented follow-through.',tabs:['Overview','Standards','Workflow Map','Quality Audit','Competencies'],courses:[
  {title:'Diagnostic Workflow Hub',why:'The Hub standardizes diagnostic choices, approvals, documentation, and follow-through around presenting complaints.',objectives:['Navigate by presenting complaint','Use approved pathways and permissions','Close result and follow-up loops'],foundation:'Start with the complaint and clinical question—not an assumed diagnosis.',workflow:['Select the presenting complaint or symptom','Review approved pathway and decision points','Complete required request or approval','Place authorized orders using the correct role and PIN','Document results, interpretation owner, and follow-up'],decision:'A requested outside test is not on the approved pathway.',answer:'Pause and follow the outside diagnostic approval process before ordering',job:'Diagnostic Workflow Hub quick guide'},
  {title:'Hannahware Clinical Documentation',why:'The clinical record is the shared legal and patient-care account of what was observed, decided, done, and communicated.',objectives:['Document contemporaneously and objectively','Connect assessment, plan, and follow-up','Correct errors without obscuring history'],foundation:'Use approved templates and role permissions; avoid unsupported conclusions or copied-forward inaccuracies.',workflow:['Confirm correct Member and Pet','Record relevant history and objective observations','Document clinician assessment and active plan','Record treatments, response, communications, and authorizations','Review for completeness and route open follow-up'],decision:'A copied note contains information that is no longer accurate.',answer:'Correct the current note and preserve an accurate audit trail rather than leaving the error in place',job:'Clinical documentation quality checklist'},
  {title:'Hospitalization Board',why:'The board keeps patient status, plan, ownership, timing, and open risks visible across the team.',objectives:['Maintain accurate patient status','Use the board during huddles and handoffs','Resolve discrepancies with the treatment plan'],foundation:'The board is a coordination surface; the approved medical record and active plan remain authoritative.',workflow:['Add or verify the patient at admission','Display current status, location, clinician, and care ownership','Review due, delayed, held, and conditional care','Update changes and escalation status promptly','Reconcile at handoff and discharge'],decision:'The board and treatment plan show different monitoring frequencies.',answer:'Stop and reconcile the discrepancy with the active clinician-directed plan',job:'Hospitalization Board reconciliation guide'},
  {title:'Treatment Timeline',why:'A synchronized timeline turns treatment-plan changes into actionable tasks with clear ownership.',objectives:['Generate accurate tasks from the plan','Handle late, held, changed, and missed care','Preserve an auditable timeline'],foundation:'Never leave obsolete tasks active after a plan change.',workflow:['Verify each order, frequency, start time, and conditions','Generate timeline tasks and assign ownership','Record completion, response, delay, hold, or variance','Update tasks immediately when the plan changes','Escalate missed or unsafe care and document resolution'],decision:'A DVM reduces treatment frequency.',answer:'Update the plan and regenerate or cancel affected timeline tasks so only current care remains active',job:'Treatment Timeline status and exception guide'},
  {title:'Outside Diagnostic Approval',why:'Approval controls protect clinical appropriateness, cost oversight, and complete records.',objectives:['Identify tests requiring approval','Complete required submission before processing','Track the decision and result owner'],foundation:'Only authorized roles place orders, and required forms and approvals must be complete.',workflow:['Identify the clinical question and proposed outside test','Use the Diagnostic Workflow Hub','Submit the required approval form','Obtain documented authorization','Place the order and track result review and Member communication'],decision:'The sample is ready but approval is missing.',answer:'Do not process the outside test until the required approval workflow is complete',job:'Outside diagnostic approval checklist'},
  {title:'Medical Records Workflow',why:'A centralized request process protects privacy, tracks authorization and payment, and prevents requests from being lost.',objectives:['Initiate a request correctly','Prepare the Member for authorization','Locate request status'],foundation:'Do not place medical-record requests in Slack.',workflow:['Open the Member profile and Active Hannah Pets','Select Medical Records Request for each Pet','Confirm the Member email','Prepare the Member for the payment authorization email','Use the report and Member Communication to check status'],decision:'A Member says they already submitted a request.',answer:'Check the Medical Records Request Report, then Member Communication if it is not listed',job:'Medical records request quick guide'},
  {title:'Cycle of Service in Medical',why:'Consistent ownership from arrival through departure reduces waiting, confusion, and missed communication.',objectives:['Clarify ownership at each touchpoint','Manage flow and Member expectations','Close clinical and service loops'],foundation:'The Treatment Coordinator supports traffic and communication, but every team member owns the experience.',workflow:['Prepare for arrival and identify urgency','Complete welcome, history, and handoff','Coordinate exam-room and treatment flow','Update the Member during delays or changes','Complete discharge, follow-up, and room readiness'],decision:'The team is delayed and the Member has not received an update.',answer:'Provide an honest update, next checkpoint, and clear owner before the Member must ask',job:'Medical Cycle of Service checklist'},
  {title:'Discharge Excellence',why:'A complete discharge protects the patient after leaving and helps the Member act confidently.',objectives:['Reconcile the final plan','Use teach-back','Assign all pending follow-up'],foundation:'Departure is not complete until medication, warning-sign, follow-up, and communication loops are closed.',workflow:['Verify discharge criteria and final directions','Reconcile medications and written instructions','Review home care, warning signs, and follow-up','Use teach-back and answer questions','Document understanding and pending ownership'],decision:'A diagnostic result is still pending at discharge.',answer:'Name the result, who will review it, who will contact the Member, and the expected follow-up process',job:'Discharge Excellence audit tool'},
  {title:'Phone Triage Standards',why:'Prompt, structured phone response can reduce dangerous delays and improve hospital readiness.',objectives:['Answer and route calls promptly','Recognize emergency warning signs','Complete contextual handoffs'],foundation:'All calls should be answered within three rings; medical advice and disposition must stay within role.',workflow:['Answer promptly with the approved greeting','Identify caller, Pet, location, and main concern','Recognize urgency and involve medical team','Give approved direction without exceeding role','Document and hand off context, symptoms, and ETA'],decision:'A caller describes breathing difficulty and pale gums.',answer:'Keep the caller engaged, alert medical team, and direct immediate evaluation using the approved emergency workflow',job:'Phone triage and high-volume call guide'},
  {title:'Quality Assurance Audits',why:'Audits convert standards into measurable reliability and targeted coaching.',objectives:['Audit evidence objectively','Distinguish isolated error from system pattern','Assign corrective action and follow-up'],foundation:'Use defined criteria, representative samples, and respectful feedback; avoid changing standards after reviewing results.',workflow:['Define the standard and evidence source','Select the review period and sample','Score each criterion consistently','Analyze individual and system contributors','Assign correction, owner, due date, and re-audit'],decision:'An audit reveals repeated missing approvals across both hospitals.',answer:'Address immediate cases, analyze the shared process, coach accountable roles, and schedule a documented re-audit',job:'Quality assurance audit worksheet'}],
 simulations:[['Presenting complaint to approved diagnostic pathway','Navigate the Hub, permissions, approval, and follow-up.'],['Hospitalized patient system reconciliation','Align board, plan, timeline, notes, and handoff.'],['Medical records and Member communication','Initiate, track, and explain the centralized request.'],['Quality audit and corrective action','Score evidence, identify patterns, and assign re-audit ownership.']],competencies:['Uses Diagnostic Workflow Hub correctly','Documents complete and objective clinical records','Reconciles hospitalization board, plan, and timeline','Completes outside diagnostic approval','Initiates and tracks medical records requests','Applies Cycle of Service and phone standards','Delivers discharge excellence','Performs objective quality audits']}
};
let upperState=JSON.parse(localStorage.getItem('hlsLevels10to12')||'{}');
[10,11,12].forEach(n=>upperState[n]??={tab:'Overview',completedCourses:[],completedSimulations:[],competencies:[]});
const saveUpper=()=>localStorage.setItem('hlsLevels10to12',JSON.stringify(upperState));
function openUpperLevel(n,tab){if(tab)upperState[n].tab=tab;saveUpper();renderUpperLevel(n);switchView('level'+n)}
function renderUpperLevel(n){
 const d=upperLevels[n],s=upperState[n],host=document.querySelector('#level'+n+'Content'),tabs=document.querySelector(`.upper-tabs[data-level="${n}"]`);if(!host||!tabs)return;
 tabs.innerHTML=d.tabs.map(t=>`<button class="chip ${s.tab===t?'active':''}" data-upper-tab="${t}" data-level="${n}">${t}</button>`).join('');
 tabs.querySelectorAll('[data-upper-tab]').forEach(b=>b.onclick=()=>{s.tab=b.dataset.upperTab;saveUpper();renderUpperLevel(n)});
 const pct=Math.round(((s.completedCourses.length/d.courses.length)*70)+((s.completedSimulations.length/d.simulations.length)*20)+((s.competencies.length/d.competencies.length)*10));
 if(s.tab==='Overview')host.innerHTML=`<div class="upper-hero level-${n}-hero"><div><span class="eyebrow light">Level ${n} learning path</span><h2>${d.subtitle}</h2><p>Every course includes why it matters, measurable objectives, foundational knowledge, the Hannah workflow, an interactive decision, assessment evidence, simulation practice, competency validation, and a job aid.</p><div class="button-row"><button class="primary upper-jump" data-tab="Courses">Open curriculum</button><button class="ghost upper-jump" data-tab="Simulations">Practice simulations</button></div></div><div class="readiness-ring"><strong>${pct}%</strong><span>Level progress</span></div></div><div class="metric-grid"><article class="metric"><span>Courses</span><strong>${d.courses.length}</strong><small>Structured modules</small></article><article class="metric"><span>Simulations</span><strong>${d.simulations.length}</strong><small>Applied practice</small></article><article class="metric"><span>Competencies</span><strong>${d.competencies.length}</strong><small>Objective validation</small></article><article class="metric"><span>Job aids</span><strong>${d.courses.length}</strong><small>Point-of-work support</small></article></div><section class="panel"><span class="eyebrow">Learner framework</span><h2>One consistent course experience</h2><div class="framework-grid">${['Why it matters','Learning objectives','Foundational knowledge','Hannah workflow','Clinical demonstration','Interactive decisions','Knowledge check','Simulation','Competency validation','Job aids'].map((x,i)=>`<article><strong>${i+1}</strong><span>${x}</span></article>`).join('')}</div></section>`;
 if(s.tab==='Courses'||s.tab==='Standards')host.innerHTML=`<div class="upper-course-grid">${d.courses.map((c,i)=>`<article class="upper-course-card"><span class="eyebrow">Course ${i+1}</span><h2>${c.title}</h2><p>${c.why}</p><div class="card-footer"><span class="badge ${s.completedCourses.includes(i)?'good':'neutral'}">${s.completedCourses.includes(i)?'Complete':'Ready'}</span><button class="primary upper-course-open" data-level="${n}" data-course="${i}">${s.completedCourses.includes(i)?'Review':'Open course'}</button></div></article>`).join('')}</div>`;
 if(s.tab==='Practice Lab'||s.tab==='Case Conference'||s.tab==='Workflow Map')host.innerHTML=renderUpperLab(n);
 if(s.tab==='ICU Lab')host.innerHTML=renderUpperICU();
 if(s.tab==='Quality Audit')host.innerHTML=renderQualityAudit();
 if(s.tab==='Simulations')host.innerHTML=`<div class="upper-course-grid">${d.simulations.map((x,i)=>`<article class="upper-course-card simulation-card"><span class="eyebrow">Simulation ${i+1}</span><h2>${x[0]}</h2><p>${x[1]}</p><div class="card-footer"><span class="badge ${s.completedSimulations.includes(i)?'good':'warning'}">${s.completedSimulations.includes(i)?'Complete':'Interactive'}</span><button class="primary upper-sim-open" data-level="${n}" data-sim="${i}">Launch</button></div></article>`).join('')}</div>`;
 if(s.tab==='Competencies')host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency Passport</span><h2>Observed-performance validation</h2></div><strong>${s.competencies.length} of ${d.competencies.length} ready</strong></div>${d.competencies.map((x,i)=>`<div class="competency-check"><div><strong>${x}</strong><span>Evidence: course assessment + simulation + direct observation or record review</span></div><button class="${s.competencies.includes(i)?'secondary':'primary'} upper-comp" data-level="${n}" data-comp="${i}">${s.competencies.includes(i)?'Ready for manager review':'Request validation'}</button></div>`).join('')}</section>`;
 host.querySelectorAll('.upper-jump').forEach(b=>b.onclick=()=>{s.tab=b.dataset.tab;saveUpper();renderUpperLevel(n)});host.querySelectorAll('.upper-course-open').forEach(b=>b.onclick=()=>openUpperCourse(+b.dataset.level,+b.dataset.course));host.querySelectorAll('.upper-sim-open').forEach(b=>b.onclick=()=>openUpperSimulation(+b.dataset.level,+b.dataset.sim));host.querySelectorAll('.upper-comp').forEach(b=>b.onclick=()=>{const i=+b.dataset.comp;if(!s.competencies.includes(i))s.competencies.push(i);saveUpper();renderUpperLevel(n);toast('Competency evidence submitted for manager review')});
 bindUpperLab(n);
}
function openUpperCourse(n,i){const c=upperLevels[n].courses[i],s=upperState[n];openModal(`<span class="eyebrow">Level ${n} • Course ${i+1}</span><h1 class="modal-title">${c.title}</h1><div class="detail-card"><strong>Why it matters</strong><span>${c.why}</span></div><h3>Learning objectives</h3><ul>${c.objectives.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Foundational knowledge</h3><p>${c.foundation}</p><h3>Hannah standard workflow</h3><div class="timeline-list">${c.workflow.map((x,k)=>`<div class="timeline-row"><strong>${k+1}</strong><span>${x}</span></div>`).join('')}</div><h3>Interactive decision point</h3><p>${c.decision}</p><div class="choice-grid"><button class="case-choice upper-course-choice" data-right="true">${c.answer}</button><button class="case-choice upper-course-choice">Continue without clarifying or documenting</button></div><div class="detail-card"><strong>Knowledge check & simulation evidence</strong><span>Correct decision, rationale, documentation quality, and role-appropriate escalation.</span></div><div class="detail-card"><strong>Job aid</strong><span>${c.job}</span></div><button class="primary" id="completeUpperCourse">Complete course</button>`);document.querySelectorAll('.upper-course-choice').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Correct — safe, clear, and role appropriate':'Review the workflow and close the communication or safety loop')});document.querySelector('#completeUpperCourse').onclick=()=>{if(!s.completedCourses.includes(i))s.completedCourses.push(i);saveUpper();document.querySelector('#modal').close();renderUpperLevel(n);toast('Course completed and evidence saved')}}
function openUpperSimulation(n,i){const sim=upperLevels[n].simulations[i],s=upperState[n];openModal(`<span class="eyebrow">Level ${n} simulation ${i+1}</span><h1>${sim[0]}</h1><p>${sim[1]}</p><div class="simulation-steps"><article><strong>1. Recognize</strong><span>Identify the patient, Member, workflow, or safety concern.</span></article><article><strong>2. Decide</strong><span>Choose the approved Hannah action within role.</span></article><article><strong>3. Communicate</strong><span>Use plain language, closed-loop handoff, or teach-back.</span></article><article><strong>4. Document</strong><span>Record the decision, authorization, response, and follow-up owner.</span></article></div><h3>Decision</h3><div class="choice-grid"><button class="case-choice upper-sim-choice" data-right="true">Use the approved workflow, clarify ownership, and document the outcome</button><button class="case-choice upper-sim-choice">Rely on memory and assume another team member will follow through</button></div><textarea id="upperSimNote" rows="5" style="width:100%;margin-top:14px" placeholder="Document your communication, decision, and follow-up plan..."></textarea><button class="primary" id="completeUpperSim">Complete simulation</button>`);document.querySelectorAll('.upper-sim-choice').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Best response selected':'This choice leaves an open safety or accountability loop')});document.querySelector('#completeUpperSim').onclick=()=>{if(!s.completedSimulations.includes(i))s.completedSimulations.push(i);saveUpper();document.querySelector('#modal').close();renderUpperLevel(n);toast('Simulation evidence recorded')}}
function renderUpperLab(n){if(n===10)return `<section class="panel"><span class="eyebrow">Communication practice lab</span><h2>Turn clinical language into Member-centered education</h2><div class="role-board"><label>Clinical phrase<input id="clinicalPhrase" value="The diagnostic result is inconclusive"></label><label>Member-centered version<input id="plainPhrase" placeholder="Rewrite in clear language"></label></div><button class="primary lab-action">Check response</button><div class="feedback-box lab-feedback">Explain what the result did and did not show, what remains uncertain, and the next recommended step.</div></section>`;if(n===11)return `<section class="panel"><span class="eyebrow">Advanced case conference</span><h2>Prioritize the complex patient</h2><div class="clinical-priority-grid">${[['Respiratory effort worsening','Immediate reassessment and escalation'],['New neurologic change','Protect patient and escalate'],['Incomplete image labels','Correct before finalizing'],['Pending Member update','Assign owner and timing']].map((x,i)=>`<button class="priority-card lab-priority" data-order="${i+1}"><strong>${x[0]}</strong><span>${x[1]}</span></button>`).join('')}</div><div class="feedback-box lab-feedback">Select concerns to practice a risk-first case conference.</div></section>`;return `<section class="panel"><span class="eyebrow">Connected workflow map</span><h2>Follow a presenting complaint through closed-loop care</h2><div class="workflow-map">${['Phone triage','Presenting complaint','Diagnostic Workflow Hub','Authorization / approval','Clinical documentation','Treatment plan / timeline','Discharge / follow-up','Quality audit'].map((x,i)=>`<button class="workflow-node lab-priority"><strong>${i+1}</strong><span>${x}</span></button>`).join('<span class="workflow-arrow">→</span>')}</div><div class="feedback-box lab-feedback">Every handoff must preserve patient identity, decision, authorization, status, owner, and next action.</div></section>`}
function renderUpperICU(){return `<section class="panel"><span class="eyebrow">ICU prioritization lab</span><h2>Resolve simultaneous risk without losing ownership</h2><div class="icu-lab-grid">${[['Patient A','Breathing effort increased','Immediate'],['Patient B','Time-critical treatment due','Urgent'],['Patient C','Member update promised','Time-bound'],['Patient D','Routine bedding change','Can delegate']].map(x=>`<article><span>${x[0]}</span><strong>${x[1]}</strong><button class="secondary icu-priority">${x[2]}</button></article>`).join('')}</div><p class="safety-note"><strong>Expected approach</strong><span>Call for help, address immediate physiologic risk, redistribute time-critical tasks, and explicitly assign the communication loop.</span></p></section>`}
function renderQualityAudit(){return `<section class="panel"><span class="eyebrow">Quality assurance audit</span><h2>Outside diagnostic approval sample</h2><div class="audit-table"><div class="audit-row audit-head"><strong>Case</strong><strong>Hub used</strong><strong>Approval</strong><strong>Result owner</strong><strong>Score</strong></div>${[['Case 101','Yes','Yes','Yes','Pass'],['Case 102','Yes','No','Yes','Fail'],['Case 103','No','No','No','Fail'],['Case 104','Yes','Yes','No','Fail']].map(x=>`<div class="audit-row">${x.map((v,i)=>`<span class="${i===4?(v==='Pass'?'flag-normal':'flag-high'):''}">${v}</span>`).join('')}</div>`).join('')}</div><div class="role-board"><label>System finding<textarea>Approval and follow-up ownership are inconsistent.</textarea></label><label>Corrective action<textarea>Coach required roles, reconcile open cases, and re-audit a defined sample.</textarea></label></div><button class="primary lab-action">Save audit action plan</button></section>`}
function bindUpperLab(n){document.querySelectorAll('.lab-action').forEach(b=>b.onclick=()=>toast(n===12?'Audit action plan saved':'Practice response reviewed'));document.querySelectorAll('.lab-priority,.icu-priority').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');toast('Decision point recorded')})}
document.querySelectorAll('.upper-back').forEach(b=>b.onclick=openMedicalAcademy);document.querySelectorAll('.upper-resume').forEach(b=>b.onclick=()=>openUpperLevel(+b.dataset.level,upperLevels[+b.dataset.level].tabs[1]));document.querySelectorAll('.upper-resources').forEach(b=>b.onclick=()=>{const n=+b.dataset.level,d=upperLevels[n];openModal(`<span class="eyebrow">Level ${n} job-aid library</span><h1>${d.title}</h1>${d.courses.map(c=>`<div class="list-item"><div><strong>${c.job}</strong><span>${c.title}</span></div><button class="secondary">Preview</button></div>`).join('')}<p class="safety-note"><strong>Governance</strong><span>Production job aids must be reviewed, version-controlled, role-aware, and linked to current Hannah policies and clinical standards.</span></p>`) });
[10,11,12].forEach(renderUpperLevel);


// Foundations Academy integration
const foundationsCourseDetails={
  2:{title:"Understanding the Hannah Model",items:["Why Hannah exists","Membership, TLC, and the Pet-specific addendum","Why Hannah is not insurance","Ownership, companionship, and control","Medical decision making","Shared responsibilities","Explain, Verify, or Refer","Cooper's Hannah Journey","Final assessment and manager teach-back"]},
  3:{title:"One Hannah: Locations, Teams, and Departments",items:["Hannah locations and functions","Clinical, service, membership, operations, and support teams","Role-based referral and escalation","Closed-loop handoffs"]},
  4:{title:"Roles and the Pet Care Journey",items:["First contact","Arrival and intake","Assessment and diagnostics","Treatment or hospitalization","Discharge and follow-up"]},
  5:{title:"Your First 30 Days at Hannah",items:["Week-by-week onboarding roadmap","Required check-ins","Practice and validation milestones","Responsibility for asking questions"]},
  6:{title:"Finding Information and Getting Help",items:["Hannahware","Knowledge Base","Ask Hannah","Approved communication tools","Escalation pathways"]},
  7:{title:"Professional Expectations from Day One",items:["Attendance and dependability","Professional communication","Confidentiality","Chain of command","Accountability and conduct"]},
  8:{title:"Welcome to Hannah Capstone",items:["First-week branching simulation","Member and Pet interactions","Role boundaries","Information search","Manager validation"]}
};
const backFromFoundations=document.querySelector('#backFromFoundations');if(backFromFoundations)backFromFoundations.onclick=()=>switchView('academies');
const guide=document.querySelector('#openFoundationsGuide');if(guide)guide.onclick=()=>openModal(`<span class="eyebrow">Foundations Academy</span><h1 class="modal-title">Welcome to Hannah</h1><p>This academy establishes the culture, language, judgment, and professional expectations shared by every Hannah role.</p><div class="detail-card"><strong>Sequence</strong><span>Complete the courses in order. Course completion is followed by manager validation and competency evidence.</span></div><div class="detail-card"><strong>Current build</strong><span>Course 1 is fully interactive. Course 2 curriculum is ready for production. Courses 3–8 are represented as structured roadmap items in this Version 1.0 package.</span></div>`);
const validation=document.querySelector('#openValidationGuide');if(validation)validation.onclick=()=>openModal(`<span class="eyebrow">Manager validation</span><h1 class="modal-title">Foundations teach-back</h1><div class="list-item"><span>Explain Hannah's mission and why the model exists.</span><span class="badge neutral">Discuss</span></div><div class="list-item"><span>Use the Hannah principles in a realistic decision.</span><span class="badge neutral">Scenario</span></div><div class="list-item"><span>Explain when to answer, verify, or refer.</span><span class="badge neutral">Teach-back</span></div><div class="list-item"><span>Identify the appropriate role or department for common questions.</span><span class="badge neutral">Validate</span></div>`);
document.querySelectorAll('.foundation-preview').forEach(b=>b.onclick=()=>{const d=foundationsCourseDetails[+b.dataset.course];openModal(`<span class="eyebrow">Foundations Academy • Course ${b.dataset.course}</span><h1 class="modal-title">${d.title}</h1>${d.items.map((x,i)=>`<div class="list-item"><span>${i+1}. ${x}</span><span class="badge ${b.dataset.course==='2'?'warning':'neutral'}">${b.dataset.course==='2'?'Curriculum ready':'Planned'}</span></div>`).join('')}`)});

renderMedicalAcademy();renderLevel5();renderLevel6();renderLevel7();applyHashRoute();
})();


/* ===== Hannah Medical Academy — Level 2: Ear Examination Fundamentals (Patient Assessment) ===== */
(()=>{
const L2_SOURCES = {
  mite:{img:'https://upload.wikimedia.org/wikipedia/commons/c/c8/Otodectes_cynotis.jpg',caption:'Otodectes cynotis (ear mite), microscopic image obtained from a cat.',credit:'Wikimedia Commons — public domain / self-published work',link:'https://commons.wikimedia.org/wiki/File:Otodectes_cynotis.jpg'},
  otoscopy:{img:'https://upload.wikimedia.org/wikipedia/commons/1/16/Otoscopy_dog.jpg',caption:'Otoscopic examination of a dog\u2019s ear canal.',credit:'Wikimedia Commons (CC BY-SA 3.0)',link:'https://commons.wikimedia.org/wiki/File:Otoscopy_dog.jpg'},
  otitis:{img:'https://upload.wikimedia.org/wikipedia/commons/c/c9/Otitis_externa.jpg',caption:'Otitis externa — inflammation of the external ear canal.',credit:'Klaus D. Peter, Wiehl, Germany — Wikimedia Commons (CC BY 3.0 DE)',link:'https://commons.wikimedia.org/wiki/File:Otitis_externa.jpg'},
  catears:{img:'https://upload.wikimedia.org/wikipedia/commons/0/04/EarsOfCat.jpg',caption:'Normal feline pinnae for baseline comparison.',credit:'Wikimedia Commons (CC BY 4.0)',link:'https://commons.wikimedia.org/wiki/File:EarsOfCat.jpg'}
};
function sourceFigureL2(key){
  const s=L2_SOURCES[key];
  return `<figure class="l2-source-figure"><img src="${s.img}" alt="${s.caption}" loading="lazy"><figcaption><strong>${s.caption}</strong></figcaption></figure>`;
}
function l2LegendBadge(x,y,n){
  return `<circle cx="${x}" cy="${y}" r="10" fill="#063f63"/><text x="${x}" y="${y+4}" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">${n}</text>`;
}
function l2LegendRow(x,y,n,label){
  return `${l2LegendBadge(x,y,n)}<text x="${x+18}" y="${y+4}" font-size="13" font-weight="600" fill="#0b2338">${label}</text>`;
}
function canineEarSVGL2(){
  return `<svg viewBox="0 0 700 260" role="img" aria-label="Diagram of canine ear cross-section showing pinna, L-shaped ear canal, tympanic membrane, middle ear, and inner ear">
  <rect x="0" y="0" width="700" height="260" fill="none"/>
  <path d="M40 60 C10 90 10 150 45 175 C65 190 90 175 95 150 L100 95 C100 70 70 45 40 60 Z" fill="#f3a43b" stroke="#063f63" stroke-width="3"/>
  <path d="M100 100 C150 105 170 120 172 150 C174 175 190 178 210 178" fill="none" stroke="#129bd2" stroke-width="16" stroke-linecap="round"/>
  <line x1="210" y1="178" x2="238" y2="178" stroke="#0b6696" stroke-width="16" stroke-linecap="round"/>
  <rect x="236" y="163" width="6" height="30" fill="#063f63"/>
  <circle cx="270" cy="178" r="22" fill="#8557b5" opacity=".85"/>
  <circle cx="270" cy="178" r="8" fill="#fff"/>
  <path d="M292 178 C320 178 320 150 350 150 C375 150 375 178 400 178" fill="none" stroke="#13a283" stroke-width="14" stroke-linecap="round"/>
  <circle cx="400" cy="178" r="16" fill="#13a283"/>
  ${l2LegendBadge(52,48,1)}
  ${l2LegendBadge(140,92,2)}
  ${l2LegendBadge(215,205,3)}
  ${l2LegendBadge(239,138,4)}
  ${l2LegendBadge(270,215,5)}
  ${l2LegendBadge(400,215,6)}
  <line x1="430" y1="15" x2="430" y2="245" stroke="#d8e2ea" stroke-width="2"/>
  ${l2LegendRow(452,42,1,'Pinna')}
  ${l2LegendRow(452,76,2,'Vertical canal')}
  ${l2LegendRow(452,110,3,'Horizontal canal')}
  ${l2LegendRow(452,144,4,'Tympanic membrane')}
  ${l2LegendRow(452,178,5,'Middle ear (ossicles, bulla)')}
  ${l2LegendRow(452,212,6,'Inner ear (cochlea, vestibular)')}
  </svg>`;
}
function felineEarSVGL2(){
  return `<svg viewBox="0 0 700 260" role="img" aria-label="Diagram of feline ear cross-section showing pinna, ear canal, tympanic membrane, middle ear, and inner ear">
  <path d="M35 40 L100 100 C102 130 90 165 55 178 C25 188 8 160 12 130 C16 95 20 60 35 40 Z" fill="#f3a43b" stroke="#063f63" stroke-width="3"/>
  <path d="M100 105 C145 112 165 130 168 155 C170 172 185 178 205 178" fill="none" stroke="#129bd2" stroke-width="15" stroke-linecap="round"/>
  <line x1="205" y1="178" x2="235" y2="178" stroke="#0b6696" stroke-width="15" stroke-linecap="round"/>
  <rect x="233" y="164" width="6" height="28" fill="#063f63"/>
  <circle cx="266" cy="178" r="20" fill="#8557b5" opacity=".85"/>
  <circle cx="266" cy="178" r="7" fill="#fff"/>
  <path d="M286 178 C312 178 312 152 340 152 C365 152 365 178 392 178" fill="none" stroke="#13a283" stroke-width="13" stroke-linecap="round"/>
  <circle cx="392" cy="178" r="15" fill="#13a283"/>
  ${l2LegendBadge(40,42,1)}
  ${l2LegendBadge(130,95,2)}
  ${l2LegendBadge(220,200,3)}
  ${l2LegendBadge(266,148,4)}
  ${l2LegendBadge(392,205,5)}
  <line x1="430" y1="15" x2="430" y2="245" stroke="#d8e2ea" stroke-width="2"/>
  ${l2LegendRow(452,50,1,'Pinna')}
  ${l2LegendRow(452,92,2,'Ear canal')}
  ${l2LegendRow(452,134,3,'Tympanic membrane')}
  ${l2LegendRow(452,176,4,'Middle ear')}
  ${l2LegendRow(452,218,5,'Inner ear')}
  </svg>`;
}

const l2Modules=[
 {id:1,title:'Ear Anatomy',minutes:12,icon:'\u{1F9E9}',
  content:`<p>The external ear includes the <strong>pinna</strong>, the vertical and horizontal portions of the external ear canal, and the <strong>tympanic membrane</strong>; the tympanic membrane separates the external and middle ear.</p>
   <p>The middle ear includes the tympanic bulla, auditory tube opening, and ossicles, while the inner ear includes cochlear and vestibular structures relevant to hearing and balance.</p>
   <p>Dogs have an <strong>L-shaped ear canal</strong>, which affects drainage and makes technique important during otoscopic examination.</p>
   <div class="l2-module-grid" style="margin-top:16px">
     <figure class="l2-anatomy-figure">${canineEarSVGL2()}<figcaption><strong>Original instructional diagram — canine ear cross-section.</strong> Not a photograph; illustrates pinna, L-shaped vertical/horizontal canal, tympanic membrane, middle ear, and inner ear.</figcaption></figure>
     <figure class="l2-anatomy-figure">${felineEarSVGL2()}<figcaption><strong>Original instructional diagram — feline ear cross-section.</strong> Illustrates pinna, ear canal, tympanic membrane, middle ear, and inner ear.</figcaption></figure>
   </div>`,
  quiz:[
   {q:'Which structure separates the external ear canal from the middle ear?',opts:['Pinna','Tympanic membrane','Cochlea','Auditory tube'],correct:1,exp:'The tympanic membrane separates the external and middle ear.'},
   {q:'True or False: The canine ear canal is straight, so fluid drains easily from the deepest part of the canal.',opts:['True','False'],correct:1,exp:'False. Dogs have an L-shaped canal, which affects drainage and examination technique.'},
   {q:'Which structure is part of the inner ear?',opts:['Pinna','Horizontal canal','Cochlea','Ceruminous gland'],correct:2,exp:'The inner ear includes cochlear and vestibular structures.'},
   {q:'Which phrase is most accurate?',opts:['The pinna is the eardrum.','The pinna helps collect sound toward the ear canal.','The middle ear is the same as the vertical canal.','The tympanic membrane is outside the pinna.'],correct:1,exp:'The pinna collects and transmits sound waves toward the tympanic membrane.'}
  ]},
 {id:2,title:'Normal Otoscopic Technique & Handling',minutes:15,icon:'\u{1FA7A}',
  content:`<p>A safe exam begins with observation and pinna/preauricular skin assessment, followed by otoscopic examination and tympanic membrane assessment where tolerated.</p>
   <p>Check the otoscope head, handle, speculum, and light before use, and choose a clean, dry speculum appropriate for the patient.</p>
   <p>Examine the <strong>least affected ear first</strong>, handle the pinna gently since ear disease may be painful, and remember that painful or resistant patients may require sedation or veterinarian reassessment rather than forced examination.</p>
   ${sourceFigureL2('otoscopy')}`,
  quiz:[
   {q:'Before placing a cone in the ear, what should staff do first?',opts:['Clean the ear deeply','Check equipment, choose a clean appropriate cone, and observe/palpate as directed','Add medication','Skip the less affected ear'],correct:1,exp:'Assembly, clean cone selection, light check, and careful handling come first.'},
   {q:'True or False: It is acceptable to force the otoscope cone past resistance if visualization is poor.',opts:['True','False'],correct:1,exp:'False. Painful or resistant ears may require veterinarian reassessment or sedation rather than forced examination.'},
   {q:'Which ear should usually be examined first when one ear appears less affected?',opts:['The most painful ear','The less affected ear','The right ear always','The ear the Member points to first'],correct:1,exp:'Begin with the less affected or less irritated ear when possible.'},
   {q:'Which behavior is a stop-and-escalate sign?',opts:['Patient calmly standing','Severe pain response when the pinna is touched','Clean cone selected','Normal canal view'],correct:1,exp:'Pain may make otoscopy unsafe or require sedation/an alternate plan.'}
  ]},
 {id:3,title:'Recognizing Normal vs. Abnormal',minutes:15,icon:'\u{1F441}\uFE0F',
  content:`<p>Normal ear canals are generally smooth and pale pink, and normal tympanic membranes are semitransparent/concave with a recognizable pars flaccida and pars tensa.</p>
   <p>Abnormal findings that support staff should recognize and document include erythema, exudate amount/character, erosion, ulceration, edema, stenosis, glandular hyperplasia, masses, foreign material, parasites, and inability to visualize the tympanic membrane.</p>
   ${sourceFigureL2('otitis')}`,
  quiz:[
   {q:'Which finding should be documented as abnormal?',opts:['Pale pink canal with no discharge','Dark exudate with head shaking','Comfortable exam','Normal-looking pinna'],correct:1,exp:'Exudate and head shaking are consistent with abnormal ear findings that warrant veterinary evaluation.'},
   {q:'True or False: Support staff should describe what they see before assigning a diagnosis.',opts:['True','False'],correct:0,exp:'True. Otitis diagnosis depends on history, otoscopy, and cytologic evaluation, so observable documentation is appropriate at this stage.'},
   {q:'Which image label is most objective?',opts:['Bad yeast infection','Gross ear','Brown waxy debris and mild redness','Needs antibiotics'],correct:2,exp:'Objective descriptors support veterinarian assessment without overdiagnosis.'},
   {q:'Which abnormality is listed among otoscopic findings to evaluate?',opts:['Stenosis','Tail length','Tooth calculus','Paw pad color'],correct:0,exp:'Stenosis is among the ear-canal findings to evaluate during otoscopy.'}
  ]},
 {id:4,title:'Intro to Common Ear Conditions',minutes:12,icon:'\u{1FA7B}',
  content:`<p><strong>Otitis externa</strong> is inflammation of the external ear canal and may be acute/chronic, unilateral/bilateral, infectious/noninfectious, and multifactorial.</p>
   <p><strong>Allergic disease</strong> can cause erythema and pruritus of the pinnae and external ear canals and can predispose to secondary bacterial or yeast otitis externa.</p>
   <p><strong>Ear mites</strong>, especially in puppies and kittens, can cause intense itching and dark brown/granular discharge.</p>
   ${sourceFigureL2('mite')}`,
  quiz:[
   {q:'Otitis externa is best defined as:',opts:['Inflammation of the external ear canal','A specific yeast diagnosis','A medication name','A middle-ear tumor only'],correct:0,exp:'Otitis externa is inflammation of the external ear canal.'},
   {q:'True or False: Allergic disease can predispose dogs and cats to secondary bacterial or yeast otitis externa.',opts:['True','False'],correct:0,exp:'True. Allergic conditions can predispose to secondary bacterial or yeast otitis externa.'},
   {q:'Ear mites are especially important to consider in which foundational case?',opts:['Newly adopted kitten with dark granular debris and scratching','Adult dog with normal ears','Dog with a broken toenail','Cat with no ear signs'],correct:0,exp:'Ear mites are often identified in young cats and can present with dark granular otic discharge.'},
   {q:'Which statement is scope-appropriate for this stage?',opts:['This chronic ear case is caused only by bacteria.','The ear is red and has discharge; the veterinarian may recommend cytology.','No exam is needed.','Use leftover medication at home.'],correct:1,exp:'Diagnosis is based on history, otoscopy, and cytology rather than assumptions.'}
  ]},
 {id:5,title:'Ear Cytology Preview',minutes:15,icon:'\u{1F52C}',
  content:`<p>Ear cytology is a rapid, inexpensive in-house procedure used to identify microbial or parasitic contributors in pruritic or abnormal ears.</p>
   <p><em>Malassezia</em> yeast is commonly described as peanut-, snowman-, or shoeprint-shaped; cocci are commonly associated with <em>Staphylococcus</em> or <em>Streptococcus</em>; rods commonly include organisms such as <em>Pseudomonas</em> or <em>Proteus</em>.</p>
   <p>At this stage, learners only need visual recognition and appropriate documentation/hand-off — collection, slide preparation, grading, and interpretation build on this foundation later in the Patient Assessment and Diagnostics pathway.</p>
   ${sourceFigureL2('mite')}`,
  quiz:[
   {q:'Which cytology finding has a peanut, snowman, or shoeprint appearance?',opts:['Malassezia yeast','Tympanic membrane','Foreign body','Pinna'],correct:0,exp:'Malassezia is described as peanut-, snowman-, or shoeprint-shaped.'},
   {q:'Which organisms are often described as rods in otic cytology contexts?',opts:['Pseudomonas or Proteus','Fleas only','Heartworms','Roundworms'],correct:0,exp:'Rod bacteria in otitis contexts commonly include Pseudomonas and Proteus.'},
   {q:'True or False: At this stage, participants are expected to prescribe treatment based on cytology images.',opts:['True','False'],correct:1,exp:'False. This module is recognition and handoff; treatment decisions remain veterinarian-directed.'},
   {q:'Ear mites are typically sought under which preparation style?',opts:['Mineral oil at low magnification','Urinalysis strip only','Blood smear only','Dental radiograph'],correct:0,exp:'Ectoparasites are evaluated by placing suspicious material in mineral oil and examining at low magnification.'}
  ]},
 {id:6,title:'Member Communication Basics',minutes:12,icon:'\u{1F4AC}',
  content:`<p>Explain observable findings in plain language, avoid saying "it is definitely yeast/bacteria/allergies" before diagnostics, and reinforce that the veterinarian uses history, otoscopy, and cytology to determine next steps.</p>
   <p>Gather useful history such as duration, prior treatment, seasonality, swimming/moisture, other skin signs, other pets, and medication/cleaner use.</p>
   ${sourceFigureL2('catears')}`,
  quiz:[
   {q:'Which Member statement is best?',opts:['Your pet definitely has yeast.','The ear looks red with debris, and the doctor may recommend a sample to identify what is present.','Use vinegar tonight.','No recheck will be needed.'],correct:1,exp:'Diagnosis and treatment planning depend on history, otoscopy, and cytology.'},
   {q:'True or False: Staff should ask about seasonality, swimming, prior medications, and other skin signs when collecting an ear history.',opts:['True','False'],correct:0,exp:'True. Otitis workups benefit from detailed history and dermatologic context.'},
   {q:'A Member asks, "Why can\u2019t we just refill the old ear drops?" The best response is:',opts:['Sure, old drops always work.','The doctor needs to assess the ear because different causes can look similar, and cytology may be needed.','Ear drops are never used.','It is definitely mites.'],correct:1,exp:'Treating otitis successfully requires identifying the inciting cause and current findings.'},
   {q:'Which phrase avoids overdiagnosis?',opts:['Looks consistent with debris and redness.','Guaranteed bacterial infection.','Definitely allergies.','No diagnostics are needed.'],correct:0,exp:'Observable language supports accurate handoff.'}
  ]}
];

const l2Cases=[
 {id:0,title:'Bella — Wellness Ear Check',patient:'Bella',species:'Feline',signalment:'3-year-old neutered male domestic shorthair cat, indoor only',history:'Presented for wellness exam; Member reports no scratching, head shaking, odor, or discharge.',
  stages:['Exam Findings','Documentation','Member Communication','Diagnostics Decision','Escalation Triggers'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the otoscopic view</h2><p>Clean pinnae, pale pink canal entrance, minimal cerumen, no erythema, no discharge, no pain response, and an otoscopic view adequate to identify a normal-looking canal and tympanic membrane.</p>${sourceFigureL2('catears')}`,
   `<span class="eyebrow">Documentation</span><h2>Which findings should be documented?</h2><div class="choice-grid" id="l2c0s1"></div>`,
   `<span class="eyebrow">Member communication</span><h2>What should the team say to the Member?</h2><div class="choice-grid" id="l2c0s2"></div>`,
   `<span class="eyebrow">Diagnostics decision</span><h2>Does this patient need cytology based on the information gathered?</h2><div class="choice-grid" id="l2c0s3"></div>`,
   `<span class="eyebrow">Escalation triggers</span><h2>What would make the team stop and get the veterinarian sooner?</h2><div class="choice-grid" id="l2c0s4"></div><button class="primary" id="completeL2Case0" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2c0s1:{opts:['"Both pinnae clean; canals appear pale pink; minimal cerumen; no discharge noted; patient tolerated exam."','"Ears look totally fine, nothing to say."','"Cat has healthy ears, no need to check again for years."'],correct:0,exp:'Objective, specific documentation supports the medical record and future comparison.'},
   l2c0s2:{opts:['"Your cat has perfect ears forever."','"The doctor did not see concerning ear findings today; if you notice head shaking, odor, discharge, or scratching, please call us."','"No further ear care is ever needed."'],correct:1,exp:'This response is accurate, non-diagnostic, and gives the Member clear next steps.'},
   l2c0s3:{opts:['Yes, cytology is required today.','Not based on the presented normal wellness findings, but the veterinarian makes final diagnostic decisions.','Cytology is never needed for cats.'],correct:1,exp:'Normal wellness findings do not indicate cytology, but the DVM always makes the final call.'},
   l2c0s4:{opts:['Pain, sudden resistance, discharge, foreign material, bleeding, severe redness, suspected mass, or inability to safely visualize.','A slightly dusty exam room.','The Member being in a hurry.'],correct:0,exp:'These are the recognized stop-and-escalate signs for staff at this level.'}
  }},
 {id:1,title:'Cooper — Mild Otitis Externa',patient:'Cooper',species:'Canine',signalment:'5-year-old spayed female Cocker spaniel mix',history:'Two weeks of intermittent head shaking and ear rubbing; Member reports "a musty smell" and occasional brown debris; dog swims weekly.',
  stages:['Exam Findings','Documentation','Handoff','Scope Check','Next Steps'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the otoscopic view</h2><p>Right ear with mild erythema and brown waxy debris; left ear mildly pink with less debris; dog tolerates gentle pinna handling but withdraws when the cone is advanced too quickly.</p>${sourceFigureL2('otitis')}`,
   `<span class="eyebrow">Documentation</span><h2>What observable findings should be documented without diagnosing?</h2><div class="choice-grid" id="l2c1s1"></div>`,
   `<span class="eyebrow">Handoff</span><h2>What is the correct next-step handoff to the veterinarian?</h2><div class="choice-grid" id="l2c1s2"></div>`,
   `<span class="eyebrow">Scope check</span><h2>Which statement is not appropriate for support staff at this level?</h2><div class="choice-grid" id="l2c1s3"></div>`,
   `<span class="eyebrow">Next steps</span><h2>Which upcoming topic will build on this case?</h2><div class="choice-grid" id="l2c1s4"></div><button class="primary" id="completeL2Case1" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2c1s1:{opts:['"Right ear: mild redness and brown waxy debris; odor reported by Member; patient mildly sensitive during otoscope attempt. Left ear: mild pinkness and less debris."','"Dog has a bad ear infection."','"Nothing unusual, just needs a bath."'],correct:0,exp:'Objective, side-specific documentation supports accurate veterinary review.'},
   l2c1s2:{opts:['"Tell the veterinarian the dog has head shaking, swimming history, odor, debris, erythema, and sensitivity; ask whether cytology is indicated before cleaning or medication."','"Just start ear drops now."','"No handoff is needed, it is minor."'],correct:0,exp:'A complete, objective handoff lets the DVM decide on cytology and next steps.'},
   l2c1s3:{opts:['"I will document what I observed for the doctor to review."','"This is definitely yeast, and the doctor will prescribe antifungal drops."','"I will ask the doctor whether cytology is indicated."'],correct:1,exp:'Diagnosing yeast before cytology overstates scope at this level.'},
   l2c1s4:{opts:['Cytology collection, preparation, organism identification, and diagnostic decision-making.','Surgical suturing technique.','Radiograph positioning for the thorax.'],correct:0,exp:'The Patient Assessment and Diagnostics pathway builds directly on this case with hands-on cytology skills.'}
  }},
 {id:2,title:'Milo — Suspected Ear Mites',patient:'Milo',species:'Feline (kitten)',signalment:'14-week-old intact male domestic medium hair kitten, recently adopted from a multi-cat environment',history:'Member reports intense scratching, head shaking, and dark crumbly material in both ears.',
  stages:['Exam Findings','Documentation','Member Communication','Household Risk','Image ID'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the otoscopic and microscope preview</h2><p>Bilateral dark granular "coffee-ground" debris, erythematous canal entrance, excoriations around the pinnae, and a microscope preview image showing an <em>Otodectes cynotis</em> adult mite in mineral oil.</p>${sourceFigureL2('mite')}`,
   `<span class="eyebrow">Documentation</span><h2>What observable findings should be documented?</h2><div class="choice-grid" id="l2c2s1"></div>`,
   `<span class="eyebrow">Member communication</span><h2>What should the team say to the Member before the veterinarian confirms diagnosis?</h2><div class="choice-grid" id="l2c2s2"></div>`,
   `<span class="eyebrow">Household risk</span><h2>Why should other pets in the home be mentioned to the veterinarian?</h2><div class="choice-grid" id="l2c2s3"></div>`,
   `<span class="eyebrow">Image ID</span><h2>Which image should learners identify in this case?</h2><div class="choice-grid" id="l2c2s4"></div><button class="primary" id="completeL2Case2" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2c2s1:{opts:['"Bilateral dark granular debris; scratching/head shaking reported; redness at canal entrance; excoriations around pinnae."','"Kitten definitely has ear mites, no need to check."','"Ears look a little dirty."'],correct:0,exp:'This documentation is observable and specific without assuming the final diagnosis.'},
   l2c2s2:{opts:['"This type of debris can be seen with parasites such as ear mites, but the veterinarian will confirm the cause and recommend the safest plan."','"Your kitten definitely has ear mites, here is medication."','"This is nothing to worry about."'],correct:0,exp:'This communicates a reasonable possibility without overdiagnosing or overpromising.'},
   l2c2s3:{opts:['Ear mite infestation follows direct contact and commonly occurs in close-contact animals, so household exposure may matter.','It is just polite small talk.','Other pets are never relevant to ear cases.'],correct:0,exp:'Contagion risk to other household pets is clinically relevant and should be shared with the DVM.'},
   l2c2s4:{opts:['Low-power mineral-oil image of an ear mite or mite eggs.','A chest radiograph.','A blood smear for anemia.'],correct:0,exp:'Ear mites are identified via low-power mineral-oil preparation.'}
  }}
];

const l2Stations=[
 {icon:'\u{1FA7A}',title:'Station 1: Normal Ear Exam',time:'18 min',desc:'Observe pinnae, describe normal findings, demonstrate gentle positioning, and identify stop points on an approved calm patient or teaching model.'},
 {icon:'\u{1F50E}',title:'Station 2: Otoscope & Model Practice',time:'18 min',desc:'Assemble the otoscope, choose cone size, verify light, and navigate a model from entrance to horizontal canal while maintaining visualization.'},
 {icon:'\u{1F5BC}\uFE0F',title:'Station 3: Image ID Gallery',time:'18 min',desc:'Sort images into normal, abnormal, stop/escalate, and insufficient-view categories using observable language.'},
 {icon:'\u{1F52C}',title:'Station 4: Cytology Preview Gallery',time:'18 min',desc:'Match microscope images to yeast, cocci, rods, inflammatory cells, and mite/egg categories, and identify what to hand off.'},
 {icon:'\u{1F5E3}\uFE0F',title:'Station 5: Member Roleplay',time:'18 min',desc:'Explain normal exam, mild abnormal findings, and suspected mites to a "Member" using non-diagnostic, empathetic language.'}
];

const l2ChecklistItems=[
 {t:'Washes/sanitizes hands and prepares clean equipment.',critical:true},
 {t:'Confirms otoscope head is secure, light works, and cone is clean/appropriate.',critical:true},
 {t:'Observes patient body language before touching ears.',critical:true},
 {t:'Handles pinna gently and avoids painful manipulation.',critical:true},
 {t:'Starts with less affected ear when applicable.',critical:false},
 {t:'Maintains visualization while advancing the cone on model.',critical:true},
 {t:'Does not force cone past resistance or pain.',critical:true},
 {t:'Describes findings objectively: color, debris, discharge, odor reported, swelling, visible lesion, patient response.',critical:true},
 {t:'Correctly identifies normal vs. abnormal image findings.',critical:true},
 {t:'Recognizes yeast/cocci/rods/mite examples at a foundational level.',critical:false},
 {t:'Uses role-appropriate language and avoids diagnosis/treatment promises.',critical:true},
 {t:'Provides a concise veterinarian handoff using history + observed findings.',critical:true}
];

const l2CertRows=[
 {req:'Prework completion',criterion:'100% complete before lab'},
 {req:'Module knowledge checks',criterion:'Average 85% across all six modules'},
 {req:'Image identification assessment',criterion:'85% correct on normal/abnormal/escalate set'},
 {req:'Cytology preview assessment',criterion:'80% correct on organism/artifact set'},
 {req:'Skills lab checklist',criterion:'100% of critical items signed off'},
 {req:'Final attestation',criterion:'Learner signs scope-of-practice statement'}
];

let l2State=JSON.parse(localStorage.getItem('hlsTrueLevel2')||JSON.stringify({tab:'overview',moduleProgress:{},moduleScores:{},caseId:null,caseStep:0,casesCompleted:[],checklist:{},attested:false,signoffRequested:false}));
function persistL2(){localStorage.setItem('hlsTrueLevel2',JSON.stringify(l2State))}

function l2CompletedModuleCount(){return Object.values(l2State.moduleProgress).filter(Boolean).length}
function l2OverallPercent(){
 const modulePct=(l2CompletedModuleCount()/l2Modules.length)*100;
 const checklistPct=(Object.values(l2State.checklist).filter(Boolean).length/l2ChecklistItems.length)*100;
 const casePct=(l2State.casesCompleted.length/l2Cases.length)*100;
 return Math.round((modulePct+checklistPct+casePct)/3);
}

const level2Lessons=[
 {id:'nose-to-tail',title:'Nose-to-Tail Examination',desc:'Systematic nose-to-tail physical exam sequence and normal-finding documentation.',status:'live'},
 {id:'history',title:'Patient History',desc:'Structured history-taking, Member interview technique, and chart documentation.',status:'planned'},
 {id:'tpr',title:'TPR',desc:'Temperature, pulse, and respiration: technique, normal ranges, and red flags.',status:'planned'},
 {id:'bcs',title:'Body Condition Scoring',desc:'9-point body condition and muscle condition scoring with Member communication.',status:'planned'},
 {id:'pain',title:'Pain Assessment',desc:'Species-specific pain scales, behavioral cues, and escalation criteria.',status:'planned'},
 {id:'hydration',title:'Hydration Assessment',desc:'Skin turgor, mucous membranes, and dehydration percentage estimation.',status:'planned'},
 {id:'neuro',title:'Neurologic Screening',desc:'Cranial nerve checks, gait, proprioception, and reflex screening basics.',status:'planned'},
 {id:'mobility',title:'Mobility Evaluation',desc:'Gait analysis, orthopedic screening, and lameness grading fundamentals.',status:'planned'},
 {id:'ophthalmic',title:'Ophthalmic Basics',desc:'External eye exam, pupillary light reflex, and common abnormality recognition.',status:'planned'},
 {id:'otic',title:'Otic Examination',desc:'Ear anatomy, safe otoscopic technique, normal vs. abnormal recognition, common condition awareness, cytology preview, and Member communication.',status:'live'},
 {id:'derm',title:'Dermatologic Examination',desc:'Skin and coat exam technique, lesion recognition, and cytology preview.',status:'planned'}
];

function openLevel2Hub(){renderLevel2Hub();switchView('level2Hub')}

function renderLevel2Hub(){
 const oticPct=l2OverallPercent();
 const ntPct=l2NtOverallPercent();
 const hubPct=Math.round((oticPct+ntPct)/level2Lessons.length);
 const ring=document.querySelector('#level2HubProgressRing'); if(ring)ring.innerHTML=`<strong>${hubPct}%</strong><span>Level complete</span>`;
 const grid=document.querySelector('#level2LessonGrid'); if(!grid)return;
 grid.innerHTML=level2Lessons.map((l,i)=>{
  const n=i+1;
  const isLive=l.status==='live';
  const pct=l.id==='otic'?oticPct:l.id==='nose-to-tail'?ntPct:0;
  const badge=isLive?(pct>=100?'good':'warning'):'neutral';
  const badgeLabel=isLive?(pct>=100?'Complete':pct>0?'In progress':'Start here'):'Coming soon';
  const cta=isLive?(pct>0?'Continue lesson':'Start lesson'):'Coming soon';
  return `<article class="level-card ${isLive?'':'locked'}" data-lesson="${l.id}"><div class="section-head"><div class="level-number">${n}</div><span class="badge ${badge}">${badgeLabel}</span></div><h2>${l.title}</h2><p>${l.desc}</p><div class="progress"><span style="width:${pct}%"></span></div><div class="card-footer"><strong>${pct}%</strong><button class="${isLive?'primary':'secondary'} l2-lesson-open" data-lesson="${l.id}" ${isLive?'':'disabled'}>${cta}</button></div></article>`;
 }).join('');
 document.querySelectorAll('.l2-lesson-open').forEach(b=>b.onclick=()=>{
  const lesson=level2Lessons.find(x=>x.id===b.dataset.lesson);
  if(lesson&&lesson.id==='nose-to-tail')window.openLevel2Nt();
  else if(lesson&&lesson.status==='live')openLevel2();
  else openModal(`<span class="eyebrow">Patient Assessment • Coming soon</span><h1 class="modal-title">${lesson.title}</h1><p>${lesson.desc}</p><p class="safety-note"><strong>In development</strong><span>This lesson is planned for Level 2 — Patient Assessment and will appear here once built and clinically reviewed.</span></p><button class="primary" onclick="document.querySelector('#modal').close()">Close</button>`);
 });
}
window.openLevel2Hub=openLevel2Hub;

function openLevel2(tab){if(tab)l2State.tab=tab;persistL2();renderLevel2();switchView('level2')}

function renderLevel2(){
 document.querySelectorAll('[data-l2tab]').forEach(b=>b.classList.toggle('active',b.dataset.l2tab===l2State.tab));
 const host=document.querySelector('#level2Content'); if(!host)return;
 const pct=l2OverallPercent();
 const ring=document.querySelector('#l2ProgressRing'); if(ring)ring.innerHTML=`<strong>${pct}%</strong><span>Complete</span>`;

 if(l2State.tab==='overview'){
  host.innerHTML=`<div class="l5-dashboard-grid">
   <section class="panel span-2">
    <span class="eyebrow">Why this matters</span>
    <h2>Ear exams are one of the most common reasons pets visit Hannah</h2>
    <p>Otitis externa is common in dogs and cats, and diagnosis is built from history, otoscopic examination, and cytologic evaluation. This course intentionally stops at recognition, documentation, safe handling, and escalation rather than independent diagnosis or treatment selection.</p>
    <ul class="l2-obj-list">
     <li>Identify pinna, ear canal, tympanic membrane, middle ear, and inner ear structures.</li>
     <li>Demonstrate a safe, gentle otoscopic exam workflow and know when to stop.</li>
     <li>Classify findings as normal, mildly abnormal, or urgent/escalate.</li>
     <li>Recognize foundational cytology organisms and ear mites at a visual level.</li>
     <li>Use plain, non-diagnostic Member communication.</li>
    </ul>
    <p class="safety-note" style="margin-top:16px"><strong>How this course connects forward</strong><span>Ear Examination Fundamentals is the flagship course inside <strong>Level 2 (Patient Assessment)</strong> — vitals, history-taking, and full physical assessment modules join this level next, then hand off into cytology collection and interpretation, treatment-plan implementation under DVM direction, and advanced dermatology case review in later levels.</span></p>
   </section>
   <section class="panel">
    <span class="eyebrow">Your progress</span>
    <h2>${pct}% complete</h2>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="list-item"><span>Modules complete</span><strong>${l2CompletedModuleCount()} of ${l2Modules.length}</strong></div>
    <div class="list-item"><span>Case studies complete</span><strong>${l2State.casesCompleted.length} of ${l2Cases.length}</strong></div>
    <div class="list-item"><span>Skills checklist</span><strong>${Object.values(l2State.checklist).filter(Boolean).length} of ${l2ChecklistItems.length}</strong></div>
    <div class="card-footer"><button class="primary l2-jump" data-tab="curriculum">Continue curriculum</button></div>
   </section>
  </div>`;
 }
 if(l2State.tab==='curriculum'){
  host.innerHTML=`<div class="l2-module-grid">${l2Modules.map(m=>{
   const done=!!l2State.moduleProgress[m.id];
   const score=l2State.moduleScores[m.id];
   return `<article class="l2-module-card"><div class="section-head"><div class="l2-module-num">${m.id}</div><span class="badge ${done?'good':'neutral'}">${done?'Complete':'Not started'}</span></div><h3>${m.title}</h3><p>${m.minutes} min \u2022 knowledge check on completion${score!=null?` \u2022 scored ${score}%`:''}</p><button class="${done?'secondary':'primary'} l2-open-module" data-module="${m.id}">${done?'Review module':'Open module'}</button></article>`;
  }).join('')}</div>`;
 }
 if(l2State.tab==='cases'){
  host.innerHTML=`<div class="l2-case-list">${l2Cases.map(c=>{
   const done=l2State.casesCompleted.includes(c.id);
   return `<article class="clinical-case"><span class="eyebrow">${c.species}</span><h2>${c.title}</h2><p>${c.history}</p><span class="badge ${done?'good':'neutral'}">${done?'Completed':'Not started'}</span><br><button class="${done?'secondary':'primary'} l2-open-case" data-case="${c.id}">${done?'Review case':'Open case'}</button></article>`;
  }).join('')}</div>`;
 }
 if(l2State.tab==='skillslab'){
  host.innerHTML=`<section class="panel">
   <span class="eyebrow">Hands-on skills lab</span><h2>Five rotating stations \u2022 90 minutes total</h2>
   <div class="l2-station-grid">${l2Stations.map(s=>`<article class="l2-station-card"><div class="l2-station-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p><span class="badge neutral">${s.time}</span></article>`).join('')}</div>
  </section>
  <section class="panel" style="margin-top:18px">
   <div class="section-head"><div><span class="eyebrow">Skills checklist / rubric</span><h2>Facilitator sign-off — ${Object.values(l2State.checklist).filter(Boolean).length}/${l2ChecklistItems.length} complete (${Math.round((Object.values(l2State.checklist).filter(Boolean).length/l2ChecklistItems.length)*100)}%)</h2></div></div>
   <div class="checklist-grid">${l2ChecklistItems.map((item,i)=>`<label class="l2-check-row ${l2State.checklist[i]?'done':''}"><input type="checkbox" data-l2-check="${i}" ${l2State.checklist[i]?'checked':''}><span>${item.t} ${item.critical?'<span class=\\"badge risk\\">Critical</span>':'<span class=\\"badge neutral\\">Non-critical</span>'}</span></label>`).join('')}</div>
   <p class="safety-note" style="margin-top:14px"><strong>Pass standard</strong><span>All critical items must be marked complete, and no safety-critical item may be missed.</span></p>
  </section>`;
 }
 if(l2State.tab==='certification'){
  const modAvg=Object.keys(l2State.moduleScores).length?Math.round(Object.values(l2State.moduleScores).reduce((a,b)=>a+b,0)/Object.values(l2State.moduleScores).length):0;
  const criticalDone=l2ChecklistItems.every((item,i)=>!item.critical||l2State.checklist[i]);
  host.innerHTML=`<section class="panel">
   <div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>Ear Examination Foundation</h2><p>Certification title: "Ear Examination Foundation: Cleared for Supervised Ear Exam Support."</p></div><button class="primary" id="requestL2Validation">Request sign-off</button></div>
   <div class="l2-cert-table">
    <div class="l2-cert-head"><span>Requirement</span><span>Status</span><span>Passing criterion</span></div>
    ${l2CertRows.map((r,i)=>{
      let status='In progress';
      if(i===1)status=modAvg>=85?'Met':`${modAvg}% avg`;
      if(i===4)status=criticalDone?'Met':'Incomplete';
      if(i===5)status=l2State.attested?'Signed':'Not signed';
      const good=status==='Met'||status==='Signed';
      return `<div class="l2-cert-row"><strong>${r.req}</strong><span class="badge ${good?'good':'warning'}">${status}</span><span>${r.criterion}</span></div>`;
    }).join('')}
   </div>
   <label class="l2-check-row ${l2State.attested?'done':''}" style="margin-top:16px"><input type="checkbox" id="l2AttestCheck" ${l2State.attested?'checked':''}><span>I attest that this course does not authorize independent diagnosis, cytology interpretation for treatment, ear cleaning decisions, or medication recommendations.</span></label>
   <p class="safety-note" style="margin-top:14px"><strong>What comes next in Patient Assessment</strong><span>Upcoming Level 2 modules add vitals, history-taking, and full physical assessment. Later levels add cytology collection and slide prep, treatment-plan implementation and medication administration technique under DVM direction, and advanced dermatology case review.</span></p>
  </section>`;
 }
 wireLevel2();
}

function wireLevel2(){
 document.querySelectorAll('.l2-jump').forEach(b=>b.onclick=()=>{l2State.tab=b.dataset.tab;persistL2();renderLevel2()});
 document.querySelectorAll('.l2-open-module').forEach(b=>b.onclick=()=>openL2Module(+b.dataset.module));
 document.querySelectorAll('.l2-open-case').forEach(b=>b.onclick=()=>openL2Case(+b.dataset.case));
 document.querySelectorAll('[data-l2-check]').forEach(cb=>cb.onchange=()=>{l2State.checklist[cb.dataset.l2Check]=cb.checked;persistL2();renderLevel2();toast(cb.checked?'Checklist item marked complete':'Checklist item unchecked')});
 document.querySelector('#l2AttestCheck')?.addEventListener('change',e=>{l2State.attested=e.target.checked;persistL2();renderLevel2();toast(e.target.checked?'Attestation signed':'Attestation removed')});
 document.querySelector('#requestL2Validation')?.addEventListener('click',()=>{
  l2State.signoffRequested=true;persistL2();
  openModal('<span class="eyebrow">Competency validation</span><h1>Request sign-off</h1><p>Select an approved validator and shift for observed sign-off of the Ear Examination Foundation competencies.</p><button class="primary" onclick="document.querySelector(\'#modal\').close()">Submit request</button>');
  toast('Sign-off requested');
 });
}

/* ---- Module modal with knowledge check ---- */
let l2ActiveModule=null, l2QuizAnswers={};
function openL2Module(id){
 l2ActiveModule=l2Modules.find(m=>m.id===id);
 l2QuizAnswers={};
 renderL2ModuleModal();
}
function renderL2ModuleModal(){
 const m=l2ActiveModule;
 const answeredCount=Object.keys(l2QuizAnswers).length;
 openModal(`<span class="eyebrow">Module ${m.id} of ${l2Modules.length} \u2022 ${m.minutes} min</span>
  <h1 class="modal-title">${m.title}</h1>
  ${m.content}
  <div style="margin-top:22px;border-top:1px solid var(--line);padding-top:18px">
   <div class="section-head"><div><span class="eyebrow">Knowledge check</span><h2>Answer all ${m.quiz.length} questions</h2></div><span class="l2-quiz-score" id="l2QuizScoreLabel">${answeredCount}/${m.quiz.length} answered</span></div>
   <div id="l2QuizContainer">${m.quiz.map((q,qi)=>`
    <div class="l2-quiz-question">
     <h4>${qi+1}. ${q.q}</h4>
     <div id="l2q-${qi}">${q.opts.map((o,oi)=>`<button class="decision-option" data-qi="${qi}" data-oi="${oi}">${o}</button>`).join('')}</div>
     <div id="l2fb-${qi}"></div>
    </div>`).join('')}
   </div>
   <div id="l2QuizResult" style="margin-top:16px"></div>
  </div>`);
 document.querySelectorAll('#l2QuizContainer .decision-option').forEach(btn=>btn.onclick=()=>l2AnswerQuestion(+btn.dataset.qi,+btn.dataset.oi));
 if(answeredCount===m.quiz.length)renderL2QuizResult();
}
function l2AnswerQuestion(qi,oi){
 const m=l2ActiveModule;
 if(l2QuizAnswers[qi])return;
 const q=m.quiz[qi];
 const isCorrect=oi===q.correct;
 l2QuizAnswers[qi]={oi,correct:isCorrect};
 const wrap=document.querySelector(`#l2q-${qi}`);
 wrap.querySelectorAll('.decision-option').forEach((btn,idx)=>{
  btn.disabled=true;
  if(idx===q.correct)btn.classList.add('correct');
  else if(idx===oi)btn.classList.add('wrong');
 });
 document.querySelector(`#l2fb-${qi}`).innerHTML=`<div class="feedback"><p><strong>${isCorrect?'Correct.':'Not quite.'}</strong> ${q.exp}</p></div>`;
 const label=document.querySelector('#l2QuizScoreLabel');
 if(label)label.textContent=`${Object.keys(l2QuizAnswers).length}/${m.quiz.length} answered`;
 if(Object.keys(l2QuizAnswers).length===m.quiz.length)renderL2QuizResult();
}
function renderL2QuizResult(){
 const m=l2ActiveModule;
 const correctCount=Object.values(l2QuizAnswers).filter(a=>a.correct).length;
 const pct=Math.round((correctCount/m.quiz.length)*100);
 const passed=pct>=75;
 if(passed){
  l2State.moduleProgress[m.id]=true;
  l2State.moduleScores[m.id]=pct;
  persistL2();
 } else {
  l2State.moduleScores[m.id]=pct;
  persistL2();
 }
 document.querySelector('#l2QuizResult').innerHTML=`<div class="feedback-box"><strong>Score: ${pct}%</strong> (${correctCount} of ${m.quiz.length} correct) \u2014 ${passed?'Module marked complete.':'Retake recommended (75% needed to mark complete).'}</div>
  <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
   ${!passed?'<button class="secondary" id="l2RetakeQuiz">Retake knowledge check</button>':''}
   <button class="primary" id="l2CloseModuleModal">Return to curriculum</button>
  </div>`;
 document.querySelector('#l2RetakeQuiz')?.addEventListener('click',()=>{l2QuizAnswers={};renderL2ModuleModal()});
 document.querySelector('#l2CloseModuleModal')?.addEventListener('click',()=>{document.querySelector('#modal').close();renderLevel2()});
 if(passed)toast(`${m.title} module complete — ${pct}%`);
}

/* ---- Case runner ---- */
function openL2Case(id){
 l2State.caseId=id;l2State.caseStep=0;persistL2();
 renderL2Case();
 switchView('level2CaseRunner');
}
function renderL2Case(){
 const c=l2Cases.find(x=>x.id===l2State.caseId); if(!c)return;
 document.querySelector('#l2CaseTitle').textContent=c.title;
 document.querySelector('#l2CaseSubtitle').textContent=`${c.species} \u2022 ${c.stages[l2State.caseStep]}`;
 document.querySelector('#l2CaseStepLabel').textContent=c.stages[l2State.caseStep];
 document.querySelector('#l2CaseProgress').style.width=`${((l2State.caseStep+1)/c.stages.length)*100}%`;
 document.querySelector('#l2CaseStageNav').innerHTML=c.stages.map((s,i)=>`<button class="${i===l2State.caseStep?'active':''}" data-l2-case-step="${i}">${i+1}. ${s}</button>`).join('');
 document.querySelector('#l2CasePatientName').textContent=c.patient;
 document.querySelector('#l2CaseSignalment').textContent=c.signalment;
 document.querySelector('#l2CaseHistory').textContent=c.history;
 document.querySelector('#l2CaseStepName').textContent=c.stages[l2State.caseStep];
 document.querySelector('#l2CaseStageContent').innerHTML=c.content[l2State.caseStep];
 document.querySelectorAll('[data-l2-case-step]').forEach(b=>b.onclick=()=>{l2State.caseStep=+b.dataset.l2CaseStep;persistL2();renderL2Case()});
 Object.keys(c.decisions).forEach(hostId=>{
  const el=document.querySelector('#'+hostId);
  if(!el)return;
  const d=c.decisions[hostId];
  el.innerHTML=d.opts.map((o,i)=>`<button class="case-choice" data-opt="${i}">${o}</button>`).join('')+'<div class="l2-case-feedback"></div>';
  el.querySelectorAll('.case-choice').forEach(btn=>btn.onclick=()=>{
   const chosen=+btn.dataset.opt;
   el.querySelectorAll('.case-choice').forEach((b2,i2)=>{b2.disabled=true;if(i2===d.correct)b2.classList.add('selected')});
   el.querySelector('.l2-case-feedback').innerHTML=`<div class="feedback"><p><strong>${chosen===d.correct?'Correct.':'Consider the veterinarian-approved answer:'}</strong> ${d.exp}</p></div>`;
   toast(chosen===d.correct?'Correct decision recorded':'Feedback recorded');
  });
 });
 document.querySelector(`#completeL2Case${c.id}`)?.addEventListener('click',()=>{
  if(!l2State.casesCompleted.includes(c.id)){l2State.casesCompleted.push(c.id);persistL2()}
  toast(`${c.title} completed`);
  renderLevel2();
  openLevel2('cases');
 });
}
document.querySelector('#openAskHannahL2')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah ear examination and otoscopy workflow?'});
document.querySelector('#openAskHannahL2Overview')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah ear examination and otoscopy workflow?'});
document.querySelector('#backToAcademiesL2')?.addEventListener('click',()=>openLevel2Hub());
document.querySelector('#backToMedicalAcademyFromL2Hub')?.addEventListener('click',()=>window.openMedicalAcademy());
document.querySelector('#exitLevel2Case')?.addEventListener('click',()=>openLevel2('cases'));
document.querySelector('#level2ResourcesBtn')?.addEventListener('click',()=>openModal('<span class="eyebrow">Level 2 resources</span><h1>Ear Examination Foundation resource library</h1><p>Approved Hannah otoscopic technique guides, escalation criteria, and Member-communication scripts will appear here after clinical review.</p><p class="safety-note"><strong>Prototype boundary</strong><span>This build uses openly licensed reference images and original diagrams; production content requires Hannah-approved clinical photography and CMO review.</span></p>'));
document.querySelectorAll('[data-l2tab]').forEach(b=>b.onclick=()=>{l2State.tab=b.dataset.l2tab;persistL2();renderLevel2()});


/* ===== Nose-to-Tail Examination lesson (Level 2 — Patient Assessment) ===== */
function ntBodySVG(species){
 const canine = species !== 'feline';
 const earsPath = canine
  ? `<path d="M60 95 C40 100 32 130 45 148 C55 160 72 152 76 135 L82 108 C84 96 72 90 60 95 Z" fill="#eb9530" stroke="#063f63" stroke-width="2.5"/>`
  : `<path d="M55 90 L75 60 L88 100 Z" fill="#eb9530" stroke="#063f63" stroke-width="2.5"/><path d="M105 90 L100 58 L122 96 Z" fill="#eb9530" stroke="#063f63" stroke-width="2.5"/>`;
 const tailPath = canine
  ? `<path d="M388 168 C420 168 445 145 448 108" fill="none" stroke="#f3a43b" stroke-width="16" stroke-linecap="round"/>`
  : `<path d="M388 165 C415 165 428 130 415 98" fill="none" stroke="#f3a43b" stroke-width="14" stroke-linecap="round"/>`;
 const muzzle = canine
  ? `<ellipse cx="48" cy="140" rx="20" ry="14" fill="#f6b866" stroke="#063f63" stroke-width="2"/>`
  : `<ellipse cx="52" cy="138" rx="16" ry="12" fill="#f6b866" stroke="#063f63" stroke-width="2"/>`;
 const tailBadgeX = canine ? 432 : 410;
 const tailBadgeY = canine ? 115 : 105;
 return `<svg viewBox="0 0 700 260" role="img" aria-label="Diagram of ${canine?'canine':'feline'} body-region map showing head and face, neck and throat, thorax, abdomen and urogenital, integument and musculoskeletal, and tail and perineal zones">
  <ellipse cx="250" cy="170" rx="140" ry="50" fill="#f3a43b" stroke="#063f63" stroke-width="3"/>
  <circle cx="90" cy="128" r="40" fill="#f3a43b" stroke="#063f63" stroke-width="3"/>
  ${muzzle}
  ${earsPath}
  <circle cx="78" cy="118" r="3" fill="#063f63"/>
  <rect x="140" y="205" width="14" height="42" rx="4" fill="#f3a43b" stroke="#063f63" stroke-width="2"/>
  <rect x="170" y="205" width="14" height="42" rx="4" fill="#f3a43b" stroke="#063f63" stroke-width="2"/>
  <rect x="320" y="205" width="14" height="42" rx="4" fill="#f3a43b" stroke="#063f63" stroke-width="2"/>
  <rect x="350" y="205" width="14" height="42" rx="4" fill="#f3a43b" stroke="#063f63" stroke-width="2"/>
  ${tailPath}
  ${l2LegendBadge(90,128,1)}
  ${l2LegendBadge(140,158,2)}
  ${l2LegendBadge(210,165,3)}
  ${l2LegendBadge(300,170,4)}
  ${l2LegendBadge(160,225,5)}
  ${l2LegendBadge(tailBadgeX,tailBadgeY,6)}
  <line x1="470" y1="15" x2="470" y2="245" stroke="#d8e2ea" stroke-width="2"/>
  ${l2LegendRow(492,42,1,'Head & face')}
  ${l2LegendRow(492,76,2,'Neck & throat')}
  ${l2LegendRow(492,110,3,'Thorax (heart & lungs)')}
  ${l2LegendRow(492,144,4,'Abdomen & urogenital')}
  ${l2LegendRow(492,178,5,'Integument & musculoskeletal')}
  ${l2LegendRow(492,212,6,'Tail & perineal area')}
  </svg>`;
}
function mmColorReferenceSVG(){
 return `<svg viewBox="0 0 700 150" role="img" aria-label="Mucous membrane color reference chart showing pink as normal, pale as a flag finding, blue as an emergency finding, and yellow as a flag finding">
  <rect x="20" y="20" width="140" height="70" rx="10" fill="#e88fa0" stroke="#063f63" stroke-width="2"/>
  <text x="90" y="110" font-size="13" font-weight="700" fill="#0b2338" text-anchor="middle">Pink</text>
  <text x="90" y="128" font-size="11" fill="#0b2338" text-anchor="middle">Normal</text>
  <rect x="195" y="20" width="140" height="70" rx="10" fill="#f0d9dd" stroke="#063f63" stroke-width="2"/>
  <text x="265" y="110" font-size="13" font-weight="700" fill="#0b2338" text-anchor="middle">Pale</text>
  <text x="265" y="128" font-size="11" fill="#0b2338" text-anchor="middle">Flag for review</text>
  <rect x="370" y="20" width="140" height="70" rx="10" fill="#5b8fd6" stroke="#063f63" stroke-width="2"/>
  <text x="440" y="110" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">Blue</text>
  <text x="440" y="128" font-size="11" fill="#0b2338" text-anchor="middle">Emergency</text>
  <rect x="545" y="20" width="140" height="70" rx="10" fill="#e8d24a" stroke="#063f63" stroke-width="2"/>
  <text x="615" y="110" font-size="13" font-weight="700" fill="#0b2338" text-anchor="middle">Yellow</text>
  <text x="615" y="128" font-size="11" fill="#0b2338" text-anchor="middle">Flag for review</text>
  </svg>`;
}

function hwCheckLabel(cfgId,prefix,label){
 const value=prefix?`${prefix}:${label}`:label;
 return `<label class="hw-mock-check"><input type="checkbox" data-hwfind="${cfgId}" value="${value}"> ${label}</label>`;
}
function hwWidgetHTML(cfg){
 const sideCols=!!cfg.sides;
 const stateOpts=['WNL','ABN','STA','CNA'];
 return `<div class="hw-mock" data-hwid="${cfg.id}">
  <div class="hw-mock-header"><span>Hannahware</span><span>Physical Exam</span></div>
  <p class="hw-mock-dialogue"><span class="hw-mock-role">PetNurse</span>to Member: "${cfg.dialogue.nurse}"<br><span class="hw-mock-role">Member</span>"${cfg.dialogue.member}"</p>
  <div class="hw-mock-row"><strong>${cfg.system}</strong>
   <div class="hw-mock-state-group">${stateOpts.map(s=>`<label><input type="radio" name="hwstate-${cfg.id}" value="${s}" data-hwstate="${cfg.id}"> ${s}</label>`).join('')}</div>
  </div>
  <div class="hw-mock-detail" id="hwdetail-${cfg.id}" hidden>
   ${sideCols
     ?`<div class="hw-mock-columns"><div><h5>Left</h5>${cfg.findingsLeft.map(f=>hwCheckLabel(cfg.id,'L',f)).join('')}</div><div><h5>Right</h5>${cfg.findingsRight.map(f=>hwCheckLabel(cfg.id,'R',f)).join('')}</div></div>`
     :(cfg.findings&&cfg.findings.length?cfg.findings.map(f=>hwCheckLabel(cfg.id,'',f)).join(''):'')}
   ${cfg.durationOptions?`<div class="hw-mock-duration"><span class="hw-mock-duration-label">Duration</span>${cfg.durationOptions.map(d=>`<label><input type="radio" name="hwdur-${cfg.id}" value="${d}" data-hwdur="${cfg.id}"> ${d}</label>`).join('')}</div>`:''}
  </div>
  <div class="hw-mock-actions"><button class="secondary" data-hwsave="${cfg.id}">Save to Hannahware</button></div>
  <div id="hwfeedback-${cfg.id}" style="padding:0 14px 14px"></div>
 </div>`;
}
function wireHwWidget(cfg){
 const root=document.querySelector(`[data-hwid="${cfg.id}"]`); if(!root)return;
 root.querySelectorAll(`[data-hwstate="${cfg.id}"]`).forEach(r=>r.onchange=()=>{
  const detail=root.querySelector(`#hwdetail-${cfg.id}`);
  if(detail)detail.hidden=r.value!=='ABN';
 });
 const saveBtn=root.querySelector(`[data-hwsave="${cfg.id}"]`);
 if(saveBtn)saveBtn.onclick=()=>{
  const state=root.querySelector(`[data-hwstate="${cfg.id}"]:checked`)?.value;
  const fb=root.querySelector(`#hwfeedback-${cfg.id}`);
  if(!state){fb.innerHTML='<div class="feedback"><p><strong>Select a status first.</strong> Every row in Hannahware needs a WNL, ABN, STA, or CNA status before it can be saved.</p></div>';return;}
  let ok=state===cfg.correctState;
  if(state==='ABN'&&ok){
   const checked=[...root.querySelectorAll(`[data-hwfind="${cfg.id}"]:checked`)].map(c=>c.value);
   const required=cfg.correctFindings||[];
   const missing=required.filter(f=>!checked.includes(f));
   const extra=checked.filter(f=>!required.includes(f));
   if(missing.length||extra.length)ok=false;
   if(ok&&cfg.durationOptions){
    const dur=root.querySelector(`[data-hwdur="${cfg.id}"]:checked`)?.value;
    if(dur!==cfg.correctDuration)ok=false;
   }
  }
  fb.innerHTML=`<div class="feedback"><p><strong>${ok?'Correct — saved to Hannahware.':'Not quite — review the dialogue and try again.'}</strong> ${cfg.explanation}</p></div>`;
  root.classList.toggle('done',ok);
  toast(ok?'Entry saved to Hannahware':'Review the entry before saving');
 };
}

const hwFluffyDemo={
 id:'m6fluffy',
 dialogue:{nurse:"I notice some discharge coming from Fluffy's left eye. How long has she had that?",member:"That started about three days ago."},
 system:'Eyes & Tearing',
 sides:true,
 findingsLeft:['Bleeding','Discharge','Excess Tears','Redness','Cloudy'],
 findingsRight:['Bleeding','Discharge','Excess Tears','Redness','Cloudy'],
 correctFindings:['L:Discharge'],
 correctState:'ABN',
 durationOptions:['1-2 Days','3-7 Days','Over A Week','Chronic'],
 correctDuration:'3-7 Days',
 explanation:"The PetNurse verbalized a finding in the left eye only, so ABN is selected for Eyes & Tearing, Discharge is checked in the Left column (not the Right, and not a different finding), and the duration matches exactly what the Member reported — 3-7 Days."
};
const hwRangerDemo={
 id:'c0ranger',
 dialogue:{nurse:"Ranger's abdomen feels soft with no pain, and his appetite has been normal — everything there looks good.",member:"Yes, he's been eating great and acting like himself."},
 system:'Gastrointestinal',
 sides:false,
 findings:[],
 correctFindings:[],
 correctState:'WNL',
 explanation:"When the PetNurse verbalizes a normal finding, the Nurse Aide still documents it — selecting WNL for Gastrointestinal in Hannahware confirms the system was checked and found normal, which matters just as much as flagging an abnormal one."
};
const hwWillowDemo={
 id:'c1willow',
 dialogue:{nurse:"I'm seeing some mild redness right along Willow's incision edges, but no discharge or swelling. Has she been licking or bothering it at all?",member:"No, she hasn't touched it, and she's been eating and playing normally."},
 system:'Integumentary',
 sides:false,
 findings:['Redness/Erythema Along Incision','Discharge/Exudate','Swelling','Incision Opening (Dehiscence)','Pain On Palpation'],
 correctFindings:['Redness/Erythema Along Incision'],
 correctState:'ABN',
 explanation:"Only what the PetNurse actually verbalized gets checked — mild redness along the incision edges — with no discharge, swelling, or dehiscence boxes checked, since those weren't observed. This objective entry is what the attending Hannah DVM reviews before the visit ends."
};
const hwGusDemo={
 id:'c2gus',
 dialogue:{nurse:"I found a small lump on Gus's left flank — it feels firm and moves easily under the skin, and he's not showing any pain there. Have you noticed it before?",member:"Actually, yes — I first felt it about two weeks ago but wasn't sure it was anything."},
 system:'Integumentary',
 sides:false,
 findings:['New Mass/Growth','Redness/Erythema','Discharge/Exudate','Hair Loss (Alopecia)','Pain On Palpation'],
 correctFindings:['New Mass/Growth'],
 correctState:'ABN',
 durationOptions:['1-2 Days','3-7 Days','Over A Week','Chronic'],
 correctDuration:'Over A Week',
 explanation:"Only New Mass/Growth is checked since that's the single finding the PetNurse described, and the duration is set to Over A Week to reflect the Member-reported two-week timeline — the record should match the conversation exactly, not round up to Chronic or guess at a shorter window."
};
const l2NtCaseHwWidgets={'0-2':hwRangerDemo,'1-2':hwWillowDemo,'2-2':hwGusDemo};

const l2NtModules=[
 {id:1,title:'Preparation, Initial Observation & Vital Signs (TPR)',minutes:15,icon:'🩺',
  content:`<p><strong>Gather supplies</strong> before starting: thermometer, stethoscope, a watch or timer for respiratory/pulse rate, and an otoscope/ophthalmoscope if available. Approach the patient calmly and speak in a reassuring tone, moving slowly and confidently to minimize stress.</p>
   <p><strong>Initial observation</strong> happens before any hands-on contact: watch the patient's overall behavior, posture, and gait as they move in the exam room. Note any lameness, ataxia (a lack of coordination resulting in an abnormal gait — not a disease itself, but a clinical sign), or reluctance to move, and check for respiratory distress such as open-mouth breathing or excessive panting.</p>
   <p class="safety-note"><strong>Critter Clue</strong><span>Begin documentation (paper or electronic) of any observations before handling the patient.</span></p>
   <p><strong>Two roles, one record:</strong> throughout the exam, the PetNurse examines the patient and speaks findings aloud to the Member in plain language, while the Nurse Aide enters those same findings into the Physical Exam section of Hannahware in real time on the touch-screen monitor. Module 6 covers this PetNurse-and-Nurse-Aide documentation workflow in detail, including a hands-on Hannahware entry exercise.</p>
   <p><strong>Vital signs (TPR) and weight:</strong></p>
   <ul class="l2-obj-list">
    <li>Temperature — take a rectal temperature unless another method is directed by the patient's condition.</li>
    <li>Pulse/heart rate — palpate the femoral artery (usually on the inside of the hind leg) or use a stethoscope; count beats for 15 seconds and multiply by four for beats per minute.</li>
    <li>Respiratory rate — observe or auscultate breathing for 15 seconds and multiply by four for breaths per minute; watch chest movements for rapid, shallow, or labored breathing.</li>
    <li>Weight — confirm the recorded weight is accurate; reweigh and record if it wasn't captured at check-in or looks off.</li>
    <li>Body Condition Score (BCS) — evaluate muscle mass and fat coverage and record the BCS accurately in Hannahware.</li>
   </ul>
   <figure class="l2-anatomy-figure">${ntBodySVG('canine')}<figcaption><strong>Original instructional diagram — canine body-region map.</strong> Illustrates the six regions used throughout the nose-to-tail sequence.</figcaption></figure>`,
  quiz:[
   {q:'According to the procedure, what should happen before handling the patient?',opts:['Administer any prescribed medication','Begin documentation of observations','Take the temperature first','Express the anal glands'],correct:1,exp:'Critter Clue: begin documentation of any observations before handling the patient.'},
   {q:'True or False: Pulse and respiratory rate should each be counted for a full 60 seconds.',opts:['True','False'],correct:1,exp:'False. Count beats or breaths for 15 seconds and multiply by four to get the per-minute rate.'},
   {q:'Where is the femoral artery typically palpated to check pulse?',opts:['On the inside of the hind leg','On top of the head','Along the tail','Behind the ear'],correct:0,exp:'The femoral artery is usually palpated on the inside of the hind leg.'},
   {q:'What should be done if a patient\'s recorded weight looks inaccurate or wasn\'t captured at check-in?',opts:['Ignore it and proceed','Reweigh the patient and record the accurate weight','Estimate the weight visually','Skip the BCS'],correct:1,exp:'Weigh the patient and record the accurate weight so that BCS and dosing decisions are based on correct information.'}
  ]},
 {id:2,title:'Head and Face Examination',minutes:15,icon:'👁️',
  content:`<p><strong>Nose</strong> — check for discharge, crusting, or asymmetry, and note color and moistness. A healthy nose can be moist or slightly dry; watch for excessive dryness or cracking.</p>
   <p><strong>Eyes</strong> — look for redness, discharge, squinting, cloudiness, or other abnormalities of the sclera (whites) or cornea. Assess the eyelids and conjunctiva, and note any signs of pain or swelling. If directed by a Hannah DVM, use an ophthalmoscope for a more detailed look.</p>
   <p><strong>Ears</strong> — inspect the external pinna for redness, hair loss, lesions, or parasites. If trained and directed, use an otoscope to examine the ear canal for wax, discharge, or odor. Detailed otoscopic technique, normal-vs-abnormal recognition, and cytology preview are covered in depth in the separate <strong>Otic Examination</strong> course.</p>
   <p><strong>Oral cavity and teeth</strong> — gently lift the lips to check the gums (mucous membrane color and gum texture), and perform a capillary refill time (CRT) test by pressing on the gum and timing how long it takes for color to return. Normal CRT is under 2 seconds. Examine teeth for tartar buildup, fractures, or worn spots, and check the tongue and roof of the mouth for ulcers or masses if possible.</p>
   <figure class="l2-anatomy-figure">${mmColorReferenceSVG()}<figcaption><strong>Original instructional diagram — mucous membrane color reference.</strong> Supports the gum-color check performed alongside the CRT test.</figcaption></figure>`,
  quiz:[
   {q:'What is the normal capillary refill time (CRT)?',opts:['Under 2 seconds','5 to 10 seconds','15 to 20 seconds','It should not return at all'],correct:0,exp:'Normal capillary refill time is under 2 seconds.'},
   {q:'True or False: A moist nose is always an abnormal finding.',opts:['True','False'],correct:1,exp:'False. A healthy nose can be moist or slightly dry — the concern is excessive dryness or cracking.'},
   {q:'Where is detailed ear canal examination technique (otoscopy) taught in this program?',opts:['In the separate Otic Examination course','Nowhere — it is not covered','In the Musculoskeletal module','In the Documentation module'],correct:0,exp:'Detailed otoscopic technique and normal-vs-abnormal ear findings are covered in the dedicated Otic Examination course.'},
   {q:'Which oral finding should be specifically checked for on the tongue and roof of the mouth?',opts:['Tartar buildup','Ulcers or masses','Nail length','Coat brittleness'],correct:1,exp:'The tongue and roof of the mouth should be checked for ulcers or masses if possible.'}
  ]},
 {id:3,title:'Neck, Throat, Integument & Coat',minutes:12,icon:'🐾',
  content:`<p><strong>Lymph nodes</strong> — palpate the submandibular (under the jaw) lymph nodes and note any enlargement or asymmetry.</p>
   <p><strong>Thyroid region</strong> — gently feel the trachea and surrounding tissues for any masses or sensitivity.</p>
   <p><strong>Jugular furrow</strong> — observe for distension of the veins or any lumps along the neck.</p>
   <p><strong>Skin condition</strong> — part the hair in several locations to check for external parasites (fleas, ticks), redness, lesions, or dryness, and check for signs of alopecia (hair loss), matting, or abnormal lumps/bumps.</p>
   <p><strong>Coat quality</strong> — note if the coat is dull, greasy, or brittle. A healthy, regularly groomed coat should appear shiny and well-maintained.</p>`,
  quiz:[
   {q:'Which lymph nodes are palpated during the neck and throat portion of the exam?',opts:['Submandibular (under the jaw)','Popliteal (behind the knee)','Axillary only','Inguinal only'],correct:0,exp:'The submandibular lymph nodes, under the jaw, are palpated and checked for enlargement or asymmetry.'},
   {q:'True or False: The jugular furrow should be observed for vein distension or lumps.',opts:['True','False'],correct:0,exp:'True. Observing the jugular furrow for distension or lumps is part of the neck and throat exam.'},
   {q:'What technique helps identify external parasites and skin lesions during the integument exam?',opts:['Parting the hair in several locations','Only looking at the tail','Checking the teeth','Auscultating the chest'],correct:0,exp:'Parting the hair in several locations helps reveal parasites, redness, lesions, or dryness.'},
   {q:'Which coat description is a potential concern rather than a normal finding?',opts:['Shiny and well-maintained','Dull, greasy, or brittle','Regularly groomed','Smooth to the touch'],correct:1,exp:'A dull, greasy, or brittle coat is noted as a potential concern; a healthy coat should appear shiny and well-maintained.'}
  ]},
 {id:4,title:'Thoracic and Abdominal Examination',minutes:18,icon:'🫁',
  content:`<p><strong>Heart auscultation</strong> — place the stethoscope on both sides of the chest, generally starting behind the elbow on the left side and then the right, and listen for rate, rhythm, and any murmurs or arrhythmias.</p>
   <p><strong>Respiratory auscultation</strong> — while listening with a stethoscope, note lung sounds in multiple locations (cranial, middle, and caudal lung fields) and check for crackles, wheezes, or decreased breath sounds.</p>
   <p><strong>Cardiac pulse synchronization</strong> — compare the femoral pulse while listening to the heart; pulse deficits (missing pulses) can be noted if any arrhythmias are present.</p>
   <p><strong>Abdominal palpation</strong> — gently palpate each quadrant of the abdomen to identify any masses, fluid, or discomfort, and observe the patient's reaction for signs of pain or tension.</p>
   <p><strong>Specific organ palpation</strong> (if trained and supervised) — attempt to palpate the liver edge (cranially), the spleen (left side), the kidneys (dorsally), and the bladder (caudally).</p>
   <p><strong>Abdominal auscultation</strong> — often less emphasized in small pets, but can be done to listen for gut sounds if GI issues are suspected.</p>`,
  quiz:[
   {q:'Where does heart auscultation generally begin?',opts:['Behind the elbow on the left side','At the base of the tail','Over the trachea','On the paw pad'],correct:0,exp:'Heart auscultation generally starts with the stethoscope placed behind the elbow on the left side, then the right.'},
   {q:'Which lung fields should be checked during respiratory auscultation?',opts:['Cranial, middle, and caudal lung fields','Only the caudal field','Only the left side','Only the trachea'],correct:0,exp:'Respiratory auscultation checks lung sounds in the cranial, middle, and caudal lung fields.'},
   {q:'What is a pulse deficit?',opts:['A missing pulse relative to the heartbeats heard, often noted with arrhythmias','A normal finding in every healthy patient','A measurement of respiratory rate','A type of abdominal mass'],correct:0,exp:'A pulse deficit is a missing pulse compared to the heartbeats heard on auscultation, and can be noted when arrhythmias are present.'},
   {q:'True or False: Specific organ palpation of the liver, spleen, kidneys, and bladder should only be attempted if trained and supervised.',opts:['True','False'],correct:0,exp:'True. The procedure specifies that specific organ palpation should only be attempted if trained and supervised.'}
  ]},
 {id:5,title:'Urogenital, Musculoskeletal & Neurologic Screening',minutes:15,icon:'🦴',
  content:`<p><strong>External genitalia</strong> — evaluate for discharge, swelling, or redness. In males, observe the prepuce and check the male genital organ, if extruded, for abnormalities. In females, check the vulva for discharge or inflammation.</p>
   <p><strong>Mammary glands</strong> — palpate along the mammary chain for lumps, swelling, or sensitivity.</p>
   <p><strong>Limbs and joints</strong> — check each limb systematically, palpate joints for swelling, warmth, or signs of pain, and passively flex and extend major joints (shoulder, elbow, carpus, hip, stifle, hock) if allowed by the patient.</p>
   <p><strong>Feet and nails</strong> — inspect paw pads for cuts, foreign bodies, or redness, and check nail length and condition.</p>
   <p><strong>Gait assessment</strong> — if not already done during initial observation, walk the patient on a leash where applicable to observe any lameness or abnormal gait patterns.</p>
   <p><strong>Neurological quick check (basic)</strong> — mentation: note if the patient is bright, alert, and responsive, or dull, depressed, or anxious. Cranial nerves: check for head tilt, facial symmetry, normal eye movements, and the ability to blink. Proprioception (if relevant and safe): gently flip a paw and see if the patient corrects it quickly.</p>`,
  quiz:[
   {q:'Which joints are commonly checked for passive flexion and extension?',opts:['Shoulder, elbow, carpus, hip, stifle, hock','Only the jaw','Only the tail vertebrae','Only the ears'],correct:0,exp:'The procedure lists shoulder, elbow, carpus, hip, stifle, and hock as the major joints checked, if allowed by the patient.'},
   {q:'True or False: Proprioception can be checked by gently flipping a paw and observing whether the patient corrects it quickly.',opts:['True','False'],correct:0,exp:'True. This is the basic proprioception check described in the procedure.'},
   {q:'Which findings should be documented during the urogenital exam?',opts:['Discharge, swelling, or redness of the external genitalia; lumps/swelling/sensitivity along the mammary chain','Only nail length','Only coat quality','Only tail position'],correct:0,exp:'The urogenital exam covers external genitalia findings and mammary gland palpation for lumps, swelling, or sensitivity.'},
   {q:'What does the basic mentation check assess?',opts:['Whether the patient is bright, alert, and responsive versus dull, depressed, or anxious','Nail length','Coat texture','Respiratory rate'],correct:0,exp:'Mentation describes the patient\'s overall alertness and responsiveness.'}
  ]},
 {id:6,title:'Tail, Perineal Area, Documentation & Communication',minutes:12,icon:'📋',
  content:`<p><strong>Tail</strong> — gently run a hand along the tail, feeling for lumps, pain, or irregularities in vertebral alignment.</p>
   <p><strong>Anus and perineal region</strong> — check for swelling, masses, or anal sac issues; anal glands should only be expressed if indicated and under supervision.</p>
   <p><strong>Documentation and follow-up</strong> — record all normal and abnormal findings thoroughly in the Physical Exam and New Findings sections of the patient's medical record in Hannahware. Enter any medications given, newly prescribed, or refilled in the medication tab. Immediately communicate any significant abnormalities to the attending Hannah DVM. Disinfect exam surfaces and tools per hospital standards, and provide the Hannah DVM or Member with any information needed as appropriate to your role. Review and print the Report Card found in the Actions tab dropdown.</p>
   <p class="safety-note"><strong>Critter Clue</strong><span>Always prioritize safety — use proper restraint techniques and ask for help if the patient shows signs of distress or aggression. Practice gentle handling, maintain clear communication with the DVM and Traffic Controller, and keep the patient's comfort in mind: offer breaks, ensure they aren't standing on slippery surfaces, and watch for stress signals.</span></p>
   <p><strong>How the record actually gets built: PetNurse and Nurse Aide</strong></p>
   <p>At Hannah, documentation happens live, in the room, as a two-person job. The <strong>PetNurse</strong> performs the exam and narrates each body system out loud to the Member in plain, non-diagnostic language — what she's seeing, and any follow-up question the finding raises. At the same time, the <strong>Nurse Aide</strong> works the touch-screen monitor and enters those same findings into the Physical Exam section of Hannahware as they're spoken, using the WNL / ABN / STA / CNA status for each body system (Within Normal Limit, Abnormal, Stable, Can Not Assess) and the finding-specific checkboxes, side (Left/Right), and duration or frequency options that appear underneath.</p>
   <p>For example, while examining the eyes the PetNurse might say to the Member: <em>"I notice some discharge coming from Fluffy's left eye. How long has she had that?"</em> The Member answers that it started about three days ago. The Nurse Aide records this immediately: ABN for Eyes &amp; Tearing, Discharge checked in the Left column only, and Duration set to 3-7 Days — nothing more, nothing less than what was actually said. Try it yourself below.</p>
   ${hwWidgetHTML(hwFluffyDemo)}
   <p class="safety-note"><strong>Critter Clue</strong><span>Only check the boxes that match what was actually observed and reported — an accurate, spoken-word-for-spoken-word record protects the patient and the Member's trust, and gives the attending Hannah DVM exactly what they need to review before the visit ends.</span></p>`,
  quiz:[
   {q:'When should anal glands be expressed during a nose-to-tail exam?',opts:['Every time, as a routine step','Only if indicated and under supervision','Only if the Member requests it','Never, under any circumstance'],correct:1,exp:'Anal gland expression should only be performed if indicated and under supervision.'},
   {q:'True or False: Significant abnormalities can wait until the end of the shift to be reported to the veterinarian.',opts:['True','False'],correct:1,exp:'False. Significant abnormalities should be communicated to the attending Hannah DVM immediately.'},
   {q:'Where should exam findings be documented?',opts:['The Physical Exam and New Findings sections of the medical record in Hannahware','A personal notebook only','Nowhere, if the patient is normal','Only in the Member\'s chat messages'],correct:0,exp:'Findings should be recorded thoroughly in the Physical Exam and New Findings sections in Hannahware.'},
   {q:'What should be reviewed and printed at the end of the visit, per the procedure?',opts:['The Report Card from the Actions tab dropdown','The invoice only','The vaccine history only','Nothing further is needed'],correct:0,exp:'The procedure calls for reviewing and printing the Report Card found in the Actions tab dropdown.'},
   {q:'During the exam, who verbalizes each finding to the Member, and who enters it into Hannahware?',opts:['The PetNurse verbalizes findings while examining; the Nurse Aide enters them into Hannahware in real time','The Nurse Aide verbalizes findings; the PetNurse enters them into Hannahware','The Member enters their own findings into Hannahware','Only the attending DVM may verbalize or document exam findings'],correct:0,exp:'The PetNurse examines the patient and speaks findings aloud to the Member, while the Nurse Aide enters those same findings into the Physical Exam section of Hannahware at the same time.'},
   {q:'In Hannahware\'s Physical Exam screen, what does selecting "ABN" for a body system mean?',opts:['Abnormal','A Body Note','Above Baseline Normal','Auto-Balanced Normal'],correct:0,exp:'ABN stands for Abnormal, one of Hannahware\'s four body-system statuses alongside WNL (Within Normal Limit), STA (Stable), and CNA (Can Not Assess).'}
  ]}
];

const l2NtCases=[
 {id:0,title:'Ranger — Annual Wellness Exam',patient:'Ranger',species:'Canine',signalment:'4-year-old neutered male Labrador retriever',history:'Presented for annual wellness exam; Member reports no concerns, patient is active and eating normally.',
  stages:['Exam Findings','TPR Technique','Documentation','Member Communication','Next Steps'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the nose-to-tail findings</h2><p>Initial observation shows a bright, alert, comfortable dog with a normal gait, no lameness or ataxia, and no respiratory distress. Nose-to-tail exam: pink moist gums with CRT under 2 seconds, clear eyes, no nasal discharge, no submandibular lymph node enlargement, clean coat, normal heart and lung auscultation with no murmurs or pulse deficits, soft non-painful abdomen, full pain-free range of motion in all joints, normal mentation and proprioception, and a normal tail and perineal exam.</p>${ntBodySVG('canine')}`,
   `<span class="eyebrow">TPR technique</span><h2>Ranger's pulse is counted for 15 seconds and comes to 23 beats; his breathing is counted for 15 seconds at 6 breaths. How should these be calculated and interpreted?</h2><div class="choice-grid" id="l2ntc0s1"></div>`,
   `<span class="eyebrow">Documentation</span><h2>Record what the PetNurse verbalized, then choose the narrative note</h2><p>As the PetNurse examines Ranger, she narrates each system to the Member while the Nurse Aide enters findings into Hannahware. Complete the Nurse Aide's entry below first.</p>${hwWidgetHTML(hwRangerDemo)}<h3 style="margin-top:20px">Which New Findings narrative note is most appropriate?</h3><div class="choice-grid" id="l2ntc0s2"></div>`,
   `<span class="eyebrow">Member communication</span><h2>What should the team say to the Member?</h2><div class="choice-grid" id="l2ntc0s3"></div>`,
   `<span class="eyebrow">Next steps</span><h2>Which upcoming Level 2 topic builds directly on this wellness exam?</h2><div class="choice-grid" id="l2ntc0s4"></div><button class="primary" id="completeL2NtCase0" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2ntc0s1:{opts:['Multiply each 15-second count by four: heart rate is 92 bpm and respiratory rate is 24 breaths per minute, both within normal canine reference ranges.','Use the 15-second counts as the final per-minute values without multiplying.','Divide each 15-second count by four.'],correct:0,exp:'Per the procedure, multiply the 15-second count by four to get the per-minute rate: 23×4=92 bpm and 6×4=24 breaths/min, both within normal ranges for a dog.'},
   l2ntc0s2:{opts:['"Nose-to-tail exam performed; pink moist gums with CRT <2 sec, no lymph node or auscultation abnormalities, soft non-painful abdomen, full pain-free joint range of motion, normal mentation and gait; TPR within normal limits."','"Dog is perfectly healthy forever."','"Nothing to report, exam was quick."'],correct:0,exp:'Objective, region-by-region documentation in the Physical Exam section supports the medical record and future comparison.'},
   l2ntc0s3:{opts:['"Everything looks great today — no concerns from the nose-to-tail exam, and his vitals are all within normal range."','"Your dog is guaranteed to never get sick."','"We didn\'t really check anything today."'],correct:0,exp:'This response is accurate, plain-language, and appropriately confident for a fully normal wellness exam.'},
   l2ntc0s4:{opts:['Patient History, Body Condition Scoring, and Pain Assessment modules joining Level 2.','Surgical suturing technique.','Radiograph positioning for the thorax.'],correct:0,exp:'The Patient Assessment level continues with History, Body Condition Scoring, and Pain Assessment modules next.'}
  }},
 {id:1,title:'Willow — Post-Surgical Recheck',patient:'Willow',species:'Feline',signalment:'2-year-old spayed female domestic shorthair, day 5 post-spay',history:'Presented for a routine post-surgical incision recheck 5 days after spay surgery; Member reports the cat is eating and behaving normally.',
  stages:['Exam Findings','Integument Findings','Documentation','Member Communication','Escalation Triggers'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the nose-to-tail findings</h2><p>Initial observation shows a bright, alert, comfortable cat with normal gait and no respiratory distress. TPR is within normal limits, gums are pink with CRT under 2 seconds, and the remainder of the nose-to-tail exam is unremarkable.</p>`,
   `<span class="eyebrow">Integument findings</span><h2>During the integument exam, mild redness is noted along the incision edges, with no discharge, swelling, or pain response on gentle palpation near the site. Which action is correct?</h2><div class="choice-grid" id="l2ntc1s1"></div>`,
   `<span class="eyebrow">Documentation</span><h2>Record what the PetNurse verbalized, then choose the narrative note</h2><p>As the PetNurse checks Willow's incision, she narrates the finding to the Member while the Nurse Aide enters it into Hannahware. Complete the Nurse Aide's entry below first.</p>${hwWidgetHTML(hwWillowDemo)}<h3 style="margin-top:20px">Which New Findings narrative note is most appropriate?</h3><div class="choice-grid" id="l2ntc1s2"></div>`,
   `<span class="eyebrow">Member communication</span><h2>What should the team say to the Member about the incision?</h2><div class="choice-grid" id="l2ntc1s3"></div>`,
   `<span class="eyebrow">Escalation triggers</span><h2>Which change at a future recheck would require immediately reporting to the attending Hannah DVM?</h2><div class="choice-grid" id="l2ntc1s4"></div><button class="primary" id="completeL2NtCase1" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2ntc1s1:{opts:['Note the finding and report it to the attending Hannah DVM so they can examine the incision before the visit ends.','Declare the incision fully healed and skip mentioning it.','Apply a topical treatment without veterinary input.'],correct:0,exp:'Per the procedure, significant abnormalities — including new integument findings — should be reported to the attending DVM immediately, who then examines and decides next steps.'},
   l2ntc1s2:{opts:['"Incision edges mildly red, no discharge, no swelling, no pain response on palpation; remainder of exam normal; reported to attending DVM for review."','"Incision looks perfect, totally healed."','"Nothing unusual with the incision."'],correct:0,exp:'Objective, specific documentation of the incision in the Physical Exam/New Findings sections supports accurate veterinary review.'},
   l2ntc1s3:{opts:['"There\'s some mild redness at the incision edges; the doctor will take a quick look before you head out."','"Everything is 100% perfect, no need to check again."','"We didn\'t look at the incision today."'],correct:0,exp:'This response is accurate, non-diagnostic, and sets an appropriate next step for veterinarian review.'},
   l2ntc1s4:{opts:['Increasing redness, swelling, discharge, an opening incision, or new pain','The cat purring during the exam','A slightly dusty exam room','The Member arriving a few minutes late'],correct:0,exp:'Increasing redness, swelling, discharge, incision opening, or new pain at the surgical site are findings that require immediate DVM notification.'}
  }},
 {id:2,title:'Gus — Senior Wellness with a New Lump',patient:'Gus',species:'Canine',signalment:'10-year-old neutered male beagle mix',history:'Presented for senior wellness exam; Member mentions a new lump on the left flank first noticed about two weeks ago.',
  stages:['Exam Findings','Integument Findings','Documentation','Member Communication','Escalation Triggers'],
  content:[
   `<span class="eyebrow">Exam findings</span><h2>Review the nose-to-tail findings</h2><p>Initial observation shows a bright, alert senior dog with a normal gait, no lameness or ataxia. TPR is within normal limits, heart and lung auscultation are unremarkable, and abdominal palpation reveals no masses or discomfort.</p>${ntBodySVG('canine')}`,
   `<span class="eyebrow">Integument findings</span><h2>During the integument exam, a firm, freely movable, dime-sized subcutaneous mass is found on the left flank, non-painful on palpation, reportedly present for about two weeks. What is the correct next action?</h2><div class="choice-grid" id="l2ntc2s1"></div>`,
   `<span class="eyebrow">Documentation</span><h2>Record what the PetNurse verbalized, then choose the narrative note</h2><p>As the PetNurse describes the new lump, she narrates the finding to the Member while the Nurse Aide enters it into Hannahware. Complete the Nurse Aide's entry below first.</p>${hwWidgetHTML(hwGusDemo)}<h3 style="margin-top:20px">Which New Findings narrative note of the mass is most appropriate?</h3><div class="choice-grid" id="l2ntc2s2"></div>`,
   `<span class="eyebrow">Member communication</span><h2>What should the team say to the Member about the new lump?</h2><div class="choice-grid" id="l2ntc2s3"></div>`,
   `<span class="eyebrow">Escalation triggers</span><h2>Which change would require immediately reporting to the attending Hannah DVM rather than waiting for the next scheduled recheck?</h2><div class="choice-grid" id="l2ntc2s4"></div><button class="primary" id="completeL2NtCase2" style="margin-top:16px">Complete case</button>`
  ],
  decisions:{
   l2ntc2s1:{opts:['Document the objective findings in the New Findings section and report the mass to the attending Hannah DVM before the visit ends.','Tell the Member it is definitely a benign fatty lump.','Ignore it since the dog isn\'t painful.'],correct:0,exp:'New masses found during the integument exam should be documented objectively and reported to the attending DVM immediately, per the procedure.'},
   l2ntc2s2:{opts:['"Firm, freely movable, dime-sized subcutaneous mass on left flank, non-painful, reportedly present ~2 weeks; reported to attending DVM."','"Definitely a benign fatty lump, nothing to worry about."','"Small bump, probably fine."'],correct:0,exp:'Objective description — location, size, texture, mobility, pain response, and duration — supports veterinary evaluation without overdiagnosing.'},
   l2ntc2s3:{opts:['"The doctor found a small lump and will want to take a closer look, possibly with a quick needle sample, to see what it is."','"It\'s definitely just a fatty lump, no need to worry."','"It\'s probably cancer, you should be very worried."'],correct:0,exp:'This response is accurate, non-diagnostic, and previews the likely next diagnostic step without overpromising or alarming the Member.'},
   l2ntc2s4:{opts:['Rapid growth, texture change, ulceration, bleeding, or new pain in the mass','The mass staying the same size and texture','The dog eating normally','The Member asking general questions about lumps'],correct:0,exp:'Rapid growth, texture change, ulceration, bleeding, or new pain are recognized triggers to report to the DVM right away rather than waiting.'}
  }}
];

const l2NtStations=[
 {icon:'🧘',title:'Station 1: Calm Approach & Restraint',time:'18 min',desc:'Practice a calm introduction, proper restraint, and body-language reading for the full nose-to-tail sequence on an approved calm patient or teaching model.'},
 {icon:'🩺',title:'Station 2: TPR Technique Practice',time:'18 min',desc:'Practice taking a rectal temperature, palpating the femoral pulse, and counting respiratory rate using the 15-second × 4 method, then record results in Hannahware.'},
 {icon:'🔁',title:'Station 3: Nose-to-Tail Sequence Practice',time:'18 min',desc:'Run the full 12-section sequence in order — preparation and observation through documentation — without skipping a section.'},
 {icon:'🖼️',title:'Station 4: Image ID Gallery',time:'18 min',desc:'Sort body-region and mucous-membrane-color images into normal, flag-for-review, and escalate-immediately categories using observable language.'},
 {icon:'🗣️',title:'Station 5: Member Roleplay',time:'18 min',desc:'Narrate a wellness exam and explain both a normal finding and a flagged finding to a "Member" using plain, non-diagnostic language.'},
 {icon:'\uD83D\uDCF2',title:'Station 6: PetNurse\u2013Nurse Aide Documentation Practice',time:'20 min',desc:'Partner up: one learner plays PetNurse, examining a teaching model and verbalizing findings to a "Member" for at least three body systems; the other plays Nurse Aide, selecting the correct WNL/ABN/STA/CNA status and checkboxes in the Hannahware Physical Exam mock for each finding in real time. Switch roles and repeat.'}
];

const l2NtChecklistItems=[
 {t:'Gathers necessary supplies (thermometer, stethoscope, timer, otoscope/ophthalmoscope) before starting.',critical:true},
 {t:'Approaches the patient calmly and begins documentation before handling.',critical:true},
 {t:'Completes initial observation for gait, lameness, ataxia, and respiratory distress.',critical:true},
 {t:'Obtains temperature, pulse, and respiratory rate using correct technique (rectal temp; 15-second count × 4 for pulse and respiration).',critical:true},
 {t:'Confirms weight and records an accurate Body Condition Score in Hannahware.',critical:false},
 {t:'Completes head and face exam: nose, eyes, ears, oral cavity, and capillary refill time.',critical:true},
 {t:'Palpates submandibular lymph nodes, thyroid region, and jugular furrow.',critical:false},
 {t:'Performs heart and lung auscultation and compares femoral pulse for pulse deficits.',critical:true},
 {t:'Palpates all four abdominal quadrants and notes pain, masses, or fluid.',critical:true},
 {t:'Completes musculoskeletal, urogenital, and basic neurological screening as directed.',critical:true},
 {t:'Checks tail and perineal area and follows supervision requirements for anal gland expression.',critical:true},
 {t:'Documents all findings in the Physical Exam/New Findings sections and reports concerns to the attending DVM immediately.',critical:true},
 {t:'As Nurse Aide, correctly enters the PetNurse\'s verbalized findings into Hannahware\'s Physical Exam checkboxes \u2014 right status (WNL/ABN/STA/CNA), correct side, and correct duration \u2014 for at least three body systems.',critical:true}
];

const l2NtCertRows=[
 {req:'Prework completion',criterion:'100% complete before lab'},
 {req:'Module knowledge checks',criterion:'Average 85% across all six modules'},
 {req:'TPR & vitals technique assessment',criterion:'85% correct on technique and normal-range questions'},
 {req:'Image identification assessment',criterion:'85% correct on normal/flag/escalate set'},
 {req:'Skills lab checklist',criterion:'100% of critical items signed off'},
 {req:'Final attestation',criterion:'Learner signs scope-of-practice statement'}
];

let l2NtState=JSON.parse(localStorage.getItem('hlsTrueLevel2NoseToTail')||JSON.stringify({tab:'overview',moduleProgress:{},moduleScores:{},caseId:null,caseStep:0,casesCompleted:[],checklist:{},attested:false,signoffRequested:false}));
function persistL2Nt(){localStorage.setItem('hlsTrueLevel2NoseToTail',JSON.stringify(l2NtState))}

function l2NtCompletedModuleCount(){return Object.values(l2NtState.moduleProgress).filter(Boolean).length}
function l2NtOverallPercent(){
 const modulePct=(l2NtCompletedModuleCount()/l2NtModules.length)*100;
 const checklistPct=(Object.values(l2NtState.checklist).filter(Boolean).length/l2NtChecklistItems.length)*100;
 const casePct=(l2NtState.casesCompleted.length/l2NtCases.length)*100;
 return Math.round((modulePct+checklistPct+casePct)/3);
}

function openLevel2Nt(tab){if(tab)l2NtState.tab=tab;persistL2Nt();renderLevel2Nt();switchView('level2Nt')}

function renderLevel2Nt(){
 document.querySelectorAll('[data-l2nttab]').forEach(b=>b.classList.toggle('active',b.dataset.l2nttab===l2NtState.tab));
 const host=document.querySelector('#level2NtContent'); if(!host)return;
 const pct=l2NtOverallPercent();
 const ring=document.querySelector('#l2NtProgressRing'); if(ring)ring.innerHTML=`<strong>${pct}%</strong><span>Complete</span>`;

 if(l2NtState.tab==='overview'){
  host.innerHTML=`<div class="l5-dashboard-grid">
   <section class="panel span-2">
    <span class="eyebrow">Why this matters</span>
    <h2>A consistent sequence prevents missed findings</h2>
    <p>This course follows the approved Hannah Nose-to-Tail Exam procedure: preparation and initial observation, vital signs (TPR) and weight, head and face, neck and throat, integument and coat, thoracic and abdominal examination, urogenital and musculoskeletal screening, a basic neurological quick check, tail and perineal area, and documentation and follow-up. Following the same sequence every time — and reporting significant findings to the attending Hannah DVM immediately — keeps patients safe and the medical record complete.</p>
    <ul class="l2-obj-list">
     <li>Follow the full 12-section nose-to-tail exam sequence in order.</li>
     <li>Correctly perform TPR technique (rectal temperature, 15-second × 4 pulse and respiration counts) and record weight/BCS.</li>
     <li>Recognize normal findings and observable red flags across each body region.</li>
     <li>Use low-stress handling and proper restraint throughout the exam.</li>
     <li>Document findings in Hannahware and report significant abnormalities to the attending DVM immediately.</li>
    </ul>
    <p class="safety-note" style="margin-top:16px"><strong>How this course connects forward</strong><span>Nose-to-Tail Examination is a flagship course inside <strong>Level 2 (Patient Assessment)</strong> — Patient History, Body Condition Scoring, and Pain Assessment join this level next, building toward hydration assessment, neurologic and mobility screening, ophthalmic basics, and advanced dermatology case review in later levels.</span></p>
   </section>
   <section class="panel">
    <span class="eyebrow">Your progress</span>
    <h2>${pct}% complete</h2>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="list-item"><span>Modules complete</span><strong>${l2NtCompletedModuleCount()} of ${l2NtModules.length}</strong></div>
    <div class="list-item"><span>Case studies complete</span><strong>${l2NtState.casesCompleted.length} of ${l2NtCases.length}</strong></div>
    <div class="list-item"><span>Skills checklist</span><strong>${Object.values(l2NtState.checklist).filter(Boolean).length} of ${l2NtChecklistItems.length}</strong></div>
    <div class="card-footer"><button class="primary l2nt-jump" data-tab="curriculum">Continue curriculum</button></div>
   </section>
  </div>`;
 }
 if(l2NtState.tab==='curriculum'){
  host.innerHTML=`<div class="l2-module-grid">${l2NtModules.map(m=>{
   const done=!!l2NtState.moduleProgress[m.id];
   const score=l2NtState.moduleScores[m.id];
   return `<article class="l2-module-card"><div class="section-head"><div class="l2-module-num">${m.id}</div><span class="badge ${done?'good':'neutral'}">${done?'Complete':'Not started'}</span></div><h3>${m.title}</h3><p>${m.minutes} min • knowledge check on completion${score!=null?` • scored ${score}%`:''}</p><button class="${done?'secondary':'primary'} l2nt-open-module" data-module="${m.id}">${done?'Review module':'Open module'}</button></article>`;
  }).join('')}</div>`;
 }
 if(l2NtState.tab==='cases'){
  host.innerHTML=`<div class="l2-case-list">${l2NtCases.map(c=>{
   const done=l2NtState.casesCompleted.includes(c.id);
   return `<article class="clinical-case"><span class="eyebrow">${c.species}</span><h2>${c.title}</h2><p>${c.history}</p><span class="badge ${done?'good':'neutral'}">${done?'Completed':'Not started'}</span><br><button class="${done?'secondary':'primary'} l2nt-open-case" data-case="${c.id}">${done?'Review case':'Open case'}</button></article>`;
  }).join('')}</div>`;
 }
 if(l2NtState.tab==='skillslab'){
  host.innerHTML=`<section class="panel">
   <span class="eyebrow">Hands-on skills lab</span><h2>Five rotating stations • 90 minutes total</h2>
   <div class="l2-station-grid">${l2NtStations.map(s=>`<article class="l2-station-card"><div class="l2-station-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p><span class="badge neutral">${s.time}</span></article>`).join('')}</div>
  </section>
  <section class="panel" style="margin-top:18px">
   <div class="section-head"><div><span class="eyebrow">Skills checklist / rubric</span><h2>Facilitator sign-off — ${Object.values(l2NtState.checklist).filter(Boolean).length}/${l2NtChecklistItems.length} complete (${Math.round((Object.values(l2NtState.checklist).filter(Boolean).length/l2NtChecklistItems.length)*100)}%)</h2></div></div>
   <div class="checklist-grid">${l2NtChecklistItems.map((item,i)=>`<label class="l2-check-row ${l2NtState.checklist[i]?'done':''}"><input type="checkbox" data-l2nt-check="${i}" ${l2NtState.checklist[i]?'checked':''}><span>${item.t} ${item.critical?'<span class=\\"badge risk\\">Critical</span>':'<span class=\\"badge neutral\\">Non-critical</span>'}</span></label>`).join('')}</div>
   <p class="safety-note" style="margin-top:14px"><strong>Pass standard</strong><span>All critical items must be marked complete, and no safety-critical item may be missed.</span></p>
  </section>`;
 }
 if(l2NtState.tab==='certification'){
  const modAvg=Object.keys(l2NtState.moduleScores).length?Math.round(Object.values(l2NtState.moduleScores).reduce((a,b)=>a+b,0)/Object.values(l2NtState.moduleScores).length):0;
  const criticalDone=l2NtChecklistItems.every((item,i)=>!item.critical||l2NtState.checklist[i]);
  host.innerHTML=`<section class="panel">
   <div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>Nose-to-Tail Examination Foundation</h2><p>Certification title: "Nose-to-Tail Examination Foundation: Cleared for Supervised Nose-to-Tail Exam Support."</p></div><button class="primary" id="requestL2NtValidation">Request sign-off</button></div>
   <div class="l2-cert-table">
    <div class="l2-cert-head"><span>Requirement</span><span>Status</span><span>Passing criterion</span></div>
    ${l2NtCertRows.map((r,i)=>{
      let status='In progress';
      if(i===1)status=modAvg>=85?'Met':`${modAvg}% avg`;
      if(i===4)status=criticalDone?'Met':'Incomplete';
      if(i===5)status=l2NtState.attested?'Signed':'Not signed';
      const good=status==='Met'||status==='Signed';
      return `<div class="l2-cert-row"><strong>${r.req}</strong><span class="badge ${good?'good':'warning'}">${status}</span><span>${r.criterion}</span></div>`;
    }).join('')}
   </div>
   <label class="l2-check-row ${l2NtState.attested?'done':''}" style="margin-top:16px"><input type="checkbox" id="l2NtAttestCheck" ${l2NtState.attested?'checked':''}><span>I attest that this course follows the Hannah Nose-to-Tail Exam procedure and that I will report significant findings to the attending Hannah DVM immediately rather than diagnosing or treating independently.</span></label>
   <p class="safety-note" style="margin-top:14px"><strong>What comes next in Patient Assessment</strong><span>Upcoming Level 2 modules add Patient History, Body Condition Scoring, and Pain Assessment. Later levels add hydration assessment, neurologic and mobility screening, ophthalmic basics, and advanced dermatology case review.</span></p>
  </section>`;
 }
 wireLevel2Nt();
}

function wireLevel2Nt(){
 document.querySelectorAll('.l2nt-jump').forEach(b=>b.onclick=()=>{l2NtState.tab=b.dataset.tab;persistL2Nt();renderLevel2Nt()});
 document.querySelectorAll('.l2nt-open-module').forEach(b=>b.onclick=()=>openL2NtModule(+b.dataset.module));
 document.querySelectorAll('.l2nt-open-case').forEach(b=>b.onclick=()=>openL2NtCase(+b.dataset.case));
 document.querySelectorAll('[data-l2nt-check]').forEach(cb=>cb.onchange=()=>{l2NtState.checklist[cb.dataset.l2ntCheck]=cb.checked;persistL2Nt();renderLevel2Nt();toast(cb.checked?'Checklist item marked complete':'Checklist item unchecked')});
 document.querySelector('#l2NtAttestCheck')?.addEventListener('change',e=>{l2NtState.attested=e.target.checked;persistL2Nt();renderLevel2Nt();toast(e.target.checked?'Attestation signed':'Attestation removed')});
 document.querySelector('#requestL2NtValidation')?.addEventListener('click',()=>{
  l2NtState.signoffRequested=true;persistL2Nt();
  openModal('<span class="eyebrow">Competency validation</span><h1>Request sign-off</h1><p>Select an approved validator and shift for observed sign-off of the Nose-to-Tail Examination Foundation competencies.</p><button class="primary" onclick="document.querySelector(\'#modal\').close()">Submit request</button>');
  toast('Sign-off requested');
 });
}

/* ---- Nose-to-Tail module modal with knowledge check ---- */
let l2NtActiveModule=null, l2NtQuizAnswers={};
function openL2NtModule(id){
 l2NtActiveModule=l2NtModules.find(m=>m.id===id);
 l2NtQuizAnswers={};
 renderL2NtModuleModal();
}
function renderL2NtModuleModal(){
 const m=l2NtActiveModule;
 const answeredCount=Object.keys(l2NtQuizAnswers).length;
 openModal(`<span class="eyebrow">Module ${m.id} of ${l2NtModules.length} • ${m.minutes} min</span>
  <h1 class="modal-title">${m.title}</h1>
  ${m.content}
  <div style="margin-top:22px;border-top:1px solid var(--line);padding-top:18px">
   <div class="section-head"><div><span class="eyebrow">Knowledge check</span><h2>Answer all ${m.quiz.length} questions</h2></div><span class="l2-quiz-score" id="l2NtQuizScoreLabel">${answeredCount}/${m.quiz.length} answered</span></div>
   <div id="l2NtQuizContainer">${m.quiz.map((q,qi)=>`
    <div class="l2-quiz-question">
     <h4>${qi+1}. ${q.q}</h4>
     <div id="l2ntq-${qi}">${q.opts.map((o,oi)=>`<button class="decision-option" data-qi="${qi}" data-oi="${oi}">${o}</button>`).join('')}</div>
     <div id="l2ntfb-${qi}"></div>
    </div>`).join('')}
   </div>
   <div id="l2NtQuizResult" style="margin-top:16px"></div>
  </div>`);
 document.querySelectorAll('#l2NtQuizContainer .decision-option').forEach(btn=>btn.onclick=()=>l2NtAnswerQuestion(+btn.dataset.qi,+btn.dataset.oi));
 if(m.id===6)wireHwWidget(hwFluffyDemo);
 if(answeredCount===m.quiz.length)renderL2NtQuizResult();
}
function l2NtAnswerQuestion(qi,oi){
 const m=l2NtActiveModule;
 if(l2NtQuizAnswers[qi])return;
 const q=m.quiz[qi];
 const isCorrect=oi===q.correct;
 l2NtQuizAnswers[qi]={oi,correct:isCorrect};
 const wrap=document.querySelector(`#l2ntq-${qi}`);
 wrap.querySelectorAll('.decision-option').forEach((btn,idx)=>{
  btn.disabled=true;
  if(idx===q.correct)btn.classList.add('correct');
  else if(idx===oi)btn.classList.add('wrong');
 });
 document.querySelector(`#l2ntfb-${qi}`).innerHTML=`<div class="feedback"><p><strong>${isCorrect?'Correct.':'Not quite.'}</strong> ${q.exp}</p></div>`;
 const label=document.querySelector('#l2NtQuizScoreLabel');
 if(label)label.textContent=`${Object.keys(l2NtQuizAnswers).length}/${m.quiz.length} answered`;
 if(Object.keys(l2NtQuizAnswers).length===m.quiz.length)renderL2NtQuizResult();
}
function renderL2NtQuizResult(){
 const m=l2NtActiveModule;
 const correctCount=Object.values(l2NtQuizAnswers).filter(a=>a.correct).length;
 const pct=Math.round((correctCount/m.quiz.length)*100);
 const passed=pct>=75;
 if(passed){
  l2NtState.moduleProgress[m.id]=true;
  l2NtState.moduleScores[m.id]=pct;
  persistL2Nt();
 } else {
  l2NtState.moduleScores[m.id]=pct;
  persistL2Nt();
 }
 document.querySelector('#l2NtQuizResult').innerHTML=`<div class="feedback-box"><strong>Score: ${pct}%</strong> (${correctCount} of ${m.quiz.length} correct) — ${passed?'Module marked complete.':'Retake recommended (75% needed to mark complete).'}</div>
  <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
   ${!passed?'<button class="secondary" id="l2NtRetakeQuiz">Retake knowledge check</button>':''}
   <button class="primary" id="l2NtCloseModuleModal">Return to curriculum</button>
  </div>`;
 document.querySelector('#l2NtRetakeQuiz')?.addEventListener('click',()=>{l2NtQuizAnswers={};renderL2NtModuleModal()});
 document.querySelector('#l2NtCloseModuleModal')?.addEventListener('click',()=>{document.querySelector('#modal').close();renderLevel2Nt()});
 if(passed)toast(`${m.title} module complete — ${pct}%`);
}

/* ---- Nose-to-Tail case runner ---- */
function openL2NtCase(id){
 l2NtState.caseId=id;l2NtState.caseStep=0;persistL2Nt();
 renderL2NtCase();
 switchView('level2NtCaseRunner');
}
function renderL2NtCase(){
 const c=l2NtCases.find(x=>x.id===l2NtState.caseId); if(!c)return;
 document.querySelector('#l2NtCaseTitle').textContent=c.title;
 document.querySelector('#l2NtCaseSubtitle').textContent=`${c.species} • ${c.stages[l2NtState.caseStep]}`;
 document.querySelector('#l2NtCaseStepLabel').textContent=c.stages[l2NtState.caseStep];
 document.querySelector('#l2NtCaseProgress').style.width=`${((l2NtState.caseStep+1)/c.stages.length)*100}%`;
 document.querySelector('#l2NtCaseStageNav').innerHTML=c.stages.map((s,i)=>`<button class="${i===l2NtState.caseStep?'active':''}" data-l2nt-case-step="${i}">${i+1}. ${s}</button>`).join('');
 document.querySelector('#l2NtCasePatientName').textContent=c.patient;
 document.querySelector('#l2NtCaseSignalment').textContent=c.signalment;
 document.querySelector('#l2NtCaseHistory').textContent=c.history;
 document.querySelector('#l2NtCaseStepName').textContent=c.stages[l2NtState.caseStep];
 document.querySelector('#l2NtCaseStageContent').innerHTML=c.content[l2NtState.caseStep];
 const hwCfg=l2NtCaseHwWidgets[`${c.id}-${l2NtState.caseStep}`]; if(hwCfg)wireHwWidget(hwCfg);
 document.querySelectorAll('[data-l2nt-case-step]').forEach(b=>b.onclick=()=>{l2NtState.caseStep=+b.dataset.l2ntCaseStep;persistL2Nt();renderL2NtCase()});
 Object.keys(c.decisions).forEach(hostId=>{
  const el=document.querySelector('#'+hostId);
  if(!el)return;
  const d=c.decisions[hostId];
  el.innerHTML=d.opts.map((o,i)=>`<button class="case-choice" data-opt="${i}">${o}</button>`).join('')+'<div class="l2-case-feedback"></div>';
  el.querySelectorAll('.case-choice').forEach(btn=>btn.onclick=()=>{
   const chosen=+btn.dataset.opt;
   el.querySelectorAll('.case-choice').forEach((b2,i2)=>{b2.disabled=true;if(i2===d.correct)b2.classList.add('selected')});
   el.querySelector('.l2-case-feedback').innerHTML=`<div class="feedback"><p><strong>${chosen===d.correct?'Correct.':'Consider the veterinarian-approved answer:'}</strong> ${d.exp}</p></div>`;
   toast(chosen===d.correct?'Correct decision recorded':'Feedback recorded');
  });
 });
 document.querySelector(`#completeL2NtCase${c.id}`)?.addEventListener('click',()=>{
  if(!l2NtState.casesCompleted.includes(c.id)){l2NtState.casesCompleted.push(c.id);persistL2Nt()}
  toast(`${c.title} completed`);
  renderLevel2Nt();
  openLevel2Nt('cases');
 });
}
document.querySelector('#openAskHannahL2Nt')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah Nose-to-Tail Exam procedure?'});
document.querySelector('#openAskHannahL2NtOverview')?.addEventListener('click',()=>{switchView('ask');document.querySelector('#askInput').value='What is the approved Hannah Nose-to-Tail Exam procedure?'});
document.querySelector('#backToAcademiesL2Nt')?.addEventListener('click',()=>openLevel2Hub());
document.querySelector('#exitLevel2NtCase')?.addEventListener('click',()=>openLevel2Nt('cases'));
document.querySelector('#level2NtResourcesBtn')?.addEventListener('click',()=>openModal('<span class="eyebrow">Level 2 resources</span><h1>Nose-to-Tail Examination Foundation resource library</h1><p>The approved Hannah Nose-to-Tail Exam procedure, escalation criteria, and Member-communication scripts will appear here after clinical review.</p><p class="safety-note"><strong>Prototype boundary</strong><span>This build uses only original diagrams; production content requires Hannah-approved clinical photography and CMO review.</span></p>'));
document.querySelectorAll('[data-l2nttab]').forEach(b=>b.onclick=()=>{l2NtState.tab=b.dataset.l2nttab;persistL2Nt();renderLevel2Nt()});



window.openLevel2=openLevel2;
window.openLevel2Nt=openLevel2Nt;
renderLevel2Hub();

renderLevel2();
renderLevel2Nt();
})();
