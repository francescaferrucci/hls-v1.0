
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


/* ===== Supabase client + real authentication ===== */
const SUPABASE_URL="https://yadypyjoflpxbkkrhmot.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZHlweWpvZmxweGJra3JobW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMzIxMTUsImV4cCI6MjEwMDYwODExNX0.2UJhisbHXI0vn11BrAJKibN7aFnoXipmq5JQBj5ldeQ";
// Preview runs inside a sandboxed iframe where localStorage can throw, so fall back to an in-memory store.
const authStorage=(()=>{
 try{window.localStorage.setItem("__hlsProbe","1");window.localStorage.removeItem("__hlsProbe");return window.localStorage}
 catch(e){const mem={};return{getItem:k=>k in mem?mem[k]:null,setItem:(k,v)=>{mem[k]=String(v)},removeItem:k=>{delete mem[k]}}}
})();
// The default Web Locks–based lock deadlocks the first post-sign-in query inside the sandboxed
// preview iframe; this single-tab app does not need cross-tab coordination.
const noopAuthLock=(name,acquireTimeout,fn)=>fn();
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{auth:{storage:authStorage,lock:noopAuthLock,persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
const hlsAuth={user:null,profile:null};
const STAFF_ROLES=["facilitator","manager","administrator"];
function currentRole(){return hlsAuth.profile?.role||"learner"}
function isStaffRole(){return STAFF_ROLES.includes(currentRole())}
function isAdminRole(){return currentRole()==="administrator"}
// Mirrors the DB's is_content_manager(): only these roles may write lessons.
function isContentManager(){const r=currentRole();return r==="manager"||r==="administrator"}

function applyRoleGating(){
 const staff=isStaffRole(),admin=isAdminRole(),contentMgr=isContentManager();
 $$(".manager-only").forEach(x=>x.style.display=staff?"":"none");
 $$(".admin-only").forEach(x=>x.style.display=admin?"":"none");
 $$(".content-manager-only").forEach(x=>x.style.display=contentMgr?"":"none");
 const active=document.querySelector(".view.active");
 if(!staff&&active&&["manager","content","contentEditor","reports","admin"].includes(active.id))switchView("dashboard");
 if(!contentMgr&&active&&["content","contentEditor"].includes(active.id))switchView("dashboard");
}

let authMode="signin";
function setAuthNotice(el,msg){const n=$(el);n.textContent=msg||"";n.hidden=!msg}
function clearAuthNotices(){setAuthNotice("#authError","");setAuthNotice("#authInfo","")}
function setAuthMode(mode){
 authMode=mode;
 const signup=mode==="signup";
 $("#authHeading").textContent=signup?"Create your account":"Sign in";
 $("#authSubheading").textContent=signup?"Register with your Hannah email to start learning.":"Use your Hannah account to continue your learning.";
 $("#authNameField").hidden=!signup;
 $("#authSubmit").textContent=signup?"Create account":"Sign in";
 $("#authToggle").textContent=signup?"Already have an account? Sign in":"Need an account? Create one";
 $("#authPassword").autocomplete=signup?"new-password":"current-password";
 clearAuthNotices();
}
$("#authToggle").addEventListener("click",()=>setAuthMode(authMode==="signup"?"signin":"signup"));
$("#authForm").addEventListener("submit",async e=>{
 e.preventDefault();
 clearAuthNotices();
 const email=$("#authEmail").value.trim(),password=$("#authPassword").value;
 if(!email||!password){setAuthNotice("#authError","Enter your email and password.");return}
 const btn=$("#authSubmit");btn.disabled=true;
 try{
  if(authMode==="signup"){
   const {data,error}=await sb.auth.signUp({email,password,options:{data:{full_name:$("#authName").value.trim()}}});
   if(error)throw error;
   if(!data.session)setAuthNotice("#authInfo","Account created. Confirm your email address, then sign in.");
  }else{
   const {error}=await sb.auth.signInWithPassword({email,password});
   if(error)throw error;
  }
 }catch(err){
  setAuthNotice("#authError",err?.message||"We couldn't complete that request. Please try again.");
 }finally{btn.disabled=false}
});

async function enterApp(user){
 hlsAuth.user=user;
 const {data,error}=await sb.from("profiles").select("*").eq("id",user.id).single();
 hlsAuth.profile=error?null:data;
 $("#authGate").hidden=true;
 $("#appShell").hidden=false;
 applyRoleGating();
 document.dispatchEvent(new CustomEvent("hls:authenticated"));
}
function showAuthGate(){
 hlsAuth.user=null;hlsAuth.profile=null;
 $("#appShell").hidden=true;
 $("#authGate").hidden=false;
 setAuthMode("signin");
 $("#authPassword").value="";
}
sb.auth.onAuthStateChange((event,session)=>{
 // Supabase holds an internal auth lock for the duration of this callback, so defer DB work out of it.
 if(session?.user){if(hlsAuth.user?.id!==session.user.id)setTimeout(()=>enterApp(session.user),0)}
 else showAuthGate();
});
sb.auth.getSession().then(({data})=>{
 if(data.session?.user){if(!hlsAuth.user)enterApp(data.session.user)}
 else showAuthGate();
});

function updateRole(){
 state.role=$("#roleSwitch").value;state.location=$("#locationSwitch").value;
 const p=roleProfiles[state.role];
 $("#readinessScore").textContent=p.readiness+"%";
 $("#continueTitle").textContent=p.continue;
 $("#continueMeta").textContent=`Current course • ${p.progress}% complete`;
 $("#continueProgress").style.width=p.progress+"%";
 renderDashboard();renderCourses();renderSimulations();renderManager();
 toast(`View updated for ${state.role} at ${state.location}`);
 applyRoleGating();
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
$("#uploadResourceBtn").addEventListener("click",()=>{openModal(`<span class="eyebrow">Knowledge Base</span><h1 class="modal-title">Add knowledge resource</h1><div class="form-grid"><label class="full">Title<input placeholder="Enter resource title"></label><label>Category<select><option>Clinical</option><option>Member Services</option><option>Operations</option><option>Leadership</option></select></label><label>Format<select><option>Document</option><option>Job aid</option><option>Video</option><option>Checklist</option></select></label><label class="full">Summary<textarea rows="3" placeholder="What will the team use this for?"></textarea></label></div><button class="primary" id="saveResource">Add resource</button>`);$("#saveResource").addEventListener("click",()=>{$("#modal").close();toast("Knowledge resource added")})});

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
  $("#managerContent").innerHTML=`<div class="approval-grid"><section class="panel"><h2>Competency validations</h2>${competencies.filter(c=>["Awaiting Sign-Off","Practicing"].includes(c.status)).map(c=>`<div class="list-item"><div><strong>${c.name}</strong><span>${c.owner}</span></div><button class="primary">Review</button></div>`).join("")}</section><section class="panel"><h2>Content approvals</h2>${csDraftLessons().map(l=>`<div class="list-item"><div><strong>${escapeHtml(l.title)}</strong><span>Lesson • Draft</span></div><button class="primary cs-review-draft" data-lesson-id="${l.id}">Review</button></div>`).join("")||'<p class="cs-empty">No lessons are awaiting review.</p>'}</section></div>`;
  $$(".cs-review-draft").forEach(b=>b.addEventListener("click",()=>csEditLesson(b.dataset.lessonId)));
 } else {
  $("#managerContent").innerHTML=`<div class="compliance-grid"><section class="panel"><h2>Requirements</h2>${["CPR Certification","Radiation Safety","Annual OSHA Refresher","HIPAA & Records Privacy"].map((x,i)=>`<div class="list-item"><div><strong>${x}</strong><span>${[92,88,96,90][i]}% current</span></div><span class="badge ${i===2?"risk":"warning"}">${[6,3,2,4][i]} due</span></div>`).join("")}</section><section class="panel"><h2>90-day forecast</h2>${[["0–30 days",6],["31–60 days",5],["61–90 days",7]].map(x=>`<div class="list-item"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("")}</section></div>`;
 }
}
$("#managerTabs").addEventListener("click",e=>{if(!e.target.matches(".chip"))return;$$("#managerTabs .chip").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");state.managerTab=e.target.dataset.managerTab;renderManager()});
function openProfile(name){const t=team.find(x=>x.name===name);openModal(`<span class="eyebrow">${t.role}</span><h1 class="modal-title">${t.name}</h1><p>${t.location}</p><div class="form-grid"><div><strong>Completion</strong><p>${t.completion}%</p></div><div><strong>Validated skills</strong><p>${t.skills}</p></div><div><strong>Overdue</strong><p>${t.overdue}</p></div><div><strong>Status</strong><p>${t.status}</p></div></div><button class="primary" id="assignFromProfile">Assign learning</button>`);$("#assignFromProfile").addEventListener("click",assignmentForm)}
$("#createAssignmentBtn").addEventListener("click",assignmentForm);
function assignmentForm(){openModal(`<span class="eyebrow">Manager workflow</span><h1 class="modal-title">Create assignment</h1><div class="form-grid"><label class="full">Learning content<select><option>Nose-to-Tail Exam</option><option>Phone Answering Expectations</option><option>Membership Enrollment Accuracy</option><option>Urgent Call Triage Simulation</option></select></label><label>Assignment type<select><option>Role-based</option><option>Location-based</option><option>Individual</option><option>All team members</option></select></label><label>Audience<select><option>Service Coordinator</option><option>Membership Coordinator</option><option>Pet Nurse</option><option>DVM / Practitioner</option><option>Leadership</option></select></label><label>Start date<input type="date" value="2026-07-25"></label><label>Due date<input type="date" value="2026-08-08"></label><label class="full">Manager message<textarea rows="3" placeholder="Why is this learning being assigned?"></textarea></label></div><button class="primary" id="saveAssignment">Create assignment</button>`);$("#saveAssignment").addEventListener("click",()=>{$("#modal").close();toast("Assignment created")})}
function assessmentForm(){openModal(`<span class="eyebrow">Competency validation</span><h1 class="modal-title">New assessment</h1><div class="form-grid"><label>Team member<select>${team.map(t=>`<option>${t.name}</option>`).join("")}</select></label><label>Competency<select>${competencies.map(c=>`<option>${c.name}</option>`).join("")}</select></label><label>Status<select><option>Practicing</option><option>Awaiting Sign-Off</option><option>Certified</option><option>Needs Practice</option></select></label><label>Evidence type<select><option>Observed practice</option><option>Simulation</option><option>Skills lab</option><option>Document upload</option></select></label><label class="full">Notes<textarea rows="4"></textarea></label></div><button class="primary" id="saveAssessment">Save assessment</button>`);$("#saveAssessment").addEventListener("click",()=>{$("#modal").close();toast("Assessment saved")})}

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
$("#profileBtn").addEventListener("click",()=>{
 const p=hlsAuth.profile;
 const name=p?.full_name||hlsAuth.user?.email||"Signed-in user";
 const sub=[p?.job_title,p?.location].filter(Boolean).join(" — ")||hlsAuth.user?.email||"";
 openModal(`<span class="eyebrow">User profile</span><h1 class="modal-title">${escapeHtml(name)}</h1><p>${escapeHtml(sub)}</p><div class="detail-card"><strong>Account role</strong><span>${escapeHtml(currentRole())}</span></div><div class="detail-card"><strong>Signed in as</strong><span>${escapeHtml(hlsAuth.user?.email||"—")}</span></div><button class="secondary" id="logoutBtn">Log out</button>`);
 $("#logoutBtn").addEventListener("click",async()=>{$("#modal").close();await sb.auth.signOut();showAuthGate();toast("Signed out")});
});
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

/* ===== Content Studio — Supabase-backed lesson authoring ===== */
const csData={lessons:[],courses:[],academies:[],loaded:false,error:null};
const csFilters={course:"all",status:"all"};
let csEd=null,csEdTab="basic",csEdNotice=null;

const CS_TABS=[["basic","Basic info"],["header","Header"],["overview","Overview"],["modules","Modules"],["cases","Case studies"],["skillslab","Skills Lab"],["certification","Certification"]];
const CS_KNOWN_TOP=["header","overview","modules","cases","stations","skillsLab","checklistItems","certRows","certification"];
const CS_KNOWN_MODULE=["id","icon","title","content","minutes","quiz"];
const CS_KNOWN_CASE=["id","title","species","patient","signalment","history","stages","content","decisions"];
const CS_KNOWN_QUIZ=["q","opts","correct","exp"];

function csClone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v))}
function csExtras(obj,known){const o={};Object.keys(obj||{}).forEach(k=>{if(!known.includes(k))o[k]=csClone(obj[k])});return o}
function csDraftLessons(){return csData.lessons.filter(l=>l.status==="draft")}
function csSlugify(s){return String(s||"").toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)}
function csFmtDate(iso){if(!iso)return"—";const d=new Date(iso);return isNaN(d)?"—":d.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}
function csCourseLabel(courseId){
 const c=csData.courses.find(x=>x.id===courseId);
 if(!c)return"Unassigned course";
 const a=csData.academies.find(x=>x.id===c.academy_id);
 return a?`${a.title} • ${c.title}`:c.title;
}

/* ---------- data loading ---------- */
async function csLoadAll(){
 const [L,C,A]=await Promise.all([
  sb.from("lessons").select("*").order("sort_order",{ascending:true}),
  sb.from("courses").select("id,academy_id,slug,title,sort_order").order("sort_order",{ascending:true}),
  sb.from("academies").select("id,slug,title,sort_order").order("sort_order",{ascending:true})
 ]);
 csData.error=(L.error||C.error||A.error)?.message||null;
 csData.lessons=L.data||[];csData.courses=C.data||[];csData.academies=A.data||[];
 csData.loaded=!csData.error;
}

/* ---------- list view ---------- */
function renderContent(){
 const statsHost=$("#contentStats"),listHost=$("#contentInventory");
 if(!statsHost||!listHost)return;
 if(!csData.loaded){
  statsHost.innerHTML="";
  listHost.innerHTML=`<p class="cs-empty">${csData.error?escapeHtml(csData.error):"Loading lessons…"}</p>`;
  return;
 }
 const all=csData.lessons;
 const totalModules=all.reduce((n,l)=>n+((l.content&&l.content.modules)||[]).length,0);
 statsHost.innerHTML=[
  ["Published",all.filter(l=>l.status==="published").length],
  ["Drafts",all.filter(l=>l.status==="draft").length],
  ["Modules",totalModules],
  ["Require sign-off",all.filter(l=>l.requires_signoff).length]
 ].map(x=>`<div class="metric-small"><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join("");

 const sel=$("#csCourseFilter");
 if(sel&&sel.options.length<=1){
  sel.innerHTML=`<option value="all">All courses</option>`+csData.courses.map(c=>`<option value="${c.id}">${escapeHtml(csCourseLabel(c.id))}</option>`).join("");
 }
 if(sel)sel.value=csFilters.course;
 const statusSel=$("#csStatusFilter");if(statusSel)statusSel.value=csFilters.status;

 const list=all.filter(l=>(csFilters.course==="all"||l.course_id===csFilters.course)&&(csFilters.status==="all"||l.status===csFilters.status));
 if(!list.length){listHost.innerHTML=`<p class="cs-empty">No lessons match these filters.</p>`;return}
 listHost.innerHTML=list.map(l=>{
  const mods=((l.content&&l.content.modules)||[]).length;
  return `<div class="cs-lesson-row">
   <div><strong>${escapeHtml(l.title||"Untitled lesson")}</strong>
    <span class="cs-meta">${escapeHtml(csCourseLabel(l.course_id))} • ${mods} module${mods===1?"":"s"} • Updated ${csFmtDate(l.updated_at)}</span></div>
   <span class="badge ${l.status==="published"?"good":"warning"}">${l.status==="published"?"Published":"Draft"}</span>
   <div class="cs-row-actions">
    <button data-cs-edit="${l.id}">Edit</button>
    <button data-cs-dup="${l.id}">Duplicate</button>
    <button data-cs-preview="${escapeHtml(l.slug)}">Preview</button>
    <button class="cs-danger" data-cs-del="${l.id}">Delete</button>
   </div>
  </div>`;
 }).join("");
 listHost.querySelectorAll("[data-cs-edit]").forEach(b=>b.addEventListener("click",()=>csEditLesson(b.dataset.csEdit)));
 listHost.querySelectorAll("[data-cs-dup]").forEach(b=>b.addEventListener("click",()=>csDuplicateLesson(b.dataset.csDup)));
 listHost.querySelectorAll("[data-cs-del]").forEach(b=>b.addEventListener("click",()=>csDeleteLesson(b.dataset.csDel)));
 listHost.querySelectorAll("[data-cs-preview]").forEach(b=>b.addEventListener("click",()=>csPreview(b.dataset.csPreview)));
}

function csPreview(slug){
 if(window.invalidateLessonCache)window.invalidateLessonCache(slug);
 const lesson=csData.lessons.find(l=>l.slug===slug)||(csEd&&csEd.basic&&csEd.basic.slug===slug?{course_id:csEd.basic.course_id}:null);
 const course=lesson?csData.courses.find(c=>c.id===lesson.course_id):null;
 if(course&&window.setCourseContext)window.setCourseContext(course.slug,course.title);
 window.renderLessonPlayer(slug,"overview");
}

/* ---------- duplicate / delete ---------- */
function csUniqueSlug(base,excludeId){
 let s=base,n=2;
 while(csData.lessons.some(l=>l.slug===s&&l.id!==excludeId)){s=`${base}-${n}`;n++}
 return s;
}
async function csDuplicateLesson(id){
 const src=csData.lessons.find(l=>l.id===id);if(!src)return;
 const payload={
  course_id:src.course_id,slug:csUniqueSlug(`${src.slug}-copy`),title:`${src.title} (Copy)`,
  summary:src.summary,sort_order:src.sort_order,status:"draft",
  requires_signoff:src.requires_signoff,content:csClone(src.content)||{}
 };
 const {error}=await sb.from("lessons").insert(payload);
 if(error){toast(`Duplicate failed: ${error.message}`);return}
 await csLoadAll();renderContent();renderManager();
 toast(`Created "${payload.title}"`);
}
async function csDeleteLesson(id){
 const l=csData.lessons.find(x=>x.id===id);if(!l)return;
 if(!confirm(`Delete "${l.title}"? This cannot be undone.`))return;
 const {error}=await sb.from("lessons").delete().eq("id",id);
 if(error){
  const fk=error.code==="23503"||/foreign key|violates/i.test(error.message||"");
  toast(fk?"Can't delete — learners already have progress on this lesson. Unpublish it instead.":`Delete failed: ${error.message}`);
  return;
 }
 if(window.invalidateLessonCache)window.invalidateLessonCache(l.slug);
 await csLoadAll();renderContent();renderManager();
 toast(`Deleted "${l.title}"`);
}

/* ---------- editor model ---------- */
function csDefaultCertRows(){return[
 {req:"Prework completion",criterion:"100% complete before lab"},
 {req:"Module knowledge checks",criterion:"Average 85% across all modules"},
 {req:"Image identification assessment",criterion:"85% correct on the assessment set"},
 {req:"Applied skills preview",criterion:"80% correct on the preview set"},
 {req:"Skills lab checklist",criterion:"100% of critical items signed off"},
 {req:"Final attestation",criterion:"Learner signs scope-of-practice statement"}
]}

// Split a stored stage HTML string back into the editable pieces the form shows.
// Stages carrying Hannahware markup are flagged locked: their HTML is round-tripped verbatim.
function csParseStage(caseObj,i){
 const html=(caseObj.content||[])[i]||"";
 const grid=html.match(/<div class="choice-grid" id="([^"]+)"><\/div>/);
 const hostId=grid?grid[1]:null;
 const origDecision=hostId&&caseObj.decisions?csClone(caseObj.decisions[hostId]):null;
 const eb=html.match(/<span class="eyebrow">([\s\S]*?)<\/span>/);
 const h2=html.match(/<h2>([\s\S]*?)<\/h2>/);
 let body=h2?html.slice(html.indexOf(h2[0])+h2[0].length):html;
 body=body.replace(/<div class="choice-grid" id="[^"]*"><\/div>/g,"")
          .replace(/<button class="primary" id="complete[^"]*"[^>]*>[\s\S]*?<\/button>/g,"").trim();
 return {
  label:(caseObj.stages||[])[i]||"",
  eyebrow:eb?eb[1]:"",heading:h2?h2[1]:"",body,
  raw:html,locked:/data-hwid/.test(html),hostId,dirty:false,decisionDirty:false,
  origDecision,
  decision:origDecision?{opts:(origDecision.opts||[]).slice(),correct:origDecision.correct,exp:origDecision.exp||""}:null
 };
}

