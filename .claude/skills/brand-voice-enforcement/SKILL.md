---
name: brand-voice-enforcement
description: >
  This skill applies brand voice guidelines when generating or editing content for
  this portfolio site. It should be used when the user asks to "write a project
  description", "write a portfolio article", "write a blog post", "update the
  about page", "write a bio", "add a new project", "rewrite this section", or any
  content creation/editing request for this site. Also triggers on "on-brand",
  "brand voice", "in my voice", "make this sound like me", "rewrite this in my
  tone", or "this doesn't sound right".
---
# Brand Voice Enforcement
Apply brand voice guidelines when generating or editing content for this portfolio site. Load the guidelines, apply voice constants and tone flexes to the content request, validate output, and explain brand choices.
## Loading Brand Guidelines
Find the user's brand guidelines using this sequence. Stop as soon as you find them:
1. **Session context** — Check if brand guidelines were provided earlier in this session. If so, they are already in the conversation. Use them directly.
2. **Local guidelines file** — Read `.claude/brand-voice-guidelines.md` from the project root directory.
3. **Ask the user** — If none of the above found guidelines, tell the user:
   "I couldn't find your brand guidelines. You can paste guidelines directly into this chat or point me to a file."
   Wait for the user to provide guidelines before proceeding.
## Enforcement Workflow
### 1. Analyze the Content Request
Before writing, identify:
- **Content type**: portfolio summary (meta), portfolio article, blog post (process or conceptual), about/bio page, open-source README
- **Target audience**: who will read this — technical peers, potential collaborators, general audience
- **Key messages needed**: which message pillars apply (cross-disciplinary maker, technology as investigation, open process)
- **Specific requirements**: length, format, tone overrides
### 2. Apply Voice Constants
Voice is the brand's personality — it stays constant across all content:
- Apply "We Are / We Are Not" attributes from guidelines
- Use brand personality consistently
- Incorporate approved terminology; reject prohibited terms
- Follow messaging framework and value propositions
Use the "voice constant, tone flexes" model: voice is WHO you are (constant), tone is HOW you say it (flexes by context).
### 3. Flex Tone for Context
Tone adapts by content type and audience. Use the tone-by-context matrix from guidelines to set:
- **Formality**: How formal or casual should this be?
- **Energy**: How much urgency or enthusiasm?
- **Technical depth**: How detailed or accessible?
### 4. Generate Content
Create content that:
- Matches brand voice attributes throughout
- Follows tone guidelines for this specific content type
- Incorporates key messages naturally (not forced)
- Uses preferred terminology
- Mirrors the quality and style of guideline examples
### 5. Validate and Explain
After generating content:
- Briefly highlight which brand guidelines were applied
- Explain key voice and tone decisions
- Note any areas where guidelines were adapted for context
- Offer to refine based on feedback
## Handling Conflicts
When the user's request conflicts with brand guidelines:
1. Explain the conflict clearly
2. Provide a recommendation
3. Offer options: follow guidelines strictly, adapt for context, or override
Default to adapting guidelines with an explanation of the tradeoff.
## Open Questions Awareness
Open questions are unresolved brand positioning decisions flagged during guideline generation, stored in the guidelines under an "Open Questions" section. When generating content, check if the brand guidelines contain open questions:
- If content touches an unresolved open question, note it
- Apply the agent's recommendation from the open question unless the user specifies otherwise
- Suggest resolving the question if it significantly impacts the content
