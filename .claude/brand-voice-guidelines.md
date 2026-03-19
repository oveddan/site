# Dan Oved — Brand Voice Guidelines

## Generation Metadata
- Created: 2026-03-16
- Version: 1
- Sources: Portfolio site (github.com/oveddan/site), Blog (github.com/oveddan/blog), Medium TensorFlow.js article (gold standard reference)
- Documents processed: 42 (11 portfolio articles, 15 meta descriptions, 5 old portfolio pieces, 1 about page, ~20 blog posts, 1 published Medium article)
- Conversations analyzed: 0
- Discovery report used: No
- Overall confidence: High

---

## Executive Summary

Dan Oved's voice is that of a technically rigorous creative technologist who thinks in systems, learns in public, and builds across disciplines. His writing combines the precision of an engineer with the curiosity of an artist-researcher — moving fluently between code snippets and philosophical questions, fabrication details and conceptual framing.

What makes Dan's voice distinctive is his willingness to document process honestly, including failures and dead ends. He treats every project as an investigation rather than a product, asking "what if" questions that ground technical work in human experience. The result is writing that feels like a smart, generous colleague walking you through their thinking — never lecturing, never oversimplifying, always inviting you to look closer.

His polished voice (as seen in the TensorFlow.js PoseNet article and refined portfolio descriptions) is concise, technically precise, and impact-oriented while retaining warmth. It uses a distinctive **conversational Q&A structure** — posing the reader's likely questions in bold ("So what is pose estimation anyway?", "Ok, and why is this exciting to begin with?") then answering them clearly. It employs **progressive disclosure**, structuring content from simple to complex with explicit off-ramps ("If you've read this far, you know enough to get started... This is probably a good stopping point"). And it always **defines terms before using them**, making even advanced ML concepts accessible without dumbing them down.

His exploratory voice (blog posts, process documentation) is more conversational, more willing to admit uncertainty, and richer in narrative detail. Both registers share the same core personality — and the polished voice should be treated as the target for all public-facing technical writing.

---

## We Are / We Are Not

| We Are | We Are Not |
|--------|------------|
| **Technically rigorous** — precise about methods, tools, and architecture | **Jargon-heavy for its own sake** — technical terms always serve explanation, never gatekeeping |
| **Intellectually curious** — driven by "what if" questions across disciplines | **Hype-driven** — never oversells technology or chases trends |
| **Honest about process** — documents failures, dead ends, and unknowns openly | **Polished to the point of inauthenticity** — never hides the messy reality of making |
| **Systems-minded** — thinks about how components, signals, and experiences connect | **Narrowly specialized** — never reduces work to a single domain or skill |
| **Generous with knowledge** — open-sources, explains methods, credits collaborators | **Self-promotional** — lets the work speak; shares process to help others learn |
| **Conceptually grounded** — anchors technical work in theory, research, and human questions | **Purely academic** — always builds, tests, and ships, not just theorizes |
| **Warm and approachable** — first-person, conversational, invites the reader in | **Casual or sloppy** — maintains clarity and structure even in informal writing |

### Voice Attributes Detail

#### Attribute 1: Technically Rigorous
- **What it means**: Every project is explained with specificity — naming tools, frameworks, hardware, algorithms, and the reasoning behind choices.
- **How it shows up**: Code snippets appear naturally alongside prose. Performance metrics and constraints are stated plainly. Architecture is described as signal flow.
- **What to avoid**: Dropping technical terms without context. Being precise doesn't mean being inaccessible.
- **Evidence**: "For the neural network framework I stuck with caffe since that's what the model is published in. I struggled for days but finally setup Ubuntu with caffe and cuda on my macbook pro, which has a basic NVIDIA GeForce GT 650M graphics card." (Presence blog)
- **Confidence**: Very High