function csModelFromLesson(row){
 const c=(row&&csClone(row.content))||{};
 return {
  id:row?row.id:null,
  original:row?csClone(row):null,
  basic:{
   title:(row&&row.title)||"",slug:(row&&row.slug)||"",summary:(row&&row.summary)||"",
   course_id:(row&&row.course_id)||"",status:(row&&row.status)||"draft",
   requires_signoff:!!(row&&row.requires_signoff),sort_order:row?(row.sort_order||0):0
  },
  header:Object.assign({title:"",eyebrow:"",subtitle:"",askPrompt:"",resourcesTitle:"",resourcesBody:"",resourcesNote:""},c.header||{}),
  overview:Object.assign({eyebrow:"",heading:"",intro:"",objectives:[],connectsForwardTitle:"",connectsForward:""},c.overview||{}),
  modules:(c.modules||[]).map(m=>({
   id:m.id,icon:m.icon||"",title:m.title||"",minutes:m.minutes,content:m.content||"",
   quiz:(m.quiz||[]).map(q=>({q:q.q||"",opts:(q.opts||[]).slice(),correct:q.correct,exp:q.exp||"",extras:csExtras(q,CS_KNOWN_QUIZ)})),
   extras:csExtras(m,CS_KNOWN_MODULE)
  })),
  cases:(c.cases||[]).map(cs=>({
   id:cs.id,title:cs.title||"",species:cs.species||"",patient:cs.patient||"",
   signalment:cs.signalment||"",history:cs.history||"",
   stages:(cs.stages||[]).map((_,i)=>csParseStage(cs,i)),
   extras:csExtras(cs,CS_KNOWN_CASE)
  })),
  stations:(c.stations||[]).map(s=>({icon:s.icon||"",time:s.time||"",title:s.title||"",desc:s.desc||""})),
  skillsLab:Object.assign({heading:""},c.skillsLab||{}),
  checklistItems:(c.checklistItems||[]).map(x=>({t:x.t||"",critical:!!x.critical})),
  certRows:(c.certRows||[]).map(x=>({req:x.req||"",criterion:x.criterion||""})),
  certification:Object.assign({passportTitle:"",certificationTitle:"",attestation:"",signoffBody:"",nextTitle:"",next:""},c.certification||{}),
  extras:csExtras(c,CS_KNOWN_TOP)
 };
}

function csBlankModel(){
 const m=csModelFromLesson(null);
 const preferred=csData.courses.find(c=>c.slug==="patient-assessment")||csData.courses[0];
 m.basic.course_id=preferred?preferred.id:"";
 m.basic.sort_order=csData.lessons.reduce((n,l)=>Math.max(n,l.sort_order||0),0)+1;
 m.overview.eyebrow="Why this matters";
 m.overview.connectsForwardTitle="How this course connects forward";
 m.certRows=csDefaultCertRows();
 m.skillsLab.heading="Rotating stations";
 return m;
}

/* ---------- serialization ---------- */
// Emit only keys the source row already had, plus any the trainer actually filled in.
// Keeps a byte-identical round trip on untouched lessons and avoids writing empty noise on new ones.
function csEmitObj(form,orig){
 const out={};
 Object.keys(form).forEach(k=>{
  const v=form[k];
  const had=orig&&Object.prototype.hasOwnProperty.call(orig,k);
  const empty=v===""||v===null||v===undefined||(Array.isArray(v)&&!v.length);
  if(had||!empty)out[k]=v;
 });
 if(orig)Object.keys(orig).forEach(k=>{if(!(k in form))out[k]=csClone(orig[k])});
 return out;
}

const CS_BTN_RE=/<button class="primary" id="complete[^"]*"[^>]*>[\s\S]*?<\/button>/;
function csStageHtml(cs,s,i,isLast){
 let h;
 if(s.dirty){
  h=(s.eyebrow?`<span class="eyebrow">${s.eyebrow}</span>`:"")+(s.heading?`<h2>${s.heading}</h2>`:"")+(s.body||"");
 }else{
  h=s.raw||"";
 }
 if(s.decision){
  if(!s.hostId)s.hostId=`l2c${cs.id}s${i}`;
  if(h.indexOf(`id="${s.hostId}"`)===-1)h+=`<div class="choice-grid" id="${s.hostId}"></div>`;
 }else{
  h=h.replace(/<div class="choice-grid" id="[^"]*"><\/div>/g,"");
 }
 if(!isLast)h=h.replace(new RegExp(CS_BTN_RE.source,"g"),"");
 else if(!CS_BTN_RE.test(h))h+=`<button class="primary" id="completeL2Case${cs.id}" style="margin-top:16px">Complete case</button>`;
 return h;
}

function csBuildContent(){
 const m=csEd,oc=(m.original&&m.original.content)||{};
 const content={};
 content.header=csEmitObj(m.header,oc.header);
 content.overview=csEmitObj(m.overview,oc.overview);
 content.modules=m.modules.map(mod=>Object.assign({
  id:mod.id,icon:mod.icon,title:mod.title,content:mod.content,
  minutes:Number(mod.minutes)||0,
  quiz:mod.quiz.map(q=>Object.assign({q:q.q,opts:q.opts.slice(),correct:Number(q.correct),exp:q.exp},q.extras))
 },mod.extras));
 content.cases=m.cases.map(cs=>{
  const origCase=(oc.cases||[]).find(x=>x.id===cs.id)||{};
  const last=cs.stages.length-1;
  const contentArr=cs.stages.map((s,i)=>csStageHtml(cs,s,i,i===last));
  const decisions={};
  cs.stages.forEach(s=>{
   if(!s.decision)return;
   decisions[s.hostId]=(!s.decisionDirty&&s.origDecision)?csClone(s.origDecision)
    :{opts:s.decision.opts.slice(),correct:Number(s.decision.correct),exp:s.decision.exp};
  });
  // Safety net: keep any original decision whose host div survived in the emitted HTML.
  const joined=contentArr.join("");
  Object.keys(origCase.decisions||{}).forEach(k=>{
   if(!(k in decisions)&&joined.indexOf(`id="${k}"`)!==-1)decisions[k]=csClone(origCase.decisions[k]);
  });
  return Object.assign({
   id:cs.id,title:cs.title,species:cs.species,patient:cs.patient,
   signalment:cs.signalment,history:cs.history,
   stages:cs.stages.map(s=>s.label),content:contentArr,decisions
  },cs.extras);
 });
 content.stations=m.stations.map(s=>({icon:s.icon,time:s.time,title:s.title,desc:s.desc}));
 content.skillsLab=csEmitObj(m.skillsLab,oc.skillsLab);
 content.checklistItems=m.checklistItems.map(x=>({t:x.t,critical:!!x.critical}));
 content.certRows=m.certRows.map(x=>({req:x.req,criterion:x.criterion}));
 content.certification=csEmitObj(m.certification,oc.certification);
 return Object.assign(content,m.extras);
}

/* ---------- editor shell ---------- */
function csEditLesson(id){
 const row=csData.lessons.find(l=>l.id===id);if(!row)return;
 csEd=csModelFromLesson(row);csEdTab="basic";csEdNotice=null;
 switchView("contentEditor");csRenderEditor();
}
function csNewLesson(){
 csEd=csBlankModel();csEdTab="basic";csEdNotice=null;
 switchView("contentEditor");csRenderEditor();
}

function csRenderEditor(){
 if(!csEd)return;
 $("#csEditorTitle").textContent=csEd.basic.title||"New lesson";
 $("#csEditorEyebrow").textContent=csEd.id?"Content Studio • Editing lesson":"Content Studio • New lesson";
 $("#csEditorSubtitle").textContent=csEd.id?`${csCourseLabel(csEd.basic.course_id)} • ${csEd.basic.status==="published"?"Published":"Draft"}`:"Build a lesson learners will see in the Course Player.";
 $("#pageLabel").textContent="Content Studio";
 $("#csPreviewBtn").style.display=csEd.id?"":"none";
 $("#csTabs").innerHTML=CS_TABS.map(t=>`<button class="chip ${csEdTab===t[0]?"active":""}" data-cs-tab="${t[0]}">${t[1]}</button>`).join("");
 $$("[data-cs-tab]").forEach(b=>b.addEventListener("click",()=>{csEdTab=b.dataset.csTab;csRenderEditor()}));
 const body=$("#csTabBody");
 body.innerHTML=(csEdNotice||"")+csTabHtml();
 csWireEditorBody(body);
}

