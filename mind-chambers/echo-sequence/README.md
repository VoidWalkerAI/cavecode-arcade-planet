# Mind Chambers — Echo Sequence (ARC-MC-001)

**Category:** Mind-Chambers  
**Engine:** Pattern memory (Simon-style)  
**Lineage:** First ancestor of the Mind-Chambers family in the CaveCode Arcade Planet.

Echo Sequence is a simple pattern memory game.  
Watch the pads light up in order, then tap them back in the same sequence.  
Each round adds a new step to the pattern. How long can you keep it going?

---

## 🎮 Gameplay

- There are **4 colored pads** arranged in a 2×2 grid.
- Press **Start** to begin.
- The game:
  - Shows a sequence of flashing pads (one at a time).
  - Waits for you to repeat the sequence by tapping the pads.
- If you complete the sequence correctly:
  - Your **level** increases.
  - One new pad is added to the end of the sequence.
  - The game plays the new, longer sequence.
- If you tap the wrong pad:
  - You lose the run.
  - You can start again from level 1.

---

## 🕹️ Controls

Desktop & Mobile (same):

- Click / tap the **Start** button to begin a run.
- When the pads are flashing, you **cannot** input.
- When it says **“Your turn”**, tap the pads to repeat the pattern.

---

## 🎚️ Tuning Knobs

Editable in `echo-sequence.cavecode` and reflected in the script:

- `padCount` — number of pads (default: 4)
- `flashDurationMs` — how long each pad stays lit
- `stepDelayMs` — delay between pads in the shown sequence
- `inputFlashMs` — how long a pad flashes when you press it
- `startLength` — starting sequence length (default: 1)
- `maxLevel` — optional soft cap for teaching demos

---

## 📂 File Structure

```text
echo-sequence/
  README.md
  echo-sequence.cavecode
  index.html
  assets/        (optional, currently empty)
