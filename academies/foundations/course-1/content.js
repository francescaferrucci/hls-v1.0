const BOOK_PAGES = [
  {
    "id": "cover",
    "chapter": "Cover",
    "template": "cover",
    "label": "Cover",
    "html": "\n<img class=\"cover-logo\" src=\"assets/hannah-logo-white.png\" alt=\"Hannah Pet Hospital\">\n<p class=\"cover-system\">Hannah Learning System™</p><h1>FOUNDATIONS</h1>\n<p class=\"cover-subtitle\">Learning the “Why” Behind Exceptional Care</p><div class=\"cover-rule\"></div>\n<p class=\"cover-part\">Part I · The Heart of Hannah</p><p class=\"cover-version\">Version 1.0</p>"
  },
  {
    "id": "title-page",
    "chapter": "Front Matter",
    "template": "title",
    "label": "Title page",
    "html": "\n<img class=\"blended-photo blended-hero\" src=\"assets/the-why.jpg\" alt=\"A family photo album representing the relationships at the heart of Hannah\">\n<p class=\"kicker\">Hannah Learning System™</p><h1>FOUNDATIONS</h1><p class=\"lead\">Learning the “Why” Behind Exceptional Care</p>\n<img class=\"hannah-heart-mark\" src=\"assets/hph-favicon.png\" alt=\"Hannah dog, heart, and cat mark\"><p><strong>Part I</strong><br>The Heart of Hannah</p><p class=\"small-note\">Interactive edition · Phase 2</p>"
  },
  {
    "id": "contents",
    "chapter": "Front Matter",
    "template": "contents",
    "label": "Contents",
    "html": "<p class=\"kicker\">Part I</p><h1>Contents</h1><ol class=\"book-contents\"><li><span>Introduction to Part I</span><span>Start</span></li><li data-target=\"chapter-1-opener\"><span>Chapter 1 · Welcome to Hannah</span><span>1</span></li><li data-target=\"chapter-2-opener\"><span>Chapter 2 · The Hannah Story</span><span>2</span></li><li data-target=\"chapter-3-opener\"><span>Chapter 3 · The Hannah Principles</span><span>3</span></li><li data-target=\"chapter-4-opener\"><span>Chapter 4 · What Makes Hannah Different</span><span>4</span></li><li data-target=\"chapter-5-opener\"><span>Chapter 5 · The Hannah Team Member Oath</span><span>5</span></li><li data-target=\"chapter-6-opener\"><span>Chapter 6 · The Hannah Decision Framework™</span><span>6</span></li><li data-target=\"chapter-7-opener\"><span>Chapter 7 · Our Learning Philosophy</span><span>7</span></li><li data-target=\"chapter-8-opener\"><span>Chapter 8 · The Hannah Learning Principles</span><span>8</span></li><li data-target=\"chapter-9-opener\"><span>Chapter 9 · Our Commitment to One Another</span><span>9</span></li><li data-target=\"chapter-10-opener\"><span>Chapter 10 · Before You Begin</span><span>10</span></li></ol><p class=\"small-note\">Select Contents in the toolbar at any time to jump between chapters.</p>"
  },
  {
    "id": "part-opener",
    "chapter": "Introduction to Part I",
    "template": "quote",
    "label": "Part I opener",
    "html": "<img class=\"chapter-icon large-heart\" src=\"assets/hannah-heart.png\" alt=\"Hannah heart\"><p class=\"kicker\">PART I</p><h1>The Heart of Hannah</h1><div class=\"truth-block\"><span>Hannah Truth #1</span><blockquote>Extraordinary veterinary care begins long before a Pet enters an exam room.</blockquote></div>"
  },
  {
    "id": "intro-1",
    "chapter": "Introduction to Part I",
    "template": "prose",
    "label": "Introduction",
    "html": "<img class=\"page-photo\" src=\"assets/petnurse-with-dog.webp\" alt=\"Hannah care and connection\"><p class=\"kicker\">Introduction to Part I</p><h2>Before We Begin</h2><p>Introduction to Part I</p><p>Before learning medicine...</p><p>Before learning communication...</p><p>Before learning leadership...</p><p class=\"emphasis\">We begin by understanding who we are.</p><p>Organizations are often defined by the services they provide.</p><p>We believe they are defined by the purpose that inspires them.</p><p>The Heart of Hannah is not found in a building.</p><p>It is not found in medical equipment.</p><p>It is not found in software or policies.</p>"
  },
  {
    "id": "intro-2",
    "chapter": "Introduction to Part I",
    "template": "prose",
    "label": "Introduction",
    "html": "<p class=\"kicker\">Introduction to Part I</p><h2>People United by Purpose</h2><p class=\"emphasis\">It is found in people.</p><p>People who share a common purpose.</p><p>People who believe every Pet deserves compassionate care.</p><p>People who choose to continue learning, even after years of experience.</p><p>People who support one another because they know great care is never provided alone.</p><p>This section introduces the beliefs that unite us as one organization.</p><p>These beliefs influence every conversation, every recommendation, every decision, and every relationship.</p><p>They remind us why Hannah exists.</p><p>They remind us why our work matters.</p><p>And they remind us that every team member, regardless of title, contributes to something much greater than themselves.</p><p class=\"emphasis\">Welcome to the heart of Hannah.</p>"
  },
  {
    "id": "chapter-1-opener",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "quote",
    "label": "Chapter 1 opener",
    "html": "<p class=\"kicker\">Chapter 1</p><h1>Welcome to Hannah</h1><div class=\"truth-block\"><span>Hannah Truth #2</span><blockquote>Every journey begins with a single decision—the decision to care.</blockquote></div>"
  },
  {
    "id": "ch1-s1",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Welcome",
    "html": "<h2>Welcome</h2><p>Welcome.</p><p>Today marks the beginning of an important journey.</p><p>Whether you are starting your first position in veterinary medicine or bringing years of experience to Hannah, you are joining a community united by a common purpose: improving the lives of Pets and the people who love them.</p><p>Every day, families place extraordinary trust in our hands.</p><p>They celebrate new puppies and kittens with us.</p><p>They seek reassurance during uncertain diagnoses.</p><p>They rely on us during emergencies.</p>"
  },
  {
    "id": "ch1-s2",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Welcome",
    "html": "<p class=\"kicker\">Welcome · continued</p><p>They grieve with us during life's most difficult moments.</p><p>Being entrusted with those experiences is both a privilege and a responsibility.</p><p>We never forget that.</p><p>Our goal is not simply to provide excellent veterinary care.</p><p>Our goal is to build relationships founded on compassion, trust, knowledge, and respect.</p><p>Those relationships begin with people.</p><p>People who choose to listen before speaking.</p>"
  },
  {
    "id": "ch1-s3",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Welcome",
    "html": "<img class=\"blended-photo\" src=\"assets/class-1.png\" alt=\"A Hannah team member caring for a cat\"><p class=\"kicker\">Welcome · continued</p><p>To learn before assuming.</p><p>To help before being asked.</p><p>To grow before becoming comfortable.</p><p>Those people become the heart of Hannah.</p><p class=\"emphasis\">Today, you become part of that story.</p><p>Welcome.</p><p>We're grateful you're here.</p>"
  },
  {
    "id": "ch1-s4",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "A Different Kind of Learning",
    "html": "<h2>A Different Kind of Learning</h2><p>Most organizations teach people what to do.</p><p>Some teach how to do it.</p><p>At Hannah, we believe exceptional organizations also teach why.</p><p>Understanding why transforms tasks into purpose.</p><p>It transforms procedures into patient care.</p><p>It transforms information into knowledge.</p><p>It transforms experience into wisdom.</p>"
  },
  {
    "id": "ch1-s5",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "A Different Kind of Learning",
    "html": "<img class=\"blended-photo\" src=\"assets/class-2.png\" alt=\"A Hannah team member providing medical care\"><p class=\"kicker\">A Different Kind of Learning · continued</p><p>When you understand why an examination is performed...</p><p>Why a diagnostic test is recommended...</p><p>Why a Member feels anxious...</p><p>Why communication matters...</p><p>Why a process exists...</p><p>You become capable of making thoughtful decisions in situations you have never encountered before.</p><p>That is the kind of professional we hope every Hannah team member becomes.</p>"
  },
  {
    "id": "ch1-s6",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "A Different Kind of Learning",
    "html": "<img class=\"blended-photo\" src=\"assets/paw-partner.jpg\" alt=\"A Pet and person connected paw to hand\"><p class=\"kicker\">A Different Kind of Learning · continued</p><p>Not someone who simply follows instructions.</p><p>Someone who understands the purpose behind them.</p>"
  },
  {
    "id": "ch1-s7",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Learning Is an Act of Caring",
    "html": "<h2>Learning Is an Act of Caring</h2><p>We often think of learning as something we do for ourselves.</p><p>At Hannah, we believe learning is something we do for others.</p><p>Every lesson completed has the potential to improve the life of a Pet.</p><p>Every new skill strengthens the trust a Member places in us.</p><p>Every question asked helps another team member grow.</p><p>Every mistake examined creates an opportunity to improve.</p><p>Learning is not separate from patient care.</p>"
  },
  {
    "id": "ch1-s8",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Learning Is an Act of Caring",
    "html": "<img class=\"blended-photo\" src=\"assets/kendra-and-cat-new.png\" alt=\"Kendra caring for a cat\"><p class=\"kicker\">Learning Is an Act of Caring · continued</p><p class=\"emphasis\">Learning is patient care.</p><p>That belief is the foundation of the Hannah Learning System.</p>"
  },
  {
    "id": "ch1-s9",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Why You Matter",
    "html": "<h2>Why You Matter</h2><p>Every role at Hannah contributes to our mission.</p><p>Whether you welcome Members at the front desk...</p><p>Answer a telephone call...</p><p>Prepare an examination room...</p><p>Assist with diagnostics...</p><p>Care for a hospitalized Pet...</p><p>Maintain our facilities...</p>"
  },
  {
    "id": "ch1-s10",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Why You Matter",
    "html": "<p class=\"kicker\">Why You Matter · continued</p><p>Lead a department...</p><p>Support operations behind the scenes...</p><p>Or care directly for our patients...</p><p class=\"emphasis\">You matter.</p><p>No role exists in isolation.</p><p>Every interaction influences someone's experience.</p><p>Every action contributes to the trust families place in Hannah.</p>"
  },
  {
    "id": "ch1-s11",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Why You Matter",
    "html": "<img class=\"blended-photo\" src=\"assets/tlc-horner-new.png\" alt=\"Dr. Horner connecting with a Pet\"><p class=\"kicker\">Why You Matter · continued</p><p>Every team member helps fulfill our mission.</p>"
  },
  {
    "id": "ch1-s12",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>The pages that follow will introduce you to Hannah's history.</p><p>You'll learn how one vision grew into an organization devoted to changing the way veterinary medicine is experienced by Pets and Members.</p><p>You'll discover the principles that guide our decisions.</p><p>The philosophy that shapes our culture.</p><p>The commitments we make to one another.</p><p>And the learning system that will support your professional growth throughout your career.</p><p class=\"emphasis\">This is only the beginning.</p>"
  },
  {
    "id": "ch1-s13",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<img class=\"blended-photo\" src=\"assets/hannah-v-cat.png\" alt=\"A Hannah team member holding a cat\"><p class=\"kicker\">Looking Ahead · continued</p><p>We're excited to begin the journey with you.</p>"
  },
  {
    "id": "ch1-s14",
    "chapter": "Chapter 1 · Welcome to Hannah",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Take a moment before continuing.</p><p>Ask yourself:</p><p>When someone describes me years from now, what do I hope they say about the way I cared for Pets, Members, and my team?</p><p>There is no correct answer.</p><p>Only an honest one.</p><p>Carry that answer with you.</p><p>It will become part of your own Hannah story.</p><label class=\"reflection-label\" for=\"reflection-ch1\">My reflection</label><textarea id=\"reflection-ch1\" data-reflection-key=\"chapter-1\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "chapter-2-opener",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "quote",
    "label": "Chapter 2 opener",
    "html": "<p class=\"kicker\">Chapter 2</p><h1>The Hannah Story</h1><div class=\"truth-block\"><span>Hannah Truth #3</span><blockquote>Every organization has a history. Extraordinary organizations never forget why that history matters.</blockquote></div>"
  },
  {
    "id": "ch2-s1",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Every Great Story Begins with a Question",
    "html": "<img class=\"blended-photo\" src=\"assets/leah-lab.png\" alt=\"A Hannah team member with a Labrador\"><h2>Every Great Story Begins with a Question</h2><p>Every great organization begins with a question.</p><p>Sometimes that question is about building a better product.</p><p>Sometimes it is about improving a service.</p><p>Sometimes it is about solving a problem that others have accepted as unavoidable.</p><p>The story of Hannah begins with a different question.</p><p>What if no family ever had to choose between their Pet's life and what they could afford?</p><p>That simple question challenged decades of traditional thinking about veterinary medicine.</p>"
  },
  {
    "id": "ch2-s2",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Every Great Story Begins with a Question",
    "html": "<p class=\"kicker\">Every Great Story Begins with a Question · continued</p><p>It inspired a vision.</p><p>It became a mission.</p><p>And ultimately, it became Hannah.</p>"
  },
  {
    "id": "ch2-s3",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Veterinarian Who Refused to Accept \"That's Just the Way It Is\"",
    "html": "<h2>A Veterinarian Who Refused to Accept \"That's Just the Way It Is\"</h2><p>The Hannah story begins with Dr. Scott D. Campbell.</p><p>Dr. Campbell has spent his career asking difficult questions and looking for better answers. Early in his career, he helped build one of the world's largest veterinary hospital organizations, where he championed preventive care and helped introduce wellness plans that encouraged families to keep their Pets healthier throughout their lives. Those innovations changed veterinary medicine by making preventive care more accessible and predictable for many families.</p><p>Yet one problem remained.</p><p>Even with wellness plans, many families still faced overwhelming financial decisions when a Pet became sick or injured.</p><p>Preventive care could be planned.</p><p>Emergencies could not.</p><p>Too often, families who deeply loved their Pets found themselves making heartbreaking decisions because the care their Pet needed simply cost more than they could afford.</p>"
  },
  {
    "id": "ch2-s4",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Veterinarian Who Refused to Accept \"That's Just the Way It Is\"",
    "html": "<div class=\"page-text-block\"><p class=\"kicker\">A Veterinarian Who Refused to Accept &quot;That's Just the Way It Is&quot; · continued</p><p>For Dr. Campbell, that wasn't just a business problem.</p><p>It was a human problem.</p><p>And it was a veterinary problem.</p><p>He believed there had to be a better way.</p></div><img class=\"blended-photo image-lower image-contain dr-campbell-fit\" src=\"assets/dr-scott-campbell.jpg\" alt=\"Dr. Scott Campbell\">"
  },
  {
    "id": "ch2-s5",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Looking Beyond Traditional Solutions",
    "html": "<h2>Looking Beyond Traditional Solutions</h2><p>Like many innovators, Dr. Campbell explored existing solutions before trying to create a new one.</p><p>One possibility was Pet insurance.</p><p>The concept seemed promising: families could pay a predictable monthly amount instead of facing unexpected medical bills.</p><p>But as he studied the industry more closely, he discovered significant challenges.</p><p>Because Pets are legally classified as property under existing laws, Pet insurance is regulated as property and casualty insurance rather than health insurance. Those regulations increase administrative costs and often require deductibles, exclusions, coverage limits, and co-pays that can still leave families facing substantial expenses when their Pets need care most.</p><p>Although Pet insurance helps many families, Dr. Campbell believed it did not fully solve the problem he was trying to address.</p><p>He continued searching for another path.</p>"
  },
  {
    "id": "ch2-s6",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "The Woman Behind the Name",
    "html": "<img class=\"blended-photo historic-full\" src=\"assets/hannah-historic-full.png\" alt=\"Hannah with a dog\"><h2>The Woman Behind the Name</h2><p>Before Hannah became a hospital, it was a person.</p><p>Hannah was Dr. Campbell's mother.</p><p>Her given name was Johanna, but everyone who knew and loved her simply called her Hannah.</p><p>She was a nurse by profession.</p><p>But caring was much more than her profession.</p><p>It was who she was.</p><p>She welcomed injured wildlife.</p>"
  },
  {
    "id": "ch2-s7",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "The Woman Behind the Name",
    "html": "<div class=\"word-scroll scroll-left-live\" aria-label=\"Hannah values scroll\"><div class=\"word-scroll-track\"><span>Compassion</span><span class=\"scroll-heart\">♡</span><span>Learning</span><span class=\"scroll-heart\">♡</span><span>Trust</span><span class=\"scroll-heart\">♡</span><span>Growth</span><span class=\"scroll-heart\">♡</span><span>The Hannah Way</span></div></div><p class=\"kicker\">The Woman Behind the Name · continued</p><p>Cared for stray animals.</p><p>Comforted those who were suffering.</p><p>And somehow always found a way to help, even when resources were limited or the outcome seemed uncertain.</p><p>To Hannah, compassion was never selective.</p><p>Every animal deserved kindness.</p><p>Every life deserved dignity.</p><p>Every act of care mattered.</p>"
  },
  {
    "id": "ch2-s8",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "The Woman Behind the Name",
    "html": "<div class=\"word-scroll scroll-right-live\" aria-label=\"Hannah values scroll\"><div class=\"word-scroll-track\"><span>Compassion</span><span class=\"scroll-heart\">♡</span><span>Learning</span><span class=\"scroll-heart\">♡</span><span>Trust</span><span class=\"scroll-heart\">♡</span><span>Growth</span><span class=\"scroll-heart\">♡</span><span>The Hannah Way</span></div></div><p class=\"kicker\">The Woman Behind the Name · continued</p><p>Those lessons shaped her son long before he became a veterinarian.</p><p>Years later, when he founded a new kind of veterinary organization, there was only one name that truly captured the spirit he hoped it would embody.</p><p>He named it Hannah.</p><p>Not simply to honor his mother.</p><p>But to remind every future team member what compassionate care looks like.</p>"
  },
  {
    "id": "ch2-s9",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Different Vision for Veterinary Medicine",
    "html": "<img class=\"blended-photo\" src=\"assets/he2-reception-new.png\" alt=\"Hannah team and family in a hospital reception area\"><h2>A Different Vision for Veterinary Medicine</h2><p>Most veterinary hospitals are designed around individual visits.</p><p>A Pet becomes sick.</p><p>An appointment is scheduled.</p><p>Care is provided.</p><p>An invoice is generated.</p><p>The relationship often centers around a single event.</p><p>Dr. Campbell imagined something different.</p>"
  },
  {
    "id": "ch2-s10",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Different Vision for Veterinary Medicine",
    "html": "<p class=\"kicker\">A Different Vision for Veterinary Medicine · continued</p><p>He envisioned a lifelong partnership.</p><p>A relationship where veterinary teams focus on helping Pets stay healthy instead of waiting for them to become ill.</p><p>A relationship where families know who will care for their Pet throughout its life.</p><p>A relationship built on prevention, education, trust, and continuity.</p><p>Most importantly, he envisioned a model where financial uncertainty would no longer stand between a Pet and the care it needed.</p><p>That vision became the foundation of Hannah.</p>"
  },
  {
    "id": "ch2-s11",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Total Lifetime Care®",
    "html": "<h2>Total Lifetime Care®</h2><p>From that vision came one of Hannah's defining innovations:</p><p>Total Lifetime Care®, often referred to simply as TLC.</p><p>Rather than thinking of veterinary medicine as a series of individual visits, TLC was designed around an entirely different question:</p><p>\"What does this Pet need to live the longest, healthiest, happiest life possible?\"</p><p>The answer extends far beyond annual examinations.</p><p>It includes preventive care.</p><p>Diagnostics.</p>"
  },
  {
    "id": "ch2-s12",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Total Lifetime Care®",
    "html": "<img class=\"blended-photo illustration-contain\" src=\"assets/scott-campbell-new.png\" alt=\"Dr. Scott Campbell\"><p class=\"kicker\">Total Lifetime Care® · continued</p><p>Emergency care.</p><p>Medications.</p><p>Dental health.</p><p>Behavior support and training.</p><p>Education.</p><p>Ongoing relationships.</p><p>Everything working together with one purpose:</p>"
  },
  {
    "id": "ch2-s13",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "Total Lifetime Care®",
    "html": "<img class=\"blended-photo\" src=\"assets/horner-team-new.png\" alt=\"Dr. Horner and the Hannah team caring for a Pet\"><p class=\"kicker\">Total Lifetime Care® · continued</p><p>Helping Pets remain healthy and with the families who love them for as long as possible.</p><p>TLC is more than a membership.</p><p>It is an expression of Hannah's philosophy that great veterinary medicine should be proactive, comprehensive, and centered on lifelong relationships.</p>"
  },
  {
    "id": "ch2-s14",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "More Than Veterinary Care",
    "html": "<h2>More Than Veterinary Care</h2><p>As Hannah continued to grow, one belief remained constant.</p><p>Veterinary medicine is about more than treating disease.</p><p>It is about protecting one of life's most meaningful relationships.</p><p>For many people, a Pet is a best friend.</p><p>A source of comfort.</p><p>A running partner.</p><p>A child's first companion.</p>"
  },
  {
    "id": "ch2-s15",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "More Than Veterinary Care",
    "html": "<p class=\"kicker\">More Than Veterinary Care · continued</p><p>A family member.</p><p>When we improve the life of a Pet, we improve the life of the people who love that Pet as well.</p><p>That belief influences every decision we make.</p><p>It shapes our recommendations.</p><p>It guides our conversations.</p><p>It reminds us why excellence matters.</p><p>Because behind every medical record...</p>"
  },
  {
    "id": "ch2-s16",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "More Than Veterinary Care",
    "html": "<img class=\"blended-photo\" src=\"assets/hannah-family-care-team.jpg\" alt=\"A family and Hannah care team with a Pet\"><p class=\"kicker\">More Than Veterinary Care · continued</p><p>Every appointment...</p><p>Every emergency...</p><p>There is a family placing its trust in us.</p>"
  },
  {
    "id": "ch2-s17",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Mission That Continues to Guide Us",
    "html": "<h2>A Mission That Continues to Guide Us</h2><p>Although Hannah has grown and evolved, the mission remains unchanged:</p><p>To help Pets live the longest, healthiest, happiest life possible with one forever family at a reasonable and sustainable cost.</p><p>That mission is more than a statement.</p><p>It is the standard against which every decision is measured.</p><p>It reminds us that our work is not simply about treating illness.</p><p>It is about improving lives.</p><p>Every recommendation.</p>"
  },
  {
    "id": "ch2-s18",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "A Mission That Continues to Guide Us",
    "html": "<img class=\"blended-photo\" src=\"assets/page-40.png\" alt=\"A Hannah team member and Pet\"><p class=\"kicker\">A Mission That Continues to Guide Us · continued</p><p>Every conversation.</p><p>Every lesson you complete through the Hannah Learning System.</p><p>Every decision you make.</p><p>Should ultimately move us closer to fulfilling that mission.</p>"
  },
  {
    "id": "ch2-s19",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "The Story Is Still Being Written",
    "html": "<h2>The Story Is Still Being Written</h2><p>Many organizations tell their history as though it ended years ago.</p><p>Hannah's story is different.</p><p>It continues every day.</p><p>Every time a frightened Member finds reassurance.</p><p>Every time a Pet receives the care it needs without unnecessary barriers.</p><p>Every time a team member chooses compassion over convenience.</p><p>Every time someone asks,</p>"
  },
  {
    "id": "ch2-s20",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "prose",
    "label": "The Story Is Still Being Written",
    "html": "<img class=\"blended-photo\" src=\"assets/could-be-you.png\" alt=\"A Hannah team member representing the next chapter of the Hannah story\"><p class=\"kicker\">The Story Is Still Being Written · continued</p><p>\"Is there a better way?\"</p><p>The next chapter of Hannah's story has not been written yet.</p><p>It will be written by the people who choose to carry its mission forward.</p><p>Beginning today...</p><p>One of those people is you.</p>"
  },
  {
    "id": "ch2-s21",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>When you think about the story of Hannah, what stands out to you the most?</p><p>Was it the willingness to challenge traditional thinking?</p><p class=\"emphasis\">The commitment to removing barriers to care?</p><p class=\"emphasis\">The compassion that inspired the organization's name?</p><p>Or the belief that Pets deserve the opportunity to live long, healthy lives with the families who love them?</p><p>As you continue your journey at Hannah, consider this question:</p><p>How will my own actions help write the next chapter of the Hannah Story?</p><label class=\"reflection-label\" for=\"reflection-ch2\">My reflection</label><textarea id=\"reflection-ch2\" data-reflection-key=\"chapter-2\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "hannah-story-builder",
    "chapter": "Chapter 2 · The Hannah Story",
    "template": "activity",
    "label": "Build the Hannah Story",
    "html": "<p class=\"kicker\">Interactive Reflection</p><h1>Build the Hannah Story</h1><p>Select each step in the order the story unfolded.</p><div class=\"sequence-activity\" data-sequence=\"question,vision,mission,hannah\"><button data-step=\"question\">Question</button><button data-step=\"vision\">Vision</button><button data-step=\"mission\">Mission</button><button data-step=\"hannah\">Hannah</button></div><p class=\"activity-status\" aria-live=\"polite\">Question → Vision → Mission → Hannah</p><blockquote class=\"activity-reveal\">What if no family ever had to choose between their Pet’s life and what they could afford?</blockquote>"
  },
  {
    "id": "chapter-3-opener",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "quote",
    "label": "Chapter 3 opener",
    "html": "<p class=\"kicker\">Chapter 3</p><h1>The Hannah Principles</h1><div class=\"truth-block\"><span>Hannah Truth #4</span><blockquote>Principles guide our decisions long before policies are needed.</blockquote></div>"
  },
  {
    "id": "ch3-s1",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "More Than Rules",
    "html": "<div class=\"page-text-block\"><h2>More Than Rules</h2><p>Every organization has policies.</p><p>Policies establish expectations.</p><p>Procedures create consistency.</p><p>Standards define quality.</p><p>Those are all important.</p></div><img class=\"blended-photo image-lower image-contain jenny-fit\" src=\"assets/jenny-kissing-dog-new.png\" alt=\"Jenny showing affection to a dog\">"
  },
  {
    "id": "ch3-s2",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "More Than Rules",
    "html": "<p class=\"kicker\">More Than Rules · continued</p><p>But policies cannot anticipate every situation.</p><p>Procedures cannot answer every question.</p><p>No handbook can describe every conversation, every emergency, or every decision you will encounter throughout your career.</p><p>That is why extraordinary organizations are guided by something deeper.</p><p>They are guided by principles.</p><p>Principles are the beliefs that shape our decisions when no policy exists.</p><p>They influence how we solve problems.</p><p>How we treat one another.</p><p>How we care for Pets.</p>"
  },
  {
    "id": "ch3-s3",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "More Than Rules",
    "html": "<div class=\"page-text-block\"><p class=\"kicker\">More Than Rules · continued</p><p>How we serve Members.</p><p>How we lead.</p><p>At Hannah, these principles are not simply words printed on a page.</p><p>They are expectations we strive to live every day.</p><p>They remind us not only what we do, but who we choose to be.</p></div><img class=\"blended-photo image-lower image-contain peace-fit\" src=\"assets/peace-of-mind-new.jpg\" alt=\"A Member with two beloved Pets\">"
  },
  {
    "id": "ch3-s4",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Quality",
    "html": "<h2>Quality</h2><p>\"Excellence is never accidental. It is the result of countless intentional decisions.\"</p><p>Quality means doing the right thing, even when no one is watching.</p><p>It means refusing to accept \"good enough\" when better is possible.</p><p>For us, quality is not limited to medical care.</p><p>Quality is found in every interaction.</p><p>It is answering the telephone with warmth.</p><p>Preparing an examination room before a Member arrives.</p>"
  },
  {
    "id": "ch3-s5",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Quality",
    "html": "<p class=\"kicker\">Quality · continued</p><p>Taking the extra moment to explain a treatment plan.</p><p>Double-checking medications before they are dispensed.</p><p>Helping a team member who feels overwhelmed.</p><p>Following through on a commitment.</p><p>Small actions performed consistently create extraordinary experiences.</p><p>Quality is not perfection.</p><p>It is the continuous pursuit of excellence.</p>"
  },
  {
    "id": "ch3-s6",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Freedom",
    "html": "<h2>Freedom</h2><p>\"Freedom is created through responsibility.\"</p><p>At Hannah, freedom means having the ability to make thoughtful decisions in the best interest of Pets, Members, and the organization.</p><p>That kind of freedom requires knowledge.</p><p>It requires trust.</p><p>It requires accountability.</p><p>As your understanding grows, so does your ability to make independent decisions with confidence.</p><p>We do not want team members who simply wait for instructions.</p>"
  },
  {
    "id": "ch3-s7",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Freedom",
    "html": "<img class=\"blended-photo\" src=\"assets/hannah-m-clean.png\" alt=\"A Hannah team member with a Pet\"><p class=\"kicker\">Freedom · continued</p><p>We want professionals who understand our mission well enough to make good decisions even when circumstances change.</p><p>Freedom is earned through competence, judgment, and integrity.</p>"
  },
  {
    "id": "ch3-s8",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Mutuality",
    "html": "<h2>Mutuality</h2><p>\"We succeed together, or we do not succeed at all.\"</p><p>Every relationship at Hannah should create value for everyone involved.</p><p>When Pets are healthier...</p><p>Members benefit.</p><p>When Members trust us...</p><p>Our team can provide better care.</p><p>When team members support one another...</p>"
  },
  {
    "id": "ch3-s9",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Mutuality",
    "html": "<p class=\"kicker\">Mutuality · continued</p><p>Patients receive better outcomes.</p><p>When Hannah succeeds...</p><p>New opportunities are created for everyone.</p><p>Mutuality reminds us that success is never achieved alone.</p><p>Every decision should strengthen the relationships that make our mission possible.</p>"
  },
  {
    "id": "ch3-s10",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Growth",
    "html": "<h2>Growth</h2><p>\"Learning is one of the greatest expressions of caring.\"</p><p>Growth is not optional at Hannah.</p><p>It is part of our culture.</p><p>Veterinary medicine continues to evolve.</p><p>Technology advances.</p><p>Medical knowledge expands.</p><p>Member expectations change.</p>"
  },
  {
    "id": "ch3-s11",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Growth",
    "html": "<p class=\"kicker\">Growth · continued</p><p>The professionals who provide exceptional care tomorrow are the ones who continue learning today.</p><p>Growth is measured not only by new skills.</p><p>It is reflected in greater compassion.</p><p>Better communication.</p><p>Improved judgment.</p><p>Stronger leadership.</p><p>Greater confidence.</p>"
  },
  {
    "id": "ch3-s12",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Growth",
    "html": "<img class=\"blended-photo\" src=\"assets/misa.png\" alt=\"A Hannah team member caring for a dog\"><p class=\"kicker\">Growth · continued</p><p>Every lesson completed is another step toward becoming the professional you aspire to be.</p>"
  },
  {
    "id": "ch3-s13",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Efficiency",
    "html": "<h2>Efficiency</h2><p>\"Efficiency allows us to spend more time where it matters most.\"</p><p>Efficiency is often misunderstood.</p><p>It does not mean rushing.</p><p>It does not mean sacrificing quality.</p><p>It means eliminating unnecessary obstacles so that our time and energy remain focused on caring for Pets and supporting Members.</p><p>An organized treatment area.</p><p>Clear communication.</p>"
  },
  {
    "id": "ch3-s14",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Efficiency",
    "html": "<p class=\"kicker\">Efficiency · continued</p><p>Well-designed workflows.</p><p>Preparation before appointments.</p><p>Effective teamwork.</p><p>These are all expressions of efficiency.</p><p>When we work efficiently, we create more opportunities to provide compassionate care.</p>"
  },
  {
    "id": "ch3-s15",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Responsibility",
    "html": "<h2>Responsibility</h2><p>\"Leadership begins with ownership.\"</p><p>Every team member has responsibilities.</p><p>But responsibility means more than completing assigned tasks.</p><p>It means taking ownership.</p><p>Owning your decisions.</p><p>Owning your growth.</p><p>Owning your mistakes.</p>"
  },
  {
    "id": "ch3-s16",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Responsibility",
    "html": "<p class=\"kicker\">Responsibility · continued</p><p>Owning your successes.</p><p>When something goes well, celebrate together.</p><p>When something can be improved, learn together.</p><p>Responsibility creates trust.</p><p>Trust creates confidence.</p><p>Confidence allows us to continue growing.</p><p>Every great organization depends upon individuals who choose responsibility before recognition.</p>"
  },
  {
    "id": "ch3-s17",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Living the Principles",
    "html": "<h2>Living the Principles</h2><p>The Hannah Principles are not independent ideas.</p><p>They work together.</p><p>Quality without Growth eventually becomes outdated.</p><p>Growth without Responsibility lacks direction.</p><p>Freedom without Mutuality becomes self-serving.</p><p>Efficiency without Quality loses its purpose.</p><p>Together, these principles create the culture we strive to build every day.</p>"
  },
  {
    "id": "ch3-s18",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Living the Principles",
    "html": "<img class=\"blended-photo\" src=\"assets/blair.jpg\" alt=\"A Hannah team member\"><p class=\"kicker\">Living the Principles · continued</p><p>As you continue your journey through the Hannah Learning System, you will see these principles reflected throughout every Academy, every lesson, every conversation, and every decision.</p><p>They are woven into the fabric of Hannah.</p><p>They define not only how we work.</p><p>They define who we aspire to become.</p>"
  },
  {
    "id": "ch3-s19",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about the six Hannah Principles:</p><label class=\"reflection-label\" for=\"reflection-ch3\">My reflection</label><textarea id=\"reflection-ch3\" data-reflection-key=\"chapter-3\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch3-s25",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "prose",
    "label": "Responsibility",
    "html": "<h2>Responsibility</h2><p class=\"emphasis\">Which principle comes most naturally to you?</p><p class=\"emphasis\">Which one challenges you the most?</p><p>Growth begins with honest reflection.</p><p>As you begin your journey at Hannah, choose one principle you would like to strengthen over the coming year.</p><p>Then ask yourself:</p><p>\"What is one action I can take today that reflects this principle?\"</p><p>Every journey toward excellence begins with a single intentional step.</p>"
  },
  {
    "id": "principles-wheel",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "visual",
    "label": "Hannah Principles visual",
    "html": "<p class=\"kicker\">Signature Visual</p><h1>The Hannah Principles</h1><div class=\"principles-wheel\"><div class=\"wheel-center\">The Hannah Way</div><button type=\"button\" data-detail=\"Quality means the continuous pursuit of excellence.\">Quality</button><button type=\"button\" data-detail=\"Freedom grows through knowledge, trust, and responsibility.\">Freedom</button><button type=\"button\" data-detail=\"Mutuality means creating value for Pets, Members, the Team, and Hannah.\">Mutuality</button><button type=\"button\" data-detail=\"Growth keeps our care, judgment, and leadership moving forward.\">Growth</button><button type=\"button\" data-detail=\"Efficiency removes obstacles so more time remains for care.\">Efficiency</button><button type=\"button\" data-detail=\"Responsibility means owning our actions, decisions, and development.\">Responsibility</button></div><p id=\"principleDetail\" class=\"viz-caption\">Select a principle to explore it.</p>"
  },
  {
    "id": "principle-compass",
    "chapter": "Chapter 3 · The Hannah Principles",
    "template": "activity",
    "label": "My Principle Compass",
    "html": "<p class=\"kicker\">Personal Reflection</p><h1>My Principle Compass</h1><p>Which principle comes most naturally to you? Which one would you like to strengthen?</p><div class=\"choice-grid principle-choice\" data-storage-group=\"principle-compass\"><fieldset><legend>Comes most naturally</legend><label><input type=\"radio\" name=\"natural\" value=\"Quality\"> Quality</label><label><input type=\"radio\" name=\"natural\" value=\"Freedom\"> Freedom</label><label><input type=\"radio\" name=\"natural\" value=\"Mutuality\"> Mutuality</label><label><input type=\"radio\" name=\"natural\" value=\"Growth\"> Growth</label><label><input type=\"radio\" name=\"natural\" value=\"Efficiency\"> Efficiency</label><label><input type=\"radio\" name=\"natural\" value=\"Responsibility\"> Responsibility</label></fieldset><fieldset><legend>I want to strengthen</legend><label><input type=\"radio\" name=\"strengthen\" value=\"Quality\"> Quality</label><label><input type=\"radio\" name=\"strengthen\" value=\"Freedom\"> Freedom</label><label><input type=\"radio\" name=\"strengthen\" value=\"Mutuality\"> Mutuality</label><label><input type=\"radio\" name=\"strengthen\" value=\"Growth\"> Growth</label><label><input type=\"radio\" name=\"strengthen\" value=\"Efficiency\"> Efficiency</label><label><input type=\"radio\" name=\"strengthen\" value=\"Responsibility\"> Responsibility</label></fieldset></div><label class=\"reflection-label\" for=\"principleAction\">What is one action I can take today that reflects this principle?</label><textarea id=\"principleAction\" data-reflection-key=\"principle-action\" rows=\"4\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\"></span></div>"
  },
  {
    "id": "chapter-4-opener",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "quote",
    "label": "Chapter 4 opener",
    "html": "<p class=\"kicker\">Chapter 4</p><h1>What Makes Hannah Different</h1><div class=\"truth-block\"><span>Hannah Truth #5</span><blockquote>We don't measure success by the number of visits we provide—we measure it by the lives we improve.</blockquote></div>"
  },
  {
    "id": "ch4-s1",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "More Than a Veterinary Hospital",
    "html": "<h2>More Than a Veterinary Hospital</h2><p>Every veterinary hospital shares a common purpose: helping animals live healthier lives.</p><p>At Hannah, we share that same purpose.</p><p>We admire the dedication, compassion, and expertise of veterinary professionals everywhere. Every member of this profession chooses a career centered on caring for animals, and that commitment deserves respect.</p><p>What makes Hannah different is not that we care more.</p><p>It is how we choose to care.</p><p>From the very beginning, Hannah was built on a simple belief:</p><p>The best veterinary care is proactive, lifelong, and relationship-driven.</p>"
  },
  {
    "id": "ch4-s2",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "More Than a Veterinary Hospital",
    "html": "<p class=\"kicker\">More Than a Veterinary Hospital · continued</p><p>That belief influences every decision we make—from how we welcome a new Member to how we care for a senior Pet in the final stages of life.</p><p>Our goal has never been simply to treat illness.</p><p>Our goal is to help Pets live longer, healthier, happier lives while supporting the people who love them.</p>"
  },
  {
    "id": "ch4-s3",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Build Relationships, Not Transactions",
    "html": "<h2>We Build Relationships, Not Transactions</h2><p>Many businesses measure success one interaction at a time.</p><p>At Hannah, we think much further ahead.</p><p>When a Member walks through our doors, we are not asking,</p><p>\"How can we help today?\"</p><p>We are also asking,</p><p>\"How can we help this family for years to come?\"</p><p>Every appointment is one chapter in a much larger story.</p>"
  },
  {
    "id": "ch4-s4",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Build Relationships, Not Transactions",
    "html": "<img class=\"blended-photo\" src=\"assets/photo-3772.jpg\" alt=\"A Hannah team member building a relationship with a Pet\"><p class=\"kicker\">We Build Relationships, Not Transactions · continued</p><p>Every wellness visit creates opportunities to prevent disease.</p><p>Every conversation builds trust.</p><p>Every follow-up demonstrates that we remember, we care, and we are invested in the journey.</p><p>The strongest relationships are built over time.</p><p>That is why we don't see Members as customers.</p><p>We see them as partners in their Pet's lifelong care.</p>"
  },
  {
    "id": "ch4-s5",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Focus on Prevention, Not Just Treatment",
    "html": "<h2>We Focus on Prevention, Not Just Treatment</h2><p>Treating illness is one of the most important things we do.</p><p>Preventing illness is even better.</p><p>Preventive care protects Pets before problems become emergencies.</p><p>It allows us to identify changes earlier, begin treatment sooner, reduce discomfort, and improve long-term outcomes.</p><p>That philosophy extends beyond vaccines and routine examinations.</p><p>It includes nutrition.</p><p>Dental health.</p>"
  },
  {
    "id": "ch4-s6",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Focus on Prevention, Not Just Treatment",
    "html": "<p class=\"kicker\">We Focus on Prevention, Not Just Treatment · continued</p><p>Behavior.</p><p>Weight management.</p><p>Diagnostic screening.</p><p>Chronic disease monitoring.</p><p>Pain management.</p><p>Education.</p><p>Every recommendation we make should help improve a Pet's quality of life—not just today, but tomorrow, next year, and throughout every stage of life.</p>"
  },
  {
    "id": "ch4-s7",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p><h2>The Best Emergency Is the One That Never Happens</h2><p>One of the greatest successes in veterinary medicine is often invisible.</p><p>It's the emergency that never occurred because disease was detected early.</p><p>It's the surgery that wasn't needed because preventive care caught a problem before it progressed.</p><p>It's the Pet that enjoys more active years because a family understood the importance of nutrition, dental care, weight management, or routine monitoring.</p><p>These moments rarely make headlines, but they represent the quiet victories of proactive medicine.</p><p>At Hannah, we celebrate those victories just as much as the dramatic ones.</p>"
  },
  {
    "id": "ch4-s9",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Every Role Matters",
    "html": "<h2>Every Role Matters</h2><p>One of the greatest misconceptions in healthcare is that only medical professionals improve patient outcomes.</p><p>At Hannah, we know better.</p><p>A warm greeting can ease a Member's anxiety.</p><p>A clean exam room creates confidence before the appointment even begins.</p><p>A thoughtful phone conversation helps someone feel heard.</p><p>An accurate invoice builds trust.</p><p>A well-organized treatment area helps the medical team work more efficiently.</p>"
  },
  {
    "id": "ch4-s10",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Every Role Matters",
    "html": "<img class=\"blended-photo\" src=\"assets/brand-anthem-19.jpg\" alt=\"Dr. Brown and a Member caring for a German Shepherd\"><p class=\"kicker\">Every Role Matters · continued</p><p>Every interaction shapes the Member's experience.</p><p>Every role contributes to a Pet's care.</p><p>Whether you work at the front desk, in nursing, in diagnostics, in leadership, or behind the scenes, your work matters because it supports the mission we all share.</p><p>No contribution is too small.</p>"
  },
  {
    "id": "ch4-s11",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Care for People, Too",
    "html": "<h2>We Care for People, Too</h2><p>Every Pet has a person—or often an entire family—who loves them deeply.</p><p>When someone entrusts us with their Pet, they are also placing their emotions, hopes, and fears in our hands.</p><p>Sometimes they are excited.</p><p>Sometimes they are worried.</p><p>Sometimes they are grieving.</p><p>Our responsibility extends beyond medical expertise.</p><p>We communicate with kindness.</p>"
  },
  {
    "id": "ch4-s12",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Care for People, Too",
    "html": "<p class=\"kicker\">We Care for People, Too · continued</p><p>We listen with empathy.</p><p>We explain with patience.</p><p>We celebrate joyful moments together.</p><p>We remain present during difficult ones.</p><p>Compassion is not separate from exceptional veterinary medicine.</p><p>It is an essential part of it.</p>"
  },
  {
    "id": "ch4-s13",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Never Stop Learning",
    "html": "<img class=\"blended-photo wide-feature\" src=\"assets/cat-in-library-new.jpg\" alt=\"A curious kitten peeking from a library shelf\"><h2>We Never Stop Learning</h2><p>Veterinary medicine evolves every day.</p><p>New research.</p><p>New treatments.</p><p>New technologies.</p><p>New ways to improve patient care.</p><p>Learning is not something we complete during orientation.</p><p>It becomes part of our professional identity.</p>"
  },
  {
    "id": "ch4-s14",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "We Never Stop Learning",
    "html": "<img class=\"blended-photo\" src=\"assets/become-a-member-new.jpg\" alt=\"A Hannah representative guiding a prospective Member\"><p class=\"kicker\">We Never Stop Learning · continued</p><p>We ask questions.</p><p>We seek feedback.</p><p>We challenge ourselves.</p><p>We remain curious.</p><p>Most importantly, we share what we learn so the entire team grows stronger together.</p><p>Knowledge becomes even more valuable when it is shared generously.</p>"
  },
  {
    "id": "ch4-s15",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<img class=\"blended-photo wide-feature\" src=\"assets/hannah-way-new.png\" alt=\"Hannah Way street sign\"><h2>The Hannah Way</h2><p>A Member calls because their senior dog \"just isn't acting like himself.\"</p><p>The appointment is scheduled promptly.</p><p>The Member Advocate listens carefully and reassures the family.</p><p>The PetNurse notices subtle changes during the intake and communicates those observations to the DVM.</p>"
  },
  {
    "id": "ch4-s16",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>Diagnostic testing identifies an early-stage medical condition before it becomes a crisis.</p><p>The team explains the diagnosis in understandable language, develops a treatment plan with the Member, and schedules follow-up monitoring.</p><p>Weeks later, the Pet is feeling better, and the Member expresses gratitude—not only because their Pet received excellent medical care, but because they felt supported throughout the entire process.</p><p>No single person created that outcome.</p><p>The entire team did.</p><p class=\"emphasis\">That is the Hannah Way.</p>"
  },
  {
    "id": "ch4-s17",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Different by Design",
    "html": "<h2>Different by Design</h2><p>Hannah was never intended to follow the traditional model of veterinary care.</p><p>It was designed to remove barriers, encourage preventive medicine, strengthen lifelong relationships, and create a culture where learning never stops.</p><p>Those ideas continue to shape every decision we make.</p><p>As Hannah grows, our technology will evolve.</p><p>Our facilities will change.</p><p>Our services will expand.</p><p>But these foundational beliefs should never change.</p><p class=\"emphasis\">They define who we are.</p>"
  },
  {
    "id": "ch4-s19",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about a time when someone made you feel genuinely cared for.</p><p class=\"emphasis\">What did they do?</p><p class=\"emphasis\">How did they make you feel?</p><p>Now consider how you can create that same experience for a Member or teammate.</p><p>Sometimes the smallest acts of kindness become the moments people remember most.</p><label class=\"reflection-label\" for=\"reflection-ch4\">My reflection</label><textarea id=\"reflection-ch4\" data-reflection-key=\"chapter-4\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch4-s20",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>During your next shift, look for one opportunity to strengthen a relationship rather than simply complete a task.</p><p>Perhaps it's remembering a Pet's name before looking at the chart.</p><p>Calling a Member when you said you would.</p><p>Helping a teammate without being asked.</p><p>Taking an extra minute to answer a question with patience and compassion.</p><p>At the end of the day, ask yourself:</p><p>\"Did I simply complete my work today, or did I make someone's experience better?\"</p>"
  },
  {
    "id": "ch4-s21",
    "chapter": "Chapter 4 · What Makes Hannah Different",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>Understanding what makes Hannah different begins with understanding our philosophy.</p><p>Living that philosophy requires something more personal.</p><p>In the next chapter, you'll discover the Hannah Team Member Oath—a shared commitment that reflects the values, character, and responsibility we ask every member of our team to embrace.</p>"
  },
  {
    "id": "chapter-5-opener",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "quote",
    "label": "Chapter 5 opener",
    "html": "<p class=\"kicker\">Chapter 5</p><h1>The Hannah Team Member Oath</h1><div class=\"truth-block\"><span>Hannah Truth #6</span><blockquote>The strongest commitments are not the ones we sign—they are the ones we choose to live.</blockquote></div>"
  },
  {
    "id": "ch5-s1",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "More Than Words",
    "html": "<h2>More Than Words</h2><p>Every profession has standards.</p><p>Many have codes of conduct.</p><p>Some have oaths.</p><p>These statements serve an important purpose. They remind us that our work carries responsibility, that our decisions matter, and that the trust others place in us should never be taken lightly.</p><p>At Hannah, our Team Member Oath is not intended to be a checklist or a formality.</p><p>It is a reflection of our culture.</p><p>It represents the character we strive to demonstrate, the relationships we hope to build, and the responsibility we accept each time we care for a Pet, support a Member, or help a teammate.</p>"
  },
  {
    "id": "ch5-s2",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "More Than Words",
    "html": "<p class=\"kicker\">More Than Words · continued</p><p>An oath is not about perfection.</p><p>It is about intention.</p><p>Every day, we will encounter situations that challenge our patience, our judgment, our resilience, and our compassion.</p><p>The Oath reminds us of the person we aspire to be, especially on those difficult days.</p>"
  },
  {
    "id": "ch5-s3",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Team Member Oath",
    "html": "<h2>The Hannah Team Member Oath</h2><p>I pledge to place the well-being of Pets, Members, and my teammates at the center of my work.</p><p>I will treat every Pet with compassion, respect, and kindness, recognizing the trust their family has placed in Hannah.</p><p>I will communicate honestly, listen with empathy, and seek first to understand before responding.</p><p>I will pursue excellence through continuous learning, personal growth, and a commitment to improving every day.</p><p>I will take ownership of my actions, celebrate successes with humility, and learn openly from my mistakes.</p><p>I will support my teammates, recognizing that exceptional care is always a shared effort.</p><p>I will protect the reputation and values of Hannah through my words, my actions, and my decisions.</p>"
  },
  {
    "id": "ch5-s4",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Team Member Oath",
    "html": "<p class=\"kicker\">The Hannah Team Member Oath · continued</p><p>I will strive to leave every Pet, every Member, every teammate, and every situation better than I found it.</p><p>This is my commitment. This is my responsibility. This is the Hannah Way.</p>"
  },
  {
    "id": "ch5-s5",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Pets",
    "html": "<h2>A Commitment to Pets</h2><p>Every Pet deserves to be treated with dignity, compassion, and respect.</p><p>They cannot tell us where it hurts.</p><p>They cannot explain what they are feeling.</p><p>They rely on us to observe carefully, think critically, and advocate on their behalf.</p><p>Whether performing a physical examination, preparing medications, cleaning a kennel, comforting a frightened patient, or simply speaking softly during a procedure, every action communicates that their well-being matters.</p><p>Exceptional medicine begins with compassion.</p>"
  },
  {
    "id": "ch5-s6",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Members",
    "html": "<h2>A Commitment to Members</h2><p>For many families, a Pet is more than an animal.</p><p>They are a companion.</p><p>A source of comfort.</p><p>A trusted friend.</p><p>A member of the family.</p><p>Members look to us not only for medical expertise, but also for reassurance, guidance, and honesty.</p><p>They deserve clear communication.</p>"
  },
  {
    "id": "ch5-s7",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Members",
    "html": "<p class=\"kicker\">A Commitment to Members · continued</p><p>Respectful conversations.</p><p>Thoughtful explanations.</p><p>And the confidence that we will always act in the best interest of their Pet.</p><p>Trust is built one interaction at a time.</p>"
  },
  {
    "id": "ch5-s8",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to One Another",
    "html": "<h2>A Commitment to One Another</h2><p>No one succeeds alone.</p><p>Veterinary medicine depends on teamwork.</p><p>Each person brings different knowledge, skills, experiences, and perspectives.</p><p>When we help each other, ask thoughtful questions, share what we've learned, and step in when someone needs support, everyone benefits—including our patients.</p><p>A healthy culture is created one relationship at a time.</p><p>How we treat one another is just as important as how we care for Pets.</p>"
  },
  {
    "id": "ch5-s9",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "video",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p><div class=\"academy-video\"><div class=\"academy-video-label\">Hannah Academy Video</div><div class=\"video-frame\"><iframe src=\"https://www.youtube-nocookie.com/embed/GATaPiuNgvQ?rel=0\" title=\"Hannah Academy Video\" loading=\"lazy\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe></div><a class=\"video-fallback\" href=\"https://youtu.be/GATaPiuNgvQ?si=kb9C5FDT7Qc6Q4C6\" target=\"_blank\" rel=\"noopener\">Watch video on YouTube</a></div>"
  },
  {
    "id": "ch5-s10",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Culture Is Created in Ordinary Moments",
    "html": "<h2>Culture Is Created in Ordinary Moments</h2><p>Culture is rarely defined by the biggest decisions.</p><p>More often, it is shaped by hundreds of ordinary moments.</p><p>Holding the door for a Member carrying a nervous puppy.</p><p>Offering to help a teammate who is falling behind.</p><p>Admitting a mistake before someone else discovers it.</p><p>Taking a few extra minutes to explain a treatment plan with patience.</p><p>Welcoming a new team member with kindness.</p>"
  },
  {
    "id": "ch5-s11",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Culture Is Created in Ordinary Moments",
    "html": "<p class=\"kicker\">Culture Is Created in Ordinary Moments · continued</p><p>These moments may seem small.</p><p>Together, they become the culture that people experience every day.</p>"
  },
  {
    "id": "ch5-s12",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Growth",
    "html": "<h2>A Commitment to Growth</h2><p>One of the greatest ways we honor the trust placed in us is by continuing to learn.</p><p>The moment we believe we have nothing left to learn is the moment our growth begins to slow.</p><p>Curiosity keeps us improving.</p><p>Feedback keeps us humble.</p><p>Education keeps us prepared.</p><p>Growth is not about proving what we already know.</p><p>It is about becoming better equipped to serve the Pets, Members, and teammates who depend on us.</p>"
  },
  {
    "id": "ch5-s13",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Integrity",
    "html": "<h2>A Commitment to Integrity</h2><p>Integrity is doing the right thing, even when it would be easier not to.</p><p>It means speaking honestly.</p><p>Following through on commitments.</p><p>Protecting confidential information.</p><p>Owning mistakes without excuses.</p><p>Treating everyone with fairness and respect.</p><p>Making decisions that reflect Hannah's values, even when no one else is watching.</p>"
  },
  {
    "id": "ch5-s14",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "A Commitment to Integrity",
    "html": "<p class=\"kicker\">A Commitment to Integrity · continued</p><p>Integrity is not measured by what we say.</p><p>It is revealed by what we consistently do.</p>"
  },
  {
    "id": "ch5-s15",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A Pet is discharged after treatment, and later that evening a team member realizes one follow-up instruction was accidentally omitted from the discharge paperwork.</p><p>Rather than assuming it isn't important or hoping the Member won't notice, the team member immediately contacts the appropriate leader.</p><p>The Member is called, the missing information is explained clearly, and the conversation is documented so the entire team remains informed.</p><p>The mistake is discussed during a team huddle—not to assign blame, but to identify how the process can be improved for the future.</p><p>The Member appreciates the honesty.</p><p>The team learns together.</p><p>Trust is strengthened because integrity was demonstrated.</p>"
  },
  {
    "id": "ch5-s16",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch5-s17",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Living the Oath",
    "html": "<h2>Living the Oath</h2><p>The Hannah Team Member Oath is not something to remember only during orientation.</p><p>It should influence how we begin every shift, approach every conversation, and make every decision.</p><p>There will be days when the work is difficult.</p><p>There will be moments when we are tired, busy, or faced with unexpected challenges.</p><p>Those are often the moments when our character matters most.</p><p>Living the Oath does not mean we will never make mistakes.</p><p>It means that when we do, we respond with honesty, humility, accountability, and a commitment to keep learning.</p>"
  },
  {
    "id": "ch5-s18",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Living the Oath",
    "html": "<p class=\"kicker\">Living the Oath · continued</p><p>Every day offers another opportunity to honor the trust that Pets, Members, and teammates place in us.</p>"
  },
  {
    "id": "ch5-s19",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about the commitments in the Hannah Team Member Oath.</p><p class=\"emphasis\">Which one feels most meaningful to you today?</p><p>Which one do you hope others would see reflected in your actions?</p><p>Remember, people experience our values long before they hear us talk about them.</p><p>They experience them through the choices we make.</p><label class=\"reflection-label\" for=\"reflection-ch5\">My reflection</label><textarea id=\"reflection-ch5\" data-reflection-key=\"chapter-5\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch5-s20",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>Before your next shift begins, take one minute to read the Hannah Team Member Oath.</p><p>Choose one commitment that you will intentionally demonstrate throughout the day.</p><p>Perhaps it is listening more carefully.</p><p>Supporting a teammate without being asked.</p><p>Communicating with greater empathy.</p><p>Taking ownership of a challenge.</p><p>Or showing compassion during a difficult conversation.</p>"
  },
  {
    "id": "ch5-s21",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<p class=\"kicker\">Putting It Into Practice · continued</p><p>At the end of the day, ask yourself:</p><p>\"Did my actions reflect the professional I aspire to become?\"</p>"
  },
  {
    "id": "ch5-s22",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>Values and commitments provide direction.</p><p>But every day brings situations where there isn't a written policy, a perfect answer, or an obvious next step.</p><p>How do we make thoughtful decisions when the path isn't clear?</p><p>In the next chapter, you'll be introduced to the Hannah Decision Framework™—a practical tool designed to help every team member make decisions that consistently reflect Hannah's mission, principles, and culture.</p>"
  },
  {
    "id": "ch5-s23",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Team Member Oath",
    "html": "<h2>The Hannah Team Member Oath</h2><p>\"Character is revealed not by what we promise once, but by what we choose to live every day.\"</p>"
  },
  {
    "id": "ch5-s24",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Team Member Oath",
    "html": "<h2>The Hannah Team Member Oath</h2><p>As a member of the Hannah team, I willingly make this commitment.</p><p>I pledge to place the well-being of Pets, Members, and my teammates at the center of my work.</p><p>I will treat every Pet with compassion, respect, and kindness, recognizing the trust each family has placed in Hannah.</p><p>I will communicate honestly, listen with empathy, and seek first to understand before responding.</p><p>I will pursue excellence through continuous learning, personal growth, and a commitment to improving every day.</p><p>I will take ownership of my actions, celebrate successes with humility, and learn openly from my mistakes.</p><p>I will support my teammates, recognizing that exceptional care is always a shared effort.</p>"
  },
  {
    "id": "ch5-s25",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "prose",
    "label": "The Hannah Team Member Oath",
    "html": "<p class=\"kicker\">The Hannah Team Member Oath · continued</p><p>I will protect the reputation and values of Hannah through my words, my actions, and my decisions.</p><p>I will strive to leave every Pet, every Member, every teammate, and every situation better than I found it.</p><p>This is my commitment.</p><p>This is my responsibility.</p><p class=\"emphasis\">This is the Hannah Way.</p>"
  },
  {
    "id": "oath-signature",
    "chapter": "Chapter 5 · The Hannah Team Member Oath",
    "template": "reflection",
    "label": "Oath signature",
    "html": "<p class=\"kicker\">A Personal Commitment</p><h1>The Hannah Team Member Oath</h1><div class=\"oath-card\"><p>I choose to live this commitment every day.</p><label>Name <input type=\"text\" data-oath=\"name\" placeholder=\"Your name\"></label><label>Date <input type=\"date\" data-oath=\"date\"></label><button type=\"button\" class=\"primary-button\" id=\"saveOath\">Affirm My Commitment</button><span id=\"oathStatus\" role=\"status\" aria-live=\"polite\"></span></div>"
  },
  {
    "id": "chapter-6-opener",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "quote",
    "label": "Chapter 6 opener",
    "html": "<p class=\"kicker\">Chapter 6</p><h1>The Hannah Decision Framework™</h1><div class=\"truth-block\"><span>Hannah Truth #7</span><blockquote>When our values guide our decisions, consistency becomes part of our culture.</blockquote></div>"
  },
  {
    "id": "ch6-s1",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Every Day Is Filled with Decisions",
    "html": "<h2>Every Day Is Filled with Decisions</h2><p>Some decisions are simple.</p><p>Others are not.</p><p>Should I interrupt this conversation to help a teammate?</p><p>Should I take another minute to explain this treatment plan?</p><p>Should I ask another question before making an assumption?</p><p class=\"emphasis\">Should I escalate this concern?</p><p class=\"emphasis\">Should I admit my mistake now or hope no one notices?</p>"
  },
  {
    "id": "ch6-s2",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Every Day Is Filled with Decisions",
    "html": "<p class=\"kicker\">Every Day Is Filled with Decisions · continued</p><p>Most of the decisions we make every day are not written in a policy manual.</p><p>They depend on judgment.</p><p>Experience.</p><p>Character.</p><p>At Hannah, we want every team member—not just leaders—to feel confident making thoughtful decisions.</p><p>That confidence doesn't come from memorizing policies.</p><p>It comes from understanding the mission, principles, and culture that guide us.</p>"
  },
  {
    "id": "ch6-s3",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Every Day Is Filled with Decisions",
    "html": "<p class=\"kicker\">Every Day Is Filled with Decisions · continued</p><p>The Hannah Decision Framework™ exists for that purpose.</p><p>It isn't designed to replace critical thinking.</p><p>It is designed to strengthen it.</p>"
  },
  {
    "id": "ch6-s4",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<h2>Before You Decide...</h2><p>Pause.</p><p>Ask yourself these questions.</p><p class=\"emphasis\">1. Is this what's best for the Pet?</p><p>Everything begins here.</p><p>Every Pet deserves our advocacy.</p><p>Every recommendation.</p><p>Every treatment.</p>"
  },
  {
    "id": "ch6-s5",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p>Every conversation.</p><p>Every decision.</p><p>Ask yourself:</p><p>Does this improve the Pet's health, comfort, or well-being?</p><p class=\"emphasis\">Am I acting with compassion?</p><p class=\"emphasis\">Have I considered the Pet's long-term welfare?</p><p class=\"emphasis\">Is there anything I may be overlooking?</p>"
  },
  {
    "id": "ch6-s6",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p>If the answer is no...</p><p>Stop.</p><p>Think again.</p><p class=\"emphasis\">2. Is this what's best for the Member?</p><p>Pets and Members are inseparable.</p><p>Helping a Pet also means helping the people who love them.</p><p>Ask yourself:</p>"
  },
  {
    "id": "ch6-s7",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p class=\"emphasis\">Am I communicating clearly?</p><p class=\"emphasis\">Have I explained the \"why\"?</p><p class=\"emphasis\">Will this decision build trust?</p><p class=\"emphasis\">Have I listened before responding?</p><p class=\"emphasis\">Will the Member feel respected?</p><p>Sometimes the medically correct answer still needs a better conversation.</p><p>Compassion and communication are never optional.</p>"
  },
  {
    "id": "ch6-s8",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p class=\"emphasis\">3. Is this what's best for the Team?</p><p>Exceptional veterinary care is never delivered alone.</p><p>Every decision affects someone else.</p><p>Ask yourself:</p><p class=\"emphasis\">Am I helping or creating more work?</p><p class=\"emphasis\">Have I shared important information?</p><p class=\"emphasis\">Does someone else need to know?</p>"
  },
  {
    "id": "ch6-s9",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p class=\"emphasis\">Am I supporting my teammates?</p><p class=\"emphasis\">Could this decision improve our workflow?</p><p>Strong teams think beyond themselves.</p><p>4. Is this consistent with Hannah's Mission and Principles?</p><p>This is where culture becomes practical.</p><p>Ask yourself:</p><p>Does this decision reflect...</p>"
  },
  {
    "id": "ch6-s10",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p class=\"emphasis\">Quality?</p><p class=\"emphasis\">Freedom?</p><p class=\"emphasis\">Mutuality?</p><p class=\"emphasis\">Growth?</p><p class=\"emphasis\">Efficiency?</p><p class=\"emphasis\">Responsibility?</p><p>If the decision conflicts with one of our Principles...</p>"
  },
  {
    "id": "ch6-s11",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p>Pause.</p><p>There may be a better solution.</p><p>5. If this decision appeared on tomorrow's front page...</p><p class=\"emphasis\">...would I still be proud of it?</p><p>This question isn't about publicity.</p><p>It's about integrity.</p><p>Imagine explaining your decision to:</p>"
  },
  {
    "id": "ch6-s12",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p>A Member.</p><p>A teammate.</p><p>Your leader.</p><p>Your family.</p><p class=\"emphasis\">Would you feel confident?</p><p>If not...</p><p>Keep thinking.</p>"
  },
  {
    "id": "ch6-s13",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Before You Decide...",
    "html": "<p class=\"kicker\">Before You Decide... · continued</p><p>Integrity usually whispers before regret speaks loudly.</p>"
  },
  {
    "id": "ch6-s14",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p>"
  },
  {
    "id": "ch6-s15",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Good Judgment Is Learned",
    "html": "<h2>Good Judgment Is Learned</h2><p>People sometimes believe good judgment is something you're born with.</p><p>In reality, good judgment is developed.</p><p>It grows through experience.</p><p>Reflection.</p><p>Coaching.</p><p>Learning from mistakes.</p><p>Asking questions.</p>"
  },
  {
    "id": "ch6-s16",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Good Judgment Is Learned",
    "html": "<p class=\"kicker\">Good Judgment Is Learned · continued</p><p>Listening carefully.</p><p>The best professionals are not the ones who never make mistakes.</p><p>They are the ones who consistently pause, think, and choose wisely.</p><p>Good judgment is one of the most valuable skills you will ever develop.</p><p>And like every skill, it improves with practice.</p>"
  },
  {
    "id": "ch6-s17",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "There Is One More Question...",
    "html": "<h2>There Is One More Question...</h2><p>After you've asked every other question...</p><p>Ask one final one.</p><p>\"If this were my own Pet...what would I hope someone would do?\"</p><p>That question often brings remarkable clarity.</p><p>Because empathy has a way of cutting through complexity.</p><p>It reminds us that behind every medical record...</p><p>Every appointment...</p>"
  },
  {
    "id": "ch6-s18",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "There Is One More Question...",
    "html": "<p class=\"kicker\">There Is One More Question... · continued</p><p>Every estimate...</p><p>Every phone call...</p><p>...is someone who loves that Pet deeply.</p><p>Treat every Pet as though they mattered to your own family.</p><p>Because they matter to someone else's.</p>"
  },
  {
    "id": "ch6-s19",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A Member arrives ten minutes before closing with a dog that \"just seems off.\"</p><p>The schedule is full.</p><p>The team has had an exhausting day.</p><p>Everyone wants to go home.</p><p>The easiest decision would be to ask the Member to return tomorrow.</p><p>Instead, the team pauses.</p><p>They work through the Decision Framework.</p>"
  },
  {
    "id": "ch6-s20",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p class=\"emphasis\">What's best for the Pet?</p><p>The Pet deserves an assessment today.</p><p class=\"emphasis\">What's best for the Member?</p><p>They're worried enough to come in just before closing.</p><p class=\"emphasis\">What's best for the Team?</p><p>The team communicates, adjusts responsibilities, and works together.</p><p class=\"emphasis\">Does it reflect Hannah's Principles?</p>"
  },
  {
    "id": "ch6-s21",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>Yes.</p><p>Quality.</p><p>Mutuality.</p><p>Responsibility.</p><p>The examination reveals a condition requiring immediate treatment.</p><p>The Pet receives care before becoming critically ill.</p><p>The family leaves relieved.</p>"
  },
  {
    "id": "ch6-s22",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>The team leaves later than planned.</p><p>But they also leave knowing they made the right decision.</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch6-s23",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "A Framework for Everyone",
    "html": "<h2>A Framework for Everyone</h2><p>The Hannah Decision Framework™ is not reserved for leaders.</p><p>It belongs to everyone.</p><p>Member Advocates.</p><p>PetNurses.</p><p>Nurse Aides.</p><p>Pet Practitioners.</p><p>Doctors.</p>"
  },
  {
    "id": "ch6-s24",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "video",
    "label": "A Framework for Everyone",
    "html": "<p class=\"kicker\">A Framework for Everyone · continued</p><p>Leadership.</p><p>Every person at Hannah makes decisions that influence Pets, Members, teammates, and the organization.</p><p>The more consistently we use the same framework...</p><p>The more consistent our culture becomes.</p><p>Because culture isn't created by policies.</p><p>It's created by thousands of good decisions made every single day.</p><div class=\"academy-video\"><div class=\"academy-video-label\">Hannah Academy Video</div><div class=\"video-frame\"><iframe src=\"https://www.youtube-nocookie.com/embed/EWyX4CvyqvI?rel=0\" title=\"Hannah Academy Video\" loading=\"lazy\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe></div><a class=\"video-fallback\" href=\"https://youtu.be/EWyX4CvyqvI?si=I6JFcLOeGqS-pfrt\" target=\"_blank\" rel=\"noopener\">Watch video on YouTube</a></div>"
  },
  {
    "id": "ch6-s25",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about a difficult decision you've faced in the past.</p><p>If you had used the Hannah Decision Framework™, would it have changed how you approached the situation?</p><p>Which question do you think would have been the most helpful?</p><label class=\"reflection-label\" for=\"reflection-ch6\">My reflection</label><textarea id=\"reflection-ch6\" data-reflection-key=\"chapter-6\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch6-s26",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>During the next week, choose one decision each day—large or small—and intentionally pause before acting.</p><p>Ask yourself the five questions in the Hannah Decision Framework™.</p><p>Notice how slowing down, even briefly, changes the quality of your thinking.</p><p>Over time, these questions won't feel like a checklist.</p><p>They'll become second nature.</p><p>And that's when thoughtful decision-making becomes part of who you are.</p>"
  },
  {
    "id": "ch6-s27",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>Making good decisions is essential.</p><p>But great decisions require something even deeper.</p><p>They require a commitment to continual learning.</p><p>In the next chapter, we'll explore Our Learning Philosophy and discover why learning isn't simply part of your job at Hannah—it is one of the greatest ways we care for Pets, Members, and one another.</p>"
  },
  {
    "id": "decision-framework",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "visual",
    "label": "Decision Framework visual",
    "html": "<p class=\"kicker\">Interactive Practice</p><h1>The Hannah Decision Framework™</h1><div class=\"decision-map\"><div class=\"decision-center\">Every Decision<br>Begins with Purpose</div><button data-detail=\"Begin with the Pet’s health, comfort, and long-term well-being.\">🐾 Best for the Pet?</button><button data-detail=\"Communicate clearly, listen carefully, and build trust.\">♥ Best for the Member?</button><button data-detail=\"Share information and support the people affected by the decision.\">🤝 Best for the Team?</button><button data-detail=\"Test the choice against Quality, Freedom, Mutuality, Growth, Efficiency, and Responsibility.\">★ Reflects Hannah’s Principles?</button><button data-detail=\"Choose what you would be proud to explain and defend.\">✦ Can I Stand Behind It?</button></div><p id=\"decisionDetail\" class=\"viz-caption\">Select a question to explore it.</p><blockquote class=\"final-question\">“If this were my own Pet…what would I hope someone would do?”</blockquote>"
  },
  {
    "id": "decision-scenario",
    "chapter": "Chapter 6 · The Hannah Decision Framework™",
    "template": "activity",
    "label": "Apply the Decision Framework",
    "html": "<p class=\"kicker\">Interactive Practice</p><h1>Apply the Framework</h1><div class=\"scenario-card\"><p>A Member arrives ten minutes before closing with a dog that “just seems off.”</p><p>The schedule is full. The team has had an exhausting day. Everyone wants to go home.</p></div><p>Select each question to follow the team’s thinking.</p><div class=\"scenario-steps\"><button data-detail=\"The Pet deserves an assessment today.\">What’s best for the Pet?</button><button data-detail=\"They’re worried enough to come in just before closing.\">What’s best for the Member?</button><button data-detail=\"The team communicates, adjusts responsibilities, and works together.\">What’s best for the Team?</button><button data-detail=\"Quality. Mutuality. Responsibility.\">Does it reflect Hannah’s Principles?</button></div><p id=\"scenarioDetail\" class=\"viz-caption\">Select a question to reveal how the team applied the framework.</p><div class=\"scenario-outcome\"><p>The examination reveals a condition requiring immediate treatment.</p><p>The Pet receives care before becoming critically ill. The family leaves relieved.</p><p class=\"emphasis\">The team leaves knowing they made the right decision. That is the Hannah Way.</p></div>"
  },
  {
    "id": "chapter-7-opener",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "quote",
    "label": "Chapter 7 opener",
    "html": "<p class=\"kicker\">Chapter 7</p><h1>Our Learning Philosophy</h1><div class=\"truth-block\"><span>Hannah Truth #8</span><blockquote>The quality of our care will never exceed the quality of our learning.</blockquote></div>"
  },
  {
    "id": "ch7-s1",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Learning Is an Act of Caring",
    "html": "<h2>Learning Is an Act of Caring</h2><p>When people think about learning, they often picture classrooms, textbooks, quizzes, or training sessions.</p><p>At Hannah, we see learning differently.</p><p>Learning is one of the greatest expressions of caring.</p><p>Every new skill you develop...</p><p>Every question you ask...</p><p>Every mistake you learn from...</p><p>Every lesson you complete...</p>"
  },
  {
    "id": "ch7-s2",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Learning Is an Act of Caring",
    "html": "<p class=\"kicker\">Learning Is an Act of Caring · continued</p><p>Has the potential to improve the life of a Pet.</p><p>It can strengthen a Member's confidence.</p><p>It can make a teammate's day a little easier.</p><p>Learning is not separate from exceptional care.</p><p>It is one of the ways exceptional care is created.</p><p>That is why learning is not simply encouraged at Hannah.</p><p>It is part of who we are.</p>"
  },
  {
    "id": "ch7-s3",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Curiosity Is a Strength",
    "html": "<h2>Curiosity Is a Strength</h2><p>No one begins their career knowing everything.</p><p>None of us ever will.</p><p>The most respected professionals are rarely the ones with all the answers.</p><p>They are the ones who remain curious.</p><p>They ask thoughtful questions.</p><p>They seek feedback.</p><p>They welcome new ideas.</p>"
  },
  {
    "id": "ch7-s4",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Curiosity Is a Strength",
    "html": "<p class=\"kicker\">Curiosity Is a Strength · continued</p><p>They admit when they don't know something.</p><p>They understand that every answer leads to another opportunity to learn.</p><p>Curiosity is not a sign of weakness.</p><p>It is one of the greatest strengths a professional can possess.</p>"
  },
  {
    "id": "ch7-s5",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p>"
  },
  {
    "id": "ch7-s6",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "The Best Professionals Never Stop Being Students",
    "html": "<h2>The Best Professionals Never Stop Being Students</h2><p>There is no point in your career when learning ends.</p><p>Not after orientation.</p><p>Not after certification.</p><p>Not after veterinary school.</p><p>Not after becoming a leader.</p><p>The moment we believe there is nothing left to learn is often the moment we stop growing.</p><p>The best professionals carry the mindset of a student throughout their entire careers.</p>"
  },
  {
    "id": "ch7-s7",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "The Best Professionals Never Stop Being Students",
    "html": "<p class=\"kicker\">The Best Professionals Never Stop Being Students · continued</p><p>They remain teachable.</p><p>They remain humble.</p><p>They remain open to new perspectives.</p><p>Because excellence is never a destination.</p><p>It is a lifelong pursuit.</p>"
  },
  {
    "id": "ch7-s8",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "We Learn Together",
    "html": "<h2>We Learn Together</h2><p>One person's knowledge can become everyone's success.</p><p>At Hannah, learning is not meant to stay with the individual.</p><p>When you discover a better way to perform a procedure...</p><p>Share it.</p><p>When you attend a conference...</p><p>Bring your knowledge back to the team.</p><p>When you solve a difficult problem...</p>"
  },
  {
    "id": "ch7-s9",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "We Learn Together",
    "html": "<p class=\"kicker\">We Learn Together · continued</p><p>Help others understand what you learned.</p><p>When you receive coaching...</p><p>Pass those lessons forward.</p><p>A culture of learning grows strongest when knowledge is shared generously.</p><p>The success of one team member becomes the success of the entire organization.</p>"
  },
  {
    "id": "ch7-s10",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Learning Requires Humility",
    "html": "<h2>Learning Requires Humility</h2><p>Growth begins with a simple admission.</p><p>\"I don't know.\"</p><p>Those three words are not a sign of failure.</p><p>They are often the beginning of wisdom.</p><p>Humility allows us to ask questions.</p><p>Seek help.</p><p>Accept feedback.</p>"
  },
  {
    "id": "ch7-s11",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Learning Requires Humility",
    "html": "<p class=\"kicker\">Learning Requires Humility · continued</p><p>Reconsider our assumptions.</p><p>Improve our skills.</p><p>No one at Hannah is expected to know everything.</p><p>Every team member is expected to remain willing to learn.</p>"
  },
  {
    "id": "ch7-s12",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Mistakes Become Lessons",
    "html": "<h2>Mistakes Become Lessons</h2><p>No one enjoys making mistakes.</p><p>But mistakes themselves are not the greatest threat to excellence.</p><p>Ignoring them is.</p><p>At Hannah, we believe mistakes should lead to learning.</p><p>When something goes wrong, we ask:</p><p class=\"emphasis\">What happened?</p><p class=\"emphasis\">What can we learn?</p>"
  },
  {
    "id": "ch7-s13",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Mistakes Become Lessons",
    "html": "<p class=\"kicker\">Mistakes Become Lessons · continued</p><p class=\"emphasis\">How do we prevent it from happening again?</p><p>Accountability matters.</p><p>Responsibility matters.</p><p>But so does creating an environment where people feel safe enough to speak honestly, ask for help, and continuously improve.</p><p>Learning organizations do not hide mistakes.</p><p>They learn from them.</p>"
  },
  {
    "id": "ch7-s14",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A newly trained PetNurse performs a procedure for the first time without assistance.</p><p>Afterward, they realize they could have communicated more clearly with the Member before beginning.</p><p>Instead of feeling embarrassed and moving on, they discuss the experience with their mentor.</p><p>Together they identify what went well, what could have been explained differently, and how to improve next time.</p><p>The following week, the PetNurse shares those insights during a team huddle so others can benefit as well.</p><p>One experience becomes many lessons.</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch7-s15",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Coaching Is an Investment",
    "html": "<h2>Coaching Is an Investment</h2><p>One of the greatest gifts we can give another person is thoughtful coaching.</p><p>Coaching is not criticism.</p><p>It is not about finding fault.</p><p>It is about helping someone become the best version of themselves.</p><p>Sometimes coaching means teaching a new skill.</p><p>Sometimes it means asking thoughtful questions.</p><p>Sometimes it means encouraging someone who lacks confidence.</p>"
  },
  {
    "id": "ch7-s16",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Coaching Is an Investment",
    "html": "<p class=\"kicker\">Coaching Is an Investment · continued</p><p>Sometimes it means having a difficult conversation because we care too much to let someone continue struggling alone.</p><p>Great coaches do not simply correct performance.</p><p>They develop people.</p><p>Every team member will receive coaching.</p><p>Every team member will also have opportunities to coach others.</p><p>That is how a culture of continuous learning grows.</p>"
  },
  {
    "id": "ch7-s17",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Growth Is a Choice",
    "html": "<h2>Growth Is a Choice</h2><p>Hannah provides opportunities to learn.</p><p>Academies.</p><p>Mentors.</p><p>Training.</p><p>Feedback.</p><p>Experience.</p><p>Resources.</p>"
  },
  {
    "id": "ch7-s18",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Growth Is a Choice",
    "html": "<p class=\"kicker\">Growth Is a Choice · continued</p><p>But growth ultimately remains a personal choice.</p><p>No one can learn for someone else.</p><p>The professionals who grow the most are not necessarily the most experienced.</p><p>They are the ones who consistently choose curiosity over comfort.</p><p>Questions over assumptions.</p><p>Improvement over complacency.</p><p>Growth is rarely dramatic.</p>"
  },
  {
    "id": "ch7-s19",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Growth Is a Choice",
    "html": "<p class=\"kicker\">Growth Is a Choice · continued</p><p>More often, it happens one lesson at a time.</p>"
  },
  {
    "id": "ch7-s20",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about someone who made a significant impact on your own learning.</p><p>What qualities made them an effective teacher or mentor?</p><p>How can you demonstrate those same qualities to someone else?</p><p>Remember...</p><p>Every experienced professional was once new.</p><p>Someone invested in them.</p><p>Now it's our turn to invest in others.</p><label class=\"reflection-label\" for=\"reflection-ch7\">My reflection</label><textarea id=\"reflection-ch7\" data-reflection-key=\"chapter-7\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch7-s21",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>This week, ask one question you might otherwise have kept to yourself.</p><p>Seek feedback on a skill you want to improve.</p><p>Share something you've recently learned with a teammate.</p><p>Or offer to help someone who is learning something new.</p><p>Growth often begins with one small act of curiosity.</p>"
  },
  {
    "id": "ch7-s22",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>Learning creates knowledge.</p><p>But knowledge alone does not create excellence.</p><p>How we apply that knowledge—day after day, interaction after interaction—is what shapes the experience of Pets, Members, and one another.</p><p>In the next chapter, we'll explore The Hannah Learning Principles, the foundational beliefs that transform learning into meaningful action and lifelong professional growth.</p>"
  },
  {
    "id": "learning-cycle",
    "chapter": "Chapter 7 · Our Learning Philosophy",
    "template": "visual",
    "label": "Learning Cycle visual",
    "html": "<p class=\"kicker\">Signature Visual</p><h1>The Hannah Learning Cycle™</h1><div class=\"learning-cycle\" aria-label=\"Learn, Reflect, Practice, Grow\"><button data-detail=\"Gain new knowledge, skills, or understanding.\">Learn</button><span>→</span><button data-detail=\"Think about what you learned and why it matters.\">Reflect</button><span>→</span><button data-detail=\"Apply the learning intentionally in daily work.\">Practice</button><span>→</span><button data-detail=\"Evaluate, seek feedback, and continue improving.\">Grow</button></div><div class=\"cycle-center\">Continuous Growth</div><p id=\"cycleDetail\" class=\"viz-caption\">Select a step to explore it.</p>"
  },
  {
    "id": "chapter-8-opener",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "quote",
    "label": "Chapter 8 opener",
    "html": "<p class=\"kicker\">Chapter 8</p><h1>The Hannah Learning Principles</h1><div class=\"truth-block\"><span>Hannah Truth #9</span><blockquote>Knowledge changes what we know. Learning changes who we become.</blockquote></div>"
  },
  {
    "id": "ch8-s1",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning with Purpose",
    "html": "<h2>Learning with Purpose</h2><p>Learning happens every day.</p><p>Sometimes it's intentional.</p><p>Sometimes it's unexpected.</p><p>Sometimes it comes from a mentor.</p><p>Sometimes it comes from a mistake.</p><p>Sometimes it comes from a difficult conversation.</p><p>Regardless of where learning begins, its purpose at Hannah remains the same:</p>"
  },
  {
    "id": "ch8-s2",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning with Purpose",
    "html": "<p class=\"kicker\">Learning with Purpose · continued</p><p>To improve the lives of Pets, Members, and one another.</p><p>Learning is never about collecting information simply to know more.</p><p>It is about becoming more capable, more compassionate, and more confident in the care we provide.</p><p>Every lesson should ultimately make a positive difference in someone's life.</p><p>That is what gives learning purpose.</p>"
  },
  {
    "id": "ch8-s3",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Is a Journey",
    "html": "<h2>Learning Is a Journey</h2><p>There is no finish line in veterinary medicine.</p><p>Every day brings new discoveries.</p><p>New technology.</p><p>New treatments.</p><p>New challenges.</p><p>New opportunities.</p><p>The professionals who thrive are not the ones who believe they have arrived.</p>"
  },
  {
    "id": "ch8-s4",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Is a Journey",
    "html": "<p class=\"kicker\">Learning Is a Journey · continued</p><p>They are the ones who continue moving forward.</p><p>At Hannah, we never expect perfection.</p><p>We expect progress.</p><p>Every lesson builds on the one before it.</p><p>Every experience prepares us for the next.</p><p>Growth is measured one step at a time.</p>"
  },
  {
    "id": "ch8-s5",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "video",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p><div class=\"academy-video\"><div class=\"academy-video-label\">Hannah Academy Video</div><div class=\"video-frame\"><iframe src=\"https://www.youtube-nocookie.com/embed/f8BArhcKFj8?rel=0\" title=\"Hannah Academy Video\" loading=\"lazy\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe></div><a class=\"video-fallback\" href=\"https://youtu.be/f8BArhcKFj8?si=_BCFItphxW6MfLBO\" target=\"_blank\" rel=\"noopener\">Watch video on YouTube</a></div>"
  },
  {
    "id": "ch8-s6",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Excellence Is Built One Lesson at a Time",
    "html": "<h2>Excellence Is Built One Lesson at a Time</h2><p>People often notice excellence.</p><p>They rarely notice how it was built.</p><p>Excellence isn't created by one extraordinary moment.</p><p>It is created by thousands of ordinary moments.</p><p>One question.</p><p>One lesson.</p><p>One skill practiced repeatedly.</p>"
  },
  {
    "id": "ch8-s7",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Excellence Is Built One Lesson at a Time",
    "html": "<p class=\"kicker\">Excellence Is Built One Lesson at a Time · continued</p><p>One thoughtful conversation.</p><p>One piece of feedback.</p><p>One improvement.</p><p>Over time, those moments accumulate into confidence, wisdom, and professional excellence.</p><p>That is why we celebrate progress—not just perfection.</p>"
  },
  {
    "id": "ch8-s8",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Begins with \"Why\"",
    "html": "<h2>Learning Begins with \"Why\"</h2><p>At Hannah, we believe that understanding why creates stronger professionals than simply memorizing how.</p><p>Knowing how to perform a procedure is important.</p><p>Understanding why that procedure matters is transformational.</p><p>Knowing how to answer a Member's question is valuable.</p><p>Understanding why clear communication builds trust changes the entire conversation.</p><p>When people understand the reason behind an action, they make better decisions when circumstances change.</p><p>That's why every Academy, every lesson, and every coaching conversation begins with purpose.</p>"
  },
  {
    "id": "ch8-s9",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Begins with \"Why\"",
    "html": "<p class=\"kicker\">Learning Begins with \"Why\" · continued</p><p>We don't simply teach tasks.</p><p>We teach understanding.</p>"
  },
  {
    "id": "ch8-s10",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Happens Everywhere",
    "html": "<h2>Learning Happens Everywhere</h2><p>Some of the most valuable lessons don't happen in a classroom.</p><p>They happen during appointments.</p><p>During rounds.</p><p>In team huddles.</p><p>During coaching conversations.</p><p>After difficult cases.</p><p>While mentoring a new teammate.</p>"
  },
  {
    "id": "ch8-s11",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Happens Everywhere",
    "html": "<p class=\"kicker\">Learning Happens Everywhere · continued</p><p>Even while helping a Member understand their Pet's care.</p><p>Every experience has something to teach us—if we are willing to learn from it.</p><p>Learning doesn't begin when training starts.</p><p>It begins when curiosity does.</p>"
  },
  {
    "id": "ch8-s12",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Everyone Is Both a Student and a Teacher",
    "html": "<h2>Everyone Is Both a Student and a Teacher</h2><p>One of the unique things about Hannah is that learning flows in every direction.</p><p>Experienced team members teach those who are new.</p><p>New team members ask questions that challenge long-held assumptions.</p><p>Leaders coach their teams.</p><p>Teams teach leaders through their ideas and experiences.</p><p>Knowledge is not determined by a job title.</p><p>Every person has something valuable to contribute.</p>"
  },
  {
    "id": "ch8-s13",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Everyone Is Both a Student and a Teacher",
    "html": "<p class=\"kicker\">Everyone Is Both a Student and a Teacher · continued</p><p>Every person has something valuable to learn.</p><p>When we embrace both roles—student and teacher—we strengthen the entire organization.</p>"
  },
  {
    "id": "ch8-s14",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A new Member Advocate notices that a long-time teammate has an exceptionally calm and reassuring way of speaking with anxious Members.</p><p>Instead of simply admiring the skill, the new team member asks,</p><p>\"I've noticed how comfortable Members seem after speaking with you. Would you be willing to share what you've learned?\"</p><p>The experienced teammate smiles and says,</p><p>\"Of course.\"</p><p>Over the next several weeks, they practice together.</p><p>The experienced teammate offers encouragement.</p>"
  },
  {
    "id": "ch8-s15",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>The new team member gains confidence.</p><p>Months later, another new hire joins Hannah.</p><p>Without being asked, that same Member Advocate begins mentoring the next person.</p><p>Learning has come full circle.</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch8-s16",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Requires Courage",
    "html": "<h2>Learning Requires Courage</h2><p>Learning often means becoming uncomfortable.</p><p>It means asking questions when you're unsure.</p><p>Practicing skills that aren't yet familiar.</p><p>Accepting feedback with humility.</p><p>Trying again after something didn't go as planned.</p><p>That takes courage.</p><p>At Hannah, we don't expect people to know everything.</p>"
  },
  {
    "id": "ch8-s17",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Requires Courage",
    "html": "<p class=\"kicker\">Learning Requires Courage · continued</p><p>We do expect them to remain willing to learn.</p><p>The courage to keep growing is one of the defining characteristics of exceptional professionals.</p>"
  },
  {
    "id": "ch8-s18",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Creates Leaders",
    "html": "<h2>Learning Creates Leaders</h2><p>Leadership doesn't begin when someone receives a new title.</p><p>Leadership begins when someone influences others in a positive way.</p><p>Every time you share knowledge...</p><p>Encourage a teammate...</p><p>Offer thoughtful feedback...</p><p>Help someone gain confidence...</p><p>Or model Hannah's values...</p>"
  },
  {
    "id": "ch8-s19",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Learning Creates Leaders",
    "html": "<p class=\"kicker\">Learning Creates Leaders · continued</p><p>You are leading.</p><p>Leadership is not reserved for managers.</p><p>It is practiced by people who choose to make those around them better.</p><p>One of the greatest outcomes of learning is the ability to help others grow.</p>"
  },
  {
    "id": "ch8-s20",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "The Hannah Learning Principles",
    "html": "<h2>The Hannah Learning Principles</h2><p>At Hannah, we believe...</p><p>Learning begins with purpose.</p><p>Curiosity is a strength.</p><p>Questions are encouraged.</p><p>Feedback is a gift.</p><p>Mistakes become opportunities to improve.</p><p>Knowledge should be shared generously.</p>"
  },
  {
    "id": "ch8-s21",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "The Hannah Learning Principles",
    "html": "<p class=\"kicker\">The Hannah Learning Principles · continued</p><p>Growth is everyone's responsibility.</p><p>Every team member is both a student and a teacher.</p><p>Learning never ends.</p><p>These principles shape every Academy, every coaching conversation, every mentoring relationship, and every opportunity to grow.</p><p>They are the foundation of the Hannah Learning System.</p>"
  },
  {
    "id": "ch8-s22",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about one person who has influenced your growth.</p><p>What made them such an effective teacher, mentor, or coach?</p><p>Now ask yourself:</p><p class=\"emphasis\">How can I become that person for someone else?</p><p>One of the greatest ways to honor those who invested in us is to invest in others.</p><label class=\"reflection-label\" for=\"reflection-ch8\">My reflection</label><textarea id=\"reflection-ch8\" data-reflection-key=\"chapter-8\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch8-s23",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>This week, intentionally do one of the following:</p><p>Ask a thoughtful question.</p><p>Share something you've recently learned.</p><p>Seek feedback on a skill you're developing.</p><p>Offer to mentor someone who is newer than you.</p><p>Thank someone who has helped you grow.</p><p>Small investments in learning often have lasting effects.</p>"
  },
  {
    "id": "ch8-s24",
    "chapter": "Chapter 8 · The Hannah Learning Principles",
    "template": "prose",
    "label": "Looking Ahead",
    "html": "<h2>Looking Ahead</h2><p>Learning shapes our knowledge.</p><p>Our principles shape our mindset.</p><p>But exceptional organizations are built on something even more powerful.</p><p>They are built on relationships.</p><p>In the next chapter, we'll explore Our Commitment to One Another and discover how trust, respect, teamwork, and accountability create the culture that allows everyone at Hannah to thrive.</p>"
  },
  {
    "id": "chapter-9-opener",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "quote",
    "label": "Chapter 9 opener",
    "html": "<p class=\"kicker\">Chapter 9</p><h1>Our Commitment to One Another</h1><div class=\"truth-block\"><span>Hannah Truth #10</span><blockquote>The strength of Hannah will never be measured by the abilities of one person, but by how well we help one another succeed.</blockquote></div>"
  },
  {
    "id": "ch9-s1",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Are Better Together",
    "html": "<h2>We Are Better Together</h2><p>Veterinary medicine is a team profession.</p><p>While one person may perform an examination, another gathers the patient's history.</p><p>One team member prepares medications.</p><p>Another comforts an anxious Member.</p><p>Someone else processes laboratory samples.</p><p>Another coordinates follow-up care.</p><p>Each role is different.</p>"
  },
  {
    "id": "ch9-s2",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Are Better Together",
    "html": "<p class=\"kicker\">We Are Better Together · continued</p><p>Each role is essential.</p><p>Exceptional care is rarely the result of one extraordinary individual.</p><p>It is the result of ordinary people working together extraordinarily well.</p><p>That is the culture we strive to build at Hannah.</p>"
  },
  {
    "id": "ch9-s3",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Respect Is the Foundation of Trust",
    "html": "<h2>Respect Is the Foundation of Trust</h2><p>Every healthy relationship begins with respect.</p><p>Respect is not determined by a person's title, years of experience, or position within the organization.</p><p>It is demonstrated through our everyday actions.</p><p>We listen before responding.</p><p>We assume positive intent.</p><p>We communicate professionally.</p><p>We value different perspectives.</p>"
  },
  {
    "id": "ch9-s4",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Respect Is the Foundation of Trust",
    "html": "<p class=\"kicker\">Respect Is the Foundation of Trust · continued</p><p>We recognize that every person deserves to be treated with dignity.</p><p>Respect creates trust.</p><p>Trust creates teamwork.</p><p>And teamwork creates better outcomes for Pets, Members, and one another.</p>"
  },
  {
    "id": "ch9-s5",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "video",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p><div class=\"academy-video\"><div class=\"academy-video-label\">Hannah Academy Video</div><div class=\"video-frame\"><iframe src=\"https://www.youtube-nocookie.com/embed/ScDWyskKgw8?rel=0\" title=\"Hannah Academy Video\" loading=\"lazy\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe></div><a class=\"video-fallback\" href=\"https://youtu.be/ScDWyskKgw8?si=o5eKCgJhPJd0cd2Z\" target=\"_blank\" rel=\"noopener\">Watch video on YouTube</a></div>"
  },
  {
    "id": "ch9-s6",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Every Interaction Shapes Our Culture",
    "html": "<h2>Every Interaction Shapes Our Culture</h2><p>Culture is not created during annual meetings.</p><p>It isn't built through mission statements hanging on a wall.</p><p>Culture is created in conversations.</p><p>In moments of encouragement.</p><p>In how we respond when someone asks for help.</p><p>In how we welcome new team members.</p><p>In how we disagree respectfully.</p>"
  },
  {
    "id": "ch9-s7",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Every Interaction Shapes Our Culture",
    "html": "<p class=\"kicker\">Every Interaction Shapes Our Culture · continued</p><p>In how we celebrate one another's successes.</p><p>Every interaction either strengthens our culture or weakens it.</p><p>Each of us helps decide which direction Hannah moves.</p>"
  },
  {
    "id": "ch9-s8",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Assume Positive Intent",
    "html": "<h2>We Assume Positive Intent</h2><p>Misunderstandings happen.</p><p>Communication isn't always perfect.</p><p>Stressful days affect everyone.</p><p>When uncertainty arises, we begin with a simple assumption:</p><p>Most people are trying to do the right thing.</p><p>Assuming positive intent does not mean ignoring problems.</p><p>It does not mean avoiding accountability.</p>"
  },
  {
    "id": "ch9-s9",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Assume Positive Intent",
    "html": "<p class=\"kicker\">We Assume Positive Intent · continued</p><p>It means choosing curiosity before judgment.</p><p>Instead of asking,</p><p>\"Why would they do that?\"</p><p>We ask,</p><p>\"What might I not know?\"</p><p>That single shift often changes the entire conversation.</p><p>Healthy teams seek understanding before assigning blame.</p>"
  },
  {
    "id": "positive-intent-shift",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "activity",
    "label": "Shift the Question",
    "html": "<p class=\"kicker\">Interactive Perspective</p><h1>Choose Curiosity Before Judgment</h1><button type=\"button\" class=\"flip-card\" data-front=\"Why would they do that?\" data-back=\"What might I not know?\"><span>Why would they do that?</span></button><p class=\"small-note\">Select the card to shift the question.</p><p class=\"closing-line\">Healthy teams seek understanding before assigning blame.</p>"
  },
  {
    "id": "ch9-s10",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Feedback Is an Act of Respect",
    "html": "<h2>Feedback Is an Act of Respect</h2><p>Feedback is one of the greatest gifts we can offer another person.</p><p>Not because it is always easy.</p><p>But because growth depends on honest conversations.</p><p>At Hannah, feedback should be:</p><p>Timely.</p><p>Specific.</p><p>Respectful.</p>"
  },
  {
    "id": "ch9-s11",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Feedback Is an Act of Respect",
    "html": "<p class=\"kicker\">Feedback Is an Act of Respect · continued</p><p>Constructive.</p><p>Focused on helping someone improve.</p><p>Likewise, receiving feedback requires humility.</p><p>It asks us to listen openly.</p><p>Reflect honestly.</p><p>And view coaching as an investment in our success.</p><p>Feedback is not about criticism.</p>"
  },
  {
    "id": "ch9-s12",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Feedback Is an Act of Respect",
    "html": "<p class=\"kicker\">Feedback Is an Act of Respect · continued</p><p>It is about believing someone is capable of becoming even better.</p>"
  },
  {
    "id": "ch9-s13",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Celebrate Success Together",
    "html": "<h2>We Celebrate Success Together</h2><p>Growth deserves recognition.</p><p>Whether someone masters a new skill...</p><p>Completes an Academy...</p><p>Receives positive feedback from a Member...</p><p>Helps a teammate through a difficult day...</p><p>Or simply demonstrates extraordinary kindness...</p><p>Those moments matter.</p>"
  },
  {
    "id": "ch9-s14",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Celebrate Success Together",
    "html": "<p class=\"kicker\">We Celebrate Success Together · continued</p><p>Celebrating success reminds us that progress is worth recognizing.</p><p>Encouragement inspires confidence.</p><p>Confidence encourages growth.</p><p>And growth strengthens our entire team.</p>"
  },
  {
    "id": "ch9-s15",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A busy afternoon leaves one department running behind.</p><p>Without being asked, team members from another area step in to help.</p><p>Phones are answered.</p><p>Rooms are reset.</p><p>Patients are transported.</p><p>Questions are answered.</p><p>No one says,</p>"
  },
  {
    "id": "ch9-s16",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>\"That's not my job.\"</p><p>Instead, everyone focuses on a shared goal:</p><p>Helping Pets.</p><p>Supporting Members.</p><p>Supporting one another.</p><p>By the end of the day, no one remembers exactly who completed which task.</p><p>They remember that the team came together when it mattered most.</p>"
  },
  {
    "id": "ch9-s17",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch9-s18",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Accountability Builds Trust",
    "html": "<h2>Accountability Builds Trust</h2><p>Strong teams hold themselves accountable.</p><p>That means honoring commitments.</p><p>Following through.</p><p>Owning mistakes.</p><p>Communicating honestly.</p><p>Helping solve problems instead of avoiding them.</p><p>Accountability is not about punishment.</p>"
  },
  {
    "id": "ch9-s19",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Accountability Builds Trust",
    "html": "<p class=\"kicker\">Accountability Builds Trust · continued</p><p>It is about reliability.</p><p>When teammates know they can depend on one another, trust grows naturally.</p><p>That trust becomes one of the greatest strengths of any organization.</p>"
  },
  {
    "id": "ch9-s20",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Grow by Helping Others Grow",
    "html": "<h2>We Grow by Helping Others Grow</h2><p>One of the most rewarding moments in a career is realizing someone succeeded because of your encouragement.</p><p>Perhaps you answered a question.</p><p>Shared your experience.</p><p>Offered reassurance.</p><p>Provided thoughtful coaching.</p><p>Or simply believed in someone before they believed in themselves.</p><p>Leadership begins in those moments.</p>"
  },
  {
    "id": "ch9-s21",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Grow by Helping Others Grow",
    "html": "<p class=\"kicker\">We Grow by Helping Others Grow · continued</p><p>Helping others grow is one of the greatest contributions we can make to Hannah.</p><p>Because every person we help today may become tomorrow's mentor, coach, or leader.</p>"
  },
  {
    "id": "ch9-s22",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Protect the Culture We Are Building",
    "html": "<h2>We Protect the Culture We Are Building</h2><p>Culture is precious.</p><p>It takes years to build.</p><p>It can be damaged quickly.</p><p>Every team member shares responsibility for protecting the kind of workplace we want Hannah to be.</p><p>That means treating one another with kindness.</p><p>Addressing concerns respectfully.</p><p>Welcoming new team members.</p>"
  },
  {
    "id": "ch9-s23",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "We Protect the Culture We Are Building",
    "html": "<p class=\"kicker\">We Protect the Culture We Are Building · continued</p><p>Speaking well of one another.</p><p>Resolving conflict professionally.</p><p>Choosing collaboration over competition.</p><p>The culture we experience tomorrow depends upon the choices we make today.</p>"
  },
  {
    "id": "ch9-s24",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>Think about someone who made you feel truly welcome when you joined a new team.</p><p class=\"emphasis\">What did they do that made such a difference?</p><p>Now consider this:</p><p class=\"emphasis\">How can you become that person for someone else?</p><p>Sometimes the smallest gestures create the strongest sense of belonging.</p><label class=\"reflection-label\" for=\"reflection-ch9\">My reflection</label><textarea id=\"reflection-ch9\" data-reflection-key=\"chapter-9\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch9-s25",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>During your next week at Hannah, intentionally invest in one teammate.</p><p>Offer help before they ask.</p><p>Express appreciation for something they do well.</p><p>Share knowledge.</p><p>Encourage someone who seems overwhelmed.</p><p>Or simply ask,</p><p>\"How can I help?\"</p>"
  },
  {
    "id": "team-circle",
    "chapter": "Chapter 9 · Our Commitment to One Another",
    "template": "visual",
    "label": "Team Circle visual",
    "html": "<p class=\"kicker\">Full-Page Interactive Infographic</p><h1>The Hannah Team Circle™</h1><p class=\"team-circle-intro\">Every Role Matters</p><div class=\"team-orbit\" style=\"--count:14\"><div class=\"team-center\"><span class=\"team-pets\">🐾</span><strong>Pets &amp; Members</strong><small>Everything we do begins and ends with improving the lives of Pets, Members, and one another.</small></div><button style=\"--i:0\" data-detail=\"Develop people, strengthen culture, and remove obstacles so teams can do their best work.\">Leadership</button><button style=\"--i:1\" data-detail=\"Build trusted relationships and guide Members through every stage of their Hannah journey.\">Member Advocates</button><button style=\"--i:2\" data-detail=\"Support clinical excellence by ensuring our teams have the systems, resources, and guidance they need to succeed.\">Medical Operations</button><button style=\"--i:3\" data-detail=\"Provide medical leadership, clinical expertise, and thoughtful decision-making.\">DVMs</button><button style=\"--i:4\" data-detail=\"Provide medical leadership, clinical expertise, and thoughtful decision-making.\">Pet Practitioners</button><button style=\"--i:5\" data-detail=\"Deliver compassionate nursing care while advocating for every Pet’s well-being.\">PetNurses</button><button style=\"--i:6\" data-detail=\"Support safe, efficient care and help every medical team succeed.\">Nurse Aides</button><button style=\"--i:7\" data-detail=\"Support the medications and resources that help Pets receive thoughtful care.\">Pharmacy</button><button style=\"--i:8\" data-detail=\"Support Hannah’s people, culture, policies, and workplace experience so every team member can thrive.\">Team Resources</button><button style=\"--i:9\" data-detail=\"Maintain safe, welcoming environments where Pets, Members, and team members can thrive.\">Facilities</button><button style=\"--i:10\" data-detail=\"Share Hannah’s story and connect more Pets and families with lifelong care.\">Marketing</button><button style=\"--i:11\" data-detail=\"Create reliable technology that allows exceptional care to happen without interruption.\">IT</button><button style=\"--i:12\" data-detail=\"Steward resources responsibly so Hannah can continue investing in Pets, Members, and our teams.\">Finance</button><button style=\"--i:13\" data-detail=\"Coordinate service and communication so Members receive timely, connected support throughout their Hannah journey.\">Service Coordinators</button></div><div id=\"teamDetail\" class=\"team-detail-panel\">Select a role to discover how it supports Pets, Members, and the Team.</div><div class=\"values-ring\"><span>Respect</span><span>Trust</span><span>Learning</span><span>Compassion</span><span>Communication</span><span>Accountability</span><span>Service</span><span>Growth</span><span>Teamwork</span><span>Integrity</span></div><p class=\"closing-line\">One Team. One Mission. Countless Lives Changed Together.</p>"
  },
  {
    "id": "chapter-10-opener",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "quote",
    "label": "Chapter 10 opener",
    "html": "<p class=\"kicker\">Chapter 10</p><h1>Before You Begin</h1><div class=\"truth-block\"><span>Hannah Truth #11</span><blockquote>Every expert was once a beginner. Every great journey begins with a single step.</blockquote></div>"
  },
  {
    "id": "ch10-s1",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Welcome to Your Journey",
    "html": "<h2>Welcome to Your Journey</h2><p>Whether this is your first day in veterinary medicine or the next chapter in a long and successful career, welcome.</p><p>You are beginning a journey that will challenge you, inspire you, and help you grow in ways you may not yet imagine.</p><p>There will be moments when you feel confident.</p><p>There will be moments when you feel uncertain.</p><p>Both are part of learning.</p><p>No one arrives at Hannah knowing everything.</p><p>No one is expected to.</p>"
  },
  {
    "id": "ch10-s2",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Welcome to Your Journey",
    "html": "<p class=\"kicker\">Welcome to Your Journey · continued</p><p>What matters most is your willingness to learn, to ask questions, and to care deeply about the lives entrusted to us.</p><p>Today is not about proving yourself.</p><p>It is about beginning.</p>"
  },
  {
    "id": "ch10-s3",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Bring Your Whole Self",
    "html": "<h2>Bring Your Whole Self</h2><p>Every person who joins Hannah brings something unique.</p><p>Your experiences.</p><p>Your talents.</p><p>Your personality.</p><p>Your perspective.</p><p>Your ideas.</p><p>Your compassion.</p>"
  },
  {
    "id": "ch10-s4",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Bring Your Whole Self",
    "html": "<p class=\"kicker\">Bring Your Whole Self · continued</p><p>We don't expect everyone to think the same way.</p><p>In fact, diverse perspectives make us stronger.</p><p>We ask only that you bring your best self each day—with humility, curiosity, and a commitment to our shared purpose.</p><p>The culture of Hannah is shaped by the people who choose to invest in it.</p><p>Starting today, that includes you.</p>"
  },
  {
    "id": "ch10-s5",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Give Yourself Permission to Learn",
    "html": "<h2>Give Yourself Permission to Learn</h2><p>There will be moments when you don't know the answer.</p><p>That's okay.</p><p>There will be skills that take time to master.</p><p>That's expected.</p><p>There will be situations you've never encountered before.</p><p>That's how experience is gained.</p><p>Don't measure yourself against someone who has been practicing for ten years.</p>"
  },
  {
    "id": "ch10-s6",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Give Yourself Permission to Learn",
    "html": "<p class=\"kicker\">Give Yourself Permission to Learn · continued</p><p>Measure yourself against who you were yesterday.</p><p>Progress—not perfection—is the goal.</p><p>Every question you ask is an investment in your future.</p><p>Every lesson you learn makes you better prepared for the next opportunity to serve.</p>"
  },
  {
    "id": "ch10-s7",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Hannah Perspective",
    "html": "<p class=\"kicker\">Hannah Perspective</p>"
  },
  {
    "id": "ch10-s8",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Confidence Comes After Competence",
    "html": "<h2>Confidence Comes After Competence</h2><p>Many people believe they need confidence before they can succeed.</p><p>More often, the opposite is true.</p><p>Confidence grows from preparation.</p><p>From practice.</p><p>From repetition.</p><p>From learning.</p><p>From asking questions.</p>"
  },
  {
    "id": "ch10-s9",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Confidence Comes After Competence",
    "html": "<p class=\"kicker\">Confidence Comes After Competence · continued</p><p>From trying again.</p><p>Don't wait until you feel completely confident before stepping forward.</p><p>Allow yourself to grow into confidence through consistent effort and continuous learning.</p>"
  },
  {
    "id": "ch10-s10",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Relationships Matter",
    "html": "<h2>Relationships Matter</h2><p>The work you do will always matter.</p><p>The relationships you build will determine how meaningful that work becomes.</p><p>Get to know your teammates.</p><p>Learn from them.</p><p>Support them.</p><p>Celebrate with them.</p><p>Ask for help when you need it.</p>"
  },
  {
    "id": "ch10-s11",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Relationships Matter",
    "html": "<p class=\"kicker\">Relationships Matter · continued</p><p>Offer help when you can.</p><p>The strongest teams aren't made up of people who never struggle.</p><p>They're made up of people who never struggle alone.</p>"
  },
  {
    "id": "ch10-s12",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Remember Why You Chose This Profession",
    "html": "<h2>Remember Why You Chose This Profession</h2><p>There will be busy days.</p><p>Stressful days.</p><p>Emotionally difficult days.</p><p>Days when you leave feeling exhausted.</p><p>During those moments, pause and remember why you began.</p><p>Perhaps it was your love for animals.</p><p>Perhaps it was your desire to help people.</p>"
  },
  {
    "id": "ch10-s13",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Remember Why You Chose This Profession",
    "html": "<p class=\"kicker\">Remember Why You Chose This Profession · continued</p><p>Perhaps someone once made a difference in your own life, and now you hope to do the same for others.</p><p>Whatever brought you here...</p><p>Protect it.</p><p>Purpose is one of the greatest sources of resilience.</p>"
  },
  {
    "id": "ch10-s14",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<h2>The Hannah Way</h2><p>A new team member is hesitant to ask a question during a busy afternoon.</p><p>They worry about interrupting others or appearing inexperienced.</p><p>A senior teammate notices and quietly says,</p><p>\"If you're wondering, someone else probably is too. Ask the question.\"</p><p>The answer takes less than a minute.</p><p>The confidence it creates lasts much longer.</p><p>Months later, that same team member notices another new hire hesitating.</p>"
  },
  {
    "id": "ch10-s15",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "The Hannah Way",
    "html": "<p class=\"kicker\">The Hannah Way · continued</p><p>Without thinking twice, they smile and say,</p><p>\"Go ahead. Ask the question.\"</p><p>Culture isn't only taught.</p><p>It's passed from one person to another.</p><p>That is the Hannah Way.</p>"
  },
  {
    "id": "ch10-s16",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "You Will Help Shape Hannah",
    "html": "<h2>You Will Help Shape Hannah</h2><p>When people first join an organization, they often wonder,</p><p>\"How will this place change me?\"</p><p>That is an important question.</p><p>But there is another question that matters just as much.</p><p>\"How will I help shape this place?\"</p><p>Culture is not something created only by leaders.</p><p>It is built by every person, every day.</p>"
  },
  {
    "id": "ch10-s17",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "You Will Help Shape Hannah",
    "html": "<p class=\"kicker\">You Will Help Shape Hannah · continued</p><p>Through your kindness.</p><p>Your professionalism.</p><p>Your integrity.</p><p>Your willingness to learn.</p><p>Your commitment to others.</p><p>Your ideas.</p><p>Your actions.</p>"
  },
  {
    "id": "ch10-s18",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "You Will Help Shape Hannah",
    "html": "<p class=\"kicker\">You Will Help Shape Hannah · continued</p><p>You are not simply joining Hannah.</p><p>Beginning today, you become part of its future.</p>"
  },
  {
    "id": "ch10-s19",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<h2>Hannah Reflection</h2><p>As you begin your journey, ask yourself:</p><p class=\"emphasis\">What kind of teammate do I want to be?</p><p>What impact do I hope to have on the Pets and Members I serve?</p><p class=\"emphasis\">What strengths do I bring?</p><p class=\"emphasis\">What skills do I hope to develop?</p><p>How will I help make Hannah even better than it is today?</p><p>There are no perfect answers.</p><label class=\"reflection-label\" for=\"reflection-ch10\">My reflection</label><textarea id=\"reflection-ch10\" data-reflection-key=\"chapter-10\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch10-s20",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "reflection",
    "label": "Hannah Reflection",
    "html": "<p class=\"kicker\">Hannah Reflection · continued</p><p>Only honest ones.</p><label class=\"reflection-label\" for=\"reflection-ch10\">My reflection</label><textarea id=\"reflection-ch10\" data-reflection-key=\"chapter-10\" rows=\"7\" placeholder=\"Write your thoughts here…\"></textarea><div class=\"reflection-actions\"><button type=\"button\" class=\"primary-button save-reflection\">Save reflection</button><span class=\"reflection-status\" role=\"status\" aria-live=\"polite\"></span></div><p class=\"small-note\">Your response is saved in this browser for this prototype.</p>"
  },
  {
    "id": "ch10-s21",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "Putting It Into Practice",
    "html": "<h2>Putting It Into Practice</h2><p>During your first few weeks at Hannah, challenge yourself to:</p><p>Introduce yourself to someone you don't know.</p><p>Ask at least one thoughtful question every day.</p><p>Learn the name of a Pet and a Member you'll remember.</p><p>Thank someone who helped you.</p><p>Reflect each week on something new you've learned.</p><p>Small habits create extraordinary careers.</p>"
  },
  {
    "id": "ch10-s22",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "A New Beginning",
    "html": "<h2>A New Beginning</h2><p>This is not the end of your orientation.</p><p>It is the beginning of your Hannah story.</p><p>The chapters you've read introduced our mission, our principles, our culture, and our commitment to learning.</p><p>The chapters that follow will help you turn those ideas into everyday actions.</p><p>As you continue through the Hannah Learning System™, remember one simple truth:</p><p>No one expects you to know everything.</p><p>We simply ask that you arrive each day ready to learn, ready to serve, and ready to care.</p>"
  },
  {
    "id": "ch10-s23",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "A New Beginning",
    "html": "<p class=\"kicker\">A New Beginning · continued</p><p>Welcome to Hannah.</p><p>Your journey starts now.</p>"
  },
  {
    "id": "ch10-s24",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "prose",
    "label": "End of Part I",
    "html": "<h2>End of Part I</h2>"
  },
  {
    "id": "first-weeks-challenge",
    "chapter": "Chapter 10 · Before You Begin",
    "template": "activity",
    "label": "My First Weeks at Hannah",
    "html": "<p class=\"kicker\">Putting It Into Practice</p><h1>My First Weeks at Hannah</h1><p>Small habits create extraordinary careers.</p><div class=\"challenge-list\" data-checklist=\"first-weeks\"><label><input type=\"checkbox\" value=\"introduce\"> Introduce yourself to someone you don’t know.</label><label><input type=\"checkbox\" value=\"question\"> Ask at least one thoughtful question every day.</label><label><input type=\"checkbox\" value=\"names\"> Learn the name of a Pet and a Member you’ll remember.</label><label><input type=\"checkbox\" value=\"thank\"> Thank someone who helped you.</label><label><input type=\"checkbox\" value=\"reflect\"> Reflect each week on something new you’ve learned.</label></div><div class=\"challenge-progress\"><span id=\"challengeCount\">0 of 5 complete</span><progress id=\"challengeProgress\" max=\"5\" value=\"0\"></progress></div>"
  },
  {
    "id": "part-complete",
    "chapter": "Part I Complete",
    "template": "graduation",
    "label": "Part I complete",
    "html": "<div class=\"graduation-card\"><img class=\"graduation-heart\" src=\"assets/hannah-heart.png\" alt=\"Hannah heart\"><p class=\"kicker\">Part I Complete</p><h1>Congratulations!</h1><h2>You have completed <em>The Heart of Hannah</em></h2><p>You explored our story, mission, principles, commitments, and learning philosophy.</p><div class=\"achievement-card\"><span>Achievement Unlocked</span><strong>The Heart of Hannah</strong><small id=\"completionDate\"></small></div><blockquote class=\"graduation-message\">“The Pets you’ll care for haven’t met you yet…<br>but because you’re here today, their lives may already be changing.”</blockquote><div class=\"graduation-actions\"><button id=\"completePartButton\" type=\"button\" class=\"primary-button\">Celebrate Completion</button><button id=\"replayCelebration\" type=\"button\" class=\"secondary-button\" hidden>Replay Celebration</button><button id=\"toggleMusic\" type=\"button\" class=\"secondary-button\" aria-pressed=\"false\">Music: On</button></div><p id=\"completeStatus\" role=\"status\" aria-live=\"polite\"></p><audio id=\"celebrationAudio\" preload=\"auto\" src=\"assets/hannah-celebration.wav\"></audio><div id=\"confettiStage\" class=\"confetti-stage\" aria-hidden=\"true\"></div><button id=\"continuePartTwo\" type=\"button\" class=\"continue-button\">Continue to Part II →</button></div>"
  }
];