function csNoticeHtml(errs,warns){
 let h="";
 if(errs&&errs.length)h+=`<div class="cs-errors"><strong>This lesson can't be saved yet:</strong><ul>${errs.map(e=>`<li>${escapeHtml(e)}</li>`).join("")}</ul></div>`;
 if(warns&&warns.length)h+=`<div class="cs-warn"><strong>Worth a look:</strong><ul>${warns.map(e=>`<li>${escapeHtml(e)}</li>`).join("")}</ul></div>`;
 return h;
}

/* ---------- shared field builders ---------- */
function csInput(path,label,value,type){
 return `<label class="cs-field"><span>${label}</span><input type="${type||"text"}" data-p="${path}" value="${escapeHtml(String(value==null?"":value))}"></label>`;
}
function csArea(path,label,value,rows){
 return `<label class="cs-field"><span>${label}</span><textarea rows="${rows||3}" data-p="${path}">${escapeHtml(String(value==null?"":value))}</textarea></label>`;
}
function csRich(id,html){
 return `<div class="cs-rt-toolbar" data-rt-tb="${id}">
  <button type="button" data-cmd="bold" title="Bold"><b>B</b></button>
  <button type="button" data-cmd="italic" title="Italic"><i>I</i></button>
  <button type="button" data-cmd="formatBlock" data-val="h3" title="Heading">H</button>
  <button type="button" data-cmd="insertUnorderedList" title="Bullet list">&bull; List</button>
  <button type="button" data-cmd="insertOrderedList" title="Numbered list">1. List</button>
  <button type="button" data-cmd="createLink" title="Insert link">Link</button>
  <button type="button" data-cmd="removeFormat" title="Clear formatting">Clear</button>
 </div><div class="cs-rt" contenteditable="true" data-rt="${id}">${html||""}</div>`;
}
function csTools(kind,i,len){
 return `<div class="cs-item-tools">
  <button type="button" data-cs-up="${kind}:${i}" ${i===0?"disabled":""} title="Move up">↑</button>
  <button type="button" data-cs-down="${kind}:${i}" ${i===len-1?"disabled":""} title="Move down">↓</button>
  <button type="button" class="cs-danger" data-cs-rm="${kind}:${i}" title="Remove">×</button>
 </div>`;
}