#### Attribute 2: Intellectually Curious & Exploratory
- **What it means**: Projects begin with questions, not requirements. Work spans ML, audio synthesis, physical computing, fabrication, Web3 — driven by genuine interest.
- **How it shows up**: Opening paragraphs often pose a question. Projects reference research papers and books. New domains are approached with humility and excitement.
- **What to avoid**: Pretending expertise in unfamiliar domains. Curiosity means admitting what you don't know yet.
- **Evidence**: "What happens when we replace this source of randomness with something that occurs in a natural or organic form?" (Liquisynth); "I became interested in gaze tracking first through discovering the research paper Eye Tracking for Everyone" (Soul Reader)
- **Confidence**: Very High

#### Attribute 3: Honest About Process (Learning in Public)
- **What it means**: Documenting mistakes, incomplete attempts, and the messy middle of creation — not just polished results.
- **How it shows up**: Blog posts include "what went wrong" sections. Retrospectives acknowledge bugs and limitations. Language like "I struggled," "to be honest we don't understand," "I internally freaked out."
- **What to avoid**: Performative humility or self-deprecation. Honesty is matter-of-fact, not attention-seeking.
- **Evidence**: "Practicing and getting better at user testing has been a desire of mine since my startup, Tapactive, which was based on untested assumptions, failed" (Presence blog); "To be honest we don't understand what the circuit is doing, all we know is how to assemble it and that it works" (Solar Synth)
- **Confidence**: Very High

#### Attribute 4: Systems Thinker
- **What it means**: Viewing projects holistically — how audio connects to visuals, how sensors feed software, how latency affects experience, how components talk to each other.
- **How it shows up**: Diagrams show signal flow. Descriptions trace the path from input to output. Cross-domain integration (audio↔visual, hardware↔software, body↔machine) is a recurring theme.
- **What to avoid**: Getting lost in individual components without showing how they connect.
- **Evidence**: "This tight integration allows the viewer's brain to associate changes in visual and sound together, making the correlation clear. Additionally, the randomness that is sourced from these changes does not seem as computerized as if it was generated by a machine, but feels more natural as it's tied to something organic." (Liquisynth)
- **Confidence**: High

#### Attribute 5: Generous with Knowledge
- **What it means**: Open-sourcing code, explaining methods in detail, crediting collaborators and mentors by name, and believing documentation is a responsibility.
- **How it shows up**: Projects link to GitHub repos. Blog posts explain enough for others to reproduce. Credits appear in every project. The blog itself was motivated by wanting to share.
- **What to avoid**: Withholding process details for competitive advantage. Skipping attribution.
- **Evidence**: "One of the biggest takeaways from this talk is that even if you build something amazing, if no one sees and learns from it, then it's pretty wasteful" (About Writing a Blog)
- **Confidence**: Very High

#### Attribute 6: Conceptually Grounded
- **What it means**: Technical work is always anchored in a bigger question — about perception, agency, presence, the relationship between humans and machines.
- **How it shows up**: Projects reference Yuval Noah Harari, Chris Crawford, research on synaesthesia and gaze. Conceptual framing comes before technical description.
- **What to avoid**: Building just for the sake of building. Every project should investigate something.
- **Evidence**: "Every day millions of people decide to grant their smartphone a bit more control over their lives…in pursuit of health, happiness and power, humans will gradually change first one of their features and then another, and another, until they will no longer be human." (Self-Driving Human, referencing Harari)
- **Confidence**: High

#### Attribute 7: Warm & Collaborative
- **What it means**: Writing in first person, inviting readers into the process, crediting teammates, expressing genuine enthusiasm without hyperbole.
- **How it shows up**: First-person voice throughout. Phrases like "to my surprise," "I'm incredibly pleased." Named collaborators in every multi-person project. Tone of walking alongside the reader.
- **What to avoid**: Corporate distance. Third-person voice. Unattributed "we."
- **Evidence**: "I'm looking forward to opening up a new window into my world with you all" (About Writing a Blog); "Special thanks goes to..." (Liquisynth credits)
- **Confidence**: High

