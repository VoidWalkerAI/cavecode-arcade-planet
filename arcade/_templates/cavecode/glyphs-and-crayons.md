# CaveCode Glyphs & Crayons

CaveCode uses a simple legend so anyone can tell:

- what is safe to change
- what is dangerous to touch
- what is game logic
- what is just display text

---

## 🪨 Locked Block

**Symbol:** 🪨

- Engine logic
- Core rules
- Foundational philosophy

Change only if you know exactly what you’re doing.
AI should treat these as **read-only**, unless explicitly asked to refactor.

---

## 🖍️ Human Edit Zone

**Symbol:** 🖍️

- Safe for non-coders to change
- Difficulty knobs, colors, messages, spawn rates
- Narrative text, prompts, UI copy

These are the **“crayon areas”**.  
The whole point of CaveCode is to make these obvious.

---

## 🔧 Expandable Block

**Symbol:** 🔧

- Optional extensions
- Experimental mechanics
- Future plans

These Blocks can start as comments or empty shells.
They invite human or AI collaborators to add new behavior.

---

## 🎮 Game Logic Block

**Symbol:** 🎮

- Core game mechanics
- Input handling
- Tick/loop update logic
- Collision and scoring rules

Humans can still read these, but they’re usually linked
to actual code implementations (HTML/JS, etc.).

---

## 🌐 Public-Safe Block

**Symbol:** 🌐

- Text that is safe to display publicly
- Public-facing descriptions, credits, instructions

Use this glyph when a block is intended for screens, docs, or marketing.

---

## 🖍️ Color Concept (Metaphor Only)

Even though we’re in plain text, the mental color codes are:

- **Orange** = human-friendly text & titles  
- **Blue**   = core logic / rules  
- **Green**  = human-tweakable knobs  
- **Red**    = dangerous / read-only  

You don’t have to literally color anything,
but think in these lanes when you structure your Blocks.
