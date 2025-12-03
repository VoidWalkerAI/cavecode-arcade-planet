# CaveCode Block Structure Guide

CaveCode breaks a system into **readable, labeled blocks** so that
non-coders can see the map, not just the machine.

---

## 🧱 What Is a BLOCK?

A **BLOCK** is a chunk of logic, configuration, or narrative with:

- a clear title
- a number or letter (BLOCK 1, BLOCK 1A, BLOCK 2, etc.)
- one or more glyphs indicating how it can be edited

Example:

🪨 BLOCK 1 — CORE GAME LOOP  
🖍️ BLOCK 2 — HUMAN TUNING (SPEED / COLORS)  
🎮 BLOCK 3 — SCORING LOGIC  

---

## 🔢 Numbering Style

Recommended:

- `BLOCK 1`, `BLOCK 2`, `BLOCK 3` → major sections  
- `BLOCK 1A`, `BLOCK 1B` → sub-sections  
- `BLOCK 10` reserved in Founding Card for human notes (can reuse idea per game)

Block labels should be **easy to scan on a phone**.

---

## 🧬 Minimal Block Set for a Simple Game

For most small games:

1. 🪨 BLOCK 1 — GAME SHELL  
   - Title, description, high-level rules.
2. 🎮 BLOCK 2 — CORE LOOP  
   - What happens when the game "ticks" or steps.
3. 🎮 BLOCK 3 — INPUT / CONTROLS  
   - Key bindings, touch zones, simple mapping.
4. 🎮 BLOCK 4 — SCORING / PROGRESSION  
   - Points, levels, difficulty ramp.
5. 🖍️ BLOCK 5 — TUNING KNOBS  
   - Speed, colors, starting lives, spawn rates.
6. 🌐 BLOCK 6 — PUBLIC / SAFE TEXT  
   - On-screen messages, credits, flavor.
7. 🔧 BLOCK 7+ — EXPANSIONS  
   - Extra modes, powerups, enemies, etc.

You do not have to use this exact pattern,
but something **at this level of clarity** is the goal.

---

## 🧠 Design Principle

> “A single person on a phone should be able to:
>  read it,  
>  tweak a number,  
>  and feel the difference
>  without learning to code.”

If a non-coder can’t see where to poke, add more Blocks
or move tuning into a dedicated 🖍️ HUMAN EDIT ZONE.