---

## Brand Personality

- **Archetype**: The Curious Builder — technically deep, artistically driven, always investigating
- **If Dan's brand were a person**: A polyglot engineer-artist who walks you through their workshop, explaining both the physics of a circuit and why they're interested in the philosophical question it explores. They'll show you the failed prototype next to the working one, because both matter.
- **Core values expressed in voice**: Intellectual honesty, creative rigor, generosity with knowledge, cross-disciplinary thinking, respect for craft

---

## Messaging Framework

### Primary Value Proposition
Creative technologist who bridges art, engineering, and research — building interactive systems that investigate how humans perceive and relate to technology.

### Key Message Pillars

1. **Cross-Disciplinary Maker**
   - Core idea: The most interesting work happens at the intersection of disciplines
   - When to use: Portfolio introductions, professional bios, project framing
   - Example phrasing: "combining real-time computer vision with physical fabrication to explore..."

2. **Technology as Investigation**
   - Core idea: Every project asks a question about human experience
   - When to use: Project descriptions, conceptual framing, talks
   - Example phrasing: "What would a future feel like when all of our decisions are made by these machines?"

3. **Open Process, Shared Learning**
   - Core idea: Documenting and sharing the full process — including failures — makes the work more valuable
   - When to use: Blog posts, talks, open-source projects
   - Example phrasing: "If no one sees and learns from it, then it's pretty wasteful"

---

## Tone-by-Context Matrix

Voice is constant. Tone flexes by context.

| Context | Formality | Energy | Technical Depth | Key Principle |
|---------|-----------|--------|-----------------|---------------|
| Portfolio summary (meta) | Medium-High | Medium | Medium | Concise impact; let work speak |
| Portfolio article | Medium | Medium-High | High | Show the system; explain the why |
| Blog post (process) | Low-Medium | High | High | Document honestly; invite reader in |
| Blog post (conceptual) | Medium | Medium | Medium | Ground in theory; pose questions |
| Professional bio / About | Medium-High | Medium | Low-Medium | Polyglot builder; credible range |
| Technical article (published) | Medium-High | Medium | Very High | Precise, accessible, impactful |
| Open-source README | Medium | Medium | High | Enable others to use and learn |

### Context-Specific Guidelines

#### Portfolio Summaries (Meta Descriptions)
- **Overall tone**: Professional, concise, impact-oriented
- **Opening approach**: Lead with what the project IS, then what it DOES for users
- **Do's**: Name specific technologies; state your role clearly; link to demos/code
- **Don'ts**: Over-explain; use marketing language; bury the lede
- **Example**: "BodyPix is an open-source machine learning model which allows for person and body-part segmentation. In collaboration with researchers at Google I open-sourced a TensorFlow.js version of the model."

#### Portfolio Articles (Long-Form)
- **Overall tone**: Investigative, detailed, show-don't-tell
- **Opening approach**: Start with the motivating question or embedded video/image
- **Do's**: Include architecture diagrams; explain signal flow; show iterations; credit collaborators
- **Don'ts**: Skip the "why"; present only the polished result; omit technical specifics
- **Example**: Open with an embedded video, then explain the concept, then walk through the technical system

#### Blog Posts (Process Documentation)
- **Overall tone**: Conversational, honest, learning-focused
- **Opening approach**: Context ("For this class..." / "I became interested in...")
- **Do's**: Document failures alongside successes; include photos of physical process; explain what you'd do differently
- **Don'ts**: Polish away the struggle; skip attribution; leave code without explanation
- **Example**: "I struggled for days but finally setup Ubuntu with caffe and cuda..."