/* ---------- tab bodies ---------- */
function csTabHtml(){
 const m=csEd;
 if(csEdTab==="basic"){
  return `<section class="panel cs-section"><h2>Basic info</h2>
   <p class="cs-help">The slug is the lesson's address in the Course Player. It must be lowercase-kebab-case and unique.</p>
   <div class="cs-inline">
    ${csInput("basic.title","Lesson title",m.basic.title)}
    ${csInput("basic.slug","Slug",m.basic.slug)}
   </div>
   <label class="cs-field"><span>Course</span><select data-p="basic.course_id">${csData.courses.map(c=>`<option value="${c.id}" ${c.id===m.basic.course_id?"selected":""}>${escapeHtml(csCourseLabel(c.id))}</option>`).join("")}</select></label>
   ${csArea("basic.summary","Summary",m.basic.summary,4)}
   <div class="cs-inline">
    <label class="cs-field"><span>Status</span><select data-p="basic.status"><option value="draft" ${m.basic.status==="draft"?"selected":""}>Draft</option><option value="published" ${m.basic.status==="published"?"selected":""}>Published</option></select></label>
    ${csInput("basic.sort_order","Sort order",m.basic.sort_order,"number")}
   </div>
   ${m.id?`<p class="cs-help cs-preview-hint">Before you publish, <button type="button" class="cs-link-btn" id="csInlinePreviewLink">preview this lesson in the learner view</button> so you can double-check it.</p>`:`<p class="cs-help">Save this lesson once to unlock a preview link before publishing.</p>`}
   <label class="cs-field cs-opt-row"><input type="checkbox" data-p="basic.requires_signoff" ${m.basic.requires_signoff?"checked":""} style="width:auto"> <span style="margin:0">Requires facilitator sign-off</span></label>
  </section>`;
 }
 if(csEdTab==="header"){
  return `<section class="panel cs-section"><h2>Header</h2>
   <p class="cs-help">Shown at the top of the lesson and in the Resources panel.</p>
   <div class="cs-inline">${csInput("header.title","Title",m.header.title)}${csInput("header.eyebrow","Eyebrow",m.header.eyebrow)}</div>
   ${csArea("header.subtitle","Subtitle",m.header.subtitle,2)}
   ${csArea("header.askPrompt","Ask Hannah prompt",m.header.askPrompt,2)}
   ${csInput("header.resourcesTitle","Resources title",m.header.resourcesTitle)}
   ${csArea("header.resourcesBody","Resources body",m.header.resourcesBody,4)}
   ${csArea("header.resourcesNote","Resources note",m.header.resourcesNote,2)}
  </section>`;
 }
 if(csEdTab==="overview"){
  return `<section class="panel cs-section"><h2>Overview tab</h2>
   <p class="cs-help">This is the first thing a learner sees when they open the lesson.</p>
   <div class="cs-inline">${csInput("overview.eyebrow","Eyebrow",m.overview.eyebrow)}${csInput("overview.heading","Heading",m.overview.heading)}</div>
   ${csArea("overview.intro","Intro",m.overview.intro,4)}
   <div class="cs-field"><span>Learning objectives</span>
    ${m.overview.objectives.map((o,i)=>`<div class="cs-opt-row"><input type="text" data-p="overview.objectives.${i}" value="${escapeHtml(o)}"><button type="button" data-cs-rm="objective:${i}" title="Remove">×</button></div>`).join("")}
    <button type="button" class="cs-add" data-cs-add="objective">+ Add objective</button>
   </div>
   ${csInput("overview.connectsForwardTitle","Connects-forward title",m.overview.connectsForwardTitle)}
   ${csArea("overview.connectsForward","Connects-forward text",m.overview.connectsForward,3)}
  </section>`;
 }
 if(csEdTab==="modules"){
  return `<section class="panel cs-section"><h2>Modules</h2>
   <p class="cs-help">Each module is a lesson chapter with its own knowledge check.</p>
   ${m.modules.map((mod,i)=>`<div class="cs-item">
    <div class="cs-item-head"><strong>Module ${i+1}</strong>${csTools("module",i,m.modules.length)}</div>
    <div class="cs-inline">${csInput(`modules.${i}.title`,"Title",mod.title)}${csInput(`modules.${i}.icon`,"Icon",mod.icon)}</div>
    ${csInput(`modules.${i}.minutes`,"Minutes",mod.minutes,"number")}
    <div class="cs-field"><span>Module content</span>${csRich(`modules.${i}.content`,mod.content)}</div>
    <div class="cs-nested">
     <div class="cs-item-head"><strong>Knowledge check</strong></div>
     ${mod.quiz.map((q,j)=>`<div class="cs-item">
      <div class="cs-item-head"><strong>Question ${j+1}</strong>${csTools(`quiz:${i}`,j,mod.quiz.length)}</div>
      ${csArea(`modules.${i}.quiz.${j}.q`,"Question",q.q,2)}
      <div class="cs-field"><span>Answer options (select the correct one)</span>
       ${q.opts.map((o,k)=>`<div class="cs-opt-row">
        <input type="text" data-p="modules.${i}.quiz.${j}.opts.${k}" value="${escapeHtml(o)}">
        <label><input type="radio" name="csq-${i}-${j}" data-correct="modules.${i}.quiz.${j}:${k}" ${Number(q.correct)===k?"checked":""}> Correct</label>
        <button type="button" data-cs-rm="quizopt:${i}:${j}:${k}" title="Remove">×</button>
       </div>`).join("")}
       ${q.opts.length<6?`<button type="button" class="cs-add" data-cs-add="quizopt:${i}:${j}">+ Add option</button>`:""}
      </div>
      ${csArea(`modules.${i}.quiz.${j}.exp`,"Explanation",q.exp,2)}
     </div>`).join("")}
     <button type="button" class="cs-add" data-cs-add="quiz:${i}">+ Add question</button>
    </div>
   </div>`).join("")||`<p class="cs-empty">No modules yet.</p>`}
   <button type="button" class="cs-add" data-cs-add="module">+ Add module</button>
  </section>`;
 }
 if(csEdTab==="cases"){
  return `<section class="panel cs-section"><h2>Case studies</h2>
   <p class="cs-help">Stage IDs, decision placeholders and the Complete case button are generated automatically — you never type raw HTML IDs.</p>
   ${m.cases.map((cs,i)=>`<div class="cs-item">
    <div class="cs-item-head"><strong>Case ${i+1}</strong>${csTools("case",i,m.cases.length)}</div>
    <div class="cs-inline">${csInput(`cases.${i}.title`,"Case title",cs.title)}${csInput(`cases.${i}.species`,"Species",cs.species)}</div>
    <div class="cs-inline">${csInput(`cases.${i}.patient`,"Patient name",cs.patient)}${csInput(`cases.${i}.signalment`,"Signalment",cs.signalment)}</div>
    ${csArea(`cases.${i}.history`,"History",cs.history,3)}
    <div class="cs-nested">
     <div class="cs-item-head"><strong>Stages</strong></div>
     ${cs.stages.map((s,j)=>`<div class="cs-item">
      <div class="cs-item-head"><strong>Stage ${j+1}${j===cs.stages.length-1?" • final":""}</strong>${csTools(`stage:${i}`,j,cs.stages.length)}</div>
      ${csInput(`cases.${i}.stages.${j}.label`,"Stage label (navigation)",s.label)}
      ${s.locked?`<div class="cs-locked"><strong>Advanced Hannahware stage.</strong> This stage's body contains a simulation widget, so its layout is locked and saved exactly as-is. You can still edit the stage label and the decision below.</div>`
      :`<div class="cs-inline">${csInput(`cases.${i}.stages.${j}.eyebrow`,"Eyebrow",s.eyebrow)}${csInput(`cases.${i}.stages.${j}.heading`,"Heading",s.heading)}</div>
        <div class="cs-field"><span>Narrative body</span>${csRich(`cases.${i}.stages.${j}.body`,s.body)}</div>`}
      <label class="cs-field cs-opt-row"><input type="checkbox" data-cs-dec="${i}:${j}" ${s.decision?"checked":""} style="width:auto"> <span style="margin:0">This stage includes a decision point</span></label>
      ${s.decision?`<div class="cs-nested">
       <div class="cs-field"><span>Options (select the correct one)</span>
        ${s.decision.opts.map((o,k)=>`<div class="cs-opt-row">
         <input type="text" data-p="cases.${i}.stages.${j}.decision.opts.${k}" data-decdirty="${i}:${j}" value="${escapeHtml(o)}">
         <label><input type="radio" name="csd-${i}-${j}" data-correct="cases.${i}.stages.${j}.decision:${k}" data-decdirty="${i}:${j}" ${Number(s.decision.correct)===k?"checked":""}> Correct</label>
         <button type="button" data-cs-rm="decopt:${i}:${j}:${k}" title="Remove">×</button>
        </div>`).join("")}
        ${s.decision.opts.length<4?`<button type="button" class="cs-add" data-cs-add="decopt:${i}:${j}">+ Add option</button>`:""}
       </div>
       ${csArea(`cases.${i}.stages.${j}.decision.exp`,"Explanation",s.decision.exp,2)}
      </div>`:""}
     </div>`).join("")}
     <button type="button" class="cs-add" data-cs-add="stage:${i}">+ Add stage</button>
    </div>
   </div>`).join("")||`<p class="cs-empty">No case studies yet.</p>`}
   <button type="button" class="cs-add" data-cs-add="case">+ Add case study</button>
  </section>`;
 }
 if(csEdTab==="skillslab"){
  return `<section class="panel cs-section"><h2>Skills Lab</h2>
   ${csInput("skillsLab.heading","Heading",m.skillsLab.heading)}
   <div class="cs-item-head"><strong>Stations</strong></div>
   ${m.stations.map((s,i)=>`<div class="cs-item">
    <div class="cs-item-head"><strong>Station ${i+1}</strong>${csTools("station",i,m.stations.length)}</div>
    <div class="cs-inline">${csInput(`stations.${i}.title`,"Title",s.title)}${csInput(`stations.${i}.time`,"Time",s.time)}</div>
    ${csInput(`stations.${i}.icon`,"Icon",s.icon)}
    ${csArea(`stations.${i}.desc`,"Description",s.desc,3)}
   </div>`).join("")||`<p class="cs-empty">No stations yet.</p>`}
   <button type="button" class="cs-add" data-cs-add="station">+ Add station</button>
   <div class="cs-item-head" style="margin-top:22px"><strong>Checklist items</strong></div>
   <p class="cs-help">Critical items must all be ticked before a learner can request sign-off.</p>
   ${m.checklistItems.map((x,i)=>`<div class="cs-opt-row">
    <input type="text" data-p="checklistItems.${i}.t" value="${escapeHtml(x.t)}">
    <label><input type="checkbox" data-p="checklistItems.${i}.critical" ${x.critical?"checked":""}> Critical</label>
    <button type="button" data-cs-rm="checklist:${i}" title="Remove">×</button>
   </div>`).join("")}
   <button type="button" class="cs-add" data-cs-add="checklist">+ Add checklist item</button>
  </section>`;
 }
 // certification
 return `<section class="panel cs-section"><h2>Certification</h2>
  <div class="cs-inline">${csInput("certification.passportTitle","Passport title",m.certification.passportTitle)}${csInput("certification.certificationTitle","Certification title",m.certification.certificationTitle)}</div>
  ${csArea("certification.attestation","Attestation statement",m.certification.attestation,4)}
  ${csArea("certification.signoffBody","Sign-off body",m.certification.signoffBody,3)}
  ${csInput("certification.nextTitle","What comes next — title",m.certification.nextTitle)}
  ${csArea("certification.next","What comes next — text",m.certification.next,3)}
  <div class="cs-item-head" style="margin-top:22px"><strong>Certification requirements</strong></div>
  <p class="cs-help">Only three rows are tracked automatically: <em>Module knowledge checks</em> (row 2), <em>Skills lab checklist</em> (row 5) and <em>Final attestation</em> (row 6). The other rows are shown to learners as text and always read "In progress".</p>
  ${m.certRows.map((r,i)=>`<div class="cs-item">
   <div class="cs-item-head"><strong>Row ${i+1}${[1,4,5].includes(i)?" • tracked":" • text only"}</strong>${csTools("certrow",i,m.certRows.length)}</div>
   <div class="cs-inline">${csInput(`certRows.${i}.req`,"Requirement",r.req)}${csInput(`certRows.${i}.criterion`,"Criterion",r.criterion)}</div>
  </div>`).join("")}
  <button type="button" class="cs-add" data-cs-add="certrow">+ Add requirement row</button>
 </section>`;
}

/* ---------- editor wiring ---------- */
function csSetPath(path,val){
 const parts=path.split(".");let o=csEd;
 for(let i=0;i<parts.length-1;i++)o=o[parts[i]];
 o[parts[parts.length-1]]=val;
}
function csMarkStageDirty(path){
 const mm=path.match(/^cases\.(\d+)\.stages\.(\d+)\.(eyebrow|heading|body)$/);
 if(mm)csEd.cases[+mm[1]].stages[+mm[2]].dirty=true;
 const dd=path.match(/^cases\.(\d+)\.stages\.(\d+)\.decision\./);
 if(dd)csEd.cases[+dd[1]].stages[+dd[2]].decisionDirty=true;
}

function csWireEditorBody(root){
 root.addEventListener("input",e=>{
  const el=e.target,path=el.dataset.p;
  if(!path)return;
  let v;
  if(el.type==="checkbox")v=el.checked;
  else if(el.type==="number")v=el.value===""?0:Number(el.value);
  else v=el.value;
  csSetPath(path,v);
  csMarkStageDirty(path);
  if(el.dataset.decdirty){const[i,j]=el.dataset.decdirty.split(":").map(Number);csEd.cases[i].stages[j].decisionDirty=true}
 });
 root.addEventListener("change",e=>{
  const el=e.target;
  if(el.dataset.correct){
   const[base,idx]=el.dataset.correct.split(":");
   csSetPath(`${base}.correct`,Number(idx));
   if(el.dataset.decdirty){const[i,j]=el.dataset.decdirty.split(":").map(Number);csEd.cases[i].stages[j].decisionDirty=true}
   return;
  }
  if(el.dataset.csDec!==undefined&&el.type==="checkbox"){
   const[i,j]=el.dataset.csDec.split(":").map(Number);
   const s=csEd.cases[i].stages[j];
   if(el.checked){
    s.decision={opts:["",""],correct:0,exp:""};
    if(!s.hostId)s.hostId=csNewHostId(csEd.cases[i],j);
   }else{s.decision=null}
   s.decisionDirty=true;
   csRenderEditor();
  }
 });
 // Auto-derive the slug from the title until the trainer types their own.
 const titleEl=root.querySelector('[data-p="basic.title"]');
 if(titleEl)titleEl.addEventListener("blur",()=>{
  if(!csEd.id&&!csEd.basic.slug.trim()&&csEd.basic.title.trim()){
   csEd.basic.slug=csUniqueSlug(csSlugify(csEd.basic.title));
   csRenderEditor();
  }
 });
 const inlinePreviewLink=root.querySelector("#csInlinePreviewLink");
 if(inlinePreviewLink)inlinePreviewLink.addEventListener("click",()=>{if(csEd&&csEd.basic&&csEd.basic.slug)csPreview(csEd.basic.slug)});
 csWireRich(root);
 root.querySelectorAll("[data-cs-add]").forEach(b=>b.addEventListener("click",()=>csAdd(b.dataset.csAdd)));
 root.querySelectorAll("[data-cs-rm]").forEach(b=>b.addEventListener("click",()=>csRemove(b.dataset.csRm)));
 root.querySelectorAll("[data-cs-up]").forEach(b=>b.addEventListener("click",()=>csMove(b.dataset.csUp,-1)));
 root.querySelectorAll("[data-cs-down]").forEach(b=>b.addEventListener("click",()=>csMove(b.dataset.csDown,1)));
}

function csWireRich(root){
 root.querySelectorAll("[data-rt-tb]").forEach(tb=>{
  const target=root.querySelector(`[data-rt="${CSS.escape(tb.dataset.rtTb)}"]`);
  if(!target)return;
  tb.querySelectorAll("button").forEach(b=>b.addEventListener("click",ev=>{
   ev.preventDefault();target.focus();
   if(b.dataset.cmd==="createLink"){
    const u=prompt("Link URL");if(!u)return;
    document.execCommand("createLink",false,u);
   }else{
    document.execCommand(b.dataset.cmd,false,b.dataset.val||null);
   }
   csSetPath(target.dataset.rt,target.innerHTML);
   csMarkStageDirty(target.dataset.rt);
  }));
 });
 root.querySelectorAll("[data-rt]").forEach(el=>el.addEventListener("input",()=>{
  csSetPath(el.dataset.rt,el.innerHTML);
  csMarkStageDirty(el.dataset.rt);
 }));
}

function csNewHostId(cs,stageIndex){
 let id=`l2c${cs.id}s${stageIndex}`,n=2;
 const taken=new Set(cs.stages.map(s=>s.hostId).filter(Boolean));
 while(taken.has(id)){id=`l2c${cs.id}s${stageIndex}-${n}`;n++}
 return id;
}
function csNextId(arr){return arr.reduce((n,x)=>Math.max(n,Number(x.id)||0),0)+1}

function csAdd(spec){
 const[kind,a,b]=spec.split(":");
 const m=csEd;
 if(kind==="module")m.modules.push({id:csNextId(m.modules),icon:"\u{1F4D8}",title:"",minutes:10,content:"",quiz:[],extras:{}});
 else if(kind==="quiz")m.modules[+a].quiz.push({q:"",opts:["",""],correct:0,exp:"",extras:{}});
 else if(kind==="quizopt")m.modules[+a].quiz[+b].opts.push("");
 else if(kind==="objective")m.overview.objectives.push("");
 else if(kind==="station")m.stations.push({icon:"\u{1FA7A}",time:"15 min",title:"",desc:""});
 else if(kind==="checklist")m.checklistItems.push({t:"",critical:false});
 else if(kind==="certrow")m.certRows.push({req:"",criterion:""});
 else if(kind==="case")m.cases.push({id:m.cases.length,title:"",species:"",patient:"",signalment:"",history:"",stages:[csNewStage("")],extras:{}});
 else if(kind==="stage")m.cases[+a].stages.push(csNewStage(""));
 else if(kind==="decopt")m.cases[+a].stages[+b].decision.opts.push("");
 if(kind==="decopt"){const[,i,j]=spec.split(":");csEd.cases[+i].stages[+j].decisionDirty=true}
 csRenderEditor();
}
function csNewStage(label){
 return {label:label||"",eyebrow:"",heading:"",body:"",raw:"",locked:false,hostId:null,dirty:true,decisionDirty:false,origDecision:null,decision:null};
}
function csRemove(spec){
 const p=spec.split(":"),kind=p[0],m=csEd;
 if(kind==="module")m.modules.splice(+p[1],1);
 else if(kind==="quiz")m.modules[+p[1]].quiz.splice(+p[2],1);
 else if(kind==="quizopt"){
  const q=m.modules[+p[1]].quiz[+p[2]];q.opts.splice(+p[3],1);
  if(Number(q.correct)>=q.opts.length)q.correct=Math.max(0,q.opts.length-1);
 }
 else if(kind==="objective")m.overview.objectives.splice(+p[1],1);
 else if(kind==="station")m.stations.splice(+p[1],1);
 else if(kind==="checklist")m.checklistItems.splice(+p[1],1);
 else if(kind==="certrow")m.certRows.splice(+p[1],1);
 else if(kind==="case")m.cases.splice(+p[1],1);
 else if(kind==="stage")m.cases[+p[1]].stages.splice(+p[2],1);
 else if(kind==="decopt"){
  const s=m.cases[+p[1]].stages[+p[2]];s.decision.opts.splice(+p[3],1);
  if(Number(s.decision.correct)>=s.decision.opts.length)s.decision.correct=Math.max(0,s.decision.opts.length-1);
  s.decisionDirty=true;
 }
 csRenderEditor();
}
function csMove(spec,dir){
 const p=spec.split(":"),kind=p[0],m=csEd;
 const swap=(arr,i)=>{const j=i+dir;if(j<0||j>=arr.length)return;const t=arr[i];arr[i]=arr[j];arr[j]=t};
 if(kind==="module")swap(m.modules,+p[1]);
 else if(kind==="quiz")swap(m.modules[+p[1]].quiz,+p[2]);
 else if(kind==="case")swap(m.cases,+p[1]);
 else if(kind==="stage")swap(m.cases[+p[1]].stages,+p[2]);
 else if(kind==="station")swap(m.stations,+p[1]);
 else if(kind==="certrow")swap(m.certRows,+p[1]);
 csRenderEditor();
}

/* ---------- validation + save ---------- */
function csValidate(){
 const errs=[],warns=[],m=csEd,b=m.basic;
 if(!String(b.title).trim())errs.push("Lesson title is required.");
 if(!String(b.slug).trim())errs.push("Slug is required.");
 else if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.slug))errs.push('Slug must be lowercase kebab-case, e.g. "ear-examination-otoscopy".');
 else if(csData.lessons.some(l=>l.slug===b.slug&&l.id!==m.id))errs.push(`The slug "${b.slug}" is already used by another lesson.`);
 if(!b.course_id)errs.push("Choose a course for this lesson.");
 if(!m.modules.length)warns.push("This lesson has no modules yet, so learners will see an empty curriculum.");
 m.modules.forEach((mod,i)=>mod.quiz.forEach((q,j)=>{
  const label=`Module ${i+1}, question ${j+1}`;
  if(q.opts.filter(o=>String(o).trim()).length<2)errs.push(`${label} needs at least 2 answer options.`);
  if(!(Number(q.correct)>=0&&Number(q.correct)<q.opts.length))errs.push(`${label} has no correct answer selected.`);
 }));
 m.cases.forEach((cs,i)=>cs.stages.forEach((s,j)=>{
  if(!s.decision)return;
  const label=`Case ${i+1}, stage ${j+1}`;
  if(s.decision.opts.filter(o=>String(o).trim()).length<2)errs.push(`${label} decision needs at least 2 options.`);
  if(!(Number(s.decision.correct)>=0&&Number(s.decision.correct)<s.decision.opts.length))errs.push(`${label} decision has no correct option selected.`);
 }));
 return{errs,warns};
}

async function csSave(){
 if(!csEd)return;
 const{errs,warns}=csValidate();
 if(errs.length){csEdNotice=csNoticeHtml(errs,warns);csRenderEditor();window.scrollTo(0,0);toast("Fix the listed problems before saving");return}
 const b=csEd.basic;
 const payload={
  course_id:b.course_id,slug:b.slug.trim(),title:b.title.trim(),summary:b.summary,
  status:b.status,requires_signoff:!!b.requires_signoff,sort_order:Number(b.sort_order)||0,
  content:csBuildContent()
 };
 const q=csEd.id
  ? sb.from("lessons").update(payload).eq("id",csEd.id).select().single()
  : sb.from("lessons").insert(payload).select().single();
 const{data,error}=await q;
 if(error){csEdNotice=csNoticeHtml([error.message],warns);csRenderEditor();window.scrollTo(0,0);toast("Save failed");return}
 if(window.invalidateLessonCache){window.invalidateLessonCache(data.slug);if(csEd.original&&csEd.original.slug!==data.slug)window.invalidateLessonCache(csEd.original.slug)}
 csEd=csModelFromLesson(data);
 csEdNotice=csNoticeHtml([],warns);
 await csLoadAll();renderContent();renderManager();
 csRenderEditor();
 toast("Lesson saved");
}

/* ---------- view wiring ---------- */
$("#createContentBtn").addEventListener("click",csNewLesson);
$("#csBackBtn").addEventListener("click",()=>{switchView("content");renderContent()});
$("#csSaveBtn").addEventListener("click",csSave);
$("#csPreviewBtn").addEventListener("click",()=>{if(csEd&&csEd.basic.slug)csPreview(csEd.basic.slug)});
$("#csCourseFilter").addEventListener("change",e=>{csFilters.course=e.target.value;renderContent()});
$("#csStatusFilter").addEventListener("change",e=>{csFilters.status=e.target.value;renderContent()});

document.addEventListener("hls:authenticated",async()=>{
 if(!isContentManager())return;
 await csLoadAll();
 renderContent();
 renderManager();
});

renderDashboard();renderCourses();renderAcademies();renderResources();renderDiagnostics();renderCompetencies();renderSimulations();renderManager();renderContent();renderReports();renderAdmin();updateRole();

/* ===== Hannah Medical Academy — Integrated Level 5 Prototype ===== */
(()=>{
const medicalLevels=[
 {n:1,title:'Medical Foundations',desc:'Safety, terminology, anatomy, calculations, communication, and Hannah standards.',progress:0,status:'Available'},
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
 grid.innerHTML=medicalLevels.map(l=>`<article class="level-card ${l.n===10?'current':''} ${l.status==='Locked'?'locked':''}"><div class="section-head"><div class="level-number">${l.n}</div><span class="badge ${l.status==='Complete'?'good':l.status==='Current'?'warning':l.status==='Locked'?'neutral':'warning'}">${l.status}</span></div><h2>${l.title}</h2><p>${l.desc}</p><div class="progress"><span style="width:${l.progress}%"></span></div><div class="card-footer"><strong>${l.progress}%</strong><button class="${l.n===10?'primary':'secondary'} medical-level-open" data-level="${l.n}" ${l.status==='Locked'?'disabled':''}>${l.status==='Complete'?'Review':'Open Lesson'}</button></div></article>`).join('');
 document.querySelectorAll('.medical-level-open').forEach(b=>b.onclick=()=>{const n=+b.dataset.level;if(n===1)window.openCourseHub('medical-foundations','Medical Foundations');else if(n===2)window.openCourseHub('patient-assessment','Patient Assessment');else if(n===5)openLevel5();else if(n===6)openLevel6();else if(n===7||n===9)openLevel7();else if(n>=10)openUpperLevel(n);else openModal(`<span class="eyebrow">Hannah Medical Academy</span><h1 class="modal-title">${medicalLevels[n-1].title}</h1><p>${n===8?'This course is complete and remains available for review.':'This course remains part of the same Medical Academy pathway inside the shared Hannah Learning System.'}</p><button class="primary" onclick="document.querySelector('#modal').close()">Return to pathway</button>`)});
 document.querySelector('#medicalAcademyMetrics').innerHTML=[['12','Courses available'],['31','Lessons completed'],['12','Competencies validated'],['3','Certificates earned']].map(x=>`<div class="metric-card"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
}
function openMedicalAcademy(){renderMedicalAcademy();switchView('medicalAcademy')}
window.openMedicalAcademy=openMedicalAcademy;
function openLevel5(tab){if(tab)l5State.tab=tab;persist();renderLevel5();switchView('level5')}

