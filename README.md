# 🎮 CaveCode Arcade Planet

**The world’s first public, AI-forged, CaveCode-powered game hall.**  
A SageWire Syndicate project · HerdMate / Broken Frontier adjacent · Voyd_Walker engineered.

---

## 🌍 What This Is

This repository is the **Arcade Planet**:

- A public library of **CaveCode** games  
- Designed to be **human-editable**, **remixable**, and **study-friendly**  
- Built to run on **phones and low-power devices**  
- Forged in collaboration between humans and AI

Every game here follows **CaveCode v1.0** and is organized into categories
like match-3, runners, micro-RPGs, and more.

---

## 🪨 CaveCode v1.0 — Core Law

See: [`cavecode/CaveCode_v1_FoundingCard.txt`](cavecode/CaveCode_v1_FoundingCard.txt)

CaveCode v1.0 defines:

- 🪨 **Locked Blocks** (engine or law – do not modify)  
- 🖍️ **Human Edit Zones** (safe for non-coders to change)  
- 🔧 **Expandable Blocks** (open for extensions)  
- 🎮 **Game Logic Blocks**  
- 🌐 **Public-Safe Blocks** (okay to show the world)

Every game in this repo must respect these rules.

---

## 📁 Repository Layout

```text
arcade/
  haze-maze/         # Infinite match-3 generators
  scarlet-crush/     # Linear puzzle lanes
  retro-quarter/     # Retro / pixel classics
  ember-adventures/  # Micro RPG engines
  cavern-run/        # Endless runners
  mind-chambers/     # Pattern & focus games
  buckeye-bash/      # Seasonal/special variants
  _templates/        # Base CaveCode game template

cavecode/
  CaveCode_v1_FoundingCard.txt  # The law stone
  block-structure-guide.md      # How to break designs into blocks
  glyphs-and-crayons.md         # Legend and usage guide

tools/
  forgebot/                     # Future automation helpers
  validator/                    # CaveCode format checker