#### Published Technical Articles (Gold Standard)
- **Overall tone**: Precise, accessible, pedagogically aware, warm
- **Opening approach**: Announce what was built + link to demo in the first paragraph. Credit collaborators immediately after.
- **Structure**: Use conversational Q&A headers ("So what is X anyway?", "Ok, and why is this exciting?"). Build from simple → complex with explicit off-ramps for different reader levels.
- **Do's**: Define every term before using it; bold key terms on first use; use concrete examples with real numbers; include minimal, purposeful code snippets with plain-English explanations; address privacy/ethical concerns proactively; end with mission and invitation
- **Don'ts**: Assume reader knowledge; dump walls of code; skip attribution; use passive voice; end without a call to action
- **Key techniques from PoseNet article**: Progressive disclosure, conversational Q&A structure, "define before use" pattern, collaborative "we" with named individuals, mission-driven closing
- **Example opening**: "In collaboration with Google Creative Lab, I'm excited to announce the release of a TensorFlow.js version of PoseNet, a machine learning model which allows for real-time human pose estimation in the browser."

#### Professional Bio
- **Overall tone**: Confident but not boastful; emphasize range
- **Do's**: Mention both engineering and art practice; name notable collaborators/institutions (Google, NYT R&D, ITP)
- **Don'ts**: Use third-person voice throughout (first person is more authentic); list technologies without context

---

## Terminology Guide

### Preferred Terms
| Term | Usage | Example |
|------|-------|---------|
| "machine learning" / specific model names | Instead of generic "AI" | "using PoseNet for real-time pose estimation" |
| "signal flow" | Describing system architecture | "the signal flow from sensor to visualization" |
| "real-time" | Emphasizing latency-critical systems | "real-time collaborative platform" |
| "open-source" / "open-sourced" | Sharing work publicly | "I open-sourced a TensorFlow.js version" |
| "interactive installation" | Art-tech hybrid work | — |
| "fabrication" / "fabricated" | Physical making process | "I designed and laser cut some black acrylic" |

### Avoid These Terms
| Term | Reason | Alternative |
|------|--------|-------------|
| "revolutionary" / "breakthrough" | Hype language; doesn't match voice | State what it does; let reader judge |
| "disrupting" / "disruptive" | Startup cliché | Describe the specific problem being addressed |
| "leverage" (as verb) | Corporate jargon | "use," "build on," "extend" |
| "utilize" | Unnecessarily formal | "use" |
| Generic "AI" (without specificity) | Too vague for Dan's precision | Name the model, technique, or approach |

---

## Language That Works

### Top Phrases & Patterns
1. **"What happens when..." / "What would it feel like if..."** — Opens with investigation; invites reader
2. **"So what is X anyway?" / "Ok, and why is this exciting?"** — Conversational Q&A headers that anticipate reader questions (polished voice)
3. **"To be clear, this is not..." / "What's more..."** — Proactively addresses misconceptions, then adds surprising benefits
4. **"To my surprise..."** — Creates shared discovery moment
5. **"I struggled with... but eventually..."** — Honest process documentation
6. **"This tight integration allows..."** — Explains WHY technical choices matter
7. **"I became interested in X through discovering..."** — Shows intellectual lineage
8. **"A lot of work went into..." / "Let's go over the basics of..."** — Acknowledges effort, then makes it accessible
9. **"It's our hope that..." / "We'd love to see what you make"** — Mission-driven, invitational closings
10. **"If you've read this far, you know enough to..."** — Explicit off-ramps that respect reader's time

### Sentence Rhythm
- Pairs short punchy observations with longer explanatory sentences
- Active voice predominates ("I designed," "I tested," not "was designed")
- Present tense for technical description creates immediacy
- Questions at openings and closings create engagement loops

---

## Language to Avoid

### Anti-Patterns
1. **Hype without substance** — Problem: Undermines credibility. Better: State specific capabilities and let the reader assess impact.
2. **Third-person self-reference** — Problem: Creates artificial distance from Dan's warm, first-person voice. Better: "I built..." not "Dan Oved developed..."
3. **Unattributed "we"** — Problem: Obscures who did what. Better: Name collaborators or use "I" for solo work.
4. **Jargon without explanation** — Problem: Excludes readers unnecessarily. Better: Use precise terms but provide enough context.
5. **Polishing away failures** — Problem: Loses the honest, process-oriented quality that makes the voice distinctive. Better: Include what went wrong alongside what worked.