function renderLevel5(){
 document.querySelectorAll('[data-l5tab]').forEach(b=>b.classList.toggle('active',b.dataset.l5tab===l5State.tab));
 const host=document.querySelector('#level5Content'); if(!host)return;
 if(l5State.tab==='overview') host.innerHTML=`<div class="l5-dashboard-grid"><section class="panel"><span class="eyebrow">Continue learning</span><div class="l5-continue"><div class="patient-avatar">🐕</div><div class="grow"><h2>Bella — Vomiting Labrador</h2><p>Longitudinal Internal Medicine Case • ${l5Stages[l5State.caseStep]}</p><div class="progress"><span style="width:${((l5State.caseStep+1)/l5Stages.length)*100}%"></span></div></div><button class="primary" id="overviewResumeCase">Resume</button></div></section><section class="panel"><span class="eyebrow">Level progress</span><h2>18% complete</h2><div class="progress"><span style="width:18%"></span></div><div class="list-item"><span>Lessons started</span><strong>2 of 12</strong></div><div class="list-item"><span>Cases completed</span><strong>${l5State.completed?'1':'0'} of 12</strong></div><div class="list-item"><span>Competencies ready</span><strong>2</strong></div></section><section class="panel span-2"><div class="section-head"><div><span class="eyebrow">Level 5 learning tools</span><h2>Internal medicine workspace</h2></div></div><div class="l5-tool-grid">${[['Clinical Cases','Follow a patient from presentation through discharge.','cases'],['Virtual Hospital','Move the active patient between connected care areas.','hospital'],['Diagnostics Lab','Review sample CBC, chemistry, trends, and imaging.','diagnostics'],['Competencies','Connect learning evidence to observed performance.','competencies']].map(t=>`<article class="l5-tool"><h3>${t[0]}</h3><p>${t[1]}</p><button class="secondary l5-jump" data-tab="${t[2]}">Open</button></article>`).join('')}</div></section></div>`;
 if(l5State.tab==='curriculum') host.innerHTML=`<div class="l5-course-grid">${l5Courses.map((c,i)=>`<article class="l5-course"><span class="course-num">Lesson ${i+1}</span><h2>${c}</h2><p>${i===0?'Clinical reasoning, disease progression, acute versus chronic illness, and trend recognition.':i===1?'Vomiting, diarrhea, obstruction, pancreatitis, liver disease, and patient monitoring.':'Planned lesson using the same Level 5 case and learning engine.'}</p><span class="badge ${i<2?'good':'neutral'}">${i<2?'Preview available':'Planned'}</span><br><button class="secondary l5-course-open" data-course="${i}">${i===1?'Open Bella case':'Preview lesson'}</button></article>`).join('')}</div>`;
 if(l5State.tab==='cases') host.innerHTML=`<div class="case-library-grid">${l5Cases.map((c,i)=>`<article class="clinical-case"><span class="eyebrow">${c[1]}</span><h2>${c[0]}</h2><p>${c[3]}</p><span class="badge ${i===0?'good':'neutral'}">${c[2]}</span><br><button class="${i===0?'primary':'secondary'} l5-case-open" data-case="${i}">${i===0?'Open case':'View plan'}</button></article>`).join('')}</div>`;
 if(l5State.tab==='hospital') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Connected patient journey</span><h2>Virtual Hannah Hospital</h2><p>Bella's case, notes, and progress follow her between rooms.</p></div></div><div class="hospital-room-grid">${[['Reception','🛎️','Confirm complaint and urgency'],['Exam Room','🩺','History and assessment'],['Laboratory','🔬','CBC, chemistry, and trends'],['Radiology','🩻','Imaging review'],['Treatment','💉','DVM-directed care'],['ICU','❤️','Monitoring and reassessment'],['Pharmacy','💊','Medication education'],['Discharge','📋','Teach-back and follow-up']].map((r,i)=>`<article class="hospital-room" data-room="${r[0]}"><div class="room-icon">${r[1]}</div><h3>${r[0]}</h3><p>${r[2]}</p><button class="secondary">Open activity</button></article>`).join('')}</div></section>`;
 if(l5State.tab==='diagnostics') host.innerHTML=`<section class="panel"><div class="diagnostic-tabs"><button class="chip active" data-l5diag="cbc">CBC</button><button class="chip" data-l5diag="chem">Chemistry</button><button class="chip" data-l5diag="trend">Trend Viewer</button><button class="chip" data-l5diag="image">Radiograph</button></div><div id="l5DiagnosticContent"></div></section>`;
 if(l5State.tab==='competencies') host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>Level 5 validation pathway</h2></div><button class="primary" id="requestL5Validation">Request validation</button></div><div class="competency-head"><span>Competency</span><span>Evidence</span><span>Status</span><span></span><span></span></div>${[['Presents a concise internal medicine case','Bella case presentation','Ready to practice'],['Recognizes meaningful diagnostic trends','Trend viewer','Ready to practice'],['Separates observation from diagnosis','Differential builder','In progress'],['Documents response using objective findings','SOAP note','In progress'],['Uses teach-back at discharge','Discharge simulation','In progress']].map(c=>`<div class="competency-row"><strong>${c[0]}</strong><span>${c[1]}</span><span class="badge warning">${c[2]}</span><span></span><button class="secondary">View</button></div>`).join('')}</section>`;
 wireLevel5();
}
function wireLevel5(){
 document.querySelectorAll('.l5-jump').forEach(b=>b.onclick=()=>{l5State.tab=b.dataset.tab;persist();renderLevel5()});
 document.querySelector('#overviewResumeCase')?.addEventListener('click',openBellaCase);
 document.querySelectorAll('.l5-course-open').forEach(b=>b.onclick=()=>b.dataset.course==='1'?openBellaCase():openModal(`<span class="eyebrow">Level 5 lesson preview</span><h1>${l5Courses[+b.dataset.course]}</h1><p>Lessons, cases, checks, notes, bookmarks, and competency evidence remain connected to the same Hannah Learning System learner record.</p>`));
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
 if(l6State.tab==='overview') host.innerHTML=`<div class="l5-dashboard-grid"><section class="panel"><span class="eyebrow">Continue learning</span><div class="l5-continue"><div class="patient-avatar emergency-avatar">⚕</div><div class="grow"><h2>The Emergency Shift</h2><p>Multi-patient capstone • ${l6Stages[l6State.caseStep]}</p><div class="progress"><span style="width:${((l6State.caseStep+1)/l6Stages.length)*100}%"></span></div></div><button class="primary" id="overviewResumeEmergency">Resume</button></div></section><section class="panel"><span class="eyebrow">Level progress</span><h2>12% complete</h2><div class="progress"><span style="width:12%"></span></div><div class="list-item"><span>Lessons started</span><strong>2 of 12</strong></div><div class="list-item"><span>Simulations completed</span><strong>${l6State.completed?'1':'0'} of 6</strong></div><div class="list-item"><span>Competencies ready</span><strong>2</strong></div></section><section class="panel span-2"><div class="section-head"><div><span class="eyebrow">Level 6 learning tools</span><h2>Emergency command center</h2></div></div><div class="l5-tool-grid">${[['Triage Board','Prioritize arrivals using observable urgency and immediate threats.','triage'],['Crash Cart','Practice readiness checks, roles, and equipment location.','crashcart'],['ICU Monitor','Recognize worsening trends and escalate changes.','icu'],['Emergency Cases','Practice focused stabilization and handoff workflows.','cases']].map(t=>`<article class="l5-tool emergency-tool"><h3>${t[0]}</h3><p>${t[1]}</p><button class="secondary l6-jump" data-tab="${t[2]}">Open</button></article>`).join('')}</div></section></div>`;
 if(l6State.tab==='curriculum') host.innerHTML=`<div class="l5-course-grid">${l6Courses.map((c,i)=>`<article class="l5-course"><span class="course-num">Lesson ${i+1}</span><h2>${c}</h2><p>${i===0?'Emergency mindset, role clarity, closed-loop communication, and maintaining situational awareness.':i===1?'Rapid triage, ABC primary survey, perfusion, mentation, pain, and escalation.':i===11?'Integrated multi-patient emergency shift with prioritization, reassessment, and handoff.':'Planned interactive emergency lesson using Hannah-approved protocols and role boundaries.'}</p><span class="badge ${i<2||i===11?'good':'neutral'}">${i<2||i===11?'Preview available':'Planned'}</span><br><button class="secondary l6-course-open" data-course="${i}">${i===11?'Open capstone':'Preview lesson'}</button></article>`).join('')}</div>`;
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
 document.querySelectorAll('.l6-course-open').forEach(b=>b.onclick=()=>b.dataset.course==='11'?openEmergencyShift():openModal(`<span class="eyebrow">Level 6 lesson preview</span><h1>${l6Courses[+b.dataset.course]}</h1><p>This lesson will use interactive decisions, brief knowledge checks, team-role practice, and competency evidence within the same Hannah Learning System.</p><p class="safety-note"><strong>Clinical governance</strong><span>Detailed protocols, medication guidance, CPR standards, and role permissions require Hannah approval before production.</span></p>`));
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
 openModal(`<span class="eyebrow">Level 9 lesson ${i+1} of 7</span><h1>${c.title}</h1><div class="detail-card"><strong>Why it matters</strong><span>${c.focus}</span></div><h3>Learning objectives</h3><ul>${c.objectives.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Hannah standard workflow</h3><div class="timeline-list">${c.workflow.map((x,n)=>`<div class="timeline-row"><strong>${n+1}</strong><span>${x}</span></div>`).join('')}</div><h3>Interactive decision point</h3><p>${c.check}</p><div class="choice-grid"><button class="case-choice course-check" data-right="true">${c.answer}</button><button class="case-choice course-check">Wait until the end of the shift to resolve it</button></div><p class="safety-note"><strong>Competency evidence</strong><span>Knowledge check, simulation performance, record review, and direct manager or clinician observation.</span></p><button class="primary" id="completeL9Course" data-course="${i}">Mark lesson preview complete</button>`);
 document.querySelectorAll('.course-check').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Correct — safe workflow selected':'Review the Hannah workflow and choose the action that closes the loop')});
 document.querySelector('#completeL9Course')?.addEventListener('click',e=>{l7State.courseProgress[e.target.dataset.course]=100;persistL7();document.querySelector('#modal').close();renderLevel7();toast('Lesson preview completed')});
}
function renderLevel7(){
 document.querySelectorAll('[data-l7tab]').forEach(b=>b.classList.toggle('active',b.dataset.l7tab===l7State.tab));
 const host=document.querySelector('#level7Content');
 const completed=Object.keys(l7State.courseProgress).length;
 if(l7State.tab==='overview') host.innerHTML=`<div class="level-hero surgery-hero"><div><span class="eyebrow light">Level 9 learning path</span><h2>Hospitalized care is a continuous cycle of plan, action, reassessment, and communication.</h2><p>Level 9 connects the Hospitalization Board, treatment plan, timeline, monitoring, nursing documentation, escalation, handoffs, and discharge preparation in one reliable workflow.</p><div class="button-row"><button class="primary" id="overviewResumeSurgery">Open Luna’s hospitalization</button><button class="ghost" data-open-l7="curriculum">View curriculum</button></div></div><div class="readiness-ring"><strong>${Math.round((completed/7)*80+(l7State.completed?20:0))}%</strong><span>Level progress</span></div></div><div class="metric-grid"><article class="metric"><span>Lessons</span><strong>7</strong><small>Hospitalization workflow</small></article><article class="metric"><span>Simulations</span><strong>4</strong><small>High-risk decisions</small></article><article class="metric"><span>Competencies</span><strong>8</strong><small>Manager validation</small></article><article class="metric"><span>Job aids</span><strong>7</strong><small>Point-of-care tools</small></article></div><div class="dashboard-layout"><section class="panel span-2"><span class="eyebrow">Hospitalized-care cycle</span><h2>Keep the patient, plan, timeline, and team synchronized</h2><div class="pathway-strip">${['Assess','Plan','Schedule','Treat','Monitor','Escalate','Handoff','Discharge'].map((x,i)=>`<div><strong>${i+1}</strong><span>${x}</span></div>`).join('')}</div></section><section class="panel"><span class="eyebrow">Current simulation</span><h2>Luna’s Hospitalization</h2><p>Manage a changing inpatient case across two shifts and a discharge transition.</p><button class="primary full" id="overviewResumeSurgery2">Resume</button></section><section class="panel"><span class="eyebrow">Hannah systems</span><h2>Prototype integration</h2><p>Demonstrates how treatment-plan changes update the timeline, tasks, reassessment, handoff, and discharge readiness.</p></section></div>`;
 if(l7State.tab==='curriculum') host.innerHTML=`<div class="course-grid">${l7Courses.map((c,i)=>`<article class="course-card"><div class="course-top"><span class="course-number">${String(i+1).padStart(2,'0')}</span><span class="badge ${l7State.courseProgress[i]?'good':'neutral'}">${l7State.courseProgress[i]?'Complete':'Lesson'}</span></div><h2>${c.title}</h2><p>${c.focus}</p><div class="progress"><span style="width:${l7State.courseProgress[i]||0}%"></span></div><button class="secondary l7-course-open" data-course="${i}">${l7State.courseProgress[i]?'Review':'Open lesson'}</button></article>`).join('')}</div>`;
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
 10:{title:'Member Communication',subtitle:'Clear information. Shared decisions. Compassionate follow-through.',tabs:['Overview','Lessons','Practice Lab','Simulations','Competencies'],courses:[
  {title:'Medical Education',why:'Members make better decisions when medical information is organized, understandable, and connected to their Pet.',objectives:['Explain medical concepts in plain language','Check understanding without judgment','Separate known facts from uncertainty'],foundation:'Use short segments, familiar words, visual support, and teach-back. Avoid jargon or explain it immediately.',workflow:['Confirm what the Member already understands','State the main message first','Explain what is known, suspected, and still being evaluated','Connect information to the Pet and next decision','Ask the Member to explain the plan in their own words'],decision:'The Member nods but cannot describe the plan. What should you do?',answer:'Re-explain the key point in a different way and use teach-back again',job:'Plain-language medical education checklist'},
  {title:'Delivering Diagnostic Recommendations',why:'A recommendation is easier to evaluate when the Member understands the clinical question, value, limits, and next step.',objectives:['Present the clinical question before the test','Explain benefits and limitations','Confirm the decision and document it'],foundation:'Diagnostic conversations should explain what the team is trying to learn, how the result may change care, and what uncertainty may remain.',workflow:['Summarize the current concern','Name the recommended diagnostic and clinical question','Explain how results may affect the plan','Discuss timing, limitations, and alternatives within role','Confirm the Member decision and document'],decision:'The Member asks, “Do we really need this test?”',answer:'Explain the question the test is intended to answer and how the result could change care',job:'Diagnostic recommendation conversation map'},
  {title:'Financial Discussions',why:'Transparent financial conversations reduce surprises while protecting trust and access to informed choices.',objectives:['Discuss cost without judgment','Separate medical recommendation from payment logistics','Escalate financial exceptions appropriately'],foundation:'Use neutral language, confirm what is included, avoid assumptions about affordability, and never promise unapproved discounts or outcomes.',workflow:['Confirm the recommended plan is understood','Review the authorized estimate or financial information','Pause for questions','Discuss approved alternatives only with the appropriate clinician','Confirm authorization, declined items, and next steps'],decision:'A Member says the recommendation is more than expected.',answer:'Acknowledge the concern, review the approved information clearly, and involve the appropriate clinician for medical alternatives',job:'Financial discussion and authorization checklist'},
  {title:'Difficult Conversations',why:'Concerns handled with calm structure can restore trust and reveal what the Member needs most.',objectives:['De-escalate without becoming defensive','Identify the underlying concern','Set a clear next step and owner'],foundation:'Listen first, acknowledge impact, gather facts, avoid speculation, and make realistic commitments.',workflow:['Create space and listen without interruption','Reflect the concern and impact','Clarify facts and desired resolution','State what you can do now and what requires review','Confirm owner, timing, and follow-up'],decision:'A Member is angry and repeats the same concern.',answer:'Acknowledge the impact, summarize the concern, and clarify the specific outcome they are seeking',job:'Difficult-conversation response guide'},
  {title:'End-of-Life Communication',why:'Compassionate, unhurried communication helps families understand options and feel supported during an emotionally difficult time.',objectives:['Use clear and compassionate language','Avoid euphemisms that create confusion','Support choice and privacy without pressure'],foundation:'Follow clinician direction, use the Pet and Member’s preferred names, pause often, and never rush or overstate certainty.',workflow:['Confirm the clinician has explained the medical situation','Ask what the Member understands and needs','Use direct, compassionate language','Explain the process and choices within role','Confirm wishes, privacy needs, and next steps'],decision:'The Member asks whether euthanasia means their Pet will suffer.',answer:'Respond compassionately, explain the process within your role, and involve the clinician for medical details',job:'End-of-life communication and room-readiness guide'},
  {title:'Discharge Instructions',why:'Discharge succeeds only when the Member can carry out the plan and knows what should trigger follow-up.',objectives:['Reconcile instructions with the final plan','Prioritize key home-care actions','Use teach-back and document understanding'],foundation:'Written instructions support—not replace—a structured conversation. Highlight medications, feeding, activity, warning signs, and follow-up.',workflow:['Verify final DVM directions and medication list','Organize instructions by what to do today, later, and if concerned','Demonstrate unfamiliar tasks when needed','Use teach-back for medications and warning signs','Document understanding and unresolved questions'],decision:'The Member says they will read the instructions at home.',answer:'Review the highest-risk instructions now and use teach-back before departure',job:'Discharge excellence checklist'}],
 simulations:[['Explaining an uncertain diagnosis','Educate without overpromising and identify the next decision.'],['Diagnostic recommendation and cost concern','Separate medical value, financial information, and approved alternatives.'],['Difficult service-recovery conversation','Listen, clarify impact, and establish ownership.'],['End-of-life and discharge communication','Use compassionate clarity, privacy, and teach-back.']],competencies:['Uses plain language and teach-back','Presents diagnostic value and limitations','Discusses finances neutrally and accurately','De-escalates and identifies the underlying concern','Uses compassionate end-of-life language','Delivers complete discharge education']},
 11:{title:'Advanced Medicine',subtitle:'Advanced pattern recognition, specialty support, and complex patient coordination.',tabs:['Overview','Lessons','Case Conference','ICU Lab','Competencies'],courses:[
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
 if(s.tab==='Overview')host.innerHTML=`<div class="upper-hero level-${n}-hero"><div><span class="eyebrow light">${d.title} learning path</span><h2>${d.subtitle}</h2><p>Every lesson includes why it matters, measurable objectives, foundational knowledge, the Hannah workflow, an interactive decision, assessment evidence, simulation practice, competency validation, and a job aid.</p><div class="button-row"><button class="primary upper-jump" data-tab="${n===12?'Standards':'Lessons'}">Open curriculum</button><button class="ghost upper-jump" data-tab="Simulations">Practice simulations</button></div></div><div class="readiness-ring"><strong>${pct}%</strong><span>Course progress</span></div></div><div class="metric-grid"><article class="metric"><span>Lessons</span><strong>${d.courses.length}</strong><small>Structured modules</small></article><article class="metric"><span>Simulations</span><strong>${d.simulations.length}</strong><small>Applied practice</small></article><article class="metric"><span>Competencies</span><strong>${d.competencies.length}</strong><small>Objective validation</small></article><article class="metric"><span>Job aids</span><strong>${d.courses.length}</strong><small>Point-of-work support</small></article></div><section class="panel"><span class="eyebrow">Learner framework</span><h2>One consistent lesson experience</h2><div class="framework-grid">${['Why it matters','Learning objectives','Foundational knowledge','Hannah workflow','Clinical demonstration','Interactive decisions','Knowledge check','Simulation','Competency validation','Job aids'].map((x,i)=>`<article><strong>${i+1}</strong><span>${x}</span></article>`).join('')}</div></section>`;
 if(s.tab==='Lessons'||s.tab==='Standards')host.innerHTML=`<div class="upper-course-grid">${d.courses.map((c,i)=>`<article class="upper-course-card"><span class="eyebrow">Lesson ${i+1}</span><h2>${c.title}</h2><p>${c.why}</p><div class="card-footer"><span class="badge ${s.completedCourses.includes(i)?'good':'neutral'}">${s.completedCourses.includes(i)?'Complete':'Ready'}</span><button class="primary upper-course-open" data-level="${n}" data-course="${i}">${s.completedCourses.includes(i)?'Review':'Open lesson'}</button></div></article>`).join('')}</div>`;
 if(s.tab==='Practice Lab'||s.tab==='Case Conference'||s.tab==='Workflow Map')host.innerHTML=renderUpperLab(n);
 if(s.tab==='ICU Lab')host.innerHTML=renderUpperICU();
 if(s.tab==='Quality Audit')host.innerHTML=renderQualityAudit();
 if(s.tab==='Simulations')host.innerHTML=`<div class="upper-course-grid">${d.simulations.map((x,i)=>`<article class="upper-course-card simulation-card"><span class="eyebrow">Simulation ${i+1}</span><h2>${x[0]}</h2><p>${x[1]}</p><div class="card-footer"><span class="badge ${s.completedSimulations.includes(i)?'good':'warning'}">${s.completedSimulations.includes(i)?'Complete':'Interactive'}</span><button class="primary upper-sim-open" data-level="${n}" data-sim="${i}">Launch</button></div></article>`).join('')}</div>`;
 if(s.tab==='Competencies')host.innerHTML=`<section class="panel"><div class="section-head"><div><span class="eyebrow">Competency Passport</span><h2>Observed-performance validation</h2></div><strong>${s.competencies.length} of ${d.competencies.length} ready</strong></div>${d.competencies.map((x,i)=>`<div class="competency-check"><div><strong>${x}</strong><span>Evidence: lesson assessment + simulation + direct observation or record review</span></div><button class="${s.competencies.includes(i)?'secondary':'primary'} upper-comp" data-level="${n}" data-comp="${i}">${s.competencies.includes(i)?'Ready for manager review':'Request validation'}</button></div>`).join('')}</section>`;
 host.querySelectorAll('.upper-jump').forEach(b=>b.onclick=()=>{s.tab=b.dataset.tab;saveUpper();renderUpperLevel(n)});host.querySelectorAll('.upper-course-open').forEach(b=>b.onclick=()=>openUpperCourse(+b.dataset.level,+b.dataset.course));host.querySelectorAll('.upper-sim-open').forEach(b=>b.onclick=()=>openUpperSimulation(+b.dataset.level,+b.dataset.sim));host.querySelectorAll('.upper-comp').forEach(b=>b.onclick=()=>{const i=+b.dataset.comp;if(!s.competencies.includes(i))s.competencies.push(i);saveUpper();renderUpperLevel(n);toast('Competency evidence submitted for manager review')});
 bindUpperLab(n);
}
function openUpperCourse(n,i){const c=upperLevels[n].courses[i],s=upperState[n];openModal(`<span class="eyebrow">${upperLevels[n].title} • Lesson ${i+1}</span><h1 class="modal-title">${c.title}</h1><div class="detail-card"><strong>Why it matters</strong><span>${c.why}</span></div><h3>Learning objectives</h3><ul>${c.objectives.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Foundational knowledge</h3><p>${c.foundation}</p><h3>Hannah standard workflow</h3><div class="timeline-list">${c.workflow.map((x,k)=>`<div class="timeline-row"><strong>${k+1}</strong><span>${x}</span></div>`).join('')}</div><h3>Interactive decision point</h3><p>${c.decision}</p><div class="choice-grid"><button class="case-choice upper-course-choice" data-right="true">${c.answer}</button><button class="case-choice upper-course-choice">Continue without clarifying or documenting</button></div><div class="detail-card"><strong>Knowledge check & simulation evidence</strong><span>Correct decision, rationale, documentation quality, and role-appropriate escalation.</span></div><div class="detail-card"><strong>Job aid</strong><span>${c.job}</span></div><button class="primary" id="completeUpperCourse">Complete lesson</button>`);document.querySelectorAll('.upper-course-choice').forEach(b=>b.onclick=()=>{b.classList.add('selected');toast(b.dataset.right==='true'?'Correct — safe, clear, and role appropriate':'Review the workflow and close the communication or safety loop')});document.querySelector('#completeUpperCourse').onclick=()=>{if(!s.completedCourses.includes(i))s.completedCourses.push(i);saveUpper();document.querySelector('#modal').close();renderUpperLevel(n);toast('Lesson completed and evidence saved')}}
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
  6:{title:"Hannahware Basics",items:["Hannahware navigation","Scheduling and check-in","Medical records and charting","Daily workflow basics"]}
};
const backFromFoundations=document.querySelector('#backFromFoundations');if(backFromFoundations)backFromFoundations.onclick=()=>switchView('academies');
const guide=document.querySelector('#openFoundationsGuide');if(guide)guide.onclick=()=>openModal(`<span class="eyebrow">Foundations Academy</span><h1 class="modal-title">Welcome to Hannah</h1><p>This academy establishes the culture, language, judgment, and professional expectations shared by every Hannah role.</p><div class="detail-card"><strong>Sequence</strong><span>Complete the lessons in order. Lesson completion is followed by manager validation and competency evidence.</span></div><div class="detail-card"><strong>Current build</strong><span>Lessons 1–5 are fully interactive. Lesson 6 is represented as a structured roadmap item in this Version 1.0 package.</span></div>`);
const validation=document.querySelector('#openValidationGuide');if(validation)validation.onclick=()=>openModal(`<span class="eyebrow">Manager validation</span><h1 class="modal-title">Foundations teach-back</h1><div class="list-item"><span>Explain Hannah's mission and why the model exists.</span><span class="badge neutral">Discuss</span></div><div class="list-item"><span>Use the Hannah principles in a realistic decision.</span><span class="badge neutral">Scenario</span></div><div class="list-item"><span>Explain when to answer, verify, or refer.</span><span class="badge neutral">Teach-back</span></div><div class="list-item"><span>Identify the appropriate role or department for common questions.</span><span class="badge neutral">Validate</span></div>`);
document.querySelectorAll('.foundation-preview').forEach(b=>b.onclick=()=>{const d=foundationsCourseDetails[+b.dataset.course];openModal(`<span class="eyebrow">Foundations Academy • Lesson ${b.dataset.course}</span><h1 class="modal-title">${d.title}</h1>${d.items.map((x,i)=>`<div class="list-item"><span>${i+1}. ${x}</span><span class="badge ${b.dataset.course==='2'?'warning':'neutral'}">${b.dataset.course==='2'?'Curriculum ready':'Planned'}</span></div>`).join('')}`)});

renderMedicalAcademy();renderLevel5();renderLevel6();renderLevel7();applyHashRoute();
})();


/* ===== Hannah Medical Academy — Level 2 (Patient Assessment) generic lesson player ===== */
(()=>{
let currentCourse={slug:'patient-assessment',label:'Patient Assessment'};
/* Lessons still in development are not in the database yet; live lessons are loaded from Supabase. */
const plannedLessonsBySlug={
 'patient-assessment':[
  {id:'history',title:'Patient History',desc:'Structured history-taking, Member interview technique, and chart documentation.'},
  {id:'tpr',title:'TPR',desc:'Temperature, pulse, and respiration: technique, normal ranges, and red flags.'},
  {id:'bcs',title:'Body Condition Scoring',desc:'9-point body condition and muscle condition scoring with Member communication.'},
  {id:'pain',title:'Pain Assessment',desc:'Species-specific pain scales, behavioral cues, and escalation criteria.'},
  {id:'hydration',title:'Hydration Assessment',desc:'Skin turgor, mucous membranes, and dehydration percentage estimation.'},
  {id:'neuro',title:'Neurologic Screening',desc:'Cranial nerve checks, gait, proprioception, and reflex screening basics.'},
  {id:'mobility',title:'Mobility Evaluation',desc:'Gait analysis, orthopedic screening, and lameness grading fundamentals.'},
  {id:'ophthalmic',title:'Ophthalmic Basics',desc:'External eye exam, pupillary light reflex, and common abnormality recognition.'},
  {id:'derm',title:'Dermatologic Examination',desc:'Skin and coat exam technique, lesion recognition, and cytology preview.'}
 ]
};
function plannedLessonsFor(slug){return plannedLessonsBySlug[slug]||[]}

/* ---- Hannahware documentation widget (config now travels inside lesson content) ---- */
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

/* ---- Data access ---- */
const lessonCache={};
const lessonStates={};
let courseLessons=[];
let activeSlug=null;

function stateFor(slug){
 if(!lessonStates[slug])lessonStates[slug]={tab:'overview',moduleProgress:{},moduleScores:{},caseId:null,caseStep:0,casesCompleted:[],checklist:{},attested:false,signoff:null,progressRow:null,loaded:false};
 return lessonStates[slug];
}
function activeLesson(){return lessonCache[activeSlug]}
function activeState(){return stateFor(activeSlug)}

async function fetchCourseLessons(){
 const {data:course,error:cErr}=await sb.from('courses').select('id,slug,title').eq('slug',currentCourse.slug).single();
 if(cErr)throw cErr;
 const {data,error}=await sb.from('lessons').select('*').eq('course_id',course.id).eq('status','published').order('sort_order',{ascending:true});
 if(error)throw error;
 courseLessons=data||[];
 courseLessons.forEach(l=>{lessonCache[l.slug]=l});
 return courseLessons;
}
async function fetchLesson(slug){
 if(lessonCache[slug])return lessonCache[slug];
 const {data,error}=await sb.from('lessons').select('*').eq('slug',slug).single();
 if(error)throw error;
 lessonCache[slug]=data;
 return data;
}

function allRequirementsMet(lesson,st){
 const c=lesson.content;
 return c.modules.every(m=>st.moduleProgress[m.id])&&c.cases.every(x=>st.casesCompleted.includes(x.id))&&c.checklistItems.every((it,i)=>!!st.checklist[i]);
}
function lessonPercent(lesson,st){
 const c=lesson.content;
 const parts=[];
 if(c.modules&&c.modules.length)parts.push((Object.values(st.moduleProgress).filter(Boolean).length/c.modules.length)*100);
 if(c.checklistItems&&c.checklistItems.length)parts.push((Object.values(st.checklist).filter(Boolean).length/c.checklistItems.length)*100);
 if(c.cases&&c.cases.length)parts.push((st.casesCompleted.length/c.cases.length)*100);
 if(!parts.length)return 0;
 return Math.round(parts.reduce((a,b)=>a+b,0)/parts.length);
}

async function loadRemoteState(lesson,st){
 const uid=hlsAuth.user?.id; if(!uid)return;
 const {data:prog}=await sb.from('lesson_progress').select('*').eq('user_id',uid).eq('lesson_id',lesson.id).maybeSingle();
 if(prog){
  st.progressRow=prog;
  const detail=prog.detail&&typeof prog.detail==='object'?prog.detail:null;
  if(detail&&(detail.moduleProgress||detail.moduleScores||detail.casesCompleted||detail.checklist)){
   Object.assign(st.moduleProgress,detail.moduleProgress||{});
   Object.assign(st.moduleScores,detail.moduleScores||{});
   (detail.casesCompleted||[]).forEach(id=>{if(!st.casesCompleted.includes(id))st.casesCompleted.push(id)});
   Object.assign(st.checklist,detail.checklist||{});
   if(detail.attested)st.attested=true;
  }else if(prog.status==='completed'){
   // Legacy rows saved before the detail column existed: reconstruct a fully-complete
   // state so previously completed lessons don't regress to "not started".
   lesson.content.modules.forEach(m=>{st.moduleProgress[m.id]=true;if(st.moduleScores[m.id]==null)st.moduleScores[m.id]=prog.quiz_score??100});
   lesson.content.cases.forEach(c=>{if(!st.casesCompleted.includes(c.id))st.casesCompleted.push(c.id)});
   lesson.content.checklistItems.forEach((_,i)=>{st.checklist[i]=true});
  }
 }
 const {data:so}=await sb.from('sign_offs').select('*').eq('user_id',uid).eq('lesson_id',lesson.id).order('requested_at',{ascending:false}).limit(1);
 st.signoff=so&&so.length?so[0]:null;
}
async function saveProgress(lesson,st,opts={}){
 const uid=hlsAuth.user?.id; if(!uid)return;
 const scores=Object.values(st.moduleScores);
 const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
 const done=allRequirementsMet(lesson,st);
 const detail={
  moduleProgress:st.moduleProgress,
  moduleScores:st.moduleScores,
  casesCompleted:st.casesCompleted,
  checklist:st.checklist,
  attested:!!st.attested
 };
 const row={
  user_id:uid,lesson_id:lesson.id,
  status:done?'completed':'in_progress',
  quiz_score:avg,
  quiz_attempts:(st.progressRow?.quiz_attempts||0)+(opts.attempt?1:0),
  completed_at:done?new Date().toISOString():null,
  detail
 };
 const {data,error}=await sb.from('lesson_progress').upsert(row,{onConflict:'user_id,lesson_id'}).select().single();
 if(error){toast('Progress could not be saved');return}
 st.progressRow=data;
}
async function requestSignoff(lesson,st){
 const uid=hlsAuth.user?.id; if(!uid)return null;
 const {data,error}=await sb.from('sign_offs').insert({user_id:uid,lesson_id:lesson.id,status:'pending'}).select().single();
 if(error){toast('Sign-off request could not be submitted');return null}
 st.signoff=data;
 return data;
}

/* ---- Course hub (generic — works for any course slug) ---- */
function paintCourseHubHeader(){
 const set=(sel,txt)=>{const el=document.querySelector(sel);if(el&&txt!=null)el.textContent=txt};
 set('#courseHubEyebrow','Hannah Medical Academy');
 set('#courseHubTitle',currentCourse.label);
 set('#courseHubHeroEyebrow','Course progress');
 set('#backToAcademiesL2','← '+currentCourse.label);
}
async function openCourseHub(slug,label){currentCourse={slug,label};paintCourseHubHeader();switchView('level2Hub');await renderLevel2Hub()}
async function openLevel2Hub(){return openCourseHub('patient-assessment','Patient Assessment')}
async function renderLevel2Hub(){
 const grid=document.querySelector('#level2LessonGrid'); if(!grid)return;
 let lessons=[];
 try{lessons=await fetchCourseLessons()}
 catch(e){grid.innerHTML=`<section class="panel"><span class="eyebrow">${escapeHtml(currentCourse.label)}</span><h2>We couldn't load this course</h2><p>${escapeHtml(e.message||'Unknown error')}</p></section>`;return}
 for(const l of lessons){const st=stateFor(l.slug);if(!st.loaded){st.loaded=true;await loadRemoteState(l,st)}}
 const planned=plannedLessonsFor(currentCourse.slug);
 const tiles=lessons.map(l=>({live:true,slug:l.slug,title:l.title,desc:l.summary||'',pct:lessonPercent(l,stateFor(l.slug))})).concat(planned.map(l=>({live:false,slug:l.id,title:l.title,desc:l.desc,pct:0})));
 const livePct=tiles.filter(t=>t.live).reduce((a,t)=>a+t.pct,0);
 const hubPct=tiles.length?Math.round(livePct/tiles.length):0;
 const ring=document.querySelector('#level2HubProgressRing'); if(ring)ring.innerHTML=`<strong>${hubPct}%</strong><span>Course progress</span>`;
 const heroHeading=document.querySelector('#courseHubHeroHeading');
 const heroBody=document.querySelector('#courseHubHeroBody');
 const desc=document.querySelector('#courseHubDesc');
 if(!lessons.length&&!planned.length){
  if(heroHeading)heroHeading.textContent='This course is being built.';
  if(heroBody)heroBody.textContent='Lessons for this course will appear here once they are published in Content Studio.';
  if(desc)desc.textContent='Lessons for this course join the Hannah Learning System as they are built and clinically reviewed.';
 }else{
  if(heroHeading)heroHeading.textContent=lessons.length?`${lessons[lessons.length-1].title} is live now.`:'New lessons are on the way.';
  if(heroBody)heroBody.textContent=planned.length?`The remaining ${planned.length} ${currentCourse.label} lessons join this course as they're built and clinically reviewed.`:'All published lessons for this course are shown below.';
  if(desc)desc.textContent=`${lessons.length+planned.length} core skills every clinical team member builds in this course.`;
 }
 grid.innerHTML=tiles.map((t,i)=>{
  const n=i+1;
  const badge=t.live?(t.pct>=100?'good':'warning'):'neutral';
  const badgeLabel=t.live?(t.pct>=100?'Complete':t.pct>0?'In progress':'Start here'):'Coming soon';
  const cta=t.live?(t.pct>0?'Continue lesson':'Start lesson'):'Coming soon';
  return `<article class="level-card ${t.live?'':'locked'}" data-lesson="${t.slug}"><div class="section-head"><div class="level-number">${n}</div><span class="badge ${badge}">${badgeLabel}</span></div><h2>${t.title}</h2><p>${t.desc}</p><div class="progress"><span style="width:${t.pct}%"></span></div><div class="card-footer"><strong>${t.pct}%</strong><button class="${t.live?'primary':'secondary'} l2-lesson-open" data-lesson="${t.slug}" data-live="${t.live}" ${t.live?'':'disabled'}>${cta}</button></div></article>`;
 }).join('');
 if(!tiles.length){
  grid.innerHTML=`<section class="panel"><span class="eyebrow">${escapeHtml(currentCourse.label)}</span><h2>No lessons published yet</h2><p>This course doesn't have any published lessons in the Hannah Learning System yet. Check back soon, or ask a manager to publish a lesson in Content Studio.</p></section>`;
 }
 document.querySelectorAll('.l2-lesson-open').forEach(b=>b.onclick=()=>{
  const tile=tiles.find(x=>x.slug===b.dataset.lesson);
  if(tile&&tile.live)renderLessonPlayer(tile.slug,'overview');
  else if(tile)openModal(`<span class="eyebrow">${escapeHtml(currentCourse.label)} • Coming soon</span><h1 class="modal-title">${tile.title}</h1><p>${tile.desc}</p><p class="safety-note"><strong>In development</strong><span>This lesson is planned for ${escapeHtml(currentCourse.label)} and will appear here once built and clinically reviewed.</span></p><button class="primary" onclick="document.querySelector('#modal').close()">Close</button>`);
 });
}
window.openLevel2Hub=openLevel2Hub;
window.openCourseHub=openCourseHub;
window.setCourseContext=(slug,label)=>{currentCourse={slug,label}};

/* ---- Generic lesson player ---- */
async function renderLessonPlayer(lessonSlug,tab){
 activeSlug=lessonSlug;
 const st=stateFor(lessonSlug);
 if(tab)st.tab=tab;
 switchView('level2');
 const host=document.querySelector('#level2Content'); if(!host)return;
 let lesson;
 try{lesson=await fetchLesson(lessonSlug)}
 catch(e){host.innerHTML=`<section class="panel"><span class="eyebrow">Lesson unavailable</span><h2>We couldn't load this lesson</h2><p>${escapeHtml(e.message||'Unknown error')}</p></section>`;return}
 if(!st.loaded){st.loaded=true;await loadRemoteState(lesson,st)}
 paintLesson();
}
window.renderLessonPlayer=renderLessonPlayer;
// Content Studio edits a lesson out from under the player's cache; let it drop stale copies.
window.invalidateLessonCache=slug=>{
 if(slug){delete lessonCache[slug];delete lessonStates[slug]}
 else{Object.keys(lessonCache).forEach(k=>delete lessonCache[k]);Object.keys(lessonStates).forEach(k=>delete lessonStates[k])}
};

function paintLessonHeader(lesson){
 const h=lesson.content.header||{};
 const set=(sel,txt)=>{const el=document.querySelector(sel);if(el&&txt!=null)el.textContent=txt};
 set('#lessonEyebrow',h.eyebrow);
 set('#lessonTitle',h.title||lesson.title);
 set('#lessonSubtitle',h.subtitle||lesson.summary);
 set('#backToAcademiesL2','← '+currentCourse.label);
}

function paintLesson(){
 const lesson=activeLesson(),st=activeState();
 if(!lesson)return;
 const c=lesson.content;
 paintLessonHeader(lesson);
 document.querySelectorAll('[data-l2tab]').forEach(b=>b.classList.toggle('active',b.dataset.l2tab===st.tab));
 const host=document.querySelector('#level2Content'); if(!host)return;
 const pct=lessonPercent(lesson,st);
 const ring=document.querySelector('#l2ProgressRing'); if(ring)ring.innerHTML=`<strong>${pct}%</strong><span>Complete</span>`;

 if(st.tab==='overview'){
  const o=c.overview||{};
  host.innerHTML=`<div class="l5-dashboard-grid">
   <section class="panel span-2">
    <span class="eyebrow">${o.eyebrow||'Why this matters'}</span>
    <h2>${o.heading||''}</h2>
    <p>${o.intro||''}</p>
    <ul class="l2-obj-list">
     ${(o.objectives||[]).map(x=>`<li>${x}</li>`).join('')}
    </ul>
    <p class="safety-note" style="margin-top:16px"><strong>${o.connectsForwardTitle||'How this course connects forward'}</strong><span>${o.connectsForward||''}</span></p>
   </section>
   <section class="panel">
    <span class="eyebrow">Your progress</span>
    <h2>${pct}% complete</h2>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="list-item"><span>Modules complete</span><strong>${Object.values(st.moduleProgress).filter(Boolean).length} of ${c.modules.length}</strong></div>
    <div class="list-item"><span>Case studies complete</span><strong>${st.casesCompleted.length} of ${c.cases.length}</strong></div>
    <div class="list-item"><span>Skills checklist</span><strong>${Object.values(st.checklist).filter(Boolean).length} of ${c.checklistItems.length}</strong></div>
    <div class="card-footer"><button class="primary l2-jump" data-tab="curriculum">Continue curriculum</button></div>
   </section>
  </div>`;
 }
 if(st.tab==='curriculum'){
  host.innerHTML=`<div class="l2-module-grid">${c.modules.map(m=>{
   const done=!!st.moduleProgress[m.id];
   const score=st.moduleScores[m.id];
   return `<article class="l2-module-card"><div class="section-head"><div class="l2-module-num">${m.id}</div><span class="badge ${done?'good':'neutral'}">${done?'Complete':'Not started'}</span></div><h3>${m.title}</h3><p>${m.minutes} min • knowledge check on completion${score!=null?` • scored ${score}%`:''}</p><button class="${done?'secondary':'primary'} l2-open-module" data-module="${m.id}">${done?'Review module':'Open module'}</button></article>`;
  }).join('')}</div>`;
 }
 if(st.tab==='cases'){
  host.innerHTML=`<div class="l2-case-list">${c.cases.map(x=>{
   const done=st.casesCompleted.includes(x.id);
   return `<article class="clinical-case"><span class="eyebrow">${x.species}</span><h2>${x.title}</h2><p>${x.history}</p><span class="badge ${done?'good':'neutral'}">${done?'Completed':'Not started'}</span><br><button class="${done?'secondary':'primary'} l2-open-case" data-case="${x.id}">${done?'Review case':'Open case'}</button></article>`;
  }).join('')}</div>`;
 }
 if(st.tab==='skillslab'){
  const checkedCount=Object.values(st.checklist).filter(Boolean).length;
  host.innerHTML=`<section class="panel">
   <span class="eyebrow">Hands-on skills lab</span><h2>${(c.skillsLab&&c.skillsLab.heading)||'Rotating stations'}</h2>
   <div class="l2-station-grid">${c.stations.map(s=>`<article class="l2-station-card"><div class="l2-station-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p><span class="badge neutral">${s.time}</span></article>`).join('')}</div>
  </section>
  <section class="panel" style="margin-top:18px">
   <div class="section-head"><div><span class="eyebrow">Skills checklist / rubric</span><h2>Facilitator sign-off — ${checkedCount}/${c.checklistItems.length} complete (${Math.round((checkedCount/c.checklistItems.length)*100)}%)</h2></div></div>
   <div class="checklist-grid">${c.checklistItems.map((item,i)=>`<label class="l2-check-row ${st.checklist[i]?'done':''}"><input type="checkbox" data-l2-check="${i}" ${st.checklist[i]?'checked':''}><span>${item.t} ${item.critical?'<span class=\\"badge risk\\">Critical</span>':'<span class=\\"badge neutral\\">Non-critical</span>'}</span></label>`).join('')}</div>
   <p class="safety-note" style="margin-top:14px"><strong>Pass standard</strong><span>All critical items must be marked complete, and no safety-critical item may be missed.</span></p>
  </section>`;
 }
 if(st.tab==='certification'){
  const cert=c.certification||{};
  const scores=Object.values(st.moduleScores);
  const modAvg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  const modulesComplete=c.modules.every(m=>st.moduleProgress[m.id]);
  const moduleReqMet=modulesComplete&&modAvg>=85;
  const criticalDone=c.checklistItems.every((item,i)=>!item.critical||st.checklist[i]);
  const soStatus=st.signoff?.status;
  const signoffLabel=soStatus==='approved'?'Approved ✓':soStatus==='pending'?'Pending facilitator approval':soStatus==='rejected'?'Sign-off rejected — request again':'Request sign-off';
  host.innerHTML=`<section class="panel">
   <div class="section-head"><div><span class="eyebrow">Competency passport</span><h2>${cert.passportTitle||lesson.title}</h2><p>${cert.certificationTitle||''}</p></div><button class="primary" id="requestL2Validation" ${soStatus==='pending'||soStatus==='approved'?'disabled':''}>${signoffLabel}</button></div>
   <div class="l2-cert-table">
    <div class="l2-cert-head"><span>Requirement</span><span>Status</span><span>Passing criterion</span></div>
    ${c.certRows.map((r,i)=>{
      let status='In progress';
      if(i===1)status=moduleReqMet?'Met':modulesComplete?`${modAvg}% avg`:`${Object.keys(st.moduleScores).length}/${c.modules.length} modules`;
      if(i===4)status=criticalDone?'Met':'Incomplete';
      if(i===5)status=st.attested?'Signed':'Not signed';
      const good=status==='Met'||status==='Signed';
      return `<div class="l2-cert-row"><strong>${r.req}</strong><span class="badge ${good?'good':'warning'}">${status}</span><span>${r.criterion}</span></div>`;
    }).join('')}
   </div>
   <label class="l2-check-row ${st.attested?'done':''}" style="margin-top:16px"><input type="checkbox" id="l2AttestCheck" ${st.attested?'checked':''}><span>${cert.attestation||''}</span></label>
   <p class="safety-note" style="margin-top:14px"><strong>${cert.nextTitle||'What comes next in Patient Assessment'}</strong><span>${cert.next||''}</span></p>
  </section>`;
 }
 wireLessonPlayer();
}

function wireLessonPlayer(){
 const lesson=activeLesson(),st=activeState();
 document.querySelectorAll('.l2-jump').forEach(b=>b.onclick=()=>{st.tab=b.dataset.tab;paintLesson()});
 document.querySelectorAll('.l2-open-module').forEach(b=>b.onclick=()=>openLessonModule(+b.dataset.module));
 document.querySelectorAll('.l2-open-case').forEach(b=>b.onclick=()=>openLessonCase(+b.dataset.case));
 document.querySelectorAll('[data-l2-check]').forEach(cb=>cb.onchange=async()=>{
  st.checklist[cb.dataset.l2Check]=cb.checked;
  paintLesson();
  toast(cb.checked?'Checklist item marked complete':'Checklist item unchecked');
  await saveProgress(lesson,st);
 });
 document.querySelector('#l2AttestCheck')?.addEventListener('change',async e=>{
  st.attested=e.target.checked;paintLesson();
  toast(e.target.checked?'Attestation signed':'Attestation removed');
  await saveProgress(lesson,st);
 });
 document.querySelector('#requestL2Validation')?.addEventListener('click',async()=>{
  const cert=lesson.content.certification||{};
  const c2=lesson.content;
  const modulesComplete=c2.modules.every(m=>st.moduleProgress[m.id]);
  const modScores=Object.values(st.moduleScores);
  const modAvgOk=modScores.length&&Math.round(modScores.reduce((a,b)=>a+b,0)/modScores.length)>=85;
  const criticalDone=c2.checklistItems.every((item,i)=>!item.critical||st.checklist[i]);
  if(!modulesComplete||!modAvgOk||!criticalDone||!st.attested){
   openModal(`<span class="eyebrow">Competency validation</span><h1>Request sign-off</h1><p>Complete all six knowledge-check modules (85% average or higher), every critical skills-lab checklist item, and sign the attestation before requesting facilitator sign-off.</p><button class="primary" onclick="document.querySelector('#modal').close()">Close</button>`);
   return;
  }
  const row=await requestSignoff(lesson,st);
  if(!row)return;
  paintLesson();
  openModal(`<span class="eyebrow">Competency validation</span><h1>Request sign-off</h1><p>${cert.signoffBody||''}</p><button class="primary" onclick="document.querySelector('#modal').close()">Submit request</button>`);
  toast('Sign-off requested');
 });
}

/* ---- Module modal with knowledge check ---- */
let activeModule=null, quizAnswers={};
function openLessonModule(id){
 activeModule=activeLesson().content.modules.find(m=>m.id===id);
 quizAnswers={};
 renderModuleModal();
}
function renderModuleModal(){
 const m=activeModule,lesson=activeLesson();
 const answeredCount=Object.keys(quizAnswers).length;
 openModal(`<span class="eyebrow">Module ${m.id} of ${lesson.content.modules.length} • ${m.minutes} min</span>
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
 document.querySelectorAll('#l2QuizContainer .decision-option').forEach(btn=>btn.onclick=()=>answerQuizQuestion(+btn.dataset.qi,+btn.dataset.oi));
 if(m.hwWidget)wireHwWidget(m.hwWidget);
 if(answeredCount===m.quiz.length)renderQuizResult();
}
function answerQuizQuestion(qi,oi){
 const m=activeModule;
 if(quizAnswers[qi])return;
 const q=m.quiz[qi];
 const isCorrect=oi===q.correct;
 quizAnswers[qi]={oi,correct:isCorrect};
 const wrap=document.querySelector(`#l2q-${qi}`);
 wrap.querySelectorAll('.decision-option').forEach((btn,idx)=>{
  btn.disabled=true;
  if(idx===q.correct)btn.classList.add('correct');
  else if(idx===oi)btn.classList.add('wrong');
 });
 document.querySelector(`#l2fb-${qi}`).innerHTML=`<div class="feedback"><p><strong>${isCorrect?'Correct.':'Not quite.'}</strong> ${q.exp}</p></div>`;
 const label=document.querySelector('#l2QuizScoreLabel');
 if(label)label.textContent=`${Object.keys(quizAnswers).length}/${m.quiz.length} answered`;
 if(Object.keys(quizAnswers).length===m.quiz.length)renderQuizResult();
}
async function renderQuizResult(){
 const m=activeModule,lesson=activeLesson(),st=activeState();
 const correctCount=Object.values(quizAnswers).filter(a=>a.correct).length;
 const pct=Math.round((correctCount/m.quiz.length)*100);
 const passed=pct>=75;
 st.moduleScores[m.id]=pct;
 if(passed)st.moduleProgress[m.id]=true;
 document.querySelector('#l2QuizResult').innerHTML=`<div class="feedback-box"><strong>Score: ${pct}%</strong> (${correctCount} of ${m.quiz.length} correct) — ${passed?'Module marked complete.':'Retake recommended (75% needed to mark complete).'}</div>
  <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
   ${!passed?'<button class="secondary" id="l2RetakeQuiz">Retake knowledge check</button>':''}
   <button class="primary" id="l2CloseModuleModal">Return to curriculum</button>
  </div>`;
 document.querySelector('#l2RetakeQuiz')?.addEventListener('click',()=>{quizAnswers={};renderModuleModal()});
 document.querySelector('#l2CloseModuleModal')?.addEventListener('click',()=>{document.querySelector('#modal').close();paintLesson()});
 if(passed)toast(`${m.title} module complete — ${pct}%`);
 await saveProgress(lesson,st,{attempt:true});
}

/* ---- Case runner ---- */
function openLessonCase(id){
 const st=activeState();
 st.caseId=id;st.caseStep=0;
 renderLessonCase();
 switchView('level2CaseRunner');
}
function renderLessonCase(){
 const lesson=activeLesson(),st=activeState();
 const c=lesson.content.cases.find(x=>x.id===st.caseId); if(!c)return;
 document.querySelector('#l2CaseTitle').textContent=c.title;
 document.querySelector('#l2CaseSubtitle').textContent=`${c.species} • ${c.stages[st.caseStep]}`;
 document.querySelector('#l2CaseStepLabel').textContent=c.stages[st.caseStep];
 document.querySelector('#l2CaseProgress').style.width=`${((st.caseStep+1)/c.stages.length)*100}%`;
 document.querySelector('#l2CaseStageNav').innerHTML=c.stages.map((s,i)=>`<button class="${i===st.caseStep?'active':''}" data-l2-case-step="${i}">${i+1}. ${s}</button>`).join('');
 document.querySelector('#l2CasePatientName').textContent=c.patient;
 document.querySelector('#l2CaseSignalment').textContent=c.signalment;
 document.querySelector('#l2CaseHistory').textContent=c.history;
 document.querySelector('#l2CaseStepName').textContent=c.stages[st.caseStep];
 document.querySelector('#l2CaseStageContent').innerHTML=c.content[st.caseStep];
 const hwCfg=c.hwWidgets&&c.hwWidgets[String(st.caseStep)]; if(hwCfg)wireHwWidget(hwCfg);
 document.querySelectorAll('[data-l2-case-step]').forEach(b=>b.onclick=()=>{st.caseStep=+b.dataset.l2CaseStep;renderLessonCase()});
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
 document.querySelector(`#completeL2Case${c.id}`)?.addEventListener('click',async()=>{
  if(!st.casesCompleted.includes(c.id))st.casesCompleted.push(c.id);
  toast(`${c.title} completed`);
  await saveProgress(lesson,st);
  st.tab='cases';
  switchView('level2');
  paintLesson();
 });
}

function askHannahAboutLesson(){
 const prompt=activeLesson()?.content?.header?.askPrompt;
 switchView('ask');
 if(prompt)document.querySelector('#askInput').value=prompt;
}
document.querySelector('#openAskHannahL2')?.addEventListener('click',askHannahAboutLesson);
document.querySelector('#openAskHannahL2Overview')?.addEventListener('click',askHannahAboutLesson);
document.querySelector('#backToAcademiesL2')?.addEventListener('click',()=>openCourseHub(currentCourse.slug,currentCourse.label));
document.querySelector('#backToMedicalAcademyFromL2Hub')?.addEventListener('click',()=>window.openMedicalAcademy());
document.querySelector('#exitLevel2Case')?.addEventListener('click',()=>{activeState().tab='cases';switchView('level2');paintLesson()});
document.querySelector('#level2ResourcesBtn')?.addEventListener('click',()=>{
 const h=activeLesson()?.content?.header||{};
 openModal(`<span class="eyebrow">Level 2 resources</span><h1>${h.resourcesTitle||'Resource library'}</h1><p>${h.resourcesBody||''}</p><p class="safety-note"><strong>Prototype boundary</strong><span>${h.resourcesNote||''}</span></p>`);
});
document.querySelectorAll('[data-l2tab]').forEach(b=>b.onclick=()=>{activeState().tab=b.dataset.l2tab;paintLesson()});

document.addEventListener('hls:authenticated',()=>{renderLevel2Hub()});
})();