---

## Gold Standard Reference: The PoseNet Medium Article

The article "Real-time Human Pose Estimation in the Browser with TensorFlow.js" (7.9K claps, published on TensorFlow's Medium) represents Dan's ideal polished voice. It was professionally edited but retains his core personality. Every guideline below should be measured against this benchmark.

### Key Techniques in the Gold Standard

**1. Conversational Q&A Structure**
Uses the reader's likely questions as bold section headers, then answers them directly:
> **"So what is pose estimation anyway?"** Pose estimation refers to computer vision techniques that detect human figures in images and video, so that one could determine, for example, where someone's elbow shows up in an image.

> **"Ok, and why is this exciting to begin with?"** Pose estimation has many uses, from interactive installations that react to the body to augmented reality, animation, fitness uses, and more.

This makes technical content feel like a conversation rather than a lecture.

**2. Progressive Disclosure with Explicit Off-Ramps**
Structures content from accessible to advanced, telling the reader when they can stop:
> **"If you've read this far, you know enough to get started with the PoseNet demos. This is probably a good stopping point."** If you're curious to know more about the technical details of the model and implementation, we invite you to continue reading below.

Section titled "For Curious Minds: A Technical Deep Dive" signals that deeper content is optional.

**3. Define Before You Use**
Every technical term is defined plainly before it's used in context. Terms are bolded on first use. Definitions use concrete examples ("where someone's elbow shows up in an image") not abstract language.

**4. Proactive Privacy/Ethics Framing**
Addresses potential concerns before the reader raises them:
> "To be clear, this technology is **not** recognizing *who* is in an image — there is no personal identifiable information associated to pose detection."

**5. Collaborative "We" with Named Attribution**
Uses "we" for the team effort, but names individuals:
> "Before we dig into the details...a shoutout to all the folks who made this project possible: George Papandreou and Tyler Zhu, Google researchers behind the papers..."

**6. Mission-Driven Closing**
Ends with impact and invitation, not just a summary:
> "It's our hope that as more models are ported to TensorFlow.js, the world of machine learning becomes more accessible, welcoming, and fun to new coders and makers. PoseNet on TensorFlow.js is a small attempt at making that possible. We'd love to see what you make."

**7. Code Examples Are Minimal and Purposeful**
Just enough code to show usage — never a wall of code without explanation. Each code block is preceded by a plain-English description of what it does.

---

## Content Examples

### Gold Standard Example (Published Technical Article)
> "In collaboration with Google Creative Lab, I'm excited to announce the release of a TensorFlow.js version of PoseNet, a machine learning model which allows for **real-time human pose estimation in the browser.** Try a live demo here."

**What makes it work**: Opens with collaboration credit. States what it IS in one sentence. Bolds the key capability. Links to demo immediately. Excitement is expressed directly ("I'm excited") without hyperbole.

### Gold Standard Example (Explaining Complex Concepts Accessibly)
> "Each heatmap is a 3D tensor of size **resolution x resolution x 17**, since 17 is the number of keypoints detected by PoseNet. For example, with an image size of 225 and output stride of 16, this would be 15x15x17."

**What makes it work**: Abstract concept (3D tensor) immediately followed by concrete numbers. "For example" bridges theory to practice. Reader can visualize the actual data structure.

### Excellent Example (Polished Portfolio Voice)
> "BodyPix is an open-source machine learning model which allows for person and body-part segmentation. In collaboration with researchers at Google I open-sourced a TensorFlow.js version of the model."

**What makes it work**: Concise. Names the technology precisely. Credits collaboration. States impact (open-source). No filler words.

### Excellent Example (Exploratory Blog Voice)
> "What happens when we replace this source of randomness with something that occurs in a natural or organic form? Using an analog video signal from a camera pointed at a viscous liquid, the randomness driving an analog synthesizer becomes derived from an organic visual form."

**What makes it work**: Opens with a question. Answers it specifically. Links the conceptual (randomness, organic form) to the technical (analog video signal, synthesizer). One idea per sentence.

### Excellent Example (Honest Process Voice)
> "Practicing and getting better at user testing has been a desire of mine since my startup, Tapactive, which was based on untested assumptions, failed."

**What makes it work**: Vulnerable without being dramatic. Draws a concrete lesson from failure. Single sentence carries a whole narrative arc.

---

## Confidence Scores

| Section | Confidence | Basis | Sources |
|---------|------------|-------|---------|
| Voice Attributes | Very High | Consistent across 40+ documents spanning 5+ years | 41 sources |
| Messaging Framework | High | Inferred from recurring themes; no explicit brand statement exists | 30+ sources |
| Tone Matrix | High | Clear variation between portfolio, blog, and professional contexts | 41 sources |
| Terminology | High | Consistent word choices across technical writing | 25+ sources |
| Language Patterns | High | Strong recurring patterns in openings, closings, sentence structure | 30+ sources |

---

## Open Questions for Team Discussion

### Medium Priority (improves quality)

1. **How formal should the About/Bio page be?**
   - What was found: Current about page mixes first and third person; blog voice is consistently first-person and warmer
   - Agent recommendation: Rewrite the About page in first person to match the dominant voice. Use third person only in contexts where it's expected (conference bios, press mentions).
   - Need from you: Confirm preference for first-person About page

2. **Should portfolio summaries include more "why" framing?**
   - What was found: Meta descriptions are concise and impact-focused but don't always convey the investigative spirit that makes the blog posts compelling
   - Agent recommendation: Add a single "motivating question" sentence to each portfolio summary to bridge the professional and exploratory voices
   - Need from you: Review proposed edits for portfolio summaries

3. **How should the TensorFlow.js article voice (polished, edited, technical-yet-accessible) relate to the rest of the portfolio?**
   - What was found: The Medium article represents the most refined version of Dan's voice — professional editing brought out clarity and accessibility while preserving technical depth
   - Agent recommendation: Use this as the target voice for all portfolio articles. Blog posts can remain more conversational.
   - Need from you: Confirm whether the TensorFlow.js article tone should be the standard for portfolio pieces

---

## Data Gaps & Recommendations

- [x] **Medium TensorFlow.js article**: Analyzed (25-page PDF). Now serves as gold standard reference throughout these guidelines.
- [ ] **Professional presentations / talks**: No slide decks or talk transcripts were analyzed. These would reveal how Dan's voice adapts to live audiences.
- [ ] **Client-facing communication**: No emails, proposals, or client correspondence analyzed. Would reveal professional voice in direct communication.
- [ ] **Social media presence**: Twitter/X, LinkedIn posts not analyzed. Would show how voice compresses for short-form.

---

## Appendix: Sources

| # | Source | Platform | Type | Key Sections Used | Confidence |
|---|--------|----------|------|-------------------|------------|
| 1 | Portfolio site (11 articles + 15 meta descriptions) | GitHub/oveddan/site | AUTHORITATIVE | All project descriptions and articles | High |
| 2 | Blog (20+ posts across 10 categories) | GitHub/oveddan/blog | OPERATIONAL | Process documentation, conceptual writing, reflections | High |
| 3 | About page | Portfolio site | AUTHORITATIVE | Professional positioning | Medium |
| 4 | Old portfolio content (5 pieces) | Portfolio site /content_old | HISTORICAL | Earlier voice samples | Medium |
| 5 | "Real-time Human Pose Estimation in the Browser with TensorFlow.js" (Medium, 7.9K claps) | Medium/TensorFlow | GOLD STANDARD | Full article — voice benchmark for polished technical writing | Very High |
